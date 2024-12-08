const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const authorizeRefreshToken = require("../middleware/authorizeRefreshToken");
const authorizeAccessToken = require("../middleware/authorizeAccessToken");
const { access } = require("fs");

router.get("/api/accessTokenValidation", authorizeAccessToken, (req, res) => {
  try {
    const token = req.token;
    return res
      .status(200)
      .header("x-auth-token", token)
      .send("Access Token is Valid, continue");
  } catch (error) {
    console.log("Error with access token :", error);
  }
});

router.get("/api/refreshToken", authorizeRefreshToken, async (req, res) => {
  const _id = req._id;
  console.log("Decoded id :", _id);
  const user = await User.findOne({ _id: _id });
  if (!user) return res.status(401).send("No user in db with this id");
  const accessToken = user.generateAuthToken();
  console.log("access token after refresh token validation:", accessToken);
  const refreshToken = req.refreshToken;

  res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .header("x-auth-token", accessToken)
    .send("User validated, token accesible from headers");
});

//AUTHENTICATE USER IN DB
router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).send("Invalid email or password");

  //bcrypt used to compare hashed password in db, with req.password from client

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) return res.status(400).send("Invalid password");

  // Create Access Token
  const accessToken = user.generateAuthToken();
  console.log(accessToken);

  // Create Refresh Token.
  const refreshToken = user.generateRefreshToken();
  // await user.save();

  //Response with Refresh Token httpOnly cookie and Access Token in the header.
  res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      origin: "http://localhost:3000",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "None",
    })
    .header("x-auth-token", accessToken)
    .send("User validated, token accesible from headers");
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(req);
}

module.exports = router;
