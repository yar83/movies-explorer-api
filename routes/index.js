import express from 'express';
import signinupout from './signinupout.js';
import users from './users.js';
import movies from './movies.js';
import auth from './middlewares/auth/auth.js';

const router = express.Router();

router.use('/', signinupout);
router.use('/users', auth, users);
router.use('/movies', auth, movies);

export default router;
