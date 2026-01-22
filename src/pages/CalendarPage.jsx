import { useState, useMemo, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, X, Edit2, Trash2, Tag } from 'lucide-react';
import { examDates, getDatesForMonth, getDatesForDay } from '../data/examDates';
import { getCalendarEvents, createCalendarEvent, deleteCalendarEvent } from '../services/api';
import { useAuth } from '../context/AuthContext';

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDate, setEditingDate] = useState(null);
  const [customDates, setCustomDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newDateLabel, setNewDateLabel] = useState('');
  const [newDateColor, setNewDateColor] = useState('slate');
  const { isAuthenticated } = useAuth();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Fetch custom events from backend
  useEffect(() => {
    if (isAuthenticated) {
      fetchCustomEvents();
    } else {
      setCustomDates([]);
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchCustomEvents = async () => {
    try {
      setLoading(true);
      const events = await getCalendarEvents();
      console.log('📅 Fetched events from backend:', events);
      // Transform backend data to match frontend format
      const transformed = events.map(event => ({
        id: event._id,
        date: event.date,
        label: event.label,
        color: event.color,
        type: 'custom'
      }));
      console.log('✨ Transformed events:', transformed);
      setCustomDates(transformed);
    } catch (error) {
      console.error('Error fetching custom events:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get first day of month and days in month
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Get all dates (exam + custom) for the current month
  const allDatesForMonth = useMemo(() => {
    const examDatesForMonth = getDatesForMonth(year, month);
    const customDatesForMonth = customDates.filter(date => {
      const dateObj = new Date(date.date);
      return dateObj.getFullYear() === year && dateObj.getMonth() === month;
    });
    return [...examDatesForMonth, ...customDatesForMonth];
  }, [year, month, customDates]);

  // Get dates for a specific day
  const getDatesForSpecificDay = (day) => {
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const examDatesForDay = getDatesForDay(dateString);
    const customDatesForDay = customDates.filter(d => d.date === dateString);
    return [...examDatesForDay, ...customDatesForDay];
  };

  // Navigate months
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Handle date click
  const handleDateClick = (day) => {
    const datesForDay = getDatesForSpecificDay(day);
    if (datesForDay.length > 0 || day) {
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      setSelectedDate({ day, dateString, dates: datesForDay });
    }
  };

  // Handle add custom date
  const handleAddCustomDate = async () => {
    if (selectedDate && newDateLabel.trim()) {
      try {
        const dateData = {
          date: selectedDate.dateString,
          label: newDateLabel.trim(),
          color: newDateColor
        };

        const response = await createCalendarEvent(dateData);

        if (response.success) {
          await fetchCustomEvents();
          setNewDateLabel('');
          setNewDateColor('slate');
          setShowAddModal(false);
          // Update selected date to show new event
          const updatedDates = getDatesForSpecificDay(selectedDate.day);
          setSelectedDate({ ...selectedDate, dates: updatedDates });
        }
      } catch (error) {
        alert('Failed to add custom date. Please try again.');
      }
    }
  };

  // Handle delete custom date
  const handleDeleteCustomDate = async (id) => {
    console.log('🗑️ Attempting to delete event with ID:', id);
    try {
      const response = await deleteCalendarEvent(id);
      console.log('✅ Delete response:', response);

      if (response.success) {
        await fetchCustomEvents();
        const updatedDates = selectedDate.dates.filter(d => d.id !== id);
        setSelectedDate({ ...selectedDate, dates: updatedDates });
      }
    } catch (error) {
      console.error('❌ Delete error:', error);
      console.error('Error response:', error.response?.data);
      alert('Failed to delete custom date. Please try again.');
    }
  };

  // Get color classes for sidebar cards
  const getColorClasses = (color) => {
    const colors = {
      primary: 'bg-primary-600/20 text-primary-300 border-primary-500/40',
      blue: 'bg-blue-600/20 text-blue-300 border-blue-500/40',
      sky: 'bg-sky-600/20 text-sky-300 border-sky-500/40',
      purple: 'bg-purple-600/20 text-purple-300 border-purple-500/40',
      orange: 'bg-orange-600/20 text-orange-300 border-orange-500/40',
      slate: 'bg-slate-600/20 text-slate-300 border-slate-500/40'
    };
    return colors[color] || colors.slate;
  };

  // Get background color classes for calendar date blocks
  const getDateBlockColors = (dates) => {
    if (!dates || dates.length === 0) {
      return { bg: '', text: 'text-slate-300', border: 'border-slate-700' };
    }

    // Use the first event's color (or prioritize exam dates over custom)
    const primaryDate = dates.find(d => d.type === 'exam') || dates[0];
    const color = primaryDate.color;

    const colorMap = {
      primary: {
        bg: 'bg-primary-600/30',
        text: 'text-white',
        border: 'border-primary-500/60',
        hover: 'hover:bg-primary-600/40'
      },
      blue: {
        bg: 'bg-blue-600/30',
        text: 'text-white',
        border: 'border-blue-500/60',
        hover: 'hover:bg-blue-600/40'
      },
      sky: {
        bg: 'bg-sky-600/30',
        text: 'text-white',
        border: 'border-sky-500/60',
        hover: 'hover:bg-sky-600/40'
      },
      purple: {
        bg: 'bg-purple-600/30',
        text: 'text-white',
        border: 'border-purple-500/60',
        hover: 'hover:bg-purple-600/40'
      },
      orange: {
        bg: 'bg-orange-600/30',
        text: 'text-white',
        border: 'border-orange-500/60',
        hover: 'hover:bg-orange-600/40'
      },
      slate: {
        bg: 'bg-slate-600/30',
        text: 'text-white',
        border: 'border-slate-500/60',
        hover: 'hover:bg-slate-600/40'
      }
    };

    return colorMap[color] || colorMap.slate;
  };

  // Check if date has events
  const hasEvents = (day) => {
    return getDatesForSpecificDay(day).length > 0;
  };

  // Check if date is today
  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  // Generate calendar days
  const calendarDays = [];
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Empty cells for days before month starts
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="card mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary-600/20 p-3 rounded-lg border border-primary-500/40">
              <CalendarIcon className="h-6 w-6 text-primary-300" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-50 mb-1 tracking-wide">
                Exam Calendar
              </h1>
              <p className="text-sm text-slate-400">
                Track all defence exam dates and your important dates
              </p>
            </div>
          </div>
          <button
            onClick={goToToday}
            className="btn-secondary"
          >
            Today
          </button>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={goToPreviousMonth}
            className="p-2 rounded-md hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-slate-300" />
          </button>
          <h2 className="text-xl font-semibold text-slate-50">
            {monthNames[month]} {year}
          </h2>
          <button
            onClick={goToNextMonth}
            className="p-2 rounded-md hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-slate-300" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <div className="card">
            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-semibold text-slate-400 uppercase tracking-wide py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, index) => {
                if (day === null) {
                  return <div key={`empty-${index}`} className="aspect-square" />;
                }

                const datesForDay = getDatesForSpecificDay(day);
                const hasEventsToday = datesForDay.length > 0;
                const isTodayDate = isToday(day);
                const isSelected = selectedDate?.day === day;

                // Get color styling for date block
                const dateColors = hasEventsToday ? getDateBlockColors(datesForDay) : null;

                return (
                  <button
                    key={day}
                    onClick={() => handleDateClick(day)}
                    className={`aspect-square p-2 rounded-lg border transition-all relative flex items-center justify-center ${isTodayDate
                      ? hasEventsToday
                        ? `${dateColors.bg} ${dateColors.border} ring-2 ring-primary-500/70 ${dateColors.hover}`
                        : 'bg-primary-600/30 border-primary-500 ring-2 ring-primary-500/50 hover:bg-primary-600/40'
                      : isSelected
                        ? hasEventsToday
                          ? `${dateColors.bg} ${dateColors.border} ring-2 ring-primary-500/50 ${dateColors.hover}`
                          : 'bg-slate-800 border-primary-500/50 ring-2 ring-primary-500/30'
                        : hasEventsToday
                          ? `${dateColors.bg} ${dateColors.border} ${dateColors.hover}`
                          : 'bg-slate-800/50 border-slate-700 hover:border-slate-600 hover:bg-slate-800'
                      }`}
                  >
                    <div className={`text-sm font-semibold ${isTodayDate || (hasEventsToday && dateColors)
                      ? dateColors?.text || 'text-white'
                      : isSelected
                        ? 'text-slate-100'
                        : 'text-slate-300'
                      }`}>
                      {day}
                    </div>
                    {/* Multiple events indicator */}
                    {hasEventsToday && datesForDay.length > 1 && (
                      <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-white/60"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar - Selected Date Details */}
        <div className="lg:col-span-1">
          {selectedDate ? (
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-50">
                  {new Date(selectedDate.dateString).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </h3>
                <button
                  onClick={() => {
                    setSelectedDate(null);
                    setShowAddModal(false);
                  }}
                  className="p-1 rounded hover:bg-slate-800 transition-colors"
                >
                  <X className="h-4 w-4 text-slate-400" />
                </button>
              </div>

              {/* Events List */}
              {selectedDate.dates.length > 0 ? (
                <div className="space-y-3 mb-4">
                  {selectedDate.dates.map((date) => (
                    <div
                      key={date.id}
                      className={`p-3 rounded-lg border ${getColorClasses(date.color)}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {date.type === 'custom' ? (
                              <Tag className="h-3 w-3" />
                            ) : (
                              <CalendarIcon className="h-3 w-3" />
                            )}
                            {date.exam && (
                              <span className="text-[10px] font-semibold uppercase tracking-wide">
                                {date.exam}
                              </span>
                            )}
                          </div>
                          <p className="text-sm font-medium">{date.name || date.label}</p>
                          {date.category && (
                            <p className="text-xs text-slate-400 mt-1 capitalize">
                              {date.category}
                            </p>
                          )}
                        </div>
                        {date.type === 'custom' && (
                          <button
                            onClick={() => handleDeleteCustomDate(date.id)}
                            className="p-1 rounded hover:bg-red-500/20 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-3 w-3 text-red-400" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400 mb-4">No events scheduled</p>
              )}

              {/* Add Custom Date Button */}
              {!showAddModal ? (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="w-full btn-secondary flex items-center justify-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Custom Date
                </button>
              ) : (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={newDateLabel}
                    onChange={(e) => setNewDateLabel(e.target.value)}
                    placeholder="Enter label..."
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-100 placeholder-slate-500 focus:outline-none focus:border-primary-500"
                  />
                  <select
                    value={newDateColor}
                    onChange={(e) => setNewDateColor(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:border-primary-500"
                  >
                    <option value="slate">Slate</option>
                    <option value="primary">Primary</option>
                    <option value="blue">Blue</option>
                    <option value="sky">Sky</option>
                    <option value="purple">Purple</option>
                    <option value="orange">Orange</option>
                  </select>
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddCustomDate}
                      className="flex-1 btn-primary"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setShowAddModal(false);
                        setNewDateLabel('');
                      }}
                      className="flex-1 btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="card text-center py-12">
              <CalendarIcon className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">
                Select a date to view events or add custom dates
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="card mt-6">
        <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wide">
          Legend
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-primary-500/40 border border-primary-500/60"></div>
            <span className="text-xs text-slate-400">CDS</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-500/40 border border-blue-500/60"></div>
            <span className="text-xs text-slate-400">NDA</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-sky-500/40 border border-sky-500/60"></div>
            <span className="text-xs text-slate-400">AFCAT</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-purple-500/40 border border-purple-500/60"></div>
            <span className="text-xs text-slate-400">CAPF</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-slate-500/40 border border-slate-500/60"></div>
            <span className="text-xs text-slate-400">Custom</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-primary-600/30 border-2 border-primary-500"></div>
            <span className="text-xs text-slate-400">Today</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
