const mongoose = require("mongoose");
const User = require("./schemas/User");
const Role = require("./schemas/Role");
const UserValidator = require("./validators/UserValidator");
const CommonHelper = require("../helpers/CommonHelper");
const UploadHelper = require("../helpers/UploadHelper");
const UserHelper = require("../helpers/UserHelper");
const jwt = require("jsonwebtoken");

module.exports.getById = function (id) {
  return new Promise(function (resolve, reject) {
    User.findOne()
      .where({ _id: mongoose.Types.ObjectId(id) })
      .then(async function (data, err) {
        if (!data) {
          resolve(data);
          return;
        }
        resolve(data);
      });
  });
};

module.exports.getByEmail = function (email) {
  return new Promise(function (resolve, reject) {
    User.findOne()
      .where({ email: email, status: { $ne: 2 } })
      .then(async function (data, err) {
        if (!data) {
          resolve(data);
          return;
        }
        resolve(data);
      });
  });
};
module.exports.getByMobile = function (mobile) {
  return new Promise(function (resolve, reject) {
    User.findOne()
      .where({ mobile: mobile, status: { $ne: 2 } })
      .then(async function (data, err) {
        if (!data) {
          resolve(data);
          return;
        }
        resolve(data);
      });
  });
};

module.exports.isMobileExists = function (mobile, _id = false) {
  return new Promise(function (resolve, reject) {
    var where = { mobile: mobile };
    if (_id) {
      where._id = { $ne: _id };
    }
    User.findOne()
      .where(where)
      .then(function (data, err) {
        if (data) resolve(true);
        resolve(false);
      });
  });
};
module.exports.isEmailExists = function (email, _id = false) {
  return new Promise(function (resolve, reject) {
    var where = { email: email };
    if (_id) {
      where._id = { $ne: _id };
    }
    User.findOne()
      .where(where)
      .then(function (data, err) {
        if (data) resolve(true);
        resolve(false);
      });
  });
};

module.exports.signUp = async function (req, res, next) {
  const self = this;
  const isValid = UserValidator.signUp(req.body);
  var otp = CommonHelper.generateOTP();
  if (isValid.fails()) {
    return next({
      status: 2,
      message: CommonHelper.errorsAPIValidate(isValid.errors.errors),
      data: [],
    });
  }
  const mobile = req.body.mobile;
  const isExistsUser = await self.isMobileExists(mobile);
  // var salt_pass = CommonHelper.hashPassword(req.body.password);
  if (!isExistsUser) {
    const userObjData = new User({
      name: req.body.name,
      mobile: req.body.mobile,
      otp: otp,
      // password: salt_pass.hash,
      // salt: salt_pass.salt,
      created_at: moment.utc().valueOf(),
      updated_at: moment.utc().valueOf(),
      status: 1,
    });
    userObjData.save(async function (error, respData) {
      if (error) {
        return next({
          status: 0,
          message: trans.lang("message.something_went_wrong"),
          data: [],
          error,
        });
      } else {
        // if (req.body.mobile_number && req.body.mobile_number !== '') {
        // SmsHelper.sendOTP(req.body.mobile_number, 'VIRAGA', [otp]);
        // }
        return next({
          status: 1,
          message: trans.lang("message.loaded_success"),
          data: otp,
        });
      }
    });
  } else {
    return next({
      status: 0,
      message: trans.lang("message.mobile_already_exists"),
      data: [],
    });
  }
};

