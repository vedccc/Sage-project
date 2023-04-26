const mongoose = require('mongoose');
const Product = require('./schemas/Product');
const ProductValidator = require('./validators/ProductValidator');
const CommonHelper = require('../helpers/CommonHelper');
const UploadHelper = require('../helpers/UploadHelper');

module.exports.store = async function (req, res, next) {
    req.body.file_data = [
        { file_name: 'image', file_path: locals.product_image.base_path,max_file:5 },
    ];
    var respUpload = await UploadHelper.uploadMultiFile(req, res);
    if (respUpload.error != undefined) {
        return next({ status: 0, message: respUpload.message })
    }
    const _body = respUpload.body;
    const isValid = ProductValidator.store(_body);
    if (isValid.fails()) {
        await UploadHelper.removeMultiPathImages(respUpload.files, ['image']);
        return next({ status: 2, message: CommonHelper.errorsValidate(isValid.errors.errors) });
    };
    const ProductObjData = new Product({
        title: _body.title,
        description: _body.description,
        price:_body.price,
        user_id: req.session.user._id,
    });
    let productImage=[];
    if (respUpload.files.image.length>0) {
        respUpload.files.image.map((row)=>productImage.push(row.filename))
    }
    
    ProductObjData.image = productImage;
    ProductObjData.save(async function (error, respData) {
        if (error) {
            return next({ status: 0, message: trans.lang('message.something_went_wrong') });
        } else {
            return next({ status: 1, message: trans.lang('message.add_success') });
        }
    });
};

module.exports.update = async function (req, res, next) {
    const self = this;
    req.body.file_data = [
        { file_name: 'image', file_path: locals.product_image.base_path,max_file:5 },
    ];
    var respUpload = await UploadHelper.uploadMultiFile(req, res);
    if (respUpload.error != undefined) {
        return next({ status: 0, message: respUpload.message })
    }
    const _body = respUpload.body;
    const isValid = ProductValidator.update(_body);
    if (isValid.fails()) {
        await UploadHelper.removeMultiPathImages(respUpload.files, ['image']);
        return next({ status: 2, message: CommonHelper.errorsValidate(isValid.errors.errors) });
    }
    
    let ProductObjData = {
        title: _body.title,
        description: _body.description,
        price:_body.price,
        user_id: req.session.user._id,
    }
        
        if (respUpload.files.image && respUpload.files.image!==undefined && respUpload.files.image.length>0) {
            let productImage=[];
            respUpload.files.image.map((row)=>productImage.push(row.filename))
            ProductObjData.image = productImage;
        }
        
        
    await Product.updateOne({ _id: _body.id }, ProductObjData);

    return next({ status: 1, message: trans.lang('message.edit_success') });
};

module.exports.list = function (req, next) {
    var sort = CommonHelper.modalSort(req);
    var s_data = {};
    if (req.query.search.value) {
        var regex = new RegExp(req.query.search.value, "i")
        s_data = {
            $or: [
                { 'description': regex },
                { 'title': regex }
            ]
        };
    };
    var project = {
        "image": "$image",
        "title": "$title",
        "description": "$description",
        "price": "$price",
    };
    Product.aggregate([
        { $match: s_data },
        { $sort: sort },
        { $skip: Number(req.query.start) },
        { $limit: Number(req.query.length) },
        { $project: project },
    ], async function (err, data) {
        Product.aggregate([
            { $match: s_data },
            { $group: { _id: null, count: { $sum: 1 } } }
        ], async function (err, cdata) {
            const count = (cdata[0] == undefined || cdata[0].count == undefined) ? 0 : cdata[0].count;
            var total = await Product.countDocuments();
            if (data.length > 0) {
                await data.reduce(function (promiesRes, row, index) {
                    return promiesRes.then(function (data_d) {
                        return new Promise(async function (resolve, reject) {
                            if (row.type === "Sms") {
                                row.type = "SMS"
                            }
                            resolve(row);
                        });
                    });
                }, Promise.resolve(null)).then(function (arrayOfResults) {
                    var ret_data = CommonHelper.paginateData(req, data, count, total);
                    next(ret_data); return;
                });

            } else {
                var ret_data = CommonHelper.paginateData(req, data, count, total);
                next(ret_data); return;
            }
        });
    });
};


module.exports.delete = async function (req, next) {
    Product.deleteOne({ _id: req.body.id }, function (err, results) {
        if (err) {
            return next({ status: 0, message: trans.lang('message.something_went_wrong') });
        } else {
            return next({ status: 1, message: trans.lang('message.delete_success') });
        }
    });
};

module.exports.getById = function (id) {
    return new Promise(function (resolve, reject) {
        Product.findOne().where({ _id: mongoose.Types.ObjectId(id) }).then(async function (data, err) {
            return resolve(data);
        });
    });
};
