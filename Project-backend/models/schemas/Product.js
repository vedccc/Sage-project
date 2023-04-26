var mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    image: { type: Array, required: false, default: "" },
    name: { type: String, required: false, default: "" },
    weight: { type: String, required: false, default: "" },
    description: { type: String, required: false, default: "" },
    displayName: { type: String, required: false, default: "" },
    price: { type: String, required: false, default: "" },
    // price: { type: Number, required: false, default: 0 },
    // status: { type: Number, required: true, default: 1 },
    // user_id: { type: mongoose.Schema.Types.ObjectId, required: false },
  
});

module.exports = mongoose.model('Product', ProductSchema);