import {
  Send, Sparkles, ClipboardList, GitBranch,
  TrendingUp, Briefcase, Rocket, FlaskConical,
  Archive, ArrowRight, ChevronRight,
} from 'lucide-react';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { cn } from '../../ui/utils';

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

// ── Pipeline steps ─────────────────────────────────────────────────────────────
const PIPELINE_STEPS = [
  {
    id: 'submit',
    label: 'Submit Idea',
    icon: Send,
    color: '#008755',
    bg: '#008755',
    description: 'Any employee can submit an idea through a single platform entry point',
    hasAction: true,
  },
  {
    id: 'ai',
    label: 'AI Enrich & Validate',
    icon: Sparkles,
    color: '#26D07C',
    bg: '#26D07C',
    description: 'The AI assistant enriches your idea with context, checks for duplicates, and scores completeness',
    hasAction: false,
  },
  {
    id: 'review',
    label: 'Review & Prioritize',
    icon: ClipboardList,
    color: '#005844',
    bg: '#005844',
    description: 'Primary Coordinators review, score, and prioritize ideas using defined criteria',
    hasAction: false,
  },
  {
    id: 'classify',
    label: 'Classify & Route',
    icon: GitBranch,
    color: '#008755',
    bg: '#008755',
    description: 'Ideas are classified and routed to the appropriate track based on type and scope',
    hasAction: false,
  },
];

// ── Tracks ─────────────────────────────────────────────────────────────────────
const TRACKS = [
  {
    id: 'improvement',
    label: 'Improvement Track',
    icon: TrendingUp,
    color: '#26D07C',
    textColor: '#005844',
    description: 'Operational improvements and Kaizen-style enhancements. Fast-tracked for quick wins.',
    timeline: '30–60 days',
    owner: 'Department Head',
  },
  {
    id: 'project',
    label: 'Project Track',
    icon: Briefcase,
    color: '#008755',
    textColor: '#ffffff',
    description: 'Strategic, IT, or facilities projects requiring structured delivery and budgeting.',
    timeline: '3–12 months',
    owner: 'PMO',
  },
  {
    id: 'initiative',
    label: 'Initiative Track',
    icon: Rocket,
    color: '#005844',
    textColor: '#ffffff',
    description: 'Executive-sponsored or community initiatives with broad organizational impact.',
    timeline: '6–24 months',
    owner: 'Executive Sponsor',
  },
  {
    id: 'rnd',
    label: 'R&D Track',
    icon: FlaskConical,
    color: '#115E67',
    textColor: '#ffffff',
    description: 'Research, pilot programs, and experimental concepts. Sandbox for innovation.',
    timeline: 'Variable',
    owner: 'Innovation Office',
  },
  {
    id: 'vault',
    label: 'Idea Vault',
    icon: Archive,
    color: '#8D9093',
    textColor: '#ffffff',
    description: 'Duplicates, deferred, or rejected ideas preserved for future reconsideration.',
    timeline: 'Reviewed quarterly',
    owner: 'Innovation Office',
  },
];

// ── Stats ──────────────────────────────────────────────────────────────────────
const STATS = [
  { value: '4', label: 'Tracks for Every Idea Type' },
  { value: '100%', label: 'of Ideas Tracked' },
  { value: '1', label: 'Single Submission Point' },
];

