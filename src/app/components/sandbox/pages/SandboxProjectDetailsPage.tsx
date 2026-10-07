import { useState } from 'react';
import {
  ArrowLeft, Info, Download, Sparkles, ChevronUp, ChevronDown, ChevronRight,
  Shield, Users, Calendar, Wallet, Layers, TrendingUp, TrendingDown, Lightbulb,
  CheckCircle2, FileText, Building2, ClipboardCheck, Target, ListTodo, AlertTriangle,
  Trophy, BarChart3, RefreshCw, FolderCheck, MessageSquare, Handshake, Plus, Edit,
  Trash2, Eye, GripVertical, Link2, X, IdCard,
} from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Button } from '../../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { cn } from '../../ui/utils';
import {
  CRITERIA, STAGES, STATUS_META, TYPES, money, IP_REGISTER, PARTNERS,
  type Project,
} from '../sandboxData';
import type { SandboxPage, SandboxStore } from '../SandboxStore';
import heroDecoration from '../../../../assets/sandbox-hero-decoration.png';
import { KanbanView, GanttView } from '../../portfolio/MilestoneViews';
import {
  RiskRegisterTab, StakeholdersTab, GoalsBenefitsTab, ProjectClosureTab, CollaborationTab,
} from '../../portfolio/ProjectTabsContent';
import { KPIsTab } from '../../portfolio/KPIsTab';
import { BiWeeklyStatusTab } from '../../portfolio/BiWeeklyStatusTab';
import { AddTaskPanel } from '../../portfolio/AddTaskPanel';
import { AddMilestonePanel } from '../../portfolio/AddMilestonePanel';
import { ProjectCardTab } from './ProjectCardTab';

interface PageProps {
  project: Project;
  store: SandboxStore;
  onBack: () => void;
  onNavigate: (page: SandboxPage) => void;
}

type DetailTab =
  | 'overview' | 'card' | 'biweekly' | 'milestones' | 'risk' | 'stakeholders' | 'goals'
  | 'evaluation' | 'kpis' | 'partners' | 'ip' | 'change-management' | 'closure' | 'documents';

const TABS: Array<{ key: DetailTab; label: string; icon: React.ElementType }> = [
  { key: 'overview', label: 'Overview', icon: CheckCircle2 },
  { key: 'card', label: 'Project Card', icon: IdCard },
  { key: 'biweekly', label: 'Bi-Weekly Status', icon: Calendar },
  { key: 'milestones', label: 'Milestones & Tasks', icon: ListTodo },
  { key: 'risk', label: 'Risk Register', icon: AlertTriangle },
  { key: 'stakeholders', label: 'Stakeholders', icon: Users },
  { key: 'goals', label: 'Goals & Benefits', icon: Trophy },
  // { key: 'evaluation', label: 'Evaluation', icon: ClipboardCheck },
  { key: 'kpis', label: 'KPIs', icon: BarChart3 },
  // { key: 'partners', label: 'Partners', icon: Handshake },
  // { key: 'ip', label: 'Intellectual Property', icon: Shield },
  { key: 'change-management', label: 'Change Management', icon: RefreshCw },
  { key: 'closure', label: 'Project Closure', icon: FolderCheck },
  { key: 'documents', label: 'Documents', icon: MessageSquare },
];

const CRITERIA_OFFSETS = [6, -4, 2, -8, 4];

// This page always uses the platform's primary green as its accent —
// regardless of project type — rather than the type's own color (which
// would render R&D's blue, #1d5fa8, here).
const ACCENT = '#008755';
const ACCENT_GRADIENT_FROM = '#00a869';
const ACCENT_GRADIENT_TO = '#005844';

// ── Dummy milestone / task data — shared placeholder timeline for every
// project record, mirroring the portfolio ProjectDetailsPage pattern. ──────
interface SubTask {
  id: string; name: string; owner: string; priority: string; progress: number;
  status: string; timeline: string; dependencies: string; isOverdue: boolean;
}
interface TaskItem extends SubTask { subtasks?: SubTask[] }
interface MilestoneItem {
  id: string; name: string; status: string; completion: number; dueDate: string; tasks: TaskItem[];
}

