const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user: { type: Schema.Types.String, ref: "users", default: null },
  newfeed: { type: Schema.Types.ObjectId, ref: "users", default: null },
  parent_level: { type: Schema.Types.ObjectId, ref: "comments", default: null },
  content: { type: String, default: null },
  created_at: { type: Date, default: Date.now },
  status: { type: Boolean, default: true }
});

const comments = mongoose.model("comments", commentSchema);

module.exports = comments;
