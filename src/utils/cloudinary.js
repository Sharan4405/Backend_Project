import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import dotenv from 'dotenv';
dotenv.config();
console.log("Cloudinary ENV:", process.env.CLOUDINARY_CLOUD_NAME, process.env.CLOUDINARY_API_KEY, process.env.CLOUDINARY_API_SECRET);
 // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

const uploadOnCloudinary = async (localFilePath) => {
    try{
      if(!localFilePath) return null;
      const response = await cloudinary.uploader.upload(localFilePath,{
        resource_type: "auto"
      })
      //file has been uploaded successfully
      console.log(`file uploaded successfully at cloudinary`,response.url);
      return response;
    }catch(err){
      if(fs.existsSync(localFilePath)){
      fs.unlinkSync(localFilePath)//remove the locally saved  temperorily file as the upload operation got failed
      }
      console.log("failed to upload file on cloudinary",err)
      return null;
    }
}

export {uploadOnCloudinary}

   