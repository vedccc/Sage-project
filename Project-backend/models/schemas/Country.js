var mongoose = require('mongoose');

const CountrySchema = mongoose.Schema({
    name: { type: String, required: false, default: "" },
    image: { type: Array, required: false, default: "" },
    status: { type: Number, required: true, default: 1 },
    product_id: { type: mongoose.Schema.Types.ObjectId, required: false },
    
});

module.exports = mongoose.model('country', CountrySchema);