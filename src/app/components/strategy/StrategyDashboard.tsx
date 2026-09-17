import { useState } from "react";
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
  Clock,
  Lightbulb,
  Flag
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import heroDecoration from "../../../assets/sandbox-hero-decoration.png";
import { ExecutiveDashboard } from "./ExecutiveDashboard";

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
            <p className="text-2xl  ">{value}</p>
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
        <h3 className="  text-[#1f2937] mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex items-center text-[#008755] text-sm  ">
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
  const severityColors = {
    high: "bg-red-100 text-red-700 border-red-200",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
    low: "bg-blue-100 text-blue-700 border-blue-200"
  };

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${severityColors[severity]}`}>
        <AlertTriangle className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-sm   text-[#1f2937]">{title}</p>
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

interface StrategyDashboardProps {
  onNavigate?: (view: 'strategy' | 'performance' | 'scorecards') => void;
  onNavigateToIdeas?: (page: string) => void;
}

export function StrategyDashboard({ onNavigate, onNavigateToIdeas }: StrategyDashboardProps) {
  const [activeView, setActiveView] = useState<string>("overview");
  const [selectedYear, setSelectedYear] = useState<number>(2025);

  // Show Executive Dashboard if that view is active
  if (activeView === "executive") {
    return <ExecutiveDashboard onBack={() => setActiveView("overview")} onNavigateToIdeas={onNavigateToIdeas} />;
  }

  return (
    <div className="h-full overflow-auto">
      <div className="space-y-3 p-3">
        {/* Hero CTA Section */}
        <Card className="relative text-white border-none shadow-lg overflow-hidden bg-gradient-to-br from-[#005844] via-[#008755] to-[#00a869]">
          <img
            src={heroDecoration}
            alt=""
            className="absolute -top-16 -right-16 h-160 w-160 rounded-full object-cover opacity-50 pointer-events-none select-none"
          />
          <CardContent className="pt-4 pb-4 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-12 w-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Lightbulb className="h-6 w-6" />
                  </div>
                  <div>
                    <h1 className="text-xl font-['Dubai:Medium',_'Dubai'] mb-1">
                      Strategy Management System
                    </h1>
                    <p className="text-white/90">
                      Dubai Customs - Strategic Planning & Execution Platform
                    </p>
                  </div>
                </div>
                <p className="text-white/80 text-sm max-w-2xl mb-2">
                  Comprehensive strategic planning and execution monitoring with goal tracking, 
                  initiative management, and alignment visualization across all organizational levels.
                </p>
                <div className="flex items-center gap-3">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white bg-transparent text-white hover:bg-white/10 hover:text-white"
                    onClick={() => setActiveView("executive")}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Executive Dashboard
                  </Button>
                </div>
              </div>
              <div className="hidden xl:block">
                <div className="relative h-40 w-40">
                  <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-['Dubai:Medium',_'Dubai'] mb-1">92%</div>
                      <div className="text-sm text-white/80">Execution Rate</div>
                      <div className="text-xs text-white/60">Q1 2025</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Strategic Metrics */}
        <div>
          <h2 className="text-lg font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-1.5">
            Key Strategic Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard
              title="Strategic Goals"
              value="24"
              change="100%"
              isPositive={true}
              icon={<Target className="h-5 w-5" />}
            />
            <StatCard
              title="Active Initiatives"
              value="68"
              change="+8"
              isPositive={true}
              icon={<Flag className="h-5 w-5" />}
            />
            <StatCard
              title="On Track"
              value="54/68"
              change="79%"
              isPositive={true}
              icon={<CheckCircle2 className="h-5 w-5" />}
            />
            <StatCard
              title="Overall Progress"
              value="87.5%"
              change="+4.2%"
              isPositive={true}
              icon={<TrendingUp className="h-5 w-5" />}
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
              title="Strategic Plan"
              description="Access Dubai Customs 2021-2026 strategic plan and roadmap"
              icon={<FileText className="h-6 w-6" />}
              badge="2021-2026"
              onClick={() => setActiveView("plan")}
            />
            <QuickAccessCard
              title="Strategy Map"
              description="Visualize strategic objectives and their relationships across perspectives"
              icon={<Network className="h-6 w-6" />}
              badge="Visual Map"
              onClick={() => {}}
            />
            <QuickAccessCard
              title="Initiatives"
              description="Track strategic initiatives, milestones, and key deliverables"
              icon={<Flag className="h-6 w-6" />}
              badge="68 Active"
              onClick={() => setActiveView("initiatives")}
            />
            <QuickAccessCard
              title="SWOT Analysis"
              description="Comprehensive analysis of strengths, weaknesses, opportunities, and threats"
              icon={<BarChart3 className="h-6 w-6" />}
              badge="Updated Q1"
              onClick={() => setActiveView("swot")}
            />
            <QuickAccessCard
              title="Risk Register"
              description="Strategic risk identification, assessment, and mitigation tracking"
              icon={<AlertTriangle className="h-6 w-6" />}
              badge="15 Active"
              onClick={() => setActiveView("risks")}
            />
            <QuickAccessCard
              title="Stakeholders"
              description="Manage stakeholder engagement and communication plans"
              icon={<Users className="h-6 w-6" />}
              badge="42 Stakeholders"
              onClick={() => setActiveView("stakeholders")}
            />
          </div>
        </div>

        {/* Strategic Progress & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Progress Trends */}
          <div className="lg:col-span-2 h-full">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-['Dubai:Medium',_'Dubai']">
                      Strategic Theme Progress
                    </CardTitle>
                    <CardDescription>
                      Execution progress by strategic theme - Last 4 quarters of {selectedYear}
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
                    data={[
                      { 
                        quarter: "Q1", 
                        "Digital Transformation": 85, 
                        "Customer Excellence": 88,
                        "Operational Excellence": 82,
                        "Innovation & Growth": 79,
                        "Sustainability": 83
                      },
                      { 
                        quarter: "Q2", 
                        "Digital Transformation": 88, 
                        "Customer Excellence": 90,
                        "Operational Excellence": 85,
                        "Innovation & Growth": 82,
                        "Sustainability": 86
                      },
                      { 
                        quarter: "Q3", 
                        "Digital Transformation": 91, 
                        "Customer Excellence": 92,
                        "Operational Excellence": 87,
                        "Innovation & Growth": 85,
                        "Sustainability": 88
                      },
                      { 
                        quarter: "Q4", 
                        "Digital Transformation": 93, 
                        "Customer Excellence": 94,
                        "Operational Excellence": 90,
                        "Innovation & Growth": 88,
                        "Sustainability": 91
                      }
                    ]}
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
                    <Line type="monotone" dataKey="Digital Transformation" stroke="#008755" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="Customer Excellence" stroke="#00B0AA" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="Operational Excellence" stroke="#BB9956" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="Innovation & Growth" stroke="#115E67" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="Sustainability" stroke="#005844" strokeWidth={2} dot={{ r: 4 }} />
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
                  <span>Strategic Alerts</span>
                  <Badge 
                    className="border-0"
                    style={{ 
                      backgroundColor: '#D8373115',
                      color: '#D83731'
                    }}
                  >
                    5 New
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Strategic issues requiring attention
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="space-y-3 flex-1">
                  <AlertItem
                    title="Initiative Delay"
                    description="Digital platform delayed by 2 weeks"
                    time="1 hour ago"
                    severity="high"
                    kpi="INI-024"
                  />
                  <AlertItem
                    title="Resource Constraint"
                    description="Budget allocation review needed"
                    time="3 hours ago"
                    severity="medium"
                    kpi="INI-018"
                  />
                  <AlertItem
                    title="Milestone Approaching"
                    description="Q2 milestone review due"
                    time="1 day ago"
                    severity="low"
                    kpi="INI-012"
                  />
                  <AlertItem
                    title="Stakeholder Review"
                    description="Board presentation pending"
                    time="2 days ago"
                    severity="medium"
                    kpi="STK-003"
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

        {/* Strategic Themes Overview */}
        <div>
          <h2 className="text-lg font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-1.5">
            Strategic Themes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { 
                name: "Digital Transformation", 
                progress: 93, 
                initiatives: 18, 
                completed: 14, 
                color: "#00B0AA",
                icon: <Network className="h-5 w-5" />
              },
              { 
                name: "Customer Excellence", 
                progress: 94, 
                initiatives: 15, 
                completed: 12, 
                color: "#BB9956",
                icon: <Users className="h-5 w-5" />
              },
              { 
                name: "Operational Excellence", 
                progress: 90, 
                initiatives: 20, 
                completed: 16, 
                color: "#008755",
                icon: <Activity className="h-5 w-5" />
              },
              { 
                name: "Innovation & Growth", 
                progress: 88, 
                initiatives: 15, 
                completed: 11, 
                color: "#005844",
                icon: <Lightbulb className="h-5 w-5" />
              }
            ].map((theme, index) => (
              <Card key={index} className="relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: theme.color }} />
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-10 w-10 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: theme.color }}>
                      {theme.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                        {theme.progress}%
                      </div>
                      <div className="text-xs text-muted-foreground">Progress</div>
                    </div>
                  </div>
                  <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-3">
                    {theme.name}
                  </h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{theme.initiatives} Initiatives</span>
                    <span className="text-green-600 font-['Dubai:Medium',_'Dubai']">
                      {theme.completed} Done
                    </span>
                  </div>
                  <Progress 
                    value={(theme.completed / theme.initiatives) * 100} 
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