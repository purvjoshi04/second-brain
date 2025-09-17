import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

interface AuthenticatedRequest extends Request {
    userId?: string;
}


export function userMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token not provided" });
    }

    try {
        const secret = process.env.JWT_USER_SECRET;

        if (!secret) {
            return res.status(500).json({ message: "JWT secret not defined in environment variables." });
        }

        const decoded = jwt.verify(token, secret) as JwtPayload;

        if (!decoded.id) {
            return res.status(403).json({ message: "Invalid token payload" });
        }

        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}
