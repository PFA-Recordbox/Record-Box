const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  website: { type: String, required: true },
  username: { type: String, required: true }, // username change.
  password: { type: String, required: true },
});

module.exports = mongoose.model("Data", dataSchema);
