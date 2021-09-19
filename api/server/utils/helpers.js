const {
  PAGINATION: { DEFAULT_LIMIT, DEFAULT_PAGE }
} = require("../../config/constants");

const limitAndSkip = (page, limit) => {
  const pages = parseInt(page) || DEFAULT_PAGE;
  const limits = parseInt(limit) || DEFAULT_LIMIT;
  const start = (pages - 1) * limits;
  const end = pages * limits;
  return { start, end, limits };
};

const omit = (obj, fields) => {
  // eslint-disable-next-line prefer-object-spread
  const shallowCopy = Object.assign({}, obj);
  for (let i = 0; i < fields.length; i += 1) {
    const key = fields[i];
    delete shallowCopy[key];
  }
  return shallowCopy;
};

module.exports = { limitAndSkip, omit };
