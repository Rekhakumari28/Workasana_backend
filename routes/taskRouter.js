const express = require('express')
const router = express.Router()

const  {addTask , getTask, getTaskById, updateTask, deleteTask} = require("./../controllers/taskController.js")

router.post("/",addTask)
router.get("/", getTask)

router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask)

module.exports = router