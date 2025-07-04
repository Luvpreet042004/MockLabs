"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = require("../firebase-admin");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ error: "Authorization token missing or malformed" });
            return;
        }
        const token = authHeader.split(" ")[1];
        // Verify Firebase token
        const decodedToken = yield (0, firebase_admin_1.verifyToken)(token);
        if (!(decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.uid)) {
            res.status(401).json({ error: "Invalid token" });
            return;
        }
        const email = decodedToken.email || "";
        // Attach user info to request
        req.user = {
            uid: decodedToken.uid,
            email,
        };
        next();
    }
    catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({ error: "Invalid or expired token" });
        return;
    }
});
exports.default = authenticate;
