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
        <p><b>📞 Phone:</b> +91 9125275840</p>

        <p style="margin-top:20px;">Message:</p>
       

        <hr />

        <p>Regards,<br/><b>StudyDesk Support Team</b></p>
      </div>
    </div>
  `;

  const adminEmailTemplate = `
  <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:30px;">
    <div style="max-width:650px; margin:auto; background:#ffffff; padding:25px; border-radius:8px;">
      
      <h2 style="color:#2c3e50; margin-bottom:10px;">
        📩 New Contact Request Received
      </h2>

      <p style="color:#555; font-size:15px;">
        A new user has submitted a contact/support request. Details are below:
      </p>

      <hr style="margin:20px 0;" />

      <table style="width:100%; border-collapse:collapse; font-size:15px;">
        <tr>
          <td style="padding:8px; font-weight:bold; width:35%;">👤 Name:</td>
          <td style="padding:8px;">${firstName} ${lastName}</td>
        </tr>

        <tr style="background:#f9f9f9;">
          <td style="padding:8px; font-weight:bold;">📧 Email:</td>
          <td style="padding:8px;">${email}</td>
        </tr>

        <tr>
          <td style="padding:8px; font-weight:bold;">📞 Phone:</td>
          <td style="padding:8px;">${phoneCode} ${phoneNumber}</td>
        </tr>

        <tr style="background:#f9f9f9;">
          <td style="padding:8px; font-weight:bold;">🕒 Received At:</td>
          <td style="padding:8px;">${new Date().toLocaleString()}</td>
        </tr>
      </table>

      <hr style="margin:20px 0;" />

      <h3 style="color:#2c3e50;">📝 User Message</h3>
      <div style="background:#f8fafc; padding:15px; border-radius:6px; border-left:4px solid #2563eb;">
        <p style="margin:0; color:#333; white-space:pre-line;">
          ${message}
        </p>
      </div>

      <hr style="margin:25px 0;" />

      <p style="font-size:14px; color:#555;">
        👉 Please respond to the user within 24 hours.
      </p>

      <p style="font-size:14px; color:#888;">
        — StudyDesk System Notification
      </p>
    </div>
  </div>
`;


  try {
    const client = SibApiV3Sdk.ApiClient.instance;
    client.authentications["api-key"].apiKey =
      process.env.BREVO_API_KEY;

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    await apiInstance.sendTransacEmail({
      to: [{ email }], // ✅ MUST be array
      sender: {
        email: process.env.BREVO_SENDER_EMAIL,
        name: process.env.BREVO_SENDER_NAME || "StudyDesk",
      },
      subject: `Support Ticket ${ticketId} | StudyDesk`, // ✅ REQUIRED
      htmlContent: userConfirmationHtml, // ✅ correct key
    });

      await apiInstance.sendTransacEmail({
      to: [{ email: process.env.BREVO_SENDER_EMAIL }],
      sender: {
        email: process.env.BREVO_SENDER_EMAIL,
        name: "StudyDesk System",
      },
      subject: `New Support Ticket ${ticketId}`,
      htmlContent: adminEmailTemplate,
    });

    // const response = await apiInstance.sendTransacEmail(sendSmtpEmail);

    // console.log("✅ Brevo email sent:", response.messageId);

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
