/**
 * API Service Layer
 * 
 * This file contains all API calls to your backend.
 * Replace the example URLs with your actual backend URL.
 * 
 * TO USE THIS FILE:
 * 1. Rename this file from api.js.example to api.js
 * 2. Update API_BASE_URL with your backend URL
 * 3. Import and use these functions in your components
 */

const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Helper function to make API calls
 * Handles authentication, errors, and JSON parsing
 */
const apiCall = async (endpoint, options = {}) => {
  // Get authentication token from localStorage
  const token = localStorage.getItem('token');
  
  // Default headers
  const headers = {
    'Content-Type': 'application/json',
  };

  // Add authorization header if token exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Merge custom headers with defaults
  const config = {
    headers: {
      ...headers,
      ...(options.headers || {})
    },
    ...options
  };

  // Remove headers from options to avoid duplication
  delete config.headers.headers;

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    // Parse JSON response
    const data = await response.json();
    
    // Check if response is ok (status 200-299)
    if (!response.ok) {
      throw new Error(data.message || `API request failed: ${response.statusText}`);
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// ============================================
// AUTHENTICATION API CALLS
// ============================================

/**
 * Register a new user
 * @param {Object} userData - { name, email, password, phone, examPreparing, targetYear }
 * @returns {Promise<Object>} - { user, token }
 */
export const registerUser = async (userData) => {
  return apiCall('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  });
};

/**
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} - { user, token }
 */
export const loginUser = async (email, password) => {
  const response = await apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  
  // Store token in localStorage
  if (response.token) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
  }
  
  return response;
};

/**
 * Logout user
 * Removes token from localStorage
 */
export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

/**
 * Get current user profile
 * @returns {Promise<Object>} - User object
 */
export const getCurrentUser = async () => {
  return apiCall('/auth/me');
};

/**
 * Update user profile
 * @param {Object} userData - Updated user data
 * @returns {Promise<Object>} - Updated user object
 */
export const updateUserProfile = async (userData) => {
  return apiCall('/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(userData)
  });
};

// ============================================
// ARTICLES API CALLS
// ============================================

/**
 * Get all articles
 * @param {Object} filters - { category, exam, search, page, limit }
 * @returns {Promise<Object>} - { articles: [], total: number, page: number }
 */
export const getArticles = async (filters = {}) => {
  // Build query string from filters
  const queryParams = new URLSearchParams();
  
  if (filters.category && filters.category !== 'All') {
    queryParams.append('category', filters.category);
  }
  
  if (filters.exam && filters.exam !== 'All') {
    queryParams.append('exam', filters.exam);
  }
  
  if (filters.search) {
    queryParams.append('search', filters.search);
  }
  
  if (filters.page) {
    queryParams.append('page', filters.page);
  }
  
  if (filters.limit) {
    queryParams.append('limit', filters.limit);
  }
  
  const queryString = queryParams.toString();
  const endpoint = queryString ? `/articles?${queryString}` : '/articles';
  
  return apiCall(endpoint);
};

/**
 * Get single article by ID
 * @param {string|number} articleId - Article ID
 * @returns {Promise<Object>} - Article object
 */
export const getArticle = async (articleId) => {
  return apiCall(`/articles/${articleId}`);
};

/**
 * Search articles
 * @param {string} query - Search query
 * @returns {Promise<Object>} - { articles: [] }
 */
export const searchArticles = async (query) => {
  return apiCall(`/articles/search?q=${encodeURIComponent(query)}`);
};

// ============================================
// BOOKMARKS API CALLS
// ============================================

/**
 * Get user's bookmarks
 * @returns {Promise<Object>} - { bookmarks: [] }
 */
export const getBookmarks = async () => {
  const response = await apiCall('/bookmarks');
  return response.bookmarks || [];
};

/**
 * Add bookmark
 * @param {string|number} articleId - Article ID to bookmark
 * @returns {Promise<Object>} - { bookmark: {}, message: string }
 */
export const addBookmark = async (articleId) => {
  return apiCall('/bookmarks', {
    method: 'POST',
    body: JSON.stringify({ articleId })
  });
};

/**
 * Remove bookmark
 * @param {string|number} bookmarkId - Bookmark ID to remove
 * @returns {Promise<Object>} - { message: string }
 */
export const removeBookmark = async (bookmarkId) => {
  return apiCall(`/bookmarks/${bookmarkId}`, {
    method: 'DELETE'
  });
};

/**
 * Check if article is bookmarked
 * @param {string|number} articleId - Article ID to check
 * @returns {Promise<boolean>} - true if bookmarked
 */
export const checkBookmark = async (articleId) => {
  try {
    const response = await apiCall(`/bookmarks/check/${articleId}`);
    return response.isBookmarked || false;
  } catch (error) {
    return false;
  }
};

// ============================================
// NOTIFICATIONS API CALLS
// ============================================

/**
 * Get user's notifications
 * @param {Object} filters - { exam, isRead }
 * @returns {Promise<Object>} - { notifications: [] }
 */
export const getNotifications = async (filters = {}) => {
  const queryParams = new URLSearchParams();
  
  if (filters.exam && filters.exam !== 'All') {
    queryParams.append('exam', filters.exam);
  }
  
  if (filters.isRead !== undefined) {
    queryParams.append('isRead', filters.isRead);
  }
  
  const queryString = queryParams.toString();
  const endpoint = queryString ? `/notifications?${queryString}` : '/notifications';
  
  return apiCall(endpoint);
};

/**
 * Mark notification as read
 * @param {string|number} notificationId - Notification ID
 * @returns {Promise<Object>} - Updated notification
 */
export const markNotificationAsRead = async (notificationId) => {
  return apiCall(`/notifications/${notificationId}/read`, {
    method: 'PUT'
  });
};

/**
 * Get unread notification count
 * @returns {Promise<number>} - Count of unread notifications
 */
export const getUnreadCount = async () => {
  const response = await apiCall('/notifications/unread-count');
  return response.count || 0;
};

// ============================================
// CALENDAR API CALLS
// ============================================

/**
 * Get user's calendar events
 * @param {Object} filters - { year, month }
 * @returns {Promise<Object>} - { events: [] }
 */
export const getCalendarEvents = async (filters = {}) => {
  const queryParams = new URLSearchParams();
  
  if (filters.year) {
    queryParams.append('year', filters.year);
  }
  
  if (filters.month !== undefined) {
    queryParams.append('month', filters.month);
  }
  
  const queryString = queryParams.toString();
  const endpoint = queryString ? `/calendar/events?${queryString}` : '/calendar/events';
  
  return apiCall(endpoint);
};

/**
 * Add custom calendar event
 * @param {Object} eventData - { date, label, color }
 * @returns {Promise<Object>} - Created event
 */
export const addCalendarEvent = async (eventData) => {
  return apiCall('/calendar/events', {
    method: 'POST',
    body: JSON.stringify(eventData)
  });
};

/**
 * Update calendar event
 * @param {string|number} eventId - Event ID
 * @param {Object} eventData - Updated event data
 * @returns {Promise<Object>} - Updated event
 */
export const updateCalendarEvent = async (eventId, eventData) => {
  return apiCall(`/calendar/events/${eventId}`, {
    method: 'PUT',
    body: JSON.stringify(eventData)
  });
};

/**
 * Delete calendar event
 * @param {string|number} eventId - Event ID
 * @returns {Promise<Object>} - { message: string }
 */
export const deleteCalendarEvent = async (eventId) => {
  return apiCall(`/calendar/events/${eventId}`, {
    method: 'DELETE'
  });
};

// ============================================
// EXPORT ALL FUNCTIONS
// ============================================

export default {
  // Auth
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateUserProfile,
  
  // Articles
  getArticles,
  getArticle,
  searchArticles,
  
  // Bookmarks
  getBookmarks,
  addBookmark,
  removeBookmark,
  checkBookmark,
  
  // Notifications
  getNotifications,
  markNotificationAsRead,
  getUnreadCount,
  
  // Calendar
  getCalendarEvents,
  addCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent
};
