const express = require("express");
const NewsController = require("../../controllers/customer/NewsController");
const router = express.Router();

/**
 * @swagger
 * /customer/news:
 *  get:
 *    description: Get list news
 *    tags: ["customer/news"]
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
 * /customer/news/{id}:
 *  get:
 *    description: Get list news
 *    tags: ["customer/news"]
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
router.get("/:id", NewsController.getDetail);

module.exports = router;
