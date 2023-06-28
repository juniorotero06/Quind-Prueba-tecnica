const mongoose = require("mongoose");

const filmSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  name: { type: String, required: true },
  iso: { type: Number, enum: [50, 100, 200, 400, 800, 1600], required: true },
  format: { type: String, enum: ["35mm", "110mm", "120mm"], required: true },
});

const Film = mongoose.model("Film", filmSchema);

module.exports = Film;
