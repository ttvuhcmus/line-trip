"use strict";

const MidNews = require("../../middlewares/middleAdmin/MidNews");

const getList = (req, res) =>
  MidNews.getList(req.query)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

const create = (req, res) =>
  MidNews.create(req.body)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

const update = (req, res) =>
  MidNews.update(req.params.id, req.body)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

const deleteNews = (req, res) =>
  MidNews.deleteNews(req.params.id)
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
  deleteNews
};
