const newsModel = require("../../models/core/news");
const { limitAndSkip } = require("../../utils/helpers");
const get = require("lodash/get");
const { STATUS } = require("../../../config/constants");
const moment = require("moment");

const getList = async ({
  page,
  limit,
  status,
  search,
  start_date,
  end_date
}) => {
  try {
    const { start, end, limits } = limitAndSkip(page, limit);
    const queryStatus = !status ? {} : { status: status };
    const querySearch = !search
      ? {}
      : { title: { $regex: `.*${search}.*`, $options: "i" } };
    const queryDate =
      !start_date && !end_date
        ? {}
        : {
            created_at: {
              ...(start_date && {
                $gte: new Date(moment(start_date, "DD-MM-YYYY"))
              }),
              ...(end_date && {
                $lt: new Date(moment(end_date, "DD-MM-YYYY").add(1, "days"))
              })
            }
          };
    const newfeedList = await newsModel.aggregate([
      {
        $match: {
          $and: [queryStatus, querySearch, queryDate]
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
    const count = get(newfeedList, "[0].total[0].count", 0);
    return {
      next: end < count,
      count,
      results: get(newfeedList, "[0].results", [])
    };
  } catch (error) {
    throw new Error(error);
  }
};

const create = async data => {
  try {
    return await newsModel(data).save();
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (_id, data) => {
  try {
    return await newsModel.findOneAndUpdate({ _id }, { $set: { ...data } });
  } catch (error) {
    throw Error(error);
  }
};

const deleteNews = async _id => {
  try {
    return await newsModel.findOneAndUpdate(
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
  deleteNews
};
