const mongoose = require("mongoose");
const { STATUS } = require("../../../config/constants");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  user: { type: Schema.Types.String, ref: "users", default: null },
  content: { type: String, default: null },
  title: { type: String, default: null },
  type: { type: String, default: null },
  is_seen: { type: Boolean, default: false },
  status: { type: String, default: STATUS.ACTIVE, required: true },
  created_at: { type: Date, default: Date.now }
});

const notifications = mongoose.model("notification", notificationSchema);

module.exports = notifications;
