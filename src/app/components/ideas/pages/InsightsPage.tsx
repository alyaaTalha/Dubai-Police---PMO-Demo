import { useState } from 'react';
import {
  Trophy, TrendingUp, TrendingDown, Minus, Star, Award, Zap,
  Target, Users, CheckCircle2, FileText, Clock, ChevronDown, ChevronUp,
  Search, Download, BarChart2, LineChart, PieChart, Activity, Sparkles,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '../../ui/select';
import { Progress } from '../../ui/progress';
import { cn } from '../../ui/utils';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, Cell,
} from 'recharts';

// ── Types ─────────────────────────────────────────────────────────────────────
type IdeasRole = 'innovator' | 'coordinator' | 'director' | 'admin';
interface User { name: string; role: string; subtitle: string; xp: number; initials: string; chip: string; }
interface PageProps { user: User; role: IdeasRole; onNavigate: (id: string) => void; }

// ── Rankings Data ─────────────────────────────────────────────────────────────
interface DeptRanking {
  rank: number;
  dept: string;
  score: number;
  submitted: number;
  implemented: number;
  participation: string;
  trend: 'up' | 'down' | 'same';
  badges: string[];
}

const rankingsData: Record<string, DeptRanking[]> = {
  month: [
    { rank: 1, dept: 'Digital Transformation', score: 91, submitted: 8, implemented: 1, participation: '85%', trend: 'up', badges: ['Most Active', 'Highest Impact'] },
    { rank: 2, dept: 'Operations', score: 85, submitted: 7, implemented: 1, participation: '77%', trend: 'up', badges: ['Fastest Evaluation'] },
    { rank: 3, dept: 'Community Affairs', score: 79, submitted: 5, implemented: 1, participation: '71%', trend: 'same', badges: ['Best Implementation Rate'] },
    { rank: 4, dept: 'HR & Training', score: 72, submitted: 4, implemented: 0, participation: '64%', trend: 'up', badges: ['Most Improved'] },
    { rank: 5, dept: 'Legal Affairs', score: 68, submitted: 3, implemented: 0, participation: '59%', trend: 'down', badges: [] },
    { rank: 6, dept: 'Strategic Planning', score: 61, submitted: 2, implemented: 0, participation: '48%', trend: 'same', badges: [] },
  ],
  quarter: [
    { rank: 1, dept: 'Digital Transformation', score: 94, submitted: 22, implemented: 3, participation: '87%', trend: 'up', badges: ['Most Active', 'Highest Impact'] },
    { rank: 2, dept: 'Operations', score: 88, submitted: 18, implemented: 2, participation: '79%', trend: 'up', badges: ['Fastest Evaluation'] },
    { rank: 3, dept: 'Community Affairs', score: 82, submitted: 15, implemented: 2, participation: '74%', trend: 'same', badges: ['Best Implementation Rate'] },
    { rank: 4, dept: 'HR & Training', score: 76, submitted: 12, implemented: 1, participation: '68%', trend: 'up', badges: ['Most Improved'] },
    { rank: 5, dept: 'Legal Affairs', score: 71, submitted: 9, implemented: 1, participation: '62%', trend: 'down', badges: [] },
    { rank: 6, dept: 'Strategic Planning', score: 65, submitted: 6, implemented: 0, participation: '51%', trend: 'same', badges: [] },
  ],
  year: [
    { rank: 1, dept: 'Digital Transformation', score: 96, submitted: 84, implemented: 11, participation: '91%', trend: 'up', badges: ['Most Active', 'Highest Impact'] },
    { rank: 2, dept: 'Operations', score: 90, submitted: 71, implemented: 9, participation: '82%', trend: 'up', badges: ['Fastest Evaluation'] },
    { rank: 3, dept: 'Community Affairs', score: 85, submitted: 58, implemented: 8, participation: '76%', trend: 'up', badges: ['Best Implementation Rate'] },
    { rank: 4, dept: 'HR & Training', score: 78, submitted: 45, implemented: 5, participation: '70%', trend: 'same', badges: ['Most Improved'] },
    { rank: 5, dept: 'Legal Affairs', score: 73, submitted: 33, implemented: 4, participation: '65%', trend: 'down', badges: [] },
    { rank: 6, dept: 'Strategic Planning', score: 67, submitted: 24, implemented: 2, participation: '54%', trend: 'same', badges: [] },
  ],
};

