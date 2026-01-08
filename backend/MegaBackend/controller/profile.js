const Profile = require("../model/profile");
const User = require("../model/user");
const Course =require("../model/course")
/**
 * Update or create the user's profile (additionalDetail)
 */
exports.updateAdditionalDetail = async (req, res) => {
  
    try {
        // If you use JWT auth, get from token: req.user.id
        const userId = req.user?.id || req.body.userId; // fallback for testing
       console.log(userId);
      
        //  const userId='68a0654d1c283f4d142d455f'  
        if (!userId){
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        const { dateOfBirth, gender, about, contactNumber,email, firstName,lastName} = req.body;
console.log("about",email);
        // if (!gender || !contactNumber) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Gender and Contact Number are required"
        //     });
        // }
 await User.findOneAndUpdate(
                { email: email },
                { firstName: firstName,lastName:lastName },
                // {  },
                { new: true }
              );
        // 1️⃣ Find the user
        const user = await User.findById(userId).populate("additionalDetail");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // 2️⃣ If profile exists, update it
        let profile;
        if (user.additionalDetail) {
           
            profile = await Profile.findByIdAndUpdate(
                user.additionalDetail._id,
                { dateOfBirth, gender, about, contactNumber },
                { new: true }
            );
            
        } else {
            // 3️⃣ If no profile exists, create one and link to user
            profile = await Profile.create({
                dateOfBirth,
                gender,
                about,
                contactNumber
            });
            user.additionalDetail = profile._id;
            await user.save();
        }

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            profile
        });

    }
     catch (error){
        console.error(error.message);
        return res.status(500).json({
            success: false,
            message: "Unable to update profile"
        });
    }
};

exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;   // assuming auth middleware sets req.user
//   const userId='689f6a07379daf4bb8125c72'
const profileID = await User.findById(userId).select("additionalDetail");

    await User.findByIdAndDelete(userId);
    await Profile.findByIdAndDelete(profileID.additionalDetail);

    return res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error, could not delete account",
    });
  }
};




// exports.getEnrolledCourses = async (req, res) => {
//   try {
//     const userId = req.user?.id || req.body.userId;
//     console.log(userId,"✅cew")
//     let userDetails = await User.findOne({
//       _id: userId,
//     })
//       .populate({
//         path: "courses",
//         populate: {
//           path: "courseContent",
//           populate: {
//             path: "subSection",
//           },
//         },
//       })
//       .exec()
//     userDetails = userDetails.toObject()
//     var SubsectionLength = 0
//     for (var i = 0; i < userDetails.courses.length; i++) {
//       let totalDurationInSeconds = 0
//       SubsectionLength = 0
//       for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
//         totalDurationInSeconds += userDetails.courses[i].courseContent[
//           j
//         ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
//         userDetails.courses[i].totalDuration = convertSecondsToDuration(
//           totalDurationInSeconds
//         )
//         SubsectionLength +=
//           userDetails.courses[i].courseContent[j].subSection.length
//       }
//       let courseProgressCount = await CourseProgress.findOne({
//         courseID: userDetails.courses[i]._id,
//         userId: userId,
//       })
//       courseProgressCount = courseProgressCount?.completedVideos.length
//       if (SubsectionLength === 0) {
//         userDetails.courses[i].progressPercentage = 100
//       } else {
//         // To make it up to 2 decimal point
//         const multiplier = Math.pow(10, 2)
//         userDetails.courses[i].progressPercentage =
//           Math.round(
//             (courseProgressCount / SubsectionLength) * 100 * multiplier
//           ) / multiplier
//       }
//     }

//     if (!userDetails) {
//       return res.status(400).json({
//         success: false,
//         message: `Could not find user with id: ${userDetails}`,
//       })
//     }
//     return res.status(200).json({
//       success: true,
//       data: userDetails.courses,
//     })
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }



exports.getEnrolledCourses = async (req, res) => {
  try {
    
     
   
    const studentId = req.user.id;
    const student = await User.findById(studentId)
      .populate("courses");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      data: student.courses, // ✅ full course objects
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getInstructorDashboardStats = async (req, res) => {
  try {
    const instructorId = req.user.id;

    // Get all courses of instructor
    const courses = await Course.find({ instructor: instructorId ,status:"Published"})
      .select("courseName price studentEnroll")
      .lean();
      let totalRevenue = 0;
      let totalStudents = 0;
      
      // console.log(courses.length)
    const courseStats = courses.map((course) => {
      let studentsCount= course.studentEnroll.length;
      const revenue = studentsCount * course.price;

      totalStudents += studentsCount;
      totalRevenue += revenue;

      return {
        courseId: course._id,
        courseName: course.courseName,
        price: course.price,
        studentsCount,
        revenue,
      };
    });

    return res.status(200).json({
      success: true,
      data: {
        totalCourses: courses.length,
        totalStudents,
        totalRevenue,
        courseStats,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats",
    });
  }
};

// controllers/video.js
const path = require("path");
const fs = require("fs");

exports.downloadVideo = async (req, res) => {
  try {
    const { filename } = req.params;

    const videoPath = path.join(__dirname, "../uploads/videos", filename);

    if (!fs.existsSync(videoPath)) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    res.download(videoPath, filename);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Video download failed",
    });
  }
};



exports.streamVideo = (req, res) => {
  const videoPath = `uploads/videos/${req.params.filename}`;
  console.log(req.params.filename)
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": end - start + 1,
      "Content-Type": "video/mp4",
    });

    fs.createReadStream(videoPath, { start, end }).pipe(res);
  } else {
    res.writeHead(200, {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    });
    fs.createReadStream(videoPath).pipe(res);
  }
};
