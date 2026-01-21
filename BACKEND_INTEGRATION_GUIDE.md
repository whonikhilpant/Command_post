# Backend Integration Guide for Command Post

## 📋 Table of Contents
1. [Current Application Overview](#current-application-overview)
2. [What Needs Backend Integration](#what-needs-backend-integration)
3. [Backend Setup (Step-by-Step)](#backend-setup-step-by-step)
4. [Frontend Integration Points](#frontend-integration-points)
5. [API Endpoints to Create](#api-endpoints-to-create)
6. [Database Schema](#database-schema)
7. [Authentication Setup](#authentication-setup)
8. [Step-by-Step Implementation](#step-by-step-implementation)

---

## Current Application Overview

Your application is a **React-based Defence Exam Hub** that currently:
- Uses **localStorage** for all data persistence (user data, bookmarks, calendar events)
- Uses **mock data** for articles and notifications
- Has no backend connection - everything runs client-side

**Tech Stack:**
- Frontend: React 18, React Router, Vite, Tailwind CSS
- Current Storage: Browser localStorage only
- No API calls currently

---

## What Needs Backend Integration

### 1. **User Authentication & Profile** ⭐ HIGH PRIORITY
   - **Current**: Mock login/register using localStorage
   - **Location**: `src/pages/ProfilePage.jsx`, `src/utils/userStorage.js`
   - **Needs**: Real user registration, login, password hashing, JWT tokens

### 2. **Articles Management** ⭐ HIGH PRIORITY
   - **Current**: Static mock data in `src/data/mockArticles.js`
   - **Location**: `src/pages/HomePage.jsx`, `src/pages/ArticleDetailPage.jsx`
   - **Needs**: CRUD operations, search, filtering, pagination

### 3. **Bookmarks** ⭐ MEDIUM PRIORITY
   - **Current**: localStorage in `src/utils/localStorage.js`, `src/hooks/useBookmarks.js`
   - **Location**: `src/pages/BookmarksPage.jsx`
   - **Needs**: User-specific bookmarks stored in database

### 4. **Notifications** ⭐ MEDIUM PRIORITY
   - **Current**: Mock data in `src/data/mockNotifications.js`
   - **Location**: `src/pages/NotificationsPage.jsx`
   - **Needs**: Real-time or scheduled notifications, user preferences

### 5. **Calendar Events** ⭐ MEDIUM PRIORITY
   - **Current**: Mock exam dates + localStorage for custom dates
   - **Location**: `src/pages/CalendarPage.jsx`, `src/utils/calendarStorage.js`
   - **Needs**: User-specific custom dates, exam date management

### 6. **Search Functionality** ⭐ LOW PRIORITY
   - **Current**: Client-side filtering
   - **Location**: `src/components/SearchBar.jsx`, `src/pages/HomePage.jsx`
   - **Needs**: Server-side search with better performance

---

## Backend Setup (Step-by-Step)

### Step 1: Choose Your Backend Technology

**Recommended for Beginners: Node.js + Express**

**Why?**
- Same language (JavaScript) as your frontend
- Large community and resources
- Easy to learn
- Great for REST APIs

**Alternative Options:**
- Python + Flask/FastAPI (if you know Python)
- PHP + Laravel (traditional web stack)
- Java + Spring Boot (enterprise-grade)

### Step 2: Initialize Backend Project

```bash
# Create backend folder (outside your frontend project)
cd ..
mkdir command-post-backend
cd command-post-backend

# Initialize Node.js project
npm init -y

# Install essential packages
npm install express cors dotenv
npm install mongoose  # if using MongoDB
# OR
npm install mysql2     # if using MySQL
# OR
npm install pg         # if using PostgreSQL

# Install development dependencies
npm install --save-dev nodemon
```

### Step 3: Create Basic Server Structure

Create these files in your backend folder:

```
command-post-backend/
├── server.js          # Main server file
├── .env               # Environment variables
├── package.json
├── routes/
│   ├── auth.js        # Authentication routes
│   ├── articles.js    # Article routes
│   ├── bookmarks.js   # Bookmark routes
│   ├── notifications.js
│   └── calendar.js
├── models/
│   ├── User.js
│   ├── Article.js
│   ├── Bookmark.js
│   ├── Notification.js
│   └── CalendarEvent.js
├── controllers/
│   ├── authController.js
│   ├── articleController.js
│   └── ...
├── middleware/
│   ├── auth.js        # JWT verification
│   └── errorHandler.js
└── config/
    └── database.js
```

---

## Frontend Integration Points

### Where to Make Changes in Your Frontend:

#### 1. **Create API Service Layer**
   **New File**: `src/services/api.js`
   - Centralized API configuration
   - Base URL management
   - Request/response interceptors
   - Error handling

#### 2. **Update User Authentication**
   **File**: `src/pages/ProfilePage.jsx`
   - Replace `handleLogin()` with API call
   - Replace `handleRegister()` with API call
   - Add token storage and management

#### 3. **Update Articles**
   **File**: `src/pages/HomePage.jsx`
   - Replace `mockArticles` import with API call
   - Add loading states
   - Add error handling

#### 4. **Update Bookmarks**
   **File**: `src/hooks/useBookmarks.js`
   - Replace localStorage calls with API calls
   - Add sync with backend

#### 5. **Update Notifications**
   **File**: `src/pages/NotificationsPage.jsx`
   - Replace mock data with API call

#### 6. **Update Calendar**
   **File**: `src/pages/CalendarPage.jsx`
   - Replace localStorage with API calls for custom dates

---

## API Endpoints to Create

### Authentication Endpoints
```
POST   /api/auth/register     - Register new user
POST   /api/auth/login         - Login user
POST   /api/auth/logout        - Logout user
GET    /api/auth/me            - Get current user
PUT    /api/auth/profile       - Update user profile
```

### Article Endpoints
```
GET    /api/articles           - Get all articles (with pagination, filters)
GET    /api/articles/:id       - Get single article
POST   /api/articles           - Create article (admin only)
PUT    /api/articles/:id       - Update article (admin only)
DELETE /api/articles/:id      - Delete article (admin only)
GET    /api/articles/search    - Search articles
```

### Bookmark Endpoints
```
GET    /api/bookmarks          - Get user's bookmarks
POST   /api/bookmarks          - Add bookmark
DELETE /api/bookmarks/:id      - Remove bookmark
GET    /api/bookmarks/check/:articleId  - Check if bookmarked
```

### Notification Endpoints
```
GET    /api/notifications      - Get user's notifications
PUT    /api/notifications/:id/read  - Mark as read
GET    /api/notifications/unread-count  - Get unread count
```

### Calendar Endpoints
```
GET    /api/calendar/events    - Get user's calendar events
POST   /api/calendar/events    - Add custom event
PUT    /api/calendar/events/:id  - Update event
DELETE /api/calendar/events/:id  - Delete event
```

---

## Database Schema

### Users Collection/Table
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  examPreparing: [String],  // ['CDS', 'NDA', ...]
  targetYear: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Articles Collection/Table
```javascript
{
  _id: ObjectId,
  title: String,
  excerpt: String,
  content: String,
  category: String,  // 'Army', 'Navy', 'Air Force', 'Joint Forces'
  examTags: [String],
  date: Date,
  image: String (URL),
  importantPoints: [String],
  examImportance: String,
  author: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### Bookmarks Collection/Table
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  articleId: ObjectId (ref: Article),
  createdAt: Date
}
```

### Notifications Collection/Table
```javascript
{
  _id: ObjectId,
  title: String,
  message: String,
  type: String,  // 'CDS', 'NDA', etc.
  category: String,  // 'exam_notification', 'application_open', etc.
  examDate: Date,
  lastDateToApply: Date,
  link: String,
  priority: String,  // 'high', 'normal'
  createdAt: Date
}
```

### CalendarEvents Collection/Table
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  date: Date,
  label: String,
  color: String,
  type: String,  // 'custom' or 'exam'
  exam: String,  // if type is 'exam'
  category: String,
  createdAt: Date
}
```

---

## Authentication Setup

### JWT (JSON Web Tokens) Flow:

1. **User logs in** → Backend validates credentials
2. **Backend generates JWT token** → Contains user ID and expiration
3. **Frontend stores token** → localStorage or httpOnly cookie
4. **Frontend sends token** → In Authorization header for protected routes
5. **Backend verifies token** → Middleware checks token validity

### Implementation Steps:

1. Install JWT package: `npm install jsonwebtoken bcryptjs`
2. Create auth middleware to verify tokens
3. Hash passwords using bcrypt
4. Store tokens securely in frontend

---

## Step-by-Step Implementation

### Phase 1: Basic Backend Setup (Week 1)

1. **Day 1-2: Setup Project**
   - Initialize Node.js project
   - Install dependencies
   - Create basic Express server
   - Test server runs on port 3000

2. **Day 3-4: Database Setup**
   - Choose database (MongoDB recommended for beginners)
   - Connect to database
   - Create basic models (User, Article)

3. **Day 5-7: Authentication**
   - Implement user registration
   - Implement login with JWT
   - Test with Postman/Thunder Client

### Phase 2: Core Features (Week 2)

1. **Day 1-3: Articles API**
   - Create article endpoints
   - Add CRUD operations
   - Add search/filter functionality

2. **Day 4-5: Bookmarks API**
   - Create bookmark endpoints
   - Link to user and articles

3. **Day 6-7: Frontend Integration**
   - Create API service layer
   - Replace localStorage with API calls
   - Test end-to-end

### Phase 3: Additional Features (Week 3)

1. **Notifications API**
2. **Calendar Events API**
3. **Error handling and validation**
4. **Testing and debugging**

---

## Quick Start: Minimal Backend Example

Here's a minimal working example to get you started:

### 1. Backend `server.js` (Basic Structure)

```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow frontend to connect
app.use(express.json()); // Parse JSON requests

// Basic route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

### 2. Frontend API Service `src/services/api.js`

```javascript
const API_BASE_URL = 'http://localhost:3000/api';

// Helper function to make API calls
export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    },
    ...options
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Example: Get articles
export const getArticles = () => apiCall('/articles');

// Example: Login
export const login = (email, password) => 
  apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
```

### 3. Update HomePage to use API

```javascript
// In src/pages/HomePage.jsx
import { useState, useEffect } from 'react';
import { getArticles } from '../services/api';

const HomePage = ({ searchQuery = '' }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const data = await getArticles();
        setArticles(data.articles || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <div>Loading articles...</div>;
  if (error) return <div>Error: {error}</div>;

  // ... rest of your component
};
```

---

## Environment Variables

Create `.env` file in backend:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/commandpost
# OR for MySQL
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=yourpassword
# DB_NAME=commandpost

JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRE=7d
```

---

## Testing Your Backend

### Using Postman or Thunder Client (VS Code Extension)

1. **Test Health Endpoint**
   - Method: GET
   - URL: `http://localhost:3000/api/health`
   - Should return: `{ message: 'Backend is running!' }`

2. **Test Register**
   - Method: POST
   - URL: `http://localhost:3000/api/auth/register`
   - Body (JSON):
     ```json
     {
       "name": "Test User",
       "email": "test@example.com",
       "password": "password123"
     }
     ```

---

## Common Issues & Solutions

### CORS Errors
**Problem**: Frontend can't connect to backend
**Solution**: Make sure `cors()` middleware is enabled in Express

### 404 Not Found
**Problem**: API endpoint not found
**Solution**: Check route paths match exactly (case-sensitive)

### Authentication Errors
**Problem**: Token not being sent or invalid
**Solution**: Check Authorization header format: `Bearer <token>`

---

## Next Steps After Basic Setup

1. **Add Input Validation** - Use libraries like `express-validator`
2. **Add Error Handling** - Centralized error handling middleware
3. **Add Rate Limiting** - Prevent abuse
4. **Add Logging** - Track requests and errors
5. **Add Testing** - Unit and integration tests
6. **Deploy Backend** - Use services like Heroku, Railway, or Render

---

## Learning Resources

### Backend Development
- [MDN Express Tutorial](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs)
- [Node.js Official Docs](https://nodejs.org/en/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)

### Database
- [MongoDB University](https://university.mongodb.com/) - Free courses
- [MongoDB Docs](https://docs.mongodb.com/)

### Authentication
- [JWT.io](https://jwt.io/) - Understand JWT tokens
- [bcrypt Documentation](https://www.npmjs.com/package/bcryptjs)

---

## Summary Checklist

- [ ] Setup Node.js backend project
- [ ] Install Express and dependencies
- [ ] Create database connection
- [ ] Create User model and authentication
- [ ] Create Article model and endpoints
- [ ] Create Bookmark model and endpoints
- [ ] Create frontend API service layer
- [ ] Replace localStorage with API calls
- [ ] Test all endpoints
- [ ] Add error handling
- [ ] Deploy backend

---

**Good luck with your backend journey! Start with Phase 1 and take it one step at a time. 🚀**
