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
import { useLanguage } from '../../../i18n/LanguageContext';
import { useSandboxTr } from '../sandboxI18n';
import heroDecoration from '../../../../assets/sandbox-hero-decoration.png';

interface PageProps {
  pageKey: 'rd' | 'innovation' | 'knowledge';
  store: SandboxStore;
  onNavigate: (page: SandboxPage) => void;
}

const KEY_TO_TYPE: Record<PageProps['pageKey'], ProjectType> = { rd: 'rd', innovation: 'innov', knowledge: 'know' };
const KEY_META: Record<PageProps['pageKey'], { icon: React.ElementType; title: string; titleAr: string; desc: string; descAr: string; extraCol: string; extraColAr: string }> = {
  rd: { icon: FlaskConical, title: 'Research & Development', titleAr: 'البحث والتطوير', desc: 'Scientific studies, pilots and experimental research managed by the Innovation Office.', descAr: 'دراسات علمية وتجارب وأبحاث تجريبية يديرها مكتب الابتكار.', extraCol: 'Classification', extraColAr: 'التصنيف' },
  innovation: { icon: Lightbulb, title: 'Innovation Projects', titleAr: 'مشاريع الابتكار', desc: 'Projects classified per the GIMI-accredited assessment and tracked through to sandbox pilot.', descAr: 'مشاريع مصنّفة وفق التقييم المعتمد من GIMI ومتابَعة حتى التجربة في البيئة التجريبية.', extraCol: 'GIMI Class', extraColAr: 'فئة GIMI' },
  knowledge: { icon: BookOpen, title: 'Knowledge Projects', titleAr: 'مشاريع المعرفة', desc: 'Institutional knowledge assets classified by tier, owned by the Knowledge Management function.', descAr: 'أصول معرفية مؤسسية مصنّفة حسب المستوى، تملكها وظيفة إدارة المعرفة.', extraCol: 'Classification', extraColAr: 'التصنيف' },
};

const STATUS_FILTERS: Array<'All' | ProjectStatus> = ['All', 'Ongoing', 'Completed', 'Delayed', 'Pending Approval'];

