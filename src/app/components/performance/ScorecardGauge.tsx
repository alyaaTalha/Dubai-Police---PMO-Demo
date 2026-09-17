import { Progress } from "../ui/progress";

interface ScorecardGaugeProps {
  currentScore: number;
  targetScore: number;
  quarter: string;
}

export function ScorecardGauge({
  currentScore,
  targetScore,
  quarter,
}: ScorecardGaugeProps) {
  const percentage = (currentScore / targetScore) * 100;
  const status =
    percentage >= 90
      ? "On Track"
      : percentage >= 70
      ? "At Risk"
      : "Off Track";
  const statusColor =
    percentage >= 90 ? "#22c55e" : percentage >= 70 ? "#f59e0b" : "#ef4444";

  return (
    <div className="bg-white rounded-lg border border-[#e0e0e0] p-6">
      <div className="mb-4">
        <h3 className="font-['Dubai:Medium',_sans-serif] text-[#1f2937] mb-1">
          Scorecard Progress
        </h3>
        <p className="font-['Dubai:Regular',_sans-serif] text-[#6b7280]">
          {quarter}
        </p>
      </div>

      <div className="relative mb-6">
        <svg className="w-full h-48" viewBox="0 0 200 120">
          {/* Background arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Progress arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke={statusColor}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${(percentage / 100) * 251.2} 251.2`}
            className="transition-all duration-500"
          />
          {/* Center text */}
          <text
            x="100"
            y="85"
            textAnchor="middle"
            className="font-['Dubai:Bold',_sans-serif]"
            fontSize="32"
            fill="#1f2937"
          >
            {currentScore}
          </text>
          <text
            x="100"
            y="105"
            textAnchor="middle"
            className="font-['Dubai:Regular',_sans-serif]"
            fontSize="14"
            fill="#6b7280"
          >
            of {targetScore}
          </text>
        </svg>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-[#e5e7eb]">
        <div>
          <p className="font-['Dubai:Regular',_sans-serif] text-[#6b7280] mb-1">
            Status
          </p>
          <p
            className="font-['Dubai:Medium',_sans-serif]"
            style={{ color: statusColor }}
          >
            {status}
          </p>
        </div>
        <div className="text-right">
          <p className="font-['Dubai:Regular',_sans-serif] text-[#6b7280] mb-1">
            Completion
          </p>
          <p className="font-['Dubai:Medium',_sans-serif] text-[#1f2937]">
            {percentage.toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
}
