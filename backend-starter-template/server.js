/**
 * Command Post Backend - Starter Template
 * 
 * This is a basic Express.js server to get you started.
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a new folder: command-post-backend
 * 2. Copy this file and package.json to that folder
 * 3. Run: npm install
 * 4. Run: npm start
 * 5. Server will run on http://localhost:3000
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// MIDDLEWARE
// ============================================

// Enable CORS (allows frontend to connect)
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Request logging middleware (optional)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// ============================================
// ROUTES
// ============================================

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Backend is running!',
    timestamp: new Date().toISOString()
  });
});

// ============================================
// AUTHENTICATION ROUTES (Example)
// ============================================

// Register endpoint (example - you'll need to add database)
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, phone, examPreparing, targetYear } = req.body;

    // TODO: Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ 
        message: 'Name, email, and password are required' 
      });
    }

    // TODO: Check if user already exists
    // TODO: Hash password using bcrypt
    // TODO: Save user to database

    // Mock response for now
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: Date.now(),
        name,
        email,
        phone: phone || '',
        examPreparing: examPreparing || [],
        targetYear: targetYear || new Date().getFullYear().toString()
      },
      token: 'mock-jwt-token-here' // TODO: Generate real JWT token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login endpoint (example)
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // TODO: Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email and password are required' 
      });
    }

    // TODO: Find user in database
    // TODO: Verify password using bcrypt
    // TODO: Generate JWT token

    // Mock response for now
    res.json({
      message: 'Login successful',
      user: {
        id: 1,
        name: email.split('@')[0],
        email,
        phone: '',
        examPreparing: [],
        targetYear: new Date().getFullYear().toString()
      },
      token: 'mock-jwt-token-here' // TODO: Generate real JWT token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// ============================================
// ARTICLES ROUTES (Example)
// ============================================

// Get all articles
app.get('/api/articles', async (req, res) => {
  try {
    const { category, exam, search, page = 1, limit = 20 } = req.query;

    // TODO: Query database with filters
    // TODO: Implement pagination
    // TODO: Implement search

    // Mock response for now
    const mockArticles = [
      {
        _id: 1,
        title: "Sample Article",
        excerpt: "This is a sample article",
        content: "Full content here...",
        category: "Army",
        examTags: ["CDS", "NDA"],
        date: new Date().toISOString(),
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800"
      }
    ];

    res.json({
      articles: mockArticles,
      total: 1,
      page: parseInt(page),
      limit: parseInt(limit)
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ message: 'Error fetching articles' });
  }
});

// Get single article
app.get('/api/articles/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // TODO: Find article in database by ID

    // Mock response
    res.json({
      _id: id,
      title: "Sample Article",
      content: "Full article content...",
      // ... other fields
    });
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ message: 'Error fetching article' });
  }
});

// ============================================
// BOOKMARKS ROUTES (Example)
// ============================================

// Get user's bookmarks
app.get('/api/bookmarks', async (req, res) => {
  try {
    // TODO: Get user ID from JWT token
    // TODO: Query database for user's bookmarks

    // Mock response
    res.json({
      bookmarks: []
    });
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    res.status(500).json({ message: 'Error fetching bookmarks' });
  }
});

// Add bookmark
app.post('/api/bookmarks', async (req, res) => {
  try {
    const { articleId } = req.body;

    // TODO: Get user ID from JWT token
    // TODO: Check if bookmark already exists
    // TODO: Save bookmark to database

    res.status(201).json({
      message: 'Bookmark added successfully',
      bookmark: {
        _id: Date.now(),
        userId: 1, // TODO: Get from token
        articleId
      }
    });
  } catch (error) {
    console.error('Error adding bookmark:', error);
    res.status(500).json({ message: 'Error adding bookmark' });
  }
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
  console.log(`💡 Health check: http://localhost:${PORT}/api/health`);
});
