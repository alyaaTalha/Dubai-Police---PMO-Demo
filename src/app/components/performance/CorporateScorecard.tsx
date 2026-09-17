import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import heroDecoration from "../../../assets/sandbox-hero-decoration.png";
import internalIcon from "figma:asset/56c3a59fb9a3b1b84afb7b051b1842d94215e256.png";
import localGovIcon from "figma:asset/f2912597d6259f3e385203e7990c89270c7f87e7.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Database,
  FileText,
  Link2,
  Filter,
  Download,
  Award,
  Users,
  Cpu,
  Trophy,
  DollarSign,
  Handshake,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Separator } from "../ui/separator";

type KPIStatus = "green" | "amber" | "red";
type DataSource = "manual" | "integrated-erp" | "integrated-hrms" | "integrated-crm";

interface KPI {
  id: string;
  name: string;
  description: string;
  formula?: string;
  owner: string;
  target: number;
  actual: number;
  unit: string;
  status: KPIStatus;
  dataSource: DataSource;
  lastUpdated: string;
  sourceSystem?: string;
  trend: number[]; // Historical data points
  comments?: string[];
  history?: {
    date: string;
    value: number;
    status: KPIStatus;
  }[];
}

interface Perspective {
  id: string;
  title: string;
  description: string;
  kpis: KPI[];
}

