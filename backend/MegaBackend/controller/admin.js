 const User = require("../model/user");
const Course = require("../model/course");

/* ================= GET ALL INSTRUCTORS ================= */
exports.getAllInstructors = async (req, res) => {
   
  try {
    const instructors = await User.find({ accountType: "Instructor" })
      .populate("additionalDetail")
      .populate({
        path: "courses",
        populate: {
          path: "studentEnroll",
          select: "firstName lastName email image"
        }
      });

    res.status(200).json({
      success: true,
      data: instructors
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= GET ALL STUDENTS ================= */
exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ accountType: "Student" })
      .populate("additionalDetail")
      .populate("courses", "courseName price");

    res.status(200).json({
      success: true,
      data: students
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= BLOCK / UNBLOCK ================= */
exports.toggleBlockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.isBlocked = !user.isBlocked;
    await user.save();

    res.json({
      success: true,
      message: user.isBlocked ? "User Blocked" : "User Unblocked"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= VERIFY INSTRUCTOR ================= */
exports.verifyInstructor = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      isVerified: true
    });

    res.json({
      success: true,
      message: "Instructor Verified"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
 
