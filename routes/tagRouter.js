const express = require('express')
const router = express.Router()

const {addTag , getTag} = require("./../controllers/tagController.js")

router.post("/",addTag)
router.get("/",getTag)

module.exports = router