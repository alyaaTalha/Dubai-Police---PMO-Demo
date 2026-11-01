import { useState, type ReactNode } from "react";
import {
  Award,
  TrendingUp,
  Lightbulb,
  ChevronRight,
  FlaskConical,
  ShieldCheck,
  ClipboardCheck,
  Handshake,
  FolderKanban,
  Wallet,
  Plus,
  Sparkles,
  CalendarDays,
  Clock,
  Check,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LabelList,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  INITIAL_PROJECTS, IP_REGISTER, PARTNERS, STAGES, TYPES, money,
  type ProjectType,
} from "../sandbox/sandboxData";
import { useSandboxTr } from "../sandbox/sandboxI18n";
import spotlightImage from "../../../assets/img1.jpeg";
import heroDecoration from "../../../assets/sandbox-hero-decoration.png";
import { useLanguage } from "../../i18n/LanguageContext";


export interface HomePageProps {
  onNavigate: (view: 'strategy' | 'performance' | 'scorecards' | 'home' | 'partnership' | 'voc' | 'portfolio' | 'ideas-platform' | 'sandbox-platform') => void;
}

// Mock announcements data
export const announcements = [
  {
    id: 1,
    title: 'Q1 2027 Sandbox Intake Is Now Open',
    titleAr: 'باب التقديم للبيئة التجريبية للربع الأول 2027 مفتوح الآن',
    description: 'Departments can submit new R&D, innovation and knowledge projects for sandbox piloting until 30 November.',
    descriptionAr: 'يمكن للإدارات تقديم مشاريع البحث والتطوير والابتكار والمعرفة الجديدة للتجريب في البيئة التجريبية حتى 30 نوفمبر.',
    timestamp: '1 day ago',
    timestampAr: 'منذ يوم',
    badges: [
      { label: 'Intake', labelAr: 'التقديم', className: 'bg-[#008755] text-white hover:bg-[#008755]' },
    ]
  },
  {
    id: 2,
    title: 'Updated Evaluation Criteria for Innovation Projects',
    titleAr: 'تحديث معايير تقييم مشاريع الابتكار',
    description: 'Strategic Alignment and Expected Impact now carry 25% weight each in the innovation scoring model.',
    descriptionAr: 'أصبح لكل من المواءمة الاستراتيجية والأثر المتوقع وزن 25% في نموذج تقييم مشاريع الابتكار.',
    timestamp: '3 days ago',
    timestampAr: 'منذ 3 أيام',
    badges: [
      { label: 'Policy', labelAr: 'سياسة', className: 'bg-[#16a8b8] text-white hover:bg-[#16a8b8]' },
      { label: 'Evaluation', labelAr: 'التقييم', className: 'bg-[#ffb088] text-white hover:bg-[#ffb088]' },
    ]
  },
  {
    id: 3,
    title: 'New Partner Joins the Sandbox: Europol Tech Exchange',
    titleAr: 'شريك جديد ينضم إلى البيئة التجريبية: Europol Tech Exchange',
    description: 'International collaboration opportunities are now available for R&D projects at TRL 4 and above.',
    descriptionAr: 'تتوفر الآن فرص تعاون دولية لمشاريع البحث والتطوير بمستوى جاهزية تقنية 4 فأعلى.',
    timestamp: '1 week ago',
    timestampAr: 'منذ أسبوع',
    badges: [
      { label: 'Partnership', labelAr: 'شراكة', className: 'bg-[#8b6fd4] text-white hover:bg-[#8b6fd4]' },
    ]
  }
];

// Mock recent activity data (Sandbox Platform)
export const recentActivity = [
  {
    id: 1,
    title: 'Patent granted',
    titleAr: 'منح براءة اختراع',
    text: 'Smart Evidence Chain-of-Custody Protocol approved by the IP office',
    textAr: 'اعتماد بروتوكول سلسلة حيازة الأدلة الذكي من مكتب الملكية الفكرية',
    timestamp: '2 hours ago',
    timestampAr: 'منذ ساعتين',
    type: 'success'
  },
  {
    id: 2,
    title: 'Evaluation submitted',
    titleAr: 'تقديم تقييم',
    text: 'Smart Evidence Room (RFID) scored 94/100 by the innovation panel',
    textAr: 'حصل مشروع غرفة الأدلة الذكية (RFID) على 94/100 من لجنة الابتكار',
    timestamp: 'Yesterday',
    timestampAr: 'أمس',
    type: 'info'
  },
  {
    id: 3,
    title: 'Stage advanced',
    titleAr: 'الانتقال إلى مرحلة جديدة',
    text: 'Quantum-Resistant Encryption Pilot moved from Development to Sandbox',
    textAr: 'انتقل مشروع تجربة التشفير المقاوم للحوسبة الكمية من التطوير إلى البيئة التجريبية',
    timestamp: '2 days ago',
    timestampAr: 'منذ يومين',
    type: 'stage'
  },
  {
    id: 4,
    title: 'Partner agreement signed',
    titleAr: 'توقيع اتفاقية شراكة',
    text: 'Khalifa University added to 2 additional R&D projects',
    textAr: 'إضافة جامعة خليفة إلى مشروعين إضافيين للبحث والتطوير',
    timestamp: '3 days ago',
    timestampAr: 'منذ 3 أيام',
    type: 'partner'
  }
];

