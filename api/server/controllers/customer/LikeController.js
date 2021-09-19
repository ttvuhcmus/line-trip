"use strict";

const MidLike = require("../../middlewares/middleUser/MidLike");

const create = (req, res) =>
  MidLike.create(req.userToken, req.body)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

module.exports = {
  create
};
