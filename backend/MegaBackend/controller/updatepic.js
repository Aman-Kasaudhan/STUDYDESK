const File = require("../model/user");
const cloudinary = require("cloudinary").v2;
// const User=require("../model/user");

function isSupported(type, supportedType) {
    return supportedType.includes(type);
}
      
async function upload2(file,folder){
    const options={folder};  
return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.updatePic = async (req, res) => {
    try {
        
       const userId='68a0654d1c283f4d142d455f';
       const {email}=req.body;
        // const userId = req.user?.id || req.body.userId; // fallback for testing
        const user = await File.findById({email}).select("image");
        console.log(user);
        //   const {image}=req.body;
        // Fetch data
        // const {name ,email, tags} = req.body;
        const file = req.updatePicFolder.imageFile;

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        // Validation

        const supportType = ["webp","jpg", "jpeg", "png", "pdf"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if (!isSupported(fileType, supportType)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported",
            });
        }

        

       // Upload to Cloudinary

       
       const response=await upload2(file,"FileUpload");
       
        // Save to MongoDB
        const fileData = await user.findByIdAndUpdate(
    //   req.params.id,
    // user,
      { image },
      { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "File uploaded successfully",
            // data: fileData,
        });

    } 
    catch (err) {
        console.error("Upload error:", err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong during file upload",
        });
    }
};
