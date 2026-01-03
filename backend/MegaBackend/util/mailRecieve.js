const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const SibApiV3Sdk = require("sib-api-v3-sdk");

function generateTicketId() {
  const prefix = "TCK";
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
  const timestamp = Date.now().toString().slice(-5);
  return `${prefix}-${randomPart}-${timestamp}`;
}


const ticketId = generateTicketId();

 

exports.contactAdmin = async (req, res) => {
  const { firstName, lastName, email, phoneCode, phoneNumber, message } = req.body;

  const ticketId = generateTicketId();

  const userConfirmationHtml = `
    <div style="font-family: Arial, sans-serif; background:#f9f9f9; padding:20px;">
      <div style="max-width:600px; margin:auto; background:#ffffff; padding:20px; border-radius:8px;">
        <h2 style="color:#2c3e50;">Thank You for Contacting Us</h2>
        <p>Hi <b>${firstName} ${lastName}</b>,</p>
        <p>We have successfully received your message.</p>

        <hr />

        <p><b>🎫 Ticket ID:</b> ${ticketId}</p>
        <p><b>📞 Phone:</b> ${phoneCode} ${phoneNumber}</p>

        <p style="margin-top:20px;">Message:</p>
        <p>${message}</p>

        <hr />

        <p>Regards,<br/><b>StudyDesk Support Team</b></p>
      </div>
    </div>
  `;

  try {
    const client = SibApiV3Sdk.ApiClient.instance;
    client.authentications["api-key"].apiKey =
      process.env.BREVO_API_KEY;

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    const sendSmtpEmail = {
      to: [{ email }], // ✅ MUST be array
      sender: {
        email: process.env.BREVO_SENDER_EMAIL,
        name: process.env.BREVO_SENDER_NAME || "StudyDesk",
      },
      subject: `Support Ticket ${ticketId} | StudyDesk`, // ✅ REQUIRED
      htmlContent: userConfirmationHtml, // ✅ correct key
    };

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("✅ Brevo email sent:", response.messageId);

    return res.status(200).json({
      success: true,
      message: "Support ticket created successfully. Email sent.",
      ticketId,
    });
  } catch (error) {
    console.error("❌ Brevo email failed:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send support email",
    });
  }
};
