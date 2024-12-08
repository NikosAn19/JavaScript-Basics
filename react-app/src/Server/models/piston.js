const mongoose = require("mongoose");

const pistonSchema = new mongoose.Schema({
  piston_code: String,
  brand: String,
  model: String,
  tact: String,
  diameter: Number,
  pin_diameter: Number,
  compression_height: Number,
  total_height: Number,
  oversize: Number,
});

async function getPistons(query) {
  const filterQuery = (query) => {
    return Object.fromEntries(
      Object.entries(query).filter(([_, value]) => value !== "")
    );
  };

  let filteredQuery = filterQuery(query);

  filteredQuery = Object.fromEntries(
    Object.entries(filteredQuery).map(([key, value]) => {
      // Αν το value μπορεί να γίνει cast σε αριθμό, το μετατρέπουμε σε `Number`
      if (!isNaN(value) && value.trim() !== "") {
        return [key, parseFloat(value)]; // Χρησιμοποιούμε parseFloat για δεκαδικούς αριθμούς
      } else if (typeof value === "string") {
        // Αν το value είναι string, το μετατρέπουμε σε κεφαλαία
        return [key, value.charAt(0).toUpperCase() + value.slice(1)];
      } else {
        return [key, value]; // Διατηρούμε το value ως έχει αν δεν είναι αριθμός
      }
    })
  );

  console.log("filtered query : ", filteredQuery);
  const pistons = await Piston.find(filteredQuery);
  console.log(`Piston with params :  ${filteredQuery} : \n`, pistons);
  return pistons;
}

async function insertPiston(pistonData) {
  const piston = new Piston({
    piston_code: pistonData.piston_code,
    brand: pistonData.brand,
    model: pistonData.model,
    tact: pistonData.tact,
    diameter: pistonData.diameter,
    pin_diameter: pistonData.pin_diameter,
    compression_height: pistonData.compression_height,
    total_height: pistonData.total_height,
    oversize: pistonData.oversize,
  });

  try {
    const result = await piston.save();
    console.log("New piston added!! ", result);
    return result;
  } catch (error) {
    return error;
  }
}

async function deletePiston(pistonData) {
  const piston_code = pistonData.piston_code;
  try {
    const deletion = await Piston.deleteOne({ piston_code: `${piston_code}` });
    if (deletion.deletedCount === 0) {
      console.log("no document found for deletion! ");
      return false;
    } else {
      console.log("Document deleted successfully!!");
      return true;
    }
  } catch (error) {
    console.log(error);
  }
}

const Piston = mongoose.model("Piston", pistonSchema);

module.exports.Piston = Piston;
module.exports.getPistons = getPistons;
module.exports.insertPiston = insertPiston;
module.exports.deletePiston = deletePiston;
