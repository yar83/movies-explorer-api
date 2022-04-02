const jwt = require('jsonwebtoken');
const CustomError = require('../../../utils/errors/CustomError');
const errMsg = require('../../../utils/constants/errors');
const { devMode } = require('../../../utils/constants/env');

const auth = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) next(CustomError.getCustomError(401, errMsg.authRequired));

  let payload;
  try {
    payload = jwt.verify(
      token,
      process.env.NODE_ENV === 'prod'
        ? process.env.SECRET_KEY
        : devMode.secKey,
    );
  } catch (err) {
    next(CustomError.getCustomError(401, errMsg.authRequired));
  }
  req.user = payload;
  next();
  return null;
};

module.exports = auth;
