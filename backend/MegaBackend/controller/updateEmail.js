const otpGenerator = require("otp-generator");
const User=require("../model/user");
const OTP=require("../model/otp")

// const mailSender = require("../utils/mailSender");

// step 1: send OTP to current email
exports.sendOtpUpdate = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: "Email required" });

    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets:false });
console.log("current email otp",otp)
    await OTP.findOneAndUpdate({ email }, { otp }, { new: true });
    // await mailSender(email, "Verify Your Current Email", `Your OTP is ${otp}`);
    const payload = { email, otp };
    await OTP.create(payload);

    res.json({ success: true, message: "OTP sent to current email" ,otp});
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Error sending OTP" });
  }
};

// step 2: verify old OTP
exports.verifyOldOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await OTP.findOne({ email });
    if (!user || user.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    res.json({ success: true, message: "Old email verified" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// step 3: send OTP to new email
exports.sendNewEmailOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const checkUser = await User.findOne({ email });
        if (checkUser) {
          return res.status(400).json({
            success: false,
            message: "User already registered. Please Enter new email.",
          });
        }
        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets:false });

        console.log("new email otp",otp)
    // await mailSender(newEmail, "Verify New Email", `Your OTP is ${otp}`);
       const payload = { email, otp };
        await OTP.create(payload);

   return res.status(200).json({ 
        success: true, 
        otp, 
        message: "OTP sent to new email" 
    });

  } 
  catch (error) { 
    // console.log(error.message)
   return res.status(500).json({
     success: false, 
     message: error.message
     });
  }
};

// step 4: update email after verifying new OTP
exports.updateEmail = async (req, res) => {
  try {
    const { oldEmail, newEmail } = req.body;
    const user = await User.findOneAndUpdate(
      { email: oldEmail },
      { email: newEmail },
      { new: true }
    );
    res.json({ success: true, message: "Email updated successfully", user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Email update failed" });
  }
};
