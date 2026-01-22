const express = require('express');
const router = express.Router();
const CalendarEvent = require('../models/CalendarEvent');
const { protect } = require('../middleware/auth');
// Get all custom events for logged-in user
router.get('/', protect, async (req, res) => {
    try {
        const events = await CalendarEvent.find({ userId: req.user._id })
            .sort({ date: 1 });

        res.json({
            success: true,
            data: events
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching calendar events',
            error: error.message
        });
    }
});
// Create new custom event
router.post('/', protect, async (req, res) => {
    try {
        const event = await CalendarEvent.create({
            userId: req.user._id,
            ...req.body
        });

        res.status(201).json({
            success: true,
            message: 'Event created successfully',
            data: event
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error creating event',
            error: error.message
        });
    }
});
// Delete custom event
router.delete('/:id', protect, async (req, res) => {
    try {
        const event = await CalendarEvent.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        await event.deleteOne();

        res.json({
            success: true,
            message: 'Event deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting event',
            error: error.message
        });
    }
});
module.exports = router;