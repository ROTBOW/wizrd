const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.usernameOEmail = validText(data.usernameOrEmail) ? data.usernameOrEmail : '';
  data.password = validText(data.password) ? data.password : '';

  if (Validator.isEmpty(data.usernameOrEmail)) {
    errors.usernameOrEmail = 'Username or email field is required';
  }

  if (data.usernameOrEmail.includes('@')) {
    if (!Validator.isEmail(data.usernameOrEmail)) {
      errors.usernameOrEmail = 'Username or email is invalid';
    }
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
