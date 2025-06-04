const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const multer = require("multer");

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup to store files in memory as buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload helper - uploads base64 Data URI string to Cloudinary
async function imageUploadUtil(file) {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return result;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw error; // rethrow to handle upstream
  }
}

module.exports = { upload, imageUploadUtil };
