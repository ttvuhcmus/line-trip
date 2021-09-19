require("dotenv").config();
const serviceAccount = require("../../firebase-service-account.json");

const CONFIG = {
  AUTHENTICATION: {
    SERVICE_ACCOUNT_KEY: serviceAccount,
    DATABASE_URL: process.env.DATABASE_URL,
    API_KEY: process.env.API_KEY
  },
  CLOUD_MESSAGE: {
    FCM_KEY:
      "AAAA6hiuTLE:APA91bH9aSn8RtneV2Ke08jjdVJCJ7BXtfxtTSOQG-98ElL6hZtExTy1d-vLsrmHC_K43iE7RuqiBPTi9uNA3PM7fpLbmQdrKYD9LPjusgboMBFhy2c2OHR_IT4Yx3aQ8rEyqliyCXLx"
  }
};

module.exports = { CONFIG };
