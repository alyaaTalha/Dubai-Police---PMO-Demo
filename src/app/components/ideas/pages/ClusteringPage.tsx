import { useState } from 'react';
import {
  Sparkles, Search, GitMerge, Layers, BarChart2, Target,
  ChevronRight, Users, TrendingUp, Zap, CheckSquare, Square,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { cn } from '../../ui/utils';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, BarChart, Bar,
} from 'recharts';

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

// ── Constants ──────────────────────────────────────────────────────────────────
const VIEWS = [
  'Overview',
  'Strategic Alignment',
  'Opportunity Matrix',
  'Similarity Detector',
  'Cluster Map',
  'AI Insights',
] as const;

type View = (typeof VIEWS)[number];

const PILLAR_COLORS: Record<string, string> = {
  'Innovation Excellence': '#008755',
  'Operational Excellence': '#26D07C',
  'Customer Excellence': '#005844',
  'Strategic Partnerships': '#6B7280',
};

const CLUSTER_DATA = [
  { cluster: 'Smart Operations', count: 14, pillar: 'Innovation Excellence' },
  { cluster: 'Customer Experience', count: 12, pillar: 'Customer Excellence' },
  { cluster: 'Digital Transformation', count: 11, pillar: 'Innovation Excellence' },
  { cluster: 'Safety & Security', count: 10, pillar: 'Operational Excellence' },
  { cluster: 'HR Innovation', count: 9, pillar: 'Strategic Partnerships' },
  { cluster: 'Community Engagement', count: 8, pillar: 'Customer Excellence' },
  { cluster: 'Sustainability', count: 7, pillar: 'Strategic Partnerships' },
  { cluster: 'Process Automation', count: 6, pillar: 'Operational Excellence' },
];

const SCATTER_DATA = [
  { name: 'Smart Queue Management', cluster: 'Customer Experience', effort: 2, impact: 8 },
  { name: 'AI Patrol Scheduling', cluster: 'Smart Operations', effort: 7, impact: 9 },
  { name: 'Mobile Field Reports', cluster: 'Process Automation', effort: 3, impact: 6 },
  { name: 'Community App Update', cluster: 'Community Engagement', effort: 2, impact: 5 },
  { name: 'Blockchain Evidence', cluster: 'Safety & Security', effort: 9, impact: 7 },
  { name: 'Digital Training Badges', cluster: 'HR Innovation', effort: 4, impact: 6 },
  { name: 'Drone Emergency Kit', cluster: 'Smart Operations', effort: 8, impact: 9 },
  { name: 'QR Public Tips', cluster: 'Community Engagement', effort: 1, impact: 4 },
  { name: 'AR Training Simulations', cluster: 'HR Innovation', effort: 8, impact: 5 },
  { name: 'Social Media Monitor', cluster: 'Digital Transformation', effort: 5, impact: 4 },
  { name: 'Smart Parking Robots', cluster: 'Process Automation', effort: 9, impact: 3 },
  { name: 'Green Fleet Initiative', cluster: 'Sustainability', effort: 6, impact: 7 },
];

const CLUSTER_COLORS: Record<string, string> = {
  'Customer Experience': '#005844',
  'Smart Operations': '#008755',
  'Process Automation': '#26D07C',
  'Community Engagement': '#6B7280',
  'Safety & Security': '#E4002B',
  'HR Innovation': '#7C3AED',
  'Digital Transformation': '#0EA5E9',
  'Sustainability': '#F59E0B',
};

const SIMILARITY_GROUPS = [
  {
    id: 1,
    cluster: 'Customer Experience',
    similarity: 89,
    ideas: [
      { title: 'Smart Queue Management at Service Centers', submitter: 'AM', pct: 89 },
      { title: 'Automated Queue Ticketing System', submitter: 'KR', pct: 89 },
    ],
  },
  {
    id: 2,
    cluster: 'Smart Operations',
    similarity: 82,
    ideas: [
      { title: 'AI Patrol Scheduling', submitter: 'SA', pct: 82 },
      { title: 'Predictive Patrol Route Optimizer', submitter: 'NM', pct: 79 },
      { title: 'Smart Shift Planner', submitter: 'RK', pct: 75 },
    ],
  },
  {
    id: 3,
    cluster: 'Process Automation',
    similarity: 76,
    ideas: [
      { title: 'Mobile Field Reports', submitter: 'TH', pct: 76 },
      { title: 'Digital Incident Documentation', submitter: 'FJ', pct: 76 },
    ],
  },
  {
    id: 4,
    cluster: 'Community Engagement',
    similarity: 71,
    ideas: [
      { title: 'Community App Update', submitter: 'LM', pct: 71 },
      { title: 'Community Feedback Loop Automation', submitter: 'BN', pct: 71 },
    ],
  },
];

