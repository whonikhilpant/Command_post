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