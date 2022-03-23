import jwt from 'jsonwebtoken';

export default class Users {
  constructor(model, userAnswer, error) {
    this.model = model;
    this.userAnswer = userAnswer;
    this.error = error;
  }

  signup(req, res, next) {
    console.log('ya tut');
    this.model.createUser(req.body)
      .then((user) => res.send(this.userAnswer(user)))
      .catch((err) => {
        console.log(err);
        next(this.error.errorHandler(505, 'Signup Error'));
      });
  }

  signin(req, res, next) {
    this.model.getUserByEmail(req.body)
      .then((user) => {
        const token = jwt.sign(
          { _id: user._id },
          process.env.IS_PROD === 'prod'
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
            domain: '.eternalmovies.nomoredomains.word',
            httpOnly: true,
            secure: true,
            sameSite: 'none',
          },
        );
        res.end();
      })
      .catch((err) => {
        console.log(err);
        next(this.error.errorHandler(505, 'Signin error'));
      });
  }

  // eslint-disable-next-line
  signout(req, res, next) {
    const { _id } = req.user;
    const token = jwt.sign(
      { _id },
      process.env.IS_PROD === 'prod'
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
        domain: '.eternalmovies.nomoredomains.word',
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
      .then((user) => res.send(this.userAnswer(user)))
      .catch((err) => {
        console.log(err);
        next(this.error.errorHandler(505, 'getUser error'));
      });
  }

  updateUser(req, res, next) {
    const { _id } = req.user;
    this.model.updateUser(_id, req.body)
      .then((user) => res.send(this.userAnswer(user)))
      .catch((err) => {
        console.log(err);
        next(this.error.errorHandler(505, 'updateUser error'));
      });
  }
}