const ALL_IDEAS = SCATTER_DATA.map((d, i) => ({
  id: i,
  title: d.name,
  cluster: d.cluster,
  submitter: ['AM', 'KR', 'SA', 'NM', 'RK', 'TH', 'FJ', 'LM', 'BN', 'YA', 'OP', 'ZQ'][i] || 'XX',
}));

const STRATEGIC_DATA = [
  {
    pillar: 'Innovation Excellence',
    ideas: 25,
    clusters: [
      { name: 'Smart Operations', count: 14, idea: 'AI-Assisted Patrol Scheduling', submitter: 'SA' },
      { name: 'Digital Transformation', count: 11, idea: 'Paperless Evidence Management', submitter: 'NM' },
    ],
  },
  {
    pillar: 'Operational Excellence',
    ideas: 16,
    clusters: [
      { name: 'Safety & Security', count: 10, idea: 'Predictive Maintenance System', submitter: 'RK' },
      { name: 'Process Automation', count: 6, idea: 'Smart Queue Management', submitter: 'TH' },
    ],
  },
  {
    pillar: 'Customer Excellence',
    ideas: 20,
    clusters: [
      { name: 'Customer Experience', count: 12, idea: 'Real-Time Service Wait Times', submitter: 'FJ' },
      { name: 'Community Engagement', count: 8, idea: 'Community Feedback Loop', submitter: 'LM' },
    ],
  },
  {
    pillar: 'Strategic Partnerships',
    ideas: 16,
    clusters: [
      { name: 'HR Innovation', count: 9, idea: 'Digital Training Badge System', submitter: 'BN' },
      { name: 'Sustainability', count: 7, idea: 'Green Fleet Initiative', submitter: 'YA' },
    ],
  },
];

const CLUSTER_MAP_DATA = CLUSTER_DATA.map((c) => ({
  ...c,
  color: PILLAR_COLORS[c.pillar],
  topIdeas: SCATTER_DATA.filter((d) => d.cluster === c.cluster).slice(0, 3),
  monthlyData: [
    { m: 'Jan', v: Math.floor(Math.random() * 4) + 1 },
    { m: 'Feb', v: Math.floor(Math.random() * 4) + 1 },
    { m: 'Mar', v: Math.floor(Math.random() * 4) + 2 },
    { m: 'Apr', v: Math.floor(Math.random() * 4) + 1 },
    { m: 'May', v: Math.floor(Math.random() * 4) + 2 },
    { m: 'Jun', v: Math.floor(Math.random() * 3) + 1 },
  ],
  theme: [
    'Leveraging AI to streamline police field operations and resource dispatch.',
    'Delivering faster, more intuitive public-facing services.',
    'Automating paper-heavy workflows for efficiency gains.',
    'Protecting community through predictive safety systems.',
    'Empowering officers through modern HR and learning tools.',
    'Building trust through transparent community engagement.',
    'Reducing environmental impact across police fleet operations.',
    'Digitising front-desk and service-centre interactions.',
  ][CLUSTER_DATA.findIndex((x) => x.cluster === c.cluster)] || 'Strategic theme identified by AI.',
}));

// ── Sub-components ─────────────────────────────────────────────────────────────
function KpiCard({ label, value, icon: Icon, color }: { label: string; value: string | number; icon: React.ElementType; color: string }) {
  return (
    <Card className="rounded-xl border border-border bg-white shadow-sm">
      <CardContent className="p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}18` }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Dubai:Medium', sans-serif" }}>{value}</p>
          <p className="text-xs text-gray-500">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

