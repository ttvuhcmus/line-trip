const mongoose = require("mongoose");
const { STATUS } = require("../../../config/constants");
const Schema = mongoose.Schema;

const citySchema = new Schema({
  name: { type: String, default: "" },
  avatar: { type: String, default: "" },
  images: [{ type: Schema.Types.ObjectId, ref: "images", default: null }],
  description: { type: String, default: "" },
  national: {
    id: { type: String, default: "60af9b84f0a22a3720731e68" },
    name: { type: String, default: "Viet Nam" }
  },
  status: { type: String, default: STATUS.ACTIVE, required: true }
});

const city = mongoose.model("cities", citySchema);

module.exports = city;
