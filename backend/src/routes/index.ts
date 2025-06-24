import { Router } from "express";
import UserRouter from './userRoutes'
import SolRouter from './Soution'
import userAuth from '../middlewares/userAuth'
import testRouter from './testRoutes'

const router = Router();

router.use('/user',UserRouter)
router.use('/solution',userAuth,SolRouter)
router.use('/test',userAuth,testRouter)



export default router;