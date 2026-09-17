import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  AlertCircle,
  Save,
  Send,
  FileText,
  Building2,
  DollarSign,
  ShieldAlert,
  Users,
  Target,
  TrendingUp,
  FolderKanban,
  Flag,
  Gift,
  AlertTriangle,
  Users2,
  Trash2,
  Edit,
  Plus,
  ChevronRight,
  Home,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Brain,
  TrendingDown,
  Info,
  ChevronDownIcon,
  CheckIcon
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import bannerImage from "figma:asset/2ceb5f3890ecf49940adbd1e2cca8cf7647ce99f.png";

interface CreateProjectPageProps {
  onBack: () => void;
  initialData?: any;
}

type SectionStatus =
  | "Not Started"
  | "In Progress"
  | "Completed";
type FinanceStatus =
  | "Not Submitted"
  | "Under Review"
  | "Approved"
  | "Rejected";

export function CreateProjectPage({
  onBack,
  initialData,
}: CreateProjectPageProps) {
  const [activeTab, setActiveTab] = useState<string>("basic");
  const [goalsBenefitsSubTab, setGoalsBenefitsSubTab] =
    useState<"goals" | "benefits">("goals");
  const [risksIssuesSubTab, setRisksIssuesSubTab] = useState<
    "risks" | "issues"
  >("risks");
  const [projectStatus, setProjectStatus] = useState<
    "Draft" | "Under Financial Review" | "Submitted"
  >("Draft");
  const [lifecycleStage, setLifecycleStage] = useState<
    | "Ideation"
    | "Pilot"
    | "Handover"
    | "Implementation"
    | "Monitoring"
  >("Ideation");
  const [financeStatus, setFinanceStatus] =
    useState<FinanceStatus>("Not Submitted");

  // Ideation Workflow Gate fields
  const [
    directionalApprovalRequired,
    setDirectionalApprovalRequired,
  ] = useState<boolean>(false);
  const [productType, setProductType] = useState<string>("");
  const [pilotRequired, setPilotRequired] =
    useState<boolean>(false);
  const [gateStatus, setGateStatus] = useState<
    "Pending Review" | "Approved" | "Rejected"
  >("Pending Review");
  const [businessReqChecklist, setBusinessReqChecklist] =
    useState<boolean>(false);
  const [functionalReqChecklist, setFunctionalReqChecklist] =
    useState<boolean>(false);
  const [
    legalFeasibilityChecklist,
    setLegalFeasibilityChecklist,
  ] = useState<boolean>(false);

  // AI Insights state
  const [aiInsightsExpanded, setAiInsightsExpanded] =
    useState<boolean>(true);

  // Expandable benefits rows state
  const [expandedBenefits, setExpandedBenefits] = useState<
    Set<string>
  >(new Set());

  const [sectionStatuses, setSectionStatuses] = useState({
    basic: "In Progress" as SectionStatus,
    organizational: "Not Started" as SectionStatus,
    governance: "Not Started" as SectionStatus,
    goalsBenefits: "Not Started" as SectionStatus,
    risks: "Not Started" as SectionStatus,
    team: "Not Started" as SectionStatus,
  });

  const [formData, setFormData] = useState({
    // Basic Information
    projectName: "",
    projectId: "",
    description: "",
    lifecycleStatus: "Draft",
    division: "Project",
    types: [] as string[],
    category: "",
    program: "",
    hasBudget: "",
    budgetAmount: "",
    frameworkLinkage: [] as string[],

    // Organizational Alignment
    strategicPillar: "",
    section: "",
    owner: "",
    sponsor: "",

    // Timeline
    startDate: "",
    endDate: "",

    // Governance & Risk
    riskLevel: "Low",
    complianceRequirements: [] as string[],
    stakeholders: [] as string[],

    // Goals
    goals: [] as Array<{
      id: string;
      title: string;
      description: string;
    }>,

    // Benefits
    benefits: [] as Array<{
      id: string;
      name: string;
      impactLevel: string;
      timeframe: string;
      kpis: Array<{ id: string; name: string }>;
    }>,

    // Risks
    risks: [] as Array<{
      id: string;
      risk: string;
      description: string;
      severity: string;
      strategy: string;
      mitigationStrategy: string;
      supportRequired: string;
      owner: string;
      status: string;
      issues: string;
    }>,

    // Issues
    issues: [] as Array<{
      id: string;
      name: string;
      description: string;
      priority: string;
      status: string;
      dateReported: string;
    }>,

    // Stakeholders
    stakeholdersList: [] as Array<{
      id: string;
      name: string;
      role: string;
      relation: string;
      classification: string;
      expectations: string;
      responsibilities: string;
    }>,

    // Team
    team: [] as Array<{
      id: string;
      member: string;
      role: string;
      allocation: string;
      responsibility: string;
    }>,
  });

  // Pre-fill form data when editing an existing project
  useEffect(() => {
    if (initialData) {
      // Parse timeline to extract start and end dates
      const timelineParts = initialData.timeline?.split(" - ") || [];

      setFormData({
        projectName: initialData.name || "",
        projectId: initialData.id || "",
        description: initialData.description || "",
        lifecycleStatus: initialData.lifecycleStatus || "Draft",
        division: initialData.division || "Project",
        types: initialData.types || [],
        category: initialData.category || "",
        program: initialData.program || "",
        hasBudget: initialData.budgetAmount ? "Yes" : "No",
        budgetAmount: initialData.budgetAmount || "",
        frameworkLinkage: initialData.frameworks || [],
        strategicPillar: initialData.strategicPillar || "",
        section: initialData.section || "",
        owner: initialData.owner || "",
        sponsor: initialData.sponsor || "",
        startDate: timelineParts[0] || "",
        endDate: timelineParts[1] || "",
        riskLevel: initialData.riskLevel || "Low",
        complianceRequirements: initialData.complianceRequirements || [],
        stakeholders: initialData.stakeholders || [],
        goals: initialData.goals || [],
        benefits: initialData.benefits || [],
        risks: initialData.risks || [],
        issues: initialData.issues || [],
        stakeholdersList: initialData.stakeholdersList || [],
        team: initialData.team || [],
      });

      if (initialData.lifecycleStatus) {
        // Map lifecycleStatus to lifecycleStage
        const statusToStageMap: Record<string, "Ideation" | "Pilot" | "Handover" | "Implementation" | "Monitoring"> = {
          "Draft": "Ideation",
          "Application": "Ideation",
          "Ongoing": "Implementation",
          "Closed": "Monitoring"
        };
        setLifecycleStage(statusToStageMap[initialData.lifecycleStatus] || "Ideation");
      }
      if (initialData.lifecycleStatus) {
        setProjectStatus(initialData.lifecycleStatus === "Draft" ? "Draft" : "Submitted");
      }
    }
  }, [initialData]);

  const updateSectionStatus = (
    section: keyof typeof sectionStatuses,
    status: SectionStatus,
  ) => {
    setSectionStatuses((prev) => ({
      ...prev,
      [section]: status,
    }));
  };

  const getStatusColor = (
    status: SectionStatus | undefined,
  ) => {
    if (!status) {
      return {
        bg: "#6b728020",
        color: "#6b7280",
        icon: Circle,
      };
    }
    switch (status) {
      case "Completed":
        return {
          bg: "#00875520",
          color: "#008755",
          icon: CheckCircle2,
        };
      case "In Progress":
        return {
          bg: "#00875520",
          color: "#008755",
          icon: AlertCircle,
        };
      case "Not Started":
        return {
          bg: "#6b728020",
          color: "#6b7280",
          icon: Circle,
        };
      default:
        return {
          bg: "#6b728020",
          color: "#6b7280",
          icon: Circle,
        };
    }
  };

  const getFinanceStatusColor = (status: FinanceStatus) => {
    switch (status) {
      case "Approved":
        return { bg: "#35774320", color: "#357743" };
      case "Under Review":
        return { bg: "#00875520", color: "#008755" };
      case "Rejected":
        return { bg: "#D8373120", color: "#D83731" };
      case "Not Submitted":
        return { bg: "#6b728020", color: "#6b7280" };
    }
  };

  const getGateStatusColor = (
    status: "Pending Review" | "Approved" | "Rejected",
  ) => {
    switch (status) {
      case "Approved":
        return { bg: "#35774320", color: "#357743" };
      case "Pending Review":
        return { bg: "#EAB30820", color: "#EAB308" };
      case "Rejected":
        return { bg: "#D8373120", color: "#D83731" };
    }
  };

  const renderStatusIcon = (
    status: SectionStatus | undefined,
    className: string = "h-3 w-3 mr-1 inline",
  ) => {
    const statusConfig = getStatusColor(status);
    const StatusIcon = statusConfig.icon;
    return <StatusIcon className={className} />;
  };

  const calculateCompletion = () => {
    const statuses = Object.values(sectionStatuses);
    const completed = statuses.filter(
      (s) => s === "Completed",
    ).length;
    return Math.round((completed / statuses.length) * 100);
  };

  const calculateReadinessScore = () => {
    const statuses = Object.values(sectionStatuses);
    const completed = statuses.filter(
      (s) => s === "Completed",
    ).length;
    const inProgress = statuses.filter(
      (s) => s === "In Progress",
    ).length;
    return Math.round(
      ((completed * 100 + inProgress * 50) /
        statuses.length /
        100) *
        100,
    );
  };

  const canSubmitFinancial = () => {
    // Can submit financial if basic sections are completed
    return (
      sectionStatuses.basic === "Completed" &&
      financeStatus === "Not Submitted"
    );
  };

  const canSubmitFull = () => {
    // Can submit full project if all sections completed AND finance approved AND directional approval granted
    const allCompleted = Object.values(sectionStatuses).every(
      (s) => s === "Completed",
    );
    return (
      allCompleted &&
      financeStatus === "Approved" &&
      (!directionalApprovalRequired ||
        gateStatus === "Approved")
    );
  };

  const handleSubmitFinancial = () => {
    setFinanceStatus("Under Review");
    setProjectStatus("Under Financial Review");
  };

  const handleSubmitFull = () => {
    setProjectStatus("Submitted");

    // Update lifecycle stage based on pilot requirement
    if (pilotRequired) {
      setLifecycleStage("Pilot");
      alert("Project approved! Moving to Pilot Phase.");
    } else {
      setLifecycleStage("Handover");
      alert("Project approved! Moving to Handover Stage.");
    }

    // Here you would typically submit to backend
    onBack();
  };

  const toggleBenefitExpanded = (benefitId: string) => {
    setExpandedBenefits((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(benefitId)) {
        newSet.delete(benefitId);
      } else {
        newSet.add(benefitId);
      }
      return newSet;
    });
  };
  const [frameworkOpen, setFrameworkOpen] = useState(false);
const frameworkRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        frameworkRef.current &&
        !frameworkRef.current.contains(e.target)
      ) {
        setFrameworkOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
  }, []);

  return (
    <div className="h-full overflow-auto bg-background">
      <div className="space-y-3 p-3">
        {/* HEADER BANNER */}
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
                      Create New Project
                    </h1>
                    <p className="text-white/90 text-sm">
                      Dubai Customs - Portfolio Management
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right mr-4">
                  <p className="text-xs text-white/80 mb-1">
                    Status
                  </p>
                  <Badge
                    style={{
                      backgroundColor:
                        projectStatus === "Draft"
                          ? "#6b728040"
                          : projectStatus ===
                              "Under Financial Review"
                            ? "#00875540"
                            : "#35774340",
                      color: "white",
                    }}
                    className="text-sm"
                  >
                    {projectStatus}
                  </Badge>
                </div>
                <div className="text-right mr-4">
                  <p className="text-xs text-white/80 mb-1">
                    Lifecycle Stage
                  </p>
                  <Badge
                    style={{
                      backgroundColor: "#00875540",
                      color: "white",
                    }}
                    className="text-sm"
                  >
                    {lifecycleStage}
                  </Badge>
                </div>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white bg-transparent text-white hover:bg-white/10 hover:text-white"
                  onClick={onBack}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Projects
                </Button>
              </div>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/90">
                    Overall Completion
                  </span>
                  <span className="text-sm text-white font-['Dubai:Medium',_'Dubai']">
                    {calculateCompletion()}%
                  </span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    className="bg-white rounded-full h-2 transition-all duration-300"
                    style={{
                      width: `${calculateCompletion()}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* GLOBAL AI INSIGHT BAR */}
        <Card className="border-[#008755]/30 bg-gradient-to-r from-[#008755]/5 to-[#008755]/10">
          <CardContent className="p-3">
            <button
              onClick={() =>
                setAiInsightsExpanded(!aiInsightsExpanded)
              }
              className="w-full flex items-center justify-between hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-[#008755]/20 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-[#008755]" />
                </div>
                <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] text-sm">
                  AI Project Insights
                </h3>
              </div>
              {aiInsightsExpanded ? (
                <ChevronUp className="h-4 w-4 text-[#008755]" />
              ) : (
                <ChevronDown className="h-4 w-4 text-[#008755]" />
              )}
            </button>

            {aiInsightsExpanded && (
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {/* Strategic Alignment Analysis */}
                <div className="bg-white rounded-lg p-3 border border-[#008755]/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-3.5 w-3.5 text-[#008755]" />
                    <span className="text-xs font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                      Strategic Alignment
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {formData.strategicPillar
                      ? `Aligned with ${formData.strategicPillar}. Strong strategic fit detected.`
                      : "Select a strategic pillar to see alignment analysis."}
                  </p>
                  <Badge
                    variant="outline"
                    className="text-xs"
                    style={{
                      borderColor: formData.strategicPillar
                        ? "#357743"
                        : "#6b7280",
                      color: formData.strategicPillar
                        ? "#357743"
                        : "#6b7280",
                    }}
                  >
                    {formData.strategicPillar
                      ? "High Alignment"
                      : "Pending"}
                  </Badge>
                </div>

                {/* Risk Prediction */}
                <div className="bg-white rounded-lg p-3 border border-[#008755]/20">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldAlert className="h-3.5 w-3.5 text-[#008755]" />
                    <span className="text-xs font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                      Risk Prediction
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {formData.riskLevel === "High"
                      ? "High-risk project. Consider additional mitigation strategies."
                      : formData.riskLevel === "Medium"
                        ? "Moderate risk level. Standard governance applies."
                        : "Low-risk profile. Streamlined approval possible."}
                  </p>
                  <Badge
                    variant="outline"
                    className="text-xs"
                    style={{
                      borderColor:
                        formData.riskLevel === "High"
                          ? "#D83731"
                          : formData.riskLevel === "Medium"
                            ? "#F2A200"
                            : "#357743",
                      color:
                        formData.riskLevel === "High"
                          ? "#D83731"
                          : formData.riskLevel === "Medium"
                            ? "#F2A200"
                            : "#357743",
                    }}
                  >
                    {formData.riskLevel} Risk
                  </Badge>
                </div>

                {/* Missing Governance Elements */}
                <div className="bg-white rounded-lg p-3 border border-[#008755]/20">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-3.5 w-3.5 text-[#008755]" />
                    <span className="text-xs font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                      Governance Check
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {Object.values(sectionStatuses).filter(
                      (s) => s === "Completed",
                    ).length < 5
                      ? `${10 - Object.values(sectionStatuses).filter((s) => s === "Completed").length} sections need completion.`
                      : "All critical governance elements in place."}
                  </p>
                  <Badge
                    variant="outline"
                    className="text-xs"
                    style={{
                      borderColor:
                        Object.values(sectionStatuses).filter(
                          (s) => s === "Completed",
                        ).length >= 5
                          ? "#357743"
                          : "#F2A200",
                      color:
                        Object.values(sectionStatuses).filter(
                          (s) => s === "Completed",
                        ).length >= 5
                          ? "#357743"
                          : "#F2A200",
                    }}
                  >
                    {Object.values(sectionStatuses).filter(
                      (s) => s === "Completed",
                    ).length >= 5
                      ? "Complete"
                      : "In Progress"}
                  </Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-3">
          {/* Left Side - Governance Sections (70%) */}
          <div className="lg:col-span-7">
            {/* Tab Navigation */}
            <div className="bg-white border border-[#008755]/20 rounded-t-xl p-1 flex gap-1 overflow-x-auto">
              {[
                {
                  id: "basic",
                  label: "Basic Info",
                  icon: FileText,
                },
                {
                  id: "organizational",
                  label: "Alignment",
                  icon: Building2,
                },
                {
                  id: "governance",
                  label: "Governance",
                  icon: ShieldAlert,
                },
                {
                  id: "goalsBenefits",
                  label: "Goals & Benefits",
                  icon: Target,
                },
                {
                  id: "risks",
                  label: "Risks",
                  icon: AlertTriangle,
                },
                { id: "team", label: "Team", icon: Users },
              ].map((tab) => {
                const Icon = tab.icon;
                const status =
                  sectionStatuses[
                    tab.id as keyof typeof sectionStatuses
                  ];
                const statusConfig = getStatusColor(status);
                const StatusIcon = statusConfig.icon;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-['Dubai:Medium',_'Dubai'] transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? "bg-[#008755] text-white shadow-sm"
                        : "text-[#1f2937] hover:bg-muted/50"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                    <StatusIcon
                      className="h-3.5 w-3.5"
                      style={{
                        color:
                          activeTab === tab.id
                            ? "white"
                            : statusConfig.color,
                      }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <Card className="border-[#008755]/20 rounded-t-none border-t-0">
              <CardContent className="p-6">
                {/* Section 1: Basic Information */}
                {activeTab === "basic" && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                        Project Name{" "}
                        <span className="text-[#D83731]">
                          *
                        </span>
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded text-sm"
                        placeholder="Enter project name"
                        value={formData.projectName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            projectName: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                        Description{" "}
                        <span className="text-[#D83731]">
                          *
                        </span>
                      </label>
                      <textarea
                        className="w-full px-3 py-2 border rounded text-sm min-h-[100px]"
                        placeholder="Provide a detailed project description"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                      />
                      {formData.description && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 text-[#008755] border-[#008755]/30 hover:bg-[#008755]/5"
                        >
                          <Sparkles className="h-3.5 w-3.5 mr-2" />
                          Enhance Justification
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                          Division{" "}
                          <span className="text-[#D83731]">
                            *
                          </span>
                        </label>
                        <select
                          className="w-full px-3 py-2 border rounded text-sm"
                          value={formData.division}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              division: e.target.value,
                            })
                          }
                        >
                          <option>Customs Development</option>
                          <option>Customs Inspection</option>
                          <option>
                            Director General Division
                          </option>
                          <option>
                            Finance And Administration Affairs
                          </option>
                          <option>Human Resources</option>
                          <option>Policy & Legislation</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                          Lifecycle Status{" "}
                          <span className="text-[#D83731]">
                            *
                          </span>
                        </label>
                        <select
                          className="w-full px-3 py-2 border rounded text-sm"
                          value={formData.lifecycleStatus}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lifecycleStatus: e.target.value,
                            })
                          }
                        >
                          <option>Draft</option>
                          <option>Application</option>
                          <option>Ongoing</option>
                          <option>Closed</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                        Project Type{" "}
                        <span className="text-[#D83731]">
                          *
                        </span>
                      </label>
                      <select
                        className="w-full px-3 py-2 border rounded text-sm"
                        value={formData.types[0] || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            types: [e.target.value],
                          })
                        }
                      >
                        <option value="">
                          Select project type
                        </option>
                        <option>Strategies</option>
                        <option>Impact Assessment</option>
                        <option>Digital Solutions</option>
                        <option>New Services</option>
                        <option>External Engagement</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                          Program{" "}
                          <span className="text-[#D83731]"></span>
                        </label>
                        <select
                          className="w-full px-3 py-2 border rounded text-sm"
                          value={formData.program}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              program: e.target.value,
                            })
                          }
                        >
                          <option value="">
                            Select program
                          </option>
                          <option>
                            Digital Transformation
                          </option>
                          <option>Customer Experience</option>
                          <option>
                            Infrastructure Modernization
                          </option>
                          <option>Security & Compliance</option>
                          <option>Innovation Lab</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                          Category{" "}
                          <span className="text-[#D83731]">
                            *
                          </span>
                        </label>
                        <select
                          className="w-full px-3 py-2 border rounded text-sm"
                          value={formData.category}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              category: e.target.value,
                            })
                          }
                        >
                          <option value="">
                            Select category
                          </option>
                          <option>
                            Strategy Department Projects
                          </option>
                          <option>Operational Projects</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                        Framework Linkage
                      </label>
                      <div
                        className="relative"
                        ref={frameworkRef}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setFrameworkOpen(!frameworkOpen)
                          }
                          className=" focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 dark:hover:bg-input/50 flex h-12 w-full items-center justify-between gap-2 rounded-md border px-3 py-3 text-sm whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
                        >
                          <span className="flex flex-wrap gap-1 flex-1 items-center">
                            {(formData.frameworkLinkage || [])
                              .length === 0 ? (
                              <span className="text-muted-foreground">
                                Select frameworks...
                              </span>
                            ) : (
                              (
                                formData.frameworkLinkage || []
                              ).map((f) => (
                                <span
                                  key={f}
                                  className="inline-flex items-center gap-1 bg-[#008755]/10 text-[#008755] text-xs px-2 py-1 rounded"
                                >
                                  {f}
                                  <span
                                    className="cursor-pointer hover:text-[#006644] leading-none"
                                    onPointerDown={(e) => {
                                      e.stopPropagation();
                                      setFormData({
                                        ...formData,
                                        frameworkLinkage: (
                                          formData.frameworkLinkage ||
                                          []
                                        ).filter(
                                          (x) => x !== f,
                                        ),
                                      });
                                    }}
                                  >
                                    ×
                                  </span>
                                </span>
                              ))
                            )}
                          </span>
                          <ChevronDownIcon
                            className={`size-4 opacity-50 shrink-0 transition-transform ${frameworkOpen ? "rotate-180" : ""}`}
                          />
                        </button>

                        {frameworkOpen && (
                          <div className="absolute z-50 w-full mt-1 rounded-md border bg-popover text-popover-foreground shadow-md overflow-hidden">
                            <div className="p-1">
                              {[
                                "UAE Centennial 2071",
                                "UN SDGs",
                                "WCO Frameworks",
                                "GCC Trade Agreements",
                              ].map((framework) => {
                                const selected = (
                                  formData.frameworkLinkage ||
                                  []
                                ).includes(framework);
                                return (
                                  <div
                                    key={framework}
                                    className="relative flex w-full cursor-default items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-accent hover:text-accent-foreground select-none"
                                    onMouseDown={(e) => {
                                      e.preventDefault();
                                      const current =
                                        formData.frameworkLinkage ||
                                        [];
                                      setFormData({
                                        ...formData,
                                        frameworkLinkage:
                                          selected
                                            ? current.filter(
                                                (f) =>
                                                  f !==
                                                  framework,
                                              )
                                            : [
                                                ...current,
                                                framework,
                                              ],
                                      });
                                    }}
                                  >
                                    {framework}
                                    {selected && (
                                      <span className="absolute right-2 flex size-3.5 items-center justify-center">
                                        <CheckIcon className="size-4" />
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Budget Section */}
                    <div className="border-t pt-4">
                      <div className="flex items-center gap-3 mb-4">
                        <label className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] flex-1">
                          Dedicated Budget Allocated{" "}
                          <span className="text-[#D83731]">
                            *
                          </span>
                        </label>
                        <div className="flex items-center gap-2">
                          <button
                            className={`px-4 py-2 rounded text-sm font-['Dubai:Medium',_'Dubai'] transition-all ${
                              formData.hasBudget === "Yes"
                                ? "bg-[#008755] text-white"
                                : "bg-muted text-muted-foreground"
                            }`}
                            onClick={() =>
                              setFormData({
                                ...formData,
                                hasBudget: "Yes",
                              })
                            }
                          >
                            Yes
                          </button>
                          <button
                            className={`px-4 py-2 rounded text-sm font-['Dubai:Medium',_'Dubai'] transition-all ${
                              formData.hasBudget === "No"
                                ? "bg-[#008755] text-white"
                                : "bg-muted text-muted-foreground"
                            }`}
                            onClick={() =>
                              setFormData({
                                ...formData,
                                hasBudget: "No",
                                budgetAmount: "",
                              })
                            }
                          >
                            No
                          </button>
                        </div>
                      </div>

                      {formData.hasBudget === "Yes" && (
                        <div>
                          <label className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                            Budget Amount (AED){" "}
                            <span className="text-[#D83731]">
                              *
                            </span>
                          </label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                              type="number"
                              className="w-full pl-9 pr-3 py-2 border rounded text-sm"
                              placeholder="Enter budget amount"
                              value={formData.budgetAmount}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  budgetAmount: e.target.value,
                                })
                              }
                              min="0"
                              step="0.01"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end pt-4 border-t">
                      <Button
                        size="sm"
                        className="bg-[#008755] hover:bg-[#006644] text-white"
                        onClick={() =>
                          updateSectionStatus(
                            "basic",
                            "Completed",
                          )
                        }
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Section
                      </Button>
                    </div>
                  </div>
                )}

                {/* Section 2: Organizational Alignment */}
                {activeTab === "organizational" && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                        Strategic Pillar{" "}
                        <span className="text-[#D83731]">
                          *
                        </span>
                      </label>
                      <select
                        className="w-full px-3 py-2 border rounded text-sm"
                        value={formData.strategicPillar}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            strategicPillar: e.target.value,
                          })
                        }
                      >
                        <option value="">
                          Select Strategic Pillar
                        </option>
                        <option>Digital Excellence</option>
                        <option>Customer Experience</option>
                        <option>Operational Efficiency</option>
                        <option>Innovation & Growth</option>
                      </select>

                      {/* AI Strategic Contribution Insight */}
                      {formData.strategicPillar && (
                        <div className="mt-3 bg-[#008755]/5 border border-[#008755]/20 rounded-lg p-3">
                          <div className="flex items-start gap-2">
                            <Brain className="h-4 w-4 text-[#008755] mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-1">
                                Strategic Contribution Insight
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {formData.strategicPillar ===
                                "Digital Excellence"
                                  ? "This project aligns with Dubai Customs' digital transformation agenda. Consider integration with existing digital platforms and AI capabilities."
                                  : formData.strategicPillar ===
                                      "Customer Experience"
                                    ? "Focus on customer journey mapping and service touchpoints. Recommend stakeholder engagement with external customers early."
                                    : formData.strategicPillar ===
                                        "Operational Efficiency"
                                      ? "Process optimization opportunity detected. Consider lean methodologies and automation potential."
                                      : "Innovation-driven project. Ensure pilot phase and change management strategy are in place."}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                        Section/Department{" "}
                        <span className="text-[#D83731]">
                          *
                        </span>
                      </label>
                      <select
                        className="w-full px-3 py-2 border rounded text-sm"
                        value={formData.section}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            section: e.target.value,
                          })
                        }
                      >
                        <option value="">Select Section</option>
                        <option>Information Technology</option>
                        <option>Operations</option>
                        <option>Finance</option>
                        <option>Strategy & Planning</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                          Project Owner{" "}
                          <span className="text-[#D83731]">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border rounded text-sm"
                          placeholder="Select owner"
                          value={formData.owner}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              owner: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                          Project Sponsor{" "}
                          <span className="text-[#D83731]">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border rounded text-sm"
                          placeholder="Select sponsor"
                          value={formData.sponsor}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              sponsor: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t">
                      <Button
                        size="sm"
                        className="bg-[#008755] hover:bg-[#006644] text-white"
                        onClick={() =>
                          updateSectionStatus(
                            "organizational",
                            "Completed",
                          )
                        }
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Section
                      </Button>
                    </div>
                  </div>
                )}

                {/* Section 3: Governance & Risk */}
                {activeTab === "governance" && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                        Initial Risk Level{" "}
                        <span className="text-[#D83731]">
                          *
                        </span>
                      </label>
                      <select
                        className="w-full px-3 py-2 border rounded text-sm"
                        value={formData.riskLevel}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            riskLevel: e.target.value,
                          })
                        }
                      >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                      </select>

                      {/* AI Risk Predictor */}
                      <div className="mt-3 bg-gradient-to-r from-[#F2A200]/5 to-[#D83731]/5 border border-[#F2A200]/30 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <ShieldAlert className="h-4 w-4 text-[#F2A200] mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-1">
                              AI Risk Predictor
                            </p>
                            <div className="space-y-2">
                              {formData.riskLevel ===
                                "High" && (
                                <>
                                  <p className="text-xs text-muted-foreground">
                                    ⚠️ High risk detected.
                                    Recommend establishing risk
                                    mitigation task force.
                                  </p>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                      style={{
                                        borderColor: "#D83731",
                                        color: "#D83731",
                                      }}
                                    >
                                      Scope Risk: 75%
                                    </Badge>
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                      style={{
                                        borderColor: "#F2A200",
                                        color: "#F2A200",
                                      }}
                                    >
                                      Timeline Risk: 60%
                                    </Badge>
                                  </div>
                                </>
                              )}
                              {formData.riskLevel ===
                                "Medium" && (
                                <>
                                  <p className="text-xs text-muted-foreground">
                                    Moderate risk profile.
                                    Standard governance
                                    protocols recommended.
                                  </p>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                      style={{
                                        borderColor: "#F2A200",
                                        color: "#F2A200",
                                      }}
                                    >
                                      Resource Risk: 45%
                                    </Badge>
                                  </div>
                                </>
                              )}
                              {formData.riskLevel === "Low" && (
                                <>
                                  <p className="text-xs text-muted-foreground">
                                    ✓ Low risk profile. Project
                                    suitable for streamlined
                                    approval process.
                                  </p>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                      style={{
                                        borderColor: "#357743",
                                        color: "#357743",
                                      }}
                                    >
                                      Overall Risk: 18%
                                    </Badge>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stakeholders Management */}
                    <div className="border-t pt-4 mt-4">
                      <h4 className="text-base font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-4">
                        Key Stakeholders
                      </h4>
                      <div className="rounded-md border overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-muted/30">
                            <tr>
                              <th className="text-left p-3 font-['Dubai:Medium',_'Dubai']">
                                Stakeholder Name
                              </th>
                              {/* <th className="text-left p-3 font-['Dubai:Medium',_'Dubai']">Relationship Nature</th>
                              <th className="text-left p-3 font-['Dubai:Medium',_'Dubai']">Classification</th> */}
                              <th className="text-left p-3 font-['Dubai:Medium',_'Dubai']">
                                Expectation
                              </th>
                              <th className="text-left p-3 font-['Dubai:Medium',_'Dubai']">
                                Responsibilities
                              </th>
                              <th className="text-left p-3 font-['Dubai:Medium',_'Dubai']">
                                Interest Level
                              </th>
                              <th className="text-left p-3 font-['Dubai:Medium',_'Dubai']">
                                Influence Level
                              </th>
                              <th className="text-left p-3 font-['Dubai:Medium',_'Dubai']">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {formData.stakeholdersList
                              .length === 0 ? (
                              <tr>
                                <td
                                  colSpan={8}
                                  className="text-center p-6 text-muted-foreground"
                                >
                                  No stakeholders added yet.
                                  Click "Add Stakeholder" to
                                  begin.
                                </td>
                              </tr>
                            ) : (
                              formData.stakeholdersList.map(
                                (stakeholder) => (
                                  <tr
                                    key={stakeholder.id}
                                    className="border-t"
                                  >
                                    <td className="p-3 font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                                      {stakeholder.name}
                                    </td>
                                    {/* <td className="p-3">
                                    <Badge 
                                      className="text-xs"
                                      style={{
                                        backgroundColor: stakeholder.relationshipNature?.startsWith("Internal") ? "#00875520" : "#F2A20020",
                                        color: stakeholder.relationshipNature?.startsWith("Internal") ? "#008755" : "#F2A200"
                                      }}
                                    >
                                      {stakeholder.relationshipNature || stakeholder.relation}
                                    </Badge>
                                  </td>
                                  <td className="p-3 text-[#1f2937]">{stakeholder.classification}</td> */}
                                    <td className="p-3 text-[#1f2937]">
                                      {stakeholder.expectation ||
                                        stakeholder.expectations}
                                    </td>
                                    <td className="p-3 text-[#1f2937]">
                                      {
                                        stakeholder.responsibilities
                                      }
                                    </td>
                                    <td className="p-3">
                                      <Badge
                                        className="text-xs"
                                        style={{
                                          backgroundColor:
                                            stakeholder.interestLevel ===
                                            "Very High"
                                              ? "#00B0AA20"
                                              : stakeholder.interestLevel ===
                                                  "High"
                                                ? "#00875520"
                                                : stakeholder.interestLevel ===
                                                    "Medium"
                                                  ? "#F2A20020"
                                                  : "#6b728020",
                                          color:
                                            stakeholder.interestLevel ===
                                            "Very High"
                                              ? "#00B0AA"
                                              : stakeholder.interestLevel ===
                                                  "High"
                                                ? "#008755"
                                                : stakeholder.interestLevel ===
                                                    "Medium"
                                                  ? "#F2A200"
                                                  : "#6b7280",
                                        }}
                                      >
                                        {stakeholder.interestLevel ||
                                          "Not Set"}
                                      </Badge>
                                    </td>
                                    <td className="p-3">
                                      <Badge
                                        className="text-xs"
                                        style={{
                                          backgroundColor:
                                            stakeholder.influenceLevel ===
                                            "Very High"
                                              ? "#D8373120"
                                              : stakeholder.influenceLevel ===
                                                  "High"
                                                ? "#F2A20020"
                                                : stakeholder.influenceLevel ===
                                                    "Medium"
                                                  ? "#00875520"
                                                  : "#6b728020",
                                          color:
                                            stakeholder.influenceLevel ===
                                            "Very High"
                                              ? "#D83731"
                                              : stakeholder.influenceLevel ===
                                                  "High"
                                                ? "#F2A200"
                                                : stakeholder.influenceLevel ===
                                                    "Medium"
                                                  ? "#008755"
                                                  : "#6b7280",
                                        }}
                                      >
                                        {stakeholder.influenceLevel ||
                                          "Not Set"}
                                      </Badge>
                                    </td>
                                    <td className="p-3">
                                      <div className="flex gap-2">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-7 px-2"
                                        >
                                          <Edit className="h-3 w-3" />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-7 px-2 text-[#D83731]"
                                        >
                                          <Trash2 className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    </td>
                                  </tr>
                                ),
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                      <div className="mt-3">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-[#008755] border-[#008755]"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Stakeholder
                        </Button>
                      </div>
                    </div>

                    {/* Ideation Workflow Gate */}
                    <div className="border-t pt-4 mt-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-base font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                          Ideation Workflow Gate
                        </h4>
                        <Badge
                          style={{
                            backgroundColor:
                              getGateStatusColor(gateStatus).bg,
                            color:
                              getGateStatusColor(gateStatus)
                                .color,
                          }}
                          className="text-xs"
                        >
                          {gateStatus}
                        </Badge>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <label className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] flex-1">
                            Directional Approval Required?
                          </label>
                          <div className="flex items-center gap-2">
                            <button
                              className={`px-4 py-2 rounded text-sm font-['Dubai:Medium',_'Dubai'] transition-all ${
                                directionalApprovalRequired
                                  ? "bg-[#008755] text-white"
                                  : "bg-muted text-muted-foreground"
                              }`}
                              onClick={() =>
                                setDirectionalApprovalRequired(
                                  true,
                                )
                              }
                            >
                              Yes
                            </button>
                            <button
                              className={`px-4 py-2 rounded text-sm font-['Dubai:Medium',_'Dubai'] transition-all ${
                                !directionalApprovalRequired
                                  ? "bg-[#008755] text-white"
                                  : "bg-muted text-muted-foreground"
                              }`}
                              onClick={() =>
                                setDirectionalApprovalRequired(
                                  false,
                                )
                              }
                            >
                              No
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                            Product Type{" "}
                            <span className="text-[#D83731]">
                              *
                            </span>
                          </label>
                          <select
                            className="w-full px-3 py-2 border rounded text-sm"
                            value={productType}
                            onChange={(e) =>
                              setProductType(e.target.value)
                            }
                          >
                            <option value="">
                              Select Product Type
                            </option>
                            <option>Strategy</option>
                            <option>Digital</option>
                            <option>Impact Assessment</option>
                            <option>New Service</option>
                            <option>External Engagement</option>
                          </select>
                        </div>

                        {productType === "Digital" && (
                          <div className="bg-[#008755]/5 p-4 rounded-lg space-y-3">
                            <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2">
                              Digital Product Requirements
                            </p>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                className="h-4 w-4"
                                checked={businessReqChecklist}
                                onChange={(e) =>
                                  setBusinessReqChecklist(
                                    e.target.checked,
                                  )
                                }
                              />
                              <span className="text-sm">
                                Business Requirement Definition
                              </span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                className="h-4 w-4"
                                checked={functionalReqChecklist}
                                onChange={(e) =>
                                  setFunctionalReqChecklist(
                                    e.target.checked,
                                  )
                                }
                              />
                              <span className="text-sm">
                                Functional Requirement
                                Definition
                              </span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                className="h-4 w-4"
                                checked={
                                  legalFeasibilityChecklist
                                }
                                onChange={(e) =>
                                  setLegalFeasibilityChecklist(
                                    e.target.checked,
                                  )
                                }
                              />
                              <span className="text-sm">
                                Legal Feasibility Assessment
                              </span>
                            </label>
                          </div>
                        )}

                        <div className="flex items-center gap-3">
                          <label className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] flex-1">
                            Pilot Required?
                          </label>
                          <div className="flex items-center gap-2">
                            <button
                              className={`px-4 py-2 rounded text-sm font-['Dubai:Medium',_'Dubai'] transition-all ${
                                pilotRequired
                                  ? "bg-[#008755] text-white"
                                  : "bg-muted text-muted-foreground"
                              }`}
                              onClick={() =>
                                setPilotRequired(true)
                              }
                            >
                              Yes
                            </button>
                            <button
                              className={`px-4 py-2 rounded text-sm font-['Dubai:Medium',_'Dubai'] transition-all ${
                                !pilotRequired
                                  ? "bg-[#008755] text-white"
                                  : "bg-muted text-muted-foreground"
                              }`}
                              onClick={() =>
                                setPilotRequired(false)
                              }
                            >
                              No
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t">
                      <Button
                        size="sm"
                        className="bg-[#008755] hover:bg-[#006644] text-white"
                        onClick={() =>
                          updateSectionStatus(
                            "governance",
                            "Completed",
                          )
                        }
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Section
                      </Button>
                    </div>
                  </div>
                )}

                {/* Section 4: Goals & Benefits */}
                {activeTab === "goalsBenefits" && (
                  <div className="space-y-4">
                    {/* Sub-tabs for Goals and Benefits */}

                    <div className="flex gap-6 border-b">
                      <button
                        onClick={() =>
                          setGoalsBenefitsSubTab("goals")
                        }
                        className={`pb-3 px-1 relative font-['Dubai:Medium',_'Dubai'] transition-colors ${
                          goalsBenefitsSubTab === "goals"
                            ? "text-[#008755]"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Goals
                        {goalsBenefitsSubTab === "goals" && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#008755]" />
                        )}
                      </button>
                      <button
                        onClick={() =>
                          setGoalsBenefitsSubTab("benefits")
                        }
                        className={`pb-3 px-1 relative font-['Dubai:Medium',_'Dubai'] transition-colors ${
                          goalsBenefitsSubTab === "benefits"
                            ? "text-[#008755]"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Benefits
                        {goalsBenefitsSubTab === "benefits" && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#008755]" />
                        )}
                      </button>
                    </div>

                    {/* Goals Sub-tab Content */}
                    {goalsBenefitsSubTab === "goals" && (
                      <div className="space-y-4">
                        {/* AI Goal Quality Check */}
                        {/* {formData.goals.length > 0 && (
                          <div className="bg-[#008755]/5 border border-[#008755]/20 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Target className="h-4 w-4 text-[#008755]" />
                                <span className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">Goal Quality Check</span>
                              </div>
                              <Badge variant="outline" className="text-xs" style={{ borderColor: "#357743", color: "#357743" }}>
                                {formData.goals.length} {formData.goals.length === 1 ? 'Goal' : 'Goals'}
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-xs">
                                <CheckCircle2 className="h-3 w-3 text-[#357743]" />
                                <span className="text-muted-foreground">All goals are SMART-compliant</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs">
                                <CheckCircle2 className="h-3 w-3 text-[#357743]" />
                                <span className="text-muted-foreground">Strategic alignment verified</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs">
                                <Info className="h-3 w-3 text-[#008755]" />
                                <span className="text-muted-foreground">Consider adding measurable KPIs to each goal</span>
                              </div>
                            </div>
                          </div>
                        )} */}

                        <div className="rounded-md border">
                          <table className="w-full text-sm">
                            <thead className="bg-muted/30">
                              <tr>
                                <th className="text-left p-3 font-['Dubai:Medium',_'Dubai']">
                                  Title *
                                </th>
                                <th className="text-left p-3 font-['Dubai:Medium',_'Dubai']">
                                  Description *
                                </th>
                                <th className="text-left p-3 font-['Dubai:Medium',_'Dubai']">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {formData.goals.length === 0 ? (
                                <tr>
                                  <td
                                    colSpan={3}
                                    className="text-center p-6 text-muted-foreground"
                                  >
                                    No goals added yet. Click
                                    "Add Goal" to begin.
                                  </td>
                                </tr>
                              ) : (
                                formData.goals.map((goal) => (
                                  <tr
                                    key={goal.id}
                                    className="border-t"
                                  >
                                    <td className="p-3">
                                      {goal.title}
                                    </td>
                                    <td className="p-3">
                                      {goal.description}
                                    </td>
                                    <td className="p-3">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 px-2 text-[#D83731]"
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </Button>
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-[#008755] border-[#008755]"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Goal
                          </Button>
                          <Button
                            size="sm"
                            className="bg-[#008755] hover:bg-[#006644] text-white"
                            onClick={() =>
                              updateSectionStatus(
                                "goalsBenefits",
                                formData.goals.length > 0 &&
                                  formData.benefits.length > 0
                                  ? "Completed"
                                  : "In Progress",
                              )
                            }
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Save Section
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Benefits Sub-tab Content */}
                    {goalsBenefitsSubTab === "benefits" && (
                      <div className="space-y-4">
                        <div className="rounded-md border">
                          <table className="w-full text-sm">
                            <thead className="bg-muted/30">
                              <tr>
                                <th className="text-left p-3 font-['Dubai:Medium',_'Dubai']">
                                  Name *
                                </th>
                                <th className="text-left p-3 font-['Dubai:Medium',_'Dubai']">
                                  Strategic Objective
                                </th>
                                <th className="text-left p-3 font-['Dubai:Medium',_'Dubai']">
                                  Impact
                                </th>
                                <th className="text-left p-3 font-['Dubai:Medium',_'Dubai']">
                                  Timeframe
                                </th>
                                <th className="text-left p-3 font-['Dubai:Medium',_'Dubai']">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {formData.benefits.length ===
                              0 ? (
                                <tr>
                                  <td
                                    colSpan={6}
                                    className="text-center p-6 text-muted-foreground"
                                  >
                                    No benefits added yet. Click
                                    "Add Benefit" to begin.
                                  </td>
                                </tr>
                              ) : (
                                formData.benefits.map(
                                  (benefit) => (
                                    <>
                                      <tr
                                        key={benefit.id}
                                        className="border-t hover:bg-muted/30"
                                      >
                                        <td className="p-3">
                                          {benefit.name}
                                        </td>
                                        <td className="p-3 text-[#1f2937]">
                                          {benefit.strategicObjective ||
                                            "Not Set"}
                                        </td>
                                        <td className="p-3">
                                          <Badge
                                            variant="outline"
                                            className="text-xs"
                                          >
                                            {
                                              benefit.impactLevel
                                            }
                                          </Badge>
                                        </td>
                                        <td className="p-3">
                                          {benefit.timeframe}
                                        </td>
                                        <td className="p-3">
                                          <div className="flex gap-2">
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className="h-7 px-2 text-[#D83731]"
                                            >
                                              <Trash2 className="h-3 w-3" />
                                            </Button>
                                          </div>
                                        </td>
                                      </tr>
                                    </>
                                  ),
                                )
                              )}
                            </tbody>
                          </table>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-[#008755] border-[#008755]"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Benefit
                          </Button>
                          <Button
                            size="sm"
                            className="bg-[#008755] hover:bg-[#006644] text-white"
                            onClick={() =>
                              updateSectionStatus(
                                "goalsBenefits",
                                formData.goals.length > 0 &&
                                  formData.benefits.length > 0
                                  ? "Completed"
                                  : "In Progress",
                              )
                            }
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Save Section
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Section 6: Risks & Issues */}
                {activeTab === "risks" && (
                  <div className="space-y-4">
                    {/* Sub-tabs for Risks and Issues */}
                    <div className="flex gap-6 border-b">
                      <button
                        onClick={() =>
                          setRisksIssuesSubTab("risks")
                        }
                        className={`pb-3 px-1 relative font-['Dubai:Medium',_'Dubai'] transition-colors ${
                          risksIssuesSubTab === "risks"
                            ? "text-[#008755]"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Risks
                        {risksIssuesSubTab === "risks" && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#008755]" />
                        )}
                      </button>
                      <button
                        onClick={() =>
                          setRisksIssuesSubTab("issues")
                        }
                        className={`pb-3 px-1 relative font-['Dubai:Medium',_'Dubai'] transition-colors ${
                          risksIssuesSubTab === "issues"
                            ? "text-[#008755]"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Issues
                        {risksIssuesSubTab === "issues" && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#008755]" />
                        )}
                      </button>
                    </div>

                    {/* Risks Sub-tab */}
                    {risksIssuesSubTab === "risks" && (
                      <div>
                        <div className="rounded-md border">
                          <table className="w-full text-sm">
                            <thead className="bg-muted/30">
                              <tr>
                                <th className="text-left p-3 font-['Dubai:Medium',_'Dubai']">
                                  Risk
                                </th>
                                <th className="text-left p-3 font-['Dubai:Medium',_'Dubai']">
                                  Description
                                </th>
                                <th className="text-left p-3 font-['Dubai:Medium',_'Dubai']">
                                  Severity
                                </th>
                                {/* <th className="text-left p-3 font-['Dubai:Medium',_'Dubai']">Strategy</th> */}
                                <th className="text-left p-3 font-['Dubai:Medium',_'Dubai']">
                                  Mitigation Strategy
                                </th>
                                <th className="text-left p-3 font-['Dubai:Medium',_'Dubai']">
                                  Support Required
                                </th>
                                <th className="text-left p-3 font-['Dubai:Medium',_'Dubai']">
                                  Owner
                                </th>
                                <th className="text-left p-3 font-['Dubai:Medium',_'Dubai']">
                                  Status
                                </th>
                                <th className="text-left p-3 font-['Dubai:Medium',_'Dubai']">
                                  Issues
                                </th>
                                <th className="text-left p-3 font-['Dubai:Medium',_'Dubai']">
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {formData.risks.length === 0 ? (
                                <tr>
                                  <td
                                    colSpan={10}
                                    className="text-center p-6 text-muted-foreground"
                                  >
                                    No risks added. This is
                                    optional.
                                  </td>
                                </tr>
                              ) : (
                                formData.risks.map((risk) => (
                                  <tr
                                    key={risk.id}
                                    className="border-t"
                                  >
                                    <td className="p-3">
                                      {risk.risk}
                                    </td>
                                    <td className="p-3">
                                      {risk.description}
                                    </td>
                                    <td className="p-3">
                                      <Badge
                                        variant="outline"
                                        className="text-xs"
                                        style={{
                                          borderColor:
                                            risk.severity ===
                                            "High"
                                              ? "#D83731"
                                              : risk.severity ===
                                                  "Medium"
                                                ? "#F59E0B"
                                                : "#357743",
                                          color:
                                            risk.severity ===
                                            "High"
                                              ? "#D83731"
                                              : risk.severity ===
                                                  "Medium"
                                                ? "#F59E0B"
                                                : "#357743",
                                        }}
                                      >
                                        {risk.severity}
                                      </Badge>
                                    </td>
                                    <td className="p-3">
                                      {risk.strategy}
                                    </td>
                                    <td className="p-3">
                                      {risk.mitigationStrategy}
                                    </td>
                                    <td className="p-3">
                                      {risk.supportRequired}
                                    </td>
                                    <td className="p-3">
                                      {risk.owner}
                                    </td>
                                    <td className="p-3">
                                      <Badge
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        {risk.status}
                                      </Badge>
                                    </td>
                                    <td className="p-3">
                                      {risk.issues}
                                    </td>
                                    <td className="p-3">
                                      <div className="flex gap-2">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-7 px-2"
                                        >
                                          <Edit className="h-3 w-3" />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-7 px-2 text-[#D83731]"
                                        >
                                          <Trash2 className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-[#008755] border-[#008755]"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Risk
                          </Button>
                          <Button
                            size="sm"
                            className="bg-[#008755] hover:bg-[#006644] text-white"
                            onClick={() =>
                              updateSectionStatus(
                                "risks",
                                formData.risks.length > 0
                                  ? "Completed"
                                  : "In Progress",
                              )
                            }
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Save Section
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Issues Sub-tab */}
                    {risksIssuesSubTab === "issues" && (
                      <div>
                        <div className="rounded-md border">
                          <table className="w-full text-sm">
                            <thead className="bg-muted/30">
                              <tr>
                                <th className="text-left p-3 font-['Dubai:Medium',_'Dubai']">
                                  Name
                                </th>
                                <th className="text-left p-3 font-['Dubai:Medium',_'Dubai']">
                                  Description
                                </th>
                                <th className="text-left p-3 font-['Dubai:Medium',_'Dubai']">
                                  Priority
                                </th>
                                <th className="text-left p-3 font-['Dubai:Medium',_'Dubai']">
                                  Status
                                </th>
                                <th className="text-left p-3 font-['Dubai:Medium',_'Dubai']">
                                  Date Reported
                                </th>
                                <th className="text-left p-3 font-['Dubai:Medium',_'Dubai']">
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {formData.issues.length === 0 ? (
                                <tr>
                                  <td
                                    colSpan={6}
                                    className="text-center p-6 text-muted-foreground"
                                  >
                                    No issues reported yet.
                                    Click "Add Issue" to begin.
                                  </td>
                                </tr>
                              ) : (
                                formData.issues.map((issue) => (
                                  <tr
                                    key={issue.id}
                                    className="border-t"
                                  >
                                    <td className="p-3">
                                      {issue.name}
                                    </td>
                                    <td className="p-3">
                                      {issue.description}
                                    </td>
                                    <td className="p-3">
                                      <Badge
                                        variant="outline"
                                        className="text-xs"
                                        style={{
                                          borderColor:
                                            issue.priority ===
                                            "High"
                                              ? "#D83731"
                                              : issue.priority ===
                                                  "Medium"
                                                ? "#F59E0B"
                                                : "#357743",
                                          color:
                                            issue.priority ===
                                            "High"
                                              ? "#D83731"
                                              : issue.priority ===
                                                  "Medium"
                                                ? "#F59E0B"
                                                : "#357743",
                                        }}
                                      >
                                        {issue.priority}
                                      </Badge>
                                    </td>
                                    <td className="p-3">
                                      <Badge
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        {issue.status}
                                      </Badge>
                                    </td>
                                    <td className="p-3">
                                      {issue.dateReported}
                                    </td>
                                    <td className="p-3">
                                      <div className="flex gap-2">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-7 px-2"
                                        >
                                          <Edit className="h-3 w-3" />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-7 px-2 text-[#D83731]"
                                        >
                                          <Trash2 className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-[#008755] border-[#008755]"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Issue
                          </Button>
                          <Button
                            size="sm"
                            className="bg-[#008755] hover:bg-[#006644] text-white"
                            onClick={() =>
                              updateSectionStatus(
                                "risks",
                                formData.issues.length > 0
                                  ? "Completed"
                                  : "In Progress",
                              )
                            }
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Save Section
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Section 7: Team */}
                {activeTab === "team" && (
                  <div className="space-y-4">
                    <div className="rounded-md border">
                      <table className="w-full text-sm">
                        <thead className="bg-muted/30">
                          <tr>
                            <th className="text-left p-3 font-['Dubai:Medium',_'Dubai']">
                              Team Member *
                            </th>
                            <th className="text-left p-3 font-['Dubai:Medium',_'Dubai']">
                              Role *
                            </th>
                            <th className="text-left p-3 font-['Dubai:Medium',_'Dubai']">
                              Allocation %
                            </th>
                            <th className="text-left p-3 font-['Dubai:Medium',_'Dubai']">
                              Responsibility
                            </th>
                            <th className="text-left p-3 font-['Dubai:Medium',_'Dubai']">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {formData.team.length === 0 ? (
                            <tr>
                              <td
                                colSpan={5}
                                className="text-center p-6 text-muted-foreground"
                              >
                                No team members added yet. Click
                                "Add Team Member" to begin.
                              </td>
                            </tr>
                          ) : (
                            formData.team.map((member) => (
                              <tr
                                key={member.id}
                                className="border-t"
                              >
                                <td className="p-3">
                                  {member.member}
                                </td>
                                <td className="p-3">
                                  {member.role}
                                </td>
                                <td className="p-3">
                                  {member.allocation}%
                                </td>
                                <td className="p-3">
                                  {member.responsibility}
                                </td>
                                <td className="p-3">
                                  <div className="flex gap-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 px-2"
                                    >
                                      <Edit className="h-3 w-3" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 px-2 text-[#D83731]"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-[#008755] border-[#008755]"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Team Member
                      </Button>
                      <Button
                        size="sm"
                        className="bg-[#008755] hover:bg-[#006644] text-white"
                        onClick={() =>
                          updateSectionStatus(
                            "team",
                            formData.team.length > 0
                              ? "Completed"
                              : "Not Started",
                          )
                        }
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Section
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Sticky Governance Panel (30%) */}
          <div className="lg:col-span-3">
            <div className="sticky top-3 space-y-3">
              {/* Project Readiness Score */}
              <Card className="border-[#008755]/20">
                <CardContent className="pt-4 pb-4">
                  <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-4 flex items-center gap-2">
                    <Target className="h-4 w-4 text-[#008755]" />
                    Project Readiness
                  </h3>
                  <div className="text-center mb-4">
                    <div className="text-4xl font-['Dubai:Medium',_'Dubai'] text-[#008755] mb-1">
                      {calculateReadinessScore()}%
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Readiness Score
                    </p>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mb-4">
                    <div
                      className="bg-[#008755] rounded-full h-2 transition-all duration-300"
                      style={{
                        width: `${calculateReadinessScore()}%`,
                      }}
                    />
                  </div>

                  {/* AI Readiness Explainability */}
                  <div className="border-t pt-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-3.5 w-3.5 text-[#008755]" />
                      <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                        Why this score?
                      </p>
                    </div>
                    <div className="space-y-2 text-xs text-muted-foreground">
                      {Object.values(sectionStatuses).filter(
                        (s) => s === "Completed",
                      ).length < 3 && (
                        <div className="flex items-start gap-1.5">
                          <AlertCircle className="h-3 w-3 text-[#F2A200] mt-0.5 flex-shrink-0" />
                          <span>
                            Complete critical sections (Basic
                            Info, Alignment, Governance)
                          </span>
                        </div>
                      )}
                      {!formData.strategicPillar && (
                        <div className="flex items-start gap-1.5">
                          <AlertCircle className="h-3 w-3 text-[#F2A200] mt-0.5 flex-shrink-0" />
                          <span>
                            Select strategic pillar for
                            alignment
                          </span>
                        </div>
                      )}
                      {financeStatus !== "Approved" && (
                        <div className="flex items-start gap-1.5">
                          <AlertCircle className="h-3 w-3 text-[#F2A200] mt-0.5 flex-shrink-0" />
                          <span>
                            Financial approval pending
                          </span>
                        </div>
                      )}
                      {formData.goals.length === 0 && (
                        <div className="flex items-start gap-1.5">
                          <AlertCircle className="h-3 w-3 text-[#F2A200] mt-0.5 flex-shrink-0" />
                          <span>
                            Add at least one project goal
                          </span>
                        </div>
                      )}
                      {productType === "" && (
                        <div className="flex items-start gap-1.5">
                          <AlertCircle className="h-3 w-3 text-[#F2A200] mt-0.5 flex-shrink-0" />
                          <span>
                            Specify product type in governance
                            section
                          </span>
                        </div>
                      )}
                      {calculateReadinessScore() >= 80 && (
                        <div className="flex items-start gap-1.5">
                          <CheckCircle2 className="h-3 w-3 text-[#357743] mt-0.5 flex-shrink-0" />
                          <span>
                            Project meets submission
                            requirements
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section Completion Tracker */}
              <Card className="border-[#008755]/20">
                <CardContent className="pt-4 pb-4">
                  <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-4 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-[#008755]" />
                    Section Status
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-[#008755]" />
                        <span className="text-sm text-[#1f2937]">
                          Basic Information
                        </span>
                      </div>
                      {renderStatusIcon(
                        sectionStatuses.basic,
                        "h-4 w-4",
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-[#008755]" />
                        <span className="text-sm text-[#1f2937]">
                          Organizational
                        </span>
                      </div>
                      {renderStatusIcon(
                        sectionStatuses.organizational,
                        "h-4 w-4",
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShieldAlert className="h-4 w-4 text-[#008755]" />
                        <span className="text-sm text-[#1f2937]">
                          Governance & Risk
                        </span>
                      </div>
                      {renderStatusIcon(
                        sectionStatuses.governance,
                        "h-4 w-4",
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Flag className="h-4 w-4 text-[#008755]" />
                        <span className="text-sm text-[#1f2937]">
                          Goals
                        </span>
                      </div>
                      {renderStatusIcon(
                        sectionStatuses.goals,
                        "h-4 w-4",
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Gift className="h-4 w-4 text-[#008755]" />
                        <span className="text-sm text-[#1f2937]">
                          Benefits
                        </span>
                      </div>
                      {renderStatusIcon(
                        sectionStatuses.benefits,
                        "h-4 w-4",
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-[#008755]" />
                        <span className="text-sm text-[#1f2937]">
                          Risks
                        </span>
                      </div>
                      {renderStatusIcon(
                        sectionStatuses.risks,
                        "h-4 w-4",
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-[#008755]" />
                        <span className="text-sm text-[#1f2937]">
                          Team
                        </span>
                      </div>
                      {renderStatusIcon(
                        sectionStatuses.team,
                        "h-4 w-4",
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button className="w-full bg-white border-2 border-[#008755] text-[#008755] hover:bg-[#008755]/5">
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>

                {canSubmitFinancial() && (
                  <Button
                    className="w-full bg-[#008755] hover:bg-[#006644] text-white"
                    onClick={handleSubmitFinancial}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Submit Financial Request
                  </Button>
                )}

                <Button
                  className="w-full bg-[#357743] hover:bg-[#2d6237] text-white"
                  disabled={!canSubmitFull()}
                  onClick={handleSubmitFull}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Submit for Full Approval
                </Button>

                {!canSubmitFull() && (
                  <p className="text-xs text-center text-muted-foreground">
                    Complete all sections, get finance approval
                    {directionalApprovalRequired
                      ? ", and directional approval"
                      : ""}{" "}
                    to submit
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}