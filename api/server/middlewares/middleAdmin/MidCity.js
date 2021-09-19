const cityModel = require("../../models/core/cities");
const MidImages = require("./MidImages");
const { limitAndSkip, omit } = require("../../utils/helpers");
const get = require("lodash/get");
const isEmpty = require("lodash/isEmpty");
const { ObjectId } = require("mongodb");
const { STATUS } = require("../../../config/constants");

const getList = async ({ page, limit, search, status }) => {
  try {
    const { start, end, limits } = limitAndSkip(page, limit);
    const querySearch = !search
      ? {}
      : { name: { $regex: `.*${search}.*`, $options: "i" } };
    const queryStatus = !status ? {} : { status: status };
    const cities = await cityModel.aggregate([
      {
        $match: {
          $and: [querySearch, queryStatus]
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
      { $sort: { name: 1 } },
      {
        $facet: {
          results: [{ $skip: start }, { $limit: limits }],
          total: [{ $count: "count" }]
        }
      }
    ]);
    const count = get(cities, "[0].total[0].count", 0);
    return {
      next: end < count,
      count,
      results: get(cities, "[0].results", [])
    };
  } catch (error) {
    throw new Error(error);
  }
};

const getDetail = async _id => {
  try {
    return await cityModel.aggregate([
      { $match: { _id: ObjectId(_id) } },
      {
        $lookup: {
          from: "images",
          localField: "images",
          foreignField: "_id",
          as: "images"
        }
      },
      {
        $lookup: {
          from: "places",
          localField: "_id",
          foreignField: "city",
          as: "places"
        }
      }
    ]);
  } catch (error) {
    throw new Error(error);
  }
};

const create = async (id, data) => {
  try {
    return await cityModel({ ...data }).save();
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (_id, data) => {
  try {
    const images = get(data, "images", []);
    if (isEmpty(images)) {
      return await cityModel.findOneAndUpdate(
        { _id },
        { $set: { ...data } },
        { new: true }
      );
    }
    const newImages = await MidImages.add(images);
    const newImagesId = newImages.map(item => item._id);
    return await cityModel.findOneAndUpdate(
      { _id },
      { $push: { images: newImagesId }, $set: { ...omit(data, ["images"]) } },
      { new: true }
    );
  } catch (error) {
    throw Error(error);
  }
};

const deleteCity = async _id => {
  try {
    return await cityModel.findOneAndUpdate(
      { _id },
      { $set: { status: STATUS.ACTIVE } }
    );
  } catch (error) {
    throw Error(error);
  }
};

module.exports = {
  getList,
  create,
  getDetail,
  deleteCity,
  update
};
