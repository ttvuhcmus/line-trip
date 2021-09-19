const { CODE_STATUS } = require("../../../config/constants");
const adminModel = require("../../models/core/admins");
const { hashPassword, checkPassword } = require("../../libs/hash");

const getUserProfileByUsername = async username =>
  await adminModel.findOne({ username });

const getUserProfile = async ({ username, password }) =>
  await adminModel.findOne({ username, password });

const checkExistAccountLogin = async ({ username, password }) => {
  const adminProfile = await getUserProfileByUsername(username);
  if (!adminProfile) {
    return null;
  }
  return checkPassword(password, adminProfile.password) ? adminProfile : null;
};

const postLogin = async ({ username, password }) => {
  try {
    const isExistAccount = await checkExistAccountLogin({ username, password });
    if (!isExistAccount) {
      return {
        code: CODE_STATUS.NOT_EXIST_ACCOUNT.code,
        message: CODE_STATUS.NOT_EXIST_ACCOUNT.message
      };
    } else {
      return {
        data: isExistAccount
      };
    }
  } catch (error) {
    return { error };
  }
};

module.exports = {
  getUserProfile,
  getUserProfileByUsername,
  postLogin
};
