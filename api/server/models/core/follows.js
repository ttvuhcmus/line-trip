const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const followSchema = new Schema({
  follow_to: { type: Schema.Types.String, ref: "users", default: null },
  follow_by: { type: Schema.Types.String, ref: "users", default: null },
  created_at: { type: Date, default: Date.now },
  status: { type: Boolean, default: true }
});

const follows = mongoose.model("follows", followSchema);

module.exports = follows;
