import express from 'express';
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import authRouter from "./router/auth.js";
dotenv.config();
await connectDB();
const app = express();
app.use(express.json());
app.use('/api/auth', authRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
