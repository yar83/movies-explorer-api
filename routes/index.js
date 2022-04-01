const express = require('express');
const defaultRoute = require('./default');
const auth = require('./middlewares/auth/auth');
const { usersInst } = require('../controllers/Users');
const signupinValidator = require('./middlewares/validation/signupin');
const routeErrorHandler = require('./middlewares/errors/unexistRoute');

const router = express.Router();

router.post('/signup', signupinValidator.validateSignup(), usersInst.signup.bind(usersInst));
router.post('/signin', signupinValidator.validateSignin(), usersInst.signin.bind(usersInst));
router.use('/', auth, defaultRoute);
router.use(routeErrorHandler);

module.exports = router;
