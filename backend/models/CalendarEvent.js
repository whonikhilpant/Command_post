const mongoose = require('mongoose');
const calendarEventSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: String, // Format: YYYY-MM-DD
        required: true
    },
    label: {
        type: String,
        required: true,
        trim: true
    },
    color: {
        type: String,
        enum: ['primary', 'blue', 'sky', 'purple', 'orange', 'slate'],
        default: 'slate'
    },
    type: {
        type: String,
        default: 'custom'
    }
}, {
    timestamps: true
});
// Index for efficient queries
calendarEventSchema.index({ userId: 1, date: 1 });
module.exports = mongoose.model('CalendarEvent', calendarEventSchema);