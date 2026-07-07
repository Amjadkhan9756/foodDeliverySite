import User from "../modules/User.js";
import jwt from "jsonwebtoken";
import TryCatch from "../middleware/tryCatch.js";
import axios from "axios";
import { oauth2client } from "../config/googleConfig.js";
export const loginUser = TryCatch(async (req, res, next) => {
    const { code } = req.body;
    if (!code) {
        res.status(400).json({ message: "Authorization code is required" });
        return;
    }
    try {
        const googleRes = await oauth2client.getToken(code);
        oauth2client.setCredentials(googleRes.tokens);
        const userRes = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`);
        const { email, name, picture } = userRes.data;
        if (!email || !name) {
            res.status(400).json({ message: "Google user info is incomplete" });
            return;
        }
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                email,
                name,
                image: picture || "",
            });
        }
        const token = jwt.sign({ user }, process.env.JWT_SEC, {
            expiresIn: "15d",
        });
        res.status(200).json({
            message: "loggedIn successfully",
            token,
            user,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Google login failed" });
    }
});
const allowedRoles = ["customer", "rider", "seller"];
export const addUserRole = TryCatch(async (req, res, next) => {
    if (!req.user?._id) {
        res.status(401).json({
            message: "Unauthorized",
        });
        return;
    }
    const { role } = req.body;
    if (!allowedRoles.includes(role)) {
        res.status(400).json({
            message: "Invalid role",
        });
        return;
    }
    const user = await User.findByIdAndUpdate(req.user._id, { role }, { new: true });
    if (!user) {
        res.status(404).json({
            message: "User not found",
        });
        return;
    }
    const token = jwt.sign({ user }, process.env.JWT_SEC, {
        expiresIn: "15d",
    });
    res.json({ user, token });
});
export const myProfile = TryCatch(async (req, res, next) => {
    const user = req.user;
    res.json(user);
});
