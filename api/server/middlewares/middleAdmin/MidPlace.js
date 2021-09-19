const placeModel = require("../../models/core/places");
const reviewModel = require("../../models/core/reviews");
const MidImages = require("../../middlewares/middleAdmin/MidImages");
const { limitAndSkip, omit } = require("../../utils/helpers");
const get = require("lodash/get");
const { isEmpty } = require("lodash");
const { STATUS } = require("../../../config/constants");
const { ObjectId } = require("mongodb");

const getList = async ({ page, limit, status, cityId, search, type }) => {
  try {
    const { start, end, limits } = limitAndSkip(page, limit);
    const queryCity = !cityId ? {} : { city: ObjectId(cityId) };
    const queryType = !type ? {} : { type };
    const queryStatus = !status ? {} : { status };
    const querySearch = !search
      ? {}
      : { name: { $regex: `.*${search}.*`, $options: "i" } };
    const places = await placeModel.aggregate([
      {
        $match: {
          $and: [queryCity, queryType, querySearch, queryStatus]
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
          results: [{ $skip: start }, { $limit: limits }],
          total: [{ $count: "count" }]
        }
      }
    ]);
    const count = get(places, "[0].total[0].count", 0);
    return {
      next: end < count,
      count,
      results: get(places, "[0].results", [])
    };
  } catch (error) {
    throw new Error(error);
  }
};

const getDetail = async _id => {
  try {
    return await placeModel.aggregate([
      { $match: { _id: ObjectId(_id) } },
      {
        $lookup: {
          from: "images",
          localField: "images",
          foreignField: "_id",
          as: "images"
        }
      }
    ]);
  } catch (error) {
    throw new Error(error);
  }
};

const create = async data => {
  try {
    return await placeModel({ ...data }).save();
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (_id, data) => {
  try {
    const images = get(data, "images", []);
    if (isEmpty(images)) {
      return await placeModel.findOneAndUpdate(
        { _id },
        { $set: { ...data } },
        { new: true }
      );
    }
    const newImages = await MidImages.add(images);
    const newImagesId = newImages.map(item => item._id);
    return await placeModel.findOneAndUpdate(
      { _id },
      { $push: { images: newImagesId }, $set: { ...omit(data, ["images"]) } },
      { new: true }
    );
  } catch (error) {
    throw Error(error);
  }
};

const deletePlace = async _id => {
  try {
    return await placeModel.findOneAndUpdate(
      { _id },
      { $set: { status: STATUS.DELETE } }
    );
  } catch (error) {
    throw Error(error);
  }
};

const getPlaceReview = async ({ page, limit, placeId }) => {
  try {
    const { start, end, limits } = limitAndSkip(page, limit);
    const reviews = await reviewModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $match: { $and: [{ place: placeId }, { status: STATUS.ACTIVE }] }
      },
      { $sort: { created_at: -1 } },
      {
        $facet: {
          results: [{ $skip: start }, { $limit: limits }],
          total: [{ $count: "count" }]
        }
      }
    ]);
    const count = get(reviews, "[0].total[0].count", 0);
    return {
      next: end < count,
      count,
      results: get(reviews, "[0].results", [])
    };
  } catch (error) {
    throw new Error(error);
  }
};

const deleteReview = async data => {
  try {
    const { id } = data;
    return await reviewModel.findOneAndDelete({ id });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getList,
  create,
  update,
  getDetail,
  deletePlace,
  getPlaceReview,
  deleteReview
};