const mockKPIs: Perspective[] = [
  {
    id: "outcomes",
    title: "Outcomes (Results)",
    description: "Strategic results and overall performance outcomes",
    kpis: [
      {
        id: "kpi-1",
        name: "Overall Customer Satisfaction Index",
        description: "Aggregate satisfaction score from all customer touchpoints",
        formula: "(Sum of satisfaction scores / Total responses) × 100",
        owner: "Customer Services Division",
        target: 90,
        actual: 92.5,
        unit: "%",
        status: "green",
        dataSource: "integrated-crm",
        lastUpdated: "2025-10-20T14:30:00",
        sourceSystem: "CRM System",
        trend: [88, 89, 91, 92.5],
        history: [
          { date: "Q1 2025", value: 88, status: "amber" },
          { date: "Q2 2025", value: 89, status: "amber" },
          { date: "Q3 2025", value: 91, status: "green" },
          { date: "Q4 2025", value: 92.5, status: "green" },
        ],
        comments: ["Improved after contact center upgrade", "New feedback channels added"],
      },
      {
        id: "kpi-2",
        name: "Clearance Processing Time",
        description: "Average time to complete customs clearance from submission to approval",
        formula: "Sum(Processing Time) / Total Clearances",
        owner: "Operations Division",
        target: 24,
        actual: 18.5,
        unit: "hours",
        status: "green",
        dataSource: "integrated-erp",
        lastUpdated: "2025-10-22T09:15:00",
        sourceSystem: "ERP System",
        trend: [22, 20, 19, 18.5],
        history: [
          { date: "Q1 2025", value: 22, status: "amber" },
          { date: "Q2 2025", value: 20, status: "green" },
          { date: "Q3 2025", value: 19, status: "green" },
          { date: "Q4 2025", value: 18.5, status: "green" },
        ],
      },
      {
        id: "kpi-3",
        name: "Revenue Achievement Rate",
        description: "Actual revenue collected vs planned revenue target",
        formula: "(Actual Revenue / Target Revenue) × 100",
        owner: "Finance Department",
        target: 100,
        actual: 104.8,
        unit: "%",
        status: "green",
        dataSource: "integrated-erp",
        lastUpdated: "2025-10-21T16:45:00",
        sourceSystem: "Financial System",
        trend: [98, 101, 103, 104.8],
      },
      {
        id: "kpi-4",
        name: "Strategic Initiative Completion Rate",
        description: "Percentage of strategic initiatives completed on time",
        formula: "(Completed Initiatives / Total Initiatives) × 100",
        owner: "Strategy & Corporate Excellence",
        target: 85,
        actual: 78.2,
        unit: "%",
        status: "amber",
        dataSource: "manual",
        lastUpdated: "2025-10-19T11:00:00",
        sourceSystem: "Manual Entry",
        trend: [75, 76, 77, 78.2],
        history: [
          { date: "Q1 2025", value: 75, status: "red" },
          { date: "Q2 2025", value: 76, status: "amber" },
          { date: "Q3 2025", value: 77, status: "amber" },
          { date: "Q4 2025", value: 78.2, status: "amber" },
        ],
      },
    ],
  },
  {
    id: "stakeholders",
    title: "Stakeholders",
    description: "Stakeholder engagement and satisfaction metrics",
    kpis: [
      {
        id: "kpi-5",
        name: "Trade Community Satisfaction",
        description: "Satisfaction level of importers, exporters, and brokers",
        owner: "Customer Services Division",
        target: 88,
        actual: 91.3,
        unit: "%",
        status: "green",
        dataSource: "integrated-crm",
        lastUpdated: "2025-10-20T13:20:00",
        sourceSystem: "CRM System",
        trend: [87, 89, 90, 91.3],
      },
      {
        id: "kpi-6",
        name: "Government Entity Collaboration Index",
        description: "Effectiveness of inter-governmental cooperation and data sharing",
        owner: "Government Relations Department",
        target: 85,
        actual: 83.5,
        unit: "%",
        status: "amber",
        dataSource: "manual",
        lastUpdated: "2025-10-18T10:30:00",
        sourceSystem: "Manual Entry",
        trend: [80, 82, 83, 83.5],
      },
      {
        id: "kpi-7",
        name: "Employee Engagement Score",
        description: "Annual employee satisfaction and engagement survey results",
        formula: "Composite score from engagement survey",
        owner: "Human Resources Department",
        target: 80,
        actual: 85.7,
        unit: "%",
        status: "green",
        dataSource: "integrated-hrms",
        lastUpdated: "2025-10-15T08:00:00",
        sourceSystem: "HRMS",
        trend: [82, 83, 84, 85.7],
      },
      {
        id: "kpi-8",
        name: "Media & Public Perception Rating",
        description: "Public sentiment analysis from media and social channels",
        owner: "Corporate Communications",
        target: 75,
        actual: 68.4,
        unit: "%",
        status: "red",
        dataSource: "integrated-crm",
        lastUpdated: "2025-10-22T15:10:00",
        sourceSystem: "Social Media Analytics",
        trend: [72, 70, 69, 68.4],
      },
    ],
  },
  {
    id: "processes",
    title: "Internal Processes",
    description: "Operational efficiency and process excellence",
    kpis: [
      {
        id: "kpi-9",
        name: "Inspection Accuracy Rate",
        description: "Percentage of accurate inspections (no errors or re-inspections)",
        formula: "(Accurate Inspections / Total Inspections) × 100",
        owner: "Enforcement & Security Division",
        target: 95,
        actual: 96.8,
        unit: "%",
        status: "green",
        dataSource: "integrated-erp",
        lastUpdated: "2025-10-22T12:00:00",
        sourceSystem: "Inspection Management System",
        trend: [94, 95, 96, 96.8],
      },
      {
        id: "kpi-10",
        name: "Risk Assessment Coverage",
        description: "Percentage of shipments processed through risk assessment",
        owner: "Risk Management Department",
        target: 100,
        actual: 98.5,
        unit: "%",
        status: "amber",
        dataSource: "integrated-erp",
        lastUpdated: "2025-10-21T14:25:00",
        sourceSystem: "Risk Engine",
        trend: [96, 97, 98, 98.5],
      },
      {
        id: "kpi-11",
        name: "Digital Transaction Rate",
        description: "Percentage of transactions completed through digital channels",
        formula: "(Digital Transactions / Total Transactions) × 100",
        owner: "IT Division",
        target: 90,
        actual: 94.2,
        unit: "%",
        status: "green",
        dataSource: "integrated-erp",
        lastUpdated: "2025-10-22T16:30:00",
        sourceSystem: "Digital Gateway",
        trend: [88, 91, 93, 94.2],
      },
      {
        id: "kpi-12",
        name: "Process Automation Index",
        description: "Percentage of routine processes that are fully automated",
        owner: "Business Process Department",
        target: 70,
        actual: 62.3,
        unit: "%",
        status: "amber",
        dataSource: "manual",
        lastUpdated: "2025-10-19T09:45:00",
        sourceSystem: "Manual Entry",
        trend: [58, 60, 61, 62.3],
      },
    ],
  },
  {
    id: "enablers",
    title: "Enablers",
    description: "Resources, capabilities, and infrastructure",
    kpis: [
      {
        id: "kpi-13",
        name: "System Uptime",
        description: "Availability of critical IT systems and infrastructure",
        formula: "(Total Uptime / Total Time) × 100",
        owner: "IT Infrastructure Department",
        target: 99.5,
        actual: 99.7,
        unit: "%",
        status: "green",
        dataSource: "integrated-erp",
        lastUpdated: "2025-10-23T00:00:00",
        sourceSystem: "Infrastructure Monitoring",
        trend: [99.5, 99.6, 99.6, 99.7],
      },
      {
        id: "kpi-14",
        name: "Employee Training Completion",
        description: "Percentage of mandatory training courses completed by employees",
        owner: "Learning & Development",
        target: 95,
        actual: 91.5,
        unit: "%",
        status: "amber",
        dataSource: "integrated-hrms",
        lastUpdated: "2025-10-20T17:00:00",
        sourceSystem: "HRMS - Learning Module",
        trend: [88, 90, 91, 91.5],
      },
      {
        id: "kpi-15",
        name: "Budget Utilization Rate",
        description: "Percentage of allocated budget utilized effectively",
        formula: "(Actual Spend / Budgeted Amount) × 100",
        owner: "Finance Department",
        target: 95,
        actual: 87.3,
        unit: "%",
        status: "amber",
        dataSource: "integrated-erp",
        lastUpdated: "2025-10-22T18:30:00",
        sourceSystem: "Financial System",
        trend: [82, 85, 86, 87.3],
      },
      {
        id: "kpi-16",
        name: "Innovation Index",
        description: "Number of implemented innovative solutions and improvements",
        owner: "Innovation Lab",
        target: 25,
        actual: 18,
        unit: "initiatives",
        status: "red",
        dataSource: "manual",
        lastUpdated: "2025-10-21T12:15:00",
        sourceSystem: "Manual Entry",
        trend: [12, 15, 16, 18],
      },
    ],
  },
];

