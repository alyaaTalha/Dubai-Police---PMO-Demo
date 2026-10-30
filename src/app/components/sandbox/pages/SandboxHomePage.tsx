import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import {
  Layers, Wallet, Users, Building2, Download, Plus, Shield, Award,
  BadgeCheck, TrendingUp, BookOpen, CheckCircle2, ArrowRight, Filter,
  Play, Pause, Maximize2, Volume2, Image as ImageIcon,
} from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../ui/select';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../../ui/dialog';
import { cn } from '../../ui/utils';
import {
  DEPARTMENTS, IP_REGISTER, STAGES, STAGE_SUBLABELS, STATUS_META, TYPES,
  INNOV_LEVELS, KNOW_LEVELS, TRL_LEVELS,
  money, type Project, type ProjectStatus, type ProjectType,
} from '../sandboxData';
import type { SandboxPage, SandboxStore } from '../SandboxStore';
import { NewProjectDialog } from '../NewProjectDialog';
import { ReadinessOrbit } from './ReadinessOrbit';
import { useLanguage } from '../../../i18n/LanguageContext';
import { useSandboxTr } from '../sandboxI18n';
import heroDecoration from '../../../../assets/sandbox-hero-decoration.png';
import hero from '../../../../assets/hero.jpeg';
import dubaiPolice from '../../../../assets/Dubai-Police-Image.jpeg';
import dubaiPolice2 from '../../../../assets/dubai-police.jpg';
import dubaiPolice3 from '../../../../assets/img1.jpeg';
import dubaiPolice4 from '../../../../assets/img2.jpg';
import dubaiPolice5 from '../../../../assets/img3.jpg';
import dubaiPolice6 from '../../../../assets/img4.jpg';

interface PageProps {
  store: SandboxStore;
  onNavigate: (page: SandboxPage) => void;
}

const STATUS_LIST: ProjectStatus[] = ['Ongoing', 'Completed', 'Delayed', 'Pending Approval', 'Rejected'];
const TIMELINE_YEARS = [2023, 2024, 2025, 2026, 2027];
const AWARDS = [['Global', 3], ['Regional', 5], ['Federal', 4], ['Local', 2]] as const;
const AWARD_AR: Record<string, string> = { Global: 'عالمي', Regional: 'إقليمي', Federal: 'اتحادي', Local: 'محلي' };

// ── Readiness level filter (TRL for R&D, IN class for Innovation, tier for Knowledge) ──
const LEVEL_GROUPS: Array<{ type: ProjectType; options: Array<{ value: string; label: string }> }> = [
  { type: 'rd', options: [...TRL_LEVELS].reverse().map(n => ({ value: `TRL ${n}`, label: `TRL ${n}` })) },
  { type: 'innov', options: INNOV_LEVELS.map(c => ({ value: c, label: c })) },
  { type: 'know', options: [...KNOW_LEVELS].reverse().map(c => ({ value: c, label: c })) },
];
const levelType = (level: string): ProjectType =>
  level.startsWith('TRL') ? 'rd' : INNOV_LEVELS.includes(level) ? 'innov' : 'know';
const matchesLevel = (p: Project, level: string) =>
  level.startsWith('TRL') ? p.type === 'rd' && `TRL ${p.trl}` === level : p.cls === level;

const GALLERY = [
  {hero: dubaiPolice, title: 'Smart Evidence Room, Precinct 4', titleAr: 'غرفة الأدلة الذكية، المركز 4', tag: 'Sandbox Pilot', tagAr: 'تجربة في البيئة التجريبية', pin: 'IN1', pinAr: 'IN1', from: '#00a869', to: '#005844', desc: 'The first fully digital evidence room, where every item is RFID-tagged and custody transfers are logged automatically. Manual custody errors dropped 71% in the first eight weeks of the sandbox pilot.', descAr: 'أول غرفة أدلة رقمية بالكامل، حيث يُوسم كل عنصر بتقنية RFID وتُسجَّل عمليات نقل العهدة تلقائياً. انخفضت أخطاء العهدة اليدوية بنسبة 71% خلال الأسابيع الثمانية الأولى من التجربة.' },
  {hero: dubaiPolice2, title: 'Autonomous Patrol Drone Trials', titleAr: 'تجارب طائرات الدوريات ذاتية القيادة', tag: 'R&D Feasibility', tagAr: 'جدوى البحث والتطوير', pin: 'R&D', pinAr: 'بحث وتطوير', from: '#3b8fe0', to: '#17457e', desc: 'Feasibility trials for autonomous aerial patrol units across three designated districts, assessing flight endurance, regulatory clearance and live-feed latency.', descAr: 'تجارب جدوى لوحدات الدوريات الجوية ذاتية القيادة في ثلاث مناطق محددة، لتقييم قدرة التحمل في الطيران والموافقات التنظيمية وزمن تأخر البث المباشر.' },
  {hero: dubaiPolice3, title: 'Forensics Rapid-Analysis Lab', titleAr: 'مختبر التحليل الجنائي السريع', tag: 'Research', tagAr: 'بحث', pin: 'Patent', pinAr: 'براءة اختراع', from: '#8b6fd4', to: '#4a2f8f', desc: 'Reducing forensic DNA turnaround from 48 hours to under six. A patent on the sequencing protocol is currently under approval.', descAr: 'تقليص زمن تحليل الحمض النووي الجنائي من 48 ساعة إلى أقل من ست ساعات. براءة اختراع لبروتوكول التسلسل قيد الاعتماد حالياً.' },
  {hero: dubaiPolice4, title: 'Traffic Digital Twin Control Room', titleAr: 'غرفة تحكم التوأم الرقمي للمرور', tag: 'Innovation', tagAr: 'ابتكار', pin: 'IN2', pinAr: 'IN2', from: '#e0a83b', to: '#8a5c07', desc: 'A real-time digital twin of the traffic network, allowing interventions to be simulated before any field deployment.', descAr: 'توأم رقمي آني لشبكة المرور، يتيح محاكاة التدخلات قبل أي تطبيق ميداني.' },
  {hero: dubaiPolice5, title: 'Officer Field Manual — Offline Mobile', titleAr: 'الدليل الميداني للضباط — تطبيق دون اتصال', tag: 'Knowledge', tagAr: 'معرفة', pin: 'Class 5', pinAr: 'الفئة 5', from: '#e0a83b', to: '#8a5c07', desc: 'Full digitization of operational field manuals with offline access, now deployed to every frontline officer device.', descAr: 'رقمنة كاملة للأدلة الميدانية التشغيلية مع إمكانية الوصول دون اتصال، ومتاحة الآن على أجهزة جميع ضباط الخطوط الأمامية.' },
  {hero: dubaiPolice6, title: 'Quantum-Resistant Comms Pilot', titleAr: 'تجربة الاتصالات المقاومة للحوسبة الكمية', tag: 'Completed', tagAr: 'مكتمل', pin: 'Granted', pinAr: 'ممنوحة', from: '#00a869', to: '#005844', desc: 'Post-quantum cryptography piloted across internal communication channels, completed 2025 with a granted patent.', descAr: 'تجربة تشفير ما بعد الحوسبة الكمية عبر قنوات الاتصال الداخلية، اكتملت في 2025 مع منح براءة اختراع.' },
  {hero: dubaiPolice2, title: 'Community Innovation Workshop', titleAr: 'ورشة الابتكار المجتمعي', tag: 'Engagement', tagAr: 'مشاركة', pin: '2026', pinAr: '2026', from: '#3b8fe0', to: '#17457e', desc: 'Design-thinking workshops bringing community representatives into the idea pipeline at intake stage.', descAr: 'ورش عمل للتفكير التصميمي تُشرك ممثلي المجتمع في مسار الأفكار منذ مرحلة الاستلام.' },
  {hero: hero, title: 'Smart Queue Deployment', titleAr: 'تطبيق نظام الطوابير الذكي', tag: 'Sandbox Pilot', tagAr: 'تجربة في البيئة التجريبية', pin: '-64%', pinAr: '-64%', from: '#8b6fd4', to: '#4a2f8f', desc: 'Average service centre wait time reduced from 25 minutes to 9 across three pilot centres.', descAr: 'انخفض متوسط وقت الانتظار في مراكز الخدمة من 25 دقيقة إلى 9 دقائق في ثلاثة مراكز تجريبية.' },
];

