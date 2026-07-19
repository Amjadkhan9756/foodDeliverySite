import express from "express"
import connectDB from "./config/db.js";
import dotenv from "dotenv";


dotenv.config();
await connectDB();
const app =express();




const PORT = 8080;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`)
})
