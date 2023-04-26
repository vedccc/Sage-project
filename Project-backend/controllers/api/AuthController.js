const User = require('../../models/api/User');

exports.sendOtp = function(req, res, next) {
    User.sendOtp(req,res, function(data) {
        res.status(200).json(data);
    });
};