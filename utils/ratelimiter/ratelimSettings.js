import rateLimit from 'express-rate-limit';

export default rateLimit({
  windowMs: 1000 * 60 * 10,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
});