const MOCK_MILESTONES: MilestoneItem[] = [
  {
    id: 'M1', name: 'Idea & Feasibility', status: 'Complete', completion: 100, dueDate: 'Feb 10, 2026',
    tasks: [
      {
        id: 'T1', name: 'Landscape & Literature Review', owner: 'Dr. Layla Ahmed', priority: 'High', progress: 100,
        status: 'Complete', timeline: 'Jan 05 - Jan 18', dependencies: 'None', isOverdue: false,
        subtasks: [
          { id: 'T1.1', name: 'Prior art & patent scan', owner: 'Dr. Layla Ahmed', priority: 'Medium', progress: 100, status: 'Complete', timeline: 'Jan 05 - Jan 09', dependencies: 'None', isOverdue: false },
          { id: 'T1.2', name: 'Stakeholder needs interviews', owner: 'Dr. Layla Ahmed', priority: 'High', progress: 100, status: 'Complete', timeline: 'Jan 10 - Jan 15', dependencies: 'T1.1', isOverdue: false },
          { id: 'T1.3', name: 'Feasibility findings memo', owner: 'Dr. Layla Ahmed', priority: 'Medium', progress: 100, status: 'Complete', timeline: 'Jan 16 - Jan 18', dependencies: 'T1.2', isOverdue: false },
        ],
      },
      { id: 'T2', name: 'Feasibility Report', owner: 'Eng. Sara Al Neyadi', priority: 'Critical', progress: 100, status: 'Complete', timeline: 'Jan 19 - Jan 28', dependencies: 'T1', isOverdue: false },
      { id: 'T3', name: 'Feasibility Sign-off', owner: 'Mohammed Hassan', priority: 'High', progress: 100, status: 'Complete', timeline: 'Jan 29 - Feb 10', dependencies: 'T2', isOverdue: false },
    ],
  },
  {
    id: 'M2', name: 'Approval & Solution Design', status: 'In Progress', completion: 70, dueDate: 'Apr 20, 2026',
    tasks: [
      { id: 'T4', name: 'Solution Architecture', owner: 'Ahmed Khalil', priority: 'Critical', progress: 100, status: 'Complete', timeline: 'Feb 11 - Feb 24', dependencies: 'M1', isOverdue: false },
      {
        id: 'T5', name: 'Data & Integration Design', owner: 'Ahmed Khalil', priority: 'High', progress: 80,
        status: 'In Progress', timeline: 'Feb 25 - Mar 15', dependencies: 'T4', isOverdue: false,
        subtasks: [
          { id: 'T5.1', name: 'Partner data-sharing model', owner: 'Ahmed Khalil', priority: 'High', progress: 100, status: 'Complete', timeline: 'Feb 25 - Mar 02', dependencies: 'None', isOverdue: false },
          { id: 'T5.2', name: 'Sandbox environment spec', owner: 'Ahmed Khalil', priority: 'High', progress: 85, status: 'In Progress', timeline: 'Mar 03 - Mar 10', dependencies: 'T5.1', isOverdue: false },
          { id: 'T5.3', name: 'Security & privacy review', owner: 'Ahmed Khalil', priority: 'Medium', progress: 55, status: 'In Progress', timeline: 'Mar 11 - Mar 15', dependencies: 'T5.2', isOverdue: false },
        ],
      },
      { id: 'T6', name: 'Governance Briefing Deck', owner: 'Layla Mohammed', priority: 'Medium', progress: 90, status: 'In Progress', timeline: 'Feb 25 - Mar 20', dependencies: 'T4', isOverdue: false },
      { id: 'T7', name: 'Approval Board Review', owner: 'Sarah Ahmed', priority: 'High', progress: 20, status: 'Not Started', timeline: 'Mar 21 - Apr 20', dependencies: 'T5, T6', isOverdue: false },
    ],
  },
  {
    id: 'M3', name: 'Development & Sandbox Pilot', status: 'At Risk', completion: 40, dueDate: 'Aug 30, 2026',
    tasks: [
      {
        id: 'T8', name: 'Core Build', owner: 'Omar Ali', priority: 'Critical', progress: 55,
        status: 'In Progress', timeline: 'Apr 21 - Jun 30', dependencies: 'M2', isOverdue: false,
        subtasks: [
          { id: 'T8.1', name: 'Environment setup', owner: 'Omar Ali', priority: 'Critical', progress: 100, status: 'Complete', timeline: 'Apr 21 - Apr 25', dependencies: 'None', isOverdue: false },
          { id: 'T8.2', name: 'Core module development', owner: 'Omar Ali', priority: 'Critical', progress: 70, status: 'In Progress', timeline: 'Apr 26 - Jun 05', dependencies: 'T8.1', isOverdue: false },
          { id: 'T8.3', name: 'Unit & integration tests', owner: 'Omar Ali', priority: 'High', progress: 25, status: 'In Progress', timeline: 'Jun 06 - Jun 30', dependencies: 'T8.2', isOverdue: false },
        ],
      },
      {
        id: 'T9', name: 'Sandbox Integration', owner: 'Noor Hassan', priority: 'Critical', progress: 45,
        status: 'At Risk', timeline: 'May 15 - Jul 25', dependencies: 'T8', isOverdue: true,
        subtasks: [
          { id: 'T9.1', name: 'Sandbox environment provisioning', owner: 'Noor Hassan', priority: 'High', progress: 100, status: 'Complete', timeline: 'May 15 - May 22', dependencies: 'None', isOverdue: false },
          { id: 'T9.2', name: 'Live data pilot', owner: 'Noor Hassan', priority: 'Critical', progress: 60, status: 'In Progress', timeline: 'May 23 - Jun 30', dependencies: 'T9.1', isOverdue: false },
          { id: 'T9.3', name: 'Partner acceptance review', owner: 'Noor Hassan', priority: 'High', progress: 20, status: 'At Risk', timeline: 'Jul 01 - Jul 25', dependencies: 'T9.2', isOverdue: true },
        ],
      },
      { id: 'T10', name: 'Partner Data Exchange Setup', owner: 'Youssef Ahmed', priority: 'High', progress: 20, status: 'Blocked', timeline: 'Jun 01 - Jul 10', dependencies: 'T8', isOverdue: false },
      { id: 'T11', name: 'Acceptance & Readiness Testing', owner: 'Maryam Khalil', priority: 'Medium', progress: 10, status: 'Not Started', timeline: 'Jul 26 - Aug 30', dependencies: 'T9, T10', isOverdue: false },
    ],
  },
];

