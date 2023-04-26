const Product = require('../../models/Product');
const ejs = require('ejs');

// module.exports.index = async function (req, res, next) {
//     res.render('backend/admin/product/index', { layout: 'backend/layouts/layout', ROLE: "admin", pageTitle: "Product" });
// };


// module.exports.add = async function (req, res, next) {
//     const html = await ejs.renderFile('./views/backend/admin/product/add.ejs', {});
//     res.send({ status: 1, html });
// };

module.exports.store = async function (req, res, next) {
    Product.store(req, res, function (data) {
        res.send(data);
    });
};

module.exports.update = function (req, res, next) {
    Product.update(req,res, function (data) {
        res.send(data);
    });
};

module.exports.list = async function (req, res, next) {
    Product.list(req, function (data) {
        res.send(data);
    });
};

module.exports.delete = function (req, res, next) {
    Product.delete(req, function (data) {
        res.send(data);
    });
};

// module.exports.edit = async function (req, res, next) {
//     const data = await Product.getById(req.body.id);
//     const html = await ejs.renderFile('./views/backend/admin/product/edit.ejs', {
//         data
//     });
//     res.send({ status: 1, html });
// };