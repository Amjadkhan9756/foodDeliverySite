import express from 'express'

import dotenv from 'dotenv'
import connectDB from "./config/db.js";
import authRouter from "./router/auth.js";
import cors from "cors";
dotenv.config()
const app = express()

await connectDB();
app.use(cors());
app.use(express.json())
app.use('/api/auth', authRouter);





app.get("/", (req, res) => {
    res.send({ message: "Welcome to the Auth API" })
})






const PORT = 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`)
})
