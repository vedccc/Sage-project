var mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    title: { type: String, required: false, default: "" },
    image_uris: { type: String, required: false, default: "" },
    description: { type: String, required: false, default: "" },
    is_bookmarked: { type: Number, required: false, default: "" },
    is_pinned: { type: Number, required: false, default: "" },
    is_done: { type: Number, required: false, default: "" },
    is_archived: { type: Number, required: false, default: "" },
    is_marked_deleted: { type: Number, required: false, default: "" },
    done_timestamp: { type: Number, required: false, default: "" },
    reminder_timestamp: { type: Number, required: false, default: "" },
    marked_deleted_timestamp: { type: Number, required: false, default: "" },
    status: { type: Number, required: false },
    created_at: { type: Number, required: false },
    updated_at: { type: Number, required: false },
  
});

module.exports = mongoose.model('Task', TaskSchema);
