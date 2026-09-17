import { useState } from 'react';
import { toast } from 'sonner';
import {
  CheckCircle2, XCircle, ArrowRight, Sparkles, AlertCircle, Clock,
  Users, Zap, FolderKanban, GitBranch, Star, MessageSquare,
  ChevronDown, ChevronUp,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Progress } from '../../ui/progress';
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

export interface IdeaOriginProject {
  id: string;
  title: string;
  department: string;
  submitter: string;
  priority: string;
  targetQuarter: string;
  type: 'Project' | 'Initiative';
  ideaId: number;
  convertedAt: string;
  strategicFit: string;
  impactArea: string;
}

interface PageProps {
  user: User;
  role: IdeasRole;
  onNavigate: (id: string) => void;
  onConvertToProject?: (project: IdeaOriginProject) => void;
  onNavigateToPortfolio?: () => void;
}

// ── Data ───────────────────────────────────────────────────────────────────────
const OPPORTUNITIES = [
  {
    id: 1,
    cluster: 'Smart Operations Cluster',
    ideas: ['AI Patrol Scheduling', 'Predictive Fleet Maintenance', 'Smart Shift Planner', 'Drone Emergency Kit'],
    readiness: 87,
    dept: 'Operations',
    note: 'These four ideas share a core AI-dispatch theme and have complementary implementation paths.',
    ideaSubmitters: ['KA', 'MR', 'SA', 'FL'],
  },
  {
    id: 2,
    cluster: 'Customer Experience Cluster',
    ideas: ['Smart Queue Management', 'Real-Time Wait Times', 'Community Feedback Loop'],
    readiness: 92,
    dept: 'Community Affairs',
    note: 'All three target front-desk service bottlenecks with proven technology.',
    ideaSubmitters: ['FM', 'HB', 'SA'],
  },
  {
    id: 3,
    cluster: 'Digital Evidence Cluster',
    ideas: ['Paperless Evidence Management', 'Smart Evidence Tagging', 'Blockchain Evidence Chain'],
    readiness: 74,
    dept: 'Legal Affairs',
    note: 'Strong strategic alignment but technology readiness needs assessment.',
    ideaSubmitters: ['MS', 'OZ', 'KA'],
  },
  {
    id: 4,
    cluster: 'HR Innovation Cluster',
    ideas: ['Digital Training Badges', 'AR Training Simulations', 'Mobile Learning Platform'],
    readiness: 68,
    dept: 'HR & Training',
    note: 'Coordinator recommends phased implementation — badges first.',
    ideaSubmitters: ['SK', 'FL', 'MR'],
  },
  {
    id: 5,
    cluster: 'Process Automation Cluster',
    ideas: ['Smart Queue Management', 'E-Grievance Tracker', 'Mobile Field Reports'],
    readiness: 81,
    dept: 'Digital Transformation',
    note: 'Clear operational wins, low effort, high strategic fit.',
    ideaSubmitters: ['FM', 'HB', 'OZ'],
  },
];

const APPROVED_IDEAS = [
  { id: 1, title: 'Smart Queue Management at Service Centers', submitter: 'Fatima Al Mansoori', dept: 'Digital Transformation', approved: 'Jun 15, 2025', fit: 'High', impact: 'Customer Experience', aiNote: 'Aligns with 3 strategic pillars. Quick win.' },
  { id: 2, title: 'Digital Training Badge System', submitter: 'Saeed Al Ketbi', dept: 'HR & Training', approved: 'Jun 12, 2025', fit: 'High', impact: 'Productivity', aiNote: 'High ROI potential. Low implementation risk.' },
  { id: 3, title: 'Smart Evidence Tagging System', submitter: 'Mariam Al Suwaidi', dept: 'Legal Affairs', approved: 'Jun 10, 2025', fit: 'High', impact: 'Operational Efficiency', aiNote: 'Reduces case processing time by est. 30%.' },
  { id: 4, title: 'Community Feedback Loop Automation', submitter: 'Hessa Al Blooshi', dept: 'Community Affairs', approved: 'Jun 8, 2025', fit: 'High', impact: 'Customer Experience', aiNote: 'Direct link to customer satisfaction KPI.' },
  { id: 5, title: 'Mobile Field Report Digitization', submitter: 'Saeed Al Ketbi', dept: 'HR & Training', approved: 'Jun 5, 2025', fit: 'Medium', impact: 'Operational Efficiency', aiNote: 'Eliminates 2.5 hrs of manual data entry daily.' },
  { id: 6, title: 'Real-Time Wait Times Display', submitter: 'Hessa Al Blooshi', dept: 'Community Affairs', approved: 'May 28, 2025', fit: 'High', impact: 'Customer Experience', aiNote: 'Already piloted in 2 service centers.' },
  { id: 7, title: 'AI-Assisted Vehicle Inspection Reports', submitter: 'Omar Al Zaabi', dept: 'Operations', approved: 'May 25, 2025', fit: 'Medium', impact: 'Safety & Security', aiNote: 'Moderate complexity. Needs IT integration plan.' },
  { id: 8, title: 'E-Grievance Resolution Tracker', submitter: 'Fatima Al Mansoori', dept: 'Digital Transformation', approved: 'May 20, 2025', fit: 'Low', impact: 'Customer Experience', aiNote: 'Addresses compliance requirement. Low risk.' },
];

