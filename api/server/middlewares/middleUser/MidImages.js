const imagesModel = require("../../models/core/images");

const add = async listImages => {
  try {
    return await imagesModel.insertMany(listImages);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  add
};