function getStatusColor(status: KPIStatus) {
  switch (status) {
    case "green":
      return "bg-green-100 text-green-800 border-green-300";
    case "amber":
      return "bg-amber-100 text-amber-800 border-amber-300";
    case "red":
      return "bg-red-100 text-red-800 border-red-300";
  }
}

function getDataSourceIcon(source: DataSource) {
  switch (source) {
    case "manual":
      return <FileText className="w-4 h-4 text-gray-500" />;
    case "integrated-erp":
    case "integrated-hrms":
    case "integrated-crm":
      return <Database className="w-4 h-4 text-blue-600" />;
    default:
      return <Link2 className="w-4 h-4 text-gray-500" />;
  }
}

function getDataSourceLabel(source: DataSource) {
  switch (source) {
    case "manual":
      return "Manual Entry";
    case "integrated-erp":
      return "ERP System";
    case "integrated-hrms":
      return "HRMS";
    case "integrated-crm":
      return "CRM System";
    default:
      return "Unknown Source";
  }
}

function Sparkline({ data, status }: { data: number[]; status: KPIStatus }) {
  if (!data || data.length < 2) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 60;
      const y = 20 - ((value - min) / range) * 15;
      return `${x},${y}`;
    })
    .join(" ");

  const color = status === "green" ? "#22c55e" : status === "amber" ? "#f59e0b" : "#ef4444";
  const isPositive = data[data.length - 1] > data[0];

  return (
    <div className="flex items-center gap-2">
      <svg width="60" height="20" className="overflow-visible">
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {isPositive ? (
        <TrendingUp className="w-3 h-3 text-green-600" />
      ) : (
        <TrendingDown className="w-3 h-3 text-red-600" />
      )}
    </div>
  );
}

