const TryCatch = (handler) => {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        }
        catch (err) {
            res.status(500).json({
                message: err?.message ?? "Internal server error"
            });
        }
    };
};
export default TryCatch;
