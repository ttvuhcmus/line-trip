const express = require("express");
const CommentController = require("../../controllers/customer/CommentController");
const router = express.Router();

/**
 * @swagger
 * definitions:
 *  CreateComment:
 *    type: object
 *    properties:
 *      newfeed:
 *        type: string
 *        example: 60c0ff5dd2eccb002948a85b
 *      parent_level:
 *        type: string
 *        example: 5GHXdGWyqBS00JSRMM3b8cgkfSj2
 *      content:
 *        type: string
 *        example: What is a beautiful
 *
 *
 *  UpdateComment:
 *    type: object
 *    properties:
 *      content:
 *        type: string
 *        example: What is a beautiful
 *      _id:
 *        type: string
 *        example: BLD2323DJLFFDSLDFHHD
 *      status:
 *        type: boolean
 *        example: true
 */

/**
 * @swagger
 * /customer/comment:
 *  post:
 *    description: Create national
 *    tags: ["customer/comment"]
 *    parameters:
 *    - name: model
 *      in: body
 *      schema:
 *        $ref: '#/definitions/CreateComment'
 *    responses:
 *      200:
 *        description: Success
 *
 */
router.post("/", CommentController.create);

/**
 * @swagger
 * /customer/comment/{id}:
 *  get:
 *    description: Get comment
 *    tags: ["customer/comment"]
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
router.get("/:id", CommentController.getList);

/**
 * @swagger
 * /customer/comment:
 *  put:
 *    description: Update Comment
 *    tags: ["customer/comment"]
 *    parameters:
 *    - name: model
 *      in: body
 *      schema:
 *        $ref: '#/definitions/UpdateComment'
 *    responses:
 *      201:
 *        description: Success
 */
router.put("/", CommentController.update);

module.exports = router;
