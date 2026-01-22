import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  getBookmarks as getBookmarksAPI,
  addBookmark as addBookmarkAPI,
  removeBookmark as removeBookmarkAPI,
  checkBookmark as checkBookmarkAPI
} from '../services/api';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  // Load bookmarks when user logs in
  useEffect(() => {
    if (isAuthenticated) {
      loadBookmarks();
    } else {
      setBookmarks([]);
    }
  }, [isAuthenticated]);

  const loadBookmarks = async () => {
    try {
      setLoading(true);
      const data = await getBookmarksAPI();
      // Extract article IDs from populated articles
      const bookmarkIds = data.map(article => article._id);
      setBookmarks(bookmarkIds);
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    } finally {
      setLoading(false);
    }
  };

  const addBookmark = async (articleId) => {
    if (!isAuthenticated) {
      alert('Please login to bookmark articles');
      return;
    }

    try {
      await addBookmarkAPI(articleId);
      setBookmarks(prev => [...prev, articleId]);
    } catch (error) {
      console.error('Error adding bookmark:', error);
      alert(error.response?.data?.message || 'Failed to add bookmark');
    }
  };

  const deleteBookmark = async (articleId) => {
    if (!isAuthenticated) {
      return;
    }

    try {
      await removeBookmarkAPI(articleId);
      setBookmarks(prev => prev.filter(id => id !== articleId));
    } catch (error) {
      console.error('Error removing bookmark:', error);
      alert(error.response?.data?.message || 'Failed to remove bookmark');
    }
  };

  const checkBookmark = (articleId) => {
    return bookmarks.includes(articleId);
  };

  return {
    bookmarks,
    loading,
    addBookmark,
    deleteBookmark,
    checkBookmark,
    loadBookmarks
  };
};