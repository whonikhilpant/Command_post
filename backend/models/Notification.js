const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    message: {
        type: String,
        required: true
    },

    type: {
        type: String,
        enum: ['CDS', 'NDA', 'AFCAT', 'CAPF', 'SSB', 'All'],
        required: true
    },

    category: {
        type: String,
        enum: ['exam_notification', 'application_open', 'admit_card', 'result', 'interview_schedule', 'guideline_update'],
        required: true
    },

    date: {
        type: String,
        default: () => new Date().toISOString().split('T')[0]
    },

    priority: {
        type: String,
        enum: ['high', 'medium', 'low'],
        default: 'medium'
    },

    examDate: {
        type: String
    },

    lastDateToApply: {
        type: String
    },

    link: {
        type: String
    },

    isRead: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;