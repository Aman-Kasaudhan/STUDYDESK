const cloudinary=require("cloudinary").v2;

exports.uploadVideo = async (file,folder) => {
  try {
    // const file = req.files.video; // from express-fileupload / multer

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "video",
      folder: "course_videos",
      chunk_size: 6000000, // 6MB chunks (important)
    });

    // res.status(200).json({
    //   success: true,
    //   videoUrl: result.secure_url,
    //   publicId: result.public_id,
    //   duration: result.duration,
    // });
    return result;
  } catch (error) {
    // res.status(500).json({
    //   success: false,
    //   message: error.message,
    // });
    throw error;
  }
};
