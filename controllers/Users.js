import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import userModel from '../models/user.js';
import Answer from '../utils/answers/Answer.js';
import CustomError from '../utils/errors/CustomError.js';

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
          .then((user) => {
            res.send(this.answer.userAnswer(user));
          })
          .catch((err) => {
            if (this.error.is11000error(err)) {
              next(this.error.getCustomError(409, `Электронная почта ${req.body.email} уже занята. Используйте другую.`));
            } else {
              next(this.error.getCustomError(400, this.error.getFullErrMsg(err)));
            }
          });
      });
  }

  signin(req, res, next) {
    this.model.getUserByEmail(req.body)
      .then((user) => {
        bcrypt.compare(req.body.password, user.password)
          .then((bCryptRes) => {
            if (!bCryptRes) {
              next(this.error.getCustomError(401, 'Неправильнае почта или пароль'));
            } else {
              const token = jwt.sign(
                { _id: user._id },
                process.env.NODE_ENV === 'prod'
                  ? process.env.SECRET_KEY
                  : 'not-so-secret',
                { expiresIn: '7d' },
              );
              res.cookie(
                'token',
                token,
                {
                  path: '/',
                  maxAge: 1000 * 3600 * 24 * 7,
                  // domain: '.eternalmovies.nomoredomains.work',
                  ...(process.env.NODE_ENV === 'prod' && {domain: '.eternalmovies.nomoredomains.work'}),
                  httpOnly: true,
                  secure: true,
                  sameSite: 'none',
                },
              );
              res.end();
            }
          });
      })
      .catch(() => {
        next(this.error.getCustomError(401, 'Неправильная почта или пароль'));
      });
  }

  signout(req, res) {
    const { _id } = req.user;
    const token = jwt.sign(
      { _id },
      process.env.NODE_ENV === 'prod'
        ? process.env.SECRET_KEY
        : 'not-so-secret',
      { expiresIn: '-1d' },
    );
    res.cookie(
      'token',
      token,
      {
        path: '/',
        maxAge: 1000 * 3600 * 24 * (-1),
        // domain: '.eternalmovies.nomoredomains.work',
        ...(process.env.NODE_ENV === 'prod' && {domain: '.eternalmovies.nomoredomains.work'}),
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
      .catch(() => {
        next(this.error.getCustomError(400, 'Пользователь не найден'));
      });
  }

  updateUser(req, res, next) {
    const { _id } = req.user;
    console.log(_id);
    this.model.updateUser(_id, req.body)
      .then((user) => res.send(this.answer.userAnswer(user)))
      .catch((err) => {
        console.log(err);
        next(err.code === 11000
          ? this.error.getCustomError(400, `Электронная почта ${req.body.email} уже занята. Используйте другую.`)
          : this.error.getCustomError(400, 'Пользователь не найден')
        );
      });
  }
}
export default new Users(userModel, new Answer(), new CustomError());
