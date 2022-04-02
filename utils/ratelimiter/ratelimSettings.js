const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: 1000 * 60 * 10,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
});
