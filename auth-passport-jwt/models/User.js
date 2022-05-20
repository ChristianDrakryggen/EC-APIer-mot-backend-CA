const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//middleware that runs before every mongodb save call via mongoose
UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) next();
  bcrypt.hash(this.password, 10, (err, passwordHashed) => {
    if (err) return next(err);
    this.password = passwordHashed;
    next();
  });
});

//gets call from passport local strategy to compare password submitted from client with password on user in db
UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    } else {
      if (!isMatch) return cb(null, isMatch);
      return cb(null, this);
    }
  });
};

module.exports = mongoose.model("User", UserSchema);
