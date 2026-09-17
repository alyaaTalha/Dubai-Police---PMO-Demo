import { useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ChevronDown, ChevronRight, LayoutGrid, Network, GitCompare } from "lucide-react";
import { CorporateScorecard } from "./CorporateScorecard";
import { DivisionScorecard } from "./DivisionScorecard";
import { DepartmentScorecard } from "./DepartmentScorecard";
import { ComparisonView } from "./ComparisonView";
import { KPIAlignmentVisualization } from "./KPIAlignmentVisualization";

type PerformanceStatus = "green" | "amber" | "red";

interface ScorecardNode {
  id: string;
  name: string;
  performanceIndex: number;
  status: PerformanceStatus;
  kpisTracked: number;
  kpisAchieved: number;
  perspectives?: {
    outcome: number;
    process: number;
    enabler: number;
  };
  children?: ScorecardNode[];
}

const mockData: ScorecardNode = {
  id: "corporate",
  name: "Dubai Customs - Corporate",
  performanceIndex: 87.5,
  status: "green",
  kpisTracked: 120,
  kpisAchieved: 105,
  perspectives: {
    outcome: 90,
    process: 88,
    enabler: 84,
  },
  children: [
    {
      id: "d1",
      name: "D1 – Enforcement & Security",
      performanceIndex: 92.3,
      status: "green",
      kpisTracked: 28,
      kpisAchieved: 26,
      perspectives: { outcome: 95, process: 91, enabler: 90 },
      children: [
        {
          id: "d1-dept1",
          name: "Border Control Department",
          performanceIndex: 94.5,
          status: "green",
          kpisTracked: 12,
          kpisAchieved: 11,
          perspectives: { outcome: 96, process: 93, enabler: 94 },
          children: [
            {
              id: "d1-dept1-s1",
              name: "Passenger Screening Section",
              performanceIndex: 96.0,
              status: "green",
              kpisTracked: 4,
              kpisAchieved: 4,
              perspectives: { outcome: 97, process: 95, enabler: 96 },
            },
            {
              id: "d1-dept1-s2",
              name: "Cargo Inspection Section",
              performanceIndex: 93.0,
              status: "green",
              kpisTracked: 4,
              kpisAchieved: 4,
              perspectives: { outcome: 95, process: 91, enabler: 93 },
            },
          ],
        },
        {
          id: "d1-dept2",
          name: "Intelligence & Risk Department",
          performanceIndex: 90.1,
          status: "green",
          kpisTracked: 10,
          kpisAchieved: 9,
          perspectives: { outcome: 94, process: 89, enabler: 87 },
        },
      ],
    },
    {
      id: "d2",
      name: "D2 – Operations & Trade Facilitation",
      performanceIndex: 85.7,
      status: "green",
      kpisTracked: 32,
      kpisAchieved: 27,
      perspectives: { outcome: 88, process: 86, enabler: 83 },
      children: [
        {
          id: "d2-dept1",
          name: "Clearance Operations Department",
          performanceIndex: 87.2,
          status: "green",
          kpisTracked: 15,
          kpisAchieved: 13,
          perspectives: { outcome: 89, process: 87, enabler: 85 },
        },
        {
          id: "d2-dept2",
          name: "Express Clearance Department",
          performanceIndex: 84.2,
          status: "green",
          kpisTracked: 12,
          kpisAchieved: 10,
          perspectives: { outcome: 87, process: 85, enabler: 81 },
        },
      ],
    },
    {
      id: "d3",
      name: "D3 – Customer Services",
      performanceIndex: 78.9,
      status: "amber",
      kpisTracked: 24,
      kpisAchieved: 19,
      perspectives: { outcome: 82, process: 79, enabler: 76 },
      children: [
        {
          id: "d3-dept1",
          name: "Customer Relations Department",
          performanceIndex: 81.5,
          status: "amber",
          kpisTracked: 10,
          kpisAchieved: 8,
          perspectives: { outcome: 84, process: 81, enabler: 79 },
        },
        {
          id: "d3-dept2",
          name: "Contact Center Department",
          performanceIndex: 76.3,
          status: "amber",
          kpisTracked: 10,
          kpisAchieved: 8,
          perspectives: { outcome: 80, process: 77, enabler: 73 },
        },
      ],
    },
    {
      id: "d4",
      name: "D4 – Strategy & Corporate Excellence",
      performanceIndex: 88.4,
      status: "green",
      kpisTracked: 20,
      kpisAchieved: 18,
      perspectives: { outcome: 91, process: 88, enabler: 86 },
    },
    {
      id: "d5",
      name: "D5 – Support Services",
      performanceIndex: 72.1,
      status: "red",
      kpisTracked: 16,
      kpisAchieved: 12,
      perspectives: { outcome: 75, process: 71, enabler: 70 },
      children: [
        {
          id: "d5-dept1",
          name: "IT Infrastructure Department",
          performanceIndex: 74.8,
          status: "amber",
          kpisTracked: 8,
          kpisAchieved: 6,
          perspectives: { outcome: 77, process: 74, enabler: 73 },
        },
        {
          id: "d5-dept2",
          name: "Facilities Management Department",
          performanceIndex: 69.4,
          status: "red",
          kpisTracked: 8,
          kpisAchieved: 6,
          perspectives: { outcome: 73, process: 68, enabler: 67 },
        },
      ],
    },
  ],
};

