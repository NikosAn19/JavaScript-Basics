const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("config");
const dotenv = require("dotenv");
const Piston = require("./models/piston");
const conf = dotenv.config();
// console.log(conf);
// console.log(process.env);
if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR , jwtPrivateKey is not defined");
  process.exit(1);
}

mongoose
  .connect("mongodb://127.0.0.1:27017/MotoParts")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// insertPiston("YAZH4", "Yamaha", "Crypton", "X", 45.6, 2.3, 15.6, 23.5, 12.6);
// insertPiston("EE14S", "Honda", "CRF", "4T", 35.6, 1.3, 22.6, 55.5, 42.6);
// getPistons(query);
