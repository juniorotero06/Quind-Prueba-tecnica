const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rentedCamera: { type: mongoose.Schema.Types.ObjectId, ref: "Camera" },
  penaltyMonths: { type: Number, default: 0 },
});

clientSchema.plugin(require("mongoose-autopopulate"));

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
