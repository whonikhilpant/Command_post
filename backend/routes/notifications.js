const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// GET all notifications
router.get('/', async (req, res) => {
    try {
        const { type, category } = req.query;
        let query = {};
        if (type && type !== 'All') query.type = type;
        if (category && category !== 'All') query.category = category;

        const notifications = await Notification.find(query).sort({ date: -1, createdAt: -1 });
        res.json({ success: true, count: notifications.length, data: notifications });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching notifications', error: error.message });
    }
});

// POST create notification
router.post('/', async (req, res) => {
    try {
        const notification = await Notification.create(req.body);
        res.status(201).json({ success: true, data: notification });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error creating notification', error: error.message });
    }
});

// DELETE notification
router.delete('/:id', async (req, res) => {
    try {
        const notification = await Notification.findByIdAndDelete(req.params.id);
        if (!notification) return res.status(404).json({ success: false, message: 'Notification not found' });
        res.json({ success: true, message: 'Notification deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting notification', error: error.message });
    }
});

module.exports = router;