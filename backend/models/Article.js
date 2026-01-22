const mongoose = require('mongoose');

// Schema that matches your frontend mockArticles format
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  
  excerpt: {
    type: String,
    required: true
  },
  
  content: {
    type: String,
    required: true
  },
  
  category: {
    type: String,
    enum: ['Army', 'Navy', 'Air Force', 'Joint Forces'],
    required: true
  },
  
  examTags: [{
    type: String,
    enum: ['CDS', 'NDA', 'AFCAT', 'CAPF']
  }],
  
  date: {
    type: String,
    default: () => new Date().toISOString().split('T')[0]
  },
  
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800'
  },
  
  importantPoints: [{
    type: String
  }],
  
  examImportance: {
    type: String
  }
  
}, {
  timestamps: true
});

// Text search index
articleSchema.index({ title: 'text', excerpt: 'text', content: 'text' });

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;