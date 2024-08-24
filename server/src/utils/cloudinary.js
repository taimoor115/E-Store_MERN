import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("File uploaded successfully", response.url);
    fs.unlink(localFilePath);
    return response;
  } catch (error) {
    fs.unlink(localFilePath);

    return null;
  }
};

export const deleteImageOnCloudinary = async (imageId) => {
  try {
    const deletedImage = await cloudinary.uploader.destroy(imageId);

    if (deletedImage.result == "ok") {
      console.log("Image delete successfully...");
    } else {
      console.log("Error occur while deleting");
    }

    return deletedImage;
  } catch (error) {
    console.log(error);
  }
};
