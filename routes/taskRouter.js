const express = require('express')
const router = express.Router()
const authorizationUser = require('../middleware/authMiddleware.js')
const  taskController = require("./../controllers/taskController.js")

router.post("/",authorizationUser, taskController.addTask)
router.get("/",authorizationUser,  taskController.getTask)

router.get("/:id", authorizationUser, taskController.getTaskById);
router.put("/:id",authorizationUser, taskController.updateTask);
router.delete("/:id",authorizationUser, taskController.deleteTask)

module.exports = router