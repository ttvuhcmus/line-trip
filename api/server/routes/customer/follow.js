const express = require("express");
const FollowController = require("../../controllers/customer/FollowController");
const router = express.Router();

/**
 * @swagger
 * definitions:
 *  CreateFollow:
 *    type: object
 *    properties:
 *      follow_to:
 *        type: string
 *        example: 60c0ff5dd2eccb002948a85b
 *
 *  UpdateFollow:
 *    type: object
 *    properties:
 *      status:
 *        type: boolean
 *        example: true
 */

/**
 * @swagger
 * /customer/follow:
 *  post:
 *    description: Create national
 *    tags: ["customer/follow"]
 *    parameters:
 *    - name: model
 *      in: body
 *      schema:
 *        $ref: '#/definitions/CreateFollow'
 *    responses:
 *      200:
 *        description: Success
 *
 */
router.post("/", FollowController.create);

/**
 * @swagger
 * /customer/follow:
 *  get:
 *    description: Get Follow
 *    tags: ["customer/follow"]
 *    responses:
 *      200:
 *        description: Success
 *
 */
router.get("/", FollowController.getList);

/**
 * @swagger
 * /customer/follow/{id}:
 *  get:
 *    description: Get Follow
 *    tags: ["customer/follow"]
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
router.get("/:id", FollowController.getById);

// /**
//  * @swagger
//  * /customer/comment:
//  *  put:
//  *    description: Update Comment
//  *    tags: ["customer/comment"]
//  *    parameters:
//  *    - name: model
//  *      in: body
//  *      schema:
//  *        $ref: '#/definitions/UpdateComment'
//  *    responses:
//  *      201:
//  *        description: Success
//  */
// router.put("/", FollowController.update);

module.exports = router;
