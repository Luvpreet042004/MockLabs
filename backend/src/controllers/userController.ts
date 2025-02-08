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
