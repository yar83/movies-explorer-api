const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/user');
const Answer = require('../utils/answers/Answer');
const CustomError = require('../utils/errors/CustomError');
const { devMode } = require('../utils/constants/env');
const errMsg = require('../utils/constants/errors');

class Users {
  constructor(model, answer, error) {
    this.model = model;
    this.answer = answer;
    this.error = error;
  }

  signup(req, res, next) {
    bcrypt.hash(req.body.password, 10)
      .then((password) => {
        req.body.password = password;
        this.model.createUser(req.body)
          .then((user) => res.send(this.answer.userAnswer(user)))
          .catch((err) => next(err));
      });
  }

  signin(req, res, next) {
    this.model.getUserByEmail(req.body)
      .then((user) => {
        bcrypt.compare(req.body.password, user.password)
          .then((bCryptRes) => {
            if (!bCryptRes) {
              next(this.error.getCustomError(401, errMsg.wrongEmailPass));
            } else {
              const token = jwt.sign(
                { _id: user._id },
                process.env.NODE_ENV === 'prod'
                  ? process.env.SECRET_KEY
                  : devMode.secKey,
                { expiresIn: '7d' },
              );
              res.cookie(
                'token',
                token,
                {
                  path: '/',
                  maxAge: 1000 * 3600 * 24 * 7,
                  ...(process.env.NODE_ENV === 'prod' && { domain: '.eternalmovies.nomoredomains.work' }),
                  httpOnly: true,
                  secure: true,
                  sameSite: 'none',
                },
              );
              res.end();
            }
          });
      })
      .catch((err) => next(err));
  }

  static signout(req, res) {
    const { _id } = req.user;
    const token = jwt.sign(
      { _id },
      process.env.NODE_ENV === 'prod'
        ? process.env.SECRET_KEY
        : devMode.secKey,
      { expiresIn: '-1d' },
    );
    res.cookie(
      'token',
      token,
      {
        path: '/',
        maxAge: 1000 * 3600 * 24 * (-1),
        ...(process.env.NODE_ENV === 'prod' && { domain: '.eternalmovies.nomoredomains.work' }),
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      },
    );
    res.end();
  }

  getUser(req, res, next) {
    const { _id } = req.user;
    this.model.getUserById(_id)
      .then((user) => res.send(this.answer.userAnswer(user)))
      .catch((err) => next(err));
  }

  updateUser(req, res, next) {
    const { _id } = req.user;
    this.model.updateUser(_id, req.body)
      .then((user) => res.send(this.answer.userAnswer(user)))
      .catch((err) => next(err));
  }
}

const users = new Users(userModel, Answer, CustomError);
exports.UsersClass = Users;
exports.usersInst = users;
