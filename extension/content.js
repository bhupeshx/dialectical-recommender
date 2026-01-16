// Content script - Tracks user browsing across YouTube, Twitter, Reddit
// Runs on every page matching the manifest patterns

console.log(' Dialectical Recommender: Content script loaded');

// Detect platform
const currentUrl = window.location.href;
let platform = 'unknown';

if (currentUrl.includes('youtube.com')) {
  platform = 'youtube';
} else if (currentUrl.includes('twitter.com') || currentUrl.includes('x.com')) {
  platform = 'twitter';
} else if (currentUrl.includes('reddit.com')) {
  platform = 'reddit';
}

// Simple ideology keyword classifier (we'll upgrade this with AI later)
const IDEOLOGY_KEYWORDS = {
  left: ['socialist', 'progressive', 'liberal', 'climate action', 'wealth tax', 'universal healthcare', 'regulation', 'workers rights', 'social justice', 'equity'],
  center: ['bipartisan', 'moderate', 'pragmatic', 'compromise', 'balanced', 'centrist', 'evidence-based', 'nonpartisan'],
  right: ['conservative', 'free market', 'libertarian', 'small government', 'traditional values', 'deregulation', 'lower taxes', 'individual responsibility', 'national security']
};

// Detect ideology based on text content
function detectIdeology(text) {
  if (!text) return 0;
  
  text = text.toLowerCase();
  let leftScore = 0;
  let rightScore = 0;
  
  IDEOLOGY_KEYWORDS.left.forEach(keyword => {
    if (text.includes(keyword)) leftScore++;
  });
  
  IDEOLOGY_KEYWORDS.right.forEach(keyword => {
    if (text.includes(keyword)) rightScore++;
  });
  
  // Return a score from -1 (left) to +1 (right)
  const total = leftScore + rightScore;
  if (total === 0) return 0;
  
  return (rightScore - leftScore) / total;
}

// YouTube tracking
if (platform === 'youtube') {
  let lastVideoId = null;
  let videoStartTime = null;
  
  function trackYouTubeVideo() {
    try {
      // Get video ID from URL
      const urlParams = new URLSearchParams(window.location.search);
      const videoId = urlParams.get('v');
      
      if (videoId && videoId !== lastVideoId) {
        lastVideoId = videoId;
        videoStartTime = Date.now();
        
        // Wait for page to load, then extract info
        setTimeout(() => {
          const title = document.querySelector('h1.ytd-watch-metadata yt-formatted-string')?.textContent || 'Unknown';
          const channel = document.querySelector('ytd-channel-name a')?.textContent || 'Unknown';
          
          // Calculate ideology
          const ideology = detectIdeology(title);
          
          const videoData = {
            platform: 'youtube',
            videoId: videoId,
            title: title,
            channel: channel,
            url: window.location.href,
            timestamp: new Date().toISOString(),
            ideology: ideology,
            ideologyLabel: ideology < -0.2 ? 'center-left' : ideology > 0.2 ? 'center-right' : 'center'
          };
          
          console.log('📺 YouTube Video Tracked:', videoData);
          
          // Send to background script for storage
          chrome.runtime.sendMessage({
            action: 'trackContent',
            data: videoData
          });
        }, 2000);
      }
    } catch (error) {
      console.error('YouTube tracking error:', error);
    }
  }
  
  // Track on page load and URL changes
  trackYouTubeVideo();
  
  // Monitor for video changes (SPA navigation)
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      trackYouTubeVideo();
    }
  }).observe(document, {subtree: true, childList: true});
}

// Twitter/X tracking
if (platform === 'twitter') {
  let trackedTweets = new Set();
  
  function trackTwitterPosts() {
    try {
      // Find all tweet articles
      const tweets = document.querySelectorAll('article[data-testid="tweet"]');
      
      tweets.forEach(tweet => {
        // Get tweet text
        const tweetText = tweet.querySelector('[data-testid="tweetText"]')?.textContent;
        if (!tweetText) return;
        
        // Create unique ID based on text
        const tweetId = tweetText.substring(0, 50);
        if (trackedTweets.has(tweetId)) return;
        trackedTweets.add(tweetId);
        
        // Get author (if available)
        const author = tweet.querySelector('[data-testid="User-Name"] span')?.textContent || 'Unknown';
        
        // Calculate ideology
        const ideology = detectIdeology(tweetText);
        
        const tweetData = {
          platform: 'twitter',
          text: tweetText.substring(0, 200), // First 200 chars
          author: author,
          url: window.location.href,
          timestamp: new Date().toISOString(),
          ideology: ideology,
          ideologyLabel: ideology < -0.2 ? 'center-left' : ideology > 0.2 ? 'center-right' : 'center'
        };
        
        console.log('🐦 Twitter Post Tracked:', tweetData);
        
        chrome.runtime.sendMessage({
          action: 'trackContent',
          data: tweetData
        });
      });
    } catch (error) {
      console.error('Twitter tracking error:', error);
    }
  }
  
  // Track on load and periodically (as user scrolls)
  trackTwitterPosts();
  setInterval(trackTwitterPosts, 5000); // Every 5 seconds
}

// Reddit tracking
if (platform === 'reddit') {
  let trackedPosts = new Set();
  
  function trackRedditPosts() {
    try {
      // Find all post elements
      const posts = document.querySelectorAll('[data-testid="post-container"]');
      
      posts.forEach(post => {
        // Get post title
        const titleElement = post.querySelector('h3');
        if (!titleElement) return;
        
        const title = titleElement.textContent;
        if (trackedPosts.has(title)) return;
        trackedPosts.add(title);
        
        // Get subreddit
        const subreddit = post.querySelector('[data-click-id="subreddit"]')?.textContent || 'Unknown';
        
        // Get post URL
        const postLink = post.querySelector('a[data-click-id="body"]')?.href || window.location.href;
        
        // Calculate ideology
        const ideology = detectIdeology(title + ' ' + subreddit);
        
        const postData = {
          platform: 'reddit',
          title: title,
          subreddit: subreddit,
          url: postLink,
          timestamp: new Date().toISOString(),
          ideology: ideology,
          ideologyLabel: ideology < -0.2 ? 'center-left' : ideology > 0.2 ? 'center-right' : 'center'
        };
        
        console.log('📱 Reddit Post Tracked:', postData);
        
        chrome.runtime.sendMessage({
          action: 'trackContent',
          data: postData
        });
      });
    } catch (error) {
      console.error('Reddit tracking error:', error);
    }
  }
  
  // Track on load and periodically
  trackRedditPosts();
  setInterval(trackRedditPosts, 5000);
}

// Track general article reading (for news sites)
if (platform === 'unknown' && document.title) {
  // Only track if we spend more than 30 seconds on page
  setTimeout(() => {
    const articleData = {
      platform: 'article',
      title: document.title,
      url: window.location.href,
      domain: window.location.hostname,
      timestamp: new Date().toISOString(),
      ideology: 0, // Default to center for unknown sources
      ideologyLabel: 'center'
    };
    
    console.log('📄 Article Tracked:', articleData);
    
    chrome.runtime.sendMessage({
      action: 'trackContent',
      data: articleData
    });
  }, 30000); // 30 seconds
}

console.log(`✅ Tracking active on ${platform}`);