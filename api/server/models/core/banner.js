const mongoose = require("mongoose");
const { STATUS } = require("../../../config/constants");
const Schema = mongoose.Schema;

const bannerSchema = new Schema({
  name: { type: String, default: "" },
  path: { type: String, default: "" },
  type: { type: String, default: "banner" },
  status: { type: String, default: STATUS.ACTIVE, required: true },
  created_at: { type: Date, default: Date.now }
});

const banner = mongoose.model("banners", bannerSchema);

module.exports = banner;
