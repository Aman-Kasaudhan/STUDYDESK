const RatingAndReview=require("../model/ratingAndreview");
const Course=require("../model/course");
const ratingAndreview = require("../model/ratingAndreview");

exports.createRating=async (req,res)=>{
    try{
          const userId=req.body;
          const {rating,review,courseId}=req.body;

          const courseDetails=await Course.findOne(
            {_id:courseId,
                studentEnrolled:{$elemMatch:{$eq:userId}}
            });

            if(!courseDetails){
                return res.status(400).json({
                    success:false,
                    message:"Student is not enrolled in the course"
                })
            }

            // check if user already  reviewed the course
            const alreadyReviewed=await RatingAndReview.findOne({
                user:userId,
                course:courseId,
            })

            if(alreadyReviewed){
                return res.status(400).json({
                    success:false,
                    message:" Course is already reviewed"
                })
            }

            const ratingReveiw=await RatingAndReview.create({
                rating,review,
                course:courseId,
                user:userId
            });
            // update course with ratoing review
 const updatedCourseDetails=await Course.findByAndUpdate({_id:courseId},
                {
                    $push:{
                        ratingAndreview:ratingReveiw._id,
                    }
                },
                {new:true},
             )
return res.status(200).json({
                    success:true,
                    message:"Rating and Review Successfully",
                    ratingReveiw
                })

    }
    catch(err){
return res.status(400).json({
                    success:false,
                    message:error.message
                })
    }
};

// AvreageRating

exports.getAveragerating=async (req,res)=>{
    try{
          const courseId=req.body.courseId;

          const result=await RatingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.$matchypes.ObjectId(courseId)

                }
            },
            {
                $group:{
                    _id:null,
                    averageRating:{ $avg:"$rating"}
                }
            }
          ]);

          if(result.length>0){
            return res.status(200).json({
                success:true,
                message:result[0].averageRating,
            })
          }

    }
    catch(err){

        return res.status(400).json({
                    success:false,
                    message:error.message,
                })
    }
};

// getallrat ing

 exports.getAllRating=async (req,res)=>{
    try{
          const allRatingReview=await RatingAndReview.find({})
                                                          .sort({rating:"desc"})
                                                          .populate({
                                                            path:"user",
                                                            select:"firstName lastName email image"
                                                          })
                                                          .populate({
                                                            path:"course",
                                                            select:"courseName"
                                                          })
                                                          .exec();
                 return res.status(200).json({
                    success:true,
                    message:"All reviewed fetched successfully",
                    data:allReview
                 })

             }
    catch(err){
return res.status(500).json({
                    success:false,
                    message:error.message,
                    
                 })
    }
 }