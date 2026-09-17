import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  FolderKanban,
  AlertTriangle,
  DollarSign,
  CheckCircle2,
  Target,
  ChevronDown,
  ArrowLeft,
  Filter,
  Search,
  MoreVertical,
  Clock,
  Briefcase,
  Shield,
  Activity,
  HelpCircle,
  Download,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import bannerImage from "figma:asset/2ceb5f3890ecf49940adbd1e2cca8cf7647ce99f.png";
import { ProjectsListPage } from "./ProjectsListPage";

interface PortfolioDashboardPageProps {
  onBack: () => void;
  onCreateProject?: () => void;
}

export function PortfolioDashboardPage({
  onBack,
  onCreateProject,
}: PortfolioDashboardPageProps) {
  const [activeView, setActiveView] = useState<
    "dashboard" | "projects-list"
  >("dashboard");

  if (activeView === "projects-list") {
    return (
      <ProjectsListPage
        onBack={() => setActiveView("dashboard")}
      />
    );
  }

  // ── Data ──────────────────────────────────────────────────────────────────

  const executiveKPIs = [
    {
      title: "Total Projects",
      value: "57",
      trend: "+8%",
      isPositive: true,
      icon: <FolderKanban className="h-5 w-5" />,
    },
    {
      title: "Active Projects",
      value: "45",
      trend: "+12%",
      isPositive: true,
      icon: <Activity className="h-5 w-5" />,
    },
    {
      title: "Support Needed",
      value: "8",
      trend: "-3%",
      isPositive: true,
      icon: <AlertTriangle className="h-5 w-5" />,
    },
    {
      title: "Strategic Alignment",
      value: "91%",
      trend: "+6%",
      isPositive: true,
      icon: <Target className="h-5 w-5" />,
    },
  ];

  const projectStatusData = [
    { name: "On Track", value: 45, color: "#357743" },
    { name: "At Risk", value: 8, color: "#F2A200" },
    { name: "Delayed", value: 4, color: "#D83731" },
  ];

  const budgetData = [
    {
      category: "Strategic",
      planned: 15000000,
      actual: 13500000,
    },
    {
      category: "Operational",
      planned: 12000000,
      actual: 11800000,
    },
    {
      category: "Innovation",
      planned: 8000000,
      actual: 7200000,
    },
    {
      category: "Compliance",
      planned: 6000000,
      actual: 5900000,
    },
  ];

  const strategicPillars = [
    {
      pillar: "Innovation Excellence",
      objectives: 4,
      projects: 18,
      completion: 75,
      color: "#008755",
    },
    {
      pillar: "Operational Excellence",
      objectives: 6,
      projects: 22,
      completion: 82,
      color: "#BB9956",
    },
    {
      pillar: "Customer Excellence",
      objectives: 3,
      projects: 12,
      completion: 68,
      color: "#00B0AA",
    },
    {
      pillar: "Strategic Partnerships",
      objectives: 2,
      projects: 5,
      completion: 90,
      color: "#005844",
    },
  ];

  const overdueMilestones = [
    {
      project: "Smart Trade 2030",
      milestone: "Phase 2 Kickoff",
      overdue: "5 days",
    },
    {
      project: "Digital Customs Platform",
      milestone: "UAT Completion",
      overdue: "3 days",
    },
    {
      project: "AI Risk Assessment",
      milestone: "Data Migration",
      overdue: "2 days",
    },
    {
      project: "Blockchain Integration",
      milestone: "Security Audit",
      overdue: "1 day",
    },
    {
      project: "Mobile App Redesign",
      milestone: "Beta Release",
      overdue: "1 day",
    },
  ];

  const upcomingMilestones = [
    {
      project: "Smart Trade 2030",
      milestone: "Integration Testing",
      dueIn: "3 days",
    },
    {
      project: "Cloud Migration",
      milestone: "Infrastructure Setup",
      dueIn: "5 days",
    },
    {
      project: "Digital Customs Platform",
      milestone: "Production Deployment",
      dueIn: "1 week",
    },
    {
      project: "Blockchain Integration",
      milestone: "Stakeholder Review",
      dueIn: "1 week",
    },
    {
      project: "Customer Portal v2",
      milestone: "Design Approval",
      dueIn: "10 days",
    },
  ];

  const epmoSupportRequests = [
    {
      id: "SR-2024-087",
      project: "Smart Trade 2030",
      requestType: "Budget Adjustment",
      priority: "High",
      daysOpen: 5,
    },
    {
      id: "SR-2024-091",
      project: "Digital Customs Platform",
      requestType: "Resource Allocation",
      priority: "Critical",
      daysOpen: 8,
    },
    {
      id: "SR-2024-103",
      project: "AI Risk Assessment",
      requestType: "Scope Change",
      priority: "Medium",
      daysOpen: 3,
    },
    {
      id: "SR-2024-115",
      project: "Blockchain Integration",
      requestType: "Timeline Extension",
      priority: "High",
      daysOpen: 6,
    },
    {
      id: "SR-2024-120",
      project: "Mobile App Redesign",
      requestType: "Technical Support",
      priority: "Medium",
      daysOpen: 2,
    },
  ];

  const programData = [
    {
      projectType: "Impact Assessment",
      projects: 15,
      completion: 68,
      escalations: 5,
      health: "Good",
    },
    {
      projectType: "Digital Solutions",
      projects: 18,
      completion: 55,
      escalations: 0,
      health: "At Risk",
    },
    {
      projectType: "Strategy",
      projects: 12,
      completion: 82,
      escalations: 2,
      health: "Excellent",
    },
    {
      projectType: "New Services",
      projects: 8,
      completion: 91,
      escalations: 1,
      health: "Excellent",
    },
  ];

  // ── Derived values ─────────────────────────────────────────────────────────

  const totalPlanned = budgetData.reduce(
    (s, i) => s + i.planned,
    0,
  );
  const totalActual = budgetData.reduce(
    (s, i) => s + i.actual,
    0,
  );
  const utilization = Math.round(
    (totalActual / totalPlanned) * 100,
  );

  const getHealthColor = (health: string) => {
    switch (health) {
      case "Excellent":
        return "#357743";
      case "Good":
        return "#008755";
      case "At Risk":
        return "#F2A200";
      case "Critical":
        return "#D83731";
      default:
        return "#6b7280";
    }
  };

  const getPriorityColors = (priority: string) => {
    switch (priority) {
      case "Critical":
        return { bg: "#D8373720", text: "#D83731" };
      case "High":
        return { bg: "#F2A20020", text: "#F2A200" };
      default:
        return { bg: "#00875520", text: "#008755" };
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="h-full overflow-auto bg-gray-50/50">
      <div className="space-y-4 p-4">
        {/* ── HERO BANNER ── */}
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
                <div className="flex items-center gap-3 mb-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onBack}
                    className="text-white hover:bg-white/20 -ml-2"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back
                  </Button>
                  <div className="h-12 w-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <div>
                    <h1 className="text-xl   mb-1">
                      Portfolio Dashboard
                    </h1>
                    <p className="text-white/90 text-sm">
                      Executive Overview - All Programs &
                      Projects
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white bg-transparent text-white hover:bg-white/10 hover:text-white"
                  onClick={() => setActiveView("projects-list")}
                >
                  <FolderKanban className="h-4 w-4 mr-2" />
                  Projects List
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white bg-transparent text-white hover:bg-white/10 hover:text-white"
                  onClick={onCreateProject}
                >
                  <Activity className="h-4 w-4 mr-2" />
                  Create Project
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── SECTION 1 · EXECUTIVE KPIs ── */}
        <section>
          <h2 className="text-base font-semibold text-[#1f2937] mb-2">
            Executive KPIs
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {executiveKPIs.map((kpi, i) => (
              <Card key={i}>
                <CardContent className="!px-5 !py-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-9 w-9 rounded-lg bg-[#008755]/10 flex items-center justify-center text-[#008755]">
                      {kpi.icon}
                    </div>
                    <span
                      className={`text-xs font-medium ${kpi.isPositive ? "text-[#357743]" : "text-[#D83731]"}`}
                    >
                      {kpi.trend}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-[#1f2937] leading-none mb-1">
                    {kpi.value}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {kpi.title}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ── SECTION 2 · PORTFOLIO HEALTH OVERVIEW ── */}
        <section>
          <h2 className="text-base font-semibold text-[#1f2937] mb-2">
            Portfolio Health Overview
          </h2>

          {/* Row A: 3 equal columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            {/* Project Status Distribution */}
            <Card className="flex flex-col">
              <CardHeader className="!px-5 pt-4 pb-0">
                <CardTitle className="font-['Dubai:Medium',_'Dubai'] text-base">
                  Project Status Distribution
                </CardTitle>
                <CardDescription className="text-xs">
                  Current project health status
                </CardDescription>
              </CardHeader>
              <CardContent className="!px-5 !pb-4 flex-1 flex flex-col justify-between">
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie
                      data={projectStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {projectStatusData.map((entry, index) => (
                        <Cell
                          key={`status-cell-${index}`}
                          fill={entry.color}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-1.5 mt-2">
                  {projectStatusData.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="h-2.5 w-2.5 rounded-sm"
                          style={{
                            backgroundColor: item.color,
                          }}
                        />
                        <span className="text-muted-foreground">
                          {item.name}
                        </span>
                      </div>
                      <span className="font-semibold text-[#1f2937]">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Budget Performance */}
            <Card className="flex flex-col">
              <CardHeader className="!px-5 pt-4 pb-0">
                <CardTitle className="font-['Dubai:Medium',_'Dubai'] text-base">
                  Budget Performance
                </CardTitle>
                <CardDescription className="text-xs">
                  Portfolio budget utilization overview
                </CardDescription>
              </CardHeader>
              <CardContent className="!px-5 !pb-4 flex-1 flex flex-col">
                {/* Summary pills */}
                <div className="relative w-[160px] h-[160px] mx-auto my-4">
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <PieChart>
                      <Pie
                        data={[
                          {
                            name: "Spent",
                            value: totalActual,
                            fill: "#008755",
                          },
                          {
                            name: "Remaining",
                            value: totalPlanned - totalActual,
                            fill: "#E5E7EB",
                          },
                        ]}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={52}
                        outerRadius={72}
                        startAngle={90}
                        endAngle={-270}
                        paddingAngle={0}
                      >
                        <Cell key="budget-spent" fill="#008755" />
                        <Cell key="budget-remaining" fill="#E5E7EB" />
                      </Pie>
                      <Tooltip
                        formatter={(v: number) =>
                          `AED ${(v / 1e6).toFixed(1)}M`
                        }
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Center label */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-xl font-bold text-[#1f2937] leading-none">
                      {utilization}%
                    </span>
                    <span className="text-[10px] text-muted-foreground mt-0.5">
                      utilized
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {[
                    {
                      label: "Allocated",
                      value: `AED ${(totalPlanned / 1e6).toFixed(1)}M`,
                      color: "#1f2937",
                    },
                    {
                      label: "Spent",
                      value: `AED ${(totalActual / 1e6).toFixed(1)}M`,
                      color: "#008755",
                    },
                    {
                      label: "Remaining",
                      value: `AED ${((totalPlanned - totalActual) / 1e6).toFixed(1)}M`,
                      color: "#357743",
                    },
                  ].map(({ label, value, color }) => (
                    <div
                      key={label}
                      className="rounded-lg bg-muted/40 py-3 px-2 text-center"
                    >
                      <p className="text-[10px] text-muted-foreground mb-1">
                        {label}
                      </p>
                      <p
                        className="text-xs font-semibold"
                        style={{ color }}
                      >
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

               
                

                

                {/* Total bar */}
                {/* <div className="mt-4">
                  <div className="h-2 w-full rounded-full bg-[#E5E7EB] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#005844]"
                      style={{ width: `${utilization}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1.5">
                    <span className="text-[10px] text-muted-foreground">
                      {utilization}% total utilized
                    </span>
                    <span className="text-[10px] font-medium text-[#1f2937]">
                      AED{" "}
                      {(
                        (totalPlanned - totalActual) /
                        1e6
                      ).toFixed(1)}
                      M remaining
                    </span>
                  </div>
                </div> */}
              </CardContent>
            </Card>

            {/* EPMO Support Requests */}
            <Card className="flex flex-col">
              <CardHeader className="!px-5 pt-4 pb-0">
                <CardTitle className="font-['Dubai:Medium',_'Dubai'] text-base">
                  EPMO Support Requests
                </CardTitle>
                <CardDescription className="text-xs">
                  Open support requests across all projects
                </CardDescription>
              </CardHeader>
              <CardContent className="!px-5 !pb-4 flex-1">
                <div className="space-y-2 max-h-[290px] overflow-y-auto">
                  {epmoSupportRequests.map((req, i) => {
                    const { bg, text } = getPriorityColors(
                      req.priority,
                    );
                    return (
                      <div
                        key={i}
                        className="p-2.5 rounded-lg border bg-background hover:bg-accent/50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex items-center gap-1.5">
                            <HelpCircle className="h-3.5 w-3.5 text-[#008755] shrink-0" />
                            <span className="text-[10px] font-semibold text-[#1f2937]">
                              {req.id}
                            </span>
                          </div>
                          <Badge
                            className="text-[9px] h-4 px-1.5 font-medium"
                            style={{
                              backgroundColor: bg,
                              color: text,
                            }}
                          >
                            {req.priority}
                          </Badge>
                        </div>
                        <p className="text-xs font-medium text-[#1f2937] leading-snug">
                          {req.project}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          {req.requestType}
                        </p>
                        <div className="flex items-center gap-1 mt-1.5">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-[10px] text-muted-foreground">
                            Open for {req.daysOpen} days
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Row B: Strategic Alignment Map — full width */}
          <Card className="col-span-3 ">
            <CardHeader className="!px-4 pt-3">
              <CardTitle className="font-['Dubai:Medium',_'Dubai'] text-base">
                Strategic Alignment Map
              </CardTitle>
            </CardHeader>
            <CardContent className="!px-4 !pb-2">
              <div className="space-y-3 max-h-[320px] grid md:grid-cols-4 gap-3 overflow-y-auto">
                {strategicPillars.map((pillar, index) => (
                  <div
                    key={index}
                    className="p-2.5 rounded-lg border bg-background hover:bg-accent transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-8 w-8 rounded-lg flex items-center justify-center text-white"
                          style={{
                            backgroundColor: pillar.color,
                          }}
                        >
                          <Target className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] text-xs leading-tight">
                            {pillar.pillar}
                          </h3>
                          <p className="text-[10px] text-muted-foreground">
                            {pillar.projects} Projects
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ── SECTION 3 · PROJECTS SUMMARY + MILESTONES ── */}
        <section>
          <h2 className="text-base font-semibold text-[#1f2937] mb-2">
            Projects Summary &amp; Milestones
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {/* Projects Summary Table — 2 cols */}
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader className="!px-5 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="font-['Dubai:Medium',_'Dubai'] text-base">
                        Project Types Overview
                      </CardTitle>
                      <CardDescription className="text-xs mt-0.5">
                        Overview of projects categorized by
                        type, including progress and health
                        status.
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                        <Input
                          placeholder="Search project..."
                          className="pl-8 h-8 w-[180px] text-xs"
                        />
                      </div>
                      <button
                        className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md border border-border bg-background text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                        onClick={() => {}}
                      >
                        <Download className="h-3.5 w-3.5" />
                        Export
                      </button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="!px-5 !pb-5">
                  <div className="rounded-lg border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/40">
                          <TableHead className="text-xs font-semibold">
                            Project Type
                          </TableHead>
                          <TableHead className="text-xs font-semibold">
                            Projects
                          </TableHead>
                          <TableHead className="text-xs font-semibold">
                            Completion
                          </TableHead>
                          <TableHead className="text-xs font-semibold">
                            Escalations
                          </TableHead>
                          <TableHead className="text-xs font-semibold">
                            Health
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {programData.map((program, i) => (
                          <TableRow
                            key={i}
                            className="hover:bg-accent/30"
                          >
                            <TableCell className="text-xs font-medium">
                              {program.projectType}
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground">
                              {program.projects}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="h-1.5 w-20 rounded-full bg-[#E5E7EB] overflow-hidden">
                                  <div
                                    className="h-full rounded-full bg-[#008755]"
                                    style={{
                                      width: `${program.completion}%`,
                                    }}
                                  />
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {program.completion}%
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground">
                              {program.escalations}
                            </TableCell>
                            <TableCell>
                              <Badge
                                className="text-[10px] h-5 px-2 font-medium"
                                style={{
                                  backgroundColor: `${getHealthColor(program.health)}18`,
                                  color: getHealthColor(
                                    program.health,
                                  ),
                                }}
                              >
                                {program.health}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Milestones — 1 col */}
            <div className="lg:col-span-1">
              <Card className="">
                <CardHeader className="!px-5 pt-4 pb-0">
                  <CardTitle className="font-['Dubai:Medium',_'Dubai'] text-base">
                    Milestones
                  </CardTitle>
                </CardHeader>
                <CardContent className="!px-5 !pb-5 !pt-0">
                  <div className="space-y-4 max-h-[260px] overflow-y-auto pr-1">
                    {/* Overdue */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-3.5 w-3.5 text-[#D83731]" />
                        <span className="text-xs font-semibold text-[#D83731]">
                          Overdue Milestones
                        </span>
                      </div>
                      <div className="space-y-2">
                        {overdueMilestones.map(
                          (item, index) => (
                            <div
                              key={index}
                              className="text-xs p-2 rounded border bg-background"
                            >
                              <p className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-1">
                                {item.project}
                              </p>
                              <p className="text-muted-foreground mb-1">
                                {item.milestone}
                              </p>
                              <Badge
                                variant="destructive"
                                className="text-[10px] h-5"
                              >
                                {item.overdue} overdue
                              </Badge>
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t" />

                    {/* Upcoming */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-3.5 w-3.5 text-[#008755]" />
                        <span className="text-xs font-semibold text-[#008755]">
                          Upcoming Milestones
                        </span>
                      </div>
                      <div className="space-y-2">
                        {upcomingMilestones.map(
                          (item, index) => (
                            <div
                              key={index}
                              className="text-xs p-2 rounded border bg-background"
                            >
                              <p className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-1">
                                {item.project}
                              </p>
                              <p className="text-muted-foreground mb-1">
                                {item.milestone}
                              </p>
                              <Badge
                                style={{
                                  backgroundColor:
                                    item.dueIn.includes("day")
                                      ? "#F2A20020"
                                      : "#00875520",
                                  color: item.dueIn.includes(
                                    "day",
                                  )
                                    ? "#F2A200"
                                    : "#008755",
                                }}
                                className="text-[10px] h-5"
                              >
                                {item.dueIn}
                              </Badge>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}