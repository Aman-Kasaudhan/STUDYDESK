// const mongoose=require("mongoose");
// const courseProgress=new mongoose.Schema({
//     courseID:{
//               type:mongoose.Schema.Types.ObjectId,
//               ref:"Course"
        
//     },
//     completedVideos:{
//       type:mongoose.Schema.Types.ObjectId,
//         ref:"Subsection"
       
//     },
   
    
// })

// module.exports=mongoose.model("CourseProgress",courseProgress)

const mongoose = require("mongoose");

const courseProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  courseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  completedVideos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubSection", // note: capitalization must match your model name
    },
  ],
  lastWatchedVideo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubSection",
  },
});

module.exports = mongoose.model("CourseProgress", courseProgressSchema);
