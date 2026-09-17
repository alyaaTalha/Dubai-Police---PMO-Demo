import { useState, useRef, useEffect } from 'react';
import {
  Sparkles, X, Star, ChevronDown, ChevronUp, Send,
  AlertTriangle, Clock, CheckCircle2, XCircle, ArrowRight,
  TrendingUp, Users, Zap, BarChart2, Filter,
  AlertCircle, ThumbsUp, HelpCircle, ThumbsDown,
  UserCheck, Building2, ClipboardList,
} from 'lucide-react';
import { EvaluationPanel } from '../EvaluationPanel';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Progress } from '../../ui/progress';
import { cn } from '../../ui/utils';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';

// ── Types ─────────────────────────────────────────────────────────────────────
type IdeasRole = 'innovator' | 'coordinator' | 'director' | 'admin';

interface User {
  name: string;
  role: string;
  subtitle: string;
  xp: number;
  initials: string;
  chip: string;
}

interface PageProps {
  user: User;
  role: IdeasRole;
  onNavigate: (id: string) => void;
}

// ── Department data ───────────────────────────────────────────────────────────
const DEPARTMENTS = [
  'Community Affairs',
  'Digital Transformation',
  'Operations',
  'HR & Training',
  'Legal Affairs',
  'Strategic Planning',
];

interface DeptStats {
  decisions: number;
  pipeline: number;
  avgDays: number;
  pending: number;
  overdue: number;
  funnelSubmitted: number;
  funnelReview: number;
  funnelDirector: number;
  funnelFeasibility: number;
  funnelImplemented: number;
}

const DEPT_STATS: Record<string, DeptStats> = {
  'Community Affairs':      { decisions: 14, pipeline: 8,  avgDays: 4.1, pending: 6,  overdue: 2, funnelSubmitted: 47, funnelReview: 24, funnelDirector: 12, funnelFeasibility: 8,  funnelImplemented: 3 },
  'Digital Transformation': { decisions: 11, pipeline: 10, avgDays: 3.5, pending: 4,  overdue: 1, funnelSubmitted: 38, funnelReview: 20, funnelDirector: 9,  funnelFeasibility: 6,  funnelImplemented: 4 },
  'Operations':             { decisions: 18, pipeline: 6,  avgDays: 5.2, pending: 8,  overdue: 3, funnelSubmitted: 52, funnelReview: 29, funnelDirector: 14, funnelFeasibility: 9,  funnelImplemented: 5 },
  'HR & Training':          { decisions: 9,  pipeline: 5,  avgDays: 2.8, pending: 3,  overdue: 0, funnelSubmitted: 31, funnelReview: 18, funnelDirector: 8,  funnelFeasibility: 5,  funnelImplemented: 2 },
  'Legal Affairs':          { decisions: 6,  pipeline: 4,  avgDays: 6.0, pending: 5,  overdue: 2, funnelSubmitted: 22, funnelReview: 11, funnelDirector: 6,  funnelFeasibility: 3,  funnelImplemented: 1 },
  'Strategic Planning':     { decisions: 12, pipeline: 7,  avgDays: 3.9, pending: 5,  overdue: 1, funnelSubmitted: 35, funnelReview: 19, funnelDirector: 10, funnelFeasibility: 7,  funnelImplemented: 3 },
};

// ── Ideas queue ───────────────────────────────────────────────────────────────
type AiRec = 'Approve' | 'Review' | 'Reject';
type FitLevel = 'High' | 'Medium' | 'Low';
type CardStatus = 'pending' | 'approved' | 'rejected' | 'info-requested';

interface IdeaCard {
  id: number;
  title: string;
  submitter: string;
  dept: string;
  submitted: string;
  days: number;
  strategicFit: FitLevel;
  effort: FitLevel;
  aiRec: AiRec;
  assignedOwner: string | null;
  status: CardStatus;
}

