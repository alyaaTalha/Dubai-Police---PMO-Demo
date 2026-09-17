import { useState } from "react";
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
  ArrowLeft,
  Building2,
  AlertCircle,
  TrendingUp,
  FileText,
  Search,
  X,
  Filter,
    Cpu,
  Sparkles,
  BarChart3,
  Target,
  FilePlus,
  FolderKanban 
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import bannerImage from "figma:asset/2ceb5f3890ecf49940adbd1e2cca8cf7647ce99f.png";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DGDashboardPageProps {
  onBack: () => void;
}

// Project data with categorized types
const allProjects = [
  {
    id: 1,
    name: "Customs Clearance Digital Transformation Program",
    owner: "Ahmed Al Mansoori",
    manager: "Fatima Al Hashimi",
    type: "Digital Solutions",
    progress: 67,
    status: "Progress Made",
    lastUpdate: "Nov 12, 2025",
    description:
      "Comprehensive digital transformation initiative to modernize customs clearance processes across all Dubai Customs facilities.",
    latestUpdate: "Phase 2 implementation completed",
    updateDate: "2025-11-12",
    nextMilestone: "Phase 3 UAT — Dec 2025",
  },
  {
    id: 2,
    name: "Smart Inspection & Risk Management System",
    owner: "Khalid Al Shamsi",
    manager: "Noura Al Qassimi",
    type: "Digital Solutions",
    progress: 45,
    status: "Progress Made",
    lastUpdate: "Nov 13, 2025",
    description:
      "AI-powered risk assessment and smart inspection system for enhanced cargo security and efficiency.",
    latestUpdate:
      "Integration with existing systems in progress",
    updateDate: "2025-11-13",
    nextMilestone: "System integration sign-off — Jan 2026",
  },
  {
    id: 3,
    name: "Blockchain Trade Documentation Platform",
    owner: "Abdullah Al Mazrouei",
    manager: "Shaikha Al Sharqi",
    type: "Digital Solutions",
    progress: 72,
    status: "On Track",
    lastUpdate: "Nov 14, 2025",
    description:
      "Blockchain-based platform for secure and transparent trade documentation management.",
    latestUpdate:
      "Smart contracts deployed and tested successfully",
    updateDate: "2025-11-14",
    nextMilestone: "Partner onboarding pilot — Dec 2025",
  },
  {
    id: 4,
    name: "Digital Payment Gateway Integration",
    owner: "Yousef Al Fahim",
    manager: "Aisha Al Zarooni",
    type: "Digital Solutions",
    progress: 28,
    status: "Delayed / At Risk",
    lastUpdate: "Nov 8, 2025",
    description:
      "Integration of modern payment gateways for seamless customs fee collection.",
    latestUpdate:
      "Delays due to security compliance requirements",
    updateDate: "2025-11-08",
    nextMilestone: "Security compliance clearance — Feb 2026",
  },
  {
    id: 5,
    name: "Dubai Customs Customer Experience Transformation Program",
    owner: "Mohammed Al Kaabi",
    manager: "Layla Al Suwaidi",
    type: "New Services",
    progress: 60,
    status: "On Track",
    lastUpdate: "Nov 10, 2025",
    description:
      "Customer-centric transformation program to enhance service delivery and user experience.",
    latestUpdate: "New customer portal launched in beta",
    updateDate: "2025-11-10",
    nextMilestone: "Full portal go-live — Jan 2026",
  },
  {
    id: 6,
    name: "Trade Compliance Automation System",
    owner: "Hessa Al Mutawa",
    manager: "Saeed Al Marri",
    type: "New Services",
    progress: 38,
    status: "On Track",
    lastUpdate: "Nov 9, 2025",
    description:
      "Automated system for trade compliance verification and regulatory adherence.",
    latestUpdate: "Core modules development completed",
    updateDate: "2025-11-09",
    nextMilestone: "QA testing phase — Dec 2025",
  },
  {
    id: 7,
    name: "Customs Data Analytics Platform",
    owner: "Rashed Al Shamsi",
    manager: "Latifa Al Mulla",
    type: "New Services",
    progress: 15,
    status: "On Hold",
    lastUpdate: "Nov 5, 2025",
    description:
      "Advanced analytics platform for customs data insights and predictive modeling.",
    latestUpdate: "On hold pending budget approval",
    updateDate: "2025-11-05",
    nextMilestone: "Budget approval — TBD",
  },
  {
    id: 8,
    name: "Automated Cargo Risk Assessment Initiative",
    owner: "Mariam Al Falasi",
    manager: "Sultan Al Ketbi",
    type: "Impact Assessment",
    progress: 55,
    status: "On Track",
    lastUpdate: "Nov 11, 2025",
    description:
      "Next generation automated lane processing with AI-driven anomaly detection.",
    latestUpdate:
      "MVP build started. First three lanes wired and instrumented at Jebel Ali South.",
    updateDate: "2025-11-11",
    nextMilestone: "MVP demo at Jebel Ali — Dec 2025",
  },
  {
    id: 9,
    name: "Cross-Border Trade Impact Study",
    owner: "Salem Al Kaabi",
    manager: "Hind Al Shamsi",
    type: "Impact Assessment",
    progress: 42,
    status: "Progress Made",
    lastUpdate: "Nov 7, 2025",
    description:
      "Comprehensive study analyzing the impact of trade policies on cross-border operations.",
    latestUpdate: "Data collection phase completed",
    updateDate: "2025-11-07",
    nextMilestone: "Interim report submission — Jan 2026",
  },
  {
    id: 10,
    name: "Strategic Roadmap 2030",
    owner: "Dr. Khalifa Al Mazrouei",
    manager: "Amna Al Blooshi",
    type: "Strategy",
    progress: 80,
    status: "On Track",
    lastUpdate: "Nov 15, 2025",
    description:
      "Long-term strategic planning initiative for Dubai Customs vision 2030.",
    latestUpdate: "Final draft submitted for executive review",
    updateDate: "2025-11-15",
    nextMilestone: "Board ratification — Dec 2025",
  },
  {
    id: 11,
    name: "Organizational Excellence Framework",
    owner: "Maryam Al Suwaidi",
    manager: "Omar Al Dhaheri",
    type: "Strategy",
    progress: 62,
    status: "Progress Made",
    lastUpdate: "Nov 11, 2025",
    description:
      "Framework implementation for organizational excellence and continuous improvement.",
    latestUpdate:
      "Training programs launched across departments",
    updateDate: "2025-11-11",
    nextMilestone: "Certification audit — Feb 2026",
  },
  {
    id: 12,
    name: "AI-Powered Clearance System Proposal",
    owner: "Rashid Al Tayer",
    manager: "Sara Al Zaabi",
    type: "Proposals",
    progress: 25,
    status: "On Hold",
    lastUpdate: "Nov 6, 2025",
    description:
      "Proposal for implementing AI-powered automated clearance system.",
    latestUpdate: "Awaiting technical feasibility assessment",
    updateDate: "2025-11-06",
    nextMilestone: "Feasibility report — Jan 2026",
  },
  {
    id: 13,
    name: "Green Customs Initiative Proposal",
    owner: "Latifa Al Ketbi",
    manager: "Majid Al Nuaimi",
    type: "Proposals",
    progress: 30,
    status: "Progress Made",
    lastUpdate: "Nov 9, 2025",
    description:
      "Environmental sustainability initiative for green customs operations.",
    latestUpdate:
      "Initial assessment and stakeholder consultations completed",
    updateDate: "2025-11-09",
    nextMilestone: "Proposal approval — Dec 2025",
  },
];

