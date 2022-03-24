import express from 'express';
import users from '../controllers/Users.js';

const router = express.Router();

router.post('/signout', users.signout.bind(users));

export default router;
