module.exports.userAvatar = function (avatar) {
    return new Promise(function (resolve, reject) {
        if (avatar != "") {
            resolve(locals.user_avatar.path + avatar);
        } else {
            resolve(locals.user_avatar.default_path);
        }
    });
}

module.exports.getUserAuthData = function (userData) {
    const self = this;
    return new Promise(async function (resolve, reject) {
        resp = {};
        resp.user_id = userData._id;
        resp.name = userData.name;
        resp.mobile = userData.mobile_number;
        resp.otp = userData.otp;
        resolve(resp);
    });
}

