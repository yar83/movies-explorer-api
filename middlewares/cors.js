const CustomError = require('../utils/errors/CustomError');

const allowedCors = [
  'localhost:3000',
  'http://localhost:3000',
  'https://eternalmovies.nomoredomains.work',
  'http://eternalmovies.nomoredomains.work',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers']
    ? req.headers['access-control-request-headers']
    : 'content-type,cookie';
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    if (method === 'OPTIONS') {
      return res.end();
    }
    next();
  } else {
    next(CustomError.getCustomError(400, 'Cors error'));
  }
  return null;
};
