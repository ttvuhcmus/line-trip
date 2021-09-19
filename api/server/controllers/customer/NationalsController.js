"use strict";

const MidNationals = require("../../middlewares/middleUser/MidNationals");
const { CODE_STATUS } = require("../../../config/constants");

const getList = (req, res) => {
  MidNationals.getList(req.query)
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
  MidNationals.create(req.userToken, req.body)
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
