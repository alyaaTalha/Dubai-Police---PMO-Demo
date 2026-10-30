import { useState } from 'react';
import {
  Plus, ArrowRight, MessageSquare, CalendarDays, Building2, FileEdit, AlertCircle,
} from 'lucide-react';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/tabs';
import { cn } from '../../ui/utils';
import { useLanguage } from '../../../i18n/LanguageContext';

// ── Arabic lookup for mock data (keyed by English value) ─────────────────────
const AR: Record<string, string> = {
  // statuses
  'Implemented': 'منفذة',
  'Approved': 'معتمدة',
  'Under Review': 'قيد المراجعة',
  'Pending Initial Review': 'بانتظار المراجعة الأولية',
  'Needs More Info': 'بحاجة إلى معلومات إضافية',
  'Draft': 'مسودة',
  'Grievance Filed': 'تظلم مقدم',
  // departments
  'Digital Transformation': 'التحول الرقمي',
  'Operations': 'العمليات',
  'Legal Affairs': 'الشؤون القانونية',
  'HR & Training': 'الموارد البشرية والتدريب',
  'Finance': 'المالية',
  'Community Affairs': 'شؤون المجتمع',
  // titles
  'AI Queue Management System': 'نظام إدارة الطوابير بالذكاء الاصطناعي',
  'Predictive Patrol Routing': 'التوجيه التنبؤي للدوريات',
  'Smart Evidence Digitization': 'الرقمنة الذكية للأدلة',
  'Employee Wellness App': 'تطبيق رفاهية الموظفين',
  'Blockchain Asset Registry': 'سجل الأصول بتقنية البلوك تشين',
  'Community Crime Heatmap Portal': 'بوابة الخريطة الحرارية للجريمة المجتمعية',
  'Body-Cam Live-Stream Integration': 'دمج البث المباشر لكاميرات الجسم',
  'HR Self-Service Kiosk': 'أكشاك الخدمة الذاتية للموارد البشرية',
  'Community Safety Dashboard': 'لوحة معلومات السلامة المجتمعية',
  'Smart Speed Camera Network': 'شبكة كاميرات السرعة الذكية',
  'Vehicle Predictive Maintenance': 'الصيانة التنبؤية للمركبات',
  'Idea not credited properly': 'عدم نسب الفكرة بشكل صحيح',
  // descriptions
  'An AI-driven system to reduce wait times at service centers using predictive analytics.': 'نظام قائم على الذكاء الاصطناعي لتقليل أوقات الانتظار في مراكز الخدمة باستخدام التحليلات التنبؤية.',
  'Data-driven route optimisation for patrol units based on real-time traffic and incident history.': 'تحسين مسارات وحدات الدوريات بالاعتماد على البيانات وحركة المرور الفورية وسجل الحوادث.',
  'End-to-end paperless evidence management with digital signatures and chain-of-custody tracking.': 'إدارة متكاملة للأدلة دون ورق مع التوقيعات الرقمية وتتبع سلسلة الحيازة.',
  'A mobile app to support officer mental health with wellbeing check-ins and resource access.': 'تطبيق جوال لدعم الصحة النفسية للضباط من خلال متابعات الرفاهية والوصول إلى الموارد.',
  'Immutable ledger for tracking seized assets throughout their lifecycle.': 'سجل غير قابل للتعديل لتتبع الأصول المضبوطة طوال دورة حياتها.',
  'Public-facing portal showing anonymised crime density maps to aid community awareness.': 'بوابة عامة تعرض خرائط كثافة الجريمة مجهولة الهوية لتعزيز الوعي المجتمعي.',
  'Integrating body camera feeds into the central operations dashboard for real-time monitoring.': 'دمج بث كاميرات الجسم في لوحة العمليات المركزية للمراقبة الفورية.',
  'Touch-screen kiosks at police stations for leave requests and payslip access.': 'أكشاك بشاشات لمس في مراكز الشرطة لطلبات الإجازة والاطلاع على كشوف الرواتب.',
  'A real-time dashboard for community safety officers to track incidents and resources.': 'لوحة معلومات فورية لضباط السلامة المجتمعية لتتبع الحوادث والموارد.',
  'Interconnected speed camera network with automatic fine issuance and vehicle tracking.': 'شبكة مترابطة من كاميرات السرعة مع إصدار تلقائي للمخالفات وتتبع المركبات.',
  'IoT-based monitoring system to predict fleet maintenance needs before breakdowns occur.': 'نظام مراقبة قائم على إنترنت الأشياء للتنبؤ باحتياجات صيانة الأسطول قبل حدوث الأعطال.',
  'Please clarify the budget estimate and vendor options.': 'يرجى توضيح تقدير الميزانية وخيارات الموردين.',
  'Submitted a grievance regarding attribution of the queue management idea.': 'تم تقديم تظلم بشأن نسب فكرة إدارة الطوابير.',
  // dates
  'Aug 2, 2025': '2 أغسطس 2025',
  'Jul 15, 2025': '15 يوليو 2025',
  'May 10, 2025': '10 مايو 2025',
  'Aug 10, 2025': '10 أغسطس 2025',
  'Jul 28, 2025': '28 يوليو 2025',
  'Jul 20, 2025': '20 يوليو 2025',
  'Aug 1, 2025': '1 أغسطس 2025',
  'Apr 5, 2025': '5 أبريل 2025',
  'Aug 7, 2025': '7 أغسطس 2025',
  'Jul 30, 2025': '30 يوليو 2025',
  'Jul 1, 2025': '1 يوليو 2025',
  'Aug 5, 2025': '5 أغسطس 2025',
};