module.exports.verifyOtp = async function (req, next) {
  const self = this;
  let isValid = UserValidator.verifyOtp(req.body);
  if (isValid.fails()) {
    return next({
      status: 0,
      message: CommonHelper.errorsValidator(isValid.errors.errors),
    });
  }

  const checkMob = await self.getByMobile(req.body.mobile);
  if (!checkMob) {
    return next({ status: 0, message: trans.lang("message.invalid_mobile") });
  }

  const checkOtp = await self.checkOtpMobile(req.body.mobile, req.body.otp);
  if (!checkOtp) {
    return next({ status: 0, message: trans.lang("message.invalid_otp") });
  }

  const userData = await self.getUserByMobile(req.body.mobile);
  if (!userData) {
    const usrData = new User({
      mobile: req.body.mobile,
      device_token: req.body.device_token,
      device_type: req.body.device_type,
      device_id: req.body.device_id,
    });

    usrData.save(async function (error, data) {
      if (error) {
        return next({
          status: 0,
          message: trans.lang("message.something_went_wrong"),
        });
      } else {
        // var datas = await UserHelper.getUserAuthData(data);
        // var token = jwt.sign({
        //     role: 'app_user',
        //     user_id: data._id,
        // }, "secret", { expiresIn: "365D" });

        return next({
          status: 1,
          message: trans.lang("message.user.otp_verify_success"),
        });
      }
    });
  } else {
    User.updateOne(
      { _id: userData._id },
      {
        device_token: req.body.device_token,
        device_id: req.body.device_id,
        device_type: req.body.device_type,
        updated_at: moment.utc().valueOf(),
      },
      async function (err) {
        if (err) {
          return next({
            status: 0,
            message: trans.lang("message.something_went_wrong"),
          });
        }
      }
    );
    // var token = jwt.sign({
    //     role: 'app_user',
    //     user_id: userData._id,
    // }, "secret", { expiresIn: "365D" });

    // var data = await UserHelper.getUserAuthData(userData);
    return next({
      status: 1,
      message: trans.lang("message.user.otp_verify_success"),
    });
  }
};

module.exports.setPin = async function (req, res, next) {
  const self = this;
  const isValid = UserValidator.setPin(req.body);
  if (isValid.fails()) {
    return next({
      status: 2,
      message: CommonHelper.errorsAPIValidate(isValid.errors.errors),
      data: [],
    });
  }
  const mobile = req.body.mobile;
  const isExistsUser = await self.isMobileExists(mobile);
  var salt_pass = CommonHelper.hashPassword(req.body.pin);
  if (isExistsUser) {
    // const userObjData = new User({
    //     pin: salt_pass.hash,
    //     salt: salt_pass.salt,
    //     updated_at: moment.utc().valueOf(),
    // });

    User.updateOne(
      { mobile: mobile },
      {
        pin: salt_pass.hash,
        salt: salt_pass.salt,
        updated_at: moment.utc().valueOf(),
      },
      async function (error) {
        if (error) {
          return next({
            status: 0,
            message: trans.lang("message.something_went_wrong"),
            data: [],
            error,
          });
        } else {
          // if (req.body.mobile_number && req.body.mobile_number !== '') {
          // SmsHelper.sendOTP(req.body.mobile_number, 'VIRAGA', [otp]);
          // }
          const userData = await self.getUserByMobile(req.body.mobile);
          var datas = await UserHelper.getUserAuthData(userData);
          var token = jwt.sign(
            {
              role: "app_user",
              user_id: userData._id,
            },
            "secret",
            { expiresIn: "365D" }
          );

          return next({
            status: 1,
            message: trans.lang("message.set_pin"),
            token,
            data: datas,
          });
        }
      }
    );
  } else {
    return next({
      status: 0,
      message: trans.lang("message.invalid_mobile"),
      data: [],
    });
  }
};

module.exports.login = function (req, res, next) {
  const isValid = UserValidator.login(req.body);
  if (isValid.fails()) {
    return next({
      status: 2,
      message: CommonHelper.errorsAPIValidate(isValid.errors.errors),
      data: [],
    });
  }
  const pin = req.body.pin;
  const where = {
    mobile: req.body.mobile,
  };
  User.findOne()
    .where(where)
    .then(async function (data, err) {
      if (err) {
        return next({
          status: 0,
          message: trans.lang("message.something_went_wrong"),
        });
      }
      if (!data) {
        return next({ status: 0, message: trans.lang("message.auth_fail") });
      }
      var is_correct = CommonHelper.isPasswordCorrect(data.pin, data.salt, pin);
      var token = CommonHelper.generateSalt();
      if (is_correct) {
        var id = data._id;
        req.session.user = data;
        CommonHelper.sessionrefresh(req);
        next({ status: 1, message: "Login success", token: token });
      } else {
        return next({ status: 0, message: trans.lang("message.auth_fail") });
      }
    });
};

module.exports.list = async function (req, res, next) {
  var s_data = { status: { $ne: 2 } };
  var project = {
    _id: "$_id",
    name: "$name",
    mobile: "$mobile",
    password: "$password",
    salt: "$salt",
    status: "$status",
  };
  User.aggregate(
    [{ $match: s_data }, { $project: project }],
    async function (err, data) {
      next({
        status: 1,
        message: trans.lang("message.loaded_success"),
        data: data,
      });
      // return next(UtilJs.generateOutput(data,err));
    }
  );
};

