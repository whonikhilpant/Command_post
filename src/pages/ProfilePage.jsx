import { useState, useEffect } from 'react';
import { User, LogIn, LogOut, Mail, Calendar, BookOpen, Shield, Save, Edit2 } from 'lucide-react';
import { getCurrentUser, saveUser, logoutUser, isLoggedIn } from '../utils/userStorage';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser, updateUserProfile } from '../services/api';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isEditingExams, setIsEditingExams] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    examPreparing: [],
    targetYear: ''
  });

  const examOptions = [
    { value: 'CDS', label: 'CDS - Combined Defence Services' },
    { value: 'NDA', label: 'NDA - National Defence Academy' },
    { value: 'AFCAT', label: 'AFCAT - Air Force Common Admission Test' },
    { value: 'CAPF', label: 'CAPF - Central Armed Police Forces' },
    { value: 'SSB', label: 'SSB - Services Selection Board' }
  ];
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    const loggedIn = isLoggedIn();
    const currentUser = getCurrentUser();
    setIsAuthenticated(loggedIn);
    
    if (loggedIn && currentUser) {
      setUser(currentUser);
      // Handle backward compatibility: convert string to array if needed
      const examPreparing = currentUser.examPreparing || [];
      const examArray = Array.isArray(examPreparing) 
        ? examPreparing 
        : examPreparing ? [examPreparing] : [];
      
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        examPreparing: examArray,
        targetYear: currentUser.targetYear || ''
      });
      setIsLoginMode(false);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!loginData.email || !loginData.password) {
      alert('Please enter email and password');
      return;
    }
  
    try {
      // Show loading state
      setIsLoading(true);
      
      // Call API
      const response = await loginUser(loginData.email, loginData.password);
      
      // API returns { user, token }
      // Token is automatically stored in localStorage by loginUser function
      setUser(response.user);
      setFormData({
        name: response.user.name || '',
        email: response.user.email || '',
        phone: response.user.phone || '',
        examPreparing: response.user.examPreparing || [],
        targetYear: response.user.targetYear || ''
      });
      setIsAuthenticated(true);
      setIsLoginMode(false);
      
      alert('Login successful!');
    } catch (error) {
      console.error('Login error:', error);
      alert(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExamChange = (examValue) => {
    setFormData(prev => {
      const currentExams = prev.examPreparing || [];
      if (currentExams.includes(examValue)) {
        return {
          ...prev,
          examPreparing: currentExams.filter(exam => exam !== examValue)
        };
      } else {
        return {
          ...prev,
          examPreparing: [...currentExams, examValue]
        };
      }
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      alert('Please fill in required fields');
      return;
    }
  
    try {
      setIsLoading(true);
      
      // Call API with user data
      const response = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password, // You'll need to add password field
        phone: formData.phone || '',
        examPreparing: formData.examPreparing || [],
        targetYear: formData.targetYear || new Date().getFullYear().toString()
      });
      
      // After registration, automatically log in
      setUser(response.user);
      setIsAuthenticated(true);
      setIsLoginMode(false);
      
      alert('Registration successful!');
    } catch (error) {
      console.error('Registration error:', error);
      alert(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    if (!user) return;
  
    try {
      setIsLoading(true);
      
      // Call API to update profile
      const updatedUser = await updateUserProfile({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        examPreparing: formData.examPreparing,
        targetYear: formData.targetYear
      });
      
      setUser(updatedUser);
      setIsEditingExams(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Update error:', error);
      alert(error.message || 'Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    if (logoutUser()) {
      setUser(null);
      setIsAuthenticated(false);
      setIsLoginMode(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        examPreparing: [],
        targetYear: ''
      });
      navigate('/');
    }
  };

  if (!isAuthenticated && isLoginMode) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="card mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary-600/20 p-3 rounded-lg border border-primary-500/40">
              <LogIn className="h-6 w-6 text-primary-300" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-50 mb-1 tracking-wide">
                Login / Register
              </h1>
              <p className="text-sm text-slate-400">
                Access your profile and personalized features
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-100 placeholder-slate-500 focus:outline-none focus:border-primary-500"
                placeholder="your.email@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-100 placeholder-slate-500 focus:outline-none focus:border-primary-500"
                placeholder="Enter password"
                required
              />
            </div>
            <button type="submit" className="w-full btn-primary">
              Login
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-900 text-slate-400">OR</span>
            </div>
          </div>

          {/* Register Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-100 placeholder-slate-500 focus:outline-none focus:border-primary-500"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-100 placeholder-slate-500 focus:outline-none focus:border-primary-500"
                placeholder="your.email@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Phone (Optional)
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-100 placeholder-slate-500 focus:outline-none focus:border-primary-500"
                placeholder="+91 9876543210"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Exam Preparing For (Select Multiple)
              </label>
              <div className="space-y-2 bg-slate-800/50 border border-slate-700 rounded-md p-4">
                {examOptions.map((exam) => (
                  <label
                    key={exam.value}
                    className="flex items-center gap-3 cursor-pointer hover:bg-slate-700/30 p-2 rounded transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={formData.examPreparing?.includes(exam.value) || false}
                      onChange={() => handleExamChange(exam.value)}
                      className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-primary-600 focus:ring-primary-500 focus:ring-2"
                    />
                    <span className="text-sm text-slate-300">{exam.label}</span>
                  </label>
                ))}
              </div>
              {formData.examPreparing?.length > 0 && (
                <p className="mt-2 text-xs text-slate-400">
                  Selected: {formData.examPreparing.join(', ')}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Target Year
              </label>
              <input
                type="text"
                value={formData.targetYear}
                onChange={(e) => setFormData({ ...formData, targetYear: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-100 placeholder-slate-500 focus:outline-none focus:border-primary-500"
                placeholder="2024"
              />
            </div>
            <button type="submit" className="w-full btn-secondary">
              Register
            </button>
          </form>

          <p className="mt-4 text-xs text-slate-500 text-center">
            Note: This is a demo application. In production, authentication would be handled securely.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Profile Header */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-primary-600/20 p-4 rounded-full border border-primary-500/40">
              <User className="h-8 w-8 text-primary-300" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-50 mb-1">
                {user?.name || 'User Profile'}
              </h1>
              <p className="text-sm text-slate-400">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 hover:border-red-500/60 rounded-md text-red-300 font-medium text-xs uppercase tracking-wide transition-all"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>

        {/* Profile Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-4 w-4 text-primary-400" />
              <span className="text-xs text-slate-400 uppercase tracking-wide">Bookmarks</span>
            </div>
            <p className="text-2xl font-bold text-slate-50">
              {JSON.parse(localStorage.getItem('defence_exam_bookmarks') || '[]').length}
            </p>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-blue-400" />
              <span className="text-xs text-slate-400 uppercase tracking-wide">Events</span>
            </div>
            <p className="text-2xl font-bold text-slate-50">
              {JSON.parse(localStorage.getItem('commandpost_custom_dates') || '[]').length}
            </p>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-purple-400" />
              <span className="text-xs text-slate-400 uppercase tracking-wide">Exam</span>
            </div>
            <div className="space-y-1">
              {user?.examPreparing && Array.isArray(user.examPreparing) && user.examPreparing.length > 0 ? (
                user.examPreparing.map((exam, idx) => (
                  <p key={idx} className="text-sm font-semibold text-slate-50">
                    {exam}
                  </p>
                ))
              ) : user?.examPreparing && typeof user.examPreparing === 'string' ? (
                <p className="text-sm font-semibold text-slate-50">{user.examPreparing}</p>
              ) : (
                <p className="text-sm font-semibold text-slate-50">N/A</p>
              )}
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-orange-400" />
              <span className="text-xs text-slate-400 uppercase tracking-wide">Target Year</span>
            </div>
            <p className="text-lg font-semibold text-slate-50">
              {user?.targetYear || 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Profile Edit Form */}
      <div className="card">
        <h2 className="text-xl font-bold text-slate-50 mb-6 flex items-center gap-2">
          <User className="h-5 w-5 text-primary-400" />
          Edit Profile
        </h2>

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-100 placeholder-slate-500 focus:outline-none focus:border-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-100 placeholder-slate-500 focus:outline-none focus:border-primary-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-100 placeholder-slate-500 focus:outline-none focus:border-primary-500"
                placeholder="+91 9876543210"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-slate-300">
                  Exam Preparing For
                </label>
                {!isEditingExams && (
                  <button
                    type="button"
                    onClick={() => setIsEditingExams(true)}
                    className="flex items-center gap-1 px-2 py-1 text-xs text-primary-300 hover:text-primary-200 hover:bg-primary-600/20 rounded border border-transparent hover:border-primary-500/40 transition-all"
                  >
                    <Edit2 className="h-3 w-3" />
                    Edit
                  </button>
                )}
              </div>
              
              {isEditingExams ? (
                <>
                  <div className="space-y-2 bg-slate-800/50 border border-slate-700 rounded-md p-4 mb-2">
                    {examOptions.map((exam) => (
                      <label
                        key={exam.value}
                        className="flex items-center gap-3 cursor-pointer hover:bg-slate-700/30 p-2 rounded transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={formData.examPreparing?.includes(exam.value) || false}
                          onChange={() => handleExamChange(exam.value)}
                          className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-primary-600 focus:ring-primary-500 focus:ring-2"
                        />
                        <span className="text-sm text-slate-300">{exam.label}</span>
                      </label>
                    ))}
                  </div>
                  {formData.examPreparing?.length > 0 && (
                    <p className="mb-2 text-xs text-slate-400">
                      Selected: {formData.examPreparing.join(', ')}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsEditingExams(false)}
                    className="text-xs text-slate-400 hover:text-slate-300 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <div className="px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-md">
                  {formData.examPreparing && formData.examPreparing.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {formData.examPreparing.map((exam) => (
                        <span
                          key={exam}
                          className="px-3 py-1 bg-primary-600/20 text-primary-300 border border-primary-500/40 rounded-md text-sm font-medium"
                        >
                          {exam}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500">No exams selected</p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Target Year
            </label>
            <input
              type="text"
              value={formData.targetYear}
              onChange={(e) => setFormData({ ...formData, targetYear: e.target.value })}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-100 placeholder-slate-500 focus:outline-none focus:border-primary-500"
              placeholder="2024"
            />
          </div>

          <button type="submit" className="w-full md:w-auto btn-primary flex items-center justify-center gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
