import axios from 'axios';

// Base URL for your backend API
const API_URL = 'http://localhost:5000/api';

// ============================================
// ARTICLES API
// ============================================

// Get all articles with filters
export const getArticles = async (filters = {}) => {
  try {
    const params = new URLSearchParams();

    // Map 'exam' to 'examTag' for backend
    if (filters.category && filters.category !== 'All') {
      params.append('category', filters.category);
    }
    if (filters.exam && filters.exam !== 'All') {
      params.append('examTag', filters.exam);
    }
    if (filters.search) {
      params.append('search', filters.search);
    }

    const response = await axios.get(`${API_URL}/articles?${params}`);

    // Backend already returns { articles: [...], total: ... }
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

// Get single article by ID
export const getArticleById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/articles/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching article:', error);
    throw error;
  }
};

// Create new article
export const createArticle = async (articleData) => {
  try {
    const response = await axios.post(`${API_URL}/articles`, articleData);
    return response.data;
  } catch (error) {
    console.error('Error creating article:', error);
    throw error;
  }
};

// Update article
export const updateArticle = async (id, articleData) => {
  try {
    const response = await axios.put(`${API_URL}/articles/${id}`, articleData);
    return response.data;
  } catch (error) {
    console.error('Error updating article:', error);
    throw error;
  }
};

// Delete article
export const deleteArticle = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/articles/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting article:', error);
    throw error;
  }
};

// ============================================
// BOOKMARKS API (Backend)
// ============================================

// Get all bookmarks (requires authentication)
export const getBookmarks = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/bookmarks');
    return response.data.data; // Returns array of article objects
  } catch (error) {
    console.error('Error getting bookmarks:', error);
    // If not authenticated, return empty array
    if (error.response?.status === 401) {
      return [];
    }
    throw error;
  }
};

// Add bookmark (requires authentication)
export const addBookmark = async (articleId) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/bookmarks/${articleId}`);
    return response.data;
  } catch (error) {
    console.error('Error adding bookmark:', error);
    throw error;
  }
};

// Remove bookmark (requires authentication)
export const removeBookmark = async (articleId) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/bookmarks/${articleId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing bookmark:', error);
    throw error;
  }
};

// Check if article is bookmarked (requires authentication)
export const checkBookmark = async (articleId) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/bookmarks/check/${articleId}`);
    return response.data.data.isBookmarked;
  } catch (error) {
    // If not authenticated, return false
    if (error.response?.status === 401) {
      return false;
    }
    console.error('Error checking bookmark:', error);
    return false;
  }
};

// ============================================
// CALENDAR API
// ============================================
// Get all custom calendar events
export const getCalendarEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/calendar`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    // If not authenticated, return empty array
    if (error.response?.status === 401) {
      return [];
    }
    throw error;
  }
};
// Create custom calendar event
export const createCalendarEvent = async (eventData) => {
  try {
    const response = await axios.post(`${API_URL}/calendar`, eventData);
    return response.data;
  } catch (error) {
    console.error('Error creating calendar event:', error);
    throw error;
  }
};
// Delete custom calendar event
export const deleteCalendarEvent = async (eventId) => {
  try {
    const response = await axios.delete(`${API_URL}/calendar/${eventId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting calendar event:', error);
    throw error;
  }
};

// ============================================
// NOTIFICATIONS API
// ============================================

// Get notifications
export const getNotifications = async (filters = {}) => {
  try {
    const params = new URLSearchParams();

    if (filters.type && filters.type !== 'All') {
      params.append('type', filters.type);
    }

    // Support both 'category' and 'exam' for backward compatibility or clarity if needed, 
    // but backend uses 'type' for exam type (CDS, NDA, etc.) and 'category' for notif category.
    // The previous frontend code used 'getNotificationsByExam(selectedExam)'. 
    // selectedExam matches 'type' in backend.

    const response = await axios.get(`${API_URL}/notifications?${params}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

// Create notification (optional)
export const createNotification = async (notificationData) => {
  try {
    const response = await axios.post(`${API_URL}/notifications`, notificationData);
    return response.data;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
};


// ============================================
// ANALYTICS API
// ============================================

// Get analytics stats (Admin only)
export const getAnalyticsStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/analytics`);
    return response.data;
  } catch (error) {
    console.error('Error fetching analytics:', error);
    throw error;
  }
};

// ============================================
// USER/AUTH API
// ============================================

// Get all users (Admin only)
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Login user (placeholder)
export const loginUser = async (credentials) => {
  // TODO: Implement when you add authentication backend
  console.log('Login functionality coming soon!');
  throw new Error('Authentication not yet implemented');
};

// Register user (placeholder)
export const registerUser = async (userData) => {
  // TODO: Implement when you add authentication backend
  console.log('Registration functionality coming soon!');
  throw new Error('Authentication not yet implemented');
};

// Update user profile (placeholder)
export const updateUserProfile = async (profileData) => {
  // TODO: Implement when you add authentication backend
  console.log('Profile update functionality coming soon!');
  throw new Error('Profile update not yet implemented');
};