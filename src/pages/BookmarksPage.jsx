
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

};

export default BookmarksPage;
