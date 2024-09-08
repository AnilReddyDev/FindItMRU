import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return console.log("No file path provided");
        // Upload the image to Cloudinary
        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type:"image",
        });
        return result;
    } catch (error) {
        fs.unlinkSync(localFilePath);// Delete the file from locally saved file if upload fails
        console.log("Error uploading file to Cloudinary", error);
    }
}

export {uploadOnCloudinary}

