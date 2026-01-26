const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Article = require('../models/Article');
const Notification = require('../models/Notification');
const { protect, admin } = require('../middleware/auth');

// ============================================
// GET ANALYTICS STATS (Admin only)
// GET /api/analytics
// ============================================
router.get('/', protect, admin, async (req, res) => {
    try {
        // Parallelize queries for better performance
        const [
            totalUsers,
            totalArticles,
            totalNotifications,
            articlesByCategory,
            notificationsByType
        ] = await Promise.all([
            User.countDocuments({}),
            Article.countDocuments({}),
            Notification.countDocuments({}),

            // Articles by Category Aggregation
            Article.aggregate([
                { $group: { _id: "$category", count: { $sum: 1 } } }
            ]),

            // Notifications by Type Aggregation
            Notification.aggregate([
                { $group: { _id: "$type", count: { $sum: 1 } } }
            ])
        ]);

        res.json({
            success: true,
            data: {
                counts: {
                    users: totalUsers,
                    articles: totalArticles,
                    notifications: totalNotifications
                },
                breakdowns: {
                    articlesByCategory,
                    notificationsByType
                }
            }
        });
    } catch (error) {
        console.error('Analytics error:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
});

module.exports = router;
