const express = require('express')
const router = express.Router()
const User = require('./../controllers/userController.js')
const {registerUser, userLogin ,getAllUser, userProfile} = require("./../controllers/userController.js")
const { authorizationUser } = require('../middleware/authMiddleware.js')

router.post("/register", registerUser)
router.post("/login", userLogin)

router.get("/profile",authorizationUser , userProfile)
router.get('/',getAllUser)

module.exports = router