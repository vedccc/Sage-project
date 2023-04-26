const User = require('../../models/User');
const ejs = require('ejs');

// module.exports.index = async function (req, res, next) {
//         res.render('backend/auth/login', { layout: 'backend/auth/login' });
// };

module.exports.logout = function (req, res, next) {
    req.session.destroy(function () {
        res.redirect('/');
    });
};

exports.login = function (req, res, next) {
    User.login(req, res, function (data) {
        res.send(data);
    });
};

module.exports.list = function (req, res) {
    User.list(req, res, function (data) {
        res.send(data);
    });
};

module.exports.signUp = function (req, res) {
    User.signUp(req, res, function (data) {
        res.send(data);
    });
};

exports.verifyOtp = function (req, res, next) {
    User.verifyOtp(req, function (data) {
        res.status(200).json(data);
    });
};

exports.setPin = function (req, res, next) {
    User.setPin(req, res, function (data) {
        res.status(200).json(data);
    });
};

// module.exports.changePassword = function (req, res, next) {
//     res.render('backend/profile/change_password', {
//         layout: 'backend/layouts/layout', pageTitle: 'Change Password'
//     });
// };

exports.resetPassword = function (req, res, next) {
    User.adminResetPassword(req, res, function (data) {
        res.status(200).json(data);
    });
};


// module.exports.editProfile = async function (req, res, next) {
//     const user_id = req.session.user._id;
//     const data = await User.getById(user_id);
//     res.render('backend/profile/edit_profile', {
//         layout: 'backend/layouts/layout', pageTitle: 'Edit Profile', data
//     });
// };

exports.updateProfile = function (req, res, next) {
    User.adminUpdateProfile(req, res, function (data) {
        res.status(200).json(data);
    });
};