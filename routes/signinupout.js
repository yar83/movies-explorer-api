import express from 'express';
import users from '../controllers/Users.js';
import signupinoutValidator from './middlewares/validation/signupinout.js';
import auth from './middlewares/auth/auth.js';

const router = express.Router();

router.post('/signup', signupinoutValidator.validateSignup(), users.signup.bind(users));
router.post('/signin', signupinoutValidator.validateSignin(), users.signin.bind(users));
router.post('/signout', auth, users.signout.bind(users));

export default router;
