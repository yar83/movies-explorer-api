const CustomError = require('../../utils/errors/CustomError');
const errMsg = require('../../utils/constants/errors');

class User {
  static createUser({ email, name, password }) {
    return this.create({ email, name, password })
      .then((user) => user)
      .catch((err) => {
        if (CustomError.is11000error(err)) {
          return Promise.reject(CustomError.getCustomError(400, errMsg.emailOccupied(email)));
        }
        return Promise.reject(CustomError.getCustomError(400, this.getFullErrMsg(err)));
      });
  }

  static getUserByEmail({ email }) {
    return this.findOne({ email }).select('+password')
      .orFail(CustomError.getCustomError(404, errMsg.userByEmailNotFound(email)))
      .then((user) => user)
      .catch((err) => {
        if (err.statusCode === 404) return Promise.reject(err);
        return Promise.reject(CustomError.getCustomError(400, this.getFullErrMsg(err)));
      });
  }

  static getUserById(userId) {
    return this.findById(userId).select('email name')
      .orFail(CustomError.getCustomError(404, errMsg.userByIdNotFound(userId)))
      .then((user) => user)
      .catch((err) => {
        if (err.statusCode === 404) return Promise.reject(err);
        return Promise.reject(CustomError.getCustomError(400, this.getFullErrMsg(err)));
      });
  }

  static updateUser(userId, { email, name }) {
    return this.findByIdAndUpdate(
      userId,
      { email, name },
      {
        new: true,
        runValidators: true,
        select: ('email name'),
      },
    )
      .orFail(CustomError.getCustomError(404, `Пользователь: ${userId} не найден`))
      .then((user) => user)
      .catch((err) => {
        if (CustomError.is11000error(err)) {
          return Promise.reject(CustomError.getCustomError(400, errMsg.emailOccupied(email)));
        }
        if (err.statusCode === 404) return Promise.reject(err);
        return Promise.reject(CustomError.getCustomError(400, this.getFullErrMsg(err)));
      });
  }
}

module.exports = User;
