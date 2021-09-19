const commentModel = require("../../models/core/comments");
const userModel = require("../../models/core/users");

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
const getList = async newfeed_id => {
  try {
    const users = await userModel.find();
    const commentList = await commentModel.find({
      newfeed: newfeed_id
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

const update = async ({ _id, content, status }) => {
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

module.exports = { getList, update };
