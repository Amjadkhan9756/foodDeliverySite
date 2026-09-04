import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import restaurantRoutes from "./routes/restaraunt.js";
import cors from "cors";
dotenv.config();
await connectDB();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/restaurant", restaurantRoutes);
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
