import jwt from "jsonwebtoken";
export const isAuth = async (req, res, next) => {
    const authReq = req;
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
            });
            return;
        }
        const decodedValue = jwt.verify(token, process.env.JWT_SEC);
        if (!decodedValue || !decodedValue.user) {
            res.status(401).json({
                message: "Token invalid"
            });
            return;
        }
        authReq.user = decodedValue.user;
        next();
    }
    catch (error) {
        res.status(500).json({
            message: "Please login -- jwt error "
        });
    }
};
