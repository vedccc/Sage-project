const mongoose = require('mongoose');
const Role = require('./schemas/Role');

module.exports.getRole = function () {
    return new Promise(function (resolve, reject) {
        Role.find({ status: 1 }).then(async function (data, err) {
            resolve(data);
        });
    });
};