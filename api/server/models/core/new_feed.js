const mongoose = require("mongoose");
const { STATUS } = require("../../../config/constants");
const Schema = mongoose.Schema;

const newfeedSchema = new Schema({
  content: { type: String, default: null },
  user: { type: Schema.Types.String, ref: "users", default: null },
  images: [{ type: Schema.Types.ObjectId, ref: "images", default: null }],
  place: { type: Schema.Types.ObjectId, ref: "places", default: null },
  city: { type: Schema.Types.ObjectId, ref: "cities", default: null },
  status: { type: String, default: STATUS.ACTIVE },
  total_like: { type: Number, default: 0 },
  total_comment: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now }
});

const newfeeds = mongoose.model("new_feeds", newfeedSchema);

module.exports = newfeeds;
