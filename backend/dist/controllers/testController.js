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
exports.getScoreDistribution = exports.getSubjectAverages = exports.getTestNames = exports.getUserStats = exports.getTests = exports.addTest = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const addTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, mathScore, physicsScore, chemistryScore, timeTaken, userId, accuracy } = req.body;
        // Ensure required fields are present
        if (!name || mathScore == null || physicsScore == null || chemistryScore == null || timeTaken == null || !userId) {
            res.status(400).json({ msg: "Missing required fields" });
            return;
        }
        // Calculate total and average scores
        const totalScore = mathScore + physicsScore + chemistryScore;
        // Create test entry in the database
        const newTest = yield prisma.test.create({
            data: {
                name,
                mathScore,
                physicsScore,
                chemistryScore,
                totalScore,
                accuracy,
                timeTaken,
                userId
            }
        });
        res.status(201).json({ msg: "Test added successfully", test: newTest });
        return;
    }
    catch (error) {
        console.error("Error adding test:", error);
        res.status(500).json({ msg: "Failed to add test", error });
        return;
    }
});
exports.addTest = addTest;
const getTests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const email = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
        const user = yield prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(401).json({ msg: "Unauthorized: User not found" });
            return;
        }
        const test = yield prisma.test.findMany({
            where: {
                userId: user.id
            }
        });
        if (!test) {
            res.status(404).json({ msg: "Test not found" });
            return;
        }
        res.status(200).json({ msg: "Test found", test });
        return;
    }
    catch (error) {
        console.error("Error fetching test:", error);
        res.status(500).json({ msg: "Failed to fetch test", error: error });
        return;
    }
});
exports.getTests = getTests;
const getUserStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const email = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email; // Get authenticated user from middleware
        const user = yield prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ msg: "Unauthorized: User not found" });
        }
        // Fetch all tests for the user
        const tests = yield prisma.test.findMany({
            where: { userId: user.id },
        });
        if (tests.length === 0) {
            return res.status(404).json({ msg: "No tests found for this user" });
        }
        // Calculate averages
        const totalTests = tests.length;
        const avgMathScore = tests.reduce((sum, test) => sum + test.mathScore, 0) / totalTests;
        const avgPhysicsScore = tests.reduce((sum, test) => sum + test.physicsScore, 0) / totalTests;
        const avgChemistryScore = tests.reduce((sum, test) => sum + test.chemistryScore, 0) / totalTests;
        const avgTotalScore = tests.reduce((sum, test) => sum + test.totalScore, 0) / totalTests;
        const avgTimeTaken = tests.reduce((sum, test) => sum + test.timeTaken, 0) / totalTests;
        const accuracy = tests.reduce((sum, test) => sum + test.accuracy, 0) / totalTests;
        return res.status(200).json({
            msg: "User stats retrieved successfully",
            stats: {
                totalTests,
                userId: user.id,
                avgMathScore,
                avgPhysicsScore,
                avgChemistryScore,
                avgTotalScore,
                avgTimeTaken,
                accuracy
            },
        });
    }
    catch (error) {
        console.error("Error fetching user stats:", error);
        return res.status(500).json({ msg: "Failed to fetch user stats", error });
    }
});
exports.getUserStats = getUserStats;
const getTestNames = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tests = yield prisma.solution.findMany({
            select: { testName: true },
        });
        res.json(tests.map(test => test.testName));
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch test names" });
    }
});
exports.getTestNames = getTestNames;
const getSubjectAverages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        } // Assuming user ID is passed in params
        // Fetch all tests of the user
        const tests = yield prisma.test.findMany({
            where: { userId: user.id },
        });
        if (!tests.length) {
            res.status(404).json({ message: "No tests found for this user." });
            return;
        }
        // Calculate subject-wise averages
        const subjectAverages = [
            {
                subject: "Mathematics",
                average: tests.reduce((sum, test) => sum + test.mathScore, 0) / tests.length,
            },
            {
                subject: "Physics",
                average: tests.reduce((sum, test) => sum + test.physicsScore, 0) /
                    tests.length,
            },
            {
                subject: "Chemistry",
                average: tests.reduce((sum, test) => sum + test.chemistryScore, 0) /
                    tests.length,
            },
        ];
        res.json(subjectAverages);
    }
    catch (error) {
        console.error("Error fetching subject averages:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getSubjectAverages = getSubjectAverages;
const getScoreDistribution = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const email = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
        const user = yield prisma.user.findUnique({
            where: { email },
            include: { tests: true },
        });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // Fetch all test records
        const tests = yield prisma.test.findMany({
            where: { userId: user.id },
            select: { totalScore: true },
        });
        // Initialize the score distribution
        const scoreRanges = {
            "200+": 0,
            "151-200": 0,
            "101-150": 0,
            "< 100": 0,
        };
        // Categorize total scores
        tests.forEach((test) => {
            const score = test.totalScore;
            if (score > 200)
                scoreRanges["200+"]++;
            else if (score >= 151)
                scoreRanges["151-200"]++;
            else if (score >= 101)
                scoreRanges["101-150"]++;
            else
                scoreRanges["< 100"]++;
        });
        // Format data for frontend
        const formattedData = Object.keys(scoreRanges).map((key) => ({
            name: key,
            value: scoreRanges[key],
        }));
        res.json(formattedData);
    }
    catch (error) {
        console.error("Error fetching test scores:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getScoreDistribution = getScoreDistribution;
