// models/Purchase.js
const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  courseName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  purchasedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Purchase", purchaseSchema);
