const { get } = require("lodash");
const likeModel = require("../../models/core/likes");
const newfeedModel = require("../../models/core/new_feed");
const MidNotification = require("../middleUser/MidNotification");
const MidNewfeed = require("../middleUser/MidNewfeed");
const { ObjectId } = require("mongodb");
const { NOTI } = require("../../../config/constants");
const getDetail = async ({ user, newfeed }) => {
  try {
    return await likeModel.findOne({ user, newfeed });
  } catch (error) {
    throw new Error(error);
  }
};

const getAll = async () => {
  try {
    return await likeModel.find();
  } catch (error) {
    throw new Error(error);
  }
};

const create = async (id, { newfeed }) => {
  try {
    const like = await getDetail({ user: id, newfeed });
    const newfeedDetail = await newfeedModel.findOne({ _id: newfeed });
    if (!newfeed) {
      throw new Error("New feed doesn't exist");
    }
    if (!like) {
      if (id !== newfeedDetail?.user) {
        await MidNotification.create({
          user: newfeedDetail?.user,
          type: NOTI.LIKE,
          newfeed,
          owner: id
        });
      }
      return await likeModel({ user: id, newfeed }).save();
    } else {
      const status = like.status;
      if (!status && id !== newfeedDetail?.user) {
        await MidNotification.create({
          user: newfeedDetail?.user,
          type: NOTI.LIKE,
          newfeed,
          owner: id
        });
      }
      return await likeModel.findOneAndUpdate(
        { user: id, newfeed },
        { $set: { status: !status } },
        { new: true }
      );
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { create, getAll };
