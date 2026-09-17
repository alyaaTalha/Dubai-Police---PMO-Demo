import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import bannerImage from "figma:asset/2ceb5f3890ecf49940adbd1e2cca8cf7647ce99f.png";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Download,
  Network,
  Target,
  Activity,
  Users,
  Briefcase,
  Shield,
  DollarSign,
  Cpu,
  Trophy,
  Handshake,
  Database,
  FileText,
  Link2,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Separator } from "../ui/separator";

// Division data with KPIs
const divisionsData = [
  {
    id: "cdd",
    name: "Customs Development Division",
    code: "CDD",
    color: "#00B0AA",
    description: "Driving innovation and technology advancement across customs operations",
    icon: Briefcase,
    performanceIndex: 87.0,
    status: "green",
    kpisTracked: 24,
    kpisAchieved: 21,
    perspectives: {
      outcome: [
        { id: "cdd-o1", name: "Digital Transformation Completion Rate", target: 85, actual: 88.5, unit: "%", status: "green" },
        { id: "cdd-o2", name: "Innovation Projects Delivered", target: 12, actual: 14, unit: "projects", status: "green" },
      ],
      process: [
        { id: "cdd-p1", name: "System Uptime & Availability", target: 99.5, actual: 99.8, unit: "%", status: "green" },
        { id: "cdd-p2", name: "IT Service Request Resolution Time", target: 24, actual: 18, unit: "hours", status: "green" },
        { id: "cdd-p3", name: "Project Delivery On-Time Rate", target: 90, actual: 87, unit: "%", status: "amber" },
      ],
      enabler: [
        { id: "cdd-e1", name: "Technology Skills Development", target: 85, actual: 88, unit: "%", status: "green" },
        { id: "cdd-e2", name: "IT Infrastructure Modernization", target: 75, actual: 82, unit: "%", status: "green" },
        { id: "cdd-e3", name: "Cybersecurity Compliance Score", target: 95, actual: 97, unit: "%", status: "green" },
      ]
    }
  },
  {
    id: "cid",
    name: "Customs Inspection Division",
    code: "CID",
    color: "#BB9956",
    description: "Ensuring security and compliance through effective inspection operations",
    icon: Shield,
    performanceIndex: 91.0,
    status: "green",
    kpisTracked: 32,
    kpisAchieved: 29,
    perspectives: {
      outcome: [
        { id: "cid-o1", name: "Prohibited Items Detection Rate", target: 98, actual: 99.2, unit: "%", status: "green" },
        { id: "cid-o2", name: "Security Effectiveness Index", target: 95, actual: 96.8, unit: "%", status: "green" },
      ],
      process: [
        { id: "cid-p1", name: "Inspection Processing Time", target: 15, actual: 12.5, unit: "minutes", status: "green" },
        { id: "cid-p2", name: "Risk Assessment Accuracy", target: 92, actual: 94.3, unit: "%", status: "green" },
        { id: "cid-p3", name: "Inspection Coverage Rate", target: 88, actual: 90.5, unit: "%", status: "green" },
      ],
      enabler: [
        { id: "cid-e1", name: "Inspector Training Completion", target: 100, actual: 96.5, unit: "%", status: "amber" },
        { id: "cid-e2", name: "Equipment Uptime & Availability", target: 98, actual: 95.2, unit: "%", status: "amber" },
        { id: "cid-e3", name: "K9 Unit Performance Score", target: 95, actual: 97.8, unit: "%", status: "green" },
      ]
    }
  },
  {
    id: "dgd",
    name: "Director General Division",
    code: "DGD",
    color: "#115E67",
    description: "Providing strategic direction and governance oversight",
    icon: Target,
    performanceIndex: 89.0,
    status: "green",
    kpisTracked: 18,
    kpisAchieved: 16,
    perspectives: {
      outcome: [
        { id: "dgd-o1", name: "Strategic Initiatives Completion", target: 90, actual: 92.5, unit: "%", status: "green" },
        { id: "dgd-o2", name: "Stakeholder Satisfaction Index", target: 85, actual: 88, unit: "%", status: "green" },
      ],
      process: [
        { id: "dgd-p1", name: "Internal Audit Compliance", target: 95, actual: 93, unit: "%", status: "amber" },
        { id: "dgd-p2", name: "Policy Implementation Rate", target: 90, actual: 91.5, unit: "%", status: "green" },
        { id: "dgd-p3", name: "Data Quality & Accuracy", target: 98, actual: 97.5, unit: "%", status: "green" },
      ],
      enabler: [
        { id: "dgd-e1", name: "Excellence Framework Maturity", target: 80, actual: 85, unit: "%", status: "green" },
        { id: "dgd-e2", name: "Risk Management Effectiveness", target: 88, actual: 90, unit: "%", status: "green" },
        { id: "dgd-e3", name: "Change Management Success Rate", target: 85, actual: 82, unit: "%", status: "amber" },
      ]
    }
  },
  {
    id: "faa",
    name: "Finance & Administration Affairs",
    code: "FAA",
    color: "#008755",
    description: "Managing financial resources and administrative support services",
    icon: Briefcase,
    performanceIndex: 85.0,
    status: "green",
    kpisTracked: 26,
    kpisAchieved: 22,
    perspectives: {
      outcome: [
        { id: "faa-o1", name: "Budget Utilization Efficiency", target: 95, actual: 93.5, unit: "%", status: "amber" },
        { id: "faa-o2", name: "Cost Savings Achievement", target: 10, actual: 12.5, unit: "M AED", status: "green" },
      ],
      process: [
        { id: "faa-p1", name: "Invoice Processing Time", target: 5, actual: 4.2, unit: "days", status: "green" },
        { id: "faa-p2", name: "Procurement Cycle Time", target: 30, actual: 28, unit: "days", status: "green" },
        { id: "faa-p3", name: "Financial Reporting Accuracy", target: 99, actual: 99.5, unit: "%", status: "green" },
      ],
      enabler: [
        { id: "faa-e1", name: "Finance Staff Competency Level", target: 85, actual: 87, unit: "%", status: "green" },
        { id: "faa-e2", name: "ERP System Optimization", target: 80, actual: 78, unit: "%", status: "amber" },
        { id: "faa-e3", name: "Contract Compliance Rate", target: 98, actual: 97.5, unit: "%", status: "green" },
      ]
    }
  },
  {
    id: "hrd",
    name: "Human Resources Division",
    code: "HRD",
    color: "#005844",
    description: "Developing talent and fostering employee engagement",
    icon: Users,
    performanceIndex: 86.0,
    status: "green",
    kpisTracked: 38,
    kpisAchieved: 33,
    perspectives: {
      outcome: [
        { id: "hrd-o1", name: "Employee Engagement Score", target: 85, actual: 87.5, unit: "%", status: "green" },
        { id: "hrd-o2", name: "Employee Retention Rate", target: 92, actual: 93.2, unit: "%", status: "green" },
      ],
      process: [
        { id: "hrd-p1", name: "Recruitment Cycle Time", target: 45, actual: 42, unit: "days", status: "green" },
        { id: "hrd-p2", name: "Training Hours per Employee", target: 40, actual: 45, unit: "hours", status: "green" },
        { id: "hrd-p3", name: "Performance Review Completion", target: 100, actual: 98, unit: "%", status: "amber" },
      ],
      enabler: [
        { id: "hrd-e1", name: "HR Digital Services Adoption", target: 85, actual: 88, unit: "%", status: "green" },
        { id: "hrd-e2", name: "Talent Pipeline Strength", target: 80, actual: 82, unit: "%", status: "green" },
        { id: "hrd-e3", name: "Learning Platform Utilization", target: 75, actual: 79, unit: "%", status: "green" },
      ]
    }
  },
  {
    id: "pld",
    name: "Policy & Legislation",
    code: "PLD",
    color: "#FFBE9F",
    description: "Ensuring regulatory compliance and policy effectiveness",
    icon: Shield,
    performanceIndex: 84.0,
    status: "green",
    kpisTracked: 22,
    kpisAchieved: 18,
    perspectives: {
      outcome: [
        { id: "pld-o1", name: "Regulatory Compliance Rate", target: 98, actual: 97.5, unit: "%", status: "green" },
        { id: "pld-o2", name: "Policy Implementation Success", target: 90, actual: 88, unit: "%", status: "amber" },
      ],
      process: [
        { id: "pld-p1", name: "Audit Findings Closure Rate", target: 95, actual: 93, unit: "%", status: "amber" },
        { id: "pld-p2", name: "Legal Case Resolution Time", target: 60, actual: 55, unit: "days", status: "green" },
        { id: "pld-p3", name: "Customs Valuation Accuracy", target: 96, actual: 97.2, unit: "%", status: "green" },
      ],
      enabler: [
        { id: "pld-e1", name: "Legal Staff Certification Rate", target: 90, actual: 88, unit: "%", status: "amber" },
        { id: "pld-e2", name: "Policy Database Completeness", target: 95, actual: 96.5, unit: "%", status: "green" },
        { id: "pld-e3", name: "Compliance Training Completion", target: 100, actual: 97, unit: "%", status: "amber" },
      ]
    }
  }
];

