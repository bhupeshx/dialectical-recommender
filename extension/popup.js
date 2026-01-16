// Popup script - Handles UI interactions
console.log('Popup loaded');

document.addEventListener('DOMContentLoaded', async () => {
  console.log('DOMContentLoaded fired');
  
  // Load and display stats
  await loadStats();
  
  // Button event listeners
  document.getElementById('openDashboard').addEventListener('click', openDashboard);
  document.getElementById('exportData').addEventListener('click', exportData);
  document.getElementById('clearData').addEventListener('click', clearData);
});

async function loadStats() {
  console.log('Loading stats...');
  
  try {
    // Get data directly from storage
    const result = await chrome.storage.local.get(['trackedContent', 'dailyStats']);
    console.log('Storage result:', result);
    
    const trackedContent = result.trackedContent || [];
    const dailyStats = result.dailyStats || {};
    
    console.log('Tracked content length:', trackedContent.length);
    
    // Calculate stats manually
    let leftCount = 0;
    let centerCount = 0;
    let rightCount = 0;
    
    const platformCounts = {
      youtube: 0,
      twitter: 0,
      reddit: 0,
      article: 0
    };
    
    trackedContent.forEach(item => {
      // Count by ideology
      if (item.ideologyLabel === 'center-left') leftCount++;
      else if (item.ideologyLabel === 'center-right') rightCount++;
      else centerCount++;
      
      // Count by platform
      if (platformCounts[item.platform] !== undefined) {
        platformCounts[item.platform]++;
      }
    });
    
    const total = trackedContent.length;
    
    // Calculate percentages
    const leftPct = total > 0 ? Math.round((leftCount / total) * 100) : 0;
    const centerPct = total > 0 ? Math.round((centerCount / total) * 100) : 0;
    const rightPct = total > 0 ? Math.round((rightCount / total) * 100) : 0;
    
    // Calculate echo chamber score
    const balancedScore = 33.3;
    const deviation = Math.abs(leftPct - balancedScore) + 
                     Math.abs(centerPct - balancedScore) + 
                     Math.abs(rightPct - balancedScore);
    
    const echoScore = total > 0 ? Math.min(100, Math.round(deviation)) : 0;
    
    console.log('Calculated stats:', { total, leftPct, centerPct, rightPct, echoScore });
    
    // Update UI
    document.getElementById('echoScore').textContent = echoScore || '--';
    document.getElementById('totalItems').textContent = total;
    
    // Update platform counts
    document.getElementById('youtubeCount').textContent = platformCounts.youtube || 0;
    document.getElementById('twitterCount').textContent = platformCounts.twitter || 0;
    document.getElementById('redditCount').textContent = platformCounts.reddit || 0;
    
    // Update progress bar
    const progressBar = document.getElementById('progressBar');
    if (total > 0) {
      progressBar.innerHTML = `
        <div class="progress-left" style="width: ${leftPct}%">
          ${leftPct > 10 ? leftPct + '%' : ''}
        </div>
        <div class="progress-center" style="width: ${centerPct}%">
          ${centerPct > 10 ? centerPct + '%' : ''}
        </div>
        <div class="progress-right" style="width: ${rightPct}%">
          ${rightPct > 10 ? rightPct + '%' : ''}
        </div>
      `;
    } else {
      progressBar.innerHTML = '<div style="width: 100%; text-align: center; font-size: 11px;">No data yet</div>';
    }
    
    // Show content, hide loading
    document.getElementById('loading').style.display = 'none';
    document.getElementById('content').style.display = 'block';
    
    console.log('UI updated successfully');
    
  } catch (error) {
    console.error('Error loading stats:', error);
    document.getElementById('loading').innerHTML = '<p>Error loading data. Check console.</p>';
  }
}

function openDashboard() {
  if (chrome.tabs && chrome.tabs.create) {
    chrome.tabs.create({
      url: 'http://localhost:3000'
    });
  } else {
    window.open('http://localhost:3000', '_blank');
  }
}

async function exportData() {
  try {
    const data = await chrome.storage.local.get(null);
    
    if (data) {
      // Convert to JSON
      const jsonString = JSON.stringify(data, null, 2);
      
      // Create downloadable file
      const blob = new Blob([jsonString], {type: 'application/json'});
      const url = URL.createObjectURL(blob);
      
      // Download
      const a = document.createElement('a');
      a.href = url;
      a.download = `echo-chamber-data-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      
      alert('✅ Data exported successfully!');
    }
  } catch (error) {
    console.error('Export error:', error);
    alert('❌ Export failed');
  }
}

async function clearData() {
  if (confirm('Are you sure you want to delete all tracked data? This cannot be undone.')) {
    try {
      await chrome.storage.local.clear();
      await chrome.storage.local.set({
        trackedContent: [],
        dailyStats: {},
        clearedDate: new Date().toISOString()
      });
      
      alert('✅ All data cleared!');
      loadStats(); // Reload UI
    } catch (error) {
      console.error('Clear error:', error);
      alert('❌ Failed to clear data');
    }
  }
}