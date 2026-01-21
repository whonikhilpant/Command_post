import { useState, useMemo } from 'react';
import { Bell, Calendar, ExternalLink, CheckCircle, AlertCircle, Info, FileText, Users, Trophy } from 'lucide-react';
import { mockNotifications, getNotificationsByExam } from '../data/mockNotifications';

const NotificationsPage = () => {
  const [selectedExam, setSelectedExam] = useState('All');
  const exams = ['All', 'CDS', 'NDA', 'AFCAT', 'CAPF', 'SSB'];

  const filteredNotifications = useMemo(() => {
    return getNotificationsByExam(selectedExam);
  }, [selectedExam]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getExamColor = (examType) => {
    const colors = {
      'CDS': 'bg-primary-600/20 text-primary-300 border-primary-500/40',
      'NDA': 'bg-blue-600/20 text-blue-300 border-blue-500/40',
      'AFCAT': 'bg-sky-600/20 text-sky-300 border-sky-500/40',
      'CAPF': 'bg-purple-600/20 text-purple-300 border-purple-500/40',
      'SSB': 'bg-orange-600/20 text-orange-300 border-orange-500/40'
    };
    return colors[examType] || 'bg-slate-700/20 text-slate-300 border-slate-600/40';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'exam_notification': FileText,
      'application_open': Calendar,
      'admit_card': FileText,
      'result': Trophy,
      'interview_schedule': Users,
      'guideline_update': Info
    };
    return icons[category] || Bell;
  };

  const getPriorityBadge = (priority) => {
    if (priority === 'high') {
      return (
        <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-red-500/20 text-red-300 border border-red-500/40 uppercase tracking-wide">
          High Priority
        </span>
      );
    }
    return null;
  };

  const unreadCount = mockNotifications.filter(n => !n.isRead).length;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <div className="card mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-primary-600/20 p-3 rounded-lg border border-primary-500/40">
                <Bell className="h-6 w-6 text-primary-300" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-50 mb-1 tracking-wide">
                  Notifications
                </h1>
                <p className="text-sm text-slate-400">
                  Stay updated with latest defence exam announcements
                </p>
              </div>
            </div>
          </div>
          {unreadCount > 0 && (
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary-600/20 border border-primary-500/40 rounded-lg">
              <span className="text-sm text-slate-300">Unread:</span>
              <span className="px-2 py-1 bg-primary-600 text-white text-xs font-bold rounded-full">
                {unreadCount}
              </span>
            </div>
          )}
        </div>

        {/* Exam Filter */}
        <div>
          <h3 className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wide">
            Filter by Exam
          </h3>
          <div className="flex flex-wrap gap-2">
            {exams.map((exam) => (
              <button
                key={exam}
                onClick={() => setSelectedExam(exam)}
                className={`px-4 py-2 rounded-md font-medium text-xs tracking-wide uppercase border ${
                  selectedExam === exam
                    ? 'bg-primary-600 text-white border-primary-500 shadow-sm shadow-primary-900/40'
                    : 'bg-slate-800/70 text-slate-200 border-slate-700 hover:bg-slate-700/80 hover:border-slate-500'
                }`}
              >
                {exam}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => {
            const CategoryIcon = getCategoryIcon(notification.category);
            return (
              <div
                key={notification.id}
                className={`card relative overflow-hidden ${
                  !notification.isRead ? 'border-primary-500/50 bg-primary-500/5' : ''
                }`}
              >
                {/* Unread indicator */}
                {!notification.isRead && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-500" />
                )}

                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`p-3 rounded-lg border ${getExamColor(notification.type)} flex-shrink-0`}>
                    <CategoryIcon className="h-5 w-5" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className={`px-2 py-1 text-[10px] font-semibold rounded-full border uppercase tracking-wide ${getExamColor(notification.type)}`}>
                            {notification.type}
                          </span>
                          {getPriorityBadge(notification.priority)}
                          {notification.category && (
                            <span className="text-xs text-slate-400 capitalize">
                              {notification.category.replace('_', ' ')}
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-slate-50 mb-2">
                          {notification.title}
                        </h3>
                        <p className="text-sm text-slate-300 leading-relaxed mb-3">
                          {notification.message}
                        </p>
                      </div>
                    </div>

                    {/* Important Dates */}
                    <div className="flex flex-wrap gap-4 mb-4 text-xs">
                      {notification.examDate && (
                        <div className="flex items-center gap-2 text-slate-400">
                          <Calendar className="h-4 w-4" />
                          <span>
                            <span className="font-semibold text-slate-300">Exam:</span>{' '}
                            {formatDate(notification.examDate)}
                          </span>
                        </div>
                      )}
                      {notification.lastDateToApply && (
                        <div className="flex items-center gap-2 text-slate-400">
                          <AlertCircle className="h-4 w-4 text-orange-400" />
                          <span>
                            <span className="font-semibold text-orange-300">Last Date:</span>{' '}
                            {formatDate(notification.lastDateToApply)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                      <span className="text-xs text-slate-500">
                        Published: {formatDate(notification.date)}
                      </span>
                      {notification.link && (
                        <a
                          href={notification.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-primary-300 hover:text-primary-200 font-medium uppercase tracking-wide"
                        >
                          View Official Notice
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12">
            <Bell className="h-16 w-16 text-slate-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-300 mb-2">
              No Notifications
            </h2>
            <p className="text-slate-500">
              No notifications found for the selected exam
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;