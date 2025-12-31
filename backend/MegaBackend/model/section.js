// const mongoose=require("mongoose");
// const sectionSchema=new mongoose.Schema({
//    sectionName:{
//               type:String,
//               ref:"Course"
        
//     },
//     subSection:[{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"Subsection",
//         // required:true,
       
//     },]
// })

// module.exports=mongoose.model("Section",sectionSchema)

const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({

  sectionName: {
    type: String,
    required: true,
  },

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },

  subSections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subsection",
    },
  ],

});

module.exports = mongoose.model("Section", sectionSchema);
