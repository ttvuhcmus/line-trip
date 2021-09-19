"use strict";

const MidUser = require("../../middlewares/middleAdmin/MidUser");

const getList = (req, res) =>
  MidUser.getList(req.query)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

const getDetail = (req, res) =>
  MidUser.getDetail(req.params.id)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

const update = (req, res) =>
  MidUser.update(req.params.id, req.body)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

const deleteUser = (req, res) =>
  MidUser.deleteUser(req.params.id, req.body)
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
  deleteUser
};
