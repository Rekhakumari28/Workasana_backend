const express = require('express')
const router = express.Router()

const {addTeam , getTeam} = require("./../controllers/teamController.js")

router.post("/", addTeam)
router.get("/",getTeam)

module.exports = router