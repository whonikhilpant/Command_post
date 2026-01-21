// LocalStorage utilities for custom calendar dates

export const storageKeys = {
  customDates: 'commandpost_custom_dates'
};

// Get custom dates from LocalStorage
export const getCustomDates = () => {
  try {
    const dates = localStorage.getItem(storageKeys.customDates);
    return dates ? JSON.parse(dates) : [];
  } catch (error) {
    console.error('Error reading custom dates:', error);
    return [];
  }
};

// Save custom date
export const saveCustomDate = (dateData) => {
  try {
    const dates = getCustomDates();
    const newDate = {
      id: Date.now(),
      date: dateData.date,
      label: dateData.label,
      type: 'custom',
      color: dateData.color || 'slate',
      ...dateData
    };
    dates.push(newDate);
    localStorage.setItem(storageKeys.customDates, JSON.stringify(dates));
    return true;
  } catch (error) {
    console.error('Error saving custom date:', error);
    return false;
  }
};

// Update custom date
export const updateCustomDate = (id, updates) => {
  try {
    const dates = getCustomDates();
    const index = dates.findIndex(d => d.id === id);
    if (index !== -1) {
      dates[index] = { ...dates[index], ...updates };
      localStorage.setItem(storageKeys.customDates, JSON.stringify(dates));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating custom date:', error);
    return false;
  }
};

// Delete custom date
export const deleteCustomDate = (id) => {
  try {
    const dates = getCustomDates();
    const filtered = dates.filter(d => d.id !== id);
    localStorage.setItem(storageKeys.customDates, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting custom date:', error);
    return false;
  }
};