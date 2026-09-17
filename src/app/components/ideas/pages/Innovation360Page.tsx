import {
  Star, Shield, Lock, Lightbulb, CheckCircle2, Award,
  GitPullRequest, FileCheck, Zap, TrendingUp, Users,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Avatar, AvatarFallback } from '../../ui/avatar';
import { cn } from '../../ui/utils';
import heroDecoration from '../../../../assets/sandbox-hero-decoration.png';

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

// ── Level config ──────────────────────────────────────────────────────────────
const LEVEL_CONFIG: Record<IdeasRole, {
  label: string;
  tier: string;
  tierColor: string;
  tierBg: string;
  nextLevel: number;
  nextLabel: string;
}> = {
  innovator:   { label: 'Explorer',             tier: 'Silver',   tierColor: '#64748b', tierBg: 'bg-slate-100 text-slate-600',    nextLevel: 2000, nextLabel: 'Strategist' },
  coordinator: { label: 'Strategist',           tier: 'Gold',     tierColor: '#b45309', tierBg: 'bg-amber-100 text-amber-700',    nextLevel: 4000, nextLabel: 'Innovation Architect' },
  director:    { label: 'Innovation Architect', tier: 'Platinum', tierColor: '#6d28d9', tierBg: 'bg-violet-100 text-violet-700',  nextLevel: 6000, nextLabel: 'Visionary' },
  admin:       { label: 'Visionary',            tier: 'Diamond',  tierColor: '#0891b2', tierBg: 'bg-cyan-100 text-cyan-700',      nextLevel: 6300, nextLabel: 'Max Level' },
};

// ── Lifetime stats ────────────────────────────────────────────────────────────
const LIFETIME_STATS: Record<IdeasRole, { submitted: number; applied: number; implemented: number; awards: number; ips: number }> = {
  innovator:   { submitted: 7,  applied: 3,  implemented: 1,  awards: 1, ips: 0 },
  coordinator: { submitted: 12, applied: 6,  implemented: 4,  awards: 2, ips: 1 },
  director:    { submitted: 23, applied: 14, implemented: 9,  awards: 5, ips: 3 },
  admin:       { submitted: 45, applied: 28, implemented: 19, awards: 9, ips: 6 },
};

// ── 6-month chart data ────────────────────────────────────────────────────────
const CHART_DATA: Record<IdeasRole, { month: string; ideas: number }[]> = {
  innovator: [
    { month: 'Jan', ideas: 1 }, { month: 'Feb', ideas: 1 },
    { month: 'Mar', ideas: 2 }, { month: 'Apr', ideas: 1 },
    { month: 'May', ideas: 1 }, { month: 'Jun', ideas: 2 },
  ],
  coordinator: [
    { month: 'Jan', ideas: 2 }, { month: 'Feb', ideas: 1 },
    { month: 'Mar', ideas: 3 }, { month: 'Apr', ideas: 2 },
    { month: 'May', ideas: 2 }, { month: 'Jun', ideas: 3 },
  ],
  director: [
    { month: 'Jan', ideas: 3 }, { month: 'Feb', ideas: 4 },
    { month: 'Mar', ideas: 5 }, { month: 'Apr', ideas: 3 },
    { month: 'May', ideas: 4 }, { month: 'Jun', ideas: 5 },
  ],
  admin: [
    { month: 'Jan', ideas: 7 }, { month: 'Feb', ideas: 6 },
    { month: 'Mar', ideas: 9 }, { month: 'Apr', ideas: 8 },
    { month: 'May', ideas: 10 }, { month: 'Jun', ideas: 8 },
  ],
};

// ── Initiatives ────────────────────────────────────────────────────────────────
type InitiativeStatus = 'In Progress' | 'Completed' | 'On Hold';

interface Initiative {
  name: string;
  myRole: string;
  status: InitiativeStatus;
  progress: number;
}

const INITIATIVES: Record<IdeasRole, Initiative[]> = {
  innovator: [
    { name: 'AI-Powered Document Scanning Tool', myRole: 'Idea Owner', status: 'In Progress', progress: 45 },
    { name: 'Body-Camera Footage Classifier',    myRole: 'Contributor', status: 'In Progress', progress: 30 },
    { name: 'Digital Lost-Property Portal',      myRole: 'Idea Owner', status: 'Completed',   progress: 100 },
  ],
  coordinator: [
    { name: 'Predictive Patrol Scheduling',       myRole: 'Reviewer',    status: 'In Progress', progress: 62 },
    { name: 'Real-Time Crime Mapping Dashboard',  myRole: 'Idea Owner',  status: 'In Progress', progress: 78 },
    { name: 'Smart Evidence Tagging System',      myRole: 'Reviewer',    status: 'Completed',   progress: 100 },
    { name: 'Unified Complaint Management App',   myRole: 'Coordinator', status: 'On Hold',     progress: 20 },
  ],
  director: [
    { name: 'Citywide CCTV Analytics Platform',  myRole: 'Sponsor',    status: 'In Progress', progress: 55 },
    { name: 'Community Policing Mobile App',      myRole: 'Sponsor',    status: 'In Progress', progress: 80 },
    { name: 'Officer Wellness Programme',         myRole: 'Idea Owner', status: 'Completed',   progress: 100 },
    { name: 'Digital Court Liaison System',       myRole: 'Reviewer',   status: 'On Hold',     progress: 15 },
  ],
  admin: [
    { name: 'Ideas Platform v2 Launch',             myRole: 'Sponsor',    status: 'In Progress', progress: 70 },
    { name: 'AI Governance Framework',              myRole: 'Sponsor',    status: 'In Progress', progress: 50 },
    { name: 'Innovation KPI Reporting Automation', myRole: 'Idea Owner', status: 'Completed',   progress: 100 },
    { name: 'Cross-Dept Collaboration Hub',         myRole: 'Reviewer',   status: 'On Hold',     progress: 35 },
  ],
};

