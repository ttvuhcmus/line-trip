const express = require("express");
const CommentController = require("../../controllers/admin/CommentController");
const router = express.Router();

/**
 * @swagger
 * definitions:
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
 * /admin/comment/{id}:
 *  get:
 *    description: Get comment
 *    tags: ["admin/comment"]
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
 * /admin/comment:
 *  put:
 *    description: Update Comment
 *    tags: ["admin/comment"]
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
