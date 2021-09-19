const cityModel = require("../../models/core/cities");
const MidPlace = require("./MidPlace");
const { limitAndSkip } = require("../../utils/helpers");
const get = require("lodash/get");
const { size } = require("lodash");
const { ObjectId } = require("mongodb");

const getList = async ({ page, limit, name }) => {
  try {
    const { start, end, limits } = limitAndSkip(page, limit);
    const queryName = !name
      ? {}
      : { name: { $regex: `.*${name}.*`, $options: "i" } };
    const cities = await cityModel.aggregate([
      {
        $match: { $or: [queryName] }
      },
      { $sort: { name: 1 } },
      {
        $facet: {
          results: [{ $skip: start }, { $limit: limits }],
          total: [{ $count: "count" }]
        }
      }
    ]);
    // const count = get(national, "[0].total[0].count", 0);
    return get(cities, "[0].results", []);
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

const getDetail = async _id => {
  try {
    // return await cityModel.findOne({ _id });
    let city = await cityModel.aggregate([
      { $match: { _id: ObjectId(_id) } },
      {
        $lookup: {
          from: "images",
          localField: "images",
          foreignField: "_id",
          as: "img"
        }
      }
    ]);
    return get(city, "[0]", {});
  } catch (error) {
    console.log("error,0", error);
    throw Error(error);
  }
};

const getPlaceOfCity = (places, _id) => {
  return places.filter(item => _id.equals(item?.city));
};

const getPopular = async ({ page, limit }) => {
  try {
    const listCity = await getList({ page: 1, limit: 2000 });
    const places = await MidPlace.getList({ page: 1, limit: 20000 });
    const { resultCity } = listCity.reduce(
      (result, quote) => {
        const currentQuote = {
          ...quote,
          countPlace: size(getPlaceOfCity(places, quote._id))
        };
        result.resultCity.push(currentQuote);
        return result;
      },
      {
        resultCity: []
      }
    );

    return resultCity.sort((a, b) => b.countPlace - a.countPlace);
  } catch (error) {
    throw Error(error);
  }
};

module.exports = {
  getList,
  create,
  getDetail,
  getPopular
};
