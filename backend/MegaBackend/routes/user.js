const express=require("express");
const router=express.Router();

const {login,signUp,sendOTP}=require("../controller/Auth");
const {resetPasswordToken,resetPassword}=require("../controller/resetPassword")
const {auth}=require("../middleware/auth")

router.post("/login",login);
router.post("/sendotp",sendOTP);
router.post("/signUp",signUp);
router.post("/resetPasswordToken",resetPasswordToken); 
router.post("/resetPassword",resetPassword); 

 



module.exports=router;

