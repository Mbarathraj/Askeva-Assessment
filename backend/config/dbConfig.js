import mongoose from "mongoose"

export const connectDB = async ()=>{
    try{
        const MONGO_URI = process.env.MONGO_URI
        const conn = await mongoose.connect(MONGO_URI)
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }
    catch(err){
        console.error("Error connecting to MongoDB:", err);
    }
}