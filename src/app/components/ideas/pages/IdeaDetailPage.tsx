import { useState } from 'react';
import {
  ArrowLeft, Building2, CalendarDays, Edit2, MessageSquare,
  Download, Paperclip, CheckCircle2, Circle, Clock, Sparkles,
  Star, Send, User as UserIcon, TrendingUp, Trophy, Info,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Textarea } from '../../ui/textarea';
import { cn } from '../../ui/utils';

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
  ideaId: string;
  user: User;
  role: IdeasRole;
  onNavigate: (id: string) => void;
}

// ── Status colour map ─────────────────────────────────────────────────────────
type StatusKey =
  | 'Implemented'
  | 'Approved'
  | 'Under Review'
  | 'Pending Initial Review'
  | 'Needs More Info'
  | 'Draft'
  | 'Grievance Filed';

const STATUS_STYLES: Record<StatusKey, string> = {
  'Implemented':            'bg-[#008755]/10 text-[#008755] border-transparent',
  'Approved':               'bg-[#26D07C]/10 text-[#005844] border-transparent',
  'Under Review':           'bg-amber-50 text-amber-700 border-transparent',
  'Pending Initial Review': 'bg-gray-100 text-gray-600 border-transparent',
  'Needs More Info':        'bg-orange-50 text-orange-700 border-transparent',
  'Draft':                  'bg-blue-50 text-blue-700 border-transparent',
  'Grievance Filed':        'bg-red-50 text-red-700 border-transparent',
};

// ── Timeline step type ────────────────────────────────────────────────────────
type StepState = 'completed' | 'active' | 'pending';
interface TimelineStep {
  label: string;
  state: StepState;
  timestamp?: string;
}

// ── Idea detail data ──────────────────────────────────────────────────────────
interface IdeaDetail {
  id: string;
  title: string;
  status: StatusKey;
  department: string;
  category: string;
  date: string;
  submittedBy: string;
  shortDescription: string;
  fullDescription: string;
  problemStatement: string;
  proposedSolution: string;
  beneficiaries: string;
  expectedBenefits: string;
  aiScore: number;
  alignmentPillars: string[];
  aiRecommendation: string;
  estimatedImpact: string;
  timeline: TimelineStep[];
  coordinatorNote?: string;
  reviewerQuestion?: string;
  impactStats?: { label: string; value: string }[];
}

