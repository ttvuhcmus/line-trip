"use strict";

const subdivisionModel = require("../../models/core/subdivisions");
const { LOCATION_TYPE } = require("../../../config/constants");

const province = () =>
  subdivisionModel
    .aggregate([
      {
        $group: {
          _id: { province_id: "$province_id", province_name: "$province_name" }
        }
      },
      { $sort: { "_id.province_name": 1 } },
      {
        $project: {
          province_id: "$_id.province_id",
          province_name: "$_id.province_name",
          _id: 0
        }
      }
    ])
    .then(province => {
      const { newProvince } = province.reduce(
        (result, quote) => {
          if (quote.province_id === "01" || quote.province_id === "79") {
            result.newProvince.unshift(quote);
          } else result.newProvince.push(quote);
          return result;
        },
        { newProvince: [] }
      );
      return Promise.resolve(newProvince);
    });

const district = ({ province_id }) =>
  subdivisionModel.aggregate([
    { $match: { province_id } },
    {
      $group: {
        _id: { district_id: "$district_id", district_name: "$district_name" }
      }
    },
    {
      $project: {
        district_id: "$_id.district_id",
        district_name: "$_id.district_name",
        _id: 0
      }
    },
    { $sort: { district_name: 1 } }
  ]);

const ward = ({ province_id, district_id }) =>
  subdivisionModel.aggregate([
    { $match: { province_id, district_id } },
    { $group: { _id: { ward_id: "$ward_id", ward_name: "$ward_name" } } },
    {
      $project: {
        ward_id: "$_id.ward_id",
        ward_name: "$_id.ward_name",
        _id: 0
      }
    },
    { $sort: { ward_name: 1 } }
  ]);

const findLocation = (id, type) => {
  if (type === LOCATION_TYPE.province) {
    return subdivisionModel.findOne({ province_id: id });
  }
  if (type === LOCATION_TYPE.district) {
    return subdivisionModel.findOne({ district_id: id });
  }
  if (type === LOCATION_TYPE.ward) {
    return subdivisionModel.findOne({ ward: ward_id });
  }
};

module.exports = {
  province,
  district,
  ward,
  findLocation
};
