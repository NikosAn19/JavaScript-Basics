const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const authorizeRefreshToken = require("../middleware/authorizeRefreshToken");

//Register users route

router.post("/refresh", (req, res) => {
  const token = req.body.token;
  if (!token) return res.status(400).send("No token provided!");

  console.log("token is :", token);

  jwt.verify(token, config.get("jwtPrivateKey"), (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(400).send("Token expired!");
      } else {
        console.log(err);
        return res.status(400).send("An error with JWT occurred!");
      }
    } else {
      console.log("Token valid!");
      return res.status(200).send("Token valid dude!");
    }
  });
});

router.post("/", authorizeRefreshToken, async (req, res) => {
  //Use Joi to validate data
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  //check if email is not in database.
  let user = await User.findOne({ email: req.body.email });

  if (user) return res.status(400).send("User already registered");

  //Joi-Password-Complexity for passwords in future
  user = new User(_.pick(req.body, ["username", "email", "password"]));
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();

  res.header("x-auth-token", token).send(_.pick(user, ["username", "email"]));
  console.log(`User with email ${user.email} registered \n`, user);
});

module.exports = router;
