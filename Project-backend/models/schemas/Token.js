var mongoose = require('mongoose');

const TokenSchema = mongoose.Schema({
    
   
    hash_name: { type: String, required: false, default: "" },
    user_id: { type: mongoose.Schema.Types.ObjectId, required: false },
    // hashed_Refresh_token: { type: String, required: false, trim: true, default: "" },
   
});

module.exports = mongoose.model('Token', TokenSchema);