// ── Badge definitions ─────────────────────────────────────────────────────────
interface AchievementBadge {
  id: string;
  label: string;
  icon: React.ElementType;
  desc: string;
  unlockedFor: IdeasRole[];
}

const ACHIEVEMENT_BADGES: AchievementBadge[] = [
  { id: 'first-idea',   label: 'First Idea',       icon: Lightbulb,    desc: 'Submitted your first idea',              unlockedFor: ['innovator', 'coordinator', 'director', 'admin'] },
  { id: '10-point',     label: '10-Point Club',     icon: Star,         desc: 'Earned 10 innovation points',            unlockedFor: ['innovator', 'coordinator', 'director', 'admin'] },
  { id: 'ch-winner',    label: 'Challenge Winner',  icon: Award,        desc: 'Won an innovation challenge',            unlockedFor: ['coordinator', 'director', 'admin'] },
  { id: 'mentor',       label: 'Mentor',            icon: Users,        desc: 'Mentored 3+ colleagues',                 unlockedFor: ['director', 'admin'] },
  { id: 'ip-pioneer',   label: 'IP Pioneer',        icon: FileCheck,    desc: 'Awarded an intellectual property right', unlockedFor: ['admin'] },
];

// ── Status badge helper ───────────────────────────────────────────────────────
function StatusBadge({ status }: { status: InitiativeStatus }) {
  const cfg = {
    'In Progress': 'bg-[#008755]/10 text-[#008755]',
    'Completed':   'bg-blue-50 text-blue-700',
    'On Hold':     'bg-amber-50 text-amber-700',
  }[status];
  return (
    <Badge className={cn('border-0 text-[10px] px-1.5 py-0', cfg)}>
      {status}
    </Badge>
  );
}

