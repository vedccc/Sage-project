const msg91 = require('msg91/index.js');
const { data } = require('node-env-file');
const UserValidator = require('../models/validators/UserValidator');
const CommonHelper = require('../helpers/CommonHelper');
const ConstantJs = require('../helpers/Constant.js')


module.exports.generateNormalOutput = (body)=>{
    return body;
}

module.exports. returnJson = (data)=>{
    return data;
}


module.exports.changeStatus = (err) => {
    if(err){
        return this.generateNormalOutput({status:ConstantJs.failStatus,message:trans.lang('message.something_went_wrong')});
            }
        else{
          return  this.generateNormalOutput({status:ConstantJs.successStatus,message:trans.lang('message.status_success')});
        }
}

module.exports.delete = (err)=> {
        if (err) {
            return this.generateNormalOutput({status:ConstantJs.failStatus,message:trans.lang('message.something_went_wrong')});
        } 
        else {
            return this.generateNormalOutput({status:ConstantJs.successStatus,message:trans.lang('message.delete_success')});
        }

}

module.exports.generateOutput =(data,err,total)=>{
    if(err){
        return this.generateNormalOutput({status:ConstantJs.failStatus,message:trans.lang('message.something_went_wrong')});
    }
    else{
        return this.returnJson({status:ConstantJs.successStatus, message:trans.lang('message.loaded_success'), data:data, totalRecords: total});
    }
}

// module.exports.logIn =(data,err)=>{
//     if (err) {
//         return this.generateNormalOutput({status:ConstantJs.failStatus,message:trans.lang('message.something_went_wrong')});
//     }
//     if (!data) {
//         return this.generateNormalOutput({status:ConstantJs.failStatus,message:trans.lang('message.auth_fail')});


//     }
//     var is_correct = CommonHelper.isPasswordCorrect(data.password, data.salt, password);
//     var token = CommonHelper.generateSalt();
//     if (is_correct) {
//         var id = (data._id);
//         var role = Role.findOne({ _id: data.role });
//         data.role_name = role.name;
//         data.image = UserHelper.userAvatar(data.image);
//         req.session.user = data;
//         CommonHelper.sessionrefresh(req);
//         this.returnJson({status:ConstantJs.successStatus, message:"Login success",  token: token});

//     } else {
//         return this.generateNormalOutput({status:ConstantJs.failStatus,message:trans.lang('message.auth_fail')});

//     }
// }
