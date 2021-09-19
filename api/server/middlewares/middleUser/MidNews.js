const newsModel = require("../../models/core/news");
const { limitAndSkip } = require("../../utils/helpers");
const get = require("lodash/get");
const { STATUS } = require("../../../config/constants");

const getList = async ({ page, limit, search }) => {
  try {
    const { start, end, limits } = limitAndSkip(page, limit);
    const querySearch = !search ? {} : { title: { $regex: `.*${search}.*` } };
    const newfeedList = await newsModel.aggregate([
      {
        $match: {
          $and: [{ status: STATUS.ACTIVE }, querySearch]
        }
      },
      { $sort: { created_at: -1 } },
      {
        $facet: {
          results: [{ $skip: start }, { $limit: limits }]
        }
      }
    ]);
    return get(newfeedList, "[0].results", []);
  } catch (error) {
    throw new Error(error);
  }
};

const getDetail = async _id => {
  try {
    return await newsModel.findOne({ _id });
  } catch (error) {
    throw Error(error);
  }
};

module.exports = { getList, getDetail };
