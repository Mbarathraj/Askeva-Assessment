import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./config/dbConfig.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(
                `Server is running on port ${PORT}`
            );
        });

    } catch (error) {
        console.log(
            "Server startup failed:",
            error.message
        );

        process.exit(1);
    }
};

startServer();