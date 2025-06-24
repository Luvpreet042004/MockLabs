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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAverageAccuracy = exports.getProfile = exports.deleteUser = exports.loginUser = void 0;
const client_1 = require("@prisma/client");
const firebase_admin_1 = __importDefault(require("../firebase-admin"));
const auth = firebase_admin_1.default.auth();
const prisma = new client_1.PrismaClient();
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const email = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
        // Validate email
        if (!email) {
            res.status(401).json({ message: "Unauthorized request: Email not provided" });
            return;
        }
        // Check if user exists
        const user = yield prisma.user.findUnique({ where: { email } });
        if (user) {
            // User exists, log them in
            res.status(200).json({
                message: "User logged in successfully",
                id: user.id,
                name: user.name,
                email: user.email
            });
            return;
        }
        else {
            // User doesn't exist, create a new user
            const { name } = req.body;
            // Validate name
            if (!name) {
                res.status(400).json({ message: "Name is required for new users" });
                return;
            }
            const newUser = yield prisma.user.create({
                data: {
                    email,
                    name
                },
            });
            res.status(201).json({
                message: "User created successfully",
                id: newUser.id,
                email: newUser.email,
                name: newUser.name
            });
            return;
        }
    }
    catch (error) {
        console.error("Error during login:", error);
        // Handle specific errors
        if (error instanceof Error) {
            res.status(500).json({
                message: "Internal server error",
                error: error.message
            });
            return;
        }
        res.status(500).json({
            message: "Internal server error"
        });
        return;
    }
});
exports.loginUser = loginUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const userId = Number(req.params.userId);
    const email = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
    const uid = ((_b = req.user) === null || _b === void 0 ? void 0 : _b.uid) || "";
    if (!email && !uid) {
        res.status(401).json({ message: "Unauthorized request" });
        return;
    }
    try {
        // Check if the user exists in the database
        const user = yield prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // First, delete the user from Firebase Authentication
        yield auth.deleteUser(uid);
        // Then, delete the user from the Prisma database
        yield prisma.user.delete({
            where: { id: userId },
        });
        res.status(200).json({ message: "User deleted successfully from both Firebase and DB" });
    }
    catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
});
exports.deleteUser = deleteUser;
const formatDateToIST = (date) => {
    return new Date(date).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    });
};
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const email = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
        // Fetch user details
        const user = yield prisma.user.findUnique({
            where: { email },
            include: { tests: true },
        });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const totalTests = user.tests.length;
        const totalScoreSum = user.tests.reduce((sum, test) => sum + test.totalScore, 0);
        const bestScore = Math.max(...user.tests.map(test => test.totalScore), 0);
        const averageScore = totalTests > 0 ? (totalScoreSum / totalTests).toFixed(2) : 0;
        res.json({
            name: user.name,
            email: user.email,
            accountCreated: formatDateToIST(user.createdAt),
            totalTests,
            averageScore: `${averageScore}`,
            bestScore: `${bestScore}`,
        });
    }
    catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getProfile = getProfile;
const getAverageAccuracy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const email = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
        // Fetch user details
        const user = yield prisma.user.findUnique({
            where: { email },
            include: { tests: true },
        });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const tests = yield prisma.test.findMany({
            where: { userId: user.id },
            select: { accuracy: true },
        });
        if (tests.length === 0) {
            res.status(404).json({ error: "No tests found for this user" });
            return;
        }
        const totalAccuracy = tests.reduce((sum, test) => sum + test.accuracy, 0);
        const num = totalAccuracy / tests.length;
        const averageAccuracy = Math.floor(num * 100) / 100;
        res.json({ userId: user.id, averageAccuracy });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
        return;
    }
});
exports.getAverageAccuracy = getAverageAccuracy;
