import { useState, useMemo, useEffect } from "react";
import { Plus, CheckCircle2, X, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogPortal,
  DialogOverlay,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import * as DialogPrimitive from "@radix-ui/react-dialog";

interface CreateReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editMode?: boolean;
  reportId?: number;
}

interface Phase {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  duration: string;
  progress: number;
  weight: number;
}

interface Task {
  id: number;
  phaseId: number;
  phaseName: string;
  name: string;
  masterProgress: number;
  reportProgress: number;
  assignedTo: string;
  status: string;
  included: boolean;
  subtasks?: Task[];
}

interface NextStepRow {
  id: number;
  phase: string;
  taskName: string;
  owner: string;
  targetDate: string;
  progress: number;
  included: boolean;
  isAutoPopulated: boolean;
}

interface RiskRow {
  id: number;
  description: string;
  priority: string;
  mitigation: string;
  included: boolean;
  isAutoPopulated: boolean;
}

interface IssueRow {
  id: number;
  description: string;
  priority: string;
  owner: string;
  remarks: string;
  included: boolean;
  isAutoPopulated: boolean;
}

interface UATRow {
  id: number;
  workstream: string;
  activities: string;
  owner: string;
  details: string;
  included?: boolean;
  isAutoPopulated?: boolean;
}

// Mock data for available phases in the project
const availablePhases: Phase[] = [
  { id: 1, name: "Phase 1: Planning", startDate: "2025-07-01", endDate: "2025-09-30", duration: "3 months", progress: 100, weight: 1.0 },
  { id: 2, name: "Phase 2: Design", startDate: "2025-10-01", endDate: "2025-12-31", duration: "3 months", progress: 100, weight: 1.0 },
  { id: 3, name: "Phase 3: Development", startDate: "2026-01-15", endDate: "2026-04-30", duration: "3.5 months", progress: 45, weight: 1.5 },
  { id: 4, name: "Phase 4: Testing", startDate: "2026-05-01", endDate: "2026-06-15", duration: "1.5 months", progress: 0, weight: 1.0 },
  { id: 5, name: "Phase 5: Deployment", startDate: "2026-06-16", endDate: "2026-06-30", duration: "0.5 months", progress: 0, weight: 0.5 },
];

// Mock tasks for each phase
const mockProjectTasks: Task[] = [
  // Phase 1 tasks
  { 
    id: 101, 
    phaseId: 1, 
    phaseName: "Phase 1: Planning", 
    name: "Project Charter Development", 
    masterProgress: 100, 
    reportProgress: 100, 
    assignedTo: "PMO", 
    status: "Completed", 
    included: true,
    subtasks: [
      { id: 1011, phaseId: 1, phaseName: "Phase 1: Planning", name: "Define project scope", masterProgress: 100, reportProgress: 100, assignedTo: "PMO Lead", status: "Completed", included: true },
      { id: 1012, phaseId: 1, phaseName: "Phase 1: Planning", name: "Draft charter document", masterProgress: 100, reportProgress: 100, assignedTo: "PMO", status: "Completed", included: true },
      { id: 1013, phaseId: 1, phaseName: "Phase 1: Planning", name: "Get stakeholder approval", masterProgress: 100, reportProgress: 100, assignedTo: "Project Manager", status: "Completed", included: true },
    ]
  },
  { id: 102, phaseId: 1, phaseName: "Phase 1: Planning", name: "Stakeholder Analysis", masterProgress: 100, reportProgress: 100, assignedTo: "Business Analyst", status: "Completed", included: true },
  { id: 103, phaseId: 1, phaseName: "Phase 1: Planning", name: "Requirements Gathering", masterProgress: 100, reportProgress: 100, assignedTo: "Business Team", status: "Completed", included: true },
  { id: 104, phaseId: 1, phaseName: "Phase 1: Planning", name: "Resource Planning", masterProgress: 100, reportProgress: 100, assignedTo: "PMO", status: "Completed", included: true },
  // Phase 2 tasks
  { id: 6, phaseId: 2, phaseName: "Phase 2: Design", name: "UI/UX Design", masterProgress: 100, reportProgress: 100, assignedTo: "Design Team", status: "Completed", included: true },
  { id: 7, phaseId: 2, phaseName: "Phase 2: Design", name: "System Architecture", masterProgress: 100, reportProgress: 100, assignedTo: "Architects", status: "Completed", included: true },
  // Phase 3 tasks
  { 
    id: 1, 
    phaseId: 3, 
    phaseName: "Phase 3: Development", 
    name: "Backend API Development", 
    masterProgress: 100, 
    reportProgress: 100, 
    assignedTo: "Dev Team", 
    status: "Completed", 
    included: true,
    subtasks: [
      { id: 11, phaseId: 3, phaseName: "Phase 3: Development", name: "User authentication API", masterProgress: 100, reportProgress: 100, assignedTo: "Backend Dev 1", status: "Completed", included: true },
      { id: 12, phaseId: 3, phaseName: "Phase 3: Development", name: "Data management API", masterProgress: 100, reportProgress: 100, assignedTo: "Backend Dev 2", status: "Completed", included: true },
    ]
  },
  { id: 2, phaseId: 3, phaseName: "Phase 3: Development", name: "Payment Gateway Integration", masterProgress: 100, reportProgress: 100, assignedTo: "Dev Team", status: "Completed", included: true },
  { 
    id: 3, 
    phaseId: 3, 
    phaseName: "Phase 3: Development", 
    name: "Frontend Integration", 
    masterProgress: 35, 
    reportProgress: 35, 
    assignedTo: "Dev Team", 
    status: "In Progress", 
    included: true,
    subtasks: [
      { id: 31, phaseId: 3, phaseName: "Phase 3: Development", name: "Dashboard components", masterProgress: 60, reportProgress: 60, assignedTo: "Frontend Dev 1", status: "In Progress", included: true },
      { id: 32, phaseId: 3, phaseName: "Phase 3: Development", name: "Forms and validation", masterProgress: 40, reportProgress: 40, assignedTo: "Frontend Dev 2", status: "In Progress", included: true },
      { id: 33, phaseId: 3, phaseName: "Phase 3: Development", name: "Routing setup", masterProgress: 10, reportProgress: 10, assignedTo: "Frontend Dev 1", status: "In Progress", included: true },
    ]
  },
  { 
    id: 4, 
    phaseId: 3, 
    phaseName: "Phase 3: Development", 
    name: "Database Optimization", 
    masterProgress: 70, 
    reportProgress: 70, 
    assignedTo: "IT Department", 
    status: "In Progress", 
    included: true,
    subtasks: [
      { id: 41, phaseId: 3, phaseName: "Phase 3: Development", name: "Query optimization", masterProgress: 100, reportProgress: 100, assignedTo: "DBA", status: "Completed", included: true },
      { id: 42, phaseId: 3, phaseName: "Phase 3: Development", name: "Index creation", masterProgress: 80, reportProgress: 80, assignedTo: "DBA", status: "In Progress", included: true },
      { id: 43, phaseId: 3, phaseName: "Phase 3: Development", name: "Performance testing", masterProgress: 30, reportProgress: 30, assignedTo: "QA", status: "In Progress", included: true },
    ]
  },
  { id: 5, phaseId: 3, phaseName: "Phase 3: Development", name: "Security Audit", masterProgress: 100, reportProgress: 100, assignedTo: "Security Team", status: "Completed", included: true },
  // Phase 4 tasks (future phase)
  { id: 8, phaseId: 4, phaseName: "Phase 4: Testing", name: "UAT Planning", masterProgress: 10, reportProgress: 10, assignedTo: "QA Team", status: "In Progress", included: true },
];