const STORIES = [
  { hero: hero, title: 'Custody errors down 71% in eight weeks', titleAr: 'انخفاض أخطاء العهدة بنسبة 71% خلال ثمانية أسابيع', workstream: 'Legal Affairs · Smart Evidence Room', workstreamAr: 'الشؤون القانونية · غرفة الأدلة الذكية', stat: '-71% manual errors', statAr: '-71% في الأخطاء اليدوية', initials: 'SE' },
  { hero: dubaiPolice6, title: 'Complaint triage now 40% faster than manual routing', titleAr: 'فرز الشكاوى أسرع الآن بنسبة 40% من التوجيه اليدوي', workstream: 'Community Affairs · AI Triage Engine', workstreamAr: 'شؤون المجتمع · محرك الفرز بالذكاء الاصطناعي', stat: '40% faster resolution', statAr: 'معالجة أسرع بنسبة 40%', initials: 'AI' },
  { hero: dubaiPolice5, title: 'Service centre waits cut from 25 minutes to 9', titleAr: 'تقليص الانتظار في مراكز الخدمة من 25 دقيقة إلى 9', workstream: 'Customer Happiness · Smart Queue', workstreamAr: 'إسعاد المتعاملين · الطوابير الذكية', stat: '-64% average wait', statAr: '-64% في متوسط الانتظار', initials: 'SQ' },
];

const VID_LEN = 160;
function formatVidTime(s: number) {
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
}

