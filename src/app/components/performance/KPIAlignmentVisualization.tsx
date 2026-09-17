import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  ChevronDown,
  ChevronRight,
  Network,
  List,
  Plus,
  Link2,
  Target,
  TrendingUp,
  Building2,
  Users,
  LayoutGrid,
  ArrowLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface KPINode {
  id: string;
  name: string;
  code: string;
  level: "corporate" | "division" | "department" | "section";
  status: "green" | "amber" | "red";
  achievement: number;
  target: number;
  unit: string;
  owner: string;
  children?: KPINode[];
  contributionWeight?: number; // Weight to parent KPI
  divisionName?: string;
  departmentName?: string;
  sectionName?: string;
}

interface LinkageHover {
  from: string;
  to: string;
  weight: number;
  x: number;
  y: number;
}

// Mock data for KPI hierarchy
const mockKPIHierarchy: KPINode[] = [
  {
    id: "corp-1",
    name: "Customer Satisfaction Index",
    code: "CSI-001",
    level: "corporate",
    status: "green",
    achievement: 92,
    target: 90,
    unit: "%",
    owner: "CEO Office",
    children: [
      {
        id: "div-1",
        name: "Service Quality Score",
        code: "SQS-D1",
        level: "division",
        status: "green",
        achievement: 94,
        target: 90,
        unit: "%",
        owner: "Operations Division",
        divisionName: "Operations Division",
        contributionWeight: 40,
        children: [
          {
            id: "dept-1",
            name: "Response Time Efficiency",
            code: "RTE-D1",
            level: "department",
            status: "green",
            achievement: 96,
            target: 95,
            unit: "%",
            owner: "Customer Service Dept",
            departmentName: "Customer Service",
            contributionWeight: 50,
            children: [
              {
                id: "sec-1",
                name: "First Call Resolution Rate",
                code: "FCR-S1",
                level: "section",
                status: "green",
                achievement: 88,
                target: 85,
                unit: "%",
                owner: "Contact Center",
                sectionName: "Contact Center",
                contributionWeight: 60,
              },
              {
                id: "sec-2",
                name: "Average Handling Time",
                code: "AHT-S1",
                level: "section",
                status: "amber",
                achievement: 4.2,
                target: 4.0,
                unit: "min",
                owner: "Contact Center",
                sectionName: "Contact Center",
                contributionWeight: 40,
              },
            ],
          },
          {
            id: "dept-2",
            name: "Service Availability",
            code: "SAV-D1",
            level: "department",
            status: "amber",
            achievement: 92,
            target: 95,
            unit: "%",
            owner: "IT Department",
            departmentName: "IT Department",
            contributionWeight: 50,
          },
        ],
      },
      {
        id: "div-2",
        name: "Customer Experience Index",
        code: "CEI-D2",
        level: "division",
        status: "green",
        achievement: 89,
        target: 85,
        unit: "%",
        owner: "Customer Relations Division",
        divisionName: "Customer Relations Division",
        contributionWeight: 35,
        children: [
          {
            id: "dept-3",
            name: "NPS Score",
            code: "NPS-D2",
            level: "department",
            status: "green",
            achievement: 72,
            target: 70,
            unit: "points",
            owner: "CX Department",
            departmentName: "Customer Experience",
            contributionWeight: 70,
          },
          {
            id: "dept-4",
            name: "Customer Retention Rate",
            code: "CRR-D2",
            level: "department",
            status: "red",
            achievement: 82,
            target: 90,
            unit: "%",
            owner: "Retention Department",
            departmentName: "Customer Retention",
            contributionWeight: 30,
          },
        ],
      },
      {
        id: "div-3",
        name: "Process Efficiency",
        code: "PEF-D3",
        level: "division",
        status: "amber",
        achievement: 88,
        target: 90,
        unit: "%",
        owner: "Process Excellence Division",
        divisionName: "Process Excellence Division",
        contributionWeight: 25,
        children: [
          {
            id: "dept-5",
            name: "Transaction Processing Time",
            code: "TPT-D3",
            level: "department",
            status: "amber",
            achievement: 2.8,
            target: 2.5,
            unit: "days",
            owner: "Operations Dept",
            departmentName: "Operations",
            contributionWeight: 100,
          },
        ],
      },
    ],
  },
  {
    id: "corp-2",
    name: "Operational Excellence Index",
    code: "OEI-002",
    level: "corporate",
    status: "amber",
    achievement: 85,
    target: 90,
    unit: "%",
    owner: "COO Office",
    children: [
      {
        id: "div-4",
        name: "Process Automation Rate",
        code: "PAR-D4",
        level: "division",
        status: "amber",
        achievement: 75,
        target: 80,
        unit: "%",
        owner: "Digital Transformation Division",
        divisionName: "Digital Transformation Division",
        contributionWeight: 60,
      },
      {
        id: "div-5",
        name: "Cost Efficiency Ratio",
        code: "CER-D5",
        level: "division",
        status: "green",
        achievement: 92,
        target: 85,
        unit: "%",
        owner: "Finance Division",
        divisionName: "Finance Division",
        contributionWeight: 40,
      },
    ],
  },
];

