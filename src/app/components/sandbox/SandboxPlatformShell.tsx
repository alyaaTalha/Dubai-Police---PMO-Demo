import { useEffect, useMemo, useState } from 'react';
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
import { useLanguage } from '../../i18n/LanguageContext';
import { useSandboxTr } from './sandboxI18n';

interface SandboxPlatformShellProps {
  onBack?: () => void;
  setBreadcrumbs?: (crumbs: Array<{ label: string; onClick?: () => void }>) => void;
  /** Page to open on first render (defaults to the platform home). */
  initialPage?: SandboxPage;
}

interface NavLeaf { id: SandboxPage; label: string; icon: React.ElementType; count?: (projects: Project[]) => number | undefined; }
interface NavGroup { id: string; label: string; leaf?: NavLeaf; children?: NavLeaf[]; }

/** Describes the current breadcrumb trail so it can be rebuilt (translated) when the language changes. */
type CrumbSpec =
  | { kind: 'platform' }
  | { kind: 'page'; page: SandboxPage }
  | { kind: 'project'; backTo: SandboxPage; projectId: string };

export function SandboxPlatformShell({ onBack, setBreadcrumbs, initialPage = 'home' }: SandboxPlatformShellProps) {
  const [activePage, setActivePage] = useState<SandboxPage>(initialPage);
  const [typesOpen, setTypesOpen] = useState(true);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [reports, setReports] = useState(REPORTS);
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [audit, setAudit] = useState<AuditEntry[]>(INITIAL_AUDIT);
  const [search, setSearch] = useState('');
  const [viewingProjectId, setViewingProjectId] = useState<string | null>(null);
  const [returnPage, setReturnPage] = useState<SandboxPage>('home');
  const [crumbSpec, setCrumbSpec] = useState<CrumbSpec | null>(
    initialPage === 'home' ? null : { kind: 'page', page: initialPage },
  );
  const { tr, lang } = useLanguage();
  const ts = useSandboxTr();

  const addHistory = (entry: (typeof history)[number]) => setHistory(prev => [entry, ...prev]);
  const addAudit = (entry: Omit<AuditEntry, 'tm'>) => setAudit(prev => [{ ...entry, tm: 'Just now' }, ...prev]);

  const handleNavigate = (page: SandboxPage) => {
    setActivePage(page);
    setCrumbSpec({ kind: 'page', page });
  };

  // Rebuild breadcrumbs whenever the trail or the language changes, so labels are always translated.
  useEffect(() => {
    if (!crumbSpec || !setBreadcrumbs) return;
    const goHomeCrumb = { label: tr('Home', 'الرئيسية'), onClick: onBack };
    const platformLabel = tr('Sandbox Platform', 'منصة المشاريع');
    const platformCrumb = {
      label: platformLabel,
      onClick: () => { setActivePage('home'); setCrumbSpec({ kind: 'platform' }); },
    };
    if (crumbSpec.kind === 'platform') {
      setBreadcrumbs([goHomeCrumb, { label: platformLabel }]);
    } else if (crumbSpec.kind === 'page') {
      setBreadcrumbs([goHomeCrumb, platformCrumb, { label: ts(SANDBOX_PAGE_LABELS[crumbSpec.page]) }]);
    } else {
      const project = projects.find(p => p.id === crumbSpec.projectId);
      const backTo = crumbSpec.backTo;
      setBreadcrumbs([
        goHomeCrumb, platformCrumb,
        { label: ts(SANDBOX_PAGE_LABELS[backTo]), onClick: () => { setActivePage(backTo); setCrumbSpec({ kind: 'page', page: backTo }); } },
        { label: project ? ts(project.name) : tr('Project Record', 'سجل المشروع') },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crumbSpec, lang, tr, ts, projects]);

  const store: SandboxStore = {
    projects, setProjects, reports, setReports, history, addHistory, audit, addAudit,
    search, setSearch,
    openProject: (id) => {
      const backTo = activePage === 'project' ? returnPage : activePage;
      setReturnPage(backTo);
      setViewingProjectId(id);
      setActivePage('project');
      setCrumbSpec({ kind: 'project', backTo, projectId: id });
    },
  };

  const navGroups: NavGroup[] = useMemo(() => [
    { id: 'overview', label: tr('OVERVIEW', 'نظرة عامة'), leaf: { id: 'home', label: tr('Home', 'الرئيسية'), icon: Home } },
    {
      id: 'portfolio', label: tr('PORTFOLIO', 'المحفظة'),
      children: [
        { id: 'rd', label: tr('Research & Development', 'البحث والتطوير'), icon: FlaskConical, count: (p) => p.filter(x => x.type === 'rd').length },
        { id: 'innovation', label: tr('Innovation', 'الابتكار'), icon: Lightbulb, count: (p) => p.filter(x => x.type === 'innov').length },
        { id: 'knowledge', label: tr('Knowledge', 'المعرفة'), icon: BookOpen, count: (p) => p.filter(x => x.type === 'know').length },
      ],
    },
  ], [tr]);

  const highlightPage = activePage === 'project' ? returnPage : activePage;
  const viewingProject = projects.find(p => p.id === viewingProjectId) ?? null;

  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside className="w-60 bg-white border-e border-border flex flex-col h-full flex-shrink-0 overflow-hidden">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-4 py-2 text-[11px] text-muted-foreground hover:text-[#008755] border-b border-border bg-muted/30 w-full transition-colors"
          >
            <ArrowLeft className="h-3 w-3 rtl:rotate-180" />
            <span>{tr('Back to PMO', 'العودة إلى مكتب إدارة المشاريع')}</span>
          </button>
        )}

        <div className="px-4 py-3 border-b border-border bg-white">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#00a869] to-[#005844] flex items-center justify-center flex-shrink-0">
              <FlaskConical className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm   text-foreground leading-tight">{tr('Sandbox Platform', 'منصة المشاريع')}</p>
              <p className="text-[11px] text-muted-foreground leading-tight">{tr('R&D · Innovation · Knowledge', 'البحث والتطوير · الابتكار · المعرفة')}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-3">
          {navGroups.map(group => (
            <div key={group.id}>
              <p className="text-[10px]   text-muted-foreground tracking-widest px-2 py-1 uppercase">
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
                      className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm text-start text-foreground hover:bg-[#008755]/10 hover:text-[#008755] transition-colors"
                    >
                      <Layers className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                      <span className="flex-1 truncate font-['Dubai',_sans-serif]">{tr('Project Types', 'أنواع المشاريع')}</span>
                      <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', typesOpen && 'rotate-180')} />
                    </button>
                    {typesOpen && (
                      <div className="ms-4 ps-2.5 border-s border-border space-y-0.5">
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
              <NavButton item={{ id: 'ip', label: tr('Intellectual Property', 'الملكية الفكرية'), icon: Shield, count: () => IP_REGISTER.length }} isActive={highlightPage === 'ip'} projects={projects} onClick={() => handleNavigate('ip')} />
              <NavButton item={{ id: 'partners', label: tr('Partners', 'الشركاء'), icon: Users, count: () => 9 }} isActive={highlightPage === 'partners'} projects={projects} onClick={() => handleNavigate('partners')} />
            </div>
          </div>

          <div>
            <p className="text-[10px]   text-muted-foreground tracking-widest px-2 py-1 uppercase">
              {tr('GOVERNANCE', 'الحوكمة')}
            </p>
            <div className="space-y-0.5">
              <NavButton item={{ id: 'evaluation', label: tr('Project Evaluation', 'تقييم المشاريع'), icon: CheckSquare, count: (p) => p.filter(x => !x.evaluator).length }} isActive={highlightPage === 'evaluation'} projects={projects} onClick={() => handleNavigate('evaluation')} />
              <NavButton item={{ id: 'reports', label: tr('Reports', 'التقارير'), icon: FileText }} isActive={highlightPage === 'reports'} projects={projects} onClick={() => handleNavigate('reports')} />
              <NavButton item={{ id: 'assistant', label: tr('Virtual Assistant', 'المساعد الافتراضي'), icon: Sparkles }} isActive={highlightPage === 'assistant'} projects={projects} onClick={() => handleNavigate('assistant')} />
            </div>
          </div>
        </nav>

        <div className="mx-3 mb-3 rounded-lg bg-gradient-to-br from-[#008755] to-[#005844] p-3 text-white">
          <p className="text-xs   leading-snug mb-2">
            {tr('Register a new R&D, Innovation or Knowledge project', 'سجّل مشروعاً جديداً للبحث والتطوير أو الابتكار أو المعرفة')}
          </p>
          <button
            onClick={() => { handleNavigate('rd'); toast.info(tr('Use “New Project” on any portfolio page to register one.', 'استخدم «مشروع جديد» في أي صفحة من صفحات المحفظة لتسجيل مشروع.')); }}
            className="flex items-center gap-1 text-[11px] text-white/80 hover:text-white transition-colors"
          >
            + {tr('Add Project', 'إضافة مشروع')}
          </button>
        </div>
      </aside>

      {/* ── Main ─────────────────────────────────────────────────────────── */}
      <main className="flex-1 overflow-auto bg-[#f8f9fb] flex flex-col">
        {activePage !== 'project' && (
          <div className="flex items-center gap-2 px-5 py-2.5 border-b border-border bg-white flex-shrink-0">
            <div className="relative max-w-sm w-full">
              <Search className="h-3.5 w-3.5 absolute start-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={tr('Search projects, patents, partners…', 'ابحث في المشاريع وبراءات الاختراع والشركاء…')}
                className="w-full ps-8 pe-7 py-1.5 rounded-lg border border-border bg-muted/30 text-xs focus:outline-none focus:ring-2 focus:ring-[#008755]/20 focus:border-[#008755] transition-colors"
              />
              {search && (
                <button onClick={() => setSearch('')} aria-label={tr('Clear search', 'مسح البحث')} className="absolute end-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
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
        'w-full flex items-center gap-2.5 rounded-md text-sm transition-colors text-start',
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
