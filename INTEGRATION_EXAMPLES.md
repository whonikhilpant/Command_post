# Frontend-Backend Integration Examples

This document shows **exact code changes** you need to make in your existing files to connect to a backend.

---

## Example 1: Update ProfilePage.jsx for Real Authentication

### Current Code (using localStorage):
```javascript
// In ProfilePage.jsx - handleLogin function
const handleLogin = (e) => {
  e.preventDefault();
  // Simple mock login - in production, this would call an API
  if (loginData.email && loginData.password) {
    const userData = {
      id: Date.now(),
      name: loginData.email.split('@')[0],
      email: loginData.email,
      // ... rest of mock data
    };
    if (saveUser(userData)) {
      // ... update state
    }
  }
};
```

### Updated Code (using API):
```javascript
// First, import the API functions at the top
import { loginUser, registerUser, updateUserProfile } from '../services/api';

// Update handleLogin function
const handleLogin = async (e) => {
  e.preventDefault();
  
  if (!loginData.email || !loginData.password) {
    alert('Please enter email and password');
    return;
  }

  try {
    // Show loading state
    setIsLoading(true);
    
    // Call API
    const response = await loginUser(loginData.email, loginData.password);
    
    // API returns { user, token }
    // Token is automatically stored in localStorage by loginUser function
    setUser(response.user);
    setFormData({
      name: response.user.name || '',
      email: response.user.email || '',
      phone: response.user.phone || '',
      examPreparing: response.user.examPreparing || [],
      targetYear: response.user.targetYear || ''
    });
    setIsAuthenticated(true);
    setIsLoginMode(false);
    
    alert('Login successful!');
  } catch (error) {
    console.error('Login error:', error);
    alert(error.message || 'Login failed. Please check your credentials.');
  } finally {
    setIsLoading(false);
  }
};

// Update handleRegister function
const handleRegister = async (e) => {
  e.preventDefault();
  
  if (!formData.name || !formData.email) {
    alert('Please fill in required fields');
    return;
  }

  try {
    setIsLoading(true);
    
    // Call API with user data
    const response = await registerUser({
      name: formData.name,
      email: formData.email,
      password: formData.password, // You'll need to add password field
      phone: formData.phone || '',
      examPreparing: formData.examPreparing || [],
      targetYear: formData.targetYear || new Date().getFullYear().toString()
    });
    
    // After registration, automatically log in
    setUser(response.user);
    setIsAuthenticated(true);
    setIsLoginMode(false);
    
    alert('Registration successful!');
  } catch (error) {
    console.error('Registration error:', error);
    alert(error.message || 'Registration failed. Please try again.');
  } finally {
    setIsLoading(false);
  }
};

// Update handleUpdateProfile function
const handleUpdateProfile = async (e) => {
  e.preventDefault();
  
  if (!user) return;

  try {
    setIsLoading(true);
    
    // Call API to update profile
    const updatedUser = await updateUserProfile({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      examPreparing: formData.examPreparing,
      targetYear: formData.targetYear
    });
    
    setUser(updatedUser);
    setIsEditingExams(false);
    alert('Profile updated successfully!');
  } catch (error) {
    console.error('Update error:', error);
    alert(error.message || 'Failed to update profile. Please try again.');
  } finally {
    setIsLoading(false);
  }
};
```

---

## Example 2: Update HomePage.jsx to Fetch Articles from API

### Current Code:
```javascript
import { mockArticles } from '../data/mockArticles';

const HomePage = ({ searchQuery = '' }) => {
  const [articles, setArticles] = useState(mockArticles);
  // ...
};
```

### Updated Code:
```javascript
import { useState, useEffect } from 'react';
import { getArticles } from '../services/api';

const HomePage = ({ searchQuery = '' }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedExam, setSelectedExam] = useState('All');

  // Fetch articles when component mounts or filters change
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Call API with filters
        const response = await getArticles({
          category: selectedCategory,
          exam: selectedExam,
          search: searchQuery
        });
        
        // API returns { articles: [], total: number }
        setArticles(response.articles || []);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError(err.message || 'Failed to load articles');
        // Fallback to empty array on error
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [selectedCategory, selectedExam, searchQuery]);

  // Show loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading articles...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-red-400 mb-2">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Rest of your component remains the same...
  // The filteredArticles logic can be removed since API handles filtering
  const filteredArticles = articles; // Or keep client-side filtering as backup

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Your existing JSX */}
    </div>
  );
};
```

