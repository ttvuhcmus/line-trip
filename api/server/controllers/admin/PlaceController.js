"use strict";

const MidPlace = require("../../middlewares/middleAdmin/MidPlace");

const getList = (req, res) =>
  MidPlace.getList(req.query)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

const getDetail = (req, res) =>
  MidPlace.getDetail(req.params.id)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

const create = (req, res) =>
  MidPlace.create(req.body)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

const update = (req, res) =>
  MidPlace.update(req.params.id, req.body)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

const deletePlace = (req, res) =>
  MidPlace.deletePlace(req.params.id)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

const getPlaceReview = (req, res) => {
  return MidPlace.getPlaceReview(req.query)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));
};

const deleteReview = (req, res) =>
  MidPlace.deleteReview(req.params.id)
    .then(data => res.success({}))
    .catch(err => res.error(err));

module.exports = {
  getList,
  create,
  update,
  getDetail,
  deletePlace,
  getPlaceReview,
  deleteReview
};
