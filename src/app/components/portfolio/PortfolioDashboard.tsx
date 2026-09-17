import { useState, useEffect, useCallback, useMemo } from "react";
import { 
  ArrowRight, 
  TrendingUp, 
  Target, 
  AlertTriangle, 
  CheckCircle2,
  BarChart3,
  Briefcase,
  FolderKanban,
  ListTodo,
  FileText,
  Activity,
  Award,
  ChevronRight,
  Calendar,
  Clock,
  TrendingDown,
  Layers,
  PieChart,
  Building2
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import bannerImage from "figma:asset/2ceb5f3890ecf49940adbd1e2cca8cf7647ce99f.png";
import { PortfolioDashboardPage } from "./PortfolioDashboardPage";
import { ProjectsListPage } from "./ProjectsListPage";
import { CreateProjectPage } from "./CreateProjectPage";
import { CreateReportDialog } from "./CreateReportDialog";
import { DGDashboardPage } from "./DGDashboardPage";

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
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="h-10 w-10 rounded-lg bg-[#008755]/10 flex items-center justify-center text-[#008755]">
            {icon}
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-['Dubai:Medium',_'Dubai']">{value}</p>
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
  type?: string;
}

function AlertItem({ title, description, time, severity, type }: AlertItemProps) {
  const severityConfig = {
    high: { bg: '#D83731', text: 'white' },
    medium: { bg: '#F2A200', text: 'white' },
    low: { bg: '#357743', text: 'white' }
  };

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
      <div 
        className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${severityConfig[severity].bg}20` }}
      >
        <AlertTriangle className="h-4 w-4" style={{ color: severityConfig[severity].bg }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{title}</p>
          {type && (
            <Badge 
              style={{
                backgroundColor: severity === 'high' ? '#D8373120' : 
                  severity === 'medium' ? '#F2A20020' : '#35774320',
                color: severity === 'high' ? '#D83731' : 
                  severity === 'medium' ? '#F2A200' : '#357743'
              }}
            >
              {type}
            </Badge>
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

interface IdeaOriginProject {
  id: string;
  title: string;
  department: string;
  submitter: string;
  priority: string;
  targetQuarter: string;
  type: 'Project' | 'Initiative';
  ideaId: number;
  convertedAt: string;
  strategicFit: string;
  impactArea: string;
}

interface PortfolioDashboardProps {
  onNavigate?: (view: 'strategy' | 'performance' | 'scorecards' | 'portfolio') => void;
  setBreadcrumbs?: (breadcrumbs: Array<{ label: string; onClick?: () => void }>) => void;
  convertedProjects?: IdeaOriginProject[];
  onNavigateToIdeas?: (page: string) => void;
}

export function PortfolioDashboard({ onNavigate, setBreadcrumbs, convertedProjects = [], onNavigateToIdeas }: PortfolioDashboardProps) {
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [activeView, setActiveView] = useState<'landing' | 'dashboard' | 'projects-list' | 'create-project' | 'dg-dashboard'>('landing');

  // Navigation parameters for direct project/report access
  const [navigationParams, setNavigationParams] = useState<{
    projectId?: string;
    initialTab?: 'biweekly';
    initialReportId?: number;
  }>({});

  // Edit report dialog state
  const [showEditReportDialog, setShowEditReportDialog] = useState(false);
  const [editReportId, setEditReportId] = useState<number | null>(null);

  // Edit project state
  const [editingProject, setEditingProject] = useState<any | null>(null);

  // Memoize navigation handlers to prevent infinite loops
  const handleNavigateHome = useCallback(() => {
    onNavigate?.('portfolio');
  }, [onNavigate]);

  const handleNavigateToLanding = useCallback(() => {
    setActiveView('landing');
  }, []);

  const handleNavigateToProjectsList = useCallback(() => {
    setActiveView('projects-list');
  }, []);

  // Update breadcrumbs when activeView changes
  useEffect(() => {
    if (!setBreadcrumbs) return;

    if (activeView === 'landing') {
      setBreadcrumbs([
        { label: 'Home', onClick: handleNavigateHome },
        { label: 'Portfolio' }
      ]);
    } else if (activeView === 'dashboard') {
      setBreadcrumbs([
        { label: 'Home', onClick: handleNavigateHome },
        { label: 'Portfolio', onClick: handleNavigateToLanding },
        { label: 'Dashboard' }
      ]);
    } else if (activeView === 'projects-list') {
      setBreadcrumbs([
        { label: 'Home', onClick: handleNavigateHome },
        { label: 'Portfolio', onClick: handleNavigateToLanding },
        { label: 'Projects' }
      ]);
    } else if (activeView === 'create-project') {
      setBreadcrumbs([
        { label: 'Home', onClick: handleNavigateHome },
        { label: 'Portfolio', onClick: handleNavigateToLanding },
        { label: 'Projects', onClick: handleNavigateToProjectsList },
        { label: editingProject ? 'Edit Project' : 'Create Project' }
      ]);
    } else if (activeView === 'dg-dashboard') {
      setBreadcrumbs([
        { label: 'Home', onClick: handleNavigateHome },
        { label: 'Portfolio', onClick: handleNavigateToLanding },
        { label: 'Executive Dashboard' }
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeView, editingProject, handleNavigateHome, handleNavigateToLanding, handleNavigateToProjectsList]);

  // Mock data for portfolio trends
  const portfolioTrends = [
    { quarter: "Q1", "Impact Assessment": 8, "Digital Solutions": 12, "Strategy": 5, "New Services": 6 },
    { quarter: "Q2", "Impact Assessment": 10, "Digital Solutions": 15, "Strategy": 7, "New Services": 8 },
    { quarter: "Q3", "Impact Assessment": 12, "Digital Solutions": 18, "Strategy": 9, "New Services": 10 },
    { quarter: "Q4", "Impact Assessment": 14, "Digital Solutions": 20, "Strategy": 11, "New Services": 12 }
  ];

  // Show Portfolio Dashboard Page if that view is active
  if (activeView === "dashboard") {
    return <PortfolioDashboardPage key="portfolio-dashboard" onBack={() => setActiveView("landing")} onCreateProject={() => setActiveView("create-project")} />;
  }

  // Show Projects List Page if that view is active
  if (activeView === "projects-list") {
    return <ProjectsListPage
      key="projects-list"
      onBack={() => {
        setActiveView("landing");
        setNavigationParams({}); // Clear navigation params when going back
      }}
      initialProjectId={navigationParams.projectId}
      initialTab={navigationParams.initialTab}
      initialReportId={navigationParams.initialReportId}
      onEditProject={(project) => {
        setEditingProject(project);
        setActiveView('create-project');
      }}
      convertedFromIdeas={convertedProjects}
      onNavigateToIdeas={onNavigateToIdeas}
    />;
  }

  // Show Create Project Page if that view is active
  if (activeView === "create-project") {
    return <CreateProjectPage
      key={`create-project-${editingProject?.id || 'new'}`}
      onBack={() => {
        setActiveView("projects-list");
        setEditingProject(null); // Clear editing project when going back
      }}
      initialData={editingProject}
    />;
  }

  // Show DG Dashboard Page if that view is active
  if (activeView === "dg-dashboard") {
    return <DGDashboardPage key="dg-dashboard" onBack={() => setActiveView("landing")} />;
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
          <CardContent className="pt-3 pb-3 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-12 w-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <div>
                    <h1 className="text-xl font-['Dubai:Medium',_sans-serif] mb-1">
                      Portfolio Management
                    </h1>
                    <p className="text-white/90 text-sm">
                      Portfolio Management Homepage
                    </p>
                  </div>
                </div>
                <p className="text-white/80 text-sm max-w-2xl">
                  Manage strategic projects and initiatives across Dubai Customs. Track progress, allocate resources, and ensure alignment with organizational objectives.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div>
          <h2 className="text-lg font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-1.5">
            Key Portfolio Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard
              title="Active Projects"
              value="57"
              change="+8%"
              isPositive={true}
              icon={<FolderKanban className="h-5 w-5" />}
            />
            <StatCard
              title="On Track"
              value="45"
              change="+12%"
              isPositive={true}
              icon={<CheckCircle2 className="h-5 w-5" />}
            />
            <StatCard
              title="At Risk"
              value="8"
              change="-3%"
              isPositive={false}
              icon={<AlertTriangle className="h-5 w-5" />}
            />
            <StatCard
              title="Portfolio Health"
              value="89%"
              change="+4%"
              isPositive={true}
              icon={<TrendingUp className="h-5 w-5" />}
            />
          </div>
        </div>

        {/* Quick Access */}
        <div className="mb-6">
          <h2 className="text-lg font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-1.5">
            Quick Access
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <QuickAccessCard
              title="Executive Dashboard"
              description="Director General executive overview"
              icon={<Building2 className="h-6 w-6" />}
              badge="Executive View"
              onClick={() => setActiveView("dg-dashboard")}
            />
            <QuickAccessCard
              title="Portfolio Dashboard"
              description="Comprehensive overview of all projects"
              icon={<BarChart3 className="h-6 w-6" />}
              badge="57 Projects"
              onClick={() => setActiveView("dashboard")}
            />
            <QuickAccessCard
              title="Project Lists"
              description="View and manage project details"
              icon={<ListTodo className="h-6 w-6" />}
              badge="45 Active"
              onClick={() => setActiveView("projects-list")}
            />
            {/* <QuickAccessCard
              title="Reports"
              description="Portfolio analytics and insights"
              icon={<FileText className="h-6 w-6" />}
              badge="12 Available"
              onClick={() => {}}
            /> */}
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Portfolio Growth Trend */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-['Dubai:Medium',_'Dubai']">
                    Portfolio Growth Trend
                  </CardTitle>
                  <CardDescription>
                    Active projects by project type - {selectedYear}
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
            <CardContent className="pb-4">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={portfolioTrends}>
                  <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    key="xaxis"
                    dataKey="quarter"
                    stroke="#6b7280"
                    style={{ fontSize: '12px', fontFamily: 'Dubai, sans-serif' }}
                  />
                  <YAxis
                    key="yaxis"
                    stroke="#6b7280"
                    style={{ fontSize: '12px', fontFamily: 'Dubai, sans-serif' }}
                  />
                  <Tooltip
                    key="tooltip"
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      fontFamily: 'Dubai, sans-serif'
                    }}
                  />
                  <Legend
                    key="legend"
                    wrapperStyle={{
                      fontSize: '12px',
                      fontFamily: 'Dubai, sans-serif'
                    }}
                  />
                  <Bar key="portfolio-impact" dataKey="Impact Assessment" fill="#00B0AA" />
                  <Bar key="portfolio-digital" dataKey="Digital Solutions" fill="#BB9956" />
                  <Bar key="portfolio-strategy" dataKey="Strategy" fill="#008755" />
                  <Bar key="portfolio-services" dataKey="New Services" fill="#005844" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Activities & Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="font-['Dubai:Medium',_'Dubai']">
                Recent Activities & Alerts
              </CardTitle>
              <CardDescription>
                Latest portfolio updates and action items
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 overflow-y-auto max-h-[220px] pr-2">
                <div className="flex items-start gap-2 mb-3">
                  <Activity className="h-4 w-4 text-[#008755] mt-0.5" />
                  <h3 className="font-['Dubai:Medium',_'Dubai'] text-sm">Recent Activities</h3>
                </div>
                <AlertItem
                  title="Project Milestone Achieved"
                  description="Smart Trade 2030 completed Phase 1"
                  time="2 hours ago"
                  severity="low"
                  type="Strategic"
                />
                <AlertItem
                  title="New Initiative Launched"
                  description="Digital Transformation Program initiated"
                  time="1 day ago"
                  severity="low"
                  type="Innovation"
                />
                
                <div className="flex items-start gap-2 mb-3 mt-6">
                  <AlertTriangle className="h-4 w-4 text-[#F2A200] mt-0.5" />
                  <h3 className="font-['Dubai:Medium',_'Dubai'] text-sm">Portfolio Alerts</h3>
                </div>
                
                {/* Bi-Weekly Report Update Alert */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-orange-50 border border-orange-200">
                  <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex-1">
                        <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                          Bi-Weekly Report Update Required
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          An update is required on the bi-weekly report for <span className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">Smart Clearance Initiative</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-orange-600 font-['Dubai:Medium',_'Dubai']">2 hours ago</span>
                      <Button 
                        size="sm" 
                        className="h-7 px-3 bg-orange-600 hover:bg-orange-700 text-white text-xs"
                        onClick={() => {
                          setEditReportId(1);
                          setShowEditReportDialog(true);
                        }}
                      >
                        Update Now
                      </Button>
                    </div>
                  </div>
                </div>
                
                <AlertItem
                  title="Budget Variance Alert"
                  description="3 projects exceeding allocated budget"
                  time="Today"
                  severity="high"
                  type="Action Required"
                />
                <AlertItem
                  title="Timeline Delay"
                  description="2 projects behind schedule by 2 weeks"
                  time="Yesterday"
                  severity="medium"
                  type="Monitor"
                />
                <AlertItem
                  title="Resource Allocation"
                  description="5 projects pending resource assignment"
                  time="2 days ago"
                  severity="medium"
                  type="Pending"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Portfolio Categories */}
        <div>
          <h2 className="text-lg font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-1.5">
            Project Types
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { 
                name: "Impact Assessment", 
                count: 14, 
                active: 12, 
                color: "#00B0AA",
                icon: <Target className="h-5 w-5" />
              },
              { 
                name: "Digital Solutions", 
                count: 20, 
                active: 18, 
                color: "#BB9956",
                icon: <Layers className="h-5 w-5" />
              },
              { 
                name: "Strategy", 
                count: 11, 
                active: 9, 
                color: "#008755",
                icon: <Award className="h-5 w-5" />
              },
              { 
                name: "New Services", 
                count: 12, 
                active: 11, 
                color: "#005844",
                icon: <CheckCircle2 className="h-5 w-5" />
              }
            ].map((category, index) => (
              <Card key={index} className="relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: category.color }} />
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-10 w-10 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: category.color }}>
                      {category.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                        {category.count}
                      </div>
                      <div className="text-xs text-muted-foreground">Projects</div>
                    </div>
                  </div>
                  <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-3">
                    {category.name}
                  </h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{category.count} Total</span>
                    <span className="text-green-600 font-['Dubai:Medium',_'Dubai']">
                      {category.active} Active
                    </span>
                  </div>
                  <Progress 
                    value={(category.active / category.count) * 100} 
                    className="h-1.5 mt-3"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Report Dialog */}
      <CreateReportDialog 
        open={showEditReportDialog} 
        onOpenChange={setShowEditReportDialog}
        editMode={true}
        reportId={editReportId || undefined}
      />
    </div>
  );
}