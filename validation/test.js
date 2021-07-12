const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateQuizInput(data) {
  let errors = {};

  data.question = !isEmpty(data.question) ? data.question : "";
  data.domain = !isEmpty(data.domain) ? data.domain : "";
  data.key = !isEmpty(data.key) ? data.key : "";
  data.answers[0] = !isEmpty(data.answers[0]) ? data.answers[0] : "";
  data.answers[1] = !isEmpty(data.answers[1]) ? data.answers[1] : "";
  data.answers[2] = !isEmpty(data.answers[2]) ? data.answers[2] : "";
  data.answers[3] = !isEmpty(data.answers[3]) ? data.answers[3] : "";
  data.answers[4] = !isEmpty(data.answers[4]) ? data.answers[4] : "";
  data.answers[5] = !isEmpty(data.answers[5]) ? data.answers[5] : "";
  data.answers[6] = !isEmpty(data.answers[6]) ? data.answers[6] : "";
  data.answers[7] = !isEmpty(data.answers[7]) ? data.answers[7] : "";
  data.answers[8] = !isEmpty(data.answers[8]) ? data.answers[8] : "";

 
  if (Validator.isEmpty(data.answers[0])) {
    errors.answers0 = "answer  is Required!";
  }
  if(data.answers[1]){
  if (Validator.isEmpty(data.answers[1])) {
    errors.answers1 = "answer  is Required!";
  }
}
  if(data.answers[2]){
  if (Validator.isEmpty(data.answers[2])) {
    errors.answers2 = "answer  is Required!";
  }
}
  if(data.answers[3]){
  if (Validator.isEmpty(data.answers[3])) {
    errors.answers = "answer  is Required!";
  }
}
  if(data.answers[4]){
  if (Validator.isEmpty(data.answers[4])) {
    errors.answers = "answer  is Required!";
  }}
  if(data.answers[5]){
  if (Validator.isEmpty(data.answers[5])) {
    errors.answers = "answer  is Required!";
  }}
  if(data.answers[6]){
  if (Validator.isEmpty(data.answers[6])) {
    errors.answers = "answer  is Required!";
  }}

  if(data.answers[7]){
    if (Validator.isEmpty(data.answers[7])) {
      errors.answers = "answer  is Required!";
    }}
    if(data.answers[8]){
        if (Validator.isEmpty(data.answers[8])) {
          errors.answers = "answer  is Required!";
        }}

        if(data.answers[9]){
            if (Validator.isEmpty(data.answers[9])) {
              errors.answers = "answer  is Required!";
            }}
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
