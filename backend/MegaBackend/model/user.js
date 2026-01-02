const mongoose=require("mongoose");
// const { resetPassword } = require("../controller/resetPassword");
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },

    password:{
        type:String,
        required:true,
    },
    // confirmpassword:{
    //     type:String,
    //     required:true,
    // },
    accountType:{
        type:String,
        enum:["Instructor","Student","Admin"],
        required:true,
    },
    additionalDetail:{
        type:mongoose.Schema.Types.ObjectId,
        default:null,
        ref:"Profile",
        // required:true,
         
        
    },
    isBlocked: {
    type: Boolean,
    default: false
  },

  isVerified: {
    type: Boolean,
    default: false   // mainly for instructor
  },
    courses:[
        {
      type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
        }
    ],
    image:{
        type:String,
        // required:true,
    },
    token:{
      type:String,
    },
    resetPasswordExpiry:{
        type:Date,
    },
    courseProgress:[
        {
      type:mongoose.Schema.Types.ObjectId,
      ref:"CourseProgress"
        }
    ],
    lastLogin:{
      type:Date,
    default:Date.now(),
    }
    
})

module.exports=mongoose.model("User",userSchema)