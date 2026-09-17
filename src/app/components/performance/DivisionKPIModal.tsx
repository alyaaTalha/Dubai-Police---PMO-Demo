import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Database, FileText, TrendingUp, TrendingDown, Activity, Target, Calendar, User, AlertCircle, CheckCircle2 } from "lucide-react";
import { KPIDetail } from "./DivisionScorecardKPIData";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import { motion } from "motion/react";

interface DivisionKPIModalProps {
  kpi: KPIDetail | null;
  open: boolean;
  onClose: () => void;
}

function getDataSourceIcon(source: string) {
  switch (source) {
    case "manual":
      return <FileText className="w-4 h-4 text-gray-500" />;
    case "integrated-erp":
    case "integrated-hrms":
    case "integrated-crm":
      return <Database className="w-4 h-4 text-blue-600" />;
    default:
      return <FileText className="w-4 h-4 text-gray-500" />;
  }
}

function getDataSourceLabel(source: string) {
  switch (source) {
    case "manual":
      return "Manual Entry";
    case "integrated-erp":
      return "ERP System";
    case "integrated-hrms":
      return "HRMS";
    case "integrated-crm":
      return "CRM System";
    default:
      return "Unknown Source";
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "green":
      return "bg-green-100 text-green-800 border-green-300";
    case "amber":
      return "bg-amber-100 text-amber-800 border-amber-300";
    case "red":
      return "bg-red-100 text-red-800 border-red-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
}

// Circular Gauge Component (matching KPI list style)
function CircularGauge({ 
  value, 
  max = 100, 
  size = 180
}: { 
  value: number; 
  max?: number; 
  size?: number;
}) {
  // Calculate percentage and angles for the multi-colored gauge
  const percentage = (value / max) * 100;
  const radius = (size - 20) / 2;
  const center = size / 2;
  
  // Define color zones (red 0-50%, orange 50-75%, green 75-100%)
  const getArcPath = (startAngle: number, endAngle: number) => {
    const start = (startAngle - 90) * (Math.PI / 180);
    const end = (endAngle - 90) * (Math.PI / 180);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    
    const startX = center + radius * Math.cos(start);
    const startY = center + radius * Math.sin(start);
    const endX = center + radius * Math.cos(end);
    const endY = center + radius * Math.sin(end);
    
    return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY}`;
  };

  // Calculate needle angle (0 = left, 180 = right in a semicircle, but we use 0-240 degrees arc)
  const needleAngle = (percentage / 120) * 240; // Map 0-120% to 0-240 degrees
  const needleLength = radius - 5;
  const needleRad = (needleAngle - 120) * (Math.PI / 180); // Offset to start from left
  const needleX = center + needleLength * Math.cos(needleRad);
  const needleY = center + needleLength * Math.sin(needleRad);

  return (
    <div className="flex flex-col items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Red zone: 0-50% (0-120 degrees) */}
        <path
          d={getArcPath(0, 120)}
          fill="none"
          stroke="#D83731"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Orange zone: 50-75% (120-180 degrees) */}
        <path
          d={getArcPath(120, 180)}
          fill="none"
          stroke="#F2A200"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Green zone: 75-100% (180-240 degrees) */}
        <path
          d={getArcPath(180, 240)}
          fill="none"
          stroke="#357743"
          strokeWidth="12"
          strokeLinecap="round"
        />
        
        {/* Light gray background arc */}
        <path
          d={getArcPath(0, 240)}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="8"
          opacity="0.3"
        />
        
        {/* Needle/Pointer */}
        <line
          x1={center}
          y1={center}
          x2={needleX}
          y2={needleY}
          stroke="#1B1D21"
          strokeWidth="3"
          strokeLinecap="round"
        />
        
        {/* Center circle */}
        <circle
          cx={center}
          cy={center}
          r="5"
          fill="#1B1D21"
        />
        
        {/* Value text */}
        <text
          x={center}
          y={center + 15}
          textAnchor="middle"
          className="font-['Dubai:Bold',_sans-serif]"
          fontSize="24"
          fill="#008755"
        >
          {value}
        </text>
        <text
          x={center}
          y={center + 32}
          textAnchor="middle"
          className="font-['Dubai',_sans-serif]"
          fontSize="12"
          fill="#6b7280"
        >
          / {max}
        </text>
      </svg>
      
      {/* Legend */}
      <div className="flex items-center gap-4 mt-2">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#D83731]"></div>
          <span className="text-[10px] text-gray-600 font-['Dubai',_sans-serif]">0-49%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#F2A200]"></div>
          <span className="text-[10px] text-gray-600 font-['Dubai',_sans-serif]">50-74%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#357743]"></div>
          <span className="text-[10px] text-gray-600 font-['Dubai',_sans-serif]">75-100%</span>
        </div>
      </div>
    </div>
  );
}

export function DivisionKPIModal({ kpi, open, onClose }: DivisionKPIModalProps) {
  const [activeTab, setActiveTab] = useState("overview");

  if (!kpi) return null;

  const variance = ((kpi.actual - kpi.target) / kpi.target) * 100;

  // Calculate performance percentage
  const performancePercentage = (kpi.actual / kpi.target) * 100;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="p-6 pb-4 bg-gradient-to-r from-[#008755] to-[#1e3a5f] text-white">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-[24px] text-white mb-2 font-['Dubai:Bold',_sans-serif]">
                {kpi.name}
              </DialogTitle>
              <p className="text-[14px] text-white/90 font-['Dubai',_sans-serif]">{kpi.description}</p>
            </div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Badge className={`${getStatusColor(kpi.status)} border text-[11px]`}>
                {kpi.status.toUpperCase()}
              </Badge>
            </motion.div>
          </div>

          {/* KPI Owner */}
          <div className="mt-4 flex items-center gap-3 text-[13px] text-white/90">
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8 border-2 border-white/30">
                <AvatarFallback className="bg-white/20 text-white text-[11px]  ">
                  {kpi.owner
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-white  ">{kpi.owner}</div>
                <div className="text-[11px] text-white/70 font-['Dubai',_sans-serif]">KPI Owner</div>
              </div>
            </div>
            <Separator orientation="vertical" className="h-10 bg-white/20" />
            <div className="text-white/80 font-['Dubai',_sans-serif]">Finance & Administration Affairs</div>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-200px)]">
          <div className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 w-full mb-6">
                <TabsTrigger value="overview" className=" ">Overview</TabsTrigger>
                <TabsTrigger value="trends" className=" ">Historical Performance</TabsTrigger>
                <TabsTrigger value="metadata" className=" ">Metadata</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                {/* Gauge and Performance Cards */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Gauge */}
                  <Card className="p-6 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
                    <CircularGauge value={kpi.actual} max={kpi.target > kpi.actual ? kpi.target + 10 : kpi.actual + 10} size={200} />
                  </Card>

                  {/* Performance Metrics */}
                  <div className="space-y-3">
                    <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-4 h-4 text-[#008755]" />
                        <div className="text-[11px] uppercase text-gray-600  ">
                          Current Value
                        </div>
                      </div>
                      <div className="text-[32px] text-[#008755] font-['Dubai:Bold',_sans-serif]">
                        {kpi.actual}
                        <span className="text-[18px]">{kpi.unit}</span>
                      </div>
                    </Card>

                    <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-purple-600" />
                        <div className="text-[11px] uppercase text-gray-600  ">
                          Target Value
                        </div>
                      </div>
                      <div className="text-[32px] text-purple-600 font-['Dubai:Bold',_sans-serif]">
                        {kpi.target}
                        <span className="text-[18px]">{kpi.unit}</span>
                      </div>
                    </Card>

                    <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        {variance >= 0 ? (
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        )}
                        <div className="text-[11px] uppercase text-gray-600  ">
                          Variance
                        </div>
                      </div>
                      <div
                        className={`text-[32px] font-['Dubai:Bold',_sans-serif] ${
                          variance >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {variance > 0 ? "+" : ""}
                        {variance.toFixed(1)}
                        <span className="text-[18px]">%</span>
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Formula */}
                {kpi.formula && (
                  <Card className="p-4">
                    <h4 className="text-gray-900 mb-3 flex items-center gap-2  ">
                      <AlertCircle className="w-4 h-4 text-[#008755]" />
                      Calculation Formula
                    </h4>
                    <div className="bg-gray-50 p-3 rounded border border-gray-200">
                      <code className="text-[13px] text-gray-700 font-['Dubai',_sans-serif]">{kpi.formula}</code>
                    </div>
                  </Card>
                )}

                {/* Performance Thresholds */}
                <Card className="p-4">
                  <h3 className="text-gray-900 mb-4 flex items-center gap-2  ">
                    <AlertCircle className="w-4 h-4 text-[#008755]" />
                    Performance Thresholds
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-24 text-[12px] text-gray-600 font-['Dubai',_sans-serif]">Green Zone</div>
                      <div className="flex-1 h-8 bg-gradient-to-r from-green-200 to-green-400 rounded flex items-center justify-between px-3">
                        <span className="text-[12px] text-green-900  ">
                          75%
                        </span>
                        <span className="text-[12px] text-green-900  ">
                          100%+
                        </span>
                      </div>
                      <div className="w-32 text-[11px] text-gray-600 font-['Dubai',_sans-serif]">
                        Target Achieved
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-24 text-[12px] text-gray-600 font-['Dubai',_sans-serif]">Amber Zone</div>
                      <div className="flex-1 h-8 bg-gradient-to-r from-amber-200 to-amber-400 rounded flex items-center justify-between px-3">
                        <span className="text-[12px] text-amber-900  ">
                          50%
                        </span>
                        <span className="text-[12px] text-amber-900  ">
                          74%
                        </span>
                      </div>
                      <div className="w-32 text-[11px] text-gray-600 font-['Dubai',_sans-serif]">At Risk</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-24 text-[12px] text-gray-600 font-['Dubai',_sans-serif]">Red Zone</div>
                      <div className="flex-1 h-8 bg-gradient-to-r from-red-200 to-red-400 rounded flex items-center justify-between px-3">
                        <span className="text-[12px] text-red-900  ">
                          0%
                        </span>
                        <span className="text-[12px] text-red-900  ">
                          49%
                        </span>
                      </div>
                      <div className="w-32 text-[11px] text-gray-600 font-['Dubai',_sans-serif]">
                        Below Target
                      </div>
                    </div>

                    {/* Current Position Indicator */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className={`w-4 h-4 ${kpi.status === 'green' ? 'text-green-600' : kpi.status === 'amber' ? 'text-amber-600' : 'text-red-600'}`} />
                        <span className="text-[13px] text-gray-700 font-['Dubai',_sans-serif]">
                          Current Performance: <strong className="font-['Dubai:Bold',_sans-serif]">{performancePercentage.toFixed(1)}%</strong> of target is in
                          the <strong className={`font-['Dubai:Bold',_sans-serif] ${kpi.status === 'green' ? 'text-green-600' : kpi.status === 'amber' ? 'text-amber-600' : 'text-red-600'}`}>{kpi.status === 'green' ? 'Green' : kpi.status === 'amber' ? 'Amber' : 'Red'} Zone</strong>
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Quarterly Trend */}
                {kpi.trend && kpi.trend.length > 0 && (
                  <Card className="p-4">
                    <h4 className="text-gray-900 mb-3  ">Quarterly Trend</h4>
                    <div className="flex items-center justify-between">
                      {kpi.trend.map((val, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-1">
                          <div className="text-xs text-gray-500 font-['Dubai',_sans-serif]">Q{idx + 1}</div>
                          <div className="text-lg text-[#008755] font-['Dubai:Bold',_sans-serif]">{val}</div>
                        </div>
                      ))}
                      <div className="flex items-center gap-2 ml-4">
                        {kpi.trend[kpi.trend.length - 1] > kpi.trend[0] && (
                          <>
                            <TrendingUp className="w-5 h-5 text-green-600" />
                            <span className="text-sm text-green-600  ">Improving</span>
                          </>
                        )}
                      </div>
                    </div>
                  </Card>
                )}

                {/* Comments */}
                {kpi.comments && kpi.comments.length > 0 && (
                  <Card className="p-4">
                    <h4 className="text-gray-900 mb-3  ">Notes & Comments</h4>
                    <div className="space-y-2">
                      {kpi.comments.map((comment, index) => (
                        <div
                          key={index}
                          className="p-3 bg-blue-50 border border-blue-200 rounded text-[13px] text-gray-700 font-['Dubai',_sans-serif]"
                        >
                          {comment}
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </TabsContent>

              {/* Historical Performance Tab */}
              <TabsContent value="trends" className="space-y-6">
                {kpi.history && kpi.history.length > 0 && (
                  <Card className="p-4">
                    <h3 className="text-gray-900 mb-4  ">Historical Performance</h3>
                    <div className="space-y-2">
                      {kpi.history.map((record, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200"
                        >
                          <span className="text-[14px] text-gray-700  ">{record.date}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-[14px] text-gray-900 font-['Dubai:Bold',_sans-serif]">
                              {record.value} {kpi.unit}
                            </span>
                            <Badge className={`${getStatusColor(record.status)} border text-[10px]`}>
                              {record.status.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </TabsContent>

              {/* Metadata Tab */}
              <TabsContent value="metadata" className="space-y-6">
                <Card className="p-4">
                  <h3 className="text-gray-900 mb-4  ">KPI Metadata</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <h4 className="text-[12px] uppercase text-gray-500  ">Owner</h4>
                      </div>
                      <p className="text-[14px] text-gray-900 font-['Dubai',_sans-serif]">{kpi.owner}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Database className="w-4 h-4 text-gray-500" />
                        <h4 className="text-[12px] uppercase text-gray-500  ">Data Source</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        {getDataSourceIcon(kpi.dataSource)}
                        <span className="text-[14px] text-gray-900 font-['Dubai',_sans-serif]">
                          {kpi.sourceSystem || getDataSourceLabel(kpi.dataSource)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <h4 className="text-[12px] uppercase text-gray-500  ">Last Updated</h4>
                      </div>
                      <p className="text-[14px] text-gray-900 font-['Dubai',_sans-serif]">
                        {new Date(kpi.lastUpdated).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4 text-gray-500" />
                        <h4 className="text-[12px] uppercase text-gray-500  ">KPI ID</h4>
                      </div>
                      <p className="text-[14px] text-gray-900 font-['Dubai',_sans-serif]">{kpi.id}</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}