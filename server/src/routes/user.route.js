import express from 'express';
import { deleteUser, getUserInfo, login, profile, signup } from '../controllers/user.controller.js';
import { authorized } from '../middleware/auth.middleware.js';

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.get('/profile', authorized, profile);
userRouter.delete('/delete', authorized, deleteUser);
userRouter.get('/getUser/:userId', authorized, getUserInfo);

export default userRouter;