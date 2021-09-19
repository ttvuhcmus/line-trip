"use strict";

const MidComment = require("../../middlewares/middleUser/MidComment");

const create = (req, res) =>
  MidComment.create(req.userToken, req.body)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

const getList = (req, res) =>
  MidComment.getList(req.userToken, req.params.id)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

const update = (req, res) =>
  MidComment.update(req.userToken, req.body)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

module.exports = {
  create,
  getList,
  update
};
