const express = require("express");
const router = express.Router();

const { auth,isAdmin } = require("../middleware/auth");
const{checkSession}=require("../middleware/checkSession")
// const {isAdmin}=require("../middleware/isAdmin")

const {
  getAllInstructors,
  getAllStudents,
  toggleBlockUser,
  verifyInstructor
} = require("../controller/admin");

router.use(auth);
// router.use(checkSession);
// router.use(isAdmin)



router.get("/instructors", auth,isAdmin, getAllInstructors);
router.get("/students", auth, isAdmin, getAllStudents);

router.put("/block/:id", auth, isAdmin, toggleBlockUser);
router.put("/verify/:id", auth, isAdmin, verifyInstructor);

module.exports = router;
