const express = require("express");
const NotificationController = require("../../controllers/customer/NotificationController");
const router = express.Router();

/**
 * @swagger
 * definitions:
 *  UpdateNoti:
 *    type: object
 *    properties:
 *      _id:
 *        type: string
 *        example: BDNLSKDFLIJAELIJFLAEKF
 *      type:
 *        type: string
 *        example: all/null

 */

/**
 * @swagger
 * /customer/notification:
 *  get:
 *    description: Get list notification
 *    tags: ["customer/notification"]
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
router.get("/", NotificationController.getList);

/**
 * @swagger
 * /customer/notification:
 *  put:
 *    description: Update Notification
 *    tags: ["customer/notification"]
 *    parameters:
 *    - name: model
 *      in: body
 *      schema:
 *        $ref: '#/definitions/UpdateNoti'
 *    responses:
 *      201:
 *        description: Success
 */
router.put("/", NotificationController.seen);

/**
 * @swagger
 * /customer/notification/count:
 *  put:
 *    description: Count unseen Notification
 *    tags: ["customer/notification"]
 *    responses:
 *      201:
 *        description: Success
 */
router.get("/count", NotificationController.countUnseen);

module.exports = router;
