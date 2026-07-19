import { Request, Response, RequestHandler, NextFunction } from "express";

const TryCatch = <Req extends Request = Request>(
    handler: (req: Req, res: Response, next: NextFunction) => Promise<void>
): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await handler(req as Req, res, next);
        } catch (err: any) {
            res.status(500).json({
                message: err?.message ?? "Internal server error"
            });
        }
    };
};

export default TryCatch;