---

## Example 3: Update useBookmarks Hook to Use API

### Current Code (src/hooks/useBookmarks.js):
```javascript
import { getBookmarks, saveBookmark, removeBookmark } from '../utils/localStorage';

export const useBookmarks = () => {
  const [bookmarkedIds, setBookmarkedIds] = useState(getBookmarks);

  const addBookmark = (articleId) => {
    if (saveBookmark(articleId)) {
      setBookmarkedIds([...bookmarkedIds, articleId]);
      return true;
    }
    return false;
  };
  // ...
};
```

### Updated Code:
```javascript
import { useState, useEffect } from 'react';
import { 
  getBookmarks as getBookmarksAPI, 
  addBookmark as addBookmarkAPI, 
  removeBookmark as removeBookmarkAPI,
  checkBookmark as checkBookmarkAPI
} from '../services/api';

export const useBookmarks = () => {
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookmarks from API on mount
  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        setLoading(true);
        const bookmarks = await getBookmarksAPI();
        // Extract article IDs from bookmark objects
        const ids = bookmarks.map(bookmark => bookmark.articleId || bookmark.article?._id);
        setBookmarkedIds(ids);
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
        setBookmarkedIds([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  const addBookmark = async (articleId) => {
    try {
      await addBookmarkAPI(articleId);
      setBookmarkedIds([...bookmarkedIds, articleId]);
      return true;
    } catch (error) {
      console.error('Error adding bookmark:', error);
      alert('Failed to add bookmark');
      return false;
    }
  };

  const deleteBookmark = async (articleId) => {
    try {
      // Find bookmark ID from article ID
      const bookmarks = await getBookmarksAPI();
      const bookmark = bookmarks.find(b => 
        (b.articleId || b.article?._id) === articleId
      );
      
      if (bookmark) {
        await removeBookmarkAPI(bookmark._id);
        setBookmarkedIds(bookmarkedIds.filter(id => id !== articleId));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error removing bookmark:', error);
      alert('Failed to remove bookmark');
      return false;
    }
  };

  const checkBookmark = async (articleId) => {
    try {
      return await checkBookmarkAPI(articleId);
    } catch (error) {
      console.error('Error checking bookmark:', error);
      return false;
    }
  };

  return {
    bookmarkedIds,
    addBookmark,
    deleteBookmark,
    checkBookmark,
    loading
  };
};
```

---

## Example 4: Update BookmarksPage.jsx

### Current Code:
```javascript
import { mockArticles } from '../data/mockArticles';
import { useBookmarks } from '../hooks/useBookmarks';

const BookmarksPage = () => {
  const { bookmarkedIds } = useBookmarks();
  
  const bookmarkedArticles = mockArticles.filter(article =>
    bookmarkedIds.includes(article.id)
  );
  // ...
};
```

### Updated Code:
```javascript
import { useState, useEffect } from 'react';
import { getBookmarks } from '../services/api';
import ArticleCard from '../components/ArticleCard';

const BookmarksPage = () => {
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarkedArticles = async () => {
      try {
        setLoading(true);
        const bookmarks = await getBookmarks();
        
        // Extract articles from bookmark objects
        // API returns: [{ _id, article: { ...article data }, userId, createdAt }]
        const articles = bookmarks.map(bookmark => bookmark.article || bookmark);
        setBookmarkedArticles(articles);
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
        setBookmarkedArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkedArticles();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-slate-400">Loading bookmarks...</p>
        </div>
      </div>
    );
  }

  // Rest of component remains the same...
};
```

---

## Example 5: Update NotificationsPage.jsx

### Current Code:
```javascript
import { mockNotifications } from '../data/mockNotifications';

const NotificationsPage = () => {
  const filteredNotifications = useMemo(() => {
    return getNotificationsByExam(selectedExam);
  }, [selectedExam]);
  // ...
};
```

