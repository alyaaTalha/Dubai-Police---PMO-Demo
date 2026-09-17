import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Home,
  ChevronRight,
  Plus,
  Download,
  ChevronDown,
  Search,
  X,
  RotateCcw,
  Grid3x3,
  List,
  Eye,
  Edit,
  Archive,
  MoreVertical,
  Target,
  FileSearch,
  Monitor,
  Users as UsersIcon,
  Handshake,
  TrendingUp,
  AlertCircle,
  Clock,
  FolderKanban,
  Check,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Input } from "../ui/input";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import bannerImage from "figma:asset/2ceb5f3890ecf49940adbd1e2cca8cf7647ce99f.png";
import { ProjectDetailsPage } from "./ProjectDetailsPage";
import { CreateProjectDialog } from "./CreateProjectDialog";
import { CreateProjectPage } from "./CreateProjectPage";

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

interface ProjectsListPageProps {
  onBack: () => void;
  initialProjectId?: string;
  initialTab?: "biweekly";
  initialReportId?: number;
  onEditProject?: (project: Project) => void;
  convertedFromIdeas?: IdeaOriginProject[];
  onNavigateToIdeas?: (page: string) => void;
}

interface Project {
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
  types: (
    | "Strategies"
    | "Impact Assessment"
    | "Digital Solutions"
    | "New Services"
    | "External Engagement"
  )[];
  owner: string;
  projectManager: string;
  completion: number;
  budgetHealth: "Good" | "Warning" | "Critical";
  riskLevel: "Low" | "Medium" | "High";
  supportNeeded: string;
  hasOpenEPMORequest?: boolean;
  timeline: string;
  section: string;
  strategicPillar: string;
  category:
    | "Strategy Department Projects"
    | "Operational Projects";
  escalations: number;
  frameworks: ("UAE Centennial 2071" | "UN SDGs")[];
}

