const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  username: { type: String, default: "" },
  password: { type: String, default: "" },
  name: { type: String, default: "" },
  created_at: { type: Date, default: Date.now }
});

const admins = mongoose.model("admins", adminSchema);

module.exports = admins;
