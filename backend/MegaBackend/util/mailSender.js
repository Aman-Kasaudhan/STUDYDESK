const SibApiV3Sdk = require("sib-api-v3-sdk");

exports.mailSender = async (email, title, htmlContent) => {
  try {
    // Configure API client
    console.log(email);
    const client = SibApiV3Sdk.ApiClient.instance;
    client.authentications["api-key"].apiKey =
      process.env.BREVO_API_KEY;

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    // Email payload
    // const sendSmtpEmail = {
    //   to: [{ email }],
    //   sender: {
    //     email: process.env.BREVO_SENDER_EMAIL,
    //     name: process.env.BREVO_SENDER_NAME || "StudyDesk",
    //   },
    //   subject: title,
    //   htmlContent,
    // };

    const sendSmtpEmail = {
  to: [{ email: "yourpersonalemail@gmail.com" }],
  sender: {
    email: process.env.BREVO_SENDER_EMAIL,
    name: "Brevo Test",
  },
  subject: "Brevo Test Email",
  htmlContent: "<h1>Brevo Test Successful</h1>",
};


    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("✅ Brevo email sent:", response.messageId);
    return response;
  } 
  catch (error) {
  console.error("❌ Brevo ERROR OBJECT:", error);

  if (error.response) {
    console.error("❌ Brevo RESPONSE BODY:", error.response.body);
    console.error("❌ Brevo RESPONSE STATUS:", error.response.status);
  }

  throw error; // important
}

};


 
