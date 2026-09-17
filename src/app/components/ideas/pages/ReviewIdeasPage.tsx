import { useState, useMemo } from 'react';
import {
  Search, AlertTriangle, ArrowUpCircle, Archive, CheckCircle2,
  Info, XCircle, Flag, TrendingUp, Clock, Users, ChevronRight,
  ClipboardList,
} from 'lucide-react';
import { EvaluationPanel } from '../EvaluationPanel';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '../../ui/select';
import { Progress } from '../../ui/progress';
import { cn } from '../../ui/utils';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar,
} from 'recharts';

// ── Types ─────────────────────────────────────────────────────────────────────
type IdeasRole = 'innovator' | 'coordinator' | 'director' | 'admin';
interface User { name: string; role: string; subtitle: string; xp: number; initials: string; chip: string; }
interface PageProps { user: User; role: IdeasRole; onNavigate: (id: string) => void; }

type IdeaStatus = 'Pending' | 'Overdue' | 'Approved' | 'Rejected' | 'Needs Info' | 'Escalated' | 'Archived';
type Readiness = 'Ready' | 'Needs Info' | 'Weak';

interface Idea {
  id: number;
  title: string;
  submitter: string;
  dept: string;
  days: number;
  status: IdeaStatus;
  readiness: Readiness;
}

// ── Static data ───────────────────────────────────────────────────────────────
const TREND_DATA = [
  { month: 'Jan', submitted: 8,  reviewed: 6  },
  { month: 'Feb', submitted: 12, reviewed: 9  },
  { month: 'Mar', submitted: 10, reviewed: 11 },
  { month: 'Apr', submitted: 15, reviewed: 12 },
  { month: 'May', submitted: 18, reviewed: 14 },
  { month: 'Jun', submitted: 14, reviewed: 13 },
];

const MONTHLY_APPROVALS = [
  { week: 'W1', approved: 3 },
  { week: 'W2', approved: 5 },
  { week: 'W3', approved: 4 },
  { week: 'W4', approved: 6 },
];

const TOP_SUBMITTERS = [
  { name: 'Fatima Al Mansoori', dept: 'Digital Transformation', ideas: 7, approved: 5 },
  { name: 'Omar Al Zaabi',      dept: 'Operations',             ideas: 6, approved: 4 },
  { name: 'Hessa Al Blooshi',   dept: 'Community Affairs',      ideas: 5, approved: 3 },
  { name: 'Saeed Al Ketbi',     dept: 'HR & Training',          ideas: 4, approved: 4 },
  { name: 'Mariam Al Suwaidi',  dept: 'Legal Affairs',          ideas: 3, approved: 2 },
];

const INITIAL_IDEAS: Idea[] = [
  { id: 1, title: 'Smart Queue Management at Service Centers', submitter: 'Fatima Al Mansoori', dept: 'Digital Transformation', days: 2,  status: 'Pending', readiness: 'Ready'     },
  { id: 2, title: 'AI-Assisted Vehicle Inspection Reports',    submitter: 'Omar Al Zaabi',      dept: 'Operations',             days: 9,  status: 'Overdue', readiness: 'Ready'     },
  { id: 3, title: 'Community Feedback Loop Automation',        submitter: 'Hessa Al Blooshi',   dept: 'Community Affairs',      days: 4,  status: 'Pending', readiness: 'Needs Info'},
  { id: 4, title: 'Digital Training Badge System',             submitter: 'Saeed Al Ketbi',     dept: 'HR & Training',          days: 1,  status: 'Pending', readiness: 'Ready'     },
  { id: 5, title: 'Predictive Patrol Scheduling',              submitter: 'Omar Al Zaabi',      dept: 'Operations',             days: 8,  status: 'Overdue', readiness: 'Weak'      },
  { id: 6, title: 'Smart Evidence Tagging System',             submitter: 'Mariam Al Suwaidi',  dept: 'Legal Affairs',          days: 3,  status: 'Pending', readiness: 'Ready'     },
  { id: 7, title: 'E-Grievance Resolution Tracker',            submitter: 'Fatima Al Mansoori', dept: 'Digital Transformation', days: 6,  status: 'Pending', readiness: 'Needs Info'},
  { id: 8, title: 'Mobile Field Report Digitization',          submitter: 'Saeed Al Ketbi',     dept: 'HR & Training',          days: 12, status: 'Overdue', readiness: 'Weak'      },
];

