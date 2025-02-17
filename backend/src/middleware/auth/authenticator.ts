// Authentication logic for user, making sure that the user is logged in before they perform any actions
import { Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken"

const JWT_SECRET = "abc123"; // TODO: Move to .env when implemented

export default function authenticator(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // Get token from Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided." });
    }

    const token = authHeader.split(" ")[1]; 

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token" });
    }
}