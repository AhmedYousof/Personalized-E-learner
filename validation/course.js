const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateQuizInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.field = !isEmpty(data.field) ? data.field : "";
  data.cost = !isEmpty(data.cost) ? data.cost : "";
 
  if (Validator.isEmpty(data.name)) {
    errors.name = "Course Name  is Required!";
  }

  if (Validator.isEmpty(data.field)) {
    errors.field = "Course Field Is Required!";
  }

  if (Validator.isEmpty(data.cost)) {
    errors.cost = "Course cost is Required!";
  }

  if(!Validator.isInt(data.cost,{min: 1})){
    errors.cost = "Course cost cannot be less than 1$...";

  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
