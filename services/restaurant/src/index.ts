import express from "express"
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import restaurantRoutes from "./routes/restaraunt.js";

dotenv.config();
await connectDB();
const app =express();

app.use(express.json());

app.use("/api/restaurant",restaurantRoutes);
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
