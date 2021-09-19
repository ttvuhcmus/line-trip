const newfeedModel = require("../../models/core/new_feed");
const MidImages = require("../../middlewares/middleUser/MidImages");
const MidLikes = require("../../middlewares/middleUser/MidLike");
const MidComment = require("../../middlewares/middleUser/MidComment");
const { limitAndSkip, omit } = require("../../utils/helpers");
const get = require("lodash/get");
const { STATUS, NOTI } = require("../../../config/constants");
const { ObjectId } = require("mongodb");
const { isEmpty } = require("lodash");
const MidFollow = require("./MidFollow");
const MidNotification = require("./MidNotification");
const isUserLiked = (newfeed, likes, user_id) => {
  return likes.reduce(
    (result, item) => {
      if (
        newfeed.equals(item.newfeed) &&
        item.status &&
        user_id === item.user
      ) {
        result.liked = true;
      }
      if (newfeed.equals(item.newfeed) && item.status) {
        result.total_like += 1;
      }
      return result;
    },
    {
      liked: null,
      total_like: 0
    }
  );
};

const getList = async (
  user_id,
  { page, limit, search, placeId, cityId, userId }
) => {
  try {
    const { start, limits } = limitAndSkip(page, limit);
    const querySearch = !search
      ? {}
      : { content: { $regex: `.*${search}.*`, $options: "i" } };
    const queryCity = !cityId ? {} : { city: cityId };
    const queryPlace = !placeId ? {} : { place: placeId };
    const queryUser = !userId ? {} : { user: userId };
    const newfeedList = await newfeedModel.aggregate([
      {
        $match: {
          $and: [
            { status: STATUS.ACTIVE },
            queryCity,
            queryPlace,
            querySearch,
            queryUser
          ]
        }
      },
      {
        $lookup: {
          from: "places",
          localField: "place",
          foreignField: "_id",
          as: "place"
        }
      },
      {
        $lookup: {
          from: "cities",
          localField: "city",
          foreignField: "_id",
          as: "city"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $lookup: {
          from: "images",
          localField: "images",
          foreignField: "_id",
          as: "images"
        }
      },
      { $sort: { created_at: -1 } },
      {
        $facet: {
          results: [{ $skip: start }, { $limit: limits }]
        }
      }
    ]);

    const newfeeds = get(newfeedList, "[0].results", []);
    const likes = await MidLikes.getAll();
    const listCommentAll = await MidComment.getAll();
    const { newfeedResult } = newfeeds.reduce(
      (result, quote) => {
        const { total_like, liked } = isUserLiked(quote._id, likes, user_id);
        const total_comment = MidComment.totalCommentAll(
          listCommentAll,
          quote._id
        );
        if (liked) {
          result.newfeedResult.push({
            ...quote,
            liked: true,
            total_like,
            total_comment
          });
        } else {
          result.newfeedResult.push({
            ...quote,
            liked: false,
            total_like,
            total_comment
          });
        }
        return result;
      },
      { newfeedResult: [] }
    );
    return newfeedResult;
  } catch (error) {
    throw new Error(error);
  }
};

const create = async (_id, data) => {
  try {
    const { content, place, city } = data;
    const images = get(data, "images", []);
    const newImages = await MidImages.add(images);
    const newImagesId = newImages.map(item => item._id);
    const newfeed = await newfeedModel({
      user: _id,
      content: content,
      place: place,
      city: city,
      status: STATUS.ACTIVE,
      images: newImagesId,
      total_like: 0,
      total_comment: 0
    }).save();
    const listUser = await MidFollow.getListFollowed(_id);
    // const { listFcmToken } = listUser.reduce(
    //   (result, quote) => {
    //     result.listFcmToken.push(quote?.follow_by[0].fcm_token);
    //     return result;
    //   },
    //   {
    //     listFcmToken: []
    //   }
    // );
    listUser.forEach(async e => {
      await MidNotification.create({
        user: e.follow_by,
        type: NOTI.POST,
        newfeed: newfeed._id,
        owner: _id
      });
    });
    return newfeed;
  } catch (error) {
    console.log("error", error);
    throw new Error(error);
  }
};

const update = async (_id, data) => {
  try {
    const { content, place, city, id } = data;
    const images = get(data, "images", []);
    const deleteImages = get(data, "deleteImages", []);
    if (isEmpty(images) && isEmpty(deleteImages)) {
      return await newfeedModel.findOneAndUpdate(
        { _id: id },
        { $set: { city, content, place } },
        { new: true }
      );
    }
    let result = null;
    if (!isEmpty(deleteImages)) {
      deleteImages.forEach(async (element, index) => {
        await newfeedModel.findOneAndUpdate(
          { _id: id },
          {
            $pull: { images: element },
            $set: { ...omit({ city, content, place }, ["images"]) }
          },
          { new: true }
        );
      });
    }
    if (!isEmpty(images)) {
      const newImages = await MidImages.add(images);
      const newImagesId = newImages.map(item => item._id);
      result = await newfeedModel.findOneAndUpdate(
        { _id: id },
        {
          $push: { images: newImagesId },
          $set: { ...omit({ city, content, place }, ["images"]) }
        },
        { new: true }
      );
    }
    return result;
  } catch (error) {
    console.log("error", error);
    throw new Error(error);
  }
};

const getDetail = async (user_id, _id) => {
  try {
    let newFeed = await newfeedModel.aggregate([
      { $match: { $and: [{ status: STATUS.ACTIVE }, { _id: ObjectId(_id) }] } },
      {
        $lookup: {
          from: "places",
          localField: "place",
          foreignField: "_id",
          as: "place"
        }
      },
      {
        $lookup: {
          from: "cities",
          localField: "city",
          foreignField: "_id",
          as: "city"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $lookup: {
          from: "images",
          localField: "images",
          foreignField: "_id",
          as: "images"
        }
      }
    ]);
    const likes = await MidLikes.getAll();
    const total_comment = await MidComment.totalComment(_id);
    const newfeed = get(newFeed, "[0]", {});
    const { total_like, liked } = isUserLiked(newfeed._id, likes, user_id);
    if (liked) {
      return { ...newfeed, liked: true, total_like, total_comment };
    }
    return { ...newfeed, liked: false, total_like, total_comment };
  } catch (error) {
    console.log("error", error);
    throw new Error(error);
  }
};

const getNewfeedById = async _id => {
  try {
    return await newfeedModel.findOne({ _id });
  } catch (error) {
    throw new Error(error);
  }
};

const deleteNewfeed = async _id => {
  try {
    return await newfeedModel.findOneAndUpdate(
      { _id },
      { $set: { status: STATUS.DELETE } }
    );
  } catch (error) {
    throw Error(error);
  }
};

module.exports = {
  getList,
  create,
  update,
  getDetail,
  deleteNewfeed,
  getNewfeedById
};
