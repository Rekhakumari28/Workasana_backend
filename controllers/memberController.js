
const Member = require('../models/member.model.js')

//get member
exports.getMember= async (req, res) => {
  try {
    const getAllUsers = await Member.find();
    if (getAllUsers) {
      return res.status(200).json(getAllUsers);
    } else {
      return res.status(400).json({ message: "Failed to fetch users" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
}

//add member

exports.addMember = async(req, res)=>{
  const {name} = req.body
    if(!name){
     res.status(400).json({ message: "Member name is required" });
    }
  try {
    const existingMember = await Member.findOne({name})
            if(existingMember){
                res.status(400).json({ message: "Member already exists" });
            }
    const newMember = new Member({name})
           const saveMember = await newMember.save()
           res.status(201).json({message:"New Member created.", member: saveMember})
       } catch (error) {
           res.status(500).json({error: "Failed to create new member.",error})
       }
}

//delete member
exports.deleteMember = async (req, res) => {
    const { memberId } = req.params;
  
    try {
      const member = await Member.findById(memberId);
      if (!member) {
        return res.status(404).json({ message: "Member not found" });
      }
      res.status(200).json({ message: "Member deleted successfully", member });
    } catch (err) {
      res.status(500).json({ message: "Error deleting member", error: err.message });
    }
  }