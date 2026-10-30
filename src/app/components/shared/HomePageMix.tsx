import type { ReactNode } from "react";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  FlaskConical,
  FolderKanban,
  Handshake,
  Lightbulb,
  MapPin,
  Megaphone,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, LabelList, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import {
  INITIAL_PROJECTS, IP_REGISTER, STAGES, STATUS_META, money,
  type ProjectStatus,
} from "../sandbox/sandboxData";
import { useSandboxTr } from "../sandbox/sandboxI18n";
import { useLanguage } from "../../i18n/LanguageContext";
import {
  ACTIVITY_STYLE,
  ChartTooltip,
  EVENT_KIND,
  HomeBanner,
  IDEAS_MONTHLY,
  IN_SANDBOX,
  IP_GRANTED,
  MONTH_AR,
  TOP_PROJECTS,
  TOTAL_BUDGET,
  TOTAL_PROJECTS,
  TYPE_COLOR,
  TYPE_KEYS,
  UPCOMING_EVENTS,
  announcements,
  recentActivity,
  type HomePageProps,
} from "./HomePage";
import { Ring, STAGE_TONES, TYPE_GRADIENT } from "./HomePageBento";

// ── Data for option 3 ──────────────────────────────────────────────────────
const TYPE_LABEL = { rd: 'R&D', innov: 'Innovation', know: 'Knowledge' } as const;

const TYPE_MIX = TYPE_KEYS.map(t => {
  const list = INITIAL_PROJECTS.filter(p => p.type === t);
  return { key: t, name: TYPE_LABEL[t], value: list.length, budget: list.reduce((s, p) => s + p.budget, 0), fill: TYPE_COLOR[t].color };
});

const STATUS_ORDER: ProjectStatus[] = ['Ongoing', 'Completed', 'Pending Approval', 'Delayed', 'Rejected'];
const STATUS_DATA = STATUS_ORDER.map(status => ({ status, count: INITIAL_PROJECTS.filter(p => p.status === status).length }));

// Budget per department (AED M), largest first, top 6
const DEPT_BUDGET = Object.entries(
  INITIAL_PROJECTS.reduce<Record<string, number>>((acc, p) => {
    acc[p.dept] = (acc[p.dept] ?? 0) + p.budget;
    return acc;
  }, {}),
)
  .map(([dept, budget]) => ({ dept, budget: Math.round(budget * 10) / 10 }))
  .sort((a, b) => b.budget - a.budget)
  .slice(0, 6);

const IP_KINDS = ['Patent', 'Trademark', 'Intellectual Work'] as const;
const IP_DATA = IP_KINDS.map(kind => {
  const list = IP_REGISTER.filter(i => i.kind === kind);
  return { kind, granted: list.filter(i => i.status === 'Granted').length, pending: list.filter(i => i.status !== 'Granted').length };
});

// Mock quarterly intake vs. completed evaluations
const QUARTERLY_TREND = [
  { q: 'Q4 2024', intake: 3, evaluated: 1 },
  { q: 'Q1 2025', intake: 2, evaluated: 2 },
  { q: 'Q2 2025', intake: 4, evaluated: 2 },
  { q: 'Q3 2025', intake: 3, evaluated: 3 },
  { q: 'Q4 2025', intake: 5, evaluated: 3 },
  { q: 'Q1 2026', intake: 4, evaluated: 4 },
  { q: 'Q2 2026', intake: 6, evaluated: 3 },
  { q: 'Q3 2026', intake: 7, evaluated: 5 },
];

// Mock 8-quarter history for the KPI sparklines (each ends at the live value)
const SPARKS = {
  projects: [8, 10, 11, 12, 14, 15, 17, TOTAL_PROJECTS],
  budget: [22, 27, 31, 35, 39, 43, 47, TOTAL_BUDGET],
  sandbox: [0, 1, 1, 2, 2, 3, 3, IN_SANDBOX],
  ip: [2, 3, 4, 5, 5, 6, 7, IP_GRANTED],
};

// Mock Ideas Platform funnel
const IDEAS_FUNNEL = [
  { label: 'Submitted', labelAr: 'المقدمة', value: 248 },
  { label: 'In review', labelAr: 'قيد المراجعة', value: 37 },
  { label: 'Promoted to sandbox', labelAr: 'انتقلت إلى البيئة التجريبية', value: 12 },
];

