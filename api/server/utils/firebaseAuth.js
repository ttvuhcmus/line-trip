const admin = require("firebase-admin");
const { FIREBASE } = require("../utils/domain");

admin.initializeApp({
  credential: admin.credential.cert(
    FIREBASE.AUTHENTICATION.SERVICE_ACCOUNT_KEY
  ),
  databaseURL: FIREBASE.AUTHENTICATION.DATABASE_URL
});

module.exports = admin;