function getStatusColor(status: PerformanceStatus) {
  switch (status) {
    case "green":
      return "bg-green-100 text-green-800 border-green-300";
    case "amber":
      return "bg-amber-100 text-amber-800 border-amber-300";
    case "red":
      return "bg-red-100 text-red-800 border-red-300";
  }
}

function getStatusBgColor(status: PerformanceStatus) {
  switch (status) {
    case "green":
      return "bg-green-50";
    case "amber":
      return "bg-amber-50";
    case "red":
      return "bg-red-50";
  }
}

interface TreeNodeProps {
  node: ScorecardNode;
  level: number;
  onNodeClick: (nodeId: string) => void;
}

function TreeNode({ node, level, onNodeClick }: TreeNodeProps) {
  const [expanded, setExpanded] = useState(level < 2);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const hasChildren = node.children && node.children.length > 0;
  const indent = level * 40;

  return (
    <div className="relative">
      <div
        className={`relative flex items-center gap-3 p-4 rounded-lg border transition-all cursor-pointer ${getStatusBgColor(
          node.status
        )} hover:shadow-md`}
        style={{ marginLeft: `${indent}px` }}
        onClick={() => onNodeClick(node.id)}
        onMouseEnter={() => setHoveredNode(node.id)}
        onMouseLeave={() => setHoveredNode(null)}
      >
        {hasChildren && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className="shrink-0 p-1 hover:bg-white/50 rounded"
          >
            {expanded ? (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-600" />
            )}
          </button>
        )}
        {!hasChildren && <div className="w-6" />}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="truncate text-gray-900">{node.name}</h3>
            <Badge className={`${getStatusColor(node.status)} border`}>
              {node.status.toUpperCase()}
            </Badge>
            {hoveredNode === node.id && level <= 2 && (
              <Badge variant="outline" className="text-[#008755] border-[#008755] text-[10px]">
                Click to view {level === 0 ? "corporate" : level === 1 ? "division" : "department"} scorecard
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-4 text-gray-600">
            <span className="text-[12px]">
              KPIs: {node.kpisAchieved}/{node.kpisTracked} Achieved
            </span>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <div className="text-[24px] text-[#008755] mb-1">
            {node.performanceIndex.toFixed(1)}%
          </div>
          <div className="text-[11px] text-gray-500">Performance Index</div>
        </div>

        {hoveredNode === node.id && node.perspectives && (
          <div className="absolute right-0 top-full mt-2 z-10 bg-white p-3 rounded-lg shadow-lg border border-gray-200 min-w-[200px]">
            <div className="text-[11px] uppercase text-gray-500 mb-2">
              Breakdown by Perspective
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-[12px] text-gray-700">Outcome</span>
                <span className="text-[12px] text-[#008755]">
                  {node.perspectives.outcome}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[12px] text-gray-700">Process</span>
                <span className="text-[12px] text-[#008755]">
                  {node.perspectives.process}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[12px] text-gray-700">Enabler</span>
                <span className="text-[12px] text-[#008755]">
                  {node.perspectives.enabler}%
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {expanded && hasChildren && (
        <div className="mt-2 space-y-2">
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              onNodeClick={onNodeClick}
            />
          ))}
        </div>
      )}

      {hasChildren && level > 0 && (
        <div
          className="absolute top-0 w-px bg-gray-300"
          style={{
            left: `${indent - 20}px`,
            height: expanded ? "100%" : "50%",
          }}
        />
      )}
    </div>
  );
}

