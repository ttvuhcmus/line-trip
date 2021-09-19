const imagesModel = require("../../models/core/images");

const add = async listImages => {
  try {
    return await imagesModel.insertMany(listImages);
  } catch (error) {
    throw new Error(error);
  }
};

const deleteImages = async _id => {
  try {
    return await imagesModel.deleteOne({ _id });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  add,
  deleteImages
};