const mockProjects: Project[] = [
  {
    id: "1",
    name: "Smart Clearance Initiative",
    lifecycleStatus: "Ongoing",
    division: "Customs Development",
    types: ["Digital Solutions"],
    owner: "Ahmed Al Mansoori",
    projectManager: "Sara Al Marzouqi",
    completion: 65,
    budgetHealth: "Good",
    riskLevel: "Medium",
    supportNeeded: "2",
    hasOpenEPMORequest: true,
    timeline: "Q1 2025 - Q4 2026",
    section: "Customs Development",
    strategicPillar: "Innovation Excellence",
    category: "Operational Projects",
    escalations: 2,
    frameworks: ["UAE Centennial 2071", "UN SDGs"],
  },
  {
    id: "P001",
    name: "Smart Trade 2030 Initiative",
    lifecycleStatus: "Ongoing",
    division: "Customs Development",
    types: ["Strategies"],
    owner: "Ahmed Al Mansoori",
    projectManager: "Khalid Al Blooshi",
    completion: 75,
    budgetHealth: "Good",
    riskLevel: "Low",
    supportNeeded: "1",
    hasOpenEPMORequest: true,
    timeline: "Q1 2024 - Q4 2026",
    section: "Customs Development",
    strategicPillar: "Innovation Excellence",
    category: "Strategy Department Projects",
    escalations: 0,
    frameworks: ["UAE Centennial 2071", "UN SDGs"],
  },
  {
    id: "P002",
    name: "Economic Impact Assessment - Free Zones",
    lifecycleStatus: "Ongoing",
    division: "Policy & Legislation",
    types: ["Impact Assessment"],
    owner: "Fatima Al Hashimi",
    projectManager: "Ali Al Ketbi",
    completion: 45,
    budgetHealth: "Good",
    riskLevel: "Medium",
    supportNeeded: "-",
    timeline: "Q2 2024 - Q3 2024",
    section: "Policy and Legislation",
    strategicPillar: "Strategic Partnerships",
    category: "Strategy Department Projects",
    escalations: 1,
    frameworks: ["UAE Centennial 2071", "UN SDGs"],
  },
  {
    id: "P003",
    name: "Digital Customer Portal Enhancement",
    lifecycleStatus: "Ongoing",
    division: "Customs Inspection",
    types: ["New Services"],
    owner: "Mohammed Al Suwaidi",
    projectManager: "Mariam Al Shamsi",
    completion: 62,
    budgetHealth: "Warning",
    riskLevel: "Medium",
    supportNeeded: "6",
    hasOpenEPMORequest: true,
    timeline: "Q3 2024 - Q1 2025",
    section: "Customs Inspection",
    strategicPillar: "Customer Excellence",
    category: "Operational Projects",
    escalations: 4,
    frameworks: ["UAE Centennial 2071", "UN SDGs"],
  },
  {
    id: "P004",
    name: "Partnership Framework Development",
    lifecycleStatus: "Ongoing",
    division: "Director General Division",
    types: ["External Engagement"],
    owner: "Sara Al Marzouqi",
    projectManager: "Omar Al Falasi",
    completion: 30,
    budgetHealth: "Good",
    riskLevel: "Low",
    supportNeeded: "-",
    timeline: "Q4 2024 - Q2 2025",
    section: "Director General",
    strategicPillar: "Strategic Partnerships",
    category: "Strategy Department Projects",
    escalations: 0,
    frameworks: ["UAE Centennial 2071", "UN SDGs"],
  },
  {
    id: "P005",
    name: "Blockchain Trade Documentation",
    lifecycleStatus: "Ongoing",
    division: "Customs Development",
    types: ["Digital Solutions"],
    owner: "Khalid Al Blooshi",
    projectManager: "Noura Al Mazrouei",
    completion: 88,
    budgetHealth: "Good",
    riskLevel: "High",
    supportNeeded: "3",
    hasOpenEPMORequest: true,
    timeline: "Q1 2024 - Q4 2024",
    section: "Customs Development",
    strategicPillar: "Innovation Excellence",
    category: "Operational Projects",
    escalations: 3,
    frameworks: ["UAE Centennial 2071", "UN SDGs"],
  },
  {
    id: "P006",
    name: "AI-Powered Risk Assessment Model",
    lifecycleStatus: "Application",
    division: "Customs Inspection",
    types: ["Digital Solutions"],
    owner: "Mariam Al Shamsi",
    projectManager: "Rashid Al Shamsi",
    completion: 15,
    budgetHealth: "Good",
    riskLevel: "Medium",
    supportNeeded: "-",
    timeline: "Q1 2025 - Q4 2025",
    section: "Customs Inspection",
    strategicPillar: "Innovation Excellence",
    category: "Operational Projects",
    escalations: 0,
    frameworks: ["UAE Centennial 2071", "UN SDGs"],
  },
  {
    id: "P007",
    name: "Stakeholder Engagement Strategy",
    lifecycleStatus: "Application",
    division: "Director General Division",
    types: ["Strategies"],
    owner: "Ali Al Ketbi",
    projectManager: "Hessa Al Matrooshi",
    completion: 20,
    budgetHealth: "Good",
    riskLevel: "Low",
    supportNeeded: "-",
    timeline: "Q2 2025 - Q3 2025",
    section: "Director General",
    strategicPillar: "Strategic Partnerships",
    category: "Strategy Department Projects",
    escalations: 0,
    frameworks: ["UAE Centennial 2071", "UN SDGs"],
  },
  {
    id: "P008",
    name: "Legacy System Migration - Phase 2",
    lifecycleStatus: "Draft",
    division: "Finance And Administration Affairs",
    types: ["Digital Solutions"],
    owner: "Omar Al Falasi",
    projectManager: "Khalid Al Blooshi",
    completion: 5,
    budgetHealth: "Good",
    riskLevel: "High",
    supportNeeded: "-",
    hasOpenEPMORequest: false,
    timeline: "Q3 2025 - Q2 2026",
    section: "Customs Development",
    strategicPillar: "Operational Excellence",
    category: "Operational Projects",
    escalations: 0,
    frameworks: ["UAE Centennial 2071", "UN SDGs"],
  },
  {
    id: "P009",
    name: "Trade Facilitation Impact Study",
    lifecycleStatus: "Draft",
    division: "Human Resources",
    types: ["Impact Assessment"],
    owner: "Noura Al Mazrouei",
    projectManager: "Ali Al Ketbi",
    completion: 0,
    budgetHealth: "Good",
    riskLevel: "Low",
    supportNeeded: "-",
    timeline: "TBD",
    section: "Policy and Legislation",
    strategicPillar: "Customer Excellence",
    category: "Strategy Department Projects",
    escalations: 0,
    frameworks: ["UAE Centennial 2071", "UN SDGs"],
  },
  {
    id: "P010",
    name: "Mobile Inspection Application",
    lifecycleStatus: "Closed",
    division: "Customs Inspection",
    types: ["Digital Solutions"],
    owner: "Rashid Al Shamsi",
    projectManager: "Mohammed Al Suwaidi",
    completion: 100,
    budgetHealth: "Good",
    riskLevel: "Low",
    supportNeeded: "-",
    timeline: "Q1 2023 - Q4 2023",
    section: "Customs Inspection",
    strategicPillar: "Innovation Excellence",
    category: "Operational Projects",
    escalations: 0,
    frameworks: ["UAE Centennial 2071", "UN SDGs"],
  },
  {
    id: "P011",
    name: "Strategic Planning Framework 2030",
    lifecycleStatus: "Closed",
    division: "Policy & Legislation",
    types: ["Strategies"],
    owner: "Hessa Al Matrooshi",
    projectManager: "Sara Al Marzouqi",
    completion: 100,
    budgetHealth: "Good",
    riskLevel: "Low",
    supportNeeded: "-",
    timeline: "Q2 2023 - Q4 2023",
    section: "Director General",
    strategicPillar: "Strategic Partnerships",
    category: "Strategy Department Projects",
    escalations: 0,
    frameworks: ["UAE Centennial 2071", "UN SDGs"],
  },
];

