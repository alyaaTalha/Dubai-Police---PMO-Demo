import { useState, useEffect } from "react";
import { 
  ArrowRight, 
  TrendingUp, 
  Target, 
  AlertTriangle, 
  CheckCircle2,
  BarChart3,
  Users,
  Building2,
  Network,
  GitCompare,
  FileText,
  Activity,
  Award,
  ChevronRight,
  Calendar,
  Clock
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import bannerImage from "figma:asset/2ceb5f3890ecf49940adbd1e2cca8cf7647ce99f.png";
import { OrganizationChart } from "./OrganizationChart";
import { KPIsPage } from "./KPIsPage";
import { ReportsPage } from "./ReportsPage";
import { CorporateDashboard } from "./CorporateDashboard";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

function StatCard({ title, value, change, isPositive, icon }: StatCardProps) {
  return (
    <Card>
      <CardContent className="pt-4 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <p className="text-2xl font-['Dubai:Medium',_'Dubai']">{value}</p>
          </div>
          <div className="h-10 w-10 rounded-lg bg-[#008755]/10 flex items-center justify-center text-[#008755]">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface QuickAccessCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "outline" | "destructive";
  onClick: () => void;
}

function QuickAccessCard({ title, description, icon, badge, badgeVariant = "secondary", onClick }: QuickAccessCardProps) {
  return (
    <Card className="cursor-pointer transition-all hover:shadow-md hover:border-[#008755]/50" onClick={onClick}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-3">
          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-[#008755] to-[#008755]/80 flex items-center justify-center text-white">
            {icon}
          </div>
          {badge && (
            <Badge variant={badgeVariant}>{badge}</Badge>
          )}
        </div>
        <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex items-center text-[#008755] text-sm font-['Dubai:Medium',_'Dubai']">
          <span>View Details</span>
          <ChevronRight className="h-4 w-4 ml-1" />
        </div>
      </CardContent>
    </Card>
  );
}

interface AlertItemProps {
  title: string;
  description: string;
  time: string;
  severity: "high" | "medium" | "low";
  kpi?: string;
}

function AlertItem({ title, description, time, severity, kpi }: AlertItemProps) {
  const severityConfig = {
    high: { bg: '#D83731', text: 'white' },
    medium: { bg: '#F2A200', text: 'white' },
    low: { bg: '#357743', text: 'white' }
  };

  const config = severityConfig[severity];

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
      <div 
        className="h-8 w-8 rounded-full flex items-center justify-center"
        style={{ backgroundColor: config.bg, color: config.text }}
      >
        <AlertTriangle className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{title}</p>
          {kpi && (
            <Badge variant="outline" className="text-xs">{kpi}</Badge>
          )}
        </div>
        <p className="text-xs text-muted-foreground mb-1">{description}</p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}

interface PerformanceDashboardProps {
  onNavigate?: (view: 'strategy' | 'performance' | 'scorecards', division?: string) => void;
  setBreadcrumbs?: (breadcrumbs: Array<{ label: string; onClick?: () => void }>) => void;
  onNavigateHome?: () => void;
}

export function PerformanceDashboard({ onNavigate, setBreadcrumbs, onNavigateHome }: PerformanceDashboardProps) {
  const [activeView, setActiveView] = useState<string>("overview");
  const [selectedYear, setSelectedYear] = useState<number>(2025);

  // Update breadcrumbs based on active view
  useEffect(() => {
    if (!setBreadcrumbs || !onNavigateHome) return;
    
    if (activeView === "overview") {
      setBreadcrumbs([
        { label: 'Home', onClick: onNavigateHome },
        { label: 'Performance Management' }
      ]);
    } else if (activeView === "orgchart") {
      setBreadcrumbs([
        { label: 'Home', onClick: onNavigateHome },
        { label: 'Performance Management', onClick: () => setActiveView("overview") },
        { label: 'Organization Chart' }
      ]);
    } else if (activeView === "kpis") {
      setBreadcrumbs([
        { label: 'Home', onClick: onNavigateHome },
        { label: 'Performance Management', onClick: () => setActiveView("overview") },
        { label: 'KPIs' }
      ]);
    } else if (activeView === "reports") {
      setBreadcrumbs([
        { label: 'Home', onClick: onNavigateHome },
        { label: 'Performance Management', onClick: () => setActiveView("overview") },
        { label: 'Reports' }
      ]);
    } else if (activeView === "dashboard") {
      setBreadcrumbs([
        { label: 'Home', onClick: onNavigateHome },
        { label: 'Performance Management', onClick: () => setActiveView("overview") },
        { label: 'Corporate Dashboard' }
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeView]);

  // Show Organization Chart if that view is active
  if (activeView === "orgchart") {
    return <OrganizationChart onBack={() => setActiveView("overview")} />;
  }

  // Show KPIs Page if that view is active
  if (activeView === "kpis") {
    return <KPIsPage onBack={() => setActiveView("overview")} />;
  }

  // Show Reports Page if that view is active
  if (activeView === "reports") {
    return <ReportsPage onBack={() => setActiveView("overview")} />;
  }

  // Show Corporate Dashboard if that view is active
  if (activeView === "dashboard") {
    return <CorporateDashboard 
      onBack={() => setActiveView("overview")} 
      onNavigateToDivision={() => onNavigate?.('scorecards', 'faa')}
    />;
  }

  return (
    <div className="h-full overflow-auto">
      <div className="space-y-3 p-3">
        {/* Hero CTA Section */}
        <Card className="relative text-white border-none shadow-lg overflow-hidden">
          <img 
            src={bannerImage}
            alt="Dubai Customs Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#005844]/80 to-[#008755]/80" />
          <CardContent className="pt-4 pb-4 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h1 className="text-xl font-['Dubai:Medium',_'Dubai'] mb-0.5">
                      Performance Management System
                    </h1>
                    <p className="text-white/90 text-sm">
                      Dubai Customs - Balanced Scorecard & KPI Tracking Platform
                    </p>
                  </div>
                </div>
                <p className="text-white/80 text-sm mb-2 whitespace-nowrap">
                  Comprehensive performance monitoring across all organizational levels with real-time KPI tracking, 
                  alignment visualization, and strategic goal management.
                </p>
                <div className="flex items-center gap-3">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white bg-transparent text-white hover:bg-white/10 hover:text-white"
                    onClick={() => setActiveView("reports")}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    View Reports
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white bg-transparent text-white hover:bg-white/10 hover:text-white"
                    onClick={() => setActiveView("dashboard")}
                  >
                    <Building2 className="h-4 w-4 mr-2" />
                    Corporate Dashboard
                  </Button>
                </div>
              </div>
              <div className="hidden xl:block">
                <div className="relative h-32 w-32">
                  <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-['Dubai:Medium',_'Dubai'] mb-0.5">85%</div>
                      <div className="text-xs text-white/80">Overall Score</div>
                      <div className="text-xs text-white/60">Q1 2025</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Performance Metrics */}
        <div>
          <h2 className="text-lg font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-1.5">
            Key Performance Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard
              title="Overall Performance Score"
              value="85.2%"
              change="+5.3%"
              isPositive={true}
              icon={<TrendingUp className="h-5 w-5" />}
            />
            <StatCard
              title="KPIs On Track"
              value="156/230"
              change="68%"
              isPositive={true}
              icon={<CheckCircle2 className="h-5 w-5" />}
            />
            <StatCard
              title="At Risk KPIs"
              value="51"
              change="22%"
              isPositive={false}
              icon={<AlertTriangle className="h-5 w-5" />}
            />
            <StatCard
              title="Achievement Rate"
              value="92.4%"
              change="+3.1%"
              isPositive={true}
              icon={<Target className="h-5 w-5" />}
            />
          </div>
        </div>

        {/* Quick Access Navigation */}
        <div>
          <h2 className="text-lg font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-1.5">
            Quick Access
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <QuickAccessCard
              title="Organization Structure"
              description="Hierarchical structure and reporting relationships across all organizational units"
              icon={<Building2 className="h-6 w-6" />}
              badge="Hierarchical"
              onClick={() => setActiveView("orgchart")}
            />
            <QuickAccessCard
              title="Scorecards"
              description="Comprehensive view of all organizational scorecards across corporate, division, and department levels"
              icon={<BarChart3 className="h-6 w-6" />}
              onClick={() => onNavigate?.('scorecards')}
            />
            <QuickAccessCard
              title="KPIs"
              description="Detailed KPI management with data entry, targets, actuals, and performance tracking"
              icon={<Target className="h-6 w-6" />}
              badge="230 Active"
              onClick={() => setActiveView("kpis")}
            />
            <QuickAccessCard
              title="KPI Alignment"
              description="Visualize cascading KPI relationships and strategic alignment across organizational hierarchy"
              icon={<Network className="h-6 w-6" />}
              badge="Tree View"
              onClick={() => setActiveView("alignment")}
            />
            <QuickAccessCard
              title="Dimensions Overview"
              description="Multi-dimensional performance analysis across perspectives, departments, and time periods"
              icon={<GitCompare className="h-6 w-6" />}
              badge="Multi-dimensional"
              onClick={() => setActiveView("dimensions")}
            />
            <QuickAccessCard
              title="Global Indexes"
              description="International benchmarking and comparative performance metrics against global standards"
              icon={<TrendingUp className="h-6 w-6" />}
              badge="Benchmarking"
              onClick={() => setActiveView("indexes")}
            />
          </div>
        </div>

        {/* Performance Trends & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Performance Trends */}
          <div className="lg:col-span-2 h-full">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-['Dubai:Medium',_'Dubai']">
                      Division Performance Trends
                    </CardTitle>
                    <CardDescription>
                      Performance score trends by division - Last 4 quarters of {selectedYear}
                    </CardDescription>
                  </div>
                  <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(Number(value))}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <ResponsiveContainer width="100%" height={380}>
                  <LineChart
                    data={
                      selectedYear === 2025 ? [
                        { 
                          quarter: "Q1", 
                          "Customs Development": 85, 
                          "Customs Inspection": 87,
                          "Finance and Administrative affairs": 83,
                          "Human Resources": 82,
                          "Director General": 89,
                          "Policy and Legislation": 84
                        },
                        { 
                          quarter: "Q2", 
                          "Customs Development": 88, 
                          "Customs Inspection": 89,
                          "Finance and Administrative affairs": 81,
                          "Human Resources": 85,
                          "Director General": 91,
                          "Policy and Legislation": 86
                        },
                        { 
                          quarter: "Q3", 
                          "Customs Development": 87, 
                          "Customs Inspection": 92,
                          "Finance and Administrative affairs": 84,
                          "Human Resources": 87,
                          "Director General": 90,
                          "Policy and Legislation": 88
                        },
                        { 
                          quarter: "Q4", 
                          "Customs Development": 90, 
                          "Customs Inspection": 94,
                          "Finance and Administrative affairs": 86,
                          "Human Resources": 88,
                          "Director General": 93,
                          "Policy and Legislation": 91
                        }
                      ] : selectedYear === 2024 ? [
                        { 
                          quarter: "Q1", 
                          "Customs Development": 78, 
                          "Customs Inspection": 82,
                          "Finance and Administrative affairs": 76,
                          "Human Resources": 74,
                          "Director General": 85,
                          "Policy and Legislation": 79
                        },
                        { 
                          quarter: "Q2", 
                          "Customs Development": 76, 
                          "Customs Inspection": 84,
                          "Finance and Administrative affairs": 74,
                          "Human Resources": 72,
                          "Director General": 83,
                          "Policy and Legislation": 81
                        },
                        { 
                          quarter: "Q3", 
                          "Customs Development": 79, 
                          "Customs Inspection": 86,
                          "Finance and Administrative affairs": 77,
                          "Human Resources": 75,
                          "Director General": 86,
                          "Policy and Legislation": 83
                        },
                        { 
                          quarter: "Q4", 
                          "Customs Development": 82, 
                          "Customs Inspection": 88,
                          "Finance and Administrative affairs": 80,
                          "Human Resources": 79,
                          "Director General": 87,
                          "Policy and Legislation": 85
                        }
                      ] : [
                        { 
                          quarter: "Q1", 
                          "Customs Development": 72, 
                          "Customs Inspection": 75,
                          "Finance and Administrative affairs": 70,
                          "Human Resources": 68,
                          "Director General": 78,
                          "Policy and Legislation": 73
                        },
                        { 
                          quarter: "Q2", 
                          "Customs Development": 74, 
                          "Customs Inspection": 73,
                          "Finance and Administrative affairs": 72,
                          "Human Resources": 70,
                          "Director General": 80,
                          "Policy and Legislation": 71
                        },
                        { 
                          quarter: "Q3", 
                          "Customs Development": 73, 
                          "Customs Inspection": 76,
                          "Finance and Administrative affairs": 71,
                          "Human Resources": 69,
                          "Director General": 82,
                          "Policy and Legislation": 74
                        },
                        { 
                          quarter: "Q4", 
                          "Customs Development": 76, 
                          "Customs Inspection": 79,
                          "Finance and Administrative affairs": 73,
                          "Human Resources": 71,
                          "Director General": 84,
                          "Policy and Legislation": 77
                        }
                      ]
                    }
                    margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="quarter" 
                      stroke="#6b7280"
                      style={{ fontSize: '12px', fontFamily: 'Dubai' }}
                    />
                    <YAxis 
                      stroke="#6b7280"
                      domain={[60, 100]}
                      style={{ fontSize: '12px', fontFamily: 'Dubai' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        fontFamily: 'Dubai'
                      }}
                    />
                    <Legend 
                      wrapperStyle={{ 
                        fontSize: '12px',
                        fontFamily: 'Dubai'
                      }}
                    />
                    <Line type="monotone" dataKey="Customs Development" stroke="#00B0AA" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="Customs Inspection" stroke="#BB9956" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="Finance and Administrative affairs" stroke="#008755" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="Human Resources" stroke="#005844" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="Director General" stroke="#115E67" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="Policy and Legislation" stroke="#FFBE9F" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Alerts */}
          <div className="h-full">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className="font-['Dubai:Medium',_'Dubai'] flex items-center justify-between">
                  <span>Recent Alerts</span>
                  <Badge 
                    className="border-0"
                    style={{ 
                      backgroundColor: '#D8373115',
                      color: '#D83731'
                    }}
                  >
                    8 New
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Performance issues requiring attention
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="space-y-3 flex-1">
                  <AlertItem
                    title="Revenue Target Miss"
                    description="Below target by 12%"
                    time="2 hours ago"
                    severity="high"
                    kpi="FIN-001"
                  />
                  <AlertItem
                    title="Customer Satisfaction Drop"
                    description="Score decreased by 8 points"
                    time="5 hours ago"
                    severity="medium"
                    kpi="CUS-003"
                  />
                  <AlertItem
                    title="Process Efficiency"
                    description="Cycle time increased"
                    time="1 day ago"
                    severity="medium"
                    kpi="INT-012"
                  />
                  <AlertItem
                    title="Training Completion"
                    description="Below 85% threshold"
                    time="2 days ago"
                    severity="low"
                    kpi="LEA-005"
                  />
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Alerts
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Balanced Scorecard Perspectives Overview */}
        <div>
          <h2 className="text-lg font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-1.5">
            Balanced Scorecard Perspectives
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { 
                name: "Financial", 
                score: 88, 
                kpis: 42, 
                onTrack: 32, 
                color: "#00B0AA",
                icon: <TrendingUp className="h-5 w-5" />
              },
              { 
                name: "Customer", 
                score: 85, 
                kpis: 58, 
                onTrack: 45, 
                color: "#BB9956",
                icon: <Users className="h-5 w-5" />
              },
              { 
                name: "Internal Process", 
                score: 82, 
                kpis: 78, 
                onTrack: 58, 
                color: "#008755",
                icon: <Activity className="h-5 w-5" />
              },
              { 
                name: "Learning & Growth", 
                score: 86, 
                kpis: 52, 
                onTrack: 41, 
                color: "#005844",
                icon: <Award className="h-5 w-5" />
              }
            ].map((perspective, index) => (
              <Card key={index} className="relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: perspective.color }} />
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-10 w-10 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: perspective.color }}>
                      {perspective.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                        {perspective.score}%
                      </div>
                      <div className="text-xs text-muted-foreground">Score</div>
                    </div>
                  </div>
                  <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-3">
                    {perspective.name}
                  </h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{perspective.kpis} KPIs</span>
                    <span className="text-green-600 font-['Dubai:Medium',_'Dubai']">
                      {perspective.onTrack} On Track
                    </span>
                  </div>
                  <Progress 
                    value={(perspective.onTrack / perspective.kpis) * 100} 
                    className="h-1.5 mt-3"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}