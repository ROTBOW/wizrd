const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateEventInput(data) {
  let errors = {};

  data.text = validText(data.title) ? data.title : '';
  data.text = validText(data.topic) ? data.topic : '';
  data.text = validText(data.description) ? data.description : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }

  if (Validator.isEmpty(data.topic)) {
    errors.topic = 'Topic field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
