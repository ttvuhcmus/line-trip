const mongoose = require("mongoose");
const { STATUS } = require("../../../config/constants");
const Schema = mongoose.Schema;

const newSchema = new Schema({
  title: { type: String, default: null },
  content: { type: String, default: null },
  image_url: { type: String, default: null },
  status: { type: String, default: STATUS.ACTIVE, required: true },
  created_at: { type: Date, default: Date.now }
});

const news = mongoose.model("new", newSchema);

module.exports = news;
