const asyncHandler = require('express-async-handler')

const Task = require('./../models/task.model.js')

//addTask
const addTask = asyncHandler(async(req,res)=>{
    try {
        const {name, project, team, owners, timeToComplete} = req.body
let errorMessage = "";

if(!name && project && team && owners && timeToComplete ){
    errorMessage = {error: "name, project, team, owners, timeToComplete all fields are required."}
}else{
    const task = new Task(req.body)
    const saveTask = await task.save()
    res.status(201).json({message:"New task created.", saveTask})
}
       
    } catch (error) {
        res.status(500).json({error: "Failed to create new task.", error})
    }
})


//getTask

const getTask = asyncHandler(async(req,res)=>{
    try {
        const task = await Task.find().populate("project").populate("team").populate("owners")
        if(task.length >0){
            res.json(task)
        }else{
            res.status(404).json({error: "Task not found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to get task.", error})
    }
})

module.exports = {addTask , getTask}