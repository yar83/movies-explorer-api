import jwt from 'jsonwebtoken';
import CustomError from '../utils/errors/CustomError.js';

const error = new CustomError();

export default (req, res, next) => {
  const { token } = req.cookies;

  if (!token) next(error.getCustomError(401, 'Токен не предоставлен'));

  let payload;
  try {
    payload = jwt.verify(
      token,
      process.env.PROD
        ? process.env.SECRET_KEY
        : 'not-so-secret',
    );
  } catch (err) {
    next(error.getCustomError(401, 'Необходимо авторизироваться'));
  }
  req.user = payload;
  next();
  return null;
};
