const express = require("express");
const PlaceController = require("../../controllers/admin/PlaceController");
const router = express.Router();
/**
 * @swagger
 * definitions:
 *  CreatePlace:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *        example: Nha tho duc ba
 *      description:
 *        type: string
 *        example: <p>Thưởng thức gói trà chiều và tự do tham quan, chụp ảnh tại Legacy Yên Tử - MGallery (5*) công trình tĩnh dưỡng cao cấp được thiết kế như một cung điện cổ thời Trần bởi kiến trúc sư tài ba thế giới Bill Bensley. Tại đây du khách như được đắm mình trong không gian xưa từ hàng ngàn năm trước của nước Đại Việt cổ</p>
 *      city:
 *        type: string
 *        example: 60b7ba5d7762f2077b21fef7
 *      avatar:
 *        type: string
 *        example: http://example.jpg
 *      type:
 *        type: string
 *        example: lanscape
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
 *  AdminUpdatePlace:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *        example: Nha tho duc ba
 *      description:
 *        type: string
 *        example: <p>Thưởng thức gói trà chiều và tự do tham quan, chụp ảnh tại Legacy Yên Tử - MGallery (5*) công trình tĩnh dưỡng cao cấp được thiết kế như một cung điện cổ thời Trần bởi kiến trúc sư tài ba thế giới Bill Bensley. Tại đây du khách như được đắm mình trong không gian xưa từ hàng ngàn năm trước của nước Đại Việt cổ</p>
 *      city:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            example: 013
 *          name:
 *            type: string
 *            example: TP HCM
 *      avatar:
 *        type: string
 *        example: http://example.jpg
 *      type:
 *        type: string
 *        example: lanscape
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
 * /admin/place:
 *  get:
 *    description: Get list Place
 *    tags: ["admin/place"]
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
 *    - name: type
 *      in: query
 *      schema:
 *        type: string
 *    - name: cityId
 *      in: query
 *      schema:
 *        type: String
 *    - name: status
 *      in: query
 *      schema:
 *        type: String
 *    responses:
 *      200:
 *        description: Success
 *
 */
router.get("/", PlaceController.getList);

/**
 * @swagger
 * /admin/place/{id}:
 *  get:
 *    description: Get place detail
 *    tags: ["admin/place"]
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
router.get("/:id", PlaceController.getDetail);

/**
 * @swagger
 * /admin/place:
 *  post:
 *    description: Create Place
 *    tags: ["admin/place"]
 *    parameters:
 *    - name: model
 *      in: body
 *      schema:
 *        $ref: '#/definitions/CreatePlace'
 *    responses:
 *      201:
 *        description: Success
 */
router.post("/", PlaceController.create);

/**
 * @swagger
 * /admin/place/{id}:
 *  put:
 *    description: Admin Update Place
 *    tags: ["admin/place"]
 *    parameters:
 *    - name: model
 *      in: body
 *      schema:
 *        $ref: '#/definitions/AdminUpdatePlace'
 *    - name: id
 *      in: path
 *      type: string
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 */
router.put("/:id", PlaceController.update);

/**
 * @swagger
 * /admin/place/{id}:
 *  delete:
 *    description: Admin delete Place
 *    tags: ["admin/place"]
 *    parameters:
 *    - name: id
 *      in: path
 *      type: string
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 */
router.delete("/:id", PlaceController.deletePlace);

/**
 * @swagger
 * /admin/place/review:
 *  get:
 *    description: Get list Review of place
 *    tags: ["admin/place"]
 *    parameters:
 *    - name: page
 *      in: query
 *      schema:
 *       type: integer
 *    - name: limit
 *      in: query
 *      schema:
 *        type: interger
 *    - name: placeId
 *      in: query
 *      schema:
 *        type: String
 *    responses:
 *      200:
 *        description: Success
 *
 */
router.get("/review/list", PlaceController.getPlaceReview);

/**
 * @swagger
 * /admin/place/review/delete:
 *  post:
 *    description: Delete place review
 *    tags: ["admin/place"]
 *    parameters:
 *    - name: id
 *      in: path
 *      type: string
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 */
router.delete("/review/delete/:id", PlaceController.deleteReview);

module.exports = router;
