"use strict";

const MidNewfeed = require("../../middlewares/middleUser/MidNewfeed");

const getList = (req, res) =>
  MidNewfeed.getList(req.userToken, req.query)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

const create = (req, res) =>
  MidNewfeed.create(req.userToken, req.body)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

const update = (req, res) =>
  MidNewfeed.update(req.userToken, req.body)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

const getDetail = (req, res) =>
  MidNewfeed.getDetail(req.userToken, req.params.id)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

const deleteNewfeed = (req, res) =>
  MidNewfeed.deleteNewfeed(req.params.id)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

module.exports = {
  getList,
  create,
  update,
  getDetail,
  deleteNewfeed
};
