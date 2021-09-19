const express = require("express");
const NewfeedController = require("../../controllers/admin/NewfeedController");
const router = express.Router();

/**
 * @swagger
 * definitions:
 *  CreateNewfeed:
 *    type: object
 *    properties:
 *      user:
 *        type: string
 *        example: 5GHXdGWyqBS00JSRMM3b8cgkfSj2
 *      content:
 *        type: string
 *        example: Thưởng thức gói trà chiều và tự do tham quan, chụp ảnh tại Legacy Yên Tử - MGallery (5*) công trình tĩnh dưỡng cao cấp được thiết kế như một cung điện cổ thời Trần bởi kiến trúc sư tài ba thế giới Bill Bensley. Tại đây du khách như được đắm mình trong không gian xưa từ hàng ngàn năm trước của nước Đại Việt cổ.
 *      place:
 *        type: string
 *        example: 5GHXdGWyqBS00JSRMM3b8cgkfSj2
 *  AdminUpdateNewfeed:
 *    type: object
 *    properties:
 *      user:
 *        type: string
 *        example: 5GHXdGWyqBS00JSRMM3b8cgkfSj2
 *      content:
 *        type: string
 *        example: Thưởng thức gói trà chiều và tự do tham quan, chụp ảnh tại Legacy Yên Tử - MGallery (5*) công trình tĩnh dưỡng cao cấp được thiết kế như một cung điện cổ thời Trần bởi kiến trúc sư tài ba thế giới Bill Bensley. Tại đây du khách như được đắm mình trong không gian xưa từ hàng ngàn năm trước của nước Đại Việt cổ.
 *      place:
 *        type: string
 *        example: 5GHXdGWyqBS00JSRMM3b8cgkfSj2
 */

/**
 * @swagger
 * /admin/newfeed:
 *  get:
 *    description: Get list newfeed
 *    tags: ["admin/newfeed"]
 *    parameters:
 *    - name: page
 *      in: query
 *      schema:
 *       type: integer
 *    - name: limit
 *      in: query
 *      schema:
 *        type: interger
 *    responses:
 *      200:
 *        description: Success
 *
 */
router.get("/", NewfeedController.getList);

/**
 * @swagger
 * /admin/newfeed/{id}:
 *  get:
 *    description: Get Detail news feed
 *    tags: ["admin/newfeed"]
 *    parameters:
 *    - name: id
 *      in: path
 *      type: string
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 */
router.get("/:id", NewfeedController.getDetail);

/**
 * @swagger
 * /admin/newfeed/{id}:
 *  put:
 *    description: Admin Update News feed
 *    tags: ["admin/newfeed"]
 *    parameters:
 *    - name: model
 *      in: body
 *      schema:
 *        $ref: '#/definitions/AdminUpdateNewfeed'
 *    - name: id
 *      in: path
 *      type: string
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 */
router.put("/:id", NewfeedController.update);

/**
 * @swagger
 * /admin/newfeed/create:
 *  post:
 *    description: Create Newfeed
 *    tags: ["admin/newfeed"]
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

module.exports = router;
