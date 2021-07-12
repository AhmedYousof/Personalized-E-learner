const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateQuizInput(data) {
  let errors = {};

  data.question = !isEmpty(data.question) ? data.question : "";
  data.domain = !isEmpty(data.domain) ? data.domain : "";
  data.key = !isEmpty(data.key) ? data.key : "";
 
  if (Validator.isEmpty(data.question)) {
    errors.question = "question  is Required!";
  }

  if (Validator.isEmpty(data.domain)) {
    errors.domain = "Domain Is Required!";
  }

  if (Validator.isEmpty(data.key)) {
    errors.key = "key is Required!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
