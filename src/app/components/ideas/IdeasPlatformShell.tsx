import { useEffect, useRef, useState } from 'react';
import {
  Home, Send, FileText, Globe, Trophy, Newspaper, Map,
  ClipboardList, GitBranch, Archive,
  LayoutDashboard, Compass, GitPullRequest, BarChart2,
  Settings, Bell, Lightbulb, Star, ArrowRight, ArrowLeft
} from 'lucide-react';
import { ChallengesPage } from './pages/ChallengesPage';
import { InnovationNewsPage } from './pages/InnovationNewsPage';
import { IdeasHomePage } from './pages/IdeasHomePage';
import { Innovation360Page } from './pages/Innovation360Page';
import { SubmitIdeaPage } from './pages/SubmitIdeaPage';
import { MyIdeasPage } from './pages/MyIdeasPage';
import { InnovationJourneyPage } from './pages/InnovationJourneyPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ReviewIdeasPage } from './pages/ReviewIdeasPage';
import { ClusteringPage } from './pages/ClusteringPage';
import { IdeaVaultPage } from './pages/IdeaVaultPage';
import { DirectorDashboardPage } from './pages/DirectorDashboardPage';
import { DiscoverPage } from './pages/DiscoverPage';
import { PipelinePage, type IdeaOriginProject } from './pages/PipelinePage';
export type { IdeaOriginProject };
import { InsightsPage } from './pages/InsightsPage';
import { IdeaDetailPage } from './pages/IdeaDetailPage';
import { AdminSettingsPage } from './pages/AdminSettingsPage';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { cn } from '../ui/utils';
import { useLanguage } from '../../i18n/LanguageContext';

// ── Sample users ─────────────────────────────────────────────────────────────
export type IdeasRole = 'innovator' | 'coordinator' | 'director' | 'admin';

export const IDEAS_USERS: Record<IdeasRole, {
  name: string; nameAr: string; role: string; roleAr: string; subtitle: string; subtitleAr: string;
  xp: number; initials: string; chip: string; chipAr: string;
}> = {
  innovator: {
    name: 'Fatima Al Mansoori',
    nameAr: 'فاطمة المنصوري',
    role: 'Innovator',
    roleAr: 'مبتكر',
    subtitle: 'Innovation Architect · Digital Transformation',
    subtitleAr: 'مهندسة الابتكار · التحول الرقمي',
    xp: 1240,
    initials: 'FA',
    chip: 'INNOVATOR',
    chipAr: 'مبتكر',
  },
  coordinator: {
    name: 'Khalid Al Rashid',
    nameAr: 'خالد الراشد',
    role: 'Primary Coordinator',
    roleAr: 'المنسق الرئيسي',
    subtitle: 'Innovation Office',
    subtitleAr: 'مكتب الابتكار',
    xp: 3180,
    initials: 'KR',
    chip: 'PRIMARY COORDINATOR',
    chipAr: 'المنسق الرئيسي',
  },
  director: {
    name: 'Aisha Al Suwaidi',
    nameAr: 'عائشة السويدي',
    role: 'Department Director',
    roleAr: 'مدير الإدارة',
    subtitle: 'Community Affairs',
    subtitleAr: 'شؤون المجتمع',
    xp: 5460,
    initials: 'AS',
    chip: 'DEPARTMENT DIRECTOR',
    chipAr: 'مدير الإدارة',
  },
  admin: {
    name: 'Khalid Al Marri',
    nameAr: 'خالد المري',
    role: 'System Admin',
    roleAr: 'مسؤول النظام',
    subtitle: 'Innovation Platform',
    subtitleAr: 'منصة الابتكار',
    xp: 6300,
    initials: 'KM',
    chip: 'SYSTEM ADMIN',
    chipAr: 'مسؤول النظام',
  },
};

// ── Nav structure ─────────────────────────────────────────────────────────────
type NavItem = { id: string; label: string; labelAr: string; icon: React.ElementType; badge?: number };
type NavSection = { id: string; label: string; labelAr: string; roles: IdeasRole[]; items: NavItem[] };

