const express = require("express");
const UserController = require("../../controllers/customer/UserController");
const router = express.Router();

/**
 * @swagger
 * definitions:
 *  UpdateProfile:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *        example: Hoang Van A
 *      phone:
 *        type: string
 *        example: "+84344656534"
 *      email:
 *        type: string
 *        example: hoangvana@gmail.com
 *      fcm_token:
 *        type: string
 *        example: fOgwl0lJJR4-bDmNTV1_at:APA91bExN8OIWIWMrM3M_F81Rh6kAOOVR-lYpSdlR3DBDGC14ulgpaeLncVf132gbxSCTE5qW_jokaOYF5iDsmScMS_RLT8co67slNGYTOB_rQUCJnbpBq_hlWOxbAV2qHfsDbegYHIC
 *      address:
 *        type: object
 *        properties:
 *          city:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *                example: "01"
 *              name:
 *                type: string
 *                example: "TP HCM"
 *          district:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *                example: "02"
 *              name:
 *                type: string
 *                example: ""
 *          ward:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *                example: "03"
 *              name:
 *                type: string
 *                example: ""
 *          street:
 *            type: string
 *            example: "Tran Hung Dao"
 */

/**
 * @swagger
 * /customer/user/profile:
 *  get:
 *    description: User Get Profile
 *    tags: ["customer/user"]
 *    responses:
 *      200:
 *        description: Success
 */
router.get("/profile", UserController.getUserProfile);

/**
 * @swagger
 * /customer/user/profile/{id}:
 *  get:
 *    description: User Get Profile by id
 *    tags: ["customer/user"]
 *    parameters:
 *    - name: id
 *      in: path
 *      type: string
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 */
router.get("/profile/:id", UserController.getUserProfileById);

/**
 * @swagger
 * /customer/user/profile:
 *  put:
 *    description: Update User Profile
 *    tags: ["customer/user"]
 *    parameters:
 *    - name: model
 *      in: body
 *      schema:
 *        $ref: '#/definitions/UpdateProfile'
 *    responses:
 *      200:
 *        description: Success
 */
router.put("/profile", UserController.update);

/**
 * @swagger
 * /customer/saerch:
 *  get:
 *    description: Get list User
 *    tags: ["customer/user"]
 *    parameters:
 *    - name: page
 *      in: query
 *      schema:
 *       type: integer
 *    - name: limit
 *      in: query
 *      schema:
 *        type: interger
 *    - search: limit
 *      in: query
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: Success
 *
 */
router.get("/search", UserController.getList);

module.exports = router;