// Mock auto-populated risks
const mockProjectRisks: RiskRow[] = [
  { id: 1, description: "Third-party API dependency delay", priority: "High", mitigation: "Identified backup provider, parallel testing underway", included: true, isAutoPopulated: true },
  { id: 2, description: "Resource allocation conflicts", priority: "Medium", mitigation: "Cross-training team members on critical modules", included: true, isAutoPopulated: true },
];

// Mock auto-populated issues
const mockProjectIssues: IssueRow[] = [
  { id: 1, description: "Database performance on large datasets", priority: "Medium", owner: "IT Department", remarks: "Optimization in progress, 40% improvement achieved", included: true, isAutoPopulated: true },
  { id: 2, description: "API rate limiting concerns", priority: "Low", owner: "Dev Team", remarks: "Implementing caching layer", included: true, isAutoPopulated: true },
];

// Mock auto-populated UAT/New Requests
const mockUATRequests: UATRow[] = [
  { id: 1, workstream: "Payment Gateway", activities: "UAT Testing - Payment flows", owner: "QA Team", details: "Testing all payment scenarios including edge cases", included: true, isAutoPopulated: true },
  { id: 2, workstream: "User Interface", activities: "New Request - Dashboard enhancements", owner: "Design Team", details: "Add real-time analytics widgets as requested by stakeholders", included: true, isAutoPopulated: true },
  { id: 3, workstream: "Security", activities: "UAT Testing - Authentication", owner: "Security Team", details: "Multi-factor authentication testing in progress", included: true, isAutoPopulated: true },
];

// Mock auto-populated Next Steps
const mockNextSteps: NextStepRow[] = [
  { id: 1, phase: "Phase 3: Development", taskName: "Complete Frontend Integration", owner: "Dev Team", targetDate: "2026-03-15", progress: 35, included: true, isAutoPopulated: true },
  { id: 2, phase: "Phase 3: Development", taskName: "Finalize Database Optimization", owner: "IT Department", targetDate: "2026-03-20", progress: 70, included: true, isAutoPopulated: true },
  { id: 3, phase: "Phase 4: Testing", taskName: "Begin UAT Planning", owner: "QA Team", targetDate: "2026-05-01", progress: 10, included: true, isAutoPopulated: true },
];