const INITIAL_IDEAS: IdeaCard[] = [
  { id: 1, title: 'Smart Queue Management', submitter: 'Fatima Al Mansoori', dept: 'Digital Transformation', submitted: 'Jul 30, 2025', days: 2, strategicFit: 'High', effort: 'Low',    aiRec: 'Approve', assignedOwner: null, status: 'pending' },
  { id: 2, title: 'Community Feedback Loop Automation', submitter: 'Hessa Al Blooshi', dept: 'Community Affairs', submitted: 'Jul 27, 2025', days: 5, strategicFit: 'High', effort: 'Medium', aiRec: 'Approve', assignedOwner: null, status: 'pending' },
  { id: 3, title: 'Predictive Patrol Scheduling', submitter: 'Omar Al Zaabi', dept: 'Operations', submitted: 'Jul 24, 2025', days: 8, strategicFit: 'Medium', effort: 'High',   aiRec: 'Review',  assignedOwner: null, status: 'pending' },
  { id: 4, title: 'Digital Training Badge System', submitter: 'Saeed Al Ketbi', dept: 'HR & Training', submitted: 'Aug 1, 2025', days: 1, strategicFit: 'High', effort: 'Low',    aiRec: 'Approve', assignedOwner: null, status: 'pending' },
  { id: 5, title: 'Mobile Field Report Digitization', submitter: 'Saeed Al Ketbi', dept: 'HR & Training', submitted: 'Jul 29, 2025', days: 4, strategicFit: 'Medium', effort: 'Medium', aiRec: 'Review',  assignedOwner: null, status: 'pending' },
  { id: 6, title: 'E-Grievance Resolution Tracker', submitter: 'Fatima Al Mansoori', dept: 'Digital Transformation', submitted: 'Jul 23, 2025', days: 9, strategicFit: 'Low', effort: 'High',   aiRec: 'Reject',  assignedOwner: null, status: 'pending' },
];

const OWNERS = ['Khalid Al Nuaimi', 'Maryam Al Rashdi', 'Ahmed Al Suwaidi'];

// ── High-potential ideas ──────────────────────────────────────────────────────
const HIGH_POTENTIAL = [
  { id: 1, title: 'AI-Powered Evidence Cataloging', impact: 'Safety & Security', dept: 'Operations', desc: 'Reduces evidence handling time by 60% using computer vision classification.' },
  { id: 2, title: 'Unified Digital Front Door', impact: 'Customer Experience', dept: 'Community Affairs', desc: 'One citizen portal replacing 14 separate service entry points.' },
  { id: 3, title: 'Predictive Maintenance for Fleet', impact: 'Cost Reduction', dept: 'Operations', desc: 'Predicted to cut unplanned vehicle downtime by 40% annually.' },
  { id: 4, title: 'Smart Training Pathway Engine', impact: 'Productivity', dept: 'HR & Training', desc: 'Personalised L&D journeys boosting completion rates by 35%.' },
];

// ── Recent ideas table ────────────────────────────────────────────────────────
type StatusLabel = 'Submitted' | 'Under Review' | 'Approved' | 'Rejected' | 'Implemented';

interface RecentIdea {
  title: string;
  dept: string;
  status: StatusLabel;
  days: number;
}

const RECENT_IDEAS: RecentIdea[] = [
  { title: 'Smart Queue Management',              dept: 'Digital Transformation', status: 'Under Review',  days: 2  },
  { title: 'Community Feedback Loop Automation',  dept: 'Community Affairs',      status: 'Under Review',  days: 5  },
  { title: 'Predictive Patrol Scheduling',        dept: 'Operations',             status: 'Submitted',     days: 8  },
  { title: 'Digital Training Badge System',       dept: 'HR & Training',          status: 'Approved',      days: 1  },
  { title: 'Mobile Field Report Digitization',    dept: 'HR & Training',          status: 'Under Review',  days: 4  },
  { title: 'E-Grievance Resolution Tracker',      dept: 'Digital Transformation', status: 'Rejected',      days: 9  },
  { title: 'Blockchain Evidence Chain',           dept: 'Legal Affairs',          status: 'Implemented',   days: 34 },
  { title: 'Officer Wellness Check Platform',     dept: 'HR & Training',          status: 'Approved',      days: 12 },
];

