const express = require('express')
const router = express.Router()

const  {addTask , getTask} = require("./../controllers/taskController.js")

router.post("/",addTask)
router.get("/", getTask)


module.exports = router