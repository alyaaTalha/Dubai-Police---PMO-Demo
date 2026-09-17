import { useState } from 'react';
import {
  Archive, Search, Filter, ChevronDown, ChevronUp, CheckCircle2,
  Clock, AlertTriangle, Repeat2, DollarSign, Ban, Layers, Send,
  ExternalLink,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { cn } from '../../ui/utils';

// ── Types ──────────────────────────────────────────────────────────────────────
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

type RejectionReason = 'Duplicate' | 'Cost' | 'No Need' | 'Technology' | 'Out of Scope';

interface VaultIdea {
  id: number;
  title: string;
  submitter: string;
  dept: string;
  reason: RejectionReason;
  date: string;
  note: string;
  feasible: boolean;
}

// ── Rejection reason colour map ────────────────────────────────────────────────
const REASON_STYLES: Record<RejectionReason, string> = {
  Duplicate:     'bg-purple-100 text-purple-700',
  Cost:          'bg-red-100 text-red-700',
  'No Need':     'bg-gray-100 text-gray-700',
  Technology:    'bg-amber-100 text-amber-700',
  'Out of Scope':'bg-blue-100 text-blue-700',
};

const REASON_ICONS: Record<RejectionReason, React.ReactNode> = {
  Duplicate:     <Repeat2 className="h-3 w-3" />,
  Cost:          <DollarSign className="h-3 w-3" />,
  'No Need':     <Ban className="h-3 w-3" />,
  Technology:    <AlertTriangle className="h-3 w-3" />,
  'Out of Scope':<Layers className="h-3 w-3" />,
};

// ── Mock data ──────────────────────────────────────────────────────────────────
const VAULT_IDEAS: VaultIdea[] = [
  {
    id: 1,
    title: 'Drone Delivery for Emergency Medical Kits',
    submitter: 'Omar Al Zaabi',
    dept: 'Operations',
    reason: 'Technology',
    date: 'Mar 2024',
    note: 'Regulatory airspace approval not yet available from the GCAA at the time of submission.',
    feasible: true,
  },
  {
    id: 2,
    title: 'AI-Powered Body Camera Analysis',
    submitter: 'Saeed Al Ketbi',
    dept: 'Legal Affairs',
    reason: 'Cost',
    date: 'Jan 2024',
    note: 'Infrastructure cost exceeded available budget by 4x; vendor quotes were not within procurement thresholds.',
    feasible: false,
  },
  {
    id: 3,
    title: 'Blockchain Evidence Chain of Custody',
    submitter: 'Mariam Al Suwaidi',
    dept: 'Legal Affairs',
    reason: 'Technology',
    date: 'Feb 2024',
    note: 'Integration with legacy CCTV systems and case management software was not feasible at the time of review.',
    feasible: true,
  },
  {
    id: 4,
    title: 'Community Volunteer Patrol Network',
    submitter: 'Hessa Al Blooshi',
    dept: 'Community Affairs',
    reason: 'No Need',
    date: 'Dec 2023',
    note: 'Existing neighbourhood watch programs already cover this scope across all targeted districts.',
    feasible: false,
  },
  {
    id: 5,
    title: 'Automated License Plate Fine System',
    submitter: 'Fatima Al Mansoori',
    dept: 'Digital Transformation',
    reason: 'Duplicate',
    date: 'Nov 2023',
    note: 'Duplicates the existing Saher system already deployed city-wide and managed by the Roads Authority.',
    feasible: false,
  },
  {
    id: 6,
    title: 'AR Training Simulations for Officers',
    submitter: 'Omar Al Zaabi',
    dept: 'HR & Training',
    reason: 'Cost',
    date: 'Oct 2023',
    note: 'Hardware procurement and annual licensing cost was 3.2M AED — above the departmental ceiling for that cycle.',
    feasible: true,
  },
  {
    id: 7,
    title: 'Social Media Sentiment Monitoring Dashboard',
    submitter: 'Fatima Al Mansoori',
    dept: 'Digital Transformation',
    reason: 'Out of Scope',
    date: 'Sep 2023',
    note: 'Falls under the Communications & Media department jurisdiction and was redirected accordingly.',
    feasible: false,
  },
  {
    id: 8,
    title: 'Smart Parking Enforcement Robots',
    submitter: 'Saeed Al Ketbi',
    dept: 'Operations',
    reason: 'Technology',
    date: 'Aug 2023',
    note: 'Hardware reliability in extreme summer heat conditions was not proven by any manufacturer at review time.',
    feasible: true,
  },
  {
    id: 9,
    title: 'Centralized Lost Property Digital Platform',
    submitter: 'Hessa Al Blooshi',
    dept: 'Community Affairs',
    reason: 'Duplicate',
    date: 'Jul 2023',
    note: 'A similar platform was already under active development by the IT department and scheduled for Q1 release.',
    feasible: false,
  },
  {
    id: 10,
    title: 'AI-Assisted Shift Scheduling',
    submitter: 'Mariam Al Suwaidi',
    dept: 'HR & Training',
    reason: 'Cost',
    date: 'Jun 2023',
    note: 'Vendor pricing was out of budget at the time; newer open-source alternatives with comparable features now exist.',
    feasible: true,
  },
  {
    id: 11,
    title: 'Mobile Station Rapid Deployment Units',
    submitter: 'Omar Al Zaabi',
    dept: 'Operations',
    reason: 'No Need',
    date: 'May 2023',
    note: 'Field assessment and incident density analysis showed insufficient demand in the originally targeted areas.',
    feasible: false,
  },
  {
    id: 12,
    title: 'QR-Based Public Tip Submission System',
    submitter: 'Fatima Al Mansoori',
    dept: 'Digital Transformation',
    reason: 'Duplicate',
    date: 'Apr 2023',
    note: 'Fully covered by the existing Aman app public tip feature, which already supports QR-triggered submissions.',
    feasible: false,
  },
];

const ALL_DEPTS = Array.from(new Set(VAULT_IDEAS.map((i) => i.dept))).sort();
const ALL_REASONS: RejectionReason[] = ['Duplicate', 'Cost', 'No Need', 'Technology', 'Out of Scope'];

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  accent: string;
}) {
  return (
    <Card className="rounded-xl border border-border bg-white shadow-sm">
      <CardContent className="p-4 flex items-center gap-3">
        <div className={cn('h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0', accent)}>
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900  ">
            {value}
          </p>
          <p className="text-xs text-gray-500   leading-tight">
            {label}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Vault Idea Card ────────────────────────────────────────────────────────────
function VaultIdeaCard({
  idea,
  onRecommend,
  isRecommended,
}: {
  idea: VaultIdea;
  onRecommend: (id: number) => void;
  isRecommended: boolean;
}) {
  return (
    <Card
      className={cn(
        'rounded-xl border bg-white shadow-sm flex flex-col transition-all duration-200',
        isRecommended
          ? 'border-[#008755] ring-1 ring-[#008755]/30'
          : 'border-border hover:shadow-md',
      )}
    >
      <CardContent className="p-4 flex flex-col gap-3 flex-1">
        {/* Top badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium font-["Dubai:Medium",_sans-serif]',
              REASON_STYLES[idea.reason],
            )}
          >
            {REASON_ICONS[idea.reason]}
            {idea.reason}
          </span>
          {idea.feasible && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700  ">
              <CheckCircle2 className="h-3 w-3" />
              Now Feasible
            </span>
          )}
          {isRecommended && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-[#008755]/10 text-[#008755]  ">
              <CheckCircle2 className="h-3 w-3" />
              Recommended
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-900   leading-snug">
          {idea.title}
        </h3>

        {/* Meta */}
        <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-xs text-gray-500">
          <span className="font-medium text-gray-700">{idea.submitter}</span>
          <span>·</span>
          <span>{idea.dept}</span>
          <span>·</span>
          <span className="inline-flex items-center gap-0.5">
            <Clock className="h-3 w-3" />
            Archived {idea.date}
          </span>
        </div>

        {/* Archive note */}
        <p className="text-xs text-gray-500 leading-relaxed border-l-2 border-gray-200 pl-2 italic">
          {idea.note}
        </p>

        {/* Action row */}
        <div className="flex items-center justify-between pt-1 mt-auto">
          {isRecommended ? (
            <span className="text-xs text-[#008755] font-medium   inline-flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Added to queue
            </span>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="h-7 px-3 text-xs border-[#008755] text-[#008755] hover:bg-[#008755]/10  "
              onClick={() => onRecommend(idea.id)}
            >
              Recommend Reconsideration
            </Button>
          )}
          <Button
            size="sm"
            variant="ghost"
            className="h-7 px-2 text-xs text-gray-500 hover:text-[#008755] hover:bg-[#008755]/10 gap-1"
          >
            View Details
            <ExternalLink className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Reconsideration Queue Entry ────────────────────────────────────────────────
function QueueEntry({
  idea,
  note,
  onNoteChange,
  submitted,
  onSubmit,
}: {
  idea: VaultIdea;
  note: string;
  onNoteChange: (val: string) => void;
  submitted: boolean;
  onSubmit: () => void;
}) {
  return (
    <div
      className={cn(
        'rounded-xl border p-4 flex flex-col gap-3 transition-all duration-200',
        submitted
          ? 'border-[#008755]/40 bg-[#008755]/5'
          : 'border-border bg-white',
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-gray-900  ">
            {idea.title}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            {idea.submitter} · {idea.dept} · Archived {idea.date}
          </p>
        </div>
        <span
          className={cn(
            'shrink-0 px-2 py-0.5 rounded-full text-xs font-medium font-["Dubai:Medium",_sans-serif]',
            REASON_STYLES[idea.reason],
          )}
        >
          {idea.reason}
        </span>
      </div>

      {submitted ? (
        <div className="flex items-center gap-2 text-sm text-[#008755]  ">
          <CheckCircle2 className="h-4 w-4" />
          Submitted to Director for review
        </div>
      ) : (
        <>
          <textarea
            className="w-full rounded-lg border border-border bg-gray-50 px-3 py-2 text-xs text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-[#008755]/30  "
            rows={2}
            value={note}
            onChange={(e) => onNoteChange(e.target.value)}
            placeholder="Add a note explaining why this idea should be reconsidered…"
          />
          <div className="flex justify-end">
            <Button
              size="sm"
              className="h-8 px-4 bg-[#008755] hover:bg-[#005844] text-white text-xs gap-1.5  "
              onClick={onSubmit}
            >
              <Send className="h-3.5 w-3.5" />
              Submit to Director
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export function IdeaVaultPage({ user, role, onNavigate }: PageProps) {
  // Filter state
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [reasonFilter, setReasonFilter] = useState('all');
  const [feasibleOnly, setFeasibleOnly] = useState(false);

  // Per-card recommend state
  const [recommended, setRecommended] = useState<Set<number>>(new Set());

  // Per-card reconsideration notes
  const [queueNotes, setQueueNotes] = useState<Record<number, string>>(() =>
    Object.fromEntries(VAULT_IDEAS.map((i) => [i.id, 'Worth revisiting — conditions have changed.'])),
  );

  // Submitted to director
  const [submitted, setSubmitted] = useState<Set<number>>(new Set());

  // Queue open/closed
  const [queueOpen, setQueueOpen] = useState(false);

  const recommendedList = VAULT_IDEAS.filter((i) => recommended.has(i.id));

  const handleRecommend = (id: number) => {
    setRecommended((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    if (!queueOpen) {
      // auto-open queue when something is added
      setQueueOpen(true);
    }
  };

  const handleNoteChange = (id: number, val: string) => {
    setQueueNotes((prev) => ({ ...prev, [id]: val }));
  };

  const handleSubmit = (id: number) => {
    setSubmitted((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  // Filtered ideas
  const filtered = VAULT_IDEAS.filter((idea) => {
    if (feasibleOnly && !idea.feasible) return false;
    if (deptFilter !== 'all' && idea.dept !== deptFilter) return false;
    if (reasonFilter !== 'all' && idea.reason !== reasonFilter) return false;
    if (
      search.trim() &&
      !idea.title.toLowerCase().includes(search.toLowerCase()) &&
      !idea.submitter.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="p-4 flex flex-col gap-5 min-h-full">

      {/* ── Header row ──────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#008755]/10 flex items-center justify-center">
            <Archive className="h-5 w-5 text-[#008755]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900   leading-tight">
              Idea Vault
            </h1>
            <p className="text-xs text-gray-500  ">
              Previously rejected or archived ideas — revisit when the time is right.
            </p>
          </div>
        </div>

        <Button
          variant={feasibleOnly ? 'default' : 'outline'}
          size="sm"
          className={cn(
            'h-8 px-4 text-xs font-["Dubai:Medium",_sans-serif] gap-1.5 transition-all',
            feasibleOnly
              ? 'bg-[#008755] hover:bg-[#005844] text-white border-[#008755]'
              : 'border-[#008755] text-[#008755] hover:bg-[#008755]/10',
          )}
          onClick={() => setFeasibleOnly((v) => !v)}
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          Now Feasible Only
        </Button>
      </div>

      {/* ── Stats row ───────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          label="Total Archived"
          value={47}
          icon={<Archive className="h-5 w-5 text-gray-600" />}
          accent="bg-gray-100"
        />
        <StatCard
          label="Duplicate Removed"
          value={12}
          icon={<Repeat2 className="h-5 w-5 text-purple-600" />}
          accent="bg-purple-100"
        />
        <StatCard
          label="Cost / Resource Issues"
          value={18}
          icon={<DollarSign className="h-5 w-5 text-red-600" />}
          accent="bg-red-100"
        />
        <StatCard
          label="Recommended for Reconsideration"
          value={6}
          icon={<CheckCircle2 className="h-5 w-5 text-[#008755]" />}
          accent="bg-[#008755]/10"
        />
      </div>

      {/* ── Filter bar ──────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <Input
            className="pl-9 h-9 text-sm rounded-lg border-border focus-visible:ring-[#008755]"
            placeholder="Search ideas or submitters…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Select value={deptFilter} onValueChange={setDeptFilter}>
          <SelectTrigger className="h-9 w-[170px] text-xs rounded-lg border-border focus:ring-[#008755]">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {ALL_DEPTS.map((d) => (
              <SelectItem key={d} value={d}>{d}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={reasonFilter} onValueChange={setReasonFilter}>
          <SelectTrigger className="h-9 w-[170px] text-xs rounded-lg border-border focus:ring-[#008755]">
            <SelectValue placeholder="Rejection Reason" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Reasons</SelectItem>
            {ALL_REASONS.map((r) => (
              <SelectItem key={r} value={r}>{r}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <button
          onClick={() => setFeasibleOnly((v) => !v)}
          className={cn(
            'h-9 px-3 rounded-lg text-xs font-medium border font-["Dubai:Medium",_sans-serif] transition-all flex items-center gap-1.5',
            feasibleOnly
              ? 'bg-[#008755] text-white border-[#008755]'
              : 'border-border text-gray-600 hover:border-[#008755] hover:text-[#008755]',
          )}
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          Now Feasible
        </button>

        {(search || deptFilter !== 'all' || reasonFilter !== 'all' || feasibleOnly) && (
          <span className="text-xs text-gray-400">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* ── Vault grid ──────────────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400 gap-2">
          <Archive className="h-10 w-10 opacity-30" />
          <p className="text-sm  ">No archived ideas match your filters.</p>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-[#008755] hover:bg-[#008755]/10"
            onClick={() => {
              setSearch('');
              setDeptFilter('all');
              setReasonFilter('all');
              setFeasibleOnly(false);
            }}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((idea) => (
            <VaultIdeaCard
              key={idea.id}
              idea={idea}
              onRecommend={handleRecommend}
              isRecommended={recommended.has(idea.id)}
            />
          ))}
        </div>
      )}

      {/* ── Reconsideration Queue ───────────────────────────────────────────── */}
      <div className="rounded-xl border border-border bg-white shadow-sm overflow-hidden">
        <button
          className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
          onClick={() => setQueueOpen((v) => !v)}
        >
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-[#008755]/10 flex items-center justify-center">
              <Send className="h-4 w-4 text-[#008755]" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-900  ">
                Reconsideration Queue
              </p>
              <p className="text-xs text-gray-500  ">
                {recommendedList.length === 0
                  ? 'No ideas recommended yet — use the cards above to add.'
                  : `${recommendedList.length} idea${recommendedList.length !== 1 ? 's' : ''} pending review`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {recommendedList.length > 0 && (
              <span className="h-5 min-w-5 px-1.5 rounded-full bg-[#008755] text-white text-xs font-bold flex items-center justify-center  ">
                {recommendedList.length}
              </span>
            )}
            {queueOpen ? (
              <ChevronUp className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-400" />
            )}
          </div>
        </button>

        {queueOpen && (
          <div className="border-t border-border px-5 py-4">
            {recommendedList.length === 0 ? (
              <div className="flex flex-col items-center py-8 text-gray-400 gap-2">
                <CheckCircle2 className="h-8 w-8 opacity-30" />
                <p className="text-sm  ">
                  The queue is empty. Click "Recommend Reconsideration" on any archived idea above.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {recommendedList.map((idea) => (
                  <QueueEntry
                    key={idea.id}
                    idea={idea}
                    note={queueNotes[idea.id]}
                    onNoteChange={(val) => handleNoteChange(idea.id, val)}
                    submitted={submitted.has(idea.id)}
                    onSubmit={() => handleSubmit(idea.id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
