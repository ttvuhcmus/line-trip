"use strict";

const MidUser = require("../../middlewares/middleUser/MidUser");
const { CODE_STATUS } = require("../../../config/constants");

const getUserProfile = (req, res) =>
  MidUser.getUserProfile(req.userToken)
    .then(data =>
      res.success({
        code: CODE_STATUS.GET_PROFILE_SUCCESS.code,
        message: CODE_STATUS.GET_PROFILE_SUCCESS.message,
        data
      })
    )
    .catch(error =>
      res.error({
        code: CODE_STATUS.GET_PROFILE_FAILED.code,
        message: CODE_STATUS.GET_PROFILE_FAILED.message,
        error
      })
    );

const update = (req, res) =>
  MidUser.update(req.userToken, req.body)
    .then(data =>
      res.success({
        code: CODE_STATUS.UPDATE_PROFILE.code,
        message: CODE_STATUS.UPDATE_PROFILE.message,
        data
      })
    )
    .catch(error => res.error(error));

const getUserProfileById = (req, res) => {
  MidUser.getUserProfileById(req.params.id)
    .then(data =>
      res.success({
        code: CODE_STATUS.SUCCESS.code,
        message: CODE_STATUS.SUCCESS.message,
        data
      })
    )
    .catch(error =>
      res.error({
        code: CODE_STATUS.GET_PROFILE_FAILED.code,
        message: CODE_STATUS.GET_PROFILE_FAILED.message,
        error
      })
    );
};

const getList = (req, res) =>
  MidUser.getList(req.query)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

module.exports = {
  getUserProfile,
  update,
  getUserProfileById,
  getList
};
