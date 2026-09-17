import { useState, useMemo } from 'react';
import {
  Trophy, Calendar, Search, ArrowLeft, ChevronRight,
  Users, CheckCircle, Clock, Tag, Target, Lightbulb, Star,
} from 'lucide-react';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { cn } from '../../ui/utils';

// ── Types ──────────────────────────────────────────────────────────────────────
export type IdeasRole = 'innovator' | 'coordinator' | 'director' | 'admin';

export interface User {
  name: string;
  role: string;
  subtitle: string;
  xp: number;
  initials: string;
  chip: string;
}

export interface PageProps {
  user: User;
  role: IdeasRole;
  onNavigate: (id: string) => void;
}

// ── Data ───────────────────────────────────────────────────────────────────────
type ChallengeStatus = 'Open' | 'Closing Soon' | 'Closed';

interface Challenge {
  id: number;
  title: string;
  department: string;
  status: ChallengeStatus;
  deadline: string;
  prize: string;
  tags: string[];
  description: string;
  submissions: number;
  winnerAnnounced?: boolean;
}

const CHALLENGES: Challenge[] = [
  {
    id: 1,
    title: 'AI-Powered Queue Management',
    department: 'Digital Transformation',
    status: 'Open',
    deadline: 'Sep 30, 2025',
    prize: '5,000 AED',
    tags: ['AI', 'Customer Experience', 'Automation'],
    description:
      'Design an AI system to predict and dynamically manage service center queue times, reducing average wait from 25 minutes to under 10 minutes.',
    submissions: 14,
  },
  {
    id: 2,
    title: 'Smart Patrol Route Optimization',
    department: 'Operations',
    status: 'Open',
    deadline: 'Oct 15, 2025',
    prize: '8,000 AED',
    tags: ['Smart Policing', 'AI', 'Route Planning'],
    description:
      'Develop an algorithm or solution that dynamically adjusts patrol routes based on real-time incident data, traffic, and historical crime patterns.',
    submissions: 9,
  },
  {
    id: 3,
    title: 'Digital Evidence Management',
    department: 'Legal Affairs',
    status: 'Closing Soon',
    deadline: 'Sep 10, 2025',
    prize: '6,500 AED',
    tags: ['Digitalization', 'Legal', 'Paperless'],
    description:
      'Propose a secure, fully digital chain-of-custody system for managing evidence from collection to court presentation with zero paper touchpoints.',
    submissions: 21,
  },
  {
    id: 4,
    title: 'Employee Wellness & Productivity',
    department: 'HR & Training',
    status: 'Open',
    deadline: 'Nov 1, 2025',
    prize: '4,000 AED',
    tags: ['Wellness', 'Productivity', 'HR'],
    description:
      'Design a program or app to monitor and improve employee mental and physical wellness, with measurable productivity impact.',
    submissions: 6,
  },
  {
    id: 5,
    title: 'Community Safety Awareness',
    department: 'Community Affairs',
    status: 'Closing Soon',
    deadline: 'Sep 12, 2025',
    prize: '3,500 AED',
    tags: ['Community', 'Awareness', 'Safety'],
    description:
      'Develop a scalable digital or on-ground campaign to improve public awareness of personal safety and emergency response procedures.',
    submissions: 18,
  },
  {
    id: 6,
    title: 'Paperless Operations Initiative',
    department: 'Finance',
    status: 'Open',
    deadline: 'Oct 28, 2025',
    prize: '5,500 AED',
    tags: ['Paperless', 'Efficiency', 'Environment'],
    description:
      'Map and propose a roadmap to eliminate all paper-based processes across financial operations, targeting 100% digital workflows within 12 months.',
    submissions: 7,
  },
  {
    id: 7,
    title: 'Predictive Vehicle Maintenance',
    department: 'Operations',
    status: 'Closed',
    deadline: 'Aug 1, 2025',
    prize: '7,000 AED',
    tags: ['AI', 'Fleet Management', 'IoT'],
    description:
      'Use IoT sensors and machine learning to predict vehicle maintenance needs before failure, reducing downtime by 40%.',
    submissions: 31,
    winnerAnnounced: true,
  },
  {
    id: 8,
    title: 'Smart Speed Camera Network',
    department: 'Operations',
    status: 'Closed',
    deadline: 'Jul 15, 2025',
    prize: '9,000 AED',
    tags: ['Smart Infrastructure', 'Road Safety'],
    description:
      'Design an integrated, AI-linked speed camera network that automatically adjusts speed limits and routes traffic based on conditions.',
    submissions: 25,
    winnerAnnounced: true,
  },
];

