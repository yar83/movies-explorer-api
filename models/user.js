import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email не указан'],
    index: true,
    unique: true,
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

export default mongoose.model('User', userSchema);