/** Translate a mock-data value using the local AR lookup. */
function useT() {
  const { tr } = useLanguage();
  return { tr, t: (s: string) => tr(s, AR[s]) };
}

// ── Types ─────────────────────────────────────────────────────────────────────
type IdeasRole = 'innovator' | 'coordinator' | 'director' | 'admin';
interface User { name: string; role: string; subtitle: string; xp: number; initials: string; chip: string; }
interface PageProps { user: User; role: IdeasRole; onNavigate: (id: string) => void; }

// ── Status colour map ─────────────────────────────────────────────────────────
type StatusKey =
  | 'Implemented'
  | 'Approved'
  | 'Under Review'
  | 'Pending Initial Review'
  | 'Needs More Info'
  | 'Draft'
  | 'Grievance Filed';

const STATUS_STYLES: Record<StatusKey, string> = {
  'Implemented':           'bg-[#008755]/10 text-[#008755] border-transparent',
  'Approved':              'bg-[#26D07C]/10 text-[#005844] border-transparent',
  'Under Review':          'bg-amber-50 text-amber-700 border-transparent',
  'Pending Initial Review':'bg-gray-100 text-gray-600 border-transparent',
  'Needs More Info':       'bg-orange-50 text-orange-700 border-transparent',
  'Draft':                 'bg-blue-50 text-blue-700 border-transparent',
  'Grievance Filed':       'bg-red-50 text-red-700 border-transparent',
};

// ── Mock data ─────────────────────────────────────────────────────────────────
interface IdeaCard {
  id: string;
  title: string;
  status: StatusKey;
  department: string;
  date: string;
  description: string;
}

interface DraftCard {
  id: string;
  title: string;
  department: string;
  lastEdited: string;
  description: string;
}

interface NeedsInfoCard {
  id: string;
  title: string;
  department: string;
  submittedDate: string;
  description: string;
  reviewerMessage: string;
}

interface GrievanceCard {
  id: string;
  title: string;
  status: StatusKey;
  date: string;
  description: string;
}

