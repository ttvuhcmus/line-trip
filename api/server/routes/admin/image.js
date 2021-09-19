const express = require("express");
const ImagesController = require("../../controllers/admin/ImagesController");
const router = express.Router();

/**
 * @swagger
 * /admin/image/{id}:
 *  delete:
 *    description: Admin Update News
 *    tags: ["admin/images"]
 *    parameters:
 *    - name: id
 *      in: path
 *      type: string
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 */
router.delete("/:id", ImagesController.deleteImages);

module.exports = router;
