import express from "express";
import { loginUser } from "../controllers/authController.js";
import { addUserRole } from "../controllers/authController.js";
import { isAuth } from "../middleware/isAuth.js";
const router = express.Router();
router.post('/login', loginUser);
router.put("/add/role", isAuth, addUserRole);
export default router;
