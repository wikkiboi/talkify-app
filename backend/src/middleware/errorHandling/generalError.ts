import { Request, Response, NextFunction } from "express";

const generalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.status === 400) {
        return res.status(400).json({ message: "Cannot process request due to invalid input." })
    }

    if (err.status === 404) {
        return res.status(404).json({ message: "Requested resource does not exist." });
    }

    if (err.status === 500) {
        return res.status(500).json({ message: "Internal server encountered an error." });
    }

    next(err);
};

export default generalErrorHandler;