const express = require('express')
const router = express.Router()
const { authorizationUser } = require('../middleware/authMiddleware.js')
const  {addTask , getTask, getTaskById, updateTask, deleteTask} = require("./../controllers/taskController.js")

router.post("/",authorizationUser,addTask)
router.get("/",authorizationUser,  getTask)

router.get("/:id", authorizationUser, getTaskById);
router.put("/:id",authorizationUser, updateTask);
router.delete("/:id",authorizationUser, deleteTask)

module.exports = router