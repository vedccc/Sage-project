const mongoose = require('mongoose');
const Task = require('./schemas/Task.js');
const TaskValidator = require('./validators/TaskValidator.js');
const CommonHelper = require('../helpers/CommonHelper');
const UploadHelper = require('../helpers/UploadHelper');
const ConstantJs = require('../helpers/Constant.js')
const UtilJs = require('../helpers/Util.js');

module.exports.store = async function (req, res, next) {
    const isValid = TaskValidator.store(req.body);
    if (isValid.fails()) {
       return next(UtilJs.generateNormalOutput({status:ConstantJs.failStatus,message:CommonHelper.errorsValidate(isValid.errors.errors)}));
    }
    const taskData = new Task({
        title: req.body.title,
        is_bookmarked: ConstantJs.failStatus,
        is_pinned: ConstantJs.failStatus,
        is_archived: ConstantJs.failStatus,
        is_done: ConstantJs.failStatus,
        status: ConstantJs.failStatus,
        created_at: moment.utc().valueOf(),
        updated_at: moment.utc().valueOf(),
    });
    taskData.save(function (error, data) {
        if (error) {
            console.log(error,"error=======")
            return next(UtilJs.generateNormalOutput({status:ConstantJs.failStatus,message:trans.lang('message.something_went_wrong')}))
        } else {
            return next(UtilJs.generateNormalOutput({status:ConstantJs.successStatus,message:trans.lang('message.task.add_success')}))

        }
    });
};

module.exports.list = async function (req, next) {
    var s_data = {
        status: {$ne:2}
    };
    var project = {
        "_id": "$_id",
        "title": "$title",
        "is_done": "$is_done",
        "is_pinned": "$is_pinned",
        "is_archived": "$is_archived",
        "is_bookmarked": "$is_bookmarked",
        "status": "$status",
        "created_at": "$created_at",
        "created_by": "$created_by",
        "updated_at": "$updated_at",
        "updated_by": "$updated_by",
    };
    Task.aggregate([
        { $match: s_data },
        { $project: project },
    ], async function (err, data) {
        let total = await Task.aggregate([
            { $match: s_data },
            { $project: project },
        ]);       
         total = total ? total.length : 0;
        return next(UtilJs.generateOutput(data,err,total));
    });
}

module.exports.delete = function (req, next) {
    Task.updateOne({_id:req.body._id},{status:ConstantJs.deleteStatus},function(err){
        return next(UtilJs.delete(err));
    }
    );
};