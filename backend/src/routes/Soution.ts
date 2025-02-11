import { Router,Request,Response } from "express";
import { PrismaClient } from '@prisma/client';

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
