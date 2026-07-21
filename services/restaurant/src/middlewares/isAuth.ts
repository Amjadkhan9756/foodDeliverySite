import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser } from "../modules/User.js";

export interface IUser {
    _id: String;
    name: string;
    email: string;
    image: string;
    role: string;
}

export interface AuthenticatedRequest extends Request {
    user?: IUser | null;
}
export const isAuth: RequestHandler = async (
    req,
    res,
    next: NextFunction

): Promise<void> => {
    const authReq = req as AuthenticatedRequest;
    try {
        const authHeader = authReq.header("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({
                message: "Please login --No auth header"
            });
            return;
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            res.status(401).json({
                message: "Please login -- token misssing "
            })
            return;
        }
        const decodedValue = jwt.verify(
            token,
            process.env.JWT_SEC as string
        ) as JwtPayload;

        if (!decodedValue || !decodedValue.user) {
            res.status(401).json(
                {
                    message: "Token invalid"
                }
            )
            return;
        }

        authReq.user = decodedValue.user;
        next();


    } catch (error) {
        res.status(500).json({
            message: "Please login -- jwt error "
        })

    }
}


