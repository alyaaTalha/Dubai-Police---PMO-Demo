import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { 
  ArrowLeft,
  Building2,
  Target,
  TrendingUp,
  CheckCircle2,
  Users,
  BarChart3,
  Activity,
  Award,
  Globe,
  Shield,
  DollarSign,
  Package,
  Briefcase,
  GraduationCap,
  Server,
  Heart,
  Sparkles,
  TrendingDown,
  Clock,
  FileCheck,
  Scale,
  Search,
  AlertTriangle,
  Leaf,
  ShoppingCart,
  UserCheck,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  User,
  Calendar,
  FileText,
  Edit,
  Filter,
  Download
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  ResponsiveContainer,
  AreaChart,
  Area,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import heroDecoration from "../../../assets/sandbox-hero-decoration.png";
import dubaiLogo from "figma:asset/5fde750a0d4fbfd93bd0df25839acc9496a0a93d.png";
import uaeFlag from "figma:asset/79a1cd1f9ca219d00f7f754679801fa65f033839.png";
import { KPIGauge } from "./KPIGauge";
import PrimitiveDiv from "../../imports/PrimitiveDiv";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";

interface CorporateDashboardProps {
  onBack: () => void;
  onNavigateToDivision?: () => void;
}

// KPI Data Interface
interface KPIData {
  id: string;
  code: string;
  name: string;
  division: string;
  divisionColor: string;
  department: string;
  owner: string;
  target: number;
  actual: number;
  achievement: number;
  status: "green" | "orange" | "red";
  trend: "up" | "down" | "stable";
  unit: string;
  frequency: string;
  lastUpdated: string;
  perspective: string;
  weight: number;
}

// KPI Card Component with micro-visualization
interface KPICardProps {
  title: string;
  value: string;
  target?: string;
  status: "green" | "orange" | "red";
  trend?: "up" | "down" | "stable";
  trendValue?: string;
  icon?: React.ReactNode;
  chartData?: any[];
  chartType?: "line" | "radial" | "bar";
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
}

// Circular Gauge Component (matching KPI list style)
function CircularGauge({ 
  value, 
  max = 100, 
  color,
  size = 60
}: { 
  value: number; 
  max?: number; 
  color: string;
  size?: number;
}) {
  // Calculate percentage and angles for the multi-colored gauge
  const percentage = (value / max) * 100;
  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;
  
  // Define color zones (red 0-40%, orange 40-70%, green 70-100%, blue >100%)
  const getArcPath = (startAngle: number, endAngle: number) => {
    const start = (startAngle - 90) * (Math.PI / 180);
    const end = (endAngle - 90) * (Math.PI / 180);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    
    const startX = center + radius * Math.cos(start);
    const startY = center + radius * Math.sin(start);
    const endX = center + radius * Math.cos(end);
    const endY = center + radius * Math.sin(end);
    
    return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY}`;
  };

  // Calculate needle angle (0 = left, 180 = right in a semicircle, but we use 0-240 degrees arc)
  const needleAngle = (percentage / 120) * 240; // Map 0-120% to 0-240 degrees
  const needleLength = radius - 5;
  const needleRad = (needleAngle - 120) * (Math.PI / 180); // Offset to start from left
  const needleX = center + needleLength * Math.cos(needleRad);
  const needleY = center + needleLength * Math.sin(needleRad);

  return (
    <div className="flex items-center justify-center" style={{ height: size, width: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background segments with colors */}
        {/* Red zone: 0-40% (0-96 degrees) */}
        <path
          d={getArcPath(0, 96)}
          fill="none"
          stroke="#E3403E"
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* Orange zone: 40-70% (96-168 degrees) */}
        <path
          d={getArcPath(96, 168)}
          fill="none"
          stroke="#FFAB00"
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* Green zone: 70-100% (168-240 degrees) */}
        <path
          d={getArcPath(168, 240)}
          fill="none"
          stroke="#357743"
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* Blue zone: >100% would continue but we'll overlay if needed */}
        
        {/* Light gray background arcs for unused portions */}
        <path
          d={getArcPath(0, 240)}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="3"
          opacity="0.3"
        />
        
        {/* Needle/Pointer */}
        <line
          x1={center}
          y1={center}
          x2={needleX}
          y2={needleY}
          stroke="#1B1D21"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        
        {/* Center circle */}
        <circle
          cx={center}
          cy={center}
          r="3"
          fill="#1B1D21"
        />
        
        {/* Value text */}
        <text
          x={center}
          y={center + radius + 10}
          textAnchor="middle"
          className="font-['Dubai:Medium',_'Dubai']"
          fontSize="14"
          fill={color}
        >
          {value}%
        </text>
        
        {/* Range labels */}
        <text
          x="5"
          y={center + radius + 8}
          className="font-['Open_Sans',_sans-serif]"
          fontSize="8"
          fill="#6B7280"
        >
          0
        </text>
        <text
          x={center - 8}
          y={size - 18}
          className="font-['Open_Sans',_sans-serif]"
          fontSize="8"
          fill="#6B7280"
        >
          100%
        </text>
        <text
          x={size - 25}
          y={center + radius + 8}
          className="font-['Open_Sans',_sans-serif]"
          fontSize="8"
          fill="#6B7280"
        >
          120%
        </text>
      </svg>
    </div>
  );
}

function KPICard({ 
  title, 
  value, 
  target, 
  status, 
  trend, 
  trendValue, 
  icon, 
  chartData, 
  chartType = "line",
  subtitle,
  badge,
  badgeColor
}: KPICardProps) {
  const statusColors = {
    green: "#357743",
    orange: "#F2A200",
    red: "#D83731"
  };

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: statusColors[status] }} />
      <CardContent className="pt-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            {badge && (
              <Badge 
                className="mb-2 border-0 text-xs"
                style={{ 
                  backgroundColor: badgeColor ? `${badgeColor}15` : '#00875515',
                  color: badgeColor || '#008755'
                }}
              >
                {badge}
              </Badge>
            )}
            <h4 className="text-sm text-muted-foreground mb-1">{title}</h4>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{value}</p>
              {target && <span className="text-sm text-muted-foreground">/ {target}</span>}
            </div>
            {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
            {trendValue && (
              <div className="flex items-center gap-1 mt-2">
                {trend === "up" && <TrendingUp className="h-3 w-3 text-green-600" />}
                {trend === "down" && <TrendingDown className="h-3 w-3 text-red-600" />}
                <span className={`text-xs ${trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-600"}`}>
                  {trendValue}
                </span>
              </div>
            )}
          </div>
          {icon && (
            <div className="h-10 w-10 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: statusColors[status] }}>
              {icon}
            </div>
          )}
        </div>
        
        {chartData && chartType === "line" && (
          <ResponsiveContainer width="100%" height={60}>
            <LineChart data={chartData}>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={statusColors[status]} 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}

        {chartData && chartType === "bar" && (
          <ResponsiveContainer width="100%" height={60}>
            <BarChart data={chartData}>
              <Bar dataKey="value" fill={statusColors[status]} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}

        {chartData && chartType === "radial" && (
          <CircularGauge
            value={chartData[0].value}
            color={statusColors[status]}
            size={60}
          />
        )}
      </CardContent>
    </Card>
  );
}

// Static Section Header Component
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  badge?: string;
}

function SectionHeader({ title, subtitle, icon, badge }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3 bg-muted/30 rounded-lg p-3 mb-3">
      {icon && (
        <div className="h-10 w-10 rounded-lg bg-[#008755] flex items-center justify-center text-white">
          {icon}
        </div>
      )}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{title}</h2>
          {badge && (
            <Badge variant="secondary" className="text-xs">{badge}</Badge>
          )}
        </div>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
}

