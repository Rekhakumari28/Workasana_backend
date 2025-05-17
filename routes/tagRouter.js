const express = require('express')
const router = express.Router()

const  {addTag ,getAllTag, getTagById, updateTag, deleteTag} = require("./../controllers/tagController.js")

router.post("/", authorizationUser,addTag)
router.get("/", authorizationUser,getAllTag)
router.get("/:tagId", authorizationUser,getTagById)
router.put("/:tagId",authorizationUser ,updateTag)
router.delete("/:tagId",authorizationUser,deleteTag)

module.exports = router