export const ACTIVITY_STYLE: Record<string, { icon: typeof Award; color: string }> = {
  success: { icon: ShieldCheck, color: '#008755' },
  info: { icon: ClipboardCheck, color: '#1d5fa8' },
  stage: { icon: TrendingUp, color: '#a8710d' },
  partner: { icon: Handshake, color: '#8b6fd4' },
};

// ── Sandbox Platform statistics (derived from the platform's own project data) ──
export const TYPE_KEYS: ProjectType[] = ['rd', 'innov', 'know'];
// Home-page colours for the three project types, from the Dubai Police brand guideline:
// Pan 2188C navy, Pan 7725C green (primary) and Pan 3265C aqua. `label` is the in-bar text colour.
export const TYPE_COLOR: Record<ProjectType, { color: string; chip: string; label: string }> = {
  rd:    { color: '#00426A', chip: 'bg-[#00426A]/10 text-[#00426A]', label: '#ffffff' },
  innov: { color: '#008755', chip: 'bg-[#008755]/10 text-[#008755]', label: '#ffffff' },
  know:  { color: '#00C7B1', chip: 'bg-[#00C7B1]/15 text-[#05868E]', label: '#00426A' },
};
export const TOTAL_PROJECTS = INITIAL_PROJECTS.length;
export const TOTAL_BUDGET = INITIAL_PROJECTS.reduce((s, p) => s + p.budget, 0);
export const IN_SANDBOX = INITIAL_PROJECTS.filter(p => p.stage === 'Sandbox').length;
export const IP_GRANTED = IP_REGISTER.filter(i => i.status === 'Granted').length;

const STAGE_DATA = STAGES.map(stage => {
  const row: Record<string, string | number> = { stage };
  TYPE_KEYS.forEach(t => { row[t] = INITIAL_PROJECTS.filter(p => p.stage === stage && p.type === t).length; });
  return row;
});

const TYPE_MIX = TYPE_KEYS.map(t => {
  const list = INITIAL_PROJECTS.filter(p => p.type === t);
  return { key: t, name: TYPES[t].label, value: list.length, budget: list.reduce((s, p) => s + p.budget, 0), fill: TYPE_COLOR[t].color };
});


export const TOP_PROJECTS = INITIAL_PROJECTS
  .filter(p => p.score != null)
  .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
  .slice(0, 4);

// Quick actions shown under the banner (all open the Sandbox Platform)
const QUICK_ACTIONS = [
  { key: 'new', icon: Plus, color: '#008755', title: 'Submit New Project', titleAr: 'تقديم مشروع جديد', desc: 'Start a sandbox intake request', descAr: 'بدء طلب تقديم للبيئة التجريبية' },
  { key: 'eval', icon: ClipboardCheck, color: '#1d5fa8', title: 'Evaluate Projects', titleAr: 'تقييم المشاريع', desc: '3 evaluations awaiting you', descAr: '3 تقييمات بانتظارك' },
  { key: 'ip', icon: ShieldCheck, color: '#a8710d', title: 'Register IP', titleAr: 'تسجيل ملكية فكرية', desc: 'Patents, trademarks & works', descAr: 'براءات وعلامات ومصنفات' },
  { key: 'ai', icon: Sparkles, color: '#8b6fd4', title: 'Ask the Assistant', titleAr: 'اسأل المساعد', desc: 'AI answers on the portfolio', descAr: 'إجابات ذكية حول المحفظة' },
];

// Mock upcoming sandbox events
export const UPCOMING_EVENTS = [
  { id: 1, day: '05', time: '10:00', title: 'Innovation Evaluation Committee', titleAr: 'لجنة تقييم الابتكار', place: 'HQ · Meeting Room 3', placeAr: 'القيادة العامة · قاعة الاجتماعات 3', kind: 'meeting' },
  { id: 2, day: '12', time: '09:30', title: 'Sandbox Demo Day: Digital Twin — Traffic Network', titleAr: 'يوم العرض التجريبي: التوأم الرقمي لشبكة المرور', place: 'Innovation Lab', placeAr: 'مختبر الابتكار', kind: 'demo' },
  { id: 3, day: '19', time: '13:00', title: 'Khalifa University R&D Partnership Workshop', titleAr: 'ورشة شراكة البحث والتطوير مع جامعة خليفة', place: 'Online', placeAr: 'عن بُعد', kind: 'workshop' },
  { id: 4, day: '30', time: '23:59', title: 'Q1 2027 Sandbox Intake Closes', titleAr: 'إغلاق باب التقديم للربع الأول 2027', place: 'Sandbox Platform', placeAr: 'منصة المشاريع', kind: 'deadline' },
];

export const EVENT_KIND: Record<string, { label: string; labelAr: string; className: string }> = {
  meeting: { label: 'Committee', labelAr: 'لجنة', className: 'bg-blue-50 text-blue-700' },
  demo: { label: 'Demo', labelAr: 'عرض', className: 'bg-[#008755]/10 text-[#008755]' },
  workshop: { label: 'Workshop', labelAr: 'ورشة', className: 'bg-violet-50 text-violet-700' },
  deadline: { label: 'Deadline', labelAr: 'موعد نهائي', className: 'bg-red-50 text-red-700' },
};