const projectTypeInfo = {
  "Digital Solutions": {
    description:
      "Technology-driven initiatives for operational transformation",
    color: "#008755", // primary blue (system core)
  },

  "New Services": {
    description:
      "Service enhancement and customer experience programs",
    color: "#16A34A", // clean green (execution / delivery / success)
  },

  "Impact Assessment": {
    description:
      "Strategic analysis and evaluation initiatives",
    color: "#D97706", // amber (insight / evaluation / caution)
  },

  Strategy: {
    description:
      "Long-term planning and organizational development",
    color: "#4F46E5", // indigo (planning / intelligence layer)
  },

  Proposals: {
    description: "New project proposals under evaluation",
    color: "#64748B", // slate gray (neutral / early stage / undecided)
  },
};

// Key Updates data
const keyUpdates = [
  {
    id: 1,
    projectName: "Automated Cargo Risk Assessment Initiative",
    status: "On Track",
    updates: [
      {
        title: "MVP build started",
        description:
          "First three lanes wired and instrumented at Jebel Ali South.",
        date: "2025-01-18",
      },
      {
        title: "UI/UX sign-off",
        description:
          "Operator console approved by frontline supervisors.",
        date: "2025-01-10",
      },
    ],
  },
  {
    id: 2,
    projectName: "Blockchain Trade Documentation Platform",
    status: "On Track",
    updates: [
      {
        title: "Smart contracts deployed",
        description:
          "Production environment setup completed with security audit.",
        date: "2025-01-15",
      },
      {
        title: "Pilot phase initiated",
        description:
          "Five major trading partners onboarded for testing.",
        date: "2025-01-08",
      },
    ],
  },
  {
    id: 3,
    projectName: "Strategic Roadmap 2030",
    status: "On Track",
    updates: [
      {
        title: "Executive review completed",
        description: "Final draft approved by leadership team.",
        date: "2025-01-16",
      },
    ],
  },
  {
    id: 4,
    projectName:
      "Dubai Customs Customer Experience Transformation Program",
    status: "On Track",
    updates: [
      {
        title: "Beta portal launch",
        description:
          "New customer portal launched with 500 early adopters.",
        date: "2025-01-12",
      },
    ],
  },
];

// Support Requests data
const supportRequests = [
  {
    id: 1,
    projectName: "Automated Cargo Risk Assessment Initiative",
    status: "On Track",
    issueTitle: "Lane sensor calibration drift",
    priority: "High",
  },
  {
    id: 2,
    projectName: "Blockchain Trade Documentation Platform",
    status: "On Track",
    issueTitle: "GPU quota increase request",
    priority: "Medium",
  },
  {
    id: 3,
    projectName: "Digital Payment Gateway Integration",
    status: "Delayed / At Risk",
    issueTitle: "Security compliance documentation",
    priority: "High",
  },
  {
    id: 4,
    projectName: "Smart Inspection & Risk Management System",
    status: "Progress Made",
    issueTitle: "API integration support needed",
    priority: "Medium",
  },
  {
    id: 5,
    projectName: "Customs Data Analytics Platform",
    status: "On Hold",
    issueTitle: "Budget approval pending",
    priority: "High",
  },
  {
    id: 6,
    projectName: "AI-Powered Clearance System Proposal",
    status: "On Hold",
    issueTitle: "Technical feasibility assessment",
    priority: "Medium",
  },
  {
    id: 7,
    projectName: "Trade Compliance Automation System",
    status: "On Track",
    issueTitle: "Additional developer resources",
    priority: "Low",
  },
];

