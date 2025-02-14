import { Response,Request } from 'express';
import { PrismaClient } from '@prisma/client';
import admin from '../firebase-admin';

const auth =admin.auth();


const prisma = new PrismaClient();

export const loginUser = async (req: Request, res: Response) => {
    try {
        const email = req.user?.email;

        // Validate email
        if (!email) {
            res.status(401).json({ message: "Unauthorized request: Email not provided" });
            return;
        }

        // Check if user exists
        const user = await prisma.user.findUnique({ where: { email } });

        if (user) {
            // User exists, log them in
            res.status(200).json({ 
                message: "User logged in successfully", 
                id : user.id,
                name : user.name,
                email : user.email 
            });
            return
        } else {
            // User doesn't exist, create a new user
            const { name } = req.body;

            // Validate name
            if (!name) {
                res.status(400).json({ message: "Name is required for new users" });
                return;
            }

            const newUser = await prisma.user.create({
                data: { 
                    email, 
                    name 
                },
            });

            res.status(201).json({ 
                message: "User created successfully", 
                id : newUser.id,
                email : newUser.email,
                name : newUser.name
            });
            return
        }
    } catch (error) {
        console.error("Error during login:", error);

        // Handle specific errors
        if (error instanceof Error) {
            res.status(500).json({ 
                message: "Internal server error", 
                error: error.message 
            });

            return
        }

        res.status(500).json({ 
            message: "Internal server error" 
        });
        return
    }
};


export const deleteUser = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const email = req.user?.email;
  const uid = req.user?.uid || "";

  if (!email && !uid) {
    res.status(401).json({ message: "Unauthorized request" });
    return;
  }

  try {
    // Check if the user exists in the database
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return
    }

    // First, delete the user from Firebase Authentication
    await auth.deleteUser(uid);

    // Then, delete the user from the Prisma database
    await prisma.user.delete({
      where: { id: userId },
    });

    res.status(200).json({ message: "User deleted successfully from both Firebase and DB" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

const formatDateToIST = (date: Date) => {
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

export const getProfile = async (req: Request, res: Response) => {
  try {
    const email = req.user?.email;

    // Fetch user details
    const user = await prisma.user.findUnique({
      where: { email },
      include: { tests: true },
    });

    if (!user) {
       res.status(404).json({ message: "User not found" });
       return
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
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAverageAccuracy = async (req: Request, res: Response) => {
  try {
    const email = req.user?.email;

    // Fetch user details
    const user = await prisma.user.findUnique({
      where: { email },
      include: { tests: true },
    });

    if (!user) {
       res.status(404).json({ message: "User not found" });
       return
    }

    const tests = await prisma.test.findMany({
      where: { userId : user.id },
      select: { accuracy: true },
    });

    if (tests.length === 0) {
      res.status(404).json({ error: "No tests found for this user" });
      return
    }

    const totalAccuracy = tests.reduce((sum, test) => sum + test.accuracy, 0);
    const num = totalAccuracy / tests.length;
    const averageAccuracy = Math.floor(num * 100) / 100

    res.json({ userId : user.id, averageAccuracy });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
    return
  }
};
