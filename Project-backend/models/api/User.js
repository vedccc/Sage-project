const mongoose = require('mongoose');
const User = require('../schemas/User');
// const Otp = require('../schemas/Otp');
const UserValidator = require('./validators/UserValidator');
const CommonHelper = require('../../helpers/CommonHelper');
const UploadHelper = require('../../helpers/UploadHelper');
const UserHelper = require('../../helpers/UserHelper');
const SmsHelper = require('../../helpers/SmsHelper');

// module.exports.sendOtp = async function (req, next) {
//     const self = this;
//     var otp = CommonHelper.generateOTP();
//     let isValid = UserValidator.sendOtp(req.body);
//     if (isValid.fails()) {
//         return next({ status: 0, message: CommonHelper.errorsValidator(isValid.errors.errors) });
//     }
//     /* add cuntrycode */
//     const userData = await self.getByMobile(req.body.mobile_number);
//     if (!userData) {
//         const otpData = new Otp({
//             mobile_number: req.body.mobile_number,
//             otp: req.body.name,
//         });
        
//         otpData.save(function (error, data) {
//             if (error) {
//                 return next({ status: 0, message: trans.lang('message.something_went_wrong') })
//             } else {
//                 if (req.body.mobile_number && req.body.mobile_number !== '') {
//                     SmsHelper.sendOTP(req.body.mobile_number, 'VIRAGA', [otp]);
//                 }
//                 return next({ status: 1, message: trans.lang('message.otp_send') })
//             }
//         });
//     }
    
//     const otpData = {
//         otp: req.body.otp,
//         updated_at: moment.utc().valueOf(),
//     }
//     Otp.findOneAndUpdate({ _id: req.body.id }, otpData).then(function (data, err) {
//         /* Send Sms */
//         if (userData.mobile_number && userData.mobile_number !== '') {
//             SmsHelper.sendOTP(userData.mobile_number, 'VIRAGA', [otp]);
//         }
//         return next({ status: 1, message: "Otp send successfully" });
//     }).catch(function (error) {
//         return next({ status: 0, message: "Something went wrong" });
//     });
// };

// module.exports.getByMobile = function (mobile_number) {
//     return new Promise(function (resolve, reject) {
//         Otp.findOne().where({ mobile_number }).then(async function (data, err) {
//             resolve(data);
//             return;
//         });
//     });
// };