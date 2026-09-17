import {
  Plus,
  Target,
  TrendingUp,
  Edit,
  Trash2,
  Eye,
  Download,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  TrendingDown,
  Zap,
  X,
  ChevronRight,
  ChevronDown,
  Search,
  Calendar as CalendarIcon,
  Grid3x3,
  List,
  Building2,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useState } from "react";

interface ProjectTabsContentProps {
  activeTab: string;
  project: {
    strategicPillar: string;
  };
}

export function CostManagementTab() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">Cost Management</h2>
      
      {/* AI Budget Intelligence Panel */}
      <Card className="border-[#008755]/30 bg-gradient-to-r from-[#008755]/5 to-white">
        <CardContent className="pt-3 pb-3">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-[#008755]" />
            <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] text-sm">AI Budget Intelligence</h3>
            <Badge className="bg-[#008755]/10 text-[#008755] text-xs">Predictive Analysis</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Budget Burn Rate Forecast */}
            <div className="p-3 bg-white rounded border border-[#F2A200]/30">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="h-3.5 w-3.5 text-[#F2A200]" />
                <p className="text-xs text-muted-foreground">Budget Burn Rate</p>
              </div>
              <p className="text-lg font-['Dubai:Medium',_'Dubai'] text-[#F2A200] mb-1">AED 180K/month</p>
              <p className="text-xs text-muted-foreground">5% above average</p>
            </div>

            {/* Overrun Probability */}
            <div className="p-3 bg-white rounded border border-[#D83731]/30">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-3.5 w-3.5 text-[#D83731]" />
                <p className="text-xs text-muted-foreground">Overrun Probability</p>
              </div>
              <p className="text-lg font-['Dubai:Medium',_'Dubai'] text-[#D83731] mb-1">32%</p>
              <p className="text-xs text-muted-foreground">Phase 3 contributing factor</p>
            </div>

            {/* Anomaly Detection */}
            <div className="p-3 bg-white rounded border border-[#357743]/30">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-3.5 w-3.5 text-[#357743]" />
                <p className="text-xs text-muted-foreground">Anomaly Detection</p>
              </div>
              <p className="text-lg font-['Dubai:Medium',_'Dubai'] text-[#357743] mb-1">No Issues</p>
              <p className="text-xs text-muted-foreground">All expenses within norms</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Budget Health Gauge */}
      <Card className="border-[#008755]/20">
        <CardContent className="pt-4 pb-4">
          <h3 className="font-['Dubai:Medium',_'Dubai'] mb-4 text-[#1f2937]">Budget Health Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded">
              <p className="text-xs text-muted-foreground mb-2">Total Budget</p>
              <p className="text-2xl font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">AED 2.5M</p>
            </div>
            <div className="text-center p-4 bg-[#008755]/10 rounded">
              <p className="text-xs text-muted-foreground mb-2">Spent to Date</p>
              <p className="text-2xl font-['Dubai:Medium',_'Dubai'] text-[#008755]">AED 1.8M</p>
            </div>
            <div className="text-center p-4 bg-[#357743]/10 rounded">
              <p className="text-xs text-muted-foreground mb-2">Remaining</p>
              <p className="text-2xl font-['Dubai:Medium',_'Dubai'] text-[#357743]">AED 0.7M</p>
            </div>
            <div className="text-center p-4 bg-[#F2A200]/10 rounded">
              <p className="text-xs text-muted-foreground mb-2">Variance</p>
              <p className="text-2xl font-['Dubai:Medium',_'Dubai'] text-[#F2A200]">+5.2%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Table */}
      <Card className="border-[#008755]/20">
        <CardContent className="pt-4 pb-4">
          <h3 className="font-['Dubai:Medium',_'Dubai'] mb-4 text-[#1f2937]">Budget Breakdown by Milestone</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Milestone</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Planned</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Actual</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Forecast</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Variance</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Payment Status</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Phase 1: Requirements", planned: "450K", actual: "450K", forecast: "450K", variance: "0%", status: "Paid", varianceColor: "#357743" },
                  { name: "Phase 2: System Design", planned: "650K", actual: "620K", forecast: "620K", variance: "-4.6%", status: "Paid", varianceColor: "#357743" },
                  { name: "Phase 3: Development", planned: "900K", actual: "730K", forecast: "980K", variance: "+8.9%", status: "Partial", varianceColor: "#F2A200" },
                  { name: "Phase 4: Testing", planned: "300K", actual: "0K", forecast: "320K", variance: "+6.7%", status: "Pending", varianceColor: "#F2A200" },
                  { name: "Phase 5: Deployment", planned: "200K", actual: "0K", forecast: "200K", variance: "0%", status: "Pending", varianceColor: "#6b7280" },
                ].map((item, idx) => (
                  <tr key={idx} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-3 text-sm text-[#1f2937]">{item.name}</td>
                    <td className="py-3 px-3 text-sm text-[#1f2937]">AED {item.planned}</td>
                    <td className="py-3 px-3 text-sm text-[#008755]">AED {item.actual}</td>
                    <td className="py-3 px-3 text-sm text-[#1f2937]">AED {item.forecast}</td>
                    <td className="py-3 px-3">
                      <span style={{ color: item.varianceColor }} className="text-sm font-['Dubai:Medium',_'Dubai']">
                        {item.variance}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <Badge
                        style={{
                          backgroundColor: item.status === "Paid" ? "#35774320" : item.status === "Partial" ? "#F2A20020" : "#6b728020",
                          color: item.status === "Paid" ? "#357743" : item.status === "Partial" ? "#F2A200" : "#6b7280"
                        }}
                        className="text-xs"
                      >
                        {item.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-3">
                      <Button size="sm" variant="outline" className="text-xs">
                        Add Payment
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function RiskRegisterTab() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">Risk Register</h2>

<Card className="border-[#008755]/30 bg-gradient-to-r from-[#008755]/5 to-white">
        <CardContent className="pt-3 pb-3">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-[#008755]" />
            <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] text-sm">AI Risk Gap Analysis</h3>
            <Badge className="bg-[#008755]/10 text-[#008755] text-xs">Intelligent Insights</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Gap Analysis Card */}
            <div className="p-3 bg-white rounded border border-[#F2A200]/30">
              <h4 className="text-xs text-muted-foreground mb-2 font-['Dubai:Medium',_'Dubai']">Potential Risk Gaps Detected</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-xs">
                  <AlertCircle className="h-3 w-3 text-[#F2A200] mt-0.5 flex-shrink-0" />
                  <span className="text-[#1f2937]">No cybersecurity risks identified</span>
                </li>
                <li className="flex items-start gap-2 text-xs">
                  <AlertCircle className="h-3 w-3 text-[#F2A200] mt-0.5 flex-shrink-0" />
                  <span className="text-[#1f2937]">Vendor dependency not documented</span>
                </li>
                <li className="flex items-start gap-2 text-xs">
                  <AlertCircle className="h-3 w-3 text-[#F2A200] mt-0.5 flex-shrink-0" />
                  <span className="text-[#1f2937]">Data migration risks missing</span>
                </li>
              </ul>
            </div>

            {/* Suggested Missing Risks */}
            <div className="p-3 bg-white rounded border border-[#008755]/30">
              <h4 className="text-xs text-muted-foreground mb-2 font-['Dubai:Medium',_'Dubai']">AI-Suggested Risks to Consider</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-xs">
                  <Zap className="h-3 w-3 text-[#008755] mt-0.5 flex-shrink-0" />
                  <span className="text-[#1f2937]">Integration with legacy systems</span>
                </li>
                <li className="flex items-start gap-2 text-xs">
                  <Zap className="h-3 w-3 text-[#008755] mt-0.5 flex-shrink-0" />
                  <span className="text-[#1f2937]">User adoption challenges</span>
                </li>
                <li className="flex items-start gap-2 text-xs">
                  <Zap className="h-3 w-3 text-[#008755] mt-0.5 flex-shrink-0" />
                  <span className="text-[#1f2937]">Change management resistance</span>
                </li>
              </ul>
              <Button size="sm" variant="outline" className="w-full mt-3 text-xs border-[#008755] text-[#008755] hover:bg-[#008755]/10">
                Review Suggestions
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Risk Register Table */}
      <Card className="border-[#008755]/20">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">Risk Register</h3>
            <Button size="sm" className="bg-[#008755] hover:bg-[#006644] text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Risk
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Risk</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Description</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Severity</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Mitigation Strategy</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Support Required</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Owner</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Issues</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { 
                    risk: "Resource Availability", 
                    description: "Key technical resources may not be available during critical development phase", 
                    severity: "High", 
                    strategy: "Engage contract resources and cross-train team members", 
                    support: "1",
                    owner: "Sarah Ahmed", 
                    status: "Active", 
                    issues: "2"
                  },
                  { 
                    risk: "Technology Integration", 
                    description: "Integration with legacy systems more complex than anticipated", 
                    severity: "Medium", 
                    strategy: "Conduct proof-of-concept and phased integration approach", 
                    support: "3",
                    owner: "Ahmed Khalil", 
                    status: "Monitoring", 
                    issues: "1"
                  },
                  { 
                    risk: "Budget Overrun", 
                    description: "Development costs exceeding initial budget estimates", 
                    severity: "Medium", 
                    strategy: "Weekly budget reviews and variance tracking", 
                    support: "2",
                    owner: "Mohammed Ali", 
                    status: "Monitoring", 
                    issues: "0"
                  },
                  { 
                    risk: "Stakeholder Alignment", 
                    description: "Delays in obtaining stakeholder approvals for key decisions", 
                    severity: "Low", 
                    strategy: "Regular stakeholder briefings and feedback sessions", 
                    support: "6",
                    owner: "Fatima Hassan", 
                    status: "Closed", 
                    issues: "0"
                  },
                ].map((item, idx) => (
                  <tr key={idx} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-3 text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{item.risk}</td>
                    <td className="py-3 px-3 text-sm text-[#1f2937]">{item.description}</td>
                    <td className="py-3 px-3">
                      <Badge 
                        className="text-xs"
                        style={{
                          backgroundColor: item.severity === "High" ? "#D8373120" : item.severity === "Medium" ? "#F2A20020" : "#35774320",
                          color: item.severity === "High" ? "#D83731" : item.severity === "Medium" ? "#F2A200" : "#357743"
                        }}
                      >
                        {item.severity}
                      </Badge>
                    </td>
                    <td className="py-3 px-3 text-sm text-[#1f2937]">{item.strategy}</td>
                    <td className="py-3 px-3 text-sm text-[#1f2937]">{item.support}</td>
                    <td className="py-3 px-3 text-sm text-[#1f2937]">{item.owner}</td>
                    <td className="py-3 px-3">
                      <Badge 
                        className="text-xs"
                        style={{
                          backgroundColor: item.status === "Active" ? "#00875520" : item.status === "Monitoring" ? "#F2A20020" : "#35774320",
                          color: item.status === "Active" ? "#008755" : item.status === "Monitoring" ? "#F2A200" : "#357743"
                        }}
                      >
                        {item.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-3 text-sm text-center text-[#1f2937]">{item.issues}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Edit className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-[#D83731]"><Trash2 className="h-3.5 w-3.5" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Issues Table */}
      <Card className="border-[#008755]/20">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">Issues</h3>
            <Button size="sm" className="bg-[#008755] hover:bg-[#006644] text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Issue
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Name</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Description</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Priority</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Date Reported</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    name: "Senior Developer Unavailable",
                    description: "Lead developer requested medical leave during sprint 3",
                    priority: "Critical",
                    status: "Open",
                    dateReported: "Mar 10, 2025"
                  },
                  {
                    name: "API Response Timeout",
                    description: "Legacy system API experiencing intermittent timeout issues",
                    priority: "High",
                    status: "In Progress",
                    dateReported: "Mar 12, 2025"
                  },
                  {
                    name: "Database Migration Delay",
                    description: "Data migration from old system taking longer than expected",
                    priority: "High",
                    status: "Open",
                    dateReported: "Mar 15, 2025"
                  },
                  {
                    name: "UI Design Inconsistency",
                    description: "Some screens not following Dubai Customs design guidelines",
                    priority: "Medium",
                    status: "Resolved",
                    dateReported: "Mar 08, 2025"
                  },
                  {
                    name: "Testing Environment Access",
                    description: "QA team unable to access staging environment",
                    priority: "Low",
                    status: "Resolved",
                    dateReported: "Mar 05, 2025"
                  }
                ].map((item, idx) => (
                  <tr key={idx} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-3 text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{item.name}</td>
                    <td className="py-3 px-3 text-sm text-[#1f2937]">{item.description}</td>
                    <td className="py-3 px-3">
                      <Badge 
                        className="text-xs"
                        style={{
                          backgroundColor: item.priority === "Critical" ? "#D8373120" : item.priority === "High" ? "#F2A20020" : item.priority === "Medium" ? "#00875520" : "#35774320",
                          color: item.priority === "Critical" ? "#D83731" : item.priority === "High" ? "#F2A200" : item.priority === "Medium" ? "#008755" : "#357743"
                        }}
                      >
                        {item.priority}
                      </Badge>
                    </td>
                    <td className="py-3 px-3">
                      <Badge 
                        className="text-xs"
                        style={{
                          backgroundColor: item.status === "Open" ? "#D8373120" : item.status === "In Progress" ? "#00875520" : "#35774320",
                          color: item.status === "Open" ? "#D83731" : item.status === "In Progress" ? "#008755" : "#357743"
                        }}
                      >
                        {item.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-3 text-sm text-muted-foreground">{item.dateReported}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Edit className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-[#D83731]"><Trash2 className="h-3.5 w-3.5" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function StakeholdersTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">Stakeholders</h2>
        <Button size="sm" className="bg-[#008755] hover:bg-[#006644] text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Stakeholder
        </Button>
      </div>

      {/* Stakeholder Table */}
      <Card className="border-[#008755]/20">
        <CardContent className="pt-4 pb-4">
          <h3 className="font-['Dubai:Medium',_'Dubai'] mb-4 text-[#1f2937]">Stakeholder Directory</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Stakeholder Name</th>
                  {/* <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Relationship Nature</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Classification</th> */}
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Expectation</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Responsibilities</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Interest Level</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Influence Level</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { 
                    name: "Director General", 
                    // relationshipNature: "Internal - Executive", 
                    // classification: "Key Decision Maker", 
                    expectation: "Strategic alignment and timely project delivery", 
                    responsibilities: "Provides strategic direction, approves budget allocations, and ensures alignment with organizational goals",
                    interestLevel: "High",
                    influenceLevel: "Very High"
                  },
                  { 
                    name: "Sarah Ahmed", 
                    // relationshipNature: "Internal - Project Team", 
                    // classification: "Project Manager", 
                    expectation: "Clear requirements and stakeholder cooperation", 
                    responsibilities: "Overall project delivery, team coordination, stakeholder management, and risk mitigation",
                    interestLevel: "Very High",
                    influenceLevel: "High"
                  },
                  { 
                    name: "IT Department Head", 
                    // relationshipNature: "Internal - Technical", 
                    // classification: "Technical Expert", 
                    expectation: "Technical feasibility and infrastructure readiness", 
                    responsibilities: "Technical architecture decisions, infrastructure setup, and system integration oversight",
                    interestLevel: "High",
                    influenceLevel: "High"
                  },
                  { 
                    name: "Finance Director", 
                    // relationshipNature: "Internal - Finance", 
                    // classification: "Budget Approver", 
                    expectation: "Budget compliance and cost optimization", 
                    responsibilities: "Financial oversight, budget approval, cost control, and financial reporting",
                    interestLevel: "Medium",
                    influenceLevel: "Very High"
                  },
                  { 
                    name: "Operations Manager", 
                    // relationshipNature: "Internal - Business Unit", 
                    // classification: "Business Owner", 
                    expectation: "Business value realization and minimal disruption", 
                    responsibilities: "Defines business requirements, validates deliverables, and ensures operational readiness",
                    interestLevel: "High",
                    influenceLevel: "Medium"
                  },
                  { 
                    name: "Security Officer", 
                    // relationshipNature: "Internal - Compliance", 
                    // classification: "Compliance Expert", 
                    expectation: "Security standards adherence and risk mitigation", 
                    responsibilities: "Ensures security standards, conducts security reviews, and approves deployment",
                    interestLevel: "Medium",
                    influenceLevel: "High"
                  },
                  { 
                    name: "Trade Partners Association", 
                    // relationshipNature: "External - Partner", 
                    // classification: "External Stakeholder", 
                    expectation: "Seamless integration and improved service efficiency", 
                    responsibilities: "Provides feedback on user experience and participates in testing phases",
                    interestLevel: "High",
                    influenceLevel: "Low"
                  },
                ].map((item, idx) => (
                  <tr key={idx} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-3 text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{item.name}</td>
                    {/* <td className="py-3 px-3">
                      <Badge 
                        className="text-xs"
                        style={{
                          backgroundColor: item.relationshipNature.startsWith("Internal") ? "#00875520" : "#F2A20020",
                          color: item.relationshipNature.startsWith("Internal") ? "#008755" : "#F2A200"
                        }}
                      >
                        {item.relationshipNature}
                      </Badge>
                    </td>
                    <td className="py-3 px-3 text-sm text-[#1f2937]">{item.classification}</td> */}
                    <td className="py-3 px-3 text-sm text-[#1f2937]">{item.expectation}</td>
                    <td className="py-3 px-3 text-sm text-[#1f2937]">{item.responsibilities}</td>
                    <td className="py-3 px-3">
                      <Badge 
                        className="text-xs"
                        style={{
                          backgroundColor: 
                            item.interestLevel === "Very High" ? "#00B0AA20" : 
                            item.interestLevel === "High" ? "#00875520" : 
                            item.interestLevel === "Medium" ? "#F2A20020" : "#6b728020",
                          color: 
                            item.interestLevel === "Very High" ? "#00B0AA" : 
                            item.interestLevel === "High" ? "#008755" : 
                            item.interestLevel === "Medium" ? "#F2A200" : "#6b7280"
                        }}
                      >
                        {item.interestLevel}
                      </Badge>
                    </td>
                    <td className="py-3 px-3">
                      <Badge 
                        className="text-xs"
                        style={{
                          backgroundColor: 
                            item.influenceLevel === "Very High" ? "#D8373120" : 
                            item.influenceLevel === "High" ? "#F2A20020" : 
                            item.influenceLevel === "Medium" ? "#00875520" : "#6b728020",
                          color: 
                            item.influenceLevel === "Very High" ? "#D83731" : 
                            item.influenceLevel === "High" ? "#F2A200" : 
                            item.influenceLevel === "Medium" ? "#008755" : "#6b7280"
                        }}
                      >
                        {item.influenceLevel}
                      </Badge>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Edit className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-[#D83731]"><Trash2 className="h-3.5 w-3.5" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function GoalsBenefitsTab({ strategicPillar }: { strategicPillar: string }) {
  const [expandedBenefits, setExpandedBenefits] = useState<Set<string>>(new Set());

  // Mock data for goals
  const goals = [
    {
      id: "goal-1",
      title: "Enhance Digital Service Delivery",
      description: "Implement a comprehensive digital platform to streamline customs clearance processes and reduce processing time by 40%"
    },
    {
      id: "goal-2",
      title: "Improve Customer Experience",
      description: "Achieve a customer satisfaction rating of 90% or higher through improved service quality and reduced wait times"
    },
    {
      id: "goal-3",
      title: "Increase Operational Efficiency",
      description: "Optimize internal workflows and resource allocation to improve overall operational efficiency by 30%"
    }
  ];

  // Mock data for benefits with linked KPIs
  const benefits = [
    {
      id: "benefit-1",
      name: "Improved Customer Satisfaction",
      strategicObjective: "Customer Excellence",
      impact: "High",
      timeframe: "Q2 2026",
      kpis: [
        { id: "kpi-1", name: "Customer Satisfaction Score (CSAT)", achievement: 85 },
        { id: "kpi-2", name: "Net Promoter Score (NPS)", achievement: 65 },
        { id: "kpi-3", name: "Service Response Time", achievement: 102 }
      ]
    },
    {
      id: "benefit-2",
      name: "Operational Efficiency Improvement",
      strategicObjective: "Operational Excellence",
      impact: "Medium",
      timeframe: "Q3 2026",
      kpis: [
        { id: "kpi-4", name: "Process Automation Rate (%)", achievement: 92 },
        { id: "kpi-5", name: "Average Processing Time (hours)", achievement: 38 }
      ]
    },
    {
      id: "benefit-3",
      name: "Cost Reduction",
      strategicObjective: "Financial Sustainability",
      impact: "High",
      timeframe: "Q4 2026",
      kpis: []
    },
    {
      id: "benefit-4",
      name: "Enhanced Compliance",
      strategicObjective: "Regulatory Excellence",
      impact: "Medium",
      timeframe: "Q1 2027",
      kpis: [
        { id: "kpi-6", name: "Compliance Rate (%)", achievement: 115 }
      ]
    }
  ];

  const toggleBenefitExpanded = (benefitId: string) => {
    setExpandedBenefits(prev => {
      const newSet = new Set(prev);
      if (newSet.has(benefitId)) {
        newSet.delete(benefitId);
      } else {
        newSet.add(benefitId);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">Goals & Benefits</h2>

      {/* Strategic Alignment Card */}
      <Card className="border-[#008755]/20 bg-gradient-to-r from-[#008755]/5 to-white">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center gap-3">
            <Target className="h-8 w-8 text-[#008755]" />
            <div>
              <p className="text-xs text-muted-foreground">Strategic Alignment</p>
              <p className="text-lg font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{strategicPillar}</p>
              <p className="text-sm text-muted-foreground">Linked to Dubai Customs Strategic Plan 2025</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Goals Table */}
      <Card className="border-[#008755]/20">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">Goals</h3>
            <Button size="sm" className="bg-[#008755] hover:bg-[#006644] text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Goal
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Title</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Description</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {goals.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center p-6 text-muted-foreground">
                      No goals added yet. Click "Add Goal" to begin.
                    </td>
                  </tr>
                ) : (
                  goals.map((goal) => (
                    <tr key={goal.id} className="border-b hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-3 text-sm text-[#1f2937]">{goal.title}</td>
                      <td className="py-3 px-3 text-sm text-[#1f2937]">{goal.description}</td>
                      <td className="py-3 px-3">
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-[#D83731]">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Benefits Table */}
      <Card className="border-[#008755]/20">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">Benefits</h3>
            <Button size="sm" className="bg-[#008755] hover:bg-[#006644] text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Benefit
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="w-8"></th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Name</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Strategic Objective</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Impact</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Timeframe</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {benefits.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center p-6 text-muted-foreground">
                      No benefits added yet. Click "Add Benefit" to begin.
                    </td>
                  </tr>
                ) : (
                  benefits.map((benefit) => (
                    <>
                      <tr key={benefit.id} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-3">
                          <button
                            onClick={() => toggleBenefitExpanded(benefit.id)}
                            className="hover:bg-muted/50 rounded p-1 transition-colors"
                            title={expandedBenefits.has(benefit.id) ? "Hide KPIs" : "Display KPIs"}
                          >
                            {expandedBenefits.has(benefit.id) ? (
                              <ChevronDown className="h-4 w-4 text-[#008755]" />
                            ) : (
                              <ChevronRight className="h-4 w-4 text-[#008755]" />
                            )}
                          </button>
                        </td>
                        <td className="py-3 px-3 text-sm text-[#1f2937]">{benefit.name}</td>
                        <td className="py-3 px-3 text-sm text-[#1f2937]">{benefit.strategicObjective || "Not Set"}</td>
                        <td className="py-3 px-3">
                          <Badge 
                            variant="outline" 
                            className="text-xs"
                            style={{
                              backgroundColor: benefit.impact === "High" ? "#35774320" : benefit.impact === "Medium" ? "#00875520" : "#F2A20020",
                              color: benefit.impact === "High" ? "#357743" : benefit.impact === "Medium" ? "#008755" : "#F2A200"
                            }}
                          >
                            {benefit.impact}
                          </Badge>
                        </td>
                        <td className="py-3 px-3 text-sm text-[#1f2937]">{benefit.timeframe}</td>
                        <td className="py-3 px-3">
                          <div className="flex gap-2">
                            <Button 
                              variant="link" 
                              size="sm" 
                              className="h-7 px-2 text-[#008755] hover:text-[#006644] no-underline"
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              Add KPI
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 px-2 text-[#D83731]">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                      {/* Expanded KPIs Row */}
                      {expandedBenefits.has(benefit.id) && (
                        <tr className="bg-muted/10">
                          <td colSpan={6} className="p-0">
                            <div className="p-4 pl-12">
                              <div className="bg-white rounded-lg border border-[#008755]/20">
                                <table className="w-full text-sm">
                                  <thead className="bg-muted/20">
                                    <tr>
                                      <th className="text-left p-3 font-['Dubai:Medium',_'Dubai'] text-xs">KPI Name</th>
                                      <th className="text-left p-3 font-['Dubai:Medium',_'Dubai'] text-xs">Achievement</th>
                                      <th className="text-left p-3 font-['Dubai:Medium',_'Dubai'] text-xs">Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {!benefit.kpis || benefit.kpis.length === 0 ? (
                                      <tr>
                                        <td colSpan={3} className="text-center p-4 text-muted-foreground text-xs">
                                          No KPIs linked yet. Click "Add KPI Link" to begin.
                                        </td>
                                      </tr>
                                    ) : (
                                      benefit.kpis.map((kpi) => {
                                        const achievement = kpi.achievement || 0;
                                        // Determine color based on achievement percentage
                                        const getAchievementColor = (value: number) => {
                                          if (value >= 100) return '#008755'; // Blue for 100%+
                                          if (value >= 80) return '#357743'; // Green for 80-100%
                                          if (value >= 40) return '#F2A200'; // Yellow for 40-80%
                                          return '#D83731'; // Red for 0-40%
                                        };

                                        return (
                                          <tr key={kpi.id} className="border-t">
                                            <td className="p-3 text-xs">{kpi.name}</td>
                                            <td className="p-3">
                                              <div className="flex items-start gap-2">
                                                <div className="flex-1">
                                                  {/* Achievement percentage text */}
                                                  <div className="text-xs font-['Dubai:Medium',_'Dubai'] mb-1" style={{ color: getAchievementColor(achievement) }}>
                                                    {achievement.toFixed(2)}%
                                                  </div>
                                                  {/* Horizontal gauge */}
                                                  <div className="relative w-full h-5 bg-gray-100 rounded-full overflow-hidden">
                                                    {/* Scale labels */}
                                                    <div className="absolute inset-0 flex items-center justify-between px-1 text-[10px] text-white z-10">
                                                      <span>0</span>
                                                      <span className="ml-auto">140%</span>
                                                    </div>
                                                    {/* Colored segments background - full width */}
                                                    <div className="absolute inset-0 flex">
                                                      {/* Red segment: 0-40% */}
                                                      <div className="h-full" style={{ width: '28.57%', backgroundColor: '#d83731' }}></div>
                                                      {/* Yellow segment: 40-80% */}
                                                      <div className="h-full" style={{ width: '28.57%', backgroundColor: '#ffab00' }}></div>
                                                      {/* Green segment: 80-100% */}
                                                      <div className="h-full" style={{ width: '14.29%', backgroundColor: '#357743' }}></div>
                                                      {/* Blue segment: 100-120% */}
                                                      <div className="h-full" style={{ width: '14.29%', backgroundColor: '#77B1E8' }}></div>
                                                      {/* Light blue segment: 120-140% */}
                                                      <div className="h-full" style={{ width: '14.29%', backgroundColor: '#4485b7' }}></div>
                                                    </div>
                                                    {/* Achievement marker/indicator */}
                                                    <div 
                                                      className="absolute top-0 bottom-0 w-1 z-20" 
                                                      style={{ 
                                                        left: `${Math.min(achievement / 140 * 100, 100)}%`,
                                                        backgroundColor: getAchievementColor(achievement),
                                                        boxShadow: '0 0 4px rgba(0,0,0,0.3)'
                                                      }}
                                                    ></div>
                                                  </div>
                                                </div>
                                              </div>
                                            </td>
                                            <td className="p-3">
                                              <div className="flex gap-2">
                                                <Button variant="ghost" size="sm" className="h-6 px-2">
                                                  <Edit className="h-3 w-3" />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="h-6 px-2 text-[#D83731]">
                                                  <Trash2 className="h-3 w-3" />
                                                </Button>
                                              </div>
                                            </td>
                                          </tr>
                                        );
                                      })
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function ResourcesTab() {
  const [selectedResource, setSelectedResource] = useState<string | null>(null);

  // Sample task data for each resource (this would come from milestones tab in real app)
  const resourceTasks: Record<string, Array<{task: string; milestone: string; status: string; dueDate: string;}>> = {
    "Sarah Ahmed": [
      { task: "Project kickoff meeting", milestone: "Phase 1: Requirements", status: "Completed", dueDate: "Feb 15, 2025" },
      { task: "Stakeholder alignment session", milestone: "Phase 1: Requirements", status: "Completed", dueDate: "Feb 20, 2025" },
      { task: "Resource allocation planning", milestone: "Phase 2: System Design", status: "In Progress", dueDate: "Mar 30, 2025" },
      { task: "Budget review and forecasting", milestone: "Phase 3: Development", status: "Not Started", dueDate: "Apr 15, 2025" },
    ],
    "Ahmed Khalil": [
      { task: "API development - User module", milestone: "Phase 3: Development", status: "In Progress", dueDate: "Mar 28, 2025" },
      { task: "Database schema design", milestone: "Phase 2: System Design", status: "Completed", dueDate: "Feb 28, 2025" },
      { task: "Backend integration testing", milestone: "Phase 3: Development", status: "In Progress", dueDate: "Apr 05, 2025" },
      { task: "Security audit review", milestone: "Phase 4: Testing", status: "Not Started", dueDate: "Apr 20, 2025" },
    ],
    "Fatima Ibrahim": [
      { task: "System architecture documentation", milestone: "Phase 2: System Design", status: "Completed", dueDate: "Mar 01, 2025" },
      { task: "Cloud infrastructure setup", milestone: "Phase 2: System Design", status: "In Progress", dueDate: "Mar 25, 2025" },
      { task: "Performance optimization review", milestone: "Phase 3: Development", status: "Not Started", dueDate: "Apr 10, 2025" },
    ],
    "Layla Mohammed": [
      { task: "UI/UX wireframe design", milestone: "Phase 2: System Design", status: "Completed", dueDate: "Feb 25, 2025" },
      { task: "User interface development", milestone: "Phase 3: Development", status: "In Progress", dueDate: "Mar 30, 2025" },
      { task: "User acceptance testing prep", milestone: "Phase 4: Testing", status: "Not Started", dueDate: "Apr 18, 2025" },
    ],
    "Omar Ali": [
      { task: "Backend API endpoints", milestone: "Phase 3: Development", status: "In Progress", dueDate: "Mar 27, 2025" },
      { task: "Data migration scripts", milestone: "Phase 3: Development", status: "In Progress", dueDate: "Apr 02, 2025" },
      { task: "Integration with legacy systems", milestone: "Phase 3: Development", status: "Not Started", dueDate: "Apr 12, 2025" },
    ],
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">Resources</h2>

      {/* Resources Table */}
      <Card className="border-[#008755]/20">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">Resource Allocation</h3>
            <Button size="sm" className="bg-[#008755] hover:bg-[#006644] text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Resource
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Resource</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Role</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Allocation %</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Utilization</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Sarah Ahmed", role: "Project Manager", allocation: 100, utilization: 95, status: "Active" },
                  { name: "Ahmed Khalil", role: "Senior Developer", allocation: 80, utilization: 88, status: "Active" },
                  { name: "Fatima Ibrahim", role: "System Architect", allocation: 60, utilization: 72, status: "Active" },
                  { name: "Layla Mohammed", role: "UX Designer", allocation: 50, utilization: 65, status: "Active" },
                  { name: "Omar Ali", role: "Backend Developer", allocation: 100, utilization: 92, status: "Active" },
                ].map((item, idx) => (
                  <tr key={idx} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-3">
                      <button 
                        onClick={() => setSelectedResource(item.name)}
                        className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#008755] hover:underline cursor-pointer"
                      >
                        {item.name}
                      </button>
                    </td>
                    <td className="py-3 px-3 text-sm text-[#1f2937]">{item.role}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <Progress value={item.allocation} className="h-2 w-[60px]" />
                        <span className="text-xs text-[#1f2937]">{item.allocation}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <Badge style={{ backgroundColor: item.utilization > 85 ? "#35774320" : item.utilization > 70 ? "#00875520" : "#F2A20020", color: item.utilization > 85 ? "#357743" : item.utilization > 70 ? "#008755" : "#F2A200" }} className="text-xs">
                        {item.utilization}%
                      </Badge>
                    </td>
                    <td className="py-3 px-3"><Badge style={{ backgroundColor: "#35774320", color: "#357743" }} className="text-xs">{item.status}</Badge></td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Edit className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-[#D83731]"><Trash2 className="h-3.5 w-3.5" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Allocation Heatmap */}
      <Card className="border-[#008755]/20">
        <CardContent className="pt-4 pb-4">
          <h3 className="font-['Dubai:Medium',_'Dubai'] mb-4 text-[#1f2937]">Weekly Allocation Heatmap</h3>
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              <div className="grid grid-cols-6 gap-2">
                <div className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground"></div>
                {["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"].map((week) => (
                  <div key={week} className="text-xs font-['Dubai:Medium',_'Dubai'] text-center text-muted-foreground">{week}</div>
                ))}
              </div>
              {["Sarah Ahmed", "Ahmed Khalil", "Fatima Ibrahim", "Layla Mohammed", "Omar Ali"].map((name, idx) => (
                <div key={name} className="grid grid-cols-6 gap-2 mt-2">
                  <div className="text-xs text-muted-foreground">{name}</div>
                  {[95, 88, 72, 65, 92].map((val, wIdx) => {
                    const variance = (Math.random() * 20) - 10;
                    const weekVal = Math.max(0, Math.min(100, val + variance));
                    const color = weekVal > 85 ? "#357743" : weekVal > 70 ? "#008755" : weekVal > 50 ? "#F2A200" : "#D83731";
                    return (
                      <div key={wIdx} className="h-10 rounded flex items-center justify-center text-white text-xs font-['Dubai:Medium',_'Dubai']" style={{ backgroundColor: color }}>
                        {Math.round(weekVal)}%
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resource Tasks Modal */}
      {selectedResource && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedResource(null)}>
          <div 
            className="fixed right-0 top-0 h-screen w-[50%] border-l bg-white shadow-xl flex flex-col animate-in slide-in-from-right duration-300" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b bg-gradient-to-r from-[#008755]/10 to-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{selectedResource}</h3>
                  <p className="text-sm text-muted-foreground">Allocated Tasks Overview</p>
                </div>
                <button 
                  onClick={() => setSelectedResource(null)} 
                  className="h-8 w-8 flex items-center justify-center rounded hover:bg-muted/50 transition-colors"
                >
                  <X className="h-5 w-5 text-[#1f2937]" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="mb-4">
                <h4 className="text-sm font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-2">
                  Task Assignment Summary
                </h4>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="p-3 bg-[#357743]/10 rounded border border-[#357743]/20">
                    <p className="text-xs text-muted-foreground mb-1">Completed</p>
                    <p className="text-2xl font-['Dubai:Medium',_'Dubai'] text-[#357743]">
                      {resourceTasks[selectedResource]?.filter(t => t.status === "Completed").length || 0}
                    </p>
                  </div>
                  <div className="p-3 bg-[#008755]/10 rounded border border-[#008755]/20">
                    <p className="text-xs text-muted-foreground mb-1">In Progress</p>
                    <p className="text-2xl font-['Dubai:Medium',_'Dubai'] text-[#008755]">
                      {resourceTasks[selectedResource]?.filter(t => t.status === "In Progress").length || 0}
                    </p>
                  </div>
                  <div className="p-3 bg-[#F2A200]/10 rounded border border-[#F2A200]/20">
                    <p className="text-xs text-muted-foreground mb-1">Not Started</p>
                    <p className="text-2xl font-['Dubai:Medium',_'Dubai'] text-[#F2A200]">
                      {resourceTasks[selectedResource]?.filter(t => t.status === "Not Started").length || 0}
                    </p>
                  </div>
                </div>
              </div>

              <h4 className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-3">Task Details</h4>
              <div className="space-y-3">
                {resourceTasks[selectedResource]?.map((task, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 border rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] flex-1">
                        {task.task}
                      </h5>
                      <Badge 
                        style={{ 
                          backgroundColor: task.status === "Completed" ? "#35774320" : task.status === "In Progress" ? "#00875520" : "#F2A20020", 
                          color: task.status === "Completed" ? "#357743" : task.status === "In Progress" ? "#008755" : "#F2A200" 
                        }} 
                        className="text-xs ml-2"
                      >
                        {task.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <span className="font-['Dubai:Medium',_'Dubai']">Milestone:</span>
                        <span>{task.milestone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-['Dubai:Medium',_'Dubai']">Due:</span>
                        <span>{task.dueDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 py-4 border-t bg-white">
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedResource(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function LessonsLearnedTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">Lessons Learned</h2>
        <Button size="sm" className="bg-[#008755] hover:bg-[#006644] text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Lesson
        </Button>
      </div>

      <Card className="border-[#008755]/20">
        <CardContent className="pt-4 pb-4">
          <h3 className="font-['Dubai:Medium',_'Dubai'] mb-4 text-[#1f2937]">Lessons Repository</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Title</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Category</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Impact Area</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Recommendation</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Linked Risk</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { title: "Early stakeholder engagement is critical", category: "Stakeholder Management", impact: "Schedule", recommendation: "Schedule stakeholder workshops in planning phase", risk: "R-004", status: "Implemented" },
                  { title: "Technical debt impacts delivery", category: "Technical", impact: "Quality", recommendation: "Allocate 20% sprint capacity for refactoring", risk: "R-002", status: "Under Review" },
                  { title: "Resource estimation accuracy", category: "Planning", impact: "Budget", recommendation: "Use historical data for effort estimation", risk: "R-001", status: "Implemented" },
                  { title: "Communication frequency matters", category: "Communication", impact: "Team Morale", recommendation: "Daily standups and weekly stakeholder updates", risk: "None", status: "Implemented" },
                ].map((item, idx) => (
                  <tr key={idx} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-3 text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{item.title}</td>
                    <td className="py-3 px-3"><Badge variant="outline" className="text-xs">{item.category}</Badge></td>
                    <td className="py-3 px-3 text-sm text-[#1f2937]">{item.impact}</td>
                    <td className="py-3 px-3 text-xs text-muted-foreground max-w-[200px]">{item.recommendation}</td>
                    <td className="py-3 px-3 text-sm text-[#008755]">{item.risk}</td>
                    <td className="py-3 px-3">
                      <Badge style={{ backgroundColor: item.status === "Implemented" ? "#35774320" : "#00875520", color: item.status === "Implemented" ? "#357743" : "#008755" }} className="text-xs">
                        {item.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Eye className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Edit className="h-3.5 w-3.5" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function ProjectClosureTab() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">Project Closure</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Section 1: Closure Details */}
        <Card className="border-[#008755]/20">
          <CardContent className="pt-4 pb-4">
            <h3 className="font-['Dubai:Medium',_'Dubai'] mb-4 text-[#1f2937]">Closure Information</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Closure Date</label>
                <input type="date" className="w-full px-3 py-2 border rounded text-sm" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Closure Type</label>
                <select className="w-full px-3 py-2 border rounded text-sm">
                  <option>Normal Completion</option>
                  <option>Early Termination</option>
                  <option>Scope Change</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Performance Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} className="text-2xl text-[#F2A200]">★</button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Benefits Realization */}
       <Card className="border-[#008755]/20">
        <CardContent className="pt-4 pb-4">
          <h3 className="font-['Dubai:Medium',_'Dubai'] mb-4 text-[#1f2937]">Benefits Realization Confirmation</h3>
          <div className="space-y-3">
            {[
              "All planned benefits have been documented",
              "Benefits measurement plan is in place",
              "Post-implementation review scheduled",
              "Benefits owners have been assigned"
            ].map((item, idx) => (
              <label key={idx} className="flex items-center gap-3 p-3 border rounded hover:bg-muted/30 cursor-pointer">
                <input type="checkbox" className="h-4 w-4" />
                <span className="text-sm text-[#1f2937]">{item}</span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>
      </div>

      
      

      {/* Section 4: Compliance Checklist */}
      <Card className="border-[#008755]/20">
        <CardContent className="pt-4 pb-4">
          <h3 className="font-['Dubai:Medium',_'Dubai'] mb-4 text-[#1f2937]">Compliance Checklist</h3>
          <div className="space-y-3">
            {[
              "All deliverables completed and approved",
              "Financial accounts closed and reconciled",
              "Resources released and reallocated",
              "Lessons learned documented",
              "Project documentation archived",
              "Stakeholder sign-off obtained"
            ].map((item, idx) => (
              <label key={idx} className="flex items-center gap-3 p-3 border rounded hover:bg-muted/30 cursor-pointer">
                <input type="checkbox" className="h-4 w-4" defaultChecked={idx < 4} />
                <span className="text-sm text-[#1f2937]">{item}</span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button size="lg" className="bg-[#008755] hover:bg-[#006644] text-white">
          <CheckCircle2 className="h-4 w-4 mr-2" />
          Submit for Approval
        </Button>
      </div>
    </div>
  );
}

export function CollaborationTab() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">Documents</h2>

     

      {/* Documents Section */}
      <Card className="border-[#008755]/20">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">Project Documents</h3>
            <Button size="sm" className="bg-[#008755] hover:bg-[#006644] text-white">
              <Plus className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">File</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Description</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Version</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Uploaded By</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { file: "Project Charter.pdf", description: "Initial project charter document", version: "v2.1", uploadedBy: "Sarah Ahmed", date: "Feb 28, 2025" },
                  { file: "Requirements Spec.docx", description: "Detailed requirements specification", version: "v3.0", uploadedBy: "Ali Hassan", date: "Feb 25, 2025" },
                  { file: "System Architecture.pdf", description: "Technical architecture diagram", version: "v1.5", uploadedBy: "Fatima Ibrahim", date: "Feb 20, 2025" },
                  { file: "Budget Report Q1.xlsx", description: "Q1 financial performance report", version: "v1.0", uploadedBy: "Mohammed Ali", date: "Feb 15, 2025" },
                ].map((item, idx) => (
                  <tr key={idx} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-3 text-sm font-['Dubai:Medium',_'Dubai'] text-[#008755]">{item.file}</td>
                    <td className="py-3 px-3 text-xs text-muted-foreground">{item.description}</td>
                    <td className="py-3 px-3"><Badge variant="outline" className="text-xs">{item.version}</Badge></td>
                    <td className="py-3 px-3 text-sm text-[#1f2937]">{item.uploadedBy}</td>
                    <td className="py-3 px-3 text-xs text-muted-foreground">{item.date}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Download className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Eye className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-[#D83731]"><Trash2 className="h-3.5 w-3.5" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}