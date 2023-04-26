const User = require('../../models/User');
const Role = require('../../models/Role');
const ejs = require('ejs');

// module.exports.index = async function (req, res, next) {
//     const role_data = await Role.getRole();
//     res.render('backend/admin/user/edit_profile', { layout: 'backend/layouts/layout', role_data, pageTitle: "Edit Profile" });
// };


module.exports.profileUpdate = async function (req, res, next) {
    User.adminUpdateProfile(req, res, function (data) {
        res.send(data);
    });
};


// module.exports.changePassword = async function (req, res, next) {
//     res.render('backend/admin/user/change_password', { layout: 'backend/layouts/layout', pageTitle: "Change Password" });
// };

module.exports.changePasswordUpdate = async function (req, res, next) {
    User.changePasswordUpdate(req, res, function (data) {
        res.send(data);
    });
};