export function CorporateDashboard({ onBack, onNavigateToDivision }: CorporateDashboardProps) {
  const [drilldownOpen, setDrilldownOpen] = useState(false);
  const [selectedEnabler, setSelectedEnabler] = useState<string | null>(null);
  const [expandedEnabler, setExpandedEnabler] = useState<string | null>(null);
  const [tradeExpanded, setTradeExpanded] = useState(false);
  const [enforcementExpanded, setEnforcementExpanded] = useState(false);
  const [revenueExpanded, setRevenueExpanded] = useState(false);
  const [internationalOpen, setInternationalOpen] = useState(false);
  const [selectedKPI, setSelectedKPI] = useState<KPIData | null>(null);
  const [isKPIDetailsOpen, setIsKPIDetailsOpen] = useState(false);
  const [sheetView, setSheetView] = useState<"details" | "edit">("details");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPerspective, setSelectedPerspective] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const openDrilldown = (enabler: string) => {
    setSelectedEnabler(enabler);
    setDrilldownOpen(true);
  };
  
  const toggleEnablerExpansion = (enabler: string) => {
    setExpandedEnabler(expandedEnabler === enabler ? null : enabler);
  };

  const handleKPIClick = (kpi: KPIData) => {
    setSelectedKPI(kpi);
    setSheetView("details");
    setIsKPIDetailsOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "green": return "#357743";
      case "orange": return "#F2A200";
      case "red": return "#D83731";
      default: return "#6B7280";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "green": return "On Track";
      case "orange": return "At Risk";
      case "red": return "Critical";
      default: return "Unknown";
    }
  };

  // Sample trend data for charts
  const trendDataPositive = [
    { month: "Jan", value: 78 },
    { month: "Feb", value: 82 },
    { month: "Mar", value: 85 },
    { month: "Apr", value: 88 },
    { month: "May", value: 91 },
    { month: "Jun", value: 93 }
  ];

  const trendDataNegative = [
    { month: "Jan", value: 95 },
    { month: "Feb", value: 92 },
    { month: "Mar", value: 89 },
    { month: "Apr", value: 87 },
    { month: "May", value: 85 },
    { month: "Jun", value: 83 }
  ];

  const radialData = [{ value: 85 }];

  // Enabler drill-down data
  const enablerDetails: { [key: string]: any } = {
    "Human Capital": {
      icon: <GraduationCap className="h-6 w-6" />,
      color: "#008755",
      kpis: [
        { title: "Employee Happiness Index", value: "87%", target: "85%", status: "green", trend: "up", trendValue: "+2%" },
        { title: "Employee Turnover Rate", value: "5.2%", target: "< 8%", status: "green", trend: "down", trendValue: "-1.3%" },
        { title: "Emiratization Rate", value: "42%", target: "40%", status: "green", trend: "up", trendValue: "+3%" },
        { title: "Talent & Leadership Score", value: "89%", target: "85%", status: "green", trend: "up", trendValue: "+4%" },
        { title: "Training Hours per Employee", value: "45", target: "40", status: "green", trend: "stable", trendValue: "On target" },
        { title: "Performance Appraisal Completion", value: "98%", target: "95%", status: "green", trend: "up", trendValue: "+3%" }
      ]
    },
    "Technology & Digital": {
      icon: <Server className="h-6 w-6" />,
      color: "#00B0AA",
      kpis: [
        { title: "Digital Adoption Rate", value: "78%", target: "75%", status: "green", trend: "up", trendValue: "+5%" },
        { title: "Digital Maturity Index", value: "82%", target: "80%", status: "green", trend: "up", trendValue: "+3%" },
        { title: "System Availability", value: "99.7%", target: "99.5%", status: "green", trend: "stable", trendValue: "Stable" },
        { title: "Service Automation Rate", value: "65%", target: "60%", status: "green", trend: "up", trendValue: "+8%" },
        { title: "Cybersecurity Score", value: "94%", target: "90%", status: "green", trend: "up", trendValue: "+2%" },
        { title: "Digital Transformation Projects", value: "12/15", target: "15", status: "orange", trend: "stable", trendValue: "In progress" }
      ]
    },
    "Organizational Excellence": {
      icon: <Award className="h-6 w-6" />,
      color: "#BB9956",
      kpis: [
        { title: "DESC Excellence Score", value: "92%", target: "90%", status: "green", trend: "up", trendValue: "+3%" },
        { title: "External Audit Score", value: "88%", target: "85%", status: "green", trend: "up", trendValue: "+2%" },
        { title: "Government Excellence Results", value: "91%", target: "88%", status: "green", trend: "up", trendValue: "+4%" },
        { title: "Process Compliance Rate", value: "95%", target: "92%", status: "green", trend: "up", trendValue: "+1%" },
        { title: "Quality Management Score", value: "89%", target: "85%", status: "green", trend: "stable", trendValue: "Stable" },
        { title: "Risk Management Maturity", value: "86%", target: "80%", status: "green", trend: "up", trendValue: "+5%" }
      ]
    },
    "Financial Resources": {
      icon: <DollarSign className="h-6 w-6" />,
      color: "#115E67",
      kpis: [
        { title: "Budget Execution Rate", value: "94%", target: "90%", status: "green", trend: "up", trendValue: "+3%" },
        { title: "Cost Efficiency Index", value: "88%", target: "85%", status: "green", trend: "up", trendValue: "+2%" },
        { title: "ROI on Projects", value: "156%", target: "120%", status: "green", trend: "up", trendValue: "+15%" },
        { title: "Financial Sustainability Score", value: "91%", target: "88%", status: "green", trend: "stable", trendValue: "Stable" },
        { title: "Revenue Growth", value: "12.5%", target: "10%", status: "green", trend: "up", trendValue: "+2.5%" }
      ]
    },
    "Partners": {
      icon: <Users className="h-6 w-6" />,
      color: "#005844",
      kpis: [
        { title: "Partner Satisfaction Score", value: "86%", target: "82%", status: "green", trend: "up", trendValue: "+4%" },
        { title: "Private Sector Engagement", value: "142", target: "120", status: "green", trend: "up", trendValue: "+18%" },
        { title: "OGA Engagement Index", value: "89%", target: "85%", status: "green", trend: "up", trendValue: "+3%" },
        { title: "Partnership Projects Delivered", value: "23/25", target: "25", status: "orange", trend: "stable", trendValue: "92%" },
        { title: "Stakeholder Communication Score", value: "91%", target: "88%", status: "green", trend: "up", trendValue: "+2%" }
      ]
    }
  };

  return (
    <div className="h-full overflow-auto bg-background">
      <div className="space-y-2 p-2">
        {/* Hero Banner */}
        <Card className="relative text-white border-none shadow-lg overflow-hidden bg-gradient-to-br from-[#005844] via-[#008755] to-[#00a869]">
          <img
            src={heroDecoration}
            alt=""
            className="absolute -top-16 -right-16 h-160 w-160 rounded-full object-cover opacity-50 pointer-events-none select-none"
          />
          <CardContent className="pt-3 pb-3 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-xl font-['Dubai:Medium',_'Dubai'] mb-0.5">
                    Corporate Balanced Scorecard Dashboard
                  </h1>
                  <p className="text-white/90 text-sm">
                    Dubai Customs - Strategic Performance Management System
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white bg-transparent text-white hover:bg-white/10 hover:text-white"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-white bg-transparent text-white hover:bg-white/10 hover:text-white"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export Dashboard
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[var(--radix-dropdown-menu-trigger-width)]">
                    <DropdownMenuItem onClick={() => console.log('Export as PDF')}>
                      <FileText className="h-4 w-4 mr-2" />
                      PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log('Export as PPT')}>
                      <FileText className="h-4 w-4 mr-2" />
                      PPT
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log('Export as JPEG')}>
                      <FileText className="h-4 w-4 mr-2" />
                      JPEG
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter Controls */}
        {showFilters && (
          <Card>
            <CardContent className="py-2">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search KPIs, departments, or perspectives..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-8"
                  />
                </div>
                
                <Select 
                  value={selectedPerspective} 
                  onValueChange={setSelectedPerspective}
                >
                  <SelectTrigger className="w-full md:w-[200px] h-8">
                    <SelectValue placeholder="Filter by Perspective" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Perspectives</SelectItem>
                    <SelectItem value="outcomes">Outcomes</SelectItem>
                    <SelectItem value="stakeholders">Stakeholders</SelectItem>
                    <SelectItem value="internal">Internal Processes</SelectItem>
                    <SelectItem value="enablers">Enablers</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select 
                  value={selectedStatus} 
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="w-full md:w-[200px] h-8">
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="green">On Track (Green)</SelectItem>
                    <SelectItem value="amber">At Risk (Amber)</SelectItem>
                    <SelectItem value="red">Behind (Red)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}

        {/* A. OUTCOMES & B. STAKEHOLDERS IN ONE ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          {/* A. OUTCOMES SECTION */}
          <div className="space-y-2">
            <SectionHeader
              title="Outcomes"
              subtitle="Strategic impact on sustainable development and society"
              icon={<Target className="h-5 w-5" />}
              badge="2 KPIs"
            />
            <div className="grid grid-cols-2 gap-2">
              <Card className="min-h-[180px] cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleKPIClick({
                id: "kpi-outcomes-001",
                code: "OUT-001",
                name: "% of Global Rankings in Top 5",
                division: "Outcomes",
                divisionColor: "#008755",
                department: "Strategic Planning",
                owner: "Mohammed Al Khaja",
                target: 65,
                actual: 68,
                achievement: 104,
                status: "green",
                trend: "up",
                unit: "%",
                frequency: "Annual",
                lastUpdated: "2025-01-15",
                perspective: "Outcomes",
                weight: 15
              })}>
                <CardContent className="pt-2 pb-2 h-full flex flex-col">
                  <h4 className="text-sm text-foreground mb-1 text-center">% of Global Rankings in Top 5</h4>
                  <p className="text-xs text-muted-foreground mb-1.5 text-center">Sustaining Economic Development</p>
                  <div className="flex items-center justify-center mb-1 flex-1">
                    <KPIGauge
                      achievement={68}
                      status="green"
                      size="sm"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Target: 65%</p>
                    <div className="flex items-center justify-center gap-1 mt-0">
                      <TrendingUp className="h-3 w-3 text-[#357743]" />
                      <span className="text-xs text-[#357743]">+5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="min-h-[180px] cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleKPIClick({
                id: "kpi-outcomes-002",
                code: "OUT-002",
                name: "Global Livability & Safe City Ranking",
                division: "Outcomes",
                divisionColor: "#008755",
                department: "Strategic Planning",
                owner: "Fatima Al Mansouri",
                target: 80,
                actual: 85,
                achievement: 106,
                status: "green",
                trend: "up",
                unit: "Score",
                frequency: "Annual",
                lastUpdated: "2025-01-15",
                perspective: "Outcomes",
                weight: 15
              })}>
                <CardContent className="pt-2 pb-2 h-full flex flex-col">
                  <h4 className="text-sm text-foreground mb-1 text-center">Global Livability & Safe City Ranking</h4>
                  <p className="text-xs text-muted-foreground mb-1.5 text-center">Protecting the Society</p>
                  <div className="flex items-center justify-center mb-1 flex-1">
                    <KPIGauge
                      achievement={85}
                      status="green"
                      size="sm"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Top 10 Globally</p>
                    <div className="flex items-center justify-center gap-1 mt-0">
                      <TrendingUp className="h-3 w-3 text-[#357743]" />
                      <span className="text-xs text-[#357743]">Improved 3 positions</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* B. STAKEHOLDERS SECTION */}
          <div className="space-y-2">
            <SectionHeader
              title="Stakeholders"
              subtitle="Performance across government, customer, and international stakeholder groups"
              icon={<Users className="h-5 w-5" />}
              badge="3 Groups"
            />
            <div className="grid grid-cols-3 gap-2">
              {/* Government Card */}
              <Card className="min-h-[180px] cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleKPIClick({
                id: "kpi-stakeholder-001",
                code: "STK-GOV-001",
                name: "UAE Trade Market Share",
                division: "Stakeholders - Government",
                divisionColor: "#00B0AA",
                department: "Trade Development",
                owner: "Ahmed Al Zaabi",
                target: 70,
                actual: 72,
                achievement: 103,
                status: "green",
                trend: "up",
                unit: "%",
                frequency: "Quarterly",
                lastUpdated: "2025-01-15",
                perspective: "Stakeholders",
                weight: 12
              })}>
                <CardContent className="pt-2 pb-2 h-full flex flex-col relative">
                  <h4 className="text-sm text-foreground mb-1 text-center mt-1">UAE Trade Market Share</h4>
                  <p className="text-xs text-muted-foreground mb-1.5 text-center">Trade Volume Growth</p>
                  <div className="flex items-center justify-center mb-1 flex-1">
                    <KPIGauge
                      achievement={72}
                      status="green"
                      size="sm"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Target: 70%</p>
                    <div className="flex items-center justify-center gap-1 mt-0">
                      <TrendingUp className="h-3 w-3 text-[#357743]" />
                      <span className="text-xs text-[#357743]">+8.5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Customers Card */}
              <Card className="min-h-[180px] cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleKPIClick({
                id: "kpi-stakeholder-002",
                code: "STK-CUS-001",
                name: "Customer Happiness Index",
                division: "Stakeholders - Customers",
                divisionColor: "#BB9956",
                department: "Customer Experience",
                owner: "Maryam Al Shamsi",
                target: 85,
                actual: 89,
                achievement: 105,
                status: "green",
                trend: "up",
                unit: "%",
                frequency: "Monthly",
                lastUpdated: "2025-01-15",
                perspective: "Stakeholders",
                weight: 14
              })}>
                <CardContent className="pt-2 pb-2 h-full flex flex-col">
                  <h4 className="text-sm text-foreground mb-1 text-center">Customer Happiness Index</h4>
                  <p className="text-xs text-muted-foreground mb-1.5 text-center">Satisfaction Trend</p>
                  <div className="flex items-center justify-center mb-1 flex-1">
                    <KPIGauge
                      achievement={89}
                      status="green"
                      size="sm"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Target: 85%</p>
                    <div className="flex items-center justify-center gap-1 mt-0">
                      <TrendingUp className="h-3 w-3 text-[#357743]" />
                      <span className="text-xs text-[#357743]">+6% YoY</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* International Card */}
              <Card 
                className="min-h-[180px] cursor-pointer hover:shadow-lg transition-all hover:border-gray-300" 
                onClick={() => setInternationalOpen(true)}
              >
                <CardContent className="pt-2 pb-2 h-full flex flex-col">
                  <h4 className="text-sm text-foreground mb-1 text-center">International Engagement</h4>
                  <p className="text-xs text-muted-foreground mb-1.5 text-center">Compliance & Profile</p>
                  <div className="flex items-center justify-center mb-1 flex-1">
                    <KPIGauge
                      achievement={87}
                      status="green"
                      size="sm"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Target: 80%</p>
                    <div className="flex items-center justify-center gap-1 mt-0">
                      <TrendingUp className="h-3 w-3 text-[#357743]" />
                      <span className="text-xs text-[#357743]">+12%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* C. INTERNAL PROCESSES SECTION */}
        <div className="space-y-2">
          <SectionHeader
            title="Internal Processes"
            subtitle="Core operational excellence across trade, enforcement, and revenue"
            icon={<Activity className="h-5 w-5" />}
            badge="3 Categories"
          />
          <div className="space-y-1.5">
            {/* Trade Facilitation & Revenue Collection - Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5 items-start">
              {/* 1. Trade Facilitation & Economic Competitiveness */}
              <Card className="border-l-4 border-l-[#00B0AA] self-start overflow-hidden">
              <CardHeader className="pb-0 pt-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-[#00B0AA] flex items-center justify-center text-white">
                    <Package className="h-5 w-5" />
                  </div>
                  <div className="flex-1 cursor-pointer" onClick={onNavigateToDivision}>
                    <CardTitle className="font-['Dubai:Medium',_'Dubai'] hover:text-[#008755] transition-colors">
                      Trade Facilitation & Economic Competitiveness
                    </CardTitle>
                    <CardDescription>
                      Efficiency and ease of trade operations
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">5 KPIs</Badge>
                  <div className="cursor-pointer p-1" onClick={() => setTradeExpanded(!tradeExpanded)}>
                    {tradeExpanded ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </CardHeader>
              {tradeExpanded && (
                <CardContent className="pt-0 -mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-1.5">
                  {/* Cargo Release Time */}
                  <Card className="min-h-[180px]">
                    <CardContent className="pt-2 pb-2 h-full flex flex-col">
                      <h4 className="text-sm text-foreground mb-1 text-center">Cargo Release Time</h4>
                      <p className="text-xs text-muted-foreground mb-1.5 text-center">Trade Efficiency</p>
                      <div className="flex items-center justify-center mb-1 flex-1">
                        <div className="text-center">
                          <p className="text-3xl font-['Dubai:Medium',_'Dubai'] text-[#357743]">2.3</p>
                          <p className="text-sm text-muted-foreground mt-0">hours</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Target: &lt; 3 hrs</p>
                        <div className="flex items-center justify-center gap-1 mt-0">
                          <TrendingDown className="h-3 w-3 text-[#357743]" />
                          <span className="text-xs text-[#357743]">-15%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Customs Procedure Cost */}
                  <Card className="min-h-[180px]">
                    <CardContent className="pt-2 pb-2 h-full flex flex-col">
                      <h4 className="text-sm text-foreground mb-1 text-center">Customs Procedure Cost</h4>
                      <p className="text-xs text-muted-foreground mb-1.5 text-center">Burden reduction</p>
                      <div className="flex items-center justify-center mb-1 flex-1">
                        <div className="text-center">
                          <p className="text-3xl font-['Dubai:Medium',_'Dubai'] text-[#357743]">$142</p>
                          <p className="text-sm text-muted-foreground mt-0">per declaration</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Target: &lt; $200</p>
                        <div className="flex items-center justify-center gap-1 mt-0">
                          <TrendingDown className="h-3 w-3 text-[#357743]" />
                          <span className="text-xs text-[#357743]">-8%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* AEO Participation */}
                  <Card className="min-h-[180px]">
                    <CardContent className="pt-2 pb-2 h-full flex flex-col">
                      <h4 className="text-sm text-foreground mb-1 text-center">AEO Participation</h4>
                      <p className="text-xs text-muted-foreground mb-1.5 text-center">Authorized Operators</p>
                      <div className="flex items-center justify-center mb-1 flex-1">
                        <div className="text-center">
                          <p className="text-3xl font-['Dubai:Medium',_'Dubai'] text-[#357743]">245</p>
                          <p className="text-sm text-muted-foreground mt-0">companies</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Target: 220</p>
                        <div className="flex items-center justify-center gap-1 mt-0">
                          <TrendingUp className="h-3 w-3 text-[#357743]" />
                          <span className="text-xs text-[#357743]">+11%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* SLA Adherence */}
                  <Card className="min-h-[180px]">
                    <CardContent className="pt-2 pb-2 h-full flex flex-col">
                      <h4 className="text-sm text-foreground mb-1 text-center">SLA Adherence</h4>
                      <p className="text-xs text-muted-foreground mb-1.5 text-center">Service Quality</p>
                      <div className="flex items-center justify-center mb-1 flex-1">
                        <KPIGauge
                          achievement={96}
                          status="green"
                          size="sm"
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Target: 95%</p>
                        <div className="flex items-center justify-center gap-1 mt-0">
                          <TrendingUp className="h-3 w-3 text-[#357743]" />
                          <span className="text-xs text-[#357743]">+3%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Single Window Implementation */}
                  <Card className="min-h-[180px]">
                    <CardContent className="pt-2 pb-2 h-full flex flex-col">
                      <h4 className="text-sm text-foreground mb-1 text-center">Single Window Implementation</h4>
                      <p className="text-xs text-muted-foreground mb-1.5 text-center">Integration Progress</p>
                      <div className="flex items-center justify-center mb-1 flex-1">
                        <KPIGauge
                          achievement={88}
                          status="green"
                          size="sm"
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Target: 85%</p>
                        <div className="flex items-center justify-center gap-1 mt-0">
                          <TrendingUp className="h-3 w-3 text-[#357743]" />
                          <span className="text-xs text-[#357743]">+5%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
              )}
            </Card>

              {/* 2. Revenue Collection & Financial Performance */}
            <Card className="border-l-4 border-l-[#008755] self-start overflow-hidden">
              <CardHeader className="pb-0 pt-3 cursor-pointer" onClick={() => setRevenueExpanded(!revenueExpanded)}>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-[#008755] flex items-center justify-center text-white">
                    <DollarSign className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="font-['Dubai:Medium',_'Dubai']">
                      Revenue Collection & Financial Performance
                    </CardTitle>
                    <CardDescription>
                      Financial targets and compliance management
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">3 KPIs</Badge>
                  {revenueExpanded ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </CardHeader>
              {revenueExpanded && (
                <CardContent className="pt-0 -mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-1.5">
                  {/* Revenue Achievement Rate */}
                  <Card className="min-h-[180px]">
                    <CardContent className="pt-2 pb-2 h-full flex flex-col">
                      <h4 className="text-sm text-foreground mb-1 text-center">Revenue Achievement Rate</h4>
                      <p className="text-xs text-muted-foreground mb-1.5 text-center">Performance vs Target</p>
                      <div className="flex items-center justify-center mb-1 flex-1">
                        <KPIGauge
                          achievement={103}
                          status="green"
                          size="sm"
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Target: 100%</p>
                        <div className="flex items-center justify-center gap-1 mt-0">
                          <TrendingUp className="h-3 w-3 text-[#357743]" />
                          <span className="text-xs text-[#357743]">+3%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Valuation & Origin Compliance */}
                  <Card className="min-h-[180px]">
                    <CardContent className="pt-2 pb-2 h-full flex flex-col">
                      <h4 className="text-sm text-foreground mb-1 text-center">Valuation & Origin Compliance</h4>
                      <p className="text-xs text-muted-foreground mb-1.5 text-center">Compliance Rate</p>
                      <div className="flex items-center justify-center mb-1 flex-1">
                        <KPIGauge
                          achievement={94}
                          status="green"
                          size="sm"
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Target: 92%</p>
                        <div className="flex items-center justify-center gap-1 mt-0">
                          <TrendingUp className="h-3 w-3 text-[#357743]" />
                          <span className="text-xs text-[#357743]">+2%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Post-Clearance Audit Effectiveness */}
                  <Card className="min-h-[180px]">
                    <CardContent className="pt-2 pb-2 h-full flex flex-col">
                      <h4 className="text-sm text-foreground mb-1 text-center">Post-Clearance Audit Effectiveness</h4>
                      <p className="text-xs text-muted-foreground mb-1.5 text-center">Audit Quality</p>
                      <div className="flex items-center justify-center mb-1 flex-1">
                        <KPIGauge
                          achievement={87}
                          status="green"
                          size="sm"
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Target: 85%</p>
                        <div className="flex items-center justify-center gap-1 mt-0">
                          <TrendingUp className="h-3 w-3 text-[#357743]" />
                          <span className="text-xs text-[#357743]">+4%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
              )}
            </Card>
            </div>

            {/* 3. Enforcement, Security & Protection */}
            <Card className="border-l-4 border-l-[#115E67]">
              <CardHeader className="pb-0 pt-3 cursor-pointer" onClick={() => setEnforcementExpanded(!enforcementExpanded)}>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-[#115E67] flex items-center justify-center text-white">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="font-['Dubai:Medium',_'Dubai']">
                      Enforcement, Security & Protection of Society
                    </CardTitle>
                    <CardDescription>
                      Border security and compliance enforcement
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">7 KPIs</Badge>
                  {enforcementExpanded ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </CardHeader>
              {enforcementExpanded && (
                <CardContent className="pt-0 -mt-4">
                <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-1.5">
                  {/* Inspection Effectiveness */}
                  <Card className="min-h-[180px]">
                    <CardContent className="pt-2 pb-2 h-full flex flex-col">
                      <h4 className="text-sm text-foreground mb-1 text-center">Inspection Effectiveness</h4>
                      <p className="text-xs text-muted-foreground mb-1.5 text-center">Detection Quality</p>
                      <div className="flex items-center justify-center mb-1 flex-1">
                        <KPIGauge
                          achievement={92}
                          status="green"
                          size="sm"
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Target: 90%</p>
                        <div className="flex items-center justify-center gap-1 mt-0">
                          <TrendingUp className="h-3 w-3 text-[#357743]" />
                          <span className="text-xs text-[#357743]">+3%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Risk Engine Effectiveness */}
                  <Card className="min-h-[180px]">
                    <CardContent className="pt-2 pb-2 h-full flex flex-col">
                      <h4 className="text-sm text-foreground mb-1 text-center">Risk Engine Effectiveness</h4>
                      <p className="text-xs text-muted-foreground mb-1.5 text-center">Targeting Accuracy</p>
                      <div className="flex items-center justify-center mb-1 flex-1">
                        <KPIGauge
                          achievement={89}
                          status="green"
                          size="sm"
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Target: 85%</p>
                        <div className="flex items-center justify-center gap-1 mt-0">
                          <TrendingUp className="h-3 w-3 text-[#357743]" />
                          <span className="text-xs text-[#357743]">+4%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Drug Seizures */}
                  <Card className="min-h-[180px]">
                    <CardContent className="pt-2 pb-2 h-full flex flex-col">
                      <h4 className="text-sm text-foreground mb-1 text-center">Drug Seizures (UAE %)</h4>
                      <p className="text-xs text-muted-foreground mb-1.5 text-center">Dubai Customs share</p>
                      <div className="flex items-center justify-center mb-1 flex-1">
                        <KPIGauge
                          achievement={68}
                          status="green"
                          size="sm"
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Target: 65%</p>
                        <div className="flex items-center justify-center gap-1 mt-0">
                          <TrendingUp className="h-3 w-3 text-[#357743]" />
                          <span className="text-xs text-[#357743]">+3%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Passenger Seizure Rate */}
                  <Card className="min-h-[180px]">
                    <CardContent className="pt-2 pb-2 h-full flex flex-col">
                      <h4 className="text-sm text-foreground mb-1 text-center">Passenger Seizure Rate</h4>
                      <p className="text-xs text-muted-foreground mb-1.5 text-center">Compliance Rate</p>
                      <div className="flex items-center justify-center mb-1 flex-1">
                        <KPIGauge
                          achievement={80}
                          status="green"
                          size="sm"
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Target: &lt; 1%</p>
                        <div className="flex items-center justify-center gap-1 mt-0">
                          <TrendingDown className="h-3 w-3 text-[#357743]" />
                          <span className="text-xs text-[#357743]">0.8%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Cargo Seizure Rate */}
                  <Card className="min-h-[180px]">
                    <CardContent className="pt-2 pb-2 h-full flex flex-col">
                      <h4 className="text-sm text-foreground mb-1 text-center">Cargo Seizure Rate</h4>
                      <p className="text-xs text-muted-foreground mb-1.5 text-center">Risk Management</p>
                      <div className="flex items-center justify-center mb-1 flex-1">
                        <KPIGauge
                          achievement={42}
                          status="red"
                          size="sm"
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Target: &lt; 2%</p>
                        <div className="flex items-center justify-center gap-1 mt-0">
                          <TrendingDown className="h-3 w-3 text-[#D83731]" />
                          <span className="text-xs text-[#D83731]">-8% decline</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Carbon Footprint */}
                  <Card className="min-h-[180px]">
                    <CardContent className="pt-2 pb-2 h-full flex flex-col">
                      <h4 className="text-sm text-foreground mb-1 text-center">Carbon Footprint</h4>
                      <p className="text-xs text-muted-foreground mb-1.5 text-center">Sustainability</p>
                      <div className="flex items-center justify-center mb-1 flex-1">
                        <KPIGauge
                          achievement={92}
                          status="green"
                          size="sm"
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Target: -5%</p>
                        <div className="flex items-center justify-center gap-1 mt-0">
                          <TrendingDown className="h-3 w-3 text-[#357743]" />
                          <span className="text-xs text-[#357743]">-8% reduction</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Financial Crime Seizures */}
                  <Card className="min-h-[180px]">
                    <CardContent className="pt-2 pb-2 h-full flex flex-col">
                      <h4 className="text-sm text-foreground mb-1 text-center">Financial Crime Seizures</h4>
                      <p className="text-xs text-muted-foreground mb-1.5 text-center">Value Recovered</p>
                      <div className="flex items-center justify-center mb-1 flex-1">
                        <div className="text-center">
                          <p className="text-3xl font-['Dubai:Medium',_'Dubai'] text-[#357743]">45M</p>
                          <p className="text-sm text-muted-foreground mt-0">AED</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Annual Value</p>
                        <div className="flex items-center justify-center gap-1 mt-0">
                          <TrendingUp className="h-3 w-3 text-[#357743]" />
                          <span className="text-xs text-[#357743]">+12%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* IPR Seizure Rate */}
                  <Card className="min-h-[180px]">
                    <CardContent className="pt-2 pb-2 h-full flex flex-col">
                      <h4 className="text-sm text-foreground mb-1 text-center">IPR Seizure Rate</h4>
                      <p className="text-xs text-muted-foreground mb-1.5 text-center">Cases handled</p>
                      <div className="flex items-center justify-center mb-1 flex-1">
                        <div className="text-center">
                          <p className="text-3xl font-['Dubai:Medium',_'Dubai'] text-[#357743]">2,340</p>
                          <p className="text-sm text-muted-foreground mt-0">cases</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Target: 2,000</p>
                        <div className="flex items-center justify-center gap-1 mt-0">
                          <TrendingUp className="h-3 w-3 text-[#357743]" />
                          <span className="text-xs text-[#357743]">+17%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
              )}
            </Card>
            </div>
        </div>

        {/* D. ENABLERS SECTION */}
        <div className="space-y-2">
          <SectionHeader
            title="Enablers"
            subtitle="Foundational capabilities supporting organizational performance"
            icon={<Sparkles className="h-5 w-5" />}
            badge="5 Categories"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {/* Human Capital */}
            <Card 
              className={`cursor-pointer hover:shadow-lg transition-all min-h-[180px] ${
                expandedEnabler === "Human Capital" 
                  ? "border-gray-300 shadow-lg" 
                  : "hover:border-gray-300"
              }`}
              onClick={() => toggleEnablerExpansion("Human Capital")}
            >
              <CardContent className="pt-2 pb-2 h-full flex flex-col">
                <h4 className="text-sm text-foreground mb-1 text-center">Human Capital</h4>
                <p className="text-xs text-muted-foreground mb-1.5 text-center">Overall Score</p>
                <div className="flex items-center justify-center mb-1 flex-1">
                  <KPIGauge
                    achievement={82}
                    status="green"
                    size="sm"
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Employee Performance</p>
                  <div className="flex items-center justify-center gap-1 mt-0">
                    {expandedEnabler === "Human Capital" ? (
                      <>
                        <ChevronUp className="h-3 w-3 text-[#008755]" />
                        <span className="text-xs text-[#008755]">Hide Details</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-3 w-3 text-[#008755]" />
                        <span className="text-xs text-[#008755]">View Details</span>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technology & Digital */}
            <Card 
              className={`cursor-pointer hover:shadow-lg transition-all min-h-[180px] ${
                expandedEnabler === "Technology & Digital" 
                  ? "border-gray-300 shadow-lg" 
                  : "hover:border-gray-300"
              }`}
              onClick={() => toggleEnablerExpansion("Technology & Digital")}
            >
              <CardContent className="pt-2 pb-2 h-full flex flex-col">
                <h4 className="text-sm text-foreground mb-1 text-center">Technology & Digital</h4>
                <p className="text-xs text-muted-foreground mb-1.5 text-center">Digital Maturity</p>
                <div className="flex items-center justify-center mb-1 flex-1">
                  <KPIGauge
                    achievement={82}
                    status="green"
                    size="sm"
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Innovation Index</p>
                  <div className="flex items-center justify-center gap-1 mt-0">
                    {expandedEnabler === "Technology & Digital" ? (
                      <>
                        <ChevronUp className="h-3 w-3 text-[#008755]" />
                        <span className="text-xs text-[#008755]">Hide Details</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-3 w-3 text-[#008755]" />
                        <span className="text-xs text-[#008755]">View Details</span>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Organizational Excellence */}
            <Card 
              className={`cursor-pointer hover:shadow-lg transition-all min-h-[180px] ${
                expandedEnabler === "Organizational Excellence" 
                  ? "border-gray-300 shadow-lg" 
                  : "hover:border-gray-300"
              }`}
              onClick={() => toggleEnablerExpansion("Organizational Excellence")}
            >
              <CardContent className="pt-2 pb-2 h-full flex flex-col">
                <h4 className="text-sm text-foreground mb-1 text-center">Organizational Excellence</h4>
                <p className="text-xs text-muted-foreground mb-1.5 text-center">Excellence Score</p>
                <div className="flex items-center justify-center mb-1 flex-1">
                  <KPIGauge
                    achievement={82}
                    status="green"
                    size="sm"
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Quality Management</p>
                  <div className="flex items-center justify-center gap-1 mt-0">
                    {expandedEnabler === "Organizational Excellence" ? (
                      <>
                        <ChevronUp className="h-3 w-3 text-[#008755]" />
                        <span className="text-xs text-[#008755]">Hide Details</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-3 w-3 text-[#008755]" />
                        <span className="text-xs text-[#008755]">View Details</span>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Financial Resources */}
            <Card 
              className={`cursor-pointer hover:shadow-lg transition-all min-h-[180px] ${
                expandedEnabler === "Financial Resources" 
                  ? "border-gray-300 shadow-lg" 
                  : "hover:border-gray-300"
              }`}
              onClick={() => toggleEnablerExpansion("Financial Resources")}
            >
              <CardContent className="pt-2 pb-2 h-full flex flex-col">
                <h4 className="text-sm text-foreground mb-1 text-center">Financial Resources</h4>
                <p className="text-xs text-muted-foreground mb-1.5 text-center">Budget Performance</p>
                <div className="flex items-center justify-center mb-1 flex-1">
                  <KPIGauge
                    achievement={82}
                    status="green"
                    size="sm"
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Financial Health</p>
                  <div className="flex items-center justify-center gap-1 mt-0">
                    {expandedEnabler === "Financial Resources" ? (
                      <>
                        <ChevronUp className="h-3 w-3 text-[#008755]" />
                        <span className="text-xs text-[#008755]">Hide Details</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-3 w-3 text-[#008755]" />
                        <span className="text-xs text-[#008755]">View Details</span>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Partners */}
            <Card 
              className={`cursor-pointer hover:shadow-lg transition-all min-h-[180px] ${
                expandedEnabler === "Partners" 
                  ? "border-gray-300 shadow-lg" 
                  : "hover:border-gray-300"
              }`}
              onClick={() => toggleEnablerExpansion("Partners")}
            >
              <CardContent className="pt-2 pb-2 h-full flex flex-col">
                <h4 className="text-sm text-foreground mb-1 text-center">Partners</h4>
                <p className="text-xs text-muted-foreground mb-1.5 text-center">Satisfaction Score</p>
                <div className="flex items-center justify-center mb-1 flex-1">
                  <KPIGauge
                    achievement={82}
                    status="green"
                    size="sm"
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Engagement Level</p>
                  <div className="flex items-center justify-center gap-1 mt-0">
                    {expandedEnabler === "Partners" ? (
                      <>
                        <ChevronUp className="h-3 w-3 text-[#008755]" />
                        <span className="text-xs text-[#008755]">Hide Details</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-3 w-3 text-[#008755]" />
                        <span className="text-xs text-[#008755]">View Details</span>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Expanded Enabler Details */}
          {expandedEnabler && enablerDetails[expandedEnabler] && (
            <Card className="mt-2 border border-gray-300 shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div 
                    className="h-10 w-10 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: enablerDetails[expandedEnabler].color }}
                  >
                    {enablerDetails[expandedEnabler].icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{expandedEnabler} - Detailed KPIs</CardTitle>
                    <CardDescription>Performance metrics and indicators</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {enablerDetails[expandedEnabler].kpis.map((kpi: any, index: number) => {
                    // Extract numeric achievement value from various formats
                    const getAchievementValue = (value: string, target: string) => {
                      // Handle percentage values (e.g., "87%", "5.2%", "99.7%")
                      if (value.includes('%')) {
                        return parseFloat(value.replace('%', ''));
                      }
                      // Handle fraction values (e.g., "12/15", "23/25")
                      if (value.includes('/')) {
                        const [actual, total] = value.split('/').map(v => parseFloat(v.trim()));
                        return (actual / total) * 100;
                      }
                      // Handle numeric values with targets (e.g., "45" with target "40")
                      const numValue = parseFloat(value);
                      const numTarget = parseFloat(target.replace(/[<>]/g, '').trim());
                      if (!isNaN(numValue) && !isNaN(numTarget)) {
                        return (numValue / numTarget) * 100;
                      }
                      // Default to parsing as percentage
                      return parseFloat(value) || 0;
                    };
                    
                    const achievement = getAchievementValue(kpi.value, kpi.target);
                    
                    return (
                      <Card key={index} className="border min-h-[220px] min-w-[220px] flex-shrink-0">
                        <CardContent className="pt-4 h-full flex flex-col">
                          <div className="mb-2">
                            <h4 className="text-sm font-medium text-center">{kpi.title}</h4>
                          </div>
                          <div className="flex items-center justify-center mb-2 flex-1">
                            <KPIGauge
                              achievement={achievement}
                              status={kpi.status}
                              size="sm"
                            />
                          </div>
                          <div className="text-center space-y-1">
                            <div className="flex items-center justify-center gap-2">
                              <span className="text-sm text-muted-foreground">Target: {kpi.target}</span>
                            </div>
                            <div className="flex items-center justify-center gap-1">
                              {kpi.trend === 'up' && <TrendingUp className="h-3 w-3 text-[#357743]" />}
                              {kpi.trend === 'down' && <TrendingDown className="h-3 w-3 text-[#D83731]" />}
                              {kpi.trend === 'stable' && <Activity className="h-3 w-3 text-gray-600" />}
                              <span className="text-xs" style={{
                                color: kpi.trend === 'up' ? '#357743' : kpi.trend === 'down' ? '#D83731' : '#6B7280'
                              }}>
                                {kpi.trendValue}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Drill-down Sheet for Enablers */}
      <Sheet open={drilldownOpen} onOpenChange={setDrilldownOpen}>
        <SheetContent className="sm:max-w-2xl overflow-y-auto">
          {selectedEnabler && enablerDetails[selectedEnabler] && (
            <>
              <SheetHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div 
                    className="h-12 w-12 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: enablerDetails[selectedEnabler].color }}
                  >
                    {enablerDetails[selectedEnabler].icon}
                  </div>
                  <div>
                    <SheetTitle className="font-['Dubai:Medium',_'Dubai']">
                      {selectedEnabler}
                    </SheetTitle>
                    <SheetDescription>
                      Detailed performance metrics and trends
                    </SheetDescription>
                  </div>
                </div>
              </SheetHeader>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                {enablerDetails[selectedEnabler].kpis.map((kpi: any, index: number) => (
                  <Card key={index}>
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-1">
                              {kpi.title}
                            </h4>
                            <Badge 
                              className="border-0"
                              style={{ 
                                backgroundColor: kpi.status === "green" ? '#35774315' : '#F2A20015',
                                color: kpi.status === "green" ? '#357743' : '#F2A200'
                              }}
                            >
                              {kpi.status === "green" ? "On Track" : "In Progress"}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4">
                            <KPIGauge
                              achievement={parseInt(kpi.value)}
                              status={kpi.status}
                              size="md"
                            />
                            <div className="flex-1">
                              <div className="flex items-baseline gap-2 mb-2">
                                <p className="text-2xl font-['Dubai:Medium',_'Dubai']">{kpi.value}</p>
                                {kpi.target && (
                                  <span className="text-sm text-muted-foreground">Target: {kpi.target}</span>
                                )}
                              </div>
                              {kpi.trend && (
                                <div className="flex items-center gap-2">
                                  {kpi.trend === "up" && <TrendingUp className="h-4 w-4 text-[#357743]" />}
                                  {kpi.trend === "down" && <TrendingDown className="h-4 w-4 text-red-600" />}
                                  {kpi.trend === "stable" && <Activity className="h-4 w-4 text-gray-600" />}
                                  <span className={`text-sm ${
                                    kpi.trend === "up" ? "text-[#357743]" : 
                                    kpi.trend === "down" ? "text-red-600" : 
                                    "text-gray-600"
                                  }`}>
                                    {kpi.trendValue}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* International Engagement Sheet */}
      <Sheet open={internationalOpen} onOpenChange={setInternationalOpen}>
        <SheetContent className="sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <div className="flex items-center gap-3 mb-2">
              <div 
                className="h-12 w-12 rounded-lg flex items-center justify-center text-white"
                style={{ backgroundColor: '#115E67' }}
              >
                <Globe className="h-6 w-6" />
              </div>
              <div>
                <SheetTitle className="font-['Dubai:Medium',_'Dubai']">
                  International Engagement
                </SheetTitle>
                <SheetDescription>
                  Detailed performance metrics and trends
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>
          
          <div className="mt-6 space-y-3">
            {/* KPI 1: Growth rate in International Engagement */}
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-1">
                        Growth rate in International Engagement
                      </h4>
                      <Badge 
                        className="border-0"
                        style={{ 
                          backgroundColor: '#35774315',
                          color: '#357743'
                        }}
                      >
                        On Track
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <KPIGauge
                        achievement={92}
                        status="green"
                        size="md"
                      />
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-2">
                          <p className="text-2xl font-['Dubai:Medium',_'Dubai']">92%</p>
                          <span className="text-sm text-muted-foreground">Target: 85%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-[#357743]" />
                          <span className="text-sm text-[#357743]">+8% from last quarter</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* KPI 2: Growth rate in compliance with International Rules and Standards */}
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-1">
                        Growth rate in compliance with International Rules and Standards
                      </h4>
                      <Badge 
                        className="border-0"
                        style={{ 
                          backgroundColor: '#35774315',
                          color: '#357743'
                        }}
                      >
                        On Track
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <KPIGauge
                        achievement={88}
                        status="green"
                        size="md"
                      />
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-2">
                          <p className="text-2xl font-['Dubai:Medium',_'Dubai']">88%</p>
                          <span className="text-sm text-muted-foreground">Target: 80%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-[#357743]" />
                          <span className="text-sm text-[#357743]">+10% from last quarter</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* KPI 3: Global Profile (Media Coverage, Awards, Mentions) */}
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-1">
                        Global Profile (Media Coverage, Awards, Mentions)
                      </h4>
                      <Badge 
                        className="border-0"
                        style={{ 
                          backgroundColor: '#35774315',
                          color: '#357743'
                        }}
                      >
                        On Track
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <KPIGauge
                        achievement={85}
                        status="green"
                        size="md"
                      />
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-2">
                          <p className="text-2xl font-['Dubai:Medium',_'Dubai']">85%</p>
                          <span className="text-sm text-muted-foreground">Target: 75%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-[#357743]" />
                          <span className="text-sm text-[#357743]">+13% from last quarter</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed KPI Information */}
            <div className="mt-6 space-y-6">
              {/* KPI Ownership & Classification */}
              <div className="space-y-4">
                <h3 className="text-sm   text-gray-700">KPI Ownership & Classification</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">KPI Owner (Division)</p>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-gray-400" />
                      <p className="text-sm  ">Finance Affairs & Admin</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">KPI Owner (Department)</p>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-gray-400" />
                      <p className="text-sm  ">Corporate Communication</p>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500 mb-1">Division Level KPI</p>
                    <p className="text-sm  ">International or regional awards received and positive media mentions</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500 mb-1">Department Level KPI</p>
                    <p className="text-sm  ">International or regional awards received and positive media mentions</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">KPI Code</p>
                    <p className="text-sm   text-gray-400">— (Not provided)</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">KPI Sources</p>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-gray-400" />
                      <p className="text-sm  ">International</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Cascading Type</p>
                    <p className="text-sm  ">As-Is</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Aggregation Method</p>
                    <p className="text-sm   text-gray-400">— (Not provided)</p>
                  </div>
                </div>
              </div>

              {/* KPI Description */}
              <div className="space-y-2">
                <h3 className="text-sm   text-gray-700">KPI Description</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  This KPI measures the visibility and reputation of Dubai Customs on the global stage by tracking the number of international or regional awards received and positive media mentions in reputable outlets. It reflects the organization's external recognition, credibility, and impact across global trade and customs communities. A strong global profile enhances institutional trust, positions Dubai Customs as a thought leader, and contributes to national brand equity.
                </p>
              </div>

              {/* Calculation & Parameters */}
              <div className="space-y-4">
                <h3 className="text-sm   text-gray-700">Calculation & Parameters</h3>
                
                <div>
                  <p className="text-xs text-gray-500 mb-2">Formula</p>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <p className="text-sm   text-gray-700">
                      ((actual awards / targeted or applied for awards) × 50%)
                    </p>
                    <p className="text-sm   text-gray-700 mt-1">
                      + ((number of positive mentions / total number of mentions) × 50%)
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Polarity</p>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-[#357743]" />
                      <p className="text-sm  ">Increasing</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Frequency</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <p className="text-sm  ">Quarterly</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Unit</p>
                    <p className="text-sm  ">%</p>
                  </div>
                </div>
              </div>

              {/* Data Sources */}
              <div className="space-y-4">
                <h3 className="text-sm   text-gray-700">Data Sources</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Data Required</p>
                    <p className="text-sm   text-gray-400">— (Blank)</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Data Provider</p>
                    <p className="text-sm   text-gray-400">— (Blank)</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500 mb-1">Data Sources / Systems</p>
                    <p className="text-sm   text-gray-400">— (Blank)</p>
                  </div>
                </div>
              </div>

              {/* Baseline */}
              <div className="space-y-2">
                <h3 className="text-sm   text-gray-700">Baseline</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className=" ">Year</TableHead>
                        <TableHead className=" ">2022</TableHead>
                        <TableHead className=" ">2023</TableHead>
                        <TableHead className=" ">2024</TableHead>
                        <TableHead className=" ">2025 H1</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className=" ">Value</TableCell>
                        <TableCell className="text-gray-400">—</TableCell>
                        <TableCell className="text-gray-400">—</TableCell>
                        <TableCell className="text-gray-400">—</TableCell>
                        <TableCell className="text-gray-400">—</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Targets */}
              <div className="space-y-2">
                <h3 className="text-sm   text-gray-700">Targets</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className=" ">Year</TableHead>
                        <TableHead className=" ">2025 (Priority)</TableHead>
                        <TableHead className=" ">2026 (Priority)</TableHead>
                        <TableHead className=" ">2027</TableHead>
                        <TableHead className=" ">2028</TableHead>
                        <TableHead className=" ">2029</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className=" ">Value</TableCell>
                        <TableCell className="text-gray-400">—</TableCell>
                        <TableCell className="text-gray-400">—</TableCell>
                        <TableCell className="text-gray-400">—</TableCell>
                        <TableCell className="text-gray-400">—</TableCell>
                        <TableCell className="text-gray-400">—</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* KPI Details Sheet */}
      <Sheet open={isKPIDetailsOpen} onOpenChange={setIsKPIDetailsOpen}>
        <SheetContent 
          side="right" 
          className={`${sheetView === "edit" ? "w-[650px] sm:max-w-[650px]" : "w-[600px] sm:max-w-[600px]"} overflow-y-auto p-0`}
        >
          {selectedKPI && sheetView === "details" && (
            <div className="p-6">
              <SheetHeader className="space-y-3">
                <div>
                  <SheetTitle className="text-xl  ">
                    {selectedKPI.name}
                  </SheetTitle>
                  <SheetDescription className="mt-2">
                    {[selectedKPI.department, selectedKPI.division]
                      .filter(text => text !== "Strategic Planning")
                      .join(" • ")}
                  </SheetDescription>
                </div>
              </SheetHeader>

              {/* Color Code Legend */}
              <div className="mt-4 mb-2 px-6">
                <div className="flex items-center gap-4 justify-end">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#335CFF' }}></div>
                    <span className="text-xs text-gray-600">Result &gt; -40%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#357743' }}></div>
                    <span className="text-xs text-gray-600">-40% &lt; Result &lt; +5%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#F2E600' }}></div>
                    <span className="text-xs text-gray-600">+5% &lt; Result &lt; +20%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#D83731' }}></div>
                    <span className="text-xs text-gray-600">Result &gt; +20%</span>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 space-y-6">
                {/* Performance Overview */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm   text-gray-700 mb-4">Performance Overview</h3>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-3xl  " style={{ color: getStatusColor(selectedKPI.status) }}>
                          {selectedKPI.actual}
                        </span>
                        <span className="text-lg text-gray-500">/ {selectedKPI.target} {selectedKPI.unit}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Achievement:</span>
                        <span 
                          className="text-lg  " 
                          style={{ color: getStatusColor(selectedKPI.status) }}
                        >
                          {selectedKPI.achievement}%
                        </span>
                      </div>
                    </div>
                    <KPIGauge achievement={selectedKPI.achievement} status={selectedKPI.status} size="lg" />
                  </div>
                  <Progress 
                    value={selectedKPI.achievement} 
                    className="h-2"
                    style={{
                      backgroundColor: '#E5E7EB'
                    }}
                  />
                </div>

                {/* KPI Details */}
                <div className="space-y-4">
                  <h3 className="text-sm   text-gray-700">KPI Information</h3>
                  
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {/* Primary Information Grid */}
                    <div className="grid grid-cols-2 gap-4 pb-4 border-b">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">KPI Owner (Division)</p>
                        <p className="text-sm   font-[Dubai]">Policy & Legislation</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">KPI Owner (Department)</p>
                        <p className="text-sm   font-[Dubai]">Corporate Communication</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Division Level KPI</p>
                        <p className="text-sm   font-[Dubai]">% of 4 indicators in the top 5</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Department Level KPI</p>
                        <p className="text-sm   font-[Dubai]">% of 4 indicators ranked in the top 5</p>
                      </div>
                    </div>

                    {/* Secondary Information Grid */}
                    <div className="grid grid-cols-2 gap-4 pb-4 border-b">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">KPI Code</p>
                        <p className="text-sm  ">1</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">KPI Sources</p>
                        <p className="text-sm  ">International</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Cascading Type</p>
                        <p className="text-sm  ">As-Is</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Aggregation Method</p>
                        <p className="text-sm   text-gray-400">— (Not provided)</p>
                      </div>
                    </div>

                    {/* KPI Description */}
                    <div className="pb-4 border-b">
                      <p className="text-xs text-gray-500 mb-2">KPI Description</p>
                      <p className="text-sm font-['Dubai',_sans-serif] text-gray-700 leading-relaxed">
                        This KPI reflects Dubai Customs' contribution to the UAE's performance in international indices related to customs efficiency, trade facilitation, and logistics competitiveness. It measures the proportion of applicable global rankings where Dubai Customs, or the UAE as a representative, is placed among the top three performers. This KPI supports Dubai's ambition to be a global trade leader, enhances the organization's international reputation, and promotes continuous improvement by aligning internal efforts with international best practices.
                      </p>
                    </div>

                    {/* Formula */}
                    <div className="pb-4 border-b">
                      <p className="text-xs text-gray-500 mb-2">Formula</p>
                      <div className="bg-gray-50 rounded-lg p-3 text-xs">
                        <p className="text-sm font-['Dubai',_sans-serif] text-gray-700 leading-relaxed">
                          % of the following 4 indicators where customs related dimensions are ranked in the top 5:
                        </p>
                        <ul className="mt-2 ml-4 space-y-1 text-sm font-['Dubai',_sans-serif] text-gray-700 list-disc">
                          <li>World Bank – B-Ready</li>
                          <li>World Bank Logistics Performance Index</li>
                          <li>OECD Trade Facilitation Index</li>
                          <li>WEF Global Competitiveness Report</li>
                        </ul>
                      </div>
                    </div>

                    {/* Measurement Details */}
                    <div className="grid grid-cols-2 gap-4 pb-4 border-b">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Polarity</p>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <p className="text-sm  ">Increasing</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Frequency</p>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <p className="text-sm  ">Annual</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Unit</p>
                        <p className="text-sm  ">%</p>
                      </div>
                    </div>

                    {/* Data Information */}
                    <div className="grid grid-cols-2 gap-4 pb-4 border-b">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Data Required</p>
                        <p className="text-sm   text-gray-400">— (Blank)</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Data Provider</p>
                        <p className="text-sm   text-gray-400">— (Blank)</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs text-gray-500 mb-1">Data Sources / Systems</p>
                        <p className="text-sm   text-gray-400">— (Blank)</p>
                      </div>
                    </div>

                    {/* Baseline Table */}
                    <div className="pb-4 border-b">
                      <p className="text-xs text-gray-500 mb-2">Baseline</p>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="text-xs">Year</TableHead>
                              <TableHead className="text-xs text-center">2022</TableHead>
                              <TableHead className="text-xs text-center">2023</TableHead>
                              <TableHead className="text-xs text-center">2024</TableHead>
                              <TableHead className="text-xs text-center">2025 H1</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="text-xs  ">Value</TableCell>
                              <TableCell className="text-xs text-center text-gray-400">—</TableCell>
                              <TableCell className="text-xs text-center text-gray-400">—</TableCell>
                              <TableCell className="text-xs text-center text-gray-400">—</TableCell>
                              <TableCell className="text-xs text-center text-gray-400">—</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>

                    {/* Targets Table */}
                    <div className="pb-4 border-b">
                      <p className="text-xs text-gray-500 mb-2">Targets</p>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="text-xs">Year</TableHead>
                              <TableHead className="text-xs text-center">2025 (Priority)</TableHead>
                              <TableHead className="text-xs text-center">2026 (Priority)</TableHead>
                              <TableHead className="text-xs text-center">2027</TableHead>
                              <TableHead className="text-xs text-center">2028</TableHead>
                              <TableHead className="text-xs text-center">2029</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="text-xs  ">Value</TableCell>
                              <TableCell className="text-xs text-center text-gray-400">—</TableCell>
                              <TableCell className="text-xs text-center text-gray-400">—</TableCell>
                              <TableCell className="text-xs text-center text-gray-400">—</TableCell>
                              <TableCell className="text-xs text-center text-gray-400">—</TableCell>
                              <TableCell className="text-xs text-center text-gray-400">—</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Tabs Section */}
                <Tabs defaultValue="trend" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="trend">Trend</TabsTrigger>
                    <TabsTrigger value="evidence">Reading and Evidence</TabsTrigger>
                    <TabsTrigger value="cascading">Cascading</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="trend" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm  ">Performance Trend Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <ComposedChart
                            data={[
                              { quarter: 'Q1', value: 50, target: selectedKPI.target, benchmark: 65, globalIndex: 55 },
                              { quarter: 'Q2', value: 30, target: selectedKPI.target, benchmark: 70, globalIndex: 60 },
                              { quarter: 'Q3', value: 60, target: selectedKPI.target, benchmark: 75, globalIndex: 65 },
                              { quarter: 'Q4', value: selectedKPI.actual, target: selectedKPI.target, benchmark: 78, globalIndex: 70 }
                            ]}
                            barSize={50}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis 
                              dataKey="quarter" 
                              stroke="#6b7280"
                              style={{ fontSize: '12px', fontFamily: 'Dubai, sans-serif' }}
                            />
                            <YAxis 
                              stroke="#6b7280"
                              style={{ fontSize: '12px', fontFamily: 'Dubai, sans-serif' }}
                            />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'white', 
                                border: '1px solid #e5e7eb',
                                borderRadius: '6px',
                                fontFamily: 'Dubai, sans-serif'
                              }}
                            />
                            <Legend 
                              wrapperStyle={{ 
                                fontSize: '12px',
                                fontFamily: 'Dubai, sans-serif'
                              }}
                            />
                            <Bar dataKey="value" fill={selectedKPI.divisionColor} name="Actual Value" />
                            <Line 
                              type="monotone" 
                              dataKey="target" 
                              stroke="#357743" 
                              strokeWidth={2} 
                              dot={{ r: 3 }}
                              name="Target"
                            />
                            <Line 
                              type="monotone" 
                              dataKey="benchmark" 
                              stroke="#F2A200" 
                              strokeWidth={2} 
                              dot={{ r: 3 }}
                              strokeDasharray="5 5"
                              name="Benchmarking"
                            />
                            <Line 
                              type="monotone" 
                              dataKey="globalIndex" 
                              stroke="#008755" 
                              strokeWidth={2} 
                              dot={{ r: 3 }}
                              strokeDasharray="3 3"
                              name="Global Index"
                            />
                          </ComposedChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="evidence" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm  ">Reading and Evidence</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Label</TableHead>
                              <TableHead className="text-center">Target Value</TableHead>
                              <TableHead className="text-center">Reading Value</TableHead>
                              <TableHead>Evidence</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className=" ">Q1 2025</TableCell>
                              <TableCell className="text-center">
                                <span className="text-sm  ">{selectedKPI.target} {selectedKPI.unit}</span>
                              </TableCell>
                              <TableCell className="text-center">
                                <span className="text-sm  " style={{ color: selectedKPI.divisionColor }}>
                                  50 {selectedKPI.unit}
                                </span>
                              </TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm" className="h-7">
                                  <FileText className="h-3 w-3 mr-1" />
                                  View Document
                                </Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className=" ">Q2 2025</TableCell>
                              <TableCell className="text-center">
                                <span className="text-sm  ">{selectedKPI.target} {selectedKPI.unit}</span>
                              </TableCell>
                              <TableCell className="text-center">
                                <span className="text-sm  " style={{ color: selectedKPI.divisionColor }}>
                                  30 {selectedKPI.unit}
                                </span>
                              </TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm" className="h-7">
                                  <FileText className="h-3 w-3 mr-1" />
                                  View Document
                                </Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className=" ">Q3 2025</TableCell>
                              <TableCell className="text-center">
                                <span className="text-sm  ">{selectedKPI.target} {selectedKPI.unit}</span>
                              </TableCell>
                              <TableCell className="text-center">
                                <span className="text-sm  " style={{ color: selectedKPI.divisionColor }}>
                                  60 {selectedKPI.unit}
                                </span>
                              </TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm" className="h-7">
                                  <FileText className="h-3 w-3 mr-1" />
                                  View Document
                                </Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className=" ">Q4 2025</TableCell>
                              <TableCell className="text-center">
                                <span className="text-sm  ">{selectedKPI.target} {selectedKPI.unit}</span>
                              </TableCell>
                              <TableCell className="text-center">
                                <span className="text-sm  " style={{ color: selectedKPI.divisionColor }}>
                                  {selectedKPI.actual} {selectedKPI.unit}
                                </span>
                              </TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm" className="h-7">
                                  <FileText className="h-3 w-3 mr-1" />
                                  View Document
                                </Button>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="cascading" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm  ">KPI Cascading Hierarchy</CardTitle>
                        <CardDescription>View how this KPI cascades from corporate level to divisions and departments</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {/* Corporate Level KPI */}
                          <div className="space-y-0">
                            {/* Corporate Level */}
                            <div className="flex gap-3">
                              {/* Connection Line */}
                              <div className="flex flex-col items-center w-8 pt-6 pb-3">
                                <div className="w-3 h-3 rounded-full border-2 border-[#008755] bg-white"></div>
                                <div className="w-0.5 flex-1 bg-[#008755]"></div>
                              </div>
                              
                              <div className="flex-1 py-3">
                                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="outline" className="bg-[#008755] text-white border-[#008755] text-xs">
                                    Corporate Level
                                  </Badge>
                                </div>
                                <p className="  text-sm mb-2">{selectedKPI.name}</p>
                                <div className="flex items-center gap-4">
                                  <div className="text-xs text-gray-600">
                                    Target: <span className=" ">{selectedKPI.target}{selectedKPI.unit}</span>
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    Actual: <span className=" " style={{ color: getStatusColor(selectedKPI.status) }}>{selectedKPI.actual}{selectedKPI.unit}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex-shrink-0">
                                <KPIGauge achievement={selectedKPI.achievement} status={selectedKPI.status} size="md" />
                              </div>
                                </div>
                              </div>
                            </div>

                            {/* Division Level */}
                            <div className="flex gap-3">
                              {/* Connection Line */}
                              <div className="flex flex-col items-center w-8 pb-3">
                                <div className="w-0.5 h-3 bg-[#008755]"></div>
                                <div className="w-3 h-3 rounded-full border-2 bg-white" style={{ borderColor: selectedKPI.divisionColor }}></div>
                                <div className="w-0.5 flex-1 bg-gray-300"></div>
                              </div>
                              
                              <div className="flex-1 py-3">
                                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Badge variant="outline" className="text-xs font-['Dubai',_sans-serif]" style={{ backgroundColor: '#FFBE9F', color: 'white', borderColor: '#FFBE9F' }}>
                                      Policy and Legislation
                                    </Badge>
                                  </div>
                                  <p className="  text-sm mb-2">% of 4 indicators in the top 5</p>
                                  <div className="flex items-center gap-4">
                                    <div className="text-xs font-['Dubai',_sans-serif] text-gray-600">
                                      Target: <span className=" ">75%</span>
                                    </div>
                                    <div className="text-xs font-['Dubai',_sans-serif] text-gray-600">
                                      Actual: <span className="  text-green-600">82%</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex-shrink-0">
                                  <KPIGauge achievement={82} status="green" size="md" />
                                </div>
                                </div>
                              </div>
                            </div>

                            {/* Department Level KPI 1 */}
                            <div className="flex gap-3">
                              <div className="flex flex-col items-center w-8 pb-3">
                                <div className="w-0.5 h-3 bg-gray-300"></div>
                                <div className="w-3 h-3 rounded-full border-2 border-gray-400 bg-white"></div>
                              </div>
                              
                              <div className="flex-1 py-3">
                                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <Badge variant="outline" className="bg-gray-600 text-white border-gray-600 text-xs">
                                        Department Level
                                      </Badge>
                                    </div>
                                    <p className="  text-sm mb-2">% of 4 indicators ranked in the top 5</p>
                                    <div className="flex items-center gap-4">
                                      <div className="text-xs text-gray-600">
                                        Target: <span className=" ">75%</span>
                                      </div>
                                      <div className="text-xs text-gray-600">
                                        Actual: <span className="  text-green-600">78%</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex-shrink-0">
                                    <KPIGauge achievement={78} status="green" size="md" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Legend */}
                          <div className="pt-4 border-t">
                            <p className="text-xs text-gray-500 mb-3">Cascading Structure Legend</p>
                            <div className="flex flex-wrap gap-4">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded bg-[#008755]"></div>
                                <span className="text-xs text-gray-600">Corporate Level KPI</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded" style={{ backgroundColor: '#FFBE9F' }}></div>
                                <span className="text-xs text-gray-600">Division Level KPI</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded bg-gray-600"></div>
                                <span className="text-xs text-gray-600">Department Level KPI</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setIsKPIDetailsOpen(false)}
                  >
                    Manage Readings
                  </Button>
                  <Button 
                    className="flex-1 bg-[#008755] hover:bg-[#008755]/90"
                    onClick={() => setSheetView("edit")}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    KPI Settings
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Edit KPI Form View */}
          {sheetView === "edit" && (
            <div className="relative h-full" onClick={(e) => {
              // Check if clicked element is a close button or cancel button
              const target = e.target as HTMLElement;
              const isCloseButton = target.closest('[data-name="Primitive.button"]');
              const isCancelButton = target.textContent?.includes('Cancel');
              
              if (isCloseButton || isCancelButton) {
                setSheetView("details");
              }
            }}>
              <PrimitiveDiv />
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}