interface KPIDetailModalProps {
  kpi: KPI | null;
  open: boolean;
  onClose: () => void;
}

function KPIDetailModal({ kpi, open, onClose }: KPIDetailModalProps) {
  if (!kpi) return null;

  const variance = ((kpi.actual - kpi.target) / kpi.target) * 100;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#008755] flex items-center gap-3">
            {kpi.name}
            <Badge className={`${getStatusColor(kpi.status)} border`}>
              {kpi.status.toUpperCase()}
            </Badge>
          </DialogTitle>
          <DialogDescription>{kpi.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Current Performance */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="text-[11px] text-gray-500 uppercase mb-1">Target</div>
              <div className="text-[24px] text-gray-900">
                {kpi.target} {kpi.unit}
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-[11px] text-gray-500 uppercase mb-1">Actual</div>
              <div className="text-[24px] text-[#008755]">
                {kpi.actual} {kpi.unit}
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-[11px] text-gray-500 uppercase mb-1">Variance</div>
              <div
                className={`text-[24px] ${
                  variance >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {variance > 0 ? "+" : ""}
                {variance.toFixed(1)}%
              </div>
            </Card>
          </div>

          {/* Formula */}
          {kpi.formula && (
            <div>
              <h4 className="text-[12px] uppercase text-gray-500 mb-2">Formula</h4>
              <div className="bg-gray-50 p-3 rounded border border-gray-200">
                <code className="text-[12px] text-gray-700">{kpi.formula}</code>
              </div>
            </div>
          )}

          {/* Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-[12px] uppercase text-gray-500 mb-2">Owner</h4>
              <p className="text-[14px] text-gray-900">{kpi.owner}</p>
            </div>
            <div>
              <h4 className="text-[12px] uppercase text-gray-500 mb-2">Data Source</h4>
              <div className="flex items-center gap-2">
                {getDataSourceIcon(kpi.dataSource)}
                <span className="text-[14px] text-gray-900">
                  {kpi.sourceSystem || getDataSourceLabel(kpi.dataSource)}
                </span>
              </div>
            </div>
            <div>
              <h4 className="text-[12px] uppercase text-gray-500 mb-2">Last Updated</h4>
              <p className="text-[14px] text-gray-900">
                {new Date(kpi.lastUpdated).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          {/* Historical Data */}
          {kpi.history && kpi.history.length > 0 && (
            <div>
              <h4 className="text-[12px] uppercase text-gray-500 mb-3">Historical Performance</h4>
              <div className="space-y-2">
                {kpi.history.map((record, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200"
                  >
                    <span className="text-[14px] text-gray-700">{record.date}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[14px] text-gray-900">
                        {record.value} {kpi.unit}
                      </span>
                      <Badge className={`${getStatusColor(record.status)} border text-[10px]`}>
                        {record.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comments */}
          {kpi.comments && kpi.comments.length > 0 && (
            <div>
              <h4 className="text-[12px] uppercase text-gray-500 mb-3">Notes & Comments</h4>
              <div className="space-y-2">
                {kpi.comments.map((comment, index) => (
                  <div
                    key={index}
                    className="p-3 bg-blue-50 border border-blue-200 rounded text-[14px] text-gray-700"
                  >
                    {comment}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface CorporateScorecardProps {
  onBack?: () => void;
}

export function CorporateScorecard({ onBack }: CorporateScorecardProps) {
  const [year, setYear] = useState("2025");
  const [quarter, setQuarter] = useState("Q4");
  const [selectedPerspective, setSelectedPerspective] = useState("all");
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "outcomes",
    "stakeholders",
    "processes",
    "enablers",
  ]);
  const [sortBy, setSortBy] = useState<"name" | "status" | "variance">("name");
  const [selectedKPI, setSelectedKPI] = useState<KPI | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleKPIClick = (kpi: KPI) => {
    setSelectedKPI(kpi);
    setModalOpen(true);
  };

  const filteredPerspectives =
    selectedPerspective === "all"
      ? mockKPIs
      : mockKPIs.filter((p) => p.id === selectedPerspective);

  const sortKPIs = (kpis: KPI[]) => {
    return [...kpis].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "status") {
        const statusOrder = { green: 0, amber: 1, red: 2 };
        return statusOrder[a.status] - statusOrder[b.status];
      }
      if (sortBy === "variance") {
        const varianceA = ((a.actual - a.target) / a.target) * 100;
        const varianceB = ((b.actual - b.target) / b.target) * 100;
        return varianceB - varianceA;
      }
      return 0;
    });
  };

  return (
    <div className="h-full overflow-auto">
      <div className="space-y-4 p-4">
        {/* Hero Banner Section */}
        <Card className="relative text-white border-none shadow-lg overflow-hidden bg-gradient-to-br from-[#005844] via-[#008755] to-[#00a869]">
          <img
            src={heroDecoration}
            alt=""
            className="absolute -top-16 -right-16 h-160 w-160 rounded-full object-cover opacity-50 pointer-events-none select-none"
          />
          <CardContent className="pt-3 pb-3 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="h-8 w-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Award className="h-4 w-4" />
                  </div>
                  <div>
                    <h1 className="text-xl   mb-0.5">
                      Dubai Customs Corporate Scorecard
                    </h1>
                    <p className="text-white/90 text-xs">
                      Strategic Performance Dashboard - Balanced Scorecard Framework
                    </p>
                  </div>
                </div>
                <p className="text-white/80 text-xs max-w-2xl">
                  Comprehensive view of corporate-level KPIs aligned with Dubai Customs strategic objectives across all 
                  perspectives with real-time performance tracking and variance analysis.
                </p>
              </div>
              <div className="ml-4">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-white bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  <Download className="h-3.5 w-3.5 mr-1.5" />
                  Export Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters Section */}
        <Card>

        </Card>

        {/* Mission Statement */}
        <Card className="border-l-4 border-l-[#008755] bg-gradient-to-r from-blue-50/50 to-white">
          <div className="p-3">
            <p className="text-xs text-gray-700 italic">
              "Protecting the society and sustaining economic development through compliance, facilitation, and innovation."
            </p>
          </div>
        </Card>

        {/* Tier 1: Results */}
        <div>
          <div className="mb-3">
            <h2 className="text-base text-[#008755] flex items-center gap-2">
              <div className="h-6 w-1 bg-[#008755] rounded-full"></div>
              Results — What outcomes are we accountable for achieving?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Sustaining Economic Development */}
            <Card className="hover:shadow-lg transition-all cursor-pointer border-t-4 border-t-[#008755]">
              <div className="p-3 bg-gradient-to-br from-blue-50/30 to-white">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-[#008755] mb-0.5">Sustaining Economic Development</h3>
                    <p className="text-xs text-gray-600">Trade and economic performance metrics</p>
                  </div>
                  <TrendingUp className="h-4 w-4" style={{ color: '#357743' }} />
                </div>
                <div className="space-y-1.5">
                  {filteredPerspectives
                    .find((p) => p.id === "outcomes")
                    ?.kpis.slice(0, 2)
                    .map((kpi) => {
                      const variance = ((kpi.actual - kpi.target) / kpi.target) * 100;
                      return (
                        <TooltipProvider key={kpi.id}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div
                                onClick={() => handleKPIClick(kpi)}
                                className="flex items-center justify-between p-2 rounded-lg bg-white hover:bg-blue-50 transition-colors group"
                              >
                                <div className="flex items-center gap-2 flex-1">
                                  <div
                                    className="h-2 w-2 rounded-full"
                                    style={{
                                      backgroundColor: kpi.status === "green"
                                        ? "#357743"
                                        : kpi.status === "amber"
                                        ? "#F2A200"
                                        : "#D83731"
                                    }}
                                  ></div>
                                  <span className="text-xs text-gray-700 group-hover:text-[#008755]">
                                    {kpi.name}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-medium text-[#008755]">
                                    {kpi.actual} {kpi.unit}
                                  </span>
                                  <Badge
                                    variant="outline"
                                    className="text-[9px]"
                                    style={{
                                      color: variance >= 0 ? "#357743" : "#D83731",
                                      borderColor: variance >= 0 ? "#357743" : "#D83731"
                                    }}
                                  >
                                    {variance > 0 ? "+" : ""}
                                    {variance.toFixed(0)}%
                                  </Badge>
                                </div>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-xs">
                                <div><strong>Target:</strong> {kpi.target} {kpi.unit}</div>
                                <div><strong>Owner:</strong> {kpi.owner}</div>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      );
                    })}
                </div>
              </div>
            </Card>

            {/* Protecting Society */}
            <Card className="hover:shadow-lg transition-all cursor-pointer border-t-4 border-t-[#008755]">
              <div className="p-3 bg-gradient-to-br from-blue-50/30 to-white">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-[#008755] mb-0.5">Protecting the Society</h3>
                    <p className="text-xs text-gray-600">Safety and security performance</p>
                  </div>
                  <TrendingUp className="h-4 w-4" style={{ color: '#357743' }} />
                </div>
                <div className="space-y-1.5">
                  {filteredPerspectives
                    .find((p) => p.id === "outcomes")
                    ?.kpis.slice(2)
                    .map((kpi) => {
                      const variance = ((kpi.actual - kpi.target) / kpi.target) * 100;
                      return (
                        <TooltipProvider key={kpi.id}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div
                                onClick={() => handleKPIClick(kpi)}
                                className="flex items-center justify-between p-2 rounded-lg bg-white hover:bg-blue-50 transition-colors group"
                              >
                                <div className="flex items-center gap-2 flex-1">
                                  <div
                                    className="h-2 w-2 rounded-full"
                                    style={{
                                      backgroundColor: kpi.status === "green"
                                        ? "#357743"
                                        : kpi.status === "amber"
                                        ? "#F2A200"
                                        : "#D83731"
                                    }}
                                  ></div>
                                  <span className="text-xs text-gray-700 group-hover:text-[#008755]">
                                    {kpi.name}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-medium text-[#008755]">
                                    {kpi.actual} {kpi.unit}
                                  </span>
                                  <Badge
                                    variant="outline"
                                    className="text-[9px]"
                                    style={{
                                      color: variance >= 0 ? "#357743" : "#D83731",
                                      borderColor: variance >= 0 ? "#357743" : "#D83731"
                                    }}
                                  >
                                    {variance > 0 ? "+" : ""}
                                    {variance.toFixed(0)}%
                                  </Badge>
                                </div>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-xs">
                                <div><strong>Target:</strong> {kpi.target} {kpi.unit}</div>
                                <div><strong>Owner:</strong> {kpi.owner}</div>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      );
                    })}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Tier 2: Stakeholders */}
        <div>
          <div className="mb-3">
            <h2 className="text-base text-[#008755] flex items-center gap-2">
              <div className="h-6 w-1 bg-[#008755] rounded-full"></div>
              Stakeholders — What value will we deliver to our customers?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {filteredPerspectives
              .find((p) => p.id === "stakeholders")
              ?.kpis.map((kpi, index) => {
                const variance = ((kpi.actual - kpi.target) / kpi.target) * 100;
                const stakeholderTypes = ["Government", "Customers", "International"];
                const stakeholderIcons = ["🏛️", "👥", "🌍"];
                return (
                  <Card
                    key={kpi.id}
                    className="hover:shadow-lg transition-all cursor-pointer"
                    onClick={() => handleKPIClick(kpi)}
                  >
                    <div className="p-3 bg-gradient-to-br from-white to-blue-50/20">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">{stakeholderIcons[index]}</span>
                        <h3 className="text-xs text-[#008755]">{stakeholderTypes[index]}</h3>
                      </div>
                      <div className="space-y-1.5">
                        <div className="text-xs text-gray-700">{kpi.name}</div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-medium text-[#008755]">
                              {kpi.actual} {kpi.unit}
                            </span>
                            <Badge
                              className={`${getStatusColor(kpi.status)} border text-[9px]`}
                            >
                              {kpi.status.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="text-xs text-gray-500">
                            Target: {kpi.target} {kpi.unit}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">{kpi.owner}</span>
                          <span
                            style={{ color: variance >= 0 ? "#357743" : "#D83731" }}
                          >
                            {variance > 0 ? "+" : ""}
                            {variance.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
          </div>
        </div>

        {/* Tier 3: Internal Processes */}
        <div>
          <div className="mb-3">
            <h2 className="text-base text-[#008755] flex items-center gap-2">
              <div className="h-6 w-1 bg-[#008755] rounded-full"></div>
              Internal Processes — Where to focus our efforts?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Trade Facilitation */}
            <Card className="hover:shadow-lg transition-shadow">
              <div className="p-3 border-l-4" style={{ borderLeftColor: '#008755' }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-7 w-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#008755' }}>
                    <Cpu className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-xs text-[#008755]">Trade Facilitation & Economic Competitiveness</h3>
                </div>
                <div className="space-y-1.5">
                  {filteredPerspectives
                    .find((p) => p.id === "processes")
                    ?.kpis.slice(0, 2)
                    .map((kpi) => (
                      <TooltipProvider key={kpi.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              onClick={() => handleKPIClick(kpi)}
                              className="flex items-center gap-2 p-1.5 rounded transition-colors cursor-pointer group"
                              style={{ 
                                transition: 'background-color 0.2s',
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#008755' + '10'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                              <div
                                className="h-1.5 w-1.5 rounded-full"
                                style={{
                                  backgroundColor: kpi.status === "green"
                                    ? "#357743"
                                    : kpi.status === "amber"
                                    ? "#F2A200"
                                    : "#D83731"
                                }}
                              ></div>
                              <span className="text-xs text-gray-700 flex-1 group-hover:text-[#008755]">
                                {kpi.name}
                              </span>
                              <span className="text-xs font-medium text-[#008755]">
                                {kpi.actual}
                              </span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="text-xs">
                              <div><strong>Target:</strong> {kpi.target} {kpi.unit}</div>
                              <div><strong>Actual:</strong> {kpi.actual} {kpi.unit}</div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                </div>
              </div>
            </Card>

            {/* Enforcement & Security */}
            <Card className="hover:shadow-lg transition-shadow">
              <div className="p-3 border-l-4" style={{ borderLeftColor: '#BB9956' }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-7 w-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#BB9956' }}>
                    <Award className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-xs text-[#008755]">Enforcement, Security & Protection of Society</h3>
                </div>
                <div className="space-y-1.5">
                  {filteredPerspectives
                    .find((p) => p.id === "processes")
                    ?.kpis.slice(2, 4)
                    .map((kpi) => (
                      <TooltipProvider key={kpi.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              onClick={() => handleKPIClick(kpi)}
                              className="flex items-center gap-2 p-2 rounded transition-colors cursor-pointer group"
                              style={{ 
                                transition: 'background-color 0.2s',
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#BB9956' + '10'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                              <div
                                className="h-1.5 w-1.5 rounded-full"
                                style={{
                                  backgroundColor: kpi.status === "green"
                                    ? "#357743"
                                    : kpi.status === "amber"
                                    ? "#F2A200"
                                    : "#D83731"
                                }}
                              ></div>
                              <span className="text-xs text-gray-700 flex-1 group-hover:text-[#008755]">
                                {kpi.name}
                              </span>
                              <span className="text-xs font-medium text-[#008755]">
                                {kpi.actual}
                              </span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="text-xs">
                              <div><strong>Target:</strong> {kpi.target} {kpi.unit}</div>
                              <div><strong>Actual:</strong> {kpi.actual} {kpi.unit}</div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                </div>
              </div>
            </Card>

            {/* Revenue Collection */}
            <Card className="hover:shadow-lg transition-shadow">
              <div className="p-3 border-l-4" style={{ borderLeftColor: '#00B0AA' }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-7 w-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#00B0AA' }}>
                    <DollarSign className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-xs text-[#008755]">Revenue Collection & Financial Performance</h3>
                </div>
                <div className="space-y-1.5">
                  {filteredPerspectives
                    .find((p) => p.id === "processes")
                    ?.kpis.slice(4)
                    .map((kpi) => (
                      <TooltipProvider key={kpi.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              onClick={() => handleKPIClick(kpi)}
                              className="flex items-center gap-2 p-2 rounded transition-colors cursor-pointer group"
                              style={{ 
                                transition: 'background-color 0.2s',
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#00B0AA' + '10'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                              <div
                                className="h-1.5 w-1.5 rounded-full"
                                style={{
                                  backgroundColor: kpi.status === "green"
                                    ? "#357743"
                                    : kpi.status === "amber"
                                    ? "#F2A200"
                                    : "#D83731"
                                }}
                              ></div>
                              <span className="text-xs text-gray-700 flex-1 group-hover:text-[#008755]">
                                {kpi.name}
                              </span>
                              <span className="text-xs font-medium text-[#008755]">
                                {kpi.actual}
                              </span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="text-xs">
                              <div><strong>Target:</strong> {kpi.target} {kpi.unit}</div>
                              <div><strong>Actual:</strong> {kpi.actual} {kpi.unit}</div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Tier 4: Enablers */}
        <div>
          <div className="mb-3">
            <h2 className="text-base text-[#008755] flex items-center gap-2">
              <div className="h-6 w-1 bg-[#008755] rounded-full"></div>
              Enablers — What enables high performance?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {filteredPerspectives
              .find((p) => p.id === "enablers")
              ?.kpis.map((kpi, index) => {
                const enablerTypes = ["Human Capital", "Technology", "Excellence", "Financial", "Partners"];
                const EnablerIconsMap = [Users, Cpu, Trophy, DollarSign, Handshake];
                const IconComponent = EnablerIconsMap[index];
                const variance = ((kpi.actual - kpi.target) / kpi.target) * 100;
                return (
                  <Card
                    key={kpi.id}
                    className="hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
                    onClick={() => handleKPIClick(kpi)}
                  >
                    <div className="p-2.5 text-center">
                      <div className="flex justify-center mb-1.5">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#008755] to-[#008755]/70 flex items-center justify-center text-white">
                          <IconComponent className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      <h3 className="text-xs text-[#008755] mb-1.5">{enablerTypes[index]}</h3>
                      <div className="space-y-1">
                        <div className="text-xs text-gray-600 line-clamp-2 min-h-[1.75rem]">
                          {kpi.name}
                        </div>
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-xs font-medium text-[#008755]">
                            {kpi.actual} {kpi.unit}
                          </span>
                          <div
                            className="h-1.5 w-1.5 rounded-full"
                            style={{
                              backgroundColor: kpi.status === "green"
                                ? "#357743"
                                : kpi.status === "amber"
                                ? "#F2A200"
                                : "#D83731"
                            }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-center gap-1 text-[10px]">
                          <TrendingUp 
                            className={`h-3 w-3 ${variance < 0 ? "rotate-180" : ""}`}
                            style={{ color: variance >= 0 ? "#357743" : "#D83731" }}
                          />
                          <span style={{ color: variance >= 0 ? "#357743" : "#D83731" }}>
                            {variance > 0 ? "+" : ""}{variance.toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
          </div>
        </div>

        {/* Legend */}
        <Card className="bg-gray-50">
          <div className="p-3">
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
              <span className="font-medium">Legend:</span>
              <div className="flex items-center gap-1.5">
                <span>🌍</span>
                <span>International</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>🇦🇪</span>
                <span>Federal Government</span>
              </div>
              <div className="flex items-center gap-1.5">
                <img src={localGovIcon} alt="Local Government" className="w-3.5 h-3.5" />
                <span>Local Government</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>🎯</span>
                <span>Executive Council</span>
              </div>
              <div className="flex items-center gap-1.5">
                <img src={internalIcon} alt="Internal" className="w-3.5 h-3.5" />
                <span>Internal</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* KPI Detail Modal */}
      <KPIDetailModal kpi={selectedKPI} open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
