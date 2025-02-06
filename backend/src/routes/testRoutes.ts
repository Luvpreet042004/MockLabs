import { Router } from "express";
import { addTest, getTest } from "../controllers/testController";
import UserAtuh from "../middlewares/userAuth"

const router = Router();

router.post("/post",UserAtuh,addTest);
router.get('/get',UserAtuh,getTest);

export default router;