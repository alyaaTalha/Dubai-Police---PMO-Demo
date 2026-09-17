import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { 
  ArrowLeft, 
  Download, 
  Target, 
  Search,
  Filter,
  Grid3x3,
  List,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  Calendar,
  User,
  Building2,
  ChevronRight,
  Eye,
  Edit,
  MoreVertical,
  AlertCircle,
  CheckCircle2,
  Clock,
  X,
  ChevronLeft
} from "lucide-react";
import bannerImage from "figma:asset/2ceb5f3890ecf49940adbd1e2cca8cf7647ce99f.png";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";

import { ResponsiveContainer, ComposedChart, Bar, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { FileText } from "lucide-react";

interface KPIsPageProps {
  onBack: () => void;
}

interface KPI {
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
  status: "green" | "amber" | "red" | "blue" | "yellow";
  trend: "up" | "down" | "stable";
  unit: string;
  frequency: string;
  lastUpdated: string;
  perspective: string;
  weight: number;
}

const mockKPIs: KPI[] = [
  {
    id: "kpi-001",
    code: "CDD-IT-001",
    name: "System Uptime",
    division: "Customs Development Division",
    divisionColor: "#00B0AA",
    department: "Information Technology",
    owner: "Ahmed Al Mansoori",
    target: 99.9,
    actual: 99.95,
    achievement: 100,
    status: "green",
    trend: "up",
    unit: "%",
    frequency: "Monthly",
    lastUpdated: "2025-01-20",
    perspective: "Internal Process",
    weight: 15
  },
  {
    id: "kpi-002",
    code: "CDD-IT-002",
    name: "Cyber Security Incidents Response Time",
    division: "Customs Development Division",
    divisionColor: "#00B0AA",
    department: "Information Technology",
    owner: "Mohammed Ali",
    target: 24,
    actual: 18,
    achievement: 133,
    status: "blue",
    trend: "up",
    unit: "hours",
    frequency: "Monthly",
    lastUpdated: "2025-01-19",
    perspective: "Internal Process",
    weight: 12
  },
  {
    id: "kpi-003",
    code: "CDD-PD-001",
    name: "Project Delivery On-Time Rate",
    division: "Customs Development Division",
    divisionColor: "#00B0AA",
    department: "Projects Delivery",
    owner: "Mariam Al Hashimi",
    target: 90,
    actual: 85,
    achievement: 94,
    status: "yellow",
    trend: "down",
    unit: "%",
    frequency: "Quarterly",
    lastUpdated: "2025-01-18",
    perspective: "Internal Process",
    weight: 10
  },
  {
    id: "kpi-004",
    code: "CID-ACC-001",
    name: "Cargo Clearance Time",
    division: "Customs Inspection Division",
    divisionColor: "#BB9956",
    department: "Air Cargo Centers Management",
    owner: "Salem Al Ketbi",
    target: 2,
    actual: 1.5,
    achievement: 133,
    status: "blue",
    trend: "up",
    unit: "hours",
    frequency: "Monthly",
    lastUpdated: "2025-01-20",
    perspective: "Customer",
    weight: 20
  },
  {
    id: "kpi-005",
    code: "CID-POD-001",
    name: "Passenger Satisfaction Score",
    division: "Customs Inspection Division",
    divisionColor: "#BB9956",
    department: "Passenger Operations",
    owner: "Majid Al Suwaidi",
    target: 90,
    actual: 94,
    achievement: 104,
    status: "blue",
    trend: "up",
    unit: "%",
    frequency: "Quarterly",
    lastUpdated: "2025-01-17",
    perspective: "Customer",
    weight: 18
  },
  {
    id: "kpi-006",
    code: "CID-SCC-001",
    name: "Container Inspection Efficiency",
    division: "Customs Inspection Division",
    divisionColor: "#BB9956",
    department: "Sea Customs Centers Management",
    owner: "Khalifa Al Nuaimi",
    target: 85,
    actual: 90,
    achievement: 106,
    status: "blue",
    trend: "up",
    unit: "%",
    frequency: "Monthly",
    lastUpdated: "2025-01-19",
    perspective: "Internal Process",
    weight: 14
  },
  {
    id: "kpi-007",
    code: "HRD-HRD-001",
    name: "Employee Engagement Index",
    division: "Human Resources Division",
    divisionColor: "#005844",
    department: "Human Resources",
    owner: "Shamma Al Mazrouei",
    target: 80,
    actual: 82,
    achievement: 103,
    status: "blue",
    trend: "up",
    unit: "%",
    frequency: "Annual",
    lastUpdated: "2025-01-15",
    perspective: "Learning & Growth",
    weight: 8
  },
  {
    id: "kpi-008",
    code: "HRD-DLA-001",
    name: "Training Hours Per Employee",
    division: "Human Resources Division",
    divisionColor: "#005844",
    department: "Dubai Logistics Academy",
    owner: "Juma Al Falasi",
    target: 40,
    actual: 38,
    achievement: 95,
    status: "yellow",
    trend: "stable",
    unit: "hours",
    frequency: "Quarterly",
    lastUpdated: "2025-01-16",
    perspective: "Learning & Growth",
    weight: 6
  },
  {
    id: "kpi-009",
    code: "FAA-FND-001",
    name: "Budget Utilization Rate",
    division: "Finance & Administration Affairs",
    divisionColor: "#008755",
    department: "Finance",
    owner: "Moza Al Marri",
    target: 95,
    actual: 92,
    achievement: 97,
    status: "yellow",
    trend: "down",
    unit: "%",
    frequency: "Quarterly",
    lastUpdated: "2025-01-18",
    perspective: "Financial",
    weight: 16
  },
  {
    id: "kpi-010",
    code: "FAA-CCD-001",
    name: "Media Coverage Sentiment",
    division: "Finance & Administration Affairs",
    divisionColor: "#008755",
    department: "Corporate Communication",
    owner: "Khaled Al Ahbabi",
    target: 85,
    actual: 88,
    achievement: 104,
    status: "blue",
    trend: "up",
    unit: "%",
    frequency: "Monthly",
    lastUpdated: "2025-01-20",
    perspective: "Customer",
    weight: 7
  },
  {
    id: "kpi-011",
    code: "DGD-SED-001",
    name: "Strategic Initiative Completion Rate",
    division: "Director General Division",
    divisionColor: "#115E67",
    department: "Strategy & Excellence",
    owner: "Essa Al Marzouqi",
    target: 90,
    actual: 87,
    achievement: 97,
    status: "yellow",
    trend: "stable",
    unit: "%",
    frequency: "Quarterly",
    lastUpdated: "2025-01-17",
    perspective: "Internal Process",
    weight: 13
  },
  {
    id: "kpi-012",
    code: "DGD-ICD-001",
    name: "Internal Audit Compliance Rate",
    division: "Director General Division",
    divisionColor: "#115E67",
    department: "Internal Control",
    owner: "Ibrahim Al Shamsi",
    target: 95,
    actual: 98,
    achievement: 103,
    status: "blue",
    trend: "up",
    unit: "%",
    frequency: "Quarterly",
    lastUpdated: "2025-01-16",
    perspective: "Internal Process",
    weight: 11
  },
  {
    id: "kpi-013",
    code: "PLD-CAD-001",
    name: "Customs Revenue Collection",
    division: "Policy & Legislation",
    divisionColor: "#FFBE9F",
    department: "Customs Audit",
    owner: "Sultan Al Mansoori",
    target: 5000,
    actual: 5200,
    achievement: 104,
    status: "blue",
    trend: "up",
    unit: "M AED",
    frequency: "Monthly",
    lastUpdated: "2025-01-20",
    perspective: "Financial",
    weight: 25
  },
  {
    id: "kpi-014",
    code: "PLD-IPR-001",
    name: "Intellectual Property Cases Resolved",
    division: "Policy & Legislation",
    divisionColor: "#FFBE9F",
    department: "Intellectual Property Rights",
    owner: "Layla Al Marri",
    target: 50,
    actual: 42,
    achievement: 84,
    status: "red",
    trend: "down",
    unit: "cases",
    frequency: "Quarterly",
    lastUpdated: "2025-01-15",
    perspective: "Internal Process",
    weight: 9
  },
  {
    id: "kpi-015",
    code: "HRD-CHM-001",
    name: "Customer Complaint Resolution Time",
    division: "Human Resources Division",
    divisionColor: "#005844",
    department: "Client Happiness Management",
    owner: "Hessa Al Suwaidi",
    target: 48,
    actual: 36,
    achievement: 133,
    status: "green",
    trend: "up",
    unit: "hours",
    frequency: "Monthly",
    lastUpdated: "2025-01-19",
    perspective: "Customer",
    weight: 17
  },
  {
    id: "kpi-016",
    code: "CDD-SID-001",
    name: "Process Improvement Initiatives",
    division: "Customs Development Division",
    divisionColor: "#00B0AA",
    department: "Services Innovation",
    owner: "Noura Al Zaabi",
    target: 12,
    actual: 10,
    achievement: 83,
    status: "red",
    trend: "down",
    unit: "initiatives",
    frequency: "Quarterly",
    lastUpdated: "2025-01-14",
    perspective: "Learning & Growth",
    weight: 5
  },
  {
    id: "kpi-017",
    code: "HRD-IND-001",
    name: "Intelligence Report Accuracy",
    division: "Human Resources Division",
    divisionColor: "#005844",
    department: "Intelligence",
    owner: "Rashid Al Muhairi",
    target: 95,
    actual: 97,
    achievement: 102,
    status: "green",
    trend: "up",
    unit: "%",
    frequency: "Monthly",
    lastUpdated: "2025-01-20",
    perspective: "Internal Process",
    weight: 12
  },
  {
    id: "kpi-018",
    code: "FAA-AAD-001",
    name: "Facility Maintenance Response Time",
    division: "Finance & Administration Affairs",
    divisionColor: "#008755",
    department: "Administration Affairs",
    owner: "Hamad Al Mazrouei",
    target: 24,
    actual: 28,
    achievement: 86,
    status: "red",
    trend: "down",
    unit: "hours",
    frequency: "Monthly",
    lastUpdated: "2025-01-18",
    perspective: "Internal Process",
    weight: 8
  }
];

export function KPIsPage({ onBack }: KPIsPageProps) {
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPerspective, setSelectedPerspective] = useState("all");
  const [selectedKPI, setSelectedKPI] = useState<KPI | null>(null);
  const [isKPIDetailsOpen, setIsKPIDetailsOpen] = useState(false);
  const [sheetView, setSheetView] = useState<"details" | "edit">("details");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const handleKPIClick = (kpi: KPI) => {
    setSelectedKPI(kpi);
    setSheetView("details");
    setIsKPIDetailsOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "green": return "#357743";
      case "blue": return "#335CFF";
      case "yellow": return "#F2E600";
      case "red": return "#D83731";
      default: return "#6B7280";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "green": return "On Track";
      case "blue": return "Exceeding";
      case "yellow": return "At Risk";
      case "red": return "Critical";
      default: return "Unknown";
    }
  };

  const filteredKPIs = mockKPIs.filter(kpi => {
    const matchesSearch = !searchQuery || 
      kpi.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kpi.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kpi.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDivision = selectedDivision === "all" || kpi.division === selectedDivision;
    const matchesStatus = selectedStatus === "all" || kpi.status === selectedStatus;
    const matchesPerspective = selectedPerspective === "all" || kpi.perspective === selectedPerspective;

    return matchesSearch && matchesDivision && matchesStatus && matchesPerspective;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredKPIs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedKPIs = filteredKPIs.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const resetPagination = () => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  };

  // Effect to reset pagination when filters change
  useState(() => {
    resetPagination();
  });

  const divisions = Array.from(new Set(mockKPIs.map(kpi => kpi.division)));
  const perspectives = Array.from(new Set(mockKPIs.map(kpi => kpi.perspective)));

  const statsData = {
    total: mockKPIs.length,
    onTrack: mockKPIs.filter(kpi => kpi.status === "green" || kpi.status === "blue").length,
    atRisk: mockKPIs.filter(kpi => kpi.status === "yellow").length,
    critical: mockKPIs.filter(kpi => kpi.status === "red").length,
    avgAchievement: Math.round(mockKPIs.reduce((sum, kpi) => sum + kpi.achievement, 0) / mockKPIs.length)
  };



  return (
    <div className="h-full overflow-auto">
      <div className="space-y-3 p-3">
        {/* Hero Banner Section */}
        <Card className="relative text-white border-none shadow-lg overflow-hidden">
          <img 
            src={bannerImage}
            alt="Dubai Customs Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#005844]/80 to-[#008755]/80" />
          <CardContent className="pt-3 pb-3 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Target className="h-5 w-5" />
                  </div>
                  <div>
                    <h1 className="text-xl font-['Dubai:Medium',_sans-serif] mb-0.5">
                      Key Performance Indicators
                    </h1>
                    <p className="text-white/90 text-sm">
                      Dubai Customs - KPI Management & Performance Tracking
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export KPIs
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        {/* ... remove this code ... */}

        {/* Filters and Search */}
        <Card>
          <CardContent className="pt-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search KPIs by name, code, or department..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedDivision} onValueChange={setSelectedDivision}>
                <SelectTrigger className="w-full md:w-[250px]">
                  <SelectValue placeholder="All Divisions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Divisions</SelectItem>
                  {divisions.map(division => (
                    <SelectItem key={division} value={division}>{division}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="green">On Track</SelectItem>
                  <SelectItem value="amber">At Risk</SelectItem>
                  <SelectItem value="red">Critical</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedPerspective} onValueChange={setSelectedPerspective}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="All Perspectives" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Perspectives</SelectItem>
                  {perspectives.map(perspective => (
                    <SelectItem key={perspective} value={perspective}>{perspective}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-[#008755] hover:bg-[#008755]/90" : ""}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-[#008755] hover:bg-[#008755]/90" : ""}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing <span className="font-['Dubai:Medium',_sans-serif]">{filteredKPIs.length}</span> of <span className="font-['Dubai:Medium',_sans-serif]">{mockKPIs.length}</span> KPIs
          </p>
        </div>

        {/* KPI Display - Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {paginatedKPIs.map((kpi) => (
              <Card 
                key={kpi.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleKPIClick(kpi)}
              >
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-sm font-['Dubai:Medium',_sans-serif] text-gray-900 mb-1 line-clamp-2">
                        {kpi.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-xs text-gray-900">{kpi.department}</p>
                        <Badge variant="outline" className="text-xs px-1.5 py-0">
                          Weight: {kpi.weight || '5'}%
                        </Badge>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit KPI
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-2xl font-['Dubai:Medium',_sans-serif]" style={{ color: getStatusColor(kpi.status) }}>
                          {kpi.actual}
                        </span>
                        <span className="text-sm text-gray-500">/ {kpi.target} {kpi.unit}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600">Achievement:</span>
                        <span className="text-xs font-['Dubai:Medium',_sans-serif]" style={{ color: getStatusColor(kpi.status) }}>
                          {kpi.achievement}%
                        </span>
                        {kpi.trend === "up" && <TrendingUp className="h-3 w-3 text-green-600" />}
                        {kpi.trend === "down" && <TrendingDown className="h-3 w-3 text-red-600" />}
                      </div>
                    </div>
                    <KPIGauge achievement={kpi.achievement} status={kpi.status} size="sm" />
                  </div>

                  <div className="space-y-2 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{kpi.frequency}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>Updated {new Date(kpi.lastUpdated).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* KPI Display - List View */}
        {viewMode === "list" && (
          <Card>
            <CardContent className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>KPI Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead className="text-center">Weight</TableHead>
                    <TableHead className="text-center">Achievement</TableHead>
                    <TableHead className="text-center">Target</TableHead>
                    <TableHead className="text-center">Actual</TableHead>
                    <TableHead className="text-center">Trend</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedKPIs.map((kpi) => (
                    <TableRow 
                      key={kpi.id} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleKPIClick(kpi)}
                    >
                      <TableCell>
                        <div>
                          <p className="font-['Dubai:Medium',_sans-serif] text-sm">{kpi.name}</p>
                          <p className="text-xs text-gray-500">{kpi.perspective}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{kpi.department}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center">
                          <Badge 
                            variant="outline"
                            className="bg-gray-50 text-gray-700 border-gray-300"
                          >
                            {kpi.weight}%
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-3">
                          <KPIGauge achievement={kpi.achievement} status={kpi.status} size="sm" />
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="text-sm font-['Dubai:Medium',_sans-serif]">
                          {kpi.target} {kpi.unit}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="text-sm font-['Dubai:Medium',_sans-serif]" style={{ color: kpi.divisionColor }}>
                          {kpi.actual} {kpi.unit}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center">
                          {kpi.trend === "up" && (
                            <div className="flex items-center gap-1 text-green-600">
                              <TrendingUp className="h-4 w-4" />
                              <span className="text-xs">Up</span>
                            </div>
                          )}
                          {kpi.trend === "down" && (
                            <div className="flex items-center gap-1 text-red-600">
                              <TrendingDown className="h-4 w-4" />
                              <span className="text-xs">Down</span>
                            </div>
                          )}
                          {kpi.trend === "stable" && (
                            <div className="flex items-center gap-1 text-gray-600">
                              <ArrowRight className="h-4 w-4" />
                              <span className="text-xs">Stable</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit KPI
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* No Results */}
        {filteredKPIs.length === 0 && (
          <Card>
            <CardContent className="pt-12 pb-12">
              <div className="text-center">
                <Target className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p className="text-gray-600 mb-2">No KPIs found</p>
                <p className="text-sm text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pagination */}
        {filteredKPIs.length > 0 && totalPages > 1 && (
          <Card>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Page <span className="font-['Dubai:Medium',_sans-serif]">{currentPage}</span> of <span className="font-['Dubai:Medium',_sans-serif]">{totalPages}</span>
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="h-9 px-3"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // Show first page, last page, current page, and pages around current
                      const showPage = 
                        page === 1 || 
                        page === totalPages || 
                        (page >= currentPage - 1 && page <= currentPage + 1);
                      
                      // Show ellipsis
                      const showEllipsisBefore = page === currentPage - 2 && currentPage > 3;
                      const showEllipsisAfter = page === currentPage + 2 && currentPage < totalPages - 2;

                      if (showEllipsisBefore || showEllipsisAfter) {
                        return (
                          <span key={page} className="px-2 text-gray-400">...</span>
                        );
                      }

                      if (!showPage) return null;

                      return (
                        <Button
                          key={page}
                          variant={page === currentPage ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className={`h-9 w-9 p-0 ${page === currentPage ? "bg-[#008755] hover:bg-[#008755]/90" : ""}`}
                        >
                          {page}
                        </Button>
                      );
                    })}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="h-9 px-3"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

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
                  <SheetTitle className="text-xl font-['Dubai:Medium',_sans-serif]">
                    {selectedKPI.name}
                  </SheetTitle>
                  <SheetDescription className="mt-2">
                    {selectedKPI.department} • {selectedKPI.division}
                  </SheetDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge 
                    variant="outline" 
                    style={{ 
                      borderColor: selectedKPI.divisionColor,
                      color: selectedKPI.divisionColor
                    }}
                  >
                    {selectedKPI.code}
                  </Badge>
                  <Badge 
                    variant="outline"
                    style={{ 
                      borderColor: getStatusColor(selectedKPI.status),
                      color: getStatusColor(selectedKPI.status)
                    }}
                  >
                    {getStatusLabel(selectedKPI.status)}
                  </Badge>
                  <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300">
                    Weight: {selectedKPI.weight}%
                  </Badge>
                </div>
              </SheetHeader>

              <div className="px-6 pb-6 space-y-6">
                {/* Performance Overview */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-['Dubai:Medium',_sans-serif] text-gray-700 mb-4">Performance Overview</h3>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-3xl font-['Dubai:Medium',_sans-serif]" style={{ color: selectedKPI.divisionColor }}>
                          {selectedKPI.actual}
                        </span>
                        <span className="text-lg text-gray-500">/ {selectedKPI.target} {selectedKPI.unit}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Achievement:</span>
                        <span 
                          className="text-lg font-['Dubai:Medium',_sans-serif]" 
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
                  <h3 className="text-sm font-['Dubai:Medium',_sans-serif] text-gray-700">KPI Information</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">KPI Owner</p>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <p className="text-sm font-['Dubai:Medium',_sans-serif]">{selectedKPI.owner}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Department</p>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-gray-400" />
                        <p className="text-sm font-['Dubai:Medium',_sans-serif]">{selectedKPI.department}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Frequency</p>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <p className="text-sm font-['Dubai:Medium',_sans-serif]">{selectedKPI.frequency}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Last Updated</p>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <p className="text-sm font-['Dubai:Medium',_sans-serif]">
                          {new Date(selectedKPI.lastUpdated).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Perspective</p>
                      <p className="text-sm font-['Dubai:Medium',_sans-serif]">{selectedKPI.perspective}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Trend</p>
                      <div className="flex items-center gap-1">
                        {selectedKPI.trend === "up" && (
                          <>
                            <TrendingUp className="h-4 w-4 text-green-600" />
                            <span className="text-sm text-green-600">Improving</span>
                          </>
                        )}
                        {selectedKPI.trend === "down" && (
                          <>
                            <TrendingDown className="h-4 w-4 text-red-600" />
                            <span className="text-sm text-red-600">Declining</span>
                          </>
                        )}
                        {selectedKPI.trend === "stable" && (
                          <>
                            <ArrowRight className="h-4 w-4 text-gray-600" />
                            <span className="text-sm text-gray-600">Stable</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tabs Section */}
                <Tabs defaultValue="trend" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="trend">Trend</TabsTrigger>
                    <TabsTrigger value="evidence">Reading and Evidence</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="trend" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm font-['Dubai:Medium',_sans-serif]">Performance Trend Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <ComposedChart
                            data={[
                              { quarter: 'Q1', value: 50, target: 80, benchmark: 65, globalIndex: 55 },
                              { quarter: 'Q2', value: 30, target: 80, benchmark: 70, globalIndex: 60 },
                              { quarter: 'Q3', value: 60, target: 80, benchmark: 75, globalIndex: 65 },
                              { quarter: 'Q4', value: 75, target: 80, benchmark: 78, globalIndex: 70 }
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
                        <CardTitle className="text-sm font-['Dubai:Medium',_sans-serif]">Reading and Evidence</CardTitle>
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
                              <TableCell className="font-['Dubai:Medium',_sans-serif]">Q1 2025</TableCell>
                              <TableCell className="text-center">
                                <span className="text-sm font-['Dubai:Medium',_sans-serif]">80 {selectedKPI.unit}</span>
                              </TableCell>
                              <TableCell className="text-center">
                                <span className="text-sm font-['Dubai:Medium',_sans-serif]" style={{ color: selectedKPI.divisionColor }}>
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
                              <TableCell className="font-['Dubai:Medium',_sans-serif]">Q2 2025</TableCell>
                              <TableCell className="text-center">
                                <span className="text-sm font-['Dubai:Medium',_sans-serif]">80 {selectedKPI.unit}</span>
                              </TableCell>
                              <TableCell className="text-center">
                                <span className="text-sm font-['Dubai:Medium',_sans-serif]" style={{ color: selectedKPI.divisionColor }}>
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
                              <TableCell className="font-['Dubai:Medium',_sans-serif]">Q3 2025</TableCell>
                              <TableCell className="text-center">
                                <span className="text-sm font-['Dubai:Medium',_sans-serif]">80 {selectedKPI.unit}</span>
                              </TableCell>
                              <TableCell className="text-center">
                                <span className="text-sm font-['Dubai:Medium',_sans-serif]" style={{ color: selectedKPI.divisionColor }}>
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
                              <TableCell className="font-['Dubai:Medium',_sans-serif]">Q4 2025</TableCell>
                              <TableCell className="text-center">
                                <span className="text-sm font-['Dubai:Medium',_sans-serif]">80 {selectedKPI.unit}</span>
                              </TableCell>
                              <TableCell className="text-center">
                                <span className="text-sm font-['Dubai:Medium',_sans-serif]" style={{ color: selectedKPI.divisionColor }}>
                                  75 {selectedKPI.unit}
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