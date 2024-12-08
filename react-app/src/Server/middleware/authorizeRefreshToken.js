const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function authorizeRefreshToken(req, res, next) {
  try {
    const refreshToken = req.cookies["refreshToken"];
    console.log("Refresh Token from client : ", refreshToken);
    if (!refreshToken) return res.status(403).send("No token inside cookie.");

    const decoded = jwt.verify(refreshToken, config.get("jwtPrivateKey"));

    const trueDecoded = jwt.decode(refreshToken, config.get("jwtPrivateKey"));

    req._id = trueDecoded._id;
    req.refreshToken = refreshToken;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.error("Token has expired");
      return res.status(401).send("Token has expired, please login again.");
    } else {
      console.error("Invalid token:", error.message);
    }
  }
};
// module.exports = function (req, res, next) {
//   const token = req.body.token;
//   if (!token) return res.status(400).send("No token provided!");

//   console.log("token is :", token);

//   jwt.verify(token, config.get("jwtPrivateKey"), (err, decoded) => {
//     if (err) {
//       if (err.name === "TokenExpiredError") {
//         return res.status(400).send("Token expired!");
//       } else {
//         console.log(err);
//         return res.status(400).send("An error with JWT occurred!");
//       }
//     } else {
//       console.log("Token valid!");
//       next();
//     }
//   });
// };
