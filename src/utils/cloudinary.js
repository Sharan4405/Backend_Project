import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

 // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINAY_CLOUD_NAME, 
        api_key: process.env.CLOUDINAY_API_KEY, 
        api_secret: process.env.CLOUDINAY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

const uploadOnCloudinary = async (localFilePath) => {
    try{
      if(!localFilePath) return null;
      const response = await cloudinary.uploader.upload(localFilePath,{
        resouce_type: "auto"
      })
      //file has been uploaded successfully
      console.log(`file uploaded successfully at cloudinary`,response.url);
      return response;
    }catch(err){
      fs.unlinkSync(localFilePath)//remove the locally saved  temperorily file as the upload operation got failed
      console.log("failed to upload file on cloudinary")
      return null;
    }
}

export {uploadOnCloudinary}

   