import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Slider } from "../ui/slider";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "../ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { 
  ArrowLeft, 
  FileText,
  Download,
  Filter,
  Calendar,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Target,
  CheckCircle2,
  Award,
  AlertTriangle,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Building2,
  Users,
  RefreshCw,
  ListTodo,
  Plus,
  Clock,
  User,
  ChevronDown,
  ChevronRight,
  Circle,
  CheckCircle,
  XCircle,
  Maximize2,
  X,
  Search
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, Cell } from "recharts";
import bannerImage from "figma:asset/2ceb5f3890ecf49940adbd1e2cca8cf7647ce99f.png";

interface ReportsPageProps {
  onBack: () => void;
}

// Mock data for the dashboard
const trendData = [
  { month: "Jan", cdd: 88, cid: 85, hr: 72, finance: 68, strategy: 90, legal: 78 },
  { month: "Feb", cdd: 90, cid: 87, hr: 74, finance: 67, strategy: 91, legal: 80 },
  { month: "Mar", cdd: 89, cid: 89, hr: 76, finance: 65, strategy: 92, legal: 82 },
  { month: "Apr", cdd: 91, cid: 90, hr: 75, finance: 66, strategy: 93, legal: 81 },
  { month: "May", cdd: 92, cid: 91, hr: 77, finance: 68, strategy: 94, legal: 83 },
  { month: "Jun", cdd: 93, cid: 92, hr: 79, finance: 69, strategy: 95, legal: 85 }
];

const divisionData = [
  { name: "Customs Development Division", achievement: 92, target: 95, trend: 4, rating: 4.6, color: "#008755" },
  { name: "Customs Intelligence Division", achievement: 89, target: 90, trend: 2, rating: 4.4, color: "#00B0AA" },
  { name: "Strategy & Corporate Excellence", achievement: 88, target: 90, trend: 3, rating: 4.5, color: "#115E67" },
  { name: "Legal Affairs Division", achievement: 81, target: 85, trend: 1, rating: 4.0, color: "#FFBE9F" },
  { name: "Human Resources Division", achievement: 76, target: 85, trend: -2, rating: 3.8, color: "#77787B" },
  { name: "Finance & Admin Affairs", achievement: 67, target: 80, trend: -5, rating: 3.3, color: "#B94700" }
];

const departmentData = [
  { name: "IT Services", category: "Efficiency", value: 95, count: 12 },
  { name: "Risk Management", category: "Compliance", value: 88, count: 8 },
  { name: "Customer Service", category: "Service Quality", value: 82, count: 15 },
  { name: "Operations", category: "Efficiency", value: 78, count: 20 },
  { name: "Finance", category: "Compliance", value: 72, count: 10 }
];

const kpiInsightsData = [
  { kpi: "Clearance Time", division: "CID", achievement: 91, trend: 3, owner: "Ahmed Ali", status: "green" },
  { kpi: "Customer Satisfaction", division: "CDD", achievement: 88, trend: 2, owner: "Sara Khan", status: "green" },
  { kpi: "System Uptime", division: "CDD", achievement: 85, trend: 1, owner: "Mohammed Hassan", status: "amber" },
  { kpi: "Employee Retention", division: "HRD", achievement: 76, trend: -2, owner: "Fatima Ahmed", status: "amber" },
  { kpi: "Budget Compliance", division: "Finance", achievement: 67, trend: -5, owner: "Khalid Omar", status: "red" },
  { kpi: "Training Hours", division: "HRD", achievement: 65, trend: -3, owner: "Noura Ali", status: "red" }
];

// Additional trend data for multiple charts
const kpiCategoryTrends = [
  { month: "Jan", efficiency: 84, compliance: 88, service: 82, innovation: 79 },
  { month: "Feb", efficiency: 86, compliance: 89, service: 83, innovation: 81 },
  { month: "Mar", efficiency: 85, compliance: 90, service: 85, innovation: 82 },
  { month: "Apr", efficiency: 87, compliance: 91, service: 84, innovation: 84 },
  { month: "May", efficiency: 88, compliance: 92, service: 86, innovation: 85 },
  { month: "Jun", efficiency: 89, compliance: 93, service: 87, innovation: 86 }
];

const departmentTrends = [
  { month: "Jan", it: 92, ops: 78, cs: 80, hr: 70, finance: 65 },
  { month: "Feb", it: 93, ops: 79, cs: 81, hr: 72, finance: 66 },
  { month: "Mar", it: 94, ops: 77, cs: 82, hr: 74, finance: 64 },
  { month: "Apr", it: 95, ops: 78, cs: 82, hr: 73, finance: 65 },
  { month: "May", it: 96, ops: 79, cs: 83, hr: 75, finance: 66 },
  { month: "Jun", it: 95, ops: 80, cs: 82, hr: 77, finance: 67 }
];

const targetVsActualData = [
  { month: "Jan", target: 85, actual: 82, variance: -3 },
  { month: "Feb", target: 85, actual: 84, variance: -1 },
  { month: "Mar", target: 85, actual: 85, variance: 0 },
  { month: "Apr", target: 85, actual: 86, variance: 1 },
  { month: "May", target: 85, actual: 87, variance: 2 },
  { month: "Jun", target: 85, actual: 86, variance: 1 }
];

const ratingTrends = [
  { month: "Jan", avgRating: 4.0, topDivision: 4.5, lowestDivision: 3.2 },
  { month: "Feb", avgRating: 4.1, topDivision: 4.6, lowestDivision: 3.3 },
  { month: "Mar", avgRating: 4.1, topDivision: 4.6, lowestDivision: 3.2 },
  { month: "Apr", avgRating: 4.2, topDivision: 4.6, lowestDivision: 3.3 },
  { month: "May", avgRating: 4.2, topDivision: 4.6, lowestDivision: 3.4 },
  { month: "Jun", avgRating: 4.3, topDivision: 4.6, lowestDivision: 3.3 }
];

const quarterlyComparison = [
  { quarter: "Q1 2024", achievement: 78, initiatives: 35, kpis: 120 },
  { quarter: "Q2 2024", achievement: 81, initiatives: 38, kpis: 125 },
  { quarter: "Q3 2024", achievement: 83, initiatives: 42, kpis: 128 },
  { quarter: "Q4 2024", achievement: 85, initiatives: 45, kpis: 130 },
  { quarter: "Q1 2025", achievement: 86, initiatives: 48, kpis: 132 }
];

// Available KPIs for comparison
const availableKPIs = [
  { id: "clearance-time", name: "Clearance Time", division: "CID", color: "#008755" },
  { id: "customer-satisfaction", name: "Customer Satisfaction", division: "CDD", color: "#00B0AA" },
  { id: "system-uptime", name: "System Uptime", division: "CDD", color: "#115E67" },
  { id: "employee-retention", name: "Employee Retention", division: "HRD", color: "#FFBE9F" },
  { id: "budget-compliance", name: "Budget Compliance", division: "Finance", color: "#B94700" },
  { id: "training-hours", name: "Training Hours", division: "HRD", color: "#77787B" },
  { id: "process-efficiency", name: "Process Efficiency", division: "CID", color: "#BB9956" },
  { id: "audit-compliance", name: "Audit Compliance", division: "Legal", color: "#005844" },
  { id: "innovation-index", name: "Innovation Index", division: "Strategy", color: "#008755" },
  { id: "service-delivery", name: "Service Delivery Time", division: "CDD", color: "#00B0AA" }
];

