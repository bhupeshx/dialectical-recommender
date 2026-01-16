# Installation Guide - Dialectical Recommender

## 📋 Prerequisites

Before you start, make sure you have:

- ✅ **Google Chrome** browser (version 90+)
- ✅ **Node.js** (version 16+) - [Download here](https://nodejs.org/)
- ✅ **Git** (optional) - [Download here](https://git-scm.com/)

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Download the Project

**Option A - Using Git:**
```bash
git clone https://github.com/bhupeshx/dialectical-recommender.git
cd dialectical-recommender
```

**Option B - Download ZIP:**
1. Go to: https://github.com/bhupeshx/dialectical-recommender
2. Click green "Code" button → "Download ZIP"
3. Extract the ZIP file
4. Open the extracted folder

---

### Step 2: Install Chrome Extension

1. **Open Chrome Extensions Page**
   - Type `chrome://extensions/` in address bar
   - Or: Menu (⋮) → More Tools → Extensions

2. **Enable Developer Mode**
   - Toggle the switch in the **top-right corner**

3. **Load the Extension**
   - Click **"Load unpacked"** button
   - Navigate to the `extension/` folder inside the project
   - Click **"Select Folder"**

4. **Verify Installation**
   - You should see "Dialectical Recommender" in your extensions list
   - A purple target icon (🎯) appears in your Chrome toolbar
   - ✅ Extension is now active!

---

### Step 3: Run the Dashboard

**Windows:**
```bash
# Double-click setup.bat
# OR run manually:
cd dashboard
npm install
npm start
```

**Mac/Linux:**
```bash
cd dashboard
npm install
npm start
```

Dashboard will automatically open at: **http://localhost:3000**

---

## ✅ Testing the System

### Test 1: Extension is Tracking

1. **Visit YouTube** and watch any video for 30 seconds
2. Click the extension icon (🎯) in your toolbar
3. You should see:
   - Total Items: 1 or more
   - YouTube count increased
   - Echo Chamber Score calculated

### Test 2: Dashboard Shows Data

1. Make sure dashboard is running at `http://localhost:3000`
2. It will show simulated 8-week data by default
3. Click **"My Real 5-Day Data"** button (will populate as you browse)

### Test 3: Multiple Platforms

Try browsing:
- **YouTube**: Any video
- **Twitter/X**: Your timeline
- **Reddit**: Any subreddit

Check extension popup - all platforms should be tracked!

---

## 🐛 Troubleshooting

### Extension Not Loading

**Problem:** "Manifest file is missing or unreadable"

**Solution:**
- Make sure you selected the `extension/` folder, not the root folder
- Check that `manifest.json` exists in the folder
- Try uninstalling and reinstalling

---

### Extension Icon Missing

**Problem:** No icon shows up in toolbar

**Solution:**
- Icons are optional for testing
- Extension still works without them
- To add icons: See `extension-icons-guide.md`

---

### Dashboard Won't Start

**Problem:** `npm install` fails or `npm start` doesn't work

**Solutions:**

1. **Check Node.js version:**
```bash
node --version
# Should be 16.0.0 or higher
```

2. **Clear npm cache:**
```bash
npm cache clean --force
cd dashboard
npm install
```

3. **Delete node_modules and reinstall:**
```bash
cd dashboard
rmdir /s node_modules  # Windows
rm -rf node_modules    # Mac/Linux
npm install
```

4. **Port 3000 already in use:**
```bash
# Kill the process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill
```

---

### Extension Not Tracking

**Problem:** No data appears in popup

**Solutions:**

1. **Check extension permissions:**
   - Go to `chrome://extensions/`
   - Click "Details" on Dialectical Recommender
   - Scroll to "Site access"
   - Change to "On all sites"

2. **Reload the extension:**
   - Go to `chrome://extensions/`
   - Click the reload icon (🔄) on your extension

3. **Check console for errors:**
   - Right-click extension icon → "Inspect popup"
   - Look for errors in Console tab

4. **Clear storage and restart:**
   - Open extension popup
   - Click "Clear All Data"
   - Reload Chrome
   - Start browsing again

---

### Data Not Showing in Dashboard

**Problem:** Dashboard shows "No data" or old data

**Solution:**

The extension stores data locally in Chrome storage. To see YOUR data:

1. Export data from extension:
   - Click extension icon
   - Click "Export Data (JSON)"
   - Save the file

2. Update dashboard to read this file (manual for now)
3. Or just use the simulated data for demo purposes

---

## 📊 Understanding Your Data

### Echo Chamber Score (0-100)

- **0-40**: Diverse information diet ✅
- **40-60**: Mild echo chamber ⚠️
- **60-80**: Moderate echo chamber ⚠️⚠️
- **80-100**: Severe echo chamber 🚨

### Ideology Labels

- **Center-Left**: Progressive, liberal-leaning content
- **Center**: Balanced, bipartisan content
- **Center-Right**: Conservative, free-market content

---

## 🎓 For Faculty/Reviewers

### Quick Demo Setup

1. **Clone repo**: `git clone https://github.com/bhupeshx/dialectical-recommender.git`
2. **Install extension**: Load `extension/` folder in Chrome
3. **Run dashboard**: `cd dashboard && npm install && npm start`
4. **View demo**: Dashboard opens with 8-week simulated data
5. **Test live**: Browse YouTube, check extension popup

### Files to Review

- **`extension/content.js`** - Tracking logic
- **`extension/background.js`** - Data storage & echo score calculation
- **`dashboard/src/App.js`** - Visualization code (in the artifact)
- **`README.md`** - Full documentation

---

## 🔧 Advanced Configuration

### Change Dashboard Port

Edit `dashboard/package.json`:
```json
"scripts": {
  "start": "PORT=3001 react-scripts start"
}
```

### Enable More Platforms

Edit `extension/manifest.json` and add to `host_permissions`:
```json
"https://www.instagram.com/*",
"https://www.tiktok.com/*"
```

Then update `content.js` to track these sites.

---

## 📱 Mobile Testing (Future)

Currently desktop-only. Mobile version planned for v2.0.

---

## 🆘 Still Having Issues?

1. **Check GitHub Issues**: https://github.com/bhupeshx/dialectical-recommender/issues
2. **Create new issue** with:
   - Your OS (Windows 10/11, Mac, Linux)
   - Node.js version (`node --version`)
   - Chrome version (`chrome://version`)
   - Error message / screenshot
3. **Contact**: [Your email or GitHub]

---

## ✨ Next Steps

Once everything is working:

1. Browse normally for 5-7 days
2. Check extension popup daily
3. Watch your echo chamber score change
4. Prepare demo presentation
5. Export your real data for analysis

---

**Installation complete! Start browsing and breaking your echo chamber! 🎯**