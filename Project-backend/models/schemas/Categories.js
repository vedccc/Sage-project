var mongoose = require('mongoose');

const CategorieSchema = mongoose.Schema({
    name: { type: String, required: false, default: "" },
   
    // product_id: { type: mongoose.Schema.Types.ObjectId, required: false },
    
});

module.exports = mongoose.model('categories', CategorieSchema);