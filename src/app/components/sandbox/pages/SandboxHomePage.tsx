import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import {
  Layers, Wallet, Users, Building2, Download, Plus, Shield, Award,
  BadgeCheck, TrendingUp, BookOpen, CheckCircle2, ArrowRight, Filter,
  Play, Pause, Maximize2, Volume2, Image as ImageIcon,
} from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../../ui/dialog';
import { cn } from '../../ui/utils';
import {
  DEPARTMENTS, IP_REGISTER, STAGES, STAGE_SUBLABELS, STATUS_META, TYPES,
  money, type ProjectStatus, type ProjectType,
} from '../sandboxData';
import type { SandboxPage, SandboxStore } from '../SandboxStore';
import { NewProjectDialog } from '../NewProjectDialog';
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

const GALLERY = [
  {hero: dubaiPolice, title: 'Smart Evidence Room, Precinct 4', tag: 'Sandbox Pilot', pin: 'IN1', from: '#00a869', to: '#005844', desc: 'The first fully digital evidence room, where every item is RFID-tagged and custody transfers are logged automatically. Manual custody errors dropped 71% in the first eight weeks of the sandbox pilot.' },
  {hero: dubaiPolice2, title: 'Autonomous Patrol Drone Trials', tag: 'R&D Feasibility', pin: 'R&D', from: '#3b8fe0', to: '#17457e', desc: 'Feasibility trials for autonomous aerial patrol units across three designated districts, assessing flight endurance, regulatory clearance and live-feed latency.' },
  {hero: dubaiPolice3, title: 'Forensics Rapid-Analysis Lab', tag: 'Research', pin: 'Patent', from: '#8b6fd4', to: '#4a2f8f', desc: 'Reducing forensic DNA turnaround from 48 hours to under six. A patent on the sequencing protocol is currently under approval.' },
  {hero: dubaiPolice4, title: 'Traffic Digital Twin Control Room', tag: 'Innovation', pin: 'IN2', from: '#e0a83b', to: '#8a5c07', desc: 'A real-time digital twin of the traffic network, allowing interventions to be simulated before any field deployment.' },
  {hero: dubaiPolice5, title: 'Officer Field Manual — Offline Mobile', tag: 'Knowledge', pin: 'Class 5', from: '#e0a83b', to: '#8a5c07', desc: 'Full digitization of operational field manuals with offline access, now deployed to every frontline officer device.' },
  {hero: dubaiPolice6, title: 'Quantum-Resistant Comms Pilot', tag: 'Completed', pin: 'Granted', from: '#00a869', to: '#005844', desc: 'Post-quantum cryptography piloted across internal communication channels, completed 2025 with a granted patent.' },
  {hero: dubaiPolice2, title: 'Community Innovation Workshop', tag: 'Engagement', pin: '2026', from: '#3b8fe0', to: '#17457e', desc: 'Design-thinking workshops bringing community representatives into the idea pipeline at intake stage.' },
  {hero: hero, title: 'Smart Queue Deployment', tag: 'Sandbox Pilot', pin: '-64%', from: '#8b6fd4', to: '#4a2f8f', desc: 'Average service centre wait time reduced from 25 minutes to 9 across three pilot centres.' },
];

const STORIES = [
  { hero: hero, title: 'Custody errors down 71% in eight weeks', workstream: 'Legal Affairs · Smart Evidence Room', stat: '-71% manual errors', initials: 'SE' },
  { hero: dubaiPolice6, title: 'Complaint triage now 40% faster than manual routing', workstream: 'Community Affairs · AI Triage Engine', stat: '40% faster resolution', initials: 'AI' },
  { hero: dubaiPolice5, title: 'Service centre waits cut from 25 minutes to 9', workstream: 'Customer Happiness · Smart Queue', stat: '-64% average wait', initials: 'SQ' },
];

const VID_LEN = 160;
function formatVidTime(s: number) {
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
}

