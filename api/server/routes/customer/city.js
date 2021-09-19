const express = require("express");
const CityController = require("../../controllers/customer/CityController");
const router = express.Router();

/**
 * @swagger
 * /customer/city:
 *  get:
 *    description: Get list national
 *    tags: ["customer/city"]
 *    parameters:
 *    - name: page
 *      in: query
 *      schema:
 *       type: integer
 *    - name: limit
 *      in: query
 *      schema:
 *        type: interger
 *    - name: name
 *      in: query
 *      schema:
 *        type: text
 *    responses:
 *      200:
 *        description: Success
 *
 */
router.get("/", CityController.getList);

/**
 * @swagger
 * /customer/city/popular:
 *  get:
 *    description: Get list national popular
 *    tags: ["customer/city"]
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
router.get("/popular", CityController.getPopular);

/**
 * @swagger
 * /customer/city/create:
 *  post:
 *    description: Create national
 *    tags: ["customer/city"]
 *    parameters:
 *    - name: model
 *      in: body
 *      schema:
 *        $ref: '#/definitions/CreateCity'
 *    responses:
 *      200:
 *        description: Success
 *
 */
router.post("/create", CityController.create);

/**
 * @swagger
 * /customer/city/{id}:
 *  get:
 *    description: Get city detail
 *    tags: ["customer/city"]
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

module.exports = router;
