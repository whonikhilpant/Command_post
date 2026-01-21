// Utility functions for LocalStorage operations

export const storageKeys = {
  bookmarks: 'defence_exam_bookmarks',
  theme: 'defence_exam_theme'
};

// Bookmark management
export const getBookmarks = () => {
  try {
    const bookmarks = localStorage.getItem(storageKeys.bookmarks);
    return bookmarks ? JSON.parse(bookmarks) : [];
  } catch (error) {
    console.error('Error reading bookmarks:', error);
    return [];
  }
};

export const saveBookmark = (articleId) => {
  try {
    const bookmarks = getBookmarks();
    if (!bookmarks.includes(articleId)) {
      bookmarks.push(articleId);
      localStorage.setItem(storageKeys.bookmarks, JSON.stringify(bookmarks));
    }
    return true;
  } catch (error) {
    console.error('Error saving bookmark:', error);
    return false;
  }
};

export const removeBookmark = (articleId) => {
  try {
    const bookmarks = getBookmarks();
    const filtered = bookmarks.filter(id => id !== articleId);
    localStorage.setItem(storageKeys.bookmarks, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error removing bookmark:', error);
    return false;
  }
};

export const isBookmarked = (articleId) => {
  const bookmarks = getBookmarks();
  return bookmarks.includes(articleId);
};

// Theme management
export const getTheme = () => {
  try {
    const theme = localStorage.getItem(storageKeys.theme);
    return theme || 'light';
  } catch (error) {
    return 'light';
  }
};

export const setTheme = (theme) => {
  try {
    localStorage.setItem(storageKeys.theme, theme);
    return true;
  } catch (error) {
    console.error('Error setting theme:', error);
    return false;
  }
};