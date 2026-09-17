import { useState } from 'react';
import {
  ArrowLeft, Info, Download, Sparkles, ChevronUp, ChevronDown, Check, Circle,
  Shield, Users, Calendar, Wallet, Layers, TrendingUp, TrendingDown, Lightbulb,
  CheckCircle2, FileText, Building2, ClipboardCheck, Target,
} from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { cn } from '../../ui/utils';
import {
  CRITERIA, STAGES, STATUS_META, TYPES, money, IP_REGISTER, PARTNERS,
  type Project,
} from '../sandboxData';
import type { SandboxPage, SandboxStore } from '../SandboxStore';

interface PageProps {
  project: Project;
  store: SandboxStore;
  onBack: () => void;
  onNavigate: (page: SandboxPage) => void;
}

type DetailTab = 'overview' | 'timeline' | 'evaluation' | 'partners' | 'ip';

const TABS: Array<{ key: DetailTab; label: string; icon: React.ElementType }> = [
  { key: 'overview', label: 'Overview', icon: CheckCircle2 },
  { key: 'timeline', label: 'Stage Timeline', icon: Layers },
  { key: 'evaluation', label: 'Evaluation', icon: ClipboardCheck },
  { key: 'partners', label: 'Partners', icon: Users },
  { key: 'ip', label: 'Intellectual Property', icon: Shield },
];

const CRITERIA_OFFSETS = [6, -4, 2, -8, 4];

// This page always uses the platform's primary green as its accent —
// regardless of project type — rather than the type's own color (which
// would render R&D's blue, #1d5fa8, here).
const ACCENT = '#008755';
const ACCENT_GRADIENT_FROM = '#00a869';
const ACCENT_GRADIENT_TO = '#005844';

