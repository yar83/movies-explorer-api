import express from 'express';
import users from '../controllers/Users.js';

const router = express.Router();

router.post('/signup', users.signup.bind(users));
router.post('/signin', users.signin.bind(users));

export default router;
