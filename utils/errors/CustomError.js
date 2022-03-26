export default class CustomError extends Error {
  constructor(code, message) {
    super(message);
    this.statusCode = code;
  }

  getCustomError(statusCode, message) {
    return new CustomError(statusCode, message);
  }

  is11000error(err) {
    return err.code === 11000;
  }

  getFullErrMsg(err) {
    console.log(err);
    return Object.keys(err.errors).reduce((str, e, i, a) => {
      if (i < a.length - 1) return `${str}${err.errors[e].message}, `;
      return `${str}${err.errors[e].message}`;
    }, '');
  }
}
