const express = require("express");
const NewfeedController = require("../../controllers/customer/NewfeedController");
const router = express.Router();

/**
 * @swagger
 * definitions:
 *  CreateNewfeed:
 *    type: object
 *    properties:
 *      content:
 *        type: string
 *        example: Thưởng thức gói trà chiều và tự do tham quan, chụp ảnh tại Legacy Yên Tử - MGallery (5*) công trình tĩnh dưỡng cao cấp được thiết kế như một cung điện cổ thời Trần bởi kiến trúc sư tài ba thế giới Bill Bensley. Tại đây du khách như được đắm mình trong không gian xưa từ hàng ngàn năm trước của nước Đại Việt cổ.
 *      place:
 *        type: string
 *        example: 5GHXdGWyqBS00JSRMM3b8cgkfSj2
 *      city:
 *        type: string
 *        example: 5GHXdGWyqBS00JSRMM3b8cgkfSj2
 *      images:
 *        type: array
 *        items:
 *          type: object
 *          properties:
 *            url:
 *              type: string
 *              example: https://image
 *            type:
 *              type: string
 *              example: image
 *
 *  UpdateNewfeed:
 *    type: object
 *    properties:
 *      content:
 *        type: string
 *        example: Thưởng thức gói trà chiều và tự do tham quan, chụp ảnh tại Legacy Yên Tử - MGallery (5*) công trình tĩnh dưỡng cao cấp được thiết kế như một cung điện cổ thời Trần bởi kiến trúc sư tài ba thế giới Bill Bensley. Tại đây du khách như được đắm mình trong không gian xưa từ hàng ngàn năm trước của nước Đại Việt cổ.
 *      place:
 *        type: string
 *        example: 5GHXdGWyqBS00JSRMM3b8cgkfSj2
 */

/**
 * @swagger
 * /customer/newfeed:
 *  get:
 *    description: Get list newfeed
 *    tags: ["customer/newfeed"]
 *    parameters:
 *    - name: page
 *      in: query
 *      schema:
 *       type: integer
 *    - name: limit
 *      in: query
 *      schema:
 *        type: interger
 *    - name: search
 *      in: query
 *      schema:
 *       type: string
 *    - name: placeId
 *      in: query
 *      schema:
 *       type: interger
 *    - name: cityId
 *      in: query
 *      schema:
 *       type: interger
 *    responses:
 *      200:
 *        description: Success
 *
 */
router.get("/", NewfeedController.getList);

/**
 * @swagger
 * /customer/newfeed/create:
 *  post:
 *    description: Create Newfeed
 *    tags: ["customer/newfeed"]
 *    parameters:
 *    - name: model
 *      in: body
 *      schema:
 *        $ref: '#/definitions/CreateNewfeed'
 *    responses:
 *      201:
 *        description: Success
 */
router.post("/create", NewfeedController.create);

/**
 * @swagger
 * /customer/newfeed/update:
 *  post:
 *    description: Update Newfeed
 *    tags: ["customer/newfeed"]
 *    parameters:
 *    - name: model
 *      in: body
 *      schema:
 *        $ref: '#/definitions/UpdateNewfeed'
 *    responses:
 *      201:
 *        description: Success
 */
router.post("/update", NewfeedController.update);

/**
 * @swagger
 * /customer/newfeed/{id}:
 *  get:
 *    description: Get newfeed detail
 *    tags: ["customer/newfeed"]
 *    parameters:
 *    - name: id
 *      in: path
 *      type: string
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 *
 */
router.get("/:id", NewfeedController.getDetail);

/**
 * @swagger
 * /customer/newfeed/{id}:
 *  delete:
 *    description: Customer delete owner newfeed
 *    tags: ["customer/newfeed"]
 *    parameters:
 *    - name: id
 *      in: path
 *      type: string
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 */
router.delete("/:id", NewfeedController.deleteNewfeed);

module.exports = router;
