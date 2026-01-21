import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, ArrowLeft, Bookmark, BookmarkCheck, AlertCircle } from 'lucide-react';
import { mockArticles } from '../data/mockArticles';
import { useBookmarks } from '../hooks/useBookmarks';
const ArticleDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { checkBookmark, addBookmark, deleteBookmark } = useBookmarks();
  
  const article = mockArticles.find(a => a.id === parseInt(id));
  const isBookmarked = checkBookmark(article?.id);

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Article Not Found
        </h1>
        <Link to="/" className="text-primary-600 dark:text-primary-400 hover:underline">
          Go back to homepage
        </Link>
      </div>
    );
  }

  const handleBookmarkClick = () => {
    if (isBookmarked) {
      deleteBookmark(article.id);
    } else {
      addBookmark(article.id);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Army': 'bg-gray-700 text-white',
      'Navy': 'bg-blue-700 text-white',
      'Air Force': 'bg-sky-600 text-white',
      'Joint Forces': 'bg-purple-700 text-white'
    };
    return colors[category] || 'bg-gray-600 text-white';
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back</span>
      </button>

      {/* Article Header */}
      <article className="card">
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-wrap gap-2">
            <span className={`badge ${getCategoryColor(article.category)}`}>
              {article.category}
            </span>
            {article.examTags.map((tag) => (
              <span 
                key={tag} 
                className="badge bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
              >
                {tag}
              </span>
            ))}
          </div>
          <button
            onClick={handleBookmarkClick}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
          >
            {isBookmarked ? (
              <BookmarkCheck className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            ) : (
              <Bookmark className="h-6 w-6 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400" />
            )}
          </button>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {article.title}
        </h1>

        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(article.date)}</span>
          </div>
        </div>

        {/* Article Image */}
        {article.image && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
          <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
            {article.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Important Points */}
        {article.importantPoints && article.importantPoints.length > 0 && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mr-2" />
              Key Points to Remember
            </h2>
            <ul className="space-y-2">
              {article.importantPoints.map((point, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300 flex items-start">
                  <span className="text-yellow-600 dark:text-yellow-400 mr-2 font-bold">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Exam Importance Section */}
        {article.examImportance && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Why This is Important for Exams
            </h2>
            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
              {article.examImportance}
            </div>
          </div>
        )}
      </article>

      {/* Navigation to other articles */}
      <div className="mt-8 flex justify-between">
        <Link
          to="/"
          className="btn-secondary"
        >
          Back to Home
        </Link>
        {article.id < mockArticles.length && (
          <Link
            to={`/article/${article.id + 1}`}
            className="btn-primary"
          >
            Next Article →
          </Link>
        )}
      </div>
    </div>
  );
};

export default ArticleDetailPage;
