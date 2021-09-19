"use strict";

const MidNotification = require("../../middlewares/middleUser/MidNotification");

const getList = (req, res) =>
  MidNotification.getList(req.userToken, req.query)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

const seen = (req, res) =>
  MidNotification.seen(req.userToken, req.body)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

const countUnseen = (req, res) =>
  MidNotification.countUnseen(req.userToken)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => {
      console.log("count unseen", error);
      res.error(err);
    });

module.exports = { getList, seen, countUnseen };