export function SandboxHomePage({ store, onNavigate }: PageProps) {
  const { projects, search } = store;
  const { tr, isRTL } = useLanguage();
  const ts = useSandboxTr();
  const fmtMoney = (v: number) => tr(money(v), `${v.toFixed(1)} مليون درهم`);
  const [typeFilter, setTypeFilter] = useState<'all' | ProjectType>('all');
  const [deptFilter, setDeptFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [newOpen, setNewOpen] = useState(false);

  const years = useMemo(() => {
    const min = Math.min(...projects.map(p => p.start));
    const max = Math.max(...projects.map(p => p.end));
    return Array.from({ length: max - min + 1 }, (_, i) => min + i);
  }, [projects]);

  // Picking a level also narrows the type; switching type clears an incompatible level.
  const changeType = (t: 'all' | ProjectType) => {
    setTypeFilter(t);
    if (t !== 'all' && levelFilter !== 'all' && levelType(levelFilter) !== t) setLevelFilter('all');
  };
  const changeLevel = (level: string) => {
    setLevelFilter(level);
    if (level !== 'all') setTypeFilter(levelType(level));
  };

  const filtered = useMemo(() => projects.filter(p =>
    (typeFilter === 'all' || p.type === typeFilter) &&
    (deptFilter === 'all' || p.dept === deptFilter) &&
    (statusFilter === 'all' || p.status === statusFilter) &&
    (yearFilter === 'all' || (p.start <= +yearFilter && p.end >= +yearFilter)) &&
    (levelFilter === 'all' || matchesLevel(p, levelFilter)) &&
    (!search || (p.name + p.dept + p.id + p.status).toLowerCase().includes(search.toLowerCase()))
  ), [projects, typeFilter, deptFilter, statusFilter, yearFilter, levelFilter, search]);

  const totalBudget = filtered.reduce((s, p) => s + p.budget, 0);
  const depts = new Set(filtered.map(p => p.dept));

  const statusCounts = STATUS_LIST.map(s => ({ status: s, count: filtered.filter(p => p.status === s).length }));
  const donutSegments = useMemo(() => {
    let acc = 0;
    const segs: string[] = [];
    statusCounts.forEach(({ status, count }) => {
      if (!count) return;
      const pct = (count / (filtered.length || 1)) * 100;
      segs.push(`${STATUS_META[status].dot} ${acc}% ${acc + pct}%`);
      acc += pct;
    });
    return segs.length ? segs.join(', ') : '#eef2f0 0% 100%';
  }, [statusCounts, filtered.length]);

  const budgetByType = (Object.keys(TYPES) as ProjectType[]).map(t => ({
    t, v: filtered.filter(p => p.type === t).reduce((s, p) => s + p.budget, 0),
  }));
  const bmax = Math.max(...budgetByType.map(b => b.v), 1);

  const deptCounts = useMemo(() => {
    const m = new Map<string, number>();
    filtered.forEach(p => m.set(p.dept, (m.get(p.dept) ?? 0) + 1));
    return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, [filtered]);
  const dmax = Math.max(...deptCounts.map(([, v]) => v), 1);

  const spotlight = projects.find(p => p.id === 'P-201');

  // ── Portfolio timeline (Gantt) — always the full unfiltered portfolio ──
  const ganttProjects = useMemo(() => [...projects]
    .filter(p => p.status !== 'Rejected')
    .sort((a, b) => b.budget - a.budget)
    .slice(0, 8), [projects]);

  // ── Department × Type coverage heatmap ──────────────────────────────
  const heatDepts = useMemo(() => [...new Set(projects.map(p => p.dept))].slice(0, 7), [projects]);
  const heatTypes = Object.keys(TYPES) as ProjectType[];
  const heatMax = Math.max(
    ...heatDepts.flatMap(d => heatTypes.map(t => projects.filter(p => p.dept === d && p.type === t).length)),
    1
  );

  // ── Innovation by stage / Knowledge by class ────────────────────────
  const innovByCls = ['IN1', 'IN2', 'IN3'].map(c => ({ c, v: projects.filter(p => p.type === 'innov' && p.cls === c).length }));
  const innovMax = Math.max(...innovByCls.map(x => x.v), 1);
  const knowByCls = ['Class 5', 'Class 6', 'Class 7', 'Class 7+'].map(c => ({ c, v: projects.filter(p => p.type === 'know' && p.cls === c).length }));
  const knowMax = Math.max(...knowByCls.map(x => x.v), 1);
  const awardsMax = Math.max(...AWARDS.map(([, v]) => v), 1);

  // ── Innovation Showcase (video) ──────────────────────────────────────
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoTime, setVideoTime] = useState(0);
  const videoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (videoPlaying) {
      videoTimerRef.current = setInterval(() => {
        setVideoTime(prev => {
          if (prev + 0.25 >= VID_LEN) { setVideoPlaying(false); return 0; }
          return prev + 0.25;
        });
      }, 250);
    }
    return () => { if (videoTimerRef.current) clearInterval(videoTimerRef.current); };
  }, [videoPlaying]);

  // ── Media & Field Gallery lightbox ───────────────────────────────────
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lightboxItem = lightboxIndex !== null ? GALLERY[lightboxIndex] : null;

  return (
    <div className="p-5 mx-auto space-y-5">
      <NewProjectDialog open={newOpen} onOpenChange={setNewOpen} store={store} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl bg-gradient-to-br from-[#005844] via-[#008755] to-[#00a869] p-7 text-white relative overflow-hidden">
        <img
          src={heroDecoration}
          alt=""
          className="absolute -top-16 -end-16 h-160 w-160 rounded-full object-cover opacity-50 pointer-events-none select-none"
        />
        <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex gap-3.5">
            <div className="h-12 w-12 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center flex-shrink-0">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl   tracking-tight">{tr('Sandbox Platform', 'منصة البيئة التجريبية')}</h1>
              <p className="text-white/80 text-sm mt-1 max-w-md">
                {tr('Institutional overview of research, innovation and knowledge output — from first idea through to sandbox pilot.', 'نظرة مؤسسية شاملة على مخرجات البحث والابتكار والمعرفة — من الفكرة الأولى وحتى التجربة في البيئة التجريبية.')}
              </p>
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={() => toast.success(tr('Dashboard exported to PDF', 'تم تصدير لوحة المعلومات بصيغة PDF'))}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white/15 border border-white/30 px-3.5 py-2 text-sm   hover:bg-white/25 transition-colors"
            >
              <Download className="h-3.5 w-3.5" /> {tr('Export', 'تصدير')}
            </button>
            <button
              onClick={() => setNewOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white text-[#005844] px-3.5 py-2 text-sm   hover:bg-white/90 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" /> {tr('New Project', 'مشروع جديد')}
            </button>
          </div>
        </div>

        <div className="relative z-10 flex flex-wrap gap-6 mt-6">
          {[
            [tr('Projects', 'المشاريع'), projects.length],
            [tr('Total Budget', 'إجمالي الميزانية'), fmtMoney(projects.reduce((s, p) => s + p.budget, 0))],
            [tr('IP Assets', 'أصول الملكية الفكرية'), IP_REGISTER.length],
            [tr('Partners', 'الشركاء'), 9],
            [tr('Readiness Rate', 'معدل الجاهزية'), '82%'],
          ].map(([l, v]) => (
            <div key={l as string} className="border-s-2 border-white/30 ps-3">
              <p className="text-xl   leading-none">{v}</p>
              <p className="text-sm uppercase tracking-wide text-white/75 mt-1 font-medium">{l}</p>
            </div>
          ))}
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-2.5 mt-5">
          <div className="flex gap-1 bg-white/15 border border-white/20 rounded-xl p-1">
            {(['all', 'rd', 'innov', 'know'] as const).map(t => (
              <button
                key={t}
                onClick={() => changeType(t)}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg text-sm   transition-colors",
                  typeFilter === t ? 'bg-white text-[#005844]' : 'text-white/85 hover:text-white'
                )}
              >
                {t === 'all' ? tr('All Types', 'جميع الأنواع') : ts(TYPES[t].label)}
              </button>
            ))}
          </div>
          <Select value={deptFilter} onValueChange={setDeptFilter}>
            <SelectTrigger className="h-8 w-auto text-sm bg-white/15 border-white/30 text-white [&>svg]:text-white">
              <SelectValue placeholder={tr('All Departments', 'جميع الإدارات')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{tr('All Departments', 'جميع الإدارات')}</SelectItem>
              {DEPARTMENTS.map(d => <SelectItem key={d} value={d}>{ts(d)}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-8 w-auto text-sm bg-white/15 border-white/30 text-white [&>svg]:text-white">
              <SelectValue placeholder={tr('All Statuses', 'جميع الحالات')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{tr('All Statuses', 'جميع الحالات')}</SelectItem>
              {STATUS_LIST.map(s => <SelectItem key={s} value={s}>{ts(s)}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger className="h-8 w-auto text-sm bg-white/15 border-white/30 text-white [&>svg]:text-white">
              <SelectValue placeholder={tr('All Years', 'جميع السنوات')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{tr('All Years', 'جميع السنوات')}</SelectItem>
              {years.map(y => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={levelFilter} onValueChange={changeLevel}>
            <SelectTrigger className="h-8 w-auto text-sm bg-white/15 border-white/30 text-white [&>svg]:text-white">
              <SelectValue placeholder={tr('All Levels', 'جميع المستويات')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{tr('All Levels', 'جميع المستويات')}</SelectItem>
              {LEVEL_GROUPS.filter(g => typeFilter === 'all' || g.type === typeFilter).map(g => (
                <SelectGroup key={g.type}>
                  <SelectLabel>{ts(TYPES[g.type].full)}</SelectLabel>
                  {g.options.map(o => <SelectItem key={o.value} value={o.value}>{ts(o.label)}</SelectItem>)}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ── Portfolio Indicators ─────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h2 className="font-medium ">{tr('Portfolio Indicators', 'مؤشرات المحفظة')}</h2>
          <span className="ms-auto text-sm text-muted-foreground flex items-center gap-1.5">
            <Filter className="h-3 w-3" />
            {typeFilter === 'all'
              ? tr(`showing all ${filtered.length} projects`, `عرض جميع المشاريع (${filtered.length})`)
              : tr(`filtered to ${TYPES[typeFilter].full} · ${filtered.length} projects`, `مصفّاة حسب ${ts(TYPES[typeFilter].full)} · ${filtered.length} مشروع`)}
          </span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: tr('Total Projects', 'إجمالي المشاريع'), value: filtered.length, icon: Layers, delta: '+8%' },
            { label: tr('Total Budget', 'إجمالي الميزانية'), value: fmtMoney(totalBudget), icon: Wallet, delta: '+11%' },
            { label: tr('Active Partners', 'الشركاء النشطون'), value: 9, icon: Users, delta: '+2' },
            { label: tr('Departments Engaged', 'الإدارات المشاركة'), value: depts.size, icon: Building2, delta: '+1' },
          ].map(({ label, value, icon: Icon, delta }) => (
            <div key={label} className="bg-card border border-border rounded-xl p-4 relative overflow-hidden">
              <span className="absolute top-3.5 end-3.5 text-xs font-bold px-1.5 py-0.5 rounded-full bg-[#008755]/10 text-[#008755]">
                <span dir="ltr">{delta}</span>
              </span>
              <div className="h-9 w-9 rounded-lg bg-[#008755]/10 flex items-center justify-center mb-3">
                <Icon className="h-4 w-4 text-[#008755]" />
              </div>
              <p className="text-2xl   leading-none">{value}</p>
              <p className="text-[11.5px] text-muted-foreground mt-1.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Project Readiness Map (TRL / IN / Class) ─────────────────────── */}
      <ReadinessOrbit projects={filtered} typeFilter={typeFilter} onOpenProject={store.openProject} />

      {/* ── Status distribution + Budget by type ────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_.75fr] gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="font-medium">{tr('Project Status Distribution', 'توزيع حالات المشاريع')}</h3>
          <p className="text-sm text-muted-foreground mb-4">{tr('Live breakdown across the filtered portfolio', 'تفصيل مباشر للمحفظة المصفّاة')}</p>
          <div className="flex items-center gap-6 flex-wrap">
            <div className="relative h-36 w-36 flex-shrink-0">
              <div className="absolute inset-0 rounded-full" style={{ background: `conic-gradient(${donutSegments})` }} />
              <div className="absolute inset-[19px] rounded-full bg-card shadow-inner flex flex-col items-center justify-center">
                <span className="text-xl   leading-none">{filtered.length}</span>
                <span className="text-[9px] uppercase tracking-wide text-muted-foreground mt-1">{tr('Projects', 'مشروع')}</span>
              </div>
            </div>
            <div className="flex-1 min-w-[180px] space-y-2">
              {statusCounts.map(({ status, count }) => (
                <div key={status} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 font-medium text-foreground/80">
                    <span className="h-2.5 w-2.5 rounded-sm flex-shrink-0" style={{ background: STATUS_META[status].dot }} />
                    {ts(status)}
                  </span>
                  <span>
                    <span className=" ">{count}</span>
                    <span className="text-muted-foreground ms-1.5">{filtered.length ? Math.round((count / filtered.length) * 100) : 0}%</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="font-medium">{tr('Budget by Type', 'الميزانية حسب النوع')}</h3>
          <p className="text-sm text-muted-foreground mb-4">{tr('AED millions', 'بملايين الدراهم')}</p>
          <div className="space-y-3">
            {budgetByType.map(({ t, v }) => (
              <div key={t} className="grid grid-cols-[100px_1fr_36px] items-center gap-2.5 text-sm">
                <span className="text-foreground/80 font-medium truncate">{ts(TYPES[t].full)}</span>
                <Progress value={(v / bmax) * 100} className="h-2" indicatorColor={TYPES[t].color} />
                <span className="text-end  ">{v.toFixed(1)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Stage funnel ─────────────────────────────────────────────────── */}
      <div className="bg-card border border-border rounded-xl p-4">
        <h3 className="font-medium mb-1">{tr('Project Stage Funnel', 'مسار مراحل المشاريع')}</h3>
        <p className="text-sm text-muted-foreground mb-4">{tr('Idea → Feasibility Study → Approval → Development → Sandbox', 'فكرة ← دراسة الجدوى ← الاعتماد ← التطوير ← البيئة التجريبية')}</p>
        <div className="flex items-stretch">
          {STAGES.map((s, i) => {
            const n = filtered.filter(p => p.stage === s).length;
            return (
              <div key={s} className="flex-1 text-center relative px-1">
                <div className={cn(
                  'h-14 w-14 rounded-2xl flex items-center justify-center mx-auto mb-2.5 text-lg font-["Dubai:Medium",_sans-serif]',
                  i === 0 ? 'bg-gradient-to-br from-[#00a869] to-[#005844] text-white' : 'bg-[#008755]/10 text-[#008755] border border-[#c3e6d6]'
                )}>
                  {n}
                </div>
                <p className="text-sm  ">{ts(s)}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{ts(STAGE_SUBLABELS[s])}</p>
                {i < STAGES.length - 1 && <ArrowRight className="h-4 w-4 text-border absolute top-6 -end-1 rtl:rotate-180" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Spotlight ────────────────────────────────────────────────────── */}
      {spotlight && (
        <div className="grid grid-cols-1 md:grid-cols-[.9fr_1.1fr] bg-card border border-border rounded-xl overflow-hidden">
          <div
            className="relative min-h-[220px] bg-gradient-to-br from-[#00a869] to-[#005844] p-5 flex items-end"
            style={{
              backgroundImage: `url(${hero})`,
              backgroundSize: 'cover',
              backgroundPosition: 'bottom',
            }}
          >
            <span className="absolute top-4 start-4 inline-flex items-center gap-1.5 bg-white/90 text-[#005844] text-sm font-bold px-2.5 py-1 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-[#008755] animate-pulse" />
              {tr('LIVE IN SANDBOX', 'قيد التشغيل في البيئة التجريبية')}
            </span>
          </div>
          <div className="p-6 flex flex-col justify-center">
            <span className="text-sm font-bold uppercase tracking-wide text-[#008755] mb-2">{ts('Innovation')} · {ts(spotlight.cls)}</span>
            <h2 className="text-lg   leading-snug">{tr('Smart Evidence Room — RFID Chain of Custody', 'غرفة الأدلة الذكية — سلسلة العهدة بتقنية RFID')}</h2>
            <p className="text-sm text-muted-foreground mt-2.5 leading-relaxed max-w-md">
              {tr('A fully digital evidence room replacing manual custody logs with RFID tracking. Now running in sandbox across two precincts, with a granted patent on the chain-of-custody protocol and a federal accreditation submission in progress.', 'غرفة أدلة رقمية بالكامل تستبدل سجلات العهدة اليدوية بالتتبع عبر تقنية RFID. تعمل حالياً في البيئة التجريبية في مركزين، مع براءة اختراع ممنوحة لبروتوكول سلسلة العهدة وطلب اعتماد اتحادي قيد الإعداد.')}
            </p>
            <div className="flex flex-wrap gap-6 mt-4 mb-5">
              {[['94', tr('Evaluation Score', 'درجة التقييم')], [fmtMoney(5.1), tr('Budget', 'الميزانية')], ['-71%', tr('Custody Errors', 'أخطاء العهدة')], ['1', tr('Patent Granted', 'براءة اختراع ممنوحة')]].map(([n, l]) => (
                <div key={l}>
                  <p className="text-lg   text-[#008755]">{n}</p>
                  <p className="text-sm uppercase tracking-wide text-muted-foreground font-medium">{l}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => store.openProject('P-201')} className="rounded-lg bg-[#008755] hover:bg-[#005844] text-white text-sm   px-4 py-2.5 transition-colors">
                {tr('Open Project Record', 'فتح سجل المشروع')}
              </button>
              <button onClick={() => toast.success(tr('Case study exported', 'تم تصدير دراسة الحالة'))} className="rounded-lg border border-border text-sm   px-4 py-2.5 hover:bg-muted/40 transition-colors">
                {tr('Export Case Study', 'تصدير دراسة الحالة')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Dept bars + KPI achievement ──────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="font-medium">{tr('Projects by Department', 'المشاريع حسب الإدارة')}</h3>
          <p className="text-sm text-muted-foreground mb-4">{tr('Organizational structure breakdown', 'التوزيع حسب الهيكل التنظيمي')}</p>
          <div className="space-y-3">
            {deptCounts.length ? deptCounts.map(([d, v]) => (
              <div key={d} className="grid grid-cols-[132px_1fr_28px] items-center gap-2.5 text-sm">
                <span className="text-foreground/80 font-medium truncate">{ts(d)}</span>
                <Progress value={(v / dmax) * 100} className="h-2" indicatorColor="#008755" />
                <span className="text-end  ">{v}</span>
              </div>
            )) : <p className="text-sm text-muted-foreground py-2">{tr('No projects match the current filters.', 'لا توجد مشاريع مطابقة لعوامل التصفية الحالية.')}</p>}
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="font-medium">{tr('KPI Achievement', 'تحقيق مؤشرات الأداء')}</h3>
          <p className="text-sm text-muted-foreground mb-4">{tr('Per strategic indicator', 'لكل مؤشر استراتيجي')}</p>
          <div className="space-y-3">
            {[[tr('Submission Target', 'مستهدف التقديمات'), 92], [tr('Budget Utilization', 'استغلال الميزانية'), 88], [tr('Patent Filing Target', 'مستهدف تسجيل براءات الاختراع'), 70], [tr('Partner Growth', 'نمو الشركاء'), 65], [tr('Readiness Index', 'مؤشر الجاهزية'), 82]].map(([k, v]) => (
              <div key={k as string} className="grid grid-cols-[132px_1fr_36px] items-center gap-2.5 text-sm">
                <span className="text-foreground/80 font-medium truncate">{k}</span>
                <Progress value={v as number} className="h-2" indicatorColor="#008755" />
                <span className="text-end  ">{v}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Portfolio timeline + Department × Type coverage ─────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-medium">{tr('Portfolio Timeline', 'الجدول الزمني للمحفظة')}</h3>
            <button onClick={() => toast.info(tr('Opening full roadmap view', 'جارٍ فتح عرض خارطة الطريق الكاملة'))} className="text-sm text-[#008755] hover:underline flex items-center gap-0.5">
              {tr('Full roadmap', 'خارطة الطريق الكاملة')} <ArrowRight className="h-3 w-3 rtl:rotate-180" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{tr('Project duration across the planning horizon', 'مدة المشاريع عبر الأفق التخطيطي')}</p>
          <div className="grid grid-cols-[130px_1fr] gap-3 text-sm uppercase tracking-wide text-muted-foreground font-semibold mb-2">
            <span>{tr('Project', 'المشروع')}</span>
            <div className="grid grid-cols-5 text-center">
              {TIMELINE_YEARS.map(y => <span key={y}>{y}</span>)}
            </div>
          </div>
          <div className="space-y-2">
            {ganttProjects.map(p => {
              const left = Math.max(0, ((p.start - TIMELINE_YEARS[0]) / TIMELINE_YEARS.length) * 100);
              const width = Math.min(100 - left, ((p.end - p.start + 1) / TIMELINE_YEARS.length) * 100);
              return (
                <div key={p.id} className="grid grid-cols-[130px_1fr] gap-3 items-center">
                  <span className="text-sm font-medium truncate" title={ts(p.name)}>{ts(p.name)}</span>
                  <div className="relative h-6 bg-muted/50 rounded-lg overflow-hidden">
                    <button
                      onClick={() => store.openProject(p.id)}
                      className="absolute top-0.5 bottom-0.5 rounded-md flex items-center px-2 text-sm font-bold text-white whitespace-nowrap overflow-hidden transition-transform hover:scale-y-110"
                      style={{ insetInlineStart: `${left}%`, width: `${width}%`, backgroundImage: `linear-gradient(${isRTL ? '270deg' : '90deg'},${TYPES[p.type].color}, ${TYPES[p.type].color}cc)` }}
                    >
                      {p.start}–{p.end}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="font-medium">{tr('Department × Type Coverage', 'التغطية حسب الإدارة × النوع')}</h3>
          <p className="text-sm text-muted-foreground mb-4">{tr("Where the portfolio is concentrated — and where it isn't", 'أين تتركز المحفظة — وأين تغيب')}</p>
          <div className="grid gap-1.5" style={{ gridTemplateColumns: `150px repeat(${heatTypes.length}, 1fr)` }}>
            <div />
            {heatTypes.map(t => (
              <div key={t} className="text-center text-sm uppercase tracking-wide text-muted-foreground font-semibold pb-2">{ts(TYPES[t].label)}</div>
            ))}
            {heatDepts.map(d => (
              <Fragment key={d}>
                <div className="flex items-center text-sm font-medium pe-2 truncate">{ts(d)}</div>
                {heatTypes.map(t => {
                  const n = projects.filter(p => p.dept === d && p.type === t).length;
                  const alpha = 0.14 + (n / heatMax) * 0.8;
                  return (
                    <div
                      key={d + t}
                      title={`${ts(d)} · ${ts(TYPES[t].label)}: ${n}`}
                      className={cn('h-9 rounded-lg flex items-center justify-center text-sm font-bold', n ? 'text-white' : 'bg-muted text-muted-foreground')}
                      style={n ? { background: `rgba(0,135,85,${alpha})` } : undefined}
                    >
                      {n || '—'}
                    </div>
                  );
                })}
              </Fragment>
            ))}
          </div>
          <div className="flex items-center gap-2.5 mt-4 text-sm text-muted-foreground font-medium">
            <span>{tr('Sparse', 'منخفض')}</span>
            <div className="flex-1 h-1.5 rounded-full bg-gradient-to-r rtl:bg-gradient-to-l from-[#dce7e3] via-[#7fc2a6] to-[#00402f]" />
            <span>{tr('Dense', 'مرتفع')}</span>
          </div>
        </div>
      </div>

      {/* ── Innovation output & IP strip ─────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h2 className="font-medium">{tr('Innovation Output & Intellectual Property', 'مخرجات الابتكار والملكية الفكرية')}</h2>
          <Badge className="bg-[#008755]/10 text-[#008755] border-0 text-sm">{tr('STRATEGIC INDICATORS', 'المؤشرات الاستراتيجية')}</Badge>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            [Shield, IP_REGISTER.filter(x => x.kind === 'Patent').length, tr('Patents · ', 'براءات الاختراع · ') + IP_REGISTER.filter(x => x.kind === 'Patent' && x.status === 'Granted').length + tr(' granted', ' ممنوحة')],
            [Shield, IP_REGISTER.filter(x => x.kind === 'Trademark').length, tr('Trademarks', 'العلامات التجارية')],
            [Award, 14, tr('Awards · 3 global', 'الجوائز · 3 عالمية')],
            [BookOpen, 3, tr("Int'l Accreditations", 'الاعتمادات الدولية')],
            [CheckCircle2, '82%', tr('Innovation Readiness', 'جاهزية الابتكار')],
            [TrendingUp, '27%', tr('Tech Investment Rate', 'معدل الاستثمار التقني')],
            [Building2, 26, tr('Administrative Services', 'الخدمات الإدارية')],
            [BadgeCheck, projects.filter(p => p.stage === 'Sandbox' || p.status === 'Completed').length, tr('Reached Sandbox / Completed', 'بلغت البيئة التجريبية / مكتملة')],
          ].map(([Icon, v, l], i) => {
            const IconComp = Icon as React.ElementType;
            return (
              <div key={i} className="bg-card border border-border rounded-xl p-4">
                <div className="h-9 w-9 rounded-lg bg-[#008755]/10 flex items-center justify-center mb-3">
                  <IconComp className="h-4 w-4 text-[#008755]" />
                </div>
                <p className="text-xl   leading-none">{v}</p>
                <p className="text-[11.5px] text-muted-foreground mt-1.5">{l}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Innovation by stage / Knowledge by class / Awards ────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="font-medium">{tr('Innovation by Stage', 'الابتكار حسب المرحلة')}</h3>
          <p className="text-sm text-muted-foreground mb-4">IN1 – IN2 – IN3</p>
          <div className="space-y-3">
            {innovByCls.map(({ c, v }) => (
              <div key={c} className="grid grid-cols-[60px_1fr_28px] items-center gap-2.5 text-sm">
                <span className="text-foreground/80 font-medium">{c}</span>
                <Progress value={(v / innovMax) * 100} className="h-2" indicatorColor="#008755" />
                <span className="text-end  ">{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="font-medium">{tr('Knowledge by Class', 'المعرفة حسب الفئة')}</h3>
          <p className="text-sm text-muted-foreground mb-4">{tr('GIMI-aligned tiers', 'مستويات متوافقة مع GIMI')}</p>
          <div className="space-y-3">
            {knowByCls.map(({ c, v }) => (
              <div key={c} className="grid grid-cols-[60px_1fr_28px] items-center gap-2.5 text-sm">
                <span className="text-foreground/80 font-medium">{ts(c)}</span>
                <Progress value={(v / knowMax) * 100} className="h-2" indicatorColor="#a8710d" />
                <span className="text-end  ">{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="font-medium">{tr('Awards', 'الجوائز')}</h3>
          <p className="text-sm text-muted-foreground mb-4">{tr('By recognition level', 'حسب مستوى التكريم')}</p>
          <div className="space-y-3">
            {AWARDS.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[60px_1fr_28px] items-center gap-2.5 text-sm">
                <span className="text-foreground/80 font-medium">{tr(k, AWARD_AR[k])}</span>
                <Progress value={(v / awardsMax) * 100} className="h-2" indicatorColor="#6741a5" />
                <span className="text-end  ">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Innovation Showcase ──────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h2 className="font-medium ">{tr('Innovation Showcase', 'معرض الابتكار')}</h2>
          <span className="ms-auto text-sm text-muted-foreground">{tr('Quarterly briefing · 2:40', 'الإحاطة الربعية · 2:40')}</span>
        </div>
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          <div
            className="relative aspect-[19/7] cursor-pointer overflow-hidden"
            style={{ backgroundImage: 'linear-gradient(150deg, #02241b, #004734 55%, #00674b)' }}
            onClick={() => setVideoPlaying(v => !v)}
          >
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 80% 15%, rgba(255,255,255,.25), transparent 55%)' }} />
            <div
              className={cn('absolute inset-0 flex items-center justify-center transition-transform duration-700', videoPlaying && 'scale-105')}
            >
              <div className="w-[46%] max-w-sm rounded-xl bg-white/10 border border-white/15 p-4 backdrop-blur-sm">
                <div className="h-2 w-2/3 rounded-full bg-white/70 mb-2.5" />
                <div className="h-2 w-1/2 rounded-full bg-white/40 mb-4" />
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-9 rounded-lg bg-emerald-400/60" />
                  <div className="h-9 rounded-lg bg-white/25" />
                  <div className="h-9 rounded-lg bg-white/15" />
                </div>
              </div>
            </div>
            <div className="absolute start-6 bottom-16 text-white max-w-[60%]">
              <p className="text-sm font-bold uppercase tracking-widest text-white/70">{tr('Q3 2026 Briefing', 'إحاطة الربع الثالث 2026')}</p>
              <h3 className="text-lg   mt-1 leading-snug">{tr('From idea to sandbox — a quarter of institutional innovation', 'من الفكرة إلى البيئة التجريبية — ربع عام من الابتكار المؤسسي')}</h3>
            </div>
            {!videoPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                <div className="h-16 w-16 rounded-full bg-white/95 flex items-center justify-center shadow-lg">
                  <Play className="h-6 w-6 text-[#005844] ms-0.5" fill="currentColor" />
                </div>
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 px-5 py-3 flex items-center gap-3.5 bg-gradient-to-t from-black/70 to-transparent" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setVideoPlaying(v => !v)} aria-label={videoPlaying ? tr('Pause', 'إيقاف مؤقت') : tr('Play', 'تشغيل')} className="h-7 w-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white flex-shrink-0 transition-colors">
                {videoPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3 ms-0.5" />}
              </button>
              <span className="text-sm text-white font-medium tabular-nums">{formatVidTime(videoTime)}</span>
              <div
                className="flex-1 h-1 rounded-full bg-white/25 cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setVideoTime((((isRTL ? rect.right - e.clientX : e.clientX - rect.left)) / rect.width) * VID_LEN);
                }}
              >
                <div className="h-full bg-white rounded-full" style={{ width: `${(videoTime / VID_LEN) * 100}%` }} />
              </div>
              <span className="text-sm text-white/80 font-medium">2:40</span>
              <Volume2 className="h-3.5 w-3.5 text-white/80 flex-shrink-0" />
              <button onClick={() => toast.info(tr('Fullscreen playback', 'التشغيل بملء الشاشة'))} aria-label={tr('Fullscreen', 'ملء الشاشة')} className="text-white/80 hover:text-white flex-shrink-0">
                <Maximize2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div>
              <p className="font-medium">{tr('Quarterly Innovation Briefing', 'الإحاطة الربعية للابتكار')}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{tr('Covers 20 active projects, 4 sandbox pilots and 5 pending patent filings.', 'تغطي 20 مشروعاً نشطاً و4 تجارب في البيئة التجريبية و5 طلبات براءات اختراع قيد الانتظار.')}</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[tr('Sandbox Pilots', 'تجارب البيئة التجريبية'), tr('Patents', 'براءات الاختراع'), tr('Partner Programmes', 'برامج الشركاء'), tr('Readiness Index', 'مؤشر الجاهزية')].map(c => (
                <span key={c} className="text-sm font-medium px-2.5 py-1 rounded-full bg-[#008755]/10 text-[#008755] border border-border">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Media & Field Gallery ────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h2 className=" font-medium">{tr('Media & Field Gallery', 'معرض الوسائط والميدان')}</h2>
          <button onClick={() => toast.info(tr('Opening full media library', 'جارٍ فتح مكتبة الوسائط الكاملة'))} className="ms-auto text-sm text-[#008755] hover:underline flex items-center gap-0.5">
            {tr('Full library', 'المكتبة الكاملة')} <ArrowRight className="h-3 w-3 rtl:rotate-180" />
          </button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {GALLERY.map((g, i) => (
            <button
              key={g.title}
              onClick={() => setLightboxIndex(i)}
              className="relative rounded-2xl overflow-hidden aspect-[4/3.2] text-start shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
              style={{ backgroundImage: `url(${g.hero})` , backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <span className="absolute top-3 end-3 bg-white/90 text-[#005844] text-sm font-bold px-2 py-0.5 rounded-full">{tr(g.pin, g.pinAr)}</span>
              <div className="absolute start-3.5 end-3.5 bottom-3.5 text-white">
                <p className="text-[9.5px] font-bold uppercase tracking-wider opacity-80">{tr(g.tag, g.tagAr)}</p>
                <p className="text-[13px]   mt-1 leading-snug">{tr(g.title, g.titleAr)}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={lightboxIndex !== null} onOpenChange={(open) => { if (!open) setLightboxIndex(null); }}>
        <DialogContent className="sm:max-w-2xl p-0 overflow-hidden gap-0">
          {lightboxItem && (
            <>
              <div className="aspect-[16/8] relative" style={{ backgroundImage: `linear-gradient(135deg, ${lightboxItem.from}, ${lightboxItem.to})` }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImageIcon className="h-10 w-10 text-white/30" />
                </div>
              </div>
              <div className="p-6">
                <DialogTitle className="  text-lg">{tr(lightboxItem.title, lightboxItem.titleAr)}</DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground mt-2 leading-relaxed">{tr(lightboxItem.desc, lightboxItem.descAr)}</DialogDescription>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ── Impact Stories ───────────────────────────────────────────────── */}
      <div>
        <h2 className=" font-medium  mb-3">{tr('Impact Stories', 'قصص الأثر')}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {STORIES.map(s => (
            <div key={s.title} onClick={() => toast.info(tr('Opening impact story', 'جارٍ فتح قصة الأثر'))} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="h-32 bg-gradient-to-br from-[#00a869] to-[#005844] relative"
              style={{ backgroundImage: `url(${s.hero})` , backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                <span className="absolute -bottom-5 start-4 h-11 w-11 rounded-xl border-[3px] border-card bg-gradient-to-br from-[#00a869] to-[#005844] flex items-center justify-center text-white text-sm font-bold">
                  {s.initials}
                </span>
              </div>
              <div className="pt-8 pb-4 px-4">
                <p className="font-medium leading-snug">{tr(s.title, s.titleAr)}</p>
                <p className="text-sm text-muted-foreground mt-1">{tr(s.workstream, s.workstreamAr)}</p>
                <div className="flex items-center gap-1.5 mt-3.5 pt-3 border-t border-border text-sm   text-[#008755]">
                  <TrendingUp className="h-3.5 w-3.5" /> {tr(s.stat, s.statAr)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Recently updated ─────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h2 className="font-medium ">{tr('Recently Updated Projects', 'المشاريع المحدثة مؤخراً')}</h2>
          <button onClick={() => onNavigate('rd')} className="ms-auto text-sm text-[#008755] hover:underline flex items-center gap-0.5">
            {tr('View all', 'عرض الكل')} <ArrowRight className="h-3 w-3 rtl:rotate-180" />
          </button>
        </div>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-start text-sm uppercase tracking-wide text-muted-foreground bg-muted/30">
                <th className="px-4 py-2.5 font-semibold text-start">{tr('Project', 'المشروع')}</th>
                <th className="px-4 py-2.5 font-semibold text-start">{tr('Type', 'النوع')}</th>
                <th className="px-4 py-2.5 font-semibold text-start">{tr('Status', 'الحالة')}</th>
                <th className="px-4 py-2.5 font-semibold text-start">{tr('Stage', 'المرحلة')}</th>
                <th className="px-4 py-2.5 font-semibold text-start">{tr('Budget', 'الميزانية')}</th>
                <th className="px-4 py-2.5 font-semibold text-start">{tr('Department', 'الإدارة')}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 8).map(p => (
                <tr key={p.id} onClick={() => store.openProject(p.id)} className="border-b border-border last:border-0 hover:bg-muted/30 cursor-pointer transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      {/* <span className="h-8 w-8 rounded-lg flex-shrink-0" style={{ backgroundImage: `linear-gradient(135deg, ${TYPES[p.type].gradientFrom}, ${TYPES[p.type].gradientTo})` }} /> */}
                      <div className="min-w-0">
                        <p className="  truncate">{ts(p.name)}</p>
                        <p className="text-sm text-muted-foreground">{p.id} · {p.start}–{p.end}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><Badge className={`${TYPES[p.type].badgeClass} border-0 text-sm`}>{ts(TYPES[p.type].label)}</Badge></td>
                  <td className="px-4 py-3"><Badge className={`${STATUS_META[p.status].badgeClass} border-0 text-sm`}>{ts(p.status)}</Badge></td>
                  <td className="px-4 py-3 text-sm">{ts(p.stage)}</td>
                  <td className="px-4 py-3 text-sm  ">{fmtMoney(p.budget)}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{ts(p.dept)}</td>
                </tr>
              ))}
              {!filtered.length && (
                <tr><td colSpan={6} className="px-4 py-10 text-center text-sm text-muted-foreground">{tr('No projects found. Try adjusting the filters or clearing your search.', 'لم يتم العثور على مشاريع. حاول تعديل عوامل التصفية أو مسح البحث.')}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
