const jwt = require("jsonwebtoken");
const config = require("config");

// MIDDLEWARE TO AUTHORIZE USER VIA JWT

module.exports = function authorizeAccessToken(req, res, next) {
  try {
    console.log("authorize middleware ran");
    const authHeader = req.header("Authorization");
    const token = authHeader.split(" ")[1];
    console.log("Authorization Header : ", token);
    if (!token) return res.status(403).send("No token provided.");

    const decoded = jwt.verify(token, config.get("jwtPrivateKey"), (err) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(403).send("Unauthorized");
        } else {
          console.log(err);
          return res.status(400).send("An error with JWT occurred!");
        }
      }
    });
    req.token = token;
    req.decoded = decoded;
    next();
  } catch (error) {
    console.log(error);
  }
};