export function ProjectTypePage({ pageKey, store, onNavigate }: PageProps) {
  const { tr } = useLanguage();
  const ts = useSandboxTr();
  const fmtMoney = (v: number) => tr(money(v), `${v.toFixed(1)} مليون درهم`);
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
    (!search || p.name.toLowerCase().includes(search.toLowerCase()) || ts(p.name).includes(search))
  ), [all, statusFilter, search, ts]);

  const bud = all.reduce((s, p) => s + p.budget, 0);

  const handleDrop = (stage: Project['stage']) => {
    if (!dragId) return;
    const p = projects.find(x => x.id === dragId);
    if (!p || p.stage === stage) { setDragId(null); return; }
    const from = p.stage;
    store.setProjects(prev => prev.map(x => x.id === dragId ? { ...x, stage } : x));
    store.addAudit({ title: 'Stage changed', detail: `${p.name} moved from ${from} to ${stage}`, kind: 'info' });
    toast.success(tr(`${p.name} → ${stage}`, `${ts(p.name)} ← ${ts(stage)}`));
    setDragId(null);
  };

  const exportCsv = () => {
    toast.success(tr(`${list.length} project records exported to CSV`, `تم تصدير ${list.length} من سجلات المشاريع إلى CSV`));
    store.addAudit({ title: 'Data exported', detail: `${list.length} project records exported to CSV by Mohammed Hassan`, kind: 'warn' });
  };

  return (
    <div className="p-5 mx-auto space-y-5">
      <NewProjectDialog open={newOpen} onOpenChange={setNewOpen} store={store} defaultType={type} />

      <div className="rounded-2xl bg-gradient-to-br from-[#005844] via-[#008755] to-[#00a869] p-7 text-white relative overflow-hidden">
        <img src={heroDecoration} alt="" className="absolute -top-16 -end-16 h-160 w-160 rounded-full object-cover opacity-50 pointer-events-none select-none" />
        <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex gap-3.5">
            <div className="h-12 w-12 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center flex-shrink-0">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl   tracking-tight">{tr(meta.title, meta.titleAr)}</h1>
              <p className="text-white/80 text-sm mt-1 max-w-md">{tr(meta.desc, meta.descAr)}</p>
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button onClick={() => toast.success(tr('Export queued', 'تمت إضافة التصدير إلى قائمة الانتظار'))} className="inline-flex items-center gap-1.5 rounded-lg bg-white/15 border border-white/30 px-3.5 py-2 text-sm   hover:bg-white/25 transition-colors">
              <Download className="h-3.5 w-3.5" /> {tr('Export', 'تصدير')}
            </button>
            <button onClick={() => setNewOpen(true)} className="inline-flex items-center gap-1.5 rounded-lg bg-white text-[#005844] px-3.5 py-2 text-sm   hover:bg-white/90 transition-colors">
              <Plus className="h-3.5 w-3.5" /> {tr('New Project', 'مشروع جديد')}
            </button>
          </div>
        </div>
        <div className="relative z-10 flex flex-wrap gap-6 mt-6">
          {[[tr('Projects', 'المشاريع'), all.length], [tr('Budget', 'الميزانية'), fmtMoney(bud)], [tr('Ongoing', 'قيد التنفيذ'), all.filter(p => p.status === 'Ongoing').length], [tr('Reached Sandbox', 'وصلت إلى البيئة التجريبية'), all.filter(p => p.stage === 'Sandbox').length]].map(([l, v]) => (
            <div key={l as string} className="border-s-2 border-white/30 ps-3">
              <p className="text-lg   leading-none">{v}</p>
              <p className="text-xs uppercase tracking-wide text-white/75 mt-1 font-medium">{l}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          [tr('Total Projects', 'إجمالي المشاريع'), all.length],
          [tr('Allocated Budget', 'الميزانية المخصصة'), fmtMoney(bud)],
          [tr('Currently Ongoing', 'قيد التنفيذ حالياً'), all.filter(p => p.status === 'Ongoing').length],
          [tr('Reached Sandbox', 'وصلت إلى البيئة التجريبية'), all.filter(p => p.stage === 'Sandbox').length],
        ].map(([l, v]) => (
          <div key={l as string} className="bg-card border border-border rounded-xl p-4">
            <p className="text-xl   leading-none">{v}</p>
            <p className="text-[11.5px] text-muted-foreground mt-1.5">{l}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5 border-b border-border">
          <div>
            <h3 className="text-sm  ">{tr(meta.title, meta.titleAr)} — {tr('Project List', 'قائمة المشاريع')}</h3>
            <p className="text-sm text-muted-foreground mt-0.5">{tr('Click any row to open the full record · drag cards between stages in Board view', 'انقر على أي صف لفتح السجل الكامل · اسحب البطاقات بين المراحل في عرض اللوحة')}</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex gap-1">
              {STATUS_FILTERS.map(s => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={cn('px-2.5 py-1 rounded-md border text-sm font-medium transition-colors',
                    statusFilter === s ? 'bg-[#008755] border-[#008755] text-white' : 'border-border text-muted-foreground hover:border-[#008755] hover:text-[#008755]')}
                >
                  {s === 'All' ? tr('All', 'الكل') : ts(s)}
                </button>
              ))}
            </div>
            <div className="flex gap-0.5 bg-muted/60 rounded-lg p-0.5">
              <button onClick={() => setView('list')} className={cn('flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm font-medium transition-colors', view === 'list' ? 'bg-white shadow-sm text-[#008755]' : 'text-muted-foreground')}>
                <List className="h-3 w-3" /> {tr('List', 'قائمة')}
              </button>
              <button onClick={() => setView('board')} className={cn('flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm font-medium transition-colors', view === 'board' ? 'bg-white shadow-sm text-[#008755]' : 'text-muted-foreground')}>
                <LayoutGrid className="h-3 w-3" /> {tr('Board', 'لوحة')}
              </button>
            </div>
            <button onClick={exportCsv} className="px-2.5 py-1 rounded-md border border-border text-sm font-medium text-muted-foreground hover:border-[#008755] hover:text-[#008755] transition-colors">CSV</button>
          </div>
        </div>

        {view === 'list' ? (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-start text-sm uppercase tracking-wide text-muted-foreground bg-muted/30">
                <th className="px-4 py-2.5 font-semibold text-start">{tr('Project', 'المشروع')}</th>
                <th className="px-4 py-2.5 font-semibold text-start">{tr(meta.extraCol, meta.extraColAr)}</th>
                <th className="px-4 py-2.5 font-semibold text-start">{tr('Status', 'الحالة')}</th>
                <th className="px-4 py-2.5 font-semibold text-start">{tr('Stage', 'المرحلة')}</th>
                <th className="px-4 py-2.5 font-semibold text-start">{tr('Budget', 'الميزانية')}</th>
                <th className="px-4 py-2.5 font-semibold text-start">{tr('Department', 'الإدارة')}</th>
                <th className="px-4 py-2.5 font-semibold text-start">{tr('Score', 'الدرجة')}</th>
              </tr>
            </thead>
            <tbody>
              {list.map(p => (
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
                  <td className="px-4 py-3 text-sm">{p.cls === '—' ? <span className="text-muted-foreground">—</span> : <Badge className="bg-violet-50 text-violet-700 border-0 text-sm">{ts(p.cls)}</Badge>}</td>
                  <td className="px-4 py-3"><Badge className={`${STATUS_META[p.status].badgeClass} border-0 text-sm`}>{ts(p.status)}</Badge></td>
                  <td className="px-4 py-3 text-sm">{ts(p.stage)}</td>
                  <td className="px-4 py-3 text-sm  ">{fmtMoney(p.budget)}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{ts(p.dept)}</td>
                  <td className="px-4 py-3 text-sm">{p.score ? <span className=" ">{p.score}</span> : <span className="text-muted-foreground">{tr('Pending', 'معلّق')}</span>}</td>
                </tr>
              ))}
              {!list.length && (
                <tr><td colSpan={7} className="px-4 py-10 text-center text-sm text-muted-foreground">{tr('No projects found. Adjust the filter or clear the search.', 'لم يتم العثور على مشاريع. عدّل عامل التصفية أو امسح البحث.')}</td></tr>
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
                    <span className="text-sm  ">{ts(stage)}</span>
                    <span className="text-sm bg-white rounded-full px-1.5 py-0.5 text-muted-foreground">{items.length}</span>
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
                        <p className="text-sm   leading-snug mb-2">{ts(p.name)}</p>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <Badge className={`${STATUS_META[p.status].badgeClass} border-0 text-[9.5px]`}>{ts(p.status)}</Badge>
                          <span>{fmtMoney(p.budget)}</span>
                        </div>
                      </div>
                    ))}
                    {!items.length && <p className="text-sm text-muted-foreground text-center py-4">{tr('Drop a project here', 'أفلت مشروعاً هنا')}</p>}
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
