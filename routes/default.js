const express = require('express');
const users = require('./users');
const movies = require('./movies');
const signout = require('./signout');

const router = express.Router();

router.use('/users', users);
router.use('/movies', movies);
router.use('/signout', signout);

module.exports = router;
