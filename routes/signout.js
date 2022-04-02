const express = require('express');
const { usersInst, UsersClass } = require('../controllers/Users');

const router = express.Router();

router.post('/', UsersClass.signout.bind(usersInst));

module.exports = router;