const AXIS = { fontSize: 12, fill: '#6b7280', fontFamily: 'Dubai, sans-serif' };
const CARD = 'rounded-2xl bg-white border border-[#e6ebe9]';

// ── Building blocks ────────────────────────────────────────────────────────
function SectionTitle({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-3 mb-3">
      <div>
        <h2 className="text-lg text-[#00205B] font-[Dubai] leading-tight">{title}</h2>
        {subtitle && <p className="text-sm text-[#6b7280] mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

function Card({ title, subtitle, action, className = '', children }: {
  title: string; subtitle?: string; action?: ReactNode; className?: string; children: ReactNode;
}) {
  return (
    <section className={`${CARD} p-5 flex flex-col ${className}`}>
      <header className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="text-[15px] font-semibold text-[#00205B] font-[Dubai] leading-tight">{title}</h3>
          {subtitle && <p className="text-xs text-[#6b7280] mt-1">{subtitle}</p>}
        </div>
        {action}
      </header>
      <div className="flex-1 flex flex-col">{children}</div>
    </section>
  );
}

function LegendDot({ color, label, line = false }: { color: string; label: string; line?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-[#4b5563]">
      <span className={line ? 'h-0.5 w-3.5 rounded' : 'h-2.5 w-2.5 rounded-full'} style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}

function KpiTile({ id, icon: Icon, label, value, delta, color, spark, isRTL }: {
  id: string; icon: typeof Wallet; label: string; value: string; delta: string; color: string; spark: number[]; isRTL: boolean;
}) {
  const data = spark.map((v, i) => ({ i, v }));
  return (
    <div className={`${CARD} overflow-hidden`}>
      <div className="p-5 pb-5">
        <div className="flex items-center justify-between">
          <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}14`, color }}>
            <Icon className="h-5 w-5" />
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#008755]/10 px-2 py-0.5 text-xs font-medium text-[#008755]">
            <TrendingUp className="h-3.5 w-3.5 rtl:-scale-x-100" />
            {delta}
          </span>
        </div>
        <p className="mt-4 text-sm text-[#6b7280] font-[Dubai]">{label}</p>
        <p className="mt-0.5 text-[26px] font-semibold text-[#00205B] tabular-nums leading-tight">{value}</p>
      </div>
      {/* <div className="h-14">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={isRTL ? [...data].reverse() : data} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`mix-spark-${id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.22} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="v" stroke={color} strokeWidth={2} fill={`url(#mix-spark-${id})`} dot={false} isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div> */}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export function HomePageMix({ onNavigate }: HomePageProps) {
  const { tr, isRTL } = useLanguage();
  const ts = useSandboxTr();
  const fmtBudget = (v: number) => (isRTL ? `${v.toFixed(1)} مليون درهم` : money(v));
  const fmtQuarter = (value: any) => {
    const [q, year] = String(value).split(' ');
    return isRTL ? `الربع ${q.slice(1)} ${year}` : String(value);
  };
  const sandboxPct = Math.round((IN_SANDBOX / TOTAL_PROJECTS) * 100);
  const ipPct = Math.round((IP_GRANTED / IP_REGISTER.length) * 100);
  const ideasMax = IDEAS_FUNNEL[0].value;

  // Category-axis tick that stays beside the bars in both reading directions
  const categoryTick = (width: number) => ({ x, y, payload }: any) => (
    <text
      x={x} y={y} dy={4} textAnchor={isRTL ? 'start' : 'end'}
      style={{ direction: 'ltr', fontSize: 12, fill: '#4b5563', fontFamily: 'Dubai, sans-serif' }}
    >
      {(() => {
        const label = ts(String(payload.value));
        return label.length * 6.5 > width ? `${label.slice(0, Math.floor(width / 6.5) - 1)}…` : label;
      })()}
    </text>
  );

  return (
    <div className="h-full overflow-auto bg-[#f5f7f6]">
      <div className="mx-auto px-5 py-4 pb-24 space-y-8">

        {/* ── Banner + announcements ─────────────────────────────────── */}
        <div className="space-y-3">
          <HomeBanner onNavigate={onNavigate} />
          <div className={`${CARD} flex flex-col lg:flex-row lg:items-center divide-y lg:divide-y-0 lg:divide-x rtl:lg:divide-x-reverse divide-[#e6ebe9]`}>
            <div className="flex items-center gap-2 px-5 py-3 text-[#005844] flex-shrink-0">
              <Megaphone className="h-4 w-4" />
              <span className="text-sm font-semibold font-[Dubai]">{tr('Announcements', 'الإعلانات')}</span>
            </div>
            {announcements.map(a => (
              <div key={a.id} className="flex-1 min-w-0 flex items-center gap-2.5 px-5 py-3">
                {a.badges.slice(0, 1).map(b => (
                  <span key={b.label} className={`rounded-md px-2 py-0.5 text-xs flex-shrink-0 ${b.className}`}>{tr(b.label, b.labelAr)}</span>
                ))}
                <span className="text-sm text-[#00205B] truncate">{tr(a.title, a.titleAr)}</span>
                <span className="ms-auto text-xs text-[#9ca3af] whitespace-nowrap">{tr(a.timestamp, a.timestampAr)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Overview KPIs ──────────────────────────────────────────── */}
        <section>
          <SectionTitle title={tr('Overview', 'نظرة عامة')} subtitle={tr('Sandbox portfolio at a glance', 'محفظة البيئة التجريبية في لمحة')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <KpiTile id="projects" icon={FolderKanban} color="#008755" isRTL={isRTL} spark={SPARKS.projects} delta="+12%"
              label={tr('Total Projects', 'إجمالي المشاريع')} value={String(TOTAL_PROJECTS)} />
            <KpiTile id="budget" icon={Wallet} color="#00426A" isRTL={isRTL} spark={SPARKS.budget} delta="+8%"
              label={tr('Portfolio Budget', 'ميزانية المحفظة')} value={fmtBudget(TOTAL_BUDGET)} />
            <KpiTile id="sandbox" icon={FlaskConical} color="#005844" isRTL={isRTL} spark={SPARKS.sandbox} delta="+33%"
              label={tr('Reached Sandbox', 'وصلت إلى البيئة التجريبية')} value={String(IN_SANDBOX)} />
            <KpiTile id="ip" icon={ShieldCheck} color="#05868E" isRTL={isRTL} spark={SPARKS.ip} delta="+2"
              label={tr('IP Assets Granted', 'أصول الملكية الفكرية الممنوحة')} value={`${IP_GRANTED}/${IP_REGISTER.length}`} />
          </div>
        </section>

        {/* ── Portfolio insights ─────────────────────────────────────── */}
        <section className="space-y-4">
          <SectionTitle
            title={tr('Portfolio Insights', 'رؤى المحفظة')}
            subtitle={tr('Where projects are, how they are moving and where the money goes', 'أين تقع المشاريع وكيف تتقدم وأين يُنفق التمويل')}
            action={
              <button type="button" onClick={() => onNavigate('sandbox-platform')} className="inline-flex items-center gap-1 text-sm text-[#008755] hover:underline">
                {tr('Open Sandbox', 'فتح البيئة التجريبية')}
                <ChevronRight className="h-4 w-4 rtl:rotate-180" />
              </button>
            }
          />

          {/* Journey + mix */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
            <Card
              className="xl:col-span-8"
              title={tr('Innovation Journey', 'رحلة الابتكار')}
              subtitle={isRTL
                ? `${IN_SANDBOX} من ${TOTAL_PROJECTS} مشروعاً وصلت إلى البيئة التجريبية (${sandboxPct}%)`
                : `${IN_SANDBOX} of ${TOTAL_PROJECTS} projects have reached the sandbox (${sandboxPct}%)`}
              action={<div className="hidden md:flex gap-3">{TYPE_KEYS.map(t => <LegendDot key={t} color={TYPE_COLOR[t].color} label={ts(TYPE_LABEL[t])} />)}</div>}
            >
              <ol className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {STAGES.map((stage, i) => {
                  const list = INITIAL_PROJECTS.filter(p => p.stage === stage);
                  return (
                    <li key={stage} className="relative">
                      <div className="h-full rounded-xl bg-[#f7faf9] p-4 flex flex-col">
                        <span
                          className="h-7 w-7 rounded-full text-xs font-semibold flex items-center justify-center"
                          style={{ backgroundColor: STAGE_TONES[i], color: i < 2 ? '#00205B' : '#ffffff' }}
                        >
                          {i + 1}
                        </span>
                        <p className="mt-3 text-sm text-[#00205B] font-[Dubai] leading-tight">{ts(stage)}</p>
                        <p className="mt-4 text-3xl font-semibold text-[#00205B] tabular-nums leading-none">{list.length}</p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {list.map(p => (
                            <span key={p.id} title={ts(p.name)} className="h-3 w-3 rounded-full" style={{ backgroundColor: TYPE_COLOR[p.type].color }} />
                          ))}
                        </div>
                      </div>
                      {i < STAGES.length - 1 && (
                        <ChevronRight className="hidden md:block absolute top-1/2 -end-[14px] -translate-y-1/2 z-10 h-4 w-4 text-[#b6c2be] rtl:rotate-180" />
                      )}
                    </li>
                  );
                })}
              </ol>
              <div className="mt-auto pt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { value: tr('14 months', '14 شهراً'), label: tr('Avg. time from idea to sandbox', 'متوسط المدة من الفكرة إلى البيئة التجريبية') },
                  { value: `${ts('Development')} · 7`, label: tr('Busiest stage right now', 'المرحلة الأكثر نشاطاً حالياً') },
                  { value: `${sandboxPct}%`, label: tr('Conversion to sandbox', 'نسبة الوصول إلى البيئة التجريبية') },
                ].map(({ value, label }) => (
                  <div key={label} className="rounded-xl border border-[#e6ebe9] px-4 py-3">
                    <p className="text-base font-semibold text-[#00205B] leading-tight">{value}</p>
                    <p className="mt-0.5 text-xs text-[#6b7280]">{label}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="xl:col-span-4" title={tr('Portfolio Mix', 'توزيع المحفظة')} subtitle={tr('Projects and funding by type', 'المشاريع والتمويل حسب النوع')}>
              <div className="relative h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={TYPE_MIX} dataKey="value" nameKey="name" innerRadius={50} outerRadius={70}
                      paddingAngle={3} cornerRadius={4} stroke="#ffffff" strokeWidth={2} startAngle={90} endAngle={-270}>
                      {TYPE_MIX.map(d => <Cell key={d.key} fill={d.fill} name={ts(d.name)} />)}
                    </Pie>
                    <Tooltip content={<ChartTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-semibold text-[#00205B] tabular-nums leading-none">{TOTAL_PROJECTS}</span>
                  <span className="text-xs text-[#6b7280] mt-1">{tr('Projects', 'مشروع')}</span>
                </div>
              </div>
              <div className="mt-4 space-y-2.5">
                {TYPE_MIX.map(d => (
                  <div key={d.key} className="flex items-center gap-2 text-sm">
                    <span className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: d.fill }} />
                    <span className="text-[#374151] font-[Dubai]">{ts(d.name)}</span>
                    <span className="ms-auto text-xs text-[#6b7280] tabular-nums">{fmtBudget(d.budget)}</span>
                    <span className="w-10 text-end font-semibold text-[#00205B] tabular-nums">{Math.round((d.value / TOTAL_PROJECTS) * 100)}%</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Trend + status */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
            <Card
              className="xl:col-span-8"
              title={tr('Intake & Evaluation Trend', 'اتجاه التقديم والتقييم')}
              subtitle={tr('New submissions vs. completed evaluations per quarter', 'التقديمات الجديدة مقابل التقييمات المكتملة لكل ربع')}
              action={
                <div className="hidden md:flex gap-3">
                  <LegendDot line color="#008755" label={tr('Submissions', 'التقديمات')} />
                  <LegendDot line color="#00426A" label={tr('Evaluations', 'التقييمات')} />
                </div>
              }
            >
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={QUARTERLY_TREND} margin={isRTL ? { top: 8, right: 0, left: 40, bottom: 0 } : { top: 8, right: 40, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="mix-intake" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#008755" stopOpacity={0.22} />
                      <stop offset="100%" stopColor="#008755" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="mix-eval" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00426A" stopOpacity={0.14} />
                      <stop offset="100%" stopColor="#00426A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#eef1f0" />
                  <XAxis dataKey="q" reversed={isRTL} interval={0} padding={{ left: 20, right: 20 }} axisLine={false} tickLine={false} tick={AXIS} tickFormatter={fmtQuarter} />
                  <YAxis allowDecimals={false} width={28} orientation={isRTL ? 'right' : 'left'} axisLine={false} tickLine={false} tick={AXIS} />
                  <Tooltip cursor={{ stroke: '#c5cfcb', strokeDasharray: '3 3' }} content={<ChartTooltip labelFormatter={fmtQuarter} />} />
                  <Area type="monotone" dataKey="intake" name={tr('Submissions', 'التقديمات')} stroke="#008755" strokeWidth={2}
                    fill="url(#mix-intake)" dot={false} activeDot={{ r: 5, stroke: '#ffffff', strokeWidth: 2 }} />
                  <Area type="monotone" dataKey="evaluated" name={tr('Evaluations', 'التقييمات')} stroke="#00426A" strokeWidth={2}
                    fill="url(#mix-eval)" dot={false} activeDot={{ r: 5, stroke: '#ffffff', strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            <Card className="xl:col-span-4" title={tr('Project Status', 'حالة المشاريع')} subtitle={tr('Current delivery status', 'حالة التنفيذ الحالية')}>
              <div className="space-y-4">
                {STATUS_DATA.map(({ status, count }) => {
                  const pct = Math.round((count / TOTAL_PROJECTS) * 100);
                  return (
                    <div key={status}>
                      <div className="flex items-center justify-between text-sm mb-1.5">
                        <span className="text-[#374151] font-[Dubai]">{ts(status)}</span>
                        <span className="inline-flex items-baseline gap-1.5 tabular-nums">
                          <span className="font-semibold text-[#00205B]">{count}</span>
                          <span className="text-xs text-[#6b7280]">{pct}%</span>
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-[#eef1f0] overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: STATUS_META[status].dot }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Budget by department + IP portfolio */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
            <Card
              className="xl:col-span-7"
              title={tr('Budget by Department', 'الميزانية حسب الإدارة')}
              subtitle={tr('Approved funding, AED millions — top 6 departments', 'التمويل المعتمد بملايين الدراهم — أعلى 6 إدارات')}
            >
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={DEPT_BUDGET} layout="vertical" barCategoryGap={8} margin={{ top: 0, right: isRTL ? 8 : 40, left: isRTL ? 40 : 8, bottom: 0 }}>
                  <CartesianGrid horizontal={false} stroke="#eef1f0" />
                  <XAxis type="number" reversed={isRTL} axisLine={false} tickLine={false} tick={AXIS} />
                  <YAxis type="category" dataKey="dept" width={160} orientation={isRTL ? 'right' : 'left'} axisLine={false} tickLine={false} tick={categoryTick(150)} />
                  <Tooltip cursor={{ fill: '#f5f7f6' }} content={<ChartTooltip labelFormatter={(d: string) => ts(d)} />} />
                  <Bar dataKey="budget" name={tr('Budget (AED M)', 'الميزانية (مليون درهم)')} fill="#008755" radius={isRTL ? [4, 0, 0, 4] : [0, 4, 4, 0]} maxBarSize={22}>
                    <LabelList
                      dataKey="budget"
                      content={({ x, y, width, height, value }: any) => {
                        // Value just past the bar end, on the correct side in both reading directions
                        const end = isRTL ? Math.min(x, x + width) - 6 : Math.max(x, x + width) + 6;
                        return (
                          <text x={end} y={y + height / 2} dy={4} textAnchor={isRTL ? 'end' : 'start'}
                            style={{ direction: 'ltr', fontSize: 12, fill: '#374151', fontFamily: 'Dubai, sans-serif' }}>
                            {value}
                          </text>
                        );
                      }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="xl:col-span-5" title={tr('IP Portfolio', 'محفظة الملكية الفكرية')} subtitle={tr('Granted vs. under approval', 'الممنوحة مقابل قيد الاعتماد')}>
              <div className="flex-1 flex items-center gap-5">
                <Ring pct={ipPct} color="#008755" size={104} stroke={10}>
                  <div className="text-center leading-tight">
                    <p className="text-xl font-semibold text-[#00205B] tabular-nums">{ipPct}%</p>
                    <p className="text-xs text-[#6b7280]">{tr('granted', 'ممنوحة')}</p>
                  </div>
                </Ring>
                <div className="flex-1 space-y-3">
                  {IP_DATA.map(({ kind, granted, pending }) => {
                    const total = granted + pending;
                    return (
                      <div key={kind}>
                        <div className="flex items-center justify-between text-sm mb-1.5">
                          <span className="text-[#374151] font-[Dubai]">{ts(kind)}</span>
                          <span className="text-xs text-[#6b7280] tabular-nums">{granted}/{total}</span>
                        </div>
                        <div className="flex h-2 rounded-full overflow-hidden bg-[#eef1f0] gap-0.5">
                          <div className="h-full bg-[#008755]" style={{ width: `${(granted / total) * 100}%` }} />
                          <div className="h-full bg-[#9BE3BF]" style={{ width: `${(pending / total) * 100}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="pt-5 flex gap-4">
                <LegendDot color="#008755" label={tr('Granted', 'ممنوحة')} />
                <LegendDot color="#9BE3BF" label={tr('Under approval', 'قيد الاعتماد')} />
              </div>
            </Card>
          </div>
        </section>

        {/* ── Featured projects ──────────────────────────────────────── */}
        <section>
          <SectionTitle title={tr('Featured Projects', 'مشاريع مميزة')} subtitle={tr('Highest scores from the evaluation panel', 'أعلى الدرجات من لجنة التقييم')} />
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {TOP_PROJECTS.slice(0, 3).map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onNavigate('sandbox-platform')}
                  className={`${CARD} group text-start overflow-hidden flex flex-col transition hover:-translate-y-0.5 hover:shadow-lg`}
                >
                  <div className="relative h-20 flex-shrink-0 p-4 text-white" style={{ background: TYPE_GRADIENT[p.type] }}>
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="rounded-md bg-white/20 px-2 py-0.5">{ts(TYPE_LABEL[p.type])}</span>
                      <span className="rounded-md bg-white/10 px-2 py-0.5">{ts(p.stage)}</span>
                    </div>
                    <div className="absolute -bottom-6 end-4 h-12 w-12 rounded-full bg-white shadow-md flex items-center justify-center">
                      <Ring pct={p.score ?? 0} color={TYPE_COLOR[p.type].color} size={44} stroke={4}>
                        <span className="text-xs font-bold text-[#00205B] tabular-nums">{p.score}</span>
                      </Ring>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col p-4 pt-5">
                    <p className="text-sm text-[#00205B] font-[Dubai] leading-snug line-clamp-2 pe-12 group-hover:text-[#008755] transition-colors">{ts(p.name)}</p>
                    <p className="mt-1 text-xs text-[#6b7280] truncate">{ts(p.dept)}</p>
                    <p className="mt-3 text-xs text-[#4b5563] leading-relaxed line-clamp-3">{ts(p.desc)}</p>
                    <div className="mt-auto pt-4 flex items-center justify-between text-xs">
                      <span className="text-[#374151] tabular-nums">{fmtBudget(p.budget)}</span>
                      <span className="rounded-md bg-[#f1f4f3] px-2 py-0.5 text-[#374151]">{p.type === 'rd' ? `TRL ${p.trl}` : ts(p.cls)}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

          </div>
        </section>

        {/* ── Activity & ideas ───────────────────────────────────────── */}
        <section>
          <SectionTitle title={tr('Activity, Agenda & Ideas', 'النشاط وجدول الأعمال والأفكار')} subtitle={tr('Latest updates, upcoming events and the ideas pipeline', 'آخر التحديثات والفعاليات القادمة ومسار الأفكار')} />
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            <Card title={tr('Activity Feed', 'سجل النشاط')} subtitle={tr('Latest updates across the sandbox', 'آخر التحديثات في البيئة التجريبية')}>
              <ol className="space-y-5">
                {recentActivity.map((a, i) => {
                  const { icon: Icon, color } = ACTIVITY_STYLE[a.type] ?? ACTIVITY_STYLE.info;
                  return (
                    <li key={a.id} className="relative flex gap-3">
                      {i < recentActivity.length - 1 && <span className="absolute top-10 bottom-[-20px] start-[17px] w-px bg-[#e6ebe9]" />}
                      <span className="relative h-9 w-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}1a`, color }}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="flex-1 min-w-0 pt-0.5">
                        <div className="flex items-baseline gap-2">
                          <p className="text-sm font-semibold text-[#00205B] font-[Dubai]">{tr(a.title, a.titleAr)}</p>
                          <span className="ms-auto text-xs text-[#9ca3af] whitespace-nowrap">{tr(a.timestamp, a.timestampAr)}</span>
                        </div>
                        <p className="mt-0.5 text-sm text-[#4b5563] leading-relaxed">{tr(a.text, a.textAr)}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </Card>

          <section className="relative overflow-hidden rounded-2xl bg-[#005844] p-5 text-white">
            <div className="absolute -top-16 -end-16 h-48 w-48 rounded-full bg-[#008755]/50" />
            <div className="relative">
              <header className="flex items-center gap-3 mb-5">
                <div className="h-9 w-9 rounded-xl bg-white/15 flex items-center justify-center">
                  <CalendarDays className="h-[18px] w-[18px]" />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold font-[Dubai] leading-tight">{tr('Agenda', 'جدول الأعمال')}</h3>
                  <p className="text-xs text-white/70">{tr('November 2026', 'نوفمبر 2026')}</p>
                </div>
              </header>
              <ol className="relative space-y-4 ps-5 before:absolute before:top-1 before:bottom-1 before:start-[5px] before:w-px before:bg-white/25">
                {UPCOMING_EVENTS.map(ev => (
                  <li key={ev.id} className="relative">
                    <span className={`absolute -start-5 top-1 h-[11px] w-[11px] rounded-full ring-2 ring-[#005844] ${ev.kind === 'deadline' ? 'bg-[#F1EB9C]' : 'bg-[#9BE3BF]'}`} />
                    <p className="text-xs text-[#9BE3BF] tabular-nums">
                      {isRTL ? `${ev.day} نوفمبر · ${ev.time}` : `Nov ${ev.day} · ${ev.time}`}
                      <span className="ms-2 rounded bg-white/10 px-1.5 py-px text-white/85">{tr(EVENT_KIND[ev.kind].label, EVENT_KIND[ev.kind].labelAr)}</span>
                    </p>
                    <p className="mt-0.5 text-sm font-[Dubai] leading-snug">{tr(ev.title, ev.titleAr)}</p>
                    <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-white/65">
                      <MapPin className="h-3 w-3" />
                      {tr(ev.place, ev.placeAr)}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

            <Card
              className="lg:col-span-2 xl:col-span-1"
              title={tr('Ideas Platform', 'منصة الأفكار')}
              subtitle={tr('Where sandbox projects begin', 'حيث تبدأ مشاريع البيئة التجريبية')}
              action={
                <button type="button" onClick={() => onNavigate('ideas-platform')} className="inline-flex items-center gap-1 text-sm text-[#008755] hover:underline">
                  {tr('Open', 'فتح')}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </button>
              }
            >
              <div className="space-y-3">
                {IDEAS_FUNNEL.map((step, i) => (
                  <div key={step.label} className="flex items-center gap-3">
                    <span className="w-28 text-sm text-[#374151] font-[Dubai] leading-tight">{tr(step.label, step.labelAr)}</span>
                    <div className="flex-1 h-7 rounded-lg bg-[#f1f4f3] overflow-hidden">
                      <div
                        className="h-full rounded-lg"
                        style={{ width: `${Math.max((step.value / ideasMax) * 100, 6)}%`, backgroundColor: ['#9BE3BF', '#00C7B1', '#008755'][i] }}
                      />
                    </div>
                    <span className="w-10 text-end text-sm font-semibold text-[#00205B] tabular-nums">{step.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm text-[#374151] font-[Dubai]">{tr('Monthly submissions', 'التقديمات الشهرية')}</p>
                <Lightbulb className="h-4 w-4 text-[#008755]" />
              </div>
              <ResponsiveContainer width="100%" height={140}>
                <BarChart data={IDEAS_MONTHLY} margin={{ top: 18, right: 0, left: 0, bottom: 0 }}>
                  <XAxis dataKey="m" reversed={isRTL} axisLine={false} tickLine={false} tick={AXIS} tickFormatter={(m) => (isRTL ? MONTH_AR[m] ?? m : m)} />
                  <Tooltip cursor={{ fill: '#f5f7f6' }} content={<ChartTooltip labelFormatter={(m: string) => (isRTL ? MONTH_AR[m] ?? m : m)} />} />
                  <Bar dataKey="v" name={tr('Ideas', 'الأفكار')} fill="#008755" radius={[4, 4, 0, 0]} maxBarSize={32}>
                    <LabelList dataKey="v" position="top" fill="#374151" fontSize={12} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </section>

        {/* ── Partners (single quiet line) ───────────────────────────── */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#6b7280]">
          <span className="inline-flex items-center gap-1.5 text-[#005844] font-semibold font-[Dubai]">
            <Handshake className="h-4 w-4" />
            {tr('Partners', 'الشركاء')}
          </span>
          {[...new Set(INITIAL_PROJECTS.flatMap(p => p.partners))].map(name => (
            <span key={name}>{ts(name)}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
