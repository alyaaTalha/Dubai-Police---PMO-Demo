import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  FlaskConical,
  FolderKanban,
  Handshake,
  Lightbulb,
  Megaphone,
  MapPin,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import { INITIAL_PROJECTS, PARTNERS, STAGES, STAGE_SUBLABELS, money, type ProjectType } from "../sandbox/sandboxData";
import { useSandboxTr } from "../sandbox/sandboxI18n";
import { useLanguage } from "../../i18n/LanguageContext";
import {
  ACTIVITY_STYLE,
  HomeBanner,
  EVENT_KIND,
  IDEAS_MONTHLY,
  IN_SANDBOX,
  IP_GRANTED,
  MONTH_AR,
  PRIORITY_META,
  SANDBOX_TASKS,
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

// Journey steps go from light mint to dark green (brand supporting + primary colours)
export const STAGE_TONES = ['#9BE3BF', '#00C7B1', '#05868E', '#008755', '#005844'];

// Header gradients for the featured project cards (dark enough for white text)
export const TYPE_GRADIENT: Record<ProjectType, string> = {
  rd: 'linear-gradient(135deg, #00426A, #00205B)',
  innov: 'linear-gradient(135deg, #008755, #005844)',
  know: 'linear-gradient(135deg, #05868E, #00426A)',
};

const TYPE_SHARE = TYPE_KEYS.map(t => {
  const list = INITIAL_PROJECTS.filter(p => p.type === t);
  return { key: t, count: list.length, budget: list.reduce((s, p) => s + p.budget, 0) };
});

const IDEAS_MAX = Math.max(...IDEAS_MONTHLY.map(d => d.v));

/** Circular progress ring drawn with SVG. */
export function Ring({ pct, color, size = 64, stroke = 7, children }: {
  pct: number; color: string; size?: number; stroke?: number; children?: ReactNode;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e8eeec" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}

/** Rounded bento tile with an optional header. */
function Tile({ title, subtitle, icon: Icon, action, className = '', children }: {
  title?: string; subtitle?: string; icon?: typeof Sparkles; action?: ReactNode; className?: string; children: ReactNode;
}) {
  return (
    <section className={`rounded-2xl bg-white p-5 flex flex-col shadow-[0_1px_2px_rgba(0,32,91,0.06),0_8px_24px_-12px_rgba(0,32,91,0.12)] ${className}`}>
      {title && (
        <header className="flex items-start gap-3 mb-4">
          {Icon && (
            <div className="h-9 w-9 rounded-xl bg-[#005844]/8 text-[#005844] flex items-center justify-center flex-shrink-0">
              <Icon className="h-[18px] w-[18px]" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-[15px] font-semibold text-[#00205B] font-[Dubai] leading-tight">{title}</h3>
            {subtitle && <p className="text-xs text-[#6b7280] mt-0.5">{subtitle}</p>}
          </div>
          {action}
        </header>
      )}
      <div className="flex-1 flex flex-col">{children}</div>
    </section>
  );
}

export function HomePageBento({ onNavigate }: HomePageProps) {
  const { tr, isRTL } = useLanguage();
  const ts = useSandboxTr();
  const [doneTasks, setDoneTasks] = useState<Set<number>>(new Set());
  const toggleTask = (id: number) =>
    setDoneTasks(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const fmtBudget = (v: number) => (isRTL ? `${v.toFixed(1)} مليون درهم` : money(v));
  const sandboxPct = Math.round((IN_SANDBOX / TOTAL_PROJECTS) * 100);

  const heroStats = [
    { icon: FolderKanban, value: String(TOTAL_PROJECTS), label: tr('Active portfolio projects', 'مشاريع المحفظة') },
    { icon: Wallet, value: fmtBudget(TOTAL_BUDGET), label: tr('Approved funding', 'التمويل المعتمد') },
    { icon: FlaskConical, value: String(IN_SANDBOX), label: tr('Piloting in the sandbox', 'قيد التجريب في البيئة التجريبية') },
    { icon: ShieldCheck, value: String(IP_GRANTED), label: tr('IP assets granted', 'أصول ملكية فكرية ممنوحة') },
  ];

  return (
    <div className="h-full overflow-auto bg-[#f3f6f5]">
      <div className="mx-auto p-4 space-y-4 pb-24">

        {/* ── Banner (shared with option 1) ───────────────────────────── */}
        <HomeBanner onNavigate={onNavigate} />

        {/* ── Headline numbers ─────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {heroStats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_1px_2px_rgba(0,32,91,0.06)]">
              <div className="h-10 w-10 rounded-xl bg-[#005844]/8 text-[#005844] flex items-center justify-center flex-shrink-0">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xl font-semibold text-[#00205B] tabular-nums leading-tight">{value}</p>
                <p className="text-[11px] text-[#6b7280] truncate">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Announcements strip ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_1fr_1fr] gap-3 items-stretch">
          <div className="hidden lg:flex flex-col justify-center rounded-2xl bg-[#00205B] text-white px-5">
            <Megaphone className="h-5 w-5 text-[#00C7B1]" />
            <p className="mt-2 text-sm font-[Dubai] leading-tight">{tr('Latest', 'أحدث')}<br />{tr('News', 'الأخبار')}</p>
          </div>
          {announcements.map(a => (
            <article key={a.id} className="rounded-2xl bg-white p-4 shadow-[0_1px_2px_rgba(0,32,91,0.06)]">
              <div className="flex items-center gap-2 mb-1.5">
                {a.badges.slice(0, 1).map(b => (
                  <span key={b.label} className={`rounded-md px-1.5 py-0.5 text-[10px] ${b.className}`}>{tr(b.label, b.labelAr)}</span>
                ))}
                <span className="ms-auto text-[10px] text-[#9ca3af]">{tr(a.timestamp, a.timestampAr)}</span>
              </div>
              <h4 className="text-sm text-[#00205B] font-[Dubai] leading-snug line-clamp-1">{tr(a.title, a.titleAr)}</h4>
              <p className="mt-1 text-xs text-[#6b7280] leading-relaxed line-clamp-2">{tr(a.description, a.descriptionAr)}</p>
            </article>
          ))}
        </div>

        {/* ── Journey + Portfolio by type ─────────────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
          <Tile
            className="xl:col-span-8"
            icon={Sparkles}
            title={tr('Innovation Journey', 'رحلة الابتكار')}
            subtitle={isRTL
              ? `${IN_SANDBOX} من ${TOTAL_PROJECTS} مشروعاً وصلت إلى البيئة التجريبية (${sandboxPct}%)`
              : `${IN_SANDBOX} of ${TOTAL_PROJECTS} projects have reached the sandbox (${sandboxPct}%)`}
            action={
              <div className="hidden md:flex items-center gap-3 text-[11px] text-[#4b5563]">
                {TYPE_KEYS.map(t => (
                  <span key={t} className="inline-flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: TYPE_COLOR[t].color }} />
                    {ts(t === 'rd' ? 'R&D' : t === 'innov' ? 'Innovation' : 'Knowledge')}
                  </span>
                ))}
              </div>
            }
          >
            <ol className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {STAGES.map((stage, i) => {
                const list = INITIAL_PROJECTS.filter(p => p.stage === stage);
                const tone = STAGE_TONES[i];
                const darkText = i < 2;
                return (
                  <li key={stage} className="relative">
                    <div className="h-full rounded-2xl border border-[#e8eeec] bg-[#fafcfb] p-3 flex flex-col">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-6 w-6 rounded-full text-[11px] font-semibold flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: tone, color: darkText ? '#00205B' : '#ffffff' }}
                        >
                          {i + 1}
                        </span>
                        <span className="text-[10px] uppercase tracking-wide text-[#9ca3af] truncate">{ts(STAGE_SUBLABELS[stage])}</span>
                      </div>
                      <p className="mt-2 text-sm text-[#00205B] font-[Dubai] leading-tight">{ts(stage)}</p>
                      <p className="mt-auto pt-3 text-3xl font-semibold text-[#00205B] tabular-nums leading-none">{list.length}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {list.map(p => (
                          <span
                            key={p.id}
                            title={ts(p.name)}
                            className="h-2.5 w-2.5 rounded-full ring-2 ring-white"
                            style={{ backgroundColor: TYPE_COLOR[p.type].color }}
                          />
                        ))}
                      </div>
                      <div className="mt-3 h-1 rounded-full" style={{ backgroundColor: tone }} />
                    </div>
                    {i < STAGES.length - 1 && (
                      <ChevronRight className="hidden md:block absolute top-1/2 -end-[14px] -translate-y-1/2 z-10 h-4 w-4 text-[#9ca3af] rtl:rotate-180" />
                    )}
                  </li>
                );
              })}
            </ol>
            <div className="mt-auto pt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { icon: Clock, value: tr('14 months', '14 شهراً'), label: tr('Avg. time from idea to sandbox', 'متوسط المدة من الفكرة إلى البيئة التجريبية') },
                { icon: FolderKanban, value: `${ts('Development')} · 7`, label: tr('Busiest stage right now', 'المرحلة الأكثر نشاطاً حالياً') },
                { icon: CalendarDays, value: tr('Nov 12', '12 نوفمبر'), label: tr('Next sandbox demo day', 'يوم العرض التجريبي القادم') },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-3 rounded-xl bg-[#005844]/5 px-3 py-2.5">
                  <Icon className="h-4 w-4 text-[#008755] flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#00205B] leading-tight">{value}</p>
                    <p className="text-[11px] text-[#6b7280] truncate">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </Tile>

          <Tile className="xl:col-span-4" icon={FolderKanban} title={tr('Portfolio by Type', 'المحفظة حسب النوع')} subtitle={tr('Share of projects and funding', 'نسبة المشاريع والتمويل')}>
            <div className="space-y-2">
              {TYPE_SHARE.map(({ key, count, budget }) => {
                const pct = Math.round((count / TOTAL_PROJECTS) * 100);
                return (
                  <div key={key} className="flex items-center gap-3 rounded-xl bg-[#fafcfb] border border-[#e8eeec] px-3 py-2">
                    <Ring pct={pct} color={TYPE_COLOR[key].color} size={46} stroke={5}>
                      <span className="text-[10px] font-semibold text-[#00205B] tabular-nums">{pct}%</span>
                    </Ring>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#00205B] font-[Dubai]">
                        {ts(key === 'rd' ? 'R&D' : key === 'innov' ? 'Innovation' : 'Knowledge')}
                      </p>
                      <p className="text-[11px] text-[#6b7280]">{fmtBudget(budget)}</p>
                    </div>
                    <div className="text-end">
                      <p className="text-xl font-semibold text-[#00205B] tabular-nums leading-none">{count}</p>
                      <p className="text-[10px] text-[#9ca3af] mt-1">{tr('projects', 'مشاريع')}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Tile>
        </div>

        {/* ── Featured projects + Agenda ──────────────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
          <Tile
            className="xl:col-span-8"
            icon={ShieldCheck}
            title={tr('Featured Projects', 'مشاريع مميزة')}
            subtitle={tr('Top scores from the evaluation panel', 'أعلى الدرجات من لجنة التقييم')}
            action={
              <button type="button" onClick={() => onNavigate('sandbox-platform')} className="inline-flex items-center gap-1 text-xs text-[#008755] hover:underline">
                {tr('All projects', 'جميع المشاريع')}
                <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
              </button>
            }
          >
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
              {TOP_PROJECTS.slice(0, 3).map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onNavigate('sandbox-platform')}
                  className="group text-start rounded-2xl border border-[#e8eeec] overflow-hidden flex flex-col transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="relative h-20 flex-shrink-0 p-3 text-white" style={{ background: TYPE_GRADIENT[p.type] }}>
                    <div className="flex items-center gap-1.5 text-[10px]">
                      <span className="rounded-md bg-white/20 px-1.5 py-0.5">
                        {ts(p.type === 'rd' ? 'R&D' : p.type === 'innov' ? 'Innovation' : 'Knowledge')}
                      </span>
                      <span className="rounded-md bg-white/10 px-1.5 py-0.5">{ts(p.stage)}</span>
                    </div>
                    <div className="absolute -bottom-6 end-3 h-12 w-12 rounded-full bg-white shadow-md flex items-center justify-center">
                      <Ring pct={p.score ?? 0} color={TYPE_COLOR[p.type].color} size={44} stroke={4}>
                        <span className="text-xs font-bold text-[#00205B] tabular-nums">{p.score}</span>
                      </Ring>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col p-3 pt-4">
                    <p className="text-sm text-[#00205B] font-[Dubai] leading-snug line-clamp-2 min-h-[2.5rem] pe-12 group-hover:text-[#008755] transition-colors">
                      {ts(p.name)}
                    </p>
                    <p className="mt-1 text-[11px] text-[#6b7280] truncate">{ts(p.dept)}</p>
                    <p className="mt-2 text-xs text-[#4b5563] leading-relaxed line-clamp-3">{ts(p.desc)}</p>
                    {p.partners.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {p.partners.map(pt => (
                          <span key={pt} className="inline-flex items-center gap-1 rounded-full bg-[#f3f6f5] px-2 py-0.5 text-[10px] text-[#4b5563]">
                            <Handshake className="h-2.5 w-2.5" />
                            {ts(pt)}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mt-auto pt-3 flex items-center justify-between text-[11px]">
                      <span className="text-[#4b5563] tabular-nums">{fmtBudget(p.budget)}</span>
                      <span className="rounded-md bg-[#f3f6f5] px-1.5 py-0.5 text-[#4b5563]">
                        {p.type === 'rd' ? `TRL ${p.trl}` : ts(p.cls)}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Tile>

          <section className="xl:col-span-4 relative overflow-hidden rounded-2xl bg-[#005844] p-5 text-white">
            <div className="absolute -top-16 -end-16 h-48 w-48 rounded-full bg-[#008755]/50" />
            <div className="absolute -bottom-20 -start-10 h-40 w-40 rounded-full bg-[#00205B]/30" />
            <div className="relative">
              <header className="flex items-center gap-3 mb-4">
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
                    <p className="text-[11px] text-[#9BE3BF] tabular-nums">
                      {isRTL ? `${ev.day} نوفمبر · ${ev.time}` : `Nov ${ev.day} · ${ev.time}`}
                      <span className="ms-2 rounded bg-white/10 px-1.5 py-px text-white/80">{tr(EVENT_KIND[ev.kind].label, EVENT_KIND[ev.kind].labelAr)}</span>
                    </p>
                    <p className="mt-0.5 text-sm font-[Dubai] leading-snug">{tr(ev.title, ev.titleAr)}</p>
                    <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-white/60">
                      <MapPin className="h-3 w-3" />
                      {tr(ev.place, ev.placeAr)}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </div>

        {/* ── Activity + Tasks + Ideas ─────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-12 gap-4">
          <Tile className="xl:col-span-5" icon={Clock} title={tr('Activity Feed', 'سجل النشاط')} subtitle={tr('Latest updates across the sandbox', 'آخر التحديثات في البيئة التجريبية')}>
            <ol className="space-y-4">
              {recentActivity.map((a, i) => {
                const { icon: Icon, color } = ACTIVITY_STYLE[a.type] ?? ACTIVITY_STYLE.info;
                return (
                  <li key={a.id} className="relative flex gap-3">
                    {i < recentActivity.length - 1 && (
                      <span className="absolute top-9 bottom-[-16px] start-[15px] w-px bg-[#e8eeec]" />
                    )}
                    <span className="relative h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}1a`, color }}>
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex items-baseline gap-2">
                        <p className="text-sm text-[#00205B] font-[Dubai]">{tr(a.title, a.titleAr)}</p>
                        <span className="ms-auto text-[10px] text-[#9ca3af] whitespace-nowrap">{tr(a.timestamp, a.timestampAr)}</span>
                      </div>
                      <p className="text-xs text-[#6b7280] leading-relaxed">{tr(a.text, a.textAr)}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </Tile>

          <Tile
            className="xl:col-span-4"
            icon={Check}
            title={tr('My Tasks', 'مهامي')}
            subtitle={isRTL
              ? `${SANDBOX_TASKS.length - doneTasks.size} مهام متبقية`
              : `${SANDBOX_TASKS.length - doneTasks.size} of ${SANDBOX_TASKS.length} remaining`}
          >
            <div className="h-1.5 rounded-full bg-[#e8eeec] overflow-hidden mb-4">
              <div
                className="h-full rounded-full bg-[#008755] transition-all"
                style={{ width: `${(doneTasks.size / SANDBOX_TASKS.length) * 100}%` }}
              />
            </div>
            <ul className="space-y-2">
              {SANDBOX_TASKS.map(task => {
                const done = doneTasks.has(task.id);
                const pr = PRIORITY_META[task.priority];
                return (
                  <li key={task.id}>
                    <button
                      type="button"
                      aria-pressed={done}
                      onClick={() => toggleTask(task.id)}
                      className={`w-full flex items-center gap-3 rounded-xl border p-2.5 text-start transition ${done ? 'border-[#008755]/30 bg-[#008755]/5' : 'border-[#e8eeec] hover:border-[#008755]/40'}`}
                    >
                      <span className={`h-5 w-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${done ? 'bg-[#008755] border-[#008755] text-white' : 'border-gray-300'}`}>
                        {done && <Check className="h-3 w-3" strokeWidth={3} />}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className={`block text-xs font-[Dubai] truncate ${done ? 'text-[#9ca3af] line-through' : 'text-[#00205B]'}`}>{tr(task.title, task.titleAr)}</span>
                        <span className="block text-[10px] text-[#9ca3af] truncate">{ts(task.project)}</span>
                      </span>
                      <span className="flex flex-col items-end gap-0.5 flex-shrink-0">
                        <span className={`rounded px-1.5 py-px text-[9px] ${pr.className}`}>{tr(pr.label, pr.labelAr)}</span>
                        <span className="text-[10px] text-[#9ca3af]">{tr(task.due, task.dueAr)}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Tile>

          <section className="lg:col-span-2 xl:col-span-3 rounded-2xl bg-[#F1EB9C] p-5 flex flex-col">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-[#00205B] text-[#F1EB9C] flex items-center justify-center">
                <Lightbulb className="h-[18px] w-[18px]" />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-[#00205B] font-[Dubai] leading-tight">{tr('Ideas Platform', 'منصة الأفكار')}</h3>
                <p className="text-xs text-[#00205B]/70">{tr('Where sandbox projects begin', 'حيث تبدأ مشاريع البيئة التجريبية')}</p>
              </div>
            </div>
            <p className="mt-5 text-4xl font-semibold text-[#00205B] tabular-nums leading-none">248</p>
            <p className="mt-1 text-xs text-[#00205B]/70">
              {tr('ideas submitted · 12 promoted to sandbox', 'فكرة مقدمة · 12 انتقلت إلى البيئة التجريبية')}
            </p>
            <div className="mt-5 flex items-end gap-1.5" aria-label={tr('Monthly idea submissions', 'الأفكار المقدمة شهرياً')}>
              {IDEAS_MONTHLY.map(d => (
                <div key={d.m} className="flex-1 flex flex-col items-center gap-1 justify-end" title={`${isRTL ? MONTH_AR[d.m] : d.m}: ${d.v}`}>
                  <span className="text-[9px] text-[#00205B]/70 tabular-nums">{d.v}</span>
                  <div className="w-full rounded-t-md bg-[#005844]" style={{ height: `${Math.round((d.v / IDEAS_MAX) * 56)}px` }} />
                  <span className="text-[9px] text-[#00205B]/60">{isRTL ? MONTH_AR[d.m] : d.m}</span>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => onNavigate('ideas-platform')}
              className="mt-auto pt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#00205B] hover:underline"
            >
              {tr('Explore ideas', 'استكشف الأفكار')}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </button>
          </section>
        </div>

        {/* ── Partner network strip ────────────────────────────────────── */}
        <section className="rounded-2xl bg-white p-4 shadow-[0_1px_2px_rgba(0,32,91,0.06)] flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="h-9 w-9 rounded-xl bg-[#005844]/8 text-[#005844] flex items-center justify-center">
              <Handshake className="h-[18px] w-[18px]" />
            </div>
            <div>
              <h3 className="text-[15px] font-semibold text-[#00205B] font-[Dubai] leading-tight">{tr('Partner Network', 'شبكة الشركاء')}</h3>
              <p className="text-xs text-[#6b7280]">{isRTL ? `${PARTNERS.length} شركاء نشطين` : `${PARTNERS.length} active partners`}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 md:border-s md:border-[#e8eeec] md:ps-4">
            {PARTNERS.map(pt => (
              <span key={pt.name} className="inline-flex items-center gap-2 rounded-full border border-[#e8eeec] bg-[#fafcfb] py-1 ps-1 pe-3">
                <span
                  className="h-6 w-6 rounded-full text-[9px] font-semibold text-white flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${pt.gradientFrom}, ${pt.gradientTo})` }}
                >
                  {pt.initials}
                </span>
                <span className="text-xs text-[#00205B]">{ts(pt.name)}</span>
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
