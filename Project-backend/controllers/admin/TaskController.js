const Task = require('../../models/Task.js');


module.exports.store = async function (req, res, next) {
    Task.store(req, res, function (data) {
        res.send(data);
    });
};

module.exports.list = async function (req, res) {
    Task.list(req, function (data) {
        res.send(data);
    });
};

module.exports.delete = function (req, res) {
    Task.delete(req, function (data) {
        res.send(data);
    });
};
