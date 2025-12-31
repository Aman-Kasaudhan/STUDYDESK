const mongoose=require("mongoose");
// const moment = require("moment-timezone");
const courseSchema=new mongoose.Schema({
    courseName:{
        type:String,
        trim: true,
    },

    courseDescription:{
        type:String,
    },

    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    whatYouWillLearn:{
        type:String,
    },

    courseContent:[
        {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Section"
    }
       ],

    rateReveiw:[
       { type:mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReview"}
       ],

    price:{
        type:Number,
    },

    thumbnail:{
        type:String
    },
    tag: {
		type: [String],
		required: true,
	},
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    studentEnroll:[
        {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
      }
    ],
    
    instruction:{
    type:[String],
		required: true,

    },

    status:{
        type:String,
        enum:["Draft","Published"],
        default:"Draft"
    },
    stepCompleted: {
    type: Number,
    default: 1, // 1 = info, 2 = content, 3 = published
  },
    createdAt: {
  type: Date,
  default: Date.now
   },
   
},
//  { timestamps: true }
)
// courseSchema.path("createdAt").get(function (value) {
//   return moment(value).tz("Asia/Kolkata").format("DD MMM YYYY, hh:mm A");
// });

// // Ensure getters apply when converting to JSON
// courseSchema.set("toJSON", { getters: true });
// courseSchema.set("toObject", { getters: true });


module.exports=new mongoose.model("Course",courseSchema);