const IDEA_DATA: Record<string, IdeaDetail> = {
  qi1: {
    id: 'qi1',
    title: 'AI Queue Management System',
    status: 'Under Review',
    department: 'Digital Transformation',
    category: 'Technology',
    date: 'Aug 2, 2025',
    submittedBy: 'Ahmed Al Mansouri',
    shortDescription:
      'An AI-driven system to reduce wait times at Dubai Police service centers using predictive analytics and real-time queue optimisation.',
    fullDescription:
      'The AI Queue Management System leverages machine learning to predict peak service periods, dynamically allocate staff resources, and provide citizens with accurate estimated wait times via a mobile app. The system integrates with existing CRM platforms and provides live dashboard visibility to station managers.',
    problemStatement:
      'Dubai Police service centers experience significant congestion during peak hours, leading to long wait times, reduced citizen satisfaction, and inefficient staff allocation. Manual queue management is reactive rather than predictive, resulting in avoidable delays.',
    proposedSolution:
      'Deploy a cloud-based AI queue management platform with IoT sensors at service counters, a citizen-facing mobile check-in app, and a real-time analytics dashboard. The system predicts footfall 30 minutes in advance and auto-schedules staff deployment accordingly.',
    beneficiaries:
      'Citizens visiting service centers, frontline service officers, station operations managers, and the Digital Transformation directorate.',
    expectedBenefits:
      'Reduce average wait time by 40%, increase citizen satisfaction index from 3.8 to 4.5/5, reduce peak-hour staffing overtime costs by 25%, and provide actionable footfall data for long-term capacity planning.',
    aiScore: 87,
    alignmentPillars: ['Digital Policing', 'Citizen Experience', 'Operational Excellence'],
    aiRecommendation:
      'This idea strongly aligns with the Dubai Police Smart Policing 2030 roadmap. High feasibility given existing digital infrastructure. Recommend fast-tracking to coordinator review.',
    estimatedImpact: 'High — affects 2,400+ citizens/month across 5 service centers.',
    timeline: [
      { label: 'Submitted', state: 'completed', timestamp: 'Aug 2, 2025 · 09:14' },
      { label: 'Initial Review', state: 'completed', timestamp: 'Aug 5, 2025 · 11:30' },
      { label: 'Coordinator Review', state: 'active' },
      { label: 'Director Approval', state: 'pending' },
      { label: 'Implementation', state: 'pending' },
    ],
    coordinatorNote:
      'The idea shows strong merit. Currently assessing vendor landscape and integration feasibility with the existing CRM. Estimated review completion: Aug 20, 2025.',
  },
  qi2: {
    id: 'qi2',
    title: 'Predictive Patrol Routing',
    status: 'Approved',
    department: 'Operations',
    category: 'Operations',
    date: 'Jul 15, 2025',
    submittedBy: 'Sara Al Ketbi',
    shortDescription:
      'Data-driven route optimisation for patrol units based on real-time traffic, incident history, and risk heatmaps.',
    fullDescription:
      'Predictive Patrol Routing uses historical incident data, live traffic feeds, and machine-learning-based crime pattern analysis to generate optimised patrol routes. Officers receive route suggestions via in-vehicle terminals, updated every 15 minutes. Dispatch coordinators gain a unified situational awareness map.',
    problemStatement:
      'Current patrol routes are static and based on fixed zones, ignoring real-time incident patterns and traffic conditions. This leads to delayed response times and uneven coverage of high-risk areas.',
    proposedSolution:
      'Integrate a predictive routing engine with the existing CAD (Computer-Aided Dispatch) system. Use 3 years of incident data, live traffic APIs, and risk scoring models to generate dynamic patrol recommendations updated in near-real-time.',
    beneficiaries:
      'Patrol officers, dispatch coordinators, Operations directorate leadership, and the communities in high-risk areas.',
    expectedBenefits:
      'Improve emergency response time by 22%, increase patrol coverage of high-risk zones by 35%, reduce fuel costs through optimised routes, and enhance officer situational awareness.',
    aiScore: 92,
    alignmentPillars: ['Predictive Policing', 'Operational Excellence', 'Smart Mobility'],
    aiRecommendation:
      'Exceptional strategic fit. This idea directly supports the Dubai Police Vision 2030 goal of predictive law enforcement. Recommend immediate implementation planning.',
    estimatedImpact: 'Very High — affects all patrol operations across Dubai.',
    timeline: [
      { label: 'Submitted', state: 'completed', timestamp: 'Jul 15, 2025 · 08:45' },
      { label: 'Initial Review', state: 'completed', timestamp: 'Jul 18, 2025 · 14:00' },
      { label: 'Coordinator Review', state: 'completed', timestamp: 'Jul 25, 2025 · 10:20' },
      { label: 'Director Approval', state: 'completed', timestamp: 'Jul 30, 2025 · 16:05' },
      { label: 'Implementation', state: 'active' },
    ],
    coordinatorNote:
      'Approved by the Director on Jul 30. The IT department is coordinating with the vendor for a phased rollout starting September 2025. Pilot zone: Al Barsha.',
  },
  qi3: {
    id: 'qi3',
    title: 'Smart Evidence Digitization',
    status: 'Implemented',
    department: 'Legal Affairs',
    category: 'Legal & Compliance',
    date: 'May 10, 2025',
    submittedBy: 'Fatima Al Blooshi',
    shortDescription:
      'End-to-end paperless evidence management with digital signatures and chain-of-custody tracking.',
    fullDescription:
      'Smart Evidence Digitization replaces paper-based evidence logs with a secure digital platform featuring QR-coded evidence tags, tamper-proof audit trails, biometric access controls, and automated chain-of-custody reporting. Integrated with the court e-filing system for seamless case progression.',
    problemStatement:
      'Evidence management at Dubai Police relies heavily on paper logs and manual processes, creating risk of documentation errors, chain-of-custody gaps, and delays in court proceedings. Physical storage constraints further compound the problem.',
    proposedSolution:
      'Deploy an evidence management information system (EMIS) with QR tagging, blockchain audit trail, and biometric access. Digitise all incoming evidence intake forms and integrate with the Attorney General e-filing portal for direct court submissions.',
    beneficiaries:
      'Evidence custodians, investigating officers, prosecutors, Legal Affairs directorate, and the judiciary.',
    expectedBenefits:
      'Eliminate paper evidence logs, reduce chain-of-custody errors by 95%, cut evidence retrieval time from 2 hours to 8 minutes, and accelerate court file submissions by 3 business days on average.',
    aiScore: 95,
    alignmentPillars: ['Digital Transformation', 'Legal Excellence', 'Data Integrity'],
    aiRecommendation:
      'Outstanding innovation. Full alignment with UAE Paperless Government initiative and Dubai Police Digital Transformation strategy. Highest priority for implementation.',
    estimatedImpact: 'Transformational — affects all criminal investigations and court proceedings.',
    timeline: [
      { label: 'Submitted', state: 'completed', timestamp: 'May 10, 2025 · 10:00' },
      { label: 'Initial Review', state: 'completed', timestamp: 'May 14, 2025 · 11:00' },
      { label: 'Coordinator Review', state: 'completed', timestamp: 'May 22, 2025 · 09:30' },
      { label: 'Director Approval', state: 'completed', timestamp: 'Jun 1, 2025 · 15:00' },
      { label: 'Implementation', state: 'completed', timestamp: 'Jul 20, 2025 · 08:00' },
    ],
    coordinatorNote:
      'Fully implemented as of Jul 20, 2025. All 6 evidence stores across Dubai Police stations are now live on the new platform. Training completed for 340 officers.',
    impactStats: [
      { label: 'Stations Live', value: '6/6' },
      { label: 'Officers Trained', value: '340' },
      { label: 'Time Saved', value: '~112 min/case' },
      { label: 'Error Reduction', value: '95%' },
    ],
  },
  qi4: {
    id: 'qi4',
    title: 'Employee Wellness App',
    status: 'Pending Initial Review',
    department: 'HR & Training',
    category: 'Human Resources',
    date: 'Aug 10, 2025',
    submittedBy: 'Khalid Al Nuaimi',
    shortDescription:
      'A mobile app to support officer mental health with wellbeing check-ins, guided exercises, and confidential resource access.',
    fullDescription:
      'The Employee Wellness App provides Dubai Police officers with daily mood check-ins, guided mindfulness sessions, access to confidential counselling resources, and an anonymous peer support network. A wellness dashboard for HR managers tracks aggregate (non-identifiable) trends to inform wellbeing programmes.',
    problemStatement:
      'Officer mental health and burnout are growing concerns in high-pressure law enforcement roles. Current support mechanisms are reactive and require officers to self-initiate contact with HR, creating barriers due to stigma. There is no proactive digital wellness channel.',
    proposedSolution:
      'Build a native mobile app (iOS/Android) with daily wellness nudges, anonymous check-in surveys, curated mental health content, and a directory of confidential support services. HR managers access an aggregate dashboard with no individual-level data to protect privacy.',
    beneficiaries:
      'All Dubai Police officers and civilian staff, HR & Training directorate, and employee wellbeing coordinators.',
    expectedBenefits:
      'Improve officer wellbeing index by 30%, reduce stress-related sick leave by 20%, increase voluntary engagement with HR wellness programmes by 50%, and establish a benchmark for law enforcement wellness in the region.',
    aiScore: 81,
    alignmentPillars: ['People First', 'HR Excellence', 'Wellbeing & Safety'],
    aiRecommendation:
      'Strong alignment with Dubai Police People Strategy 2025–2030. Recommend prioritising as part of the Smart HR initiative. Consider a pilot with one directorate before full rollout.',
    estimatedImpact: 'High — affects all 18,000+ Dubai Police employees.',
    timeline: [
      { label: 'Submitted', state: 'completed', timestamp: 'Aug 10, 2025 · 07:52' },
      { label: 'Initial Review', state: 'active' },
      { label: 'Coordinator Review', state: 'pending' },
      { label: 'Director Approval', state: 'pending' },
      { label: 'Implementation', state: 'pending' },
    ],
  },
};

