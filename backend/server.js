const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully!'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Import routes
const articleRoutes = require('./routes/articles');
const authRoutes = require('./routes/auth');
const bookmarkRoutes = require('./routes/bookmarks');
const calendarRoutes = require('./routes/calendar');
const notificationRoutes = require('./routes/notifications');

// Use routes - THIS IS IMPORTANT!
app.use('/api/articles', articleRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/notifications', notificationRoutes);

// Home route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to your News App API!',
    status: 'Server is running',
    database: 'Connected to MongoDB',
    endpoints: {
      articles: '/api/articles',
      singleArticle: '/api/articles/:id'
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});