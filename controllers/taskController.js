const asyncHandler = require('express-async-handler')

const Task = require('./../models/task.model.js')

//addTask
const addTask = asyncHandler(async(req,res)=>{
    try {
        const task = new Task(req.body)
    const saveTask = await task.save()
    const populatedTask = await Task.findById(saveTask._id).populate("owners");
    res.status(201).json({message:"New task created.", populatedTask})
       
    } catch (error) {
        res.status(500).json({error: "Failed to create new task.", error})
    }
})

//getTask

const getTask = asyncHandler(async(req,res)=>{
    const {status, prioritySort, dateSort} = req.query

let filter = {}

if(status){
    filter.status = status
}

let sortOptions = {}
const priorityOrder={
    Low:1,
    Medium:2,
    High:3
}

//priority sorting 
if(prioritySort === "Low-High"){
    sortOptions.priority = 1
}else if(prioritySort === "High-Low"){
    sortOptions.priority = -1
}

//date sorting
if(dateSort){
    if(dateSort === "Newest-Oldest"){
        sortOptions.createdAt = -1
    }else if(dateSort === "Oldest-Newest"){
        sortOptions.createdAt = 1;
    }
}
    try {
        const tasks = await Task.find(filter).sort(sortOptions).populate("project").populate("team").populate("owners")

        if(prioritySort){
            tasks.sort((a, b) => {
                const priorityA = priorityOrder[a.priority] || 0; // Convert to numeric priority
                const priorityB = priorityOrder[b.priority] || 0; // Convert to numeric priority
                return prioritySort === "Low-High"
                  ? priorityA - priorityB
                  : priorityB - priorityA;
              })
        }

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({error: "Failed to get task.", error})
    }
})

//getTaskById

const getTaskById = asyncHandler(async (req, res) => {
    try {
      const taskById = await Task.findById(req.params.id)
        .populate("project")
        .populate("owners")
        .populate("team");
      res.status(200).json(taskById);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })

//   updateTask

const updateTask = asyncHandler(async (req, res) => {
    try {
      const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json(updatedTask);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  })

  //deleteTask

  const deleteTask = asyncHandler(async (req, res) => {
    try {
      const deletedTask = await Task.findByIdAndDelete(req.params.id);
      res.status(200).json({ deletedTask });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })

module.exports = {addTask , getTask, getTaskById, updateTask, deleteTask}