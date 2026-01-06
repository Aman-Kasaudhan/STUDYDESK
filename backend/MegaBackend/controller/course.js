 // photo upload error by form-data
const Course = require("../model/course");
const Category = require("../model/category");
const User = require("../model/user");
const { uploadCloudinary } = require("../util/imageUpload");
const Subsection=require("../model/subSection");
 const Section=require("../model/section");
 const Purchase=require("../model/purchase")
 
 const parseArrayField = (field) => {
  if (!field) return [];

  // already array
  if (Array.isArray(field)) {
    // flatten corrupted nested arrays
    return field.flatMap((item) => {
      if (typeof item === "string") {
        try {
          const parsed = JSON.parse(item);
          return Array.isArray(parsed) ? parsed : [item];
        } catch {
          return [item];
        }
      }
      return item;
    });
  }

  // stringified array
  if (typeof field === "string") {
    try {
      const parsed = JSON.parse(field);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  return [];
};


exports.createCourse = async (req, res) => {
   
    try {
        // fetch data from body
        let { courseName, courseDescription, whatYouWillLearn, category,tag, price ,instruction} = req.body;
        // console.log('category',category)
       tag = parseArrayField(tag);
       instruction = parseArrayField(instruction);

        // validation
        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !category ||!tag ||!instruction) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

    //  upload photo to cloudinary

     const thumbnailPic=req.files?.thumbnailImage ;
     if(!thumbnailPic){
     return res.status(400).json({
                success: false,
                message: "Please upload thumbnail Image"
            });
    }
    const response=await uploadCloudinary(thumbnailPic,process.env.FOLDER_NAME1);
                  
        // check for instructor
        const userId = req.user.id;
         
        const instructorDetail = await User.findById(userId);
        // console.log('category',userId)

        if (!instructorDetail) {
            return res.status(400).json({
                success: false,
                message: "Instructor detail not found"
            });
        }
        // check category
        const categoryDetail = await Category.findById(category);
        if (!categoryDetail) {
            return res.status(400).json({
                success: false,
                message: "Category detail not found"
            });
        }

        // create new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetail._id,
            whatYouWillLearn,
            price,
            tag,
            category: categoryDetail._id,
            thumbnail:response.secure_url,
            instruction,
            status:"Draft",
           stepCompleted: 1,

        });

        // add new course to instructor
        await User.findByIdAndUpdate(instructorDetail._id,
            { $push: { courses: newCourse._id } },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Course created successfully",
            course: newCourse
        });
    } catch (error) {
        console.error("createCourse:",error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
            // error: error.message
        });
    }
};

exports.updateCourse = async (req, res) => {
  try {
    const courseId= req.params.id;
    // const updates = {...req.body};
    // const instructorId = req.user.id;

    // const {
    //   courseName,
    //   courseDescription,
    //   whatYouWillLearn,
    //   category,
    //   tag,
    //   price,
    //   instruction,
    //   status,
    // } = req.body;

   

    // Find the course by ID
    const existingCourse = await Course.findById(courseId);
    if (!existingCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    
    if (existingCourse.instructor.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to update this course",
      });
    }

    // Prepare update object with only provided fields
    const updateFields = {};
if (req.body.courseName)
      updateFields.courseName = req.body.courseName;

    if (req.body.courseDescription)
      updateFields.courseDescription = req.body.courseDescription;

    if (req.body.whatYouWillLearn)
      updateFields.whatYouWillLearn = req.body.whatYouWillLearn;

    if (req.body.price)
      updateFields.price = req.body.price;

    if (req.body.category){
      // console.log("d",req.body.category)
      updateFields.category = req.body.category;
    }

    // 🔥 CRITICAL FIX
    if (req.body.tag !== undefined) {
      updateFields.tag = parseArrayField(req.body.tag);
    }

    // 🔥 CRITICAL FIX
    if (req.body.instruction !== undefined) {
      updateFields.instruction = parseArrayField(req.body.instruction);
    }

    // Handle thumbnail image update if file uploaded
    if (  req.files?.thumbnailImage) {
      // Upload new thumbnail to cloudinary or your storage and get URL
      // e.g.
      const response = await uploadCloudinary(req.files.thumbnailImage, process.env.FOLDER_NAME1);
      updateFields.thumbnail = response.secure_url;

    }

    if (req.body.status)
       updateFields.status = req.body.status;

    // Update course document
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      // updated,
      { $set: updateFields},
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      message:  err.message,
    });
  }
};

