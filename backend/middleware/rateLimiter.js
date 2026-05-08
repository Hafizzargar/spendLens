const rateLimit = require('express-rate-limit');

// Basic rate limiting to satisfy "rate limiting/hCaptcha" requirement
// Limits each IP to 20 API requests per 15 minutes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, 
  message: {
    status: 429,
    message: 'Too many requests created from this IP, please try again after 15 minutes.'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = apiLimiter;
