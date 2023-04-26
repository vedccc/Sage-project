var mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

    // country_code: { type: Number, required: false, default: 91 },
    name: { type: String, required: false, default: "" },
    email: { type: String, required: false, default: "" },
    mobile: { type: String, required: false, trim: true, default: "" },
    otp: { type: Number, required: true, default: 0 },
    pin: { type: String, trim: true, required: false },
    salt: { type: String, trim: true, required: false },
    created_at: { type: Number, required: true, default: 0 },
    updated_at: { type: Number, required: false, default: 0 },
});

module.exports = mongoose.model('User', UserSchema);