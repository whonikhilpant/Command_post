import { Link } from 'react-router-dom';
import { PlusCircle, FileText, Users, BarChart3, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();

  const adminCards = [
    {
      title: 'All Articles',
      description: 'Manage all published articles',
      icon: FileText,
      link: '/admin/articles',
      color: 'bg-blue-500/20 border-blue-500/40'
    },
    {
      title: 'Create Article',
      description: 'Write and publish new articles',
      icon: PlusCircle,
      link: '/admin/articles/create',
      color: 'bg-green-500/20 border-green-500/40'
    },
    {
      title: 'Users',
      description: 'Manage user accounts',
      icon: Users,
      link: '/admin/users',
      color: 'bg-purple-500/20 border-purple-500/40'
    },
    {
      title: 'Analytics',
      description: 'View statistics and insights',
      icon: BarChart3,
      link: '/admin/analytics',
      link: '/admin/analytics',
      color: 'bg-orange-500/20 border-orange-500/40'
    },
    {
      title: 'Post Notification',
      description: 'Send updates to aspirants',
      icon: Bell,
      link: '/admin/notifications/create',
      color: 'bg-red-500/20 border-red-500/40'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-50 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-slate-400">
          Welcome back, {user?.name}! Manage your defence news portal.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminCards.map((card) => (
          <Link
            key={card.title}
            to={card.link}
            className={`card ${card.color} hover:scale-105 transition-transform`}
          >
            <card.icon className="h-12 w-12 text-slate-200 mb-4" />
            <h3 className="text-xl font-semibold text-slate-50 mb-2">
              {card.title}
            </h3>
            <p className="text-slate-300 text-sm">
              {card.description}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-12 card">
        <h2 className="text-xl font-semibold text-slate-50 mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-4">
          <Link to="/admin/articles/create" className="btn-primary">
            <PlusCircle className="h-4 w-4 mr-2 inline" />
            New Article
          </Link>
          <Link to="/admin/articles" className="btn-secondary">
            <FileText className="h-4 w-4 mr-2 inline" />
            Manage Articles
          </Link>
          <Link to="/admin/notifications/create" className="btn-primary">
            <Bell className="h-4 w-4 mr-2 inline" />
            Post Notification
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;