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

//getTeamById

const getTeamById =asyncHandler(async (req, res) => {
    try {
      const teamById = await Team.findById(req.params.id);
      res.status(200).json(teamById);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })

// updateTeam

const updateTeam =asyncHandler(async (req, res) => {
    try {
      const updatedTeam = await Team.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json(updatedTeam);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })


// addMembers
const addMembers =asyncHandler(async (req, res) => {
    const { member } = req.body;
    try {
      const addMember = await Team.findByIdAndUpdate(
        req.params.id,
        { $push: { members: member } },
        {
          new: true,
        }
      );
      if (!addMember) {
        return res.status(404).json({ message: "Team not found" });
      }
      res.status(200).json(addMember);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Failed to add new member", error: err.message });
    }
  })

// deleteTeam
const deleteTeam =asyncHandler(async (req, res) => {
    try {
      const deletedTeam = await Team.findByIdAndDelete(req.params.id);
      res.status(200).json(deletedTeam);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })



module.exports = {addTeam , getTeam, getTeamById, updateTeam, addMembers, deleteTeam}