const RECENTLY_CONVERTED = [
  { title: 'Smart Queue Management', type: 'Project', dept: 'Digital Transformation', date: 'Jun 20, 2025', status: 'In Planning' },
  { title: 'AI Patrol Scheduling', type: 'Initiative', dept: 'Operations', date: 'Jun 15, 2025', status: 'Active' },
  { title: 'Real-Time Wait Times', type: 'Project', dept: 'Community Affairs', date: 'May 30, 2025', status: 'In Planning' },
];

const DEPARTMENTS = [
  'Operations', 'Community Affairs', 'Legal Affairs', 'HR & Training',
  'Digital Transformation', 'Finance', 'IT Services',
];

const QUARTERS = ['Q3 2025', 'Q4 2025', 'Q1 2026', 'Q2 2026'];

// ── Helper components ──────────────────────────────────────────────────────────
function InitialsAvatar({ initials, color = '#008755' }: { initials: string; color?: string }) {
  return (
    <span
      className="inline-flex items-center justify-center w-7 h-7 rounded-full text-white text-xs font-semibold flex-shrink-0"
      style={{ backgroundColor: color }}
    >
      {initials}
    </span>
  );
}

function FitBadge({ fit }: { fit: string }) {
  const colors: Record<string, string> = {
    High: 'bg-green-100 text-green-800 border-green-200',
    Medium: 'bg-amber-100 text-amber-800 border-amber-200',
    Low: 'bg-red-100 text-red-700 border-red-200',
  };
  return (
    <span className={cn('text-xs font-medium px-2 py-0.5 rounded border', colors[fit] ?? 'bg-gray-100 text-gray-700 border-gray-200')}>
      {fit} Fit
    </span>
  );
}

