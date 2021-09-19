const express = require("express");
const NewsController = require("../../controllers/admin/NewsController");
const router = express.Router();

/**
 * @swagger
 * definitions:
 *  CreateNews:
 *    type: object
 *    properties:
 *      title:
 *        type: string
 *        example: bí kíp du lịch Hà Giang
 *      image_url:
 *        type: string
 *        example: https://image_link
 *      content:
 *        type: string
 *        example: Thưởng thức gói trà chiều và tự do tham quan, chụp ảnh tại Legacy Yên Tử - MGallery (5*) công trình tĩnh dưỡng cao cấp được thiết kế như một cung điện cổ thời Trần bởi kiến trúc sư tài ba thế giới Bill Bensley. Tại đây du khách như được đắm mình trong không gian xưa từ hàng ngàn năm trước của nước Đại Việt cổ.
 *  AdminUpdateNews:
 *    type: object
 *    properties:
 *      title:
 *        type: string
 *        example: bí kíp du lịch Hà Giang
 *      image_url:
 *        type: string
 *        example: https://image_link
 *      content:
 *        type: string
 *        example: Thưởng thức gói trà chiều và tự do tham quan, chụp ảnh tại Legacy Yên Tử - MGallery (5*) công trình tĩnh dưỡng cao cấp được thiết kế như một cung điện cổ thời Trần bởi kiến trúc sư tài ba thế giới Bill Bensley. Tại đây du khách như được đắm mình trong không gian xưa từ hàng ngàn năm trước của nước Đại Việt cổ.

 */

/**
 * @swagger
 * /admin/news:
 *  get:
 *    description: Get list News
 *    tags: ["admin/news"]
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
 *    responses:
 *      200:
 *        description: Success
 *
 */
router.get("/", NewsController.getList);

/**
 * @swagger
 * /admin/news:
 *  post:
 *    description: Create News
 *    tags: ["admin/news"]
 *    parameters:
 *    - name: model
 *      in: body
 *      schema:
 *        $ref: '#/definitions/CreateNews'
 *    responses:
 *      201:
 *        description: Success
 */
router.post("/", NewsController.create);

/**
 * @swagger
 * /admin/news/{id}:
 *  put:
 *    description: Admin Update News
 *    tags: ["admin/news"]
 *    parameters:
 *    - name: model
 *      in: body
 *      schema:
 *        $ref: '#/definitions/AdminUpdateNews'
 *    - name: id
 *      in: path
 *      type: string
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 */
router.put("/:id", NewsController.update);

/**
 * @swagger
 * /admin/news/{id}:
 *  delete:
 *    description: Admin Update News
 *    tags: ["admin/news"]
 *    parameters:
 *    - name: id
 *      in: path
 *      type: string
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 */
router.delete("/:id", NewsController.deleteNews);

module.exports = router;
