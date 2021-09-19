const commentModel = require("../../models/core/comments");
const newfeedModel = require("../../models/core/new_feed");
const userModel = require("../../models/core/users");
const MidNotification = require("./MidNotification");
const get = require("lodash/get");
const { size, result } = require("lodash");
const { NOTI } = require("../../../config/constants");

const create = async (id, data) => {
  try {
    const newfeedDetail = await newfeedModel.findOne({ _id: data?.newfeed });
    const comment = await commentModel({ user: id, ...data }).save();
    if (id !== newfeedDetail?.user) {
      await MidNotification.create({
        user: newfeedDetail?.user,
        type: NOTI.COMMENT,
        newfeed: data?.newfeed,
        owner: id
      });
    }
    return comment;
  } catch (error) {
    throw new Error(error);
  }
};

const getMatchCommentLv2 = (id, list) =>
  list.filter(item => id.equals(item?.parent_level));

const getCurrentUser = (list, user) => {
  const { currentUser } = list.reduce(
    (_result, quote) => {
      if (user === quote._id) {
        _result.currentUser.push({
          name: quote.name,
          avatar: quote.avatar,
          _id: quote._id
        });
      }
      return _result;
    },
    { currentUser: [] }
  );
  return currentUser[0];
};
const getList = async (id, newfeed_id) => {
  try {
    const users = await userModel.find();
    const commentList = await commentModel.find({
      newfeed: newfeed_id,
      status: true
    });
    const { commentLv1, commentLv2 } = commentList.reduce(
      (result, quote, key) => {
        const currentUser = getCurrentUser(users, quote.user);
        if (!quote.parent_level) {
          result.commentLv1.push({ ...quote._doc, user: currentUser });
        } else {
          result.commentLv2.push({ ...quote._doc, user: currentUser });
        }
        return result;
      },
      {
        commentLv1: [],
        commentLv2: []
      }
    );

    const { commentResult } = commentLv1.reduce(
      (result, quote, _key) => {
        result.commentResult.push({
          ...quote,
          reply: getMatchCommentLv2(quote._id, commentLv2)
        });
        return result;
      },
      {
        commentResult: []
      }
    );
    return { commentResult };
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (_, { _id, content, status }) => {
  try {
    const result = await commentModel.findOneAndUpdate(
      { _id },
      { $set: { content, status } },
      { new: true }
    );
    if (!status && result?.parent_level === null) {
      await commentModel.updateMany(
        { parent_level: _id },
        { $set: { status: false } }
      );
    }
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const totalComment = async newfeed_id => {
  try {
    const commentList = await commentModel.find({
      newfeed: newfeed_id,
      status: true
    });
    console.log("comm: ", commentList);
    return size(commentList);
  } catch (error) {
    throw new Error(error);
  }
};

const totalCommentAll = (list, id) => {
  const { total } = list.reduce(
    (result, quote) => {
      if (quote?.newfeed?.equals(id) && quote.status) {
        result.total.push(quote);
      }
      return result;
    },
    { total: [] }
  );
  return size(total);
};

const getAll = async () => {
  try {
    return await commentModel.find();
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = {
  create,
  getList,
  update,
  totalComment,
  totalCommentAll,
  getAll
};
