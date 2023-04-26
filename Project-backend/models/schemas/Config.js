const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ConfigSchema = new Schema({
    skey: { type: String, required: true },
    sval: { type: String, required: false },
    ival: { type: Number, required: false },
    val_type: { type: Number }, /* 0 = string, 1 = number */
    status: { type: Number, default: 1 }, /* 1 = active, 2 = deactive */
    created_at: { type: Date, default: new Date().valueOf().toString() },
    updated_at: { type: Date, default: new Date().valueOf().toString() }
});

// Export the model
module.exports = mongoose.model('Config', ConfigSchema);