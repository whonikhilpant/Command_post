import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, ArrowLeft, Save, AlertCircle } from 'lucide-react';
import { createNotification } from '../../services/api';

const CreateNotification = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        message: '',
        type: 'All', // Default to All
        category: 'exam_notification',
        priority: 'medium',
        examDate: '',
        lastDateToApply: '',
        link: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await createNotification(formData);
            navigate('/notifications'); // Redirect to notifications page or admin dashboard
        } catch (err) {
            setError(err.message || 'Failed to create notification');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <button
                onClick={() => navigate('/admin')}
                className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
            </button>

            <div className="card">
                <div className="flex items-center gap-4 mb-8">
                    <div className="bg-primary-600/20 p-3 rounded-lg border border-primary-500/40">
                        <Bell className="h-6 w-6 text-primary-300" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-50">Post Notification</h1>
                        <p className="text-sm text-slate-400">Create a new update for aspirants</p>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg flex items-center gap-3">
                        <AlertCircle className="h-5 w-5 flex-shrink-0" />
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Notification Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="e.g., CDS I 2024 Notification Released"
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-primary-500 transition-colors"
                        />
                    </div>

                    {/* Type & Priority */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Exam Type
                            </label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-primary-500 transition-colors"
                            >
                                <option value="All">All Exams</option>
                                <option value="CDS">CDS</option>
                                <option value="NDA">NDA</option>
                                <option value="AFCAT">AFCAT</option>
                                <option value="CAPF">CAPF</option>
                                <option value="SSB">SSB</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Priority
                            </label>
                            <select
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-primary-500 transition-colors"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Category
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-primary-500 transition-colors"
                        >
                            <option value="exam_notification">Exam Notification</option>
                            <option value="application_open">Application Open</option>
                            <option value="admit_card">Admit Card</option>
                            <option value="result">Result</option>
                            <option value="interview_schedule">Interview Schedule</option>
                            <option value="guideline_update">Guideline Update</option>
                        </select>
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Message/Description
                        </label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows="4"
                            placeholder="Enter brief details about the notification..."
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                        />
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Exam Date <span className="text-slate-500 font-normal">(Optional)</span>
                            </label>
                            <input
                                type="date"
                                name="examDate"
                                value={formData.examDate}
                                onChange={handleChange}
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-primary-500 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Last Date to Apply <span className="text-slate-500 font-normal">(Optional)</span>
                            </label>
                            <input
                                type="date"
                                name="lastDateToApply"
                                value={formData.lastDateToApply}
                                onChange={handleChange}
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-primary-500 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Link */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Official Link <span className="text-slate-500 font-normal">(Optional)</span>
                        </label>
                        <input
                            type="url"
                            name="link"
                            value={formData.link}
                            onChange={handleChange}
                            placeholder="e.g., https://upsc.gov.in"
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-primary-500 transition-colors"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Publishing...
                                </>
                            ) : (
                                <>
                                    <Save className="h-5 w-5" />
                                    Publish Notification
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateNotification;