const MY_IDEAS_BASE: IdeaCard[] = [
  {
    id: 'qi1',
    title: 'AI Queue Management System',
    status: 'Under Review',
    department: 'Digital Transformation',
    date: 'Aug 2, 2025',
    description: 'An AI-driven system to reduce wait times at service centers using predictive analytics.',
  },
  {
    id: 'qi2',
    title: 'Predictive Patrol Routing',
    status: 'Approved',
    department: 'Operations',
    date: 'Jul 15, 2025',
    description: 'Data-driven route optimisation for patrol units based on real-time traffic and incident history.',
  },
  {
    id: 'qi3',
    title: 'Smart Evidence Digitization',
    status: 'Implemented',
    department: 'Legal Affairs',
    date: 'May 10, 2025',
    description: 'End-to-end paperless evidence management with digital signatures and chain-of-custody tracking.',
  },
  {
    id: 'qi4',
    title: 'Employee Wellness App',
    status: 'Pending Initial Review',
    department: 'HR & Training',
    date: 'Aug 10, 2025',
    description: 'A mobile app to support officer mental health with wellbeing check-ins and resource access.',
  },
];

const MY_IDEAS_ADMIN_EXTRA: IdeaCard[] = [
  {
    id: 'qi5',
    title: 'Blockchain Asset Registry',
    status: 'Approved',
    department: 'Finance',
    date: 'Jul 28, 2025',
    description: 'Immutable ledger for tracking seized assets throughout their lifecycle.',
  },
  {
    id: 'qi6',
    title: 'Community Crime Heatmap Portal',
    status: 'Under Review',
    department: 'Community Affairs',
    date: 'Jul 20, 2025',
    description: 'Public-facing portal showing anonymised crime density maps to aid community awareness.',
  },
  {
    id: 'qi7',
    title: 'Body-Cam Live-Stream Integration',
    status: 'Pending Initial Review',
    department: 'Operations',
    date: 'Aug 1, 2025',
    description: 'Integrating body camera feeds into the central operations dashboard for real-time monitoring.',
  },
  {
    id: 'qi8',
    title: 'HR Self-Service Kiosk',
    status: 'Implemented',
    department: 'HR & Training',
    date: 'Apr 5, 2025',
    description: 'Touch-screen kiosks at police stations for leave requests and payslip access.',
  },
];

const DRAFTS: DraftCard[] = [
  {
    id: 'd1',
    title: 'Community Safety Dashboard',
    department: 'Community Affairs',
    lastEdited: 'Aug 7, 2025',
    description: 'A real-time dashboard for community safety officers to track incidents and resources.',
  },
  {
    id: 'd2',
    title: 'Smart Speed Camera Network',
    department: 'Operations',
    lastEdited: 'Jul 30, 2025',
    description: 'Interconnected speed camera network with automatic fine issuance and vehicle tracking.',
  },
];

const NEEDS_INFO: NeedsInfoCard[] = [
  {
    id: 'ni1',
    title: 'Vehicle Predictive Maintenance',
    department: 'Operations',
    submittedDate: 'Jul 1, 2025',
    description: 'IoT-based monitoring system to predict fleet maintenance needs before breakdowns occur.',
    reviewerMessage: 'Please clarify the budget estimate and vendor options.',
  },
];

const GRIEVANCES: GrievanceCard[] = [
  {
    id: 'g1',
    title: 'Idea not credited properly',
    status: 'Grievance Filed',
    date: 'Aug 5, 2025',
    description: 'Submitted a grievance regarding attribution of the queue management idea.',
  },
];

