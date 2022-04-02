const { Joi } = require('celebrate');

const userSchema = {
  name: Joi.string().min(1).max(30).required(),
  email: Joi.string().required().email({ minDomainSegments: 2 }),
};

module.exports = userSchema;