export function CreateReportDialog({ open, onOpenChange, editMode = false, reportId }: CreateReportDialogProps) {
  // Selected phases state
  const [selectedPhaseIds, setSelectedPhaseIds] = useState<number[]>([]);
  const [showPhaseDropdown, setShowPhaseDropdown] = useState(false);
  
  // Tasks state
  const [tasks, setTasks] = useState<Task[]>([]);
  
  // Expanded tasks state (for subtasks)
  const [expandedTaskIds, setExpandedTaskIds] = useState<number[]>([]);
  
  // UAT state
  const [uatRows, setUatRows] = useState<UATRow[]>([]);
  
  // Next Steps state
  const [nextSteps, setNextSteps] = useState<NextStepRow[]>([]);
  
  // Risks state
  const [risks, setRisks] = useState<RiskRow[]>([]);
  
  // Issues state
  const [issues, setIssues] = useState<IssueRow[]>([]);

  // Report period
  const [reportPeriodStart] = useState("");
  const [reportPeriodEnd] = useState("");

  // Executive Summary Text state
  const [executiveSummary, setExecutiveSummary] = useState("");

  // Auto-populate tasks, risks, issues, and next steps when phases are selected
  useEffect(() => {
    if (selectedPhaseIds.length > 0) {
      // Populate tasks from selected phases
      const phaseTasks = mockProjectTasks.filter(t => selectedPhaseIds.includes(t.phaseId));
      setTasks(phaseTasks);

      // Populate risks
      setRisks(mockProjectRisks);

      // Populate issues
      setIssues(mockProjectIssues);

      // Populate next steps with mock data
      setNextSteps(mockNextSteps);

      // Populate UAT rows with mock data
      setUatRows(mockUATRequests);
    } else {
      // Clear all data when no phases are selected
      setTasks([]);
      setRisks([]);
      setIssues([]);
      setNextSteps([]);
      setUatRows([]);
    }
  }, [selectedPhaseIds]); // Only depend on selectedPhaseIds

  // Toggle phase selection
  const togglePhase = (phaseId: number) => {
    if (selectedPhaseIds.includes(phaseId)) {
      setSelectedPhaseIds(selectedPhaseIds.filter(id => id !== phaseId));
    } else {
      setSelectedPhaseIds([...selectedPhaseIds, phaseId]);
    }
  };

  // Remove phase chip
  const removePhase = (phaseId: number) => {
    setSelectedPhaseIds(selectedPhaseIds.filter(id => id !== phaseId));
  };

  // Get selected phases data
  const selectedPhases = useMemo(() => {
    return availablePhases.filter(p => selectedPhaseIds.includes(p.id));
  }, [selectedPhaseIds]);

  // Calculate aggregated data
  const aggregatedData = useMemo(() => {
    if (selectedPhases.length === 0) {
      return {
        totalPhases: 0,
        earliestStart: "",
        latestEnd: "",
        combinedDuration: "",
        aggregatedProgress: 0,
      };
    }

    const totalPhases = selectedPhases.length;
    const earliestStart = selectedPhases.reduce((earliest, phase) => 
      !earliest || phase.startDate < earliest ? phase.startDate : earliest, ""
    );
    const latestEnd = selectedPhases.reduce((latest, phase) => 
      !latest || phase.endDate > latest ? phase.endDate : latest, ""
    );
    
    // Calculate weighted average progress
    const totalWeight = selectedPhases.reduce((sum, phase) => sum + phase.weight, 0);
    const weightedProgress = selectedPhases.reduce((sum, phase) => 
      sum + (phase.progress * phase.weight), 0
    );
    const aggregatedProgress = totalWeight > 0 ? Math.round(weightedProgress / totalWeight) : 0;

    // Calculate combined duration in months
    const start = new Date(earliestStart);
    const end = new Date(latestEnd);
    const diffMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const combinedDuration = `${diffMonths} months`;

    return {
      totalPhases,
      earliestStart,
      latestEnd,
      combinedDuration,
      aggregatedProgress,
    };
  }, [selectedPhases]);

  // Calculate executive summary auto info
  const executiveSummaryInfo = useMemo(() => {
    const filteredTasks = tasks.filter(t => selectedPhaseIds.includes(t.phaseId) && t.included);
    
    const totalTasks = filteredTasks.length;
    const completedTasks = filteredTasks.filter(t => t.status === "Completed").length;
    const inProgressTasks = filteredTasks.filter(t => t.status === "In Progress").length;
    const delayedTasks = filteredTasks.filter(t => t.status === "Delayed").length;
    const newRisks = risks.filter(r => r.included && r.isAutoPopulated).length;
    const openIssues = issues.filter(i => i.included && i.isAutoPopulated).length;

    return {
      totalTasks,
      completedTasks,
      inProgressTasks,
      delayedTasks,
      newRisks,
      openIssues,
    };
  }, [tasks, selectedPhaseIds, risks, issues]);

  // Filter tasks by selected phases
  const filteredTasks = useMemo(() => {
    return tasks.filter(t => selectedPhaseIds.includes(t.phaseId));
  }, [tasks, selectedPhaseIds]);

  // Group tasks by phase
  const tasksByPhase = useMemo(() => {
    const grouped: { [key: string]: Task[] } = {};
    filteredTasks.forEach(task => {
      if (!grouped[task.phaseName]) {
        grouped[task.phaseName] = [];
      }
      grouped[task.phaseName].push(task);
    });
    return grouped;
  }, [filteredTasks]);

  // Update task field
  const updateTask = (taskId: number, field: keyof Task, value: any) => {
    setTasks(tasks.map(t => {
      if (t.id === taskId) {
        return { ...t, [field]: value };
      }
      // Also check subtasks
      if (t.subtasks) {
        const updatedSubtasks = t.subtasks.map(st => 
          st.id === taskId ? { ...st, [field]: value } : st
        );
        return { ...t, subtasks: updatedSubtasks };
      }
      return t;
    }));
  };

  // Toggle task expansion
  const toggleTaskExpansion = (taskId: number) => {
    if (expandedTaskIds.includes(taskId)) {
      setExpandedTaskIds(expandedTaskIds.filter(id => id !== taskId));
    } else {
      setExpandedTaskIds([...expandedTaskIds, taskId]);
    }
  };

  // Delete task (including from subtasks)
  const deleteTask = (taskId: number) => {
    setTasks(tasks.map(t => {
      // If deleting a subtask
      if (t.subtasks) {
        const filteredSubtasks = t.subtasks.filter(st => st.id !== taskId);
        if (filteredSubtasks.length !== t.subtasks.length) {
          return { ...t, subtasks: filteredSubtasks };
        }
      }
      return t;
    }).filter(t => t.id !== taskId)); // Also filter main tasks
  };

  // Add UAT row
  const addUATRow = () => {
    setUatRows([...uatRows, { id: Date.now(), workstream: "", activities: "", owner: "", details: "" }]);
  };

  const removeUATRow = (id: number) => {
    if (uatRows.length > 1) {
      setUatRows(uatRows.filter(row => row.id !== id));
    }
  };

  // Add next step
  const addNextStep = () => {
    setNextSteps([...nextSteps, { 
      id: Date.now(), 
      phase: "", 
      taskName: "", 
      owner: "", 
      targetDate: "", 
      progress: 0, 
      included: true, 
      isAutoPopulated: false 
    }]);
  };

  const removeNextStep = (id: number) => {
    setNextSteps(nextSteps.filter(row => row.id !== id));
  };

  const updateNextStep = (id: number, field: keyof NextStepRow, value: any) => {
    setNextSteps(nextSteps.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  // Add risk
  const addRisk = () => {
    setRisks([...risks, { 
      id: Date.now(), 
      description: "", 
      priority: "Priority: High", 
      mitigation: "", 
      included: true, 
      isAutoPopulated: false 
    }]);
  };

  const removeRisk = (id: number) => {
    setRisks(risks.filter(row => row.id !== id));
  };

  const updateRisk = (id: number, field: keyof RiskRow, value: any) => {
    setRisks(risks.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  // Add issue
  const addIssue = () => {
    setIssues([...issues, { 
      id: Date.now(), 
      description: "", 
      priority: "Priority: Critical", 
      owner: "",
      remarks: "", 
      included: true, 
      isAutoPopulated: false 
    }]);
  };

  const removeIssue = (id: number) => {
    setIssues(issues.filter(row => row.id !== id));
  };

  const updateIssue = (id: number, field: keyof IssueRow, value: any) => {
    setIssues(issues.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  // Generate AI Summary from report data
  const generateAISummary = () => {
    if (selectedPhaseIds.length === 0) {
      setExecutiveSummary("Please select at least one phase to generate an AI summary.");
      return;
    }

    const filteredTasks = tasks.filter(t => selectedPhaseIds.includes(t.phaseId) && t.included);
    const completedTasks = filteredTasks.filter(t => t.status === "Completed").length;
    const inProgressTasks = filteredTasks.filter(t => t.status === "In Progress").length;
    const includedRisks = risks.filter(r => r.included);
    const includedIssues = issues.filter(i => i.included);
    const highPriorityRisks = includedRisks.filter(r => r.priority === "Priority: High").length;
    const criticalIssues = includedIssues.filter(i => i.priority === "Priority: Critical").length;

    const phaseNames = selectedPhases.map(p => p.name).join(", ");
    
    let summary = `During the reporting period from ${reportPeriodStart || "[Start Date]"} to ${reportPeriodEnd || "[End Date]"}, `;
    summary += `the project made significant progress across ${selectedPhases.length} phase(s): ${phaseNames}. `;
    summary += `The overall aggregated progress stands at ${aggregatedData.aggregatedProgress}%. `;
    
    if (filteredTasks.length > 0) {
      summary += `Out of ${filteredTasks.length} total tasks, ${completedTasks} have been completed and ${inProgressTasks} are currently in progress. `;
    }
    
    if (includedRisks.length > 0) {
      summary += `The project is currently managing ${includedRisks.length} risk(s)`;
      if (highPriorityRisks > 0) {
        summary += `, including ${highPriorityRisks} high-priority risk(s)`;
      }
      summary += `. `;
    }
    
    if (includedIssues.length > 0) {
      summary += `There are ${includedIssues.length} active issue(s) being addressed`;
      if (criticalIssues > 0) {
        summary += `, with ${criticalIssues} marked as critical`;
      }
      summary += `. `;
    }
    
    summary += `The project timeline spans from ${aggregatedData.earliestStart || "[Start]"} to ${aggregatedData.latestEnd || "[End]"} with a combined duration of ${aggregatedData.combinedDuration}. `;
    summary += `The team remains committed to delivering key milestones and addressing challenges proactively to ensure project success.`;
    
    setExecutiveSummary(summary);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        {/* Custom Overlay with blur */}
        <DialogOverlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        
        {/* Slide-in Panel */}
        <DialogPrimitive.Content
          className="fixed right-0 top-0 z-50 h-screen w-[60%] border-l bg-white shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right duration-300 flex flex-col"
        >
          <DialogHeader className="px-6 py-4 border-b bg-white">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-xl font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                  {editMode ? "Edit Bi-Weekly Report" : "Create New Bi-Weekly Report"}
                </DialogTitle>
                <DialogDescription className="text-sm">
                  {editMode ? "Update the bi-weekly status report information" : "Complete all sections to create a comprehensive bi-weekly status report"}
                </DialogDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="h-8 w-8 p-0 hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {/* Report Period & Date */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">Report Period (Start Date)</label>
                <Input type="date" className="w-full" defaultValue={reportPeriodStart} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">Report Period (End Date)</label>
                <Input type="date" className="w-full" defaultValue={reportPeriodEnd} />
              </div>
            </div>

            {/* Executive Summary Section */}
            <div className="border rounded-lg p-4 bg-muted/30">
              <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-3">Executive Summary</h3>
              
              {/* Project Information */}
              <div className="mb-4">
                <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-2">Project Information</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1 col-span-2">
                    <label className="text-xs text-muted-foreground">Project Name</label>
                    <Input className="text-sm" placeholder="Enter project name" defaultValue="Smart Clearance Initiative" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Start Date</label>
                    <Input type="date" className="text-sm" defaultValue="2025-07-01" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">End Date</label>
                    <Input type="date" className="text-sm" defaultValue="2026-06-30" />
                  </div>
                  <div className="space-y-1 col-span-2">
                    <label className="text-xs text-muted-foreground">Supporting Departments</label>
                    <Input className="text-sm" placeholder="IT Department, Finance, Operations" defaultValue="IT Department, Finance, Operations Team" />
                  </div>
                </div>
              </div>

              {/* Multi-Phase Selection */}
              <div className="mb-4">
                <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-2">Phase Selection</p>
                
                {/* Multi-select Dropdown */}
                <div className="relative mb-3">
                  <button
                    type="button"
                    onClick={() => setShowPhaseDropdown(!showPhaseDropdown)}
                    className="w-full px-3 py-2 border rounded text-sm text-left flex items-center justify-between bg-white hover:bg-muted/50"
                  >
                    <span className="text-muted-foreground">
                      {selectedPhaseIds.length === 0 ? "Select Phase(s)" : `${selectedPhaseIds.length} phase(s) selected`}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  
                  {showPhaseDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg max-h-48 overflow-y-auto">
                      {availablePhases.map(phase => (
                        <div
                          key={phase.id}
                          className="px-3 py-2 hover:bg-muted cursor-pointer flex items-center gap-2"
                          onClick={() => togglePhase(phase.id)}
                        >
                          <input
                            type="checkbox"
                            checked={selectedPhaseIds.includes(phase.id)}
                            onChange={() => {}}
                            className="h-4 w-4"
                          />
                          <span className="text-sm">{phase.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Selected Phase Chips */}
                {selectedPhaseIds.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedPhases.map(phase => (
                      <Badge key={phase.id} variant="secondary" className="flex items-center gap-1">
                        {phase.name}
                        <X 
                          className="h-3 w-3 cursor-pointer hover:text-destructive" 
                          onClick={() => removePhase(phase.id)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Auto-calculated Aggregated Data */}
                {selectedPhaseIds.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 p-3 bg-blue-50 border border-blue-200 rounded">
                    <div className="space-y-1">
                      <label className="text-xs text-blue-900 font-['Dubai:Medium',_'Dubai']">Total Selected Phases</label>
                      <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{aggregatedData.totalPhases}</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-blue-900 font-['Dubai:Medium',_'Dubai']">Aggregated Progress</label>
                      <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{aggregatedData.aggregatedProgress}%</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-blue-900 font-['Dubai:Medium',_'Dubai']">Earliest Start Date</label>
                      <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{aggregatedData.earliestStart || "N/A"}</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-blue-900 font-['Dubai:Medium',_'Dubai']">Latest End Date</label>
                      <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{aggregatedData.latestEnd || "N/A"}</p>
                    </div>
                    <div className="space-y-1 col-span-2">
                      <label className="text-xs text-blue-900 font-['Dubai:Medium',_'Dubai']">Combined Duration</label>
                      <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{aggregatedData.combinedDuration}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Executive Summary Text */}
              <div>
                <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">Executive Summary Text</p>
                <textarea
                  className="w-full h-20 p-2 border rounded text-sm"
                  placeholder="Enter executive summary text here"
                  value={executiveSummary}
                  onChange={(e) => setExecutiveSummary(e.target.value)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs mt-2"
                  onClick={generateAISummary}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Generate AI Summary
                </Button>
              </div>
            </div>

            {/* Task Auto-Population Section */}
            {selectedPhaseIds.length > 0 && (
              <div className="border rounded-lg p-4 bg-muted/30">
                <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-3">Tasks by Phase (Editable)</h3>
                <p className="text-xs text-muted-foreground mb-3">Auto-populated tasks from selected phases. Edit values to create report snapshot.</p>
                
                {Object.entries(tasksByPhase).map(([phaseName, phaseTasks]) => (
                  <div key={phaseName} className="mb-4">
                    <h4 className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#008755] mb-2">{phaseName}</h4>
                    
                    {/* Column Headers */}
                    <div className="grid grid-cols-12 gap-2 items-center px-2 py-1 bg-muted/50 rounded-t border">
                      <div className="col-span-1 text-center">
                        <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Include</p>
                      </div>
                      <div className="col-span-4">
                        <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Task Name</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">% Completion</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Assigned To</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Status</p>
                      </div>
                      <div className="col-span-1 text-center">
                        <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Action</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mt-2">
                      {phaseTasks.map(task => (
                        <div key={task.id}>
                          {/* Main Task Row */}
                          <div className="grid grid-cols-12 gap-2 items-center p-2 border rounded bg-white">
                            <div className="col-span-1 flex items-center justify-center">
                              <input
                                type="checkbox"
                                checked={task.included}
                                onChange={(e) => updateTask(task.id, 'included', e.target.checked)}
                                className="h-4 w-4"
                              />
                            </div>
                            <div className="col-span-4 flex items-center gap-2">
                              {/* Expand/Collapse Icon */}
                              {task.subtasks && task.subtasks.length > 0 && (
                                <button
                                  onClick={() => toggleTaskExpansion(task.id)}
                                  className="h-5 w-5 flex items-center justify-center hover:bg-muted rounded"
                                >
                                  {expandedTaskIds.includes(task.id) ? (
                                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                  ) : (
                                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                  )}
                                </button>
                              )}
                              <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{task.name}</p>
                              {task.subtasks && task.subtasks.length > 0 && (
                                <Badge variant="secondary" className="text-xs px-1 py-0">{task.subtasks.length}</Badge>
                              )}
                            </div>
                            <div className="col-span-2">
                              <Input
                                type="number"
                                min="0"
                                max="100"
                                value={task.reportProgress}
                                onChange={(e) => updateTask(task.id, 'reportProgress', Number(e.target.value))}
                                className="text-xs h-8"
                                placeholder="%"
                              />
                            </div>
                            <div className="col-span-2">
                              <Input
                                value={task.assignedTo}
                                onChange={(e) => updateTask(task.id, 'assignedTo', e.target.value)}
                                className="text-xs h-8"
                                placeholder="Owner"
                              />
                            </div>
                            <div className="col-span-2">
                              <select
                                value={task.status}
                                onChange={(e) => updateTask(task.id, 'status', e.target.value)}
                                className="w-full px-2 py-1 border rounded text-xs h-8"
                              >
                                <option>In Progress</option>
                                <option>Completed</option>
                                <option>Delayed</option>
                                <option>On Hold</option>
                              </select>
                            </div>
                            <div className="col-span-1 flex justify-center">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                                onClick={() => deleteTask(task.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          {/* Subtasks Rows - shown when expanded */}
                          {task.subtasks && task.subtasks.length > 0 && expandedTaskIds.includes(task.id) && (
                            <div className="ml-8 mt-2 space-y-2">
                              {task.subtasks.map(subtask => (
                                <div key={subtask.id} className="grid grid-cols-12 gap-2 items-center p-2 border rounded bg-blue-50/30 border-blue-200">
                                  <div className="col-span-1 flex items-center justify-center">
                                    <input
                                      type="checkbox"
                                      checked={subtask.included}
                                      onChange={(e) => updateTask(subtask.id, 'included', e.target.checked)}
                                      className="h-4 w-4"
                                    />
                                  </div>
                                  <div className="col-span-4 flex items-center gap-2">
                                    <div className="h-px w-4 bg-muted-foreground/30"></div>
                                    <p className="text-sm text-[#1f2937]">{subtask.name}</p>
                                  </div>
                                  <div className="col-span-2">
                                    <Input
                                      type="number"
                                      min="0"
                                      max="100"
                                      value={subtask.reportProgress}
                                      onChange={(e) => updateTask(subtask.id, 'reportProgress', Number(e.target.value))}
                                      className="text-xs h-8"
                                      placeholder="%"
                                    />
                                  </div>
                                  <div className="col-span-2">
                                    <Input
                                      value={subtask.assignedTo}
                                      onChange={(e) => updateTask(subtask.id, 'assignedTo', e.target.value)}
                                      className="text-xs h-8"
                                      placeholder="Owner"
                                    />
                                  </div>
                                  <div className="col-span-2">
                                    <select
                                      value={subtask.status}
                                      onChange={(e) => updateTask(subtask.id, 'status', e.target.value)}
                                      className="w-full px-2 py-1 border rounded text-xs h-8"
                                    >
                                      <option>In Progress</option>
                                      <option>Completed</option>
                                      <option>Delayed</option>
                                      <option>On Hold</option>
                                    </select>
                                  </div>
                                  <div className="col-span-1 flex justify-center">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                                      onClick={() => deleteTask(subtask.id)}
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                
                <p className="text-xs text-muted-foreground italic mt-2">
                  Note: Changes made here are report snapshots only and do not modify master task data.
                </p>
              </div>
            )}

            {/* UAT / New Requests Table */}
            <div className="border rounded-lg p-4 bg-muted/30">
              <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-3">UAT / New Requests (Auto-Populated)</h3>
              <p className="text-xs text-muted-foreground mb-3">Auto-populated from selected phases. All fields are editable.</p>
              
              {/* Column Headers */}
              <div className="grid grid-cols-13 gap-2 items-center px-2 py-1 bg-muted/50 rounded-t border mb-2">
                <div className="col-span-1 text-center">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Include</p>
                </div>
                <div className="col-span-3">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Workstream</p>
                </div>
                <div className="col-span-3">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Activities</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Owner</p>
                </div>
                <div className="col-span-3">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Details</p>
                </div>
                <div className="col-span-1 text-center">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Action</p>
                </div>
              </div>
              
              <div className="space-y-2">
                {uatRows.filter(r => r.included !== false).map(row => (
                  <div key={row.id} className="grid grid-cols-13 gap-2 items-center p-2 border rounded bg-white">
                    <div className="col-span-1 flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={row.included !== false}
                        onChange={(e) => {
                          const updatedRows = uatRows.map(r => r.id === row.id ? { ...r, included: e.target.checked } : r);
                          setUatRows(updatedRows);
                        }}
                        className="h-4 w-4"
                      />
                    </div>
                    <div className="col-span-3">
                      <Input placeholder="Workstream" className="text-xs h-8" value={row.workstream} onChange={(e) => {
                        const updatedRows = uatRows.map(r => r.id === row.id ? { ...r, workstream: e.target.value } : r);
                        setUatRows(updatedRows);
                      }} />
                    </div>
                    <div className="col-span-3">
                      <Input placeholder="Activities" className="text-xs h-8" value={row.activities} onChange={(e) => {
                        const updatedRows = uatRows.map(r => r.id === row.id ? { ...r, activities: e.target.value } : r);
                        setUatRows(updatedRows);
                      }} />
                    </div>
                    <div className="col-span-2">
                      <Input placeholder="Owner" className="text-xs h-8" value={row.owner} onChange={(e) => {
                        const updatedRows = uatRows.map(r => r.id === row.id ? { ...r, owner: e.target.value } : r);
                        setUatRows(updatedRows);
                      }} />
                    </div>
                    <div className="col-span-3">
                      <Input placeholder="Details" className="text-xs h-8" value={row.details} onChange={(e) => {
                        const updatedRows = uatRows.map(r => r.id === row.id ? { ...r, details: e.target.value } : r);
                        setUatRows(updatedRows);
                      }} />
                    </div>
                    <div className="col-span-1 flex justify-center">
                      {row.isAutoPopulated && (
                        <Badge variant="outline" className="text-xs px-1 py-0">Auto</Badge>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10 ml-1" 
                        onClick={() => removeUATRow(row.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full text-xs" onClick={addUATRow}>
                  <Plus className="h-3 w-3 mr-1" />
                  Add Manual UAT/Request Row
                </Button>
              </div>
            </div>

            {/* Next Steps - Auto-populated + Editable */}
            <div className="border rounded-lg p-4 bg-muted/30">
              <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-3">Next Steps (Auto-Populated)</h3>
              <p className="text-xs text-muted-foreground mb-3">Auto-populated from incomplete and upcoming tasks. All fields are editable.</p>
              
              {/* Column Headers */}
              <div className="grid grid-cols-12 gap-2 items-center px-2 py-1 bg-muted/50 rounded-t border mb-2">
                <div className="col-span-1 text-center">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Include</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Phase</p>
                </div>
                <div className="col-span-3">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Task Name</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Owner</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Target Date</p>
                </div>
                <div className="col-span-1 text-center">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">%</p>
                </div>
                <div className="col-span-1 text-center">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Action</p>
                </div>
              </div>
              
              <div className="space-y-2">
                {nextSteps.filter(s => s.included).map(step => (
                  <div key={step.id} className="grid grid-cols-12 gap-2 items-center p-2 border rounded bg-white">
                    <div className="col-span-1 flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={step.included}
                        onChange={(e) => updateNextStep(step.id, 'included', e.target.checked)}
                        className="h-4 w-4"
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        value={step.phase}
                        onChange={(e) => updateNextStep(step.id, 'phase', e.target.value)}
                        className="text-xs h-8"
                        placeholder="Phase"
                      />
                    </div>
                    <div className="col-span-3">
                      <Input
                        value={step.taskName}
                        onChange={(e) => updateNextStep(step.id, 'taskName', e.target.value)}
                        className="text-xs h-8"
                        placeholder="Task Name"
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        value={step.owner}
                        onChange={(e) => updateNextStep(step.id, 'owner', e.target.value)}
                        className="text-xs h-8"
                        placeholder="Owner"
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="date"
                        value={step.targetDate}
                        onChange={(e) => updateNextStep(step.id, 'targetDate', e.target.value)}
                        className="text-xs h-8"
                      />
                    </div>
                    <div className="col-span-1">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={step.progress}
                        onChange={(e) => updateNextStep(step.id, 'progress', Number(e.target.value))}
                        className="text-xs h-8"
                        placeholder="%"
                      />
                    </div>
                    <div className="col-span-1 flex justify-center">
                      {step.isAutoPopulated && (
                        <Badge variant="outline" className="text-xs px-1 py-0">Auto</Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10 ml-1"
                        onClick={() => removeNextStep(step.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full text-xs" onClick={addNextStep}>
                  <Plus className="h-3 w-3 mr-1" />
                  Add Manual Next Step
                </Button>
              </div>
              
            </div>

            {/* Project Risks - Auto-populated + Editable */}
            <div className="border rounded-lg p-4 bg-muted/30">
              <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-3">Project Risks Summary (Auto-Populated)</h3>
              <p className="text-xs text-muted-foreground mb-3">Auto-populated from selected phases. All fields are editable.</p>
              
              {/* Column Headers */}
              <div className="grid grid-cols-12 gap-2 items-center px-2 py-1 bg-muted/50 rounded-t border mb-2">
                <div className="col-span-1 text-center">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Include</p>
                </div>
                <div className="col-span-4">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Risk Description</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Priority</p>
                </div>
                <div className="col-span-4">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Mitigation Plan</p>
                </div>
                <div className="col-span-1 text-center">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Action</p>
                </div>
              </div>
              
              <div className="space-y-2">
                {risks.filter(r => r.included).map(risk => (
                  <div key={risk.id} className="grid grid-cols-12 gap-2 items-center p-2 border rounded bg-white">
                    <div className="col-span-1 flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={risk.included}
                        onChange={(e) => updateRisk(risk.id, 'included', e.target.checked)}
                        className="h-4 w-4"
                      />
                    </div>
                    <div className="col-span-4">
                      <Input
                        value={risk.description}
                        onChange={(e) => updateRisk(risk.id, 'description', e.target.value)}
                        className="text-xs h-8"
                        placeholder="Risk Description"
                      />
                    </div>
                    <div className="col-span-2">
                      <div className="w-full px-2 py-1 h-8 items-center text-sm">
                        {risk.priority}
                      </div>
                    </div>
                    <div className="col-span-4">
                      <Input
                        value={risk.mitigation}
                        onChange={(e) => updateRisk(risk.id, 'mitigation', e.target.value)}
                        className="text-xs h-8"
                        placeholder="Mitigation Plan"
                      />
                    </div>
                    <div className="col-span-1 flex justify-center">
                      {risk.isAutoPopulated && (
                        <Badge variant="outline" className="text-xs px-1 py-0">Auto</Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10 ml-1"
                        onClick={() => removeRisk(risk.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full text-xs" onClick={addRisk}>
                  <Plus className="h-3 w-3 mr-1" />
                  Add Manual Risk
                </Button>
              </div>
              
            </div>

            {/* Project Issues - Auto-populated + Editable */}
            <div className="border rounded-lg p-4 bg-muted/30">
              <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-3">Project Issues Summary (Auto-Populated)</h3>
              <p className="text-xs text-muted-foreground mb-3">Auto-populated from selected phases. All fields are editable.</p>
              
              {/* Column Headers */}
              <div className="grid grid-cols-12 gap-2 items-center px-2 py-1 bg-muted/50 rounded-t border mb-2">
                <div className="col-span-1 text-center">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Include</p>
                </div>
                <div className="col-span-3">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Issue Description</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Priority</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Owner</p>
                </div>
                <div className="col-span-3">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Remarks</p>
                </div>
                <div className="col-span-1 text-center">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Action</p>
                </div>
              </div>
              
              <div className="space-y-2">
                {issues.filter(i => i.included).map(issue => (
                  <div key={issue.id} className="grid grid-cols-12 gap-2 items-center p-2 border rounded bg-white">
                    <div className="col-span-1 flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={issue.included}
                        onChange={(e) => updateIssue(issue.id, 'included', e.target.checked)}
                        className="h-4 w-4"
                      />
                    </div>
                    <div className="col-span-3">
                      <Input
                        value={issue.description}
                        onChange={(e) => updateIssue(issue.id, 'description', e.target.value)}
                        className="text-xs h-8"
                        placeholder="Issue Description"
                      />
                    </div>
                    <div className="col-span-2">
                      <div className="w-full px-2 py-1  h-8  text-sm">
                        {issue.priority}
                      </div>
                    </div>
                    <div className="col-span-2">
                      <Input
                        value={issue.owner}
                        onChange={(e) => updateIssue(issue.id, 'owner', e.target.value)}
                        className="text-xs h-8"
                        placeholder="Owner"
                      />
                    </div>
                    <div className="col-span-3">
                      <Input
                        value={issue.remarks}
                        onChange={(e) => updateIssue(issue.id, 'remarks', e.target.value)}
                        className="text-xs h-8"
                        placeholder="Remarks"
                      />
                    </div>
                    <div className="col-span-1 flex justify-center">
                      {issue.isAutoPopulated && (
                        <Badge variant="outline" className="text-xs px-1 py-0">Auto</Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10 ml-1"
                        onClick={() => removeIssue(issue.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full text-xs" onClick={addIssue}>
                  <Plus className="h-3 w-3 mr-1" />
                  Add Manual Issue
                </Button>
              </div>
              
            </div>
          </div>

          {/* Dialog Footer */}
          <div className="px-6 py-4 border-t bg-white sticky bottom-0 flex items-center justify-end gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onOpenChange(false)}
              className="text-xs"
            >
              Cancel
            </Button>
            <Button 
              size="sm" 
              className="bg-[#008755] hover:bg-[#006644] text-white text-xs"
              onClick={() => {
                // Handle save logic here
                onOpenChange(false);
              }}
            >
              <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
              {editMode ? "Save Changes" : "Create Report"}
            </Button>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}