// Mock data for KPI comparison trends
const kpiComparisonTrendData = [
  { month: "Jan", "clearance-time": 88, "customer-satisfaction": 85, "system-uptime": 92, "employee-retention": 76, "budget-compliance": 67, "training-hours": 65, "process-efficiency": 89, "audit-compliance": 91, "innovation-index": 84, "service-delivery": 87 },
  { month: "Feb", "clearance-time": 89, "customer-satisfaction": 86, "system-uptime": 93, "employee-retention": 75, "budget-compliance": 66, "training-hours": 64, "process-efficiency": 90, "audit-compliance": 92, "innovation-index": 85, "service-delivery": 88 },
  { month: "Mar", "clearance-time": 90, "customer-satisfaction": 87, "system-uptime": 92, "employee-retention": 74, "budget-compliance": 65, "training-hours": 63, "process-efficiency": 91, "audit-compliance": 93, "innovation-index": 86, "service-delivery": 89 },
  { month: "Apr", "clearance-time": 91, "customer-satisfaction": 88, "system-uptime": 94, "employee-retention": 75, "budget-compliance": 66, "training-hours": 65, "process-efficiency": 92, "audit-compliance": 94, "innovation-index": 87, "service-delivery": 90 },
  { month: "May", "clearance-time": 92, "customer-satisfaction": 89, "system-uptime": 93, "employee-retention": 76, "budget-compliance": 67, "training-hours": 66, "process-efficiency": 93, "audit-compliance": 95, "innovation-index": 88, "service-delivery": 91 },
  { month: "Jun", "clearance-time": 91, "customer-satisfaction": 88, "system-uptime": 85, "employee-retention": 76, "budget-compliance": 67, "training-hours": 65, "process-efficiency": 94, "audit-compliance": 96, "innovation-index": 89, "service-delivery": 92 }
];