// ── Radar Data ────────────────────────────────────────────────────────────────
const radarData = [
  { axis: 'Submissions', 'Digital Transformation': 94, Operations: 82, 'Community Affairs': 74 },
  { axis: 'Implementation', 'Digital Transformation': 88, Operations: 76, 'Community Affairs': 80 },
  { axis: 'Participation', 'Digital Transformation': 92, Operations: 79, 'Community Affairs': 70 },
  { axis: 'Response Time', 'Digital Transformation': 85, Operations: 90, 'Community Affairs': 72 },
  { axis: 'Strategic Alignment', 'Digital Transformation': 96, Operations: 83, 'Community Affairs': 78 },
];

// ── Badge config ──────────────────────────────────────────────────────────────
const badgeConfig: Record<string, { icon: React.ElementType; className: string }> = {
  'Most Active': { icon: Zap, className: 'bg-[#008755]/10 text-[#008755]' },
  'Highest Impact': { icon: Star, className: 'bg-amber-100 text-amber-700' },
  'Fastest Evaluation': { icon: Clock, className: 'bg-blue-100 text-blue-700' },
  'Best Implementation Rate': { icon: CheckCircle2, className: 'bg-purple-100 text-purple-700' },
  'Most Improved': { icon: TrendingUp, className: 'bg-green-100 text-green-700' },
};

// ── Report types ──────────────────────────────────────────────────────────────
const reports = [
  { id: 1, name: 'Monthly Innovation Summary', icon: FileText, lastGenerated: 'Jul 1, 2025', description: 'Overview of all ideas submitted, reviewed, and implemented over the past month.' },
  { id: 2, name: 'Department Performance Scorecard', icon: BarChart2, lastGenerated: 'Jun 30, 2025', description: 'Comparative scoring across departments on all innovation KPIs.' },
  { id: 3, name: 'Idea-to-Project Conversion Report', icon: Activity, lastGenerated: 'Jun 28, 2025', description: 'Tracks the pipeline from submitted idea through to approved project initiation.' },
  { id: 4, name: 'SLA Compliance Report', icon: Clock, lastGenerated: 'Jun 25, 2025', description: 'Measures coordinator and director adherence to review SLA windows.' },
  { id: 5, name: 'Submission Trend Analysis', icon: LineChart, lastGenerated: 'Jun 20, 2025', description: 'Time-series breakdown of submission volumes and peak periods by department.' },
  { id: 6, name: 'ROI Impact Assessment', icon: Target, lastGenerated: 'Jun 15, 2025', description: 'Estimated cost savings and value generated from implemented ideas.' },
];

const recentReportsHistory = [
  { name: 'Monthly Innovation Summary', generatedBy: 'Dir. Khalid Al Mansoori', date: 'Jul 1, 2025', period: 'June 2025', },
  { name: 'SLA Compliance Report', generatedBy: 'Dir. Fatima Al Rashidi', date: 'Jun 25, 2025', period: 'Q2 2025', },
  { name: 'Department Performance Scorecard', generatedBy: 'Dir. Khalid Al Mansoori', date: 'Jun 30, 2025', period: 'Q2 2025', },
  { name: 'Submission Trend Analysis', generatedBy: 'Dir. Ahmed Al Zaabi', date: 'Jun 20, 2025', period: 'H1 2025', },
  { name: 'ROI Impact Assessment', generatedBy: 'Dir. Fatima Al Rashidi', date: 'Jun 15, 2025', period: 'FY 2024–25', },
];

// ── Audit data ────────────────────────────────────────────────────────────────
type AuditAction = 'Approved' | 'Rejected' | 'Converted' | 'Commented' | 'Assigned';

interface AuditEntry {
  id: number;
  timestamp: string;
  director: string;
  action: AuditAction;
  target: string;
  department: string;
  notes: string;
}