export function SandboxHomePage({ store, onNavigate }: PageProps) {
  const { projects, search } = store;
  const [typeFilter, setTypeFilter] = useState<'all' | ProjectType>('all');
  const [deptFilter, setDeptFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [newOpen, setNewOpen] = useState(false);

  const filtered = useMemo(() => projects.filter(p =>
    (typeFilter === 'all' || p.type === typeFilter) &&
    (deptFilter === 'all' || p.dept === deptFilter) &&
    (statusFilter === 'all' || p.status === statusFilter) &&
    (!search || (p.name + p.dept + p.id + p.status).toLowerCase().includes(search.toLowerCase()))
  ), [projects, typeFilter, deptFilter, statusFilter, search]);

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
          className="absolute -top-16 -right-16 h-160 w-160 rounded-full object-cover opacity-50 pointer-events-none select-none"
        />
        <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex gap-3.5">
            <div className="h-12 w-12 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center flex-shrink-0">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl   tracking-tight">Sandbox Platform</h1>
              <p className="text-white/80 text-sm mt-1 max-w-md">
                Institutional overview of research, innovation and knowledge output — from first idea through to sandbox pilot.
              </p>
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={() => toast.success('Dashboard exported to PDF')}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white/15 border border-white/30 px-3.5 py-2 text-sm   hover:bg-white/25 transition-colors"
            >
              <Download className="h-3.5 w-3.5" /> Export
            </button>
            <button
              onClick={() => setNewOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white text-[#005844] px-3.5 py-2 text-sm   hover:bg-white/90 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" /> New Project
            </button>
          </div>
        </div>

        <div className="relative z-10 flex flex-wrap gap-6 mt-6">
          {[
            ['Projects', projects.length],
            ['Total Budget', money(projects.reduce((s, p) => s + p.budget, 0))],
            ['IP Assets', IP_REGISTER.length],
            ['Partners', 9],
            ['Readiness Rate', '82%'],
          ].map(([l, v]) => (
            <div key={l as string} className="border-l-2 border-white/30 pl-3">
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
                onClick={() => setTypeFilter(t)}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg text-sm   transition-colors",
                  typeFilter === t ? 'bg-white text-[#005844]' : 'text-white/85 hover:text-white'
                )}
              >
                {t === 'all' ? 'All Types' : TYPES[t].label}
              </button>
            ))}
          </div>
          <Select value={deptFilter} onValueChange={setDeptFilter}>
            <SelectTrigger className="h-8 w-auto text-sm bg-white/15 border-white/30 text-white [&>svg]:text-white">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {DEPARTMENTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-8 w-auto text-sm bg-white/15 border-white/30 text-white [&>svg]:text-white">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {STATUS_LIST.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ── Portfolio Indicators ─────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h2 className="font-medium ">Portfolio Indicators</h2>
          <span className="ml-auto text-sm text-muted-foreground flex items-center gap-1.5">
            <Filter className="h-3 w-3" />
            {typeFilter === 'all' ? `showing all ${filtered.length} projects` : `filtered to ${TYPES[typeFilter].full} · ${filtered.length} projects`}
          </span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Total Projects', value: filtered.length, icon: Layers, delta: '+8%' },
            { label: 'Total Budget', value: money(totalBudget), icon: Wallet, delta: '+11%' },
            { label: 'Active Partners', value: 9, icon: Users, delta: '+2' },
            { label: 'Departments Engaged', value: depts.size, icon: Building2, delta: '+1' },
          ].map(({ label, value, icon: Icon, delta }) => (
            <div key={label} className="bg-card border border-border rounded-xl p-4 relative overflow-hidden">
              <span className="absolute top-3.5 right-3.5 text-sm font-bold px-1.5 py-0.5 rounded-full bg-[#008755]/10 text-[#008755]">{delta}</span>
              <div className="h-9 w-9 rounded-lg bg-[#008755]/10 flex items-center justify-center mb-3">
                <Icon className="h-4 w-4 text-[#008755]" />
              </div>
              <p className="text-2xl   leading-none">{value}</p>
              <p className="text-[11.5px] text-muted-foreground mt-1.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Status distribution + Budget by type ────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_.75fr] gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="font-medium">Project Status Distribution</h3>
          <p className="text-sm text-muted-foreground mb-4">Live breakdown across the filtered portfolio</p>
          <div className="flex items-center gap-6 flex-wrap">
            <div className="relative h-36 w-36 flex-shrink-0">
              <div className="absolute inset-0 rounded-full" style={{ background: `conic-gradient(${donutSegments})` }} />
              <div className="absolute inset-[19px] rounded-full bg-card shadow-inner flex flex-col items-center justify-center">
                <span className="text-xl   leading-none">{filtered.length}</span>
                <span className="text-[9px] uppercase tracking-wide text-muted-foreground mt-1">Projects</span>
              </div>
            </div>
            <div className="flex-1 min-w-[180px] space-y-2">
              {statusCounts.map(({ status, count }) => (
                <div key={status} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 font-medium text-foreground/80">
                    <span className="h-2.5 w-2.5 rounded-sm flex-shrink-0" style={{ background: STATUS_META[status].dot }} />
                    {status}
                  </span>
                  <span>
                    <span className=" ">{count}</span>
                    <span className="text-muted-foreground ml-1.5">{filtered.length ? Math.round((count / filtered.length) * 100) : 0}%</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="font-medium">Budget by Type</h3>
          <p className="text-sm text-muted-foreground mb-4">AED millions</p>
          <div className="space-y-3">
            {budgetByType.map(({ t, v }) => (
              <div key={t} className="grid grid-cols-[100px_1fr_36px] items-center gap-2.5 text-sm">
                <span className="text-foreground/80 font-medium truncate">{TYPES[t].full}</span>
                <Progress value={(v / bmax) * 100} className="h-2" indicatorColor={TYPES[t].color} />
                <span className="text-right  ">{v.toFixed(1)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Stage funnel ─────────────────────────────────────────────────── */}
      <div className="bg-card border border-border rounded-xl p-4">
        <h3 className="font-medium mb-1">Project Stage Funnel</h3>
        <p className="text-sm text-muted-foreground mb-4">Idea → Feasibility Study → Approval → Development → Sandbox</p>
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
                <p className="text-sm  ">{s}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{STAGE_SUBLABELS[s]}</p>
                {i < STAGES.length - 1 && <ArrowRight className="h-4 w-4 text-border absolute top-6 -right-1" />}
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
            <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-white/90 text-[#005844] text-sm font-bold px-2.5 py-1 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-[#008755] animate-pulse" />
              LIVE IN SANDBOX
            </span>
          </div>
          <div className="p-6 flex flex-col justify-center">
            <span className="text-sm font-bold uppercase tracking-wide text-[#008755] mb-2">Innovation · {spotlight.cls}</span>
            <h2 className="text-lg   leading-snug">Smart Evidence Room — RFID Chain of Custody</h2>
            <p className="text-sm text-muted-foreground mt-2.5 leading-relaxed max-w-md">
              A fully digital evidence room replacing manual custody logs with RFID tracking. Now running in sandbox across two precincts, with a granted patent on the chain-of-custody protocol and a federal accreditation submission in progress.
            </p>
            <div className="flex flex-wrap gap-6 mt-4 mb-5">
              {[['94', 'Evaluation Score'], ['AED 5.1M', 'Budget'], ['-71%', 'Custody Errors'], ['1', 'Patent Granted']].map(([n, l]) => (
                <div key={l}>
                  <p className="text-lg   text-[#008755]">{n}</p>
                  <p className="text-sm uppercase tracking-wide text-muted-foreground font-medium">{l}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => store.openProject('P-201')} className="rounded-lg bg-[#008755] hover:bg-[#005844] text-white text-sm   px-4 py-2.5 transition-colors">
                Open Project Record
              </button>
              <button onClick={() => toast.success('Case study exported')} className="rounded-lg border border-border text-sm   px-4 py-2.5 hover:bg-muted/40 transition-colors">
                Export Case Study
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Dept bars + KPI achievement ──────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="font-medium">Projects by Department</h3>
          <p className="text-sm text-muted-foreground mb-4">Organizational structure breakdown</p>
          <div className="space-y-3">
            {deptCounts.length ? deptCounts.map(([d, v]) => (
              <div key={d} className="grid grid-cols-[132px_1fr_28px] items-center gap-2.5 text-sm">
                <span className="text-foreground/80 font-medium truncate">{d}</span>
                <Progress value={(v / dmax) * 100} className="h-2" indicatorColor="#008755" />
                <span className="text-right  ">{v}</span>
              </div>
            )) : <p className="text-sm text-muted-foreground py-2">No projects match the current filters.</p>}
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="font-medium">KPI Achievement</h3>
          <p className="text-sm text-muted-foreground mb-4">Per strategic indicator</p>
          <div className="space-y-3">
            {[['Submission Target', 92], ['Budget Utilization', 88], ['Patent Filing Target', 70], ['Partner Growth', 65], ['Readiness Index', 82]].map(([k, v]) => (
              <div key={k as string} className="grid grid-cols-[132px_1fr_36px] items-center gap-2.5 text-sm">
                <span className="text-foreground/80 font-medium truncate">{k}</span>
                <Progress value={v as number} className="h-2" indicatorColor="#008755" />
                <span className="text-right  ">{v}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Portfolio timeline + Department × Type coverage ─────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-medium">Portfolio Timeline</h3>
            <button onClick={() => toast.info('Opening full roadmap view')} className="text-sm text-[#008755] hover:underline flex items-center gap-0.5">
              Full roadmap <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Project duration across the planning horizon</p>
          <div className="grid grid-cols-[130px_1fr] gap-3 text-sm uppercase tracking-wide text-muted-foreground font-semibold mb-2">
            <span>Project</span>
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
                  <span className="text-sm font-medium truncate" title={p.name}>{p.name}</span>
                  <div className="relative h-6 bg-muted/50 rounded-lg overflow-hidden">
                    <button
                      onClick={() => store.openProject(p.id)}
                      className="absolute top-0.5 bottom-0.5 rounded-md flex items-center px-2 text-sm font-bold text-white whitespace-nowrap overflow-hidden transition-transform hover:scale-y-110"
                      style={{ left: `${left}%`, width: `${width}%`, backgroundImage: `linear-gradient(90deg, ${TYPES[p.type].color}, ${TYPES[p.type].color}cc)` }}
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
          <h3 className="font-medium">Department × Type Coverage</h3>
          <p className="text-sm text-muted-foreground mb-4">Where the portfolio is concentrated — and where it isn't</p>
          <div className="grid gap-1.5" style={{ gridTemplateColumns: `150px repeat(${heatTypes.length}, 1fr)` }}>
            <div />
            {heatTypes.map(t => (
              <div key={t} className="text-center text-sm uppercase tracking-wide text-muted-foreground font-semibold pb-2">{TYPES[t].label}</div>
            ))}
            {heatDepts.map(d => (
              <Fragment key={d}>
                <div className="flex items-center text-sm font-medium pr-2 truncate">{d}</div>
                {heatTypes.map(t => {
                  const n = projects.filter(p => p.dept === d && p.type === t).length;
                  const alpha = 0.14 + (n / heatMax) * 0.8;
                  return (
                    <div
                      key={d + t}
                      title={`${d} · ${TYPES[t].label}: ${n}`}
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
            <span>Sparse</span>
            <div className="flex-1 h-1.5 rounded-full bg-gradient-to-r from-[#dce7e3] via-[#7fc2a6] to-[#00402f]" />
            <span>Dense</span>
          </div>
        </div>
      </div>

      {/* ── Innovation output & IP strip ─────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h2 className="font-medium">Innovation Output &amp; Intellectual Property</h2>
          <Badge className="bg-[#008755]/10 text-[#008755] border-0 text-sm">STRATEGIC INDICATORS</Badge>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            [Shield, IP_REGISTER.filter(x => x.kind === 'Patent').length, 'Patents · ' + IP_REGISTER.filter(x => x.kind === 'Patent' && x.status === 'Granted').length + ' granted'],
            [Shield, IP_REGISTER.filter(x => x.kind === 'Trademark').length, 'Trademarks'],
            [Award, 14, 'Awards · 3 global'],
            [BookOpen, 3, "Int'l Accreditations"],
            [CheckCircle2, '82%', 'Innovation Readiness'],
            [TrendingUp, '27%', 'Tech Investment Rate'],
            [Building2, 26, 'Administrative Services'],
            [BadgeCheck, projects.filter(p => p.stage === 'Sandbox' || p.status === 'Completed').length, 'Reached Sandbox / Completed'],
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
          <h3 className="font-medium">Innovation by Stage</h3>
          <p className="text-sm text-muted-foreground mb-4">IN1 – IN2 – IN3</p>
          <div className="space-y-3">
            {innovByCls.map(({ c, v }) => (
              <div key={c} className="grid grid-cols-[60px_1fr_28px] items-center gap-2.5 text-sm">
                <span className="text-foreground/80 font-medium">{c}</span>
                <Progress value={(v / innovMax) * 100} className="h-2" indicatorColor="#008755" />
                <span className="text-right  ">{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="font-medium">Knowledge by Class</h3>
          <p className="text-sm text-muted-foreground mb-4">GIMI-aligned tiers</p>
          <div className="space-y-3">
            {knowByCls.map(({ c, v }) => (
              <div key={c} className="grid grid-cols-[60px_1fr_28px] items-center gap-2.5 text-sm">
                <span className="text-foreground/80 font-medium">{c}</span>
                <Progress value={(v / knowMax) * 100} className="h-2" indicatorColor="#a8710d" />
                <span className="text-right  ">{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="font-medium">Awards</h3>
          <p className="text-sm text-muted-foreground mb-4">By recognition level</p>
          <div className="space-y-3">
            {AWARDS.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[60px_1fr_28px] items-center gap-2.5 text-sm">
                <span className="text-foreground/80 font-medium">{k}</span>
                <Progress value={(v / awardsMax) * 100} className="h-2" indicatorColor="#6741a5" />
                <span className="text-right  ">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Innovation Showcase ──────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h2 className="font-medium ">Innovation Showcase</h2>
          <span className="ml-auto text-sm text-muted-foreground">Quarterly briefing · 2:40</span>
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
            <div className="absolute left-6 bottom-16 text-white max-w-[60%]">
              <p className="text-sm font-bold uppercase tracking-widest text-white/70">Q3 2026 Briefing</p>
              <h3 className="text-lg   mt-1 leading-snug">From idea to sandbox — a quarter of institutional innovation</h3>
            </div>
            {!videoPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                <div className="h-16 w-16 rounded-full bg-white/95 flex items-center justify-center shadow-lg">
                  <Play className="h-6 w-6 text-[#005844] ml-0.5" fill="currentColor" />
                </div>
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 px-5 py-3 flex items-center gap-3.5 bg-gradient-to-t from-black/70 to-transparent" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setVideoPlaying(v => !v)} className="h-7 w-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white flex-shrink-0 transition-colors">
                {videoPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3 ml-0.5" />}
              </button>
              <span className="text-sm text-white font-medium tabular-nums">{formatVidTime(videoTime)}</span>
              <div
                className="flex-1 h-1 rounded-full bg-white/25 cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setVideoTime(((e.clientX - rect.left) / rect.width) * VID_LEN);
                }}
              >
                <div className="h-full bg-white rounded-full" style={{ width: `${(videoTime / VID_LEN) * 100}%` }} />
              </div>
              <span className="text-sm text-white/80 font-medium">2:40</span>
              <Volume2 className="h-3.5 w-3.5 text-white/80 flex-shrink-0" />
              <button onClick={() => toast.info('Fullscreen playback')} className="text-white/80 hover:text-white flex-shrink-0">
                <Maximize2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div>
              <p className="font-medium">Quarterly Innovation Briefing</p>
              <p className="text-sm text-muted-foreground mt-0.5">Covers 20 active projects, 4 sandbox pilots and 5 pending patent filings.</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['Sandbox Pilots', 'Patents', 'Partner Programmes', 'Readiness Index'].map(c => (
                <span key={c} className="text-sm font-medium px-2.5 py-1 rounded-full bg-[#008755]/10 text-[#008755] border border-border">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Media & Field Gallery ────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h2 className=" font-medium">Media &amp; Field Gallery</h2>
          <button onClick={() => toast.info('Opening full media library')} className="ml-auto text-sm text-[#008755] hover:underline flex items-center gap-0.5">
            Full library <ArrowRight className="h-3 w-3" />
          </button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {GALLERY.map((g, i) => (
            <button
              key={g.title}
              onClick={() => setLightboxIndex(i)}
              className="relative rounded-2xl overflow-hidden aspect-[4/3.2] text-left shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
              style={{ backgroundImage: `url(${g.hero})` , backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <span className="absolute top-3 right-3 bg-white/90 text-[#005844] text-sm font-bold px-2 py-0.5 rounded-full">{g.pin}</span>
              <div className="absolute left-3.5 right-3.5 bottom-3.5 text-white">
                <p className="text-[9.5px] font-bold uppercase tracking-wider opacity-80">{g.tag}</p>
                <p className="text-[13px]   mt-1 leading-snug">{g.title}</p>
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
                <DialogTitle className="  text-lg">{lightboxItem.title}</DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground mt-2 leading-relaxed">{lightboxItem.desc}</DialogDescription>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ── Impact Stories ───────────────────────────────────────────────── */}
      <div>
        <h2 className=" font-medium  mb-3">Impact Stories</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {STORIES.map(s => (
            <div key={s.title} onClick={() => toast.info('Opening impact story')} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="h-32 bg-gradient-to-br from-[#00a869] to-[#005844] relative"
              style={{ backgroundImage: `url(${s.hero})` , backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                <span className="absolute -bottom-5 left-4 h-11 w-11 rounded-xl border-[3px] border-card bg-gradient-to-br from-[#00a869] to-[#005844] flex items-center justify-center text-white text-sm font-bold">
                  {s.initials}
                </span>
              </div>
              <div className="pt-8 pb-4 px-4">
                <p className="font-medium leading-snug">{s.title}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.workstream}</p>
                <div className="flex items-center gap-1.5 mt-3.5 pt-3 border-t border-border text-sm   text-[#008755]">
                  <TrendingUp className="h-3.5 w-3.5" /> {s.stat}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Recently updated ─────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h2 className="font-medium ">Recently Updated Projects</h2>
          <button onClick={() => onNavigate('rd')} className="ml-auto text-sm text-[#008755] hover:underline flex items-center gap-0.5">
            View all <ArrowRight className="h-3 w-3" />
          </button>
        </div>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-sm uppercase tracking-wide text-muted-foreground bg-muted/30">
                <th className="px-4 py-2.5 font-semibold">Project</th>
                <th className="px-4 py-2.5 font-semibold">Type</th>
                <th className="px-4 py-2.5 font-semibold">Status</th>
                <th className="px-4 py-2.5 font-semibold">Stage</th>
                <th className="px-4 py-2.5 font-semibold">Budget</th>
                <th className="px-4 py-2.5 font-semibold">Department</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 8).map(p => (
                <tr key={p.id} onClick={() => store.openProject(p.id)} className="border-b border-border last:border-0 hover:bg-muted/30 cursor-pointer transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      {/* <span className="h-8 w-8 rounded-lg flex-shrink-0" style={{ backgroundImage: `linear-gradient(135deg, ${TYPES[p.type].gradientFrom}, ${TYPES[p.type].gradientTo})` }} /> */}
                      <div className="min-w-0">
                        <p className="  truncate">{p.name}</p>
                        <p className="text-sm text-muted-foreground">{p.id} · {p.start}–{p.end}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><Badge className={`${TYPES[p.type].badgeClass} border-0 text-sm`}>{TYPES[p.type].label}</Badge></td>
                  <td className="px-4 py-3"><Badge className={`${STATUS_META[p.status].badgeClass} border-0 text-sm`}>{p.status}</Badge></td>
                  <td className="px-4 py-3 text-sm">{p.stage}</td>
                  <td className="px-4 py-3 text-sm  ">{money(p.budget)}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{p.dept}</td>
                </tr>
              ))}
              {!filtered.length && (
                <tr><td colSpan={6} className="px-4 py-10 text-center text-sm text-muted-foreground">No projects found. Try adjusting the filters or clearing your search.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
