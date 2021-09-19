"use strict";

const MidCity = require("../../middlewares/middleAdmin/MidCity");
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

const update = (req, res) =>
  MidCity.update(req.params.id, req.body)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

const deleteCity = (req, res) =>
  MidCity.deleteCity(req.params.id)
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
  update,
  deleteCity
};
