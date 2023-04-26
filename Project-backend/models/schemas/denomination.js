var mongoose = require('mongoose');

const DenominationsSchema = mongoose.Schema({
    
    name: { type: String, required: false, default: "" },
    value: { type: Number, required: false, default: "" },
    price: { type: Number, required: false, default: "" },
    currency: { type: Number, required: false, default: "" },
    supplier_id: { type: mongoose.Schema.Types.ObjectId, required: false },
    country_id: { type: mongoose.Schema.Types.ObjectId, required: false },
    denomination_Supplier_id: { type: mongoose.Schema.Types.ObjectId, required: false },
    salt: { type: String, trim: true, required: false }, 
    updated_at: { type: Number, required: false, default: 0 },
});

module.exports = mongoose.model('denomination ', DenominationsSchema );