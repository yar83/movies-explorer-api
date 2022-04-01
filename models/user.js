const mongoose = require('mongoose');
const Validator = require('./shared/Validator');
const User = require('./statics/User');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email не указан'],
    index: true,
    unique: true,
    validate: {
      validator: Validator.validateEmail,
      message: (props) => `${props.value} недопустимый адрес почты`,
    },
  },

  password: {
    type: String,
    required: [true, 'Пароль не указан'],
    select: false,
  },

  name: {
    type: String,
    required: [true, 'Имя не указано'],
    minLength: [1, 'Имя не может быть короче одного символа'],
    maxLength: [30, 'Имя не может быть длиннее тридцати символов'],
  },
});

userSchema.loadClass(User);

module.exports = mongoose.model('User', userSchema);
