const asyncHandler = require('express-async-handler')

const Team = require('./../models/team.model')

//addTeam
const addTeam = asyncHandler(async(req,res)=>{
    try {
        const team = new Team(req.body)
        const saveTeam = await team.save()
        res.status(201).json({message:"New team created.", saveTeam})
    } catch (error) {
        res.status(500).json({error: "Failed to create new team."})
    }
})


//getTeam

const getTeam = asyncHandler(async(req,res)=>{
    try {
        const team = await Team.find()
        if(team.length >0){
            res.json(team)
        }else{
            res.status(404).json({error: "Team not found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to get team."})
    }
})

module.exports = {addTeam , getTeam}