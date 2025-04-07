const express = require('express')
const router = express.Router()

const {authorizationUser ,registerUser, userLogin ,getAllUser,getProfile} = require("./../controllers/userController.js")

router.post("/register", registerUser)
router.post("/login", userLogin)
router.get("/profile",authorizationUser , getProfile)
router.get('/',getAllUser)
module.exports = router