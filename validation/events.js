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

  if (!Validator.isLength(data.title, { min: 1, max: 140 })) {
    errors.title = 'Title must be between 1 and 140 characters';
  }

  if (Validator.isEmpty(data.topic)) {
    errors.topic = 'Topic field is required';
  }

  if (!Validator.isLength(data.topic, { min: 1, max: 140 })) {
    errors.topic = 'Topic must be between 1 and 140 characters';
  }

  if (!Validator.isLength(data.description, { min: 0, max: 1400 })) {
    errors.description = 'Description must be between 0 and 1400 characters';
  }

  if (data.startTime) {
    let startTime;
    if (typeof data.startTime === 'string') {
      startTime = Date.parse(data.startTime);
    } else {
      startTime = data.startTime;
    }

    let currentTime = new Date();
    if (startTime < currentTime) {
      errors.startTime = 'Start time must be in the future.';
    }
  }

  // if (data.endTime) {
  //   if (!startTime) {
  //     errors.starTime = 'You must enter both start time and end time.';
  //   }

  //   if (startTime > endTime) {
  //     errors.endTime = 'End time must be after start time.';
  //   }
  // }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
a = new Date()