// eslint-disable-next-line
export default (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500
    ? 'Внутренняя ошибка сервера'
    : err.message;
  return res.status(statusCode).send({ message });
};
