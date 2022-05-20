const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const jwtStrategy = require("passport-jwt").Strategy;
const User = require("./models/User");

//development env vars
require("dotenv").config();

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) token = req.cookies["access-token"];
  return token;
};

//jwt strategy - gets run every time the passport "jwt" argument set on passports authenticate param on request handler
passport.use(
  new jwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_SECRET,
    },
    (payload, done) => {
      User.findById({ _id: payload.sub }, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false);
        return done(null, user);
      });
    }
  )
);

//local strategy - gets run every time the passport "local" argument is set on passports authenticate param on request handler
passport.use(
  new localStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false);
      user.comparePassword(password, done);
    });
  })
);
