const Section = require("../model/section");
const Course = require("../model/course");
const Subsection = require("../model/subSection");

/* ================= CREATE SECTION ================= */
exports.createSection = async (req, res) => {
  try {
    const { sectionName, courseID } = req.body;
 
    if (!sectionName || !courseID){
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
const course = await Course.findById(courseID);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const newSection = await Section.create({ sectionName,course: courseID, });
    // console.log(newSection)

    // const updatedCourse = await Course.findByIdAndUpdate(
    //   courseID,
    //   { $push: { courseContent: newSection._id } },
    //   { new: true }
    // ).populate({
    //   path: "courseContent",
    //   populate: { path: "subSection" },
    // });
    course.courseContent.push(newSection._id);
    course.stepCompleted = Math.max(course.stepCompleted, 2);
    await course.save();

    return res.status(200).json({
      success: true,
      message: "Section created successfully",
      section: newSection,
      // course: updatedCourse,
    });

  } catch (err) {
    console.error("createSection:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= UPDATE SECTION ================= */
exports.updateSection = async (req, res) => {
  try {
    const { sectionName, sectionID } = req.body;

    if (!sectionName || !sectionID) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const section = await Section.findByIdAndUpdate(
      sectionID,
      { sectionName },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
      section,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Unable to update section",
    });
  }
};

/* ================= DELETE SECTION ================= */
exports.deleteSection = async (req, res) => {
  try {
    const { sectionID, courseID } = req.body;

    if (!sectionID || !courseID) {
      return res.status(400).json({
        success: false,
        message: "Section ID & Course ID required",
      });
    }

    // Remove section reference from course
    await Course.findByIdAndUpdate(courseID, {
      $pull: { courseContent: sectionID },
    });

    // Delete all subsections inside section
    const section = await Section.findById(sectionID);
    await Subsection.deleteMany({ _id: { $in: section.subSections } });

    // Delete section
    await Section.findByIdAndDelete(sectionID);

    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Unable to delete section",
    });
  }
};
