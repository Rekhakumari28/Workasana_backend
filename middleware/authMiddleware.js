const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.authorizationUser = asyncHandler( (req,res,next)=>{
    
    try {
        const token = req.body.token || req.headers['authorization']
    console.log("Token: ",token)
    if(!token){
        return res.status(401).json({message:"Access Denied."})
    }
    
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decodedToken;
      next();
    } catch(error) {
      res.status(403).json({ message: "Invalid Token" ,error});
    }
})