// Key Risks data
const keyRisks = [
  {
    id: 1,
    projectName: "Automated Cargo Risk Assessment Initiative",
    status: "On Track",
    riskTitle: "Sensor calibration drift",
    priority: "High",
    mitigation: "Vendor onsite weekly until stable baseline",
  },
  {
    id: 2,
    projectName: "Digital Payment Gateway Integration",
    status: "Delayed / At Risk",
    riskTitle: "Security compliance delays",
    priority: "High",
    mitigation:
      "Dedicated compliance team assigned, weekly audit reviews",
  },
  {
    id: 3,
    projectName: "Blockchain Trade Documentation Platform",
    status: "On Track",
    riskTitle: "Partner adoption rate",
    priority: "Medium",
    mitigation:
      "Enhanced training program and dedicated support team",
  },
  {
    id: 4,
    projectName: "Customs Data Analytics Platform",
    status: "On Hold",
    riskTitle: "Budget constraints",
    priority: "High",
    mitigation:
      "Phased approach with priority modules identified",
  },
  {
    id: 5,
    projectName: "Smart Inspection & Risk Management System",
    status: "Progress Made",
    riskTitle: "Integration complexity",
    priority: "Medium",
    mitigation:
      "Additional technical resources allocated, extended timeline",
  },
  {
    id: 6,
    projectName:
      "Customs Clearance Digital Transformation Program",
    status: "Progress Made",
    riskTitle: "Change management resistance",
    priority: "Medium",
    mitigation:
      "Comprehensive training program and stakeholder engagement",
  },
  {
    id: 7,
    projectName: "AI-Powered Clearance System Proposal",
    status: "On Hold",
    riskTitle: "Technical feasibility uncertainty",
    priority: "High",
    mitigation:
      "Expert consultation and proof of concept development",
  },
  {
    id: 8,
    projectName: "Cross-Border Trade Impact Study",
    status: "Progress Made",
    riskTitle: "Data quality issues",
    priority: "Medium",
    mitigation:
      "Data validation framework and quality checks implemented",
  },
  {
    id: 9,
    projectName: "Strategic Roadmap 2030",
    status: "On Track",
    riskTitle: "Stakeholder alignment",
    priority: "Low",
    mitigation:
      "Regular stakeholder meetings and communication plan",
  },
  {
    id: 10,
    projectName: "Green Customs Initiative Proposal",
    status: "Progress Made",
    riskTitle: "Environmental impact measurement",
    priority: "Low",
    mitigation:
      "Partnership with environmental consultancy firm",
  },
];

