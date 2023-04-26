let Validator = require('validatorjs');

module.exports.sendOtp = function(data) {
    let rules = {
        mobile_number: "required|numeric",
    };
    let validation = new Validator(data, rules, trans.validationLang());
    validation.setAttributeNames(trans.validationFieldLang());
    return validation;
};