const DEPARTMENTS = [...new Set(INITIAL_IDEAS.map(i => i.dept))];
const STATUSES: IdeaStatus[] = ['Pending', 'Overdue', 'Approved', 'Rejected', 'Needs Info', 'Escalated', 'Archived'];

// ── Helpers ───────────────────────────────────────────────────────────────────
function statusStyles(status: IdeaStatus): string {
  switch (status) {
    case 'Pending':    return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'Overdue':    return 'bg-red-50 text-red-700 border-red-200';
    case 'Approved':   return 'bg-[#008755]/10 text-[#008755] border-transparent';
    case 'Rejected':   return 'bg-gray-100 text-gray-500 border-transparent';
    case 'Needs Info': return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'Escalated':  return 'bg-purple-50 text-purple-700 border-purple-200';
    case 'Archived':   return 'bg-gray-100 text-gray-400 border-transparent';
    default:           return 'bg-gray-100 text-gray-500 border-transparent';
  }
}

function readinessConfig(r: Readiness) {
  switch (r) {
    case 'Ready':      return { label: 'Ready ✓',      cls: 'bg-[#008755]/10 text-[#008755]' };
    case 'Needs Info': return { label: 'Needs Info ⚠', cls: 'bg-amber-50 text-amber-700'     };
    case 'Weak':       return { label: 'Weak ✗',       cls: 'bg-red-50 text-red-700'         };
  }
}

function daysBadgeClass(days: number): string {
  if (days > 7) return 'bg-red-50 text-red-700';
  if (days > 3) return 'bg-amber-50 text-amber-700';
  return 'bg-gray-100 text-gray-600';
}

function submitterInitials(name: string): string {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('');
}

function formatDate(daysAgo: number): string {
  const d = new Date(Date.now() - daysAgo * 86_400_000);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', yyyy: 'numeric' } as Intl.DateTimeFormatOptions);
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function deriveAiHints(readiness: Readiness) {
  if (readiness === 'Ready')      return { strategic: 4, feasibility: 4, impact: 4, cost: 4, risk: 4 };
  if (readiness === 'Needs Info') return { strategic: 3, feasibility: 3, impact: 3, cost: 3, risk: 3 };
  return                                 { strategic: 2, feasibility: 2, impact: 2, cost: 2, risk: 2 };
}

// ── Sub-components ────────────────────────────────────────────────────────────
function StatCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Card className={cn('rounded-xl border border-border bg-white shadow-sm', className)}>
      <CardContent className="p-5">{children}</CardContent>
    </Card>
  );
}

interface IdeaRowProps {
  idea: Idea;
  onAction: (id: number, status: IdeaStatus) => void;
  flash: boolean;
  evaluating: boolean;
  onToggleEvaluate: () => void;
}

