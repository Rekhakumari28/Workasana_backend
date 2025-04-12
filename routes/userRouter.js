const express = require('express')
const router = express.Router()
const User = require('./../controllers/userController.js')
const {authorizationUser ,registerUser, userLogin ,getAllUser} = require("./../controllers/userController.js")

router.post("/register", registerUser)
router.post("/login", userLogin)

router.get("/profile",authorizationUser , async (req,res)=>{
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
router.get('/',getAllUser)

module.exports = router