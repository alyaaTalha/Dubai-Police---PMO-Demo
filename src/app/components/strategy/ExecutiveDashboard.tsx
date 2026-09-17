import { useState } from "react";
import { 
  ArrowLeft,
  Download,
  TrendingUp, 
  Target, 
  AlertTriangle, 
  CheckCircle2,
  BarChart3,
  Users,
  Building2,
  Award,
  DollarSign,
  Calendar,
  Clock,
  Flag,
  Zap,
  TrendingDown,
  Activity,
  FileText,
  ChevronRight,
  Lightbulb,
  Sparkles
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
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
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { KPIGauge } from "../performance/KPIGauge";
import bannerImage from "figma:asset/2ceb5f3890ecf49940adbd1e2cca8cf7647ce99f.png";

interface ExecutiveDashboardProps {
  onBack: () => void;
  onNavigateToIdeas?: (page: string) => void;
}

// Executive KPIs data
const executiveKPIs = [
  { 
    title: "Overall Strategic Achievement",
    value: "87%",
    change: "+5.2%",
    trend: "up",
    target: "85%",
    status: "exceeding"
  },
  { 
    title: "Revenue Performance",
    value: "AED 2.4B",
    change: "+12.3%",
    trend: "up",
    target: "AED 2.2B",
    status: "exceeding"
  },
  { 
    title: "Customer Satisfaction",
    value: "94.2%",
    change: "+3.1%",
    trend: "up",
    target: "92%",
    status: "exceeding"
  },
  { 
    title: "Operational Efficiency",
    value: "91%",
    change: "-1.2%",
    trend: "down",
    target: "93%",
    status: "below"
  }
];

// Strategic objectives status
const strategicObjectives = [
  {
    id: 1,
    theme: "Digital Transformation",
    objective: "Implement AI-powered customs clearance",
    owner: "IT Division",
    progress: 85,
    status: "on-track",
    dueDate: "Q4 2025",
    color: "#115E67"
  },
  {
    id: 2,
    theme: "Customer Excellence",
    objective: "Achieve 95% customer satisfaction",
    owner: "Customer Service",
    progress: 94,
    status: "on-track",
    dueDate: "Q3 2025",
    color: "#386992"
  },
  {
    id: 3,
    theme: "Operational Excellence",
    objective: "Reduce processing time by 30%",
    owner: "Operations Division",
    progress: 72,
    status: "at-risk",
    dueDate: "Q4 2025",
    color: "#BB9956"
  },
  {
    id: 4,
    theme: "Innovation & Growth",
    objective: "Launch 5 new digital services",
    owner: "Innovation Team",
    progress: 60,
    status: "at-risk",
    dueDate: "Q2 2026",
    color: "#B94700"
  }
];

// Balanced Scorecard perspectives performance
const perspectivesData = [
  { perspective: "Financial", score: 88, target: 85 },
  { perspective: "Customer", score: 92, target: 90 },
  { perspective: "Internal", score: 85, target: 88 },
  { perspective: "Learning", score: 83, target: 85 }
];

// Division performance comparison
const divisionPerformance = [
  { division: "Customs Development", q1: 85, q2: 88, q3: 87, q4: 90 },
  { division: "Customs Inspection", q1: 87, q2: 89, q3: 92, q4: 94 },
  { division: "Finance & Admin", q1: 83, q2: 81, q3: 84, q4: 86 },
  { division: "Human Resources", q1: 82, q2: 85, q3: 87, q4: 88 },
  { division: "Director General", q1: 89, q2: 91, q3: 90, q4: 93 },
  { division: "Policy & Legislation", q1: 84, q2: 86, q3: 88, q4: 91 }
];

// Risk register
const risks = [
  {
    id: 1,
    title: "Budget Constraints",
    impact: "High",
    probability: "Medium",
    severity: "high",
    mitigation: "Prioritize critical initiatives",
    owner: "Finance Division"
  },
  {
    id: 2,
    title: "Technology Integration Delays",
    impact: "Medium",
    probability: "Medium",
    severity: "medium",
    mitigation: "Enhanced vendor management",
    owner: "IT Division"
  },
  {
    id: 3,
    title: "Regulatory Changes",
    impact: "Medium",
    probability: "Low",
    severity: "low",
    mitigation: "Continuous monitoring",
    owner: "Policy Division"
  }
];

const COLORS = ['#008755', '#00B0AA', '#BB9956', '#115E67'];

export function ExecutiveDashboard({ onBack, onNavigateToIdeas }: ExecutiveDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("2025");
  const [selectedView, setSelectedView] = useState("overview");
  const [selectedObjective, setSelectedObjective] = useState<number | null>(null);

  return (
    <div className="h-full overflow-auto">
      <div className="space-y-4 p-4">
        {/* Hero Banner */}
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
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h1 className="text-xl font-['Dubai:Medium',_'Dubai'] mb-0.5">
                      Executive Dashboard
                    </h1>
                    <p className="text-white/90 text-sm">
                      Strategic performance overview for Dubai Customs leadership
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-[140px] border-white bg-transparent text-white hover:bg-white/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Active Initiatives */}
          <Card className="rounded-xl">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-3">
                <div className="h-10 w-10 rounded-lg bg-[#008755]/10 flex items-center justify-center text-[#008755]">
                  <Target className="h-5 w-5" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Active Initiatives</p>
              <p className="text-3xl font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2">152</p>
              <p className="text-xs text-muted-foreground mt-2">Ongoing performance initiatives</p>
            </CardContent>
          </Card>

          {/* Total Budget Allocated */}
          <Card className="rounded-xl">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-3">
                <div className="h-10 w-10 rounded-lg bg-[#008755]/10 flex items-center justify-center text-[#008755]">
                  <DollarSign className="h-5 w-5" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Total Budget Allocated (AED)</p>
              <p className="text-3xl font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2">500M</p>
              <p className="text-xs text-muted-foreground mt-2">Annual performance programs budget</p>
            </CardContent>
          </Card>

          {/* Total Budget Spent */}
          <Card className="rounded-xl">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-3">
                <div className="h-10 w-10 rounded-lg bg-[#008755]/10 flex items-center justify-center text-[#008755]">
                  <Activity className="h-5 w-5" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Total Budget Spent (AED)</p>
              <p className="text-3xl font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2">320M</p>
              <p className="text-xs text-muted-foreground mt-2">Spent across operational and strategic projects</p>
            </CardContent>
          </Card>

          {/* Budget Utilization */}
          <Card className="rounded-xl">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-3">
                <div className="h-10 w-10 rounded-lg bg-[#008755]/10 flex items-center justify-center text-[#008755]">
                  <BarChart3 className="h-5 w-5" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Budget Utilization (%)</p>
              <p className="text-3xl font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2">64%</p>
              <p className="text-xs text-muted-foreground mt-2">Percentage of allocated funds utilized</p>
              <Progress value={64} className="h-2 mt-1" />
            </CardContent>
          </Card>
        </div>

        {/* Objectives and Projects Section */}
        <Card>
          <CardHeader>
            <CardTitle className="font-['Dubai:Medium',_'Dubai']">Strategic Objectives & Projects</CardTitle>
            <CardDescription>Click on an objective to view related projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Strategic Objectives */}
              <div>
                <h3 className="font-['Dubai:Medium',_'Dubai'] text-sm text-muted-foreground mb-4">Strategic Objectives</h3>
                <div className="space-y-3">
                  {[
                    { id: 0, title: "Enhance customs operations through innovation and smart systems", progress: 87 },
                    { id: 1, title: "Improve trade facilitation and reduce clearance time", progress: 92 },
                    { id: 2, title: "Strengthen compliance and border security measures", progress: 78 },
                    { id: 3, title: "Develop human capital and performance culture", progress: 85 },
                    { id: 4, title: "Support sustainability and digital transformation initiatives", progress: 73 }
                  ].map((objective) => (
                    <button
                      key={objective.id}
                      onClick={() => setSelectedObjective(objective.id)}
                      className={`w-full flex items-start gap-3 p-3 rounded-lg border-2 transition-all text-left ${
                        selectedObjective === objective.id 
                          ? 'border-[#008755] bg-[#008755]/5' 
                          : 'border-transparent bg-gray-50 hover:border-gray-200'
                      }`}
                    >
                      <div className="flex-shrink-0 w-14 pt-1">
                        <div className="text-right">
                          <div 
                            className="font-['Dubai:Medium',_'Dubai']"
                            style={{ 
                              color: objective.progress >= 80 ? '#357743' : 
                                     objective.progress >= 60 ? '#F2A200' : '#D83731' 
                            }}
                          >
                            {objective.progress}%
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm mb-2">{objective.title}</p>
                        <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="absolute left-0 top-0 h-full rounded-full transition-all"
                            style={{ 
                              width: `${objective.progress}%`,
                              backgroundColor: objective.progress >= 80 ? '#357743' : 
                                             objective.progress >= 60 ? '#F2A200' : '#D83731'
                            }}
                          />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column - Projects Table */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-['Dubai:Medium',_'Dubai'] text-sm text-muted-foreground">
                    Related Projects
                  </h3>
                  {selectedObjective !== null && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedObjective(null)}
                      className="text-xs"
                    >
                      Show All
                    </Button>
                  )}
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Completion</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(() => {
                        const allProjects = [
                          { 
                            objectiveId: 0,
                            title: "Smart Customs Platform", 
                            department: "Customs Technology Department", 
                            startDate: "10 Jan 24", 
                            endDate: "30 Dec 25", 
                            completion: 75 
                          },
                          { 
                            objectiveId: 0,
                            title: "AI-Powered Risk Assessment", 
                            department: "Innovation Department", 
                            startDate: "15 Mar 24", 
                            endDate: "20 Nov 25", 
                            completion: 82 
                          },
                          { 
                            objectiveId: 1,
                            title: "Express Clearance Program", 
                            department: "Trade Facilitation Division", 
                            startDate: "01 Feb 24", 
                            endDate: "31 Dec 24", 
                            completion: 95 
                          },
                          { 
                            objectiveId: 1,
                            title: "Digital Documentation System", 
                            department: "Operations Department", 
                            startDate: "10 Apr 24", 
                            endDate: "15 Dec 25", 
                            completion: 68 
                          },
                          { 
                            objectiveId: 2,
                            title: "Risk Assessment Automation", 
                            department: "Compliance & Risk Management", 
                            startDate: "12 Mar 23", 
                            endDate: "30 Sep 25", 
                            completion: 90 
                          },
                          { 
                            objectiveId: 2,
                            title: "Smart Border Management", 
                            department: "Border Operations Department", 
                            startDate: "15 May 23", 
                            endDate: "30 Dec 25", 
                            completion: 45 
                          },
                          { 
                            objectiveId: 3,
                            title: "Employee Performance Portal", 
                            department: "Human Capital Department", 
                            startDate: "01 Jun 24", 
                            endDate: "31 May 25", 
                            completion: 60 
                          },
                          { 
                            objectiveId: 3,
                            title: "Leadership Development Program", 
                            department: "Human Resources Division", 
                            startDate: "20 Jan 24", 
                            endDate: "20 Dec 25", 
                            completion: 78 
                          },
                          { 
                            objectiveId: 4,
                            title: "Green Customs Initiative", 
                            department: "Sustainability Division", 
                            startDate: "05 Feb 24", 
                            endDate: "15 Nov 25", 
                            completion: 40 
                          },
                          { 
                            objectiveId: 4,
                            title: "Digital Transformation Roadmap", 
                            department: "Digital Strategy Department", 
                            startDate: "08 Mar 24", 
                            endDate: "28 Feb 26", 
                            completion: 55 
                          }
                        ];
                        
                        const filteredProjects = selectedObjective !== null 
                          ? allProjects.filter(p => p.objectiveId === selectedObjective)
                          : allProjects.slice(0, 5);
                        
                        return filteredProjects.map((project, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="font-['Dubai:Medium',_'Dubai']">{project.title}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">{project.department}</TableCell>
                            <TableCell className="text-sm">{project.startDate}</TableCell>
                            <TableCell className="text-sm">{project.endDate}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="flex-1 min-w-[60px]">
                                  <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div 
                                      className="absolute left-0 top-0 h-full rounded-full"
                                      style={{ 
                                        width: `${project.completion}%`,
                                        backgroundColor: project.completion >= 80 ? '#357743' : 
                                                       project.completion >= 60 ? '#F2A200' : '#D83731'
                                      }}
                                    />
                                  </div>
                                </div>
                                <span className="text-sm font-['Dubai:Medium',_'Dubai'] min-w-[35px]">
                                  {project.completion}%
                                </span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ));
                      })()}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#357743' }} />
                      <span>Completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#F2A200' }} />
                      <span>In Progress</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#D83731' }} />
                      <span>Delayed</span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {selectedObjective !== null ? `Showing ${(() => {
                      const allProjects = [
                        { objectiveId: 0 }, { objectiveId: 0 }, { objectiveId: 1 }, { objectiveId: 1 },
                        { objectiveId: 2 }, { objectiveId: 2 }, { objectiveId: 3 }, { objectiveId: 3 },
                        { objectiveId: 4 }, { objectiveId: 4 }
                      ];
                      return allProjects.filter(p => p.objectiveId === selectedObjective).length;
                    })()} projects` : 'Page 1 of 10'}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KPI Results Section */}
        <Card>
          <CardHeader>
            <CardTitle className="font-['Dubai:Medium',_'Dubai']">KPI Results Overview</CardTitle>
            <CardDescription>Top and bottom performing KPIs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Top 2 KPIs */}
              <div className="border rounded-lg p-4">
                <div className="flex flex-col items-center">
                  <KPIGauge achievement={87} status="green" size="md" />
                  <div className="text-center mt-4">
                    <p className="font-['Dubai:Medium',_'Dubai'] mb-1">Average Customs Clearance Time Reduction</p>
                    <p className="text-2xl font-['Dubai:Medium',_'Dubai']" style={{ color: '#357743' }}>87%</p>
                    <p className="text-xs text-muted-foreground">Achieved</p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex flex-col items-center">
                  <KPIGauge achievement={92} status="green" size="md" />
                  <div className="text-center mt-4">
                    <p className="font-['Dubai:Medium',_'Dubai'] mb-1">Trade Partner Satisfaction Index</p>
                    <p className="text-2xl font-['Dubai:Medium',_'Dubai']" style={{ color: '#357743' }}>92%</p>
                    <p className="text-xs text-muted-foreground">Achieved</p>
                  </div>
                </div>
              </div>

              {/* Bottom 2 KPIs */}
              <div className="border rounded-lg p-4">
                <div className="flex flex-col items-center">
                  <KPIGauge achievement={63} status="amber" size="md" />
                  <div className="text-center mt-4">
                    <p className="font-['Dubai:Medium',_'Dubai'] mb-1">Employee Performance Completion Rate</p>
                    <p className="text-2xl font-['Dubai:Medium',_'Dubai']" style={{ color: '#F2A200' }}>63%</p>
                    <p className="text-xs text-muted-foreground">Achieved</p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex flex-col items-center">
                  <KPIGauge achievement={58} status="amber" size="md" />
                  <div className="text-center mt-4">
                    <p className="font-['Dubai:Medium',_'Dubai'] mb-1">Digital Transformation Adoption</p>
                    <p className="text-2xl font-['Dubai:Medium',_'Dubai']" style={{ color: '#F2A200' }}>58%</p>
                    <p className="text-xs text-muted-foreground">Achieved</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Innovation Pulse */}
        <Card className="border border-[#008755]/30 bg-gradient-to-r from-[#008755]/5 to-transparent">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-[#008755]/10 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="h-5 w-5 text-[#008755]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-['Dubai:Medium',_sans-serif] text-sm text-foreground">Innovation Pulse</p>
                    <span className="flex items-center gap-1 text-[10px] bg-[#26D07C]/15 text-[#005844] rounded-full px-2 py-0.5">
                      <Sparkles className="h-3 w-3" /> Live
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Ideas Platform — Q2 2025</p>
                </div>
              </div>
              <div className="flex items-center gap-6 flex-wrap">
                <div className="text-center">
                  <p className="text-2xl font-['Dubai:Medium',_sans-serif] text-[#008755]">77</p>
                  <p className="text-[11px] text-muted-foreground">Ideas Submitted</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-['Dubai:Medium',_sans-serif] text-[#008755]">3</p>
                  <p className="text-[11px] text-muted-foreground">Implemented</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-['Dubai:Medium',_sans-serif] text-foreground">94</p>
                  <p className="text-[11px] text-muted-foreground">Top Dept Score</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-['Dubai:Medium',_sans-serif] text-foreground">Digital Transformation</p>
                  <p className="text-[11px] text-muted-foreground">Leading Department</p>
                </div>
                {onNavigateToIdeas && (
                  <Button
                    size="sm"
                    onClick={() => onNavigateToIdeas('insights')}
                    className="bg-[#008755] hover:bg-[#005844] text-white gap-1.5 text-xs"
                  >
                    View Innovation Insights <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}