// Mock sandbox tasks assigned to the current user
export const SANDBOX_TASKS = [
  { id: 1, title: 'Score evaluation', titleAr: 'إدخال درجات التقييم', project: 'Digital Twin — Traffic Network', due: 'Nov 3', dueAr: '3 نوفمبر', priority: 'high' },
  { id: 2, title: 'Approve budget request', titleAr: 'اعتماد طلب الميزانية', project: 'Autonomous Patrol Drone Study', due: 'Nov 5', dueAr: '5 نوفمبر', priority: 'high' },
  { id: 3, title: 'Review IP filing', titleAr: 'مراجعة طلب الملكية الفكرية', project: 'Forensic DNA Rapid-Analysis Method', due: 'Nov 10', dueAr: '10 نوفمبر', priority: 'medium' },
  { id: 4, title: 'Update feasibility report', titleAr: 'تحديث تقرير الجدوى', project: 'Drone-Assisted Crowd Analytics', due: 'Nov 14', dueAr: '14 نوفمبر', priority: 'low' },
];

export const PRIORITY_META: Record<string, { label: string; labelAr: string; className: string }> = {
  high: { label: 'High', labelAr: 'عالية', className: 'bg-red-50 text-red-700' },
  medium: { label: 'Medium', labelAr: 'متوسطة', className: 'bg-amber-50 text-amber-700' },
  low: { label: 'Low', labelAr: 'منخفضة', className: 'bg-slate-100 text-slate-600' },
};

// Mock 8-quarter history for the KPI tile sparklines (each ends at the live value)
const SPARKS = {
  projects: [8, 10, 11, 12, 14, 15, 17, TOTAL_PROJECTS],
  budget: [22, 27, 31, 35, 39, 43, 47, TOTAL_BUDGET],
  sandbox: [0, 1, 1, 2, 2, 3, 3, IN_SANDBOX],
  ip: [2, 3, 4, 5, 5, 6, 7, IP_GRANTED],
};

// Mock Ideas Platform snapshot
export const IDEAS_MONTHLY = [
  { m: 'May', v: 18 }, { m: 'Jun', v: 24 }, { m: 'Jul', v: 21 },
  { m: 'Aug', v: 29 }, { m: 'Sep', v: 33 }, { m: 'Oct', v: 27 },
];

export const MONTH_AR: Record<string, string> = {
  Jan: 'يناير', Feb: 'فبراير', Mar: 'مارس', Apr: 'أبريل', May: 'مايو', Jun: 'يونيو',
  Jul: 'يوليو', Aug: 'أغسطس', Sep: 'سبتمبر', Oct: 'أكتوبر', Nov: 'نوفمبر', Dec: 'ديسمبر',
};

const AXIS_TICK = { fontSize: 12, fill: '#8a8f98', fontFamily: 'Dubai, sans-serif' };

/** Shared hover tooltip for every chart on the page. */
export function ChartTooltip({ active, payload, label, labelFormatter }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-lg text-xs font-[Dubai] min-w-[140px]">
      {label != null && label !== '' && (
        <p className="mb-1 font-semibold text-[#1a1a1a]">{labelFormatter ? labelFormatter(label) : label}</p>
      )}
      {payload.map((p: any) => (
        <div key={p.dataKey ?? p.name} className="flex items-center gap-2 text-[#555555]">
          <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: p.payload?.fill ?? p.color }} />
          <span>{p.name}</span>
          <span className="ms-auto ps-3 font-semibold text-[#1a1a1a] tabular-nums">{p.value}</span>
        </div>
      ))}
    </div>
  );
}

