import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, AlertCircle, CheckCircle } from 'lucide-react';
import { getArticleById, updateArticle } from '../../services/api';
const EditArticle = () => {
    const { id } = useParams(); // Get article ID from URL
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: 'Army',
        examTags: [],
        date: new Date().toISOString().split('T')[0],
        image: '',
        importantPoints: ['', '', ''],
        examImportance: ''
    });
    const categories = ['Army', 'Navy', 'Air Force', 'Joint Forces'];
    const exams = ['CDS', 'NDA', 'AFCAT', 'CAPF', 'SSB'];
    // Fetch article data when component loads
    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const article = await getArticleById(id);
                setFormData({
                    title: article.title || '',
                    excerpt: article.excerpt || '',
                    content: article.content || '',
                    category: article.category || 'Army',
                    examTags: article.examTags || [],
                    date: article.date || new Date().toISOString().split('T')[0],
                    image: article.image || '',
                    importantPoints: article.importantPoints?.length > 0 ? article.importantPoints : ['', '', ''],
                    examImportance: article.examImportance || ''
                });
            } catch (err) {
                setError('Failed to load article');
                console.error('Error fetching article:', err);
            } finally {
                setFetchLoading(false);
            }
        };
        fetchArticle();
    }, [id]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const toggleExam = (exam) => {
        setFormData(prev => ({
            ...prev,
            examTags: prev.examTags.includes(exam)
                ? prev.examTags.filter(e => e !== exam)
                : [...prev.examTags, exam]
        }));
    };
    const handlePointChange = (index, value) => {
        const newPoints = [...formData.importantPoints];
        newPoints[index] = value;
        setFormData(prev => ({
            ...prev,
            importantPoints: newPoints
        }));
    };
    const addPoint = () => {
        setFormData(prev => ({
            ...prev,
            importantPoints: [...prev.importantPoints, '']
        }));
    };
    const removePoint = (index) => {
        setFormData(prev => ({
            ...prev,
            importantPoints: prev.importantPoints.filter((_, i) => i !== index)
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        setLoading(true);
        try {
            // Filter out empty important points
            const cleanedData = {
                ...formData,
                importantPoints: formData.importantPoints.filter(p => p.trim() !== '')
            };
            const response = await updateArticle(id, cleanedData);
            if (response.success) {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/admin/articles');
                }, 2000);
            } else {
                setError(response.message || 'Failed to update article');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update article');
        } finally {
            setLoading(false);
        }
    };
    if (fetchLoading) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="text-center text-slate-400">Loading article...</div>
            </div>
        );
    }
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Header */}
            <div className="mb-8">
                <Link
                    to="/admin/articles"
                    className="inline-flex items-center text-slate-400 hover:text-slate-200 mb-4 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Articles
                </Link>
                <h1 className="text-3xl font-bold text-slate-50">Edit Article</h1>
                <p className="text-slate-400 mt-2">Update the article details</p>
            </div>
            {/* Success Message */}
            {success && (
                <div className="mb-6 p-4 bg-green-900/20 border border-green-500 rounded-lg flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-green-300 font-medium">Article updated successfully!</p>
                        <p className="text-green-400 text-sm">Redirecting to articles list...</p>
                    </div>
                </div>
            )}
            {/* Error Message */}
            {error && (
                <div className="mb-6 p-4 bg-red-900/20 border border-red-500 rounded-lg flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-red-300 text-sm">{error}</span>
                </div>
            )}
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info Card */}
                <div className="card">
                    <h2 className="text-xl font-semibold text-slate-50 mb-4">Basic Information</h2>
                    {/* Title */}
                    <div className="mb-4">
                        <label className="block text-slate-300 text-sm font-medium mb-2">
                            Article Title *
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-primary-500 transition-colors"
                            placeholder="e.g., Indian Army's New Tactical Communication System"
                            required
                        />
                    </div>
                    {/* Excerpt */}
                    <div className="mb-4">
                        <label className="block text-slate-300 text-sm font-medium mb-2">
                            Excerpt (Short Description) *
                        </label>
                        <textarea
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleChange}
                            rows="3"
                            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                            placeholder="Brief summary of the article..."
                            required
                        />
                    </div>
                    {/* Category and Date */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-2">
                                Category *
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-primary-500 transition-colors"
                                required
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-2">
                                Date *
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-primary-500 transition-colors"
                                required
                            />
                        </div>
                    </div>
                    {/* Image URL */}
                    <div className="mb-4">
                        <label className="block text-slate-300 text-sm font-medium mb-2">
                            Image URL
                        </label>
                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-primary-500 transition-colors"
                            placeholder="https://example.com/image.jpg"
                        />
                        <p className="text-slate-500 text-xs mt-1">Leave empty for default image</p>
                    </div>
                    {/* Exam Tags */}
                    <div>
                        <label className="block text-slate-300 text-sm font-medium mb-3">
                            Relevant Exams
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {exams.map(exam => (
                                <button
                                    key={exam}
                                    type="button"
                                    onClick={() => toggleExam(exam)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${formData.examTags.includes(exam)
                                        ? 'bg-primary-600 text-white border border-primary-500'
                                        : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-primary-500'
                                        }`}
                                >
                                    {exam}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Content Card */}
                <div className="card">
                    <h2 className="text-xl font-semibold text-slate-50 mb-4">Article Content</h2>
                    <div>
                        <label className="block text-slate-300 text-sm font-medium mb-2">
                            Main Content *
                        </label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            rows="15"
                            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-primary-500 transition-colors resize-none font-mono text-sm"
                            placeholder="Write the full article content here... Use line breaks for paragraphs."
                            required
                        />
                        <p className="text-slate-500 text-xs mt-1">Use double line breaks for new paragraphs</p>
                    </div>
                </div>
                {/* Important Points Card */}
                <div className="card">
                    <h2 className="text-xl font-semibold text-slate-50 mb-4">Important Points</h2>
                    <div className="space-y-3">
                        {formData.importantPoints.map((point, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="text"
                                    value={point}
                                    onChange={(e) => handlePointChange(index, e.target.value)}
                                    className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-primary-500 transition-colors"
                                    placeholder={`Point ${index + 1}`}
                                />
                                {formData.importantPoints.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removePoint(index)}
                                        className="px-3 py-2 bg-red-900/20 border border-red-500/40 text-red-300 rounded-lg hover:bg-red-900/30 transition-colors"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={addPoint}
                        className="mt-4 btn-secondary"
                    >
                        + Add Another Point
                    </button>
                </div>
                {/* Exam Importance Card */}
                <div className="card">
                    <h2 className="text-xl font-semibold text-slate-50 mb-4">Exam Importance</h2>
                    <div>
                        <label className="block text-slate-300 text-sm font-medium mb-2">
                            Why is this important for exams?
                        </label>
                        <textarea
                            name="examImportance"
                            value={formData.examImportance}
                            onChange={handleChange}
                            rows="5"
                            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                            placeholder="Explain the relevance of this article for defence exams..."
                        />
                    </div>
                </div>
                {/* Submit Buttons */}
                <div className="flex justify-end space-x-4">
                    <Link
                        to="/admin/articles"
                        className="btn-secondary"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Save className="h-4 w-4 mr-2 inline" />
                        {loading ? 'Updating...' : 'Update Article'}
                    </button>
                </div>
            </form>
        </div>
    );
};
export default EditArticle;