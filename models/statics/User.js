export default class User {
  static createUser({ email, name, password }) {
    return this.create({ email, name, password })
      .then((user) => user)
      .catch((err) => Promise.reject(err));
  }

  static getUserByEmail({ email }) {
    return this.findOne({ email }).select('+password')
      .orFail()
      .then((user) => user)
      .catch((err) => Promise.reject(err));
  }

  static getUserById(userId) {
    return this.findById(userId).select('email name')
      .orFail()
      .then((user) => user)
      .catch((err) => Promise.reject(err));
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
      .orFail()
      .then((user) => user)
      .catch((err) => Promise.reject(err));
  }
}