function IdeaRow({ idea, onAction, flash, evaluating, onToggleEvaluate }: IdeaRowProps) {
  const rd = readinessConfig(idea.readiness);

  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-white shadow-sm p-4 transition-all duration-300',
        flash && 'ring-2 ring-[#26D07C]',
      )}
    >
      <div className="flex flex-col sm:flex-row gap-3 sm:items-start" role="group">

        {/* LEFT: title + meta */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 mb-1">
            <p className="font-['Dubai:Medium',_sans-serif] text-sm font-semibold text-gray-900 leading-snug line-clamp-2">
              {idea.title}
            </p>
            <Badge className={cn('ml-auto shrink-0 text-xs border', statusStyles(idea.status))}>
              {idea.status}
            </Badge>
          </div>
          <p className="text-xs text-gray-500 flex flex-wrap gap-x-1">
            <span className="font-medium text-gray-700">{idea.submitter}</span>
            <span>·</span>
            <span>{idea.dept}</span>
            <span>·</span>
            <span>Submitted {formatDate(idea.days)}</span>
          </p>
        </div>

        {/* MIDDLE: days + readiness */}
        <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
          <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium', daysBadgeClass(idea.days))}>
            <Clock size={11} />
            {idea.days}d waiting
          </span>
          {idea.days > 7 && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600">
              <Flag size={11} className="text-red-500" />
              SLA Breach
            </span>
          )}
          <span className={cn('rounded-full px-2 py-0.5 text-xs font-medium', rd.cls)}>
            {rd.label}
          </span>
        </div>

        {/* RIGHT: actions */}
        <div className="flex flex-wrap gap-1.5 shrink-0 sm:items-center">
          <Button
            size="sm"
            variant="outline"
            className={cn('h-7 px-2.5 text-xs border-[#008755] text-[#008755] hover:bg-[#008755]/5', evaluating && 'bg-[#008755]/10')}
            onClick={onToggleEvaluate}
          >
            <ClipboardList size={12} className="mr-1" />
            {evaluating ? 'Close Eval' : 'Evaluate'}
          </Button>
          <Button
            size="sm"
            className="h-7 px-2.5 text-xs bg-[#008755] hover:bg-[#005844] text-white"
            onClick={() => onAction(idea.id, 'Approved')}
          >
            <CheckCircle2 size={12} className="mr-1" />Approve
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-7 px-2.5 text-xs border-blue-400 text-blue-700 hover:bg-blue-50"
            onClick={() => onAction(idea.id, 'Needs Info')}
          >
            <Info size={12} className="mr-1" />Request Info
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-7 px-2.5 text-xs border-red-400 text-red-700 hover:bg-red-50"
            onClick={() => onAction(idea.id, 'Rejected')}
          >
            <XCircle size={12} className="mr-1" />Reject
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-7 px-2.5 text-xs border-purple-400 text-purple-700 hover:bg-purple-50"
            onClick={() => onAction(idea.id, 'Escalated')}
          >
            <ArrowUpCircle size={12} className="mr-1" />Escalate
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-7 px-2.5 text-xs text-gray-500 hover:text-gray-700"
            onClick={() => onAction(idea.id, 'Archived')}
          >
            <Archive size={12} className="mr-1" />Archive
          </Button>
        </div>
      </div>

      {/* Evaluation panel — shown when this row is active */}
      {evaluating && (
        <EvaluationPanel
          ideaId={idea.id}
          ideaTitle={idea.title}
          aiHints={deriveAiHints(idea.readiness)}
          onConfirm={(score) => {
            onAction(idea.id, score >= 70 ? 'Approved' : score >= 50 ? 'Needs Info' : 'Rejected');
            onToggleEvaluate();
          }}
          onClose={onToggleEvaluate}
        />
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function ReviewIdeasPage({ user: _user, role: _role, onNavigate: _onNavigate }: PageProps) {
  const [ideas, setIdeas] = useState<Idea[]>(INITIAL_IDEAS);
  const [flashIds, setFlashIds] = useState<Set<number>>(new Set());
  const [evaluatingId, setEvaluatingId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  function handleAction(id: number, newStatus: IdeaStatus) {
    setIdeas(prev => prev.map(i => i.id === id ? { ...i, status: newStatus } : i));
    setFlashIds(prev => new Set(prev).add(id));
    setTimeout(() => {
      setFlashIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 1800);
  }

  const filteredIdeas = useMemo(() => {
    return ideas.filter(idea => {
      const matchSearch =
        search === '' ||
        idea.title.toLowerCase().includes(search.toLowerCase()) ||
        idea.submitter.toLowerCase().includes(search.toLowerCase());
      const matchDept   = deptFilter === 'all'   || idea.dept   === deptFilter;
      const matchStatus = statusFilter === 'all' || idea.status === statusFilter;
      return matchSearch && matchDept && matchStatus;
    });
  }, [ideas, search, deptFilter, statusFilter]);

  const pending = ideas.filter(i => i.status === 'Pending').length;
  const overdue = ideas.filter(i => i.status === 'Overdue').length;
  const total   = pending + overdue;

  function clearFilters() {
    setSearch('');
    setDeptFilter('all');
    setStatusFilter('all');
  }

  const hasFilters = search !== '' || deptFilter !== 'all' || statusFilter !== 'all';

  return (
    <div className="p-4 space-y-5">

      {/* ── Page header ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-['Dubai:Medium',_sans-serif] text-xl font-bold text-gray-900 leading-tight">
            Review Ideas
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Coordinator dashboard · {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <Badge className="bg-[#008755]/10 text-[#008755] border-transparent text-xs px-3 py-1">
          {total} items in queue
        </Badge>
      </div>

      {/* ── Top stats row ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        {/* Review Backlog */}
        <StatCard>
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs text-gray-500 font-['Dubai:Medium',_sans-serif] uppercase tracking-wide mb-1">
                Review Backlog
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">{pending}</span>
                <span className="text-sm text-gray-500">pending</span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600 bg-red-50 rounded-full px-2 py-0.5">
              <AlertTriangle size={11} />
              {overdue} overdue
            </span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Queue capacity</span>
              <span>{total}/31</span>
            </div>
            <div className="relative h-2 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full rounded-full bg-amber-400 transition-all"
                style={{ width: `${(pending / 31) * 100}%` }}
              />
              <div
                className="absolute top-0 h-full rounded-full bg-red-500 transition-all"
                style={{ left: `${(pending / 31) * 100}%`, width: `${(overdue / 31) * 100}%` }}
              />
            </div>
            <div className="flex gap-3 text-xs text-gray-400 mt-1">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />Pending</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" />Overdue</span>
            </div>
          </div>
        </StatCard>

        {/* Avg Review Time */}
        <StatCard>
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs text-gray-500 font-['Dubai:Medium',_sans-serif] uppercase tracking-wide mb-1">
                Avg Review Time
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">3.2</span>
                <span className="text-sm text-gray-500">days</span>
              </div>
            </div>
            <Badge className="bg-[#008755]/10 text-[#008755] border-transparent text-xs">
              On Track
            </Badge>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Target: ≤ 5 days</span>
              <span>64% of target</span>
            </div>
            <Progress value={64} className="h-2 bg-gray-100" />
            <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
              <TrendingUp size={11} className="text-[#008755]" />
              0.4 days faster than last month
            </p>
          </div>
        </StatCard>

        {/* Reviewed This Month */}
        <StatCard>
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-xs text-gray-500 font-['Dubai:Medium',_sans-serif] uppercase tracking-wide mb-1">
                Reviewed This Month
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">18</span>
                <span className="text-sm text-gray-500">ideas</span>
              </div>
            </div>
            <Badge className="bg-[#26D07C]/20 text-[#005844] border-transparent text-xs">
              73% approved
            </Badge>
          </div>
          <ResponsiveContainer width="100%" height={50}>
            <BarChart data={MONTHLY_APPROVALS} barSize={14}>
              <Bar dataKey="approved" fill="#008755" radius={[3, 3, 0, 0]} />
              <Tooltip
                contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e5e7eb' }}
                cursor={{ fill: '#f3f4f6' }}
              />
            </BarChart>
          </ResponsiveContainer>
        </StatCard>
      </div>

      {/* ── Two-column row ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Submission Trends — 2/3 */}
        <Card className="lg:col-span-2 rounded-xl border border-border bg-white shadow-sm">
          <CardHeader className="pb-2 pt-4 px-5">
            <CardTitle className="font-['Dubai:Medium',_sans-serif] text-sm font-semibold text-gray-800">
              Submission Trends
            </CardTitle>
            <p className="text-xs text-gray-500">Jan – Jun 2025</p>
          </CardHeader>
          <CardContent className="px-5 pb-4">
            <div className="flex gap-4 mb-2">
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="w-3 h-3 rounded-sm" style={{ background: '#008755' }} />
                Submitted
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="w-3 h-3 rounded-sm" style={{ background: '#26D07C' }} />
                Reviewed
              </span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={TREND_DATA} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                <defs>
                  <linearGradient id="gSubmitted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#008755" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#008755" stopOpacity={0}    />
                  </linearGradient>
                  <linearGradient id="gReviewed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#26D07C" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#26D07C" stopOpacity={0}   />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                  cursor={{ stroke: '#e5e7eb' }}
                />
                <Area
                  type="monotone"
                  dataKey="submitted"
                  stroke="#008755"
                  strokeWidth={2}
                  fill="url(#gSubmitted)"
                  dot={false}
                />
                <Area
                  type="monotone"
                  dataKey="reviewed"
                  stroke="#26D07C"
                  strokeWidth={2}
                  fill="url(#gReviewed)"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Submitters — 1/3 */}
        <Card className="rounded-xl border border-border bg-white shadow-sm">
          <CardHeader className="pb-2 pt-4 px-5">
            <CardTitle className="font-['Dubai:Medium',_sans-serif] text-sm font-semibold text-gray-800 flex items-center gap-2">
              <Users size={14} className="text-[#008755]" />
              Top Submitters
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-4 space-y-3">
            {TOP_SUBMITTERS.map((s, idx) => (
              <div key={s.name} className="flex items-start gap-3">
                {/* Rank badge */}
                <div className={cn(
                  'shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5',
                  idx === 0 ? 'bg-[#008755] text-white' : 'bg-gray-100 text-gray-500',
                )}>
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-gray-800 truncate">{s.name}</p>
                    <p className="text-xs text-gray-400 whitespace-nowrap ml-2">
                      {s.ideas} · {s.approved} ✓
                    </p>
                  </div>
                  <p className="text-xs text-gray-400 mb-1">{s.dept}</p>
                  <div className="h-1 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#26D07C] transition-all"
                      style={{ width: `${(s.ideas / 7) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* ── Review Queue ────────────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-['Dubai:Medium',_sans-serif] text-base font-semibold text-gray-900 flex items-center gap-2">
            Review Queue
            <Badge className="bg-amber-50 text-amber-700 border-amber-200 text-xs">
              {filteredIdeas.length} showing
            </Badge>
          </h2>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search by title or submitter…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-8 h-9 text-sm"
            />
          </div>

          <Select value={deptFilter} onValueChange={setDeptFilter}>
            <SelectTrigger className="h-9 text-sm w-full sm:w-52">
              <SelectValue placeholder="All departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All departments</SelectItem>
              {DEPARTMENTS.map(d => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-9 text-sm w-full sm:w-44">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {STATUSES.map(s => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              className="h-9 px-3 text-sm text-gray-500 hover:text-gray-700 whitespace-nowrap"
              onClick={clearFilters}
            >
              Clear
            </Button>
          )}
        </div>

        {/* Idea cards */}
        <div className="space-y-3">
          {filteredIdeas.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-200 bg-white p-10 text-center">
              <Search size={28} className="mx-auto text-gray-300 mb-2" />
              <p className="text-sm text-gray-500">No ideas match your filters.</p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 text-[#008755] hover:text-[#005844]"
                onClick={clearFilters}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            filteredIdeas.map(idea => (
              <IdeaRow
                key={idea.id}
                idea={idea}
                onAction={handleAction}
                flash={flashIds.has(idea.id)}
                evaluating={evaluatingId === idea.id}
                onToggleEvaluate={() => setEvaluatingId(prev => prev === idea.id ? null : idea.id)}
              />
            ))
          )}
        </div>

        {filteredIdeas.length > 0 && (
          <div className="mt-3 flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-[#008755] hover:text-[#005844] hover:bg-[#008755]/10"
            >
              Load more ideas
              <ChevronRight size={13} className="ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
