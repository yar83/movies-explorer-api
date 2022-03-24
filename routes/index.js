import express from 'express';
import signinup from './signinup.js';
import users from './users.js';
import movies from './movies.js';
import signout from './signout.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.use('/', signinup);
router.use('/', auth, signout);
router.use('/users', auth, users);
router.use('/movies', auth, movies);

export default router;
