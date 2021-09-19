const express = require("express");
const router = express.Router();
const LocationController = require("../../controllers/api/LocationController");

/**
 * @swagger
 * /public/location/province:
 *  get:
 *    description: Get province
 *    tags: ["public/location"]
 *    responses:
 *      200:
 *        descriptions: Success
 */
router.get("/province", LocationController.province);

/**
 * @swagger
 * /public/location/province/{province_id}/district/:
 *  get:
 *    description: Get district
 *    tags: ["public/location"]
 *    parameters:
 *    - name: province_id
 *      type: string
 *      in: path
 *    responses:
 *      200:
 *        descriptions: Success
 */
router.get("/province/:province_id/district", LocationController.district);

/**
 * @swagger
 * /public/location/province/{province_id}/district/{district_id}/ward:
 *  get:
 *    description: Get district
 *    tags: ["public/location"]
 *    parameters:
 *    - name: province_id
 *      type: string
 *      in: path
 *    - name: district_id
 *      type: string
 *      in: path
 *    responses:
 *      200:
 *        descriptions: Success
 */
router.get(
  "/province/:province_id/district/:district_id/ward",
  LocationController.ward
);

module.exports = router;
