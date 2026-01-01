const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

function generateTicketId() {
  const prefix = "TCK";
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
  const timestamp = Date.now().toString().slice(-5);
  return `${prefix}-${randomPart}-${timestamp}`;
}


const ticketId = generateTicketId();

 

exports.contactAdmin=async (req, res) => {
  const { firstName, lastName, email, phoneCode, phoneNumber, message } = req.body;


  const userConfirmationHtml = `
  <div style="font-family: Arial, sans-serif; background:#f9f9f9; padding:20px;">
    <div style="max-width:600px; margin:auto; background:#ffffff; padding:20px; border-radius:8px;">
      
      <h2 style="color:#2c3e50;">Thank You for Contacting Us</h2>
      
      <p>Hi <b>${firstName} ${lastName}</b>,</p>
      
      <p>
        We have successfully received your message.  
        Our support team will review it and get back to you shortly.
      </p>

      <hr style="margin:20px 0;" />

      <p><b>🎫 Ticket ID:</b> ${ticketId}</p>
      <p><b>📧 Email:</b> ${process.env.MAIL_USER}</p>
      <p><b>📞 Phone:</b> +91 9125275840</p>

       

      <hr style="margin:20px 0;" />

      <p style="font-size:14px; color:#555;">
        Please keep your <b>Ticket ID</b> for future reference.
      </p>

      <p style="margin-top:30px;">
        Best regards,<br/>
        <b>Support Team</b><br/>
        StudyDesk
      </p>
    </div>
  </div>
`;


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
      to: process.env.MAIL_USER, 
      to:email,
      subject: `We received your message | Ticket ID: ${ticketId}`,
      html: userConfirmationHtml,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ success: false, message: error.message });
  }
};
 
