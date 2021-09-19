"use strict";

const MidUser = require("../../middlewares/middleUser/MidUser");

const postLogin = (req, res) =>
  MidUser.postLogin(req.body.uid)
    .then(({ data }) =>
      res.success({
        ...data
      })
    )
    .catch(data => res.error({ ...data }));

module.exports = {
  postLogin
};
