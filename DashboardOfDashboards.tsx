// Dashboard of Dashboards - Main Integration Component for Lovable.dev
// Central hub for all repository and project dashboards

import React, { useState, useEffect } from 'react';
import { RepositoryDashboard, Repository, BuildPlatform, BuildStatus } from './RepositoryDashboard';

interface DashboardMetrics {
  totalProjects: number;
  activeBuilds: number;
  failedBuilds: number;
  successRate: number;
  lastUpdated: string;
}

interface DashboardSection {
  id: string;
  title: string;
  icon: string;
  description: string;
  url?: string;
  metrics?: {
    label: string;
    value: string | number;
    trend?: 'up' | 'down' | 'stable';
  }[];
}

const DASHBOARD_SECTIONS: DashboardSection[] = [
  {
    id: 'repositories',
    title: 'Repository Library',
    icon: '📚',
    description: 'Complete overview of all 43 repositories across 9 categories',
    metrics: [
      { label: 'Total Repos', value: 43, trend: 'up' },
      { label: 'Categories', value: 9, trend: 'stable' },
      { label: 'Active', value: 28, trend: 'up' }
    ]
  },
  {
    id: 'build-monitor',
    title: 'Build Monitor',
    icon: '🏗️',
    description: 'Real-time build status across Vercel, Render, and Lovable platforms',
    url: 'https://repo-lens-djb258.vercel.app/api/build-status',
    metrics: [
      { label: 'Success Rate', value: '92%', trend: 'up' },
      { label: 'Active Builds', value: 3, trend: 'stable' },
      { label: 'Platforms', value: 4, trend: 'stable' }
    ]
  },
  {
    id: 'agent-diagnostics',
    title: 'Agent Diagnostics',
    icon: '🤖',
    description: 'HEIR system status and agent orchestration monitoring',
    url: 'https://repo-lens-djb258.vercel.app',
    metrics: [
      { label: 'Active Agents', value: 12, trend: 'up' },
      { label: 'Tasks', value: 5, trend: 'down' },
      { label: 'Auto-Resolution', value: '85%', trend: 'up' }
    ]
  },
  {
    id: 'client-systems',
    title: 'Client Systems',
    icon: '👥',
    description: 'Client intake, enrollment, and management systems',
    metrics: [
      { label: 'Active Clients', value: 152, trend: 'up' },
      { label: 'Enrollments', value: 23, trend: 'up' },
      { label: 'Completion', value: '78%', trend: 'stable' }
    ]
  },
  {
    id: 'data-pipeline',
    title: 'Data Pipeline',
    icon: '🔄',
    description: 'DeerFlow, Firebase sync, and data processing status',
    metrics: [
      { label: 'Records/Day', value: '12K', trend: 'up' },
      { label: 'Sync Status', value: 'Active', trend: 'stable' },
      { label: 'Errors', value: 0, trend: 'stable' }
    ]
  },
  {
    id: 'blueprints',
    title: 'Blueprint System',
    icon: '📐',
    description: 'Architecture standards, ORBT doctrine, and Barton compliance',
    url: 'https://repo-lens-djb258.vercel.app/barton-dashboard',
    metrics: [
      { label: 'Compliance', value: '96%', trend: 'up' },
      { label: 'Blueprints', value: 42, trend: 'stable' },
      { label: 'Violations', value: 2, trend: 'down' }
    ]
  }
];

export const DashboardOfDashboards: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalProjects: 43,
    activeBuilds: 0,
    failedBuilds: 0,
    successRate: 92,
    lastUpdated: new Date().toISOString()
  });
  const [selectedView, setSelectedView] = useState<'grid' | 'repository'>('grid');
  const [loading, setLoading] = useState(true);

  // Simulate fetching repository data
  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        // In production, this would fetch from your GitHub API
        // For now, we'll create sample data
        const sampleRepos: Repository[] = [
          {
            name: 'repo-lens',
            full_name: 'djb258/repo-lens',
            description: 'Agent diagnostic center with HEIR integration',
            private: false,
            stars: 12,
            language: 'TypeScript',
            updated_at: new Date().toISOString(),
            buildInfo: {
              platform: BuildPlatform.VERCEL,
              status: BuildStatus.SUCCESS,
              deploymentUrl: 'https://repo-lens-djb258.vercel.app'
            }
          },
          {
            name: 'hivemind-command-center',
            full_name: 'djb258/hivemind-command-center',
            description: 'Central command and control system',
            private: true,
            stars: 8,
            language: 'TypeScript',
            updated_at: new Date().toISOString(),
            buildInfo: {
              platform: BuildPlatform.LOVABLE,
              status: BuildStatus.SUCCESS,
              deploymentUrl: 'https://hivemind.lovable.dev'
            }
          },
          // Add more repositories as needed
        ];

        setRepositories(sampleRepos);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch repositories:', error);
        setLoading(false);
      }
    };

    fetchRepositories();
    
    // Refresh every 5 minutes
    const interval = setInterval(fetchRepositories, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setMetrics({
      ...metrics,
      lastUpdated: new Date().toISOString()
    });
  };

  const getTrendIcon = (trend?: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      case 'stable': return '→';
      default: return '';
    }
  };

  const getTrendColor = (trend?: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-gray-600';
      default: return 'text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Dashboard of Dashboards...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Main Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-lg font-bold">DD</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Dashboard of Dashboards
                  </h1>
                  <p className="text-xs text-gray-600">Lovable.dev Central Command</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-sm text-gray-600">Live</span>
              </div>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setSelectedView('grid')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    selectedView === 'grid' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Dashboard Grid
                </button>
                <button
                  onClick={() => setSelectedView('repository')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    selectedView === 'repository' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Repository View
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {selectedView === 'grid' ? (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wider">Total Projects</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{metrics.totalProjects}</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-lg">📊</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wider">Active Builds</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">{metrics.activeBuilds}</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-lg">🚀</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wider">Failed Builds</p>
                  <p className="text-2xl font-bold text-red-600 mt-1">{metrics.failedBuilds}</p>
                </div>
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-lg">⚠️</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wider">Success Rate</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{metrics.successRate}%</p>
                </div>
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-lg">✨</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DASHBOARD_SECTIONS.map((section) => (
              <div 
                key={section.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="text-3xl">{section.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                    </div>
                  </div>
                </div>

                {section.metrics && (
                  <div className="space-y-3 mb-4">
                    {section.metrics.map((metric, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{metric.label}</span>
                        <div className="flex items-center space-x-1">
                          <span className="text-sm font-medium text-gray-900">{metric.value}</span>
                          {metric.trend && (
                            <span className={`text-xs ${getTrendColor(metric.trend)}`}>
                              {getTrendIcon(metric.trend)}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {section.url ? (
                  <a
                    href={section.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    Open Dashboard →
                  </a>
                ) : (
                  <button className="inline-flex items-center text-sm font-medium text-gray-400 cursor-not-allowed">
                    Coming Soon
                  </button>
                )}
              </div>
            ))}
          </div>
        </main>
      ) : (
        <RepositoryDashboard 
          repositories={repositories} 
          onRefresh={handleRefresh}
        />
      )}
    </div>
  );
};

export default DashboardOfDashboards;