const User=require("../model/user");
const OTP=require("../model/otp")
const otpGenerator=require("otp-generator");
const Profile=require("../model/profile");
const bcrypt=require("bcrypt");
  const jwt=require("jsonwebtoken");
// const { GiTruce } = require("react-icons/gi");
  require("dotenv").config();
// otp generate
const otpStore = {};
exports.sendOTP = async (req, res) => {

  try {
    const { email } = req.body;
// console.log(email," c")
    // Check if email already exists
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: "User already registered. Please login.",
      });
    }

    // Generate a unique OTP
    let otp;
    let result;
    do {
      otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp });
    } while (result);

    // Save OTP to DB
    const payload = { email, otp };
    await OTP.create(payload);
// await OTP.collection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 300 });
    console.log("OTP generated:", otp);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp,
    });
  } catch (err) {
    console.error("OTP error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while sending OTP",
    });
  }
};


// // signup

exports.signUp=async(req,res)=>{
     console.log("[SIGNUP] body =", req.body);
    try{
    const{
        firstName,
        lastName,
        email,
        password,
        confirmpassword,
        accountType,
        // contactNumber,
        otp
    }=req.body;

    if(!firstName||
        !lastName||
        !email||
        !password||
        !confirmpassword||
        !accountType||
    //    !contactNumber||
        !otp){
            return res.status(400).json({
                success:false,
                message:"All Detail are mandatory"
            })
        };

        // match password

        if(password!=confirmpassword){
                return res.status(400).json({
                success:false,
                message:"Password and confirmpassword not match"
            })
        };
         const existUser=await User.findOne({email});
         if(existUser){
            return res.status(400).json({
                success:false,
                message:"User already registered Please login"

         });
        }
        const recentOtp=await OTP.find({email}).sort({createdAt:-1}).limit(1);

        const mostRecentOtp = recentOtp[0];

  if (!mostRecentOtp) {
      return res.status(400).json({ success: false, message: "No OTP found for this email" });
    }
if (!mostRecentOtp.createdAt) {
  return res.status(400).json({ success: false, message: "OTP timestamp missing" });
}
// const OTP_VALID_MS = 5 * 60 * 1000; // 5 min
// if (  Date.now() - mostRecentOtp.createdAt.getTime() > OTP_VALID_MS) {
//   return res.status(400).json({ success: false, message: "OTP expired" });
// }
    // 2. Compare OTP as strings (trim spaces)
    if (String(mostRecentOtp.otp).trim() !== String(otp).trim()) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    //    hash password
    const hashPassword=await bcrypt.hash(password,10);

    // entry save in db
    const profileDetails=await Profile.create({
        gender:null,
        dateOfBirth:null,
        about:null,
        contactNumber:null

    });
    console.log("Creating user with email:", email);
    const user=await User.create({
        firstName,
        lastName,
        email,
        password:hashPassword,
        // password,
        accountType,
        // contactNumber,
        additionalDetail:profileDetails._id,
        image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName}
        ${lastName}`
    })
    const payload={
      id:user._id,
      accountType:user.accountType,
              email:user.email,
          }

              let token=jwt.sign(payload,process.env.JWT_SECRET,{
                  expiresIn:"2h",
              })
  
            //   user=user.toObject();
              user.token=token;
              user.password=undefined;
  
              // create cookie and expiry
  
              const options={
                  expires:new Date(Date.now()+3*24*60*60*1000),
                  httpOnly:true,
                  secure: false, // required for HTTPS
              sameSite: "Lax",
              }
    // console.log("[SIGNUP] created user id =", user._id?.toString());
    return res.status(200).json({
        success:true,
        user,
        token,
        message:"User is registered successfully"
    })
}

catch(err){
      console.error("Signup error:", err);
    return res.status(500).json({
                success:false,
                message:"User is not registered successfully"
        })
}
}


// login 


  exports.login=async (req,res)=>{
      try{
          // fetch data
          const {email,password}=req.body;
  
          // validate email and passsword
  
          if(!email || !password){
             return res.status(400).json({
              success:false,
              message:"Enter valid email and Password"
             })
          }
  
          // check user is registered
  
          let user=await User.findOne({email})
          // .populate("additionalDetails");
          // if not registerd
          if(!user){
              return res.status(401).json({
                  success:false,
                  message:"User is not registered plese signup"
              })
          }
          // verify password and generate jwt
          if(await bcrypt.compare(password,user.password)){
              
            const payload={
              id:user._id,
              accountType:user.accountType,
              email:user.email,
          }

              let token=jwt.sign(payload,process.env.JWT_SECRET,{
                  expiresIn:"2h",
              })
  
            //   user=user.toObject();
              user.token=token;
              user.password=undefined;
  
              // create cookie and expiry
  
              const options={
                  expires:new Date(Date.now()+3*24*60*60*1000),
                  httpOnly:true,
                  secure: false, // required for HTTPS
              sameSite: "Lax",
              }
                
              // token fetch by cookie
    
        const updatedLogin=await User.findOneAndUpdate({email:email},{lastLogin:Date.now()},{new:true});

              res.cookie("token",token,options).status(200).json({
                  success:true,
                  token,
                  user,
                  message:"Logged in successfully "
              })
     
          }
                  
          else{
              return res.status(401).json({
                  success:false,
                  message:"Enter valid Password"
              })
          }
      }
      catch(err){
        console.error("Login Error:", err);
          return res.status(400).json({
              success:false,
              message:"Login Failure",
              error:err.message
          })
      }
  
  }

  