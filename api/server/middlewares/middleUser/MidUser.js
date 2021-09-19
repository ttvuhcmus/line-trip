"use strict";
const admin = require("../../utils/firebaseAuth");
const userModel = require("../../models/core/users");
const nationalModel = require("../../models/core/national");
const MidFollow = require("../../middlewares/middleUser/MidFollow");
const { CODE_STATUS, STATUS } = require("../../../config/constants");
const { getTokenId } = require("../../utils/getTokenId");
const { limitAndSkip } = require("../../utils/helpers");
const get = require("lodash/get");

const checkExistUidOnFirebase = async uid => {
  try {
    const data = await admin.auth().getUser(uid);
    return { isExistUidOnFirebase: true, ...data };
  } catch (error) {
    return { isExistUidOnFirebase: false };
  }
};

const getUserByFirebaseId = async _id => await userModel.findOne({ _id });

const createUser = async data => await userModel(data).save();

const getUserProfile = async _id => {
  try {
    const profile = await userModel.findOne({ _id });
    const total_follow = await MidFollow.totalFollow(_id);
    const total_following = await MidFollow.totalFollowing(_id);
    return {
      ...(profile?._doc || profile),
      total_follow,
      total_following
    };
  } catch (error) {
    throw new Error(error);
  }
};

const getUserProfileById = async _id => {
  try {
    const profile = await userModel.findOne({ _id });
    const total_follow = await MidFollow.totalFollow(_id);
    const total_following = await MidFollow.totalFollowing(_id);
    return {
      ...(profile?._doc || profile),
      total_follow,
      total_following
    };
  } catch (error) {
    throw new Error(error);
  }
};

const postLogin = async uid => {
  try {
    const { isExistUidOnFirebase, ...data } = await checkExistUidOnFirebase(
      uid
    );
    if (!isExistUidOnFirebase) {
      return {
        data: {
          code: CODE_STATUS.NOT_EXIST_FIREBASE.code,
          message: CODE_STATUS.NOT_EXIST_FIREBASE.message,
          error: {}
        },
        isRes: false
      };
    }
    const existingUser = await getUserByFirebaseId(uid);
    const customToken = await admin.auth().createCustomToken(uid);
    const authentication = await getTokenId(customToken);
    console.log("l: ", data);
    if (existingUser instanceof Error || !existingUser) {
      const { displayName, email, photoURL, providerData, phoneNumber } = data;
      const initialUser = {
        _id: uid,
        email: providerData[0].email,
        name: displayName,
        avatar: photoURL,
        providers: providerData[0].providerId,
        social_id: providerData[0].id,
        phone: phoneNumber
      };
      const newUser = await createUser(initialUser);
      return {
        data: {
          code: CODE_STATUS.LOGIN_SUCCESS.code,
          message: CODE_STATUS.LOGIN_SUCCESS.message,
          data: { profile: newUser, authentication }
        },
        isRes: true
      };
    } else {
      const userProfile = await getUserProfile(uid);
      return {
        data: {
          code: CODE_STATUS.LOGIN_SUCCESS.code,
          message: CODE_STATUS.LOGIN_SUCCESS.message,
          data: { profile: userProfile, authentication }
        },
        isRes: true
      };
    }
  } catch (error) {
    return {
      data: {
        code: CODE_STATUS.LOGIN_FAILED.code,
        message: CODE_STATUS.LOGIN_FAILED.message,
        error
      },
      isRes: false
    };
  }
};

const update = async (_id, data) => {
  if (data.national_id != null) {
    let national = await nationalModel.findById(data.national_id);
    data.national = {
      id: national._id,
      name: national.name
    };
  }
  return await userModel.findOneAndUpdate(
    { _id },
    { $set: { ...data } },
    { new: true }
  );
};

const getList = async ({ page, limit, search }) => {
  try {
    const { start, end, limits } = limitAndSkip(page, limit);
    const querySearch = !search
      ? {}
      : { name: { $regex: `.*${search}.*`, $options: "i" } };
    const listUser = await userModel.aggregate([
      {
        $match: { $and: [{ status: STATUS.ACTIVE }], $or: [querySearch] }
      },
      { $sort: { created_at: -1 } },
      {
        $facet: {
          results: [{ $skip: start }, { $limit: limits }],
          total: [{ $count: "count" }]
        }
      }
    ]);
    return get(listUser, "[0].results", []);
  } catch (error) {
    console.log("Error", error);
    throw new Error(error);
  }
};

module.exports = {
  postLogin,
  getUserProfile,
  update,
  getUserProfileById,
  getList
};
