import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    BarChart3,
    Users,
    FileText,
    Bell,
    TrendingUp,
    PieChart
} from 'lucide-react';
import { getAnalyticsStats } from '../../services/api';

const AnalyticsDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await getAnalyticsStats();
            if (response.success) {
                setStats(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    // Calculate max values for bar charts to determine width percentages
    const getMaxCount = (data) => {
        if (!data || data.length === 0) return 0;
        return Math.max(...data.map(item => item.count));
    };

    const articleMax = getMaxCount(stats?.breakdowns?.articlesByCategory);
    const notificationMax = getMaxCount(stats?.breakdowns?.notificationsByType);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-50 mb-2">Analytics</h1>
                    <p className="text-slate-400">Overview of your platform's performance</p>
                </div>
                <Link to="/admin" className="btn-secondary">
                    Back to Dashboard
                </Link>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-gradient-to-br from-blue-600/20 to-blue-900/20 p-6 rounded-xl border border-blue-500/30">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-500/20 rounded-lg">
                            <Users className="h-6 w-6 text-blue-400" />
                        </div>
                        <span className="text-xs font-semibold bg-blue-500/20 text-blue-300 px-2 py-1 rounded">Total Users</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-1">{stats?.counts?.users || 0}</h3>
                    <p className="text-blue-200/60 text-sm">Registered aspirants</p>
                </div>

                <div className="bg-gradient-to-br from-green-600/20 to-green-900/20 p-6 rounded-xl border border-green-500/30">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-green-500/20 rounded-lg">
                            <FileText className="h-6 w-6 text-green-400" />
                        </div>
                        <span className="text-xs font-semibold bg-green-500/20 text-green-300 px-2 py-1 rounded">Total Articles</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-1">{stats?.counts?.articles || 0}</h3>
                    <p className="text-green-200/60 text-sm">Published content</p>
                </div>

                <div className="bg-gradient-to-br from-red-600/20 to-red-900/20 p-6 rounded-xl border border-red-500/30">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-red-500/20 rounded-lg">
                            <Bell className="h-6 w-6 text-red-400" />
                        </div>
                        <span className="text-xs font-semibold bg-red-500/20 text-red-300 px-2 py-1 rounded">Notifications</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-1">{stats?.counts?.notifications || 0}</h3>
                    <p className="text-red-200/60 text-sm">Alerts sent</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Articles by Category Chart */}
                <div className="card">
                    <div className="flex items-center gap-2 mb-6">
                        <PieChart className="h-5 w-5 text-purple-400" />
                        <h3 className="text-lg font-semibold text-slate-50">Articles by Category</h3>
                    </div>

                    <div className="space-y-4">
                        {stats?.breakdowns?.articlesByCategory.map((item) => (
                            <div key={item._id} className="relative">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-slate-300">{item._id}</span>
                                    <span className="text-slate-400">{item.count}</span>
                                </div>
                                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                        style={{ width: `${(item.count / articleMax) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Notifications by Type Chart */}
                <div className="card">
                    <div className="flex items-center gap-2 mb-6">
                        <TrendingUp className="h-5 w-5 text-orange-400" />
                        <h3 className="text-lg font-semibold text-slate-50">Notifications by Type</h3>
                    </div>

                    <div className="space-y-4">
                        {stats?.breakdowns?.notificationsByType.map((item) => (
                            <div key={item._id} className="relative">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-slate-300">{item._id}</span>
                                    <span className="text-slate-400">{item.count}</span>
                                </div>
                                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full"
                                        style={{ width: `${(item.count / notificationMax) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