const DEPARTMENTS = [
  'All',
  'Operations',
  'Digital Transformation',
  'Community Affairs',
  'HR & Training',
  'Legal Affairs',
  'Finance',
];

// ── Helpers ────────────────────────────────────────────────────────────────────
function statusBadge(status: ChallengeStatus) {
  if (status === 'Open')
    return (
      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-[11px] font-medium">
        Open
      </Badge>
    );
  if (status === 'Closing Soon')
    return (
      <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-[11px] font-medium">
        Closing Soon
      </Badge>
    );
  return (
    <Badge className="bg-gray-100 text-gray-500 border-gray-200 text-[11px] font-medium">
      Closed
    </Badge>
  );
}

function deptBadge(dept: string) {
  return (
    <Badge
      variant="outline"
      className="text-[11px] text-[#005844] border-[#008755]/40 bg-[#008755]/5 font-medium"
    >
      {dept}
    </Badge>
  );
}

// ── Challenge Card ─────────────────────────────────────────────────────────────
interface ChallengeCardProps {
  challenge: Challenge;
  onViewDetails: (c: Challenge) => void;
}

function ChallengeCard({ challenge, onViewDetails }: ChallengeCardProps) {
  const isClosingSoon = challenge.status === 'Closing Soon';
  const isClosed = challenge.status === 'Closed';

  return (
    <Card
      className={cn(
        'rounded-xl hover:shadow-md transition-shadow cursor-pointer bg-white',
        isClosingSoon && 'border-l-4 border-amber-400'
      )}
    >
      <CardContent className="pt-4 pb-4 flex flex-col gap-3">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {deptBadge(challenge.department)}
            {statusBadge(challenge.status)}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-['Dubai:Medium',_sans-serif] text-sm text-gray-900 leading-snug line-clamp-2">
          {challenge.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
          {challenge.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {challenge.tags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center gap-0.5 text-[10px] bg-gray-100 text-gray-500 rounded-full px-2 py-0.5"
            >
              <Tag className="h-2.5 w-2.5" />
              {tag}
            </span>
          ))}
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-500 pt-1 border-t border-gray-100">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3 text-gray-400" />
            {challenge.deadline}
          </span>
          <span className="flex items-center gap-1">
            <Trophy className="h-3 w-3 text-amber-500" />
            {challenge.prize}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3 text-gray-400" />
            {challenge.submissions} submissions
          </span>
          {challenge.winnerAnnounced && (
            <span className="flex items-center gap-1 text-emerald-600">
              <CheckCircle className="h-3 w-3" />
              Winner Announced
            </span>
          )}
        </div>

        {/* Action row */}
        <div className="flex gap-2 pt-0.5">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 h-7 text-[11px] border-[#008755]/40 text-[#008755] hover:bg-[#008755]/5"
            onClick={() => onViewDetails(challenge)}
          >
            View Details
          </Button>
          <Button
            size="sm"
            className="flex-1 h-7 text-[11px] bg-[#008755] hover:bg-[#005844] text-white"
            disabled={isClosed}
            onClick={() => onViewDetails(challenge)}
          >
            {isClosed ? 'Closed' : 'Submit Response'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Detail Panel ───────────────────────────────────────────────────────────────
interface DetailViewProps {
  challenge: Challenge;
  allChallenges: Challenge[];
  onBack: () => void;
  onViewDetails: (c: Challenge) => void;
}

const EVAL_CRITERIA = [
  {
    icon: Lightbulb,
    label: 'Innovation',
    desc: 'Novelty and creativity of the proposed solution relative to existing approaches.',
  },
  {
    icon: Target,
    label: 'Feasibility',
    desc: 'Technical and operational viability for implementation within Dubai Police.',
  },
  {
    icon: Star,
    label: 'Impact',
    desc: 'Measurable improvement to operations, community safety, or employee wellbeing.',
  },
];

function DetailView({ challenge, allChallenges, onBack, onViewDetails }: DetailViewProps) {
  const related = allChallenges
    .filter(c => c.id !== challenge.id && c.department === challenge.department)
    .slice(0, 2)
    .concat(
      allChallenges
        .filter(
          c =>
            c.id !== challenge.id &&
            c.department !== challenge.department &&
            c.status === challenge.status
        )
        .slice(0, Math.max(0, 2 - allChallenges.filter(c => c.id !== challenge.id && c.department === challenge.department).length))
    )
    .slice(0, 2);

  const isClosed = challenge.status === 'Closed';
  const isOpen = challenge.status !== 'Closed';

  return (
    <div className="flex flex-col gap-5">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-[#008755] hover:text-[#005844] transition-colors w-fit"
      >
        <ArrowLeft className="h-4 w-4" />
        All Challenges
      </button>

      {/* Main detail card */}
      <Card className="rounded-xl bg-white">
        <CardContent className="pt-4 pb-4 flex flex-col gap-5">
          {/* Top */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-2 items-center">
              {deptBadge(challenge.department)}
              {statusBadge(challenge.status)}
              {challenge.winnerAnnounced && (
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-[11px]">
                  <CheckCircle className="h-3 w-3 mr-1" /> Winner Announced
                </Badge>
              )}
            </div>
            <h1 className="font-['Dubai:Medium',_sans-serif] text-xl text-gray-900 leading-snug">
              {challenge.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-gray-400" />
                Deadline: <strong>{challenge.deadline}</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <Trophy className="h-4 w-4 text-amber-500" />
                Prize: <strong>{challenge.prize}</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-gray-400" />
                <strong>{challenge.submissions}</strong> submissions so far
              </span>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Description */}
          <div>
            <h2 className="font-['Dubai:Medium',_sans-serif] text-sm text-gray-700 mb-2">
              Challenge Overview
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">{challenge.description}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {challenge.tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-600 rounded-full px-3 py-1"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>

          <hr className="border-gray-100" />

          {/* Evaluation criteria */}
          <div>
            <h2 className="font-['Dubai:Medium',_sans-serif] text-sm text-gray-700 mb-3">
              Evaluation Criteria
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {EVAL_CRITERIA.map(criterion => (
                <div
                  key={criterion.label}
                  className="flex flex-col gap-1.5 p-3 rounded-lg bg-[#008755]/5 border border-[#008755]/10"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-md bg-[#008755]/10 flex items-center justify-center flex-shrink-0">
                      <criterion.icon className="h-3.5 w-3.5 text-[#008755]" />
                    </div>
                    <span className="font-['Dubai:Medium',_sans-serif] text-xs text-gray-800">
                      {criterion.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{criterion.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Submissions & status */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-[#008755]/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-[#008755]" />
              </div>
              <div>
                <p className="font-['Dubai:Medium',_sans-serif] text-sm text-gray-900">
                  {challenge.submissions} Submissions
                </p>
                <p className="text-xs text-gray-500">
                  {isClosed
                    ? challenge.winnerAnnounced
                      ? 'Review complete — winner selected'
                      : 'Challenge closed — under review'
                    : `Still accepting submissions until ${challenge.deadline}`}
                </p>
              </div>
            </div>

            {isClosed ? (
              <Button className="bg-[#008755] hover:bg-[#005844] text-white h-9 px-6 text-sm">
                <Trophy className="h-4 w-4 mr-2" />
                View Winning Entry
              </Button>
            ) : (
              <Button className="bg-[#008755] hover:bg-[#005844] text-white h-9 px-6 text-sm">
                <ChevronRight className="h-4 w-4 mr-1.5" />
                Submit Your Response
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Related challenges */}
      {related.length > 0 && (
        <div>
          <h2 className="font-['Dubai:Medium',_sans-serif] text-sm text-gray-700 mb-3">
            Related Challenges
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map(c => (
              <ChallengeCard key={c.id} challenge={c} onViewDetails={onViewDetails} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── ChallengesPage ─────────────────────────────────────────────────────────────
export function ChallengesPage({ user: _user, role: _role, onNavigate: _onNavigate }: PageProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [deptFilter, setDeptFilter] = useState('All');
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  const filtered = useMemo(() => {
    return CHALLENGES.filter(c => {
      const matchSearch =
        !search ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.department.toLowerCase().includes(search.toLowerCase()) ||
        c.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const matchStatus = statusFilter === 'All' || c.status === statusFilter;
      const matchDept = deptFilter === 'All' || c.department === deptFilter;
      return matchSearch && matchStatus && matchDept;
    });
  }, [search, statusFilter, deptFilter]);

  const stats = {
    active: CHALLENGES.filter(c => c.status === 'Open').length,
    closingSoon: CHALLENGES.filter(c => c.status === 'Closing Soon').length,
    total: CHALLENGES.length,
  };

  if (selectedChallenge) {
    return (
      <div className="p-6">
        <DetailView
          challenge={selectedChallenge}
          allChallenges={CHALLENGES}
          onBack={() => setSelectedChallenge(null)}
          onViewDetails={setSelectedChallenge}
        />
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col gap-5">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-['Dubai:Medium',_sans-serif] text-xl text-gray-900">Challenges</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            <span className="text-[#008755] font-medium">{stats.active} Active</span>
            <span className="mx-1.5 text-gray-300">·</span>
            <span className="text-amber-600 font-medium">{stats.closingSoon} Closing Soon</span>
            <span className="mx-1.5 text-gray-300">·</span>
            <span className="text-gray-500">{stats.total} Total</span>
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock className="h-3.5 w-3.5 text-amber-500" />
          Updated just now
        </div>
      </div>

      {/* Filter bar */}
      <Card className="rounded-xl bg-white">
        <CardContent className="pt-4 pb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search challenges..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 h-9 text-sm"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-9 text-sm w-full sm:w-44">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="Closing Soon">Closing Soon</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={deptFilter} onValueChange={setDeptFilter}>
              <SelectTrigger className="h-9 text-sm w-full sm:w-52">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                {DEPARTMENTS.map(d => (
                  <SelectItem key={d} value={d}>
                    {d === 'All' ? 'All Departments' : d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results count */}
      {(search || statusFilter !== 'All' || deptFilter !== 'All') && (
        <p className="text-xs text-gray-500">
          Showing {filtered.length} of {CHALLENGES.length} challenges
        </p>
      )}

      {/* Challenge grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(challenge => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              onViewDetails={setSelectedChallenge}
            />
          ))}
        </div>
      ) : (
        <Card className="rounded-xl bg-white">
          <CardContent className="pt-4 pb-4 flex flex-col items-center justify-center py-16 text-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <p className="font-['Dubai:Medium',_sans-serif] text-sm text-gray-700">
              No challenges found
            </p>
            <p className="text-xs text-gray-400 max-w-xs">
              Try adjusting your search or filters to find relevant challenges.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-1 text-xs border-[#008755]/40 text-[#008755]"
              onClick={() => {
                setSearch('');
                setStatusFilter('All');
                setDeptFilter('All');
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
