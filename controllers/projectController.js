const asyncHandler = require('express-async-handler')

const Project = require('./../models/project.model.js')

//addProject
const addProject = asyncHandler(async(req,res)=>{
    try {
        const project = new Project(req.body)
        const saveProject = await project.save()
        res.status(201).json({message:"New Project created.", saveProject})
    } catch (error) {
        res.status(500).json({error: "Failed to create new project."})
    }
})


//getProject

const getProject = asyncHandler(async(req,res)=>{
    try {
        const project = await Project.find()
        if(project.length >0){
            res.json(project)
        }else{
            res.status(404).json({error: "Project not found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to get project."})
    }
})

module.exports = {addProject , getProject}