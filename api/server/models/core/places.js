const mongoose = require("mongoose");
const { STATUS } = require("../../../config/constants");
const Schema = mongoose.Schema;

const placeSchema = new Schema({
  city: { type: Schema.Types.ObjectId, ref: "cities", default: null },
  images: [{ type: Schema.Types.ObjectId, ref: "images", default: null }],
  name: { type: String, default: "", required: true },
  avatar: { type: String, default: "" },
  description: { type: String, default: null },
  transport: { type: String, default: null },
  note: { type: String, default: null },
  longitude: { type: String, default: null },
  latitude: { type: String, default: null },
  total_rate: { type: Number, default: 0 },
  status: { type: String, default: STATUS.ACTIVE },
  type: { type: String, default: "landscape" },
  created_at: { type: Date, default: Date.now }
});

const places = mongoose.model("place", placeSchema);

module.exports = places;