const MOCK_CHANGE_RECORDS = [
  { id: 'CM-001', rationale: 'Partner feedback from feasibility review', description: 'Extend data-sharing scope to include real-time telemetry from partner systems', status: 'Completed', completedOn: '2026-03-05', actionTaken: 'Updated integration design and partner MOU; security review completed.' },
  { id: 'CM-002', rationale: 'Evaluation committee recommendation', description: 'Add a dedicated privacy-impact assessment step before sandbox rollout', status: 'In Progress', completedOn: '', actionTaken: 'Privacy assessment template drafted; scheduling review with Legal Affairs.' },
  { id: 'CM-003', rationale: 'Budget re-forecast', description: 'Reallocate AED 0.3M from documentation to additional sandbox compute capacity', status: 'Pending Approval', completedOn: '', actionTaken: 'Budget variance submitted to Finance for sign-off.' },
  { id: 'CM-004', rationale: 'Sandbox pilot scope change', description: 'Reduce pilot precincts from three to two to de-risk the initial rollout', status: 'Completed', completedOn: '2026-05-12', actionTaken: 'Updated rollout plan and stakeholder communications distributed.' },
];

function getPriorityColor(priority: string) {
  switch (priority) {
    case 'Critical': return '#D83731';
    case 'High': return '#FF9800';
    case 'Medium': return '#F2A200';
    case 'Low': return '#357743';
    default: return '#6b7280';
  }
}
function getTaskStatusColor(status: string) {
  switch (status) {
    case 'Complete': return '#357743';
    case 'In Progress': return '#008755';
    case 'At Risk': return '#F2A200';
    case 'Blocked': return '#D83731';
    case 'Not Started': return '#6b7280';
    default: return '#6b7280';
  }
}

