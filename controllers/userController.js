const asyncHandler = require('express-async-handler')

const User = require('./../models/user.model.js')

//addUser
const addUser = asyncHandler(async(req,res)=>{
    try {
        const user = new User(req.body)
        const saveUser = await user.save()
        res.status(201).json({message:"New User created.", saveUser})
    } catch (error) {
        res.status(500).json({error: "Failed to create new user."})
    }
})


//getUser

const getUser = asyncHandler(async(req,res)=>{
    try {
        const user = await User.find()
        if(user.length >0){
            res.json(user)
        }else{
            res.status(404).json({error: "User not found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to get user."})
    }
})

module.exports = {addUser , getUser}