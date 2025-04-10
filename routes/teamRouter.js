const express = require('express')
const router = express.Router()

const {addTeam , getTeam, getTeamById, updateTeam, addMembers, deleteTeam} = require("./../controllers/teamController.js")

router.post("/", addTeam)
router.get("/",getTeam)

router.get("/:id", getTeamById);
router.put("/:id", updateTeam);
router.put("/member/:id", addMembers);
router.delete("/:id", deleteTeam);
module.exports = router