const express=require("express");

const dotenv=require("dotenv");
dotenv.config();

const app=express();
// const dotenv=require("dotenv");

const PORT=process.env.PORT||4000;

const fileUpload=require("express-fileupload");
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp/",
        limits: { fileSize: 500 * 1024 * 1024 }, // ✅ 500 MB
      abortOnLimit: true,
    })
)


app.use(express.json());

app.use(express.urlencoded({ extended: true }));


// app.options("*", cors()); // handle preflight

// cloudinary connect
const database=require("./MegaBackend/config/database")
database.connect();

const cookieParser=require("cookie-parser");
app.use(cookieParser());

 const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://studydesk-black.vercel.app", // ✅ EXACT frontend URL
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Handle preflight requests
app.options("/*", cors());



const {cloudinaryConnect}=require("./MegaBackend/config/cloudinary")
cloudinaryConnect();

 

// dotenv.config();


const userRoutes=require("./MegaBackend/routes/user")
const profileRoutes=require("./MegaBackend/routes/profile")
const paymentRoutes=require("./MegaBackend/routes/payment")
const courseRoutes=require("./MegaBackend/routes/course")
const updateOtpRoutes=require("./MegaBackend/routes/updateOtp")
 const contactRoute = require("./MegaBackend/routes/contact");
 const adminRoutes = require("./MegaBackend/routes/adminRoutes");
 
 // routes
 app.use("/auth",userRoutes);
 app.use("/profile",profileRoutes);
 app.use("/course",courseRoutes);
 app.use("/payment",paymentRoutes);
 app.use("/updateOtp",updateOtpRoutes);
 app.use("/contact", contactRoute);
app.use("/admin", adminRoutes);

// get  route

app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your server is running...."
    })
})

app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`)
})


