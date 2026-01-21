// User authentication and profile storage utilities

export const storageKeys = {
  user: 'commandpost_user',
  isLoggedIn: 'commandpost_is_logged_in'
};

// Get current user
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem(storageKeys.user);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error reading user:', error);
    return null;
  }
};

// Save user
export const saveUser = (userData) => {
  try {
    localStorage.setItem(storageKeys.user, JSON.stringify(userData));
    localStorage.setItem(storageKeys.isLoggedIn, 'true');
    return true;
  } catch (error) {
    console.error('Error saving user:', error);
    return false;
  }
};

// Logout user
export const logoutUser = () => {
  try {
    localStorage.removeItem(storageKeys.user);
    localStorage.setItem(storageKeys.isLoggedIn, 'false');
    return true;
  } catch (error) {
    console.error('Error logging out:', error);
    return false;
  }
};

// Check if user is logged in
export const isLoggedIn = () => {
  try {
    const loggedIn = localStorage.getItem(storageKeys.isLoggedIn);
    return loggedIn === 'true';
  } catch (error) {
    return false;
  }
};