interface KPIAlignmentVisualizationProps {
  onBack?: () => void;
}

export function KPIAlignmentVisualization({ onBack }: KPIAlignmentVisualizationProps) {
  const [viewMode, setViewMode] = useState<"tree" | "list">("tree");
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    new Set(["corp-1", "div-1", "dept-1"])
  );
  const [linkageModalOpen, setLinkageModalOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<LinkageHover | null>(null);
  const [selectedParentKPI, setSelectedParentKPI] = useState("");
  const [selectedChildKPI, setSelectedChildKPI] = useState("");
  const [linkageWeight, setLinkageWeight] = useState("");

  const toggleNode = (nodeId: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "green":
        return {
          bg: "bg-green-100",
          border: "border-green-500",
          text: "text-green-700",
          dot: "bg-green-500",
        };
      case "amber":
        return {
          bg: "bg-amber-100",
          border: "border-amber-500",
          text: "text-amber-700",
          dot: "bg-amber-500",
        };
      case "red":
        return {
          bg: "bg-red-100",
          border: "border-red-500",
          text: "text-red-700",
          dot: "bg-red-500",
        };
      default:
        return {
          bg: "bg-gray-100",
          border: "border-gray-500",
          text: "text-gray-700",
          dot: "bg-gray-500",
        };
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "corporate":
        return <Target className="w-4 h-4" />;
      case "division":
        return <Building2 className="w-4 h-4" />;
      case "department":
        return <Users className="w-4 h-4" />;
      case "section":
        return <LayoutGrid className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  const handleAddLinkage = () => {
    if (!selectedParentKPI || !selectedChildKPI || !linkageWeight) {
      toast.error("Please fill all fields");
      return;
    }

    toast.success(
      `Linkage created: ${selectedChildKPI} → ${selectedParentKPI} (${linkageWeight}% weight)`
    );
    setLinkageModalOpen(false);
    setSelectedParentKPI("");
    setSelectedChildKPI("");
    setLinkageWeight("");
  };

  const renderTreeNode = (node: KPINode, depth: number = 0, parentId?: string) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const colors = getStatusColor(node.status);
    const levelIcon = getLevelIcon(node.level);

    return (
      <motion.div
        key={node.id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        {/* Connection line to parent */}
        {depth > 0 && (
          <div className="absolute left-0 top-0 -translate-y-1/2 w-8 h-px">
            <div
              className="h-full bg-gradient-to-r from-[#008755] to-transparent"
              style={{ width: "100%" }}
            />
          </div>
        )}

        {/* KPI Node */}
        <div
          className={`flex items-start gap-3 mb-4 ${
            depth > 0 ? "ml-12" : ""
          }`}
        >
          {/* Expand/Collapse Button */}
          {hasChildren && (
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 mt-2"
              onClick={() => toggleNode(node.id)}
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-[#008755]" />
              ) : (
                <ChevronRight className="w-4 h-4 text-[#008755]" />
              )}
            </Button>
          )}
          {!hasChildren && <div className="w-6" />}

          {/* Node Card */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex-1">
                  <Card
                    className={`p-4 border-l-4 ${colors.border} ${colors.bg} cursor-pointer hover:shadow-md transition-shadow`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {levelIcon}
                          <Badge
                            variant="outline"
                            className="text-[10px] uppercase"
                          >
                            {node.level}
                          </Badge>
                          <Badge variant="secondary" className="text-[10px]">
                            {node.code}
                          </Badge>
                        </div>
                        <h4 className="text-gray-900 mb-1">{node.name}</h4>
                        <div className="text-[12px] text-gray-600 mb-2">
                          Owner: {node.owner}
                        </div>
                        <div className="flex items-center gap-4">
                          <div>
                            <span className="text-[11px] text-gray-500">
                              Achievement:{" "}
                            </span>
                            <span className={`font-medium ${colors.text}`}>
                              {node.achievement}
                              {node.unit}
                            </span>
                          </div>
                          <div>
                            <span className="text-[11px] text-gray-500">
                              Target:{" "}
                            </span>
                            <span className="text-gray-700">
                              {node.target}
                              {node.unit}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Status Indicator */}
                      <div className="flex flex-col items-center gap-1">
                        <div className={`w-4 h-4 rounded-full ${colors.dot}`} />
                        {node.contributionWeight && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div>
                                  <Badge
                                    variant="secondary"
                                    className="text-[10px] cursor-help"
                                  >
                                    {node.contributionWeight}%
                                  </Badge>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-[11px]">
                                  Contributes {node.contributionWeight}% to parent
                                  KPI
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs">
                <div className="space-y-1">
                  <p className="text-[11px]">
                    <strong>{node.name}</strong>
                  </p>
                  {node.contributionWeight && parentId && (
                    <p className="text-[10px] text-gray-400">
                      This KPI contributes {node.contributionWeight}% weight to
                      its parent KPI
                    </p>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Children */}
        <AnimatePresence>
          {isExpanded && hasChildren && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {node.children!.map((child) =>
                renderTreeNode(child, depth + 1, node.id)
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  const renderListView = () => {
    const flattenKPIs = (nodes: KPINode[], parentPath: string = ""): any[] => {
      let result: any[] = [];
      nodes.forEach((node) => {
        const path = parentPath ? `${parentPath} → ${node.name}` : node.name;
        result.push({ ...node, path });
        if (node.children) {
          result = [...result, ...flattenKPIs(node.children, path)];
        }
      });
      return result;
    };

    const allKPIs = flattenKPIs(mockKPIHierarchy);
    const groupedByLevel = allKPIs.reduce((acc: any, kpi) => {
      if (!acc[kpi.level]) {
        acc[kpi.level] = [];
      }
      acc[kpi.level].push(kpi);
      return acc;
    }, {});

    return (
      <div className="space-y-6">
        {["corporate", "division", "department", "section"].map((level) => {
          const kpis = groupedByLevel[level] || [];
          if (kpis.length === 0) return null;

          return (
            <motion.div
              key={level}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-3">
                {getLevelIcon(level)}
                <h3 className="text-gray-900 uppercase text-[12px]">
                  {level} Level KPIs
                </h3>
                <Badge variant="secondary">{kpis.length}</Badge>
              </div>
              <div className="space-y-2">
                {kpis.map((kpi: any) => {
                  const colors = getStatusColor(kpi.status);
                  return (
                    <Card
                      key={kpi.id}
                      className={`p-4 border-l-4 ${colors.border} hover:shadow-md transition-shadow`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge
                              variant="outline"
                              className="text-[10px] uppercase"
                            >
                              {kpi.level}
                            </Badge>
                            <Badge variant="secondary" className="text-[10px]">
                              {kpi.code}
                            </Badge>
                          </div>
                          <h4 className="text-gray-900 mb-1">{kpi.name}</h4>
                          <div className="text-[11px] text-gray-500 mb-2">
                            {kpi.path}
                          </div>
                          <div className="flex items-center gap-4 flex-wrap">
                            <div>
                              <span className="text-[11px] text-gray-500">
                                Owner:{" "}
                              </span>
                              <span className="text-[12px] text-gray-700">
                                {kpi.owner}
                              </span>
                            </div>
                            <div>
                              <span className="text-[11px] text-gray-500">
                                Achievement:{" "}
                              </span>
                              <span className={`text-[12px] ${colors.text}`}>
                                {kpi.achievement}
                                {kpi.unit}
                              </span>
                            </div>
                            <div>
                              <span className="text-[11px] text-gray-500">
                                Target:{" "}
                              </span>
                              <span className="text-[12px] text-gray-700">
                                {kpi.target}
                                {kpi.unit}
                              </span>
                            </div>
                            {kpi.contributionWeight && (
                              <div>
                                <span className="text-[11px] text-gray-500">
                                  Contribution:{" "}
                                </span>
                                <Badge
                                  variant="secondary"
                                  className="text-[10px]"
                                >
                                  {kpi.contributionWeight}%
                                </Badge>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className={`w-4 h-4 rounded-full ${colors.dot}`} />
                      </div>
                    </Card>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  // Get all KPIs for dropdown in linkage modal
  const getAllKPIs = (nodes: KPINode[]): KPINode[] => {
    let result: KPINode[] = [];
    nodes.forEach((node) => {
      result.push(node);
      if (node.children) {
        result = [...result, ...getAllKPIs(node.children)];
      }
    });
    return result;
  };

  const allKPIs = getAllKPIs(mockKPIHierarchy);

  return (
    <div className="h-full flex flex-col bg-[#f5f7fa]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="mr-2"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            <div className="w-10 h-10 rounded-lg bg-[#008755]/10 flex items-center justify-center">
              <Network className="w-5 h-5 text-[#008755]" />
            </div>
            <div>
              <h2 className="text-gray-900">KPI Alignment</h2>
              <p className="text-[12px] text-gray-600">
                Visualize KPI cascading across organizational levels
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <Button
                size="sm"
                variant={viewMode === "tree" ? "default" : "ghost"}
                className={`h-8 ${
                  viewMode === "tree"
                    ? "bg-white shadow-sm"
                    : "hover:bg-transparent"
                }`}
                onClick={() => setViewMode("tree")}
              >
                <Network className="w-4 h-4 mr-1" />
                Tree
              </Button>
              <Button
                size="sm"
                variant={viewMode === "list" ? "default" : "ghost"}
                className={`h-8 ${
                  viewMode === "list"
                    ? "bg-white shadow-sm"
                    : "hover:bg-transparent"
                }`}
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4 mr-1" />
                List
              </Button>
            </div>

            {/* Add Linkage Button */}
            <Button
              onClick={() => setLinkageModalOpen(true)}
              className="bg-[#008755] hover:bg-[#4a7ba6]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Linkage
            </Button>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center gap-6">
          <span className="text-[11px] text-gray-600 uppercase">Status:</span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-[12px] text-gray-700">On Track</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-[12px] text-gray-700">Needs Attention</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-[12px] text-gray-700">At Risk</span>
          </div>
          <Separator orientation="vertical" className="h-4" />
          <div className="flex items-center gap-2">
            <Link2 className="w-3 h-3 text-[#008755]" />
            <span className="text-[12px] text-gray-700">
              Hover on weight % to see contribution
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        {viewMode === "tree" ? (
          <div className="max-w-6xl">
            {mockKPIHierarchy.map((node) => renderTreeNode(node))}
          </div>
        ) : (
          <div className="max-w-5xl">{renderListView()}</div>
        )}
      </div>

      {/* Add Linkage Modal */}
      <Dialog open={linkageModalOpen} onOpenChange={setLinkageModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#008755]">
              Create KPI Linkage
            </DialogTitle>
            <DialogDescription>
              Link a child KPI to its parent and assign contribution weight
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Parent KPI */}
            <div className="space-y-2">
              <Label htmlFor="parent-kpi">Parent KPI</Label>
              <Select
                value={selectedParentKPI}
                onValueChange={setSelectedParentKPI}
              >
                <SelectTrigger id="parent-kpi">
                  <SelectValue placeholder="Select parent KPI" />
                </SelectTrigger>
                <SelectContent>
                  {allKPIs
                    .filter((kpi) => kpi.level !== "section")
                    .map((kpi) => (
                      <SelectItem key={kpi.id} value={kpi.id}>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="text-[10px] uppercase"
                          >
                            {kpi.level}
                          </Badge>
                          <span className="text-[12px]">
                            {kpi.code} - {kpi.name}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* Child KPI */}
            <div className="space-y-2">
              <Label htmlFor="child-kpi">Child KPI</Label>
              <Select
                value={selectedChildKPI}
                onValueChange={setSelectedChildKPI}
              >
                <SelectTrigger id="child-kpi">
                  <SelectValue placeholder="Select child KPI" />
                </SelectTrigger>
                <SelectContent>
                  {allKPIs
                    .filter((kpi) => kpi.level !== "corporate")
                    .map((kpi) => (
                      <SelectItem key={kpi.id} value={kpi.id}>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="text-[10px] uppercase"
                          >
                            {kpi.level}
                          </Badge>
                          <span className="text-[12px]">
                            {kpi.code} - {kpi.name}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* Contribution Weight */}
            <div className="space-y-2">
              <Label htmlFor="weight">Contribution Weight (%)</Label>
              <Input
                id="weight"
                type="number"
                min="0"
                max="100"
                placeholder="Enter weight (0-100)"
                value={linkageWeight}
                onChange={(e) => setLinkageWeight(e.target.value)}
              />
              <p className="text-[11px] text-gray-500">
                This represents how much the child KPI contributes to the parent
                KPI's performance
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setLinkageModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddLinkage}
              className="bg-[#008755] hover:bg-[#4a7ba6]"
            >
              <Link2 className="w-4 h-4 mr-2" />
              Create Linkage
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
