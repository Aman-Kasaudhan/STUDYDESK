exports.courseEnrollmentEmail = (
  userName,
  courseName,
  courseDescription,
  courseThumbnail,
  courseLink
) => {
  return `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        
        <div style="background-color: #4f46e5; color: #ffffff; padding: 20px; text-align: center;">
          <h2>🎉 Congratulations, ${userName}!</h2>
          <p>You have successfully enrolled in</p>
          <h3 style="margin-top: 5px;">${courseName}</h3>
        </div>

        <div style="padding: 20px;">
          <img src="${courseThumbnail}" alt="${courseName}" style="width: 100%; border-radius: 8px;" />
          <p style="margin-top: 15px;">${courseDescription}</p>
          <a href="${courseLink}" style="display: inline-block; margin-top: 20px; background-color: #4f46e5; color: #ffffff; padding: 10px 20px; border-radius: 5px; text-decoration: none;">
            Go to Course
          </a>
        </div>

        <div style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 14px; color: #888;">
          If you have any questions, feel free to contact us at <a href="mailto:support@yourdomain.com">support@yourdomain.com</a>
        </div>
      </div>
    </div>
  `;
};
