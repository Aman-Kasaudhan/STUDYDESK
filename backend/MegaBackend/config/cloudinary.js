const cloudinary = require("cloudinary").v2; // Make sure to use `.v2` for latest API
exports.cloudinaryConnect = () => {
    try {
        //  console.log("Cloudinary ENV:", {
        //     name: process.env.CLOUD_NAME,
        //     key: process.env.CLOUD_KEY,
        //     secret: process.env.API_SECRET ? "loaded ✅" : "missing ❌"
        // });
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_KEY,
            api_secret: process.env.API_SECRET, // ✅ corrected spelling
        });
        console.log("✅ Cloudinary connected");
    } catch (err) {
        
        console.log("❌ Cloudinary config error:", err);
    }
};

// module.exports = { cloudinaryConnect };
