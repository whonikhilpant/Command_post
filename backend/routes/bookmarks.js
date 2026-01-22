const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Article = require('../models/Article');
const { protect } = require('../middleware/auth');

// All bookmark routes are protected (require login)

// ============================================
// GET USER'S BOOKMARKS
// GET /api/bookmarks
// ============================================
router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('bookmarks');
    
    res.json({
      success: true,
      count: user.bookmarks.length,
      data: user.bookmarks
    });
    
  } catch (error) {
    console.error('Get bookmarks error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching bookmarks'
    });
  }
});

// ============================================
// ADD BOOKMARK
// POST /api/bookmarks/:articleId
// ============================================
router.post('/:articleId', protect, async (req, res) => {
  try {
    const { articleId } = req.params;
    
    // Check if article exists
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      });
    }
    
    const user = await User.findById(req.user._id);
    
    // Check if already bookmarked
    if (user.bookmarks.includes(articleId)) {
      return res.status(400).json({
        success: false,
        message: 'Article already bookmarked'
      });
    }
    
    // Add bookmark
    user.bookmarks.push(articleId);
    await user.save();
    
    res.json({
      success: true,
      message: 'Bookmark added',
      data: user.bookmarks
    });
    
  } catch (error) {
    console.error('Add bookmark error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error adding bookmark'
    });
  }
});

// ============================================
// REMOVE BOOKMARK
// DELETE /api/bookmarks/:articleId
// ============================================
router.delete('/:articleId', protect, async (req, res) => {
  try {
    const { articleId } = req.params;
    
    const user = await User.findById(req.user._id);
    
    // Remove bookmark
    user.bookmarks = user.bookmarks.filter(
      id => id.toString() !== articleId
    );
    
    await user.save();
    
    res.json({
      success: true,
      message: 'Bookmark removed',
      data: user.bookmarks
    });
    
  } catch (error) {
    console.error('Remove bookmark error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error removing bookmark'
    });
  }
});

// ============================================
// CHECK IF BOOKMARKED
// GET /api/bookmarks/check/:articleId
// ============================================
router.get('/check/:articleId', protect, async (req, res) => {
  try {
    const { articleId } = req.params;
    const user = await User.findById(req.user._id);
    
    const isBookmarked = user.bookmarks.includes(articleId);
    
    res.json({
      success: true,
      data: {
        isBookmarked
      }
    });
    
  } catch (error) {
    console.error('Check bookmark error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error checking bookmark'
    });
  }
});

module.exports = router;