var Config = require('./schemas/Config');

module.exports.getValBykey = function (skey) {
    return new Promise(function (resolve, reject) {
        where = { skey: skey };
        Config.findOne().where(where).then(function (data, err) {
            if (data.val_type == 0) {
                resolve(data.sval);
            } else {
                resolve(data.ival);
            }
        });
    });
};

module.exports.getBykey = function (skey) {
    return new Promise(function (resolve, reject) {
        let where = { skey: skey };
        Config.findOne().where(where).then(function (data, err) {
            resolve(data);
        });
    });
};

// module.exports.update = async function (req, res, next) {
//     var self = this;
//     if (req.body.val == "") {
//         return next({ status: 0, message: trans.lang('message.setting.req_value') });
//     }
//     var confData = await self.getBykey(req.body.skey);
//     var _data = { ival: req.body.val }
//     if (confData.val_type == 0) {
//         _data = { sval: req.body.val }
//     }
//     Config.findOneAndUpdate({ skey: req.body.skey }, _data).then(function (data, err) {
//         if (!data) {
//             return next({ status: 0, message: trans.lang('message.setting.not_found') })
//         }
//         return next({ status: 1, message: trans.lang('message.setting.success_update') })
//     });
// };

// module.exports.updateSmsSetting = async function (req, res, next) {
//     var self = this;
//     if (req.body.msg91_api_key == "" || req.body.msg91_sender_id == "" || req.body.msg91_route_no == "") {
//         return next({ status: 0, message: trans.lang('message.setting.req_value') });
//     }
//     await Config.findOneAndUpdate({ skey: "msg91_api_key" }, { sval: req.body.msg91_api_key });
//     await Config.findOneAndUpdate({ skey: "msg91_sender_id" }, { sval: req.body.msg91_sender_id });
//     await Config.findOneAndUpdate({ skey: "msg91_route_no" }, { sval: req.body.msg91_route_no });
//     return next({ status: 1, message: trans.lang('message.setting.success_update') })
// };