import CustomError from '../../../utils/errors/CustomError.js';

export default (req, res, next) => {
  next(new CustomError(404, 'Запрос на несуществующий адрес'));
};
