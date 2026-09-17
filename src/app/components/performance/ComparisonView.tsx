import { useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  ArrowLeft,
  Download,
  Plus,
  TrendingUp,
  TrendingDown,
  Minus,
  FileText,
  Table,
} from "lucide-react";
import { Separator } from "../ui/separator";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
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
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

type EntityType = "division" | "department";

interface Entity {
  id: string;
  name: string;
  type: EntityType;
  parentId?: string;
  performanceIndex: number;
  perspectives: {
    outcome: number;
    stakeholders: number;
    process: number;
    enablers: number;
  };
  kpis: KPIPerformance[];
}

interface KPIPerformance {
  name: string;
  target: number;
  actual: number;
  unit: string;
  weight: number;
}

interface Comparison {
  id: string;
  entityA: Entity | null;
  entityB: Entity | null;
}

const mockEntities: Entity[] = [
  {
    id: "d1",
    name: "D1 – Enforcement & Security",
    type: "division",
    performanceIndex: 92.3,
    perspectives: {
      outcome: 95,
      stakeholders: 91,
      process: 91,
      enablers: 90,
    },
    kpis: [
      { name: "Border Security Effectiveness", target: 95, actual: 96.8, unit: "%", weight: 15 },
      { name: "Prohibited Items Detection", target: 98, actual: 99.2, unit: "%", weight: 20 },
      { name: "Risk Assessment Accuracy", target: 92, actual: 94.3, unit: "%", weight: 12 },
      { name: "Inspection Processing Time", target: 15, actual: 12.5, unit: "min", weight: 10 },
      { name: "Staff Training Completion", target: 100, actual: 96.5, unit: "%", weight: 8 },
      { name: "Equipment Uptime", target: 98, actual: 95.2, unit: "%", weight: 8 },
    ],
  },
  {
    id: "d2",
    name: "D2 – Trade Facilitation",
    type: "division",
    performanceIndex: 88.5,
    perspectives: {
      outcome: 92,
      stakeholders: 89,
      process: 87,
      enablers: 86,
    },
    kpis: [
      { name: "Customs Clearance Speed", target: 24, actual: 18.5, unit: "hours", weight: 18 },
      { name: "Document Processing Accuracy", target: 99, actual: 98.8, unit: "%", weight: 15 },
      { name: "Trader Satisfaction Index", target: 85, actual: 87.2, unit: "%", weight: 12 },
      { name: "Electronic Declaration Rate", target: 95, actual: 93.5, unit: "%", weight: 10 },
      { name: "Duty Collection Efficiency", target: 98, actual: 97.1, unit: "%", weight: 15 },
      { name: "Query Resolution Time", target: 48, actual: 52.3, unit: "hours", weight: 10 },
    ],
  },
  {
    id: "d3",
    name: "D3 – Revenue Management",
    type: "division",
    performanceIndex: 85.2,
    perspectives: {
      outcome: 88,
      stakeholders: 84,
      process: 85,
      enablers: 84,
    },
    kpis: [
      { name: "Revenue Collection Rate", target: 100, actual: 98.5, unit: "%", weight: 25 },
      { name: "Audit Coverage", target: 30, actual: 28.3, unit: "%", weight: 15 },
      { name: "Post-Clearance Audit Efficiency", target: 90, actual: 87.5, unit: "%", weight: 12 },
      { name: "Revenue Leakage Prevention", target: 95, actual: 92.1, unit: "%", weight: 18 },
      { name: "Financial Reporting Accuracy", target: 100, actual: 99.8, unit: "%", weight: 10 },
      { name: "Tariff Classification Accuracy", target: 97, actual: 95.2, unit: "%", weight: 10 },
    ],
  },
  {
    id: "d1-dept1",
    name: "Border Control Department",
    type: "department",
    parentId: "d1",
    performanceIndex: 94.5,
    perspectives: {
      outcome: 96,
      stakeholders: 93,
      process: 93,
      enablers: 94,
    },
    kpis: [
      { name: "Screening Success Rate", target: 98, actual: 98.5, unit: "%", weight: 20 },
      { name: "Inspection Time per Vehicle", target: 8, actual: 6.5, unit: "min", weight: 15 },
      { name: "Staff Attendance Rate", target: 95, actual: 92.3, unit: "%", weight: 10 },
      { name: "Training Completion Rate", target: 100, actual: 95, unit: "%", weight: 12 },
      { name: "Equipment Maintenance", target: 100, actual: 98, unit: "%", weight: 8 },
    ],
  },
  {
    id: "d1-dept2",
    name: "Intelligence & Risk Department",
    type: "department",
    parentId: "d1",
    performanceIndex: 90.1,
    perspectives: {
      outcome: 94,
      stakeholders: 88,
      process: 89,
      enablers: 87,
    },
    kpis: [
      { name: "Risk Profile Accuracy", target: 92, actual: 94.3, unit: "%", weight: 25 },
      { name: "Intelligence Report Quality", target: 90, actual: 88.5, unit: "%", weight: 15 },
      { name: "Threat Detection Rate", target: 95, actual: 96.2, unit: "%", weight: 20 },
      { name: "Data Analysis Timeliness", target: 24, actual: 26.5, unit: "hours", weight: 12 },
      { name: "Inter-Agency Collaboration", target: 85, actual: 82.1, unit: "%", weight: 8 },
    ],
  },
  {
    id: "d2-dept1",
    name: "Clearance Processing Department",
    type: "department",
    parentId: "d2",
    performanceIndex: 89.8,
    perspectives: {
      outcome: 93,
      stakeholders: 90,
      process: 88,
      enablers: 87,
    },
    kpis: [
      { name: "Average Clearance Time", target: 20, actual: 16.5, unit: "hours", weight: 20 },
      { name: "First-Time Clearance Rate", target: 90, actual: 92.3, unit: "%", weight: 18 },
      { name: "Document Error Rate", target: 2, actual: 1.8, unit: "%", weight: 15 },
      { name: "System Uptime", target: 99, actual: 98.5, unit: "%", weight: 10 },
      { name: "Staff Productivity Index", target: 85, actual: 87.2, unit: "%", weight: 12 },
    ],
  },
];

