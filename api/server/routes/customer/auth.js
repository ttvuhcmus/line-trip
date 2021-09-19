const express = require("express");
const AuthController = require("../../controllers/customer/AuthController");
const router = express.Router();

/**
 * @swagger
 * /customer/auth/login:
 *  post:
 *    description: Authentication Line Trip app
 *    tags: ["customer/auth"]
 *    parameters:
 *    - name: model
 *      in: body
 *      schema:
 *        type: object
 *        properties:
 *          uid:
 *            type: string
 *            example: 5GHXdGWyqBS00JSRMM3b8cgkfSj2
 *        required:
 *          - uid
 *    responses:
 *      200:
 *        description: Success
 *
 */
router.post("/login", AuthController.postLogin);

module.exports = router;
