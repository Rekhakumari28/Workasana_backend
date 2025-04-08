const asyncHandler = require('express-async-handler')

const Tag = require("./../models/tag.model")

//addTag

const addTag = asyncHandler(async(req,res)=>{
    const {name} = req.body
    if(!name){
     res.status(400).json({ message: "Tag name is required" });
    }
    try {
        const existingTag = await Tag.findOne({name})
        if(existingTag){
            res.status(400).json({ message: "Tag already exists" });
        }
        const newTag = new Tag({name})
        const saveTag = await newTag.save()
        res.status(201).json({message:"New tag created.", tag: saveTag})
    } catch (error) {
        res.status(500).json({error: "Failed to create new tag.",error})
    }
})


//getTag

const getAllTag = asyncHandler(async (req, res) => {
    try {
      const tags = await Tag.find();
      res.status(200).json(tags);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching tags", error: err.message });
    }
  })

  //getTagById

  const getTagById = asyncHandler(async (req, res) => {
    const { tagId } = req.params;
  
    try {
      const tag = await Tag.findById(tagId);
      if (!tag) {
        return res.status(404).json({ message: "Tag not found" });
      }
      res.status(200).json(tag);
    } catch (err) {
      res.status(500).json({ message: "Error fetching tag", error: err.message });
    }
  })

  //updateTag 

   const updateTag = asyncHandler(async (req, res) => {
  const { tagId } = req.params;
  const { name } = req.body;

  try {
    const tag = await Tag.findById(tagId);
    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    tag.name = name || tag.name; 
    const updatedTag = await tag.save();
    res
      .status(200)
      .json({ message: "Tag updated successfully", tag: updatedTag });
  } catch (err) {
    res.status(500).json({ message: "Error updating tag", error: err.message });
  }
})

//deleteTag

const deleteTag = asyncHandler(async (req, res) => {
    const { tagId } = req.params;
  
    try {
      const tag = await Tag.findById(tagId);
      if (!tag) {
        return res.status(404).json({ message: "Tag not found" });
      }
  
      await tag.remove();
      res.status(200).json({ message: "Tag deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting tag", error: err.message });
    }
  })

module.exports = {addTag ,getAllTag, getTagById, updateTag, deleteTag}