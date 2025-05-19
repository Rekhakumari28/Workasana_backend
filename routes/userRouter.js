const express = require('express')
const router = express.Router()
const userController = require("../controllers/userController.js")
const authorizationUser = require('../middleware/authMiddleware.js')

router.post("/register", userController.registerUser)
router.post("/login", userController.userLogin)

router.get("/profile",authorizationUser , userController.userProfile)

router.get('/',authorizationUser, userController.getAllUser)

module.exports = router