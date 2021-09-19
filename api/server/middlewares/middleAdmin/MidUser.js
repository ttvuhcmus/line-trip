const userModel = require("../../models/core/users");
const { limitAndSkip } = require("../../utils/helpers");
const get = require("lodash/get");
const { STATUS } = require("../../../config/constants");

const getList = async ({ page, limit, status, search }) => {
  try {
    const { start, end, limits } = limitAndSkip(page, limit);
    const queryStatus = !status ? {} : { status };
    const querySearch = !search
      ? {}
      : { name: { $regex: `.*${search}.*`, $options: "i" } };
    const listUser = await userModel.aggregate([
      {
        $match: {
          $and: [querySearch, queryStatus]
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
    const count = get(listUser, "[0].total[0].count", 0);
    return {
      next: end < count,
      count,
      results: get(listUser, "[0].results", [])
    };
  } catch (error) {
    throw new Error(error);
  }
};

const getDetail = async _id => {
  try {
    return await userModel.findOne({ _id });
  } catch (error) {
    throw Error(error);
  }
};

const update = async (_id, data) => {
  try {
    return await userModel.findOneAndUpdate({ _id }, { $set: { ...data } });
  } catch (error) {
    throw Error(error);
  }
};

const deleteUser = async (_id, data) => {
  try {
    return await userModel.findOneAndUpdate(
      { _id },
      { $set: { status: STATUS.ACTIVE } }
    );
  } catch (error) {
    throw Error(error);
  }
};

module.exports = {
  getList,
  getDetail,
  update,
  deleteUser
};
