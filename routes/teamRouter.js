const express = require('express')
const router = express.Router()
const authorizationUser = require('../middleware/authMiddleware.js')
const teamController = require("./../controllers/teamController.js")

router.post("/",authorizationUser, teamController.addTeam)
router.get("/",authorizationUser , teamController.getTeam)

router.get("/:id",authorizationUser, teamController.getTeamById);
router.put("/:id",authorizationUser, teamController.updateTeam);
router.put("/member/:id",authorizationUser, teamController.addMembers);
router.delete("/:id",authorizationUser, teamController.deleteTeam);

module.exports = router