const placeModel = require("../../models/core/places");
const reviewModel = require("../../models/core/reviews");
const { limitAndSkip } = require("../../utils/helpers");
const get = require("lodash/get");
const { STATUS } = require("../../../config/constants");
const { ObjectId } = require("mongodb");
const favorites = require("../../models/core/favorite");
const cityModel = require("../../models/core/cities");

const getList = async ({ page, limit, cityId, type, search }) => {
  try {
    const { start, end, limits } = limitAndSkip(page, limit);
    const queryCity = !cityId ? {} : { city: ObjectId(cityId) };
    const queryType = !type ? {} : { type };
    const querySearch = !search
      ? {}
      : { name: { $regex: `.*${search}.*`, $options: "i" } };
    const placeList = await placeModel.aggregate([
      {
        $match: {
          $and: [queryCity, queryType, { status: STATUS.ACTIVE }],
          $or: [querySearch]
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
    return get(placeList, "[0].results", []);
  } catch (error) {
    throw new Error(error);
  }
};

const getDetail = async _id => {
  try {
    let place = await placeModel.aggregate([
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
          from: "cities",
          localField: "city",
          foreignField: "_id",
          as: "city"
        }
      }
    ]);
    return get(place, "[0]", {});
  } catch (error) {
    throw new Error(error);
  }
};

const getListTopRate = async ({ page, limit, cityId, type, search }) => {
  try {
    const { start, end, limits } = limitAndSkip(page, limit);
    const queryCity = !cityId ? {} : { city: ObjectId(cityId) };
    const queryType = !type ? {} : { type };
    const querySearch = !search
      ? {}
      : { name: { $regex: `.*${search}.*`, $options: "i" } };
    const placeList = await placeModel.aggregate([
      {
        $match: {
          $and: [queryCity, queryType, { status: STATUS.ACTIVE }, querySearch]
        }
      },
      { $sort: { total_rate: -1 } },
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
          from: "images",
          localField: "images",
          foreignField: "_id",
          as: "images"
        }
      },
      {
        $facet: {
          results: [{ $skip: start }, { $limit: limits }],
          total: [{ $count: "count" }]
        }
      }
    ]);
    return get(placeList, "[0].results", []);
  } catch (error) {
    throw new Error(error);
  }
};

// const getDetail = async _id => {
//   try {
//     return await placeModel.findOne({ _id });
//   } catch (error) {
//     throw Error(error);
//   }
// };

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
          results: [{ $skip: start }, { $limit: limits }]
        }
      }
    ]);
    const data = get(reviews, "[0].results", []);

    let ratePercent = [];
    const allReview = await reviewModel.find({
      place: placeId,
      status: STATUS.ACTIVE
    });
    for (let i = 5; i >= 1; i--) {
      let totalRate = await reviewModel
        .find({ place: placeId, status: STATUS.ACTIVE, rate: i })
        .count();
      let percent = Math.round((totalRate / allReview.length) * 1000) / 1000;
      ratePercent.push(percent);
    }

    return { ratePercent, ratings: data };
  } catch (error) {
    throw new Error(error);
  }
};

const createReview = async (_id, data) => {
  try {
    const { content, placeId, rate } = data;
    let result = await reviewModel({
      user: _id,
      content,
      place: placeId,
      rate,
      status: STATUS.ACTIVE
    }).save();
    if (result) {
      const reviews = await reviewModel.find({
        place: placeId,
        status: STATUS.ACTIVE
      });
      let rate = 0;
      reviews.forEach(item => {
        rate += item.rate;
      });
      let totalRate = Math.round((rate / reviews.length) * 100) / 100;
      await placeModel.findOneAndUpdate(
        { _id: placeId },
        { $set: { total_rate: totalRate } }
      );
    }
    return result;
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

const getByCityId = async _id => {
  try {
    return await placeModel.find({ city: _id });
  } catch (error) {
    throw new Error(error);
  }
};

const addToFavorite = async (_id, data) => {
  try {
    const { placeId, cityId } = data;
    let result = await favorites({
      user: _id,
      place: placeId,
      city: cityId
    }).save();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const removeFavorite = async (_id, data) => {
  try {
    const { placeId } = data;
    return await favorites.findOneAndDelete({ user: _id, place: placeId });
  } catch (error) {
    throw new Error(error);
  }
};

const checkFavorite = async (_id, data) => {
  try {
    const { placeId } = data;

    return favorites.findOne({ user: _id, place: ObjectId(placeId) });
  } catch (error) {
    console.log("Check palce id", error);
    throw new Error(error);
  }
};

const getListFavorite = async (_id, { page, limit }) => {
  try {
    const { start, end, limits } = limitAndSkip(page, limit);
    const favo = await favorites.aggregate([
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
        $match: { $and: [{ user: _id }] }
      },
      { $sort: { created_at: -1 } },
      {
        $facet: {
          results: [{ $skip: start }, { $limit: limits }]
        }
      }
    ]);
    return await get(favo, "[0].results", []);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getList,
  getDetail,
  getPlaceReview,
  createReview,
  deleteReview,
  getListTopRate,
  getByCityId,
  getListFavorite,
  addToFavorite,
  removeFavorite,
  checkFavorite
};