const allAuditEntries: AuditEntry[] = [
  { id: 1, timestamp: 'Aug 7, 2025 — 14:32', director: 'Dir. Khalid Al Mansoori', action: 'Approved', target: 'AI-Powered Patrol Route Optimizer', department: 'Digital Transformation', notes: 'Strong ROI case; proceed to pilot phase.' },
  { id: 2, timestamp: 'Aug 7, 2025 — 11:10', director: 'Dir. Fatima Al Rashidi', action: 'Converted', target: 'Community Feedback Kiosk Network', department: 'Community Affairs', notes: 'Elevated to full project — Q3 delivery.' },
  { id: 3, timestamp: 'Aug 6, 2025 — 16:55', director: 'Dir. Ahmed Al Zaabi', action: 'Rejected', target: 'Manual Overtime Logging System', department: 'HR & Training', notes: 'Superseded by existing HRMS module.' },
  { id: 4, timestamp: 'Aug 6, 2025 — 09:20', director: 'Dir. Khalid Al Mansoori', action: 'Commented', target: 'Smart Evidence Management Portal', department: 'Legal Affairs', notes: 'Needs legal compliance review before approval.' },
  { id: 5, timestamp: 'Aug 5, 2025 — 13:45', director: 'Dir. Fatima Al Rashidi', action: 'Assigned', target: 'Digital Training Academy v2', department: 'HR & Training', notes: 'Assigned to Coordinator Saeed for expedited review.' },
  { id: 6, timestamp: 'Aug 5, 2025 — 10:00', director: 'Dir. Ahmed Al Zaabi', action: 'Approved', target: 'Predictive Maintenance for Fleet Vehicles', department: 'Operations', notes: 'Estimated 18% reduction in downtime.' },
  { id: 7, timestamp: 'Aug 4, 2025 — 15:30', director: 'Dir. Khalid Al Mansoori', action: 'Approved', target: 'Public Safety Awareness Chatbot', department: 'Community Affairs', notes: 'Aligned with digital outreach strategy.' },
  { id: 8, timestamp: 'Aug 4, 2025 — 08:50', director: 'Dir. Fatima Al Rashidi', action: 'Commented', target: 'Cross-Department KPI Dashboard', department: 'Strategic Planning', notes: 'Request breakdown by sub-unit before final approval.' },
  { id: 9, timestamp: 'Aug 2, 2025 — 17:15', director: 'Dir. Ahmed Al Zaabi', action: 'Converted', target: 'Incident Reporting Mobile App', department: 'Operations', notes: 'Greenlit as high-priority digital initiative.' },
  { id: 10, timestamp: 'Aug 1, 2025 — 14:00', director: 'Dir. Khalid Al Mansoori', action: 'Rejected', target: 'Paper-Based Visitor Log Digitization', department: 'Operations', notes: 'Existing DMS solution already covers this scope.' },
  { id: 11, timestamp: 'Jul 30, 2025 — 11:22', director: 'Dir. Fatima Al Rashidi', action: 'Assigned', target: 'Officer Wellness Check-In App', department: 'HR & Training', notes: 'Assigned to Coordinator Mariam for psychological safety input.' },
  { id: 12, timestamp: 'Jul 28, 2025 — 09:40', director: 'Dir. Ahmed Al Zaabi', action: 'Approved', target: 'Automated SLA Reminder System', department: 'Digital Transformation', notes: 'Will reduce overdue reviews by estimated 40%.' },
  { id: 13, timestamp: 'Jul 25, 2025 — 16:05', director: 'Dir. Khalid Al Mansoori', action: 'Commented', target: 'Open Innovation Challenge Framework', department: 'Strategic Planning', notes: 'Recommend piloting with two departments first.' },
  { id: 14, timestamp: 'Jul 22, 2025 — 13:10', director: 'Dir. Fatima Al Rashidi', action: 'Approved', target: 'Multilingual Idea Submission Portal', department: 'Community Affairs', notes: 'Critical for inclusive participation across nationalities.' },
  { id: 15, timestamp: 'Jul 18, 2025 — 10:35', director: 'Dir. Ahmed Al Zaabi', action: 'Rejected', target: 'Legacy Database Migration Proposal', department: 'Legal Affairs', notes: 'Scope too broad; resubmit as phased plan.' },
];

const auditActionColors: Record<AuditAction, string> = {
  Approved: 'bg-green-100 text-green-700',
  Rejected: 'bg-red-100 text-red-700',
  Converted: 'bg-blue-100 text-blue-700',
  Commented: 'bg-gray-100 text-gray-600',
  Assigned: 'bg-purple-100 text-purple-700',
};

