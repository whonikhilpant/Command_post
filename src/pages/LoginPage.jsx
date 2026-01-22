import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, AlertCircle, User, Shield } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginAs, setLoginAs] = useState('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      const userRole = result.data.data.role;
      
      // Check if trying to login as admin but not admin
      if (loginAs === 'admin' && userRole !== 'admin') {
        setError('Invalid admin credentials. Please use the correct admin email and password.');
        setLoading(false);
        return;
      }

      // Redirect based on role
      if (userRole === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <div className="card">
        <h1 className="text-3xl font-bold text-slate-50 mb-2 text-center">
          Welcome Back
        </h1>
        <p className="text-slate-400 text-center mb-8">
          Login to access your defence news
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500 rounded-lg flex items-start">
            <AlertCircle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-red-300 text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Login As Selection */}
          <div className="mb-6">
            <label className="block text-slate-300 text-sm font-medium mb-3">
              Login as
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setLoginAs('user')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  loginAs === 'user'
                    ? 'bg-primary-600/20 border-primary-500 text-primary-200'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
                }`}
              >
                <User className="h-8 w-8 mx-auto mb-2" />
                <span className="block text-sm font-semibold">User</span>
              </button>

              <button
                type="button"
                onClick={() => setLoginAs('admin')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  loginAs === 'admin'
                    ? 'bg-orange-600/20 border-orange-500 text-orange-200'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
                }`}
              >
                <Shield className="h-8 w-8 mx-auto mb-2" />
                <span className="block text-sm font-semibold">Admin</span>
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-primary-500 transition-colors"
                placeholder={loginAs === 'admin' ? 'snehilpant14@gmail.com' : 'your@email.com'}
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-primary-500 transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : `Login as ${loginAs === 'admin' ? 'Admin' : 'User'}`}
          </button>
        </form>

        <p className="text-slate-400 text-center mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary-400 hover:text-primary-300 font-medium">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;