export function SandboxProjectDetailsPage({ project, store, onBack, onNavigate }: PageProps) {
  const [infoExpanded, setInfoExpanded] = useState(true);
  const [healthExpanded, setHealthExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState<DetailTab>('overview');

  const t = TYPES[project.type];
  const stageIndex = STAGES.indexOf(project.stage);
  const progress = Math.round(((stageIndex + 1) / STAGES.length) * 100);

  const forecast = project.status === 'Delayed'
    ? { label: 'Delayed — Reassess Timeline', color: '#bd3826', icon: TrendingDown, detail: `${stageIndex + 1} of ${STAGES.length} stages complete` }
    : project.stage === 'Sandbox' || project.status === 'Completed'
    ? { label: 'On Track — Sandbox Reached', color: '#008755', icon: TrendingUp, detail: 'Final stage of the pipeline' }
    : { label: 'On Track — In Progress', color: '#008755', icon: TrendingUp, detail: `${stageIndex + 1} of ${STAGES.length} stages complete` };

  const contribution = project.score === null
    ? { label: 'Pending Evaluation', color: '#a8710d', detail: 'Not yet scored' }
    : project.score >= 85
    ? { label: 'High Impact', color: '#008755', detail: `Scored ${project.score}/100` }
    : project.score >= 70
    ? { label: 'Solid Contribution', color: '#008755', detail: `Scored ${project.score}/100` }
    : { label: 'Needs Improvement', color: '#a8710d', detail: `Scored ${project.score}/100` };

  const recommendation = !project.evaluator
    ? 'Assign an Evaluator'
    : project.status === 'Pending Approval'
    ? 'Progress to Approval Review'
    : project.status === 'Delayed'
    ? 'Reallocate Resources'
    : 'Continue Current Plan';

  const linkedIp = project.ip.map(name => IP_REGISTER.find(x => x.title === name)).filter(Boolean) as typeof IP_REGISTER;
  const linkedPartners = project.partners.map(name => PARTNERS.find(p => p.name === name)).filter(Boolean) as typeof PARTNERS;

  return (
    <div className="p-5 mx-auto space-y-4">
      {/* Banner */}
      <div className="rounded-2xl text-white shadow-lg relative overflow-hidden p-5" style={{ backgroundImage: `linear-gradient(115deg, ${ACCENT_GRADIENT_TO}, ${ACCENT_GRADIENT_FROM})` }}>
        <div className="absolute -top-10 -right-10 h-56 w-56 rounded-full bg-white/[0.06] pointer-events-none" />
        <div className="relative z-10 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="h-9 w-9 rounded-lg hover:bg-white/15 flex items-center justify-center transition-colors flex-shrink-0">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="h-6 w-px bg-white/30" />
            <div>
              <h1 className="text-xl font-['Dubai:Medium',_sans-serif] leading-tight">{project.name}</h1>
              <p className="text-white/85 text-xs mt-1">{project.id} · {project.dept}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setInfoExpanded(v => !v)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/40 px-3.5 py-2 text-xs font-['Dubai:Medium',_sans-serif] hover:bg-white/15 transition-colors"
            >
              <Info className="h-3.5 w-3.5" /> Project Info
            </button>
            <button
              onClick={() => {
                toast.success('Project report exported');
                store.addAudit({ title: 'Project report exported', detail: `${project.name} exported by Mohammed Hassan`, kind: 'warn' });
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/40 px-3.5 py-2 text-xs font-['Dubai:Medium',_sans-serif] hover:bg-white/15 transition-colors"
            >
              <Download className="h-3.5 w-3.5" /> Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Project Info strip */}
      {infoExpanded && (
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-4">
            <Field label="Status"><Badge className={`${STATUS_META[project.status].badgeClass} border-0 w-fit`}>{project.status}</Badge></Field>
            <Field label="Type"><Badge className={`${t.badgeClass} border-0 w-fit`}>{t.label}</Badge></Field>
            <Field label="Classification">{project.cls === '—' ? <span className="text-sm text-muted-foreground">—</span> : <Badge className="bg-violet-50 text-violet-700 border-0 w-fit">{project.cls}</Badge>}</Field>
            <Field label="Department"><p className="text-sm font-medium">{project.dept}</p></Field>
            <Field label="Budget"><p className="text-sm font-['Dubai:Medium',_sans-serif]">{money(project.budget)}</p></Field>
            <Field label="Timeline"><p className="text-sm font-medium">{project.start} – {project.end}</p></Field>
            <Field label="Stage"><p className="text-sm font-medium">{project.stage}</p></Field>
            <Field label="Stage Progress">
              <div className="flex items-center gap-2">
                <Progress value={progress} className="h-2 flex-1 max-w-[90px]" indicatorColor={ACCENT} />
                <span className="text-sm font-medium whitespace-nowrap">{progress}%</span>
              </div>
            </Field>
            <Field label="Evaluator"><p className="text-sm font-medium">{project.evaluator ?? <span className="text-amber-600">Unassigned</span>}</p></Field>
            <Field label="Evaluation Score"><p className="text-sm font-['Dubai:Medium',_sans-serif]">{project.score ? `${project.score}/100` : '—'}</p></Field>
          </div>
        </div>
      )}

      {/* AI-style intelligence summary */}
      <div className="bg-gradient-to-r from-[#008755]/5 to-white border border-[#008755]/30 rounded-xl p-4">
        <div className="flex items-center justify-between cursor-pointer" onClick={() => setHealthExpanded(v => !v)}>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#008755]" />
            <h3 className="text-sm font-['Dubai:Medium',_sans-serif]">Project Intelligence Summary</h3>
            <Badge className="bg-[#008755]/10 text-[#008755] border-0 text-[10px]">INTELLIGENCE LAYER</Badge>
          </div>
          {healthExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
        </div>

        {healthExpanded && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            <InsightTile icon={forecast.icon} color={forecast.color} label="Stage Forecast" value={forecast.label} detail={forecast.detail} />
            <InsightTile icon={Target} color={contribution.color} label="Strategic Contribution" value={contribution.label} detail={contribution.detail} />
            <InsightTile icon={Lightbulb} color="#a8710d" label="Recommended Action" value={recommendation} detail="Based on current status" />
          </div>
        )}
      </div>

      {/* Tab bar */}
      <div className="bg-card border border-border rounded-xl px-2">
        <div className="flex items-center gap-1 overflow-x-auto">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  'flex items-center gap-2 px-4 py-3 border-b-2 text-xs font-medium whitespace-nowrap transition-colors',
                  active ? "border-[#008755] text-[#008755] font-['Dubai:Medium',_sans-serif] bg-[#008755]/5" : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/40',
                )}
              >
                <Icon className="h-3.5 w-3.5" /> {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      <div className="bg-card border border-border rounded-xl p-5 min-h-[380px]">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">
            <div className="space-y-4">
              <div className="flex items-center gap-6 flex-wrap bg-muted/30 rounded-xl p-4">
                <div className="relative h-28 w-28 flex-shrink-0">
                  <svg viewBox="0 0 100 100" className="-rotate-90 h-full w-full">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke={ACCENT} strokeWidth="10" strokeLinecap="round" strokeDasharray={`${progress * 2.513} 251.3`} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-['Dubai:Medium',_sans-serif]">{progress}%</span>
                    <span className="text-[10px] text-muted-foreground">Complete</span>
                  </div>
                </div>
                <div className="flex-1 min-w-[220px]">
                  <h3 className="text-sm font-['Dubai:Medium',_sans-serif] mb-1">Stage progress — {project.stage}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{project.desc}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <StatTile icon={Wallet} label="Budget" value={money(project.budget)} />
                <StatTile icon={Calendar} label="Timeline" value={`${project.start} – ${project.end}`} />
                <StatTile icon={Building2} label="Department" value={project.dept} />
              </div>
            </div>

            <div className="bg-muted/30 rounded-xl p-4 space-y-3.5 h-fit">
              <h3 className="text-sm font-['Dubai:Medium',_sans-serif] border-b border-border pb-2.5">Project Details</h3>
              <DetailRow icon={FileText} label="Evaluator" value={project.evaluator ?? 'Unassigned'} />
              <DetailRow icon={ClipboardCheck} label="Evaluation Score" value={project.score ? `${project.score}/100` : 'Pending'} />
              <DetailRow icon={Users} label="Linked Partners" value={String(linkedPartners.length)} />
              <DetailRow icon={Shield} label="Linked IP Assets" value={String(linkedIp.length)} />
              <DetailRow icon={Layers} label="Classification" value={project.cls === '—' ? 'Not classified' : project.cls} />
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="max-w-lg">
            <h3 className="text-sm font-['Dubai:Medium',_sans-serif] mb-4">Stage Timeline</h3>
            <div className="space-y-4">
              {STAGES.map((s, i) => (
                <div key={s} className="flex items-center gap-3">
                  {i < stageIndex ? (
                    <Check className="h-4 w-4 text-[#008755] flex-shrink-0" />
                  ) : i === stageIndex ? (
                    <Circle className="h-4 w-4 text-[#008755] fill-[#008755]/20 flex-shrink-0" />
                  ) : (
                    <Circle className="h-4 w-4 text-border flex-shrink-0" />
                  )}
                  <div>
                    <p className="text-sm font-['Dubai:Medium',_sans-serif]">{s}</p>
                    <p className="text-xs text-muted-foreground">{i < stageIndex ? 'Completed' : i === stageIndex ? 'In progress' : 'Not started'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'evaluation' && (
          project.score !== null ? (
            <div className="max-w-lg">
              <h3 className="text-sm font-['Dubai:Medium',_sans-serif]">Evaluation Breakdown</h3>
              <p className="text-xs text-muted-foreground mb-4">Scored against {t.full} criteria · Evaluated by {project.evaluator}</p>
              <div className="space-y-3">
                {CRITERIA[project.type].map(([label], i) => {
                  const v = Math.max(35, Math.min(100, (project.score as number) + CRITERIA_OFFSETS[i]));
                  return (
                    <div key={label} className="flex items-center gap-3 text-xs">
                      <span className="w-40 flex-shrink-0 text-foreground/80 truncate">{label}</span>
                      <Progress value={v} className="flex-1 h-2" indicatorColor={ACCENT} />
                      <span className="w-8 text-right font-['Dubai:Medium',_sans-serif]">{v}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <EmptyState
              icon={ClipboardCheck}
              text="This project has not been evaluated yet."
              actionLabel="Open Evaluation Register"
              onAction={() => onNavigate('evaluation')}
            />
          )
        )}

        {activeTab === 'partners' && (
          linkedPartners.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
              {linkedPartners.map(p => (
                <div key={p.name} className="flex items-center gap-3 border border-border rounded-lg p-3">
                  <span
                    className="h-9 w-9 rounded-lg flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold"
                    style={{ backgroundImage: `linear-gradient(135deg, ${p.gradientFrom}, ${p.gradientTo})` }}
                  >
                    {p.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-['Dubai:Medium',_sans-serif] truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.type} · {p.country}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState icon={Users} text="No partners linked to this project." actionLabel="Browse Partners" onAction={() => onNavigate('partners')} />
          )
        )}

        {activeTab === 'ip' && (
          linkedIp.length ? (
            <div className="space-y-2.5 max-w-2xl">
              {linkedIp.map(item => (
                <div key={item.title} className="flex items-center gap-3 border border-border rounded-lg p-3">
                  <div className="h-9 w-9 rounded-lg bg-[#008755]/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-4 w-4 text-[#008755]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-['Dubai:Medium',_sans-serif] truncate">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.kind} · Filed {item.filed}</p>
                  </div>
                  <Badge className={cn('border-0 text-[10px]', item.status === 'Granted' ? 'bg-[#008755]/10 text-[#008755]' : 'bg-blue-50 text-blue-700')}>{item.status}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState icon={Shield} text="No IP has been filed from this project yet." actionLabel="View IP Register" onAction={() => onNavigate('ip')} />
          )
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 min-w-0">
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium">{label}</p>
      {children}
    </div>
  );
}

function InsightTile({ icon: Icon, color, label, value, detail }: { icon: React.ElementType; color: string; label: string; value: string; detail: string }) {
  return (
    <div className="bg-white rounded-lg p-3 border" style={{ borderColor: `${color}4d` }}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-3.5 w-3.5" style={{ color }} />
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
      <p className="text-sm font-['Dubai:Medium',_sans-serif] mb-0.5" style={{ color }}>{value}</p>
      <p className="text-xs text-muted-foreground">{detail}</p>
    </div>
  );
}

function StatTile({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="bg-card border border-border rounded-lg p-3">
      <Icon className="h-3.5 w-3.5 text-[#008755] mb-1.5" />
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium">{label}</p>
      <p className="text-sm font-['Dubai:Medium',_sans-serif] mt-0.5 truncate">{value}</p>
    </div>
  );
}

function DetailRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="h-3.5 w-3.5 text-[#008755] mt-0.5 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-muted-foreground">{label}</p>
        <p className="text-sm font-['Dubai:Medium',_sans-serif] truncate">{value}</p>
      </div>
    </div>
  );
}

function EmptyState({ icon: Icon, text, actionLabel, onAction }: { icon: React.ElementType; text: string; actionLabel: string; onAction: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14">
      <div className="h-12 w-12 rounded-xl bg-[#008755]/10 flex items-center justify-center mb-3">
        <Icon className="h-5 w-5 text-[#008755]" />
      </div>
      <p className="text-sm text-muted-foreground mb-4 max-w-xs">{text}</p>
      <button onClick={onAction} className="rounded-lg bg-[#008755] hover:bg-[#005844] text-white text-xs font-['Dubai:Medium',_sans-serif] px-4 py-2.5 transition-colors">
        {actionLabel}
      </button>
    </div>
  );
}
