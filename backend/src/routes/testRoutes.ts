import { Router } from "express";
import { addTest, getTests,getTestNames, getSubjectAverages,getScoreDistribution } from "../controllers/testController";
import UserAtuh from "../middlewares/userAuth"

const router = Router();

router.post("/post",addTest);
router.get('/get',getTests);
router.get('/available',getTestNames);
router.get('/subAvg',getSubjectAverages);
router.get('/scoreDist',getScoreDistribution);

export default router;