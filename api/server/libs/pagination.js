const { PAGINATION } = require("../../config/constants");

const pagination = (model, params) => {
  const page = parseInt(params.page) || PAGINATION.DEFAULT_PAGE;
  const limit = parseInt(params.limit) || PAGINATION.DEFAULT_LIMIT;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  return Promise.all([
    Promise.resolve(model.countDocuments().exec()),
    Promise.resolve(model.find().limit(limit).skip(startIndex).exec())
  ]).then(([count, results]) => ({
    next: endIndex < count,
    count,
    results
  }));
};

module.exports = pagination;
