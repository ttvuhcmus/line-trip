"use strict";

const MidPlace = require("../../middlewares/middleUser/MidPlace");

const getList = (req, res) =>
  MidPlace.getList(req.query)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

const getListTopRate = (req, res) =>
  MidPlace.getListTopRate(req.query)
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

const getPlaceReview = (req, res) => {
  return MidPlace.getPlaceReview(req.query)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));
};

const createReview = (req, res) =>
  MidPlace.createReview(req.userToken, req.body)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

const deleteReview = (req, res) =>
  MidPlace.deleteReview(req.body)
    .then(data => res.success({}))
    .catch(err => res.error(err));

const getListFavorite = (req, res) => {
  return MidPlace.getListFavorite(req.userToken, req.query)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => {
      console.log("get list ", err);
      res.error(err);
    });
};

const addFavorite = (req, res) =>
  MidPlace.addToFavorite(req.userToken, req.body)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

const deleteFavorite = (req, res) =>
  MidPlace.removeFavorite(req.userToken, req.body)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

const checkFavorite = (req, res) =>
  MidPlace.checkFavorite(req.userToken, req.body)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

module.exports = {
  getList,
  getDetail,
  getPlaceReview,
  createReview,
  deleteReview,
  getListTopRate,
  getListFavorite,
  addFavorite,
  deleteFavorite,
  checkFavorite
};
