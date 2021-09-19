const mongoose = require("mongoose");
const { STATUS } = require("../../../config/constants");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  user: { type: Schema.Types.String, ref: "users", default: null },
  content: { type: String, default: null },
  rate: { type: Number, default: 0, requied: true },
  place: { type: Schema.Types.String, ref: "places", default: null },
  status: { type: String, default: STATUS.ACTIVE, required: true },
  created_at: { type: Date, default: Date.now }
});

const reviews = mongoose.model("reviews", reviewSchema);

module.exports = reviews;