// get Allcourse

exports.getAllCourses=async (req,res)=>{
  const instructorId = req.user.id;
 
   
    try{

        const draftCourse=await Course.find({instructor: instructorId,status:"Draft"}).populate("category").exec();
        const publishCourse=await Course.find({instructor: instructorId,status:"Published"}).populate("category").exec();
        
         
        return res.status(200).json({
          success:true,
                draftCourse,
                publishCourse, 
                message:"All course data fetch successfully",
                
            })

    }
    catch(err){
        return res.status(500).json({
                success:false,
                message:"canot fetch course data",
                error:err.message
            })
    }
};


// getAllCourseDetail by category id

exports.getCourseDetail=async (req,res)=>{
    try{
       const {courseID}=req.body;//category id

      // const {courseId} = req.body;
//       console.log("cd")
// console.log("xe",courseID)
let courseDetail;
let topCourses;
          if(courseID){
          courseDetail=await Course.find({category:courseID,status:"Published"})
               .populate("instructor")
               .populate("category")
               .populate("rateReveiw")
              //  .populate({
              //    path:"courseContent",
              //     populate:{
              //         path:"subSection",
              //     }
              //   }) 
                .select("courseContent" )
                .select("courseName")
                 .select("courseContent" )
                 .select("price" )
                 .select("thumbnail")
                             .exec();
               
         if (!courseDetail || courseDetail.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No courses found for category ${courseID}`,
      });
    }
  }
  else{
    topCourses=await Course.find({status:"Published"})
                .limit(10)
               .populate("instructor")
               .populate("category")
               .populate("rateReveiw")
              //  .populate({
              //    path:"courseContent",
              //     populate:{
              //         path:"subSection",
              //     }
              //   }) 
                .select("courseContent" )
                .select("courseName")
                 .select("courseContent" )
                 .select("price" )
                 .select("thumbnail")
                             .exec();
               
         if (!topCourses || topCourses.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No courses found for category `,
      });
    }
  }
         return res.status(200).json({
            success:true,
            courseDetail,
            topCourses,
            // :courseDetail.courseContent,
            message:"Course Detail fetch successfully" 
         })

    }
    catch(error){
                  return res.status(500).json({
                success:false,
                message:error.message,
            })
    }
}


exports.getCourseDetailByCourseId = async (req, res) => {
  try {
    const { id } = req.params;
    // const userId = req.user?.id ;
    // console.log(userId,'studentId')

// console.log(userId,'studentId')
    // Validate ID
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    // Find course by ID and populate related data
    const course = await Course.findById(id)
      .populate("instructor", "firstName lastName")
      .populate("category")
      .populate({
                 path:"courseContent",
                  populate:{
                      path:"subSections",
                  }
                }) 
                .select("courseContent" )
                .select("courseName")
                 .select("courseContent" )
                 .select("price" )
                 .select("thumbnail")
                 .select("tag")
                 .select("instruction")
                 .select("courseDescription")
                  .select("whatYouWillLearn")
                             .exec();

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
// const isEnrolled = course.studentEnroll
//   ?.map((id) => id.toString())
//   .includes(userId);

// if (!isEnrolled) {
//   course.courseContent = [];
// }

    return res.status(200).json({
      success: true,
      message: "Course details fetched successfully",
      courseDetail: course,
    });
  } catch (error) {
    console.error("Error fetching course detail:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.deleteCourse=async (req,res)=>{
    const courseId= req.params.id;
    // const { courseId } = req.body;
    const userId=req.user.id
        try{
            const existingCourse=await Course.findById(courseId)
            
            if (!existingCourse) {
         return res.status(404).json({
        success: false,
        message: "Course not found",
      });
        }

    
    if (existingCourse.instructor.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to update this course",
      });
    }

    for (const section of existingCourse.courseContent) {
      await Subsection.deleteMany({ _id: { $in: section.subSections } });
      await Section.findByIdAndDelete(section._id);
    }
//  const sections=existingCourse.courseContent;
//  await Course.findByIdAndDelete(courseId);


 await User.findByIdAndUpdate(
      userId,
      { $pull: { courses: courseId } },
      { new: true }
    );
 await Course.findByIdAndDelete(courseId);
 
// if(sections){

// for(const sectionId of sections){
//       const section=await Section.findById(sectionId);
      
//       // const [subsections,setSubsections]=useState([]);
      
//       if(section){
//           const subsections=section.subSection;
        
//         for(const subsectionId of subsections ){
//              await Subsection.findByIdAndDelete(subsectionId);
//         }
          
//         }
//         await Section.findByIdAndDelete(sectionId);
//       }
// }
return res.status(200).json({
success:true,

})

        }
        catch(error){
                  return res.status(500).json({
                success:false,
                message:error.message,
            })
    }
}



