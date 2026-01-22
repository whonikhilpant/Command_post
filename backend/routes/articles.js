const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const { protect, admin } = require('../middleware/auth'); // ADD admin

// ============================================
// GET ALL ARTICLES (Public)
// ============================================
router.get('/', async (req, res) => {
  try {
    const { category, examTag, search } = req.query;
    
    let query = {};
    
    if (category && category !== 'All') {
      query.category = category;
    }
    
    if (examTag && examTag !== 'All') {
      query.examTags = examTag;
    }
    
    if (search) {
      query.$text = { $search: search };
    }
    
    const articles = await Article.find(query).sort({ date: -1 });
    
    res.json({
      articles: articles,
      total: articles.length
    });
    
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching articles',
      error: error.message
    });
  }
});

// ============================================
// GET SINGLE ARTICLE (Public)
// ============================================
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({
        message: 'Article not found'
      });
    }
    
    res.json(article);
    
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching article',
      error: error.message
    });
  }
});

// ============================================
// CREATE ARTICLE (Admin Only)
// ============================================
router.post('/', protect, admin, async (req, res) => {  // ADDED protect, admin
  try {
    const article = await Article.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Article created successfully',
      data: article
    });
    
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating article',
      error: error.message
    });
  }
});

// ============================================
// UPDATE ARTICLE (Admin Only)
// ============================================
router.put('/:id', protect, admin, async (req, res) => {  // ADDED protect, admin
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Article updated successfully',
      data: article
    });
    
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating article',
      error: error.message
    });
  }
});

// ============================================
// DELETE ARTICLE (Admin Only)
// ============================================
router.delete('/:id', protect, admin, async (req, res) => {  // ADDED protect, admin
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    
    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Article deleted successfully'
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting article',
      error: error.message
    });
  }
});

module.exports = router;