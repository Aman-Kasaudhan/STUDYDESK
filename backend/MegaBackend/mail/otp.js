async function sendOtp(email){ 
    try {
        const otpTemplate = `
            <div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
              <h2 style="color: #333;">Hi there 👋</h2>
              <p style="font-size: 16px; color: #555;">Your One-Time Password (OTP) for verification is:</p>
              <div style="text-align: center; margin: 30px 0;">
                <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; background: #e6f4ff; padding: 10px 20px; border-radius: 8px; color: #007bff;">{{OTP}}</span>
              </div>
              <p style="font-size: 14px; color: #777;">This OTP is valid for 5 minutes. Please do not share it with anyone.</p>
              <hr style="margin: 20px 0;">
              <p style="font-size: 12px; color: #aaa;">If you didn’t request this OTP, you can safely ignore this email.</p>
              <p style="font-size: 14px; color: #444;">– Aman 👨‍💻</p>
            </div>
        `;

              const htmlContent = otpTemplate.replace("{{OTP}}", otp);
        const mailResponse = await mailSender(email, "Your OTP for verification", htmlContent);
     console.log("Email sent successfully",mailResponse)
    }
    catch(error){
        console.log("error occured while sending mail",error)
       throw error;
    }
}
