import { useState, useCallback } from 'react';
import { Header } from './components/shared/Header';
import { Footer } from './components/shared/Footer';
import { HomePage } from './components/shared/HomePage';
import { StrategyDashboard } from './components/strategy/StrategyDashboard';
import { PerformanceDashboard } from './components/performance/PerformanceDashboard';
import { ScorecardsPage } from './components/performance/ScorecardsPage';
import { PartnershipDashboard } from './components/partnership/PartnershipDashboard';
import { VocDashboard } from './components/voc/VocDashboard';
import { PortfolioDashboard } from './components/portfolio/PortfolioDashboard';
import { SystemAdministrationPage } from './components/admin/SystemAdministrationPage';
import { IdeasPlatformShell, type IdeaOriginProject } from './components/ideas/IdeasPlatformShell';
import { SandboxPlatformShell } from './components/sandbox/SandboxPlatformShell';
import Sidebar from './imports/Sidebar';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [currentView, setCurrentView] = useState<
    'strategy' | 'performance' | 'scorecards' | 'home' | 'partnership' |
    'voc' | 'portfolio' | 'system-admin' | 'ideas-platform' | 'sandbox-platform'
  >('home');
  const [selectedDivisionId, setSelectedDivisionId] = useState<string | undefined>(undefined);
  const [breadcrumbs, setBreadcrumbs] = useState<Array<{ label: string; onClick?: () => void }>>([{ label: 'Home' }]);
  const [convertedProjects, setConvertedProjects] = useState<IdeaOriginProject[]>([]);
  const [initialIdeasPage, setInitialIdeasPage] = useState<string>('home');

  const handleConvertToProject = useCallback((project: IdeaOriginProject) => {
    setConvertedProjects(prev => [...prev, project]);
  }, []);

  const navigateToIdeasPage = useCallback((page: string) => {
    setInitialIdeasPage(page);
    setCurrentView('ideas-platform');
    setBreadcrumbs([
      { label: 'Home', onClick: () => { setCurrentView('home'); setBreadcrumbs([{ label: 'Home' }]); } },
      { label: 'Ideas Platform' },
    ]);
  }, []);

  const handleNavigate = (view: 'strategy' | 'performance' | 'scorecards', divisionId?: string) => {
    setCurrentView(view);
    setSelectedDivisionId(divisionId);
  };

  const handleNavigateHome = useCallback(() => {
    setCurrentView('home');
  }, []);

  const handleSetBreadcrumbs = useCallback((crumbs: Array<{ label: string; onClick?: () => void }>) => {
    setBreadcrumbs(crumbs);
  }, []);

  const updateBreadcrumbsForView = useCallback((view: typeof currentView) => {
    const home = { label: 'Home', onClick: () => setCurrentView('home') };
    const map: Partial<Record<typeof currentView, Array<{ label: string; onClick?: () => void }>>> = {
      home:           [{ label: 'Home' }],
      strategy:       [home, { label: 'Strategy', onClick: () => setCurrentView('strategy') }, { label: 'Dashboard' }],
      scorecards:     [home, { label: 'Performance', onClick: () => setCurrentView('performance') }, { label: 'Scorecards' }],
      partnership:    [home, { label: 'Partnership', onClick: () => setCurrentView('partnership') }, { label: 'Dashboard' }],
      voc:            [home, { label: 'VOC', onClick: () => setCurrentView('voc') }, { label: 'Dashboard' }],
      portfolio:      [home, { label: 'Portfolio', onClick: () => setCurrentView('portfolio') }, { label: 'Dashboard' }],
      'system-admin': [home, { label: 'System Administration' }],
      'ideas-platform': [home, { label: 'Ideas Platform' }],
      'sandbox-platform': [home, { label: 'Sandbox Platform' }],
    };
    if (map[view]) setBreadcrumbs(map[view]!);
    // 'performance' breadcrumbs are managed by PerformanceDashboard itself
  }, []);

  const handlePortfolioNavigate = useCallback((view: 'strategy' | 'performance' | 'scorecards' | 'portfolio') => {
    setCurrentView(view);
    updateBreadcrumbsForView(view);
  }, [updateBreadcrumbsForView]);

  const handleHeaderNavigate = useCallback((view: string) => {
    if (view === 'system-admin' || view === 'ideas-platform' || view === 'sandbox-platform') {
      setCurrentView(view as typeof currentView);
      updateBreadcrumbsForView(view as typeof currentView);
    }
  }, [updateBreadcrumbsForView]);

  const goHome = useCallback(() => {
    setCurrentView('home');
    setInitialIdeasPage('home');
    updateBreadcrumbsForView('home');
  }, [updateBreadcrumbsForView]);

  const navigateToPortfolio = useCallback(() => {
    setCurrentView('portfolio');
    updateBreadcrumbsForView('portfolio');
  }, [updateBreadcrumbsForView]);

  return (
    <div className="h-screen w-screen bg-background flex flex-col overflow-hidden">
      {/* Shared header — same for ALL views including Ideas Platform */}
      <div className="w-full flex-shrink-0">
        <Header breadcrumbs={breadcrumbs} onNavigate={handleHeaderNavigate} />
      </div>

      {/* Content row */}
      <div className="flex-1 flex overflow-hidden">
        {/* PMO global sidebar (returns null — kept for structural parity) */}
        <div className="flex-shrink-0 h-full">
          <Sidebar />
        </div>

        <main className="flex-1 overflow-hidden">
          {currentView === 'home' ? (
            <HomePage onNavigate={(view) => {
              setCurrentView(view as typeof currentView);
              updateBreadcrumbsForView(view as typeof currentView);
            }} />
          ) : currentView === 'ideas-platform' ? (
            <IdeasPlatformShell
              key={initialIdeasPage}
              setBreadcrumbs={handleSetBreadcrumbs}
              onBack={goHome}
              onConvertToProject={handleConvertToProject}
              onNavigateToPortfolio={navigateToPortfolio}
              initialPage={initialIdeasPage}
            />
          ) : currentView === 'sandbox-platform' ? (
            <SandboxPlatformShell
              onBack={goHome}
              setBreadcrumbs={handleSetBreadcrumbs}
            />
          ) : currentView === 'strategy' ? (
            <StrategyDashboard onNavigateToIdeas={navigateToIdeasPage} />
          ) : currentView === 'scorecards' ? (
            <ScorecardsPage divisionId={selectedDivisionId} />
          ) : currentView === 'partnership' ? (
            <PartnershipDashboard onNavigate={(view) => { setCurrentView(view); updateBreadcrumbsForView(view); }} />
          ) : currentView === 'voc' ? (
            <VocDashboard onNavigate={(view) => { setCurrentView(view); updateBreadcrumbsForView(view); }} />
          ) : currentView === 'portfolio' ? (
            <PortfolioDashboard onNavigate={handlePortfolioNavigate} setBreadcrumbs={handleSetBreadcrumbs} convertedProjects={convertedProjects} onNavigateToIdeas={navigateToIdeasPage} />
          ) : currentView === 'system-admin' ? (
            <SystemAdministrationPage
              onBack={goHome}
              setBreadcrumbs={handleSetBreadcrumbs}
            />
          ) : (
            <PerformanceDashboard
              onNavigate={handleNavigate}
              setBreadcrumbs={handleSetBreadcrumbs}
              onNavigateHome={handleNavigateHome}
            />
          )}
        </main>
      </div>

      {/* Shared footer */}
      <Footer />
      <Toaster />
    </div>
  );
}
