const jwt=require("jsonwebtoken");
// const User=require("../model/user");
require("dotenv").config();

// auth

exports.auth=async (req,res,next)=>{
// console.log("Incoming headers:", req.headers);
    try{
        // const token=req.cookies.token||req.body.token||req.header("Authorization").replace("Bearer ","")
        let token = null;
       if (req.cookies?.token) {
      token = req.cookies.token;
    } else if (req.body?.token) {
      token = req.body.token;
    } else if (req.headers.authorization) {
      token = req.headers.authorization.replace(/Bearer\s+/i, "");
    }
        // console.log("Received token:", token);
// console.log("Headers:", req.headers);
// console.log("Token being verified:", token);

         if(!token){
            return res.status(401).json({
                success:false,
                message:"token is missing"
            })
         };
         try{
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            req.user = {
      id: decode.id || decode._id || decode.userId, // normalize
      accountType: decode.accountType,
      email: decode.email,
    };
            
         }
         catch(err){
            return res.status(401).json({
                success:false,
                message:"token is invalid"
            })
         }
         next();
    }
    catch(err){
        return res.status(401).json({
                success:false,
                message:"unable to validting token",
                error:err.message
            })
    }
}


// isStudent

exports.isStudent=async(req,res,next)=>{
 
    try{
        if(req.user.accountType!=="Student"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for Student"
            })
        }
        
    next();
    }
    catch(err){
        return res.status(401).json({
                success:false,
                message:"User role is not verified ,please try again"
            })
    }
}

// instructor

exports.isInstructor=async(req,res,next)=>{
    console.log(req.user.accountType);
    try{
        if(req.user.accountType!=="Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for Instructor"
            })
        }
    next();
    }
    catch(err){
        return res.status(401).json({
                success:false,
                message:"User role is not verified ,please try again"
            })
    }
}

// Admin

exports.isAdmin=async(req,res,next)=>{
    try{
        if(req.user.accountType!=="Admin"){
            return res.status(401).json({
                success:false,
                message:"Admin access only"
            })
        }
    next();
    }
    catch(err){
        return res.status(401).json({
                success:false,
                message:"User role is not verified ,please try again"
            })
    }
}
 

exports.checkBlocked = (req, res, next) => {
  if (req.user.isBlocked) {
    return res.status(403).json({
      success: false,
      message: "Your account is blocked"
    });
  }
  next();
};


 

