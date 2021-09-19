const express = require("express");
const PlaceController = require("../../controllers/customer/PlaceController");
const router = express.Router();

/**
 * @swagger
 * definitions:
 *  CreateReview:
 *    type: object
 *    properties:
 *      content:
 *        type: string
 *        example: Good.
 *      place:
 *        type: string
 *        example: 5GHXdGWyqBS00JSRMM3b8cgkfSj2
 *      rate:
 *        type: number
 *        example: 4
 */

/**
 * @swagger
 * definitions:
 *  CreateFavorite:
 *    type: object
 *    properties:
 *      placeId:
 *        type: string
 *        example: 5GHXdGWyqBS00JSRMM3b8cgkfSj2
 */

/**
 * @swagger
 * /customer/place:
 *  get:
 *    description: Get list Place
 *    tags: ["customer/place"]
 *    parameters:
 *    - name: page
 *      in: query
 *      schema:
 *       type: integer
 *    - name: limit
 *      in: query
 *      schema:
 *        type: interger
 *    - name: cityId
 *      in: query
 *      schema:
 *        type: String
 *    - name: type
 *      in: query
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: Success
 *
 */
router.get("/", PlaceController.getList);

/**
 * @swagger
 * /customer/place/top-rate:
 *  get:
 *    description: Get list Place top rate
 *    tags: ["customer/place"]
 *    parameters:
 *    - name: page
 *      in: query
 *      schema:
 *       type: integer
 *    - name: limit
 *      in: query
 *      schema:
 *        type: interger
 *    - name: cityId
 *      in: query
 *      schema:
 *        type: String
 *    - name: type
 *      in: query
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: Success
 *
 */
router.get("/top-rate", PlaceController.getListTopRate);

/**
 * @swagger
 * /customer/place/{id}:
 *  get:
 *    description: Get place detail
 *    tags: ["customer/place"]
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
 * /customer/place/review:
 *  get:
 *    description: Get list Place
 *    tags: ["customer/place"]
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
 * /customer/place/review/create:
 *  post:
 *    description: Create Newfeed
 *    tags: ["customer/place"]
 *    parameters:
 *    - name: model
 *      in: body
 *      schema:
 *        $ref: '#/definitions/CreateReview'
 *    responses:
 *      200:
 *        description: Success
 */
router.post("/review/create", PlaceController.createReview);

/**
 * @swagger
 * /customer/place/review/delete:
 *  post:
 *    description: Delete Newfeed
 *    tags: ["customer/place"]
 *    parameters:
 *    - name: id
 *      in: body
 *      type: string
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 */
router.post("/review/delete", PlaceController.deleteReview);

/**
 * @swagger
 * /customer/place/favorite:
 *  get:
 *    description: Get list favorite
 *    tags: ["customer/favorite"]
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
router.get("/favorite/list", PlaceController.getListFavorite);

/**
 * @swagger
 * /customer/place/favorite/create:
 *  post:
 *    description: Add favorite
 *    tags: ["customer/favorite"]
 *    parameters:
 *    - name: model
 *      in: body
 *      schema:
 *        $ref: '#/definitions/CreateFavorite'
 *    responses:
 *      200:
 *        description: Success
 */
router.post("/favorite/create", PlaceController.addFavorite);

/**
 * @swagger
 * /customer/place/favorite/delete:
 *  post:
 *    description: Delete favorite
 *    tags: ["customer/favorite"]
 *    parameters:
 *    - placeId: id
 *      in: body
 *      type: string
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 */
router.delete("/favorite/delete", PlaceController.deleteFavorite);

/**
 * @swagger
 * /customer/place/favorite/check:
 *  post:
 *    description: Delete favorite
 *    tags: ["customer/favorite"]
 *    parameters:
 *    - placeId: id
 *      in: body
 *      type: string
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 */
router.post("/favorite/check", PlaceController.checkFavorite);

module.exports = router;
