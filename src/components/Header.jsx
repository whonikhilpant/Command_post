import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Search, Menu, X, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { isLoggedIn, getCurrentUser } from '../utils/userStorage';

const Header = ({ onSearchClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setUserLoggedIn(isLoggedIn());
  }, [location]);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/bookmarks', label: 'Bookmarks' },
    { path: '/notifications', label: 'Notifications' },
    { path: '/calendar', label: 'Calendar' }
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-primary-600/90 p-2.5 rounded-md border border-primary-400/60 shadow-sm shadow-primary-900/50">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-semibold text-slate-50 tracking-[0.18em] uppercase">
                CommandPost
              </span>
              <span className="text-[11px] text-slate-400 tracking-[0.22em] uppercase">
                Defence Current Affairs
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-xs font-medium tracking-wide uppercase border ${
                  isActive(link.path)
                    ? 'bg-primary-600/20 text-primary-200 border-primary-500'
                    : 'text-slate-300 border-transparent hover:border-slate-600 hover:bg-slate-900/60'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button
              onClick={onSearchClick}
              className="p-2 rounded-md hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5 text-slate-300" />
            </button>

            {/* Profile Button */}
            <Link
              to="/profile"
              className={`p-2 rounded-md hover:bg-slate-800 border transition-colors ${
                isActive('/profile')
                  ? 'bg-primary-600/20 border-primary-500/40'
                  : 'border-transparent hover:border-slate-700'
              }`}
              aria-label="Profile"
            >
              <div className="relative">
                <User className="h-5 w-5 text-slate-300" />
                {userLoggedIn && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary-500 rounded-full border-2 border-slate-950"></span>
                )}
              </div>
            </Link>

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
                className={`block px-3 py-2 rounded-md text-sm font-medium tracking-wide uppercase transition-colors ${
                  isActive(link.path)
                    ? 'bg-primary-600/20 text-primary-200 border border-primary-500'
                    : 'text-slate-300 border border-transparent hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-sm font-medium tracking-wide uppercase transition-colors ${
                isActive('/profile')
                  ? 'bg-primary-600/20 text-primary-200 border border-primary-500'
                  : 'text-slate-300 border border-transparent hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              Profile
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
