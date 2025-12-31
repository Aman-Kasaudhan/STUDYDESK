const Subsection = require("../model/subSection");
const Section = require("../model/section");
const { uploadVideo } = require("../util/videoUpload");

/* ================= CREATE SUBSECTION ================= */
exports.createSubSection = async (req, res) => {
  try {
    const { title, description, timeDuration, sectionID } = req.body;
    const video = req.files?.videoFile;
// console.log(title, description, timeDuration, sectionID)
    if (!title || !description || !timeDuration || !sectionID ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
     

if (!video) {
  return res.status(400).json({
    success: false,
    message: "Video file is required",
  });
}
    const uploadDetail = await uploadVideo(
      video,
      process.env.FOLDER_NAME2 || "course_videos"
    );

    const subsection = await Subsection.create({
      title,
      description,
      timeDuration,
      videourl: uploadDetail.secure_url,
      section: sectionID,
    });
 
    const updatedSection = await Section.findByIdAndUpdate(
      sectionID,
      { $push: { subSections: subsection._id } },
      { new: true }
    )
    // .populate("subSection");

    return res.status(200).json({
      success: true,
      message: "Subsection created successfully",
      subsection,
      updatedSection,
    });

  } catch (error) {
    console.error("createSubSection:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* ================= UPDATE SUBSECTION ================= */
exports.updateSubSection = async (req, res) => {
  try {
    const { subSectionId, title, description, timeDuration } = req.body;
    const video = req.files?.videoFile;

    if (!subSectionId) {
      return res.status(400).json({
        success: false,
        message: "Subsection ID required",
      });
    }

    const subsection = await Subsection.findById(subSectionId);
    if (!subsection) {
      return res.status(404).json({
        success: false,
        message: "Subsection not found",
      });
    }

    if (title) subsection.title = title;
    if (description) subsection.description = description;
    if (timeDuration) subsection.timeDuration = timeDuration;

    if (video) {
      const uploadDetail = await uploadVideo(
        video,
        process.env.FOLDER_NAME2 || "course_videos"
      );
      subsection.videourl = uploadDetail.secure_url;
    }

    await subsection.save();

    return res.status(200).json({
      success: true,
      message: "Subsection updated successfully",
      subsection,
    });

  } catch (err) {
    console.error("updateSubSection:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to update subsection",
    });
  }
};

/* ================= DELETE SUBSECTION ================= */
exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;

    if (!subSectionId || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "Subsection ID and Section ID required",
      });
    }

    await Section.findByIdAndUpdate(sectionId, {
      $pull: { subSection: subSectionId },
    });

    await Subsection.findByIdAndDelete(subSectionId);

    return res.status(200).json({
      success: true,
      message: "Subsection deleted successfully",
    });

  } catch (err) {
    console.error("deleteSubSection:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to delete subsection",
    });
  }
};
