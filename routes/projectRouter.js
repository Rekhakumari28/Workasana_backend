const express = require('express')
const router = express.Router()

const {addProject , getProject, updateProject, getProjectById, deleteProject} = require("./../controllers/projectController.js")
const { authorizationUser } = require('../middleware/authMiddleware.js')

router.post("/", authorizationUser, addProject)
router.get("/", authorizationUser,  getProject)
router.get("/:id",authorizationUser,  getProjectById);
router.put("/:id",authorizationUser, updateProject);
router.delete("/:id", deleteProject);

module.exports = router