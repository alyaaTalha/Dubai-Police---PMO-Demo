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
import { useLanguage } from "../../i18n/LanguageContext";

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

// Arabic copy for the mock project data above (lookup by English value)
const MOCK_AR: Record<string, string> = {
  "Phase 1: Planning": "المرحلة 1: التخطيط",
  "Phase 2: Design": "المرحلة 2: التصميم",
  "Phase 3: Development": "المرحلة 3: التطوير",
  "Phase 4: Testing": "المرحلة 4: الاختبار",
  "Phase 5: Deployment": "المرحلة 5: النشر",
  "Project Charter Development": "إعداد ميثاق المشروع",
  "Define project scope": "تحديد نطاق المشروع",
  "Draft charter document": "صياغة وثيقة الميثاق",
  "Get stakeholder approval": "الحصول على موافقة أصحاب المصلحة",
  "Stakeholder Analysis": "تحليل أصحاب المصلحة",
  "Requirements Gathering": "جمع المتطلبات",
  "Resource Planning": "تخطيط الموارد",
  "UI/UX Design": "تصميم واجهة وتجربة المستخدم",
  "System Architecture": "بنية النظام",
  "Backend API Development": "تطوير واجهات API الخلفية",
  "User authentication API": "واجهة API لمصادقة المستخدم",
  "Data management API": "واجهة API لإدارة البيانات",
  "Payment Gateway Integration": "تكامل بوابة الدفع",
  "Frontend Integration": "تكامل الواجهة الأمامية",
  "Dashboard components": "مكونات لوحة المعلومات",
  "Forms and validation": "النماذج والتحقق",
  "Routing setup": "إعداد التوجيه",
  "Database Optimization": "تحسين قاعدة البيانات",
  "Query optimization": "تحسين الاستعلامات",
  "Index creation": "إنشاء الفهارس",
  "Performance testing": "اختبار الأداء",
  "Security Audit": "التدقيق الأمني",
  "UAT Planning": "تخطيط اختبار قبول المستخدم",
  "PMO": "مكتب إدارة المشاريع",
  "PMO Lead": "رئيس مكتب إدارة المشاريع",
  "Project Manager": "مدير المشروع",
  "Business Analyst": "محلل الأعمال",
  "Business Team": "فريق الأعمال",
  "Design Team": "فريق التصميم",
  "Architects": "المعماريون",
  "Dev Team": "فريق التطوير",
  "Backend Dev 1": "مطور الواجهة الخلفية 1",
  "Backend Dev 2": "مطور الواجهة الخلفية 2",
  "Frontend Dev 1": "مطور الواجهة الأمامية 1",
  "Frontend Dev 2": "مطور الواجهة الأمامية 2",
  "IT Department": "إدارة تقنية المعلومات",
  "DBA": "مسؤول قاعدة البيانات",
  "QA": "ضمان الجودة",
  "QA Team": "فريق ضمان الجودة",
  "Security Team": "فريق الأمن",
  "Third-party API dependency delay": "تأخر الاعتماد على واجهة API لطرف ثالث",
  "Identified backup provider, parallel testing underway": "تم تحديد مزود بديل، والاختبار المتوازي جارٍ",
  "Resource allocation conflicts": "تعارضات في تخصيص الموارد",
  "Cross-training team members on critical modules": "تدريب أعضاء الفريق على الوحدات الحرجة",
  "Database performance on large datasets": "أداء قاعدة البيانات مع مجموعات البيانات الكبيرة",
  "Optimization in progress, 40% improvement achieved": "التحسين جارٍ، وتم تحقيق تحسن بنسبة 40%",
  "API rate limiting concerns": "مخاوف تحديد معدل طلبات API",
  "Implementing caching layer": "تنفيذ طبقة التخزين المؤقت",
  "Payment Gateway": "بوابة الدفع",
  "UAT Testing - Payment flows": "اختبار قبول المستخدم - مسارات الدفع",
  "Testing all payment scenarios including edge cases": "اختبار جميع سيناريوهات الدفع بما فيها الحالات الاستثنائية",
  "User Interface": "واجهة المستخدم",
  "New Request - Dashboard enhancements": "طلب جديد - تحسينات لوحة المعلومات",
  "Add real-time analytics widgets as requested by stakeholders": "إضافة أدوات تحليلات فورية بناءً على طلب أصحاب المصلحة",
  "Security": "الأمن",
  "UAT Testing - Authentication": "اختبار قبول المستخدم - المصادقة",
  "Multi-factor authentication testing in progress": "اختبار المصادقة متعددة العوامل جارٍ",
  "Complete Frontend Integration": "إكمال تكامل الواجهة الأمامية",
  "Finalize Database Optimization": "إنهاء تحسين قاعدة البيانات",
  "Begin UAT Planning": "بدء تخطيط اختبار قبول المستخدم",
  "High": "عالية",
  "Medium": "متوسطة",
  "Low": "منخفضة",
  "Priority: High": "الأولوية: عالية",
  "Priority: Critical": "الأولوية: حرجة",
};

