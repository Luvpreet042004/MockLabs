import { Router } from 'express';
import { loginUser,deleteUser, getProfile, getAverageAccuracy } from '../controllers/userController';
import userAuth from '../middlewares/userAuth'
const router = Router();

// Create a new user
router.post('/login',userAuth,loginUser);
router.delete('/delete',userAuth,deleteUser);
router.get('/profile',userAuth,getProfile);
router.get('/getAcc',userAuth,getAverageAccuracy);


export default router;