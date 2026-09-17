import { useMemo, useState } from 'react';
import {
  Layers, Wallet, Users, Building2, Download, Plus, Shield, Award,
  BadgeCheck, TrendingUp, BookOpen, CheckCircle2, ArrowRight, Filter,
} from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { cn } from '../../ui/utils';
import {
  DEPARTMENTS, IP_REGISTER, STAGES, STAGE_SUBLABELS, STATUS_META, TYPES,
  money, type ProjectStatus, type ProjectType,
} from '../sandboxData';
import type { SandboxPage, SandboxStore } from '../SandboxStore';
import { NewProjectDialog } from '../NewProjectDialog';

interface PageProps {
  store: SandboxStore;
  onNavigate: (page: SandboxPage) => void;
}

const STATUS_LIST: ProjectStatus[] = ['Ongoing', 'Completed', 'Delayed', 'Pending Approval', 'Rejected'];

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

  return (
    <div className="p-5 mx-auto space-y-5">
      <NewProjectDialog open={newOpen} onOpenChange={setNewOpen} store={store} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl bg-gradient-to-br from-[#005844] via-[#008755] to-[#00a869] p-7 text-white relative overflow-hidden">
        <div className="absolute -top-10 -right-10 h-56 w-56 rounded-full bg-white/[0.05] pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex gap-3.5">
            <div className="h-12 w-12 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center flex-shrink-0">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-['Dubai:Medium',_sans-serif] tracking-tight">Sandbox Platform</h1>
              <p className="text-white/80 text-sm mt-1 max-w-md">
                Institutional overview of research, innovation and knowledge output — from first idea through to sandbox pilot.
              </p>
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={() => toast.success('Dashboard exported to PDF')}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white/15 border border-white/30 px-3.5 py-2 text-xs font-['Dubai:Medium',_sans-serif] hover:bg-white/25 transition-colors"
            >
              <Download className="h-3.5 w-3.5" /> Export
            </button>
            <button
              onClick={() => setNewOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white text-[#005844] px-3.5 py-2 text-xs font-['Dubai:Medium',_sans-serif] hover:bg-white/90 transition-colors"
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
              <p className="text-xl font-['Dubai:Medium',_sans-serif] leading-none">{v}</p>
              <p className="text-[10.5px] uppercase tracking-wide text-white/75 mt-1 font-medium">{l}</p>
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
                  "px-3.5 py-1.5 rounded-lg text-xs font-['Dubai:Medium',_sans-serif] transition-colors",
                  typeFilter === t ? 'bg-white text-[#005844]' : 'text-white/85 hover:text-white'
                )}
              >
                {t === 'all' ? 'All Types' : TYPES[t].label}
              </button>
            ))}
          </div>
          <Select value={deptFilter} onValueChange={setDeptFilter}>
            <SelectTrigger className="h-8 w-auto text-xs bg-white/15 border-white/30 text-white [&>svg]:text-white">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {DEPARTMENTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-8 w-auto text-xs bg-white/15 border-white/30 text-white [&>svg]:text-white">
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
          <h2 className="text-sm font-['Dubai:Medium',_sans-serif]">Portfolio Indicators</h2>
          <span className="ml-auto text-[11px] text-muted-foreground flex items-center gap-1.5">
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
              <span className="absolute top-3.5 right-3.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#008755]/10 text-[#008755]">{delta}</span>
              <div className="h-9 w-9 rounded-lg bg-[#008755]/10 flex items-center justify-center mb-3">
                <Icon className="h-4 w-4 text-[#008755]" />
              </div>
              <p className="text-2xl font-['Dubai:Medium',_sans-serif] leading-none">{value}</p>
              <p className="text-[11.5px] text-muted-foreground mt-1.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Status distribution + Budget by type ────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_.75fr] gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="text-sm font-['Dubai:Medium',_sans-serif]">Project Status Distribution</h3>
          <p className="text-xs text-muted-foreground mb-4">Live breakdown across the filtered portfolio</p>
          <div className="flex items-center gap-6 flex-wrap">
            <div className="relative h-36 w-36 flex-shrink-0">
              <div className="absolute inset-0 rounded-full" style={{ background: `conic-gradient(${donutSegments})` }} />
              <div className="absolute inset-[19px] rounded-full bg-card shadow-inner flex flex-col items-center justify-center">
                <span className="text-xl font-['Dubai:Medium',_sans-serif] leading-none">{filtered.length}</span>
                <span className="text-[9px] uppercase tracking-wide text-muted-foreground mt-1">Projects</span>
              </div>
            </div>
            <div className="flex-1 min-w-[180px] space-y-2">
              {statusCounts.map(({ status, count }) => (
                <div key={status} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 font-medium text-foreground/80">
                    <span className="h-2.5 w-2.5 rounded-sm flex-shrink-0" style={{ background: STATUS_META[status].dot }} />
                    {status}
                  </span>
                  <span>
                    <span className="font-['Dubai:Medium',_sans-serif]">{count}</span>
                    <span className="text-muted-foreground ml-1.5">{filtered.length ? Math.round((count / filtered.length) * 100) : 0}%</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="text-sm font-['Dubai:Medium',_sans-serif]">Budget by Type</h3>
          <p className="text-xs text-muted-foreground mb-4">AED millions</p>
          <div className="space-y-3">
            {budgetByType.map(({ t, v }) => (
              <div key={t} className="grid grid-cols-[100px_1fr_36px] items-center gap-2.5 text-xs">
                <span className="text-foreground/80 font-medium truncate">{TYPES[t].full}</span>
                <Progress value={(v / bmax) * 100} className="h-2" indicatorColor={TYPES[t].color} />
                <span className="text-right font-['Dubai:Medium',_sans-serif]">{v.toFixed(1)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Stage funnel ─────────────────────────────────────────────────── */}
      <div className="bg-card border border-border rounded-xl p-4">
        <h3 className="text-sm font-['Dubai:Medium',_sans-serif] mb-1">Project Stage Funnel</h3>
        <p className="text-xs text-muted-foreground mb-4">Idea → Feasibility Study → Approval → Development → Sandbox</p>
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
                <p className="text-xs font-['Dubai:Medium',_sans-serif]">{s}</p>
                <p className="text-[10.5px] text-muted-foreground mt-0.5">{STAGE_SUBLABELS[s]}</p>
                {i < STAGES.length - 1 && <ArrowRight className="h-4 w-4 text-border absolute top-6 -right-1" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Spotlight ────────────────────────────────────────────────────── */}
      {spotlight && (
        <div className="grid grid-cols-1 md:grid-cols-[.9fr_1.1fr] bg-card border border-border rounded-xl overflow-hidden">
          <div className="relative min-h-[220px] bg-gradient-to-br from-[#00a869] to-[#005844] p-5 flex items-end">
            <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-white/90 text-[#005844] text-[10px] font-bold px-2.5 py-1 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-[#008755] animate-pulse" /> LIVE IN SANDBOX
            </span>
          </div>
          <div className="p-6 flex flex-col justify-center">
            <span className="text-[10px] font-bold uppercase tracking-wide text-[#008755] mb-2">Innovation · {spotlight.cls}</span>
            <h2 className="text-lg font-['Dubai:Medium',_sans-serif] leading-snug">Smart Evidence Room — RFID Chain of Custody</h2>
            <p className="text-xs text-muted-foreground mt-2.5 leading-relaxed max-w-md">
              A fully digital evidence room replacing manual custody logs with RFID tracking. Now running in sandbox across two precincts, with a granted patent on the chain-of-custody protocol and a federal accreditation submission in progress.
            </p>
            <div className="flex flex-wrap gap-6 mt-4 mb-5">
              {[['94', 'Evaluation Score'], ['AED 5.1M', 'Budget'], ['-71%', 'Custody Errors'], ['1', 'Patent Granted']].map(([n, l]) => (
                <div key={l}>
                  <p className="text-lg font-['Dubai:Medium',_sans-serif] text-[#008755]">{n}</p>
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium">{l}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => store.openProject('P-201')} className="rounded-lg bg-[#008755] hover:bg-[#005844] text-white text-xs font-['Dubai:Medium',_sans-serif] px-4 py-2.5 transition-colors">
                Open Project Record
              </button>
              <button onClick={() => toast.success('Case study exported')} className="rounded-lg border border-border text-xs font-['Dubai:Medium',_sans-serif] px-4 py-2.5 hover:bg-muted/40 transition-colors">
                Export Case Study
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Dept bars + KPI achievement ──────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="text-sm font-['Dubai:Medium',_sans-serif]">Projects by Department</h3>
          <p className="text-xs text-muted-foreground mb-4">Organizational structure breakdown</p>
          <div className="space-y-3">
            {deptCounts.length ? deptCounts.map(([d, v]) => (
              <div key={d} className="grid grid-cols-[132px_1fr_28px] items-center gap-2.5 text-xs">
                <span className="text-foreground/80 font-medium truncate">{d}</span>
                <Progress value={(v / dmax) * 100} className="h-2" indicatorColor="#008755" />
                <span className="text-right font-['Dubai:Medium',_sans-serif]">{v}</span>
              </div>
            )) : <p className="text-xs text-muted-foreground py-2">No projects match the current filters.</p>}
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="text-sm font-['Dubai:Medium',_sans-serif]">KPI Achievement</h3>
          <p className="text-xs text-muted-foreground mb-4">Per strategic indicator</p>
          <div className="space-y-3">
            {[['Submission Target', 92], ['Budget Utilization', 88], ['Patent Filing Target', 70], ['Partner Growth', 65], ['Readiness Index', 82]].map(([k, v]) => (
              <div key={k as string} className="grid grid-cols-[132px_1fr_36px] items-center gap-2.5 text-xs">
                <span className="text-foreground/80 font-medium truncate">{k}</span>
                <Progress value={v as number} className="h-2" indicatorColor="#008755" />
                <span className="text-right font-['Dubai:Medium',_sans-serif]">{v}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Innovation output & IP strip ─────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-sm font-['Dubai:Medium',_sans-serif]">Innovation Output &amp; Intellectual Property</h2>
          <Badge className="bg-[#008755]/10 text-[#008755] border-0 text-[10px]">STRATEGIC INDICATORS</Badge>
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
                <p className="text-xl font-['Dubai:Medium',_sans-serif] leading-none">{v}</p>
                <p className="text-[11.5px] text-muted-foreground mt-1.5">{l}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Recently updated ─────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-sm font-['Dubai:Medium',_sans-serif]">Recently Updated Projects</h2>
          <button onClick={() => onNavigate('rd')} className="ml-auto text-xs text-[#008755] hover:underline flex items-center gap-0.5">
            View all <ArrowRight className="h-3 w-3" />
          </button>
        </div>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[10px] uppercase tracking-wide text-muted-foreground bg-muted/30">
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
                      <span className="h-8 w-8 rounded-lg flex-shrink-0" style={{ backgroundImage: `linear-gradient(135deg, ${TYPES[p.type].gradientFrom}, ${TYPES[p.type].gradientTo})` }} />
                      <div className="min-w-0">
                        <p className="font-['Dubai:Medium',_sans-serif] truncate">{p.name}</p>
                        <p className="text-[10.5px] text-muted-foreground">{p.id} · {p.start}–{p.end}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><Badge className={`${TYPES[p.type].badgeClass} border-0 text-[10px]`}>{TYPES[p.type].label}</Badge></td>
                  <td className="px-4 py-3"><Badge className={`${STATUS_META[p.status].badgeClass} border-0 text-[10px]`}>{p.status}</Badge></td>
                  <td className="px-4 py-3 text-xs">{p.stage}</td>
                  <td className="px-4 py-3 text-xs font-['Dubai:Medium',_sans-serif]">{money(p.budget)}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{p.dept}</td>
                </tr>
              ))}
              {!filtered.length && (
                <tr><td colSpan={6} className="px-4 py-10 text-center text-xs text-muted-foreground">No projects found. Try adjusting the filters or clearing your search.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
