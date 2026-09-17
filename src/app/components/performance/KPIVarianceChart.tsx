import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  {
    category: "Strategic",
    target: 95,
    actual: 92,
    variance: -3,
  },
  {
    category: "Operational",
    target: 90,
    actual: 94,
    variance: 4,
  },
  {
    category: "Financial",
    target: 85,
    actual: 88,
    variance: 3,
  },
  {
    category: "Customer",
    target: 92,
    actual: 85,
    variance: -7,
  },
  {
    category: "Innovation",
    target: 80,
    actual: 76,
    variance: -4,
  },
];

export function KPIVarianceChart() {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg border border-[#e0e0e0] shadow-lg">
          <p className="  text-[#1f2937] mb-2">
            {data.category}
          </p>
          <div className="space-y-1">
            <p className="font-['Dubai:Regular',_sans-serif] text-[#6b7280]">
              Target: <span className="text-[#008755]">{data.target}</span>
            </p>
            <p className="font-['Dubai:Regular',_sans-serif] text-[#6b7280]">
              Actual: <span className="text-[#22c55e]">{data.actual}</span>
            </p>
            <p className="font-['Dubai:Regular',_sans-serif] text-[#6b7280]">
              Variance:{" "}
              <span
                className={
                  data.variance >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"
                }
              >
                {data.variance > 0 ? "+" : ""}
                {data.variance}
              </span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg border border-[#e0e0e0] p-6">
      <div className="mb-6">
        <h3 className="  text-[#1f2937] mb-1">
          KPI Variance Analysis
        </h3>
        <p className="font-['Dubai:Regular',_sans-serif] text-[#6b7280]">
          Target vs Actual Performance by Category
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barGap={8}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="category"
            tick={{ fontFamily: "Dubai, sans-serif", fontSize: 12 }}
            stroke="#6b7280"
          />
          <YAxis
            tick={{ fontFamily: "Dubai, sans-serif", fontSize: 12 }}
            stroke="#6b7280"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              fontFamily: "Dubai, sans-serif",
              fontSize: 14,
            }}
          />
          <Bar dataKey="target" fill="#008755" name="Target" radius={[4, 4, 0, 0]} />
          <Bar dataKey="actual" name="Actual" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.actual >= entry.target ? "#22c55e" : "#ef4444"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