### Updated Code:
```javascript
import { useState, useEffect, useMemo } from 'react';
import { getNotifications } from '../services/api';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExam, setSelectedExam] = useState('All');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const response = await getNotifications({
          exam: selectedExam
        });
        setNotifications(response.notifications || []);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [selectedExam]);

  // Rest of component...
};
```

---

## Example 6: Update CalendarPage.jsx for Custom Events

### Current Code (for custom dates):
```javascript
import { getCustomDates, saveCustomDate, deleteCustomDate } from '../utils/calendarStorage';

const CalendarPage = () => {
  const [customDates, setCustomDates] = useState(getCustomDates());

  const handleAddCustomDate = () => {
    if (saveCustomDate(dateData)) {
      setCustomDates(getCustomDates());
    }
  };
  // ...
};
```

### Updated Code:
```javascript
import { 
  getCalendarEvents, 
  addCalendarEvent, 
  deleteCalendarEvent 
} from '../services/api';

const CalendarPage = () => {
  const [customDates, setCustomDates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await getCalendarEvents({
          year: currentDate.getFullYear(),
          month: currentDate.getMonth()
        });
        // Filter only custom events (type === 'custom')
        const custom = (response.events || []).filter(e => e.type === 'custom');
        setCustomDates(custom);
      } catch (error) {
        console.error('Error fetching calendar events:', error);
        setCustomDates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [currentDate]);

  const handleAddCustomDate = async () => {
    if (selectedDate && newDateLabel.trim()) {
      try {
        const eventData = {
          date: selectedDate.dateString,
          label: newDateLabel.trim(),
          color: newDateColor,
          type: 'custom'
        };
        
        const newEvent = await addCalendarEvent(eventData);
        setCustomDates([...customDates, newEvent]);
        setNewDateLabel('');
        setNewDateColor('slate');
        setShowAddModal(false);
        setSelectedDate(null);
      } catch (error) {
        console.error('Error adding event:', error);
        alert('Failed to add event');
      }
    }
  };

  const handleDeleteCustomDate = async (id) => {
    try {
      await deleteCalendarEvent(id);
      setCustomDates(customDates.filter(d => d._id !== id));
      if (selectedDate) {
        const updatedDates = selectedDate.dates.filter(d => d._id !== id);
        setSelectedDate({ ...selectedDate, dates: updatedDates });
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event');
    }
  };

  // Rest of component...
};
```

---

## Environment Variable Setup

Create `.env` file in your frontend root:

```env
VITE_API_URL=http://localhost:3000/api
```

Then in your `api.js` file:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
```

---

## Testing the Integration

### Step 1: Start Backend
```bash
cd command-post-backend
npm start
# Server should run on http://localhost:3000
```

### Step 2: Start Frontend
```bash
cd command-post
npm run dev
# Frontend should run on http://localhost:5173 (or similar)
```

### Step 3: Test in Browser
1. Open browser console (F12)
2. Try logging in/registering
3. Check Network tab to see API calls
4. Verify data is being sent/received correctly

---

## Common Issues & Fixes

### Issue: CORS Error
**Error**: `Access to fetch at 'http://localhost:3000' from origin 'http://localhost:5173' has been blocked by CORS policy`

**Fix**: Make sure your backend has CORS enabled:
```javascript
// In backend server.js
const cors = require('cors');
app.use(cors()); // Allow all origins (for development)
```

### Issue: 401 Unauthorized
**Error**: `401 Unauthorized` when calling protected routes

**Fix**: Make sure token is being sent:
```javascript
// Check if token exists
console.log(localStorage.getItem('token'));

// Make sure Authorization header is set correctly
headers: {
  'Authorization': `Bearer ${token}`
}
```

### Issue: Network Error
**Error**: `Failed to fetch` or `Network request failed`

**Fix**: 
1. Check if backend is running
2. Check if URL is correct
3. Check if ports match (3000 for backend, 5173 for frontend)

---

## Migration Strategy

**Recommended approach**: Migrate one feature at a time

1. **Week 1**: Setup backend + Authentication
2. **Week 2**: Migrate Articles
3. **Week 3**: Migrate Bookmarks
4. **Week 4**: Migrate Notifications & Calendar

This way, you can test each feature independently and fix issues as you go!
