const { isCelebrateError } = require('celebrate');

module.exports = (err, req, res, next) => {
  if (!isCelebrateError(err)) return next(err);
  let message = '';
  const errors = [];
  errors.push(err.details.get('cookies'));
  errors.push(err.details.get('params'));
  errors.push(err.details.get('body'));

  // сборка строки со всеми ошибками
  errors.forEach((el) => {
    if (el) {
      message += el.details.reduce((str, e, i, a) => {
        if (i < a.length - 1) return `${str}${e.message}, `;
        return `${str}${e.message}`;
      }, '');
    }
  });

  return res.status(400).send({ message });
};
