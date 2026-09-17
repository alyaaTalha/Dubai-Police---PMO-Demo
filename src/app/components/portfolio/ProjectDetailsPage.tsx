import { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Plus,
  Calendar,
  Clock,
  User,
  UserCheck,
  CircleDot,
  ListChecks,
  ShieldAlert,
  CheckSquare,
  Activity,
  Edit,
  Trash2,
  Eye,
  GripVertical,
  Link2,
  ChevronDown,
  ChevronRight,
  Target,
  FileSearch,
  FileText,
  Monitor,
  TrendingUp,
  Handshake,
  CheckCircle2,
  ListTodo,
  DollarSign,
  AlertTriangle,
  Users,
  Trophy,
  Briefcase,
  BookOpen,
  FolderCheck,
  MessageSquare,
  Sparkles,
  ChevronUp,
  Brain,
  Lightbulb,
  AlertCircle,
  TrendingDown,
  Zap,
  Info,
  BarChart3,
  FolderKanban,
  RefreshCw,
  X,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import bannerImage from "figma:asset/2ceb5f3890ecf49940adbd1e2cca8cf7647ce99f.png";
import { KanbanView, GanttView } from "./MilestoneViews";
import {
  CostManagementTab,
  RiskRegisterTab,
  StakeholdersTab,
  GoalsBenefitsTab,
  ResourcesTab,
  LessonsLearnedTab,
  ProjectClosureTab,
  CollaborationTab,
} from "./ProjectTabsContent";
import { KPIsTab } from "./KPIsTab";
import { BiWeeklyStatusTab } from "./BiWeeklyStatusTab";
import { AddTaskPanel } from "./AddTaskPanel";
import { AddMilestonePanel } from "./AddMilestonePanel";

interface ProjectDetailsPageProps {
  project: {
    id: string;
    name: string;
    lifecycleStatus:
      | "Draft"
      | "Application"
      | "Ongoing"
      | "Closed";
    division:
      | "Customs Development"
      | "Customs Inspection"
      | "Director General Division"
      | "Finance And Administration Affairs"
      | "Human Resources"
      | "Policy & Legislation";
    category: string;
    budget?: string;
    types: string[];
    frameworks?: string[];
    owner: string;
    completion: number;
    budgetHealth: "Good" | "Warning" | "Critical";
    riskLevel: "Low" | "Medium" | "High";
    timeline: string;
    section: string;
    strategicPillar: string;
  };
  onBack: () => void;
  initialTab?: TabKey;
  initialReportId?: number;
}

const projectTypeConfig: Record<
  string,
  { icon: JSX.Element; color: string }
> = {
  Strategies: {
    icon: <Target className="h-3 w-3" />,
    color: "#008755",
  },
  "Impact Assessment": {
    icon: <FileSearch className="h-3 w-3" />,
    color: "#BB9956",
  },
  "Digital Solutions": {
    icon: <Monitor className="h-3 w-3" />,
    color: "#00B0AA",
  },
  "New Services": {
    icon: <TrendingUp className="h-3 w-3" />,
    color: "#357743",
  },
  "External Engagement": {
    icon: <Handshake className="h-3 w-3" />,
    color: "#FFBE9F",
  },
};

type TabKey =
  | "overview"
  | "milestones"
  | "cost"
  | "risk"
  | "stakeholders"
  | "goals"
  | "kpis"
  | "resources"
  | "closure"
  | "documents"
  | "biweekly"
  | "change-management";

export function ProjectDetailsPage({
  project,
  onBack,
  initialTab,
  initialReportId,
}: ProjectDetailsPageProps) {
  const [activeTab, setActiveTab] = useState<TabKey>(
    initialTab || "overview",
  );
  const [milestoneView, setMilestoneView] = useState<
    "Tasks" | "Kanban" | "Gantt" | "Deliverables"
  >("Tasks");
  const [ownerFilter, setOwnerFilter] = useState<string>("all");
  const [expandedMilestones, setExpandedMilestones] = useState<
    string[]
  >(["M1", "M2"]);
  const [expandedTasks, setExpandedTasks] = useState<string[]>(
    [],
  );
  const [aiHealthExpanded, setAiHealthExpanded] =
    useState<boolean>(true);
  const [projectDetailsExpanded, setProjectDetailsExpanded] =
    useState<boolean>(false);
  const [showAddTaskPanel, setShowAddTaskPanel] =
    useState<boolean>(false);
  const [showAddMilestonePanel, setShowAddMilestonePanel] =
    useState<boolean>(false);
  const [
    selectedMilestoneForTask,
    setSelectedMilestoneForTask,
  ] = useState<string>("");
  const [showAddChangePanel, setShowAddChangePanel] =
    useState<boolean>(false);
  const [impactAssessments, setImpactAssessments] = useState<
    Array<{ id: string; impactType: string; details: string; preChange: string; postChange: string }>
  >([{ id: "1", impactType: "", details: "", preChange: "", postChange: "" }]);

  const getLifecycleColor = (status: string) => {
    switch (status) {
      case "Draft":
        return "bg-gray-500";
      case "Application":
        return "bg-[#008755]";
      case "Ongoing":
        return "bg-[#357743]";
      case "Closed":
        return "bg-gray-700";
      default:
        return "bg-gray-500";
    }
  };

  const getBudgetColor = (health: string) => {
    switch (health) {
      case "Good":
        return "#357743";
      case "Warning":
        return "#F2A200";
      case "Critical":
        return "#D83731";
      default:
        return "#6b7280";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "#357743";
      case "Medium":
        return "#F2A200";
      case "High":
        return "#D83731";
      default:
        return "#6b7280";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "#D83731";
      case "High":
        return "#FF9800";
      case "Medium":
        return "#F2A200";
      case "Low":
        return "#357743";
      default:
        return "#6b7280";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Complete":
        return "#357743";
      case "In Progress":
        return "#008755";
      case "At Risk":
        return "#F2A200";
      case "Blocked":
        return "#D83731";
      case "Not Started":
        return "#6b7280";
      default:
        return "#6b7280";
    }
  };

  const toggleMilestone = (id: string) => {
    setExpandedMilestones((prev) =>
      prev.includes(id)
        ? prev.filter((m) => m !== id)
        : [...prev, id],
    );
  };

  const toggleTask = (id: string) => {
    setExpandedTasks((prev) =>
      prev.includes(id)
        ? prev.filter((t) => t !== id)
        : [...prev, id],
    );
  };

  const mockMilestones = [
    {
      id: "M1",
      name: "Phase 1: Requirements Gathering",
      status: "Complete",
      completion: 100,
      dueDate: "Feb 15, 2025",
      tasks: [
        {
          id: "T1",
          name: "Stakeholder Interviews",
          owner: "Sarah Ahmed",
          priority: "High",
          progress: 100,
          status: "Complete",
          timeline: "Jan 15 - Jan 25",
          dependencies: "None",
          isOverdue: false,
          subtasks: [
            {
              id: "T1.1",
              name: "Prepare interview questions",
              owner: "Sarah Ahmed",
              priority: "Medium",
              progress: 100,
              status: "Complete",
              timeline: "Jan 15 - Jan 16",
              dependencies: "None",
              isOverdue: false,
            },
            {
              id: "T1.2",
              name: "Conduct stakeholder sessions",
              owner: "Sarah Ahmed",
              priority: "High",
              progress: 100,
              status: "Complete",
              timeline: "Jan 17 - Jan 23",
              dependencies: "T1.1",
              isOverdue: false,
            },
            {
              id: "T1.3",
              name: "Consolidate interview findings",
              owner: "Sarah Ahmed",
              priority: "Medium",
              progress: 100,
              status: "Complete",
              timeline: "Jan 24 - Jan 25",
              dependencies: "T1.2",
              isOverdue: false,
            },
          ],
        },
        {
          id: "T2",
          name: "Requirements Documentation",
          owner: "Ali Hassan",
          priority: "Critical",
          progress: 100,
          status: "Complete",
          timeline: "Jan 26 - Feb 05",
          dependencies: "T1",
          isOverdue: false,
        },
        {
          id: "T3",
          name: "Requirements Approval",
          owner: "Mohammed Ali",
          priority: "High",
          progress: 100,
          status: "Complete",
          timeline: "Feb 06 - Feb 15",
          dependencies: "T2",
          isOverdue: false,
        },
      ],
    },
    {
      id: "M2",
      name: "Phase 2: System Design",
      status: "In Progress",
      completion: 75,
      dueDate: "Mar 30, 2025",
      tasks: [
        {
          id: "T4",
          name: "Architecture Design",
          owner: "Fatima Ibrahim",
          priority: "Critical",
          progress: 100,
          status: "Complete",
          timeline: "Feb 16 - Mar 01",
          dependencies: "M1",
          isOverdue: false,
        },
        {
          id: "T5",
          name: "Database Schema Design",
          owner: "Ahmed Khalil",
          priority: "High",
          progress: 85,
          status: "In Progress",
          timeline: "Mar 02 - Mar 15",
          dependencies: "T4",
          isOverdue: false,
          subtasks: [
            {
              id: "T5.1",
              name: "Entity relationship modeling",
              owner: "Ahmed Khalil",
              priority: "High",
              progress: 100,
              status: "Complete",
              timeline: "Mar 02 - Mar 05",
              dependencies: "None",
              isOverdue: false,
            },
            {
              id: "T5.2",
              name: "Normalize database tables",
              owner: "Ahmed Khalil",
              priority: "High",
              progress: 90,
              status: "In Progress",
              timeline: "Mar 06 - Mar 10",
              dependencies: "T5.1",
              isOverdue: false,
            },
            {
              id: "T5.3",
              name: "Define indexes and constraints",
              owner: "Ahmed Khalil",
              priority: "Medium",
              progress: 65,
              status: "In Progress",
              timeline: "Mar 11 - Mar 15",
              dependencies: "T5.2",
              isOverdue: false,
            },
          ],
        },
        {
          id: "T6",
          name: "UI/UX Design",
          owner: "Layla Mohammed",
          priority: "Medium",
          progress: 90,
          status: "In Progress",
          timeline: "Mar 02 - Mar 20",
          dependencies: "T4",
          isOverdue: false,
        },
        {
          id: "T7",
          name: "Design Review & Approval",
          owner: "Sarah Ahmed",
          priority: "High",
          progress: 30,
          status: "Not Started",
          timeline: "Mar 21 - Mar 30",
          dependencies: "T5, T6",
          isOverdue: false,
        },
      ],
    },
    {
      id: "M3",
      name: "Phase 3: Development",
      status: "At Risk",
      completion: 45,
      dueDate: "Jun 30, 2025",
      tasks: [
        {
          id: "T8",
          name: "Backend Development",
          owner: "Omar Ali",
          priority: "Critical",
          progress: 60,
          status: "In Progress",
          timeline: "Apr 01 - May 15",
          dependencies: "M2",
          isOverdue: false,
          subtasks: [
            {
              id: "T8.1",
              name: "Setup development environment",
              owner: "Omar Ali",
              priority: "Critical",
              progress: 100,
              status: "Complete",
              timeline: "Apr 01 - Apr 03",
              dependencies: "None",
              isOverdue: false,
            },
            {
              id: "T8.2",
              name: "Implement authentication module",
              owner: "Omar Ali",
              priority: "Critical",
              progress: 100,
              status: "Complete",
              timeline: "Apr 04 - Apr 15",
              dependencies: "T8.1",
              isOverdue: false,
            },
            {
              id: "T8.3",
              name: "Develop core business logic",
              owner: "Omar Ali",
              priority: "Critical",
              progress: 75,
              status: "In Progress",
              timeline: "Apr 16 - May 05",
              dependencies: "T8.2",
              isOverdue: false,
            },
            {
              id: "T8.4",
              name: "Integration with external APIs",
              owner: "Omar Ali",
              priority: "High",
              progress: 20,
              status: "In Progress",
              timeline: "May 06 - May 15",
              dependencies: "T8.3",
              isOverdue: false,
            },
          ],
        },
        {
          id: "T9",
          name: "Frontend Development",
          owner: "Noor Hassan",
          priority: "Critical",
          progress: 55,
          status: "At Risk",
          timeline: "Apr 15 - Jun 01",
          dependencies: "T8",
          isOverdue: true,
          subtasks: [
            {
              id: "T9.1",
              name: "Component library setup",
              owner: "Noor Hassan",
              priority: "High",
              progress: 100,
              status: "Complete",
              timeline: "Apr 15 - Apr 20",
              dependencies: "None",
              isOverdue: false,
            },
            {
              id: "T9.2",
              name: "Implement dashboard views",
              owner: "Noor Hassan",
              priority: "Critical",
              progress: 80,
              status: "In Progress",
              timeline: "Apr 21 - May 10",
              dependencies: "T9.1",
              isOverdue: false,
            },
            {
              id: "T9.3",
              name: "User management interface",
              owner: "Noor Hassan",
              priority: "High",
              progress: 40,
              status: "At Risk",
              timeline: "May 11 - May 25",
              dependencies: "T9.2",
              isOverdue: true,
            },
            {
              id: "T9.4",
              name: "Responsive design implementation",
              owner: "Noor Hassan",
              priority: "Medium",
              progress: 10,
              status: "Not Started",
              timeline: "May 26 - Jun 01",
              dependencies: "T9.3",
              isOverdue: false,
            },
          ],
        },
        {
          id: "T10",
          name: "API Integration",
          owner: "Youssef Ahmed",
          priority: "High",
          progress: 20,
          status: "Blocked",
          timeline: "May 16 - Jun 10",
          dependencies: "T8",
          isOverdue: false,
        },
        {
          id: "T11",
          name: "Unit Testing",
          owner: "Maryam Khalil",
          priority: "Medium",
          progress: 10,
          status: "Not Started",
          timeline: "Jun 01 - Jun 20",
          dependencies: "T9, T10",
          isOverdue: false,
        },
      ],
    },
  ];

  // Extract unique owners from all tasks and subtasks
  const uniqueOwners = Array.from(
    new Set(
      mockMilestones.flatMap((milestone) =>
        milestone.tasks.flatMap((task) => [
          task.owner,
          ...(task.subtasks?.map((subtask) => subtask.owner) || []),
        ])
      )
    )
  ).sort();

  // Filter milestones based on owner filter
  const filteredMilestones = ownerFilter === "all"
    ? mockMilestones
    : mockMilestones.map((milestone) => ({
        ...milestone,
        tasks: milestone.tasks.filter((task) => {
          const taskMatches = task.owner === ownerFilter;
          const subtaskMatches = task.subtasks?.some(
            (subtask) => subtask.owner === ownerFilter
          );
          return taskMatches || subtaskMatches;
        }).map((task) => ({
          ...task,
          subtasks: task.subtasks?.filter(
            (subtask) => ownerFilter === "all" || subtask.owner === ownerFilter
          ),
        })),
      })).filter((milestone) => milestone.tasks.length > 0);

  const mockChangeManagementRecords = [
    {
      id: "CM-001",
      rationale: "Stakeholder feedback from Phase 1 review",
      description: "Modify API authentication method to support OAuth 2.0 in addition to existing JWT tokens",
      status: "Completed",
      completedOn: "2025-03-15",
      actionTaken: "Updated authentication module to support multiple auth methods. Conducted security review and updated documentation.",
    },
    {
      id: "CM-002",
      rationale: "Performance optimization requirement",
      description: "Implement database indexing strategy to improve query response times",
      status: "In Progress",
      completedOn: "",
      actionTaken: "Created indexes for frequently queried tables. Testing performance improvements.",
    },
    {
      id: "CM-003",
      rationale: "Compliance requirement from legal team",
      description: "Add data encryption for sensitive fields in user database",
      status: "Pending Approval",
      completedOn: "",
      actionTaken: "Identified affected fields and encryption approach. Awaiting security team approval.",
    },
    {
      id: "CM-004",
      rationale: "User experience improvement",
      description: "Redesign dashboard layout based on usability testing feedback",
      status: "Completed",
      completedOn: "2025-02-28",
      actionTaken: "Updated component layouts, improved visual hierarchy, and simplified navigation flow.",
    },
  ];

  const tabs = [
    {
      key: "overview" as TabKey,
      label: "Project Overview",
      icon: <CheckCircle2 className="h-4 w-4" />,
    },
    {
      key: "biweekly" as TabKey,
      label: "Bi-Weekly Status",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      key: "milestones" as TabKey,
      label: "Milestones & Tasks",
      icon: <ListTodo className="h-4 w-4" />,
    },
    // { key: "cost" as TabKey, label: "Cost Management", icon: <DollarSign className="h-4 w-4" /> },
    {
      key: "risk" as TabKey,
      label: "Risk Register",
      icon: <AlertTriangle className="h-4 w-4" />,
    },
    {
      key: "stakeholders" as TabKey,
      label: "Stakeholders",
      icon: <Users className="h-4 w-4" />,
    },
    {
      key: "goals" as TabKey,
      label: "Goals & Benefits",
      icon: <Trophy className="h-4 w-4" />,
    },
    {
      key: "kpis" as TabKey,
      label: "KPIs",
      icon: <BarChart3 className="h-4 w-4" />,
    },
    // { key: "resources" as TabKey, label: "Resources", icon: <Briefcase className="h-4 w-4" /> },
    // { key: "lessons" as TabKey, label: "Lessons Learned", icon: <BookOpen className="h-4 w-4" /> },
    
    {
      key: "change-management" as TabKey,
      label: "Change Management",
      icon: <RefreshCw className="h-4 w-4" />,
    },
    {
      key: "closure" as TabKey,
      label: "Project Closure",
      icon: <FolderCheck className="h-4 w-4" />,
    },
    
    {
      key: "documents" as TabKey,
      label: "Documents",
      icon: <MessageSquare className="h-4 w-4" />,
    },
  ];

  return (
    <div className="h-full overflow-auto bg-background">
      <div className="space-y-3 p-3">
        {/* SECTION 1 - HEADER BANNER */}
        <Card className="relative text-white border-none shadow-lg overflow-hidden">
          <img
            src={bannerImage}
            alt="Dubai Customs Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#005844]/80 to-[#008755]/80" />
          <CardContent className="pt-3 pb-3 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBack}
                  className="text-white hover:bg-white/10 hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="h-6 w-px bg-white/30" />
                <div>
                  <h1 className="text-xl  ">
                    {project.name}
                  </h1>
                  <p className="text-white/90 text-sm">
                    Project ID: {project.id} • Owner:{" "}
                    {project.owner}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white bg-transparent text-white hover:bg-white/10 hover:text-white"
                  onClick={() =>
                    setProjectDetailsExpanded(
                      !projectDetailsExpanded,
                    )
                  }
                >
                  <Info className="h-4 w-4 mr-2" />
                  Project Info
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SECTION 2 - PROJECT COMMAND BAR (Summary Strip) */}
        {projectDetailsExpanded && (
          <Card className="shadow-md border-[#008755]/20">
            <CardContent className="p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-x-6 gap-y-5">
                {/* Lifecycle Status */}
                <div className="flex flex-col min-w-0">
                  <p className="text-xs text-muted-foreground mb-2">
                    Lifecycle Status
                  </p>

                  <Badge
                    className={`w-fit ${getLifecycleColor(project.lifecycleStatus)} text-white`}
                  >
                    {project.lifecycleStatus}
                  </Badge>
                </div>

                {/* Division */}
                <div className="flex flex-col min-w-0">
                  <p className="text-xs text-muted-foreground mb-2">
                    Division
                  </p>

                  <Badge
                    className="w-fit"
                    style={{
                      backgroundColor:
                        project.division === "Study"
                          ? "#00875520"
                          : "#00584420",
                      color:
                        project.division === "Study"
                          ? "#008755"
                          : "#005844",
                    }}
                  >
                    {project.division}
                  </Badge>
                </div>

                {/* Project Type */}
                <div className="flex flex-col min-w-0 ">
                  <p className="text-xs text-muted-foreground mb-2">
                    Project Type
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {project.types.map((type) => (
                      <Badge
                        key={type}
                        className="text-xs w-fit"
                        style={{
                          backgroundColor: `${projectTypeConfig[type]?.color}20`,
                          color: projectTypeConfig[type]?.color,
                        }}
                      >
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Category */}
                <div className="flex flex-col min-w-0">
                  <p className="text-xs text-muted-foreground mb-2">
                    Project Category
                  </p>

                  <p className="text-sm font-medium text-[#1f2937]">
                    {project.category}
                  </p>
                </div>

                {/* Completion */}
                <div className="flex flex-col min-w-0">
                  <p className="text-xs text-muted-foreground mb-2">
                    Completion
                  </p>

                  <div className="flex items-center gap-2">
                    <Progress
                      value={project.completion}
                      className="h-2 flex-1 max-w-[90px]"
                    />

                    <span className="text-sm font-medium whitespace-nowrap">
                      {project.completion}%
                    </span>
                  </div>
                </div>

                {/* Timeline */}
                <div className="flex flex-col min-w-0 ">
                  <p className="text-xs text-muted-foreground mb-2">
                    Timeline
                  </p>

                  <p className="text-sm font-medium text-[#1f2937]">
                    {project.timeline}
                  </p>
                </div>
                
                {/* Frameworks*/}
                <div className="flex flex-col min-w-0 ">
                  <p className="text-xs text-muted-foreground mb-2">
                    Framework Linkages
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {project.frameworks.map((type) => (
                      <Badge
                        key={type}
                        className="text-xs w-fit bg-muted border-[#008755] text-[#008755]"
                        
                      >
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Risk Level */}
                <div className="flex flex-col min-w-0">
                  <p className="text-xs text-muted-foreground mb-2">
                    Risk Level
                  </p>

                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full shrink-0"
                      style={{
                        backgroundColor: getRiskColor(
                          project.riskLevel,
                        ),
                      }}
                    />

                    <span className="text-sm font-medium">
                      {project.riskLevel}
                    </span>
                  </div>
                </div>

                {/* Strategic Pillar */}
                <div className="flex flex-col min-w-0">
                  <p className="text-xs text-muted-foreground mb-2">
                    Strategic Pillar
                  </p>

                  <p className="text-sm font-medium text-[#1f2937]">
                    {project.strategicPillar}
                  </p>
                </div>

                {/* Last Updated */}
                <div className="flex flex-col min-w-0">
                  <p className="text-xs text-muted-foreground mb-2">
                    Last Updated
                  </p>

                  <div className="flex items-center gap-1 text-sm text-[#1f2937]">
                    <Clock className="h-3 w-3 shrink-0" />

                    <span>2 days ago</span>
                  </div>
                </div>

                {/* Section */}
                <div className="flex flex-col min-w-0 ">
                  <p className="text-xs text-muted-foreground mb-2">
                    Section
                  </p>

                  <p className="text-sm font-medium text-[#1f2937]">
                    {project.section}
                  </p>
                </div>

                
              </div>
            </CardContent>
          </Card>
        )}

        {/* SECTION 3 - AI PROJECT HEALTH SUMMARY */}
        <Card className="shadow-md border-[#008755]/30 bg-gradient-to-r from-[#008755]/5 to-white">
          <CardContent className="pt-3 pb-3">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() =>
                setAiHealthExpanded(!aiHealthExpanded)
              }
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#008755]" />
                <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                  AI Project Health Summary
                </h3>
                <Badge className="bg-[#008755]/10 text-[#008755] text-xs">
                  Intelligence Layer
                </Badge>
              </div>
              {aiHealthExpanded ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>

            {aiHealthExpanded && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Schedule Forecast */}
                <div className="p-3 bg-white rounded border border-[#D83731]/30">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="h-3.5 w-3.5 text-[#D83731]" />
                    <p className="text-xs text-muted-foreground">
                      Schedule Forecast
                    </p>
                  </div>
                  <p className="text-lg font-['Dubai:Medium',_'Dubai'] text-[#D83731] mb-1">
                    7 Days Delay
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Based on current velocity
                  </p>
                </div>

                {/* Strategic Contribution */}
                <div className="p-3 bg-white rounded border border-[#008755]/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-3.5 w-3.5 text-[#008755]" />
                    <p className="text-xs text-muted-foreground">
                      Strategic Contribution
                    </p>
                  </div>
                  <p className="text-lg font-['Dubai:Medium',_'Dubai'] text-[#008755] mb-1">
                    High Impact
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Aligns with 3 KPIs
                  </p>
                </div>

                {/* Recommended Action */}
                <div className="p-3 bg-white rounded border border-[#F2A200]/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="h-3.5 w-3.5 text-[#F2A200]" />
                    <p className="text-xs text-muted-foreground">
                      Recommended Action
                    </p>
                  </div>
                  <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-1">
                    Review Phase 3
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Resource reallocation needed
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* SECTION 4 - TAB NAVIGATION BAR */}
        <Card>
          <CardContent className="pt-3 pb-0">
            <div className="flex items-center gap-1 overflow-x-auto">
              {tabs.map((tab) => (
                <Button
                  key={tab.key}
                  variant="ghost"
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-t-lg rounded-b-none border-b-2 transition-all ${
                    activeTab === tab.key
                      ? "border-[#008755] text-[#008755] font-['Dubai:Medium',_'Dubai'] bg-[#008755]/5"
                      : "border-transparent text-muted-foreground hover:text-[#1f2937] hover:bg-muted/50"
                  }`}
                >
                  {tab.icon}
                  <span className="whitespace-nowrap">
                    {tab.label}
                  </span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* SECTION 5 - TAB CONTENT CONTAINER */}
        <Card className="min-h-[400px]">
          <CardContent className="pt-6 pb-6">
            {activeTab === "overview" ? (
              <div className="space-y-4">
                {/* Project Updates — top of overview */}
                <Card className="border-[#008755]/20">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-center gap-2 mb-4">
                      <FileText className="h-4 w-4 text-[#008755]" />
                      <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                        Project Updates
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Execution Update */}
                      <Card className="bg-gradient-to-br from-[#008755]/5 to-white border-[#008755]/20">
                        <CardContent className="pt-4 pb-4">
                          <div className="flex items-center gap-2 mb-3">
                            <TrendingUp className="h-4 w-4 text-[#008755]" />
                            <h4 className="font-['Dubai:Medium',_'Dubai'] text-sm text-[#1f2937]">
                              Execution Update
                            </h4>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm text-[#1f2937] leading-relaxed">
                              API integration phase is
                              progressing well. Development team
                              completed 85% of backend services.
                              Frontend integration started this
                              week.
                            </p>
                            <div className="pt-2 border-t">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">
                                  Overall Progress
                                </span>
                                <span className="font-['Dubai:Medium',_'Dubai'] text-[#357743]">
                                  65%
                                </span>
                              </div>
                              <Progress
                                value={65}
                                className="h-2 mt-1"
                              />
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground pt-1">
                              <Clock className="h-3 w-3" />
                              <span>Updated: March 20, 2025</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Upcoming Milestone */}
                      <Card className="bg-gradient-to-br from-[#00B0AA]/5 to-white border-[#00B0AA]/20">
                        <CardContent className="pt-4 pb-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Target className="h-4 w-4 text-[#00B0AA]" />
                            <h4 className="font-['Dubai:Medium',_'Dubai'] text-sm text-[#1f2937]">
                              Upcoming Milestone
                            </h4>
                          </div>
                          <div className="space-y-2">
                            <div className="bg-white p-2 rounded border border-[#00B0AA]/20">
                              <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-1">
                                Phase 2: API Integration
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Complete all backend API
                                endpoints and testing
                              </p>
                            </div>
                            <div className="flex items-center justify-between text-xs pt-1">
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                <span>Due: April 15, 2025</span>
                              </div>
                              <span className="text-[#F2A200] font-['Dubai:Medium',_'Dubai']">
                                21 days
                              </span>
                            </div>
                            <div className="pt-2 border-t">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">
                                  Milestone Progress
                                </span>
                                <span className="font-['Dubai:Medium',_'Dubai'] text-[#00B0AA]">
                                  75%
                                </span>
                              </div>
                              <Progress
                                value={75}
                                className="h-2 mt-1"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Next Step */}
                      <Card className="bg-gradient-to-br from-[#357743]/5 to-white border-[#357743]/20">
                        <CardContent className="pt-4 pb-4">
                          <div className="flex items-center gap-2 mb-3">
                            <ArrowRight className="h-4 w-4 text-[#357743]" />
                            <h4 className="font-['Dubai:Medium',_'Dubai'] text-sm text-[#1f2937]">
                              Next Step
                            </h4>
                          </div>
                          <div className="space-y-2">
                            <div className="space-y-2">
                              <div className="flex items-start gap-2 p-2 bg-white rounded border border-[#357743]/20">
                                <CheckCircle2 className="h-3.5 w-3.5 text-[#357743] mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                                    Security Review
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Schedule security audit with
                                    IT team
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2 p-2 bg-white rounded border border-[#357743]/20">
                                <CheckCircle2 className="h-3.5 w-3.5 text-[#357743] mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                                    User Acceptance
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Prepare UAT environment
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground pt-1">
                              <Clock className="h-3 w-3" />
                              <span>Target: End of Week</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Support Needed */}
                      <Card className="bg-gradient-to-br from-[#F2A200]/5 to-white border-[#F2A200]/20">
                        <CardContent className="pt-4 pb-4">
                          <div className="flex items-center gap-2 mb-3">
                            <AlertCircle className="h-4 w-4 text-[#F2A200]" />
                            <h4 className="font-['Dubai:Medium',_'Dubai'] text-sm text-[#1f2937]">
                              Support Needed
                            </h4>
                          </div>
                          <div className="space-y-2">
                            <div className="space-y-2">
                              <div className="flex items-start gap-2 p-2 bg-white rounded border border-[#F2A200]/20">
                                <AlertTriangle className="h-3.5 w-3.5 text-[#F2A200] mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                                    Technical Resources
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Need 2 senior developers for
                                    API phase
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2 p-2 bg-white rounded border border-[#F2A200]/20">
                                <AlertTriangle className="h-3.5 w-3.5 text-[#F2A200] mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                                    Expert Consultation
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Blockchain security
                                    specialist required
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="pt-2 border-t">
                              <div className="flex items-center gap-1 text-xs">
                                <div className="h-2 w-2 rounded-full bg-[#D83731] animate-pulse"></div>
                                <span className="text-muted-foreground">
                                  EPMO Request:{" "}
                                  <span className="text-[#F2A200] font-['Dubai:Medium',_'Dubai']">
                                    Pending
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-10 gap-4">
                  {/* Left Column - 80% */}
                  <div className="lg:col-span-8 space-y-4">
                    {/* Row 1: Overall Progress + Schedule Performance */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Overall Progress Donut */}
                      <Card className="border-[#008755]/20 h-full">
                        <CardContent className="pt-4 pb-4">
                          <h3 className="font-['Dubai:Medium',_'Dubai'] mb-4 text-[#1f2937]">
                            Overall Progress
                          </h3>
                          <div className="flex items-center justify-center">
                            <div className="relative w-40 h-40">
                              <svg
                                viewBox="0 0 100 100"
                                className="transform -rotate-90"
                              >
                                <circle
                                  cx="50"
                                  cy="50"
                                  r="40"
                                  fill="none"
                                  stroke="#e5e7eb"
                                  strokeWidth="12"
                                />
                                <circle
                                  cx="50"
                                  cy="50"
                                  r="40"
                                  fill="none"
                                  stroke="#357743"
                                  strokeWidth="12"
                                  strokeDasharray={`${project.completion * 2.513} 251.3`}
                                  strokeLinecap="round"
                                />
                              </svg>
                              <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                                  {project.completion}%
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  Complete
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Schedule Performance Bar */}
                      <Card className="border-[#008755]/20 h-full">
                        <CardContent className="pt-4 pb-4">
                          <h3 className="font-['Dubai:Medium',_'Dubai'] mb-3 text-[#1f2937]">
                            Schedule Performance
                          </h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">
                                On Schedule
                              </span>
                              <span className="font-['Dubai:Medium',_'Dubai'] text-[#357743]">
                                85%
                              </span>
                            </div>
                            <Progress
                              value={85}
                              className="h-3"
                              style={{
                                backgroundColor: "#e5e7eb",
                              }}
                            />
                            <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                              <div className="bg-[#357743]/10 p-2 rounded">
                                <p className="text-muted-foreground">
                                  On Time
                                </p>
                                <p className="font-['Dubai:Medium',_'Dubai'] text-[#357743]">
                                  34 tasks
                                </p>
                              </div>
                              <div className="bg-[#F2A200]/10 p-2 rounded">
                                <p className="text-muted-foreground">
                                  At Risk
                                </p>
                                <p className="font-['Dubai:Medium',_'Dubai'] text-[#F2A200]">
                                  4 tasks
                                </p>
                              </div>
                              <div className="bg-[#D83731]/10 p-2 rounded">
                                <p className="text-muted-foreground">
                                  Delayed
                                </p>
                                <p className="font-['Dubai:Medium',_'Dubai'] text-[#D83731]">
                                  2 tasks
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Row 2: Current Risks + Support Required */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Current Risks Identified */}
                      <Card className="border-[#008755]/20">
                        <CardContent className="pt-4 pb-4">
                          <h3 className="font-['Dubai:Medium',_'Dubai'] mb-3 text-[#1f2937]">
                            Current Risks Identified
                          </h3>
                          <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                            {[
                              {
                                id: "R-001",
                                description:
                                  "Vendor delay on API integration",
                                level: "High",
                                color: "#D83731",
                              },
                              {
                                id: "R-003",
                                description:
                                  "Resource availability constraints",
                                level: "Medium",
                                color: "#F2A200",
                              },
                              {
                                id: "R-007",
                                description:
                                  "Stakeholder approval timeline",
                                level: "Medium",
                                color: "#F2A200",
                              },
                              {
                                id: "R-012",
                                description:
                                  "Testing environment setup",
                                level: "Low",
                                color: "#357743",
                              },
                            ].map((risk) => (
                              <div
                                key={risk.id}
                                className="flex items-start gap-2 p-2 bg-muted/30 rounded"
                              >
                                <div
                                  className="h-6 w-6 rounded flex items-center justify-center text-white text-xs font-['Dubai:Medium',_'Dubai'] flex-shrink-0"
                                  style={{
                                    backgroundColor: risk.color,
                                  }}
                                >
                                  !
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                                    {risk.id}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {risk.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 p-2 bg-muted/30 rounded text-sm">
                            <span className="text-muted-foreground">
                              Total Active Risks:{" "}
                            </span>
                            <span className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                              19
                            </span>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Support Required */}
                      <Card className="border-[#008755]/20">
                        <CardContent className="pt-4 pb-4">
                          <h3 className="font-['Dubai:Medium',_'Dubai'] mb-3 text-[#1f2937]">
                            Support Required
                          </h3>
                          <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                            <div className="p-3 bg-[#008755]/5 rounded-lg border border-[#008755]/20">
                              <div className="flex items-start gap-2 mb-2">
                                <AlertCircle className="h-4 w-4 text-[#008755] mt-0.5 flex-shrink-0" />
                                <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                                  Resource Allocation
                                </p>
                              </div>
                              <p className="text-xs text-muted-foreground pl-6">
                                Need additional technical
                                resources for API integration
                                phase
                              </p>
                            </div>

                            <div className="p-3 bg-[#F2A200]/5 rounded-lg border border-[#F2A200]/20">
                              <div className="flex items-start gap-2 mb-2">
                                <AlertCircle className="h-4 w-4 text-[#F2A200] mt-0.5 flex-shrink-0" />
                                <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                                  Technical Guidance
                                </p>
                              </div>
                              <p className="text-xs text-muted-foreground pl-6">
                                Require expert consultation on
                                blockchain security
                                implementation
                              </p>
                            </div>

                            <div className="p-3 bg-[#357743]/5 rounded-lg border border-[#357743]/20">
                              <div className="flex items-start gap-2 mb-2">
                                <CheckCircle2 className="h-4 w-4 text-[#357743] mt-0.5 flex-shrink-0" />
                                <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                                  Status
                                </p>
                              </div>
                              <p className="text-xs text-muted-foreground pl-6">
                                EPMO support request submitted -
                                Awaiting response
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Right Column - 20% */}
                  <div className="lg:col-span-2 space-y-4">
                    {/* Project Card */}
                    <Card className="border-[#008755]/20 bg-gradient-to-br from-[#008755]/5 to-white">
                      <CardContent className="pt-4 pb-4">
                        <h3 className="font-['Dubai:Medium',_'Dubai'] mb-3 text-[#1f2937] border-b pb-2">
                          Project Details
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-start gap-2">
                            <User className="h-4 w-4 text-[#008755] mt-0.5" />
                            <div className="flex-1">
                              <p className="text-xs text-muted-foreground">
                                Owner
                              </p>
                              <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                                {project.owner}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2">
                            <UserCheck className="h-4 w-4 text-[#008755] mt-0.5" />
                            <div className="flex-1">
                              <p className="text-xs text-muted-foreground">
                                Sponsor
                              </p>
                              <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                                Director General
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2">
                            <DollarSign className="h-4 w-4 text-[#008755] mt-0.5" />
                            <div className="flex-1">
                              <p className="text-xs text-muted-foreground">
                                Budget Allocated
                              </p>
                              <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                                {project?.budget || "1M"}
                              </p>
                            </div>
                          </div>

                          <div className="border-t pt-3 mt-3">
                            <div className="flex items-start gap-2 mb-3">
                              <FileText className="h-4 w-4 text-[#008755] mt-0.5" />
                              <div className="flex-1">
                                <p className="text-xs text-muted-foreground mb-1">
                                  Project Description
                                </p>
                                <p className="text-sm text-[#1f2937] leading-relaxed">
                                  This initiative aims to
                                  revolutionize customs
                                  clearance processes through
                                  advanced AI-powered automation
                                  and blockchain integration.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="border-t pt-3 mt-3">
                            <div className="flex items-start gap-2 mb-3">
                              <Target className="h-4 w-4 text-[#008755] mt-0.5" />
                              <div className="flex-1">
                                <p className="text-xs text-muted-foreground mb-1">
                                  Upcoming Milestone
                                </p>
                                <div className="bg-[#008755]/5 p-2 rounded border border-[#008755]/20">
                                  <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-1">
                                    Phase 2: API Integration
                                    Completion
                                  </p>
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Calendar className="h-3 w-3" />
                                    <span>
                                      Due: April 15, 2025
                                    </span>
                                    <span className="text-[#F2A200]">
                                      • 21 days remaining
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="border-t pt-3 mt-3 space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <CircleDot className="h-3.5 w-3.5 text-[#008755]" />
                                <span className="text-xs text-muted-foreground">
                                  Milestones
                                </span>
                              </div>
                              <span className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                                8
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <ListChecks className="h-3.5 w-3.5 text-[#008755]" />
                                <span className="text-xs text-muted-foreground">
                                  Tasks
                                </span>
                              </div>
                              <span className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                                40
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <ShieldAlert className="h-3.5 w-3.5 text-[#F2A200]" />
                                <span className="text-xs text-muted-foreground">
                                  Risks
                                </span>
                              </div>
                              <span className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                                19
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <CheckSquare className="h-3.5 w-3.5 text-[#357743]" />
                                <span className="text-xs text-muted-foreground">
                                  Compliance
                                </span>
                              </div>
                              <span className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#357743]">
                                98%
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

              </div>
            ) : activeTab === "milestones" ? (
              <div className="space-y-4">
                {/* Header with Add Milestone and View Toggle */}
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                    Project Milestones & Tasks
                  </h2>
                  <div className="flex items-center gap-3">
                    <div className="">
                    {/* Owner Filter */}
                    <Select
                      value={ownerFilter}
                      onValueChange={setOwnerFilter}
                      
                    >
                      <SelectTrigger className="w-[180px] border-gray">
                        <SelectValue placeholder="All Owners" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Owners</SelectItem>
                        {uniqueOwners.map((owner) => (
                          <SelectItem key={owner} value={owner}>
                            {owner}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
</div>
                    {/* View Toggle */}
                    <div className="flex items-center gap-1 bg-muted/50 p-1 rounded">
                      {[
                        "Tasks",
                        "Kanban",
                        "Gantt",
                        "Deliverables",
                      ].map((view) => (
                        <Button
                          key={view}
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setMilestoneView(
                              view as typeof milestoneView,
                            )
                          }
                          className={`px-3 py-1 text-xs ${
                            milestoneView === view
                              ? "bg-white text-[#008755] font-['Dubai:Medium',_'Dubai'] shadow-sm"
                              : "text-muted-foreground hover:text-[#1f2937]"
                          }`}
                        >
                          {view}
                        </Button>
                      ))}
                    </div>
                    <Button
                      size="sm"
                      className="bg-[#008755] hover:bg-[#006644] text-white"
                      onClick={() =>
                        setShowAddMilestonePanel(true)
                      }
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Milestone
                    </Button>
                  </div>
                </div>

                {/* View Content - Conditional Rendering */}
                {milestoneView === "Tasks" ? (
                  /* Milestones Accordion - Tasks View */
                  <div className="space-y-3">
                    {filteredMilestones.map((milestone) => (
                      <Card
                        key={milestone.id}
                        className="border-[#008755]/20"
                      >
                        <CardContent className="pt-0 pb-0">
                          {/* Milestone Header */}
                          <div className="flex items-center justify-between py-3 px-3 -mx-3">
                            <div
                              className="flex items-center gap-3 flex-1 cursor-pointer hover:bg-muted/30 transition-colors -mx-3 px-3 py-2 -my-2 rounded"
                              onClick={() =>
                                toggleMilestone(milestone.id)
                              }
                            >
                              {expandedMilestones.includes(
                                milestone.id,
                              ) ? (
                                <ChevronDown className="h-4 w-4 text-[#008755]" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                              )}
                              <div className="flex items-center gap-3 flex-1">
                                <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                                  {milestone.name}
                                </h3>
                                <Badge
                                  style={{
                                    backgroundColor: `${getStatusColor(milestone.status)}20`,
                                    color: getStatusColor(
                                      milestone.status,
                                    ),
                                  }}
                                  className="text-xs"
                                >
                                  {milestone.status}
                                </Badge>
                                {/* AI Delay Prediction Badge */}
                                {milestone.id === "M3" && (
                                  <Badge className="bg-[#D83731]/10 text-[#D83731] text-xs flex items-center gap-1">
                                    <Zap className="h-3 w-3" />
                                    AI: 7d delay risk
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                <Progress
                                  value={milestone.completion}
                                  className="h-2 w-[100px]"
                                />
                                <span className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] w-[45px]">
                                  {milestone.completion}%
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Calendar className="h-3.5 w-3.5" />
                                <span>{milestone.dueDate}</span>
                              </div>
                              <Badge
                                variant="outline"
                                className="text-xs"
                              >
                                {milestone.tasks.length} tasks
                              </Badge>

                              {/* Milestone Action Buttons */}
                              <div className="flex items-center gap-1 ml-2 border-l pl-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 px-2 text-xs text-[#008755] hover:text-[#008755] hover:bg-[#008755]/10"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedMilestoneForTask(
                                      milestone.id,
                                    );
                                    setShowAddTaskPanel(true);
                                  }}
                                >
                                  <Plus className="h-3.5 w-3.5 mr-1" />
                                  Add Task
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 w-7 p-0"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Edit milestone logic
                                  }}
                                >
                                  <Edit className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 w-7 p-0 text-[#D83731] hover:text-[#D83731] hover:bg-[#D83731]/10"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Delete milestone logic
                                  }}
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </div>
                          </div>

                          {/* Milestone Tasks Table */}
                          {expandedMilestones.includes(
                            milestone.id,
                          ) && (
                            <div className="border-t mt-0 pt-3 pb-3">
                              <div className="overflow-x-auto">
                                <table className="w-full">
                                  <thead>
                                    <tr className="border-b bg-muted/30">
                                      <th className="text-left py-2 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground w-[30px]"></th>
                                      <th className="text-left py-2 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">
                                        Task
                                      </th>
                                      <th className="text-left py-2 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">
                                        Owner
                                      </th>
                                      <th className="text-left py-2 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">
                                        Priority
                                      </th>
                                      <th className="text-left py-2 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">
                                        Progress
                                      </th>
                                      <th className="text-left py-2 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">
                                        Status
                                      </th>
                                      <th className="text-left py-2 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">
                                        Timeline
                                      </th>
                                      <th className="text-left py-2 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">
                                        Predecessors
                                      </th>
                                      <th className="text-left py-2 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">
                                        Actions
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {milestone.tasks.map(
                                      (task) => (
                                        <>
                                          <tr
                                            key={task.id}
                                            className={`border-b hover:bg-muted/30 transition-colors ${
                                              task.isOverdue
                                                ? "bg-red-50"
                                                : ""
                                            }`}
                                          >
                                            <td className="py-2 px-3">
                                              {task.subtasks &&
                                              task.subtasks
                                                .length > 0 ? (
                                                <button
                                                  onClick={() =>
                                                    toggleTask(
                                                      task.id,
                                                    )
                                                  }
                                                  className="h-4 w-4 flex items-center justify-center hover:bg-muted rounded cursor-pointer"
                                                >
                                                  {expandedTasks.includes(
                                                    task.id,
                                                  ) ? (
                                                    <ChevronDown className="h-4 w-4 text-[#008755]" />
                                                  ) : (
                                                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                                  )}
                                                </button>
                                              ) : (
                                                <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                                              )}
                                            </td>
                                            <td className="py-2 px-3">
                                              <div className="flex items-center gap-2">
                                                <span
                                                  className={`text-sm ${task.isOverdue ? 'text-[#D83731] font-["Dubai:Medium",_"Dubai"]' : "text-[#1f2937]"}`}
                                                >
                                                  {task.name}
                                                  {task.isOverdue && (
                                                    <Badge
                                                      variant="destructive"
                                                      className="ml-2 text-xs"
                                                    >
                                                      Overdue
                                                    </Badge>
                                                  )}
                                                </span>
                                                {task.subtasks &&
                                                  task.subtasks
                                                    .length >
                                                    0 && (
                                                    <Badge
                                                      variant="outline"
                                                      className="text-xs text-muted-foreground"
                                                    >
                                                      {
                                                        task
                                                          .subtasks
                                                          .length
                                                      }{" "}
                                                      subtasks
                                                    </Badge>
                                                  )}
                                              </div>
                                            </td>
                                            <td className="py-2 px-3">
                                              <span className="text-sm text-[#1f2937]">
                                                {task.owner}
                                              </span>
                                            </td>
                                            <td className="py-2 px-3">
                                              <Badge
                                                style={{
                                                  backgroundColor: `${getPriorityColor(task.priority)}20`,
                                                  color:
                                                    getPriorityColor(
                                                      task.priority,
                                                    ),
                                                }}
                                                className="text-xs"
                                              >
                                                {task.priority}
                                              </Badge>
                                            </td>
                                            <td className="py-2 px-3">
                                              <div className="flex items-center gap-2">
                                                <Progress
                                                  value={
                                                    task.progress
                                                  }
                                                  className="h-1.5 w-[60px]"
                                                />
                                                <span className="text-xs text-[#1f2937]">
                                                  {
                                                    task.progress
                                                  }
                                                  %
                                                </span>
                                              </div>
                                            </td>
                                            <td className="py-2 px-3">
                                              <Badge
                                                style={{
                                                  backgroundColor: `${getStatusColor(task.status)}20`,
                                                  color:
                                                    getStatusColor(
                                                      task.status,
                                                    ),
                                                }}
                                                className="text-xs"
                                              >
                                                {task.status}
                                              </Badge>
                                            </td>
                                            <td className="py-2 px-3">
                                              <span className="text-xs text-muted-foreground">
                                                {task.timeline}
                                              </span>
                                            </td>
                                            <td className="py-2 px-3">
                                              <div className="flex items-center gap-1 flex-wrap">
                                                {task.dependencies !==
                                                  "None" && (
                                                  <Link2 className="h-3 w-3 text-[#008755]" />
                                                )}
                                                {task.dependencies ===
                                                "None" ? (
                                                  <span className="text-xs text-muted-foreground">
                                                    {
                                                      task.dependencies
                                                    }
                                                  </span>
                                                ) : (
                                                  task.dependencies
                                                    .split(",")
                                                    .map(
                                                      (
                                                        dep,
                                                        index,
                                                      ) => (
                                                        <span
                                                          key={
                                                            index
                                                          }
                                                          className="flex items-center"
                                                        >
                                                          <button
                                                            className="text-xs text-[#008755] hover:underline cursor-pointer"
                                                            onClick={() => {
                                                              // Handle predecessor click - could scroll to task or show details
                                                              console.log(
                                                                "Navigate to task:",
                                                                dep.trim(),
                                                              );
                                                            }}
                                                          >
                                                            {dep.trim()}
                                                          </button>
                                                          {index <
                                                            task.dependencies.split(
                                                              ",",
                                                            )
                                                              .length -
                                                              1 && (
                                                            <span className="text-xs text-muted-foreground mx-1">
                                                              ,
                                                            </span>
                                                          )}
                                                        </span>
                                                      ),
                                                    )
                                                )}
                                              </div>
                                            </td>
                                            <td className="py-2 px-3">
                                              <div className="flex items-center gap-1">
                                                <Button
                                                  variant="ghost"
                                                  size="sm"
                                                  className="h-7 w-7 p-0"
                                                >
                                                  <Eye className="h-3.5 w-3.5" />
                                                </Button>
                                                <Button
                                                  variant="ghost"
                                                  size="sm"
                                                  className="h-7 w-7 p-0"
                                                >
                                                  <Edit className="h-3.5 w-3.5" />
                                                </Button>
                                                <Button
                                                  variant="ghost"
                                                  size="sm"
                                                  className="h-7 w-7 p-0 text-[#D83731]"
                                                >
                                                  <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                              </div>
                                            </td>
                                          </tr>
                                          {/* Subtasks Rows */}
                                          {task.subtasks &&
                                            task.subtasks
                                              .length > 0 &&
                                            expandedTasks.includes(
                                              task.id,
                                            ) &&
                                            task.subtasks.map(
                                              (subtask) => (
                                                <tr
                                                  key={
                                                    subtask.id
                                                  }
                                                  className={`border-b bg-muted/20 hover:bg-muted/40 transition-colors ${
                                                    subtask.isOverdue
                                                      ? "bg-red-50"
                                                      : ""
                                                  }`}
                                                >
                                                  <td className="py-2 px-3"></td>
                                                  <td className="py-2 px-3">
                                                    <div className="flex items-center gap-2 pl-6">
                                                      <div className="h-1 w-1 rounded-full bg-muted-foreground/30"></div>
                                                      <span
                                                        className={`text-sm ${subtask.isOverdue ? 'text-[#D83731] font-["Dubai:Medium",_"Dubai"]' : "text-[#1f2937]"}`}
                                                      >
                                                        {
                                                          subtask.name
                                                        }
                                                        {subtask.isOverdue && (
                                                          <Badge
                                                            variant="destructive"
                                                            className="ml-2 text-xs"
                                                          >
                                                            Overdue
                                                          </Badge>
                                                        )}
                                                      </span>
                                                    </div>
                                                  </td>
                                                  <td className="py-2 px-3">
                                                    <span className="text-sm text-[#1f2937]">
                                                      {
                                                        subtask.owner
                                                      }
                                                    </span>
                                                  </td>
                                                  <td className="py-2 px-3">
                                                    <Badge
                                                      style={{
                                                        backgroundColor: `${getPriorityColor(subtask.priority)}20`,
                                                        color:
                                                          getPriorityColor(
                                                            subtask.priority,
                                                          ),
                                                      }}
                                                      className="text-xs"
                                                    >
                                                      {
                                                        subtask.priority
                                                      }
                                                    </Badge>
                                                  </td>
                                                  <td className="py-2 px-3">
                                                    <div className="flex items-center gap-2">
                                                      <Progress
                                                        value={
                                                          subtask.progress
                                                        }
                                                        className="h-1.5 w-[60px]"
                                                      />
                                                      <span className="text-xs text-[#1f2937]">
                                                        {
                                                          subtask.progress
                                                        }
                                                        %
                                                      </span>
                                                    </div>
                                                  </td>
                                                  <td className="py-2 px-3">
                                                    <Badge
                                                      style={{
                                                        backgroundColor: `${getStatusColor(subtask.status)}20`,
                                                        color:
                                                          getStatusColor(
                                                            subtask.status,
                                                          ),
                                                      }}
                                                      className="text-xs"
                                                    >
                                                      {
                                                        subtask.status
                                                      }
                                                    </Badge>
                                                  </td>
                                                  <td className="py-2 px-3">
                                                    <span className="text-xs text-muted-foreground">
                                                      {
                                                        subtask.timeline
                                                      }
                                                    </span>
                                                  </td>
                                                  <td className="py-2 px-3">
                                                    <div className="flex items-center gap-1 flex-wrap">
                                                      {subtask.dependencies !==
                                                        "None" && (
                                                        <Link2 className="h-3 w-3 text-[#008755]" />
                                                      )}
                                                      {subtask.dependencies ===
                                                      "None" ? (
                                                        <span className="text-xs text-muted-foreground">
                                                          {
                                                            subtask.dependencies
                                                          }
                                                        </span>
                                                      ) : (
                                                        subtask.dependencies
                                                          .split(
                                                            ",",
                                                          )
                                                          .map(
                                                            (
                                                              dep,
                                                              index,
                                                            ) => (
                                                              <span
                                                                key={
                                                                  index
                                                                }
                                                                className="flex items-center"
                                                              >
                                                                <button
                                                                  className="text-xs text-[#008755] hover:underline cursor-pointer"
                                                                  onClick={() => {
                                                                    // Handle predecessor click - could scroll to task or show details
                                                                    console.log(
                                                                      "Navigate to task:",
                                                                      dep.trim(),
                                                                    );
                                                                  }}
                                                                >
                                                                  {dep.trim()}
                                                                </button>
                                                                {index <
                                                                  subtask.dependencies.split(
                                                                    ",",
                                                                  )
                                                                    .length -
                                                                    1 && (
                                                                  <span className="text-xs text-muted-foreground mx-1">
                                                                    ,
                                                                  </span>
                                                                )}
                                                              </span>
                                                            ),
                                                          )
                                                      )}
                                                    </div>
                                                  </td>
                                                  <td className="py-2 px-3">
                                                    <div className="flex items-center gap-1">
                                                      <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-7 w-7 p-0"
                                                      >
                                                        <Eye className="h-3.5 w-3.5" />
                                                      </Button>
                                                      <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-7 w-7 p-0"
                                                      >
                                                        <Edit className="h-3.5 w-3.5" />
                                                      </Button>
                                                      <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-7 w-7 p-0 text-[#D83731]"
                                                      >
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                      </Button>
                                                    </div>
                                                  </td>
                                                </tr>
                                              ),
                                            )}
                                        </>
                                      ),
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : milestoneView === "Kanban" ? (
                  /* Kanban Board View */
                  <KanbanView
                    mockMilestones={filteredMilestones}
                    getPriorityColor={getPriorityColor}
                    getStatusColor={getStatusColor}
                  />
                ) : milestoneView === "Gantt" ? (
                  /* Gantt Chart View */
                  <GanttView
                    mockMilestones={filteredMilestones}
                    getPriorityColor={getPriorityColor}
                    getStatusColor={getStatusColor}
                  />
                ) : (
                  /* Deliverables View Placeholder */
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <p className="text-lg font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2">
                      {milestoneView} View
                    </p>
                    <p className="text-muted-foreground">
                      Content for this view will be implemented
                      in the next phase
                    </p>
                  </div>
                )}
              </div>
            ) : activeTab === "cost" ? (
              <CostManagementTab />
            ) : activeTab === "risk" ? (
              <RiskRegisterTab />
            ) : activeTab === "stakeholders" ? (
              <StakeholdersTab />
            ) : activeTab === "goals" ? (
              <GoalsBenefitsTab
                strategicPillar={project.strategicPillar}
              />
            ) : activeTab === "kpis" ? (
              <KPIsTab />
            ) : activeTab === "resources" ? (
              <ResourcesTab />
            ) : activeTab === "closure" ? (
              <ProjectClosureTab />
            ) : activeTab === "documents" ? (
              <CollaborationTab />
            ) : activeTab === "biweekly" ? (
              <BiWeeklyStatusTab
                initialReportId={initialReportId}
              />
            ) : activeTab === "change-management" ? (
              <div className="space-y-4">
                {/* Header with Add Change Button */}
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                    Change Management
                  </h2>
                  <Button
                    size="sm"
                    className="bg-[#008755] hover:bg-[#006644] text-white"
                    onClick={() => {
                      setImpactAssessments([{ id: "1", impactType: "", details: "", preChange: "", postChange: "" }]);
                      setShowAddChangePanel(true);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Change
                  </Button>
                </div>

                {/* Change Management Table */}
                <Card className="border-[#008755]/20">
                  <CardContent className="pt-4 pb-4">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-muted/30">
                          
                            <th className="text-left py-3 px-4 text-sm font-['Dubai:Medium',_'Dubai'] text-muted-foreground">
                              Rationale
                            </th>
                            <th className="text-left py-3 px-4 text-sm font-['Dubai:Medium',_'Dubai'] text-muted-foreground">
                              Description
                            </th>
                            
                            <th className="text-left py-3 px-4 text-sm font-['Dubai:Medium',_'Dubai'] text-muted-foreground">
                              Completed Date
                            </th>
                            <th className="text-left py-3 px-4 text-sm font-['Dubai:Medium',_'Dubai'] text-muted-foreground">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockChangeManagementRecords.map((record) => (
                            <tr
                              key={record.id}
                              className="border-b hover:bg-muted/30 transition-colors"
                            >
                            
                              <td className="py-3 px-4">
                                <span className="text-sm text-[#1f2937]">
                                  {record.rationale}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <span className="text-sm text-[#1f2937]">
                                  {record.description}
                                </span>
                              </td>
                              
                              <td className="py-3 px-4">
                                <span className="text-sm text-muted-foreground">
                                  {record.completedOn || "N/A"}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <span className="text-sm text-[#1f2937]">
                                  {record.actionTaken}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                {tabs.find((t) => t.key === activeTab)
                  ?.icon && (
                  <div
                    className="mb-4 text-muted-foreground"
                    style={{ fontSize: "48px" }}
                  >
                    {
                      tabs.find((t) => t.key === activeTab)
                        ?.icon
                    }
                  </div>
                )}
                <h3 className="text-lg font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2">
                  {tabs.find((t) => t.key === activeTab)?.label}
                </h3>
                <p className="text-muted-foreground">
                  Content for this tab will be implemented in
                  the next phase
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add Task Panel */}
      <AddTaskPanel
        isOpen={showAddTaskPanel}
        onClose={() => setShowAddTaskPanel(false)}
        projectName={project.name}
        milestoneId={selectedMilestoneForTask}
        milestoneName={
          mockMilestones.find(
            (m) => m.id === selectedMilestoneForTask,
          )?.name || ""
        }
      />

      {/* Add Milestone Panel */}
      <AddMilestonePanel
        isOpen={showAddMilestonePanel}
        onClose={() => setShowAddMilestonePanel(false)}
        projectName={project.name}
      />

      {/* Add Change Panel - Right Side */}
      {showAddChangePanel && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setShowAddChangePanel(false)}
          />

          {/* Panel */}
          <div className="fixed right-0 top-0 h-full w-[600px] bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
            {/* Panel Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b ">
              <h2 className="text-lg font-['Dubai:Medium',_'Dubai'] text-[#008755]">
                Add Change Request
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddChangePanel(false)}
                className="text-white hover:bg-white/10 hover:text-white h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Panel Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className=" grid md:grid-cols-2 gap-5">
                {/* Rationale */}
                <div className="md:col-span-2">
                  <label className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                    Rationale <span className="text-[#D83731]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter the reason for this change"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#008755] focus:border-transparent"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                    Description <span className="text-[#D83731]">*</span>
                  </label>
                  <textarea
                    placeholder="Provide detailed description of the change"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#008755] focus:border-transparent resize-none"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                    Status <span className="text-[#D83731]">*</span>
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#008755] focus:border-transparent">
                    <option value="">Select status</option>
                    <option value="Pending Approval">Pending Approval</option>
                    <option value="Approved">Approved</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                {/* Completed On */}
                <div>
                  <label className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                    Completed On
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#008755] focus:border-transparent"
                  />
                </div>

                {/* Action Taken */}
                <div className="md:col-span-2">
                  <label className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                    Action Taken <span className="text-[#D83731]">*</span>
                  </label>
                  <textarea
                    placeholder="Describe the actions taken or planned for this change"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#008755] focus:border-transparent resize-none"
                  />
                </div>

                {/* Impact Assessment Section */}
                <div className="border-t pt-5 mt-6 md:col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                      Impact Assessment
                    </h3>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-[#008755] border-[#008755] hover:bg-[#008755]/10"
                      onClick={() => {
                        setImpactAssessments([
                          ...impactAssessments,
                          {
                            id: Date.now().toString(),
                            impactType: "",
                            details: "",
                            preChange: "",
                            postChange: "",
                          },
                        ]);
                      }}
                    >
                      <Plus className="h-3.5 w-3.5 mr-1" />
                      Add New
                    </Button>
                  </div>

                  {/* Impact Assessment Fields */}
                  <div className="space-y-4">
                    {impactAssessments.map((assessment, index) => (
                      <Card
                        key={assessment.id}
                        className="border-[#008755]/20 bg-muted/20"
                      >
                        <CardContent className="pt-4 pb-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#008755]">
                              Impact #{index + 1}
                            </span>
                            {impactAssessments.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-[#D83731] hover:text-[#D83731] hover:bg-[#D83731]/10"
                                onClick={() => {
                                  setImpactAssessments(
                                    impactAssessments.filter(
                                      (_, i) => i !== index
                                    )
                                  );
                                }}
                              >
                                <X className="h-3.5 w-3.5" />
                              </Button>
                            )}
                          </div>

                          <div className="space-y-3">
                            {/* Impact Type */}
                            <div>
                              <label className="text-xs font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-1 block">
                                Impact Type
                              </label>
                              <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#008755] focus:border-transparent">
                                <option value="">Select type</option>
                                <option value="Schedule">Schedule</option>
                                <option value="Budget">Budget</option>
                                <option value="Resources">Resources</option>
                                <option value="Scope">Scope</option>
                                <option value="Quality">Quality</option>
                                <option value="Risk">Risk</option>
                                <option value="Stakeholders">Stakeholders</option>
                              </select>
                            </div>

                            {/* Details */}
                            <div>
                              <label className="text-xs font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-1 block">
                                Details
                              </label>
                              <input
                                type="text"
                                placeholder="Describe the impact"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#008755] focus:border-transparent"
                              />
                            </div>

                            {/* Pre Change */}
                            <div>
                              <label className="text-xs font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-1 block">
                                Pre Change
                              </label>
                              <input
                                type="text"
                                placeholder="State before change"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#008755] focus:border-transparent"
                              />
                            </div>

                            {/* Post Change */}
                            <div>
                              <label className="text-xs font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-1 block">
                                Post Change
                              </label>
                              <input
                                type="text"
                                placeholder="Expected state after change"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#008755] focus:border-transparent"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Panel Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-muted/20">
              <Button
                variant="outline"
                onClick={() => setShowAddChangePanel(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-[#008755] hover:bg-[#006644] text-white"
                onClick={() => {
                  // Handle form submission
                  console.log("Change request submitted");
                  setShowAddChangePanel(false);
                }}
              >
                Submit Change Request
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}