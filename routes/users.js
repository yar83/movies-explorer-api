const express = require('express');
const { usersInst } = require('../controllers/Users');
const usersValidator = require('./middlewares/validation/users');

const router = express.Router();

router.get('/me', usersInst.getUser.bind(usersInst));
router.patch('/me', usersValidator.validateUpdateUser(), usersInst.updateUser.bind(usersInst));

module.exports = router;