function getStatusColor(status: string) {
  switch (status) {
    case "green":
      return "#357743";
    case "amber":
      return "#F2A200";
    case "red":
      return "#D83731";
    default:
      return "#6b7280";
  }
}

interface DivisionScorecardProps {
  onBack?: () => void;
  divisionId?: string;
}

export function DivisionScorecard({ onBack, divisionId }: DivisionScorecardProps) {
  const [selectedDivision, setSelectedDivision] = useState(divisionId || divisionsData[0].id);
  const currentDivision = divisionsData.find(d => d.id === selectedDivision) || divisionsData[0];
  const IconComponent = currentDivision.icon;

  return (
    <div className="h-full overflow-auto">
      <div className="space-y-4 p-4">
        {/* Compact Banner Section */}
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
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Network className="h-5 w-5" />
                  </div>
                  <div>
                    <h1 className="text-xl font-['Dubai:Medium',_sans-serif] mb-0.5">
                      Division Scorecards
                    </h1>
                    <p className="text-white/90 text-sm">
                      Divisional Performance Dashboard - Balanced Scorecard Framework
                    </p>
                  </div>
                </div>
              </div>
              <div className="ml-4">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-white bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  <Download className="h-3.5 w-3.5 mr-1.5" />
                  Export Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Division Tabs */}
        <Tabs value={selectedDivision} onValueChange={setSelectedDivision}>
          <TabsList className="w-full grid grid-cols-6 bg-gray-100/80 p-1 rounded-lg h-auto">
            {divisionsData.map((division) => (
              <TabsTrigger 
                key={division.id} 
                value={division.id}
                className="font-['Dubai:Medium',_sans-serif] text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2.5 px-3"
              >
                {division.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {divisionsData.map((division) => (
            <TabsContent key={division.id} value={division.id} className="mt-4">
              {division.id === "faa" ? (
                <div className="space-y-4">
                  {/* Mission Statement */}
                  <Card className="border-l-4 border-l-[#008755] bg-gradient-to-r from-blue-50/50 to-white">
                    <div className="p-3">
                      <p className="text-xs text-gray-700 italic font-['Dubai',_sans-serif]">
                        "Finance & Administration Affairs is committed to fiscal responsibility, operational excellence, and sustainable resource management aligned with Dubai Customs strategic vision."
                      </p>
                    </div>
                  </Card>

                  {/* Tier 1: Outcomes */}
                  <div>
                    <div className="mb-3">
                      <h2 className="text-base text-[#008755] flex items-center gap-2 font-['Dubai:Medium',_sans-serif]">
                        <div className="h-6 w-1 bg-[#008755] rounded-full"></div>
                        Outcomes — Strategic Results & Impact
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {/* International Stakeholders */}
                      <Card className="hover:shadow-lg transition-all border-t-4 border-t-[#008755]">
                        <div className="p-3 bg-gradient-to-br from-blue-50/30 to-white">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-[#008755] mb-0.5 font-['Dubai:Medium',_sans-serif]">International Stakeholders</h3>
                              <p className="text-xs text-gray-600 font-['Dubai',_sans-serif]">Global recognition and reputation</p>
                            </div>
                            <TrendingUp className="h-4 w-4" style={{ color: '#357743' }} />
                          </div>
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between p-2 rounded-lg bg-white hover:bg-blue-50 transition-colors group">
                              <div className="flex items-center gap-2 flex-1">
                                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: '#357743' }}></div>
                                <span className="text-xs text-gray-700 group-hover:text-[#008755] font-['Dubai',_sans-serif]">
                                  Global Profile (Media Coverage, Awards, Mentions)
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-[#008755] font-['Dubai:Bold',_sans-serif]">
                                  87.5 %
                                </span>
                                <Badge
                                  variant="outline"
                                  className="text-[9px]"
                                  style={{
                                    color: "#357743",
                                    borderColor: "#357743"
                                  }}
                                >
                                  +5%
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>

                      {/* Enforcement, Security & Protection */}
                      <Card className="hover:shadow-lg transition-all border-t-4 border-t-[#008755]">
                        <div className="p-3 bg-gradient-to-br from-blue-50/30 to-white">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-[#008755] mb-0.5 font-['Dubai:Medium',_sans-serif]">Enforcement, Security & Protection of Society</h3>
                              <p className="text-xs text-gray-600 font-['Dubai',_sans-serif]">Environmental responsibility</p>
                            </div>
                            <TrendingUp className="h-4 w-4" style={{ color: '#357743' }} />
                          </div>
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between p-2 rounded-lg bg-white hover:bg-blue-50 transition-colors group">
                              <div className="flex items-center gap-2 flex-1">
                                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: '#357743' }}></div>
                                <span className="text-xs text-gray-700 group-hover:text-[#008755] font-['Dubai',_sans-serif]">
                                  Carbon Footprint
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-[#008755] font-['Dubai:Bold',_sans-serif]">
                                  92.3 %
                                </span>
                                <Badge
                                  variant="outline"
                                  className="text-[9px]"
                                  style={{
                                    color: "#357743",
                                    borderColor: "#357743"
                                  }}
                                >
                                  +8%
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>

                      {/* Financial Resources */}
                      <Card className="hover:shadow-lg transition-all border-t-4 border-t-[#008755]">
                        <div className="p-3 bg-gradient-to-br from-blue-50/30 to-white">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-[#008755] mb-0.5 font-['Dubai:Medium',_sans-serif]">Financial Resources</h3>
                              <p className="text-xs text-gray-600 font-['Dubai',_sans-serif]">Fiscal performance and accountability</p>
                            </div>
                            <TrendingUp className="h-4 w-4" style={{ color: '#357743' }} />
                          </div>
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between p-2 rounded-lg bg-white hover:bg-blue-50 transition-colors group">
                              <div className="flex items-center gap-2 flex-1">
                                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: '#357743' }}></div>
                                <span className="text-xs text-gray-700 group-hover:text-[#008755] font-['Dubai',_sans-serif]">
                                  Budget Performance
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-[#008755] font-['Dubai:Bold',_sans-serif]">
                                  95.8 %
                                </span>
                                <Badge
                                  variant="outline"
                                  className="text-[9px]"
                                  style={{
                                    color: "#357743",
                                    borderColor: "#357743"
                                  }}
                                >
                                  +3%
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>

                  {/* Tier 2: Internal Processes */}
                  <div>
                    <div className="mb-3">
                      <h2 className="text-base text-[#008755] flex items-center gap-2 font-['Dubai:Medium',_sans-serif]">
                        <div className="h-6 w-1 bg-[#008755] rounded-full"></div>
                        Internal Processes — Operational Excellence
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      {/* Finance */}
                      <Card className="hover:shadow-lg transition-shadow">
                        <div className="p-3 border-l-4" style={{ borderLeftColor: '#008755' }}>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-7 w-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#008755' }}>
                              <DollarSign className="h-4 w-4 text-white" />
                            </div>
                            <h3 className="text-xs text-[#008755] font-['Dubai:Medium',_sans-serif]">Finance</h3>
                          </div>
                          <div className="space-y-1.5">
                            {[
                              { name: "Budget Performance (Utilization)", value: "93.5%" },
                              { name: "Financial Audit Findings Closure Rate", value: "88%" },
                              { name: "% customer satisfaction", value: "91%" },
                              { name: "Net Profit Ratio", value: "12.4%" },
                              { name: "Return on Assets (ROA)", value: "8.7%" },
                              { name: "Revenue Per Employee", value: "145K" },
                              { name: "Saving Cost Rate", value: "15.2%" },
                              { name: "Revenue Realization %", value: "97.8%" }
                            ].map((kpi, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 p-1.5 rounded transition-colors cursor-pointer group"
                                style={{ transition: 'background-color 0.2s' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#00875510'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                              >
                                <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: '#357743' }}></div>
                                <span className="text-xs text-gray-700 flex-1 group-hover:text-[#008755] font-['Dubai',_sans-serif]">
                                  {kpi.name}
                                </span>
                                <span className="text-xs font-medium text-[#008755] font-['Dubai:Bold',_sans-serif]">
                                  {kpi.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Card>

                      {/* Administration Affairs */}
                      <Card className="hover:shadow-lg transition-shadow">
                        <div className="p-3 border-l-4" style={{ borderLeftColor: '#BB9956' }}>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-7 w-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#BB9956' }}>
                              <Briefcase className="h-4 w-4 text-white" />
                            </div>
                            <h3 className="text-xs text-[#008755] font-['Dubai:Medium',_sans-serif]">Administration Affairs</h3>
                          </div>
                          <div className="space-y-1.5">
                            {[
                              { name: "Carbon Footprint", value: "92.3%" },
                              { name: "Supplier Satisfaction (Average Score)", value: "4.5" },
                              { name: "Number of Complaints or Grievances", value: "12" },
                              { name: "Cost Savings Rate from Contract Negotiations", value: "18%" },
                              { name: "Breakdown Density per Square Foot", value: "0.2" },
                              { name: "Volume of Materials Recycled", value: "85%" },
                              { name: "Critical Injury Rate", value: "0.1%" },
                              { name: "Technical Equipment Downtime Rate", value: "2.5%" },
                              { name: "Technical Readiness of Customs Centers", value: "96%" },
                              { name: "Procurement from SMEs Rate", value: "42%" },
                              { name: "Electricity Savings Rate (Solar)", value: "35%" },
                              { name: "Preventive Maintenance Completion Rate", value: "94%" }
                            ].map((kpi, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 p-1.5 rounded transition-colors cursor-pointer group"
                                style={{ transition: 'background-color 0.2s' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#BB995610'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                              >
                                <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: '#357743' }}></div>
                                <span className="text-xs text-gray-700 flex-1 group-hover:text-[#008755] font-['Dubai',_sans-serif]">
                                  {kpi.name}
                                </span>
                                <span className="text-xs font-medium text-[#008755] font-['Dubai:Bold',_sans-serif]">
                                  {kpi.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Card>

                      {/* Customs Refund Management */}
                      <Card className="hover:shadow-lg transition-shadow">
                        <div className="p-3 border-l-4" style={{ borderLeftColor: '#00B0AA' }}>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-7 w-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#00B0AA' }}>
                              <Activity className="h-4 w-4 text-white" />
                            </div>
                            <h3 className="text-xs text-[#008755] font-['Dubai:Medium',_sans-serif]">Customs Refund Management</h3>
                          </div>
                          <div className="space-y-1.5">
                            {[
                              { name: "Success rate of refund assessment", value: "96.5%" },
                              { name: "Stakeholder Satisfaction with Refund Process", value: "89%" },
                              { name: "Refund Clearance Accuracy Rate", value: "98.2%" }
                            ].map((kpi, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 p-1.5 rounded transition-colors cursor-pointer group"
                                style={{ transition: 'background-color 0.2s' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#00B0AA10'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                              >
                                <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: '#357743' }}></div>
                                <span className="text-xs text-gray-700 flex-1 group-hover:text-[#008755] font-['Dubai',_sans-serif]">
                                  {kpi.name}
                                </span>
                                <span className="text-xs font-medium text-[#008755] font-['Dubai:Bold',_sans-serif]">
                                  {kpi.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Card>

                      {/* Corporate Communication */}
                      <Card className="hover:shadow-lg transition-shadow">
                        <div className="p-3 border-l-4" style={{ borderLeftColor: '#115E67' }}>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-7 w-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#115E67' }}>
                              <Users className="h-4 w-4 text-white" />
                            </div>
                            <h3 className="text-xs text-[#008755] font-['Dubai:Medium',_sans-serif]">Corporate Communication</h3>
                          </div>
                          <div className="space-y-1.5">
                            {[
                              { name: "Social Return on Investment Index (SROI)", value: "3.2x" },
                              { name: "Brand Perception Index", value: "87%" },
                              { name: "Community Satisfaction Rate", value: "91%" },
                              { name: "Community Initiatives Target Achievement %", value: "94%" },
                              { name: "Community Satisfaction Rate from CSR Programs", value: "88%" },
                              { name: "Sector/Department Satisfaction Rate from Events", value: "92%" },
                              { name: "Percentage of Marketing Effectiveness (Clients Happiness Survey)", value: "85%" }
                            ].map((kpi, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 p-1.5 rounded transition-colors cursor-pointer group"
                                style={{ transition: 'background-color 0.2s' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#115E6710'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                              >
                                <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: '#357743' }}></div>
                                <span className="text-xs text-gray-700 flex-1 group-hover:text-[#008755] font-['Dubai',_sans-serif]">
                                  {kpi.name}
                                </span>
                                <span className="text-xs font-medium text-[#008755] font-['Dubai:Bold',_sans-serif]">
                                  {kpi.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>

                  {/* Tier 3: Enablers */}
                  <div>
                    <div className="mb-3">
                      <h2 className="text-base text-[#008755] flex items-center gap-2 font-['Dubai:Medium',_sans-serif]">
                        <div className="h-6 w-1 bg-[#008755] rounded-full"></div>
                        Enablers — Foundation for Success
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                      {/* Human Capital */}
                      <Card className="hover:shadow-lg transition-all">
                        <div className="p-2">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#008755] to-[#008755]/70 flex items-center justify-center flex-shrink-0">
                              <Users className="h-3.5 w-3.5 text-white" />
                            </div>
                            <h3 className="text-xs text-[#008755] font-['Dubai:Medium',_sans-serif]">Human Capital</h3>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-medium text-[#008755] font-['Dubai:Bold',_sans-serif]">87.5%</span>
                              <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: '#357743' }}></div>
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="h-3 w-3" style={{ color: '#357743' }} />
                              <span className="text-[10px]" style={{ color: '#357743' }}>+5%</span>
                            </div>
                          </div>
                          <div className="mt-1.5 space-y-0.5">
                            <p className="text-[9px] text-gray-500 font-['Dubai',_sans-serif]">Turnover: 3.2% • Emiratization: 42%</p>
                          </div>
                        </div>
                      </Card>

                      {/* Technology & Digital Environment */}
                      <Card className="hover:shadow-lg transition-all">
                        <div className="p-2">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#008755] to-[#008755]/70 flex items-center justify-center flex-shrink-0">
                              <Cpu className="h-3.5 w-3.5 text-white" />
                            </div>
                            <h3 className="text-xs text-[#008755] font-['Dubai:Medium',_sans-serif]">Technology</h3>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-medium text-[#008755] font-['Dubai:Bold',_sans-serif]">94.2%</span>
                              <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: '#357743' }}></div>
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="h-3 w-3" style={{ color: '#357743' }} />
                              <span className="text-[10px]" style={{ color: '#357743' }}>+8%</span>
                            </div>
                          </div>
                          <div className="mt-1.5 space-y-0.5">
                            <p className="text-[9px] text-gray-500 font-['Dubai',_sans-serif]">Processes digitized: 91%</p>
                          </div>
                        </div>
                      </Card>

                      {/* Organizational Excellence */}
                      <Card className="hover:shadow-lg transition-all">
                        <div className="p-2">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#008755] to-[#008755]/70 flex items-center justify-center flex-shrink-0">
                              <Trophy className="h-3.5 w-3.5 text-white" />
                            </div>
                            <h3 className="text-xs text-[#008755] font-['Dubai:Medium',_sans-serif]">Excellence</h3>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-medium text-[#008755] font-['Dubai:Bold',_sans-serif]">91.5%</span>
                              <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: '#F2A200' }}></div>
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="h-3 w-3" style={{ color: '#357743' }} />
                              <span className="text-[10px]" style={{ color: '#357743' }}>+3%</span>
                            </div>
                          </div>
                          <div className="mt-1.5 space-y-0.5">
                            <p className="text-[9px] text-gray-500 font-['Dubai',_sans-serif]">Dubai Govt: 88% • Overall: 89.5%</p>
                          </div>
                        </div>
                      </Card>

                      {/* Financial Resources */}
                      <Card className="hover:shadow-lg transition-all">
                        <div className="p-2">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#008755] to-[#008755]/70 flex items-center justify-center flex-shrink-0">
                              <DollarSign className="h-3.5 w-3.5 text-white" />
                            </div>
                            <h3 className="text-xs text-[#008755] font-['Dubai:Medium',_sans-serif]">Financial</h3>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-medium text-[#008755] font-['Dubai:Bold',_sans-serif]">95.8%</span>
                              <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: '#357743' }}></div>
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="h-3 w-3" style={{ color: '#357743' }} />
                              <span className="text-[10px]" style={{ color: '#357743' }}>+3%</span>
                            </div>
                          </div>
                          <div className="mt-1.5 space-y-0.5">
                            <p className="text-[9px] text-gray-500 font-['Dubai',_sans-serif]">Budget Performance</p>
                          </div>
                        </div>
                      </Card>

                      {/* Partners */}
                      <Card className="hover:shadow-lg transition-all">
                        <div className="p-2">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#008755] to-[#008755]/70 flex items-center justify-center flex-shrink-0">
                              <Handshake className="h-3.5 w-3.5 text-white" />
                            </div>
                            <h3 className="text-xs text-[#008755] font-['Dubai:Medium',_sans-serif]">Partners</h3>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-medium text-[#008755] font-['Dubai:Bold',_sans-serif]">83.5%</span>
                              <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: '#F2A200' }}></div>
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="h-3 w-3" style={{ color: '#357743' }} />
                              <span className="text-[10px]" style={{ color: '#357743' }}>+2%</span>
                            </div>
                          </div>
                          <div className="mt-1.5 space-y-0.5">
                            <p className="text-[9px] text-gray-500 font-['Dubai',_sans-serif]">OGA Engagement</p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center p-8 text-gray-500 font-['Dubai',_sans-serif]">
                  Content for {division.name} will be added here
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}