const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { findById } = require("../models/User");

//development env vars
require("dotenv").config();

//function that creates our json web token (cookie)
const signToken = (userId) => {
  return jwt.sign(
    {
      iss: "ChristianDR",
      sub: userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 60 * 60 * 24,
    }
  );
};

//save new user to db
userRouter.post("/register", (req, res) => {
  const { username, password, role } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err) {
      res
        .status(500)
        .json({ msg: { msgBody: "An error occured", msgError: true } });
    }
    if (user) {
      res
        .status(400)
        .json({ msg: { msgBody: "Username allready taken", msgError: true } });
    } else {
      const newUser = new User({ username, password, role });
      newUser.save((err) => {
        if (err) {
          res
            .status(500)
            .json({ msg: { msgBody: "An error occured", msgError: true } });
        } else {
          res.status(201).json({
            msg: { msgBody: "Account successfully created", msgError: false },
          });
        }
      });
    }
  });
});

//runs local strategy middleware (passport.js file) and sets cookie to jwt created through our signToken() function
userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username, role } = req.user;
      //setting a constant holding the jwt returned from our signedToken-funcion
      const token = signToken(_id);
      //setting a cookie in the browser named "access-token" containing the jwt held by the constant above
      res.cookie("access-token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({
        isAuthenticated: true,
        user: { _id, username, role },
        msg: { msgBody: "Successfully logged in", msgError: false },
      });
    }
  }
);

//runs jwt strategy middleware (passport.js file) to see if there is a session cookie (jwt) stored in our browser
userRouter.get(
  "/authenticated",
  passport.authenticate("user-rule", { session: false }),
  (req, res) => {
    const {
      _id,
      username,
      role,
      firstname,
      lastname,
      email,
      phone,
      street,
      zipCode,
      town,
      country,
    } = req.user;
    res.status(200).json({
      isAuthenticated: true,
      user: {
        _id,
        username,
        role,
        firstname,
        lastname,
        email,
        phone,
        street,
        zipCode,
        town,
        country,
      },
    });
  }
);

//runs jwt strategy middleware (passport.js file) to see if there is a session cookie (jwt) stored in our browser, then clears cookie so user is no longer authenticated
userRouter.get(
  "/logout",
  passport.authenticate("user-rule", { session: false }),
  (req, res) => {
    res.clearCookie("access-token");
    res
      .status(200)
      .json({ msg: { msgBody: "Successfully logged out", msgError: true } });
  }
);

//update user
userRouter.put(
  "/update/:id",
  passport.authenticate("user-rule", { session: false }),
  (req, res) => {
    const {
      firstname,
      lastname,
      email,
      phone,
      street,
      zipCode,
      town,
      country,
    } = req.body;
    User.findByIdAndUpdate(
      { _id: req.params.id },
      { firstname, lastname, email, phone, street, zipCode, town, country },
      (err) => {
        if (err) {
          res.status(500).json({
            msg: {
              msgBody: "An error occured updating your account",
              msgError: true,
            },
          });
        } else {
          res.status(200).json({
            msg: {
              msgBody: "Successfully updated account",
              msgError: false,
            },
          });
        }
      }
    );
  }
);

//get order history
userRouter.get(
  "/getorderhistory",
  passport.authenticate("user-rule", { session: false }),
  (req, res) => {
    User.findById({ _id: req.user._id })
      .populate("orderHistory")
      .exec((err, user) => {
        if (err) {
          res.status(500).json({
            msg: {
              msgBody: "An error occured retrieving order history",
              msgError: true,
            },
          });
        } else {
          res.status(200).json({
            orderHistory: user.orderHistory,
            msg: {
              msgBody: "Successfully retrieved order history",
              msgError: false,
            },
          });
        }
      });
  }
);

module.exports = userRouter;
