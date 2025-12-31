const twilio = require("twilio");
 
const client_ = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

exports.sendWhatsApp = async (data) => {
    
  const message = `
📩 *New Contact Message*

👤 Name: ${data.firstName} ${data.lastName}
📧 Email: ${data.email}
📞 Phone: ${data.phoneCode} ${data.phoneNumber}

📝 Message:
${data.message}
  `;

  await client_.messages.create({
    from: process.env.TWILIO_WHATSAPP_FROM,
    to: process.env.ADMIN_WHATSAPP,
     
    body: message,
  });
};

