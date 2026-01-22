import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getBookmarks } from '../services/api';
import ArticleCard from '../components/ArticleCard';

const BookmarksPage = () => {
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookmarks();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      setError(null);
      const articles = await getBookmarks();
      setBookmarkedArticles(articles);
    } catch (err) {
      console.error('Error fetching bookmarks:', err);
      setError(err.message || 'Failed to load bookmarks');
    } finally {
      setLoading(false);
    }
  };

  // Not logged in
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-8">
            <AlertCircle className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-50 mb-2">
              Login Required
            </h2>
            <p className="text-slate-400 mb-6">
              Please login to view your bookmarked articles
            </p>
            <Link to="/login" className="btn-primary inline-block">
              Login Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading bookmarks...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <p className="text-red-300 mb-4">{error}</p>
          <button onClick={fetchBookmarks} className="btn-primary">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Bookmark className="h-8 w-8 text-primary-400" />
          <h1 className="text-3xl font-bold text-slate-50">
            My Bookmarks
          </h1>
        </div>
        <p className="text-slate-400">
          {bookmarkedArticles.length} {bookmarkedArticles.length === 1 ? 'article' : 'articles'} saved
        </p>
      </div>

      {bookmarkedArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedArticles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Bookmark className="h-16 w-16 text-slate-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-300 mb-2">
            No bookmarks yet
          </h2>
          <p className="text-slate-400 mb-6">
            Start bookmarking articles to read them later
          </p>
          <Link to="/" className="btn-primary">
            Browse Articles
          </Link>
        </div>
      )}
    </div>
  );
};

export default BookmarksPage;