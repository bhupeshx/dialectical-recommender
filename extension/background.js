// Background service worker - Handles data storage and processing
console.log('Background service worker started');

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received:', request.action);
  
  if (request.action === 'trackContent') {
    storeContent(request.data).then(() => {
      sendResponse({success: true});
    });
    return true; // Required for async response
  }
});

// Store tracked content in Chrome storage
async function storeContent(contentData) {
  try {
    console.log('Storing content:', contentData);
    
    // Get existing data
    const result = await chrome.storage.local.get(['trackedContent', 'dailyStats']);
    
    let trackedContent = result.trackedContent || [];
    let dailyStats = result.dailyStats || {};
    
    // Add new content
    trackedContent.push(contentData);
    
    // Update daily stats
    const today = new Date().toISOString().split('T')[0];
    if (!dailyStats[today]) {
      dailyStats[today] = {
        youtube: 0,
        twitter: 0,
        reddit: 0,
        article: 0,
        leftCount: 0,
        centerCount: 0,
        rightCount: 0
      };
    }
    
    dailyStats[today][contentData.platform]++;
    
    // Count ideology
    if (contentData.ideologyLabel === 'center-left') {
      dailyStats[today].leftCount++;
    } else if (contentData.ideologyLabel === 'center-right') {
      dailyStats[today].rightCount++;
    } else {
      dailyStats[today].centerCount++;
    }
    
    // Keep only last 1000 items to prevent storage overflow
    if (trackedContent.length > 1000) {
      trackedContent = trackedContent.slice(-1000);
    }
    
    // Save back to storage
    await chrome.storage.local.set({
      trackedContent: trackedContent,
      dailyStats: dailyStats,
      lastUpdated: new Date().toISOString()
    });
    
    console.log('Content stored successfully. Total items:', trackedContent.length);
    
    // Update badge with total count
    updateBadge(trackedContent.length);
    
  } catch (error) {
    console.error('Storage error:', error);
  }
}

// Update extension badge with item count
function updateBadge(count) {
  try {
    chrome.action.setBadgeText({
      text: count > 99 ? '99+' : count.toString()
    });
    
    chrome.action.setBadgeBackgroundColor({
      color: '#7c3aed'
    });
  } catch (error) {
    console.error('Badge update error:', error);
  }
}

// Initialize on install
chrome.runtime.onInstalled.addListener((details) => {
  console.log('Extension installed:', details.reason);
  
  if (details.reason === 'install') {
    // Set initial storage
    chrome.storage.local.set({
      trackedContent: [],
      dailyStats: {},
      installDate: new Date().toISOString()
    });
    
    console.log('Initial storage set');
  }
});

console.log('Background service worker ready');