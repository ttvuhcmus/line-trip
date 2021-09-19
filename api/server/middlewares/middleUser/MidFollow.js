const { size } = require("lodash");
const followModel = require("../../models/core/follows");

const create = async (id, data) => {
  try {
    const currentFollow = await followModel.findOne({
      follow_by: id,
      follow_to: data?.follow_to
    });
    if (currentFollow) {
      return await followModel.findOneAndUpdate(
        {
          follow_by: id,
          follow_to: data?.follow_to
        },
        {
          $set: { status: !currentFollow?.status }
        },
        { new: true }
      );
    } else return await followModel({ follow_by: id, ...data }).save();
  } catch (error) {
    throw new Error(error);
  }
};

const getList = async id => {
  try {
    const followList = await followModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "follow_to",
          foreignField: "_id",
          as: "follow_to"
        }
      },
      {
        $match: {
          $and: [{ status: true }, { follow_by: id }]
        }
      },
      { $sort: { created_at: -1 } }
    ]);
    return followList;
  } catch (error) {
    throw new Error(error);
  }
};

const getListFollowed = async id => {
  try {
    const followList = await followModel.aggregate([
      {
        $match: {
          $and: [{ status: true }, { follow_to: id }]
        }
      },
      { $sort: { created_at: -1 } }
    ]);
    return followList;
  } catch (error) {
    throw new Error(error);
  }
};

const getById = async (user_id, id) => {
  try {
    const followList = await followModel.findOne({
      status: true,
      follow_to: id,
      follow_by: user_id
    });
    return followList ? { followed: true } : { followed: false };
  } catch (error) {
    throw new Error(error);
  }
};

const totalFollow = async _id => {
  try {
    const followList = await followModel.find({
      status: true,
      follow_to: _id
    });
    return size(followList);
  } catch (error) {
    throw new Error(error);
  }
};

const totalFollowing = async _id => {
  try {
    const followList = await followModel.find({
      status: true,
      follow_by: _id
    });
    return size(followList);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  create,
  getList,
  getById,
  totalFollow,
  getListFollowed,
  totalFollowing
};
