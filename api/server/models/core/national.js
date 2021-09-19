const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nationalSchema = new Schema({
  name: { type: String, default: "" },
  code: { type: String, default: "" }
});

const national = mongoose.model("nationals", nationalSchema);

module.exports = national;
