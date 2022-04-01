const { celebrate, Joi } = require('celebrate');
const userSchema = require('./shared/schemas');

module.exports = {
  validateUpdateUser: () => celebrate(
    {
      body: Joi.object().keys({
        ...userSchema,
      }),
    },
    {
      abortEarly: false,
      messages: {
        'any.required': 'Отсутствует необходимое поле: {#label}',
        'string.email': '{#value} не является допустимым адресом электронной почты',
        'string.empty': '{#label} не может быть пустой строкой',
        'string.min': '{#key} не может быть короче {#limit} символов',
        'string.max': '{#key} не может быть длиннее {#limit} символов',
        'object.unknown': 'Недопустимое поле {#label}',
      },
    },
  ),
};