// ── Opportunity Card ───────────────────────────────────────────────────────────
function OpportunityCard({ opp, onConvertToProject, onNavigateToPortfolio }: {
  opp: typeof OPPORTUNITIES[number];
  onConvertToProject?: (project: IdeaOriginProject) => void;
  onNavigateToPortfolio?: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState<'pending' | 'validated' | 'rejected'>('pending');
  const [rejecting, setRejecting] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<string[]>([]);
  const [assignedDept, setAssignedDept] = useState('');

  const handleAccept = () => {
    setStatus('validated');
    setRejecting(false);
    const project: IdeaOriginProject = {
      id: `opp-${opp.id}-${Date.now()}`,
      title: opp.cluster,
      department: opp.dept,
      submitter: 'Coordinator',
      priority: 'High',
      targetQuarter: 'Q4 2025',
      type: 'Initiative',
      ideaId: opp.id,
      convertedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      strategicFit: 'High',
      impactArea: 'Operational Excellence',
    };
    onConvertToProject?.(project);
    toast.success('Opportunity validated & added to PMO', {
      description: `"${opp.cluster}" is now visible in Portfolio → Projects.`,
      duration: 8000,
      action: { label: 'View in Portfolio', onClick: () => onNavigateToPortfolio?.() },
    });
  };

  const handleRejectClick = () => {
    setRejecting(true);
  };

  const handleConfirmReject = () => {
    if (rejectReason.trim()) {
      setStatus('rejected');
      setRejecting(false);
    }
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      setComments(prev => [...prev, comment.trim()]);
      setComment('');
    }
  };

  const borderColor =
    status === 'validated' ? 'border-green-400 ring-1 ring-green-300' :
    status === 'rejected' ? 'border-red-300' :
    'border-border';

  return (
    <Card className={cn('rounded-xl bg-white shadow-sm transition-all duration-200', borderColor)}>
      {/* Header — always visible */}
      <button
        className="w-full text-left px-5 py-4 flex items-center gap-4"
        onClick={() => setExpanded(e => !e)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-semibold text-gray-900 text-sm font-['Dubai:Medium',_sans-serif]">
              {opp.cluster}
            </span>
            {status === 'validated' && (
              <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">Validated</Badge>
            )}
            {status === 'rejected' && (
              <Badge className="bg-red-100 text-red-700 border-red-200 text-xs">Rejected</Badge>
            )}
            {status === 'pending' && (
              <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs">Ready for Validation</Badge>
            )}
          </div>
          <div className="flex items-center gap-4 flex-wrap text-xs text-gray-500">
            <span className="flex items-center gap-1"><Users className="w-3 h-3" />{opp.ideas.length} ideas</span>
            <span>{opp.dept}</span>
            <div className="flex items-center gap-2">
              <span>Readiness</span>
              <div className="w-20 h-1.5 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${opp.readiness}%`, backgroundColor: opp.readiness >= 80 ? '#008755' : opp.readiness >= 70 ? '#f59e0b' : '#E4002B' }}
                />
              </div>
              <span className="font-medium text-gray-700">{opp.readiness}%</span>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 text-gray-400">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Body — expanded */}
      {expanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-gray-100">
          {/* Ideas list */}
          <div className="pt-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Related Ideas</p>
            <div className="space-y-2">
              {opp.ideas.map((idea, i) => (
                <div key={idea} className="flex items-center gap-2">
                  <InitialsAvatar initials={opp.ideaSubmitters[i] ?? 'XX'} />
                  <span className="text-sm text-gray-800">{idea}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Readiness breakdown */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Readiness Breakdown</p>
            <div className="space-y-2">
              {[
                { label: 'Strategic Fit', value: 92 },
                { label: 'Implementation Feasibility', value: 84 },
                { label: 'Resource Availability', value: 76 },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="text-xs text-gray-600 w-44 flex-shrink-0">{label}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#008755]"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-700 w-8 text-right">{value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Coordinator note */}
          <blockquote className="border-l-4 border-[#26D07C] pl-3 py-1 bg-green-50 rounded-r-lg">
            <p className="text-xs text-gray-700 italic">"{opp.note}"</p>
            <p className="text-xs text-gray-400 mt-1">— Coordinator Note</p>
          </blockquote>

          {/* Comments */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1">
              <MessageSquare className="w-3 h-3" /> Comments
            </p>
            {comments.length > 0 && (
              <div className="space-y-1 mb-2">
                {comments.map((c, i) => (
                  <div key={i} className="bg-gray-50 rounded px-3 py-1.5 text-xs text-gray-700">
                    {c}
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <textarea
                className="flex-1 text-xs border border-gray-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-[#008755]"
                rows={2}
                placeholder="Add a comment..."
                value={comment}
                onChange={e => setComment(e.target.value)}
              />
              <Button
                size="sm"
                variant="outline"
                className="self-end text-xs"
                onClick={handleAddComment}
              >
                Add
              </Button>
            </div>
          </div>

          {/* Reject reason inline */}
          {rejecting && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 space-y-2">
              <p className="text-xs font-semibold text-red-700">Rejection Reason (required)</p>
              <textarea
                className="w-full text-xs border border-red-200 rounded px-3 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-red-400"
                rows={2}
                placeholder="Explain why this opportunity is being rejected..."
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-white text-xs"
                  onClick={handleConfirmReject}
                  disabled={!rejectReason.trim()}
                >
                  Confirm Rejection
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-xs"
                  onClick={() => { setRejecting(false); setRejectReason(''); }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Action row */}
          {status === 'pending' && !rejecting && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Button
                size="sm"
                className="bg-[#008755] hover:bg-[#005844] text-white text-xs gap-1"
                onClick={handleAccept}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Accept Opportunity
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50 text-xs gap-1"
                onClick={handleRejectClick}
              >
                <XCircle className="w-3.5 h-3.5" />
                Reject
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-500 text-xs">
                Remove from Pipeline
              </Button>
              <Select value={assignedDept} onValueChange={setAssignedDept}>
                <SelectTrigger className="h-8 text-xs w-44">
                  <SelectValue placeholder="Assign Department" />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENTS.map(d => (
                    <SelectItem key={d} value={d} className="text-xs">{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {status === 'validated' && (
            <div className="flex items-center gap-2 text-green-700 text-sm font-medium">
              <CheckCircle2 className="w-4 h-4" />
              Opportunity accepted and validated
            </div>
          )}

          {status === 'rejected' && (
            <div className="flex items-center gap-2 text-red-600 text-sm font-medium">
              <XCircle className="w-4 h-4" />
              Opportunity rejected
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

// ── Approved Idea Card ─────────────────────────────────────────────────────────
type ConvertType = 'project' | 'initiative';

interface ConvertFormState {
  projectName: string;
  ownerDept: string;
  priority: string;
  targetQuarter: string;
}

function ApprovedIdeaCard({ idea, onConvertToProject, onNavigateToPortfolio }: { idea: typeof APPROVED_IDEAS[number]; onConvertToProject?: (p: IdeaOriginProject) => void; onNavigateToPortfolio?: () => void }) {
  const [converting, setConverting] = useState<ConvertType | null>(null);
  const [converted, setConverted] = useState<ConvertType | null>(null);
  const [form, setForm] = useState<ConvertFormState>({
    projectName: idea.title,
    ownerDept: idea.dept,
    priority: '',
    targetQuarter: '',
  });

  const handleConvertClick = (type: ConvertType) => {
    setConverting(type);
    setForm(f => ({ ...f, projectName: idea.title, ownerDept: idea.dept }));
  };

  const handleConfirm = () => {
    if (converting) {
      const type = converting === 'project' ? 'Project' : 'Initiative';
      setConverted(converting);
      setConverting(null);
      toast.success(`Idea converted to ${type}`, {
        description: `"${form.projectName}" has been added to the PMO Portfolio.`,
        duration: 8000,
        action: { label: 'View in Portfolio', onClick: () => onNavigateToPortfolio?.() },
      });
      onConvertToProject?.({
        id: `idea-${idea.id}-${Date.now()}`,
        title: form.projectName,
        department: form.ownerDept,
        submitter: idea.submitter,
        priority: form.priority || 'Medium',
        targetQuarter: form.targetQuarter || 'Q4 2025',
        type: converting === 'project' ? 'Project' : 'Initiative',
        ideaId: idea.id,
        convertedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        strategicFit: idea.fit,
        impactArea: idea.impact,
      });
    }
  };

  const handleCancel = () => {
    setConverting(null);
  };

  const isConverted = converted !== null;
  const fitColor =
    idea.fit === 'High' ? 'text-green-700 bg-green-100' :
    idea.fit === 'Medium' ? 'text-amber-700 bg-amber-100' :
    'text-red-700 bg-red-100';

  return (
    <Card
      className={cn(
        'rounded-xl border bg-white shadow-sm transition-all duration-300',
        isConverted
          ? 'border-[#008755] ring-2 ring-[#26D07C]/40 shadow-[0_0_12px_rgba(38,208,124,0.25)]'
          : 'border-border',
      )}
    >
      <CardContent className="p-4 space-y-3">
        {isConverted ? (
          /* Converted state overlay */
          <div className="flex flex-col items-center justify-center py-6 gap-3 text-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-[#008755]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#008755] font-['Dubai:Medium',_sans-serif]">
                Converted to {converted === 'project' ? 'Project' : 'Initiative'}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{idea.title}</p>
            </div>
          </div>
        ) : (
          <>
            {/* Main content row */}
            <div className="flex gap-4">
              {/* Left: idea info */}
              <div className="flex-1 min-w-0 space-y-2">
                <h3 className="text-sm font-semibold text-gray-900 leading-snug font-['Dubai:Medium',_sans-serif]">
                  {idea.title}
                </h3>
                <div className="text-xs text-gray-500 space-y-0.5">
                  <p>{idea.submitter} · {idea.dept}</p>
                  <p>Approved {idea.approved}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', fitColor)}>
                    {idea.fit} Fit
                  </span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                    {idea.impact}
                  </span>
                </div>
                <div className="flex items-start gap-1.5 bg-green-50 rounded-lg px-2.5 py-1.5">
                  <Sparkles className="w-3 h-3 text-[#008755] flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-green-800">{idea.aiNote}</p>
                </div>
              </div>

              {/* Right: CTA buttons */}
              <div className="flex flex-col gap-2 flex-shrink-0 justify-start pt-1">
                <Button
                  size="sm"
                  className="bg-[#008755] hover:bg-[#005844] text-white gap-1.5 text-xs font-semibold whitespace-nowrap h-9 px-3"
                  onClick={() => handleConvertClick('project')}
                >
                  <FolderKanban className="w-3.5 h-3.5" />
                  Convert to Project
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-[#008755] text-[#008755] hover:bg-green-50 gap-1.5 text-xs whitespace-nowrap h-8 px-3"
                  onClick={() => handleConvertClick('initiative')}
                >
                  <GitBranch className="w-3.5 h-3.5" />
                  Convert to Initiative
                </Button>
              </div>
            </div>

            {/* Inline conversion form */}
            {converting && (
              <div className="rounded-xl border border-[#008755]/30 bg-green-50/60 p-4 space-y-3 mt-1">
                <p className="text-xs font-semibold text-[#005844] uppercase tracking-wide">
                  Convert to {converting === 'project' ? 'Project' : 'Initiative'}
                </p>
                <div className="grid grid-cols-1 gap-2">
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">Project Name</label>
                    <Input
                      className="h-8 text-xs"
                      value={form.projectName}
                      onChange={e => setForm(f => ({ ...f, projectName: e.target.value }))}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">Owner Department</label>
                      <Select value={form.ownerDept} onValueChange={v => setForm(f => ({ ...f, ownerDept: v }))}>
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue placeholder="Department" />
                        </SelectTrigger>
                        <SelectContent>
                          {DEPARTMENTS.map(d => (
                            <SelectItem key={d} value={d} className="text-xs">{d}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">Priority</label>
                      <Select value={form.priority} onValueChange={v => setForm(f => ({ ...f, priority: v }))}>
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="High" className="text-xs">High</SelectItem>
                          <SelectItem value="Medium" className="text-xs">Medium</SelectItem>
                          <SelectItem value="Low" className="text-xs">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">Target Quarter</label>
                      <Select value={form.targetQuarter} onValueChange={v => setForm(f => ({ ...f, targetQuarter: v }))}>
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue placeholder="Quarter" />
                        </SelectTrigger>
                        <SelectContent>
                          {QUARTERS.map(q => (
                            <SelectItem key={q} value={q} className="text-xs">{q}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-1">
                  <Button
                    size="sm"
                    className="bg-[#008755] hover:bg-[#005844] text-white text-xs gap-1"
                    onClick={handleConfirm}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Confirm Conversion
                  </Button>
                  <button
                    className="text-xs text-gray-500 hover:text-gray-700 underline"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export function PipelinePage({ user, role, onNavigate, onConvertToProject, onNavigateToPortfolio }: PageProps) {
  return (
    <div className="p-4 space-y-6">
      {/* ── Header ── */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-['Dubai:Medium',_sans-serif]">
          Innovation Pipeline
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Validate opportunities and convert approved ideas into projects.
        </p>
      </div>

      {/* ── KPI Bar ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Awaiting Validation */}
        <Card className="rounded-xl border border-border bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1">Awaiting Validation</p>
                <p className="text-3xl font-bold text-gray-900">5</p>
                <p className="text-xs text-gray-400 mt-1">opportunities</p>
              </div>
              <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Approved, Ready to Convert — highlighted */}
        <Card className="rounded-xl border border-amber-300 bg-amber-50 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-amber-700 mb-1 font-medium">Ready to Convert</p>
                <p className="text-3xl font-bold text-amber-900">8</p>
                <p className="text-xs text-amber-600 mt-1">approved ideas</p>
              </div>
              <div className="w-9 h-9 rounded-lg bg-amber-200 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-amber-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Converted This Quarter */}
        <Card className="rounded-xl border border-border bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1">Converted This Quarter</p>
                <p className="text-3xl font-bold text-[#008755]">3</p>
                <div className="flex gap-2 mt-1">
                  <span className="text-xs text-gray-400 flex items-center gap-0.5">
                    <FolderKanban className="w-3 h-3" /> 2 Projects
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-0.5">
                    <GitBranch className="w-3 h-3" /> 1 Initiative
                  </span>
                </div>
              </div>
              <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-[#008755]" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Avg Time to Convert */}
        <Card className="rounded-xl border border-border bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1">Avg Time to Convert</p>
                <p className="text-3xl font-bold text-gray-900">6.2</p>
                <p className="text-xs text-gray-400 mt-1">days</p>
              </div>
              <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Section 2: Opportunities to Validate ── */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-gray-900 font-['Dubai:Medium',_sans-serif]">
            Coordinator-Flagged Opportunities
          </h2>
          <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs">5</Badge>
        </div>
        <div className="space-y-3">
          {OPPORTUNITIES.map(opp => (
            <OpportunityCard key={opp.id} opp={opp} onConvertToProject={onConvertToProject} onNavigateToPortfolio={onNavigateToPortfolio} />
          ))}
        </div>
      </section>

      {/* ── Section 3: Approved Ideas — Hero Section ── */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-base font-semibold text-gray-900 font-['Dubai:Medium',_sans-serif]">
            Approved Ideas — Ready to Convert to PMO
          </h2>
          <Badge className="bg-amber-100 text-amber-800 border-amber-300 text-xs font-semibold">
            8 awaiting conversion
          </Badge>
        </div>

        <Card className="rounded-xl border border-amber-200 bg-amber-50/50 shadow-sm">
          <CardContent className="p-4 space-y-4">
            {/* Helper banner */}
            <div className="flex items-center gap-2 bg-white rounded-lg border border-amber-200 px-3 py-2.5">
              <ArrowRight className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <p className="text-xs text-amber-800">
                <span className="font-semibold">Action required:</span> Click "Convert to Project" or "Convert to Initiative" on any card below to bridge it into the PMO system.
              </p>
            </div>

            {/* 2-column grid of idea cards */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
              {APPROVED_IDEAS.map(idea => (
                <ApprovedIdeaCard key={idea.id} idea={idea} onConvertToProject={onConvertToProject} onNavigateToPortfolio={onNavigateToPortfolio} />
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ── Section 4: Recently Converted (audit trail) ── */}
      <section className="space-y-3">
        <h2 className="text-base font-semibold text-gray-900 font-['Dubai:Medium',_sans-serif]">
          Recently Converted
        </h2>
        <Card className="rounded-xl border border-border bg-white shadow-sm">
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 rounded-t-xl">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Idea Title</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Converted To</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3 hidden sm:table-cell">Department</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3 hidden md:table-cell">Date</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {RECENTLY_CONVERTED.map((row, i) => (
                  <tr
                    key={row.title}
                    className={cn('border-b border-gray-50 hover:bg-gray-50/50 transition-colors', i === RECENTLY_CONVERTED.length - 1 && 'border-0')}
                  >
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-gray-900">{row.title}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        {row.type === 'Project'
                          ? <FolderKanban className="w-3.5 h-3.5 text-[#008755]" />
                          : <GitBranch className="w-3.5 h-3.5 text-blue-500" />
                        }
                        <span className={cn('text-xs font-medium', row.type === 'Project' ? 'text-[#008755]' : 'text-blue-600')}>
                          {row.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600 hidden sm:table-cell">{row.dept}</td>
                    <td className="px-4 py-3 text-xs text-gray-500 hidden md:table-cell">{row.date}</td>
                    <td className="px-4 py-3">
                      <Badge
                        className={cn(
                          'text-xs',
                          row.status === 'Active'
                            ? 'bg-green-100 text-green-800 border-green-200'
                            : 'bg-gray-100 text-gray-600 border-gray-200',
                        )}
                      >
                        {row.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
