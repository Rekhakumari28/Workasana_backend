const express = require('express')
const router = express.Router()

const {addUser , getUser} = require("./../controllers/userController.js")

router.post("/", addUser)
router.get("/",getUser)

module.exports = router