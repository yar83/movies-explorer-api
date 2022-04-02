const errMsg = require('../utils/constants/errors');

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500
    ? errMsg.internalServerError
    : err.message;
  next();
  return res.status(statusCode).send({ message });
};
