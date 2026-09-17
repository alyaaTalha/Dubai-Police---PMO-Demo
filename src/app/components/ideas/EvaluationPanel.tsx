import { useState } from 'react';
import { X, UserCheck, ChevronDown, CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../ui/utils';

// ── Types ─────────────────────────────────────────────────────────────────────
type CriterionId = 'strategic' | 'feasibility' | 'impact' | 'cost' | 'risk';

interface EvaluationPanelProps {
  ideaId: number | string;
  ideaTitle: string;
  aiHints?: {
    strategic?: number;
    feasibility?: number;
    impact?: number;
    cost?: number;
    risk?: number;
  };
  onConfirm: (score: number) => void;
  onClose: () => void;
}

// ── Static config ─────────────────────────────────────────────────────────────
const CRITERIA: { id: CriterionId; label: string; weight: number; lowMeans: string }[] = [
  { id: 'strategic',   label: 'Strategic Alignment', weight: 30, lowMeans: 'Misaligned with pillars' },
  { id: 'feasibility', label: 'Feasibility',         weight: 25, lowMeans: 'Technically/resourcefully infeasible' },
  { id: 'impact',      label: 'Expected Impact',     weight: 25, lowMeans: 'Minimal benefit' },
  { id: 'cost',        label: 'Cost Efficiency',     weight: 10, lowMeans: 'Poor ROI' },
  { id: 'risk',        label: 'Risk Level',          weight: 10, lowMeans: 'High risk (score 5 = lowest risk)' },
];

const SME_EVALUATORS = [
  'Dr. Khalid Al Nuaimi',
  'Eng. Maryam Al Rashdi',
  'Ahmed Al Suwaidi',
  'Lt. Noor Al Shamsi',
  'Dr. Reem Al Falasi',
  'Brig. Salem Al Marri',
];

// ── Component ─────────────────────────────────────────────────────────────────
export function EvaluationPanel({
  ideaId: _ideaId,
  ideaTitle,
  aiHints = {},
  onConfirm,
  onClose,
}: EvaluationPanelProps) {
  const [scores, setScores]           = useState<Partial<Record<CriterionId, number>>>({});
  const [aiHighlighted, setAiHighlighted] = useState<Partial<Record<CriterionId, boolean>>>({});
  const [smeDropdown, setSmeDropdown] = useState<CriterionId | null>(null);
  const [smeAssigned, setSmeAssigned] = useState<Partial<Record<CriterionId, string>>>({});

  // Live overall score — 0‑100
  const overallScore = Math.round(
    CRITERIA.reduce((sum, c) => sum + (scores[c.id] ?? 0) / 5 * c.weight, 0)
  );

  const allConfirmed = CRITERIA.every(c => scores[c.id] !== undefined);

  function scoreColorClass(s: number) {
    if (s >= 70) return 'text-[#008755]';
    if (s >= 50) return 'text-amber-600';
    return 'text-red-600';
  }

  function scoreBarClass(s: number) {
    if (s >= 70) return 'bg-[#008755]';
    if (s >= 50) return 'bg-amber-400';
    return 'bg-red-400';
  }

  function handleConfirm() {
    if (!allConfirmed) return;
    onConfirm(overallScore);
    onClose();
  }

  return (
    <div className="rounded-xl border border-[#008755]/20 bg-[#008755]/3 p-4 space-y-3 mt-2">

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2">
        <CheckCircle2 size={13} className="text-[#008755] shrink-0" />
        <p className="text-xs font-semibold text-gray-800 flex-1">Structured Evaluation</p>
        <p className="text-[10px] text-gray-400 truncate max-w-[160px] hidden sm:block">{ideaTitle}</p>
        <button
          onClick={onClose}
          className="ml-auto text-gray-400 hover:text-gray-600 transition-colors shrink-0"
          aria-label="Close evaluation panel"
        >
          <X size={13} />
        </button>
      </div>

      {/* ── Criteria rows ────────────────────────────────────────────────────── */}
      <div className="space-y-2">
        {CRITERIA.map(c => {
          const hint        = aiHints[c.id];
          const selected    = scores[c.id];
          const highlighted = aiHighlighted[c.id];
          const assignedSme = smeAssigned[c.id];

          return (
            <div key={c.id} className="flex flex-wrap items-center gap-2 min-h-[26px]">

              {/* Label + weight pill */}
              <div className="flex items-center gap-1.5 w-44 shrink-0">
                <span className="text-[11px] font-medium text-gray-700">{c.label}</span>
                <span className="text-[10px] bg-gray-100 text-gray-500 rounded px-1 py-px whitespace-nowrap">
                  ({c.weight}%)
                </span>
              </div>

              {/* AI hint chip — clickable to highlight suggested button */}
              {hint !== undefined && (
                <button
                  onClick={() =>
                    setAiHighlighted(prev => ({ ...prev, [c.id]: !prev[c.id] }))
                  }
                  title={`AI suggests ${hint} — click to highlight, then confirm with a score button`}
                  className={cn(
                    'inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-[10px] rounded px-1.5 py-0.5 transition-all whitespace-nowrap',
                    highlighted && 'ring-2 ring-blue-300'
                  )}
                >
                  <Sparkles size={9} />
                  AI: {hint}
                </button>
              )}

              {/* Score buttons 1–5 */}
              <div className="flex gap-1">
                {([1, 2, 3, 4, 5] as const).map(n => {
                  const isSelected    = selected === n;
                  const isAiSuggested = highlighted && hint === n;
                  return (
                    <button
                      key={n}
                      onClick={() => setScores(prev => ({ ...prev, [c.id]: n }))}
                      className={cn(
                        'w-6 h-6 rounded text-[11px] font-semibold transition-all',
                        isSelected
                          ? 'bg-[#008755] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                        isAiSuggested && !isSelected && 'ring-2 ring-blue-300',
                      )}
                    >
                      {n}
                    </button>
                  );
                })}
              </div>

              {/* SME assign */}
              <div className="relative">
                {assignedSme ? (
                  <span className="flex items-center gap-1 text-[10px] text-gray-600 whitespace-nowrap">
                    <UserCheck size={10} className="text-[#008755]" />
                    {assignedSme}
                  </span>
                ) : (
                  <button
                    onClick={() =>
                      setSmeDropdown(prev => (prev === c.id ? null : c.id))
                    }
                    className="flex items-center gap-0.5 text-[10px] text-gray-400 hover:text-[#008755] transition-colors whitespace-nowrap"
                  >
                    + Assign SME
                    <ChevronDown size={9} />
                  </button>
                )}

                {smeDropdown === c.id && (
                  <div className="absolute left-0 top-full mt-1 z-30 bg-white border border-gray-200 rounded-lg shadow-lg w-44 overflow-hidden">
                    {SME_EVALUATORS.map(evaluator => (
                      <button
                        key={evaluator}
                        onClick={() => {
                          setSmeAssigned(prev => ({ ...prev, [c.id]: evaluator }));
                          setSmeDropdown(null);
                        }}
                        className="w-full text-left text-[11px] px-3 py-1.5 hover:bg-gray-50 transition-colors text-gray-700"
                      >
                        {evaluator}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Footer / summary ─────────────────────────────────────────────────── */}
      <div className="pt-2 border-t border-[#008755]/10 space-y-2">

        {/* Score readout */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-700">Overall Score:</span>
          <span className={cn('text-sm font-bold tabular-nums', scoreColorClass(overallScore))}>
            {overallScore} / 100
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
          <div
            className={cn('h-full rounded-full transition-all duration-300', scoreBarClass(overallScore))}
            style={{ width: `${overallScore}%` }}
          />
        </div>

        <p className="text-[10px] text-gray-400">
          Weighted average of confirmed criteria. Score flows to Pipeline and Insights.
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-1">
          <Button
            size="sm"
            disabled={!allConfirmed}
            onClick={handleConfirm}
            className="h-7 px-3 text-xs bg-[#008755] hover:bg-[#005844] text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCircle2 size={11} className="mr-1" />
            Confirm Evaluation
          </Button>
          <button
            onClick={onClose}
            className="text-xs text-gray-400 underline hover:text-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
