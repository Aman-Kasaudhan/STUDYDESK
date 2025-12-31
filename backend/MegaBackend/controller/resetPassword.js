 const User = require("../model/user");  // <-- match your folder + lowercase "user.js"
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const mailSender = require("../util/mailSender");

// ====================================================================
// STEP 1: Generate reset token & send mail
// ====================================================================
exports.resetPasswordToken = async (req, res) => {
  try {
    const  email  = req.body.email;
    const user = await User.findOne({ email:email });
     
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email is not registered with us",
      });
    }

    // Generate random token
    const token = crypto.randomUUID();

    // Save token + expiry in user document
    await User.findOneAndUpdate(
      { email:email },
      {
        token: token,
        resetPasswordExpiry: Date.now() + 5 * 60 * 1000, // valid for 5 minutes
      },
      { new: true }
    );

    // Reset URL (frontend page for updating password)
    const url = `http://localhost:3000/update-password/${token}`;
console.log("Update Password url",url)
    // Send email with link
    await mailSender(
      email,
      "Password Reset Link",
      `<h2>Password Reset Request</h2>
       <p>Click below link to reset your password:</p>
       <a href="${url}" target="_blank">${url}</a>`
    );
// console.log(token)
    return res.status(200).json({
      success: true,
      message: "Password reset link sent successfully.",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Unable to send reset password email",
    });
  }
};

// ====================================================================
// STEP 2: Reset password using token
// ====================================================================
exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;

    // 1. Passwords must match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password do not match",
      });
    }

    // 2. Find user by token
    const userDetail = await User.findOne({ token });
    if (!userDetail) {
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }

    // 3. Check token expiry
    if (userDetail.resetPasswordExpiry < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Token expired. Please generate a new one.",
      });
    }

    // 4. Hash new password
    const hashPassword = await bcrypt.hash(password, 10);

    // 5. Update user password + clear token
    await User.findOneAndUpdate(
      {token},
      { 
        password: hashPassword,
        token: null,
        resetPasswordExpiary: null,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while resetting password",
    });
  }
};
