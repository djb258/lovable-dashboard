// Repository Dashboard Component for Lovable.dev
// Migrated from repo-lens to create the "Dashboard of Dashboards"
'use client';

import React, { useState, useEffect } from 'react';

// Repository categories for the library
export const REPOSITORY_CATEGORIES = [
  {
    id: 'command-orchestration',
    name: '🏗️ Command & Orchestration',
    description: 'Master control systems and HEIR orchestration',
    count: 4,
    color: 'bg-blue-500',
    repos: [
      'hivemind-command-center',
      'HEIR-AGENT-SYSTEM', 
      'command-center',
      'factfinder-flow-orchestrator'
    ]
  },
  {
    id: 'ai-automation',
    name: '🤖 AI & Automation', 
    description: 'AI agents, memory systems, and intelligent automation',
    count: 8,
    color: 'bg-purple-500',
    repos: [
      'QA-Agent',
      'mapping-agent',
      'buyer-intent-tool', 
      'MemOS',
      'chatgbt-cursor',
      'chatgbt-commander-cli',
      'Dataworkflowsagents',
      'screenpipe-mindpal'
    ]
  },
  {
    id: 'analysis-intelligence',
    name: '🔍 Analysis & Intelligence',
    description: 'Repository analysis, mapping, and data intelligence', 
    count: 3,
    color: 'bg-green-500',
    repos: [
      'repo-lens',
      'repo-sight-unveiled',
      'mapping-app-orbt'
    ]
  },
  {
    id: 'architecture-standards', 
    name: '🏛️ Architecture & Standards',
    description: 'Blueprints, frameworks, and architectural tools',
    count: 4,
    color: 'bg-orange-500',
    repos: [
      'ulimate-blueprint-pilot',
      'blueprint-pilot-console',
      'altitude-forge-frame',
      'cursor-blueprint-enforcer'
    ]
  },
  {
    id: 'data-infrastructure',
    name: '💾 Data & Infrastructure', 
    description: 'Databases, deployment, and data processing',
    count: 8,
    color: 'bg-indigo-500',
    repos: [
      'Db-connection',
      'Render-for-DB',
      'Firebase-Sync',
      'ingest-companies-people',
      'render-endpoint',
      'deerflow_render_starter',
      'deer-flow',
      'Fastapi-Deerflow'
    ]
  },
  {
    id: 'business-client',
    name: '🎓 Business & Client Systems',
    description: 'Client management, enrollment, and business processes',
    count: 5, 
    color: 'bg-pink-500',
    repos: [
      'client',
      'client-intake-system',
      'student-master-track',
      'new-client-setup',
      'dave-enrollment-skeletons'
    ]
  },
  {
    id: 'data-collection',
    name: '🕷️ Data Collection',
    description: 'Scraping, screen capture, and data gathering',
    count: 3,
    color: 'bg-teal-500', 
    repos: [
      'scraping-tool',
      'screenpipe',
      'screenpipe-mindpal'
    ]
  },
  {
    id: 'utilities-tools',
    name: '🔧 Utilities & Tools',
    description: 'Helper tools, templates, and maintenance utilities',
    count: 5,
    color: 'bg-gray-500',
    repos: [
      'shell-template',
      'ping-pong-master', 
      'weewee-def-update',
      'gk-cli',
      'ia-template'
    ]
  },
  {
    id: 'management-tracking',
    name: '🐛 Management & Tracking',
    description: 'Project management, bug tracking, and monitoring',
    count: 4,
    color: 'bg-red-500',
    repos: [
      'mantisbt',
      'Mantisbt-render-ready',
      'mapping-app-orbt',
      'doctrine-sniper-command-tool'
    ]
  }
];

export enum BuildPlatform {
  LOVABLE = 'LOVABLE',
  VERCEL = 'VERCEL', 
  RENDER = 'RENDER',
  NETLIFY = 'NETLIFY',
  MANUAL = 'MANUAL',
  UNKNOWN = 'UNKNOWN'
}

export enum BuildStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  BUILDING = 'BUILDING',
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED'
}

export interface BuildInfo {
  platform: BuildPlatform;
  status: BuildStatus;
  deploymentUrl?: string;
  lastBuild?: string;
}

export interface Repository {
  name: string;
  full_name: string;
  description?: string;
  private: boolean;
  stars: number;
  language?: string;
  updated_at: string;
  buildInfo?: BuildInfo;
}

// Build platform icons
export const getBuildPlatformIcon = (platform: BuildPlatform): string => {
  switch (platform) {
    case BuildPlatform.LOVABLE:
      return '💙';
    case BuildPlatform.VERCEL:
      return '▲';
    case BuildPlatform.RENDER:
      return '🟢';
    case BuildPlatform.NETLIFY:
      return '🟦';
    case BuildPlatform.MANUAL:
      return '🔧';
    default:
      return '❓';
  }
};