export function InnovationJourneyPage({ user, role, onNavigate }: PageProps) {
  return (
    <div className="space-y-8 pb-10">

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="text-center space-y-2 pt-2">
        <h1
          className="text-3xl tracking-tight text-[#005844]"
          style={{ fontFamily: "'Dubai Medium', sans-serif" }}
        >
          The Innovation Journey
        </h1>
        <p className="text-[#8D9093] text-base max-w-xl mx-auto">
          One front door. Every idea governed, valued, and tracked.
        </p>
      </div>

      {/* ── Pipeline card ────────────────────────────────────────────────────── */}
      <Card className="rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <CardContent className="pt-4 pb-4">
          {/* Step label row */}
          <div className="flex items-start gap-0 overflow-x-auto pb-2">
            {PIPELINE_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isLast = idx === PIPELINE_STEPS.length - 1;
              return (
                <div key={step.id} className="flex items-start flex-1 min-w-0">
                  {/* Step node */}
                  <div className="flex flex-col items-center flex-1 min-w-[140px] px-2">
                    {/* Icon bubble */}
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center shadow-md mb-3 flex-shrink-0"
                      style={{ backgroundColor: step.bg }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Step number badge */}
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full text-white mb-1"
                      style={{ backgroundColor: step.bg }}
                    >
                      Step {idx + 1}
                    </span>

                    {/* Label */}
                    <p
                      className="text-sm font-semibold text-center text-[#1a1a1a] mb-1"
                      style={{ fontFamily: "'Dubai Medium', sans-serif" }}
                    >
                      {step.label}
                    </p>

                    {/* Description */}
                    <p className="text-xs text-[#8D9093] text-center leading-relaxed max-w-[160px]">
                      {step.description}
                    </p>

                    {/* CTA for step 1 */}
                    {step.hasAction && (
                      <Button
                        onClick={() => onNavigate('submit-idea')}
                        className="mt-3 text-xs bg-[#008755] hover:bg-[#005844] text-white rounded-lg px-3 py-1.5 h-auto"
                        size="sm"
                      >
                        Submit Your Idea
                        <ChevronRight className="w-3 h-3 ml-1" />
                      </Button>
                    )}
                  </div>

                  {/* Arrow connector */}
                  {!isLast && (
                    <div className="flex items-center justify-center pt-5 flex-shrink-0 px-1">
                      <ArrowRight className="w-5 h-5 text-[#26D07C]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Branch divider */}
          <div className="relative my-6 flex flex-col items-center">
            <div className="w-px h-6 bg-[#26D07C]" />
            <div className="w-3/4 h-px bg-[#26D07C] opacity-40" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white px-3">
              <span
                className="text-xs font-semibold text-[#008755] uppercase tracking-wider"
                style={{ fontFamily: "'Dubai Medium', sans-serif" }}
              >
                Routes to one of 5 tracks
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Tracks grid ──────────────────────────────────────────────────────── */}
      <div>
        <h2
          className="text-base font-semibold text-[#005844] mb-3 px-1"
          style={{ fontFamily: "'Dubai Medium', sans-serif" }}
        >
          Innovation Tracks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {TRACKS.map((track) => {
            const Icon = track.icon;
            return (
              <Card
                key={track.id}
                className="rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Colored header */}
                <div
                  className="px-4 pt-4 pb-3 flex items-center gap-2"
                  style={{ backgroundColor: track.color }}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" style={{ color: track.textColor }} />
                  <span
                    className="text-sm font-semibold leading-tight"
                    style={{ color: track.textColor, fontFamily: "'Dubai Medium', sans-serif" }}
                  >
                    {track.label}
                  </span>
                </div>

                <CardContent className="pt-4 pb-4 space-y-3">
                  <p className="text-xs text-[#555] leading-relaxed">
                    {track.description}
                  </p>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-semibold text-[#8D9093] uppercase tracking-wide">Timeline</span>
                      <span className="text-[10px] text-[#1a1a1a] font-medium">{track.timeline}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-semibold text-[#8D9093] uppercase tracking-wide">Owner</span>
                      <span className="text-[10px] text-[#1a1a1a] font-medium">{track.owner}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* ── Principle strip ───────────────────────────────────────────────────── */}
      <div className="bg-[#005844] text-white rounded-xl px-6 py-5">
        <p className="text-sm leading-relaxed text-center max-w-3xl mx-auto">
          "One consistent front door and governance model ensures every idea — regardless of type,
          size, or source — is captured, valued, and acted upon with full transparency."
        </p>
      </div>

      {/* ── Stats row ─────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-4">
        {STATS.map((stat) => (
          <Card key={stat.label} className="rounded-xl border border-gray-100 shadow-sm">
            <CardContent className="pt-4 pb-4 text-center">
              <p
                className="text-3xl font-bold text-[#008755] mb-1"
                style={{ fontFamily: "'Dubai Medium', sans-serif" }}
              >
                {stat.value}
              </p>
              <p className="text-xs text-[#8D9093] leading-tight">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