// ── VIEW 1: Overview ───────────────────────────────────────────────────────────
function OverviewView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <KpiCard label="Total Ideas" value={77} icon={Lightbulb} color="#008755" />
        <KpiCard label="Clusters Identified" value={8} icon={Layers} color="#005844" />
        <KpiCard label="Cross-Dept Themes" value={5} icon={Users} color="#26D07C" />
        <KpiCard label="Avg Ideas / Cluster" value="9.6" icon={BarChart2} color="#6B7280" />
      </div>

      <Card className="rounded-xl border border-border bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold" style={{ fontFamily: "'Dubai:Medium', sans-serif" }}>
            Ideas per Cluster
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={CLUSTER_DATA} layout="vertical" margin={{ left: 20, right: 20, top: 4, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="cluster" tick={{ fontSize: 11 }} width={160} />
              <Tooltip
                formatter={(value: number) => [value, 'Ideas']}
                contentStyle={{ fontSize: 12, borderRadius: 8 }}
              />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {CLUSTER_DATA.map((entry) => (
                  <Cell key={entry.cluster} fill={PILLAR_COLORS[entry.pillar]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-2 flex-wrap">
            {Object.entries(PILLAR_COLORS).map(([pillar, color]) => (
              <div key={pillar} className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: color }} />
                <span className="text-xs text-gray-500">{pillar}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-[#008755]" />
          <span className="text-sm font-semibold text-gray-800" style={{ fontFamily: "'Dubai:Medium', sans-serif" }}>
            Emerging Themes
          </span>
        </div>
        <div className="flex gap-3 flex-wrap">
          {[
            'AI & Automation trending ↑',
            'Cross-dept collaboration ideas up 40%',
            'Customer-facing ideas dominate Q2',
            'Green / sustainability surge: +3 new ideas',
          ].map((theme) => (
            <div
              key={theme}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#008755]/10 border border-[#008755]/20 text-sm text-[#005844]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#26D07C]" />
              {theme}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── VIEW 2: Strategic Alignment ────────────────────────────────────────────────
function StrategicAlignmentView() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        Ideas mapped to Dubai Police strategic pillars — showing cluster groupings and representative initiatives.
      </p>
      <div className="overflow-x-auto">
        <div className="min-w-[780px] space-y-4">
          {STRATEGIC_DATA.map((pillar) => {
            const color = PILLAR_COLORS[pillar.pillar];
            return (
              <div key={pillar.pillar} className="flex gap-0">
                {/* Pillar column */}
                <div
                  className="w-52 flex-shrink-0 rounded-xl border bg-white shadow-sm p-3 flex flex-col justify-center"
                  style={{ borderLeftWidth: 4, borderLeftColor: color, borderTopColor: '#e5e7eb', borderRightColor: '#e5e7eb', borderBottomColor: '#e5e7eb' }}
                >
                  <p className="text-xs font-semibold" style={{ color, fontFamily: "'Dubai:Medium', sans-serif" }}>
                    {pillar.pillar}
                  </p>
                  <p className="text-xl font-bold text-gray-900 mt-0.5">{pillar.ideas}</p>
                  <p className="text-xs text-gray-400">ideas</p>
                </div>

                {/* Connector */}
                <div className="flex flex-col justify-center w-6 flex-shrink-0">
                  {pillar.clusters.map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 flex items-center"
                      style={{ minHeight: 52 }}
                    >
                      <div className="w-full border-t-2 border-dashed" style={{ borderColor: `${color}60` }} />
                    </div>
                  ))}
                </div>

                {/* Clusters column */}
                <div className="flex flex-col gap-2 w-52 flex-shrink-0 justify-center">
                  {pillar.clusters.map((cluster) => (
                    <div
                      key={cluster.name}
                      className="rounded-lg border bg-white shadow-sm p-2.5"
                      style={{ borderColor: `${color}40` }}
                    >
                      <p className="text-xs font-semibold text-gray-800" style={{ fontFamily: "'Dubai:Medium', sans-serif" }}>
                        {cluster.name}
                      </p>
                      <span className="text-[11px] text-gray-500">{cluster.count} ideas</span>
                    </div>
                  ))}
                </div>

                {/* Connector */}
                <div className="flex flex-col justify-center w-6 flex-shrink-0">
                  {pillar.clusters.map((_, i) => (
                    <div key={i} className="flex-1 flex items-center" style={{ minHeight: 52 }}>
                      <div className="w-full border-t-2 border-dashed" style={{ borderColor: `${color}60` }} />
                    </div>
                  ))}
                </div>

                {/* Representative ideas column */}
                <div className="flex flex-col gap-2 flex-1 justify-center">
                  {pillar.clusters.map((cluster) => (
                    <div
                      key={cluster.name}
                      className="rounded-lg border border-gray-100 bg-gray-50 p-2.5 flex items-center gap-2"
                    >
                      <span
                        className="w-6 h-6 rounded-full text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: color }}
                      >
                        {cluster.submitter}
                      </span>
                      <p className="text-xs text-gray-700 leading-snug">{cluster.idea}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Custom tooltip for scatter chart ──────────────────────────────────────────
function ScatterTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: typeof SCATTER_DATA[0] }> }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white border border-border rounded-lg shadow-md p-3 text-xs space-y-1">
      <p className="font-semibold text-gray-800">{d.name}</p>
      <p className="text-gray-500">{d.cluster}</p>
      <div className="flex gap-3">
        <span>Effort: <strong>{d.effort}</strong></span>
        <span>Impact: <strong>{d.impact}</strong></span>
      </div>
    </div>
  );
}

// ── VIEW 3: Opportunity Matrix ─────────────────────────────────────────────────
function OpportunityMatrixView() {
  const quickWins = SCATTER_DATA.filter((d) => d.effort <= 5 && d.impact >= 5).slice(0, 3);

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-500">
        Ideas plotted by implementation effort vs. strategic impact. Identify where to focus next.
      </p>

      <Card className="rounded-xl border border-border bg-white shadow-sm">
        <CardContent className="pt-6">
          <div className="relative">
            {/* Quadrant labels */}
            <div className="absolute inset-0 z-10 pointer-events-none" style={{ marginLeft: 60, marginBottom: 40, marginTop: 10, marginRight: 20 }}>
              <div className="absolute top-0 left-0 w-1/2 h-1/2 flex items-start justify-start pl-3 pt-2">
                <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded">Quick Wins</span>
              </div>
              <div className="absolute top-0 right-0 w-1/2 h-1/2 flex items-start justify-end pr-3 pt-2">
                <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">Big Bets</span>
              </div>
              <div className="absolute bottom-0 left-0 w-1/2 h-1/2 flex items-end justify-start pl-3 pb-2">
                <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded">Fill-Ins</span>
              </div>
              <div className="absolute bottom-0 right-0 w-1/2 h-1/2 flex items-end justify-end pr-3 pb-2">
                <span className="text-xs font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded">Hard Slogs</span>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={360}>
              <ScatterChart margin={{ top: 10, right: 20, bottom: 40, left: 60 }}>
                <defs>
                  <linearGradient id="qw" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#16a34a" stopOpacity={0.08} />
                    <stop offset="100%" stopColor="#16a34a" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  type="number"
                  dataKey="effort"
                  domain={[0, 10]}
                  label={{ value: 'Effort →', position: 'insideBottom', offset: -10, fontSize: 12 }}
                  tick={{ fontSize: 11 }}
                />
                <YAxis
                  type="number"
                  dataKey="impact"
                  domain={[0, 10]}
                  label={{ value: 'Impact', angle: -90, position: 'insideLeft', offset: 15, fontSize: 12 }}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip content={<ScatterTooltip />} />
                <Scatter data={SCATTER_DATA} shape="circle">
                  {SCATTER_DATA.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CLUSTER_COLORS[entry.cluster] || '#008755'}
                      fillOpacity={0.85}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          <div className="flex gap-4 flex-wrap mt-2 px-2">
            {Object.entries(CLUSTER_COLORS).map(([cluster, color]) => (
              <div key={cluster} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: color }} />
                <span className="text-[11px] text-gray-500">{cluster}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-[#008755]" />
          <span className="text-sm font-semibold text-gray-800" style={{ fontFamily: "'Dubai:Medium', sans-serif" }}>
            Quick Wins to Act On
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {quickWins.map((idea) => (
            <Card key={idea.name} className="rounded-xl border border-[#26D07C]/40 bg-green-50 shadow-sm">
              <CardContent className="p-3 space-y-1.5">
                <p className="text-sm font-semibold text-gray-800">{idea.name}</p>
                <div className="flex items-center gap-2">
                  <Badge className="text-[10px] bg-[#008755]/10 text-[#005844] border-0">
                    {idea.cluster}
                  </Badge>
                </div>
                <div className="flex gap-3 text-xs text-gray-600">
                  <span>Effort <strong>{idea.effort}/10</strong></span>
                  <span>Impact <strong>{idea.impact}/10</strong></span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── VIEW 4: Similarity Detector ────────────────────────────────────────────────
function SimilarityDetectorView() {
  const [threshold, setThreshold] = useState(75);
  const [search, setSearch] = useState('');
  const [mergedGroups, setMergedGroups] = useState<Set<number>>(new Set());
  const [keptGroups, setKeptGroups] = useState<Set<number>>(new Set());
  const [highlightedIdea, setHighlightedIdea] = useState<string | null>(null);

  const visibleGroups = SIMILARITY_GROUPS.filter(
    (g) => g.similarity >= threshold && !mergedGroups.has(g.id) && !keptGroups.has(g.id),
  );

  const filteredIdeas = ALL_IDEAS.filter((idea) =>
    idea.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        Detect duplicate or highly similar ideas before they fragment your backlog.
      </p>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Similarity Threshold
          </label>
          <input
            type="range"
            min={50}
            max={100}
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="w-40 accent-[#008755]"
          />
          <span className="text-sm font-semibold text-[#008755] w-10">{threshold}%</span>
        </div>
        <div className="relative flex-1 max-w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search ideas…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-8 text-sm"
          />
        </div>
      </div>

      <div className="flex gap-4">
        {/* Left: similarity pairs */}
        <div className="flex-[3] space-y-3">
          {visibleGroups.length === 0 && (
            <div className="text-center py-12 text-sm text-gray-400 border border-dashed rounded-xl">
              No similarity groups above {threshold}% threshold.
            </div>
          )}
          {visibleGroups.map((group) => (
            <Card key={group.id} className="rounded-xl border border-border bg-white shadow-sm">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: CLUSTER_COLORS[group.cluster] || '#008755' }}
                    />
                    <span className="text-sm font-semibold text-gray-800" style={{ fontFamily: "'Dubai:Medium', sans-serif" }}>
                      {group.cluster}
                    </span>
                  </div>
                  <Badge
                    className="text-xs"
                    style={{
                      backgroundColor: group.similarity >= 85 ? '#E4002B15' : '#00875515',
                      color: group.similarity >= 85 ? '#E4002B' : '#008755',
                      border: 'none',
                    }}
                  >
                    {group.similarity}% similar
                  </Badge>
                </div>

                <div className="space-y-2">
                  {group.ideas.map((idea) => (
                    <div
                      key={idea.title}
                      className={cn(
                        'flex items-center gap-3 p-2 rounded-lg transition-colors',
                        highlightedIdea === idea.title ? 'bg-[#008755]/10' : 'bg-gray-50',
                      )}
                    >
                      <Square className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span
                        className="w-6 h-6 rounded-full text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: CLUSTER_COLORS[group.cluster] || '#008755' }}
                      >
                        {idea.submitter}
                      </span>
                      <p className="text-sm text-gray-700 flex-1 leading-snug">{idea.title}</p>
                      <div className="flex items-center gap-1.5 w-24 flex-shrink-0">
                        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${idea.pct}%`,
                              backgroundColor: CLUSTER_COLORS[group.cluster] || '#008755',
                            }}
                          />
                        </div>
                        <span className="text-[10px] text-gray-500 w-7 text-right">{idea.pct}%</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <Button
                    size="sm"
                    className="h-7 text-xs bg-[#008755] hover:bg-[#005844] text-white"
                    onClick={() => setMergedGroups((prev) => new Set([...prev, group.id]))}
                  >
                    <GitMerge className="w-3 h-3 mr-1" />
                    Merge
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs"
                    onClick={() => setKeptGroups((prev) => new Set([...prev, group.id]))}
                  >
                    Keep Separate
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Right: idea list */}
        <div className="flex-[2] flex flex-col gap-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">All Ideas</p>
          <div className="overflow-y-auto max-h-[520px] space-y-1 pr-1">
            {filteredIdeas.map((idea) => (
              <div
                key={idea.id}
                className={cn(
                  'flex items-center gap-2.5 p-2 rounded-lg cursor-pointer transition-colors border',
                  highlightedIdea === idea.title
                    ? 'border-[#008755]/40 bg-[#008755]/08'
                    : 'border-transparent hover:bg-gray-50',
                )}
                onClick={() =>
                  setHighlightedIdea((prev) => (prev === idea.title ? null : idea.title))
                }
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: CLUSTER_COLORS[idea.cluster] || '#6B7280' }}
                />
                <p className="text-xs text-gray-700 flex-1 leading-snug">{idea.title}</p>
                <span className="text-[10px] text-gray-400">{idea.submitter}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── VIEW 5: Cluster Map ────────────────────────────────────────────────────────
function ClusterMapView() {
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null);
  const selected = CLUSTER_MAP_DATA.find((c) => c.cluster === selectedCluster);

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        Click a cluster bubble to explore its ideas, trends, and recommended actions.
      </p>
      <div className="flex gap-4">
        {/* Bubble grid */}
        <div className="flex-1 grid grid-cols-4 gap-3">
          {CLUSTER_MAP_DATA.map((c) => {
            const isSelected = selectedCluster === c.cluster;
            return (
              <button
                key={c.cluster}
                onClick={() => setSelectedCluster(isSelected ? null : c.cluster)}
                className={cn(
                  'rounded-2xl border-2 p-4 flex flex-col items-center gap-2 transition-all text-center cursor-pointer',
                  isSelected ? 'shadow-lg scale-[1.03]' : 'hover:shadow-md hover:scale-[1.01]',
                )}
                style={{
                  backgroundColor: `${c.color}12`,
                  borderColor: isSelected ? c.color : `${c.color}50`,
                }}
              >
                <span
                  className="text-sm font-bold leading-snug"
                  style={{ color: c.color, fontFamily: "'Dubai:Medium', sans-serif" }}
                >
                  {c.cluster}
                </span>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: c.color }}
                >
                  {c.count}
                </span>
                <span className="text-[10px] text-gray-400">{c.pillar}</span>
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="w-72 flex-shrink-0">
            <Card className="rounded-xl border border-border bg-white shadow-sm h-full">
              <CardHeader className="pb-2 pt-4 px-4">
                <div className="flex items-center justify-between">
                  <CardTitle
                    className="text-base font-semibold"
                    style={{ color: selected.color, fontFamily: "'Dubai:Medium', sans-serif" }}
                  >
                    {selected.cluster}
                  </CardTitle>
                  <button
                    className="text-gray-400 hover:text-gray-600 text-sm"
                    onClick={() => setSelectedCluster(null)}
                  >
                    ✕
                  </button>
                </div>
                <p className="text-xs text-gray-400">{selected.pillar}</p>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-4">
                {/* Top ideas */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Top Ideas
                  </p>
                  <div className="space-y-1.5">
                    {(selected.topIdeas.length > 0
                      ? selected.topIdeas
                      : SCATTER_DATA.filter((d) => d.cluster === selected.cluster)
                    )
                      .slice(0, 3)
                      .map((idea, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span
                            className="w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: selected.color }}
                          >
                            {['AM', 'KR', 'SA'][i]}
                          </span>
                          <p className="text-xs text-gray-700 leading-snug">{idea.name}</p>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Monthly sparkline */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Monthly Submissions
                  </p>
                  <ResponsiveContainer width="100%" height={56}>
                    <BarChart data={selected.monthlyData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                      <Bar dataKey="v" fill={selected.color} radius={[2, 2, 0, 0]} />
                      <XAxis dataKey="m" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* AI theme */}
                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-[#008755]/08">
                  <Sparkles className="w-3.5 h-3.5 text-[#008755] mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-gray-600 leading-snug">
                    <strong>Theme:</strong> {selected.theme}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <Button size="sm" className="bg-[#008755] hover:bg-[#005844] text-white text-xs h-8">
                    Create Challenge from Cluster
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs h-8">
                    Brief Director
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

// ── VIEW 6: AI Insights ────────────────────────────────────────────────────────
const EMERGING_THEMES = [
  {
    title: 'AI & Automation Dominance',
    body: 'Over 28% of all ideas this quarter involve AI-driven automation of police workflows. Patrol scheduling, evidence management, and public service queues are the top three domains. Expect this trend to deepen as officers become more AI-literate.',
    confidence: 'High',
  },
  {
    title: 'Sustainability Surge',
    body: 'Sustainability-tagged ideas have grown by 43% since Q1, driven by the UAE Net Zero 2050 agenda. Green fleet electrification and solar-powered CCTV stations are gaining grassroots traction across multiple departments.',
    confidence: 'High',
  },
  {
    title: 'Community Co-Creation Rising',
    body: 'Ideas that involve direct community participation — feedback portals, tip apps, and neighbourhood liaison programmes — account for 18% of submissions. This marks a cultural shift toward open, transparent policing.',
    confidence: 'Medium',
  },
];

const CROSS_DEPT_OPPORTUNITIES = [
  {
    dept1: 'Traffic Dept',
    dept2: 'Smart Infrastructure',
    theme: 'Smart Mobility',
    body: 'Both departments have independently ideated on AI-assisted traffic control and autonomous vehicle integration. A joint task force could accelerate delivery and avoid duplicated procurement.',
    rec: 'Initiate a Joint Smart Mobility Working Group',
  },
  {
    dept1: 'HR & Training',
    dept2: 'Digital Crimes Unit',
    theme: 'Cyber-Skill Development',
    body: 'HR is designing a digital badge programme while DCU needs upskilling in cyber forensics. These initiatives overlap significantly and can share a single e-learning platform investment.',
    rec: 'Commission a Unified Cyber-Skills Academy',
  },
  {
    dept1: 'Community Relations',
    dept2: 'Operations',
    theme: 'Transparent Policing',
    body: 'Community Relations ideas on real-time incident disclosure align with Operations\' interest in public-facing dashboards. A combined data-sharing initiative would enhance public trust and reduce redundant development.',
    rec: 'Launch a Public Safety Transparency Portal',
  },
];

const ACTION_RECOMMENDATIONS = [
  {
    priority: 'P1',
    title: 'Fast-Track Quick Win Ideas',
    body: 'Three ideas — Smart Queue Management, Mobile Field Reports, and QR Public Tips — score high impact at low effort. Assign coordinators to each within 2 weeks and target deployment by Q3 end.',
    color: '#E4002B',
  },
  {
    priority: 'P2',
    title: 'Merge Duplicate Submissions',
    body: '4 similarity groups with ≥71% overlap have been detected. Merging these clusters will reduce backlog fragmentation, clarify ownership, and allow consolidated evaluation by the review board.',
    color: '#F59E0B',
  },
  {
    priority: 'P3',
    title: 'Launch Sustainability Challenge',
    body: 'The sustainability cluster has grown but lacks a focused challenge to channel ideas. Launching a dedicated challenge themed around "Green Policing" will increase submission quality and draw departmental engagement.',
    color: '#6B7280',
  },
];

const KEY_METRICS = [
  { label: 'Ideas This Month', value: 23, trend: '+4', up: true },
  { label: 'Avg Review Time', value: '3.2d', trend: '-0.8d', up: true },
  { label: 'Implementation Rate', value: '12%', trend: '+2%', up: true },
  { label: 'Duplicate Rate', value: '18%', trend: '-3%', up: false },
];

function AIInsightsView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#008755]" />
          <span className="text-base font-semibold text-gray-800" style={{ fontFamily: "'Dubai:Medium', sans-serif" }}>
            AI-Generated Intelligence Report
          </span>
        </div>
        <span className="text-xs text-gray-400">Generated today at 9:14 AM</span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Column 1: Emerging Themes */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Emerging Themes</p>
          {EMERGING_THEMES.map((item) => (
            <Card key={item.title} className="rounded-xl border border-border bg-white shadow-sm">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#26D07C] flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-semibold text-gray-800" style={{ fontFamily: "'Dubai:Medium', sans-serif" }}>
                    {item.title}
                  </p>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{item.body}</p>
                <Badge
                  className="text-[10px]"
                  style={{
                    backgroundColor: item.confidence === 'High' ? '#00875515' : '#F59E0B15',
                    color: item.confidence === 'High' ? '#008755' : '#B45309',
                    border: 'none',
                  }}
                >
                  {item.confidence} Confidence
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Column 2: Cross-Department Opportunities */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Cross-Department Opportunities</p>
          {CROSS_DEPT_OPPORTUNITIES.map((item) => (
            <Card key={item.theme} className="rounded-xl border border-border bg-white shadow-sm">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className="text-[10px] bg-[#008755]/10 text-[#005844] border-0">{item.dept1}</Badge>
                  <ChevronRight className="w-3 h-3 text-gray-400" />
                  <Badge className="text-[10px] bg-[#005844]/10 text-[#005844] border-0">{item.dept2}</Badge>
                </div>
                <p className="text-sm font-semibold text-gray-800" style={{ fontFamily: "'Dubai:Medium', sans-serif" }}>
                  {item.theme}
                </p>
                <p className="text-xs text-gray-600 leading-relaxed">{item.body}</p>
                <div className="flex items-center gap-1.5 text-xs text-[#008755]">
                  <ChevronRight className="w-3 h-3" />
                  <span className="font-medium">{item.rec}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Column 3: Action Recommendations */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Action Recommendations</p>
          {ACTION_RECOMMENDATIONS.map((item, i) => (
            <Card key={item.priority} className="rounded-xl border border-border bg-white shadow-sm">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded text-white"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.priority}
                  </span>
                  <p className="text-sm font-semibold text-gray-800" style={{ fontFamily: "'Dubai:Medium', sans-serif" }}>
                    {item.title}
                  </p>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{item.body}</p>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <span className="font-medium text-gray-500">Action {i + 1} of 3</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Key Metrics Summary */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Key Metrics Summary</p>
        <div className="grid grid-cols-4 gap-3">
          {KEY_METRICS.map((m) => (
            <Card key={m.label} className="rounded-xl border border-border bg-white shadow-sm">
              <CardContent className="p-4">
                <p className="text-xs text-gray-500 mb-1">{m.label}</p>
                <p className="text-2xl font-bold text-gray-900">{m.value}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp
                    className={cn('w-3 h-3', m.up ? 'text-[#008755]' : 'text-gray-400 rotate-180')}
                  />
                  <span className={cn('text-xs font-medium', m.up ? 'text-[#008755]' : 'text-gray-400')}>
                    {m.trend}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Placeholder imports ────────────────────────────────────────────────────────
// Lucide icons not yet imported at top — pulled inline via the main imports above.
// Extra icon used inside KpiCard:
function Lightbulb(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.8 10.1 18.5 8.6 18.5 7A6.5 6.5 0 0 0 5.5 7c0 1.6.7 3.1 2 4.1C8.3 12.3 8.8 13 9 14" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export function ClusteringPage({ user, role, onNavigate }: PageProps) {
  const [activeView, setActiveView] = useState<View>('Overview');

  return (
    <div className="p-4 space-y-4 min-h-full">
      {/* Page header */}
      <div>
        <h1
          className="text-2xl font-bold text-gray-900"
          style={{ fontFamily: "'Dubai:Medium', sans-serif" }}
        >
          Idea Intelligence Workspace
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Make sense of your idea volume through clustering, alignment, and strategic opportunity analysis.
        </p>
      </div>

      {/* View switcher */}
      <div className="flex items-center gap-2 flex-wrap">
        {VIEWS.map((view) => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
              activeView === view
                ? 'bg-[#008755] text-white shadow-sm'
                : 'border border-border text-gray-600 hover:bg-muted',
            )}
          >
            {view}
          </button>
        ))}
      </div>

      {/* Active view */}
      {activeView === 'Overview' && <OverviewView />}
      {activeView === 'Strategic Alignment' && <StrategicAlignmentView />}
      {activeView === 'Opportunity Matrix' && <OpportunityMatrixView />}
      {activeView === 'Similarity Detector' && <SimilarityDetectorView />}
      {activeView === 'Cluster Map' && <ClusterMapView />}
      {activeView === 'AI Insights' && <AIInsightsView />}
    </div>
  );
}
