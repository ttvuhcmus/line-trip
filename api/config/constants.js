const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10
};

const HTTP_STATUS = {
  SUCCESS_CREATING: 201,
  SUCCESS: 200,
  ERROR_SYSTEM: 500,
  ERROR_NOT_FOUND: 400,
  METHOD_NOT_ALLOWED: 405,
  UNPROCESSABLE_ENTITY: 402,
  PERMISSION_DENIED: 403
};

const CODE_STATUS = {
  NOT_EXIST_FIREBASE: {
    code: 1000,
    message: "This account doesn't exist on Firebase"
  },
  LOGIN_SUCCESS: { code: 1001, message: "Login success" },
  LOGIN_FAILED: { code: 1002, message: "Login failed" },
  GET_PROFILE_SUCCESS: { code: 1003, message: "Get user profile success" },
  GET_PROFILE_FAILED: { code: 1004, message: "Get user profile failed" },
  PERMISSION_DENIED: { code: 1005, message: "Permission deniel" },
  UPDATE_PROFILE: { code: 1006, message: "Update profile success" },
  NOT_EXIST_ACCOUNT: { code: 1007, message: "Account doesn't exist" },
  SUCCESS: { code: 1, message: "Success" }
};

const LOCATION_TYPE = {
  province: "province",
  district: "district",
  ward: "ward"
};

const STATUS = {
  DELETE: "delete",
  DRAFT: "draft",
  ACTIVE: "active",
  BLOCK: "block"
};

const PLACE_TYPE = {
  LANDSCAPE: "landscape",
  CULTURE: "culture",
  CUISINE: "cuisine"
};

const NOTI = {
  LIKE: "like",
  COMMENT: "comment",
  POST: "post"
};

const MESSAGE = {
  like: name => `${name} đã thích bài viết của bạn`,
  comment: name => `${name} đã bình luận về bài viết của bạn`,
  post: name => `${name} đã thêm một bài viết mới`
};
module.exports = {
  PAGINATION,
  HTTP_STATUS,
  CODE_STATUS,
  LOCATION_TYPE,
  STATUS,
  PLACE_TYPE,
  NOTI,
  MESSAGE
};
