const express = require("express");
const router = express.Router();
const authorizationUser = require("../middleware/authMiddleware.js");
const tagController = require("./../controllers/tagController.js");

router.post("/", authorizationUser, tagController.addTag);
router.get("/", authorizationUser, tagController.getAllTag);
router.get("/:tagId", authorizationUser, tagController.getTagById);
router.put("/:tagId", authorizationUser, tagController.updateTag);
router.delete("/:tagId", authorizationUser, tagController.deleteTag);

module.exports = router;
