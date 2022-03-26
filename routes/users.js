import express from 'express';
import users from '../controllers/Users.js';
import usersValidator from './middlewares/validation/users.js';

const router = express.Router();

router.get('/me', usersValidator.validateGetUser(), users.getUser.bind(users));
router.patch('/me', usersValidator.validateUpdateUser(), users.updateUser.bind(users));

export default router;
