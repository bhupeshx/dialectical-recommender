import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertCircle, TrendingDown, Youtube, Twitter, FileText, Lightbulb, Play, CheckCircle } from 'lucide-react';

const EchoChamberDashboard = () => {
  const [selectedWeek, setSelectedWeek] = useState(8);
  const [viewMode, setViewMode] = useState('simulation'); // 'simulation' or 'real'

  // Realistic simulated data based on YOUR actual browsing
  const weeklyData = [
    { week: 1, score: 71, left: 68, center: 25, right: 7 },
    { week: 2, score: 69, left: 66, center: 27, right: 7 },
    { week: 3, score: 62, left: 58, center: 28, right: 14 },
    { week: 4, score: 59, left: 56, center: 29, right: 15 },
    { week: 5, score: 51, left: 48, center: 31, right: 21 },
    { week: 6, score: 49, left: 47, center: 32, right: 21 },
    { week: 7, score: 47, left: 48, center: 31, right: 21 },
    { week: 8, score: 46, left: 48, center: 31, right: 21 }
  ];

  const platformData = [
    { platform: 'YouTube', left: 48, center: 31, right: 21, total: 127 },
    { platform: 'Twitter/X', left: 49, center: 30, right: 21, total: 203 },
    { platform: 'Reddit', left: 28, center: 57, right: 15, total: 54 }
  ];

  const recentContent = [
    { 
      title: "Why India's Economy is Actually Struggling - Johnny Harris", 
      platform: "YouTube", 
      channel: "Johnny Harris",
      lean: "center-left", 
      duration: "18 min",
      quality: 8.2 
    },
    { 
      title: "Sidemen $100 vs $10,000 Holiday", 
      platform: "YouTube", 
      channel: "Sidemen",
      lean: "center", 
      duration: "25 min",
      quality: 7.0 
    },
    { 
      title: "Thomas Sowell on Economic Facts vs Political Myths", 
      platform: "YouTube", 
      channel: "Hoover Institution",
      lean: "center-right", 
      duration: "30 min",
      quality: 8.7 
    },
    { 
      title: "India's farmers protests reveal structural issues with agricultural reform", 
      platform: "Twitter", 
      channel: "@Scroll_in",
      lean: "center-left", 
      duration: "Thread",
      quality: 7.8 
    },
    { 
      title: "Is Tata Motors a good long-term investment? DD inside", 
      platform: "Reddit", 
      channel: "r/IndiaInvestments",
      lean: "center", 
      duration: "Discussion",
      quality: 7.5 
    },
  ];

  const recommendations = [
    { 
      title: "Thomas Sowell: Economic Facts and Fallacies",
      source: "Hoover Institution",
      platform: "YouTube",
      duration: "55 min",
      steelmanScore: 8.7,
      reason: "Sowell presents data-driven economic analysis from conservative perspective. Highly credible (Stanford economist), avoids partisan rhetoric, uses empirical data.",
      opposition: "center-right",
      clicked: true
    },
    { 
      title: "Why India Needs More Economic Freedom, Not Less",
      source: "Centre for Civil Society",
      platform: "Article",
      duration: "12 min read",
      steelmanScore: 8.3,
      reason: "Well-researched analysis of India's regulatory burden. Uses World Bank data, acknowledges trade-offs, proposes specific reforms backed by evidence.",
      opposition: "center-right",
      clicked: false
    },
    { 
      title: "The Case for Color-Blind Policies - Coleman Hughes",
      source: "Coleman Hughes Podcast",
      platform: "Podcast",
      duration: "68 min",
      steelmanScore: 8.9,
      reason: "Hughes (centrist, data-focused) argues against identity politics from first principles. Charitable to opposing views, backed by peer-reviewed research.",
      opposition: "center",
      clicked: true
    },
    { 
      title: "Peter Zeihan: Why Globalization is Ending",
      source: "Zeihan on Geopolitics",
      platform: "YouTube",
      duration: "45 min",
      steelmanScore: 8.1,
      reason: "Geopolitical analysis from realist perspective. Challenges progressive internationalism with demographic and economic data. Well-sourced.",
      opposition: "center-right",
      clicked: false
    }
  ];

  const insights = {
    1: "📊 Baseline established. You're consuming 68% center-left content, mostly from Johnny Harris, Lex Fridman, and TLDR News.",
    2: "📊 Echo chamber detected at 69/100. Your Twitter feed is 73% one-sided due to follow patterns.",
    3: "🎯 First intervention. System recommended Thomas Sowell's economic analysis. You clicked!",
    4: "📈 You're engaging with 45% of opposition recommendations. Content diversity increasing.",
    5: "🔥 Heavy intervention phase. You watched 3 center-right videos this week vs 0 in Week 1.",
    6: "✅ Natural behavior shift observed. You searched for 'conservative perspective on climate' yourself.",
    7: "📊 Post-intervention tracking. Diversity is sticking even without recommendations.",
    8: "🎉 25-point improvement! Your content is now 48% center-left, 31% center, 21% center-right."
  };

  const currentWeek = weeklyData[selectedWeek - 1];
  const improvement = weeklyData[0].score - currentWeek.score;
  const improvementPct = ((improvement / weeklyData[0].score) * 100).toFixed(1);

  const getScoreColor = (score) => {
    if (score >= 70) return 'text-red-500';
    if (score >= 55) return 'text-orange-500';
    if (score >= 40) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getScoreLabel = (score) => {
    if (score >= 70) return 'Moderate Echo Chamber';
    if (score >= 55) return 'Mild Echo Chamber';
    if (score >= 40) return 'Balanced Information Diet';
    return 'Highly Diverse';
  };

  const getLeanBadge = (lean) => {
    if (lean === 'center-left') return 'bg-blue-100 text-blue-800';
    if (lean === 'center-right') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Dialectical Recommender System</h1>
          <p className="text-purple-200">Breaking Echo Chambers with AI-Powered Steel-Man Arguments</p>
          <div className="mt-4 flex gap-3">
            <button 
              onClick={() => setViewMode('simulation')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                viewMode === 'simulation' 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-white/10 text-purple-200 hover:bg-white/20'
              }`}
            >
              📊 8-Week Simulation
            </button>
            <button 
              onClick={() => setViewMode('real')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                viewMode === 'real' 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-white/10 text-purple-200 hover:bg-white/20'
              }`}
            >
              🔴 My Real 5-Day Data
            </button>
          </div>
        </div>

        {viewMode === 'simulation' ? (
          <>
            {/* Main Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              
              {/* Echo Chamber Score */}
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Echo Chamber Score</h3>
                  <AlertCircle className="text-purple-300" size={24} />
                </div>
                <div className={`text-5xl font-bold mb-2 ${getScoreColor(currentWeek.score)}`}>
                  {currentWeek.score}/100
                </div>
                <p className="text-sm text-purple-200">{getScoreLabel(currentWeek.score)}</p>
                <div className="mt-4 flex items-center text-green-400">
                  <TrendingDown size={20} className="mr-2" />
                  <span className="font-semibold">{improvement} points ({improvementPct}% better)</span>
                </div>
              </div>

              {/* Content Balance */}
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-4">Content Balance (Week {selectedWeek})</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-blue-300">Center-Left</span>
                      <span className="text-white font-semibold">{currentWeek.left}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: `${currentWeek.left}%`}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">Center</span>
                      <span className="text-white font-semibold">{currentWeek.center}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gray-400 h-2 rounded-full" style={{width: `${currentWeek.center}%`}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-red-300">Center-Right</span>
                      <span className="text-white font-semibold">{currentWeek.right}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{width: `${currentWeek.right}%`}}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Week Insight */}
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-400/30">
                <div className="flex items-center mb-3">
                  <Lightbulb className="text-yellow-300 mr-2" size={24} />
                  <h3 className="text-lg font-semibold text-white">Week {selectedWeek} Insight</h3>
                </div>
                <p className="text-purple-100 text-sm leading-relaxed">
                  {insights[selectedWeek]}
                </p>
              </div>
            </div>

            {/* Week Selector */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">Select Week to Explore</h3>
              <div className="grid grid-cols-8 gap-3">
                {[1,2,3,4,5,6,7,8].map(week => (
                  <button
                    key={week}
                    onClick={() => setSelectedWeek(week)}
                    className={`py-3 px-4 rounded-lg font-bold transition-all ${
                      selectedWeek === week 
                        ? 'bg-purple-500 text-white shadow-lg scale-105' 
                        : 'bg-white/5 text-purple-200 hover:bg-white/10'
                    }`}
                  >
                    W{week}
                  </button>
                ))}
              </div>
              <div className="mt-4 flex justify-between text-sm text-purple-200">
                <span>📊 Weeks 1-2: Baseline</span>
                <span>🎯 Weeks 3-6: AI Intervention</span>
                <span>📈 Weeks 7-8: Post-Analysis</span>
              </div>
            </div>

            {/* Timeline Chart */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Echo Chamber Score Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <XAxis 
                    dataKey="week" 
                    stroke="#ffffff80" 
                    label={{ value: 'Week', position: 'insideBottom', offset: -5, fill: '#ffffff80' }} 
                  />
                  <YAxis 
                    stroke="#ffffff80" 
                    label={{ value: 'Echo Score', angle: -90, position: 'insideLeft', fill: '#ffffff80' }} 
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e1b4b', border: '1px solid #7c3aed', borderRadius: '8px' }}
                    labelStyle={{ color: '#ffffff' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#a855f7" 
                    strokeWidth={3} 
                    dot={{ fill: '#a855f7', r: 6 }} 
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Platform Breakdown */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Echo Chamber by Platform (Week {selectedWeek})</h3>
              <div className="space-y-4">
                {platformData.map(({ platform, left, center, right, total }) => (
                  <div key={platform}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        {platform === 'YouTube' && <Youtube className="text-red-400 mr-2" size={20} />}
                        {platform === 'Twitter/X' && <Twitter className="text-blue-400 mr-2" size={20} />}
                        {platform === 'Reddit' && <FileText className="text-orange-400 mr-2" size={20} />}
                        <span className="text-white font-semibold">{platform}</span>
                      </div>
                      <span className="text-purple-300 text-sm">{total} items consumed</span>
                    </div>
                    <div className="flex h-8 rounded-lg overflow-hidden">
                      <div 
                        className="bg-blue-500 flex items-center justify-center text-white text-sm font-semibold" 
                        style={{width: `${left}%`}}
                      >
                        {left > 15 && `${left}%`}
                      </div>
                      <div 
                        className="bg-gray-500 flex items-center justify-center text-white text-sm font-semibold" 
                        style={{width: `${center}%`}}
                      >
                        {center > 15 && `${center}%`}
                      </div>
                      <div 
                        className="bg-red-500 flex items-center justify-center text-white text-sm font-semibold" 
                        style={{width: `${right}%`}}
                      >
                        {right > 15 && `${right}%`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Content & Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Recent Content */}
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4">Recent Content Consumed</h3>
                <div className="space-y-3">
                  {recentContent.map((content, idx) => (
                    <div key={idx} className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-purple-400/30 transition-all">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-white font-medium flex-1 text-sm">{content.title}</h4>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ml-2 whitespace-nowrap ${getLeanBadge(content.lean)}`}>
                          {content.lean}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-purple-300">
                          <span>{content.platform}</span>
                          <span>•</span>
                          <span>{content.channel}</span>
                        </div>
                        <span className="text-gray-400">{content.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Recommendations */}
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4">🎯 Steel-Man Recommendations</h3>
                <div className="space-y-4">
                  {recommendations.map((rec, idx) => (
                    <div key={idx} className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-400/30">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-white font-semibold flex-1 text-sm">{rec.title}</h4>
                        <div className="ml-2 bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs font-bold whitespace-nowrap">
                          {rec.steelmanScore}/10
                        </div>
                      </div>
                      <p className="text-xs text-purple-200 mb-2">{rec.source} • {rec.platform} • {rec.duration}</p>
                      <p className="text-xs text-gray-300 italic mb-3 leading-relaxed">"{rec.reason}"</p>
                      <div className="flex items-center gap-2">
                        <button className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-3 rounded-lg transition-colors text-sm flex items-center justify-center gap-2">
                          <Play size={14} />
                          Watch Opposing View
                        </button>
                        {rec.clicked && (
                          <div className="flex items-center gap-1 text-green-400 text-xs">
                            <CheckCircle size={14} />
                            <span>Clicked</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </>
        ) : (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-12 border border-white/20 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="text-6xl mb-6">🔴</div>
              <h2 className="text-3xl font-bold text-white mb-4">Real 5-Day Tracking Data</h2>
              <p className="text-purple-200 mb-6">
                This will show YOUR actual browsing data collected by the Chrome extension over 5 days.
                Currently in development - will be ready by Day 4 of the project.
              </p>
              <div className="bg-purple-500/20 rounded-lg p-6 border border-purple-400/30">
                <p className="text-white font-semibold mb-2">Chrome Extension Status:</p>
                <p className="text-purple-200 text-sm">
                  ✅ Extension built and functional<br/>
                  ⏳ Waiting for 5 days of data collection<br/>
                  📊 Will display here once complete
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-purple-300 text-sm space-y-2">
          <p>🧪 Built by IIT Ropar Student • AI-Powered Depolarization System</p>
          <p>Simulated data based on realistic browsing patterns: Educational content (Veritasium, Johnny Harris), Entertainment (Sidemen, Mat Armstrong), Geopolitics, Critical Thinking</p>
          <p className="text-purple-400 font-semibold">Note: 8-week data is simulated for demonstration. Chrome extension functional for real-time tracking.</p>
        </div>
      </div>
    </div>
  );
};

export default EchoChamberDashboard;