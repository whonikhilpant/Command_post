import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Search, Menu, X, User, LogOut, LogIn, Shield, Settings } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Header = ({ onSearchClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  // Different nav links for admin vs regular users
  const userNavLinks = [
    { path: '/', label: 'Home' },
    { path: '/bookmarks', label: 'Bookmarks' },
    { path: '/notifications', label: 'Notifications' },
    { path: '/calendar', label: 'Calendar' }
  ];

  const adminNavLinks = [
    { path: '/admin', label: 'Dashboard' },
    { path: '/admin/articles', label: 'Articles' },
    { path: '/admin/articles/create', label: 'Create Article' }
  ];

  const navLinks = user?.role === 'admin' ? adminNavLinks : userNavLinks;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={user?.role === 'admin' ? '/admin' : '/'} className="flex items-center space-x-3">
            <div className={`p-2.5 rounded-md border shadow-sm ${user?.role === 'admin'
                ? 'bg-orange-600/90 border-orange-400/60 shadow-orange-900/50'
                : 'bg-primary-600/90 border-primary-400/60 shadow-primary-900/50'
              }`}>
              {user?.role === 'admin' ? (
                <Shield className="h-5 w-5 text-white" />
              ) : (
                <BookOpen className="h-5 w-5 text-white" />
              )}
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-semibold text-slate-50 tracking-[0.18em] uppercase">
                CommandPost
              </span>
              <span className="text-[11px] text-slate-400 tracking-[0.22em] uppercase">
                {user?.role === 'admin' ? 'Admin Panel' : 'Defence Current Affairs'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-xs font-medium tracking-wide uppercase border ${isActive(link.path)
                    ? user?.role === 'admin'
                      ? 'bg-orange-600/20 text-orange-200 border-orange-500'
                      : 'bg-primary-600/20 text-primary-200 border-primary-500'
                    : 'text-slate-300 border-transparent hover:border-slate-600 hover:bg-slate-900/60'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button - Only for non-admin */}
            {user?.role !== 'admin' && (
              <button
                onClick={onSearchClick}
                className="p-2 rounded-md hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5 text-slate-300" />
              </button>
            )}

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <>
                {/* User Info */}
                <div className="hidden md:flex items-center space-x-2 px-3 py-2 rounded-md border border-slate-700 bg-slate-800">
                  {user?.role === 'admin' ? (
                    <Shield className="h-4 w-4 text-orange-400" />
                  ) : (
                    <User className="h-4 w-4 text-primary-400" />
                  )}
                  <span className="text-xs font-medium text-slate-300">{user?.name}</span>
                  {user?.role === 'admin' && (
                    <span className="text-[10px] px-2 py-0.5 bg-orange-500/20 text-orange-300 rounded-full">
                      ADMIN
                    </span>
                  )}
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="hidden md:flex items-center space-x-2 px-3 py-2 rounded-md border border-slate-700 hover:bg-red-900/20 hover:border-red-500/40 text-slate-300 hover:text-red-300 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-xs font-medium">Logout</span>
                </button>

                {/* Mobile User Icon */}
                <div className="md:hidden p-2 rounded-md border border-slate-700 bg-slate-800">
                  {user?.role === 'admin' ? (
                    <Shield className="h-5 w-5 text-orange-400" />
                  ) : (
                    <User className="h-5 w-5 text-primary-400" />
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Login Button (Desktop) */}
                <Link
                  to="/login"
                  className="hidden md:flex items-center space-x-2 px-3 py-2 rounded-md border border-slate-700 hover:bg-slate-800 text-slate-300 transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  <span className="text-xs font-medium">Login</span>
                </Link>

                {/* Register Button (Desktop) */}
                <Link
                  to="/register"
                  className="hidden md:block btn-primary text-xs"
                >
                  Register
                </Link>

                {/* Mobile Login Icon */}
                <Link
                  to="/login"
                  className="md:hidden p-2 rounded-md border border-transparent hover:border-slate-700 hover:bg-slate-800 transition-colors"
                >
                  <User className="h-5 w-5 text-slate-300" />
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-slate-300" />
              ) : (
                <Menu className="h-5 w-5 text-slate-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-slate-800 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium tracking-wide uppercase transition-colors ${isActive(link.path)
                    ? user?.role === 'admin'
                      ? 'bg-orange-600/20 text-orange-200 border border-orange-500'
                      : 'bg-primary-600/20 text-primary-200 border border-primary-500'
                    : 'text-slate-300 border border-transparent hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
              >
                {link.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <>
                <div className="px-3 py-2 text-sm text-slate-400">
                  Logged in as: <span className="text-slate-200 font-medium">{user?.name}</span>
                  {user?.role === 'admin' && (
                    <span className="ml-2 text-[10px] px-2 py-0.5 bg-orange-500/20 text-orange-300 rounded-full">
                      ADMIN
                    </span>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-md text-sm font-medium tracking-wide uppercase text-red-300 border border-transparent hover:border-red-500/40 hover:bg-red-900/20 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-sm font-medium tracking-wide uppercase text-slate-300 border border-transparent hover:border-slate-700 hover:bg-slate-900/60 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-sm font-medium tracking-wide uppercase bg-primary-600/20 text-primary-200 border border-primary-500 hover:bg-primary-600/30 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;