const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  refreshToken: {
    type: String,
    default: null,
  },
});

//GENERATE JWT ACCESS TOKEN FROM MODEL
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
    },

    config.get("jwtPrivateKey"),
    { expiresIn: "15m" }
  );

  return token;
};

//GENERATE JWT REFRESH TOKEN FROM MODEL
userSchema.methods.generateRefreshToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
    },

    config.get("jwtPrivateKey"),
    { expiresIn: "1d" }
  );

  return token;
};
const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(5).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}
exports.User = User;
exports.validate = validateUser;
