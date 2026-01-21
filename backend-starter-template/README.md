# Command Post Backend - Starter Template

This is a basic Express.js backend template to get you started with your Command Post application.

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Create .env file**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start the server**
   ```bash
   npm start
   # Or for development with auto-reload:
   npm run dev
   ```

4. **Test the server**
   - Open browser: http://localhost:3000/api/health
   - Should see: `{ "message": "Backend is running!" }`

## Next Steps

1. **Add Database**
   - Choose MongoDB, MySQL, or PostgreSQL
   - Install database driver: `npm install mongoose` (for MongoDB)
   - Create connection in `config/database.js`

2. **Add Authentication**
   - Install: `npm install jsonwebtoken bcryptjs`
   - Create JWT middleware
   - Implement password hashing

3. **Create Models**
   - User model
   - Article model
   - Bookmark model
   - etc.

4. **Implement Real Endpoints**
   - Replace mock responses with database queries
   - Add validation
   - Add error handling

## Project Structure (Recommended)

```
command-post-backend/
├── server.js              # Main server file
├── .env                   # Environment variables
├── package.json
├── routes/
│   ├── auth.js
│   ├── articles.js
│   └── bookmarks.js
├── models/
│   ├── User.js
│   └── Article.js
├── controllers/
│   ├── authController.js
│   └── articleController.js
├── middleware/
│   ├── auth.js
│   └── errorHandler.js
└── config/
    └── database.js
```

## Testing with Postman

1. Import the API collection (if available)
2. Test endpoints:
   - GET http://localhost:3000/api/health
   - POST http://localhost:3000/api/auth/register
   - POST http://localhost:3000/api/auth/login

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/docs/)
- See main BACKEND_INTEGRATION_GUIDE.md for detailed instructions