/** White rounded panel with a title row, used by every dashboard block. */
function Panel({ title, subtitle, action, className = '', children }: {
  title: string; subtitle?: string; action?: ReactNode; className?: string; children: ReactNode;
}) {
  return (
    <div className={`rounded-xl border border-gray-200 bg-white p-4 ${className}`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="text-sm font-semibold text-[#1a1a1a] font-[Dubai]">{title}</h3>
          {subtitle && <p className="text-xs text-[#8a8f98] mt-0.5">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

/** KPI tile: headline number, trend pill and an 8-quarter sparkline. */
function StatTile({ id, icon: Icon, label, value, sub, delta, color, spark, isRTL }: {
  id: string; icon: typeof Award; label: string; value: string; sub: string; delta: string;
  color: string; spark: number[]; isRTL: boolean;
}) {
  const data = spark.map((v, i) => ({ i, v }));
  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-md">
      <div className="p-4 pb-4">
        <div className="flex items-start justify-between">
          <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}1a`, color }}>
            <Icon className="h-[18px] w-[18px]" />
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#008755]/10 text-[#008755] px-2 py-0.5 text-xs font-medium">
            <TrendingUp className="h-3 w-3 rtl:-scale-x-100" />
            {delta}
          </span>
        </div>
        <p className="mt-3 text-xs text-[#666666] font-[Dubai]">{label}</p>
        <p className="text-2xl font-semibold text-[#1a1a1a] tabular-nums leading-tight">{value}</p>
        {/* <p className="text-xs text-[#999999]">{sub}</p> */}
      </div>
      {/* <div className="h-12 mt-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={isRTL ? [...data].reverse() : data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`spark-${id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.28} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="v" stroke={color} strokeWidth={2} fill={`url(#spark-${id})`} dot={false} isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div> */}
    </div>
  );
}

/** Green welcome banner with Sandbox / Ideas buttons — shared by both home page designs. */
export function HomeBanner({ onNavigate }: HomePageProps) {
  const { tr } = useLanguage();
  return (
    <Card className="relative text-white border-none shadow-lg overflow-hidden bg-gradient-to-br from-[#005844] via-[#008755] to-[#00a869]">
      <img
        src={heroDecoration}
        alt=""
        className="absolute -top-16 -end-16 rtl:-scale-x-100 h-160 w-160 rounded-full object-cover opacity-50 pointer-events-none select-none"
      />
      {/* <div className="absolute inset-0 bg-gradient-to-r from-[#005844]/80 to-[#008755]/80" /> */}
      <CardContent className="pt-3 !pb-3 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="h-10 w-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-xl   mb-0.5">
                  {tr('Good Morning, User', 'صباح الخير، المستخدم')}
                </h1>
                <p className="text-white/90 text-sm">
                  {tr('Innovation Sandbox Platform — R&D, Innovation & Knowledge', 'منصة المشاريع للابتكار — البحث والتطوير والابتكار والمعرفة')}
                </p>
              </div>
            </div>
           
          </div>
         <div className="flex items-center gap-2">
  {[
    {
page: 'sandbox-platform' as const,
icon: FlaskConical,
label: tr('Sandbox Platform', 'منصة المشاريع'),
primary: true,
    },
    {
page: 'ideas-platform' as const,
icon: Lightbulb,
label: tr('Ideas Platform', 'منصة الأفكار'),
primary: false,
    },
  ].map(({ page, icon: Icon, label, primary }) => (
    <button
key={page}
type="button"
onClick={() => onNavigate(page)}
className={`inline-flex items-center gap-2 h-10 rounded-full px-4 text-sm font-[Dubai] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
  primary
    ? 'bg-white text-[#005844] shadow-sm hover:bg-white/90'
    : 'border border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20'
}`}
    >
<Icon className="h-4 w-4" />
{label}
    </button>
  ))}
</div>

        </div>
      </CardContent>
    </Card>
  );
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { tr, isRTL } = useLanguage();
  const ts = useSandboxTr();
  const [doneTasks, setDoneTasks] = useState<Set<number>>(new Set());
  const toggleTask = (id: number) =>
    setDoneTasks(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <div className="h-full overflow-hidden flex">
      {/* Main Content Area - Scrollable */}
      <div className="flex-1 overflow-auto">
        <div className="space-y-3 p-3 pe-0">
          <HomeBanner onNavigate={onNavigate} />
 <h2 className="text-lg text-[#1f2937] font-[Dubai] font-normal">
                {tr('Quick Actions', 'إجراءات سريعة')}
              </h2>
          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {QUICK_ACTIONS.map(({ key, icon: Icon, color, title, titleAr, desc, descAr }) => (
              <button
                key={key}
                type="button"
                onClick={() => onNavigate('sandbox-platform')}
                className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 text-start transition-all hover:border-[#008755]/40 hover:shadow-md"
              >
                <div className="h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105" style={{ backgroundColor: `${color}1a`, color }}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#1a1a1a] font-[Dubai] truncate">{tr(title, titleAr)}</p>
                  <p className="text-xs text-[#8a8f98] truncate">{tr(desc, descAr)}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-300 transition-all group-hover:text-[#008755] rtl:rotate-180" />
              </button>
            ))}
          </div>

          {/* Sandbox Overview — KPI tiles */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <h2 className="text-lg text-[#1f2937] font-[Dubai] font-normal">
                {tr('Sandbox Overview', 'نظرة عامة على البيئة التجريبية')}
              </h2>
              <Button variant="ghost" size="sm" className="text-[#008755]" onClick={() => onNavigate('sandbox-platform')}>
                {tr('Open Sandbox', 'فتح البيئة التجريبية')}
                <ChevronRight className="h-4 w-4 ms-1 rtl:rotate-180" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
              <StatTile
                id="projects" icon={FolderKanban} color="#008755" isRTL={isRTL} spark={SPARKS.projects}
                label={tr('Total Projects', 'إجمالي المشاريع')}
                value={String(TOTAL_PROJECTS)}
                sub={tr('Across R&D, Innovation & Knowledge', 'في البحث والتطوير والابتكار والمعرفة')}
                delta="+12%"
              />
              <StatTile
                id="budget" icon={Wallet} color="#1d5fa8" isRTL={isRTL} spark={SPARKS.budget}
                label={tr('Portfolio Budget', 'ميزانية المحفظة')}
                value={isRTL ? `${TOTAL_BUDGET.toFixed(1)} مليون درهم` : money(TOTAL_BUDGET)}
                sub={tr('Approved funding to date', 'التمويل المعتمد حتى الآن')}
                delta="+8%"
              />
              <StatTile
                id="sandbox" icon={FlaskConical} color="#005844" isRTL={isRTL} spark={SPARKS.sandbox}
                label={tr('Reached Sandbox', 'وصلت إلى البيئة التجريبية')}
                value={String(IN_SANDBOX)}
                sub={isRTL
                  ? `${Math.round((IN_SANDBOX / TOTAL_PROJECTS) * 100)}% من المحفظة قيد التجريب`
                  : `${Math.round((IN_SANDBOX / TOTAL_PROJECTS) * 100)}% of portfolio piloting`}
                delta="+33%"
              />
              <StatTile
                id="ip" icon={ShieldCheck} color="#a8710d" isRTL={isRTL} spark={SPARKS.ip}
                label={tr('IP Assets Granted', 'أصول الملكية الفكرية الممنوحة')}
                value={`${IP_GRANTED}/${IP_REGISTER.length}`}
                sub={tr('Patents, trademarks & works', 'براءات وعلامات ومصنفات')}
                delta="+2"
              />
            </div>
          </div>

          {/* Pipeline by stage + Portfolio mix */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
            <Panel
              className="xl:col-span-2"
              title={tr('Project Pipeline', 'مسار المشاريع')}
              subtitle={tr('Projects at each stage, by type', 'المشاريع في كل مرحلة حسب النوع')}
              action={
                <div className="flex items-center gap-3 text-xs text-[#555555]">
                  {TYPE_KEYS.map(t => (
                    <span key={t} className="inline-flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: TYPE_COLOR[t].color }} />
                      {ts(TYPES[t].label)}
                    </span>
                  ))}
                </div>
              }
            >
              <ResponsiveContainer width="100%" height={230}>
                <BarChart data={STAGE_DATA} layout="vertical" barCategoryGap={10} margin={{ top: 0, right: 8, left: 8, bottom: 0 }}>
                  <CartesianGrid horizontal={false} stroke="#eef0f2" />
                  <XAxis type="number" domain={[0, "dataMax"]} reversed={isRTL} allowDecimals={false} axisLine={false} tickLine={false} tick={AXIS_TICK} />
                  <YAxis
                    type="category" dataKey="stage" width={110} orientation={isRTL ? 'right' : 'left'}
                    axisLine={false} tickLine={false}
                    tick={({ x, y, payload }: any) => (
                      // Explicit anchor + LTR direction so labels sit beside the bars in both layouts
                      <text
                        x={x} y={y} dy={4} textAnchor={isRTL ? 'start' : 'end'}
                        style={{ direction: 'ltr', fontSize: 12, fill: '#555555', fontFamily: 'Dubai, sans-serif' }}
                      >
                        {ts(String(payload.value))}
                      </text>
                    )}
                  />
                  <Tooltip cursor={{ fill: '#f5f8fa' }} content={<ChartTooltip labelFormatter={(s: string) => ts(s)} />} />
                  {TYPE_KEYS.map((t, idx) => (
                    <Bar
                      key={t} dataKey={t} stackId="stage" name={ts(TYPES[t].label)} fill={TYPE_COLOR[t].color}
                      stroke="#ffffff" strokeWidth={2}
                      radius={idx === TYPE_KEYS.length - 1 ? (isRTL ? [4, 0, 0, 4] : [0, 4, 4, 0]) : 0}
                    >
                      <LabelList dataKey={t} position="center" fill={TYPE_COLOR[t].label} fontSize={12} formatter={(v: number) => (v > 0 ? v : '')} />
                    </Bar>
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </Panel>

            <Panel title={tr('Portfolio Mix', 'توزيع المحفظة')} subtitle={tr('Share of projects by type', 'نسبة المشاريع حسب النوع')}>
              <div className="relative h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={TYPE_MIX} dataKey="value" nameKey="name" innerRadius={50} outerRadius={70}
                      paddingAngle={3} cornerRadius={4} stroke="#ffffff" strokeWidth={2} startAngle={90} endAngle={-270}
                    >
                      {TYPE_MIX.map(d => <Cell key={d.key} fill={d.fill} name={ts(d.name)} />)}
                    </Pie>
                    <Tooltip content={<ChartTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-semibold text-[#1a1a1a] tabular-nums leading-none">{TOTAL_PROJECTS}</span>
                  <span className="text-xs text-[#8a8f98] mt-1">{tr('Projects', 'مشروع')}</span>
                </div>
              </div>
              <div className="mt-3 space-y-2">
                {TYPE_MIX.map(d => (
                  <div key={d.key} className="flex items-center gap-2 text-xs">
                    <span className="h-2.5 w-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: d.fill }} />
                    <span className="text-[#555555] font-[Dubai]">{ts(d.name)}</span>
                    <span className="ms-auto text-[#8a8f98] tabular-nums">
                      {isRTL ? `${d.budget.toFixed(1)} مليون درهم` : money(d.budget)}
                    </span>
                    <span className="w-10 text-end font-semibold text-[#1a1a1a] tabular-nums">
                      {Math.round((d.value / TOTAL_PROJECTS) * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            </Panel>
          </div>

          {/* Success story spotlight + Upcoming events */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
            <div className="xl:col-span-2 relative overflow-hidden rounded-xl border border-gray-200 bg-white flex flex-col md:flex-row">
              <div className="relative md:w-2/5 h-48 md:h-auto flex-shrink-0">
                <img src={spotlightImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:bg-gradient-to-r rtl:md:bg-gradient-to-l md:from-transparent md:to-black/10" />
                <span className="absolute top-3 start-3 inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-xs font-medium text-[#005844]">
                  <Award className="h-3.5 w-3.5" />
                  {tr('Success Story', 'قصة نجاح')}
                </span>
              </div>
              <div className="flex-1 p-5 flex flex-col">
                <div className="flex items-center gap-2 text-xs text-[#8a8f98] mb-1">
                  <span className={`rounded px-1.5 py-px ${TYPE_COLOR.innov.chip}`}>{ts('Innovation')}</span>
                  <span>{ts('Customer Happiness')}</span>
                </div>
                <h3 className="text-lg text-[#1a1a1a] font-[Dubai] leading-snug">{ts('Smart Queue Management')}</h3>
                <p className="text-xs text-[#666666] leading-relaxed mt-1.5">
                  {tr(
                    'After a six-month sandbox pilot across three service centres, dynamic queue allocation is now live — and patented.',
                    'بعد تجربة استمرت ستة أشهر في ثلاثة مراكز خدمة، أصبح نظام التوزيع الديناميكي للطوابير مطبقاً الآن وحاصلاً على براءة اختراع.'
                  )}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="rounded-lg bg-[#f5f8fa] px-3 py-2">
                    <p className="text-xs text-[#8a8f98]">{tr('Avg. wait before', 'متوسط الانتظار قبل')}</p>
                    <p className="text-base font-semibold text-[#8a8f98] line-through tabular-nums">{tr('25 min', '25 دقيقة')}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#008755] rtl:rotate-180 flex-shrink-0" />
                  <div className="rounded-lg bg-[#008755]/10 px-3 py-2">
                    <p className="text-xs text-[#008755]">{tr('Avg. wait after', 'متوسط الانتظار بعد')}</p>
                    <p className="text-base font-semibold text-[#005844] tabular-nums">{tr('9 min', '9 دقائق')}</p>
                  </div>
                  <span dir="ltr" className="hidden sm:inline-flex rounded-full bg-[#008755] text-white px-2.5 py-1 text-xs font-semibold tabular-nums">−64%</span>
                </div>
                <div className="mt-auto pt-4">
                  <Button size="sm" className="bg-[#008755] hover:bg-[#005844] text-white" onClick={() => onNavigate('sandbox-platform')}>
                    {tr('View Project', 'عرض المشروع')}
                    <ArrowRight className="h-3.5 w-3.5 ms-1 rtl:rotate-180" />
                  </Button>
                </div>
              </div>
            </div>

            <Panel
              title={tr('Upcoming Events', 'الفعاليات القادمة')}
              subtitle={tr('November 2026', 'نوفمبر 2026')}
              action={
                <div className="h-8 w-8 rounded-lg bg-[#008755]/10 text-[#008755] flex items-center justify-center">
                  <CalendarDays className="h-4 w-4" />
                </div>
              }
            >
              <div className="space-y-2.5">
                {UPCOMING_EVENTS.map(ev => (
                  <div key={ev.id} className="flex items-start gap-3">
                    <div className="w-11 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 text-center">
                      <div className="bg-[#008755] text-white text-xs uppercase tracking-wide py-0.5">{tr('Nov', 'نوف')}</div>
                      <div className="text-base font-semibold text-[#1a1a1a] tabular-nums py-0.5">{ev.day}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#1a1a1a] font-[Dubai] leading-snug line-clamp-2">{tr(ev.title, ev.titleAr)}</p>
                      <div className="flex items-center gap-1.5 mt-1 text-xs text-[#8a8f98]">
                        <span className={`rounded px-1.5 py-px ${EVENT_KIND[ev.kind].className}`}>
                          {tr(EVENT_KIND[ev.kind].label, EVENT_KIND[ev.kind].labelAr)}
                        </span>
                        <span className="tabular-nums">{ev.time}</span>
                        <span className="truncate">· {tr(ev.place, ev.placeAr)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>

          {/* My sandbox tasks + Partners */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
            <Panel
              className="xl:col-span-2"
              title={tr('My Sandbox Tasks', 'مهامي في البيئة التجريبية')}
              subtitle={isRTL
                ? `${SANDBOX_TASKS.length - doneTasks.size} مهام متبقية`
                : `${SANDBOX_TASKS.length - doneTasks.size} of ${SANDBOX_TASKS.length} remaining`}
              action={
                <Button variant="ghost" size="sm" className="h-7 text-xs text-[#008755]" onClick={() => onNavigate('sandbox-platform')}>
                  {tr('View All', 'عرض الكل')}
                  <ChevronRight className="h-3.5 w-3.5 ms-1 rtl:rotate-180" />
                </Button>
              }
            >
              <div className="divide-y divide-gray-100">
                {SANDBOX_TASKS.map(task => {
                  const done = doneTasks.has(task.id);
                  const pr = PRIORITY_META[task.priority];
                  return (
                    <div key={task.id} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                      <button
                        type="button"
                        aria-pressed={done}
                        aria-label={tr('Mark as done', 'وضع علامة كمكتملة')}
                        onClick={() => toggleTask(task.id)}
                        className={`h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${done ? 'bg-[#008755] border-[#008755] text-white' : 'border-gray-300 hover:border-[#008755]'}`}
                      >
                        {done && <Check className="h-3 w-3" strokeWidth={3} />}
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-[Dubai] truncate ${done ? 'text-[#8a8f98] line-through' : 'text-[#1a1a1a]'}`}>
                          {tr(task.title, task.titleAr)}
                        </p>
                        <p className="text-xs text-[#8a8f98] truncate">{ts(task.project)}</p>
                      </div>
                      <span className={`hidden sm:inline rounded px-1.5 py-px text-xs ${pr.className}`}>{tr(pr.label, pr.labelAr)}</span>
                      <span className="inline-flex items-center gap-1 text-xs text-[#8a8f98] w-20 justify-end flex-shrink-0">
                        <Clock className="h-3 w-3" />
                        {tr(task.due, task.dueAr)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Panel>

            <Panel
              title={tr('Partner Network', 'شبكة الشركاء')}
              subtitle={isRTL ? `${PARTNERS.length} شركاء نشطين` : `${PARTNERS.length} active partners`}
              action={
                <div className="h-8 w-8 rounded-lg bg-[#8b6fd4]/10 text-[#8b6fd4] flex items-center justify-center">
                  <Handshake className="h-4 w-4" />
                </div>
              }
            >
              <div className="space-y-2.5">
                {PARTNERS.slice(0, 4).map(pt => (
                  <div key={pt.name} className="flex items-center gap-2.5">
                    <div
                      className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${pt.gradientFrom}, ${pt.gradientTo})` }}
                    >
                      {pt.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#1a1a1a] font-[Dubai] truncate">{ts(pt.name)}</p>
                      <p className="text-xs text-[#8a8f98]">{ts(pt.type)}</p>
                    </div>
                    <span className="text-xs text-[#555555] tabular-nums flex-shrink-0">
                      {isRTL ? `${pt.activeProjects} مشاريع` : `${pt.activeProjects} projects`}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                <div className="flex gap-1">
                  {PARTNERS.slice(4).map(pt => (
                    <div
                      key={pt.name}
                      title={ts(pt.name)}
                      className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                      style={{ background: `linear-gradient(135deg, ${pt.gradientFrom}, ${pt.gradientTo})` }}
                    >
                      {pt.initials}
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => onNavigate('sandbox-platform')} className="text-xs text-[#008755] hover:underline">
                  {isRTL ? `+${PARTNERS.length - 4} آخرين` : `+${PARTNERS.length - 4} more`}
                </button>
              </div>
            </Panel>
          </div>

          {/* Top evaluated projects + Ideas snapshot */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
            <Panel
              className="xl:col-span-2"
              title={tr('Top Evaluated Projects', 'المشاريع الأعلى تقييماً')}
              subtitle={tr('Highest evaluation panel scores', 'أعلى درجات لجنة التقييم')}
              action={
                <Button variant="ghost" size="sm" className="h-7 text-xs text-[#008755]" onClick={() => onNavigate('sandbox-platform')}>
                  {tr('View All', 'عرض الكل')}
                  <ChevronRight className="h-3.5 w-3.5 ms-1 rtl:rotate-180" />
                </Button>
              }
            >
              <div className="divide-y divide-gray-100">
                {TOP_PROJECTS.map((p, i) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => onNavigate('sandbox-platform')}
                    className="w-full flex items-center gap-3 py-2.5 first:pt-0 last:pb-0 text-start group"
                  >
                    <span className="h-7 w-7 rounded-lg bg-[#f5f8fa] text-xs font-semibold text-[#555555] flex items-center justify-center flex-shrink-0 tabular-nums">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#1a1a1a] truncate font-[Dubai] group-hover:text-[#008755] transition-colors">{ts(p.name)}</p>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-[#8a8f98]">
                        <span className={`rounded px-1.5 py-px ${TYPE_COLOR[p.type].chip}`}>{ts(TYPES[p.type].label)}</span>
                        <span>{ts(p.stage)}</span>
                        <span className="hidden sm:inline">· {ts(p.dept)}</span>
                      </div>
                    </div>
                    <div className="w-32 flex items-center gap-2 flex-shrink-0">
                      <div className="flex-1 h-1.5 rounded-full bg-[#f0f2f4] overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${p.score}%`, backgroundColor: TYPE_COLOR[p.type].color }} />
                      </div>
                      <span className="text-sm font-semibold text-[#1a1a1a] tabular-nums w-7 text-end">{p.score}</span>
                    </div>
                  </button>
                ))}
              </div>
            </Panel>

            <Panel
              title={tr('Ideas Platform', 'منصة الأفكار')}
              subtitle={tr('Monthly idea submissions', 'الأفكار المقدمة شهرياً')}
              action={
                <div className="h-8 w-8 rounded-lg bg-[#26D07C]/15 text-[#008755] flex items-center justify-center">
                  <Lightbulb className="h-4 w-4" />
                </div>
              }
            >
              <div className="grid grid-cols-3 gap-2 mb-2">
                {[
                  [tr('Submitted', 'المقدمة'), '248'],
                  [tr('In Review', 'قيد المراجعة'), '37'],
                  [tr('To Sandbox', 'إلى البيئة التجريبية'), '12'],
                ].map(([l, v]) => (
                  <div key={l} className="rounded-lg bg-[#f5f8fa] px-2 py-1.5">
                    <p className="text-base font-semibold text-[#1a1a1a] tabular-nums leading-tight">{v}</p>
                    <p className="text-xs text-[#8a8f98] truncate">{l}</p>
                  </div>
                ))}
              </div>
              <ResponsiveContainer width="100%" height={92}>
                <BarChart data={IDEAS_MONTHLY} margin={{ top: 14, right: 0, left: 0, bottom: 0 }}>
                  <XAxis
                    dataKey="m" reversed={isRTL} axisLine={false} tickLine={false} tick={AXIS_TICK}
                    tickFormatter={(m) => (isRTL ? MONTH_AR[m] ?? m : m)}
                  />
                  <Tooltip
                    cursor={{ fill: '#f5f8fa' }}
                    content={<ChartTooltip labelFormatter={(m: string) => (isRTL ? MONTH_AR[m] ?? m : m)} />}
                  />
                  <Bar dataKey="v" name={tr('Ideas', 'الأفكار')} fill="#26D07C" radius={[4, 4, 0, 0]} maxBarSize={22}>
                    <LabelList dataKey="v" position="top" fill="#555555" fontSize={12} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <button
                type="button"
                onClick={() => onNavigate('ideas-platform')}
                className="mt-2 w-full inline-flex items-center justify-center gap-1 rounded-lg border border-gray-200 py-1.5 text-xs text-[#008755] hover:bg-[#f5f8fa] transition-colors font-[Dubai]"
              >
                {tr('Open Ideas Platform', 'فتح منصة الأفكار')}
                <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
              </button>
            </Panel>
          </div>
        </div>
      </div>

      {/* Fixed Right Sidebar */}
      <div className="w-80 border-s bg-gray-50 overflow-auto flex-shrink-0">
        <div className="p-6 space-y-8 bg-white">
          {/* Announcements */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-5 w-5 text-[#008755]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>
              </div>
              <h3 className="  text-[#008755] font-[Dubai]">
                {tr('Announcements', 'الإعلانات')}
              </h3>
            </div>
            <div className="space-y-2">
              {announcements.map((announcement) => (
                <Card key={announcement.id} className="border border-gray-200 bg-white rounded-xl">
                  <CardContent className="p-3">
                    <h4 className="  text-sm text-[#1a1a1a] mb-1.5 leading-snug font-[Dubai]">
                      {tr(announcement.title, announcement.titleAr)}
                    </h4>
                    <p className="text-xs text-[#666666] mb-2 leading-relaxed">
                      {tr(announcement.description, announcement.descriptionAr)}
                    </p>
                    {announcement.badges.length > 0 && (
                      <div className="flex gap-2 mb-2">
                        {announcement.badges.map((badge, idx) => (
                          <Badge
                            key={idx}
                            className={`text-xs px-2 py-0.5 rounded ${badge.className}`}
                          >
                            {tr(badge.label, badge.labelAr)}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 text-xs text-[#999999]">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                        <line x1="16" x2="16" y1="2" y2="6" />
                        <line x1="8" x2="8" y1="2" y2="6" />
                        <line x1="3" x2="21" y1="10" y2="10" />
                      </svg>
                      <span>{tr(announcement.timestamp, announcement.timestampAr)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-5 w-5 text-[#008755]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>
              </div>
              <h3 className="  text-[#008755] font-[Dubai]">
                {tr('Recent Activity', 'النشاط الأخير')}
              </h3>
            </div>
            <div className="space-y-2">
              {recentActivity.map((activity) => {
                const { icon: ActivityIcon, color } = ACTIVITY_STYLE[activity.type] ?? ACTIVITY_STYLE.info;
                return (
                  <Card key={activity.id} className="border border-gray-200 bg-white rounded-xl">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2 mb-1.5">
                        <div
                          className="h-6 w-6 rounded-md flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${color}1a`, color }}
                        >
                          <ActivityIcon className="h-3.5 w-3.5" />
                        </div>
                        <h4 className="  text-sm text-[#1a1a1a] leading-snug font-[Dubai]">
                          {tr(activity.title, activity.titleAr)}
                        </h4>
                      </div>
                      <p className="text-xs text-[#666666] mb-2 leading-relaxed">
                        {tr(activity.text, activity.textAr)}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-[#999999]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span>{tr(activity.timestamp, activity.timestampAr)}</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}