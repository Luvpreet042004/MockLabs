import { Response,Request } from 'express';
import { PrismaClient } from '@prisma/client';
import admin from '../firebase-admin';

const auth =admin.auth();


const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { email, name } = req.body;

        if (!email || !name) { 
          res.status(400).json({ message: "Email and name are required" });
          return
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
          res.status(409).json({ message: "User already exists" });
          return
        }

        const newUser = await prisma.user.create({
            data: { email, name },
        });

        res.status(201).json({ message: "User Created Successfully", user: newUser });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const email = req.user?.email;

        if (!email) {
          res.status(401).json({ message: "Unauthorized request" });
          return
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          res.status(404).json({ message: "User not found" });
          return
        }

        res.status(200).json({ message: "User logged in successfully", user });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
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