export function ReportsPage({ onBack }: ReportsPageProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedDivision, setSelectedDivision] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [achievementRange, setAchievementRange] = useState([60]);
  const [showTop5, setShowTop5] = useState(true);
  const [chartType, setChartType] = useState("line");
  const [isChartExpanded, setIsChartExpanded] = useState(false);
  const [selectedKPITypes, setSelectedKPITypes] = useState({
    efficiency: true,
    compliance: true,
    service: true
  });
  const [selectedKPIsForComparison, setSelectedKPIsForComparison] = useState<string[]>([
    "clearance-time",
    "customer-satisfaction",
    "system-uptime"
  ]);
  return (
    <div className="h-full overflow-auto">
      <div className="space-y-4 p-4">
        {/* Hero Banner Section */}
        <Card className="relative text-white border-none shadow-lg overflow-hidden">
          <img 
            src={bannerImage}
            alt="Dubai Customs Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#005844]/80 to-[#008755]/80" />
          <CardContent className="pt-5 pb-5 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0">
                  <div className="h-10 w-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-['Dubai:Bold',_sans-serif] mb-0.5">Performance Reports</h1>
                    <p className="text-white/90 text-sm">Comprehensive performance analysis and reporting</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">

                <Button 
                  variant="outline" 
                  className="border-white bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Reports
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-3">
          <TabsList className="grid w-full max-w-5xl grid-cols-6 bg-white border border-gray-200">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#008755] data-[state=active]:text-white">
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="comparison" className="data-[state=active]:bg-[#008755] data-[state=active]:text-white">
              <Activity className="h-4 w-4 mr-2" />
              Division Comparison
            </TabsTrigger>
            <TabsTrigger value="kpi-comparison" className="data-[state=active]:bg-[#008755] data-[state=active]:text-white">
              <Target className="h-4 w-4 mr-2" />
              KPI Comparison
            </TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-[#008755] data-[state=active]:text-white">
              <TrendingUp className="h-4 w-4 mr-2" />
              Trend Analysis
            </TabsTrigger>
            <TabsTrigger value="kpi-insights" className="data-[state=active]:bg-[#008755] data-[state=active]:text-white">
              <Target className="h-4 w-4 mr-2" />
              KPI Insights
            </TabsTrigger>
            <TabsTrigger value="tasks" className="data-[state=active]:bg-[#008755] data-[state=active]:text-white">
              <ListTodo className="h-4 w-4 mr-2" />
              KPI Tasks
            </TabsTrigger>
          </TabsList>

          {/* Search and Filters */}
          <Card className="rounded-xl">
            <CardContent className="pt-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search reports, KPIs, divisions..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008755] focus:border-transparent font-['Dubai',_sans-serif]"
                  />
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="all-divisions">
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-divisions">All Divisions</SelectItem>
                      <SelectItem value="cdd">Customs Development</SelectItem>
                      <SelectItem value="cid">Customs Intelligence</SelectItem>
                      <SelectItem value="strategy">Strategy & Excellence</SelectItem>
                      <SelectItem value="legal">Legal Affairs</SelectItem>
                      <SelectItem value="hr">Human Resources</SelectItem>
                      <SelectItem value="finance">Finance & Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="q2-2025">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="q2-2025">Q2 2025</SelectItem>
                      <SelectItem value="q1-2025">Q1 2025</SelectItem>
                      <SelectItem value="q4-2024">Q4 2024</SelectItem>
                      <SelectItem value="q3-2024">Q3 2024</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary Metrics Bar */}
          {/* Overview Tab Content */}
          <TabsContent value="overview" className="space-y-4">
            {/* Analytics Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {/* Performance Trend Chart */}
                <Card className="rounded-xl">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="font-['Dubai:Medium',_sans-serif]">Performance Trend</CardTitle>
                        <CardDescription>Monthly achievement percentage by division</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Select value={chartType} onValueChange={setChartType}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="line">Line Chart</SelectItem>
                            <SelectItem value="bar">Bar Chart</SelectItem>
                            <SelectItem value="area">Area Chart</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select value={showTop5 ? "top5" : "all"} onValueChange={(v) => setShowTop5(v === "top5")}>
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="top5">Top 5 Divisions</SelectItem>
                            <SelectItem value="all">All Divisions</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => setIsChartExpanded(!isChartExpanded)}
                          className="h-9 w-9"
                        >
                          <Maximize2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      {chartType === "line" && (
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={trendData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                            <XAxis dataKey="month" stroke="#6B7280" />
                            <YAxis stroke="#6B7280" domain={[60, 100]} />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'white', 
                                border: '1px solid #E5E7EB', 
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                              }}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="cdd" stroke="#008755" strokeWidth={2} name="CDD" dot={{ r: 4 }} activeDot={{ r: 6 }} />
                            <Line type="monotone" dataKey="cid" stroke="#00B0AA" strokeWidth={2} name="CID" dot={{ r: 4 }} activeDot={{ r: 6 }} />
                            <Line type="monotone" dataKey="strategy" stroke="#115E67" strokeWidth={2} name="Strategy" dot={{ r: 4 }} activeDot={{ r: 6 }} />
                            <Line type="monotone" dataKey="legal" stroke="#FFBE9F" strokeWidth={2} name="Legal" dot={{ r: 4 }} activeDot={{ r: 6 }} />
                            <Line type="monotone" dataKey="hr" stroke="#77787B" strokeWidth={2} name="HR" dot={{ r: 4 }} activeDot={{ r: 6 }} />
                          </LineChart>
                        </ResponsiveContainer>
                      )}
                      {chartType === "bar" && (
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={trendData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                            <XAxis dataKey="month" stroke="#6B7280" />
                            <YAxis stroke="#6B7280" domain={[60, 100]} />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'white', 
                                border: '1px solid #E5E7EB', 
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                              }}
                            />
                            <Legend />
                            <Bar dataKey="cdd" fill="#008755" name="CDD" />
                            <Bar dataKey="cid" fill="#00B0AA" name="CID" />
                            <Bar dataKey="strategy" fill="#115E67" name="Strategy" />
                            <Bar dataKey="legal" fill="#FFBE9F" name="Legal" />
                            <Bar dataKey="hr" fill="#77787B" name="HR" />
                          </BarChart>
                        </ResponsiveContainer>
                      )}
                      {chartType === "area" && (
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={trendData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                            <XAxis dataKey="month" stroke="#6B7280" />
                            <YAxis stroke="#6B7280" domain={[60, 100]} />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'white', 
                                border: '1px solid #E5E7EB', 
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                              }}
                            />
                            <Legend />
                            <Area type="monotone" dataKey="cdd" stroke="#008755" fill="#008755" fillOpacity={0.6} strokeWidth={2} name="CDD" />
                            <Area type="monotone" dataKey="cid" stroke="#00B0AA" fill="#00B0AA" fillOpacity={0.6} strokeWidth={2} name="CID" />
                            <Area type="monotone" dataKey="strategy" stroke="#115E67" fill="#115E67" fillOpacity={0.6} strokeWidth={2} name="Strategy" />
                            <Area type="monotone" dataKey="legal" stroke="#FFBE9F" fill="#FFBE9F" fillOpacity={0.6} strokeWidth={2} name="Legal" />
                            <Area type="monotone" dataKey="hr" stroke="#77787B" fill="#77787B" fillOpacity={0.6} strokeWidth={2} name="HR" />
                          </AreaChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Division Comparison Grid */}
                <Card className="rounded-xl">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="font-['Dubai:Medium',_sans-serif]">Division Performance Trends</CardTitle>
                        <CardDescription>6-month achievement tracking by division</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        {divisionData.slice(0, 3).map((division, idx) => (
                          <Badge key={idx} variant="outline" className="gap-1">
                            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: division.color }} />
                            <span className="text-xs">{division.achievement}%</span>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                          <XAxis dataKey="month" stroke="#6B7280" />
                          <YAxis stroke="#6B7280" domain={[60, 100]} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              border: '1px solid #E5E7EB', 
                              borderRadius: '8px',
                              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }}
                          />
                          <Legend />
                          <Line type="monotone" dataKey="cdd" stroke="#008755" strokeWidth={2.5} name="Customs Development" dot={{ r: 4 }} activeDot={{ r: 6 }} />
                          <Line type="monotone" dataKey="cid" stroke="#00B0AA" strokeWidth={2.5} name="Customs Intelligence" dot={{ r: 4 }} activeDot={{ r: 6 }} />
                          <Line type="monotone" dataKey="strategy" stroke="#115E67" strokeWidth={2.5} name="Strategy & Excellence" dot={{ r: 4 }} activeDot={{ r: 6 }} />
                          <Line type="monotone" dataKey="legal" stroke="#FFBE9F" strokeWidth={2} name="Legal Affairs" dot={{ r: 4 }} activeDot={{ r: 6 }} />
                          <Line type="monotone" dataKey="hr" stroke="#77787B" strokeWidth={2} name="Human Resources" dot={{ r: 4 }} activeDot={{ r: 6 }} />
                          <Line type="monotone" dataKey="finance" stroke="#B94700" strokeWidth={2} name="Finance & Admin" dot={{ r: 4 }} activeDot={{ r: 6 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Department Drill-Down Chart */}
                <Card className="rounded-xl">
                  <CardHeader>
                    <CardTitle className="font-['Dubai:Medium',_sans-serif]">Department Performance by Category</CardTitle>
                    <CardDescription>Click to view detailed scorecard</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={departmentData} layout="horizontal">
                          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                          <XAxis type="number" domain={[0, 100]} stroke="#6B7280" />
                          <YAxis type="category" dataKey="name" stroke="#6B7280" width={120} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              border: '1px solid #E5E7EB', 
                              borderRadius: '8px'
                            }}
                            formatter={(value: any, name: any, props: any) => [
                              `${value}% (${props.payload.count} KPIs)`,
                              props.payload.category
                            ]}
                          />
                          <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                            {departmentData.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={entry.value >= 85 ? '#10B981' : entry.value >= 70 ? '#F59E0B' : '#EF4444'}
                                className="cursor-pointer hover:opacity-80 transition-opacity"
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* KPI Category Performance Trends */}
                <Card className="rounded-xl">
                  <CardHeader>
                    <CardTitle className="font-['Dubai:Medium',_sans-serif]">KPI Category Trends</CardTitle>
                    <CardDescription>Performance by category over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={kpiCategoryTrends}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                          <XAxis dataKey="month" stroke="#6B7280" />
                          <YAxis stroke="#6B7280" domain={[70, 100]} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              border: '1px solid #E5E7EB', 
                              borderRadius: '8px',
                              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }}
                          />
                          <Legend />
                          <Line type="monotone" dataKey="efficiency" stroke="#008755" strokeWidth={3} name="Efficiency" dot={{ r: 5 }} activeDot={{ r: 7 }} />
                          <Line type="monotone" dataKey="compliance" stroke="#00B0AA" strokeWidth={3} name="Compliance" dot={{ r: 5 }} activeDot={{ r: 7 }} />
                          <Line type="monotone" dataKey="service" stroke="#FFBE9F" strokeWidth={3} name="Service Quality" dot={{ r: 5 }} activeDot={{ r: 7 }} />
                          <Line type="monotone" dataKey="innovation" stroke="#115E67" strokeWidth={3} name="Innovation" dot={{ r: 5 }} activeDot={{ r: 7 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Department Performance Trends */}
                <Card className="rounded-xl">
                  <CardHeader>
                    <CardTitle className="font-['Dubai:Medium',_sans-serif]">Department Performance Trends</CardTitle>
                    <CardDescription>Top departments monthly achievement tracking</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={departmentTrends}>
                          <defs>
                            <linearGradient id="colorIT" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#008755" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#008755" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorCS" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#00B0AA" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#00B0AA" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorOps" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#FFBE9F" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#FFBE9F" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                          <XAxis dataKey="month" stroke="#6B7280" />
                          <YAxis stroke="#6B7280" domain={[60, 100]} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              border: '1px solid #E5E7EB', 
                              borderRadius: '8px'
                            }}
                          />
                          <Legend />
                          <Area type="monotone" dataKey="it" stroke="#008755" fillOpacity={1} fill="url(#colorIT)" strokeWidth={2} name="IT Services" />
                          <Area type="monotone" dataKey="cs" stroke="#00B0AA" fillOpacity={1} fill="url(#colorCS)" strokeWidth={2} name="Customer Service" />
                          <Area type="monotone" dataKey="ops" stroke="#FFBE9F" fillOpacity={1} fill="url(#colorOps)" strokeWidth={2} name="Operations" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Target vs Actual Performance */}
                <Card className="rounded-xl">
                  <CardHeader>
                    <CardTitle className="font-['Dubai:Medium',_sans-serif]">Target vs Actual Achievement</CardTitle>
                    <CardDescription>Performance variance tracking</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={targetVsActualData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                          <XAxis dataKey="month" stroke="#6B7280" />
                          <YAxis stroke="#6B7280" domain={[75, 90]} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              border: '1px solid #E5E7EB', 
                              borderRadius: '8px'
                            }}
                          />
                          <Legend />
                          <Line type="monotone" dataKey="target" stroke="#77787B" strokeWidth={2} strokeDasharray="5 5" name="Target" dot={{ r: 4 }} />
                          <Line type="monotone" dataKey="actual" stroke="#008755" strokeWidth={3} name="Actual" dot={{ r: 5 }} activeDot={{ r: 7 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
            </div>
          </TabsContent>

          {/* Division Comparison Tab */}
          <TabsContent value="comparison" className="space-y-4">
            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle className="font-['Dubai:Medium',_'Dubai']">Division Performance Heatmap</CardTitle>
                <CardDescription>Performance across KPI categories by division</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 text-sm font-['Dubai:Medium',_'Dubai']">Division</th>
                        <th className="text-center p-3 text-sm font-['Dubai:Medium',_'Dubai']">Efficiency</th>
                        <th className="text-center p-3 text-sm font-['Dubai:Medium',_'Dubai']">Compliance</th>
                        <th className="text-center p-3 text-sm font-['Dubai:Medium',_'Dubai']">Service Quality</th>
                        <th className="text-center p-3 text-sm font-['Dubai:Medium',_'Dubai']">Innovation</th>
                        <th className="text-center p-3 text-sm font-['Dubai:Medium',_'Dubai']">Overall</th>
                      </tr>
                    </thead>
                    <tbody>
                      {divisionData.map((division, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-50 transition-colors">
                          <td className="p-3 text-sm font-['Dubai:Medium',_'Dubai']">{division.name}</td>
                          <td className="p-3">
                            <div 
                              className="mx-auto w-16 h-8 rounded flex items-center justify-center text-xs"
                              style={{
                                backgroundColor: division.achievement >= 85 ? '#35774320' : 
                                  division.achievement >= 70 ? '#F2A20020' : '#D8373120',
                                color: division.achievement >= 85 ? '#357743' : 
                                  division.achievement >= 70 ? '#F2A200' : '#D83731'
                              }}
                            >
                              {division.achievement - 3}%
                            </div>
                          </td>
                          <td className="p-3">
                            <div 
                              className="mx-auto w-16 h-8 rounded flex items-center justify-center text-xs"
                              style={{
                                backgroundColor: division.achievement >= 85 ? '#35774320' : 
                                  division.achievement >= 70 ? '#F2A20020' : '#D8373120',
                                color: division.achievement >= 85 ? '#357743' : 
                                  division.achievement >= 70 ? '#F2A200' : '#D83731'
                              }}
                            >
                              {division.achievement + 2}%
                            </div>
                          </td>
                          <td className="p-3">
                            <div 
                              className="mx-auto w-16 h-8 rounded flex items-center justify-center text-xs"
                              style={{
                                backgroundColor: division.achievement >= 85 ? '#35774320' : 
                                  division.achievement >= 70 ? '#F2A20020' : '#D8373120',
                                color: division.achievement >= 85 ? '#357743' : 
                                  division.achievement >= 70 ? '#F2A200' : '#D83731'
                              }}
                            >
                              {division.achievement - 1}%
                            </div>
                          </td>
                          <td className="p-3">
                            <div 
                              className="mx-auto w-16 h-8 rounded flex items-center justify-center text-xs"
                              style={{
                                backgroundColor: division.achievement >= 85 ? '#35774320' : 
                                  division.achievement >= 70 ? '#F2A20020' : '#D8373120',
                                color: division.achievement >= 85 ? '#357743' : 
                                  division.achievement >= 70 ? '#F2A200' : '#D83731'
                              }}
                            >
                              {division.achievement}%
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="mx-auto w-16 h-8 rounded flex items-center justify-center text-xs bg-[#008755]/10 text-[#008755] font-['Dubai:Medium',_'Dubai']">
                              {division.achievement}%
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* KPI Comparison Tab */}
          <TabsContent value="kpi-comparison" className="space-y-4">
            {/* KPI Selection Card */}
            <Card className="rounded-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-['Dubai:Medium',_'Dubai']">Select KPIs to Compare</CardTitle>
                    <CardDescription>Choose KPIs from the dropdowns to view comparison charts</CardDescription>
                  </div>
                  <Badge variant="outline" className="text-[#008755] border-[#008755]">
                    {selectedKPIsForComparison.length} Selected
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-['Dubai:Medium',_'Dubai']">KPI 1</Label>
                    <Select 
                      value={selectedKPIsForComparison[0] || ""}
                      onValueChange={(value) => {
                        const newSelection = [...selectedKPIsForComparison];
                        newSelection[0] = value;
                        setSelectedKPIsForComparison(newSelection.filter(Boolean));
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select first KPI" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableKPIs.map((kpi) => (
                          <SelectItem key={kpi.id} value={kpi.id}>
                            <div className="flex items-center gap-2">
                              <div
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: kpi.color }}
                              />
                              <span>{kpi.name}</span>
                              <span className="text-xs text-muted-foreground">({kpi.division})</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-['Dubai:Medium',_'Dubai']">KPI 2</Label>
                    <Select 
                      value={selectedKPIsForComparison[1] || ""}
                      onValueChange={(value) => {
                        const newSelection = [...selectedKPIsForComparison];
                        if (newSelection.length < 1) {
                          newSelection[0] = selectedKPIsForComparison[0] || "";
                        }
                        newSelection[1] = value;
                        setSelectedKPIsForComparison(newSelection.filter(Boolean));
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select second KPI" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableKPIs.map((kpi) => (
                          <SelectItem key={kpi.id} value={kpi.id}>
                            <div className="flex items-center gap-2">
                              <div
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: kpi.color }}
                              />
                              <span>{kpi.name}</span>
                              <span className="text-xs text-muted-foreground">({kpi.division})</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-['Dubai:Medium',_'Dubai']">KPI 3 (Optional)</Label>
                    <Select 
                      value={selectedKPIsForComparison[2] || ""}
                      onValueChange={(value) => {
                        const newSelection = [...selectedKPIsForComparison];
                        if (newSelection.length < 2) return;
                        newSelection[2] = value;
                        setSelectedKPIsForComparison(newSelection.filter(Boolean));
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select third KPI (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">
                          <span className="text-muted-foreground">None</span>
                        </SelectItem>
                        {availableKPIs.map((kpi) => (
                          <SelectItem key={kpi.id} value={kpi.id}>
                            <div className="flex items-center gap-2">
                              <div
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: kpi.color }}
                              />
                              <span>{kpi.name}</span>
                              <span className="text-xs text-muted-foreground">({kpi.division})</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-['Dubai:Medium',_'Dubai']">KPI 4 (Optional)</Label>
                    <Select 
                      value={selectedKPIsForComparison[3] || ""}
                      onValueChange={(value) => {
                        const newSelection = [...selectedKPIsForComparison];
                        if (newSelection.length < 2) return;
                        newSelection[3] = value;
                        setSelectedKPIsForComparison(newSelection.filter(Boolean));
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select fourth KPI (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">
                          <span className="text-muted-foreground">None</span>
                        </SelectItem>
                        {availableKPIs.map((kpi) => (
                          <SelectItem key={kpi.id} value={kpi.id}>
                            <div className="flex items-center gap-2">
                              <div
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: kpi.color }}
                              />
                              <span>{kpi.name}</span>
                              <span className="text-xs text-muted-foreground">({kpi.division})</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-['Dubai:Medium',_'Dubai']">KPI 5 (Optional)</Label>
                    <Select 
                      value={selectedKPIsForComparison[4] || ""}
                      onValueChange={(value) => {
                        const newSelection = [...selectedKPIsForComparison];
                        if (newSelection.length < 2) return;
                        newSelection[4] = value;
                        setSelectedKPIsForComparison(newSelection.filter(Boolean));
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select fifth KPI (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">
                          <span className="text-muted-foreground">None</span>
                        </SelectItem>
                        {availableKPIs.map((kpi) => (
                          <SelectItem key={kpi.id} value={kpi.id}>
                            <div className="flex items-center gap-2">
                              <div
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: kpi.color }}
                              />
                              <span>{kpi.name}</span>
                              <span className="text-xs text-muted-foreground">({kpi.division})</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-['Dubai:Medium',_'Dubai']">KPI 6 (Optional)</Label>
                    <Select 
                      value={selectedKPIsForComparison[5] || ""}
                      onValueChange={(value) => {
                        const newSelection = [...selectedKPIsForComparison];
                        if (newSelection.length < 2) return;
                        newSelection[5] = value;
                        setSelectedKPIsForComparison(newSelection.filter(Boolean));
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select sixth KPI (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">
                          <span className="text-muted-foreground">None</span>
                        </SelectItem>
                        {availableKPIs.map((kpi) => (
                          <SelectItem key={kpi.id} value={kpi.id}>
                            <div className="flex items-center gap-2">
                              <div
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: kpi.color }}
                              />
                              <span>{kpi.name}</span>
                              <span className="text-xs text-muted-foreground">({kpi.division})</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-900">
                    <strong>Tip:</strong> Select at least 2 KPIs to view comparison charts. You can compare up to 6 KPIs simultaneously.
                  </p>
                </div>
              </CardContent>
            </Card>

            {selectedKPIsForComparison.length > 0 ? (
              <>
                {/* Performance Trend Comparison */}
                <Card className="rounded-xl">
                  <CardHeader>
                    <CardTitle className="font-['Dubai:Medium',_'Dubai']">KPI Performance Trends</CardTitle>
                    <CardDescription>6-month performance comparison for selected KPIs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-96">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={kpiComparisonTrendData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                          <XAxis 
                            dataKey="month" 
                            stroke="#6B7280"
                            style={{ fontSize: '12px', fontFamily: 'Dubai' }}
                          />
                          <YAxis 
                            stroke="#6B7280" 
                            domain={[60, 100]}
                            style={{ fontSize: '12px', fontFamily: 'Dubai' }}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              border: '1px solid #E5E7EB', 
                              borderRadius: '8px',
                              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                              fontFamily: 'Dubai'
                            }}
                          />
                          <Legend 
                            wrapperStyle={{ 
                              fontSize: '12px',
                              fontFamily: 'Dubai'
                            }}
                          />
                          {[...new Set(selectedKPIsForComparison)].map((kpiId) => {
                            const kpi = availableKPIs.find(k => k.id === kpiId);
                            return kpi ? (
                              <Line
                                key={kpiId}
                                type="monotone"
                                dataKey={kpiId}
                                stroke={kpi.color}
                                strokeWidth={2.5}
                                name={kpi.name}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                              />
                            ) : null;
                          })}
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Side-by-Side Comparison */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Current Achievement Comparison */}
                  <Card className="rounded-xl">
                    <CardHeader>
                      <CardTitle className="font-['Dubai:Medium',_'Dubai']">Current Achievement Comparison</CardTitle>
                      <CardDescription>Latest performance snapshot (June 2025)</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart 
                            data={selectedKPIsForComparison.map(kpiId => {
                              const kpi = availableKPIs.find(k => k.id === kpiId);
                              const latestData = kpiComparisonTrendData[kpiComparisonTrendData.length - 1];
                              return {
                                name: kpi?.name || kpiId,
                                value: latestData[kpiId as keyof typeof latestData] as number,
                                color: kpi?.color || "#008755"
                              };
                            })}
                            layout="horizontal"
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                            <XAxis 
                              type="number" 
                              domain={[0, 100]}
                              style={{ fontSize: '12px', fontFamily: 'Dubai' }}
                            />
                            <YAxis 
                              type="category" 
                              dataKey="name" 
                              width={150}
                              style={{ fontSize: '12px', fontFamily: 'Dubai' }}
                            />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'white', 
                                border: '1px solid #E5E7EB', 
                                borderRadius: '8px',
                                fontFamily: 'Dubai'
                              }}
                            />
                            <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                              {selectedKPIsForComparison.map((kpiId, index) => {
                                const kpi = availableKPIs.find(k => k.id === kpiId);
                                return (
                                  <Cell 
                                    key={`cell-${index}`} 
                                    fill={kpi?.color || "#008755"}
                                  />
                                );
                              })}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Performance Distribution */}
                  <Card className="rounded-xl">
                    <CardHeader>
                      <CardTitle className="font-['Dubai:Medium',_'Dubai']">6-Month Average Performance</CardTitle>
                      <CardDescription>Average achievement across all months</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart 
                            data={selectedKPIsForComparison.map(kpiId => {
                              const kpi = availableKPIs.find(k => k.id === kpiId);
                              const avgValue = kpiComparisonTrendData.reduce((sum, month) => {
                                return sum + (month[kpiId as keyof typeof month] as number || 0);
                              }, 0) / kpiComparisonTrendData.length;
                              return {
                                name: kpi?.name || kpiId,
                                average: Math.round(avgValue),
                                color: kpi?.color || "#008755"
                              };
                            })}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                            <XAxis 
                              dataKey="name" 
                              angle={-45}
                              textAnchor="end"
                              height={100}
                              style={{ fontSize: '11px', fontFamily: 'Dubai' }}
                            />
                            <YAxis 
                              domain={[0, 100]}
                              style={{ fontSize: '12px', fontFamily: 'Dubai' }}
                            />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'white', 
                                border: '1px solid #E5E7EB', 
                                borderRadius: '8px',
                                fontFamily: 'Dubai'
                              }}
                            />
                            <Bar dataKey="average" radius={[8, 8, 0, 0]}>
                              {selectedKPIsForComparison.map((kpiId, index) => {
                                const kpi = availableKPIs.find(k => k.id === kpiId);
                                return (
                                  <Cell 
                                    key={`cell-${index}`} 
                                    fill={kpi?.color || "#008755"}
                                  />
                                );
                              })}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Detailed Comparison Table */}
                <Card className="rounded-xl">
                  <CardHeader>
                    <CardTitle className="font-['Dubai:Medium',_'Dubai']">Detailed Monthly Comparison</CardTitle>
                    <CardDescription>Month-by-month performance breakdown</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-3 text-sm font-['Dubai:Medium',_'Dubai']">KPI</th>
                            <th className="text-left p-3 text-sm font-['Dubai:Medium',_'Dubai']">Division</th>
                            {kpiComparisonTrendData.map((data, idx) => (
                              <th key={idx} className="text-center p-3 text-sm font-['Dubai:Medium',_'Dubai']">
                                {data.month}
                              </th>
                            ))}
                            <th className="text-center p-3 text-sm font-['Dubai:Medium',_'Dubai']">Avg</th>
                            <th className="text-center p-3 text-sm font-['Dubai:Medium',_'Dubai']">Trend</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedKPIsForComparison.map((kpiId, idx) => {
                            const kpi = availableKPIs.find(k => k.id === kpiId);
                            const values = kpiComparisonTrendData.map(month => month[kpiId as keyof typeof month] as number);
                            const average = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
                            const trend = values[values.length - 1] - values[0];
                            
                            return (
                              <tr key={idx} className="border-b hover:bg-gray-50 transition-colors">
                                <td className="p-3 text-sm font-['Dubai:Medium',_'Dubai']">
                                  <div className="flex items-center gap-2">
                                    <div
                                      className="h-3 w-3 rounded-full"
                                      style={{ backgroundColor: kpi?.color }}
                                    />
                                    {kpi?.name}
                                  </div>
                                </td>
                                <td className="p-3 text-sm text-muted-foreground">{kpi?.division}</td>
                                {values.map((value, monthIdx) => (
                                  <td key={monthIdx} className="p-3 text-center">
                                    <span 
                                      className="text-sm px-2 py-1 rounded"
                                      style={{
                                        backgroundColor: value >= 85 ? '#35774320' :
                                          value >= 70 ? '#F2A20020' : '#D8373120',
                                        color: value >= 85 ? '#357743' :
                                          value >= 70 ? '#F2A200' : '#D83731'
                                      }}
                                    >
                                      {value}%
                                    </span>
                                  </td>
                                ))}
                                <td className="p-3 text-center">
                                  <span className="text-sm font-['Dubai:Medium',_'Dubai']">{average}%</span>
                                </td>
                                <td className="p-3 text-center">
                                  <div className="flex items-center justify-center gap-1">
                                    {trend > 0 ? (
                                      <>
                                        <ArrowUpRight className="h-3 w-3" style={{ color: '#357743' }} />
                                        <span className="text-sm" style={{ color: '#357743' }}>+{trend}%</span>
                                      </>
                                    ) : trend < 0 ? (
                                      <>
                                        <ArrowDownRight className="h-3 w-3" style={{ color: '#D83731' }} />
                                        <span className="text-sm" style={{ color: '#D83731' }}>{trend}%</span>
                                      </>
                                    ) : (
                                      <>
                                        <Minus className="h-3 w-3 text-gray-600" />
                                        <span className="text-sm text-gray-600">0%</span>
                                      </>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="rounded-xl">
                <CardContent className="pt-12 pb-12">
                  <div className="text-center">
                    <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-['Dubai:Medium',_'Dubai'] text-gray-900 mb-2">
                      No KPIs Selected
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Select one or more KPIs from the list above to view comparison charts
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Trend Analysis Tab */}
          <TabsContent value="trends" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* KPI Achievement Trend */}
              <Card className="rounded-xl">
                <CardHeader>
                  <CardTitle className="font-['Dubai:Medium',_sans-serif]">Overall KPI Achievement</CardTitle>
                  <CardDescription>6-month performance progression</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trendData}>
                        <defs>
                          <linearGradient id="colorCdd" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#008755" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#008755" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="month" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" domain={[60, 100]} />
                        <Tooltip />
                        <Area type="monotone" dataKey="cdd" stroke="#008755" fillOpacity={1} fill="url(#colorCdd)" strokeWidth={2} name="Achievement %" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Initiatives Completed */}
              <Card className="rounded-xl">
                <CardHeader>
                  <CardTitle className="font-['Dubai:Medium',_sans-serif]">Initiatives Completed</CardTitle>
                  <CardDescription>Monthly completion tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        { month: "Jan", completed: 6 },
                        { month: "Feb", completed: 8 },
                        { month: "Mar", completed: 7 },
                        { month: "Apr", completed: 9 },
                        { month: "May", completed: 7 },
                        { month: "Jun", completed: 8 }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="month" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip />
                        <Bar dataKey="completed" fill="#008755" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Rating Trends */}
              <Card className="rounded-xl">
                <CardHeader>
                  <CardTitle className="font-['Dubai:Medium',_sans-serif]">Performance Rating Trends</CardTitle>
                  <CardDescription>Average rating progression across divisions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={ratingTrends}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="month" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" domain={[3, 5]} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #E5E7EB', 
                            borderRadius: '8px'
                          }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="avgRating" stroke="#008755" strokeWidth={3} name="Average Rating" dot={{ r: 5 }} activeDot={{ r: 7 }} />
                        <Line type="monotone" dataKey="topDivision" stroke="#10B981" strokeWidth={2} strokeDasharray="5 5" name="Top Division" dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="lowestDivision" stroke="#EF4444" strokeWidth={2} strokeDasharray="5 5" name="Lowest Division" dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Quarterly Comparison */}
              <Card className="rounded-xl">
                <CardHeader>
                  <CardTitle className="font-['Dubai:Medium',_sans-serif]">Quarterly Performance Overview</CardTitle>
                  <CardDescription>Achievement, initiatives, and KPI growth</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={quarterlyComparison}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="quarter" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #E5E7EB', 
                            borderRadius: '8px'
                          }}
                        />
                        <Legend />
                        <Bar dataKey="achievement" fill="#008755" radius={[8, 8, 0, 0]} name="Achievement %" />
                        <Bar dataKey="initiatives" fill="#00B0AA" radius={[8, 8, 0, 0]} name="Initiatives" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Multi-Division Comparison */}
              <Card className="rounded-xl lg:col-span-2">
                <CardHeader>
                  <CardTitle className="font-['Dubai:Medium',_sans-serif]">Division Achievement Comparison</CardTitle>
                  <CardDescription>All divisions performance over 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="month" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" domain={[60, 100]} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #E5E7EB', 
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                          }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="cdd" stroke="#008755" strokeWidth={3} name="CDD" dot={{ r: 5 }} activeDot={{ r: 7 }} />
                        <Line type="monotone" dataKey="cid" stroke="#00B0AA" strokeWidth={3} name="CID" dot={{ r: 5 }} activeDot={{ r: 7 }} />
                        <Line type="monotone" dataKey="strategy" stroke="#115E67" strokeWidth={3} name="Strategy" dot={{ r: 5 }} activeDot={{ r: 7 }} />
                        <Line type="monotone" dataKey="legal" stroke="#FFBE9F" strokeWidth={3} name="Legal" dot={{ r: 5 }} activeDot={{ r: 7 }} />
                        <Line type="monotone" dataKey="hr" stroke="#77787B" strokeWidth={3} name="HR" dot={{ r: 5 }} activeDot={{ r: 7 }} />
                        <Line type="monotone" dataKey="finance" stroke="#B94700" strokeWidth={3} name="Finance" dot={{ r: 5 }} activeDot={{ r: 7 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Variance Analysis */}
              <Card className="rounded-xl lg:col-span-2">
                <CardHeader>
                  <CardTitle className="font-['Dubai:Medium',_sans-serif]">Target vs Actual Performance</CardTitle>
                  <CardDescription>Performance variance with target baseline</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={targetVsActualData}>
                        <defs>
                          <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#008755" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#008755" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="month" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" domain={[75, 90]} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #E5E7EB', 
                            borderRadius: '8px'
                          }}
                        />
                        <Legend />
                        <Area type="monotone" dataKey="actual" stroke="#008755" fillOpacity={1} fill="url(#colorActual)" strokeWidth={3} name="Actual Achievement" />
                        <Line type="monotone" dataKey="target" stroke="#77787B" strokeWidth={2} strokeDasharray="5 5" name="Target" dot={{ r: 4 }} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* KPI Insights Tab */}
          <TabsContent value="kpi-insights" className="space-y-4">
            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle className="font-['Dubai:Medium',_sans-serif]">KPI Performance Leaderboard</CardTitle>
                <CardDescription>Detailed KPI tracking across all divisions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 text-sm font-['Dubai:Medium',_sans-serif]">KPI</th>
                        <th className="text-left p-3 text-sm font-['Dubai:Medium',_sans-serif]">Division</th>
                        <th className="text-center p-3 text-sm font-['Dubai:Medium',_sans-serif]">Achievement</th>
                        <th className="text-center p-3 text-sm font-['Dubai:Medium',_sans-serif]">Trend</th>
                        <th className="text-left p-3 text-sm font-['Dubai:Medium',_sans-serif]">Owner</th>
                        <th className="text-center p-3 text-sm font-['Dubai:Medium',_sans-serif]">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {kpiInsightsData.map((kpi, idx) => (
                        <tr key={idx} className={`border-b hover:bg-gray-50 transition-colors ${
                          kpi.status === 'red' ? 'bg-red-50/50' : ''
                        }`}>
                          <td className="p-3 text-sm font-['Dubai:Medium',_sans-serif]">{kpi.kpi}</td>
                          <td className="p-3 text-sm text-muted-foreground">{kpi.division}</td>
                          <td className="p-3 text-center">
                            <span className="text-sm font-['Dubai:Medium',_sans-serif]">{kpi.achievement}%</span>
                          </td>
                          <td className="p-3 text-center">
                            <div className="flex items-center justify-center gap-1">
                              {kpi.trend > 0 ? (
                                <>
                                  <ArrowUpRight className="h-3 w-3 text-green-600" />
                                  <span className="text-sm text-green-600">+{kpi.trend}%</span>
                                </>
                              ) : (
                                <>
                                  <ArrowDownRight className="h-3 w-3 text-red-600" />
                                  <span className="text-sm text-red-600">{kpi.trend}%</span>
                                </>
                              )}
                            </div>
                          </td>
                          <td className="p-3 text-sm text-muted-foreground">{kpi.owner}</td>
                          <td className="p-3 text-center">
                            <Badge 
                              style={{
                                backgroundColor: kpi.status === 'green' ? '#35774320' :
                                  kpi.status === 'amber' ? '#F2A20020' : '#D8373120',
                                color: kpi.status === 'green' ? '#357743' :
                                  kpi.status === 'amber' ? '#F2A200' : '#D83731'
                              }}
                              className="hover:opacity-80"
                            >
                              {kpi.status === 'green' ? 'On Track' : kpi.status === 'amber' ? 'At Risk' : 'Critical'}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* KPI Tasks Tab */}
          <TabsContent value="tasks" className="space-y-4">
            {/* Tasks Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="rounded-xl">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-10 w-10 rounded-lg bg-[#008755]/10 flex items-center justify-center">
                      <ListTodo className="h-5 w-5 text-[#008755]" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Total Tasks</p>
                  <p className="text-3xl font-['Dubai:Medium',_sans-serif] text-[#1f2937]">127</p>
                  <p className="text-xs text-muted-foreground mt-2">Across 52 KPIs</p>
                </CardContent>
              </Card>

              <Card className="rounded-xl">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Completed</p>
                  <p className="text-3xl font-['Dubai:Medium',_sans-serif] text-[#1f2937]">108</p>
                  <p className="text-xs text-muted-foreground mt-2">On schedule</p>
                </CardContent>
              </Card>

              <Card className="rounded-xl">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-amber-600" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">In Progress</p>
                  <p className="text-3xl font-['Dubai:Medium',_sans-serif] text-[#1f2937]">14</p>
                  <p className="text-xs text-muted-foreground mt-2">Due this week</p>
                </CardContent>
              </Card>

              <Card className="rounded-xl">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">At Risk</p>
                  <p className="text-3xl font-['Dubai:Medium',_sans-serif] text-[#1f2937]">5</p>
                  <p className="text-xs text-muted-foreground mt-2">Needs attention</p>
                </CardContent>
              </Card>
            </div>

            {/* Action Plan Generator */}


            {/* KPI Tasks List */}
            <Card className="rounded-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-['Dubai:Medium',_sans-serif]">KPI Tasks Overview</CardTitle>
                    <CardDescription>Tasks linked to KPI performance and improvement</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Tasks</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* KPI with Tasks - Example 1: Critical Status */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <ChevronDown className="h-4 w-4 text-gray-600" />
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="font-['Dubai:Medium',_sans-serif]">Budget Compliance Rate</h4>
                              <Badge className="bg-red-100 text-red-700 hover:bg-red-200">Critical</Badge>
                              <Badge variant="outline" className="text-[#B94700] border-[#B94700]">Finance & Admin</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Target className="h-3 w-3" />
                                Achievement: <span className="font-['Dubai:Medium',_sans-serif] text-red-600">67%</span>
                              </span>
                              <span className="flex items-center gap-1">
                                <ListTodo className="h-3 w-3" />
                                5 Tasks
                              </span>
                              <span className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                Khalid Omar
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <Progress value={67} className="w-32 h-2 mb-1" indicatorColor="#D83731" />
                            <p className="text-xs text-muted-foreground">Target: 80%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-white space-y-3">
                      {/* Task 1 */}
                      <div className="flex items-start gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <div className="flex-1">
                          <h5 className="font-['Dubai:Medium',_sans-serif] mb-1">Review Q1 budget variances</h5>
                          <p className="text-sm text-muted-foreground mb-2">Analyze all departments with &gt;10% variance from allocated budget</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              Sarah Ahmed
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Due: Jun 15, 2025
                            </span>
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Completed</Badge>
                          </div>
                        </div>
                      </div>

                      {/* Task 2 */}
                      <div className="flex items-start gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                        <Circle className="h-5 w-5 text-amber-600 mt-0.5" />
                        <div className="flex-1">
                          <h5 className="font-['Dubai:Medium',_sans-serif] mb-1">Implement monthly budget monitoring system</h5>
                          <p className="text-sm text-muted-foreground mb-2">Set up automated alerts for budget threshold breaches</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              Ahmed Hassan
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Due: Jun 30, 2025
                            </span>
                            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200">In Progress</Badge>
                          </div>
                        </div>
                      </div>

                      {/* Task 3 */}
                      <div className="flex items-start gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                        <Circle className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div className="flex-1">
                          <h5 className="font-['Dubai:Medium',_sans-serif] mb-1">Conduct budget training for department heads</h5>
                          <p className="text-sm text-muted-foreground mb-2">3-hour workshop on budget planning and control procedures</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              Fatima Rashid
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Due: Jul 15, 2025
                            </span>
                            <Badge variant="outline">Pending</Badge>
                          </div>
                        </div>
                      </div>

                      {/* Task 4 */}
                      <div className="flex items-start gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                        <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                        <div className="flex-1">
                          <h5 className="font-['Dubai:Medium',_sans-serif] mb-1">Review and approve budget reallocation requests</h5>
                          <p className="text-sm text-muted-foreground mb-2">Process 12 pending reallocation requests from various departments</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              Khalid Omar
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Due: Jun 20, 2025
                            </span>
                            <Badge className="bg-red-100 text-red-700 hover:bg-red-200">Overdue</Badge>
                          </div>
                        </div>
                      </div>

                      {/* Task 5 */}
                      <div className="flex items-start gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                        <Circle className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div className="flex-1">
                          <h5 className="font-['Dubai:Medium',_sans-serif] mb-1">Prepare Q2 budget compliance report</h5>
                          <p className="text-sm text-muted-foreground mb-2">Comprehensive report for executive management review</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              Sarah Ahmed
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Due: Jul 5, 2025
                            </span>
                            <Badge variant="outline">Pending</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* KPI with Tasks - Example 2: At Risk Status */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <ChevronRight className="h-4 w-4 text-gray-600" />
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="font-['Dubai:Medium',_sans-serif]">Employee Retention Rate</h4>
                              <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200">At Risk</Badge>
                              <Badge variant="outline" className="text-[#77787B] border-[#77787B]">Human Resources</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Target className="h-3 w-3" />
                                Achievement: <span className="font-['Dubai:Medium',_sans-serif] text-amber-600">76%</span>
                              </span>
                              <span className="flex items-center gap-1">
                                <ListTodo className="h-3 w-3" />
                                3 Tasks
                              </span>
                              <span className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                Fatima Ahmed
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <Progress value={76} className="w-32 h-2 mb-1" indicatorColor="#F2A200" />
                            <p className="text-xs text-muted-foreground">Target: 85%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* KPI with Tasks - Example 3: On Track */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <ChevronRight className="h-4 w-4 text-gray-600" />
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="font-['Dubai:Medium',_sans-serif]">Customer Satisfaction Score</h4>
                              <Badge className="bg-green-100 text-green-700 hover:bg-green-200">On Track</Badge>
                              <Badge variant="outline" className="text-[#008755] border-[#008755]">Customs Development</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Target className="h-3 w-3" />
                                Achievement: <span className="font-['Dubai:Medium',_sans-serif] text-green-600">88%</span>
                              </span>
                              <span className="flex items-center gap-1">
                                <ListTodo className="h-3 w-3" />
                                2 Tasks
                              </span>
                              <span className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                Sara Khan
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <Progress value={88} className="w-32 h-2 mb-1" indicatorColor="#357743" />
                            <p className="text-xs text-muted-foreground">Target: 85%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* KPI with Tasks - Example 4: On Track */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <ChevronRight className="h-4 w-4 text-gray-600" />
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="font-['Dubai:Medium',_sans-serif]">Customs Clearance Time</h4>
                              <Badge className="bg-green-100 text-green-700 hover:bg-green-200">On Track</Badge>
                              <Badge variant="outline" className="text-[#00B0AA] border-[#00B0AA]">Customs Intelligence</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Target className="h-3 w-3" />
                                Achievement: <span className="font-['Dubai:Medium',_sans-serif] text-green-600">91%</span>
                              </span>
                              <span className="flex items-center gap-1">
                                <ListTodo className="h-3 w-3" />
                                4 Tasks
                              </span>
                              <span className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                Ahmed Ali
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <Progress value={91} className="w-32 h-2 mb-1" indicatorColor="#357743" />
                            <p className="text-xs text-muted-foreground">Target: 90%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* KPI with Tasks - Example 5: At Risk */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <ChevronRight className="h-4 w-4 text-gray-600" />
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="font-['Dubai:Medium',_sans-serif]">System Uptime Percentage</h4>
                              <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200">At Risk</Badge>
                              <Badge variant="outline" className="text-[#008755] border-[#008755]">Customs Development</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Target className="h-3 w-3" />
                                Achievement: <span className="font-['Dubai:Medium',_sans-serif] text-amber-600">85%</span>
                              </span>
                              <span className="flex items-center gap-1">
                                <ListTodo className="h-3 w-3" />
                                3 Tasks
                              </span>
                              <span className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                Mohammed Hassan
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <Progress value={85} className="w-32 h-2 mb-1" indicatorColor="#F2A200" />
                            <p className="text-xs text-muted-foreground">Target: 95%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Expanded Chart Sheet */}
        <Sheet open={isChartExpanded} onOpenChange={setIsChartExpanded}>
          <SheetContent side="right" className="w-full sm:max-w-4xl lg:max-w-6xl p-0 overflow-hidden">
            <div className="h-full flex flex-col">
              <SheetHeader className="px-6 py-4 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <SheetTitle className="font-['Dubai:Medium',_sans-serif] text-2xl">Performance Trend - Detailed View</SheetTitle>
                    <SheetDescription>Comprehensive analysis of monthly achievement percentages by division</SheetDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={chartType} onValueChange={setChartType}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="line">Line Chart</SelectItem>
                        <SelectItem value="bar">Bar Chart</SelectItem>
                        <SelectItem value="area">Area Chart</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={showTop5 ? "top5" : "all"} onValueChange={(v) => setShowTop5(v === "top5")}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="top5">Top 5 Divisions</SelectItem>
                        <SelectItem value="all">All Divisions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </SheetHeader>
              
              <div className="flex-1 overflow-auto px-6 py-6 space-y-6">
              {/* Summary Statistics */}
              <div className="grid grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-lg bg-[#008755]/10 flex items-center justify-center">
                        <TrendingUp className="h-5 w-5 text-[#008755]" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Average</p>
                        <p className="text-2xl font-['Dubai:Medium',_sans-serif]">84.2%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                        <ArrowUpRight className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Best Performance</p>
                        <p className="text-2xl font-['Dubai:Medium',_sans-serif] text-green-600">95%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
                        <ArrowDownRight className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Lowest Performance</p>
                        <p className="text-2xl font-['Dubai:Medium',_sans-serif] text-amber-600">65%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Activity className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Trend</p>
                        <p className="text-2xl font-['Dubai:Medium',_sans-serif] text-green-600">+2.3%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Chart */}
              <Card>
                <CardContent className="pt-6">
                  <div className="h-96">
                    {chartType === "line" && (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                          <XAxis dataKey="month" stroke="#6B7280" />
                          <YAxis stroke="#6B7280" domain={[60, 100]} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              border: '1px solid #E5E7EB', 
                              borderRadius: '8px',
                              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }}
                          />
                          <Legend />
                          <Line type="monotone" dataKey="cdd" stroke="#008755" strokeWidth={2.5} name="CDD" dot={{ r: 5 }} activeDot={{ r: 7 }} />
                          <Line type="monotone" dataKey="cid" stroke="#00B0AA" strokeWidth={2.5} name="CID" dot={{ r: 5 }} activeDot={{ r: 7 }} />
                          <Line type="monotone" dataKey="strategy" stroke="#115E67" strokeWidth={2.5} name="Strategy" dot={{ r: 5 }} activeDot={{ r: 7 }} />
                          <Line type="monotone" dataKey="legal" stroke="#FFBE9F" strokeWidth={2.5} name="Legal" dot={{ r: 5 }} activeDot={{ r: 7 }} />
                          <Line type="monotone" dataKey="hr" stroke="#77787B" strokeWidth={2.5} name="HR" dot={{ r: 5 }} activeDot={{ r: 7 }} />
                          <Line type="monotone" dataKey="finance" stroke="#B94700" strokeWidth={2.5} name="Finance" dot={{ r: 5 }} activeDot={{ r: 7 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    )}
                    {chartType === "bar" && (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={trendData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                          <XAxis dataKey="month" stroke="#6B7280" />
                          <YAxis stroke="#6B7280" domain={[60, 100]} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              border: '1px solid #E5E7EB', 
                              borderRadius: '8px',
                              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }}
                          />
                          <Legend />
                          <Bar dataKey="cdd" fill="#008755" name="CDD" />
                          <Bar dataKey="cid" fill="#00B0AA" name="CID" />
                          <Bar dataKey="strategy" fill="#115E67" name="Strategy" />
                          <Bar dataKey="legal" fill="#FFBE9F" name="Legal" />
                          <Bar dataKey="hr" fill="#77787B" name="HR" />
                          <Bar dataKey="finance" fill="#B94700" name="Finance" />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                    {chartType === "area" && (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={trendData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                          <XAxis dataKey="month" stroke="#6B7280" />
                          <YAxis stroke="#6B7280" domain={[60, 100]} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              border: '1px solid #E5E7EB', 
                              borderRadius: '8px',
                              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }}
                          />
                          <Legend />
                          <Area type="monotone" dataKey="cdd" stroke="#008755" fill="#008755" fillOpacity={0.6} strokeWidth={2.5} name="CDD" />
                          <Area type="monotone" dataKey="cid" stroke="#00B0AA" fill="#00B0AA" fillOpacity={0.6} strokeWidth={2.5} name="CID" />
                          <Area type="monotone" dataKey="strategy" stroke="#115E67" fill="#115E67" fillOpacity={0.6} strokeWidth={2.5} name="Strategy" />
                          <Area type="monotone" dataKey="legal" stroke="#FFBE9F" fill="#FFBE9F" fillOpacity={0.6} strokeWidth={2.5} name="Legal" />
                          <Area type="monotone" dataKey="hr" stroke="#77787B" fill="#77787B" fillOpacity={0.6} strokeWidth={2.5} name="HR" />
                          <Area type="monotone" dataKey="finance" stroke="#B94700" fill="#B94700" fillOpacity={0.6} strokeWidth={2.5} name="Finance" />
                        </AreaChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Data Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-['Dubai:Medium',_sans-serif]">Detailed Performance Data</CardTitle>
                  <CardDescription>Monthly achievement percentages by division</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Month</TableHead>
                        <TableHead className="text-right">CDD</TableHead>
                        <TableHead className="text-right">CID</TableHead>
                        <TableHead className="text-right">Strategy</TableHead>
                        <TableHead className="text-right">Legal</TableHead>
                        <TableHead className="text-right">HR</TableHead>
                        <TableHead className="text-right">Finance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {trendData.map((row, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="font-['Dubai:Medium',_sans-serif]">{row.month}</TableCell>
                          <TableCell className="text-right">
                            <Badge variant="outline" className="bg-[#008755]/10 text-[#008755] border-[#008755]/20">
                              {row.cdd}%
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge variant="outline" className="bg-[#00B0AA]/10 text-[#00B0AA] border-[#00B0AA]/20">
                              {row.cid}%
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge variant="outline" className="bg-[#115E67]/10 text-[#115E67] border-[#115E67]/20">
                              {row.strategy}%
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge variant="outline" className="bg-[#FFBE9F]/10 text-[#FFBE9F] border-[#FFBE9F]/20">
                              {row.legal}%
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge variant="outline" className="bg-[#77787B]/10 text-[#77787B] border-[#77787B]/20">
                              {row.hr}%
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge variant="outline" className="bg-[#B94700]/10 text-[#B94700] border-[#B94700]/20">
                              {row.finance}%
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Division Insights */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-['Dubai:Medium',_sans-serif]">Top Performers</CardTitle>
                    <CardDescription>Divisions exceeding targets</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-[#008755]/5">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-[#008755]" />
                        <div>
                          <p className="font-['Dubai:Medium',_sans-serif]">Customs Development</p>
                          <p className="text-xs text-muted-foreground">Consistent high performance</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-200">93%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-[#115E67]/5">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-[#115E67]" />
                        <div>
                          <p className="font-['Dubai:Medium',_sans-serif]">Strategy & Excellence</p>
                          <p className="text-xs text-muted-foreground">Upward trend</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-200">95%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-[#00B0AA]/5">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-[#00B0AA]" />
                        <div>
                          <p className="font-['Dubai:Medium',_sans-serif]">Customs Intelligence</p>
                          <p className="text-xs text-muted-foreground">Strong performance</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-200">92%</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-['Dubai:Medium',_sans-serif]">Needs Attention</CardTitle>
                    <CardDescription>Divisions requiring support</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-[#B94700]/5">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-[#B94700]" />
                        <div>
                          <p className="font-['Dubai:Medium',_sans-serif]">Finance & Admin</p>
                          <p className="text-xs text-muted-foreground">Below target threshold</p>
                        </div>
                      </div>
                      <Badge className="bg-red-100 text-red-700 hover:bg-red-200">67%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-[#77787B]/5">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-[#77787B]" />
                        <div>
                          <p className="font-['Dubai:Medium',_sans-serif]">Human Resources</p>
                          <p className="text-xs text-muted-foreground">Requires improvement</p>
                        </div>
                      </div>
                      <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200">77%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-[#FFBE9F]/5">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-[#FFBE9F]" />
                        <div>
                          <p className="font-['Dubai:Medium',_sans-serif]">Legal Affairs</p>
                          <p className="text-xs text-muted-foreground">Moderate performance</p>
                        </div>
                      </div>
                      <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200">85%</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
