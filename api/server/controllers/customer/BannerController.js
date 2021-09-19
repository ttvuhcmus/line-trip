"use strict";

const MidBanner = require("../../middlewares/middleUser/MidBanner");
const { CODE_STATUS } = require("../../../config/constants");

const getList = (req, res) => {
  MidBanner.getList(req.query)
    .then(data =>
      res.success({
        code: CODE_STATUS.SUCCESS.code,
        message: CODE_STATUS.SUCCESS.message,
        data
      })
    )
    .catch(err => res.error(err));
};

const create = (req, res) =>
  MidBanner.create(req.body)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

module.exports = {
  getList,
  create
};
