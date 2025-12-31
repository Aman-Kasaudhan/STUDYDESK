const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

exports.contactAdmin=async (req, res) => {
  const { firstName, lastName, email, phoneCode, phoneNumber, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"StudyDesk Contact" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER, // your email
      subject: "New Contact Form Message",
      html: `
        <h3>New Contact Message</h3>
        <p><b>Name:</b> ${firstName} ${lastName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phoneCode} ${phoneNumber}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
 
