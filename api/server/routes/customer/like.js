const express = require("express");
const LikeController = require("../../controllers/customer/LikeController");
const router = express.Router();

/**
 * @swagger
 * definitions:
 *  CreateLike:
 *    type: object
 *    properties:
 *      newfeed:
 *        type: string
 *        example: 60c0ff5dd2eccb002948a85b
 *
 */

/**
 * @swagger
 * /customer/like:
 *  post:
 *    description: Create like
 *    tags: ["customer/like"]
 *    parameters:
 *    - name: model
 *      in: body
 *      schema:
 *        $ref: '#/definitions/CreateLike'
 *    responses:
 *      200:
 *        description: Success
 *
 */
router.post("/", LikeController.create);

module.exports = router;
