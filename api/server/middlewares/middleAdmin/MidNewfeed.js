const newfeedModel = require("../../models/core/new_feed");
const { limitAndSkip } = require("../../utils/helpers");
const { ObjectId } = require("mongodb");
const get = require("lodash/get");
const moment = require("moment");

const aggregateNewsFeed = () => {
  return [
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
        from: "images",
        localField: "images",
        foreignField: "_id",
        as: "images"
      }
    }
  ];
};

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
    const queryStatus = !status ? {} : { status };
    const querySearch = !search
      ? {}
      : { content: { $regex: `.*${search}.*`, $options: "i" } };
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
    const aggregate = aggregateNewsFeed();

    const newfeedList = await newfeedModel.aggregate([
      {
        $match: {
          $and: [querySearch, queryStatus, queryDate]
        }
      },
      ...aggregate,
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

const getDetail = async _id => {
  try {
    const aggregate = aggregateNewsFeed();

    return await newfeedModel.aggregate([
      { $match: { _id: ObjectId(_id) } },
      ...aggregate
    ]);
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (_id, data) => {
  try {
    const aggregate = aggregateNewsFeed();
    await newfeedModel.findOneAndUpdate(
      { _id },
      { $set: { ...data } },
      { new: true }
    );
    return await newfeedModel.aggregate([
      { $match: { _id: ObjectId(_id) } },
      ...aggregate
    ]);
  } catch (error) {
    throw Error(error);
  }
};

const create = async data => {
  try {
    return await newfeedModel(data).save();
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getList,
  getDetail,
  update,
  create
};
