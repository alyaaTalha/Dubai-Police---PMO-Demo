import { useMemo, useState } from 'react';
import {
  ArrowLeft, Home, Layers, ChevronDown, FlaskConical, Lightbulb, BookOpen,
  Shield, Users, CheckSquare, FileText, Sparkles, Search, X,
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '../ui/utils';
import {
  INITIAL_PROJECTS, INITIAL_HISTORY, INITIAL_AUDIT, REPORTS, IP_REGISTER,
  type AuditEntry, type Project,
} from './sandboxData';
import { SANDBOX_PAGE_LABELS, type SandboxPage, type SandboxStore } from './SandboxStore';
import { SandboxHomePage } from './pages/SandboxHomePage';
import { ProjectTypePage } from './pages/ProjectTypePage';
import { IPRegisterPage } from './pages/IPRegisterPage';
import { PartnersPage } from './pages/PartnersPage';
import { EvaluationPage } from './pages/EvaluationPage';
import { ReportsPage } from './pages/ReportsPage';
import { AssistantPage } from './pages/AssistantPage';
import { SandboxProjectDetailsPage } from './pages/SandboxProjectDetailsPage';

interface SandboxPlatformShellProps {
  onBack?: () => void;
  setBreadcrumbs?: (crumbs: Array<{ label: string; onClick?: () => void }>) => void;
}

interface NavLeaf { id: SandboxPage; label: string; icon: React.ElementType; count?: (projects: Project[]) => number | undefined; }
interface NavGroup { id: string; label: string; leaf?: NavLeaf; children?: NavLeaf[]; }

export function SandboxPlatformShell({ onBack, setBreadcrumbs }: SandboxPlatformShellProps) {
  const [activePage, setActivePage] = useState<SandboxPage>('home');
  const [typesOpen, setTypesOpen] = useState(true);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [reports, setReports] = useState(REPORTS);
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [audit, setAudit] = useState<AuditEntry[]>(INITIAL_AUDIT);
  const [search, setSearch] = useState('');
  const [viewingProjectId, setViewingProjectId] = useState<string | null>(null);
  const [returnPage, setReturnPage] = useState<SandboxPage>('home');

  const addHistory = (entry: (typeof history)[number]) => setHistory(prev => [entry, ...prev]);
  const addAudit = (entry: Omit<AuditEntry, 'tm'>) => setAudit(prev => [{ ...entry, tm: 'Just now' }, ...prev]);

  const goHomeCrumb = { label: 'Home', onClick: onBack };
  const platformCrumb = () => ({
    label: 'Sandbox Platform',
    onClick: () => { setActivePage('home'); setBreadcrumbs?.([goHomeCrumb, { label: 'Sandbox Platform' }]); },
  });

  const handleNavigate = (page: SandboxPage) => {
    setActivePage(page);
    setBreadcrumbs?.([goHomeCrumb, platformCrumb(), { label: SANDBOX_PAGE_LABELS[page] }]);
  };

  const store: SandboxStore = {
    projects, setProjects, reports, setReports, history, addHistory, audit, addAudit,
    search, setSearch,
    openProject: (id) => {
      const project = projects.find(p => p.id === id);
      const backTo = activePage === 'project' ? returnPage : activePage;
      setReturnPage(backTo);
      setViewingProjectId(id);
      setActivePage('project');
      setBreadcrumbs?.([
        goHomeCrumb, platformCrumb(),
        { label: SANDBOX_PAGE_LABELS[backTo], onClick: () => handleNavigate(backTo) },
        { label: project?.name ?? 'Project Record' },
      ]);
    },
  };

  const navGroups: NavGroup[] = useMemo(() => [
    { id: 'overview', label: 'OVERVIEW', leaf: { id: 'home', label: 'Home', icon: Home } },
    {
      id: 'portfolio', label: 'PORTFOLIO',
      children: [
        { id: 'rd', label: 'Research & Development', icon: FlaskConical, count: (p) => p.filter(x => x.type === 'rd').length },
        { id: 'innovation', label: 'Innovation', icon: Lightbulb, count: (p) => p.filter(x => x.type === 'innov').length },
        { id: 'knowledge', label: 'Knowledge', icon: BookOpen, count: (p) => p.filter(x => x.type === 'know').length },
      ],
    },
  ], []);

  const highlightPage = activePage === 'project' ? returnPage : activePage;
  const viewingProject = projects.find(p => p.id === viewingProjectId) ?? null;

  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside className="w-60 bg-white border-r border-border flex flex-col h-full flex-shrink-0 overflow-hidden">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-4 py-2 text-[11px] text-muted-foreground hover:text-[#008755] border-b border-border bg-muted/30 w-full transition-colors"
          >
            <ArrowLeft className="h-3 w-3" />
            <span>Back to PMO</span>
          </button>
        )}

        <div className="px-4 py-3 border-b border-border bg-white">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#00a869] to-[#005844] flex items-center justify-center flex-shrink-0">
              <FlaskConical className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-['Dubai:Medium',_sans-serif] text-foreground leading-tight">Sandbox Platform</p>
              <p className="text-[11px] text-muted-foreground leading-tight">R&D · Innovation · Knowledge</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-3">
          {navGroups.map(group => (
            <div key={group.id}>
              <p className="text-[10px] font-['Dubai:Medium',_sans-serif] text-muted-foreground tracking-widest px-2 py-1 uppercase">
                {group.label}
              </p>
              <div className="space-y-0.5">
                {group.leaf && (
                  <NavButton item={group.leaf} isActive={highlightPage === group.leaf.id} projects={projects} onClick={() => handleNavigate(group.leaf!.id)} />
                )}
                {group.children && (
                  <>
                    <button
                      onClick={() => setTypesOpen(v => !v)}
                      className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm text-left text-foreground hover:bg-[#008755]/10 hover:text-[#008755] transition-colors"
                    >
                      <Layers className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                      <span className="flex-1 truncate font-['Dubai',_sans-serif]">Project Types</span>
                      <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', typesOpen && 'rotate-180')} />
                    </button>
                    {typesOpen && (
                      <div className="ml-4 pl-2.5 border-l border-border space-y-0.5">
                        {group.children.map(item => (
                          <NavButton key={item.id} item={item} isActive={highlightPage === item.id} projects={projects} onClick={() => handleNavigate(item.id)} compact />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}

          <div>
            <div className="space-y-0.5">
              <NavButton item={{ id: 'ip', label: 'Intellectual Property', icon: Shield, count: () => IP_REGISTER.length }} isActive={highlightPage === 'ip'} projects={projects} onClick={() => handleNavigate('ip')} />
              <NavButton item={{ id: 'partners', label: 'Partners', icon: Users, count: () => 9 }} isActive={highlightPage === 'partners'} projects={projects} onClick={() => handleNavigate('partners')} />
            </div>
          </div>

          <div>
            <p className="text-[10px] font-['Dubai:Medium',_sans-serif] text-muted-foreground tracking-widest px-2 py-1 uppercase">
              GOVERNANCE
            </p>
            <div className="space-y-0.5">
              <NavButton item={{ id: 'evaluation', label: 'Project Evaluation', icon: CheckSquare, count: (p) => p.filter(x => !x.evaluator).length }} isActive={highlightPage === 'evaluation'} projects={projects} onClick={() => handleNavigate('evaluation')} />
              <NavButton item={{ id: 'reports', label: 'Reports', icon: FileText }} isActive={highlightPage === 'reports'} projects={projects} onClick={() => handleNavigate('reports')} />
              <NavButton item={{ id: 'assistant', label: 'Virtual Assistant', icon: Sparkles }} isActive={highlightPage === 'assistant'} projects={projects} onClick={() => handleNavigate('assistant')} />
            </div>
          </div>
        </nav>

        <div className="mx-3 mb-3 rounded-lg bg-gradient-to-br from-[#008755] to-[#005844] p-3 text-white">
          <p className="text-xs font-['Dubai:Medium',_sans-serif] leading-snug mb-2">
            Register a new R&amp;D, Innovation or Knowledge project
          </p>
          <button
            onClick={() => { handleNavigate('rd'); toast.info('Use “New Project” on any portfolio page to register one.'); }}
            className="flex items-center gap-1 text-[11px] text-white/80 hover:text-white transition-colors"
          >
            + Add Project
          </button>
        </div>
      </aside>

      {/* ── Main ─────────────────────────────────────────────────────────── */}
      <main className="flex-1 overflow-auto bg-[#f8f9fb] flex flex-col">
        {activePage !== 'project' && (
          <div className="flex items-center gap-2 px-5 py-2.5 border-b border-border bg-white flex-shrink-0">
            <div className="relative max-w-sm w-full">
              <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects, patents, partners…"
                className="w-full pl-8 pr-7 py-1.5 rounded-lg border border-border bg-muted/30 text-xs focus:outline-none focus:ring-2 focus:ring-[#008755]/20 focus:border-[#008755] transition-colors"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        <div className="flex-1">
          {activePage === 'home' && <SandboxHomePage store={store} onNavigate={handleNavigate} />}
          {(activePage === 'rd' || activePage === 'innovation' || activePage === 'knowledge') && (
            <ProjectTypePage pageKey={activePage} store={store} onNavigate={handleNavigate} />
          )}
          {activePage === 'ip' && <IPRegisterPage store={store} />}
          {activePage === 'partners' && <PartnersPage store={store} />}
          {activePage === 'evaluation' && <EvaluationPage store={store} />}
          {activePage === 'reports' && <ReportsPage store={store} />}
          {activePage === 'assistant' && <AssistantPage store={store} />}
          {activePage === 'project' && viewingProject && (
            <SandboxProjectDetailsPage
              project={viewingProject}
              store={store}
              onBack={() => handleNavigate(returnPage)}
              onNavigate={handleNavigate}
            />
          )}
        </div>
      </main>
    </div>
  );
}

function NavButton({ item, isActive, projects, onClick, compact }: {
  item: NavLeaf; isActive: boolean; projects: Project[]; onClick: () => void; compact?: boolean;
}) {
  const Icon = item.icon;
  const count = item.count?.(projects);
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-2.5 rounded-md text-sm transition-colors text-left',
        compact ? 'px-2.5 py-1.5 text-[13px]' : 'px-2.5 py-1.5',
        isActive ? 'bg-[#008755] text-white' : 'text-foreground hover:bg-[#008755]/10 hover:text-[#008755]',
      )}
    >
      <Icon className={cn('h-4 w-4 flex-shrink-0', isActive ? 'text-white' : 'text-muted-foreground')} />
      <span className={cn('flex-1 truncate font-["Dubai",_sans-serif]', isActive && 'font-["Dubai:Medium",_sans-serif]')}>{item.label}</span>
      {count !== undefined && (
        <span className={cn('text-[10px] font-semibold rounded-full px-1.5 py-0.5', isActive ? 'bg-white/20 text-white' : 'bg-muted text-muted-foreground')}>
          {count}
        </span>
      )}
    </button>
  );
}
