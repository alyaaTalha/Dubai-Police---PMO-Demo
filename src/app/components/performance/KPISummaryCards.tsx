import { useState } from "react";
import { TrendingUp, Target, AlertTriangle, Clock } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface KPISummaryCardsProps {
  totalKPIs: number;
  onTrackPercent: number;
  atRiskPercent: number;
  delayedPercent: number;
}

const miniChartData = [
  { value: 85 },
  { value: 88 },
  { value: 82 },
  { value: 90 },
  { value: 87 },
  { value: 92 },
];

export function KPISummaryCards({
  totalKPIs,
  onTrackPercent,
  atRiskPercent,
  delayedPercent,
}: KPISummaryCardsProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const cards = [
    {
      id: "total",
      title: "Total KPIs",
      value: totalKPIs.toString(),
      icon: Target,
      color: "#008755",
      bgColor: "#EBF2F9",
    },
    {
      id: "on-track",
      title: "On Track",
      value: `${onTrackPercent}%`,
      icon: TrendingUp,
      color: "#22c55e",
      bgColor: "#f0fdf4",
    },
    {
      id: "at-risk",
      title: "At Risk",
      value: `${atRiskPercent}%`,
      icon: AlertTriangle,
      color: "#f59e0b",
      bgColor: "#fffbeb",
    },
    {
      id: "delayed",
      title: "Delayed",
      value: `${delayedPercent}%`,
      icon: Clock,
      color: "#ef4444",
      bgColor: "#fef2f2",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="relative bg-white rounded-lg border border-[#e0e0e0] p-6 transition-all duration-300 hover:shadow-lg cursor-pointer"
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: card.bgColor }}
              >
                <Icon className="w-6 h-6" style={{ color: card.color }} />
              </div>
              {hoveredCard === card.id && card.id !== "total" && (
                <div className="absolute right-6 top-16 w-32 h-12">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={miniChartData}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={card.color}
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
            <p className="font-['Dubai:Regular',_sans-serif] text-[#6b7280] mb-2">
              {card.title}
            </p>
            <p
              className="font-['Dubai:Bold',_sans-serif]"
              style={{ color: card.color }}
            >
              {card.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}
