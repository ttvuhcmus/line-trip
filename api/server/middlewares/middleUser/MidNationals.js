const nationalModel = require("../../models/core/national");
const { limitAndSkip } = require("../../utils/helpers");
const get = require("lodash/get");

const getList = async ({ page, limit, search }) => {
  try {
    const { start, end, limits } = limitAndSkip(page, limit);
    const national = await nationalModel.aggregate([
      {
        $match: { name: { $regex: `.*${search}.*` } }
      },
      { $sort: { name: 1 } },
      {
        $facet: {
          results: [{ $skip: start }, { $limit: limits }],
          total: [{ $count: "count" }]
        }
      }
    ]);
    return get(national, "[0].results", []);
  } catch (error) {
    throw new Error(error);
  }
};

const create = async data => {
  try {
    const { name, code } = data;
    return await nationalModel({ name, code }).save();
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getList,
  create
};
