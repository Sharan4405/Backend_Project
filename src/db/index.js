import mongoose from 'mongoose';
import {DB_NAME} from "../constants.js"

const connectdb = async () => {
    try{
      const connectioninstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
      console.log(`Mongodb connected: ${connectioninstance.connection.host}`)
    }catch(error){
      console.log("Mongodb connection failed" , error);
      process.exit(1)
    }
}

export default connectdb