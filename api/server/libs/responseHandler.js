/* eslint-disable no-param-reassign */
module.exports = (req, res, next) => {
  /*
   * Error data: {
   *   message: ""
   * }
   */
  res.error = (error, statusCode = 400) =>
    res.status(statusCode).send(error instanceof Error ? error.message : error);

  /*
   * Success data: {
   *   data: Object
   * }
   */
  res.success = (data, statusCode = 200) => res.status(statusCode).json(data);

  next();
};
