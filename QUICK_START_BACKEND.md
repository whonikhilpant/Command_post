# Quick Start: Connecting Your Frontend to Backend

## 🎯 Goal
Connect your React frontend to a Node.js/Express backend so data persists in a database instead of localStorage.

---

## 📋 Step-by-Step Checklist

### Phase 1: Backend Setup (Day 1-2)

- [ ] **Step 1.1**: Create backend folder
  ```bash
  cd ..
  mkdir command-post-backend
  cd command-post-backend
  ```

- [ ] **Step 1.2**: Initialize Node.js project
  ```bash
  npm init -y
  ```

- [ ] **Step 1.3**: Install basic packages
  ```bash
  npm install express cors dotenv
  npm install --save-dev nodemon
  ```

- [ ] **Step 1.4**: Copy starter files
  - Copy `backend-starter-template/server.js` to your backend folder
  - Copy `backend-starter-template/package.json` to your backend folder

- [ ] **Step 1.5**: Create `.env` file
  - **How to create**: See `HOW_TO_CREATE_ENV_FILE.md` for detailed instructions
  - **Quick method**: In VS Code, create new file named `.env` in your backend folder
  - **Content**:
    ```env
    PORT=3000
    NODE_ENV=development
    ```

- [ ] **Step 1.6**: Test backend runs
  ```bash
  npm start
  # Visit http://localhost:3000/api/health
  # Should see: {"message": "Backend is running!"}
  ```

### Phase 2: Frontend API Setup (Day 3)

- [ ] **Step 2.1**: Create API service file
  - **How to do it**: See `HOW_TO_CREATE_API_SERVICE.md` for detailed step-by-step instructions
  - **Quick method**: In VS Code, copy `src/services/api.js.example` and rename to `api.js`
  - **Update `API_BASE_URL`**: Usually no changes needed (defaults to `http://localhost:3000/api`)

- [ ] **Step 2.2**: Create `.env` file in frontend root
  ```env
  VITE_API_URL=http://localhost:3000/api
  ```

- [ ] **Step 2.3**: Test API connection
  - Open browser console
  - Try: `fetch('http://localhost:3000/api/health')`
  - Should return: `{"message": "Backend is running!"}`

### Phase 3: Connect Authentication (Day 4-5)

- [ ] **Step 3.1**: Update ProfilePage.jsx
  - Follow Example 1 in `INTEGRATION_EXAMPLES.md`
  - Replace `handleLogin` with API call
  - Replace `handleRegister` with API call

- [ ] **Step 3.2**: Test login/register
  - Try registering a new user
  - Check Network tab in browser DevTools
  - Verify API calls are being made

### Phase 4: Connect Articles (Day 6-7)

- [ ] **Step 4.1**: Update HomePage.jsx
  - Follow Example 2 in `INTEGRATION_EXAMPLES.md`
  - Replace `mockArticles` with API call

- [ ] **Step 4.2**: Test articles load
  - Refresh homepage
  - Verify articles load from API

### Phase 5: Connect Bookmarks (Day 8)

- [ ] **Step 5.1**: Update useBookmarks.js hook
  - Follow Example 3 in `INTEGRATION_EXAMPLES.md`

- [ ] **Step 5.2**: Update BookmarksPage.jsx
  - Follow Example 4 in `INTEGRATION_EXAMPLES.md`

- [ ] **Step 5.3**: Test bookmarks
  - Add a bookmark
  - Check if it persists after refresh

---

## 🔧 Common Commands

### Backend
```bash
# Start backend
npm start

# Start with auto-reload (development)
npm run dev

# Install new package
npm install package-name
```

### Frontend
```bash
# Start frontend
npm run dev

# Build for production
npm run build
```

---

## 🐛 Troubleshooting

### Problem: CORS Error
**Solution**: Make sure backend has `cors()` middleware:
```javascript
const cors = require('cors');
app.use(cors());
```

### Problem: 404 Not Found
**Solution**: 
- Check backend is running on port 3000
- Check API URL in frontend matches backend
- Check route paths match exactly

### Problem: Network Error
**Solution**:
- Check both servers are running
- Check ports are correct (3000 for backend, 5173 for frontend)
- Check firewall isn't blocking connections

---

## 📚 What to Learn Next

1. **Database**: Choose MongoDB (easiest) or MySQL/PostgreSQL
2. **Authentication**: Learn JWT tokens and password hashing
3. **Validation**: Add input validation (express-validator)
4. **Error Handling**: Centralized error handling
5. **Testing**: API testing with Postman

---

## 📖 Full Documentation

- **BACKEND_INTEGRATION_GUIDE.md** - Complete guide with all details
- **INTEGRATION_EXAMPLES.md** - Code examples for each feature
- **backend-starter-template/** - Starter backend code

---

## 🎓 Learning Path

**Week 1**: Setup + Basic Backend
- Day 1-2: Setup backend project
- Day 3: Connect frontend to backend
- Day 4-5: Implement authentication
- Day 6-7: Implement articles API

**Week 2**: Database + Advanced Features
- Day 1-2: Setup database (MongoDB)
- Day 3-4: Connect database to backend
- Day 5-7: Implement bookmarks, notifications, calendar

**Week 3**: Polish + Deploy
- Day 1-3: Error handling, validation
- Day 4-5: Testing
- Day 6-7: Deploy to cloud (Heroku/Railway)

---

## ✅ Success Criteria

You'll know it's working when:
- ✅ Backend server runs without errors
- ✅ Frontend can call backend API
- ✅ User can register and login
- ✅ Articles load from backend
- ✅ Bookmarks persist after refresh
- ✅ Data survives browser refresh

---

**Start with Phase 1 and work through each step. Take your time and test as you go!** 🚀