exports.enrollSingleCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user?.id || req.body.userId;
  //  console.log(courseId)
  //  console.log(userId)
 
    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "courseId is required",
      });
    }

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    // Check course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Add course (no duplicates)
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { courses: courseId } },
      { new: true }
    );

    await Purchase.create({
      userId: userId,
      courseId: course._id,
      courseName: course.courseName,
      price: course.price
    });

    return res.status(200).json({
      success: true,
      message: "Course enrolled successfully",
      enrolled: courseId,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


 exports.enrollMultipleCourses = async (req, res) => {
  try {
    let { courseIds } = req.body;
    const userId = req.user?.id || req.body.userId;

    if (!courseIds || !Array.isArray(courseIds) || courseIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "courseIds array is required",
      });
    }

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    // Check valid courses
    const validCourses = await Course.find({ _id: { $in: courseIds } });
    if (validCourses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No valid courses found",
      });
    }

    await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: {
          courses: { $each: courseIds },
        },
      },
      { new: true }
    );
    const purchases = validCourses.map(course => ({
      userId: userId,
      courseId: course._id,
      courseName: course.courseName,
      price: course.price,
    }));

    await Purchase.insertMany(purchases);

    return res.status(200).json({
      success: true,
      message: "Courses enrolled successfully",
      enrolled: courseIds,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


 


exports.getPurchaseHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const history = await Purchase.find({ userId })
      .populate("courseId", "courseName thumbnail")
      .sort({ purchasedAt: -1 });

    res.status(200).json({
      success: true,
      data: history
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.addStudent=async(req,res)=>{
  try{
      const userid=req.user.id;

      const courseId=req.params.id;
    

      if(!courseId){
        return res.status(404).json({
        success: false,
        message: "Course ID is required",
      });
      }
      if(!userid){
        return res.status(404).json({
        success: false,
        message: "user not authenticated",
      });
      }
      const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    if (course.studentEnroll.includes(userid)) {
      return res.status(400).json({
        success: false,
        message: "Student already enrolled",
      });
    }

    // Add student to course
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $push: { studentEnroll: userid } },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Student enrolled successfully",
      data: updatedCourse,
    });
      }
  catch(error){
    res.status(400).json({
        success: false,
        message: error.message
    })
  }
  }


  exports.enrollMultipleCourseStudent = async (req, res) => {
  try {
    const userId = req.user.id;
    let { courseIds } = req.body;

    if (!Array.isArray(courseIds) || courseIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "courseIds array is required",
      });
    }
const courseCheck = await User.findById(userId).select("courses");
//     if (!courseCheck) {
//       return res.status(404).json({
//         success: false,
//         message: "Course not found",
//       });
// }
 
    // Find already bought courses
    const alreadyBought = courseIds.filter((id) =>
      courseCheck.courses.includes(id)
    );


    if (alreadyBought.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Some courses already purchased",
        alreadyBought, // frontend can show names
      });
    }

    // 1️⃣ Add user to all courses (no duplicates)
    await Course.updateMany(
      { _id: { $in: courseIds } },
      { $addToSet: { studentEnroll: userId } } // ✅ prevents duplicates
    );

    // 2️⃣ Add courses to user
   

    return res.status(200).json({
      success: true,
      message: "User enrolled in multiple courses successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
