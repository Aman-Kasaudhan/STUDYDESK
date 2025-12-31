// const mongoose=require("mongoose");
// const subsection=new mongoose.Schema({
//     title:{
//         type:String,     
//     },

//    timeDuration:{
//               type:String,
//         ref:"Subsection"
       
//     },

//    description:{
//     type:String,
//    },
   
//    videourl:{
//     type:String
//    }
    
// })

// module.exports=mongoose.model("Subsection",subsection)

const mongoose = require("mongoose");

const subsectionSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },

  timeDuration: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  videourl: {
    type: String,
    required: true, // 🔥 lecture must have video
  },

  // 🔥 Relation to section
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Section",
    required: true,
  },

});

module.exports = mongoose.model("Subsection", subsectionSchema);
