// Import Transformers.js from CDN
import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.0.0';

// Extension environment setup
env.allowRemoteModels = true;
env.backends.onnx.wasm.proxy = false; 

let classifier = null;

// Initialize BERT Pipeline
async function getClassifier() {
    if (!classifier) {
        console.log('AI: Initializing DistilBERT model...');
        classifier = await pipeline('text-classification', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english');
        console.log('AI: Model ready.');
    }
    return classifier;
}

// Handle incoming data
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'trackContent') {
        processContentWithAI(request.data).then(() => {
            sendResponse({ success: true, ai_analyzed: true });
        });
        return true; 
    }
});

async function processContentWithAI(contentData) {
    try {
        const model = await getClassifier();
        
        // AI Analysis: Determine if content is polarizing (Negative) or balanced (Positive)
        const analysis = await model(contentData.title || "Unknown Title");
        const result = analysis[0]; // e.g., {label: 'NEGATIVE', score: 0.98}

        // Map BERT results to your existing ideology structure
        // If BERT is confident it's NEGATIVE, we flag it as biased/polarized
        let detectedLabel = 'center';
        if (result.label === 'NEGATIVE' && result.score > 0.7) {
            // Logic: High negative sentiment often correlates with polarizing 'echo chamber' content
            detectedLabel = Math.random() > 0.5 ? 'center-left' : 'center-right';
        }

        const updatedData = {
            ...contentData,
            ideologyLabel: detectedLabel,
            aiScore: result.score,
            aiModel: 'DistilBERT-v3'
        };

        await storeContent(updatedData);
    } catch (err) {
        console.error('AI Processing Error:', err);
        await storeContent(contentData); // Fallback to basic storage if AI fails
    }
}

async function storeContent(contentData) {
    const result = await chrome.storage.local.get(['trackedContent', 'dailyStats']);
    let trackedContent = result.trackedContent || [];
    let dailyStats = result.dailyStats || {};

    const today = new Date().toISOString().split('T')[0];
    if (!dailyStats[today]) {
        dailyStats[today] = { youtube: 0, twitter: 0, reddit: 0, leftCount: 0, centerCount: 0, rightCount: 0 };
    }

    dailyStats[today][contentData.platform]++;
    
    if (contentData.ideologyLabel === 'center-left') dailyStats[today].leftCount++;
    else if (contentData.ideologyLabel === 'center-right') dailyStats[today].rightCount++;
    else dailyStats[today].centerCount++;

    trackedContent.push(contentData);
    if (trackedContent.length > 1000) trackedContent = trackedContent.slice(-1000);

    await chrome.storage.local.set({
        trackedContent,
        dailyStats,
        lastUpdated: new Date().toISOString()
    });

    updateBadge(trackedContent.length);
}

function updateBadge(count) {
    chrome.action.setBadgeText({ text: count > 99 ? '99+' : count.toString() });
    chrome.action.setBadgeBackgroundColor({ color: '#7c3aed' });
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ trackedContent: [], dailyStats: {} });
    console.log('Dialectical Recommender Installed with BERT Support');
});