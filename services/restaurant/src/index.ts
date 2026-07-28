import express from "express"
import connectDB from "./config/db.js";
import dotenv from "dotenv";


dotenv.config();
await connectDB();
const app =express();




const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