export function Innovation360Page({ user, role, onNavigate }: PageProps) {
  const lv = LEVEL_CONFIG[role];
  const ls = LIFETIME_STATS[role];
  const chartData = CHART_DATA[role];
  const initiatives = INITIATIVES[role];

  const xpForNext = lv.nextLevel;
  const xpProgress = Math.min(Math.round((user.xp / xpForNext) * 100), 100);

  return (
    <div className="flex flex-col gap-5 p-5">

      {/* ── 1. Level & Tier Hero Card ───────────────────────────────────────── */}
      <div className="rounded-xl bg-gradient-to-br from-[#005844] via-[#008755] to-[#00a869] p-6 text-white relative overflow-hidden">
        <img
          src={heroDecoration}
          alt=""
          className="absolute -top-16 -right-16 h-140 w-140 rounded-full object-cover opacity-50 pointer-events-none select-none"
        />

        <div className="relative z-10 flex flex-col md:flex-row gap-5 md:items-center">

          {/* Avatar */}
          <Avatar className="h-16 w-16 flex-shrink-0 border-2 border-white/30">
            <AvatarFallback className="bg-white/20 text-white text-xl  ">
              {user.initials}
            </AvatarFallback>
          </Avatar>

          {/* Identity */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className={cn('text-[11px] font-["Dubai:Medium",_sans-serif] px-2 py-0.5 rounded-full', lv.tierBg)}>
                {lv.tier}
              </span>
              <Badge className="bg-white/20 text-white border-0 text-[11px] px-2 py-0">
                <Shield className="h-3 w-3 mr-1" />
                {lv.label}
              </Badge>
            </div>
            <h2 className="text-xl   leading-tight">{user.name}</h2>
            <p className="text-white/70 text-sm">{user.subtitle}</p>
          </div>

          {/* XP progress */}
          <div className="md:min-w-[220px]">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
                <span className="text-sm  ">
                  {user.xp.toLocaleString()} XP
                </span>
              </div>
              {role !== 'admin' && (
                <span className="text-[11px] text-white/60">
                  {xpForNext.toLocaleString()} to {lv.nextLabel}
                </span>
              )}
              {role === 'admin' && (
                <span className="text-[11px] text-white/60">Max Level</span>
              )}
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#26D07C] rounded-full transition-all"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
            <p className="text-[11px] text-white/50 mt-1 text-right">{xpProgress}% to next tier</p>
          </div>
        </div>
      </div>

      {/* ── 2. Lifetime Stats ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[
          { label: 'Ideas Submitted',       value: ls.submitted,    icon: Lightbulb   },
          { label: 'Ideas Applied',         value: ls.applied,      icon: CheckCircle2 },
          { label: 'Projects Implemented',  value: ls.implemented,  icon: GitPullRequest },
          { label: 'Awards Won',            value: ls.awards,       icon: Award       },
          { label: 'IPs Awarded',           value: ls.ips,          icon: FileCheck   },
        ].map(({ label, value, icon: Icon }) => (
          <Card key={label} className="rounded-xl">
            <CardContent className="pt-4 pb-4 px-4">
              <div className="flex items-start gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-[#008755]/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="text-[#008755]" style={{ height: 15, width: 15 }} />
                </div>
                <div>
                  <p className="text-2xl   text-foreground leading-none mb-0.5">{value}</p>
                  <p className="text-[11px] text-muted-foreground leading-snug">{label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── 3 + 4. Chart + Initiatives (two columns) ───────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

        {/* 6-month Contribution Chart */}
        <Card className="rounded-xl lg:col-span-2">
          <CardHeader className="px-4 pt-4 pb-0 gap-0">
            <CardTitle className="text-sm   text-foreground flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-[#008755]" />
              6-Month Contribution
            </CardTitle>
            <p className="text-[11px] text-muted-foreground mt-0.5">Ideas submitted per month</p>
          </CardHeader>
          <CardContent className="pt-3 pb-4 px-2">
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={chartData} margin={{ top: 4, right: 12, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="ideasGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#008755" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#008755" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                  labelStyle={{ fontWeight: 600 }}
                />
                <Area
                  type="monotone"
                  dataKey="ideas"
                  stroke="#008755"
                  strokeWidth={2}
                  fill="url(#ideasGradient)"
                  dot={{ r: 3, fill: '#008755', strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: '#008755' }}
                  name="Ideas"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Active Innovation Initiatives */}
        <Card className="rounded-xl lg:col-span-3">
          <CardHeader className="px-4 pt-4 pb-0 gap-0">
            <CardTitle className="text-sm   text-foreground flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-[#008755]" />
              Active Innovation Initiatives
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-3 pb-4 px-4">
            <div className="space-y-3">
              {initiatives.map((init) => (
                <div key={init.name} className="border border-border rounded-lg p-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="text-xs   text-foreground leading-snug flex-1 min-w-0">
                      {init.name}
                    </p>
                    <StatusBadge status={init.status} />
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-[#008755]/10 text-[#008755] border-0 text-[10px] px-1.5 py-0 flex-shrink-0">
                      {init.myRole}
                    </Badge>
                    <div className="flex-1 flex items-center gap-2">
                      <Progress
                        value={init.progress}
                        className="h-1.5 flex-1 bg-[#008755]/10"
                        indicatorColor={init.status === 'Completed' ? '#26D07C' : init.status === 'On Hold' ? '#f59e0b' : '#008755'}
                      />
                      <span className="text-[11px] text-muted-foreground flex-shrink-0 w-8 text-right">
                        {init.progress}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── 5. Badges Earned ────────────────────────────────────────────────── */}
      <Card className="rounded-xl">
        <CardHeader className="px-4 pt-4 pb-0 gap-0">
          <CardTitle className="text-sm   text-foreground flex items-center gap-1.5">
            <Award className="h-4 w-4 text-[#008755]" />
            Achievement Badges
          </CardTitle>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            {ACHIEVEMENT_BADGES.filter(b => b.unlockedFor.includes(role)).length} of {ACHIEVEMENT_BADGES.length} earned
          </p>
        </CardHeader>
        <CardContent className="pt-4 pb-4 px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {ACHIEVEMENT_BADGES.map((badge) => {
              const unlocked = badge.unlockedFor.includes(role);
              const Icon = badge.icon;
              return (
                <div
                  key={badge.id}
                  className={cn(
                    'flex flex-col items-center gap-2 p-3 rounded-xl border text-center transition-colors',
                    unlocked
                      ? 'border-[#008755]/30 bg-[#008755]/5'
                      : 'border-border bg-muted/30 opacity-50'
                  )}
                >
                  <div className={cn(
                    'h-10 w-10 rounded-xl flex items-center justify-center',
                    unlocked ? 'bg-[#008755]/15' : 'bg-muted'
                  )}>
                    {unlocked
                      ? <Icon className="text-[#008755]" style={{ height: 20, width: 20 }} />
                      : <Lock className="text-muted-foreground" style={{ height: 16, width: 16 }} />
                    }
                  </div>
                  <div>
                    <p className={cn(
                      'text-[11px] font-["Dubai:Medium",_sans-serif] leading-tight',
                      unlocked ? 'text-[#008755]' : 'text-muted-foreground'
                    )}>
                      {badge.label}
                    </p>
                    <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">{badge.desc}</p>
                  </div>
                  {unlocked && (
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#26D07C]" />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
