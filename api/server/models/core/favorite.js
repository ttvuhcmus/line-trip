const mongoose = require("mongoose");
const { STATUS } = require("../../../config/constants");
const Schema = mongoose.Schema;

const favoriteSChema = new Schema({
  user: { type: Schema.Types.String, ref: "users", default: null },
  place: { type: Schema.Types.ObjectId, ref: "places", default: null },
  city: { type: Schema.Types.ObjectId, ref: "cities", default: null },
  created_at: { type: Date, default: Date.now }
});

const favorites = mongoose.model("favorites", favoriteSChema);

module.exports = favorites;
