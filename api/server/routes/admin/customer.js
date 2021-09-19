const express = require("express");
const UserController = require("../../controllers/admin/UserController");
const router = express.Router();

/**
 * @swagger
 * definitions:
 *  AdminUpdateCustomer:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *        example: Le Phuc Lam
 *      phone:
 *        type: string
 *        example: 0988666754
 *      email:
 *        type: string
 *        example: lephuclamit@gmail.com
 *      avatar:
 *        type: string
 *        example: link_avatar
 *      status:
 *        type: string
 *        example: "true"
 *
 */

/**
 * @swagger
 * /admin/customer:
 *  get:
 *    description: Get list User
 *    tags: ["admin/customer"]
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
router.get("/", UserController.getList);

/**
 * @swagger
 * /admin/customer/{id}:
 *  get:
 *    description: Get Detail customer
 *    tags: ["admin/customer"]
 *    parameters:
 *    - name: id
 *      in: path
 *      type: string
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 */
router.get("/:id", UserController.getDetail);

/**
 * @swagger
 * /admin/customer/{id}:
 *  put:
 *    description: Admin Update Customer
 *    tags: ["admin/customer"]
 *    parameters:
 *    - name: model
 *      in: body
 *      schema:
 *        $ref: '#/definitions/AdminUpdateCustomer'
 *    - name: id
 *      in: path
 *      type: string
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 */
router.put("/:id", UserController.update);

/**
 * @swagger
 * /admin/customer/{id}:
 *  delete:
 *    description: Admin Delete Customer
 *    tags: ["admin/customer"]
 *    parameters:
 *    - name: id
 *      in: path
 *      type: string
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 */
router.delete("/:id", UserController.deleteUser);

module.exports = router;
