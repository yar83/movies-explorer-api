export default class User {
  static createUser({ email, name }) {
    return this.create({ email, name })
      .then((user) => user)
      .catch((err) => err);
  }

  static getUserByEmail({ email }) {
    return this.findOne({ email }).select('+password')
      .orFail()
      .then((user) => user)
      .catch((err) => err);
  }

  static getUserById(userId) {
    return this.findById(userId).select('email name')
      .orFail()
      .then((user) => user)
      .catch((err) => err);
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
      .catch((err) => err);
  }
}
