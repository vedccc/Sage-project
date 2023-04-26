var mongoose = require('mongoose');

const Categories_productSchema = mongoose.Schema({
    
    product_id: { type: mongoose.Schema.Types.ObjectId, required: false },
    categories_id: { type: mongoose.Schema.Types.ObjectId, required: false },
    
});

module.exports = mongoose.model('categories_product', Categories_productSchema);