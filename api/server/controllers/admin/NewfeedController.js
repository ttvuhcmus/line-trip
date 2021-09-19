"use strict";

const MidNewfeed = require("../../middlewares/middleAdmin/MidNewfeed");

const getList = (req, res) =>
  MidNewfeed.getList(req.query)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

const getDetail = (req, res) =>
  MidNewfeed.getDetail(req.params.id)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

const update = (req, res) =>
  MidNewfeed.update(req.params.id, req.body)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

const create = (req, res) =>
  MidNewfeed.create(req.body)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

module.exports = {
  getList,
  getDetail,
  update,
  create
};