const projectTypeConfig = {
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

export function ProjectsListPage({
  onBack,
  initialProjectId,
  initialTab,
  initialReportId,
  onEditProject,
  convertedFromIdeas = [],
  onNavigateToIdeas,
}: ProjectsListPageProps) {
  const [lifecycleFilter, setLifecycleFilter] = useState<
    "Draft" | "Application" | "Ongoing" | "Closed"
  >("Ongoing");
  const [divisionFilter, setDivisionFilter] = useState<
    "All" | "Studies" | "Projects"
  >("All");
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    [],
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [ownerFilter, setOwnerFilter] = useState("all");
  const [businessUnitFilter, setBusinessUnitFilter] =
    useState("all");
  const [projectTypeFilter, setProjectTypeFilter] =
    useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"table" | "board">(
    "table",
  );
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);
  const [showCreateProject, setShowCreateProject] =
    useState(false);
  const [navTab, setNavTab] = useState<"biweekly" | undefined>(
    initialTab,
  );
  const [navReportId, setNavReportId] = useState<
    number | undefined
  >(initialReportId);
  const [expandedBusinessUnits, setExpandedBusinessUnits] =
    useState<string[]>([
      "Customs Development",
      "Customs Inspection",
    ]);
  const [businessUnitPopoverOpen, setBusinessUnitPopoverOpen] =
    useState(false);
  const [projectTypePopoverOpen, setProjectTypePopoverOpen] =
    useState(false);
  const [showProjectTypeChips, setShowProjectTypeChips] =
    useState(false);
  const [openEscalationId, setOpenEscalationId] = useState<string | null>(null);

  // Auto-select project if initialProjectId is provided
  useEffect(() => {
    if (initialProjectId) {
      const project = mockProjects.find(
        (p) => p.id === initialProjectId,
      );
      if (project) {
        setSelectedProject(project);
      }
    }
  }, [initialProjectId]);

  // If create project is shown, show the create page
  if (showCreateProject) {
    return (
      <CreateProjectPage
        key="create-project-from-list"
        onBack={() => setShowCreateProject(false)}
      />
    );
  }

  // If a project is selected, show the details page
  if (selectedProject) {
    return (
      <ProjectDetailsPage
        key={`project-details-${selectedProject.id}`}
        project={selectedProject}
        onBack={() => setSelectedProject(null)}
        initialTab={navTab}
        initialReportId={navReportId}
      />
    );
  }

  // Get unique owners and sections
  const uniqueOwners = Array.from(
    new Set(mockProjects.map((p) => p.owner)),
  );
  const uniqueSections = Array.from(
    new Set(mockProjects.map((p) => p.section)),
  );

  // Filter projects
  const filteredProjects = mockProjects.filter((project) => {
    // Lifecycle filter - always applied, no "all" option
    if (project.lifecycleStatus !== lifecycleFilter)
      return false;

    // Division filter - "All" shows everything, "Studies" shows Study division, "Projects" shows Project division
    if (
      divisionFilter === "Studies" &&
      project.division !== "Study"
    )
      return false;
    if (
      divisionFilter === "Projects" &&
      project.division !== "Project"
    )
      return false;
    // When divisionFilter === "All", don't filter by division at all

    // Type filter
    if (
      projectTypeFilter !== "all" &&
      !project.types.includes(projectTypeFilter as any)
    )
      return false;

    // Search filter
    if (
      searchQuery &&
      !project.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
      return false;

    // Owner filter
    if (ownerFilter !== "all" && project.owner !== ownerFilter)
      return false;

    // Business Unit filter
    if (businessUnitFilter !== "all") {
      // Check if it's a main unit or sub-section
      const businessUnitMapping: { [key: string]: string[] } = {
        "Customs Development": ["Customs Development"],
        "Information Technology": ["Customs Development"],
        "Projects Delivery Department": ["Customs Development"],
        "Services Innovation": ["Customs Development"],
        "Customs Inspection": ["Customs Inspection"],
        "Air Cargo Centers Management": ["Customs Inspection"],
        "Inland Customs Centers Management": [
          "Customs Inspection",
        ],
      };

      const allowedSections =
        businessUnitMapping[businessUnitFilter];
      if (
        allowedSections &&
        !allowedSections.includes(project.section)
      )
        return false;
    }

    // Risk filter
    if (
      riskFilter !== "all" &&
      project.riskLevel !== riskFilter
    )
      return false;

    // Category filter
    if (
      categoryFilter !== "all" &&
      project.category !== categoryFilter
    )
      return false;

    return true;
  });

  // Summary stats
  const studiesCount = filteredProjects.filter(
    (p) => p.division === "Study",
  ).length;
  const projectsCount = filteredProjects.filter(
    (p) => p.division === "Project",
  ).length;
  const highRiskCount = filteredProjects.filter(
    (p) => p.riskLevel === "High",
  ).length;
  const overBudgetCount = filteredProjects.filter(
    (p) => p.budgetHealth === "Critical",
  ).length;

  // Lifecycle counts (based on all projects, not filtered)
  const lifecycleCounts = {
    Draft: mockProjects.filter(
      (p) => p.lifecycleStatus === "Draft",
    ).length,
    Application: mockProjects.filter(
      (p) => p.lifecycleStatus === "Application",
    ).length,
    Ongoing: mockProjects.filter(
      (p) => p.lifecycleStatus === "Ongoing",
    ).length,
    Closed: mockProjects.filter(
      (p) => p.lifecycleStatus === "Closed",
    ).length,
  };

  // Centralized column configuration per lifecycle
  const columnConfig = {
    Draft: {
      showCompletion: false,
      showSupportNeeded: false,
      showTimeline: false,
      showEscalations: false,
    },
    Application: {
      showCompletion: false,
      showSupportNeeded: false,
      showTimeline: false,
      showEscalations: false,
    },
    Ongoing: {
      showCompletion: true,
      showSupportNeeded: true,
      showTimeline: true,
      showEscalations: true,
    },
    Closed: {
      showCompletion: true,
      showSupportNeeded: false,
      showTimeline: true,
      showEscalations: false,
    },
  };

  const currentColumnConfig = columnConfig[lifecycleFilter];

  // Project Type counts
  const projectTypeCounts = {
    "Digital Solutions": filteredProjects.filter((p) =>
      p.types.includes("Digital Solutions"),
    ).length,
    Strategies: filteredProjects.filter((p) =>
      p.types.includes("Strategies"),
    ).length,
    Innovation: filteredProjects.filter((p) =>
      p.types.includes("Innovation"),
    ).length,
    "Impact Assessment": filteredProjects.filter((p) =>
      p.types.includes("Impact Assessment"),
    ).length,
    "New Services": filteredProjects.filter((p) =>
      p.types.includes("New Services"),
    ).length,
    "External Engagement": filteredProjects.filter((p) =>
      p.types.includes("External Engagement"),
    ).length,
  };

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type],
    );
  };

  const toggleBusinessUnit = (unit: string) => {
    setExpandedBusinessUnits((prev) =>
      prev.includes(unit)
        ? prev.filter((u) => u !== unit)
        : [...prev, unit],
    );
  };

  const getBusinessUnitLabel = (value: string) => {
    if (value === "all") return "All Business Units";
    return value;
  };

  const getProjectTypeLabel = () => {
    if (selectedTypes.length === 0) return "All Project Types";
    if (selectedTypes.length === 1) return selectedTypes[0];
    return `${selectedTypes.length} Types Selected`;
  };

  const clearAllFilters = () => {
    setSelectedTypes([]);
    setSearchQuery("");
    setOwnerFilter("all");
    setBusinessUnitFilter("all");
    setProjectTypeFilter("all");
    setRiskFilter("all");
    setCategoryFilter("all");
    // Lifecycle filter is not reset - it remains on current tab
  };

  const getLifecycleColor = (
    status: Project["lifecycleStatus"],
  ) => {
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

  const getBudgetColor = (health: Project["budgetHealth"]) => {
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

  const getRiskColor = (risk: Project["riskLevel"]) => {
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

  return (
    <div className="h-full overflow-auto bg-background">
      <div className="space-y-3 p-3">
        {/* SECTION 1 - HEADER */}
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
                    <FolderKanban className="h-5 w-5" />
                  </div>
                  <div>
                    <h1 className="text-xl font-['Dubai:Medium',_sans-serif] mb-0.5">
                      Project Portfolio
                    </h1>
                    <p className="text-white/90 text-sm">
                      Dubai Customs - Portfolio Management &
                      Project Tracking
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <CreateProjectDialog
                  onClick={() => setShowCreateProject(true)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SECTION 4 - SMART FILTER BAR */}
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  className="pl-9"
                />
              </div>

              <Select
                value={ownerFilter}
                onValueChange={setOwnerFilter}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Owner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    All Owners
                  </SelectItem>
                  {uniqueOwners.map((owner) => (
                    <SelectItem key={owner} value={owner}>
                      {owner}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Business Unit Filter - Custom Expandable Dropdown */}
              <Popover
                open={businessUnitPopoverOpen}
                onOpenChange={setBusinessUnitPopoverOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[200px] justify-between font-normal !bg-white border-0 "
                  >
                    <span className="truncate">
                      {getBusinessUnitLabel(businessUnitFilter)}
                    </span>
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-[240px] p-0"
                  align="start"
                >
                  <div className="max-h-[300px] overflow-y-auto">
                    {/* All Business Units Option */}
                    {/* <div
                      className="px-3 py-2 text-sm cursor-pointer hover:bg-muted/50 flex items-center gap-2"
                      onClick={() => {
                        setBusinessUnitFilter("all");
                        setBusinessUnitPopoverOpen(false);
                      }}
                    >
                      {businessUnitFilter === "all" && <Check className="h-4 w-4 text-[#008755]" />}
                      <span className={businessUnitFilter === "all" ? "font-['Dubai:Medium',_'Dubai']" : ""}>
                        All Business Units
                      </span>
                    </div> */}

                    <div className="" />

                    {/* Customs Development Section */}
                    <div className="p-2">
                      <div
                        className="flex items-center gap-2 px-2 cursor-pointer hover:bg-muted/30 rounded"
                        onClick={() =>
                          toggleBusinessUnit(
                            "Customs Development",
                          )
                        }
                      >
                        {expandedBusinessUnits.includes(
                          "Customs Development",
                        ) ? (
                          <ChevronDown className="h-4 w-4 text-[#008755]" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="font-['Dubai:Medium',_'Dubai'] text-sm">
                          Customs Development
                        </span>
                      </div>

                      {expandedBusinessUnits.includes(
                        "Customs Development",
                      ) && (
                        <div className="ml-6 mt-1 space-y-1">
                          <div
                            className="px-2 py-1.5 text-sm cursor-pointer hover:bg-muted/50 rounded flex items-center gap-2"
                            onClick={() => {
                              setBusinessUnitFilter(
                                "Customs Development",
                              );
                              setBusinessUnitPopoverOpen(false);
                            }}
                          >
                            {businessUnitFilter ===
                              "Customs Development" && (
                              <Check className="h-4 w-4 text-[#008755]" />
                            )}
                            <span>
                              All of Customs Development
                            </span>
                          </div>
                          <div
                            className="px-2 py-1.5 text-sm cursor-pointer hover:bg-muted/50 rounded flex items-center gap-2"
                            onClick={() => {
                              setBusinessUnitFilter(
                                "Information Technology",
                              );
                              setBusinessUnitPopoverOpen(false);
                            }}
                          >
                            {businessUnitFilter ===
                              "Information Technology" && (
                              <Check className="h-4 w-4 text-[#008755]" />
                            )}
                            <span>Information Technology</span>
                          </div>
                          <div
                            className="px-2 py-1.5 text-sm cursor-pointer hover:bg-muted/50 rounded flex items-center gap-2"
                            onClick={() => {
                              setBusinessUnitFilter(
                                "Projects Delivery Department",
                              );
                              setBusinessUnitPopoverOpen(false);
                            }}
                          >
                            {businessUnitFilter ===
                              "Projects Delivery Department" && (
                              <Check className="h-4 w-4 text-[#008755]" />
                            )}
                            <span>
                              Projects Delivery Department
                            </span>
                          </div>
                          <div
                            className="px-2 py-1.5 text-sm cursor-pointer hover:bg-muted/50 rounded flex items-center gap-2"
                            onClick={() => {
                              setBusinessUnitFilter(
                                "Services Innovation",
                              );
                              setBusinessUnitPopoverOpen(false);
                            }}
                          >
                            {businessUnitFilter ===
                              "Services Innovation" && (
                              <Check className="h-4 w-4 text-[#008755]" />
                            )}
                            <span>Services Innovation</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Customs Inspection Section */}
                    <div className="p-2">
                      <div
                        className="flex items-center gap-2 px-2 py-2 cursor-pointer hover:bg-muted/30 rounded"
                        onClick={() =>
                          toggleBusinessUnit(
                            "Customs Inspection",
                          )
                        }
                      >
                        {expandedBusinessUnits.includes(
                          "Customs Inspection",
                        ) ? (
                          <ChevronDown className="h-4 w-4 text-[#008755]" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="font-['Dubai:Medium',_'Dubai'] text-sm">
                          Customs Inspection
                        </span>
                      </div>

                      {expandedBusinessUnits.includes(
                        "Customs Inspection",
                      ) && (
                        <div className="ml-6 mt-1 space-y-1">
                          <div
                            className="px-2 py-1.5 text-sm cursor-pointer hover:bg-muted/50 rounded flex items-center gap-2"
                            onClick={() => {
                              setBusinessUnitFilter(
                                "Customs Inspection",
                              );
                              setBusinessUnitPopoverOpen(false);
                            }}
                          >
                            {businessUnitFilter ===
                              "Customs Inspection" && (
                              <Check className="h-4 w-4 text-[#008755]" />
                            )}
                            <span>
                              All of Customs Inspection
                            </span>
                          </div>
                          <div
                            className="px-2 py-1.5 text-sm cursor-pointer hover:bg-muted/50 rounded flex items-center gap-2"
                            onClick={() => {
                              setBusinessUnitFilter(
                                "Air Cargo Centers Management",
                              );
                              setBusinessUnitPopoverOpen(false);
                            }}
                          >
                            {businessUnitFilter ===
                              "Air Cargo Centers Management" && (
                              <Check className="h-4 w-4 text-[#008755]" />
                            )}
                            <span>
                              Air Cargo Centers Management
                            </span>
                          </div>
                          <div
                            className="px-2 py-1.5 text-sm cursor-pointer hover:bg-muted/50 rounded flex items-center gap-2"
                            onClick={() => {
                              setBusinessUnitFilter(
                                "Inland Customs Centers Management",
                              );
                              setBusinessUnitPopoverOpen(false);
                            }}
                          >
                            {businessUnitFilter ===
                              "Inland Customs Centers Management" && (
                              <Check className="h-4 w-4 text-[#008755]" />
                            )}
                            <span>
                              Inland Customs Centers Management
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Project Type Filter - Select Dropdown */}
              <Select
                value={projectTypeFilter}
                onValueChange={setProjectTypeFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Project Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    All Project Types
                  </SelectItem>
                  <SelectItem value="Strategies">
                    Strategies
                  </SelectItem>
                  <SelectItem value="Impact Assessment">
                    Impact Assessment
                  </SelectItem>
                  <SelectItem value="Digital Solutions">
                    Digital Solutions
                  </SelectItem>
                  <SelectItem value="New Services">
                    New Services
                  </SelectItem>
                  <SelectItem value="External Engagement">
                    External Engagement
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Project Category Filter */}
              <Select
                value={categoryFilter}
                onValueChange={setCategoryFilter}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Project Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    All Categories
                  </SelectItem>
                  <SelectItem value="Strategy Department Projects">
                    Strategy Department Projects
                  </SelectItem>
                  <SelectItem value="Operational Projects">
                    Operational Projects
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* <Select
                value={riskFilter}
                onValueChange={setRiskFilter}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Risk Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    All Risk Levels
                  </SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select> */}

              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset All
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* SECTION 5 - PORTFOLIO SUMMARY + CONTROLS */}
        <Card className="bg-gradient-to-r from-[#008755]/5 to-[#00B0AA]/5 border-[#008755]/20">
          <CardContent className="pt-4 pb-4 space-y-4">
            {/* TOP ROW */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-8">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Projects
                  </p>
                  <p className="text-2xl font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                    {filteredProjects.length}
                  </p>
                </div>

                <div className="h-8 w-px bg-border" />

                <div
                  className="cursor-pointer hover:bg-muted/20 px-3 py-1 rounded-lg transition-colors"
                  onClick={() =>
                    setShowProjectTypeChips(
                      !showProjectTypeChips,
                    )
                  }
                >
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">
                      Project Types
                    </p>

                    {showProjectTypeChips ? (
                      <ChevronDown className="h-4 w-4 text-[#008755]" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>

                  <p className="text-xl font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                    {
                      Object.values(projectTypeCounts).filter(
                        (count) => count > 0,
                      ).length
                    }
                  </p>
                </div>
              </div>

              {/* VIEW TOGGLE */}
              <div className="flex items-center gap-1 bg-background rounded-lg border p-1">
                <Button
                  variant={
                    viewMode === "table" ? "default" : "ghost"
                  }
                  size="sm"
                  onClick={() => setViewMode("table")}
                  className={
                    viewMode === "table"
                      ? "bg-[#008755] hover:bg-[#008755]/90"
                      : ""
                  }
                >
                  <List className="h-4 w-4 mr-2" />
                  Table View
                </Button>

                <Button
                  variant={
                    viewMode === "board" ? "default" : "ghost"
                  }
                  size="sm"
                  onClick={() => setViewMode("board")}
                  className={
                    viewMode === "board"
                      ? "bg-[#008755] hover:bg-[#008755]/90"
                      : ""
                  }
                >
                  <Grid3x3 className="h-4 w-4 mr-2" />
                  Board View
                </Button>
              </div>
            </div>
            {showProjectTypeChips && (
              <div className="flex flex-wrap gap-2">
                {Object.entries(projectTypeCounts).map(
                  ([type, count]) => {
                    if (count === 0) return null;

                    return (
                      <div
                        key={type}
                        className="px-3 py-1 rounded-full bg-white border text-sm flex items-center gap-2"
                      >
                        <span className="text-muted-foreground">
                          {type}
                        </span>

                        <span className="font-medium">
                          {count}
                        </span>
                      </div>
                    );
                  },
                )}
              </div>
            )}

            {/* PROJECT TYPE CHIPS */}
          </CardContent>
        </Card>

        {/* IDEA-ORIGINATED PROJECTS BANNER */}
        {convertedFromIdeas.length > 0 && (
          <Card className="border border-[#008755]/30 bg-[#008755]/5">
            <CardContent className="pt-3 pb-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded bg-[#008755]/15 flex items-center justify-center">
                    <span className="text-[#008755] text-xs">💡</span>
                  </div>
                  <span className="text-sm font-['Dubai:Medium',_sans-serif] text-[#005844]">
                    From Innovation Platform — {convertedFromIdeas.length} idea{convertedFromIdeas.length > 1 ? 's' : ''} converted to project{convertedFromIdeas.length > 1 ? 's' : ''}
                  </span>
                </div>
                {onNavigateToIdeas && (
                  <button
                    onClick={() => onNavigateToIdeas('pipeline')}
                    className="text-xs text-[#008755] hover:underline"
                  >
                    View in Ideas Platform →
                  </button>
                )}
              </div>
              <div className="space-y-1.5">
                {convertedFromIdeas.map(p => (
                  <div key={p.id} className="flex items-center justify-between bg-white rounded-lg border border-[#008755]/20 px-3 py-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-[10px] bg-[#008755] text-white rounded px-1.5 py-0.5 font-['Dubai:Medium',_sans-serif] flex-shrink-0">
                        {p.type.toUpperCase()}
                      </span>
                      <span className="text-sm font-['Dubai:Medium',_sans-serif] text-foreground truncate">{p.title}</span>
                      <span className="text-xs text-muted-foreground flex-shrink-0">· {p.department}</span>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                      <span className="text-[11px] text-muted-foreground">Converted {p.convertedAt}</span>
                      <span className="text-[10px] bg-amber-100 text-amber-700 rounded px-1.5 py-0.5">In Planning</span>
                      {onNavigateToIdeas && (
                        <button
                          onClick={() => onNavigateToIdeas('pipeline')}
                          className="text-[11px] text-[#008755] hover:underline"
                        >
                          Idea #{p.ideaId} →
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* LIFECYCLE STATUS TABS */}
        <div className="grid md:grid-cols-4 gap-2 border-t pt-4 mt-4">
          {(
            [
              "Draft",
              "Application",
              "Ongoing",
              "Closed",
            ] as const
          ).map((lifecycle) => (
            <button
              key={lifecycle}
              onClick={() => setLifecycleFilter(lifecycle)}
              className={`
              px-4 py-2 rounded-xl text-sm transition-all
              flex items-center justify-between gap-2 border
              ${
                lifecycleFilter === lifecycle
                  ? "bg-[#008755] text-white border-[#008755] shadow-sm"
                  : "bg-white hover:bg-muted border-border text-[#1f2937]"
              }
            `}
            >
              <span className="font-['Dubai:Medium',_'Dubai']">
                {lifecycle}
              </span>

              <Badge
                className={
                  lifecycleFilter === lifecycle
                    ? "bg-white/20 text-white hover:bg-white/20"
                    : "bg-[#008755]/10 text-[#1f2937]"
                }
              >
                {lifecycleCounts[lifecycle]}
              </Badge>
            </button>
          ))}
        </div>
        {/* LIFECYCLE TABS */}
        {/* <Card className="overflow-x-auto">
          <CardContent className="pt-4 pb-4">
            
          </CardContent>
        </Card> */}

        {/* SECTION 6 - PROJECT LIST DISPLAY */}
        {viewMode === "table" ? (
          <>
            {/* <div className="grid md:grid-cols-4 items-center gap-2 min-w-max rounded-lg  border bg-white p-3">
              {(["Draft", "Application", "Ongoing", "Closed"] as const).map((lifecycle) => (
                <button
                  key={lifecycle}
                  onClick={() => setLifecycleFilter(lifecycle)}
                  className={`
                    px-4 py-2 transition-all font-['Dubai:Medium',_'Dubai'] text-sm rounded-lg
                    flex justify-between items-center gap-2 whitespace-nowrap
                    ${
                      lifecycleFilter === lifecycle
                        ? "bg-[#008755]/10 border-b-2 border-[#008755] "
                        : " text-[#1f2937] hover:bg-muted"
                    }
                  `}
                >
                  <span>{lifecycle}</span>
                  <Badge
                    className={`
                      bg-[#008755]/10 text-[#1f2937]
                    `}
                  >
                    {lifecycleCounts[lifecycle]}
                  </Badge>
                </button>
              ))}
            </div> */}
            <Card>
              <CardContent className="pt-4">
                {filteredProjects.length === 0 ? (
                  // Empty State
                  <div className="text-center py-12">
                    <FolderKanban className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2">
                      No Projects Found
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters or create a new
                      project
                    </p>
                    <CreateProjectDialog
                      onClick={() => setShowCreateProject(true)}
                    />
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-['Dubai:Medium',_'Dubai']">
                            Project Name
                          </TableHead>
                          <TableHead className="font-['Dubai:Medium',_'Dubai']">
                            Lifecycle Status
                          </TableHead>
                          <TableHead className="font-['Dubai:Medium',_'Dubai']">
                            Division
                          </TableHead>
                          <TableHead className="font-['Dubai:Medium',_'Dubai']">
                            Project Category
                          </TableHead>
                          <TableHead className="font-['Dubai:Medium',_'Dubai']">
                            Project Type
                          </TableHead>
                          <TableHead className="font-['Dubai:Medium',_'Dubai']">
                            Owner
                          </TableHead>
                          <TableHead className="font-['Dubai:Medium',_'Dubai']">
                            Project Manager
                          </TableHead>
                          {currentColumnConfig.showCompletion && (
                            <TableHead className="font-['Dubai:Medium',_'Dubai']">
                              Completion
                            </TableHead>
                          )}
                          {currentColumnConfig.showSupportNeeded && (
                            <TableHead className="font-['Dubai:Medium',_'Dubai']">
                              Support Needed
                            </TableHead>
                          )}
                          {currentColumnConfig.showEscalations && (
                            <TableHead className="font-['Dubai:Medium',_'Dubai']">
                              Escalations
                            </TableHead>
                          )}
                          {currentColumnConfig.showTimeline && (
                            <TableHead className="font-['Dubai:Medium',_'Dubai']">
                              Timeline
                            </TableHead>
                          )}
                          <TableHead className="w-[120px]">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredProjects.map((project) => (
                          <TableRow
                            key={project.id}
                            onClick={() => {
                              if (
                                project.lifecycleStatus ===
                                "Ongoing"
                              ) {
                                setSelectedProject(project);
                              }
                            }}
                            className={
                              project.lifecycleStatus ===
                              "Ongoing"
                                ? "cursor-pointer hover:bg-muted/50"
                                : ""
                            }
                          >
                            <TableCell className="font-['Dubai:Medium',_'Dubai']">
                              <div className="flex items-center gap-2">
                                {project.hasOpenEPMORequest && (
                                  <span
                                    className="text-[#D83731] font-bold"
                                    title="Has Open EPMO Support Request"
                                  >
                                    !
                                  </span>
                                )}
                                {project.name}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={`${getLifecycleColor(project.lifecycleStatus)} text-white`}
                              >
                                {project.lifecycleStatus}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {project.division}
                            </TableCell>
                            <TableCell className="text-sm">
                              {project.category}
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {(project.division === "Study"
                                  ? [project.types[0]]
                                  : project.types
                                ).map((type) => (
                                  <Badge
                                    key={type}
                                    style={{
                                      backgroundColor: `${projectTypeConfig[type].color}20`,
                                      color:
                                        projectTypeConfig[type]
                                          .color,
                                    }}
                                    className="text-xs"
                                  >
                                    {type}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell className="text-sm">
                              {project.owner}
                            </TableCell>
                            <TableCell className="text-sm">
                              {project.projectManager}
                            </TableCell>
                            {currentColumnConfig.showCompletion && (
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Progress
                                    value={project.completion}
                                    className="h-2 w-[60px]"
                                  />
                                  <span className="text-sm text-muted-foreground">
                                    {project.completion}%
                                  </span>
                                </div>
                              </TableCell>
                            )}
                            {currentColumnConfig.showSupportNeeded && (
                              <TableCell className="text-sm">
                                {project.supportNeeded}
                              </TableCell>
                            )}
                            {currentColumnConfig.showEscalations && (
                              <TableCell className="text-sm text-center">
                                {project.escalations > 0 ? (
                                  <Popover
                                    open={
                                      openEscalationId ===
                                      project.id
                                    }
                                    onOpenChange={(open) =>
                                      setOpenEscalationId(
                                        open
                                          ? project.id
                                          : null,
                                      )
                                    }
                                  >
                                    <PopoverTrigger asChild>
                                      <span
                                        onMouseEnter={() =>
                                          setOpenEscalationId(
                                            project.id,
                                          )
                                        }
                                        onMouseLeave={() =>
                                          setOpenEscalationId(
                                            null,
                                          )
                                        }
                                        className="inline-flex items-center justify-center h-6 w-6 rounded-full text-xs font-['Dubai:Medium',_'Dubai'] bg-[#D83731]/10 text-[#D83731] cursor-pointer hover:bg-[#D83731]/20 transition-colors"
                                      >
                                        {project.escalations}
                                      </span>
                                    </PopoverTrigger>

                                    <PopoverContent
                                      className="w-80 p-3"
                                      align="center"
                                      onMouseEnter={() =>
                                        setOpenEscalationId(
                                          project.id,
                                        )
                                      }
                                      onMouseLeave={() =>
                                        setOpenEscalationId(
                                          null,
                                        )
                                      }
                                    >
                                      <div className="space-y-2">
                                        <div className="flex items-start gap-2">
                                          <AlertCircle className="h-4 w-4 text-[#D83731] mt-0.5" />
                                          <div>
                                            <p className="text-sm font-['Dubai:Medium',_'Dubai']">
                                              Pending Escalation
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                              Ahmed has not yet
                                              sent the
                                              escalation email
                                            </p>
                                          </div>
                                        </div>

                                        <div className="flex items-center gap-2 pt-2 border-t">
                                          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                                          <p className="text-xs text-muted-foreground">
                                            Escalation date:{" "}
                                            {new Date(
                                              Date.now() -
                                                2 *
                                                  24 *
                                                  60 *
                                                  60 *
                                                  1000,
                                            ).toLocaleDateString()}
                                          </p>
                                        </div>
                                      </div>
                                    </PopoverContent>
                                  </Popover>
                                ) : (
                                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full text-xs bg-muted/50 text-muted-foreground">
                                    {project.escalations}
                                  </span>
                                )}
                              </TableCell>
                            )}
                            {currentColumnConfig.showTimeline && (
                              <TableCell className="text-sm">
                                {project.timeline}
                              </TableCell>
                            )}
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (
                                      lifecycleFilter ===
                                        "Application" &&
                                      onEditProject
                                    ) {
                                      onEditProject(project);
                                    }
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        ) : (
          // BOARD VIEW
          <div className="space-y-3">
            {/* <div className="grid md:grid-cols-4 items-center gap-2 min-w-max rounded-lg  border bg-white p-3">
              {(["Draft", "Application", "Ongoing", "Closed"] as const).map((lifecycle) => (
                <button
                  key={lifecycle}
                  onClick={() => setLifecycleFilter(lifecycle)}
                  className={`
                    px-4 py-2 transition-all font-['Dubai:Medium',_'Dubai'] text-sm rounded-lg
                    flex justify-between items-center gap-2 whitespace-nowrap
                    ${
                      lifecycleFilter === lifecycle
                        ? "bg-[#008755]/10 border-b-2 border-[#008755] "
                        : " text-[#1f2937] hover:bg-muted"
                    }
                  `}
                >
                  <span>{lifecycle}</span>
                  <Badge
                    className={`
                      bg-[#008755]/10 text-[#1f2937]
                    `}
                  >
                    {lifecycleCounts[lifecycle]}
                  </Badge>
                </button>
              ))}
            </div> */}
            {Object.entries(projectTypeConfig).map(
              ([type, config]) => {
                const typeProjects = filteredProjects.filter(
                  (p) => p.types.includes(type as any),
                );
                if (typeProjects.length === 0) return null;

                return (
                  <Card key={type}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 font-['Dubai:Medium',_'Dubai']">
                        <div
                          className="h-8 w-8 rounded flex items-center justify-center text-white"
                          style={{
                            backgroundColor: config.color,
                          }}
                        >
                          {config.icon}
                        </div>
                        {type}
                        <Badge variant="secondary">
                          {typeProjects.length}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {typeProjects.map((project) => (
                          <Card
                            key={project.id}
                            className={`hover:shadow-md transition-shadow ${project.lifecycleStatus === "Ongoing" ? "cursor-pointer" : ""}`}
                            onClick={() => {
                              if (
                                project.lifecycleStatus ===
                                "Ongoing"
                              ) {
                                setSelectedProject(project);
                              }
                            }}
                          >
                            <CardContent className="pt-4">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-['Dubai:Medium',_'Dubai'] text-sm text-[#1f2937]">
                                  {project.name}
                                </h4>
                                <div
                                  className="h-3 w-3 rounded-full flex-shrink-0"
                                  style={{
                                    backgroundColor:
                                      getRiskColor(
                                        project.riskLevel,
                                      ),
                                  }}
                                />
                              </div>
                              <div className="flex items-center gap-2 mb-3">
                                <Badge
                                  className={`${getLifecycleColor(project.lifecycleStatus)} text-white text-xs`}
                                >
                                  {project.lifecycleStatus}
                                </Badge>
                                <Badge
                                  style={{
                                    backgroundColor:
                                      project.division ===
                                      "Study"
                                        ? "#00875520"
                                        : "#00584420",
                                    color:
                                      project.division ===
                                      "Study"
                                        ? "#008755"
                                        : "#005844",
                                  }}
                                  className="text-xs"
                                >
                                  {project.division}
                                </Badge>
                                {currentColumnConfig.showEscalations &&
                                  project.escalations > 0 && (
                                    <Badge className="bg-[#D83731]/10 text-[#D83731] text-xs">
                                      {project.escalations}{" "}
                                      Escalation
                                      {project.escalations !== 1
                                        ? "s"
                                        : ""}
                                    </Badge>
                                  )}
                              </div>
                              <p
                                className={`text-xs text-muted-foreground ${currentColumnConfig.showCompletion ? "mb-2" : "mb-3"}`}
                              >
                                {project.owner}
                              </p>
                              {currentColumnConfig.showCompletion && (
                                <div className="flex items-center gap-2 mb-3">
                                  <Progress
                                    value={project.completion}
                                    className="h-1.5 flex-1"
                                  />
                                  <span className="text-xs text-muted-foreground">
                                    {project.completion}%
                                  </span>
                                </div>
                              )}
                              <div
                                className={`flex items-center ${currentColumnConfig.showTimeline ? "justify-between" : "justify-end"}`}
                              >
                                {currentColumnConfig.showTimeline && (
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Clock className="h-3 w-3" />
                                    {project.timeline}
                                  </div>
                                )}
                                <div className="flex items-center gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 px-2"
                                  >
                                    <Eye className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 px-2"
                                  >
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              },
            )}
          </div>
        )}
      </div>
    </div>
  );
}