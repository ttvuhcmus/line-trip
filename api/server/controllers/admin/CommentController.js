"use strict";

const MidComment = require("../../middlewares/middleAdmin/MidComment");

const getList = (req, res) =>
  MidComment.getList(req.params.id)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

const update = (req, res) =>
  MidComment.update(req.body)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

module.exports = {
  getList,
  update
};
