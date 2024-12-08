function formatFieldName(fieldName) {
  return fieldName
    .split("_") // Διαχωρισμός με βάση το `_`
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Πρώτο γράμμα κεφαλαίο
    .join(" "); // Ενοποίηση με κενό
}
module.exports = formatFieldName;
