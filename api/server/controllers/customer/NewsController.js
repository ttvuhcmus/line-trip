"use strict";

const MidNews = require("../../middlewares/middleUser/MidNews");

const getList = (req, res) =>
  MidNews.getList(req.body)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

const getDetail = (req, res) =>
  MidNews.getDetail(req.params.id)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

module.exports = { getList, getDetail };