export function CreateReportDialog({ open, onOpenChange, editMode = false, reportId }: CreateReportDialogProps) {
  const { tr, isRTL } = useLanguage();
  const tm = (value: string) => (isRTL ? MOCK_AR[value] ?? value : value);

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
      const localizeTask = (t: Task): Task => ({
        ...t,
        name: tm(t.name),
        assignedTo: tm(t.assignedTo),
        subtasks: t.subtasks?.map(localizeTask),
      });
      const phaseTasks = mockProjectTasks.filter(t => selectedPhaseIds.includes(t.phaseId));
      setTasks(phaseTasks.map(localizeTask));

      // Populate risks
      setRisks(mockProjectRisks.map(r => ({ ...r, description: tm(r.description), mitigation: tm(r.mitigation) })));

      // Populate issues
      setIssues(mockProjectIssues.map(i => ({ ...i, description: tm(i.description), owner: tm(i.owner), remarks: tm(i.remarks) })));

      // Populate next steps with mock data
      setNextSteps(mockNextSteps.map(n => ({ ...n, phase: tm(n.phase), taskName: tm(n.taskName), owner: tm(n.owner) })));

      // Populate UAT rows with mock data
      setUatRows(mockUATRequests.map(u => ({
        ...u,
        workstream: tm(u.workstream),
        activities: tm(u.activities),
        owner: tm(u.owner),
        details: tm(u.details),
      })));
    } else {
      // Clear all data when no phases are selected
      setTasks([]);
      setRisks([]);
      setIssues([]);
      setNextSteps([]);
      setUatRows([]);
    }
  }, [selectedPhaseIds, isRTL]); // Re-seed when phases or language change

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
        combinedDuration: 0,
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
    const combinedDuration = diffMonths;

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
      setExecutiveSummary(tr("Please select at least one phase to generate an AI summary.", "يرجى اختيار مرحلة واحدة على الأقل لإنشاء ملخص بالذكاء الاصطناعي."));
      return;
    }

    const filteredTasks = tasks.filter(t => selectedPhaseIds.includes(t.phaseId) && t.included);
    const completedTasks = filteredTasks.filter(t => t.status === "Completed").length;
    const inProgressTasks = filteredTasks.filter(t => t.status === "In Progress").length;
    const includedRisks = risks.filter(r => r.included);
    const includedIssues = issues.filter(i => i.included);
    const highPriorityRisks = includedRisks.filter(r => r.priority === "Priority: High").length;
    const criticalIssues = includedIssues.filter(i => i.priority === "Priority: Critical").length;

    const phaseNames = selectedPhases.map(p => tm(p.name)).join(isRTL ? "، " : ", ");
    const duration = tr(`${aggregatedData.combinedDuration} months`, `${aggregatedData.combinedDuration} أشهر`);

    if (isRTL) {
      let ar = `خلال فترة التقرير من ${reportPeriodStart || "[تاريخ البدء]"} إلى ${reportPeriodEnd || "[تاريخ الانتهاء]"}، `;
      ar += `حقق المشروع تقدماً ملحوظاً عبر ${selectedPhases.length} مرحلة: ${phaseNames}. `;
      ar += `تبلغ نسبة التقدم الإجمالية المجمعة ${aggregatedData.aggregatedProgress}%. `;
      if (filteredTasks.length > 0) {
        ar += `من أصل ${filteredTasks.length} مهمة، تم إنجاز ${completedTasks} مهمة و${inProgressTasks} قيد التنفيذ حالياً. `;
      }
      if (includedRisks.length > 0) {
        ar += `يدير المشروع حالياً ${includedRisks.length} مخاطر`;
        if (highPriorityRisks > 0) ar += `، منها ${highPriorityRisks} عالية الأولوية`;
        ar += `. `;
      }
      if (includedIssues.length > 0) {
        ar += `هناك ${includedIssues.length} مشكلات نشطة قيد المعالجة`;
        if (criticalIssues > 0) ar += `، منها ${criticalIssues} مصنفة حرجة`;
        ar += `. `;
      }
      ar += `يمتد الجدول الزمني للمشروع من ${aggregatedData.earliestStart || "[البداية]"} إلى ${aggregatedData.latestEnd || "[النهاية]"} بمدة إجمالية ${duration}. `;
      ar += `يواصل الفريق التزامه بتحقيق المراحل الرئيسية ومعالجة التحديات بشكل استباقي لضمان نجاح المشروع.`;
      setExecutiveSummary(ar);
      return;
    }
    
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
    
    summary += `The project timeline spans from ${aggregatedData.earliestStart || "[Start]"} to ${aggregatedData.latestEnd || "[End]"} with a combined duration of ${duration}. `;
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
          className="fixed end-0 top-0 z-50 h-screen w-[60%] border-s bg-white shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right rtl:data-[state=closed]:slide-out-to-left rtl:data-[state=open]:slide-in-from-left duration-300 flex flex-col"
        >
          <DialogHeader className="px-6 py-4 border-b bg-white">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-xl font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                  {editMode ? tr("Edit Bi-Weekly Report", "تعديل التقرير نصف الشهري") : tr("Create New Bi-Weekly Report", "إنشاء تقرير نصف شهري جديد")}
                </DialogTitle>
                <DialogDescription className="text-sm">
                  {editMode ? tr("Update the bi-weekly status report information", "تحديث معلومات تقرير الحالة نصف الشهري") : tr("Complete all sections to create a comprehensive bi-weekly status report", "أكمل جميع الأقسام لإنشاء تقرير حالة نصف شهري شامل")}
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
                <label className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{tr("Report Period (Start Date)", "فترة التقرير (تاريخ البدء)")}</label>
                <Input type="date" className="w-full" defaultValue={reportPeriodStart} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{tr("Report Period (End Date)", "فترة التقرير (تاريخ الانتهاء)")}</label>
                <Input type="date" className="w-full" defaultValue={reportPeriodEnd} />
              </div>
            </div>

            {/* Executive Summary Section */}
            <div className="border rounded-lg p-4 bg-muted/30">
              <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-3">{tr("Executive Summary", "الملخص التنفيذي")}</h3>
              
              {/* Project Information */}
              <div className="mb-4">
                <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-2">{tr("Project Information", "معلومات المشروع")}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1 col-span-2">
                    <label className="text-xs text-muted-foreground">{tr("Project Name", "اسم المشروع")}</label>
                    <Input className="text-sm" placeholder={tr("Enter project name", "أدخل اسم المشروع")} defaultValue={tr("Smart Clearance Initiative", "مبادرة التخليص الذكي")} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">{tr("Start Date", "تاريخ البدء")}</label>
                    <Input type="date" className="text-sm" defaultValue="2025-07-01" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">{tr("End Date", "تاريخ الانتهاء")}</label>
                    <Input type="date" className="text-sm" defaultValue="2026-06-30" />
                  </div>
                  <div className="space-y-1 col-span-2">
                    <label className="text-xs text-muted-foreground">{tr("Supporting Departments", "الإدارات الداعمة")}</label>
                    <Input className="text-sm" placeholder={tr("IT Department, Finance, Operations", "إدارة تقنية المعلومات، المالية، العمليات")} defaultValue={tr("IT Department, Finance, Operations Team", "إدارة تقنية المعلومات، المالية، فريق العمليات")} />
                  </div>
                </div>
              </div>

              {/* Multi-Phase Selection */}
              <div className="mb-4">
                <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-2">{tr("Phase Selection", "اختيار المراحل")}</p>
                
                {/* Multi-select Dropdown */}
                <div className="relative mb-3">
                  <button
                    type="button"
                    onClick={() => setShowPhaseDropdown(!showPhaseDropdown)}
                    className="w-full px-3 py-2 border rounded text-sm text-start flex items-center justify-between bg-white hover:bg-muted/50"
                  >
                    <span className="text-muted-foreground">
                      {selectedPhaseIds.length === 0 ? tr("Select Phase(s)", "اختر المرحلة/المراحل") : tr(`${selectedPhaseIds.length} phase(s) selected`, `تم اختيار ${selectedPhaseIds.length} مرحلة`)}
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
                          <span className="text-sm">{tm(phase.name)}</span>
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
                        {tm(phase.name)}
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
                      <label className="text-xs text-blue-900 font-['Dubai:Medium',_'Dubai']">{tr("Total Selected Phases", "إجمالي المراحل المختارة")}</label>
                      <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{aggregatedData.totalPhases}</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-blue-900 font-['Dubai:Medium',_'Dubai']">{tr("Aggregated Progress", "التقدم المجمع")}</label>
                      <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{aggregatedData.aggregatedProgress}%</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-blue-900 font-['Dubai:Medium',_'Dubai']">{tr("Earliest Start Date", "أقرب تاريخ بدء")}</label>
                      <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{aggregatedData.earliestStart || tr("N/A", "غير متوفر")}</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-blue-900 font-['Dubai:Medium',_'Dubai']">{tr("Latest End Date", "آخر تاريخ انتهاء")}</label>
                      <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{aggregatedData.latestEnd || tr("N/A", "غير متوفر")}</p>
                    </div>
                    <div className="space-y-1 col-span-2">
                      <label className="text-xs text-blue-900 font-['Dubai:Medium',_'Dubai']">{tr("Combined Duration", "المدة الإجمالية")}</label>
                      <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{tr(`${aggregatedData.combinedDuration} months`, `${aggregatedData.combinedDuration} أشهر`)}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Executive Summary Text */}
              <div>
                <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{tr("Executive Summary Text", "نص الملخص التنفيذي")}</p>
                <textarea
                  className="w-full h-20 p-2 border rounded text-sm"
                  placeholder={tr("Enter executive summary text here", "أدخل نص الملخص التنفيذي هنا")}
                  value={executiveSummary}
                  onChange={(e) => setExecutiveSummary(e.target.value)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs mt-2"
                  onClick={generateAISummary}
                >
                  <Plus className="h-3 w-3 me-1" />
                  {tr("Generate AI Summary", "إنشاء ملخص بالذكاء الاصطناعي")}
                </Button>
              </div>
            </div>

            {/* Task Auto-Population Section */}
            {selectedPhaseIds.length > 0 && (
              <div className="border rounded-lg p-4 bg-muted/30">
                <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-3">{tr("Tasks by Phase (Editable)", "المهام حسب المرحلة (قابلة للتعديل)")}</h3>
                <p className="text-xs text-muted-foreground mb-3">{tr("Auto-populated tasks from selected phases. Edit values to create report snapshot.", "مهام معبأة تلقائياً من المراحل المختارة. عدّل القيم لإنشاء لقطة التقرير.")}</p>
                
                {Object.entries(tasksByPhase).map(([phaseName, phaseTasks]) => (
                  <div key={phaseName} className="mb-4">
                    <h4 className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#008755] mb-2">{tm(phaseName)}</h4>
                    
                    {/* Column Headers */}
                    <div className="grid grid-cols-12 gap-2 items-center px-2 py-1 bg-muted/50 rounded-t border">
                      <div className="col-span-1 text-center">
                        <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Include", "تضمين")}</p>
                      </div>
                      <div className="col-span-4">
                        <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Task Name", "اسم المهمة")}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("% Completion", "نسبة الإنجاز")}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Assigned To", "المسؤول")}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Status", "الحالة")}</p>
                      </div>
                      <div className="col-span-1 text-center">
                        <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Action", "إجراء")}</p>
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
                                    <ChevronRight className="h-4 w-4 text-muted-foreground rtl:rotate-180" />
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
                                placeholder={tr("Owner", "المسؤول")}
                              />
                            </div>
                            <div className="col-span-2">
                              <select
                                value={task.status}
                                onChange={(e) => updateTask(task.id, 'status', e.target.value)}
                                className="w-full px-2 py-1 border rounded text-xs h-8"
                              >
                                <option value="In Progress">{tr("In Progress", "قيد التنفيذ")}</option>
                                <option value="Completed">{tr("Completed", "مكتمل")}</option>
                                <option value="Delayed">{tr("Delayed", "متأخر")}</option>
                                <option value="On Hold">{tr("On Hold", "معلق")}</option>
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
                            <div className="ms-8 mt-2 space-y-2">
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
                                      placeholder={tr("Owner", "المسؤول")}
                                    />
                                  </div>
                                  <div className="col-span-2">
                                    <select
                                      value={subtask.status}
                                      onChange={(e) => updateTask(subtask.id, 'status', e.target.value)}
                                      className="w-full px-2 py-1 border rounded text-xs h-8"
                                    >
                                      <option value="In Progress">{tr("In Progress", "قيد التنفيذ")}</option>
                                      <option value="Completed">{tr("Completed", "مكتمل")}</option>
                                      <option value="Delayed">{tr("Delayed", "متأخر")}</option>
                                      <option value="On Hold">{tr("On Hold", "معلق")}</option>
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
                  {tr("Note: Changes made here are report snapshots only and do not modify master task data.", "ملاحظة: التغييرات هنا لقطات للتقرير فقط ولا تعدّل بيانات المهام الرئيسية.")}
                </p>
              </div>
            )}

            {/* UAT / New Requests Table */}
            <div className="border rounded-lg p-4 bg-muted/30">
              <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-3">{tr("UAT / New Requests (Auto-Populated)", "اختبار قبول المستخدم / الطلبات الجديدة (تعبئة تلقائية)")}</h3>
              <p className="text-xs text-muted-foreground mb-3">{tr("Auto-populated from selected phases. All fields are editable.", "معبأة تلقائياً من المراحل المختارة. جميع الحقول قابلة للتعديل.")}</p>
              
              {/* Column Headers */}
              <div className="grid grid-cols-13 gap-2 items-center px-2 py-1 bg-muted/50 rounded-t border mb-2">
                <div className="col-span-1 text-center">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Include", "تضمين")}</p>
                </div>
                <div className="col-span-3">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Workstream", "مسار العمل")}</p>
                </div>
                <div className="col-span-3">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Activities", "الأنشطة")}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Owner", "المسؤول")}</p>
                </div>
                <div className="col-span-3">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Details", "التفاصيل")}</p>
                </div>
                <div className="col-span-1 text-center">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Action", "إجراء")}</p>
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
                      <Input placeholder={tr("Workstream", "مسار العمل")} className="text-xs h-8" value={row.workstream} onChange={(e) => {
                        const updatedRows = uatRows.map(r => r.id === row.id ? { ...r, workstream: e.target.value } : r);
                        setUatRows(updatedRows);
                      }} />
                    </div>
                    <div className="col-span-3">
                      <Input placeholder={tr("Activities", "الأنشطة")} className="text-xs h-8" value={row.activities} onChange={(e) => {
                        const updatedRows = uatRows.map(r => r.id === row.id ? { ...r, activities: e.target.value } : r);
                        setUatRows(updatedRows);
                      }} />
                    </div>
                    <div className="col-span-2">
                      <Input placeholder={tr("Owner", "المسؤول")} className="text-xs h-8" value={row.owner} onChange={(e) => {
                        const updatedRows = uatRows.map(r => r.id === row.id ? { ...r, owner: e.target.value } : r);
                        setUatRows(updatedRows);
                      }} />
                    </div>
                    <div className="col-span-3">
                      <Input placeholder={tr("Details", "التفاصيل")} className="text-xs h-8" value={row.details} onChange={(e) => {
                        const updatedRows = uatRows.map(r => r.id === row.id ? { ...r, details: e.target.value } : r);
                        setUatRows(updatedRows);
                      }} />
                    </div>
                    <div className="col-span-1 flex justify-center">
                      {row.isAutoPopulated && (
                        <Badge variant="outline" className="text-xs px-1 py-0">{tr("Auto", "تلقائي")}</Badge>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10 ms-1" 
                        onClick={() => removeUATRow(row.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full text-xs" onClick={addUATRow}>
                  <Plus className="h-3 w-3 me-1" />
                  {tr("Add Manual UAT/Request Row", "إضافة صف اختبار/طلب يدوياً")}
                </Button>
              </div>
            </div>

            {/* Next Steps - Auto-populated + Editable */}
            <div className="border rounded-lg p-4 bg-muted/30">
              <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-3">{tr("Next Steps (Auto-Populated)", "الخطوات التالية (تعبئة تلقائية)")}</h3>
              <p className="text-xs text-muted-foreground mb-3">{tr("Auto-populated from incomplete and upcoming tasks. All fields are editable.", "معبأة تلقائياً من المهام غير المكتملة والقادمة. جميع الحقول قابلة للتعديل.")}</p>
              
              {/* Column Headers */}
              <div className="grid grid-cols-12 gap-2 items-center px-2 py-1 bg-muted/50 rounded-t border mb-2">
                <div className="col-span-1 text-center">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Include", "تضمين")}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Phase", "المرحلة")}</p>
                </div>
                <div className="col-span-3">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Task Name", "اسم المهمة")}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Owner", "المسؤول")}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Target Date", "التاريخ المستهدف")}</p>
                </div>
                <div className="col-span-1 text-center">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">%</p>
                </div>
                <div className="col-span-1 text-center">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Action", "إجراء")}</p>
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
                        placeholder={tr("Phase", "المرحلة")}
                      />
                    </div>
                    <div className="col-span-3">
                      <Input
                        value={step.taskName}
                        onChange={(e) => updateNextStep(step.id, 'taskName', e.target.value)}
                        className="text-xs h-8"
                        placeholder={tr("Task Name", "اسم المهمة")}
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        value={step.owner}
                        onChange={(e) => updateNextStep(step.id, 'owner', e.target.value)}
                        className="text-xs h-8"
                        placeholder={tr("Owner", "المسؤول")}
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
                        <Badge variant="outline" className="text-xs px-1 py-0">{tr("Auto", "تلقائي")}</Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10 ms-1"
                        onClick={() => removeNextStep(step.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full text-xs" onClick={addNextStep}>
                  <Plus className="h-3 w-3 me-1" />
                  {tr("Add Manual Next Step", "إضافة خطوة تالية يدوياً")}
                </Button>
              </div>
              
            </div>

            {/* Project Risks - Auto-populated + Editable */}
            <div className="border rounded-lg p-4 bg-muted/30">
              <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-3">{tr("Project Risks Summary (Auto-Populated)", "ملخص مخاطر المشروع (تعبئة تلقائية)")}</h3>
              <p className="text-xs text-muted-foreground mb-3">{tr("Auto-populated from selected phases. All fields are editable.", "معبأة تلقائياً من المراحل المختارة. جميع الحقول قابلة للتعديل.")}</p>
              
              {/* Column Headers */}
              <div className="grid grid-cols-12 gap-2 items-center px-2 py-1 bg-muted/50 rounded-t border mb-2">
                <div className="col-span-1 text-center">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Include", "تضمين")}</p>
                </div>
                <div className="col-span-4">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Risk Description", "وصف المخاطر")}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Priority", "الأولوية")}</p>
                </div>
                <div className="col-span-4">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Mitigation Plan", "خطة التخفيف")}</p>
                </div>
                <div className="col-span-1 text-center">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Action", "إجراء")}</p>
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
                        placeholder={tr("Risk Description", "وصف المخاطر")}
                      />
                    </div>
                    <div className="col-span-2">
                      <div className="w-full px-2 py-1 h-8 items-center text-sm">
                        {tm(risk.priority)}
                      </div>
                    </div>
                    <div className="col-span-4">
                      <Input
                        value={risk.mitigation}
                        onChange={(e) => updateRisk(risk.id, 'mitigation', e.target.value)}
                        className="text-xs h-8"
                        placeholder={tr("Mitigation Plan", "خطة التخفيف")}
                      />
                    </div>
                    <div className="col-span-1 flex justify-center">
                      {risk.isAutoPopulated && (
                        <Badge variant="outline" className="text-xs px-1 py-0">{tr("Auto", "تلقائي")}</Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10 ms-1"
                        onClick={() => removeRisk(risk.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full text-xs" onClick={addRisk}>
                  <Plus className="h-3 w-3 me-1" />
                  {tr("Add Manual Risk", "إضافة مخاطر يدوياً")}
                </Button>
              </div>
              
            </div>

            {/* Project Issues - Auto-populated + Editable */}
            <div className="border rounded-lg p-4 bg-muted/30">
              <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-3">{tr("Project Issues Summary (Auto-Populated)", "ملخص مشكلات المشروع (تعبئة تلقائية)")}</h3>
              <p className="text-xs text-muted-foreground mb-3">{tr("Auto-populated from selected phases. All fields are editable.", "معبأة تلقائياً من المراحل المختارة. جميع الحقول قابلة للتعديل.")}</p>
              
              {/* Column Headers */}
              <div className="grid grid-cols-12 gap-2 items-center px-2 py-1 bg-muted/50 rounded-t border mb-2">
                <div className="col-span-1 text-center">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Include", "تضمين")}</p>
                </div>
                <div className="col-span-3">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Issue Description", "وصف المشكلة")}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Priority", "الأولوية")}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Owner", "المسؤول")}</p>
                </div>
                <div className="col-span-3">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Remarks", "ملاحظات")}</p>
                </div>
                <div className="col-span-1 text-center">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Action", "إجراء")}</p>
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
                        placeholder={tr("Issue Description", "وصف المشكلة")}
                      />
                    </div>
                    <div className="col-span-2">
                      <div className="w-full px-2 py-1  h-8  text-sm">
                        {tm(issue.priority)}
                      </div>
                    </div>
                    <div className="col-span-2">
                      <Input
                        value={issue.owner}
                        onChange={(e) => updateIssue(issue.id, 'owner', e.target.value)}
                        className="text-xs h-8"
                        placeholder={tr("Owner", "المسؤول")}
                      />
                    </div>
                    <div className="col-span-3">
                      <Input
                        value={issue.remarks}
                        onChange={(e) => updateIssue(issue.id, 'remarks', e.target.value)}
                        className="text-xs h-8"
                        placeholder={tr("Remarks", "ملاحظات")}
                      />
                    </div>
                    <div className="col-span-1 flex justify-center">
                      {issue.isAutoPopulated && (
                        <Badge variant="outline" className="text-xs px-1 py-0">{tr("Auto", "تلقائي")}</Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10 ms-1"
                        onClick={() => removeIssue(issue.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full text-xs" onClick={addIssue}>
                  <Plus className="h-3 w-3 me-1" />
                  {tr("Add Manual Issue", "إضافة مشكلة يدوياً")}
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
              {tr("Cancel", "إلغاء")}
            </Button>
            <Button 
              size="sm" 
              className="bg-[#008755] hover:bg-[#006644] text-white text-xs"
              onClick={() => {
                // Handle save logic here
                onOpenChange(false);
              }}
            >
              <CheckCircle2 className="h-3.5 w-3.5 me-1" />
              {editMode ? tr("Save Changes", "حفظ التغييرات") : tr("Create Report", "إنشاء التقرير")}
            </Button>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}