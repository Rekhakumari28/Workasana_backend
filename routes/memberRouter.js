const express = require('express')
const router = express.Router()

const memberController = require("../controllers/memberController.js")
const authorizationUser = require('../middleware/authMiddleware.js')

router.get("/", authorizationUser, memberController.getMember)
router.post("/", authorizationUser, memberController.addMember)
router.delete("/:memberId", authorizationUser, memberController.deleteMember)


module.exports = router