const express = require("express");
const BannerController = require("../../controllers/customer/BannerController");
const router = express.Router();

/**
 * @swagger
 * definitions:
 *  CreateBanner:
 *    type: object
 *    properties:
 *      path:
 *        type: string
 *        example: https://example.png.
 *      type:
 *        type: string
 *        example: 'Admob'
 */

/**
 * @swagger
 * /customer/banner:
 *  get:
 *    description: Get list banner
 *    tags: ["customer/banner"]
 *    parameters:
 *    responses:
 *      200:
 *        description: Success
 *
 */
router.get("/", BannerController.getList);

/**
 * @swagger
 * /customer/banner/create:
 *  post:
 *    description: Create banner
 *    tags: ["customer/banner"]
 *    parameters:
 *    - name: model
 *      in: body
 *      schema:
 *        $ref: '#/definitions/CreateBanner'
 *    responses:
 *      200:
 *        description: Success
 *
 */
router.post("/create", BannerController.create);

module.exports = router;
