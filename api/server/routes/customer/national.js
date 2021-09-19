const express = require("express");
const NationalController = require("../../controllers/customer/NationalsController");
const router = express.Router();

/**
 * @swagger
 * /customer/national:
 *  get:
 *    description: Get list national
 *    tags: ["customer/national"]
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
 *        type: text
 *    responses:
 *      200:
 *        description: Success
 *
 */
router.get("/", NationalController.getList);

/**
 * @swagger
 * /customer/national:
 *  get:
 *    description: Get list national
 *    tags: ["customer/national"]
 *    parameters:
 *    - name: model
 *      in: body
 *      schema:
 *        $ref: '#/definitions/CreateNational'
 *    responses:
 *      200:
 *        description: Success
 *
 */
router.post("/create", NationalController.create);

module.exports = router;
