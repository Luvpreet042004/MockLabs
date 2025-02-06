import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addTest = async (req: Request, res: Response) => {
    try {
        const { name, mathScore, physicsScore, chemistryScore, timeTaken, userId,accuracy } = req.body;

        // Ensure required fields are present
        if (!name || mathScore == null || physicsScore == null || chemistryScore == null || timeTaken == null || !userId) {
            res.status(400).json({ msg: "Missing required fields" });
            return
        }

        // Calculate total and average scores
        const totalScore = mathScore + physicsScore + chemistryScore;

        // Create test entry in the database
        const newTest = await prisma.test.create({
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
        return
    } catch (error) {
        console.error("Error adding test:", error);
        res.status(500).json({ msg: "Failed to add test", error });return
    }
};


export const getTest = async (req: Request, res: Response) => {
    try {
        const { testName } = req.params;
        const user = req.user;

        if (!testName) {
            res.status(400).json({ msg: "Test name is required" });return
        }
        if (!user) {
            res.status(401).json({ msg: "Unauthorized: User not found" });return
        }

       
        const test = await prisma.test.findFirst({
            where: {
                name: testName,
                userId: user.id 
            }
        });

        if (!test) {
            res.status(404).json({ msg: "Test not found" });
            return
        }

        res.status(200).json({ msg: "Test found", test });
        return
    } catch (error) {
        console.error("Error fetching test:", error);
        res.status(500).json({ msg: "Failed to fetch test", error: error });
        return
    }
};

export const getUserStats = async (req: Request, res: Response) => {
    try {
        const user = req.user; // Get authenticated user from middleware

        if (!user) {
            return res.status(401).json({ msg: "Unauthorized: User not found" });
        }

        // Fetch all tests for the user
        const tests = await prisma.test.findMany({
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
    } catch (error) {
        console.error("Error fetching user stats:", error);
        return res.status(500).json({ msg: "Failed to fetch user stats", error });
    }
};