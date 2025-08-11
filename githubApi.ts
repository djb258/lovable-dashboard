// GitHub API Integration for Lovable Dashboard
// Fetches repository data and build information

import { Repository, BuildPlatform, BuildStatus, BuildInfo } from './RepositoryDashboard';

interface GitHubRepo {
  name: string;
  full_name: string;
  description: string | null;
  private: boolean;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  homepage?: string | null;
  topics?: string[];
}

// Build platform detection based on repository metadata
const detectBuildPlatform = (repo: GitHubRepo): BuildPlatform => {
  const name = repo.name.toLowerCase();
  const topics = repo.topics || [];
  
  // Check for specific platform indicators
  if (topics.includes('vercel') || name.includes('vercel')) {
    return BuildPlatform.VERCEL;
  }
  if (topics.includes('render') || name.includes('render')) {
    return BuildPlatform.RENDER;
  }
  if (topics.includes('lovable') || name.includes('lovable')) {
    return BuildPlatform.LOVABLE;
  }
  if (topics.includes('netlify') || name.includes('netlify')) {
    return BuildPlatform.NETLIFY;
  }
  
  // Check for known patterns
  if (name.includes('dashboard') || name.includes('ui')) {
    return BuildPlatform.LOVABLE;
  }
  if (name.includes('api') || name.includes('backend')) {
    return BuildPlatform.RENDER;
  }
  
  return BuildPlatform.UNKNOWN;
};

// Map specific repositories to their deployment URLs
const DEPLOYMENT_URLS: Record<string, string> = {
  'repo-lens': 'https://repo-lens-djb258.vercel.app',
  'hivemind-command-center': 'https://hivemind.lovable.dev',
  'mapping-agent': 'https://mapping-agent-djb258.vercel.app',
  'command-center': 'https://command-center.lovable.dev',
  // Add more mappings as needed
};

export class GitHubAPI {
  private token?: string;
  private baseUrl = 'https://api.github.com';

  constructor(token?: string) {
    this.token = token;
  }

  private async makeRequest(endpoint: string): Promise<any> {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };

    if (this.token) {
      headers['Authorization'] = `token ${this.token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, { headers });
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getUserRepositories(username: string = 'djb258'): Promise<Repository[]> {
    try {
      // Fetch all repositories for the user
      const repos: GitHubRepo[] = await this.makeRequest(`/users/${username}/repos?per_page=100`);
      
      // If authenticated, also fetch private repos
      if (this.token) {
        const privateRepos: GitHubRepo[] = await this.makeRequest('/user/repos?type=all&per_page=100');
        repos.push(...privateRepos.filter(r => !repos.find(existing => existing.full_name === r.full_name)));
      }

      // Transform GitHub repos to our Repository format
      return repos.map(repo => ({
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description || undefined,
        private: repo.private,
        stars: repo.stargazers_count,
        language: repo.language || undefined,
        updated_at: repo.updated_at,
        buildInfo: this.getBuildInfo(repo)
      }));
    } catch (error) {
      console.error('Failed to fetch GitHub repositories:', error);
      return [];
    }
  }

  private getBuildInfo(repo: GitHubRepo): BuildInfo | undefined {
    const platform = detectBuildPlatform(repo);
    const deploymentUrl = DEPLOYMENT_URLS[repo.name] || repo.homepage || undefined;

    // Skip if no build platform detected
    if (platform === BuildPlatform.UNKNOWN && !deploymentUrl) {
      return undefined;
    }

    return {
      platform,
      status: BuildStatus.SUCCESS, // Default to success, will be updated by real-time API
      deploymentUrl,
      lastBuild: repo.updated_at
    };
  }

  async getRepositoryDetails(owner: string, repo: string): Promise<Repository | null> {
    try {
      const repoData: GitHubRepo = await this.makeRequest(`/repos/${owner}/${repo}`);
      
      return {
        name: repoData.name,
        full_name: repoData.full_name,
        description: repoData.description || undefined,
        private: repoData.private,
        stars: repoData.stargazers_count,
        language: repoData.language || undefined,
        updated_at: repoData.updated_at,
        buildInfo: this.getBuildInfo(repoData)
      };
    } catch (error) {
      console.error(`Failed to fetch repository ${owner}/${repo}:`, error);
      return null;
    }
  }

  async getOrganizationRepositories(org: string): Promise<Repository[]> {
    try {
      const repos: GitHubRepo[] = await this.makeRequest(`/orgs/${org}/repos?per_page=100`);
      
      return repos.map(repo => ({
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description || undefined,
        private: repo.private,
        stars: repo.stargazers_count,
        language: repo.language || undefined,
        updated_at: repo.updated_at,
        buildInfo: this.getBuildInfo(repo)
      }));
    } catch (error) {
      console.error(`Failed to fetch organization ${org} repositories:`, error);
      return [];
    }
  }
}

// Build Status API Integration
export class BuildStatusAPI {
  private vercelUrl = 'https://repo-lens-djb258.vercel.app/api/build-status';

  async fetchBuildStatus(platform?: string, repository?: string): Promise<any> {
    try {
      const params = new URLSearchParams();
      if (platform) params.append('platform', platform);
      if (repository) params.append('repository', repository);
      params.append('refresh', 'true');

      const response = await fetch(`${this.vercelUrl}?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`Build API error: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Failed to fetch build status:', error);
      return null;
    }
  }

  async updateRepositoryBuildInfo(repositories: Repository[]): Promise<Repository[]> {
    try {
      const buildData = await this.fetchBuildStatus('all');
      
      if (!buildData || !buildData.success) {
        return repositories;
      }

      // Map build data to repositories
      const buildMap = new Map<string, any>();
      buildData.builds?.forEach((build: any) => {
        const repoName = build.repository.split('/').pop();
        if (!buildMap.has(repoName) || 
            new Date(build.build_timestamp) > new Date(buildMap.get(repoName).build_timestamp)) {
          buildMap.set(repoName, build);
        }
      });

      // Update repository build info
      return repositories.map(repo => {
        const buildInfo = buildMap.get(repo.name);
        if (buildInfo) {
          return {
            ...repo,
            buildInfo: {
              platform: buildInfo.build_platform as BuildPlatform,
              status: buildInfo.build_status as BuildStatus,
              deploymentUrl: buildInfo.deployment_url || buildInfo.preview_url,
              lastBuild: buildInfo.build_timestamp
            }
          };
        }
        return repo;
      });
    } catch (error) {
      console.error('Failed to update build info:', error);
      return repositories;
    }
  }
}

// Export singleton instances
export const githubAPI = new GitHubAPI(process.env.NEXT_PUBLIC_GITHUB_TOKEN);
export const buildStatusAPI = new BuildStatusAPI();