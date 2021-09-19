"use strict";

const MidAdmin = require("../../middlewares/middleAdmin/MidAdmin");

const postLogin = (req, res) =>
  MidAdmin.postLogin(req.body)
    .then(data =>
      res.success({
        ...data
      })
    )
    .catch(({ data }) => res.error({ ...data }));

module.exports = {
  postLogin
};
