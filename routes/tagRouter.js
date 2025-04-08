const express = require('express')
const router = express.Router()

const  {addTag ,getAllTag, getTagById, updateTag, deleteTag} = require("./../controllers/tagController.js")

router.post("/",addTag)
router.get("/",getAllTag)
router.get("/:tagId",getTagById)
router.put("/:tagId",updateTag)
router.delete("/:tagId",deleteTag)

module.exports = router