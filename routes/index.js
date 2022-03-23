import express from 'express';
import signing from './signing.js';
import users from './users.js';
import movies from './movies.js';

const router = express.Router();

router.use(signing);
router.use('/users', users);
router.use('/movies', movies);

export default router;