interface GridNodeProps {
  node: ScorecardNode;
  onNodeClick: (nodeId: string) => void;
}

function GridNode({ node, onNodeClick }: GridNodeProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <Card
      className={`p-4 cursor-pointer transition-all hover:shadow-lg ${getStatusBgColor(
        node.status
      )} border`}
      onClick={() => onNodeClick(node.id)}
      onMouseEnter={() => setHoveredNode(node.id)}
      onMouseLeave={() => setHoveredNode(null)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="truncate text-gray-900 mb-1">{node.name}</h3>
          <Badge className={`${getStatusColor(node.status)} border text-[10px]`}>
            {node.status.toUpperCase()}
          </Badge>
        </div>
      </div>

      <div className="text-center py-3 mb-3 border-y border-gray-200">
        <div className="text-[32px] text-[#008755]">
          {node.performanceIndex.toFixed(1)}%
        </div>
        <div className="text-[11px] text-gray-500">Performance Index</div>
      </div>

      <div className="text-[12px] text-gray-600">
        <div className="flex justify-between">
          <span>KPIs Tracked:</span>
          <span>{node.kpisTracked}</span>
        </div>
        <div className="flex justify-between">
          <span>KPIs Achieved:</span>
          <span className="text-green-600">{node.kpisAchieved}</span>
        </div>
      </div>

      {hoveredNode === node.id && node.perspectives && (
        <div className="absolute left-0 top-full mt-2 z-10 bg-white p-3 rounded-lg shadow-lg border border-gray-200 min-w-full">
          <div className="text-[11px] uppercase text-gray-500 mb-2">
            Breakdown by Perspective
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-[12px] text-gray-700">Outcome</span>
              <span className="text-[12px] text-[#008755]">
                {node.perspectives.outcome}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[12px] text-gray-700">Process</span>
              <span className="text-[12px] text-[#008755]">
                {node.perspectives.process}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[12px] text-gray-700">Enabler</span>
              <span className="text-[12px] text-[#008755]">
                {node.perspectives.enabler}%
              </span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

function flattenTree(node: ScorecardNode): ScorecardNode[] {
  const result: ScorecardNode[] = [node];
  if (node.children) {
    node.children.forEach((child) => {
      result.push(...flattenTree(child));
    });
  }
  return result;
}

export function ScorecardOverview() {
  const [viewMode, setViewMode] = useState<"tree" | "grid">("tree");
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [showAlignment, setShowAlignment] = useState(false);
  const corporateData = mockData;

  const handleNodeClick = (nodeId: string) => {
    console.log("Opening scorecard for:", nodeId);
    setSelectedNode(nodeId);
  };

  // Show alignment view
  if (showAlignment) {
    return <KPIAlignmentVisualization onBack={() => setShowAlignment(false)} />;
  }

  // Show comparison view
  if (showComparison) {
    return <ComparisonView onBack={() => setShowComparison(false)} />;
  }

  // If a node is selected, show its detailed scorecard
  if (selectedNode === "corporate") {
    return <CorporateScorecard onBack={() => setSelectedNode(null)} />;
  }

  // Division scorecards (D1-D5)
  if (selectedNode && selectedNode.startsWith("d") && selectedNode.length <= 3) {
    return <DivisionScorecard divisionId={selectedNode} onBack={() => setSelectedNode(null)} />;
  }

  // Department and section scorecards
  if (selectedNode && (selectedNode.includes("dept") || selectedNode.includes("section"))) {
    return <DepartmentScorecard departmentId={selectedNode} onBack={() => setSelectedNode(null)} />;
  }

  // For other nodes, show placeholder
  if (selectedNode) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-[24px] text-gray-900 mb-4">
            Scorecard
          </h2>
          <p className="text-gray-600 mb-4">
            Scorecard for: {selectedNode}
          </p>
          <Button onClick={() => setSelectedNode(null)}>Back to Overview</Button>
        </div>
      </div>
    );
  }

  const achievementPercentage = (
    (corporateData.kpisAchieved / corporateData.kpisTracked) *
    100
  ).toFixed(1);

  const allNodes = flattenTree(corporateData).slice(1); // Exclude corporate level

  return (
    <div className="h-full overflow-auto bg-gray-50 p-6">
      {/* Corporate Banner */}
      <Card 
        className="mb-6 bg-gradient-to-r from-[#008755] to-[#1e3a5f] text-white border-none cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => handleNodeClick("corporate")}
      >
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-[28px] mb-2 text-white">
                  {corporateData.name}
                </h1>
                <Badge variant="outline" className="text-white border-white/50 text-[11px] mb-2">
                  Click to view detailed scorecard
                </Badge>
              </div>
              <div className="flex items-center gap-6">
                <div>
                  <div className="text-[14px] text-white/80">
                    Overall Performance Index
                  </div>
                  <div className="text-[42px] text-white">
                    {corporateData.performanceIndex}%
                  </div>
                </div>
                <div className="h-16 w-px bg-white/30" />
                <div>
                  <div className="text-[14px] text-white/80 mb-1">
                    KPI Achievement
                  </div>
                  <div className="text-[18px] text-white">
                    {corporateData.kpisAchieved} / {corporateData.kpisTracked}{" "}
                    KPIs Achieved
                  </div>
                  <div className="text-[14px] text-white/90">
                    ({achievementPercentage}% Achievement Rate)
                  </div>
                </div>
              </div>
            </div>

            {/* Donut Chart */}
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 120 120" className="transform -rotate-90">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="20"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="white"
                  strokeWidth="20"
                  strokeDasharray={`${
                    (corporateData.kpisAchieved / corporateData.kpisTracked) *
                    314
                  } 314`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-[24px] text-white">
                    {achievementPercentage}%
                  </div>
                  <div className="text-[10px] text-white/80">Achieved</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Controls and Legend */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-6">
          <div className="text-[14px] text-gray-700">Status Legend:</div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-[12px] text-gray-600">On Track</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-[12px] text-gray-600">At Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-[12px] text-gray-600">Off Track</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowComparison(true)}
            className="border-[#008755] text-[#008755] hover:bg-blue-50"
          >
            <GitCompare className="w-4 h-4 mr-2" />
            Compare Performance
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAlignment(true)}
            className="border-[#008755] text-[#008755] hover:bg-blue-50"
          >
            <Network className="w-4 h-4 mr-2" />
            KPI Alignment
          </Button>
          
          <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-gray-200">
            <Button
              variant={viewMode === "tree" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("tree")}
              className={
                viewMode === "tree"
                  ? "bg-[#008755] hover:bg-[#008755]/90"
                  : ""
              }
            >
              <Network className="w-4 h-4 mr-2" />
              Tree View
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={
                viewMode === "grid"
                  ? "bg-[#008755] hover:bg-[#008755]/90"
                  : ""
              }
            >
              <LayoutGrid className="w-4 h-4 mr-2" />
              Grid View
            </Button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      {viewMode === "tree" ? (
        <div className="space-y-3 bg-white p-6 rounded-lg border border-gray-200">
          {corporateData.children?.map((division) => (
            <TreeNode
              key={division.id}
              node={division}
              level={0}
              onNodeClick={handleNodeClick}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {allNodes.map((node) => (
            <GridNode key={node.id} node={node} onNodeClick={handleNodeClick} />
          ))}
        </div>
      )}
    </div>
  );
}
