"use strict";

const MidLocation = require("../../middlewares/middleApi/MidLocation");

const province = (req, res) => {
  MidLocation.province()
    .then(data => {
      res.success({ data });
    })
    .catch(error => res.error(error));
};

const district = (req, res) => {
  MidLocation.district(req.params)
    .then(data => {
      res.success({ data });
    })
    .catch(error => res.error(error));
};

const ward = (req, res) => {
  MidLocation.ward(req.params)
    .then(data => {
      res.success({ data });
    })
    .catch(error => res.error(error));
};

module.exports = {
  province,
  district,
  ward
};
