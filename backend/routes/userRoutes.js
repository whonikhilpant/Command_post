const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, admin } = require('../middleware/auth');

// ============================================
// GET ALL USERS (Admin only)
// GET /api/users
// ============================================
router.get('/', protect, admin, async (req, res) => {
    try {
        const users = await User.find({})
            .select('-password') // Exclude password
            .sort({ createdAt: -1 }); // Newest first

        res.json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        console.error('Get all users error:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
});

module.exports = router;
