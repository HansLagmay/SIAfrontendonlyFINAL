const validator = require('validator');

// Sanitize a single input
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  // Trim whitespace and escape HTML special characters
  return validator.escape(validator.trim(input));
};

// Middleware to sanitize request body
const sanitizeBody = (req, res, next) => {
  if (req.body && typeof req.body === 'object') {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = sanitizeInput(req.body[key]);
      } else if (Array.isArray(req.body[key])) {
        req.body[key] = req.body[key].map(item => 
          typeof item === 'string' ? sanitizeInput(item) : item
        );
      } else if (typeof req.body[key] === 'object' && req.body[key] !== null) {
        // Recursively sanitize nested objects
        Object.keys(req.body[key]).forEach(nestedKey => {
          if (typeof req.body[key][nestedKey] === 'string') {
            req.body[key][nestedKey] = sanitizeInput(req.body[key][nestedKey]);
          }
        });
      }
    });
  }
  next();
};

// Validate email format
const validateEmail = (email) => {
  return validator.isEmail(email);
};

module.exports = { sanitizeInput, sanitizeBody, validateEmail };
