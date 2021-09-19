"use strict";
const { CODE_STATUS, HTTP_STATUS } = require("../../config/constants");
const admin = require("../utils/firebaseAuth");

const isAuth = (req, res, next) => {
  const authorization = req.header("Authorization");
  if (!authorization) {
    return res.success(
      {
        code: CODE_STATUS.PERMISSION_DENIED.code,
        message: CODE_STATUS.PERMISSION_DENIED.message
      },
      HTTP_STATUS.PERMISSION_DENIED
    );
  }
  return admin
    .auth()
    .verifyIdToken(authorization)
    .then(decodedToken => {
      /* eslint no-param-reassign: "error" */
      req.userToken = decodedToken.uid;
      return next();
    })
    .catch(() =>
      res.status(401).send({
        meessage: "Token has expired"
      })
    );
};

module.exports = isAuth;
