let Validator = require('validatorjs');

module.exports.store = function (req) {
    var data = req;
    let rules = {
        title: "required",
        description: "required"
    };
    let validation = new Validator(data, rules, trans.validationLang());
    validation.setAttributeNames(trans.validationFieldLang());
    return validation;
};

module.exports.update = function (req) {
    var data = req;
    let rules = {
        id: "required",
        title: "required",
        description: "required",

    };
    let validation = new Validator(data, rules, trans.validationLang());
    validation.setAttributeNames(trans.validationFieldLang());
    return validation;
};