function calculateVariance(actual: number, target: number): number {
  return ((actual - target) / target) * 100;
}

function getVarianceColor(variance: number, isPositive: boolean = true): string {
  // isPositive = true means higher is better
  const effectiveVariance = isPositive ? variance : -variance;
  if (effectiveVariance >= 0) return "text-green-600";
  if (effectiveVariance >= -5) return "text-amber-600";
  return "text-red-600";
}

interface ComparisonViewProps {
  onBack?: () => void;
}

export function ComparisonView({ onBack }: ComparisonViewProps) {
  const [comparisons, setComparisons] = useState<Comparison[]>([
    { id: "comp-1", entityA: null, entityB: null },
  ]);
  const [hoveredKPI, setHoveredKPI] = useState<string | null>(null);

  const handleEntitySelect = (comparisonId: string, side: "A" | "B", entityId: string) => {
    const entity = mockEntities.find((e) => e.id === entityId);
    if (!entity) return;

    setComparisons((prev) =>
      prev.map((comp) =>
        comp.id === comparisonId
          ? { ...comp, [side === "A" ? "entityA" : "entityB"]: entity }
          : comp
      )
    );
  };

  const handleAddComparison = () => {
    const newComparison: Comparison = {
      id: `comp-${Date.now()}`,
      entityA: null,
      entityB: null,
    };
    setComparisons((prev) => [...prev, newComparison]);
    toast.success("New comparison added");
  };

  const handleRemoveComparison = (comparisonId: string) => {
    if (comparisons.length === 1) {
      toast.error("At least one comparison is required");
      return;
    }
    setComparisons((prev) => prev.filter((comp) => comp.id !== comparisonId));
    toast.success("Comparison removed");
  };

  const handleExport = (format: "pdf" | "excel") => {
    toast.success(`Exporting comparison report as ${format.toUpperCase()}...`, {
      description: "Your download will begin shortly",
    });
  };

  return (
    <div className="h-full overflow-auto bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#008755] to-[#1e3a5f] text-white p-6 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="text-white hover:bg-white/20"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            <div>
              <h1 className="text-[28px] text-white mb-1">Performance Comparison</h1>
              <p className="text-[14px] text-white/80">
                Benchmark divisions and departments to identify best practices
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleExport("excel")}
            >
              <Table className="w-4 h-4 mr-2" />
              Export Excel
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleExport("pdf")}
            >
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Comparisons */}
      <div className="p-6 space-y-6">
        <AnimatePresence>
          {comparisons.map((comparison, index) => (
            <ComparisonPanel
              key={comparison.id}
              comparison={comparison}
              index={index}
              entities={mockEntities}
              onEntitySelect={handleEntitySelect}
              onRemove={() => handleRemoveComparison(comparison.id)}
              canRemove={comparisons.length > 1}
              hoveredKPI={hoveredKPI}
              onHoverKPI={setHoveredKPI}
            />
          ))}
        </AnimatePresence>

        {/* Add Comparison Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <Button
            variant="outline"
            onClick={handleAddComparison}
            className="border-dashed border-2 h-16 w-full max-w-md text-[#008755] hover:bg-blue-50"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Another Comparison
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

interface ComparisonPanelProps {
  comparison: Comparison;
  index: number;
  entities: Entity[];
  onEntitySelect: (comparisonId: string, side: "A" | "B", entityId: string) => void;
  onRemove: () => void;
  canRemove: boolean;
  hoveredKPI: string | null;
  onHoverKPI: (kpi: string | null) => void;
}

function ComparisonPanel({
  comparison,
  index,
  entities,
  onEntitySelect,
  onRemove,
  canRemove,
  hoveredKPI,
  onHoverKPI,
}: ComparisonPanelProps) {
  const { entityA, entityB } = comparison;
  const hasValidComparison = entityA && entityB;

  // Prepare radar chart data
  const radarData = hasValidComparison
    ? [
        {
          perspective: "Outcome",
          [entityA.name]: entityA.perspectives.outcome,
          [entityB.name]: entityB.perspectives.outcome,
        },
        {
          perspective: "Stakeholders",
          [entityA.name]: entityA.perspectives.stakeholders,
          [entityB.name]: entityB.perspectives.stakeholders,
        },
        {
          perspective: "Process",
          [entityA.name]: entityA.perspectives.process,
          [entityB.name]: entityB.perspectives.process,
        },
        {
          perspective: "Enablers",
          [entityA.name]: entityA.perspectives.enablers,
          [entityB.name]: entityB.perspectives.enablers,
        },
      ]
    : [];

  // Prepare bar chart data
  const barData = hasValidComparison
    ? entityA.kpis.slice(0, 6).map((kpiA, idx) => {
        const kpiB = entityB.kpis[idx];
        // Normalize to percentage for comparison
        const normalizeValue = (actual: number, target: number) =>
          (actual / target) * 100;
        return {
          name: kpiA.name.split(" ").slice(0, 2).join(" "),
          fullName: kpiA.name,
          [entityA.name]: normalizeValue(kpiA.actual, kpiA.target),
          [entityB.name]: kpiB ? normalizeValue(kpiB.actual, kpiB.target) : 0,
        };
      })
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-gray-900">
            Comparison {index + 1}
          </h2>
          {canRemove && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRemove}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Minus className="w-4 h-4 mr-1" />
              Remove
            </Button>
          )}
        </div>

        {/* Entity Selectors */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-[12px] text-gray-600 mb-2 block">Entity A</label>
            <Select
              value={entityA?.id || ""}
              onValueChange={(value) => onEntitySelect(comparison.id, "A", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select division or department" />
              </SelectTrigger>
              <SelectContent>
                <div className="text-[11px] text-gray-500 px-2 py-1 uppercase">
                  Divisions
                </div>
                {entities
                  .filter((e) => e.type === "division")
                  .map((entity) => (
                    <SelectItem key={entity.id} value={entity.id}>
                      {entity.name}
                    </SelectItem>
                  ))}
                <Separator className="my-2" />
                <div className="text-[11px] text-gray-500 px-2 py-1 uppercase">
                  Departments
                </div>
                {entities
                  .filter((e) => e.type === "department")
                  .map((entity) => (
                    <SelectItem key={entity.id} value={entity.id}>
                      {entity.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            {entityA && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-2 p-3 bg-blue-50 rounded border border-blue-200"
              >
                <div className="flex items-center justify-between mb-1">
                  <Badge variant="outline" className="text-[10px]">
                    {entityA.type}
                  </Badge>
                  <div className="text-[18px] text-[#008755]">
                    {entityA.performanceIndex.toFixed(1)}%
                  </div>
                </div>
                <div className="text-[11px] text-gray-600">Performance Index</div>
              </motion.div>
            )}
          </div>

          <div>
            <label className="text-[12px] text-gray-600 mb-2 block">Entity B</label>
            <Select
              value={entityB?.id || ""}
              onValueChange={(value) => onEntitySelect(comparison.id, "B", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select division or department" />
              </SelectTrigger>
              <SelectContent>
                <div className="text-[11px] text-gray-500 px-2 py-1 uppercase">
                  Divisions
                </div>
                {entities
                  .filter((e) => e.type === "division")
                  .map((entity) => (
                    <SelectItem key={entity.id} value={entity.id}>
                      {entity.name}
                    </SelectItem>
                  ))}
                <Separator className="my-2" />
                <div className="text-[11px] text-gray-500 px-2 py-1 uppercase">
                  Departments
                </div>
                {entities
                  .filter((e) => e.type === "department")
                  .map((entity) => (
                    <SelectItem key={entity.id} value={entity.id}>
                      {entity.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            {entityB && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-2 p-3 bg-purple-50 rounded border border-purple-200"
              >
                <div className="flex items-center justify-between mb-1">
                  <Badge variant="outline" className="text-[10px]">
                    {entityB.type}
                  </Badge>
                  <div className="text-[18px] text-purple-600">
                    {entityB.performanceIndex.toFixed(1)}%
                  </div>
                </div>
                <div className="text-[11px] text-gray-600">Performance Index</div>
              </motion.div>
            )}
          </div>
        </div>

        {hasValidComparison && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Overall Performance Difference */}
            <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="text-center">
                <div className="text-[12px] text-gray-600 mb-2 uppercase">
                  Performance Index Difference
                </div>
                <div className="flex items-center justify-center gap-3">
                  <div className="text-[24px] text-[#008755]">
                    {entityA.performanceIndex.toFixed(1)}%
                  </div>
                  <div className="text-gray-400">vs</div>
                  <div className="text-[24px] text-purple-600">
                    {entityB.performanceIndex.toFixed(1)}%
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-center gap-2">
                  {entityA.performanceIndex > entityB.performanceIndex ? (
                    <>
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-[14px] text-green-600">
                        +{(entityA.performanceIndex - entityB.performanceIndex).toFixed(1)}%
                        points lead
                      </span>
                    </>
                  ) : entityA.performanceIndex < entityB.performanceIndex ? (
                    <>
                      <TrendingDown className="w-4 h-4 text-red-600" />
                      <span className="text-[14px] text-red-600">
                        {(entityA.performanceIndex - entityB.performanceIndex).toFixed(1)}%
                        points behind
                      </span>
                    </>
                  ) : (
                    <span className="text-[14px] text-gray-600">Equal performance</span>
                  )}
                </div>
              </div>
            </Card>

            {/* Charts */}
            <div className="grid grid-cols-2 gap-6">
              {/* Radar Chart - Perspectives */}
              <Card className="p-4">
                <h3 className="text-gray-900 mb-4 text-center">
                  Perspective Performance
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis
                      dataKey="perspective"
                      tick={{ fontSize: 11, fill: "#6b7280" }}
                    />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 100]}
                      tick={{ fontSize: 10, fill: "#6b7280" }}
                    />
                    <Radar
                      name={entityA.name}
                      dataKey={entityA.name}
                      stroke="#008755"
                      fill="#008755"
                      fillOpacity={0.5}
                      strokeWidth={2}
                    />
                    <Radar
                      name={entityB.name}
                      dataKey={entityB.name}
                      stroke="#9333ea"
                      fill="#9333ea"
                      fillOpacity={0.5}
                      strokeWidth={2}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: "11px" }}
                      iconType="circle"
                    />
                    <Tooltip
                      contentStyle={{
                        fontSize: "11px",
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </Card>

              {/* Bar Chart - KPIs */}
              <Card className="p-4">
                <h3 className="text-gray-900 mb-4 text-center">
                  KPI Performance (% of Target)
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 10, fill: "#6b7280" }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fill: "#6b7280" }}
                      domain={[0, 120]}
                    />
                    <Tooltip
                      contentStyle={{
                        fontSize: "11px",
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                      }}
                      formatter={(value: number) => `${value.toFixed(1)}%`}
                      labelFormatter={(label, payload) => {
                        if (payload && payload[0]) {
                          return payload[0].payload.fullName;
                        }
                        return label;
                      }}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: "11px" }}
                      iconType="rect"
                    />
                    <Bar
                      dataKey={entityA.name}
                      fill="#008755"
                      radius={[4, 4, 0, 0]}
                      onMouseEnter={(data) => onHoverKPI(data.fullName)}
                      onMouseLeave={() => onHoverKPI(null)}
                    />
                    <Bar
                      dataKey={entityB.name}
                      fill="#9333ea"
                      radius={[4, 4, 0, 0]}
                      onMouseEnter={(data) => onHoverKPI(data.fullName)}
                      onMouseLeave={() => onHoverKPI(null)}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Variance Table */}
            <Card>
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-gray-900">Detailed KPI Variance Analysis</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="text-left p-3 text-[11px] uppercase text-gray-600">
                        KPI Name
                      </th>
                      <th className="text-center p-3 text-[11px] uppercase text-gray-600">
                        {entityA.name}
                      </th>
                      <th className="text-center p-3 text-[11px] uppercase text-gray-600">
                        {entityB.name}
                      </th>
                      <th className="text-center p-3 text-[11px] uppercase text-gray-600">
                        Difference
                      </th>
                      <th className="text-center p-3 text-[11px] uppercase text-gray-600">
                        Best Performer
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {entityA.kpis.map((kpiA, idx) => {
                      const kpiB = entityB.kpis[idx];
                      if (!kpiB) return null;

                      const perfA = (kpiA.actual / kpiA.target) * 100;
                      const perfB = (kpiB.actual / kpiB.target) * 100;
                      const difference = perfA - perfB;
                      const isHighlighted =
                        hoveredKPI === kpiA.name || hoveredKPI === kpiB.name;

                      return (
                        <motion.tr
                          key={kpiA.name}
                          className={`border-b border-gray-100 transition-colors ${
                            isHighlighted ? "bg-yellow-50" : "hover:bg-blue-50/30"
                          }`}
                          animate={{
                            backgroundColor: isHighlighted ? "#fef9c3" : "transparent",
                          }}
                          transition={{ duration: 0.2 }}
                          onMouseEnter={() => onHoverKPI(kpiA.name)}
                          onMouseLeave={() => onHoverKPI(null)}
                        >
                          <td className="p-3">
                            <div className="text-[14px] text-gray-900">{kpiA.name}</div>
                            <div className="text-[11px] text-gray-500">
                              Target: {kpiA.target} {kpiA.unit}
                            </div>
                          </td>
                          <td className="p-3 text-center">
                            <div className="text-[14px] text-[#008755]">
                              {perfA.toFixed(1)}%
                            </div>
                            <div className="text-[11px] text-gray-600">
                              {kpiA.actual} {kpiA.unit}
                            </div>
                          </td>
                          <td className="p-3 text-center">
                            <div className="text-[14px] text-purple-600">
                              {perfB.toFixed(1)}%
                            </div>
                            <div className="text-[11px] text-gray-600">
                              {kpiB.actual} {kpiB.unit}
                            </div>
                          </td>
                          <td className="p-3 text-center">
                            <div
                              className={`text-[14px] flex items-center justify-center gap-1 ${getVarianceColor(
                                difference
                              )}`}
                            >
                              {difference > 0 ? (
                                <TrendingUp className="w-3 h-3" />
                              ) : difference < 0 ? (
                                <TrendingDown className="w-3 h-3" />
                              ) : null}
                              {difference > 0 ? "+" : ""}
                              {difference.toFixed(1)}%
                            </div>
                          </td>
                          <td className="p-3 text-center">
                            {perfA > perfB ? (
                              <Badge className="bg-blue-100 text-[#008755] border-blue-300 border">
                                {entityA.name.split("–")[0].trim()}
                              </Badge>
                            ) : perfB > perfA ? (
                              <Badge className="bg-purple-100 text-purple-600 border-purple-300 border">
                                {entityB.name.split("–")[0].trim()}
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-gray-600">
                                Equal
                              </Badge>
                            )}
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Key Insights */}
            <Card className="p-4 bg-blue-50 border-blue-200">
              <h3 className="text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#008755]" />
                Key Insights
              </h3>
              <ul className="space-y-2 text-[13px] text-gray-700">
                {entityA.performanceIndex > entityB.performanceIndex ? (
                  <li className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <span>
                      <strong>{entityA.name}</strong> outperforms{" "}
                      <strong>{entityB.name}</strong> by{" "}
                      {(entityA.performanceIndex - entityB.performanceIndex).toFixed(1)}
                      percentage points overall.
                    </span>
                  </li>
                ) : (
                  <li className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <span>
                      <strong>{entityB.name}</strong> outperforms{" "}
                      <strong>{entityA.name}</strong> by{" "}
                      {(entityB.performanceIndex - entityA.performanceIndex).toFixed(1)}
                      percentage points overall.
                    </span>
                  </li>
                )}
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 text-[#008755] mt-0.5 shrink-0">•</span>
                  <span>
                    Strongest shared performance area:{" "}
                    <strong>
                      {Object.entries(entityA.perspectives).reduce((a, b) =>
                        Math.min(a[1], entityB.perspectives[a[0] as keyof typeof entityB.perspectives]) >
                        Math.min(b[1], entityB.perspectives[b[0] as keyof typeof entityB.perspectives])
                          ? a
                          : b
                      )[0].charAt(0).toUpperCase() +
                        Object.entries(entityA.perspectives).reduce((a, b) =>
                          Math.min(a[1], entityB.perspectives[a[0] as keyof typeof entityB.perspectives]) >
                          Math.min(b[1], entityB.perspectives[b[0] as keyof typeof entityB.perspectives])
                            ? a
                            : b
                        )[0].slice(1)}{" "}
                      Perspective
                    </strong>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 text-amber-600 mt-0.5 shrink-0">•</span>
                  <span>
                    Opportunity for collaboration and best practice sharing in areas
                    where one entity significantly outperforms the other.
                  </span>
                </li>
              </ul>
            </Card>
          </motion.div>
        )}

        {!hasValidComparison && (
          <div className="py-12 text-center text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-[14px]">Select two entities to begin comparison</p>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
