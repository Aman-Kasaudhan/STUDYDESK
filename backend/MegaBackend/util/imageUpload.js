const cloudinary=require("cloudinary").v2;

exports.uploadCloudinary=async(file,folder,height,quality)=>{
    const options = {
        folder,
        resource_type: "auto",    
        transformation: [],
    };
    if (height) {
        options.height=height; // e.g., { quality: 60 }
    }
    if (quality) {
        options.transformation.push({ quality }); // e.g., { quality: 60 }
    }
return await cloudinary.uploader.upload(file.tempFilePath, options);
}




