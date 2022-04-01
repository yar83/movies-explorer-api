module.exports = {
  internalServerError: 'Внутренняя ошибка сервера',
  noDelOtherPerMovie: 'Нельзя удалять чужие фильмы',
  wrongEmailPass: 'Неправильная почта или пароль',
  movieNotFound: (id) => `Фильм c id: ${id} не найден`,
  emailOccupied: (email) => `Электронная почта ${email} уже занята. Используйте другую.`,
  userByEmailNotFound: (email) => `Пользователь с почтой ${email} не найден`,
  userByIdNotFound: (userId) => `Пользователь: ${userId} не найден`,
  authRequired: 'Необходимо авторизоваться',
  unExistRoute: 'Запрос на несуществующий адрес',
};
