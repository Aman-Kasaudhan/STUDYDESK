const express = require("express");
const router = express.Router();
const {
  sendOtpUpdate,
  verifyOldOtp,
  sendNewEmailOtp,
  updateEmail,
} = require("../controller/updateEmail");

router.post("/sendotp-update", sendOtpUpdate);
router.post("/verify-old-otp", verifyOldOtp);
router.post("/send-new-email-otp", sendNewEmailOtp);
router.post("/update-email", updateEmail);

module.exports = router;
