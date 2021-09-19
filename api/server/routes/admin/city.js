const express = require("express");
const CityController = require("../../controllers/admin/CityController");
const router = express.Router();
/**
 * @swagger
 * definitions:
 *  CreateCity:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *        example: Sai Gon
 *      description:
 *        type: string
 *        example: <p>Thưởng thức gói trà chiều và tự do tham quan, chụp ảnh tại Legacy Yên Tử - MGallery (5*) công trình tĩnh dưỡng cao cấp được thiết kế như một cung điện cổ thời Trần bởi kiến trúc sư tài ba thế giới Bill Bensley. Tại đây du khách như được đắm mình trong không gian xưa từ hàng ngàn năm trước của nước Đại Việt cổ</p>
 *      avatar:
 *        type: string
 *        example: http://example.jpg
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
 *  AdminUpdateCity:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *        example: Sai gon
 *      description:
 *        type: string
 *        example: <p>Thưởng thức gói trà chiều và tự do tham quan, chụp ảnh tại Legacy Yên Tử - MGallery (5*) công trình tĩnh dưỡng cao cấp được thiết kế như một cung điện cổ thời Trần bởi kiến trúc sư tài ba thế giới Bill Bensley. Tại đây du khách như được đắm mình trong không gian xưa từ hàng ngàn năm trước của nước Đại Việt cổ</p>
 *      avatar:
 *        type: string
 *        example: http://example.jpg
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
 */

/**
 * @swagger
 * /admin/city:
 *  get:
 *    description: Get list city
 *    tags: ["admin/city"]
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
 *        type: string
 *    - name: status
 *      in: query
 *      schema:
 *        type: String
 *    responses:
 *      200:
 *        description: Success
 *
 */
router.get("/", CityController.getList);

/**
 * @swagger
 * /admin/city/{id}:
 *  get:
 *    description: Get city detail
 *    tags: ["admin/city"]
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
router.get("/:id", CityController.getDetail);

/**
 * @swagger
 * /admin/city:
 *  post:
 *    description: Create city
 *    tags: ["admin/city"]
 *    parameters:
 *    - name: model
 *      in: body
 *      schema:
 *        $ref: '#/definitions/CreateCity'
 *    responses:
 *      201:
 *        description: Success
 */
router.post("/", CityController.create);

/**
 * @swagger
 * /admin/city/{id}:
 *  put:
 *    description: Admin Update city
 *    tags: ["admin/city"]
 *    parameters:
 *    - name: model
 *      in: body
 *      schema:
 *        $ref: '#/definitions/AdminUpdateCity'
 *    - name: id
 *      in: path
 *      type: string
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 */
router.put("/:id", CityController.update);

/**
 * @swagger
 * /admin/city/{id}:
 *  delete:
 *    description: Admin delete city
 *    tags: ["admin/city"]
 *    parameters:
 *    - name: id
 *      in: path
 *      type: string
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 */
router.delete("/:id", CityController.deleteCity);

module.exports = router;
