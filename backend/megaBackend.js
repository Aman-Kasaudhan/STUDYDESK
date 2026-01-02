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

const cors=require("cors");
app.use(cors({
  origin: "http://localhost:3000", // frontend URL
  credentials: true, // allow cookies
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Authorization", "Content-Type"],

}));


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
 app.use("/api/v1/auth",userRoutes);
 app.use("/api/v1/profile",profileRoutes);
 app.use("/api/v1/course",courseRoutes);
 app.use("/api/v1/payment",paymentRoutes);
 app.use("/api/v1/updateOtp",updateOtpRoutes);
 app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/admin", adminRoutes);

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


