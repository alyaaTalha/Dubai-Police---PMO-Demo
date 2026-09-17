import { useEffect, useMemo, useState } from 'react';
import { CheckSquare } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '../../ui/badge';
import { Slider } from '../../ui/slider';
import { cn } from '../../ui/utils';
import { CRITERIA, TYPES, scoreVerdict } from '../sandboxData';
import type { SandboxStore } from '../SandboxStore';
import heroDecoration from '../../../../assets/sandbox-hero-decoration.png';

interface PageProps { store: SandboxStore; }

const EVALUATORS = ['Dr. Layla Ahmed', 'Eng. Sara Al Neyadi', 'Omar Al Zaabi', 'Mariam Al Suwaidi', 'Saeed Al Ketbi'];
const OFFSETS = [6, -4, 2, -8, 4];

export function EvaluationPage({ store }: PageProps) {
  const { projects, search } = store;
  const [selId, setSelId] = useState<string>(projects[0]?.id ?? '');
  const [scores, setScores] = useState<Record<string, number>>({});

  const filtered = useMemo(() => projects.filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase())), [projects, search]);
  const selected = projects.find(p => p.id === selId) ?? projects[0];

  const evaluated = projects.filter(p => p.score !== null);
  const pending = projects.filter(p => p.score === null);
  const avgScore = evaluated.length ? Math.round(evaluated.reduce((s, p) => s + (p.score as number), 0) / evaluated.length) : 0;

  useEffect(() => {
    if (!selected) return;
    const crit = CRITERIA[selected.type];
    const initial: Record<string, number> = {};
    crit.forEach(([label], i) => {
      initial[label] = selected.score !== null ? Math.max(35, Math.min(100, selected.score + OFFSETS[i])) : 60;
    });
    setScores(initial);
  }, [selId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!selected) return null;
  const criteria = CRITERIA[selected.type];
  const total = Math.round(criteria.reduce((s, [label, weight]) => s + ((scores[label] ?? 0) * weight) / 100, 0));
  const verdict = scoreVerdict(total);

  const save = () => {
    store.setProjects(prev => prev.map(p => p.id === selected.id ? { ...p, score: total, evaluator: p.evaluator ?? 'Mohammed Hassan' } : p));
    store.addAudit({ title: 'Evaluation submitted', detail: `${selected.name} scored ${total}/100 against ${TYPES[selected.type].full} criteria by ${selected.evaluator ?? 'Mohammed Hassan'}`, kind: 'info' });
    toast.success(`Evaluation saved — ${selected.name} scored ${total}/100`);
  };

  const assign = () => {
    const name = EVALUATORS[Math.floor(Math.random() * EVALUATORS.length)];
    store.setProjects(prev => prev.map(p => p.id === selected.id ? { ...p, evaluator: name } : p));
    store.addAudit({ title: 'Evaluator assigned', detail: `${selected.name} assigned to ${name} for assessment`, kind: 'violet' });
    toast.success(`Assigned to ${name}`);
  };

  return (
    <div className="p-5  mx-auto space-y-5">
      <div className="rounded-2xl bg-gradient-to-br from-[#005844] via-[#008755] to-[#00a869] p-7 text-white relative overflow-hidden">
        <img src={heroDecoration} alt="" className="absolute -top-16 -right-16 h-160 w-160 rounded-full object-cover opacity-50 pointer-events-none select-none" />
        <div className="relative z-10 flex gap-3.5">
          <div className="h-12 w-12 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center flex-shrink-0">
            <CheckSquare className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl   tracking-tight">Project Evaluation</h1>
            <p className="text-white/80 text-sm mt-1 max-w-md">Every project scored against criteria specific to its type — R&amp;D, Innovation or Knowledge.</p>
          </div>
        </div>
        <div className="relative z-10 flex flex-wrap gap-6 mt-6">
          {[['Evaluated', evaluated.length], ['Pending', pending.length], ['Average Score', `${avgScore}/100`]].map(([l, v]) => (
            <div key={l as string} className="border-l-2 border-white/30 pl-3">
              <p className="text-xl   leading-none">{v}</p>
              <p className="text-sm uppercase tracking-wide text-white/75 mt-1 font-medium">{l}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4 items-start">
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-4 py-3.5 border-b border-border">
            <h3 className="text-sm  ">Evaluation Register</h3>
            <p className="text-sm text-muted-foreground mt-0.5">Select a project to open its scoring sheet</p>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-sm uppercase tracking-wide text-muted-foreground bg-muted/30">
                <th className="px-4 py-2.5 font-semibold">Project</th>
                <th className="px-4 py-2.5 font-semibold">Type</th>
                <th className="px-4 py-2.5 font-semibold">Evaluator</th>
                <th className="px-4 py-2.5 font-semibold">Score</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} onClick={() => setSelId(p.id)} className={cn('border-b border-border last:border-0 cursor-pointer transition-colors', p.id === selId ? 'bg-[#008755]/5' : 'hover:bg-muted/30')}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      {/* <span className="h-7 w-7 rounded-lg flex-shrink-0" style={{ backgroundImage: `linear-gradient(135deg, ${TYPES[p.type].gradientFrom}, ${TYPES[p.type].gradientTo})` }} /> */}
                      <div className="min-w-0">
                        <p className="  truncate">{p.name}</p>
                        <p className="text-sm text-muted-foreground">{p.dept}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><Badge className={`${TYPES[p.type].badgeClass} border-0 text-sm`}>{TYPES[p.type].label}</Badge></td>
                  <td className="px-4 py-3 text-sm">{p.evaluator ?? <span className="text-amber-600 font-medium">Unassigned</span>}</td>
                  <td className="px-4 py-3 text-sm">{p.score ? <span className=" ">{p.score}</span> : <Badge className="bg-blue-50 text-blue-700 border-0 text-sm">Pending</Badge>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 lg:sticky lg:top-4">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm  ">Scoring Sheet</h3>
            <Badge className={`${TYPES[selected.type].badgeClass} border-0 text-sm`}>{TYPES[selected.type].label}</Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{TYPES[selected.type].full} criteria</p>
          <div className="flex items-center gap-2.5 pb-3.5 border-b border-border mb-4">
            {/* <span className="h-9 w-9 rounded-lg flex-shrink-0" style={{ backgroundImage: `linear-gradient(135deg, ${TYPES[selected.type].gradientFrom}, ${TYPES[selected.type].gradientTo})` }} /> */}
            <div className="min-w-0">
              <p className="text-sm  truncate">{selected.name}</p>
              <p className="text-sm text-muted-foreground">{selected.dept} · {selected.evaluator ?? 'No evaluator assigned'}</p>
            </div>
          </div>

          <div className="space-y-4">
            {criteria.map(([label, weight]) => (
              <div key={label}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="font-medium">
                    {label} <span className="text-sm text-muted-foreground bg-muted rounded-full px-1.5 py-0.5 ml-1">{weight}%</span>
                  </span>
                  <span className="  text-[#008755]">{scores[label] ?? 0}</span>
                </div>
                <Slider
                  value={[scores[label] ?? 0]}
                  onValueChange={([v]) => setScores(prev => ({ ...prev, [label]: v }))}
                  max={100}
                  step={1}
                  className="[&_[data-slot=slider-range]]:bg-[#008755] [&_[data-slot=slider-thumb]]:border-[#008755]"
                />
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-gradient-to-br from-[#005844] to-[#008755] text-white p-4 flex items-center justify-between my-4">
            <div>
              <p className="text-sm uppercase tracking-wide text-white/80 font-semibold">Weighted Total</p>
              <p className="text-2xl   leading-none mt-0.5">{total}</p>
            </div>
            <span className="text-sm font-bold px-2.5 py-1 rounded-full bg-white/20">{verdict}</span>
          </div>

          <div className="flex gap-2">
            <button onClick={save} className="flex-1 rounded-lg bg-[#008755] hover:bg-[#005844] text-white text-sm   py-2.5 transition-colors">
              Save Evaluation
            </button>
            <button onClick={assign} className="rounded-lg border border-border text-sm   px-4 py-2.5 hover:bg-muted/40 transition-colors">
              Assign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
