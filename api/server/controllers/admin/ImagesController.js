"use strict";

const MidImages = require("../../middlewares/middleAdmin/MidImages");

const deleteImages = (req, res) =>
  MidImages.deleteImages(req.params.id)
    .then(data =>
      res.success({
        data
      })
    )
    .catch(err => res.error(err));

module.exports = {
  deleteImages
};
