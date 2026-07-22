import dotenv from "dotenv"
dotenv.config()
import app from "./app.js"
import { connectDB } from "./config/dbConfig.js";
connectDB().then(()=>{
    app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
})

const PORT = process.env.PORT || 5000;


