const express = require("express");
const productRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const Product = require("../models/Product");

productRouter.post(
  "/newproduct",
  passport.authenticate("admin-rule", { session: false }),
  (req, res) => {
    const { name, description, price } = req.body;
    const newProduct = new Product({
      name,
      description,
      price,
    });
    newProduct.save((err) => {
      if (err) {
        res
          .status(500)
          .json({ message: { msgBody: "An error occured", msgError: true } });
      } else {
        res.status(201).json({
          message: { msgBody: "Successfully added product", msgError: false },
        });
      }
    });
  }
);

productRouter.get("/allproducts", (req, res) => {
  Product.find({}, (err, products) => {
    if (err) {
      res
        .status(500)
        .json({ message: { msgBody: "An error occured", msgError: true } });
    } else {
      res.status(200).json({
        products,
        message: { msgBody: "Successfully retrieved product", msgError: false },
      });
    }
  });
});

productRouter.put(
  "/updateproduct/:id",
  passport.authenticate("admin-rule", { session: false }),
  (req, res) => {
    const { name, description, price } = req.body;
    Product.findByIdAndUpdate(
      { _id: req.params.id },
      { name, description, price },
      (err) => {
        if (err) {
          res
            .status(500)
            .json({ message: { msgBody: "An error occured", msgError: true } });
        } else {
          res.status(200).json({
            message: {
              msgBody: "Successfully updated product",
              msgError: false,
            },
          });
        }
      }
    );
  }
);

productRouter.delete(
  "/deleteproduct/:id",
  passport.authenticate("admin-rule", { session: false }),
  (req, res) => {
    Product.findByIdAndDelete({ _id: req.params.id }, (err) => {
      if (err) {
        res
          .status(500)
          .json({ message: { msgBody: "An error occured", msgError: true } });
      } else {
        res.status(200).json({
          message: {
            msgBody: "Successfully deleted product",
            msgError: false,
          },
        });
      }
    });
  }
);

module.exports = productRouter;
