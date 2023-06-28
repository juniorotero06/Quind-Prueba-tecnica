const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  repairServiceAddress: { type: String, required: true },
  availableCameras: [{ type: mongoose.Schema.Types.ObjectId, ref: "Camera" }],
});

storeSchema.plugin(require("mongoose-autopopulate"));

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;