export function DGDashboardPage({
  onBack,
}: DGDashboardPageProps) {
  const [selectedType, setSelectedType] = useState<
    string | null
  >(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [ownerFilter, setOwnerFilter] = useState("all");
  const [managerFilter, setManagerFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showTable, setShowTable] = useState(false);
  const [showSpecificUpdates, setShowSpecificUpdates] =
    useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<
    number | null
  >(null);
  const [showKeyUpdates, setShowKeyUpdates] = useState(false);
  const [showSupportRequests, setShowSupportRequests] =
    useState(false);
  const [showKeyRisks, setShowKeyRisks] = useState(false);

  // Calculate statistics
  const totalProjects = allProjects.length;
  const ongoingProjects = allProjects.filter(
    (p) =>
      p.status === "On Track" || p.status === "Progress Made",
  ).length;
  const delayedProjects = allProjects.filter(
    (p) => p.status === "Delayed / At Risk",
  ).length;
  const completedProjects = 0; // None in current data

  // Get project type counts
  const getProjectTypeCount = (type: string) => {
    return allProjects.filter((p) => p.type === type).length;
  };

  // Get ongoing and delayed counts for a type
  const getTypeStats = (type: string) => {
    const typeProjects = allProjects.filter(
      (p) => p.type === type,
    );
    const ongoing = typeProjects.filter(
      (p) =>
        p.status === "On Track" || p.status === "Progress Made",
    ).length;
    const delayed = typeProjects.filter(
      (p) => p.status === "Delayed / At Risk",
    ).length;
    return { ongoing, delayed };
  };

  // Get unique owners and managers
  const uniqueOwners = Array.from(
    new Set(allProjects.map((p) => p.owner)),
  );
  const uniqueManagers = Array.from(
    new Set(allProjects.map((p) => p.manager)),
  );

  // Filter projects for table
  const filteredProjects = allProjects.filter((project) => {
    const matchesType =
      typeFilter === "all" || project.type === typeFilter;
    const matchesSearch =
      searchQuery === "" ||
      project.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      project.owner
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      project.manager
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesOwner =
      ownerFilter === "all" || project.owner === ownerFilter;
    const matchesManager =
      managerFilter === "all" ||
      project.manager === managerFilter;
    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;
    return (
      matchesType &&
      matchesSearch &&
      matchesOwner &&
      matchesManager &&
      matchesStatus
    );
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Track":
        return "#357743";
      case "Progress Made":
        return "#008755";
      case "On Hold":
        return "#F2A200";
      case "Delayed / At Risk":
        return "#D83731";
      default:
        return "#6b7280";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "#D83731";
      case "Medium":
        return "#F2A200";
      case "Low":
        return "#357743";
      default:
        return "#6b7280";
    }
  };

  const projectTypeIcons = {
  "Digital Solutions": Cpu,
  "New Services": Sparkles,
  "Impact Assessment": BarChart3,
  Strategy: Target,
  Proposals: FilePlus,
};
  
  const handleTypeClick = (type: string) => {
    setSelectedType(type);
    setTypeFilter(type);
    setShowTable(true);
  };

  const handleGeneralUpdatesClick = () => {
    setSelectedType(null);
    setTypeFilter("all");
    setShowTable(true);
  };

  const handleDialogClose = (open: boolean) => {
    setShowTable(open);
    if (!open) {
      setSelectedType(null);
      setSearchQuery("");
      setOwnerFilter("all");
      setManagerFilter("all");
      setStatusFilter("all");
      setTypeFilter("all");
    }
  };

  const [expandedProjects, setExpandedProjects] = useState(
    new Set(),
  );

  const toggleProject = (id) => {
    setExpandedProjects((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const [expandedSupport, setExpandedSupport] = useState(null);

  const toggleSupport = (id) => {
    setExpandedSupport((prev) => (prev === id ? null : id));
  };

  const [expandedRisks, setExpandedRisks] = useState(null);

  const toggleRisk = (id) => {
    setExpandedRisks((prev) => (prev === id ? null : id));
  };
  const [openProjectSelect, setOpenProjectSelect] =
    useState(false);
  const [projectSearch, setProjectSearch] = useState("");
  // const filteredProjects = allProjects.filter((project) =>
  //   project.name.toLowerCase().includes(projectSearch.toLowerCase())
  // );

  return (
    <TooltipProvider>
      <div className="h-full overflow-auto">
        <div className="space-y-3 p-3">
          {/* Header Banner */}
          <Card className="relative text-white border-none shadow-lg overflow-hidden">
            <img
              src={bannerImage}
              alt="Dubai Customs Banner"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#005844]/80 to-[#008755]/80" />
            <CardContent className="pt-3 pb-3 relative z-10">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onBack}
                      className="text-white hover:bg-white/20 -ml-2"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                    <div className="h-12 w-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Building2 className="h-6 w-6" />
                    </div>
                    <div>
                      <h1 className="text-xl font-['Dubai:Medium',_sans-serif] mb-1">
                        Executive Dashboard
                      </h1>
                      <p className="text-white/90 text-sm">
                        Executive Overview – Dubai Customs
                        Programs & Strategic Projects
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleGeneralUpdatesClick}
                    className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    General Updates
                  </Button>
                  <Button
                    onClick={() => setShowSpecificUpdates(true)}
                    className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Specific Project Updates
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Projects KPI */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="cursor-pointer flex items-center justify-center "
                onClick={handleGeneralUpdatesClick}
              >
                <div className="relative w-40 h-40 flex items-center justify-center">
  {/* Outer ring */}
  <div className="absolute inset-0 rounded-full border-4 border-[#008755]/30 shadow-[#008755]/30 shadow-lg" />

  {/* Soft inner ring */}
  {/* <div className="absolute inset-2 rounded-full border border-[#008755]/10" /> */}

  {/* Content */}
  <div className="relative text-center space-y-1">

    {/* Icon */}
    <div className="flex justify-center items-center gap-2">
      {/* <FolderKanban className="h-5 w-5 text-[#008755] opacity-80" /> */}
       <p className="text-[13px] font-['Dubai',_'Dubai'] text-muted-foreground">
      Total Projects
    </p>
    </div>

    {/* Label */}
   

    {/* Value */}
    <div className="text-4xl font-['Dubai:Medium',_'Dubai'] text-[#008755] leading-none">
      {totalProjects}
    </div>

  </div>
</div>
              </div>
            </TooltipTrigger>

            <TooltipContent
              side="bottom"
              className="bg-white p-4 shadow-lg border max-w-xs"
            >
              <div className="space-y-3">
                <div className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] text-sm mb-2">
                  Project Breakdown
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-6">
                    <span className="text-sm text-muted-foreground">
                      Ongoing
                    </span>
                    <span className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#357743]">
                      {ongoingProjects} projects
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-6">
                    <span className="text-sm text-muted-foreground">
                      Delayed
                    </span>
                    <span className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#D83731]">
                      {delayedProjects} projects
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-6">
                    <span className="text-sm text-muted-foreground">
                      Completed
                    </span>
                    <span className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                      {completedProjects} projects
                    </span>
                  </div>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
          <div className="w-[1px] h-14 bg-primary/50 mx-auto -mt-2 mb-1"></div>
          {/* Section Label */}
          {/* <div className="mt-6">
            <h2 className="text-sm font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-3 tracking-wide">
              PROJECT TYPES
            </h2>
          </div> */}

          {/* Project Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {Object.entries(projectTypeInfo).map(
              ([type, info]) => {
                const count = getProjectTypeCount(type);
                const stats = getTypeStats(type);
                return (
                  <Tooltip key={type}>
                    <TooltipTrigger asChild>
       <Card
  className="cursor-pointer hover:shadow-sm transition-all border border-gray-200 hover:border-gray-300"
  onClick={() => handleTypeClick(type)}
>
  <CardContent className="pt-4 pb-4">
    <div className="space-y-2">

      {/* Title row */}
      <div className="flex items-center justify-center gap-2">
        {/* {(() => {
          const Icon = projectTypeIcons[type];
          return (
            <Icon
              className="h-4 w-4"
              style={{ color: info.color }}
            />
          );
        })()} */}

        <div className="text-sm text-muted-foreground">
          {type}
        </div>
      </div>

      {/* Count */}
      <div
        className="text-2xl font-['Dubai:Medium',_'Dubai'] text-center"
        style={{ color: info.color }}
      >
        {count}
      </div>

    </div>
  </CardContent>
</Card>


                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      className="bg-white p-4 shadow-lg border max-w-xs"
                    >
                      <div className="space-y-3">
                        <div className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] text-sm">
                          {type}
                        </div>
                        <div className="text-xs text-muted-foreground leading-relaxed">
                          {info.description}
                        </div>
                        <div className="pt-1 border-t">
                          <div className="text-xs">
                            <span
                              className="font-['Dubai:Medium',_'Dubai']"
                              style={{ color: info.color }}
                            >
                              {stats.ongoing} ongoing
                            </span>
                            {stats.delayed > 0 && (
                              <>
                                {" · "}
                                <span className="font-['Dubai:Medium',_'Dubai'] text-[#D83731]">
                                  {stats.delayed} delayed
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                );
              },
            )}
          </div>

          {/* Section Label */}
          <div className="mt-6">
            <h2 className="text-xs font-medium text-muted-foreground tracking-widest uppercase mb-3">
              Overview
            </h2>
          </div>

          {/* Summary Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Key Updates */}
            <Card
              className="border-gray-200 hover:border-gray-300  cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setShowKeyUpdates(true)}
            >
              <CardHeader>
                <CardTitle className="font-['Dubai:Medium',_'Dubai'] text-sm flex items-center gap-2 text-[#008755]">
                  <TrendingUp className="h-4 w-4" />
                  Key Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="-mt-5">
                  <div className="text-2xl font-['Dubai:Medium',_'Dubai'] text-[#008755]">
                    {totalProjects}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Active project updates
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Requests */}
            <Card
              className="border-gray-200 hover:border-gray-300  cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setShowSupportRequests(true)}
            >
              <CardHeader>
                <CardTitle className="font-['Dubai:Medium',_'Dubai'] text-sm flex items-center gap-2 text-[#F2A200]">
                  <AlertCircle className="h-4 w-4" />
                  Support Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="-mt-5">
                  <div className="text-2xl font-['Dubai:Medium',_'Dubai'] text-[#F2A200]">
                    {supportRequests.length}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Projects needing attention
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Risks */}
            <Card
              className="border-gray-200 hover:border-gray-300  cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setShowKeyRisks(true)}
            >
              <CardHeader>
                <CardTitle className="font-['Dubai:Medium',_'Dubai'] text-sm flex items-center gap-2 text-[#D83731]">
                  <FileText className="h-4 w-4" />
                  Key Risks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="-mt-5">
                  <div className="text-2xl font-['Dubai:Medium',_'Dubai'] text-[#D83731]">
                    {keyRisks.length}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Identified project risks
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Projects Modal Dialog */}
          <Dialog
            open={showTable}
            onOpenChange={handleDialogClose}
          >
            <DialogContent className="max-w-8xl max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-['Dubai:Medium',_'Dubai'] flex items-center gap-2">
                  {selectedType && (
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor:
                          projectTypeInfo[
                            selectedType as keyof typeof projectTypeInfo
                          ].color,
                      }}
                    />
                  )}
                  {selectedType || "All Projects"}
                </DialogTitle>
                <DialogDescription>
                  {filteredProjects.length} project
                  {filteredProjects.length !== 1
                    ? "s"
                    : ""}{" "}
                  found
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* Filters */}
                <div className="flex flex-wrap items-end gap-4">
                  {/* Search */}
                  <div className="flex-1 min-w-[200px]">
                    <label className="text-xs text-muted-foreground mb-1 block">
                      Search
                    </label>

                    <div className="relative">
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
                  </div>

                  {/* Type */}
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">
                      Project Type
                    </label>

                    <Select
                      value={typeFilter}
                      onValueChange={setTypeFilter}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="all">
                          All Types
                        </SelectItem>
                        {Object.keys(projectTypeInfo).map(
                          (type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Owner */}
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">
                      Owner
                    </label>

                    <Select
                      value={ownerFilter}
                      onValueChange={setOwnerFilter}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="All Owners" />
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
                  </div>

                  {/* Manager */}
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">
                      Manager
                    </label>

                    <Select
                      value={managerFilter}
                      onValueChange={setManagerFilter}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="All Managers" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="all">
                          All Managers
                        </SelectItem>
                        {uniqueManagers.map((manager) => (
                          <SelectItem
                            key={manager}
                            value={manager}
                          >
                            {manager}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">
                      Status
                    </label>

                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="All Status" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="all">
                          All Status
                        </SelectItem>
                        <SelectItem value="On Track">
                          On Track
                        </SelectItem>
                        <SelectItem value="Progress Made">
                          Progress Made
                        </SelectItem>
                        <SelectItem value="On Hold">
                          On Hold
                        </SelectItem>
                        <SelectItem value="Delayed / At Risk">
                          Delayed / At Risk
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto border rounded-lg">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-3 font-['Dubai:Medium',_'Dubai'] text-[#1f2937] whitespace-nowrap min-w-[280px]">
                          Project
                        </th>
                        <th className="text-left p-3 font-['Dubai:Medium',_'Dubai'] text-[#1f2937] whitespace-nowrap">
                          Owner
                        </th>
                        <th className="text-left p-3 font-['Dubai:Medium',_'Dubai'] text-[#1f2937] whitespace-nowrap">
                          Manager
                        </th>
                        <th className="text-left p-3 font-['Dubai:Medium',_'Dubai'] text-[#1f2937] whitespace-nowrap">
                          Type
                        </th>
                        <th className="text-left p-3 font-['Dubai:Medium',_'Dubai'] text-[#1f2937] whitespace-nowrap min-w-[150px]">
                          Progress
                        </th>
                        <th className="text-left p-3 font-['Dubai:Medium',_'Dubai'] text-[#1f2937] whitespace-nowrap min-w-[180px]">
                          Next Milestone
                        </th>
                        <th className="text-left p-3 font-['Dubai:Medium',_'Dubai'] text-[#1f2937] whitespace-nowrap">
                          Status
                        </th>
                        <th className="text-left p-3 font-['Dubai:Medium',_'Dubai'] text-[#1f2937] whitespace-nowrap">
                          Last Update
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProjects.map((project) => (
                        <tr
                          key={project.id}
                          className="border-b hover:bg-muted/30 transition-colors"
                        >
                          <td className="p-3">
                            <div className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                              {project.name}
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5 max-w-[280px] leading-snug">
                              {project.description}
                            </div>
                          </td>
                          <td className="p-3 text-[#1f2937]">
                            {project.owner}
                          </td>
                          <td className="p-3 text-[#1f2937]">
                            {project.manager}
                          </td>
                          <td className="p-3">
                            <Badge
                              style={{
                                backgroundColor:
                                  projectTypeInfo[
                                    project.type as keyof typeof projectTypeInfo
                                  ].color + "20",
                                color:
                                  projectTypeInfo[
                                    project.type as keyof typeof projectTypeInfo
                                  ].color,
                              }}
                              className="whitespace-nowrap"
                            >
                              {project.type}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <Progress
                                value={project.progress}
                                className="h-2 flex-1"
                              />
                              <span className="text-xs font-['Dubai:Medium',_'Dubai'] text-[#1f2937] min-w-[35px]">
                                {project.progress}%
                              </span>
                            </div>
                          </td>
                          <td className="p-3 text-xs text-[#1f2937] whitespace-nowrap">
                            {project.nextMilestone}
                          </td>
                          <td className="p-3">
                            <Badge
                              style={{
                                backgroundColor:
                                  getStatusColor(
                                    project.status,
                                  ) + "20",
                                color: getStatusColor(
                                  project.status,
                                ),
                              }}
                              className="whitespace-nowrap"
                            >
                              {project.status}
                            </Badge>
                          </td>
                          <td className="p-3 text-muted-foreground ">
                            {project.latestUpdate}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredProjects.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No projects match the selected filters
                    </div>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Specific Project Updates Modal */}
          <Dialog
            open={showSpecificUpdates}
            onOpenChange={setShowSpecificUpdates}
          >
            <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-['Dubai:Medium',_'Dubai'] flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[#008755]" />
                  Specific Project Updates
                </DialogTitle>
                <DialogDescription>
                  Select a project to view detailed information
                  and latest updates
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Project Selector */}
                <div>
                  <label className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                    Select Project
                  </label>

                  <Select
                    value={selectedProjectId?.toString() || ""}
                    onValueChange={(value) =>
                      setSelectedProjectId(Number(value))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Search & choose project..." />
                    </SelectTrigger>

                    <SelectContent>
                      {/* SEARCH INPUT INSIDE DROPDOWN */}
                      <div className="relative p-2 border-b">
                        <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                        <Input
                          placeholder="Type to search..."
                          value={projectSearch}
                          onChange={(e) =>
                            setProjectSearch(e.target.value)
                          }
                          className="pl-9"
                        />
                      </div>

                      {/* FILTERED RESULTS */}
                      {filteredProjects.length > 0 ? (
                        filteredProjects.map((project) => (
                          <SelectItem
                            key={project.id}
                            value={project.id.toString()}
                          >
                            {project.name}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="px-3 py-2 text-sm text-muted-foreground">
                          No projects found
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {/* Project Details */}
                {selectedProjectId &&
                  (() => {
                    const project = allProjects.find(
                      (p) => p.id === selectedProjectId,
                    );
                    if (!project) return null;

                    return (
                      <Card className="border-[#008755]/20">
                        <CardContent className="pt-6 space-y-6">
                          {/* HEADER */}
                          <div>
                            <div className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] text-lg">
                              {project.name}
                            </div>

                            <div className="flex items-center gap-2 mt-2">
                              <Badge
                                style={{
                                  backgroundColor:
                                    projectTypeInfo[
                                      project.type
                                    ].color + "20",
                                  color:
                                    projectTypeInfo[
                                      project.type
                                    ].color,
                                }}
                              >
                                {project.type}
                              </Badge>

                              <Badge
                                style={{
                                  backgroundColor:
                                    getStatusColor(
                                      project.status,
                                    ) + "20",
                                  color: getStatusColor(
                                    project.status,
                                  ),
                                }}
                              >
                                {project.status}
                              </Badge>
                            </div>
                          </div>

                          {/* GRID INFO */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 rounded-lg bg-gray-50">
                              <div className="text-xs text-muted-foreground">
                                Owner
                              </div>
                              <div className="font-['Dubai',_'Dubai'] text-[#1f2937]">
                                {project.owner}
                              </div>
                            </div>

                            <div className="p-3 rounded-lg bg-gray-50">
                              <div className="text-xs text-muted-foreground">
                                Manager
                              </div>
                              <div className="font-['Dubai',_'Dubai'] text-[#1f2937]">
                                {project.manager}
                              </div>
                            </div>
                          </div>

                          {/* DESCRIPTION */}
                          <div>
                            <div className="text-xs text-muted-foreground mb-1">
                              Description
                            </div>
                            <div className="text-sm text-[#1f2937] leading-relaxed">
                              {project.description}
                            </div>
                          </div>

                          {/* OVERALL PROGRESS */}
                          <div className="pt-4 border-t">
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-xs text-muted-foreground">
                                Overall Progress
                              </div>
                              <span className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#008755]">
                                {project.progress}%
                              </span>
                            </div>
                            <div className="h-2.5 w-full rounded-full bg-[#E5E7EB] overflow-hidden">
                              <div
                                className="h-full rounded-full bg-[#008755] transition-all"
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                          </div>

                          {/* LATEST UPDATE */}
                          <div className="pt-4 border-t">
                            <div className="text-xs text-muted-foreground mb-2">
                              Latest Update
                            </div>
                            <div className="bg-[#008755]/5 rounded-lg p-4 border border-[#008755]/20">
                              <div className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                                {project.latestUpdate}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Latest · {project.updateDate}
                              </div>
                            </div>
                          </div>

                          {/* UPCOMING MILESTONE */}
                          <div className="pt-4 border-t">
                            <div className="text-xs text-muted-foreground mb-2">
                              Upcoming Milestone
                            </div>
                            <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200">
                              <div className="h-2 w-2 rounded-full bg-amber-500 shrink-0" />
                              <span className="text-sm text-[#1f2937]">
                                {project.nextMilestone}
                              </span>
                            </div>
                          </div>

                          {/* KEY RISKS */}
                          {(() => {
                            const risks = keyRisks.filter(
                              (r) => r.projectName === project.name,
                            );
                            if (risks.length === 0) return null;
                            return (
                              <div className="pt-4 border-t">
                                <div className="text-xs text-muted-foreground mb-2">
                                  Key Risks
                                </div>
                                <div className="space-y-2">
                                  {risks.map((risk) => {
                                    const priorityColor =
                                      risk.priority === "High"
                                        ? { bg: "#FEF2F2", text: "#DC2626", dot: "#DC2626" }
                                        : risk.priority === "Medium"
                                        ? { bg: "#FFFBEB", text: "#D97706", dot: "#D97706" }
                                        : { bg: "#F0FDF4", text: "#16A34A", dot: "#16A34A" };
                                    return (
                                      <div
                                        key={risk.id}
                                        className="rounded-lg border p-3 space-y-1"
                                      >
                                        <div className="flex items-center justify-between">
                                          <span className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                                            {risk.riskTitle}
                                          </span>
                                          <span
                                            className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                                            style={{
                                              backgroundColor: priorityColor.bg,
                                              color: priorityColor.text,
                                            }}
                                          >
                                            {risk.priority}
                                          </span>
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                          <span className="font-medium text-[#1f2937]">Mitigation: </span>
                                          {risk.mitigation}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })()}
                        </CardContent>
                      </Card>
                    );
                  })()}

                {!selectedProjectId && (
                  <div className="text-center py-14 text-muted-foreground">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#008755]/10 flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-[#008755]" />
                    </div>

                    <p className="font-['Dubai',_'Dubai']">
                      Select a project to view detailed insights
                    </p>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>

          {/* Key Updates Modal */}
          <Dialog
            open={showKeyUpdates}
            onOpenChange={setShowKeyUpdates}
          >
            <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-['Dubai:Medium',_'Dubai'] flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[#008755]" />
                  Key Updates
                </DialogTitle>
                <DialogDescription>
                  Recent project updates and milestones
                </DialogDescription>
              </DialogHeader>

              <div className="max-h-[75vh] overflow-y-auto pr-2">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
                  {keyUpdates.map((project) => {
                    const isOpen = expandedProjects.has(
                      project.id,
                    );

                    return (
                      <Card
                        key={project.id}
                        className="border-[#008755]/20 cursor-pointer"
                      >
                        <CardContent className="pt-5 pb-4 space-y-3">
                          {/* HEADER (click to expand) */}
                          <div
                            className="flex items-start justify-between"
                            onClick={() =>
                              toggleProject(project.id)
                            }
                          >
                            <div>
                              <div className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] text-base">
                                {project.projectName}
                              </div>

                              <Badge
                                style={{
                                  backgroundColor:
                                    getStatusColor(
                                      project.status,
                                    ) + "20",
                                  color: getStatusColor(
                                    project.status,
                                  ),
                                }}
                                className="text-xs mt-2"
                              >
                                {project.status}
                              </Badge>
                            </div>

                            {/* expand indicator */}
                            <div className="text-2xl text-muted-foreground">
                              {isOpen ? "−" : "+"}
                            </div>
                          </div>

                          {/* COLLAPSIBLE CONTENT */}
                          {isOpen && (
                            <div className="space-y-3 pt-3 border-t">
                              {project.updates.map(
                                (update, idx) => (
                                  <div
                                    key={idx}
                                    className="flex gap-3 items-start"
                                  >
                                    <div className="mt-1 w-2 h-2 rounded-full bg-[#008755]" />

                                    <div className="flex-1">
                                      <div className="font-['Dubai:Medium',_'Dubai'] text-[#008755] text-sm">
                                        {update.title}
                                      </div>

                                      <div className="font-['Dubai',_'Dubai'] text-[#1f2937] text-sm">
                                        {update.description}
                                      </div>

                                      <div className="text-xs text-muted-foreground mt-1">
                                        {update.date}
                                      </div>
                                    </div>
                                  </div>
                                ),
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Support Requests Modal */}
          <Dialog
            open={showSupportRequests}
            onOpenChange={setShowSupportRequests}
          >
            <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-['Dubai:Medium',_'Dubai'] flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-[#F2A200]" />
                  Support Requests
                </DialogTitle>
                <DialogDescription>
                  Projects requiring attention and support
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
                {supportRequests.map((request) => {
                  const isOpen = expandedSupport === request.id;

                  return (
                    <Card
                      key={request.id}
                      className="border-[#F2A200]/20 cursor-pointer h-fit"
                    >
                      <CardContent className="pt-5 pb-4 space-y-3">
                        {/* HEADER */}
                        <div
                          className="flex items-start justify-between"
                          onClick={() =>
                            toggleSupport(request.id)
                          }
                        >
                          <div>
                            <div className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] text-base">
                              {request.projectName}
                            </div>

                            <Badge
                              style={{
                                backgroundColor:
                                  getStatusColor(
                                    request.status,
                                  ) + "20",
                                color: getStatusColor(
                                  request.status,
                                ),
                              }}
                              className="text-xs mt-2"
                            >
                              {request.status}
                            </Badge>
                          </div>

                          <div className="text-2xl text-muted-foreground">
                            {isOpen ? "−" : "+"}
                          </div>
                        </div>

                        {/* COLLAPSED CONTENT */}
                        {isOpen && (
                          <div className="space-y-3 flex justify-between items-center pt-3 border-t">
                            <div className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] text-sm">
                              {request.issueTitle}
                            </div>

                            <Badge
                              style={{
                                backgroundColor:
                                  getPriorityColor(
                                    request.priority,
                                  ) + "20",
                                color: getPriorityColor(
                                  request.priority,
                                ),
                              }}
                              className="text-xs"
                            >
                              {request.priority}
                            </Badge>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </DialogContent>
          </Dialog>

          {/* Key Risks Modal */}
          <Dialog
            open={showKeyRisks}
            onOpenChange={setShowKeyRisks}
          >
            <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-['Dubai:Medium',_'Dubai'] flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#D83731]" />
                  Key Risks
                </DialogTitle>
                <DialogDescription>
                  Identified project risks and mitigation
                  strategies
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
                {keyRisks.map((risk) => {
                  const isOpen = expandedRisks === risk.id;

                  return (
                    <Card
                      key={risk.id}
                      className="border-[#D83731]/20 cursor-pointer h-fit"
                    >
                      <CardContent className="pt-5 pb-4 space-y-3">
                        {/* HEADER */}
                        <div
                          className="flex items-start justify-between"
                          onClick={() => toggleRisk(risk.id)}
                        >
                          <div>
                            <div className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] text-base">
                              {risk.projectName}
                            </div>

                            <Badge
                              style={{
                                backgroundColor:
                                  getStatusColor(risk.status) +
                                  "20",
                                color: getStatusColor(
                                  risk.status,
                                ),
                              }}
                              className="text-xs mt-2"
                            >
                              {risk.status}
                            </Badge>
                          </div>

                          <div className="text-2xl text-muted-foreground">
                            {isOpen ? "−" : "+"}
                          </div>
                        </div>

                        {/* COLLAPSED CONTENT */}
                        {isOpen && (
                          <div className="space-y-3 pt-3 border-t">
                            <div className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] text-sm">
                              {risk.riskTitle}
                            </div>

                            <Badge
                              style={{
                                backgroundColor:
                                  getPriorityColor(
                                    risk.priority,
                                  ) + "20",
                                color: getPriorityColor(
                                  risk.priority,
                                ),
                              }}
                              className="text-xs"
                            >
                              {risk.priority}
                            </Badge>

                            <div>
                              <div className="text-xs text-muted-foreground mb-1">
                                Mitigation
                              </div>

                              <div className="font-['Dubai',_'Dubai'] text-[#1f2937] text-sm">
                                {risk.mitigation}
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </TooltipProvider>
  );
}