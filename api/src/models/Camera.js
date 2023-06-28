const mongoose = require("mongoose");

const cameraSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  hasFlash: { type: Boolean, required: true },
  filmTypes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Film" }],
  status: {
    type: String,
    enum: ["available", "rented", "delayed", "repair"],
    default: "available",
  },
  returnDate: { type: Date },
});

cameraSchema.plugin(require("mongoose-autopopulate"));

const Camera = mongoose.model("Camera", cameraSchema);

module.exports = Camera;
