import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'//used for encrypting and decrypting 
const UserSchema = new mongoose.Schema(
    {
       username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
       },
       email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
       },
       fullname: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
       },
       avatar: {
        type: String,//cloudinary url
        required: true
       },
       coverImage: {
        type: String
       },
       watchHistory: [{
        type: Schema.Types.ObjectId,
        ref: "Video"
       }
    ],
       password: {
        type: String,
        required:[true, 'Password is required'],
       },
       refreshToken: {
        type: String
       }
    },
    {
        timestamps: true
    }
)
UserSchema.pre("save" , async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

UserSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password, this.password)
}

UserSchema.methods.generateAccessToken = function(){
    return jwt.sign(
    {
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
UserSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
    {
        _id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)
}
export const User = mongoose.model("User" , UserSchema)

//In JavaScript, although the language is single-threaded, it supports asynchronous programming using constructs like async and await. This allows time-consuming tasks such as password hashing, file access, or API calls to be performed without blocking the execution of the rest of the program. The async keyword is used to define a function that returns a Promise, and inside that function, the await keyword is used to pause execution until the awaited Promise is resolved. This helps developers write code in a synchronous-like flow while still benefiting from non-blocking behavior under the hood.
//For example, when saving a user in a MongoDB database with a password that needs hashing, the hashing function (like bcrypt.hash) is slow and asynchronous. If you don’t await it, the function won’t wait for hashing to complete, and the raw (unhashed) password—or worse, a Promise—may get saved in the database. That’s why we use await to ensure that the password is fully hashed before moving on to the next step, like saving the user.
// The pre("save") hook in Mongoose demonstrates this clearly. It checks if the password is modified using this.isModified("password"). If true, it hashes the password using await bcrypt.hash(...) and only after that proceeds to save the user. Without await, the next task would execute immediately, possibly with incomplete or invalid data. So in short, await is used to ensure correctness and sequence in execution, not to give more computational power or slow down other tasks—it simply lets you control when each task finishes before continuing, especially in critical operations like encryption, authentication, and database transactions.