// ── Impact area chart data ────────────────────────────────────────────────────
const IMPACT_DATA = [
  { area: 'Operational Efficiency', count: 18 },
  { area: 'Customer Experience',    count: 14 },
  { area: 'Safety & Security',      count: 12 },
  { area: 'Cost Reduction',         count: 9  },
  { area: 'Productivity',           count: 7  },
];

// ── AI responses ──────────────────────────────────────────────────────────────
function getAiReply(question: string): string {
  const q = question.toLowerCase();
  if (q.includes('overdue') || q.includes('sla')) {
    return "There are 2 overdue ideas in your queue:\n1. Predictive Patrol Scheduling (Omar Al Zaabi, Operations) — waiting 8 days.\n2. E-Grievance Resolution Tracker (Fatima Al Mansoori, Digital Transformation) — waiting 9 days, SLA-breached.\nBoth require immediate action to meet the 7-day decision commitment.";
  }
  if (q.includes('funnel') || q.includes('blocking') || q.includes('stuck')) {
    return "The biggest bottleneck this month is the Director Review stage. 47% of ideas drop between Under Review (24) and Director Review (12) — 13 ideas are stalled. Clearing your 6-item pending queue would directly resolve this congestion.";
  }
  if (q.includes('strategic') || q.includes('alignment') || q.includes('fit')) {
    return "Top 3 ideas with High strategic alignment:\n1. Smart Queue Management — Low effort, AI recommends Approve.\n2. Community Feedback Loop Automation — Medium effort, strong community impact.\n3. Digital Training Badge System — Low effort, aligns with HR modernisation goals.\nAll three are awaiting your decision this week.";
  }
  if (q.includes('pipeline') || q.includes('status')) {
    return "Your current pipeline has 8 ideas in active stages. 6 are pending your decision, 2 have been converted to projects this month. Average decision time is 4.1 days against a 3-day target — consider batch-reviewing the pending queue today.";
  }
  return "Based on your pipeline data, here are the most relevant results for your query. You currently have 6 ideas awaiting decision, 2 of which are overdue. Your department funnel shows a 47% drop at the Director Review stage — clearing your queue would unlock significant downstream throughput.";
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function fitColor(level: FitLevel) {
  if (level === 'High')   return 'bg-emerald-100 text-emerald-800';
  if (level === 'Medium') return 'bg-amber-100 text-amber-800';
  return 'bg-red-100 text-red-800';
}

function effortColor(level: FitLevel) {
  if (level === 'Low')    return 'bg-emerald-100 text-emerald-800';
  if (level === 'Medium') return 'bg-amber-100 text-amber-800';
  return 'bg-red-100 text-red-800';
}

function aiRecStyle(rec: AiRec) {
  if (rec === 'Approve') return { cls: 'bg-emerald-100 text-emerald-800', icon: <ThumbsUp className="w-3 h-3" /> };
  if (rec === 'Review')  return { cls: 'bg-amber-100 text-amber-800',     icon: <HelpCircle className="w-3 h-3" /> };
  return                        { cls: 'bg-red-100 text-red-800',          icon: <ThumbsDown className="w-3 h-3" /> };
}

function statusBadge(status: StatusLabel) {
  const map: Record<StatusLabel, string> = {
    'Submitted':    'bg-gray-100 text-gray-700',
    'Under Review': 'bg-amber-100 text-amber-800',
    'Approved':     'bg-emerald-100 text-emerald-800',
    'Rejected':     'bg-red-100 text-red-800',
    'Implemented':  'bg-teal-100 text-teal-800',
  };
  return map[status];
}

function impactBadgeColor(impact: string) {
  const map: Record<string, string> = {
    'Safety & Security':      'bg-blue-100 text-blue-800',
    'Customer Experience':    'bg-purple-100 text-purple-800',
    'Cost Reduction':         'bg-amber-100 text-amber-800',
    'Productivity':           'bg-teal-100 text-teal-800',
    'Operational Efficiency': 'bg-indigo-100 text-indigo-800',
  };
  return map[impact] ?? 'bg-gray-100 text-gray-700';
}

// ── Funnel stage config ───────────────────────────────────────────────────────
const FUNNEL_COLORS = ['#008755', '#00a066', '#26D07C', '#4de89a', '#80f0b8'];

// ── Evaluation helper ─────────────────────────────────────────────────────────
function deriveDirectorAiHints(fit: FitLevel, effort: FitLevel, rec: AiRec) {
  const strategic   = fit    === 'High'   ? 5 : fit    === 'Medium' ? 3 : 2;
  const feasibility = effort === 'Low'    ? 5 : effort === 'Medium' ? 3 : 2;
  const impact      = rec    === 'Approve'? 5 : rec    === 'Review' ? 3 : 2;
  return { strategic, feasibility, impact, cost: 4, risk: 3 };
}

// ── Main component ────────────────────────────────────────────────────────────
export function DirectorDashboardPage({ user, onNavigate }: PageProps) {
  const [dept, setDept] = useState('Community Affairs');
  const [alertVisible, setAlertVisible] = useState(true);
  const [ideas, setIdeas] = useState<IdeaCard[]>(INITIAL_IDEAS);
  const [ownerDropdown, setOwnerDropdown] = useState<number | null>(null);
  const [evaluatingId, setEvaluatingId] = useState<number | null>(null);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai'; content: string }[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const stats = DEPT_STATS[dept] ?? DEPT_STATS['Community Affairs'];
  const pendingIdeas = ideas.filter((i) => i.status === 'pending');

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  function handleApprove(id: number) {
    setIdeas((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: 'approved' } : i))
    );
    setTimeout(() => {
      setIdeas((prev) => prev.filter((i) => i.id !== id));
    }, 800);
  }

  function handleReject(id: number) {
    setIdeas((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: 'rejected' } : i))
    );
    setTimeout(() => {
      setIdeas((prev) => prev.filter((i) => i.id !== id));
    }, 500);
  }

  function handleRequestInfo(id: number) {
    setIdeas((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: 'info-requested' } : i))
    );
    setTimeout(() => {
      setIdeas((prev) => prev.filter((i) => i.id !== id));
    }, 600);
  }

  function assignOwner(id: number, owner: string) {
    setIdeas((prev) =>
      prev.map((i) => (i.id === id ? { ...i, assignedOwner: owner } : i))
    );
    setOwnerDropdown(null);
  }

  function handleAiSend() {
    const q = aiInput.trim();
    if (!q) return;
    const reply = getAiReply(q);
    setChatHistory((prev) => [
      ...prev,
      { role: 'user', content: q },
      { role: 'ai', content: reply },
    ]);
    setAiInput('');
  }

  function handlePromptChip(prompt: string) {
    const reply = getAiReply(prompt);
    setChatHistory((prev) => [
      ...prev,
      { role: 'user', content: prompt },
      { role: 'ai', content: reply },
    ]);
  }

  // Funnel
  const funnelStages = [
    { label: 'Submitted',       count: stats.funnelSubmitted },
    { label: 'Under Review',    count: stats.funnelReview },
    { label: 'Director Review', count: stats.funnelDirector },
    { label: 'Feasibility',     count: stats.funnelFeasibility },
    { label: 'Implemented',     count: stats.funnelImplemented },
  ];
  const drop = Math.round(
    ((stats.funnelReview - stats.funnelDirector) / stats.funnelReview) * 100
  );
  const waiting = stats.funnelReview - stats.funnelDirector;

  return (
    <div className="p-3 space-y-3">
      {/* ── 1. Top Bar ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl   font-semibold text-gray-900">
            Director Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Welcome back, <span className="font-medium text-gray-700">{user.name}</span> — here's your decision overview for today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-gray-400" />
          <Select value={dept} onValueChange={setDept}>
            <SelectTrigger className="w-56 h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DEPARTMENTS.map((d) => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ── 2. KPI Row ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Decisions Made */}
        <Card className="rounded-xl border border-border bg-white shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-500   uppercase tracking-wide">Decisions Made</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.decisions}</p>
                <p className="text-xs text-emerald-600 mt-1">+3 from last month</p>
              </div>
              <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-[#008755]" />
              </div>
            </div>
            <p className="text-[11px] text-gray-400 mt-2">This month</p>
          </CardContent>
        </Card>

        {/* Ideas in Pipeline */}
        <Card className="rounded-xl border border-border bg-white shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-500   uppercase tracking-wide">Ideas in Pipeline</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.pipeline}</p>
                <p className="text-xs text-blue-600 mt-1">2 converted to project</p>
              </div>
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-[11px] text-gray-400 mt-2">Active stages</p>
          </CardContent>
        </Card>

        {/* Avg Decision Time */}
        <Card className="rounded-xl border border-border bg-white shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-500   uppercase tracking-wide">Avg Decision Time</p>
                <p className={cn('text-3xl font-bold mt-1', stats.avgDays > 3 ? 'text-amber-600' : 'text-gray-900')}>
                  {stats.avgDays}d
                </p>
                <p className={cn('text-xs mt-1', stats.avgDays > 3 ? 'text-amber-600' : 'text-emerald-600')}>
                  {stats.avgDays > 3 ? `${(stats.avgDays - 3).toFixed(1)}d above target` : 'On target'}
                </p>
              </div>
              <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-500" />
              </div>
            </div>
            <p className="text-[11px] text-gray-400 mt-2">Target: ≤3 days</p>
          </CardContent>
        </Card>

        {/* Pending Decisions */}
        <Card className="rounded-xl border border-border bg-white shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-500   uppercase tracking-wide">Pending Decisions</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-3xl font-bold text-gray-900">{stats.pending}</p>
                  {stats.overdue > 0 && (
                    <span className="text-xs font-semibold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                      {stats.overdue} overdue
                    </span>
                  )}
                </div>
                <p className="text-xs text-red-600 mt-1">
                  {stats.overdue > 0 ? `${stats.overdue} past SLA` : 'All within SLA'}
                </p>
              </div>
              <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
            </div>
            <p className="text-[11px] text-gray-400 mt-2">Require your action</p>
          </CardContent>
        </Card>
      </div>

      {/* ── 3. Alerts Strip ────────────────────────────────────────────────── */}
      {alertVisible && (
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
          <p className="text-sm text-amber-800 flex-1">
            <span className="font-semibold">2 ideas have been waiting &gt;7 days</span> for a decision ·{' '}
            <span className="font-semibold text-red-700">1 idea is SLA-breached</span> ·{' '}
            1 high-potential idea needs your immediate attention
          </p>
          <button
            onClick={() => setAlertVisible(false)}
            className="text-amber-500 hover:text-amber-700 transition-colors shrink-0"
            aria-label="Dismiss alert"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ── 4. Needs Decision Queue ────────────────────────────────────────── */}
      <Card className="rounded-xl border border-border bg-white shadow-sm">
        <CardHeader className="pb-2 pt-3 px-3">
          <div className="flex items-center gap-2">
            <CardTitle className="text-sm   font-semibold text-gray-900">
              Needs Your Decision
            </CardTitle>
            <span className="text-xs font-bold bg-[#008755] text-white px-2 py-0.5 rounded-full">
              {pendingIdeas.length}
            </span>
          </div>
        </CardHeader>
        <CardContent className="px-3 pb-3 space-y-3">
          {pendingIdeas.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-6">All caught up — no ideas awaiting decision.</p>
          )}
          {ideas.map((idea) => {
            const ai = aiRecStyle(idea.aiRec);
            const daysColor = idea.days > 7 ? 'text-red-600 bg-red-50' : idea.days > 3 ? 'text-amber-600 bg-amber-50' : 'text-gray-500 bg-gray-100';
            const borderFlash =
              idea.status === 'approved'
                ? 'border-l-4 border-l-emerald-500 bg-emerald-50/30'
                : idea.status === 'rejected'
                ? 'border-l-4 border-l-red-400 bg-red-50/20 opacity-50'
                : idea.status === 'info-requested'
                ? 'border-l-4 border-l-blue-400 bg-blue-50/20 opacity-50'
                : 'border-l-4 border-l-transparent';

            return (
              <div
                key={idea.id}
                className={cn(
                  'flex flex-col gap-2 rounded-lg border border-gray-100 p-3 transition-all duration-300',
                  borderFlash
                )}
              >
                {/* Top: title + meta + tags */}
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2">
                    <p className="font-semibold text-sm text-gray-900 truncate">{idea.title}</p>
                    <p className="text-xs text-gray-500 shrink-0">{idea.submitter} · {idea.dept} · {idea.submitted}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    <span className={cn('text-[11px] font-medium px-2 py-0.5 rounded-full', fitColor(idea.strategicFit))}>
                      Strategic: {idea.strategicFit}
                    </span>
                    <span className={cn('text-[11px] font-medium px-2 py-0.5 rounded-full', effortColor(idea.effort))}>
                      Effort: {idea.effort}
                    </span>
                    <span className={cn('text-[11px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1', ai.cls)}>
                      <Sparkles className="w-3 h-3" />
                      AI: {idea.aiRec}
                    </span>
                    <span className={cn('text-[11px] font-medium px-2 py-0.5 rounded-full', daysColor)}>
                      {idea.days}d waiting
                    </span>
                  </div>
                </div>

                {/* Bottom: all actions in one row */}
                <div className="flex flex-wrap gap-2 items-center">
                  <Button
                    size="sm"
                    variant="outline"
                    className={cn(
                      'h-7 px-2.5 text-xs border-[#008755] text-[#008755] hover:bg-[#008755]/5',
                      evaluatingId === idea.id && 'bg-[#008755]/10'
                    )}
                    onClick={() => setEvaluatingId(prev => prev === idea.id ? null : idea.id)}
                  >
                    <ClipboardList className="w-3 h-3 mr-1" />
                    {evaluatingId === idea.id ? 'Close Eval' : 'Evaluate'}
                  </Button>
                  <Button
                    size="sm"
                    disabled={idea.status !== 'pending'}
                    onClick={() => handleApprove(idea.id)}
                    className="text-xs h-7 px-3 bg-[#008755] hover:bg-[#005844] text-white"
                  >
                    Approve for Feasibility
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={idea.status !== 'pending'}
                    onClick={() => handleRequestInfo(idea.id)}
                    className="text-xs h-7 px-3 border-blue-400 text-blue-700 hover:bg-blue-50"
                  >
                    Request More Info
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={idea.status !== 'pending'}
                    onClick={() => handleReject(idea.id)}
                    className="text-xs h-7 px-3 border-red-400 text-red-600 hover:bg-red-50"
                  >
                    Reject
                  </Button>

                  {/* Assign Owner */}
                  <div className="relative">
                    <button
                      onClick={() => setOwnerDropdown(ownerDropdown === idea.id ? null : idea.id)}
                      className="flex items-center gap-1.5 text-xs text-gray-600 border border-gray-200 rounded-md px-2 py-1 hover:bg-gray-50 transition-colors"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      {idea.assignedOwner ?? 'Assign Owner'}
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    {ownerDropdown === idea.id && (
                      <div className="absolute right-0 top-full mt-1 z-20 bg-white border border-gray-200 rounded-lg shadow-lg w-44 overflow-hidden">
                        {OWNERS.map((o) => (
                          <button
                            key={o}
                            onClick={() => assignOwner(idea.id, o)}
                            className="w-full text-left text-xs px-3 py-2 hover:bg-gray-50 transition-colors"
                          >
                            {o}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Evaluation panel */}
                {evaluatingId === idea.id && (
                  <EvaluationPanel
                    ideaId={idea.id}
                    ideaTitle={idea.title}
                    aiHints={deriveDirectorAiHints(idea.strategicFit, idea.effort, idea.aiRec)}
                    onConfirm={() => {
                      handleApprove(idea.id);
                      setEvaluatingId(null);
                    }}
                    onClose={() => setEvaluatingId(null)}
                  />
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* ── 5. High-Potential Ideas ────────────────────────────────────────── */}
      <div>
        <div className="mb-2">
          <h2 className="text-sm   font-semibold text-gray-900 flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            Flagged High-Potential
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">Ideas your team has starred as breakthrough opportunities.</p>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {HIGH_POTENTIAL.map((hp) => (
            <Card key={hp.id} className="rounded-xl border border-border bg-white shadow-sm shrink-0 w-60">
              <CardContent className="p-3">
                <div className="flex items-start justify-between mb-2">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                </div>
                <p className="font-semibold text-sm text-gray-900 leading-snug mb-2">{hp.title}</p>
                <div className="flex flex-wrap gap-1 mb-2">
                  <span className={cn('text-[10px] font-medium px-2 py-0.5 rounded-full', impactBadgeColor(hp.impact))}>
                    {hp.impact}
                  </span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                    {hp.dept}
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-snug mb-2">{hp.desc}</p>
                <button
                  onClick={() => onNavigate('pipeline')}
                  className="text-xs text-[#008755] font-semibold hover:text-[#005844] flex items-center gap-1 transition-colors"
                >
                  View in Pipeline <ArrowRight className="w-3 h-3" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* ── 6. Department Funnel ───────────────────────────────────────────── */}
      <Card className="rounded-xl border border-border bg-white shadow-sm">
        <CardHeader className="pb-2 pt-3 px-3">
          <CardTitle className="text-sm   font-semibold text-gray-900">
            Innovation Funnel — {dept}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 pb-3">
          {/* Funnel bars */}
          <div className="flex items-end gap-1 h-20 mb-1">
            {funnelStages.map((stage, i) => {
              const heightPct = (stage.count / funnelStages[0].count) * 100;
              const color = FUNNEL_COLORS[i];
              return (
                <div key={stage.label} className="flex flex-col items-center flex-1 h-full justify-end">
                  {/* Arrow between stages */}
                  {i > 0 && (
                    <div className="absolute" />
                  )}
                  <div
                    className="w-full rounded-t-md flex flex-col items-center justify-center transition-all duration-500"
                    style={{ height: `${Math.max(heightPct, 20)}%`, backgroundColor: color }}
                  >
                    <span className="text-white font-bold text-lg leading-none">{stage.count}</span>
                    <span className="text-white text-[10px] mt-0.5 opacity-80">
                      {Math.round((stage.count / funnelStages[0].count) * 100)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Arrows row */}
          <div className="flex items-center">
            {funnelStages.map((stage, i) => (
              <div key={stage.label} className="flex-1 flex flex-col items-center">
                <p className="text-[11px] text-gray-600 font-medium text-center leading-tight">{stage.label}</p>
                {i < funnelStages.length - 1 && (
                  <ArrowRight className="w-3 h-3 text-gray-300 absolute" style={{ display: 'none' }} />
                )}
              </div>
            ))}
          </div>

          {/* Arrows visual between labels */}
          <div className="flex items-center mt-1 mb-2">
            {funnelStages.map((_, i) => (
              <div key={i} className="flex-1 flex items-center justify-center">
                {i < funnelStages.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-gray-300" />
                )}
              </div>
            ))}
          </div>

          {/* Stuck alert */}
          <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-800">
              <span className="font-semibold">Where it's getting stuck:</span> {drop}% drop between Under Review and Director Review — {waiting} ideas waiting at this stage.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ── 7. Two-column bottom row ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
        {/* Recent Ideas Table (60%) */}
        <Card className="rounded-xl border border-border bg-white shadow-sm lg:col-span-3">
          <CardHeader className="pb-2 pt-3 px-3">
            <CardTitle className="text-sm   font-semibold text-gray-900">
              Recent Ideas by Status
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-3">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-xs text-gray-500 font-medium pb-2">Title</th>
                    <th className="text-left text-xs text-gray-500 font-medium pb-2">Department</th>
                    <th className="text-left text-xs text-gray-500 font-medium pb-2">Status</th>
                    <th className="text-left text-xs text-gray-500 font-medium pb-2">Days</th>
                    <th className="text-left text-xs text-gray-500 font-medium pb-2"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {RECENT_IDEAS.map((ri, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-2 pr-3">
                        <p className="text-xs font-medium text-gray-800 max-w-[160px] truncate">{ri.title}</p>
                      </td>
                      <td className="py-2 pr-3">
                        <p className="text-xs text-gray-500 max-w-[120px] truncate">{ri.dept}</p>
                      </td>
                      <td className="py-2 pr-3">
                        <span className={cn('text-[10px] font-medium px-2 py-0.5 rounded-full', statusBadge(ri.status))}>
                          {ri.status}
                        </span>
                      </td>
                      <td className="py-2 pr-3">
                        <span className={cn('text-xs', ri.days > 7 ? 'text-red-500 font-semibold' : 'text-gray-500')}>
                          {ri.days}d
                        </span>
                      </td>
                      <td className="py-2">
                        <button
                          onClick={() => onNavigate('ideas')}
                          className="text-[11px] text-[#008755] hover:underline font-medium"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Impact Area Distribution (40%) */}
        <Card className="rounded-xl border border-border bg-white shadow-sm lg:col-span-2">
          <CardHeader className="pb-2 pt-3 px-3">
            <CardTitle className="text-sm   font-semibold text-gray-900">
              Impact Area Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="px-2 pb-3">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                layout="vertical"
                data={IMPACT_DATA}
                margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis
                  type="category"
                  dataKey="area"
                  tick={{ fontSize: 10 }}
                  width={130}
                />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} fill="#008755" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* ── 8. AI Assistant ────────────────────────────────────────────────── */}
      <Card className="rounded-xl border border-border bg-white shadow-sm">
        <CardHeader
          className="pb-2 pt-3 px-3 cursor-pointer select-none"
          onClick={() => setAiOpen((v) => !v)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#008755]/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#008755]" />
              </div>
              <CardTitle className="text-sm   font-semibold text-gray-900">
                Ask about your pipeline
              </CardTitle>
            </div>
            {aiOpen ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </div>
        </CardHeader>

        {aiOpen && (
          <CardContent className="px-3 pb-3 space-y-3">
            {/* Chat history */}
            {chatHistory.length > 0 && (
              <div className="max-h-48 overflow-y-auto space-y-2 rounded-lg bg-gray-50 border border-gray-100 p-3">
                {chatHistory.map((msg, idx) => (
                  <div
                    key={idx}
                    className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}
                  >
                    <div
                      className={cn(
                        'max-w-[80%] rounded-xl px-3 py-2 text-xs leading-relaxed whitespace-pre-line',
                        msg.role === 'user'
                          ? 'bg-[#008755] text-white rounded-br-none'
                          : 'bg-white border border-gray-200 text-gray-700 rounded-bl-none'
                      )}
                    >
                      {msg.role === 'ai' && (
                        <span className="flex items-center gap-1 text-[10px] font-semibold text-[#008755] mb-1">
                          <Sparkles className="w-3 h-3" /> AI Assistant
                        </span>
                      )}
                      {msg.content}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
            )}

            {/* Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Ask a question about your ideas pipeline…"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleAiSend(); }}
                className="text-sm h-9 flex-1"
              />
              <Button
                size="sm"
                onClick={handleAiSend}
                className="h-9 px-3 bg-[#008755] hover:bg-[#005844] text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>

            {/* Prompt chips */}
            <div className="flex flex-wrap gap-2">
              {[
                'Which ideas have the most strategic alignment?',
                'Show me overdue decisions',
                "What's blocking the funnel this month?",
              ].map((chip) => (
                <button
                  key={chip}
                  onClick={() => handlePromptChip(chip)}
                  className="text-xs px-3 py-1.5 rounded-full border border-[#008755]/30 text-[#008755] bg-[#008755]/5 hover:bg-[#008755]/10 transition-colors font-medium"
                >
                  {chip}
                </button>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
