import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"

const registerUser = asyncHandler(async (req,res) => {
    //get user details from frontend
    //validation - not empty
    //check if user exits already: username,email
    //check for images,check for avatar
    //upload them to cloudinary
    //create user object - create entry in db
    //remove password and refresh token field from response 
    //check for user creation
    const {fullName, email, username, password} = req.body;
    console.log("email:", email)
    console.log("Password:", password)

    if(
        [fullName,email,username,password].some((field)=>
           field?.trim() === "")
    ){
       throw new ApiError(400,"All fileds are Required")
    }

    const existedUser = User.findOne({
        $or: [{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"User is Already Registered, Please Login to proceed")
    }
    console.log(req.files)
})

export {registerUser}