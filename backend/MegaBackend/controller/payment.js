const mongoose = require("mongoose");
const crypto = require("crypto");
const { instance } = require("../config/razorpay");
const Course = require("../model/course");
const User = require("../model/user");
// const mailSender = require("../util/mailSender");
// const { courseEnrollmentTemplate } = require("../mail/courseEnrollmail");
const CourseProgress = require("../model/courseProgress");

// ------------------------------------------------------
// 1️⃣ Create Razorpay Order
// ------------------------------------------------------
exports.capturePayment = async (req, res) => {
  try {
    const { course_id } = req.body;
    const userId = req.user.id;

    if (!course_id) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid course ID",
      });
    }

    // Find course
    const course = await Course.findById(course_id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Prevent duplicate enrollment
    const uid = new mongoose.Types.ObjectId(userId);
    if (course.studentsEnrolled.includes(uid)) {
      return res.status(400).json({
        success: false,
        message: "Already enrolled in this course",
      });
    }

    // Create Razorpay order
    const amount = course.price;
    const currency = "INR";

    const options = {
      amount: amount * 100, // Razorpay takes paise
      currency,
      receipt: `receipt_${Math.random(Date.now()).toString()}`,
      notes: {
        courseId: course_id,
        userId,
      },
    };

    const paymentResponse = await instance.orders.create(options);

    return res.status(200).json({
      success: true,
      orderId: paymentResponse.id,
      currency: paymentResponse.currency,
      amount: paymentResponse.amount,
      courseName: course.courseName,
      courseDescription: course.courseDescription,
      thumbnail: course.thumbnail,
      key: process.env.RAZORPAY_KEY_ID, // send key for frontend
    });
  } catch (error) {
    console.error("Payment initiation failed:", error);
    return res.status(500).json({
      success: false,
      message: "Could not initiate payment",
    });
  }
};

// ------------------------------------------------------
// 2️⃣ Verify Razorpay Signature (after successful payment)
// ------------------------------------------------------
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId } = req.body;
    const userId = req.user.id;

    // Generate signature on server
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed. Signature mismatch.",
      });
    }

    // ✅ Payment verified — enroll user
    const course = await Course.findByIdAndUpdate(
      courseId,
      { $push: { studentsEnrolled: userId } },
      { new: true }
    );

    await User.findByIdAndUpdate(
      userId,
      { $push: { courses: courseId } },
      { new: true }
    );

    // Create progress entry
    await CourseProgress.create({
      userId,
      courseID: courseId,
      completedVideos: [],
    });

    // Send email
    const user = await User.findById(userId);
    // await mailSender(
    //   user.email,
    //   "Congratulations from StudyNotion 🎉",
    //   courseEnrollmentTemplate(user.firstName, course.courseName)
    // );

    return res.status(200).json({
      success: true,
      message: "Payment verified and course added successfully",
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};
