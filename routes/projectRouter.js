const express = require('express')
const router = express.Router()

const {addProject , getProject, updateProject, getProjectById, deleteProject} = require("./../controllers/projectController.js")

router.post("/",addProject)
router.get("/",getProject)
router.get("/:id", getProjectById);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

module.exports = router