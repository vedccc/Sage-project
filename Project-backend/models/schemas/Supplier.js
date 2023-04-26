var mongoose = require('mongoose');

const SupplierSchema = mongoose.Schema({
    
    name: { type: String, required: false, default: "" }, 
    created_at: { type: Number, required: true, default: 0 },
    updated_at: { type: Number, required: false, default: 0 },
});

module.exports = mongoose.model('Supplier', SupplierSchema);