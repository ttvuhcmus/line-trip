const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  user: { type: Schema.Types.String, ref: "users", default: null },
  newfeed: { type: Schema.Types.ObjectId, ref: "new_feeds", default: null },
  created_at: { type: Date, default: Date.now },
  status: { type: Boolean, default: true }
});

const likes = mongoose.model("likes", likeSchema);

module.exports = likes;
