import { useMemo, useState } from 'react';
import { FlaskConical, Lightbulb, BookOpen, Download, Plus, List, LayoutGrid } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '../../ui/badge';
import { cn } from '../../ui/utils';
import {
  STAGES, STATUS_META, TYPES, money, type Project, type ProjectStatus, type ProjectType,
} from '../sandboxData';
import type { SandboxPage, SandboxStore } from '../SandboxStore';
import { NewProjectDialog } from '../NewProjectDialog';

interface PageProps {
  pageKey: 'rd' | 'innovation' | 'knowledge';
  store: SandboxStore;
  onNavigate: (page: SandboxPage) => void;
}

const KEY_TO_TYPE: Record<PageProps['pageKey'], ProjectType> = { rd: 'rd', innovation: 'innov', knowledge: 'know' };
const KEY_META: Record<PageProps['pageKey'], { icon: React.ElementType; title: string; desc: string; extraCol: string }> = {
  rd: { icon: FlaskConical, title: 'Research & Development', desc: 'Scientific studies, pilots and experimental research managed by the Innovation Office.', extraCol: 'Classification' },
  innovation: { icon: Lightbulb, title: 'Innovation Projects', desc: 'Projects classified per the GIMI-accredited assessment and tracked through to sandbox pilot.', extraCol: 'GIMI Class' },
  knowledge: { icon: BookOpen, title: 'Knowledge Projects', desc: 'Institutional knowledge assets classified by tier, owned by the Knowledge Management function.', extraCol: 'Classification' },
};

const STATUS_FILTERS: Array<'All' | ProjectStatus> = ['All', 'Ongoing', 'Completed', 'Delayed', 'Pending Approval'];

