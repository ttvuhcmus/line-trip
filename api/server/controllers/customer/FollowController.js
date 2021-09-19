"use strict";

const MidFollow = require("../../middlewares/middleUser/MidFollow");

const create = (req, res) =>
  MidFollow.create(req.userToken, req.body)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

const getList = (req, res) =>
  MidFollow.getList(req.userToken)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

const getById = (req, res) =>
  MidFollow.getById(req.userToken, req.params.id)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));
// const update = (req, res) =>
//   MidComment.update(req.userToken, req.body)
//     .then(data =>
//       res.success({
//         data
//       })
//     )
//     .catch(err => res.error(err));

module.exports = {
  create,
  getList,
  getById
};
