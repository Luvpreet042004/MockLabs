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
const express_1 = require("express");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
router.get('/answer', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const { testName } = req.query;
        if (!user) {
            res.status(401).json({ message: "Unauthorized request" });
            return;
        }
        console.log("user ok");
        if (!testName || typeof testName !== 'string') {
            res.status(400).json({ message: "TestName must be specified as a string", testName });
            return;
        }
        console.log(testName);
        const solution = yield prisma.solution.findUnique({
            where: { testName }
        });
        if (!solution) {
            res.status(404).json({ message: "Solution not found" });
            return;
        }
        res.status(200).json({ answer: solution.answer });
    }
    catch (error) {
        console.error("Error fetching solution:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
router.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { testName, answer } = req.body;
    try {
        const sol = yield prisma.solution.create({
            data: {
                testName,
                answer
            }
        });
        res.json({ msg: "successfull", sol });
    }
    catch (error) {
        res.json({ msg: "failed" });
    }
}));
exports.default = router;
router.post("/compare", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const email = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
        if (!email) {
            res.status(401).json({ message: "Unauthorized request" });
            return;
        }
        const user = yield prisma.user.findUnique({ where: { email } });
        const { questions, testName, timeTaken } = req.body;
        // Fetch correct answers from the Solution table
        const solution = yield prisma.solution.findUnique({
            where: { testName },
        });
        if (!solution) {
            res.status(404).json({ message: "Test solution not found" });
            return;
        }
        const correctAnswers = solution.answer; // Array of correct answers
        let totalScore = 0;
        let physicsScore = 0;
        let mathsScore = 0;
        let chemistryScore = 0;
        let correctAttempts = 0;
        let totalAttempts = 0;
        // Compare user answers and calculate score
        const results = questions.map(({ id, answer }) => {
            var _a;
            const correctAnswer = (_a = correctAnswers[id - 1]) !== null && _a !== void 0 ? _a : null;
            let isCorrect = answer !== null && answer === correctAnswer;
            let score = 0;
            if (answer !== null) {
                totalAttempts++; // Only count attempted questions
                if (isCorrect) {
                    correctAttempts++;
                    score = 4; // Correct answer
                }
                else {
                    score = -1; // Wrong answer
                }
            }
            // Categorize scores based on question range
            if (id >= 1 && id <= 30) {
                physicsScore += score;
            }
            else if (id >= 31 && id <= 60) {
                mathsScore += score;
            }
            else if (id >= 61 && id <= 90) {
                chemistryScore += score;
            }
            totalScore += score;
            return {
                id,
                selectedAnswer: answer,
                correctAnswer,
                isCorrect,
                score,
            };
        });
        // Calculate accuracy (avoid division by zero)
        const accuracy = totalAttempts > 0 ? (correctAttempts / totalAttempts) * 100 : 0;
        const userId = user === null || user === void 0 ? void 0 : user.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized request" });
            return;
        }
        yield prisma.test.create({ data: {
                name: testName,
                mathScore: mathsScore,
                physicsScore,
                chemistryScore,
                totalScore,
                accuracy,
                timeTaken,
                userId
            } });
        res.json({
            results,
            totalScore,
            subjectScores: {
                physics: physicsScore,
                maths: mathsScore,
                chemistry: chemistryScore,
            },
            accuracy: accuracy.toFixed(2) + "%", // Format as percentage
        });
    }
    catch (error) {
        console.error("Error in comparison:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
