import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart,
} from "recharts";
import {
  User,
  Calendar,
  Database,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  FileText,
  Paperclip,
  Send,
  Link2,
  ChevronRight,
  Download,
  Calculator,
  Target,
  Activity,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { ScrollArea } from "../ui/scroll-area";

type KPIStatus = "green" | "amber" | "red" | "not-reported";
type DataSource = "manual" | "auto" | "integration";
type UpdateFrequency = "daily" | "weekly" | "monthly" | "quarterly";

interface KPIDetail {
  id: string;
  name: string;
  description: string;
  owner: {
    name: string;
    role: string;
    department: string;
  };
  formula: string;
  unit: string;
  sourceSystem: string;
  dataSource: DataSource;
  updateFrequency: UpdateFrequency;
  target: number;
  current: number;
  status: KPIStatus;
  thresholds: {
    red: { min: number; max: number };
    amber: { min: number; max: number };
    green: { min: number; max: number };
  };
  historicalData: {
    period: string;
    target: number;
    actual: number;
    variance: number;
  }[];
  quarterlyComparison: {
    quarter: string;
    target: number;
    actual: number;
    variance: number;
    status: KPIStatus;
  }[];
  comments: {
    id: string;
    author: string;
    role: string;
    date: string;
    content: string;
  }[];
  evidence: {
    id: string;
    fileName: string;
    uploadedBy: string;
    uploadedDate: string;
    size: string;
  }[];
  relatedKPIs: {
    parent?: {
      id: string;
      name: string;
      level: string;
      current: number;
      target: number;
    };
    children?: {
      id: string;
      name: string;
      level: string;
      current: number;
      target: number;
    }[];
    related?: {
      id: string;
      name: string;
      level: string;
      current: number;
      target: number;
      relationship: string;
    }[];
  };
}

const mockKPIDetail: KPIDetail = {
  id: "kpi-001",
  name: "Border Security Effectiveness Index",
  description:
    "Composite index measuring the overall effectiveness of border security operations, including screening success rate, threat detection, and incident response time.",
  owner: {
    name: "Ahmed Al Mansoori",
    role: "Director of Enforcement",
    department: "D1 – Enforcement & Security",
  },
  formula: "(Screening Success Rate × 0.4) + (Threat Detection Rate × 0.4) + (Response Time Score × 0.2)",
  unit: "%",
  sourceSystem: "Border Security Management System (BSMS)",
  dataSource: "auto",
  updateFrequency: "daily",
  target: 95,
  current: 96.8,
  status: "green",
  thresholds: {
    red: { min: 0, max: 85 },
    amber: { min: 85, max: 92 },
    green: { min: 92, max: 100 },
  },
  historicalData: [
    { period: "Jan", target: 95, actual: 93.2, variance: -1.8 },
    { period: "Feb", target: 95, actual: 94.5, variance: -0.5 },
    { period: "Mar", target: 95, actual: 95.8, variance: 0.8 },
    { period: "Apr", target: 95, actual: 96.1, variance: 1.1 },
    { period: "May", target: 95, actual: 95.5, variance: 0.5 },
    { period: "Jun", target: 95, actual: 97.2, variance: 2.2 },
    { period: "Jul", target: 95, actual: 96.8, variance: 1.8 },
    { period: "Aug", target: 95, actual: 97.5, variance: 2.5 },
    { period: "Sep", target: 95, actual: 96.9, variance: 1.9 },
    { period: "Oct", target: 95, actual: 96.8, variance: 1.8 },
  ],
  quarterlyComparison: [
    { quarter: "Q1 2025", target: 95, actual: 94.5, variance: -0.5, status: "amber" },
    { quarter: "Q2 2025", target: 95, actual: 96.3, variance: 1.3, status: "green" },
    { quarter: "Q3 2025", target: 95, actual: 97.1, variance: 2.1, status: "green" },
    { quarter: "Q4 2025", target: 95, actual: 96.8, variance: 1.8, status: "green" },
  ],
  comments: [
    {
      id: "c1",
      author: "Sarah Al Zaabi",
      role: "Quality Assurance Manager",
      date: "2025-10-20T14:30:00",
      content:
        "Excellent performance maintained throughout Q4. New X-ray equipment has significantly improved detection rates.",
    },
    {
      id: "c2",
      author: "Mohammed Hassan",
      role: "Operations Lead",
      date: "2025-10-15T09:15:00",
      content:
        "Staff training completion rate has improved, which correlates with better screening outcomes.",
    },
    {
      id: "c3",
      author: "Ahmed Al Mansoori",
      role: "Director of Enforcement",
      date: "2025-10-10T11:00:00",
      content:
        "Recommend maintaining current protocols and consider expanding training program to other divisions.",
    },
  ],
  evidence: [
    {
      id: "e1",
      fileName: "monthly-security-report-october-2025.pdf",
      uploadedBy: "Sarah Al Zaabi",
      uploadedDate: "2025-10-22T16:00:00",
      size: "2.4 MB",
    },
    {
      id: "e2",
      fileName: "screening-effectiveness-analysis.xlsx",
      uploadedBy: "Operations Team",
      uploadedDate: "2025-10-20T14:30:00",
      size: "856 KB",
    },
    {
      id: "e3",
      fileName: "equipment-upgrade-impact-report.pdf",
      uploadedBy: "Technical Team",
      uploadedDate: "2025-10-18T10:15:00",
      size: "1.8 MB",
    },
  ],
  relatedKPIs: {
    parent: {
      id: "corp-kpi-01",
      name: "Overall Security Performance",
      level: "Corporate",
      current: 93.5,
      target: 92,
    },
    children: [
      {
        id: "dept-kpi-01",
        name: "Screening Success Rate",
        level: "Department",
        current: 98.5,
        target: 98,
      },
      {
        id: "dept-kpi-02",
        name: "Threat Detection Rate",
        level: "Department",
        current: 99.2,
        target: 98,
      },
      {
        id: "dept-kpi-03",
        name: "Response Time Index",
        level: "Department",
        current: 92.5,
        target: 90,
      },
    ],
    related: [
      {
        id: "rel-kpi-01",
        name: "Staff Training Completion Rate",
        level: "Department",
        current: 95,
        target: 100,
        relationship: "Enabler",
      },
      {
        id: "rel-kpi-02",
        name: "Equipment Uptime",
        level: "Department",
        current: 95.2,
        target: 98,
        relationship: "Enabler",
      },
    ],
  },
};

function getStatusColor(status: KPIStatus) {
  switch (status) {
    case "green":
      return "bg-green-100 text-green-800 border-green-300";
    case "amber":
      return "bg-amber-100 text-amber-800 border-amber-300";
    case "red":
      return "bg-red-100 text-red-800 border-red-300";
    case "not-reported":
      return "bg-gray-100 text-gray-600 border-gray-300";
  }
}

function getDataSourceIcon(source: DataSource) {
  switch (source) {
    case "auto":
      return <Database className="w-4 h-4 text-blue-600" />;
    case "integration":
      return <Link2 className="w-4 h-4 text-purple-600" />;
    case "manual":
      return <FileText className="w-4 h-4 text-gray-600" />;
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-AE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

interface KPIDetailModalProps {
  kpiId?: string;
  open: boolean;
  onClose: () => void;
  onKPIClick?: (kpiId: string) => void;
}

export function KPIDetailModal({
  kpiId,
  open,
  onClose,
  onKPIClick,
}: KPIDetailModalProps) {
  const [showLinkedKPIs, setShowLinkedKPIs] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  // In a real app, fetch KPI details based on kpiId
  const kpi = mockKPIDetail;

  const handleAddComment = () => {
    if (!newComment.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    toast.success("Comment added successfully");
    setNewComment("");
    // In real app, submit comment to backend
  };

  const handleDownloadEvidence = (fileName: string) => {
    toast.success(`Downloading ${fileName}...`);
    // In real app, trigger file download
  };

  const variance = ((kpi.current - kpi.target) / kpi.target) * 100;

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden p-0">
          <DialogHeader className="p-6 pb-4 bg-gradient-to-r from-[#008755] to-[#1e3a5f] text-white">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <DialogTitle className="text-[24px] text-white mb-2">
                  {kpi.name}
                </DialogTitle>
                <p className="text-[14px] text-white/90">{kpi.description}</p>
              </div>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Badge className={`${getStatusColor(kpi.status)} border text-[11px]`}>
                  {kpi.status.toUpperCase()}
                </Badge>
              </motion.div>
            </div>

            {/* KPI Owner */}
            <div className="mt-4 flex items-center gap-3 text-[13px] text-white/90">
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8 border-2 border-white/30">
                  <AvatarFallback className="bg-white/20 text-white text-[11px]">
                    {kpi.owner.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-white">{kpi.owner.name}</div>
                  <div className="text-[11px] text-white/70">{kpi.owner.role}</div>
                </div>
              </div>
              <Separator orientation="vertical" className="h-10 bg-white/20" />
              <div className="text-white/80">{kpi.owner.department}</div>
            </div>
          </DialogHeader>

          <ScrollArea className="h-[calc(90vh-200px)]">
            <div className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 w-full mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="trends">Trends & Analysis</TabsTrigger>
                  <TabsTrigger value="comments">Comments & Evidence</TabsTrigger>
                  <TabsTrigger value="metadata">Metadata</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                  {/* Current Performance */}
                  <div className="grid grid-cols-3 gap-4">
                    <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-4 h-4 text-[#008755]" />
                        <div className="text-[11px] uppercase text-gray-600">
                          Current Value
                        </div>
                      </div>
                      <div className="text-[32px] text-[#008755]">
                        {kpi.current}
                        <span className="text-[18px]">{kpi.unit}</span>
                      </div>
                    </Card>

                    <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-purple-600" />
                        <div className="text-[11px] uppercase text-gray-600">
                          Target Value
                        </div>
                      </div>
                      <div className="text-[32px] text-purple-600">
                        {kpi.target}
                        <span className="text-[18px]">{kpi.unit}</span>
                      </div>
                    </Card>

                    <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        {variance >= 0 ? (
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        )}
                        <div className="text-[11px] uppercase text-gray-600">
                          Variance
                        </div>
                      </div>
                      <div
                        className={`text-[32px] ${
                          variance >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {variance > 0 ? "+" : ""}
                        {variance.toFixed(1)}
                        <span className="text-[18px]">%</span>
                      </div>
                    </Card>
                  </div>

                  {/* Threshold Bands */}
                  <Card className="p-4">
                    <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-[#008755]" />
                      Performance Thresholds
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-24 text-[12px] text-gray-600">Green Zone</div>
                        <div className="flex-1 h-8 bg-gradient-to-r from-green-200 to-green-400 rounded flex items-center justify-between px-3">
                          <span className="text-[12px] text-green-900">
                            {kpi.thresholds.green.min}%
                          </span>
                          <span className="text-[12px] text-green-900">
                            {kpi.thresholds.green.max}%
                          </span>
                        </div>
                        <div className="w-32 text-[11px] text-gray-600">
                          Target Achieved
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-24 text-[12px] text-gray-600">Amber Zone</div>
                        <div className="flex-1 h-8 bg-gradient-to-r from-amber-200 to-amber-400 rounded flex items-center justify-between px-3">
                          <span className="text-[12px] text-amber-900">
                            {kpi.thresholds.amber.min}%
                          </span>
                          <span className="text-[12px] text-amber-900">
                            {kpi.thresholds.amber.max}%
                          </span>
                        </div>
                        <div className="w-32 text-[11px] text-gray-600">At Risk</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-24 text-[12px] text-gray-600">Red Zone</div>
                        <div className="flex-1 h-8 bg-gradient-to-r from-red-200 to-red-400 rounded flex items-center justify-between px-3">
                          <span className="text-[12px] text-red-900">
                            {kpi.thresholds.red.min}%
                          </span>
                          <span className="text-[12px] text-red-900">
                            {kpi.thresholds.red.max}%
                          </span>
                        </div>
                        <div className="w-32 text-[11px] text-gray-600">
                          Below Target
                        </div>
                      </div>

                      {/* Current Position Indicator */}
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span className="text-[13px] text-gray-700">
                            Current Performance: <strong>{kpi.current}%</strong> is in
                            the <strong className="text-green-600">Green Zone</strong>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Related KPIs Preview */}
                  <Card className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-900 flex items-center gap-2">
                        <Link2 className="w-4 h-4 text-[#008755]" />
                        Related KPIs
                      </h3>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setShowLinkedKPIs(true)}
                        className="text-[#008755] border-[#008755] hover:bg-blue-50"
                      >
                        Show All Linked KPIs
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {kpi.relatedKPIs.parent && (
                        <Card className="p-3 bg-green-50 border-green-200 hover:shadow-md transition-shadow cursor-pointer">
                          <div className="text-[10px] uppercase text-green-700 mb-1">
                            Parent KPI
                          </div>
                          <div className="text-[13px] text-gray-900 mb-2">
                            {kpi.relatedKPIs.parent.name}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] text-gray-600">
                              {kpi.relatedKPIs.parent.level}
                            </span>
                            <span className="text-[14px] text-[#008755]">
                              {kpi.relatedKPIs.parent.current}%
                            </span>
                          </div>
                        </Card>
                      )}
                      {kpi.relatedKPIs.children?.slice(0, 2).map((child) => (
                        <Card
                          key={child.id}
                          className="p-3 bg-blue-50 border-blue-200 hover:shadow-md transition-shadow cursor-pointer"
                        >
                          <div className="text-[10px] uppercase text-blue-700 mb-1">
                            Child KPI
                          </div>
                          <div className="text-[13px] text-gray-900 mb-2">
                            {child.name}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] text-gray-600">
                              {child.level}
                            </span>
                            <span className="text-[14px] text-[#008755]">
                              {child.current}%
                            </span>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                {/* Trends & Analysis Tab */}
                <TabsContent value="trends" className="space-y-6">
                  {/* Trend Chart */}
                  <Card className="p-4">
                    <h3 className="text-gray-900 mb-4">
                      Performance Trend (Last 10 Months)
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <ComposedChart data={kpi.historicalData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                        <XAxis
                          dataKey="period"
                          tick={{ fontSize: 11, fill: "#6b7280" }}
                        />
                        <YAxis
                          tick={{ fontSize: 11, fill: "#6b7280" }}
                          domain={[85, 100]}
                        />
                        <Tooltip
                          contentStyle={{
                            fontSize: "12px",
                            borderRadius: "8px",
                            border: "1px solid #e5e7eb",
                          }}
                        />
                        <Legend wrapperStyle={{ fontSize: "12px" }} />
                        
                        {/* Threshold bands */}
                        <Area
                          type="monotone"
                          dataKey={() => kpi.thresholds.green.max}
                          fill="#86efac"
                          fillOpacity={0.1}
                          stroke="none"
                        />
                        <Area
                          type="monotone"
                          dataKey={() => kpi.thresholds.green.min}
                          fill="#fef08a"
                          fillOpacity={0.1}
                          stroke="none"
                        />
                        
                        <ReferenceLine
                          y={kpi.target}
                          stroke="#9333ea"
                          strokeDasharray="5 5"
                          label={{
                            value: "Target",
                            position: "right",
                            fontSize: 11,
                            fill: "#9333ea",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="actual"
                          stroke="#008755"
                          strokeWidth={3}
                          dot={{ r: 4, fill: "#008755" }}
                          activeDot={{ r: 6 }}
                          name="Actual Performance"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </Card>

                  {/* Quarterly Comparison */}
                  <Card>
                    <div className="p-4 bg-gray-50 border-b border-gray-200">
                      <h3 className="text-gray-900">Quarterly Comparison 2025</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-100 border-b border-gray-200">
                          <tr>
                            <th className="text-left p-3 text-[11px] uppercase text-gray-600">
                              Quarter
                            </th>
                            <th className="text-center p-3 text-[11px] uppercase text-gray-600">
                              Target
                            </th>
                            <th className="text-center p-3 text-[11px] uppercase text-gray-600">
                              Actual
                            </th>
                            <th className="text-center p-3 text-[11px] uppercase text-gray-600">
                              Variance
                            </th>
                            <th className="text-center p-3 text-[11px] uppercase text-gray-600">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {kpi.quarterlyComparison.map((quarter, idx) => (
                            <motion.tr
                              key={quarter.quarter}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="border-b border-gray-100 hover:bg-blue-50/30"
                            >
                              <td className="p-3">
                                <div className="text-[14px] text-gray-900">
                                  {quarter.quarter}
                                </div>
                              </td>
                              <td className="p-3 text-center">
                                <div className="text-[14px] text-gray-700">
                                  {quarter.target}%
                                </div>
                              </td>
                              <td className="p-3 text-center">
                                <div className="text-[14px] text-[#008755]">
                                  {quarter.actual}%
                                </div>
                              </td>
                              <td className="p-3 text-center">
                                <div
                                  className={`text-[14px] flex items-center justify-center gap-1 ${
                                    quarter.variance >= 0
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {quarter.variance >= 0 ? (
                                    <TrendingUp className="w-3 h-3" />
                                  ) : (
                                    <TrendingDown className="w-3 h-3" />
                                  )}
                                  {quarter.variance > 0 ? "+" : ""}
                                  {quarter.variance.toFixed(1)}%
                                </div>
                              </td>
                              <td className="p-3 text-center">
                                <Badge
                                  className={`${getStatusColor(quarter.status)} border`}
                                >
                                  {quarter.status.toUpperCase()}
                                </Badge>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </TabsContent>

                {/* Comments & Evidence Tab */}
                <TabsContent value="comments" className="space-y-6">
                  {/* Comments History */}
                  <Card className="p-4">
                    <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#008755]" />
                      Comments History
                    </h3>
                    <div className="space-y-4">
                      <AnimatePresence>
                        {kpi.comments.map((comment, idx) => (
                          <motion.div
                            key={comment.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="border-l-4 border-[#008755] pl-4 py-2"
                          >
                            <div className="flex items-start gap-3">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className="bg-blue-100 text-[#008755] text-[11px]">
                                  {comment.author
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-[13px] text-gray-900">
                                    {comment.author}
                                  </span>
                                  <Badge variant="outline" className="text-[10px]">
                                    {comment.role}
                                  </Badge>
                                  <span className="text-[11px] text-gray-500">
                                    {formatDate(comment.date)}
                                  </span>
                                </div>
                                <p className="text-[13px] text-gray-700">
                                  {comment.content}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>

                    {/* Add Comment */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <label className="text-[12px] text-gray-700 mb-2 block">
                        Add Comment
                      </label>
                      <Textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share your insights, analysis, or recommendations..."
                        className="min-h-[80px] mb-2"
                      />
                      <div className="flex justify-end">
                        <Button
                          size="sm"
                          onClick={handleAddComment}
                          className="bg-[#008755] hover:bg-[#4273a3]"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Post Comment
                        </Button>
                      </div>
                    </div>
                  </Card>

                  {/* Evidence Attachments */}
                  <Card className="p-4">
                    <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                      <Paperclip className="w-4 h-4 text-[#008755]" />
                      Evidence Attachments
                    </h3>
                    <div className="space-y-2">
                      {kpi.evidence.map((file, idx) => (
                        <motion.div
                          key={file.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-gray-500" />
                            <div>
                              <div className="text-[13px] text-gray-900">
                                {file.fileName}
                              </div>
                              <div className="text-[11px] text-gray-500">
                                Uploaded by {file.uploadedBy} on{" "}
                                {formatDate(file.uploadedDate)} • {file.size}
                              </div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDownloadEvidence(file.fileName)}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                {/* Metadata Tab */}
                <TabsContent value="metadata" className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Formula */}
                    <Card className="p-4 col-span-2">
                      <div className="flex items-center gap-2 mb-3">
                        <Calculator className="w-4 h-4 text-[#008755]" />
                        <h3 className="text-gray-900">Calculation Formula</h3>
                      </div>
                      <div className="bg-gray-50 p-4 rounded border border-gray-200">
                        <code className="text-[13px] text-gray-800 font-mono">
                          {kpi.formula}
                        </code>
                      </div>
                    </Card>

                    {/* Data Source */}
                    <Card className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        {getDataSourceIcon(kpi.dataSource)}
                        <h3 className="text-gray-900">Data Source</h3>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="text-[11px] text-gray-500 uppercase mb-1">
                            Source System
                          </div>
                          <div className="text-[14px] text-gray-900">
                            {kpi.sourceSystem}
                          </div>
                        </div>
                        <div>
                          <div className="text-[11px] text-gray-500 uppercase mb-1">
                            Collection Method
                          </div>
                          <Badge variant="outline">
                            {kpi.dataSource === "auto"
                              ? "Automated"
                              : kpi.dataSource === "integration"
                              ? "System Integration"
                              : "Manual Entry"}
                          </Badge>
                        </div>
                      </div>
                    </Card>

                    {/* Update Frequency */}
                    <Card className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <RefreshCw className="w-4 h-4 text-[#008755]" />
                        <h3 className="text-gray-900">Update Schedule</h3>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="text-[11px] text-gray-500 uppercase mb-1">
                            Frequency
                          </div>
                          <div className="text-[14px] text-gray-900 capitalize">
                            {kpi.updateFrequency}
                          </div>
                        </div>
                        <div>
                          <div className="text-[11px] text-gray-500 uppercase mb-1">
                            Last Updated
                          </div>
                          <div className="text-[14px] text-gray-900">
                            {formatDate(
                              kpi.historicalData[kpi.historicalData.length - 1]
                                .period + " 2025"
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Unit & Measurement */}
                    <Card className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Activity className="w-4 h-4 text-[#008755]" />
                        <h3 className="text-gray-900">Measurement</h3>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="text-[11px] text-gray-500 uppercase mb-1">
                            Unit of Measure
                          </div>
                          <div className="text-[14px] text-gray-900">
                            {kpi.unit === "%" ? "Percentage" : kpi.unit}
                          </div>
                        </div>
                        <div>
                          <div className="text-[11px] text-gray-500 uppercase mb-1">
                            Target Type
                          </div>
                          <Badge variant="outline">
                            Higher is Better
                          </Badge>
                        </div>
                      </div>
                    </Card>

                    {/* Ownership */}
                    <Card className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <User className="w-4 h-4 text-[#008755]" />
                        <h3 className="text-gray-900">Ownership</h3>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="text-[11px] text-gray-500 uppercase mb-1">
                            Department
                          </div>
                          <div className="text-[14px] text-gray-900">
                            {kpi.owner.department}
                          </div>
                        </div>
                        <div>
                          <div className="text-[11px] text-gray-500 uppercase mb-1">
                            Responsible Officer
                          </div>
                          <div className="text-[14px] text-gray-900">
                            {kpi.owner.name}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Linked KPIs Side Panel */}
      <Sheet open={showLinkedKPIs} onOpenChange={setShowLinkedKPIs}>
        <SheetContent className="w-[500px] sm:max-w-[500px]">
          <SheetHeader>
            <SheetTitle className="text-[#008755]">Linked KPIs</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-100px)] mt-6">
            <div className="space-y-6">
              {/* Parent KPI */}
              {kpi.relatedKPIs.parent && (
                <div>
                  <h3 className="text-[14px] text-gray-700 mb-3 uppercase">
                    Parent KPI
                  </h3>
                  <Card
                    className="p-4 bg-green-50 border-green-200 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => onKPIClick?.(kpi.relatedKPIs.parent!.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="text-[10px]">
                        {kpi.relatedKPIs.parent.level}
                      </Badge>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                    <h4 className="text-[14px] text-gray-900 mb-3">
                      {kpi.relatedKPIs.parent.name}
                    </h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-gray-500 uppercase">
                          Current
                        </div>
                        <div className="text-[18px] text-[#008755]">
                          {kpi.relatedKPIs.parent.current}%
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-500 uppercase">
                          Target
                        </div>
                        <div className="text-[18px] text-gray-700">
                          {kpi.relatedKPIs.parent.target}%
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* Child KPIs */}
              {kpi.relatedKPIs.children && kpi.relatedKPIs.children.length > 0 && (
                <div>
                  <h3 className="text-[14px] text-gray-700 mb-3 uppercase">
                    Child KPIs ({kpi.relatedKPIs.children.length})
                  </h3>
                  <div className="space-y-3">
                    {kpi.relatedKPIs.children.map((child) => (
                      <Card
                        key={child.id}
                        className="p-4 bg-blue-50 border-blue-200 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => onKPIClick?.(child.id)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant="outline" className="text-[10px]">
                            {child.level}
                          </Badge>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                        <h4 className="text-[14px] text-gray-900 mb-3">
                          {child.name}
                        </h4>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-[10px] text-gray-500 uppercase">
                              Current
                            </div>
                            <div className="text-[18px] text-[#008755]">
                              {child.current}%
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] text-gray-500 uppercase">
                              Target
                            </div>
                            <div className="text-[18px] text-gray-700">
                              {child.target}%
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Related KPIs */}
              {kpi.relatedKPIs.related && kpi.relatedKPIs.related.length > 0 && (
                <div>
                  <h3 className="text-[14px] text-gray-700 mb-3 uppercase">
                    Related KPIs
                  </h3>
                  <div className="space-y-3">
                    {kpi.relatedKPIs.related.map((related) => (
                      <Card
                        key={related.id}
                        className="p-4 bg-purple-50 border-purple-200 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => onKPIClick?.(related.id)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-[10px]">
                              {related.level}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="text-[10px] text-purple-600"
                            >
                              {related.relationship}
                            </Badge>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                        <h4 className="text-[14px] text-gray-900 mb-3">
                          {related.name}
                        </h4>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-[10px] text-gray-500 uppercase">
                              Current
                            </div>
                            <div className="text-[18px] text-[#008755]">
                              {related.current}%
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] text-gray-500 uppercase">
                              Target
                            </div>
                            <div className="text-[18px] text-gray-700">
                              {related.target}%
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}
