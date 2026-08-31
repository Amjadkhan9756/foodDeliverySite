import express from "express";
import {isAuth,isSeller} from "../middleware/auth";
import { addRestaurant } from "../controller/restaraunt.js";
const router = express.Router();



router.post("/add",isAuth,isSeller,addRestaurant);

export default router;