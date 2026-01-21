import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import ArticleCard from '../components/ArticleCard';
import CategoryFilter from '../components/CategoryFilter';
import ExamFilter from '../components/ExamFilter';
import { getArticles } from '../services/api';

const HomePage = ({ searchQuery = '' }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedExam, setSelectedExam] = useState('All');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const categories = ['All', 'Army', 'Navy', 'Air Force', 'Joint Forces'];
  const exams = ['All', 'CDS', 'NDA', 'AFCAT', 'CAPF', 'SSB'];

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

  // Handle refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      setError(null);
      const response = await getArticles({
        category: selectedCategory,
        exam: selectedExam,
        search: searchQuery
      });
      setArticles(response.articles || []);
    } catch (err) {
      console.error('Error refreshing articles:', err);
      setError(err.message || 'Failed to refresh articles');
    } finally {
      setIsRefreshing(false);
    }
  };

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

  // Filter articles (client-side backup filtering)
  const filteredArticles = articles;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filters Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-slate-50">
            Latest Articles
          </h2>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600/20 hover:bg-primary-600/30 border border-primary-500/40 hover:border-primary-500/60 rounded-md text-primary-300 font-medium text-xs uppercase tracking-wide transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Refresh articles"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>
        
        <div className="mb-6 flex flex-col md:flex-row md:items-end gap-6">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-slate-300 mb-3">
              Filter by Category
            </h3>
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          <div className="flex-1">
            <h3 className="text-sm font-semibold text-slate-300 mb-3">
              Filter by Exam
            </h3>
            <ExamFilter
              exams={exams}
              selectedExam={selectedExam}
              onExamChange={setSelectedExam}
            />
          </div>
        </div>

        {searchQuery && (
          <div className="mb-4 p-3 bg-primary-900/20 border border-primary-500/40 rounded-lg">
            <p className="text-sm text-slate-300">
              Showing results for: <span className="font-semibold">"{searchQuery}"</span>
            </p>
          </div>
        )}
      </div>

      {/* Articles Grid */}
      {filteredArticles && filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id || article._id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg mb-2">
            No articles found
          </p>
          <p className="text-slate-500 text-sm">
            Try adjusting your filters or search query
          </p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