// Build status icons
export const getBuildStatusIcon = (status: BuildStatus): string => {
  switch (status) {
    case BuildStatus.SUCCESS:
      return '✅';
    case BuildStatus.FAILED:
      return '❌';
    case BuildStatus.BUILDING:
      return '🔄';
    case BuildStatus.PENDING:
      return '⏳';
    case BuildStatus.CANCELLED:
      return '⏹️';
    default:
      return '❓';
  }
};

interface RepositoryDashboardProps {
  repositories?: Repository[];
  onRefresh?: () => void;
}

export const RepositoryDashboard: React.FC<RepositoryDashboardProps> = ({ 
  repositories = [], 
  onRefresh 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    setLastUpdated(new Date().toLocaleString());
  }, [repositories]);

  const totalRepos = repositories.length || 43;
  const privateRepos = repositories.filter(r => r.private).length;
  const publicRepos = totalRepos - privateRepos;

  const filteredCategories = selectedCategory 
    ? REPOSITORY_CATEGORIES.filter(cat => cat.id === selectedCategory)
    : REPOSITORY_CATEGORIES;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">LD</span>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Repository Library
                </h1>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                Dashboard of Dashboards
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Last updated: {lastUpdated}
              </div>
              {onRefresh && (
                <button
                  onClick={onRefresh}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Refresh
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Repositories</p>
                <p className="text-3xl font-bold text-gray-900">{totalRepos}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📁</span>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600">↗ {publicRepos} public</span>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-gray-600">{privateRepos} private</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-3xl font-bold text-gray-900">{REPOSITORY_CATEGORIES.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-purple-600">✓ Organized structure</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Projects</p>
                <p className="text-3xl font-bold text-gray-900">28</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600">↗ Recently updated</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Build Platforms</p>
                <p className="text-3xl font-bold text-gray-900">4</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🏗️</span>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-orange-600">Vercel, Render, Lovable, Manual</span>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search repositories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {REPOSITORY_CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Repository Categories Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Repository Categories</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">{filteredCategories.length} categories</span>
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <CategoryCard 
                key={category.id} 
                category={category} 
                repositories={repositories}
              />
            ))}
          </div>
        </div>

        {/* Build Platform Overview */}
        <BuildPlatformOverview repositories={repositories} />
      </main>
    </div>
  );
};

// Category Card Component
const CategoryCard: React.FC<{ 
  category: typeof REPOSITORY_CATEGORIES[0], 
  repositories: Repository[] 
}> = ({ category, repositories }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {category.name}
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            {category.description}
          </p>
        </div>
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${category.color}`}>
          {category.count}
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        {category.repos.slice(0, 3).map((repoName) => {
          const repo = repositories.find(r => r.name === repoName);
          
          return (
            <div key={repoName} className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <span className="text-gray-700">{repoName}</span>
                <span className="text-xs text-gray-500">
                  {repo?.private ? '🔒' : '🌐'}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                {repo?.buildInfo && (
                  <>
                    <span className="text-xs" title={`Built with ${repo.buildInfo.platform}`}>
                      {getBuildPlatformIcon(repo.buildInfo.platform)}
                    </span>
                    <span className="text-xs" title={`Status: ${repo.buildInfo.status}`}>
                      {getBuildStatusIcon(repo.buildInfo.status)}
                    </span>
                    {repo.buildInfo.deploymentUrl && (
                      <a
                        href={repo.buildInfo.deploymentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:text-blue-700"
                        title={`Visit deployment: ${repo.buildInfo.deploymentUrl}`}
                      >
                        🔗
                      </a>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
        {category.count > 3 && (
          <div className="text-xs text-gray-500 ml-3">
            +{category.count - 3} more repositories
          </div>
        )}
      </div>

      <button className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700">
        View Category →
      </button>
    </div>
  );
};

// Build Platform Overview Component
const BuildPlatformOverview: React.FC<{ repositories: Repository[] }> = ({ repositories }) => {
  const platformCounts: Record<BuildPlatform, number> = {
    [BuildPlatform.LOVABLE]: 0,
    [BuildPlatform.VERCEL]: 0,
    [BuildPlatform.RENDER]: 0,
    [BuildPlatform.NETLIFY]: 0,
    [BuildPlatform.MANUAL]: 0,
    [BuildPlatform.UNKNOWN]: 0,
  };

  repositories.forEach(repo => {
    if (repo.buildInfo) {
      platformCounts[repo.buildInfo.platform]++;
    }
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Build Platform Distribution</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(platformCounts).map(([platform, count]) => (
          <div key={platform} className="text-center">
            <div className="text-2xl mb-2">
              {getBuildPlatformIcon(platform as BuildPlatform)}
            </div>
            <div className="text-sm font-medium text-gray-900">{platform}</div>
            <div className="text-lg font-bold text-gray-700">{count}</div>
            <div className="text-xs text-gray-500">
              {count === 1 ? 'repository' : 'repositories'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepositoryDashboard;