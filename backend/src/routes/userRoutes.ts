import { Router } from 'express';
import { loginUser, registerUser,deleteUser } from '../controllers/userController';
import userAuth from '../middlewares/userAuth'
const router = Router();

// Create a new user
router.post('/register', registerUser);
router.get('/login',userAuth,loginUser);
router.delete('delete',userAuth,deleteUser);


export default router;