const NAV_SECTIONS: NavSection[] = [
  {
    id: 'general', label: 'GENERAL', labelAr: 'عام',
    roles: ['innovator', 'coordinator', 'director', 'admin'],
    items: [
      { id: 'home',              label: 'Home', labelAr: 'الرئيسية',               icon: Home },
      { id: 'submit-idea',       label: 'Submit Idea', labelAr: 'تقديم فكرة',        icon: Send },
      { id: 'my-ideas',          label: 'My Ideas', labelAr: 'أفكاري',           icon: FileText },
      { id: 'innovation-360',    label: 'Innovation 360', labelAr: 'الابتكار 360',     icon: Globe },
      { id: 'challenges',        label: 'Challenges', labelAr: 'التحديات',         icon: Trophy },
      { id: 'innovation-news',   label: 'Innovation News', labelAr: 'أخبار الابتكار',    icon: Newspaper },
      { id: 'innovation-journey',label: 'Innovation Journey', labelAr: 'رحلة الابتكار', icon: Map },
    ],
  },
  {
    id: 'coordinator', label: 'COORDINATOR', labelAr: 'المنسق',
    roles: ['coordinator', 'admin'],
    items: [
      { id: 'review-ideas', label: 'Review Ideas', labelAr: 'مراجعة الأفكار', icon: ClipboardList },
      { id: 'clustering',   label: 'Clustering', labelAr: 'تجميع الأفكار',   icon: GitBranch },
      { id: 'idea-vault',   label: 'Idea Vault', labelAr: 'خزينة الأفكار',   icon: Archive },
    ],
  },
  {
    id: 'director', label: 'DIRECTOR', labelAr: 'المدير',
    roles: ['director', 'admin'],
    items: [
      { id: 'dashboard', label: 'Dashboard', labelAr: 'لوحة المعلومات', icon: LayoutDashboard },
      { id: 'discover',  label: 'Discover', labelAr: 'استكشاف',  icon: Compass },
      { id: 'pipeline',  label: 'Pipeline', labelAr: 'مسار الأفكار',  icon: GitPullRequest },
      { id: 'insights',  label: 'Insights', labelAr: 'الرؤى والتحليلات',  icon: BarChart2 },
    ],
  },
  {
    id: 'admin', label: 'ADMIN', labelAr: 'الإدارة',
    roles: ['admin'],
    items: [
      { id: 'admin-settings', label: 'Admin Settings', labelAr: 'إعدادات الإدارة', icon: Settings },
      { id: 'notifications',  label: 'Notifications', labelAr: 'الإشعارات',  icon: Bell, badge: 3 },
    ],
  },
];

export const PAGE_LABELS: Record<string, string> = {
  home: 'Home', 'submit-idea': 'Submit Idea', 'my-ideas': 'My Ideas',
  'innovation-360': 'Innovation 360', challenges: 'Challenges',
  'innovation-news': 'Innovation News', 'innovation-journey': 'Innovation Journey',
  'review-ideas': 'Review Ideas', clustering: 'Clustering', 'idea-vault': 'Idea Vault',
  dashboard: 'Dashboard', discover: 'Discover', pipeline: 'Pipeline', insights: 'Insights',
  'admin-settings': 'Admin Settings', notifications: 'Notifications',
};

export const PAGE_LABELS_AR: Record<string, string> = {
  'Home': 'الرئيسية',
  'Submit Idea': 'تقديم فكرة',
  'My Ideas': 'أفكاري',
  'Innovation 360': 'الابتكار 360',
  'Challenges': 'التحديات',
  'Innovation News': 'أخبار الابتكار',
  'Innovation Journey': 'رحلة الابتكار',
  'Review Ideas': 'مراجعة الأفكار',
  'Clustering': 'تجميع الأفكار',
  'Idea Vault': 'خزينة الأفكار',
  'Dashboard': 'لوحة المعلومات',
  'Discover': 'استكشاف',
  'Pipeline': 'مسار الأفكار',
  'Insights': 'الرؤى والتحليلات',
  'Admin Settings': 'إعدادات الإدارة',
  'Notifications': 'الإشعارات',
};