// ── Shared idea card ──────────────────────────────────────────────────────────
function IdeaListCard({ idea, onNavigate }: { idea: IdeaCard; onNavigate: (id: string) => void }) {
  const { tr, t } = useT();
  return (
    <Card className="rounded-xl hover:shadow-sm transition-shadow">
      <CardContent className="pt-3 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <h3 className="text-sm   text-foreground">{t(idea.title)}</h3>
              <Badge className={cn('text-[11px] px-2 py-0.5 h-auto', STATUS_STYLES[idea.status])}>
                {t(idea.status)}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-2">{t(idea.description)}</p>
            <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <Building2 className="h-3 w-3" />
                {t(idea.department)}
              </span>
              <span className="flex items-center gap-1">
                <CalendarDays className="h-3 w-3" />
                {t(idea.date)}
              </span>
            </div>
          </div>
          <button
            onClick={() => onNavigate('idea-detail-' + idea.id)}
            className="flex items-center gap-1 text-xs text-[#008755] hover:text-[#005844]   transition-colors whitespace-nowrap flex-shrink-0 mt-0.5"
          >
            {tr('View Details', 'عرض التفاصيل')} <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

function DraftListCard({ draft, onNavigate }: { draft: DraftCard; onNavigate: (id: string) => void }) {
  const { tr, t } = useT();
  return (
    <Card className="rounded-xl hover:shadow-sm transition-shadow">
      <CardContent className="pt-3 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <h3 className="text-sm   text-foreground">{t(draft.title)}</h3>
              <Badge className={cn('text-[11px] px-2 py-0.5 h-auto', STATUS_STYLES['Draft'])}>
                {tr('Draft', 'مسودة')}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-2">{t(draft.description)}</p>
            <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <Building2 className="h-3 w-3" />
                {t(draft.department)}
              </span>
              <span className="flex items-center gap-1">
                <FileEdit className="h-3 w-3" />
                {tr('Last edited', 'آخر تعديل')} {t(draft.lastEdited)}
              </span>
            </div>
          </div>
          <button
            onClick={() => onNavigate('submit-idea')}
            className="flex items-center gap-1 text-xs text-[#008755] hover:text-[#005844]   transition-colors whitespace-nowrap flex-shrink-0 mt-0.5"
          >
            {tr('Continue', 'متابعة')} <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

function NeedsInfoListCard({ item, onNavigate }: { item: NeedsInfoCard; onNavigate: (id: string) => void }) {
  const { tr, t } = useT();
  return (
    <Card className="rounded-xl hover:shadow-sm transition-shadow border-orange-200">
      <CardContent className="pt-3 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <h3 className="text-sm   text-foreground">{t(item.title)}</h3>
              <Badge className={cn('text-[11px] px-2 py-0.5 h-auto', STATUS_STYLES['Needs More Info'])}>
                {tr('Needs More Info', 'بحاجة إلى معلومات إضافية')}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-2">{t(item.description)}</p>
            {/* Reviewer message */}
            <div className="flex items-start gap-2 bg-orange-50 border border-orange-200 rounded-lg px-3 py-2 mb-2">
              <MessageSquare className="h-3.5 w-3.5 text-orange-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-orange-700">
                <span className=" ">{tr('Reviewer: ', 'المراجع: ')}</span>
                {t(item.reviewerMessage)}
              </p>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <Building2 className="h-3 w-3" />
                {t(item.department)}
              </span>
              <span className="flex items-center gap-1">
                <CalendarDays className="h-3 w-3" />
                {tr('Submitted', 'تاريخ التقديم')} {t(item.submittedDate)}
              </span>
            </div>
          </div>
          <button
            onClick={() => onNavigate('idea-detail-' + item.id)}
            className="flex items-center gap-1 text-xs text-[#008755] hover:text-[#005844]   transition-colors whitespace-nowrap flex-shrink-0 mt-0.5"
          >
            {tr('View Details', 'عرض التفاصيل')} <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

function GrievanceListCard({ item, onNavigate }: { item: GrievanceCard; onNavigate: (id: string) => void }) {
  const { tr, t } = useT();
  return (
    <Card className="rounded-xl hover:shadow-sm transition-shadow border-red-200">
      <CardContent className="pt-3 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <h3 className="text-sm   text-foreground">{t(item.title)}</h3>
              <Badge className={cn('text-[11px] px-2 py-0.5 h-auto', STATUS_STYLES['Grievance Filed'])}>
                {tr('Grievance Filed', 'تظلم مقدم')}
              </Badge>
              <Badge className={cn('text-[11px] px-2 py-0.5 h-auto', STATUS_STYLES['Under Review'])}>
                {tr('Under Review', 'قيد المراجعة')}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-2">{t(item.description)}</p>
            <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <AlertCircle className="h-3 w-3 text-red-400" />
                {tr('Filed', 'تاريخ التقديم')} {t(item.date)}
              </span>
            </div>
          </div>
          <button
            onClick={() => onNavigate('grievance-detail-' + item.id)}
            className="flex items-center gap-1 text-xs text-[#008755] hover:text-[#005844]   transition-colors whitespace-nowrap flex-shrink-0 mt-0.5"
          >
            {tr('View Details', 'عرض التفاصيل')} <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────
function EmptyState({ label, action, onAction }: { label: string; action?: string; onAction?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center mb-3">
        <FileEdit className="h-5 w-5 text-muted-foreground" />
      </div>
      <p className="text-sm   text-foreground mb-1">{label}</p>
      {action && onAction && (
        <button
          onClick={onAction}
          className="text-xs text-[#008755] hover:text-[#005844] transition-colors mt-2"
        >
          {action}
        </button>
      )}
    </div>
  );
}

// ── Stat pill row ─────────────────────────────────────────────────────────────
function StatPill({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex flex-col items-center bg-white rounded-xl border border-border px-4 py-3 min-w-[80px]">
      <span className={cn('text-xl font-["Dubai:Medium",_sans-serif] leading-none', color)}>{value}</span>
      <span className="text-[11px] text-muted-foreground mt-1 text-center leading-tight">{label}</span>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function MyIdeasPage({ user, role, onNavigate }: PageProps) {
  const [activeTab, setActiveTab] = useState('my-ideas');
  const { tr } = useLanguage();

  const myIdeas = role === 'admin' || role === 'director'
    ? [...MY_IDEAS_BASE, ...MY_IDEAS_ADMIN_EXTRA]
    : role === 'coordinator'
      ? [...MY_IDEAS_BASE, MY_IDEAS_ADMIN_EXTRA[0]]
      : MY_IDEAS_BASE;

  const implementedCount = myIdeas.filter(i => i.status === 'Implemented').length;
  const approvedCount = myIdeas.filter(i => i.status === 'Approved').length;
  const underReviewCount = myIdeas.filter(i => i.status === 'Under Review').length;

  return (
    <div className="h-full overflow-y-auto">
      <div className="w-full px-4 py-3 space-y-3">

        {/* ── Page header ─────────────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl   text-foreground mb-0.5">{tr('My Ideas', 'أفكاري')}</h1>
            <p className="text-sm text-muted-foreground leading-snug">
              {tr("Track and manage all ideas you've submitted on the platform.", 'تابع وأدِر جميع الأفكار التي قدمتها على المنصة.')}
            </p>
          </div>
          <Button
            onClick={() => onNavigate('submit-idea')}
            className="bg-[#008755] hover:bg-[#005844] text-white gap-1.5 flex-shrink-0"
          >
            <Plus className="h-4 w-4" />
            {tr('Submit New Idea', 'تقديم فكرة جديدة')}
          </Button>
        </div>

        {/* ── Stat pills ──────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-3">
          <StatPill label={tr('Total Ideas', 'إجمالي الأفكار')} value={myIdeas.length} color="text-foreground" />
          <StatPill label={tr('Implemented', 'منفذة')} value={implementedCount} color="text-[#008755]" />
          <StatPill label={tr('Approved', 'معتمدة')} value={approvedCount} color="text-[#005844]" />
          <StatPill label={tr('Under Review', 'قيد المراجعة')} value={underReviewCount} color="text-amber-600" />
          <StatPill label={tr('Drafts', 'المسودات')} value={DRAFTS.length} color="text-blue-600" />
        </div>

        {/* ── Tabs ────────────────────────────────────────────────────────── */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-4 h-auto p-1">
            <TabsTrigger value="my-ideas" className="text-xs py-1.5">
              {tr('My Ideas', 'أفكاري')}
              {myIdeas.length > 0 && (
                <span className="ms-1.5 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#008755]/15 px-1 text-[10px]   text-[#008755]">
                  {myIdeas.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="drafts" className="text-xs py-1.5">
              {tr('Drafts', 'المسودات')}
              {DRAFTS.length > 0 && (
                <span className="ms-1.5 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-blue-100 px-1 text-[10px]   text-blue-700">
                  {DRAFTS.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="needs-info" className="text-xs py-1.5">
              {tr('Needs More Info', 'بحاجة إلى معلومات')}
              {NEEDS_INFO.length > 0 && (
                <span className="ms-1.5 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-orange-100 px-1 text-[10px]   text-orange-700">
                  {NEEDS_INFO.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="grievances" className="text-xs py-1.5">
              {tr('Grievances', 'التظلمات')}
            </TabsTrigger>
          </TabsList>

          {/* My Ideas tab */}
          <TabsContent value="my-ideas" className="mt-2 space-y-2">
            {myIdeas.length > 0
              ? myIdeas.map(idea => (
                  <IdeaListCard key={idea.id} idea={idea} onNavigate={onNavigate} />
                ))
              : <EmptyState
                  label={tr('No ideas submitted yet', 'لم تقدم أي أفكار بعد')}
                  action={tr('Submit your first idea →', 'قدّم فكرتك الأولى ←')}
                  onAction={() => onNavigate('submit-idea')}
                />
            }
          </TabsContent>

          {/* Drafts tab */}
          <TabsContent value="drafts" className="mt-2 space-y-2">
            {DRAFTS.length > 0
              ? DRAFTS.map(draft => (
                  <DraftListCard key={draft.id} draft={draft} onNavigate={onNavigate} />
                ))
              : <EmptyState
                  label={tr('No drafts saved', 'لا توجد مسودات محفوظة')}
                  action={tr('Start a new idea →', 'ابدأ فكرة جديدة ←')}
                  onAction={() => onNavigate('submit-idea')}
                />
            }
          </TabsContent>

          {/* Needs More Info tab */}
          <TabsContent value="needs-info" className="mt-2 space-y-2">
            {NEEDS_INFO.length > 0
              ? NEEDS_INFO.map(item => (
                  <NeedsInfoListCard key={item.id} item={item} onNavigate={onNavigate} />
                ))
              : <EmptyState label={tr('No ideas need additional information', 'لا توجد أفكار بحاجة إلى معلومات إضافية')} />
            }
          </TabsContent>

          {/* Grievances tab */}
          <TabsContent value="grievances" className="mt-2 space-y-2">
            {GRIEVANCES.length > 0
              ? GRIEVANCES.map(item => (
                  <GrievanceListCard key={item.id} item={item} onNavigate={onNavigate} />
                ))
              : <EmptyState label={tr('No grievances filed', 'لا توجد تظلمات مقدمة')} />
            }
            {/* File new grievance CTA */}
            <div className="border border-dashed border-border rounded-xl p-3 flex items-center justify-between">
              <div>
                <p className="text-sm   text-foreground mb-0.5">
                  {tr('Have a concern about an idea?', 'هل لديك ملاحظة بشأن إحدى الأفكار؟')}
                </p>
                <p className="text-xs text-muted-foreground">
                  {tr("File a grievance if your idea wasn't credited or was unfairly rejected.", 'قدّم تظلمًا إذا لم تُنسب إليك فكرتك أو رُفضت بشكل غير عادل.')}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="flex-shrink-0 gap-1.5"
                onClick={() => onNavigate('file-grievance')}
              >
                <AlertCircle className="h-3.5 w-3.5 text-red-500" />
                {tr('File Grievance', 'تقديم تظلم')}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
