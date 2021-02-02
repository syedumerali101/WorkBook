const mongoose = require("mongoose");
var passportlocalmongoose = require("passport-local-mongoose");
const bcrypt = require("bcryptjs");

var User = mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  firstname: { type: String, default: "" },
  lastname: { type: String, default: "" },
  password: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
  is_encrypted: {
    type: Boolean,
    default: false,
  },
  completion_score: {
    type: Number,
    default: 0,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
  privacy_score: {
    type: Number,
    default: 0,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
});

User.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.methods.validPassword = function (password, oPassword) {
  return bcrypt.compareSync(password, oPassword);
};

// User.plugin(passportlocalmongoose);
module.exports = mongoose.model("User", User);
