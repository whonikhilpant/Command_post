import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Eye, PlusCircle, AlertCircle } from 'lucide-react';
import { getArticles, deleteArticle } from '../../services/api';


const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await getArticles({});
      setArticles(response.articles);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      await deleteArticle(id);
      setArticles(articles.filter(a => a._id !== id));
      alert('Article deleted successfully!');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete article');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
        <p className="text-slate-400">Loading articles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
        <p className="text-red-300">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-50 mb-2">
            Manage Articles
          </h1>
          <p className="text-slate-400">
            {articles.length} total articles
          </p>
        </div>
        <Link to="/admin/articles/create" className="btn-primary">
          <PlusCircle className="h-4 w-4 mr-2 inline" />
          Create New
        </Link>
      </div>

      <div className="space-y-4">
        {articles.map((article) => (
          <div key={article._id} className="card flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-50 mb-1">
                {article.title}
              </h3>
              <div className="flex items-center space-x-4 text-sm text-slate-400">
                <span className="badge bg-slate-700">{article.category}</span>
                <span>{article.date}</span>
                <span>{article.examTags?.join(', ')}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Link
                to={`/article/${article._id}`}
                className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-blue-400 transition-colors"
                title="View"
              >
                <Eye className="h-5 w-5" />
              </Link>
              <Link
                to={`/admin/articles/edit/${article._id}`}
                className="text-blue-400 hover:text-blue-300 transition-colors"
                title="Edit article"
              >
                <Edit className="h-4 w-4" />
              </Link>

              <button
                onClick={() => handleDelete(article._id, article.title)}
                className="p-2 rounded-lg hover:bg-red-900/20 text-slate-400 hover:text-red-400 transition-colors"
                title="Delete"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlesList;