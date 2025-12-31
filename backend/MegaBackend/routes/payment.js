const express=require("express");
const router=express.Router();

const {capturePayment,verifyPayment}=require("../controller/payment");
 

const {auth,isStudent,isInstructor,isAdmin}=require("../middleware/auth")

router.post("/capturePayment",auth,isStudent,capturePayment);
router.post("/verifyPayment",auth,verifyPayment);



module.exports=router;