export function SandboxProjectDetailsPage({ project, store, onBack, onNavigate }: PageProps) {
  const [infoExpanded, setInfoExpanded] = useState(true);
  const [healthExpanded, setHealthExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState<DetailTab>('overview');

  // Milestones & Tasks tab state
  const [milestoneView, setMilestoneView] = useState<'Tasks' | 'Kanban' | 'Gantt' | 'Deliverables'>('Tasks');
  const [ownerFilter, setOwnerFilter] = useState('all');
  const [expandedMilestones, setExpandedMilestones] = useState<string[]>(['M1', 'M2']);
  const [expandedTasks, setExpandedTasks] = useState<string[]>([]);
  const [showAddTaskPanel, setShowAddTaskPanel] = useState(false);
  const [showAddMilestonePanel, setShowAddMilestonePanel] = useState(false);
  const [selectedMilestoneForTask, setSelectedMilestoneForTask] = useState('');

  // Change Management tab state
  const [showAddChangePanel, setShowAddChangePanel] = useState(false);
  const [impactAssessments, setImpactAssessments] = useState([{ id: '1', impactType: '', details: '', preChange: '', postChange: '' }]);

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

  const uniqueOwners = Array.from(new Set(
    MOCK_MILESTONES.flatMap(m => m.tasks.flatMap(task => [task.owner, ...(task.subtasks?.map(s => s.owner) ?? [])])),
  )).sort();

  const filteredMilestones = ownerFilter === 'all'
    ? MOCK_MILESTONES
    : MOCK_MILESTONES.map(m => ({
        ...m,
        tasks: m.tasks
          .filter(task => task.owner === ownerFilter || task.subtasks?.some(s => s.owner === ownerFilter))
          .map(task => ({ ...task, subtasks: task.subtasks?.filter(s => s.owner === ownerFilter) })),
      })).filter(m => m.tasks.length > 0);

  const toggleMilestone = (id: string) => setExpandedMilestones(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);
  const toggleTask = (id: string) => setExpandedTasks(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  return (
    <div className="p-5 mx-auto space-y-4">
      {/* Banner */}
      <div className="rounded-2xl text-white shadow-lg relative overflow-hidden p-5" style={{ backgroundImage: `linear-gradient(115deg, ${ACCENT_GRADIENT_TO}, ${ACCENT_GRADIENT_FROM})` }}>
        <img src={heroDecoration} alt="" className="absolute -top-16 -right-16 h-140 w-140 rounded-full object-cover opacity-50 pointer-events-none select-none" />
        <div className="relative z-10 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="h-9 w-9 rounded-lg hover:bg-white/15 flex items-center justify-center transition-colors flex-shrink-0">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="h-6 w-px bg-white/30" />
            <div>
              <h1 className="text-xl   leading-tight">{project.name}</h1>
              <p className="text-white/85 text-sm mt-1">{project.id} · {project.dept}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setInfoExpanded(v => !v)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/40 px-3.5 py-2 text-sm   hover:bg-white/15 transition-colors"
            >
              <Info className="h-3.5 w-3.5" /> Project Info
            </button>
            <button
              onClick={() => {
                toast.success('Project report exported');
                store.addAudit({ title: 'Project report exported', detail: `${project.name} exported by Mohammed Hassan`, kind: 'warn' });
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/40 px-3.5 py-2 text-sm   hover:bg-white/15 transition-colors"
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
            <Field label="Budget"><p className="text-sm  ">{money(project.budget)}</p></Field>
            <Field label="Timeline"><p className="text-sm font-medium">{project.start} – {project.end}</p></Field>
            <Field label="Stage"><p className="text-sm font-medium">{project.stage}</p></Field>
            <Field label="Stage Progress">
              <div className="flex items-center gap-2">
                <Progress value={progress} className="h-2 flex-1 max-w-[90px]" indicatorColor={ACCENT} />
                <span className="text-sm font-medium whitespace-nowrap">{progress}%</span>
              </div>
            </Field>
            <Field label="Evaluator"><p className="text-sm font-medium">{project.evaluator ?? <span className="text-amber-600">Unassigned</span>}</p></Field>
            <Field label="Evaluation Score"><p className="text-sm  ">{project.score ? `${project.score}/100` : '—'}</p></Field>
          </div>
        </div>
      )}

      {/* AI-style intelligence summary */}
      <div className="bg-gradient-to-r from-[#008755]/5 to-white border border-[#008755]/30 rounded-xl p-4">
        <div className="flex items-center justify-between cursor-pointer" onClick={() => setHealthExpanded(v => !v)}>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#008755]" />
            <h3 className="text-sm  ">Project Intelligence Summary</h3>
            <Badge className="bg-[#008755]/10 text-[#008755] border-0 text-sm">INTELLIGENCE LAYER</Badge>
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
                  'flex items-center gap-2 px-4 py-3 border-b-2 text-sm font-medium whitespace-nowrap transition-colors',
                  active ? "border-[#008755] text-[#008755]   bg-[#008755]/5" : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/40',
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
                    <span className="text-xl  ">{progress}%</span>
                    <span className="text-sm text-muted-foreground">Complete</span>
                  </div>
                </div>
                <div className="flex-1 min-w-[220px]">
                  <h3 className="text-sm   mb-1">Stage progress — {project.stage}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.desc}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <StatTile icon={Wallet} label="Budget" value={money(project.budget)} />
                <StatTile icon={Calendar} label="Timeline" value={`${project.start} – ${project.end}`} />
                <StatTile icon={Building2} label="Department" value={project.dept} />
              </div>
            </div>

            <div className="bg-muted/30 rounded-xl p-4 space-y-3.5 h-fit">
              <h3 className="text-sm   border-b border-border pb-2.5">Project Details</h3>
              <DetailRow icon={FileText} label="Evaluator" value={project.evaluator ?? 'Unassigned'} />
              <DetailRow icon={ClipboardCheck} label="Evaluation Score" value={project.score ? `${project.score}/100` : 'Pending'} />
              <DetailRow icon={Users} label="Linked Partners" value={String(linkedPartners.length)} />
              <DetailRow icon={Shield} label="Linked IP Assets" value={String(linkedIp.length)} />
              <DetailRow icon={Layers} label="Classification" value={project.cls === '—' ? 'Not classified' : project.cls} />
            </div>
          </div>
        )}

        {activeTab === 'card' && (
          <ProjectCardTab
            project={project}
            cardNumber={store.projects.findIndex(p => p.id === project.id) + 1}
            onExport={() => {
              toast.success('Project card exported');
              store.addAudit({ title: 'Project card exported', detail: `${project.name} card exported by Mohammed Hassan`, kind: 'warn' });
            }}
          />
        )}

        {activeTab === 'biweekly' && <BiWeeklyStatusTab />}

        {activeTab === 'milestones' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="text-base   text-foreground">Project Milestones &amp; Tasks</h2>
              <div className="flex items-center gap-3 flex-wrap">
                <Select value={ownerFilter} onValueChange={setOwnerFilter}>
                  <SelectTrigger className="w-[180px] h-9 text-sm"><SelectValue placeholder="All Owners" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Owners</SelectItem>
                    {uniqueOwners.map(owner => <SelectItem key={owner} value={owner}>{owner}</SelectItem>)}
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg">
                  {(['Tasks', 'Kanban', 'Gantt', 'Deliverables'] as const).map(view => (
                    <button
                      key={view}
                      onClick={() => setMilestoneView(view)}
                      className={cn('px-3 py-1 text-sm rounded-md transition-colors',
                        milestoneView === view ? "bg-white text-[#008755]   shadow-sm" : 'text-muted-foreground hover:text-foreground')}
                    >
                      {view}
                    </button>
                  ))}
                </div>
                <Button size="sm" className="bg-[#008755] hover:bg-[#005844] text-white" onClick={() => setShowAddMilestonePanel(true)}>
                  <Plus className="h-3.5 w-3.5 mr-1.5" /> Add Milestone
                </Button>
              </div>
            </div>

            {milestoneView === 'Tasks' ? (
              <div className="space-y-3">
                {filteredMilestones.map(milestone => (
                  <div key={milestone.id} className="border border-border rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between py-3 px-3">
                      <div className="flex items-center gap-3 flex-1 cursor-pointer hover:bg-muted/30 transition-colors -m-3 p-3 rounded" onClick={() => toggleMilestone(milestone.id)}>
                        {expandedMilestones.includes(milestone.id) ? <ChevronDown className="h-4 w-4 text-[#008755] flex-shrink-0" /> : <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
                        <h3 className="text-sm   text-foreground">{milestone.name}</h3>
                        <Badge style={{ backgroundColor: `${getTaskStatusColor(milestone.status)}20`, color: getTaskStatusColor(milestone.status) }} className="text-sm border-0">{milestone.status}</Badge>
                        {milestone.id === 'M3' && (
                          <Badge className="bg-[#D83731]/10 text-[#D83731] text-sm border-0 flex items-center gap-1">AI: 5w delay risk</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="hidden sm:flex items-center gap-2">
                          <Progress value={milestone.completion} className="h-2 w-[80px]" indicatorColor={ACCENT} />
                          <span className="text-sm   w-9">{milestone.completion}%</span>
                        </div>
                        <span className="hidden md:flex items-center gap-1 text-sm text-muted-foreground"><Calendar className="h-3 w-3" />{milestone.dueDate}</span>
                        <Badge variant="outline" className="text-sm">{milestone.tasks.length} tasks</Badge>
                        <button
                          onClick={(e) => { e.stopPropagation(); setSelectedMilestoneForTask(milestone.id); setShowAddTaskPanel(true); }}
                          className="text-sm font-medium text-[#008755] hover:bg-[#008755]/10 rounded-md px-2 py-1 transition-colors"
                        >
                          <Plus className="h-3 w-3 inline mr-1" />Add Task
                        </button>
                      </div>
                    </div>

                    {expandedMilestones.includes(milestone.id) && (
                      <div className="border-t border-border overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border bg-muted/30 text-muted-foreground">
                              <th className="w-7"></th>
                              <th className="text-left py-2 px-2 font-medium">Task</th>
                              <th className="text-left py-2 px-2 font-medium">Owner</th>
                              <th className="text-left py-2 px-2 font-medium">Priority</th>
                              <th className="text-left py-2 px-2 font-medium">Progress</th>
                              <th className="text-left py-2 px-2 font-medium">Status</th>
                              <th className="text-left py-2 px-2 font-medium">Timeline</th>
                              <th className="text-left py-2 px-2 font-medium">Predecessors</th>
                              <th className="text-left py-2 px-2 font-medium">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {milestone.tasks.map(task => (
                              <TaskRow key={task.id} task={task} expandedTasks={expandedTasks} toggleTask={toggleTask} />
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : milestoneView === 'Kanban' ? (
              <KanbanView mockMilestones={filteredMilestones} getPriorityColor={getPriorityColor} getStatusColor={getTaskStatusColor} />
            ) : milestoneView === 'Gantt' ? (
              <GanttView mockMilestones={filteredMilestones} getPriorityColor={getPriorityColor} getStatusColor={getTaskStatusColor} />
            ) : (
              <EmptyState icon={FolderCheck} text="Deliverables tracking for this project will be available in a future release." actionLabel="Back to Tasks" onAction={() => setMilestoneView('Tasks')} />
            )}
          </div>
        )}

        {activeTab === 'risk' && <RiskRegisterTab />}
        {activeTab === 'stakeholders' && <StakeholdersTab />}
        {activeTab === 'goals' && <GoalsBenefitsTab strategicPillar={t.full} />}

        {activeTab === 'evaluation' && (
          project.score !== null ? (
            <div className="max-w-lg">
              <h3 className="text-sm  ">Evaluation Breakdown</h3>
              <p className="text-sm text-muted-foreground mb-4">Scored against {t.full} criteria · Evaluated by {project.evaluator}</p>
              <div className="space-y-3">
                {CRITERIA[project.type].map(([label], i) => {
                  const v = Math.max(35, Math.min(100, (project.score as number) + CRITERIA_OFFSETS[i]));
                  return (
                    <div key={label} className="flex items-center gap-3 text-sm">
                      <span className="w-40 flex-shrink-0 text-foreground/80 truncate">{label}</span>
                      <Progress value={v} className="flex-1 h-2" indicatorColor={ACCENT} />
                      <span className="w-8 text-right  ">{v}</span>
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

        {activeTab === 'kpis' && <KPIsTab />}

        {activeTab === 'partners' && (
          linkedPartners.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
              {linkedPartners.map(p => (
                <div key={p.name} className="flex items-center gap-3 border border-border rounded-lg p-3">
                  <span
                    className="h-9 w-9 rounded-lg flex-shrink-0 flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundImage: `linear-gradient(135deg, ${p.gradientFrom}, ${p.gradientTo})` }}
                  >
                    {p.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm   truncate">{p.name}</p>
                    <p className="text-sm text-muted-foreground">{p.type} · {p.country}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState icon={Handshake} text="No partners linked to this project." actionLabel="Browse Partners" onAction={() => onNavigate('partners')} />
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
                    <p className="text-sm   truncate">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.kind} · Filed {item.filed}</p>
                  </div>
                  <Badge className={cn('border-0 text-sm', item.status === 'Granted' ? 'bg-[#008755]/10 text-[#008755]' : 'bg-blue-50 text-blue-700')}>{item.status}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState icon={Shield} text="No IP has been filed from this project yet." actionLabel="View IP Register" onAction={() => onNavigate('ip')} />
          )
        )}

        {activeTab === 'change-management' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base   text-foreground">Change Management</h2>
              <Button
                size="sm"
                className="bg-[#008755] hover:bg-[#005844] text-white"
                onClick={() => { setImpactAssessments([{ id: '1', impactType: '', details: '', preChange: '', postChange: '' }]); setShowAddChangePanel(true); }}
              >
                <Plus className="h-3.5 w-3.5 mr-1.5" /> Add Change
              </Button>
            </div>
            <div className="border border-border rounded-xl overflow-hidden overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30 text-muted-foreground">
                    <th className="text-left py-2.5 px-3 font-medium">Rationale</th>
                    <th className="text-left py-2.5 px-3 font-medium">Description</th>
                    <th className="text-left py-2.5 px-3 font-medium">Status</th>
                    <th className="text-left py-2.5 px-3 font-medium">Completed</th>
                    <th className="text-left py-2.5 px-3 font-medium">Action Taken</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_CHANGE_RECORDS.map(record => (
                    <tr key={record.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="py-2.5 px-3">{record.rationale}</td>
                      <td className="py-2.5 px-3 text-muted-foreground">{record.description}</td>
                      <td className="py-2.5 px-3">
                        <Badge className={cn('border-0 text-sm',
                          record.status === 'Completed' ? 'bg-[#008755]/10 text-[#008755]' : record.status === 'In Progress' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700')}>
                          {record.status}
                        </Badge>
                      </td>
                      <td className="py-2.5 px-3 text-muted-foreground">{record.completedOn || 'N/A'}</td>
                      <td className="py-2.5 px-3 text-muted-foreground">{record.actionTaken}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'closure' && <ProjectClosureTab />}
        {activeTab === 'documents' && <CollaborationTab />}
      </div>

      {/* Add Task Panel */}
      <AddTaskPanel
        isOpen={showAddTaskPanel}
        onClose={() => setShowAddTaskPanel(false)}
        projectName={project.name}
        milestoneId={selectedMilestoneForTask}
        milestoneName={MOCK_MILESTONES.find(m => m.id === selectedMilestoneForTask)?.name || ''}
      />

      {/* Add Milestone Panel */}
      <AddMilestonePanel
        isOpen={showAddMilestonePanel}
        onClose={() => setShowAddMilestonePanel(false)}
        projectName={project.name}
      />

      {/* Add Change Panel */}
      {showAddChangePanel && (
        <>
          <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setShowAddChangePanel(false)} />
          <div className="fixed right-0 top-0 h-full w-[560px] max-w-[94vw] bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="text-lg   text-[#008755]">Add Change Request</h2>
              <button onClick={() => setShowAddChangePanel(false)} className="h-8 w-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="text-sm   text-foreground mb-2 block">Rationale <span className="text-[#D83731]">*</span></label>
                  <input type="text" placeholder="Enter the reason for this change" className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#008755] focus:border-transparent" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm   text-foreground mb-2 block">Description <span className="text-[#D83731]">*</span></label>
                  <textarea placeholder="Provide detailed description of the change" rows={4} className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#008755] focus:border-transparent resize-none" />
                </div>
                <div>
                  <label className="text-sm   text-foreground mb-2 block">Status <span className="text-[#D83731]">*</span></label>
                  <select className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#008755] focus:border-transparent">
                    <option value="">Select status</option>
                    <option>Pending Approval</option>
                    <option>Approved</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                    <option>Rejected</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm   text-foreground mb-2 block">Completed On</label>
                  <input type="date" className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#008755] focus:border-transparent" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm   text-foreground mb-2 block">Action Taken <span className="text-[#D83731]">*</span></label>
                  <textarea placeholder="Describe the actions taken or planned for this change" rows={3} className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#008755] focus:border-transparent resize-none" />
                </div>

                <div className="border-t border-border pt-5 mt-2 md:col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm   text-foreground">Impact Assessment</h3>
                    <Button
                      size="sm" variant="outline" className="text-[#008755] border-[#008755] hover:bg-[#008755]/10"
                      onClick={() => setImpactAssessments(prev => [...prev, { id: Date.now().toString(), impactType: '', details: '', preChange: '', postChange: '' }])}
                    >
                      <Plus className="h-3.5 w-3.5 mr-1" /> Add New
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {impactAssessments.map((assessment, index) => (
                      <div key={assessment.id} className="border border-border rounded-lg bg-muted/20 p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm   text-[#008755]">Impact #{index + 1}</span>
                          {impactAssessments.length > 1 && (
                            <button
                              onClick={() => setImpactAssessments(prev => prev.filter((_, i) => i !== index))}
                              className="h-6 w-6 rounded flex items-center justify-center text-[#D83731] hover:bg-[#D83731]/10 transition-colors"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm   text-foreground mb-1 block">Impact Type</label>
                            <select className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#008755] focus:border-transparent">
                              <option value="">Select type</option>
                              <option>Schedule</option><option>Budget</option><option>Resources</option>
                              <option>Scope</option><option>Quality</option><option>Risk</option><option>Stakeholders</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-sm   text-foreground mb-1 block">Details</label>
                            <input type="text" placeholder="Describe the impact" className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#008755] focus:border-transparent" />
                          </div>
                          <div>
                            <label className="text-sm   text-foreground mb-1 block">Pre Change</label>
                            <input type="text" placeholder="State before change" className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#008755] focus:border-transparent" />
                          </div>
                          <div>
                            <label className="text-sm   text-foreground mb-1 block">Post Change</label>
                            <input type="text" placeholder="Expected state after change" className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#008755] focus:border-transparent" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-muted/20">
              <Button variant="outline" onClick={() => setShowAddChangePanel(false)}>Cancel</Button>
              <Button
                className="bg-[#008755] hover:bg-[#005844] text-white"
                onClick={() => {
                  toast.success('Change request submitted');
                  store.addAudit({ title: 'Change request submitted', detail: `New change request logged against ${project.name}`, kind: 'info' });
                  setShowAddChangePanel(false);
                }}
              >
                Submit Change Request
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function TaskRow({ task, expandedTasks, toggleTask }: { task: TaskItem; expandedTasks: string[]; toggleTask: (id: string) => void }) {
  return (
    <>
      <tr className={cn('border-b border-border last:border-0 hover:bg-muted/30 transition-colors', task.isOverdue && 'bg-red-50/60')}>
        <td className="py-2 px-2">
          {task.subtasks?.length ? (
            <button onClick={() => toggleTask(task.id)} className="h-4 w-4 flex items-center justify-center hover:bg-muted rounded">
              {expandedTasks.includes(task.id) ? <ChevronDown className="h-3.5 w-3.5 text-[#008755]" /> : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
            </button>
          ) : (
            <GripVertical className="h-3.5 w-3.5 text-muted-foreground" />
          )}
        </td>
        <td className="py-2 px-2">
          <div className="flex items-center gap-2">
            <span className={cn(task.isOverdue ? "text-[#D83731]  " : 'text-foreground')}>{task.name}</span>
            {task.isOverdue && <Badge variant="destructive" className="text-[9.5px]">Overdue</Badge>}
            {!!task.subtasks?.length && <Badge variant="outline" className="text-[9.5px] text-muted-foreground">{task.subtasks.length} subtasks</Badge>}
          </div>
        </td>
        <td className="py-2 px-2 text-foreground">{task.owner}</td>
        <td className="py-2 px-2"><Badge style={{ backgroundColor: `${getPriorityColor(task.priority)}20`, color: getPriorityColor(task.priority) }} className="text-sm border-0">{task.priority}</Badge></td>
        <td className="py-2 px-2">
          <div className="flex items-center gap-2">
            <Progress value={task.progress} className="h-1.5 w-[56px]" indicatorColor={getTaskStatusColor(task.status)} />
            <span className="text-sm">{task.progress}%</span>
          </div>
        </td>
        <td className="py-2 px-2"><Badge style={{ backgroundColor: `${getTaskStatusColor(task.status)}20`, color: getTaskStatusColor(task.status) }} className="text-sm border-0">{task.status}</Badge></td>
        <td className="py-2 px-2 text-muted-foreground whitespace-nowrap">{task.timeline}</td>
        <td className="py-2 px-2">
          {task.dependencies === 'None'
            ? <span className="text-muted-foreground">None</span>
            : <span className="text-[#008755] flex items-center gap-1"><Link2 className="h-3 w-3" />{task.dependencies}</span>}
        </td>
        <td className="py-2 px-2">
          <div className="flex items-center gap-0.5">
            <button className="h-6 w-6 rounded flex items-center justify-center hover:bg-muted"><Eye className="h-3.5 w-3.5 text-muted-foreground" /></button>
            <button className="h-6 w-6 rounded flex items-center justify-center hover:bg-muted"><Edit className="h-3.5 w-3.5 text-muted-foreground" /></button>
            <button className="h-6 w-6 rounded flex items-center justify-center hover:bg-[#D83731]/10"><Trash2 className="h-3.5 w-3.5 text-[#D83731]" /></button>
          </div>
        </td>
      </tr>
      {task.subtasks?.length && expandedTasks.includes(task.id) && task.subtasks.map(sub => (
        <tr key={sub.id} className={cn('border-b border-border last:border-0 bg-muted/20 hover:bg-muted/40 transition-colors', sub.isOverdue && 'bg-red-50/60')}>
          <td className="py-2 px-2" />
          <td className="py-2 px-2 pl-7">
            <div className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
              <span className={cn(sub.isOverdue ? "text-[#D83731]  " : 'text-foreground')}>{sub.name}</span>
              {sub.isOverdue && <Badge variant="destructive" className="text-[9.5px]">Overdue</Badge>}
            </div>
          </td>
          <td className="py-2 px-2 text-foreground">{sub.owner}</td>
          <td className="py-2 px-2"><Badge style={{ backgroundColor: `${getPriorityColor(sub.priority)}20`, color: getPriorityColor(sub.priority) }} className="text-sm border-0">{sub.priority}</Badge></td>
          <td className="py-2 px-2">
            <div className="flex items-center gap-2">
              <Progress value={sub.progress} className="h-1.5 w-[56px]" indicatorColor={getTaskStatusColor(sub.status)} />
              <span className="text-sm">{sub.progress}%</span>
            </div>
          </td>
          <td className="py-2 px-2"><Badge style={{ backgroundColor: `${getTaskStatusColor(sub.status)}20`, color: getTaskStatusColor(sub.status) }} className="text-sm border-0">{sub.status}</Badge></td>
          <td className="py-2 px-2 text-muted-foreground whitespace-nowrap">{sub.timeline}</td>
          <td className="py-2 px-2">
            {sub.dependencies === 'None'
              ? <span className="text-muted-foreground">None</span>
              : <span className="text-[#008755] flex items-center gap-1"><Link2 className="h-3 w-3" />{sub.dependencies}</span>}
          </td>
          <td className="py-2 px-2">
            <div className="flex items-center gap-0.5">
              <button className="h-6 w-6 rounded flex items-center justify-center hover:bg-muted"><Eye className="h-3.5 w-3.5 text-muted-foreground" /></button>
              <button className="h-6 w-6 rounded flex items-center justify-center hover:bg-muted"><Edit className="h-3.5 w-3.5 text-muted-foreground" /></button>
              <button className="h-6 w-6 rounded flex items-center justify-center hover:bg-[#D83731]/10"><Trash2 className="h-3.5 w-3.5 text-[#D83731]" /></button>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 min-w-0">
      <p className="text-sm uppercase tracking-wide text-muted-foreground font-medium">{label}</p>
      {children}
    </div>
  );
}

function InsightTile({ icon: Icon, color, label, value, detail }: { icon: React.ElementType; color: string; label: string; value: string; detail: string }) {
  return (
    <div className="bg-white rounded-lg p-3 border" style={{ borderColor: `${color}4d` }}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-3.5 w-3.5" style={{ color }} />
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
      <p className="text-sm   mb-0.5" style={{ color }}>{value}</p>
      <p className="text-sm text-muted-foreground">{detail}</p>
    </div>
  );
}

function StatTile({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="bg-card border border-border rounded-lg p-3">
      <Icon className="h-3.5 w-3.5 text-[#008755] mb-1.5" />
      <p className="text-sm uppercase tracking-wide text-muted-foreground font-medium">{label}</p>
      <p className="text-sm   mt-0.5 truncate">{value}</p>
    </div>
  );
}

function DetailRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="h-3.5 w-3.5 text-[#008755] mt-0.5 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-sm   truncate">{value}</p>
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
      <button onClick={onAction} className="rounded-lg bg-[#008755] hover:bg-[#005844] text-white text-sm   px-4 py-2.5 transition-colors">
        {actionLabel}
      </button>
    </div>
  );
}
