const express=require("express");
const router=express.Router();

const {createCourse,getAllCourses,getCourseDetail,updateCourse,deleteCourse,getCourseDetailByCourseId, enrollSingleCourse,enrollMultipleCourses,getPurchaseHistory  ,addStudent ,enrollMultipleCourseStudent}=require("../controller/course");
 
const {createCategory,showCategory,categoryPageDetail}=require("../controller/categoryControll");
const {createSection,updateSection,deleteSection}=require("../controller/section")
const {createSubSection,updateSubSection,deleteSubSection}=require("../controller/subsection");
const {createRating,getAveragerating,getAllRating}=require("../controller/ratingAndReview")

const {auth,isStudent,isInstructor }=require("../middleware/auth")

router.post("/createCourse",auth,isInstructor,createCourse);
router.put("/updateCourse/:id",auth,isInstructor,updateCourse);
router.get("/getAllCourses",auth,isInstructor,getAllCourses);
router.post("/getCourseDetail",getCourseDetail);
router.post("/deleteCourse/:id",auth,isInstructor,deleteCourse);
router.get("/getCourseDetailByCourseId/:id",getCourseDetailByCourseId);
router.post("/enroll-single", auth, enrollSingleCourse);
router.post("/enroll-multiple", auth, enrollMultipleCourses);
router.get("/purchase",auth,getPurchaseHistory);
router.put("/addStudentEnroll/:id",auth,addStudent)
router.post("/enrollMultipleCourseStudent", auth, enrollMultipleCourseStudent);

router.post("/createSection",auth,isInstructor,createSection);
router.put("/updateSection",auth,isInstructor,updateSection);
router.post("/deleteSection",auth,isInstructor,deleteSection);

router.post("/createSubSection",auth,isInstructor,createSubSection);
router.put("/updateSubSection",auth,isInstructor,updateSubSection);
router.post("/deleteSubSection",auth,isInstructor,deleteSubSection);

router.post("/createRating",auth,isStudent,createRating);
router.get("/getAveragerating",getAveragerating)
router.get("/getAllRating",getAllRating)

router.post("/createCategory",auth,isInstructor,createCategory);
router.get("/showCategory",showCategory)
router.get("/categoryPageDetail",categoryPageDetail)
// router.get("/categoryByid/:id",categoryByid)


module.exports=router;