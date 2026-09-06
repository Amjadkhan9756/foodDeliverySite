import express from "express";
import {isAuth,isSeller} from "../middleware/auth";
import { addRestaurant, fetchMyRestaurant } from "../controller/restaraunt.js";
import restaurant from "../models/restaurant.js";
import uploadFile from "../middlewares/multer.js";
const router = express.Router();



router.post("/add",isAuth,isSeller,uploadFile,addRestaurant);

router.get("/get",isAuth,isSeller,fetchMyRestaurant);

export default router;