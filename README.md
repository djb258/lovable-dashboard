# Lovable Dashboard - Dashboard of Dashboards

## Overview
The Lovable Dashboard is your central command center for managing and monitoring all 43 repositories across 9 categories. This is the "Dashboard of Dashboards" that provides a unified view of your entire development ecosystem.

## Features

### 📚 Repository Library
- Complete overview of all 43 repositories
- Organized into 9 distinct categories
- Real-time GitHub integration
- Private/public repository indicators
- Quick search and filtering

### 🏗️ Build Platform Monitoring
- **Lovable.dev** - UI dashboards and interfaces
- **Vercel** - Frontend deployments
- **Render** - Backend services
- **Manual** - Local builds
- Real-time build status tracking
- Deployment URL management

### 📊 Dashboard Sections

1. **Repository Library** - Browse and manage all repositories
2. **Build Monitor** - Real-time build status across platforms
3. **Agent Diagnostics** - HEIR system monitoring (via repo-lens)
4. **Client Systems** - Client management dashboards
5. **Data Pipeline** - DeerFlow and data sync status
6. **Blueprint System** - Architecture compliance monitoring

## Repository Categories

### 🏗️ Command & Orchestration (4 repos)
- hivemind-command-center
- HEIR-AGENT-SYSTEM
- command-center
- factfinder-flow-orchestrator

### 🤖 AI & Automation (8 repos)
- QA-Agent
- mapping-agent
- buyer-intent-tool
- MemOS
- chatgbt-cursor
- chatgbt-commander-cli
- Dataworkflowsagents
- screenpipe-mindpal

### 🔍 Analysis & Intelligence (3 repos)
- repo-lens (now Agent Diagnostic Center)
- repo-sight-unveiled
- mapping-app-orbt

### 🏛️ Architecture & Standards (4 repos)
- ulimate-blueprint-pilot
- blueprint-pilot-console
- altitude-forge-frame
- cursor-blueprint-enforcer

### 💾 Data & Infrastructure (8 repos)
- Db-connection
- Render-for-DB
- Firebase-Sync
- ingest-companies-people
- render-endpoint
- deerflow_render_starter
- deer-flow
- Fastapi-Deerflow

### 🎓 Business & Client Systems (5 repos)
- client
- client-intake-system
- student-master-track
- new-client-setup
- dave-enrollment-skeletons

### 🕷️ Data Collection (3 repos)
- scraping-tool
- screenpipe
- screenpipe-mindpal

### 🔧 Utilities & Tools (5 repos)
- shell-template
- ping-pong-master
- weewee-def-update
- gk-cli
- ia-template

### 🐛 Management & Tracking (4 repos)
- mantisbt
- Mantisbt-render-ready
- mapping-app-orbt
- doctrine-sniper-command-tool

## Integration with repo-lens

The Lovable Dashboard works in conjunction with the **repo-lens Agent Diagnostic Center** on Vercel:

- **Lovable Dashboard**: Repository management, visual overview, metrics
- **repo-lens (Vercel)**: Agent diagnostics, error analysis, automated problem-solving

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/djb258/lovable-dashboard.git
   cd lovable-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_GITHUB_TOKEN=your_github_token_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:3000`

## Architecture

```
lovable-dashboard/
├── DashboardOfDashboards.tsx   # Main dashboard component
├── RepositoryDashboard.tsx     # Repository library component
├── githubApi.ts                # GitHub API integration
├── package.json                # Dependencies
└── README.md                   # Documentation
```

## API Integration

### GitHub API
- Fetches repository data from GitHub
- Supports both public and private repositories
- Real-time updates every 5 minutes

### Build Status API
- Connects to repo-lens Vercel deployment
- Fetches real-time build data from Vercel and Render
- Updates build status and deployment URLs

## Deployment

This dashboard is designed to be deployed on **Lovable.dev**:

1. Push to GitHub
2. Connect repository to Lovable.dev
3. Configure environment variables
4. Deploy

## Future Enhancements

- [ ] Real-time WebSocket updates
- [ ] Advanced filtering and search
- [ ] Build history charts
- [ ] Custom dashboard widgets
- [ ] Team collaboration features
- [ ] Automated deployment triggers
- [ ] Performance metrics tracking
- [ ] Cost analysis per platform

## License

MIT

## Support

For issues or questions, please open an issue on GitHub or contact the maintainer.