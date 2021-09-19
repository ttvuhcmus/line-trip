const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  url: { type: String, default: null },
  type: { type: String, default: null },
  created_at: { type: Date, default: Date.now }
});

const imagesModel = mongoose.model("images", imageSchema);

module.exports = imagesModel;
