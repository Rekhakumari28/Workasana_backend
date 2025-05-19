const asyncHandler = require('express-async-handler')

const Team = require('./../models/team.model')

//addTeam
exports.addTeam =async(req,res)=>{
    try {
        const team = new Team(req.body)
        const saveTeam = await team.save()
        res.status(201).json({message:"New team created.", saveTeam})
    } catch (error) {
        res.status(500).json({error: "Failed to create new team."})
    }
}


//getTeam

exports.getTeam = async(req,res)=>{
    try {
        const team = await Team.find()
        if(team.length >0){
            res.status(200).json(team)
        }else{
            res.status(404).json({error: "Team not found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to get team."})
    }
}

//getTeamById

exports.getTeamById =async (req, res) => {
    try {
      const teamById = await Team.findById(req.params.id);
      res.status(200).json(teamById);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

// updateTeam

exports.updateTeam =async (req, res) => {
    try {
      const updatedTeam = await Team.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json({message:"Team updated successfully.",updatedTeam});
    } catch (err) { 
      res.status(500).json({ message: err.message });
    }
  }


// addMembers
exports.addMembers =async (req, res) => {
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
  }

// deleteTeam
exports.deleteTeam =async (req, res) => {
    try {
      const deletedTeam = await Team.findByIdAndDelete(req.params.id);
       if (deletedTeam) {
      res
        .status(200)
        .json({ message: "Team deleted successfully", team: deletedTeam });
    } else {
      res.status(404).json({ error: `team not found with ID: ${id}` });
    }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }


