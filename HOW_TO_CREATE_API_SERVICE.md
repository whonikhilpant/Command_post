# How to Create API Service File (Step 2.1)

## 🎯 What You're Doing

You're creating a central file (`api.js`) that will handle all communication between your React frontend and your Node.js backend. This file contains functions to make API calls.

---

## 📝 Step-by-Step Instructions

### Step 1: Check if the services folder exists

1. **Open your project in VS Code**
2. **Navigate to**: `src/services/` folder
3. **You should see**: `api.js.example` file already there

If the `services` folder doesn't exist:
- Right-click on `src` folder → New Folder → Name it `services`

---

### Step 2: Copy/Rename the Example File

You have **3 methods** to choose from:

#### **Method 1: Using VS Code (Easiest)** ⭐ Recommended

1. **In VS Code Explorer**, find `src/services/api.js.example`
2. **Right-click** on `api.js.example`
3. **Select "Copy"** (or press `Ctrl + C`)
4. **Right-click** in the same `services` folder
5. **Select "Paste"** (or press `Ctrl + V`)
6. **Rename the copied file**:
   - Right-click the copied file (it will be named `api.js.example` or `api.js.example (1)`)
   - Select "Rename" (or press `F2`)
   - Change the name to: `api.js`
   - Press Enter

**OR** (Even easier):
1. **Right-click** on `api.js.example`
2. **Select "Copy"**
3. **Right-click** in `services` folder
4. **Select "Paste"**
5. **Immediately rename** before clicking away: type `api.js` and press Enter

---

#### **Method 2: Using File Explorer**

1. **Open Windows File Explorer**
2. **Navigate to**: `d:\command post\src\services\`
3. **You should see**: `api.js.example`
4. **Right-click** on `api.js.example`
5. **Select "Copy"**
6. **Right-click** in the same folder → **"Paste"**
7. **Right-click** on the copied file → **"Rename"**
8. **Change name to**: `api.js` (remove `.example`)
9. **Press Enter**

---

#### **Method 3: Using Command Line**

1. **Open PowerShell or Command Prompt**
2. **Navigate to your project**:
   ```bash
   cd "d:\command post\src\services"
   ```
3. **Copy the file**:
   ```bash
   copy api.js.example api.js
   ```
   (In PowerShell, you can also use: `Copy-Item api.js.example api.js`)

---

### Step 3: Verify the File Was Created

After copying, you should now have **TWO files** in `src/services/`:
- ✅ `api.js.example` (original - you can keep this as reference)
- ✅ `api.js` (your new working file)

**Check in VS Code**: You should see both files listed in the Explorer.

---

### Step 4: Update API_BASE_URL (Optional but Recommended)

1. **Open** `src/services/api.js` in VS Code
2. **Find this line** (around line 13):
   ```javascript
   const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:3000/api';
   ```
3. **This line is already correct!** It will:
   - Use `VITE_API_URL` from your `.env` file if it exists
   - Otherwise, default to `http://localhost:3000/api`

**You can leave it as-is**, OR if your backend runs on a different port, change `3000` to your port number.

---

### Step 5: Create Frontend .env File (Recommended)

To make the API URL configurable, create a `.env` file in your **frontend root** (same folder as `package.json`):

1. **In VS Code**, go to the root of your project (`d:\command post\`)
2. **Create a new file** named `.env`
3. **Add this line**:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```
4. **Save the file**

**Why?** This allows you to easily change the backend URL without editing code.

---

## ✅ Verification Checklist

After completing the steps, verify:

- [ ] `src/services/api.js` file exists
- [ ] `api.js.example` still exists (as reference)
- [ ] `api.js` contains the code (not empty)
- [ ] Line 13 shows: `const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:3000/api';`
- [ ] `.env` file exists in project root (optional but recommended)

---

## 🧪 Quick Test

To verify everything works:

1. **Open** `src/services/api.js`
2. **Scroll to the bottom** - you should see many exported functions like:
   - `registerUser`
   - `loginUser`
   - `getArticles`
   - `getBookmarks`
   - etc.

3. **Try importing it** in any component (just to test):
   ```javascript
   // In any component file, add this at the top:
   import { getArticles } from '../services/api';
   ```
   If there are no errors, the file is set up correctly!

---

## 📋 What's Inside api.js?

The `api.js` file contains:

1. **Helper function** (`apiCall`) - Makes all API requests
2. **Authentication functions**:
   - `registerUser()`
   - `loginUser()`
   - `logoutUser()`
   - `getCurrentUser()`
   - `updateUserProfile()`

3. **Article functions**:
   - `getArticles()`
   - `getArticle(id)`
   - `searchArticles(query)`

4. **Bookmark functions**:
   - `getBookmarks()`
   - `addBookmark(articleId)`
   - `removeBookmark(bookmarkId)`
   - `checkBookmark(articleId)`

5. **Notification functions**:
   - `getNotifications()`
   - `markNotificationAsRead(id)`
   - `getUnreadCount()`

6. **Calendar functions**:
   - `getCalendarEvents()`
   - `addCalendarEvent()`
   - `updateCalendarEvent()`
   - `deleteCalendarEvent()`

**You don't need to understand all of this now** - you'll use these functions in your components later!

---

## 🔍 Troubleshooting

### Problem: File shows as `api.js.example` instead of `api.js`

**Solution**: Make sure you renamed it correctly. The filename should be exactly `api.js` (no `.example` part).

### Problem: Can't see the file in VS Code

**Solution**: 
- Refresh VS Code (close and reopen the folder)
- Check if you're in the right folder: `src/services/`

### Problem: Import errors when using the file

**Solution**:
- Make sure the file is named exactly `api.js` (case-sensitive)
- Make sure it's in `src/services/` folder
- Check for syntax errors in the file (VS Code will show red underlines)

### Problem: API calls don't work

**Solution**:
- Make sure your backend is running on port 3000
- Check the `API_BASE_URL` in `api.js` matches your backend URL
- Check browser console for errors
- Check Network tab in browser DevTools to see if requests are being made

---

## 📚 Next Steps

After creating `api.js`:

1. ✅ **Step 2.2**: Create `.env` file in frontend root (if you haven't)
2. ✅ **Step 2.3**: Test API connection
3. ✅ **Step 3**: Start connecting your components (see `INTEGRATION_EXAMPLES.md`)

---

## 🎯 Summary

**What you did:**
- Created `src/services/api.js` by copying `api.js.example`
- This file will handle all backend communication

**What's next:**
- Use the functions from `api.js` in your components
- Example: `import { getArticles } from '../services/api'`

**That's it! Your API service layer is ready! 🎉**