// ── Sub-components ────────────────────────────────────────────────────────────
function BadgeChip({ label }: { label: string }) {
  const config = badgeConfig[label];
  if (!config) return null;
  const Icon = config.icon;
  return (
    <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium', config.className)}>
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}

function TrendIcon({ trend }: { trend: 'up' | 'down' | 'same' }) {
  if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-600" />;
  if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-500" />;
  return <Minus className="w-4 h-4 text-gray-400" />;
}

// ── TAB 1: Rankings ───────────────────────────────────────────────────────────
function RankingsTab() {
  const [period, setPeriod] = useState<'month' | 'quarter' | 'year'>('quarter');
  const [formulaOpen, setFormulaOpen] = useState(false);

  const data = rankingsData[period];
  const top3 = data.slice(0, 3);

  // Rank card order: 2nd (left), 1st (center), 3rd (right)
  const podiumOrder = [top3[1], top3[0], top3[2]];
  const podiumRanks = [2, 1, 3];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-gray-900 font-['Dubai:Medium',_sans-serif]">
          Department Innovation Rankings
        </h2>
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          {(['month', 'quarter', 'year'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                'px-4 py-1.5 rounded-md text-sm font-medium transition-all capitalize',
                period === p
                  ? 'bg-white text-[#008755] shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Rank Cards */}
      <Card className="rounded-xl border border-border bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-gray-800 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#008755]" /> Top Performers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-stretch gap-3 pt-1 pb-2">
            {podiumOrder.map((dept, idx) => {
              const rank = podiumRanks[idx];
              const isFirst = rank === 1;
              return (
                <div
                  key={dept.dept}
                  className={cn(
                    'flex-1 rounded-xl border p-4 flex flex-col gap-2',
                    isFirst
                      ? 'border-[#008755] bg-[#008755]/5 shadow-sm ring-1 ring-[#008755]/20'
                      : rank === 2
                      ? 'border-gray-300 bg-white'
                      : 'border-gray-200 bg-white'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        'text-3xl font-bold leading-none',
                        isFirst ? 'text-[#008755]/30' : 'text-gray-200'
                      )}
                    >
                      {rank}
                    </span>
                    {isFirst && <Trophy className="w-4 h-4 text-[#008755]" />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 leading-snug">{dept.dept}</p>
                    <p className={cn('text-xl font-bold mt-0.5', isFirst ? 'text-[#008755]' : 'text-gray-700')}>
                      {dept.score}
                      <span className="text-xs font-normal text-gray-400 ml-1">pts</span>
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-auto pt-1">
                    {dept.badges.map((b) => (
                      <BadgeChip key={b} label={b} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Full Rankings Table */}
      <Card className="rounded-xl border border-border bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-gray-800">Full Department Rankings</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50/80">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Rank</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Department</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Score</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Submitted</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Implemented</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Participation</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Trend</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Badges</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr
                    key={row.dept}
                    className={cn('border-b last:border-0 transition-colors hover:bg-gray-50', i % 2 === 0 ? '' : 'bg-muted/20')}
                  >
                    <td className="py-3 px-4">
                      <span className={cn(
                        'inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold',
                        row.rank === 1 ? 'bg-amber-100 text-amber-700' :
                        row.rank === 2 ? 'bg-gray-200 text-gray-600' :
                        row.rank === 3 ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-100 text-gray-500'
                      )}>
                        {row.rank}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-800">{row.dept}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="font-bold text-[#008755]">{row.score}</span>
                        <Progress value={row.score} className="h-1.5 w-16" />
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center text-gray-700">{row.submitted}</td>
                    <td className="py-3 px-4 text-center text-gray-700">{row.implemented}</td>
                    <td className="py-3 px-4 text-center text-gray-700">{row.participation}</td>
                    <td className="py-3 px-4 text-center">
                      <TrendIcon trend={row.trend} />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {row.badges.length > 0
                          ? row.badges.map((b) => <BadgeChip key={b} label={b} />)
                          : <span className="text-gray-300 text-xs">—</span>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Scoring Formula (Collapsible) */}
      <Card className="rounded-xl border border-border bg-white shadow-sm">
        <button
          className="w-full flex items-center justify-between px-5 py-4 text-left"
          onClick={() => setFormulaOpen((v) => !v)}
        >
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-[#008755]" />
            <span className="text-sm font-semibold text-gray-800">How Scores Are Calculated</span>
          </div>
          {formulaOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </button>
        {formulaOpen && (
          <CardContent className="pt-0 pb-5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm mb-3">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase">Component</th>
                    <th className="text-center py-2 px-3 text-xs font-semibold text-gray-500 uppercase">Weight</th>
                    <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { component: 'Ideas Submitted', weight: '25%', desc: 'Raw volume of ideas submitted by department members.' },
                    { component: 'Ideas Implemented', weight: '35%', desc: 'Ideas that reached implementation or project stage.' },
                    { component: 'Participation Rate', weight: '20%', desc: 'Percentage of eligible staff who submitted at least one idea.' },
                    { component: 'Avg Review Response Time', weight: '20%', desc: 'Average hours from submission to first coordinator action.' },
                  ].map((row) => (
                    <tr key={row.component} className="border-b last:border-0">
                      <td className="py-2 px-3 font-medium text-gray-800">{row.component}</td>
                      <td className="py-2 px-3 text-center">
                        <span className="inline-block bg-[#008755]/10 text-[#008755] font-bold rounded px-2 py-0.5 text-xs">{row.weight}</span>
                      </td>
                      <td className="py-2 px-3 text-gray-500">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-gray-400 italic">
                Scores are normalized within the selected period and updated weekly.
              </p>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Radar Chart */}
      <Card className="rounded-xl border border-border bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-gray-800">Top 3 Departments — Dimension Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-3">
            {[
              { label: 'Digital Transformation', color: '#008755' },
              { label: 'Operations', color: '#3b82f6' },
              { label: 'Community Affairs', color: '#8b5cf6' },
            ].map((d) => (
              <div key={d.label} className="flex items-center gap-1.5 text-xs text-gray-600">
                <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: d.color }} />
                {d.label}
              </div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="axis" tick={{ fontSize: 11, fill: '#6b7280' }} />
              <Radar name="Digital Transformation" dataKey="Digital Transformation" stroke="#008755" fill="#008755" fillOpacity={0.18} strokeWidth={2} />
              <Radar name="Operations" dataKey="Operations" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} strokeWidth={2} />
              <Radar name="Community Affairs" dataKey="Community Affairs" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.10} strokeWidth={2} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }}
                formatter={(value: number, name: string) => [`${value}`, name]}
              />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

// ── TAB 2: Reports ────────────────────────────────────────────────────────────
const reportIcons = [FileText, BarChart2, Activity, Clock, LineChart, PieChart];

function ReportsTab() {
  return (
    <div className="space-y-6">
      {/* Report cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {reports.map((report, idx) => {
          const Icon = reportIcons[idx] ?? FileText;
          return (
            <Card key={report.id} className="rounded-xl border border-border bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-5 pb-4 px-5 flex flex-col gap-3 h-full">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#008755]/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#008755]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-800 leading-snug">{report.name}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Last generated: {report.lastGenerated}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed flex-1">{report.description}</p>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 w-fit">
                  <Sparkles className="w-3 h-3" />
                  AI Draft — Review Required
                </span>
                <div className="flex items-center gap-2 pt-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 h-8 text-xs border-[#008755] text-[#008755] hover:bg-[#008755]/5"
                  >
                    Generate Report
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 px-3 text-xs text-gray-500 hover:text-gray-700"
                  >
                    <Download className="w-3.5 h-3.5 mr-1" />
                    PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent report history */}
      <Card className="rounded-xl border border-border bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-gray-800">Recent Report History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50/80">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Report Name</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Generated By</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Period</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Download</th>
                </tr>
              </thead>
              <tbody>
                {recentReportsHistory.map((row, i) => (
                  <tr key={i} className={cn('border-b last:border-0 hover:bg-gray-50 transition-colors', i % 2 === 0 ? '' : 'bg-muted/20')}>
                    <td className="py-3 px-4 font-medium text-gray-800">{row.name}</td>
                    <td className="py-3 px-4 text-gray-600">{row.generatedBy}</td>
                    <td className="py-3 px-4 text-gray-500">{row.date}</td>
                    <td className="py-3 px-4 text-gray-500">{row.period}</td>
                    <td className="py-3 px-4 text-center">
                      <Button size="sm" variant="ghost" className="h-7 px-2 text-[#008755] hover:text-[#005844]">
                        <Download className="w-3.5 h-3.5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ── TAB 3: Audit Trail ────────────────────────────────────────────────────────
function AuditTrailTab() {
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('All');
  const [dateRange, setDateRange] = useState('Last 30 days');

  const filtered = allAuditEntries.filter((entry) => {
    const matchSearch =
      search === '' ||
      entry.target.toLowerCase().includes(search.toLowerCase()) ||
      entry.director.toLowerCase().includes(search.toLowerCase()) ||
      entry.department.toLowerCase().includes(search.toLowerCase()) ||
      entry.notes.toLowerCase().includes(search.toLowerCase());
    const matchAction = actionFilter === 'All' || entry.action === actionFilter;
    // Date range is cosmetic in this mock — all entries are within 30 days
    const withinRange = dateRange !== 'Last 7 days' || entry.id <= 8;
    return matchSearch && matchAction && withinRange;
  });

  return (
    <div className="space-y-4">
      {/* Filter bar */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by idea, director, or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#008755]/30 focus:border-[#008755]"
          />
        </div>
        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger className="w-44 h-9 text-sm">
            <SelectValue placeholder="Action Type" />
          </SelectTrigger>
          <SelectContent>
            {['All', 'Approved', 'Rejected', 'Converted', 'Commented', 'Assigned'].map((a) => (
              <SelectItem key={a} value={a}>{a}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-40 h-9 text-sm">
            <SelectValue placeholder="Date Range" />
          </SelectTrigger>
          <SelectContent>
            {['Last 7 days', 'Last 30 days', 'Last quarter'].map((d) => (
              <SelectItem key={d} value={d}>{d}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" className="h-9 gap-1.5 ml-auto">
          <Download className="w-3.5 h-3.5" />
          Export
        </Button>
      </div>

      {/* Audit log table */}
      <Card className="rounded-xl border border-border bg-white shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50/80">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">Timestamp</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Director</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Action</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Target Idea / Cluster</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Department</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Notes</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-gray-400 text-sm">No audit entries match your filters.</td>
                  </tr>
                ) : (
                  filtered.map((entry, i) => (
                    <tr
                      key={entry.id}
                      className={cn('border-b last:border-0 hover:bg-gray-50 transition-colors', i % 2 === 0 ? '' : 'bg-muted/20')}
                    >
                      <td className="py-3 px-4 text-gray-500 text-xs whitespace-nowrap font-mono">{entry.timestamp}</td>
                      <td className="py-3 px-4 text-gray-700 font-medium whitespace-nowrap">{entry.director}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={cn('inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold', auditActionColors[entry.action])}>
                          {entry.action}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-800 max-w-[200px]">
                        <span className="line-clamp-2 leading-snug">{entry.target}</span>
                      </td>
                      <td className="py-3 px-4 text-gray-600 whitespace-nowrap">{entry.department}</td>
                      <td className="py-3 px-4 text-gray-500 max-w-[220px]">
                        <span className="line-clamp-2 text-xs leading-relaxed">{entry.notes}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {filtered.length > 0 && (
            <div className="px-4 py-2 border-t bg-gray-50/50 text-xs text-gray-400">
              Showing {filtered.length} of {allAuditEntries.length} entries
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
type Tab = 'Rankings' | 'Reports' | 'Audit Trail';
const TABS: Tab[] = ['Rankings', 'Reports', 'Audit Trail'];

export function InsightsPage({ user, role, onNavigate }: PageProps) {
  const [activeTab, setActiveTab] = useState<Tab>('Rankings');

  return (
    <div className="p-4 space-y-4 font-['Dubai:Medium',_sans-serif]">
      {/* Page header */}
      <div>
        <h1 className="text-lg font-semibold text-gray-900">Insights</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Department rankings, innovation reports, and full audit trail.
        </p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 border-b border-gray-200">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'px-4 py-2 text-sm font-medium transition-colors relative',
              activeTab === tab
                ? 'text-[#008755]'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#008755] rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'Rankings' && <RankingsTab />}
      {activeTab === 'Reports' && <ReportsTab />}
      {activeTab === 'Audit Trail' && <AuditTrailTab />}
    </div>
  );
}
