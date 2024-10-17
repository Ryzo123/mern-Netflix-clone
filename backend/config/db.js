import mongoose from "mongoose";
import { ENV_VARS}  from "./envVars.js";
export const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(ENV_VARS.MONGO_URI)
        console.log("connection success")
    }
    catch(error){
        console.log("connection failes");
        process.exit(1);
    }
}