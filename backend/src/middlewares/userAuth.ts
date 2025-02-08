import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../firebase-admin";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Extend Express Request type to include user information
declare global {
    namespace Express {
        interface Request {
            user?: {
                uid: string;
                email: string;
            };
        }
    }
}

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ error: "Authorization token missing or malformed" });
            return
        }

        const token = authHeader.split(" ")[1];

        // Verify Firebase token
        const decodedToken = await verifyToken(token);
        if (!decodedToken?.uid) {
            res.status(401).json({ error: "Invalid token" });
            return
        }

        const email = decodedToken.email || "";

        // Attach user info to request
        req.user = {
            uid: decodedToken.uid,
            email,
        };



        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({ error: "Invalid or expired token" });
        return
    }
};

export default authenticate;
