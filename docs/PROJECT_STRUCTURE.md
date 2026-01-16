# Complete Project Structure

## 📁 Full Directory Tree

```
dialectical-recommender/
│
├── extension/                      # Chrome Extension
│   ├── manifest.json              # Extension configuration
│   ├── content.js                 # Tracks browsing (YouTube, Twitter, Reddit)
│   ├── background.js              # Data storage & echo score calculation
│   ├── popup.html                 # Extension popup UI
│   ├── popup.js                   # Popup functionality
│   └── icons/                     # Extension icons
│       ├── icon16.png            # 16x16 toolbar icon
│       ├── icon48.png            # 48x48 extensions page icon
│       └── icon128.png           # 128x128 store icon
│
├── dashboard/                      # React Dashboard
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── App.js                # Main dashboard component (from artifact)
│   │   ├── index.js              # React entry point
│   │   ├── index.css             # Global styles
│   │   └── components/           # Reusable components (optional)
│   ├── package.json              # Dependencies
│   ├── package-lock.json         # Auto-generated
│   └── node_modules/             # Auto-generated (gitignored)
│
├── data/                           # Sample datasets
│   ├── sample-tracking-data.json  # Example tracking data
│   └── simulated-8weeks.json      # 8-week simulated dataset
│
├── screenshots/                    # Demo images for GitHub
│   ├── dashboard.png              # Dashboard screenshot
│   ├── popup.png                  # Extension popup screenshot
│   ├── tracking.png               # Tracking in action
│   └── echo-score.png             # Echo chamber visualization
│
├── docs/                           # Additional documentation
│   ├── INSTALLATION.md            # Detailed setup guide
│   ├── CONTRIBUTING.md            # Contribution guidelines
│   ├── API.md                     # (Future) API documentation
│   └── ARCHITECTURE.md            # (Future) Technical architecture
│
├── scripts/                        # Utility scripts
│   ├── setup.bat                  # Windows setup script
│   ├── setup.sh                   # Mac/Linux setup script (future)
│   └── export-data.js             # Data export utility (future)
│
├── README.md                       # Main project documentation
├── LICENSE                         # MIT License
├── .gitignore                      # Files to ignore in Git
├── CHANGELOG.md                    # Version history (future)
└── package.json                    # Root package.json (optional)
```

---

## 📄 File Descriptions

### Extension Files

| File | Purpose | Lines | Complexity |
|------|---------|-------|------------|
| `manifest.json` | Chrome extension config, defines permissions | ~50 | Low |
| `content.js` | Tracks user browsing, detects ideology | ~200 | Medium |
| `background.js` | Stores data, calculates echo scores | ~150 | Medium |
| `popup.html` | Extension popup UI design | ~100 | Low |
| `popup.js` | Popup functionality, displays stats | ~80 | Low |

### Dashboard Files

| File | Purpose | Lines | Complexity |
|------|---------|-------|------------|
| `src/App.js` | Main dashboard React component | ~400 | High |
| `package.json` | Node.js dependencies | ~30 | Low |
| `index.html` | HTML entry point | ~20 | Low |

### Documentation Files

| File | Purpose | Audience |
|------|---------|----------|
| `README.md` | Project overview, quick start | Everyone |
| `INSTALLATION.md` | Detailed setup instructions | New users |
| `CONTRIBUTING.md` | How to contribute | Developers |
| `LICENSE` | MIT license terms | Legal |

---

## 🔧 What Each Component Does

### Extension Flow

```
User browses → content.js detects → background.js stores → popup.html displays
```

1. **content.js** runs on YouTube/Twitter/Reddit pages
2. Extracts video titles, tweets, posts
3. Classifies ideology using keywords
4. Sends to **background.js** via Chrome messages
5. **background.js** stores in Chrome storage
6. Calculates echo chamber score
7. **popup.js** retrieves and displays in **popup.html**

### Dashboard Flow

```
Dashboard opens → Loads simulated data → Displays graphs → User explores
```

1. **index.html** loads React app
2. **App.js** component renders
3. Loads 8-week simulated data (hardcoded)
4. Displays interactive charts using Recharts
5. User can switch weeks, view platforms

### Future: Extension ↔ Dashboard Integration

```
Extension tracks → Stores locally → Dashboard reads → Real-time updates
```

(Not yet implemented - requires shared storage solution)

---

## 📊 Data Flow Architecture

```
┌─────────────────┐
│   User Browse   │
│  (YouTube, etc) │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│   content.js    │  ← Detects content
│  (Extension)    │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  background.js  │  ← Stores & processes
│  (Extension)    │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ Chrome Storage  │  ← Local database
│     (API)       │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│   popup.html    │  ← Displays stats
│  (Extension UI) │
└─────────────────┘

         │
         ↓ (Future)
┌─────────────────┐
│   Dashboard     │  ← Full visualization
│    (React)      │
└─────────────────┘
```

---

## 🎯 File Sizes (Approximate)

```
extension/
  manifest.json        2 KB
  content.js          8 KB
  background.js       6 KB
  popup.html          4 KB
  popup.js            3 KB
  icons/              15 KB total
  
dashboard/
  src/App.js          20 KB
  package.json        1 KB
  build/ (compiled)   ~500 KB
  
data/
  sample-data.json    10 KB
  
Total project size: ~600 KB (excluding node_modules)
```

---

## 🚀 Build Process

### Development

```bash
# Extension: No build needed (vanilla JS)
# Just load in Chrome developer mode

# Dashboard: React dev server
cd dashboard
npm start  # → localhost:3000
```

### Production

```bash
# Extension: Ready to use as-is
# Can submit to Chrome Web Store

# Dashboard: Build for deployment
cd dashboard
npm run build  # → build/ folder
# Deploy to GitHub Pages, Netlify, etc.
```

---

## 🔐 Security Considerations

### Extension Permissions

- `storage`: Store tracking data locally
- `tabs`: Access current tab URL
- `webNavigation`: Detect page loads
- `host_permissions`: Access YouTube/Twitter/Reddit

### Privacy

- All data stored **locally** (Chrome storage)
- No external API calls
- No telemetry or analytics
- User can export/delete anytime

---

## 📈 Future Expansions

### v1.1 (Near-term)
- Add `models/` folder for ML models
- Create `tests/` folder for unit tests
- Add `api/` folder for backend (if cloud sync)

### v2.0 (Long-term)
- Mobile app in `mobile/` folder
- Browser compatibility in `browsers/` (Firefox, Safari)
- Advanced analytics in `analytics/`

---

## 🎓 For Academic Review

### Key Files to Inspect

1. **`extension/content.js`** - Core tracking algorithm
2. **`extension/background.js`** - Echo score calculation
3. **`dashboard/src/App.js`** - Visualization logic
4. **`README.md`** - Project documentation
5. **`data/sample-tracking-data.json`** - Data structure

### Metrics

- **Total Code Lines**: ~1,000 (excluding dependencies)
- **Components**: 10+ (extension, dashboard, utilities)
- **Platforms Tracked**: 3 (YouTube, Twitter, Reddit)
- **Data Points**: ~150 per week

---

**This structure is designed for:**
✅ Easy navigation
✅ Clear separation of concerns
✅ Scalability
✅ Academic review
✅ Open-source contribution