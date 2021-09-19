const notificationModel = require("../../models/core/notifications");
const { limitAndSkip, omit } = require("../../utils/helpers");
const get = require("lodash/get");
const { NOTI, MESSAGE } = require("../../../config/constants");
const { size } = require("lodash");
const {
  sendNotification,
  sendNotificationMultiple
} = require("../../utils/sendNotification");
const MidUser = require("./MidUser");

const getList = async (_id, { page, limit }) => {
  try {
    const { start, end, limits } = limitAndSkip(page, limit);
    const notificationResult = await notificationModel.aggregate([
      {
        $match: {
          $and: [{ user: _id }]
        }
      },
      { $sort: { created_at: -1 } },
      {
        $facet: {
          results: [{ $skip: start }, { $limit: limits }]
        }
      }
    ]);
    return get(notificationResult, "[0].results", []);
  } catch (error) {
    throw new Error(error);
  }
};

const create = async data => {
  try {
    const { type, user, id, owner } = data;
    const userProfile = await MidUser.getUserProfileById(user);
    const ownerProfile = await MidUser.getUserProfileById(owner);
    let title = "Thông báo";
    let content = "";
    switch (type) {
      case NOTI.LIKE:
        sendNotification(
          userProfile?.fcm_token,
          type,
          "Thông báo",
          MESSAGE.like(ownerProfile.name),
          id
        );
        content = MESSAGE.like(ownerProfile.name);
        break;
      case NOTI.COMMENT:
        sendNotification(
          userProfile?.fcm_token,
          type,
          "Thông báo ",
          MESSAGE.comment(ownerProfile.name),
          id
        );
        content = MESSAGE.comment(ownerProfile.name);
        break;
      case NOTI.POST:
        sendNotificationMultiple(
          user,
          type,
          "Thông báo",
          MESSAGE.post(ownerProfile.name),
          id
        );
        content = MESSAGE.post(ownerProfile.name);
        break;
      default:
        break;
    }
    return await notificationModel({ ...data, title, content }).save();
  } catch (error) {
    throw new Error(error);
  }
};

const seen = async (user, { _id, type }) => {
  try {
    if (type === "all") {
      return await notificationModel.updateMany(
        { user },
        { $set: { is_seen: true } },
        { new: true }
      );
    }
    return await notificationModel.updateOne(
      { _id },
      { $set: { is_seen: true } },
      { new: true }
    );
  } catch (error) {
    throw new Error(error);
  }
};

const countUnseen = async _id => {
  try {
    const list = await notificationModel.find({
      is_seen: false,
      user: _id
    });
    return size(list);
  } catch (error) {
    console.log("count unseen", error);
    throw new Error(error);
  }
};

module.exports = { getList, create, seen, countUnseen };