const FALLBACK_IDEA: IdeaDetail = IDEA_DATA['qi1'];

// ── Mock comments ─────────────────────────────────────────────────────────────
interface Comment {
  id: string;
  author: string;
  initials: string;
  time: string;
  text: string;
}

const MOCK_COMMENTS: Record<string, Comment[]> = {
  qi1: [
    {
      id: 'c1',
      author: 'Coordinator — Innovation Office',
      initials: 'IO',
      time: 'Aug 6, 2025',
      text: 'Excellent submission. The use of predictive analytics is well thought out. Can you provide additional details on the vendor shortlist you have in mind?',
    },
    {
      id: 'c2',
      author: 'Ahmed Al Mansouri',
      initials: 'AA',
      time: 'Aug 7, 2025',
      text: 'Thank you! I have attached a preliminary vendor comparison in the attachments above. Happy to schedule a call to walk through the options.',
    },
  ],
  qi2: [
    {
      id: 'c1',
      author: 'Director — Operations',
      initials: 'DO',
      time: 'Jul 28, 2025',
      text: 'This is exactly the kind of data-driven thinking we need. Approved with priority. Coordinate with IT for the September pilot.',
    },
    {
      id: 'c2',
      author: 'Sara Al Ketbi',
      initials: 'SK',
      time: 'Jul 29, 2025',
      text: 'Thank you for the approval. I will liaise with IT and prepare the pilot scope document by end of this week.',
    },
  ],
  qi3: [
    {
      id: 'c1',
      author: 'Legal Affairs Coordinator',
      initials: 'LA',
      time: 'May 23, 2025',
      text: 'This is a landmark project for Legal Affairs. The AG e-filing integration was particularly impressive. Strongly recommend for immediate approval.',
    },
    {
      id: 'c2',
      author: 'Fatima Al Blooshi',
      initials: 'FB',
      time: 'Jul 21, 2025',
      text: 'System is now live across all stations. Extremely proud of the team. Training feedback has been very positive — officers adapted quickly.',
    },
  ],
  qi4: [
    {
      id: 'c1',
      author: 'HR & Training',
      initials: 'HR',
      time: 'Aug 10, 2025',
      text: 'Received and queued for initial review. Expect first feedback within 5 business days.',
    },
  ],
};

