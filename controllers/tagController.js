const asyncHandler = require('express-async-handler')

const Tag = require("./../models/tag.model")

//addTag

const addTag = asyncHandler(async(req,res)=>{
    try {
        const tag = new Tag(req.body)
        const saveTag = await tag.save()
        res.status(201).json({message:"New tag created.", saveTag})
    } catch (error) {
        res.status(500).json({error: "Failed to create new tag."})
    }
})


//getTag

const getTag = asyncHandler(async(req,res)=>{
    try {
        const tag = await Tag.find()
        if(tag.length >0){
            res.json(tag)
        }else{
            res.status(404).json({error: "Tag not found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to get tag."})
    }
})

module.exports = {addTag , getTag}