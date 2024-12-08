const express = require("express");
const users = require("./routes/users.js");
const authenticate = require("./routes/authenticate.js");
const getPistons = require("./database.js");
const User = require("./models/user.js");
const pistons = require("./routes/pistons.js");
const cookieParser = require("cookie-parser");

const app = express();
const whitelist = ["http://localhost:5173/", "http://localhost:5173/login"];
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
  exposedHeaders: ["*", "x-auth-token"],
};
app.use(cookieParser());
app.use(cors(corsOptions)); // Use this after the variable declaration

app.use(express.json());
app.use("/register/new", users);
app.use("/login", authenticate);
app.use("/pistons", pistons);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Get Response from Root");
});