const MOCK_ATTACHMENTS = [
  { name: 'Idea_Proposal_v2.pdf', size: '1.2 MB', type: 'pdf' },
  { name: 'Vendor_Comparison.xlsx', size: '480 KB', type: 'xlsx' },
];

// ── Sub-components ─────────────────────────────────────────────────────────────

function ScoreBar({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full rounded-full bg-[#008755] transition-all"
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-xs   text-[#008755] tabular-nums whitespace-nowrap">
        {score}/100
      </span>
    </div>
  );
}

function TimelineStepper({ steps }: { steps: TimelineStep[] }) {
  return (
    <div className="flex flex-col gap-0">
      {steps.map((step, idx) => {
        const isLast = idx === steps.length - 1;
        return (
          <div key={idx} className="flex gap-3">
            {/* Icon + connector */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 border-2',
                  step.state === 'completed'
                    ? 'bg-[#008755] border-[#008755]'
                    : step.state === 'active'
                    ? 'bg-white border-[#008755]'
                    : 'bg-white border-gray-200',
                )}
              >
                {step.state === 'completed' ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                ) : step.state === 'active' ? (
                  <div className="h-2.5 w-2.5 rounded-full bg-[#008755]" />
                ) : (
                  <Circle className="h-3.5 w-3.5 text-gray-300" />
                )}
              </div>
              {!isLast && (
                <div
                  className={cn(
                    'w-0.5 flex-1 min-h-[20px]',
                    step.state === 'completed' ? 'bg-[#008755]/40' : 'bg-gray-100',
                  )}
                />
              )}
            </div>
            {/* Label + timestamp */}
            <div className={cn('pb-4', isLast && 'pb-0')}>
              <p
                className={cn(
                  'text-sm font-["Dubai:Medium",_sans-serif] leading-tight',
                  step.state === 'pending' ? 'text-gray-400' : 'text-foreground',
                )}
              >
                {step.label}
                {step.state === 'active' && (
                  <span className="ml-2 inline-flex items-center gap-1 text-[10px] text-[#008755] font-normal">
                    <Clock className="h-3 w-3" /> In Progress
                  </span>
                )}
              </p>
              {step.timestamp && (
                <p className="text-[11px] text-muted-foreground mt-0.5">{step.timestamp}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CommentBubble({ comment }: { comment: Comment }) {
  return (
    <div className="flex gap-2.5">
      <div className="h-7 w-7 rounded-full bg-[#008755]/10 flex items-center justify-center flex-shrink-0 text-[11px]   text-[#008755]">
        {comment.initials}
      </div>
      <div className="flex-1">
        <div className="flex items-baseline gap-2 mb-0.5">
          <span className="text-xs   text-foreground">{comment.author}</span>
          <span className="text-[11px] text-muted-foreground">{comment.time}</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{comment.text}</p>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export function IdeaDetailPage({ ideaId, user, role: _role, onNavigate }: PageProps) {
  const idea = IDEA_DATA[ideaId] ?? FALLBACK_IDEA;
  const comments = MOCK_COMMENTS[ideaId] ?? [];
  const [commentText, setCommentText] = useState('');
  const [localComments, setLocalComments] = useState<Comment[]>(comments);

  const canEdit = idea.status === 'Draft' || idea.status === 'Needs More Info';

  function handleSubmitComment() {
    const text = commentText.trim();
    if (!text) return;
    setLocalComments(prev => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        author: user.name,
        initials: user.initials,
        time: 'Just now',
        text,
      },
    ]);
    setCommentText('');
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="w-full px-4 py-3 space-y-4">

        {/* ── Top bar ──────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          {/* Left: back + status */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('my-ideas')}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className=" ">Back to My Ideas</span>
            </button>
            <div className="h-4 w-px bg-border" />
            <Badge className={cn('text-[11px] px-2 py-0.5 h-auto', STATUS_STYLES[idea.status])}>
              {idea.status}
            </Badge>
          </div>

          {/* Right: action buttons */}
          <div className="flex items-center gap-2">
            {canEdit && (
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-xs h-8"
                onClick={() => onNavigate('submit-idea')}
              >
                <Edit2 className="h-3.5 w-3.5" />
                Edit Idea
              </Button>
            )}
            <Button variant="outline" size="sm" className="gap-1.5 text-xs h-8">
              <MessageSquare className="h-3.5 w-3.5" />
              Submit Feedback
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5 text-xs h-8">
              <Download className="h-3.5 w-3.5" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* ── Status-specific banners ───────────────────────────────────────── */}
        {idea.status === 'Needs More Info' && idea.reviewerQuestion && (
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
            <Info className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm   text-amber-800 mb-0.5">
                Action Required — Reviewer Question
              </p>
              <p className="text-xs text-amber-700">{idea.reviewerQuestion}</p>
            </div>
          </div>
        )}

        {idea.status === 'Approved' && (
          <div className="flex items-start gap-3 bg-[#26D07C]/8 border border-[#26D07C]/30 rounded-xl px-4 py-3">
            <Info className="h-4 w-4 text-[#005844] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm   text-[#005844] mb-0.5">
                Idea Approved
              </p>
              <p className="text-xs text-[#005844]/80">
                Your idea has been approved and is now in the implementation planning phase. The assigned coordinator will be in touch shortly.
              </p>
            </div>
          </div>
        )}

        {idea.status === 'Implemented' && (
          <div className="flex items-start gap-3 bg-[#008755]/8 border border-[#008755]/25 rounded-xl px-4 py-3">
            <Trophy className="h-4 w-4 text-[#008755] flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm   text-[#005844] mb-1">
                Congratulations — Your Idea is Now Live!
              </p>
              {idea.impactStats && (
                <div className="flex flex-wrap gap-3 mt-2">
                  {idea.impactStats.map(stat => (
                    <div key={stat.label} className="bg-white rounded-lg border border-[#008755]/20 px-3 py-1.5 text-center min-w-[80px]">
                      <p className="text-sm   text-[#008755]">{stat.value}</p>
                      <p className="text-[11px] text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Header card ───────────────────────────────────────────────────── */}
        <Card className="rounded-xl">
          <CardContent className="p-4">
            <div className="flex flex-col gap-3">
              {/* Title */}
              <h1 className="text-xl   text-foreground leading-snug">
                {idea.title}
              </h1>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <UserIcon className="h-3.5 w-3.5" />
                  <span>Submitted by <span className="  text-foreground">{idea.submittedBy}</span></span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5" />
                  {idea.department}
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {idea.date}
                </span>
                <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-600">
                  {idea.category}
                </span>
              </div>

              {/* Short description */}
              <p className="text-sm text-muted-foreground leading-relaxed">{idea.shortDescription}</p>

              {/* AI Score bar */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs   text-muted-foreground flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-[#008755]" />
                    AI Strategic Alignment Score
                  </span>
                </div>
                <ScoreBar score={idea.aiScore} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── Two-column layout ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

          {/* ── Left column (60%) ──────────────────────────────────────────── */}
          <div className="lg:col-span-3 space-y-4">

            {/* Full description */}
            <Card className="rounded-xl">
              <CardHeader className="pb-2 pt-3 px-4">
                <CardTitle className="text-sm  ">Idea Details</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-4">
                <Section label="Full Description" text={idea.fullDescription} />
                <Section label="Problem Statement" text={idea.problemStatement} />
                <Section label="Proposed Solution" text={idea.proposedSolution} />
                <Section label="Beneficiaries" text={idea.beneficiaries} />
                <Section label="Expected Benefits" text={idea.expectedBenefits} />
              </CardContent>
            </Card>

            {/* AI Analysis card */}
            <Card className="rounded-xl border-[#008755]/20 bg-[#008755]/3">
              <CardHeader className="pb-2 pt-3 px-4">
                <CardTitle className="text-sm   flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#008755]" />
                  AI Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-3">
                {/* Score */}
                <div>
                  <p className="text-[11px] text-muted-foreground mb-1">Strategic Fit Score</p>
                  <ScoreBar score={idea.aiScore} />
                </div>

                {/* Alignment pillars */}
                <div>
                  <p className="text-[11px] text-muted-foreground mb-1.5">Alignment Pillars</p>
                  <div className="flex flex-wrap gap-1.5">
                    {idea.alignmentPillars.map(pillar => (
                      <span
                        key={pillar}
                        className="inline-flex items-center rounded-full bg-[#008755]/10 px-2.5 py-0.5 text-[11px]   text-[#005844]"
                      >
                        {pillar}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recommendation */}
                <div className="bg-white/70 rounded-lg p-3 border border-[#008755]/10">
                  <p className="text-[11px]   text-[#005844] mb-1">
                    AI Recommendation
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{idea.aiRecommendation}</p>
                </div>

                {/* Estimated impact */}
                <div className="flex items-start gap-2">
                  <TrendingUp className="h-3.5 w-3.5 text-[#008755] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px]   text-foreground">Estimated Impact</p>
                    <p className="text-xs text-muted-foreground">{idea.estimatedImpact}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Attachments */}
            <Card className="rounded-xl">
              <CardHeader className="pb-2 pt-3 px-4">
                <CardTitle className="text-sm   flex items-center gap-2">
                  <Paperclip className="h-4 w-4 text-muted-foreground" />
                  Attachments
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-2">
                {MOCK_ATTACHMENTS.map(file => (
                  <div
                    key={file.name}
                    className="flex items-center justify-between p-2.5 rounded-lg border border-border bg-gray-50/50 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-md bg-[#008755]/10 flex items-center justify-center flex-shrink-0">
                        <Paperclip className="h-3.5 w-3.5 text-[#008755]" />
                      </div>
                      <div>
                        <p className="text-xs   text-foreground">{file.name}</p>
                        <p className="text-[11px] text-muted-foreground">{file.size}</p>
                      </div>
                    </div>
                    <button className="text-[11px] text-[#008755] hover:text-[#005844]   transition-colors">
                      Download
                    </button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* ── Right column (40%) ─────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-4">

            {/* Progress timeline */}
            <Card className="rounded-xl">
              <CardHeader className="pb-2 pt-3 px-4">
                <CardTitle className="text-sm  ">Progress</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <TimelineStepper steps={idea.timeline} />
              </CardContent>
            </Card>

            {/* Coordinator notes */}
            {idea.coordinatorNote && (
              <Card className="rounded-xl border-[#008755]/15">
                <CardHeader className="pb-2 pt-3 px-4">
                  <CardTitle className="text-sm  ">Coordinator Notes</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <div className="flex gap-2.5">
                    <div className="h-7 w-7 rounded-full bg-[#008755]/10 flex items-center justify-center flex-shrink-0 text-[11px]   text-[#008755]">
                      CO
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed pt-0.5">
                      {idea.coordinatorNote}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Comments / discussion */}
            <Card className="rounded-xl">
              <CardHeader className="pb-2 pt-3 px-4">
                <CardTitle className="text-sm   flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  Discussion
                  {localComments.length > 0 && (
                    <span className="ml-1 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#008755]/10 px-1 text-[10px]   text-[#008755]">
                      {localComments.length}
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-4">
                {/* Existing comments */}
                {localComments.length > 0 ? (
                  <div className="space-y-3">
                    {localComments.map(c => (
                      <CommentBubble key={c.id} comment={c} />
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground text-center py-4">
                    No comments yet. Be the first to start the discussion.
                  </p>
                )}

                {/* Add comment */}
                <div className="space-y-2 pt-1 border-t border-border">
                  <Textarea
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    placeholder="Add a comment or question…"
                    className="text-xs min-h-[64px] resize-none"
                    onKeyDown={e => {
                      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmitComment();
                    }}
                  />
                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      className="bg-[#008755] hover:bg-[#005844] text-white gap-1.5 h-8 text-xs"
                      onClick={handleSubmitComment}
                      disabled={!commentText.trim()}
                    >
                      <Send className="h-3.5 w-3.5" />
                      Post Comment
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Helper sub-component ──────────────────────────────────────────────────────
function Section({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="text-xs   text-foreground mb-1">{label}</p>
      <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
    </div>
  );
}
