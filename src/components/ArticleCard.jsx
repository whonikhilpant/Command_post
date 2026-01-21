import { Link } from 'react-router-dom';
import { Calendar, BookOpen, Bookmark, BookmarkCheck } from 'lucide-react';
import { useBookmarks } from '../hooks/useBookmarks';

const ArticleCard = ({ article }) => {
  const { checkBookmark, addBookmark, deleteBookmark } = useBookmarks();
  const isBookmarked = checkBookmark(article.id);

  const handleBookmarkClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
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
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Army': 'bg-defence-army text-slate-100',
      'Navy': 'bg-defence-navy text-slate-100',
      'Air Force': 'bg-defence-airforce text-slate-100',
      'Joint Forces': 'bg-defence-joint text-slate-100'
    };
    return colors[category] || 'bg-slate-700 text-slate-100';
  };

  return (
    <Link to={`/article/${article.id}`}>
      <article className="card hover:scale-[1.01] transition-transform duration-200 group relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/5 via-transparent to-primary-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
        <div className="flex justify-between items-start mb-3 relative z-10">
          <div className="flex flex-wrap gap-2">
            <span className={`badge ${getCategoryColor(article.category)}`}>
              {article.category}
            </span>
            {article.examTags.slice(0, 2).map((tag) => (
              <span 
                key={tag} 
                className="badge bg-primary-500/10 text-primary-200 border border-primary-500/40"
              >
                {tag}
              </span>
            ))}
            {article.examTags.length > 2 && (
              <span className="badge bg-slate-800 text-slate-300 border border-slate-600">
                +{article.examTags.length - 2}
              </span>
            )}
          </div>
          <button
            onClick={handleBookmarkClick}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
          >
            {isBookmarked ? (
              <BookmarkCheck className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            ) : (
              <Bookmark className="h-5 w-5 text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
            )}
          </button>
        </div>

        <h2 className="text-xl font-semibold text-slate-50 mb-3 group-hover:text-primary-300 transition-colors line-clamp-2 tracking-wide">
          {article.title}
        </h2>

        <p className="text-sm text-slate-300/90 mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between text-xs text-slate-400 mt-1 relative z-10">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(article.date)}</span>
          </div>
          <div className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 font-medium">
            <BookOpen className="h-4 w-4" />
            <span>Read more</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ArticleCard;