export function ProjectTypePage({ pageKey, store, onNavigate }: PageProps) {
  const { projects, search } = store;
  const type = KEY_TO_TYPE[pageKey];
  const meta = KEY_META[pageKey];
  const Icon = meta.icon;

  const [statusFilter, setStatusFilter] = useState<'All' | ProjectStatus>('All');
  const [view, setView] = useState<'list' | 'board'>('list');
  const [newOpen, setNewOpen] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);

  const all = useMemo(() => projects.filter(p => p.type === type), [projects, type]);
  const list = useMemo(() => all.filter(p =>
    (statusFilter === 'All' || p.status === statusFilter) &&
    (!search || p.name.toLowerCase().includes(search.toLowerCase()))
  ), [all, statusFilter, search]);

  const bud = all.reduce((s, p) => s + p.budget, 0);

  const handleDrop = (stage: Project['stage']) => {
    if (!dragId) return;
    const p = projects.find(x => x.id === dragId);
    if (!p || p.stage === stage) { setDragId(null); return; }
    const from = p.stage;
    store.setProjects(prev => prev.map(x => x.id === dragId ? { ...x, stage } : x));
    store.addAudit({ title: 'Stage changed', detail: `${p.name} moved from ${from} to ${stage}`, kind: 'info' });
    toast.success(`${p.name} → ${stage}`);
    setDragId(null);
  };

  const exportCsv = () => {
    toast.success(`${list.length} project records exported to CSV`);
    store.addAudit({ title: 'Data exported', detail: `${list.length} project records exported to CSV by Mohammed Hassan`, kind: 'warn' });
  };

  return (
    <div className="p-5 mx-auto space-y-5">
      <NewProjectDialog open={newOpen} onOpenChange={setNewOpen} store={store} defaultType={type} />

      <div className="rounded-2xl bg-gradient-to-br from-[#005844] via-[#008755] to-[#00a869] p-7 text-white relative overflow-hidden">
        <div className="absolute -top-10 -right-10 h-56 w-56 rounded-full bg-white/[0.05] pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex gap-3.5">
            <div className="h-12 w-12 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center flex-shrink-0">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-['Dubai:Medium',_sans-serif] tracking-tight">{meta.title}</h1>
              <p className="text-white/80 text-sm mt-1 max-w-md">{meta.desc}</p>
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button onClick={() => toast.success('Export queued')} className="inline-flex items-center gap-1.5 rounded-lg bg-white/15 border border-white/30 px-3.5 py-2 text-xs font-['Dubai:Medium',_sans-serif] hover:bg-white/25 transition-colors">
              <Download className="h-3.5 w-3.5" /> Export
            </button>
            <button onClick={() => setNewOpen(true)} className="inline-flex items-center gap-1.5 rounded-lg bg-white text-[#005844] px-3.5 py-2 text-xs font-['Dubai:Medium',_sans-serif] hover:bg-white/90 transition-colors">
              <Plus className="h-3.5 w-3.5" /> New Project
            </button>
          </div>
        </div>
        <div className="relative z-10 flex flex-wrap gap-6 mt-6">
          {[['Projects', all.length], ['Budget', money(bud)], ['Ongoing', all.filter(p => p.status === 'Ongoing').length], ['Reached Sandbox', all.filter(p => p.stage === 'Sandbox').length]].map(([l, v]) => (
            <div key={l as string} className="border-l-2 border-white/30 pl-3">
              <p className="text-xl font-['Dubai:Medium',_sans-serif] leading-none">{v}</p>
              <p className="text-[10.5px] uppercase tracking-wide text-white/75 mt-1 font-medium">{l}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          ['Total Projects', all.length],
          ['Allocated Budget', money(bud)],
          ['Currently Ongoing', all.filter(p => p.status === 'Ongoing').length],
          ['Reached Sandbox', all.filter(p => p.stage === 'Sandbox').length],
        ].map(([l, v]) => (
          <div key={l as string} className="bg-card border border-border rounded-xl p-4">
            <p className="text-xl font-['Dubai:Medium',_sans-serif] leading-none">{v}</p>
            <p className="text-[11.5px] text-muted-foreground mt-1.5">{l}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5 border-b border-border">
          <div>
            <h3 className="text-sm font-['Dubai:Medium',_sans-serif]">{meta.title} — Project List</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">Click any row to open the full record · drag cards between stages in Board view</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex gap-1">
              {STATUS_FILTERS.map(s => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={cn('px-2.5 py-1 rounded-md border text-[11px] font-medium transition-colors',
                    statusFilter === s ? 'bg-[#008755] border-[#008755] text-white' : 'border-border text-muted-foreground hover:border-[#008755] hover:text-[#008755]')}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="flex gap-0.5 bg-muted/60 rounded-lg p-0.5">
              <button onClick={() => setView('list')} className={cn('flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors', view === 'list' ? 'bg-white shadow-sm text-[#008755]' : 'text-muted-foreground')}>
                <List className="h-3 w-3" /> List
              </button>
              <button onClick={() => setView('board')} className={cn('flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors', view === 'board' ? 'bg-white shadow-sm text-[#008755]' : 'text-muted-foreground')}>
                <LayoutGrid className="h-3 w-3" /> Board
              </button>
            </div>
            <button onClick={exportCsv} className="px-2.5 py-1 rounded-md border border-border text-[11px] font-medium text-muted-foreground hover:border-[#008755] hover:text-[#008755] transition-colors">CSV</button>
          </div>
        </div>

        {view === 'list' ? (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[10px] uppercase tracking-wide text-muted-foreground bg-muted/30">
                <th className="px-4 py-2.5 font-semibold">Project</th>
                <th className="px-4 py-2.5 font-semibold">{meta.extraCol}</th>
                <th className="px-4 py-2.5 font-semibold">Status</th>
                <th className="px-4 py-2.5 font-semibold">Stage</th>
                <th className="px-4 py-2.5 font-semibold">Budget</th>
                <th className="px-4 py-2.5 font-semibold">Department</th>
                <th className="px-4 py-2.5 font-semibold">Score</th>
              </tr>
            </thead>
            <tbody>
              {list.map(p => (
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
                  <td className="px-4 py-3 text-xs">{p.cls === '—' ? <span className="text-muted-foreground">—</span> : <Badge className="bg-violet-50 text-violet-700 border-0 text-[10px]">{p.cls}</Badge>}</td>
                  <td className="px-4 py-3"><Badge className={`${STATUS_META[p.status].badgeClass} border-0 text-[10px]`}>{p.status}</Badge></td>
                  <td className="px-4 py-3 text-xs">{p.stage}</td>
                  <td className="px-4 py-3 text-xs font-['Dubai:Medium',_sans-serif]">{money(p.budget)}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{p.dept}</td>
                  <td className="px-4 py-3 text-xs">{p.score ? <span className="font-['Dubai:Medium',_sans-serif]">{p.score}</span> : <span className="text-muted-foreground">Pending</span>}</td>
                </tr>
              ))}
              {!list.length && (
                <tr><td colSpan={7} className="px-4 py-10 text-center text-xs text-muted-foreground">No projects found. Adjust the filter or clear the search.</td></tr>
              )}
            </tbody>
          </table>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 p-4">
            {STAGES.map(stage => {
              const items = all.filter(p => p.stage === stage);
              return (
                <div
                  key={stage}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(stage)}
                  className="bg-muted/40 rounded-xl p-2.5 min-h-[180px]"
                >
                  <div className="flex items-center justify-between px-1 pb-2.5">
                    <span className="text-[11px] font-['Dubai:Medium',_sans-serif]">{stage}</span>
                    <span className="text-[10px] bg-white rounded-full px-1.5 py-0.5 text-muted-foreground">{items.length}</span>
                  </div>
                  <div className="space-y-2">
                    {items.map(p => (
                      <div
                        key={p.id}
                        draggable
                        onDragStart={() => setDragId(p.id)}
                        onClick={() => store.openProject(p.id)}
                        className="bg-card border border-border rounded-lg p-2.5 cursor-grab active:cursor-grabbing hover:shadow-sm transition-shadow"
                      >
                        <p className="text-xs font-['Dubai:Medium',_sans-serif] leading-snug mb-2">{p.name}</p>
                        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                          <Badge className={`${STATUS_META[p.status].badgeClass} border-0 text-[9.5px]`}>{p.status}</Badge>
                          <span>{money(p.budget)}</span>
                        </div>
                      </div>
                    ))}
                    {!items.length && <p className="text-[10.5px] text-muted-foreground text-center py-4">Drop a project here</p>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
