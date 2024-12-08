const {
  Piston,
  getPistons,
  insertPiston,
  deletePiston,
} = require("../models/piston");
const express = require("express");
const router = express.Router();
const formatFieldName = require("../helpers/wordFormater");
const authorizeAccessToken = require("../middleware/authorizeAccessToken");

// http://localhost:3000/pistons/getIdentities

router.post("/", authorizeAccessToken, (req, res) => {
  let query = req.body;
  //here sanitize and validate input later
  getPistons(query).then((response) => {
    res.send(response);
  });
});

router.delete("/deletePiston", async (req, res) => {
  const query = req.body;
  try {
    const hasDeleted = await deletePiston(query);
    if (hasDeleted) {
      res
        .status(200)
        .send(`Piston with piston code ${query.piston_code} has deleted!`);
    } else {
      res
        .status(400)
        .send(`Piston with code ${query.piston_code} does not exist`);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/createNew", async (req, res) => {
  let query = req.body;

  try {
    const result = await insertPiston(query);

    if (result instanceof Error) {
      if (result.code === 11000) {
        return res.status(409).json({
          message: "Piston already exists with this code",
        });
      }
      return res.status(500).json({
        message: "An error occurred while saving the piston",
      });
    }

    res.status(201).send(`Piston with code ${query.piston_code} inserted!!`);
  } catch (error) {
    // Αν κάτι πάει στραβά στη διαδικασία
    console.error("Error saving piston:", error);
    res.status(500).json({
      message: "An unexpected error occurred",
    });
  }
});

router.get("/getIdentities", async (req, res) => {
  try {
    // Παίρνουμε ένα document
    const document = await Piston.findOne({}, { _id: 0, __v: 0 });

    if (!document) {
      return res.status(404).json({ message: "No document found" });
    }

    // Παίρνουμε τα κλειδιά του document
    const fields = Object.keys(document.toObject());
    const formattedFields = fields.map(formatFieldName);

    res.json({
      fieldNamesFormatted: formattedFields,
      fieldNamesRaw: fields,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
