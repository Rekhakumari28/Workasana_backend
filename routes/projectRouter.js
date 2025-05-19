const express = require('express')
const router = express.Router()

const projectController = require("./../controllers/projectController.js")
const authorizationUser = require('../middleware/authMiddleware.js')

router.post("/", authorizationUser, projectController.addProject)
router.get("/", authorizationUser,  projectController.getProject)
router.get("/:id",authorizationUser,  projectController.getProjectById);
router.put("/:id",authorizationUser, projectController.updateProject);
router.delete("/:id",authorizationUser, projectController.deleteProject);

module.exports = router