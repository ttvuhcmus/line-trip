const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subdivisionsSchema = new Schema({
  ward_id: { type: String, default: "" },
  ward_name: { type: String, default: "" },
  district_id: { type: String, default: "" },
  district_name: { type: String, default: "" },
  province_name: { type: String, default: "" },
  province_id: { type: String, default: "" }
});

const accounts = mongoose.model("subdivisions", subdivisionsSchema);

module.exports = accounts;
