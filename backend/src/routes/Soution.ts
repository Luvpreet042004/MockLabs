import { Router,Request,Response } from "express";
import { PrismaClient } from '@prisma/client';

interface Question {
    id: number;
    answer: number | null;
    status: 0 | 1 | 2 | 3;
  }

const prisma = new PrismaClient();
const router = Router();

router.get('/answer', async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const { testName } = req.query;

        if (!user) {
            res.status(401).json({ message: "Unauthorized request" });
            return
        }

        console.log("user ok");
        

        if (!testName || typeof testName !== 'string') {
            res.status(400).json({ message: "TestName must be specified as a string",testName});
            return
        }

        console.log(testName);
        

        const solution = await prisma.solution.findUnique({
            where: { testName }
        });

        if (!solution) {
            res.status(404).json({ message: "Solution not found" });
            return
        }

        res.status(200).json({answer : solution.answer});
    } catch (error) {
        console.error("Error fetching solution:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}); 


router.post('/create',async(req:Request , res:Response)=>{
    const {testName , answer} = req.body;

    try {
        const sol = await prisma.solution.create({
            data :{
                testName,
                answer
            }
        })

        res.json({msg : "successfull", sol})
    } catch (error) {
        res.json({msg : "failed"})
    }
})
export default router;

router.post("/compare", async (req: Request, res: Response) => {
    try {
        const email = req.user?.email;
        if (!email) {
            res.status(401).json({ message: "Unauthorized request" });
            return
        }
        const user = await prisma.user.findUnique({where : {email}})
        const { questions, testName,timeTaken }: { questions: Question[]; testName: string ;timeTaken: number} = req.body;

        // Fetch correct answers from the Solution table
        const solution = await prisma.solution.findUnique({
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
            const correctAnswer = correctAnswers[id - 1] ?? null;
            let isCorrect = answer !== null && answer === correctAnswer;
            let score = 0;

            if (answer !== null) {
                totalAttempts++; // Only count attempted questions
                if (isCorrect) {
                    correctAttempts++;
                    score = 4; // Correct answer
                } else {
                    score = -1; // Wrong answer
                }
            }

            // Categorize scores based on question range
            if (id >= 1 && id <= 30) {
                physicsScore += score;
            } else if (id >= 31 && id <= 60) {
                mathsScore += score;
            } else if (id >= 61 && id <= 90) {
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
        
        const userId = user?.id
        if(!userId){
            res.status(401).json({ message: "Unauthorized request" });
            return
        }

        await prisma.test.create({data :{
            name : testName,
            mathScore : mathsScore,
            physicsScore,
            chemistryScore,
            totalScore,
            accuracy, 
            timeTaken,
            userId
        }})



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
    } catch (error) {
        console.error("Error in comparison:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


