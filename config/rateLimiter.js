const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit requests from one IP
  message: 'Exceeded the allowed number of requests. Please try again later.',
});

module.exports = rateLimiter;
