class CustomError extends Error {
  constructor(code, message) {
    super(message);
    this.statusCode = code;
  }

  static getCustomError(statusCode, message) {
    return new CustomError(statusCode, message);
  }

  static is11000error(err) {
    return err.code === 11000;
  }

  static getFullErrMsg(err) {
    return Object.keys(err.errors).reduce((str, e, i, a) => {
      if (i < a.length - 1) return `${str}${err.errors[e].message}, `;
      return `${str}${err.errors[e].message}`;
    }, '');
  }
}

module.exports = CustomError;
