const mongoose = require("mongoose");
const { STATUS } = require("../../../config/constants");
const Schema = mongoose.Schema;

const addressModel = new Schema({
  city: {
    id: { type: String, default: "" },
    name: { type: String, default: "" }
  },
  district: {
    id: { type: String, default: "" },
    name: { type: String, default: "" }
  },
  ward: {
    id: { type: String, default: "" },
    name: { type: String, default: "" }
  },
  street: { type: String, required: false }
});

const userSchema = new Schema({
  _id: { type: String },
  name: { type: String, default: "" },
  phone: { type: String, default: "" },
  email: { type: String, default: "", index: true },
  avatar: { type: String, default: "" },
  address: { type: addressModel },
  gender: { type: String, default: "" },
  day_of_birth: { type: Date, default: null },
  national: {
    id: { type: Schema.Types.String, ref: "nationals", default: null },
    name: { type: Schema.Types.String, default: null }
  },
  providers: { type: String, default: "" },
  role: { type: String, default: "retailer" },
  longitude: { type: String, default: "" },
  latitude: { type: String, default: "" },
  status: { type: String, required: true, default: STATUS.ACTIVE },
  fcm_token: { type: String, default: "" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  titok_url: { type: String, default: "" },
  fb_url: { type: String, default: "" },
  instagram_url: { type: String, default: "" },
  twitter_url: { type: String, default: "" },
  social_id: { type: String, default: "" }
});

const users = mongoose.model("users", userSchema);

module.exports = users;