module.exports.checkOtpMobile = function (mobile, otp) {
  return new Promise(function (resolve, reject) {
    User.findOne()
      .where({ mobile, otp })
      .then(async function (data, err) {
        resolve(data);
        return;
      });
  });
};

module.exports.getUserByMobile = function (mobile) {
  return new Promise(function (resolve, reject) {
    User.findOne()
      .where({ mobile })
      .then(async function (data, err) {
        resolve(data);
        return;
      });
  });
};

module.exports.adminUpdateProfile = async function (req, res, next) {
  const self = this;
  req.body.file_data = [
    { file_name: "image", file_path: locals.user_avatar.base_path },
  ];
  var respUpload = await UploadHelper.uploadMultiFile(req, res);
  if (respUpload.error != undefined) {
    return next({ status: 0, message: respUpload.message });
  }
  const _body = respUpload.body;
  const isValid = UserValidator.adminUpdateProfile(_body);
  if (isValid.fails()) {
    await UploadHelper.removeMultiPathImages(respUpload.files, ["image"]);
    return next({
      status: 2,
      message: CommonHelper.errorsValidate(isValid.errors.errors),
    });
  }

  const user_id = req.session.user._id;
  let userData = await self.getById(user_id);
  if (!userData) {
    return next({ status: 0, message: trans.lang("message.user.not_found") });
  }
  const isEmailExists = await self.isEmailExists(req.body.email, user_id);
  if (isEmailExists) {
    return next({
      status: 0,
      message: trans.lang("message.email_already_exists"),
    });
  }
  let user_data = {
    name: _body.name,
    email: _body.email,
    // role: _body.role,
  };
  if (
    respUpload.files.image != undefined &&
    respUpload.files.image[0] != undefined &&
    respUpload.files.image[0].filename != undefined
  ) {
    user_data.image = respUpload.files.image[0].filename;
  }
  await User.updateOne({ _id: user_id }, user_data);

  userData = await self.getById(user_id);
  var role = await Role.findOne({ _id: userData.role });
  userData.role_name = role.name;
  userData.image = await UserHelper.userAvatar(userData.image);
  req.session.user = userData;
  CommonHelper.sessionrefresh(req);
  return next({
    status: 1,
    message: trans.lang("message.user.success_update_profile"),
  });
};

module.exports.changePasswordUpdate = async function (req, res, next) {
  var self = this;
  let isValid = UserValidator.adminResetPassword(req.body);
  if (isValid.fails()) {
    return next({
      status: 2,
      message: CommonHelper.errorsValidate(isValid.errors.errors),
    });
  }
  let user_id = req.session.user._id;
  var userData = await self.getById(user_id);
  if (!userData) {
    return next({
      status: 0,
      message: trans.lang("message.user.not_found"),
      user_id,
    });
  }
  var is_correct = CommonHelper.isPasswordCorrect(
    userData.password,
    userData.salt,
    req.body.old_password + ""
  );
  if (is_correct) {
    var password_arr = CommonHelper.hashPassword(req.body.new_password.trim());
    await User.updateOne(
      { _id: user_id },
      { password: password_arr.hash, salt: password_arr.salt }
    );
    return next({
      status: 1,
      message: trans.lang("message.user.success_change_password"),
    });
  } else {
    return next({
      status: 0,
      message: trans.lang("message.user.invalid_password"),
    });
  }
};

/* User Management */

module.exports.store = async function (req, next) {
  const self = this;
  const isValid = UserValidator.userManagementStore(req.body);
  if (isValid.fails()) {
    return next({
      status: 2,
      message: CommonHelper.errorsValidate(isValid.errors.errors),
    });
  }
  let emailId = req.body.email.trim().toLowerCase();
  const isEmailExists = await self.isEmailExists(emailId);
  if (isEmailExists) {
    return next({
      status: 0,
      message: trans.lang("message.email_already_exists"),
    });
  }
  var salt_pass = CommonHelper.hashPassword(req.body.password);
  const userData = new User({
    name: req.body.name,
    role: req.body.role,
    email: emailId,
    password: salt_pass.hash,
    salt: salt_pass.salt,
  });
  userData.save(function (error, data) {
    if (error) {
      return next({
        status: 0,
        message: trans.lang("message.something_went_wrong"),
      });
    } else {
      return next({
        status: 1,
        message: trans.lang("message.user_management.add_success"),
      });
    }
  });
};
