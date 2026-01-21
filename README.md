# CommandPost 🎖️

A modern, beginner-friendly web application for Defence Exam Aspirants (CDS, NDA, AFCAT, CAPF, SSB) to easily read, save, and revise defence-related articles and news.

## ✨ Features

### Core Features
- 📰 **Latest Defence News & Articles** - Stay updated with curated defence-related content
- 🎯 **Exam-wise Filtering** - Filter articles by CDS, NDA, AFCAT, CAPF, SSB exams
- 🔍 **Advanced Search** - Search articles by keywords, titles, or content
- 🔖 **Bookmarks System** - Save articles for later revision (LocalStorage-based)
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📱 **Mobile-First Design** - Fully responsive across all devices
- 📅 **Daily Defence Brief** - Quick summary of recent defence news
- 🏷️ **Category Organization** - Articles organized by Army, Navy, Air Force, Joint Forces

### Article Features
- Clean, readable article layout
- Important points highlighted for quick revision
- "Why this is important for exams" section
- Exam tags for each article
- Image support for visual appeal

## 🛠️ Tech Stack

- **Frontend Framework:** React.js 18
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS 3
- **Routing:** React Router DOM 6
- **Icons:** Lucide React
- **State Management:** React Hooks + LocalStorage

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone or download this repository
2. Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in terminal)

### Build for Production

Create an optimized production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 📁 Project Structure

```
commandpost/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.jsx       # Navigation header with theme toggle
│   │   ├── Footer.jsx       # Site footer
│   │   ├── ArticleCard.jsx  # Article card component
│   │   ├── SearchBar.jsx    # Search modal component
│   │   ├── CategoryFilter.jsx # Category filter buttons
│   │   ├── ExamFilter.jsx   # Exam filter buttons
│   │   └── DailyBrief.jsx   # Daily brief component
│   ├── pages/               # Page components
│   │   ├── HomePage.jsx     # Main homepage
│   │   ├── ArticleDetailPage.jsx # Individual article page
│   │   ├── BookmarksPage.jsx # Saved articles page
│   │   └── DailyBriefPage.jsx # Daily brief page
│   ├── hooks/               # Custom React hooks
│   │   ├── useTheme.js      # Theme management hook
│   │   └── useBookmarks.js  # Bookmarks management hook
│   ├── utils/               # Utility functions
│   │   └── localStorage.js  # LocalStorage operations
│   ├── data/                # Mock data
│   │   └── mockArticles.js  # Sample defence articles
│   ├── App.jsx              # Main app component with routing
│   ├── main.jsx             # App entry point
│   └── index.css            # Global styles & Tailwind directives
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.js           # Vite configuration
└── README.md                # This file
```

## 🎨 Key Components Explained

### HomePage
- Displays daily brief at the top
- Shows all articles in a responsive grid
- Category and exam filters
- Search functionality integration

### ArticleDetailPage
- Full article content with formatted text
- Important points highlighted in a special section
- "Why this is important for exams" section
- Bookmark functionality
- Navigation to next/previous articles

### BookmarksPage
- Lists all bookmarked articles
- Empty state with helpful message
- Quick access to saved content

### DailyBriefPage
- Expanded view of daily brief
- Preview of key points for each article
- Quick links to full articles

## 🔧 Customization

### Adding New Articles

Edit `src/data/mockArticles.js` and add new article objects following this structure:

```javascript
{
  id: 9,
  title: "Article Title",
  excerpt: "Short description",
  content: "Full article content...",
  category: "Army", // or "Navy", "Air Force", "Joint Forces"
  examTags: ["CDS", "NDA"], // Array of relevant exams
  date: "2024-01-20",
  image: "image-url",
  importantPoints: ["Point 1", "Point 2"],
  examImportance: "Why this matters for exams..."
}
```

### Changing Colors/Themes

Edit `tailwind.config.js` to customize the color scheme. The app uses:
- Primary colors for buttons and accents
- Category-specific colors for badges
- Gray scale for text and backgrounds

### Integrating Real API

To replace mock data with a real API:

1. Create an API service file in `src/utils/api.js`
2. Replace `mockArticles` imports with API calls
3. Update data fetching in components using `useEffect` and `useState`

## 📱 Mobile Responsiveness

The app is built with a mobile-first approach using Tailwind CSS responsive classes:
- Single column layout on mobile
- Two columns on tablets (md breakpoint)
- Three columns on desktop (lg breakpoint)
- Mobile menu in header
- Touch-friendly buttons and interactive elements

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

MIT License - Feel free to use this project for learning or building upon it.

## 🤝 Contributing

This is a starter project. Feel free to:
- Add more features
- Improve the UI/UX
- Add backend integration
- Enhance accessibility
- Add unit tests

## 📧 Support

For issues or questions, please create an issue in the repository.

---

Built with ❤️ for Defence Exam Aspirants
