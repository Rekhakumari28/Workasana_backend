const asyncHandler = require('express-async-handler')

const User = require('./../models/user.model.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const authorizationUser = asyncHandler( (req,res,next)=>{
    const token = req.headers['authorization']
    console.log("Token: ",token)
    if(!token){
        return res.status(401).json({message:"Access Denied."})
    }
    
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decodedToken;
      next();
    } catch(error) {
      res.status(403).json({ message: "Invalid Token" ,error});
    }
})



//addUser
const registerUser = asyncHandler(async(req,res)=>{    
        const {name,email,password} = req.body

        if(!name && !email && !password){
            res.status(400).json({error:"All fields are required."})
        }

        try {
            const existingUser = await User.findOne({email})
            if(existingUser){
            res.status(400).json({error:"Email already registerd."})
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({name, email, password:hashedPassword})

            const saveUser = await newUser.save()
            res.status(201).json({message:"New User registerd.", user: saveUser})
        } catch (error) {
            res.status(500).json({error: "Failed to register.", error})
        }        
    
})


//getUser

const userLogin = asyncHandler(async(req,res)=>{
    const { email, password} = req.body
   
    if(!email && !password){
        res.status(400).json({error:"All fields are required."})
    }
    try {
        const user = await User.findOne({email})
        if(!user){
            res.status(404).json({error: "User not found."})
        }
        const passwordValid = await bcrypt.compare(password, user.password) 
        if(!passwordValid){
            res.status(401).json({error: "Invalid password."})
        }
        const token =jwt.sign({id:user._id, email: user.email},process.env.JWT_SECRET,{expiresIn:"1h"})
        res.json({token})

    } catch (error) {
        res.status(500).json({error: "Failed to login.",error})
    }
})

const getAllUser = asyncHandler(async (req, res) => {
    try {
      const Users = await User.find();
      res.status(200).json(Users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })


  const getProfile = asyncHandler(async (req,res)=>{
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
          return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json(user);
      } catch (err) {
        res
          .status(404)
          .json({ message: "Failed to fetch user data.", error: err.message });
      }
  })

module.exports = {authorizationUser ,registerUser, userLogin ,getAllUser ,getProfile}