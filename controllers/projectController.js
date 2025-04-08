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
    const {status} = req.body
    let filter={}

    if(status){
        filter.status = status
    }
    try {
        const project = await Project.find(filter)
        res.json(project)
        
    } catch (error) {
        res.status(500).json({error: "Failed to get project."})
    }
})

//update project

const updateProject = asyncHandler(async(req,res)=>{
    try {
        const updatedProject  = await Project.findByIdAndUpdate(req.params.id, req.body,{new:true})
        res.status(200).json(updatedProject)
    } catch (error) {
        res.status(500).json({error: "Failed to update project.",error})
    }
})

//getProjectById

const getProjectById= asyncHandler(async (req, res) => {
    try {
      const projectById = await Project.findById(req.params.id);
      res.status(200).json(projectById);
    } catch (error) {
        res.status(500).json({error: "Failed to fetch project.", error})
    }
  })

//deleteProject

const deleteProject = asyncHandler(async (req, res) => {
    try {
      const deletedProject = await Project.findByIdAndDelete(req.params.id);
      res.status(200).json(deletedProject);
    } catch (error) {
        res.status(500).json({error: "Failed to delete project.", error})
    }
  })

module.exports = {addProject , getProject, updateProject, getProjectById, deleteProject}