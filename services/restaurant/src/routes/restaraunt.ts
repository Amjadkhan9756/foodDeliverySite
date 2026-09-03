import express from "express";
import {isAuth,isSeller} from "../middleware/auth";
import { addRestaurant, fetchMyRestaurant } from "../controller/restaraunt.js";
import restaurant from "../models/restaurant.js";
const router = express.Router();



router.post("/add",isAuth,isSeller,addRestaurant);

router.get("/get",isAuth,isSeller,fetchMyRestaurant);

export default router;