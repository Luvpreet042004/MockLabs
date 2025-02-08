import { Router } from 'express';
import { loginUser,deleteUser } from '../controllers/userController';
import userAuth from '../middlewares/userAuth'
const router = Router();

// Create a new user
router.post('/login',userAuth,loginUser);
router.delete('delete',userAuth,deleteUser);


export default router;