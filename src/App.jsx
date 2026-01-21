import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import HomePage from './pages/HomePage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import BookmarksPage from './pages/BookmarksPage';
import NotificationsPage from './pages/NotificationsPage';
import CalendarPage from './pages/CalendarPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBarOpen, setSearchBarOpen] = useState(false);

  // Set dark mode as default
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header onSearchClick={() => setSearchBarOpen(true)} />
        
        <main className="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={<HomePage searchQuery={searchQuery} />} 
            />
            <Route 
              path="/article/:id" 
              element={<ArticleDetailPage />} 
            />
            <Route 
              path="/bookmarks" 
              element={<BookmarksPage />} 
            />
            <Route 
              path="/notifications" 
              element={<NotificationsPage />} 
            />
            <Route 
              path="/calendar" 
              element={<CalendarPage />} 
            />
            <Route 
              path="/profile" 
              element={<ProfilePage />} 
            />
          </Routes>
        </main>

        <Footer />

        {/* Search Bar Modal */}
        <SearchBar
          isOpen={searchBarOpen}
          onClose={() => {
            setSearchBarOpen(false);
            setSearchQuery('');
          }}
          onSearch={handleSearch}
        />
      </div>
    </Router>
  );
}

export default App;
