"use strict";

const MidCity = require("../../middlewares/middleUser/MidCity");
const { CODE_STATUS } = require("../../../config/constants");

const getList = (req, res) => {
  MidCity.getList(req.query)
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
  MidCity.create(req.userToken, req.body)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

const getDetail = (req, res) =>
  MidCity.getDetail(req.params.id)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

const getPopular = (req, res) =>
  MidCity.getPopular(req.query)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

module.exports = {
  getList,
  create,
  getDetail,
  getPopular
};
