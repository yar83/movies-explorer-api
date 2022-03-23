import mongoose from 'mongoose';
import Validator from './shared/Validator.js';
import User from './statics/User.js';

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
    minLength: [2, 'Имя не может быть короче двух символов'],
    maxLength: [30, 'Имя не может быть длиннее двух символов'],
  },
});

userSchema.loadClass(User);

export default mongoose.model('User', userSchema);
