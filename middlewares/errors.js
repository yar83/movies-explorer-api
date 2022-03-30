// 'next' is mandotory in Express error middlewares
// eslint-disable-next-line no-unused-vars
export default (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500
    ? 'Внутренняя ошибка сервера'
    : err.message;
  return res.status(statusCode).send({ message });
};
