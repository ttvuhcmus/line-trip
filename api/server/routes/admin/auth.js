const express = require("express");
const AuthController = require("../../controllers/admin/AuthController");
const router = express.Router();

/**
 * @swagger
 * /admin/auth/login:
 *  post:
 *    description: Authentication Line Trip app
 *    tags: ["admin/auth"]
 *    parameters:
 *    - name: model
 *      in: body
 *      schema:
 *        type: object
 *        properties:
 *          username:
 *            type: string
 *            example: "root@gmail.com"
 *          password:
 *            type: string
 *            example: 123123
 *    responses:
 *      200:
 *        description: Success
 *
 */
router.post("/login", AuthController.postLogin);

module.exports = router;
