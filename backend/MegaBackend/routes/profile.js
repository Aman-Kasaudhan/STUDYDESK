const express=require("express");
const router=express.Router();
const {auth}=require("../middleware/auth")

const {updateAdditionalDetail,deleteAccount,getEnrolledCourses,getInstructorDashboardStats,downloadVideo,streamVideo}=require("../controller/profile");
const {updatePic}=require("../controller/updatepic")

// updateprofile getusedetail getenrolledcourse updatedispkaypicture
router.post("/create-profile",auth,updateAdditionalDetail);
router.delete("/delete-profile",auth,deleteAccount);
router.put("/update-pic",auth,updatePic)
router.get("/getEnrolledCourses",auth,getEnrolledCourses);
router.get("/dashboard-stats-instructor",auth,getInstructorDashboardStats);
router.get("/download-video/:filename", auth, downloadVideo);
router.get("/stream/:filename", auth, streamVideo);

// router.put("/update-profile", auth, createProfile);



module.exports=router;
