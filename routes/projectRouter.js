const express = require('express')
const router = express.Router()

const  {addProject , getProject} = require("./../controllers/projectController.js")

router.post("/",addProject)
router.get("/",getProject)

module.exports = router