// ── Sidebar — styled exactly like PMO panels ──────────────────────────────────
interface SidebarProps {
  role: IdeasRole;
  activePage: string;
  onNavigate: (id: string) => void;
  onRoleChange: (r: IdeasRole) => void;
  onBack?: () => void;
}

function IdeasSidebar({ role, activePage, onNavigate, onRoleChange, onBack }: SidebarProps) {
  const { tr } = useLanguage();
  const user = IDEAS_USERS[role];
  const visibleSections = NAV_SECTIONS.filter(s => s.roles.includes(role));

  return (
    <aside className="w-60 bg-white border-e border-border flex flex-col h-full flex-shrink-0 overflow-hidden">

      {/* Back to PMO */}
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-4 py-2 text-[11px] text-muted-foreground hover:text-[#008755] border-b border-border bg-muted/30 w-full transition-colors"
        >
          <ArrowLeft className="h-3 w-3 rtl:rotate-180" />
          <span>{tr('Back to PMO', 'العودة إلى مكتب إدارة المشاريع')}</span>
        </button>
      )}

      {/* App identity — matches PMO card header style */}
      <div className="px-4 py-3 border-b border-border bg-white">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-[#008755] flex items-center justify-center flex-shrink-0">
            <Lightbulb className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm   text-foreground leading-tight">{tr('Ideas Platform', 'منصة الأفكار')}</p>
            <p className="text-[11px] text-muted-foreground leading-tight">{tr('Innovation System', 'نظام الابتكار')}</p>
          </div>
        </div>
      </div>

      {/* User card — same bg-muted/50 tinting as PMO cards */}
      <div className="mx-3 mt-3 rounded-lg border border-border bg-muted/40 p-3">
        <div className="flex items-center gap-2.5">
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarFallback className="bg-[#008755] text-white text-[11px]  ">
              {user.initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-xs   text-foreground truncate">{tr(user.name, user.nameAr)}</p>
            <p className="text-[11px] text-muted-foreground truncate">{tr(user.role, user.roleAr)}</p>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-1.5">
          <Star className="h-3 w-3 text-amber-400 fill-amber-400 flex-shrink-0" />
          <span className="text-[11px]   text-[#008755]">
            {user.xp.toLocaleString()} {tr('XP', 'نقطة خبرة')}
          </span>
        </div>
      </div>

      {/* Nav — identical active/hover treatment to PMO nav buttons */}
      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-3">
        {visibleSections.map(section => (
          <div key={section.id}>
            <p className="text-[10px]   text-muted-foreground tracking-widest px-2 py-1 uppercase">
              {tr(section.label, section.labelAr)}
            </p>
            <div className="space-y-0.5">
              {section.items.map(item => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={cn(
                      'w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm transition-colors text-start',
                      isActive
                        ? 'bg-[#008755] text-white'
                        : 'text-foreground hover:bg-[#008755]/10 hover:text-[#008755]'
                    )}
                  >
                    <Icon className={cn('h-4 w-4 flex-shrink-0', isActive ? 'text-white' : 'text-muted-foreground group-hover:text-[#008755]')} />
                    <span className={cn('flex-1 truncate font-["Dubai",_sans-serif]', isActive && 'font-["Dubai:Medium",_sans-serif]')}>
                      {tr(item.label, item.labelAr)}
                    </span>
                    {item.badge !== undefined && (
                      <Badge
                        className={cn(
                          'h-4 min-w-[16px] px-1 text-[10px] flex items-center justify-center',
                          isActive ? 'bg-white text-[#008755]' : 'bg-destructive text-white'
                        )}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Submit callout — matches PMO banner card gradient */}
      <div className="mx-3 mb-3 rounded-lg bg-gradient-to-br from-[#008755] to-[#005844] p-3 text-white">
        <p className="text-xs   leading-snug mb-2">
          {tr('Have a great idea? Share it with the team.', 'لديك فكرة رائعة؟ شاركها مع الفريق.')}
        </p>
        <button
          onClick={() => onNavigate('submit-idea')}
          className="flex items-center gap-1 text-[11px] text-white/80 hover:text-white transition-colors"
        >
          {tr('Submit now', 'قدّمها الآن')} <ArrowRight className="h-3 w-3 rtl:rotate-180" />
        </button>
      </div>

      {/* Demo role selector — matches PMO's Select style */}
      <div className="px-3 pb-3 pt-2 border-t border-border">
        <p className="text-[10px] text-muted-foreground mb-1.5   uppercase tracking-wider">
          {tr('Demo Role', 'الدور التجريبي')}
        </p>
        <Select value={role} onValueChange={v => onRoleChange(v as IdeasRole)}>
          <SelectTrigger className="h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="innovator"    className="text-xs">{tr('Innovator', 'مبتكر')}</SelectItem>
            <SelectItem value="coordinator"  className="text-xs">{tr('Primary Coordinator', 'المنسق الرئيسي')}</SelectItem>
            <SelectItem value="director"     className="text-xs">{tr('Department Director', 'مدير الإدارة')}</SelectItem>
            <SelectItem value="admin"        className="text-xs">{tr('System Admin', 'مسؤول النظام')}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </aside>
  );
}

// ── Placeholder page ──────────────────────────────────────────────────────────
function PlaceholderPage({ pageId }: { pageId: string }) {
  const { tr } = useLanguage();
  const label = PAGE_LABELS[pageId] ? tr(PAGE_LABELS[pageId], PAGE_LABELS_AR[PAGE_LABELS[pageId]]) : pageId;
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8">
      <div className="h-14 w-14 rounded-2xl bg-[#008755]/10 flex items-center justify-center mb-4">
        <Lightbulb className="h-7 w-7 text-[#008755]" />
      </div>
      <h2 className="  text-lg text-foreground mb-1">{label}</h2>
      <p className="text-sm text-muted-foreground max-w-xs">
        {tr('This page will be built in the next prompt.', 'سيتم إنشاء هذه الصفحة في المرحلة التالية.')}
      </p>
    </div>
  );
}

// ── Shell ─────────────────────────────────────────────────────────────────────
interface IdeasPlatformShellProps {
  setBreadcrumbs?: (crumbs: Array<{ label: string; onClick?: () => void }>) => void;
  onBack?: () => void;
  onConvertToProject?: (project: IdeaOriginProject) => void;
  onNavigateToPortfolio?: () => void;
  initialPage?: string;
}

export function IdeasPlatformShell({ setBreadcrumbs, onBack, onConvertToProject, onNavigateToPortfolio, initialPage }: IdeasPlatformShellProps) {
  const [role, setRole] = useState<IdeasRole>('innovator');
  const [activePage, setActivePage] = useState(initialPage ?? 'home');

  const { tr, lang } = useLanguage();
  // Page whose breadcrumbs this shell currently owns (null until the user navigates inside the shell).
  const [crumbPage, setCrumbPage] = useState<string | null>(null);
  const onBackRef = useRef(onBack);
  onBackRef.current = onBack;

  // Rebuild breadcrumbs whenever the page or the language changes so labels stay translated.
  // ('Home' / 'Ideas Platform' are translated by the Header via i18n/labels.ts.)
  useEffect(() => {
    if (crumbPage === null) return;
    const goBack = () => onBackRef.current?.();
    const pageLabel = PAGE_LABELS[crumbPage];
    setBreadcrumbs?.([
      { label: 'Home', onClick: goBack },
      { label: 'Ideas Platform', onClick: () => { setActivePage('home'); setCrumbPage(null); setBreadcrumbs?.([{ label: 'Home', onClick: goBack }, { label: 'Ideas Platform' }]); } },
      { label: pageLabel ? tr(pageLabel, PAGE_LABELS_AR[pageLabel]) : crumbPage },
    ]);
  }, [crumbPage, tr, lang, setBreadcrumbs]);

  const handleNavigate = (id: string) => {
    setActivePage(id);
    setCrumbPage(id);
  };

  const handleRoleChange = (newRole: IdeasRole) => {
    setRole(newRole);
    const sections = NAV_SECTIONS.filter(s => s.roles.includes(newRole));
    const allItems = sections.flatMap(s => s.items);
    if (!allItems.some(i => i.id === activePage)) {
      const firstId = allItems[0]?.id ?? 'home';
      setActivePage(firstId);
    }
  };

  return (
    <div className="flex h-full w-full overflow-hidden">
      <IdeasSidebar
        role={role}
        activePage={activePage}
        onNavigate={handleNavigate}
        onRoleChange={handleRoleChange}
        onBack={onBack}
      />
      <main className="flex-1 overflow-auto bg-[#f8f9fb]">
        {activePage === 'home'
          ? <IdeasHomePage user={IDEAS_USERS[role]} role={role} onNavigate={handleNavigate} />
          : activePage === 'innovation-360'
          ? <Innovation360Page user={IDEAS_USERS[role]} role={role} onNavigate={handleNavigate} />
          : activePage === 'challenges'
          ? <ChallengesPage user={IDEAS_USERS[role]} role={role} onNavigate={handleNavigate} />
          : activePage === 'innovation-news'
          ? <InnovationNewsPage user={IDEAS_USERS[role]} role={role} onNavigate={handleNavigate} />
          : activePage === 'submit-idea'
          ? <SubmitIdeaPage user={IDEAS_USERS[role]} role={role} onNavigate={handleNavigate} />
          : activePage === 'my-ideas'
          ? <MyIdeasPage user={IDEAS_USERS[role]} role={role} onNavigate={handleNavigate} />
          : activePage === 'innovation-journey'
          ? <InnovationJourneyPage user={IDEAS_USERS[role]} role={role} onNavigate={handleNavigate} />
          : activePage === 'notifications'
          ? <NotificationsPage user={IDEAS_USERS[role]} role={role} onNavigate={handleNavigate} />
          : activePage === 'review-ideas'
          ? <ReviewIdeasPage user={IDEAS_USERS[role]} role={role} onNavigate={handleNavigate} />
          : activePage === 'clustering'
          ? <ClusteringPage user={IDEAS_USERS[role]} role={role} onNavigate={handleNavigate} />
          : activePage === 'idea-vault'
          ? <IdeaVaultPage user={IDEAS_USERS[role]} role={role} onNavigate={handleNavigate} />
          : activePage === 'dashboard'
          ? <DirectorDashboardPage user={IDEAS_USERS[role]} role={role} onNavigate={handleNavigate} />
          : activePage === 'discover'
          ? <DiscoverPage user={IDEAS_USERS[role]} role={role} onNavigate={handleNavigate} />
          : activePage === 'pipeline'
          ? <PipelinePage user={IDEAS_USERS[role]} role={role} onNavigate={handleNavigate} onConvertToProject={onConvertToProject} onNavigateToPortfolio={onNavigateToPortfolio} />
          : activePage === 'insights'
          ? <InsightsPage user={IDEAS_USERS[role]} role={role} onNavigate={handleNavigate} />
          : activePage === 'admin-settings'
          ? <AdminSettingsPage user={IDEAS_USERS[role]} role={role} onNavigate={handleNavigate} />
          : activePage.startsWith('idea-detail-')
          ? <IdeaDetailPage ideaId={activePage.replace('idea-detail-', '')} user={IDEAS_USERS[role]} role={role} onNavigate={handleNavigate} />
          : <PlaceholderPage pageId={activePage} />
        }
      </main>
    </div>
  );
}
