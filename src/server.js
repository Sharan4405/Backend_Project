import mongoose from 'mongoose';
import { DB_NAME } from './constants.js';
import connectdb from './db/index.js'
import dotenv from 'dotenv'
import {app} from './app.js'
dotenv.config({
  path: '.env'
})

connectdb()
.then(() => {
  app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running at the port: ${process.env.PORT}`)
  })
})
.catch((err) => {
  console.log("MongoDB Connection Failed!!!",err)
})









/*import express from 'express';
const app = express();

async () => {
   try{
     await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
     app.on("error", (error) => {
      console.log("Backend is unable to connect to the database", error)
      throw error
     })
     app.listen(process.env.PORT, () => {
      console.log(`App is listeing on port ${process.env.PORT}`)
     })
   }catch(error){
     console.log("Error:" , error)
     throw error;
   }
}*/
      
