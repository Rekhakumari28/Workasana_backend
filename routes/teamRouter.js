const express = require('express')
const router = express.Router()

const {addTeam , getTeam, getTeamById, updateTeam, addMembers, deleteTeam} = require("./../controllers/teamController.js")

router.post("/",authorizationUser, addTeam)
router.get("/",authorizationUser , getTeam)

router.get("/:id",authorizationUser, getTeamById);
router.put("/:id",authorizationUser, updateTeam);
router.put("/member/:id",authorizationUser, addMembers);
router.delete("/:id",authorizationUser, deleteTeam);
module.exports = router