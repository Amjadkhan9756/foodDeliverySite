import express from "express"
import dotenv from "dotenv"
import cloudinary from "cloudinary";
import uploadRoutes from "./routes/cloudinary";
import cors from "cors";






const app = express();
app.use(cors());
dotenv.config();
app.use(cors());



const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_SECRET_KEY } = process.env;

if (!CLOUD_NAME || !CLOUD_API_KEY || !CLOUD_SECRET_KEY) {
    throw new Error("Missing cloudinary environment variables ")
}


cloudinary.v2.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_API_KEY,
    api_secret: CLOUD_SECRET_KEY
})

app.use("/api/upload", uploadRoutes);
















const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})