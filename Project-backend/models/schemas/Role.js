var mongoose = require('mongoose');

const RoleSchema = mongoose.Schema({
    name: { type: String, required: false, default: "" },
    status: { type: Number, required: true, default: 1 },
});

module.exports = mongoose.model('role', RoleSchema);