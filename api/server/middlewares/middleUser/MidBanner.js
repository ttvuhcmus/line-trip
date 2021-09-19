const bannerModel = require("../../models/core/banner");
const { limitAndSkip } = require("../../utils/helpers");
const get = require("lodash/get");
const { STATUS } = require("../../../config/constants");

const getList = async ({ page, limit, name }) => {
  try {
    const { start, end, limits } = limitAndSkip(page, limit);
    const banners = await bannerModel.aggregate([
      {
        $match: { status: STATUS.ACTIVE }
      },
      { $sort: { created_at: -1 } },
      {
        $facet: {
          results: [{ $skip: start }, { $limit: limits }]
        }
      }
    ]);
    return get(banners, "[0].results", []);
  } catch (error) {
    throw new Error(error);
  }
};

const create = async data => {
  try {
    return await bannerModel({ ...data }).save();
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getList,
  create
};
