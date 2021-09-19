const { CONFIG } = require("../utils/firebaseConfig");
require("dotenv").config();

const FIREBASE = CONFIG;

const MONGODB =
  process.env.NODE_ENV && process.env.NODE_ENV === "development"
    ? `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
    : `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`;

module.exports = { MONGODB, FIREBASE };
