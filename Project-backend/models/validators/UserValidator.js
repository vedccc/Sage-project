let Validator = require("validatorjs");

module.exports.signUp = function (data) {
  let rules = {
    name: "required",
    mobile: "required|numeric",
    // password : "required",
  };
  let validation = new Validator(data, rules, trans.validationLang());
  validation.setAttributeNames(trans.validationFieldLang());
  return validation;
};

module.exports.setPin = function (data) {
  let rules = {
    mobile: "required|numeric",
    pin: "required|numeric",
  };
  let validation = new Validator(data, rules, trans.validationLang());
  validation.setAttributeNames(trans.validationFieldLang());
  return validation;
};

module.exports.login = function (data) {
  let rules = {
    mobile: "required|numeric",
    pin: "required|numeric",
  };
  let validation = new Validator(data, rules, trans.validationLang());
  validation.setAttributeNames(trans.validationFieldLang());
  return validation;
};

// module.exports.adminResetPassword = function (req) {
//     var data = req.body;
//     let rules = {
//         old_password: "required",
//         new_password: "required",
//         confirm_password: "required|same:new_password"
//     };
//     let validation = new Validator(data, rules, trans.validationLang());
//     validation.setAttributeNames(trans.validationFieldLang());
//     return validation;
// };

// module.exports.adminNewPassword = function (req) {
//     var data = req.body;
//     let rules = {
//         new_password: "required",
//         confirm_password: "required|same:new_password"
//     };
//     let validation = new Validator(data, rules, trans.validationLang());
//     validation.setAttributeNames(trans.validationFieldLang());
//     return validation;
// };

module.exports.adminUpdateProfile = function (data) {
  let rules = {
    // role: "required",
    name: "required",
    email: "required|email",
  };
  let validation = new Validator(data, rules, trans.validationLang());
  validation.setAttributeNames(trans.validationFieldLang());
  return validation;
};

module.exports.adminResetPassword = function (data) {
  let rules = {
    old_password: "required",
    new_password: "required",
    confirm_password: "required|same:new_password",
  };
  let validation = new Validator(data, rules, trans.validationLang());
  validation.setAttributeNames(trans.validationFieldLang());
  return validation;
};

module.exports.userManagementStore = function (data) {
  let rules = {
    role: "required",
    name: "required",
    email: "required|email",
    password: "required",
  };
  let validation = new Validator(data, rules, trans.validationLang());
  validation.setAttributeNames(trans.validationFieldLang());
  return validation;
};

module.exports.verifyOtp = function (data) {
  let rules = {
    mobile: "required|numeric",
    otp: "required|numeric",
  };
  let validation = new Validator(data, rules, trans.validationLang());
  validation.setAttributeNames(trans.validationFieldLang());
  return validation;
};
