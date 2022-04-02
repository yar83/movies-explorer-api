const CustomError = require('../../../utils/errors/CustomError');
const msgErr = require('../../../utils/constants/errors');

module.exports = (req, res, next) => {
  next(CustomError.getCustomError(404, msgErr.unExistRoute));
};
