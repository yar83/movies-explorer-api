import express from 'express';
import Users from '../controllers/Users.js';
import CustomError from '../utils/errors/CustomError.js';
import Answer from '../utils/answers/Answer.js';
import userModel from '../models/user.js';

const answer = new Answer();
const error = new CustomError();
const users = new Users(userModel, answer, error);
const router = express.Router();

console.log('sdfsdsdf');

router.get('/me', users.getUser.bind(users));
router.patch('/me', users.updateUser.bind(users));

export default router;
