import { useState, useEffect } from "react";
import {
  Plus,
  ChevronDown,
  ChevronRight,
  MessageSquare,
  Send,
  FileDown,
  CheckCircle2,
  Clock,
  Eye,
  AlertCircle,
  Filter,
  ArrowUpCircle,
  Sparkles,
  Loader2,
  ArrowLeft,
  Calendar,
  X,
  Pencil,
  Trash2,
  Edit
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { CreateReportDialog } from "./CreateReportDialog";
import { WeeklyStatusReportMilestone } from "./WeeklyStatusReportMilestone";
import { useLanguage } from "../../i18n/LanguageContext";

const INITIAL_EXECUTIVE_SUMMARY = "During this bi-weekly period, the development team successfully completed the backend API development for the smart clearance module. The payment gateway integration was finalized and tested. A comprehensive security audit was conducted, and database optimization efforts reduced query response time by 40%. IT Department completed infrastructure setup, Finance approved additional budget allocation, and Operations Team conducted extensive UAT sessions providing valuable feedback.";
const AI_EXECUTIVE_SUMMARY = "During this bi-weekly period, the development team successfully completed the backend API development for the smart clearance module, achieving 95% code coverage. The payment gateway integration with multiple providers (Visa, Mastercard, local banks) was finalized and tested. A comprehensive security audit was conducted by an external vendor, identifying 3 minor vulnerabilities which were immediately addressed. Database optimization efforts reduced query response time by 40%, significantly improving system performance. The team also initiated preliminary work on the reporting dashboard module.\n\nIT Department completed the infrastructure setup including cloud server provisioning, load balancers configuration, and CDN integration for optimal performance. Finance Department approved the additional budget allocation of AED 150K for contractor resources to address development velocity concerns. Operations Team conducted extensive UAT sessions on the initial prototype, providing 47 feedback points which have been categorized into high (12), medium (23), and low (12) priority items. Legal Department reviewed data privacy compliance requirements and confirmed alignment with UAE data protection regulations. Change Management Team initiated stakeholder communication plan for Phase 4 rollout.";

// Arabic display values for the mock data below (keys stay English for logic).
const AR: Record<string, string> = {
  [INITIAL_EXECUTIVE_SUMMARY]: "خلال فترة الأسبوعين هذه، أنجز فريق التطوير بنجاح تطوير الواجهات البرمجية الخلفية لوحدة التخليص الذكي. كما تم الانتهاء من تكامل بوابة الدفع واختبارها. وأُجري تدقيق أمني شامل، وأسهمت جهود تحسين قاعدة البيانات في خفض زمن الاستجابة للاستعلامات بنسبة 40%. وأكملت إدارة تقنية المعلومات تجهيز البنية التحتية، واعتمدت الإدارة المالية تخصيص ميزانية إضافية، وعقد فريق العمليات جلسات مكثفة لاختبار قبول المستخدم قدّمت ملاحظات قيّمة.",
  [AI_EXECUTIVE_SUMMARY]: "خلال فترة الأسبوعين هذه، أنجز فريق التطوير بنجاح تطوير الواجهات البرمجية الخلفية لوحدة التخليص الذكي، محققًا نسبة تغطية للشيفرة بلغت 95%. وتم الانتهاء من تكامل بوابة الدفع مع عدة مزودين (فيزا، ماستركارد، البنوك المحلية) واختباره. وأجرى مورد خارجي تدقيقًا أمنيًا شاملًا حدّد 3 ثغرات بسيطة تمت معالجتها فورًا. وأسهمت جهود تحسين قاعدة البيانات في خفض زمن الاستجابة للاستعلامات بنسبة 40%، ما حسّن أداء النظام بشكل ملحوظ. كما بدأ الفريق العمل التمهيدي على وحدة لوحة التقارير.\n\nأكملت إدارة تقنية المعلومات تجهيز البنية التحتية بما في ذلك توفير الخوادم السحابية وتهيئة موازنات الأحمال وتكامل شبكة توصيل المحتوى لتحقيق الأداء الأمثل. واعتمدت الإدارة المالية تخصيص ميزانية إضافية بقيمة 150 ألف درهم لموارد المتعاقدين لمعالجة المخاوف المتعلقة بوتيرة التطوير. وعقد فريق العمليات جلسات مكثفة لاختبار قبول المستخدم على النموذج الأولي، قدّمت 47 ملاحظة صُنّفت إلى أولوية مرتفعة (12) ومتوسطة (23) ومنخفضة (12). وراجعت الإدارة القانونية متطلبات الامتثال لخصوصية البيانات وأكدت توافقها مع لوائح حماية البيانات في دولة الإمارات. وأطلق فريق إدارة التغيير خطة التواصل مع أصحاب المصلحة لإطلاق المرحلة الرابعة.",
  "2 hours ago": "منذ ساعتين",
  "5 hours ago": "منذ 5 ساعات",
  "1 day ago": "منذ يوم واحد",
  "2 weeks ago": "منذ أسبوعين",
  "4 weeks ago": "منذ 4 أسابيع",
  "6 weeks ago": "منذ 6 أسابيع",
  "8 weeks ago": "منذ 8 أسابيع",
  "Sarah Ahmed": "سارة أحمد",
  "Mohammed Ali": "محمد علي",
  "Ahmed Khalil": "أحمد خليل",
  "Omar Ali": "عمر علي",
  "Layla Mohammed": "ليلى محمد",
  "Director General": "المدير العام",
  "Finance Director": "المدير المالي",
  "Executive summary looks good. Please update the revised go-live date.": "الملخص التنفيذي جيد. يرجى تحديث موعد الإطلاق المعدّل.",
  "@Ahmed - Can you clarify the API integration timeline?": "@أحمد - هل يمكنك توضيح الجدول الزمني لتكامل الواجهات البرمجية؟",
  "Risk mitigation plans are comprehensive.": "خطط التخفيف من المخاطر شاملة.",
  "Please add more details on the UAT testing phase.": "يرجى إضافة مزيد من التفاصيل حول مرحلة اختبار قبول المستخدم.",
  "Good progress on development milestones.": "تقدم جيد في المراحل الرئيسية للتطوير.",
  "Report approved. Great work team!": "تم اعتماد التقرير. عمل رائع يا فريق!",
  "Initial phase completed successfully.": "اكتملت المرحلة الأولية بنجاح.",
  "Year-end report looks comprehensive.": "تقرير نهاية العام شامل.",
  "Requirements Gathering": "جمع المتطلبات",
  "System Design": "تصميم النظام",
  "Development": "التطوير",
  "Conduct Stakeholder Interviews": "إجراء مقابلات أصحاب المصلحة",
  "Schedule interviews with department heads": "جدولة المقابلات مع رؤساء الإدارات",
  "Prepare interview questionnaires": "إعداد استبيانات المقابلات",
  "Document interview findings": "توثيق نتائج المقابلات",
  "Requirements Documentation": "توثيق المتطلبات",
  "Create functional requirements document": "إعداد وثيقة المتطلبات الوظيفية",
  "Define non-functional requirements": "تحديد المتطلبات غير الوظيفية",
  "Requirements Review and Approval": "مراجعة المتطلبات واعتمادها",
  "Architecture Design": "تصميم البنية",
  "Define system architecture": "تحديد بنية النظام",
  "Create architecture diagrams": "إعداد مخططات البنية",
  "Review with technical team": "المراجعة مع الفريق التقني",
  "Database Schema Design": "تصميم مخطط قاعدة البيانات",
  "Design entity relationship diagram": "تصميم مخطط علاقات الكيانات",
  "Define data models": "تحديد نماذج البيانات",
  "Optimize indexing strategy": "تحسين استراتيجية الفهرسة",
  "UI/UX Design": "تصميم واجهة وتجربة المستخدم",
  "Create wireframes": "إعداد المخططات الهيكلية",
  "Design mockups": "تصميم النماذج المرئية",
  "Backend Development": "تطوير الأنظمة الخلفية",
  "Setup project structure": "إعداد هيكل المشروع",
  "Implement authentication module": "تنفيذ وحدة المصادقة",
  "Build core API endpoints": "بناء نقاط الواجهات البرمجية الأساسية",
  "Unit testing": "اختبار الوحدات",
  "Frontend Development": "تطوير الواجهات الأمامية",
  "Setup React application": "إعداد تطبيق React",
  "Build dashboard components": "بناء مكونات لوحة المعلومات",
  "Implement responsive design": "تنفيذ التصميم المتجاوب",
  "API Integration": "تكامل الواجهات البرمجية",
  "Payment gateway integration": "تكامل بوابة الدفع",
  "Third-party service integration": "تكامل خدمات الأطراف الخارجية",
  "Draft": "مسودة",
  "Submitted": "مُرسل",
  "Approved": "معتمد",
  "Locked": "مقفل",
  "Active": "نشط",
  "Monitoring": "قيد المراقبة",
  "Closed": "مغلق",
  "Open": "مفتوح",
  "In Progress": "قيد التنفيذ",
  "Resolved": "تم الحل",
  "High": "مرتفع",
  "Medium": "متوسط",
  "Low": "منخفض",
  "Critical": "حرج",
  "Resource availability constraint": "محدودية توفر الموارد",
  "Hired contractors and cross-trained team members": "التعاقد مع متعاقدين وتدريب أعضاء الفريق على مهام متعددة",
  "HR for recruitment": "الموارد البشرية للتوظيف",
  "Technology integration complexity": "تعقيد التكامل التقني",
  "Weekly tech reviews and vendor support": "مراجعات تقنية أسبوعية ودعم من المورد",
  "IT Infrastructure team": "فريق البنية التحتية لتقنية المعلومات",
  "Stakeholder alignment gaps": "فجوات في التوافق مع أصحاب المصلحة",
  "Bi-weekly stakeholder meetings": "اجتماعات نصف شهرية مع أصحاب المصلحة",
  "Change Management": "إدارة التغيير",
  "API response time exceeding SLA": "زمن استجابة الواجهات البرمجية يتجاوز اتفاقية مستوى الخدمة",
  "UI inconsistencies in mobile view": "عدم اتساق الواجهة في عرض الهاتف المتحرك",
  "Payment gateway timeout during peak hours": "انتهاء مهلة بوابة الدفع خلال ساعات الذروة",
};

const AR_MONTHS: Record<string, string> = {
  Jan: "يناير", Feb: "فبراير", Mar: "مارس", Apr: "أبريل", May: "مايو", Jun: "يونيو",
  Jul: "يوليو", Aug: "أغسطس", Sep: "سبتمبر", Oct: "أكتوبر", Nov: "نوفمبر", Dec: "ديسمبر",
};

/** Translate month abbreviations inside a date string such as "Feb 12 - Feb 26, 2026". */
function arDate(value: string) {
  return value.replace(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/g, m => AR_MONTHS[m]);
}

// Mock data for reports
const mockReports = [
  {
    id: 1,
    reportDate: "2026-02-26",
    period: "Feb 12 - Feb 26, 2026",
    status: "Approved" as const,
    lastUpdated: "2 hours ago",
    updatedBy: "Sarah Ahmed",
    commentsCount: 5
  },
  {
    id: 2,
    reportDate: "2026-02-12",
    period: "Jan 29 - Feb 12, 2026",
    status: "Approved" as const,
    lastUpdated: "2 weeks ago",
    updatedBy: "Mohammed Ali",
    commentsCount: 8
  },
  {
    id: 3,
    reportDate: "2026-01-29",
    period: "Jan 15 - Jan 29, 2026",
    status: "Locked" as const,
    lastUpdated: "4 weeks ago",
    updatedBy: "Ahmed Khalil",
    commentsCount: 3
  },
  {
    id: 4,
    reportDate: "2026-01-15",
    period: "Jan 01 - Jan 15, 2026",
    status: "Locked" as const,
    lastUpdated: "6 weeks ago",
    updatedBy: "Sarah Ahmed",
    commentsCount: 6
  },
  {
    id: 5,
    reportDate: "2025-12-31",
    period: "Dec 17 - Dec 31, 2025",
    status: "Locked" as const,
    lastUpdated: "8 weeks ago",
    updatedBy: "Omar Ali",
    commentsCount: 4
  }
];

// Mock comments per report
const mockCommentsData: { [key: number]: Array<{ user: string; comment: string; time: string }> } = {
  1: [
    { user: "Sarah Ahmed", comment: "Executive summary looks good. Please update the revised go-live date.", time: "2 hours ago" },
    { user: "Mohammed Ali", comment: "@Ahmed - Can you clarify the API integration timeline?", time: "5 hours ago" },
    { user: "Ahmed Khalil", comment: "Risk mitigation plans are comprehensive.", time: "1 day ago" }
  ],
  2: [
    { user: "Omar Ali", comment: "Please add more details on the UAT testing phase.", time: "2 weeks ago" },
    { user: "Layla Mohammed", comment: "Good progress on development milestones.", time: "2 weeks ago" }
  ],
  3: [
    { user: "Sarah Ahmed", comment: "Report approved. Great work team!", time: "4 weeks ago" }
  ],
  4: [
    { user: "Mohammed Ali", comment: "Initial phase completed successfully.", time: "6 weeks ago" }
  ],
  5: [
    { user: "Ahmed Khalil", comment: "Year-end report looks comprehensive.", time: "8 weeks ago" }
  ]
};

// Mock data for weekly status report milestones
const milestoneTasksData = [
  {
    id: "milestone1",
    name: "Requirements Gathering",
    tasks: [
      {
        id: "task-1-1",
        task: "Conduct Stakeholder Interviews",
        status: "Complete",
        subtasks: [
          { id: "subtask-1-1-1", task: "Schedule interviews with department heads", status: "Complete" },
          { id: "subtask-1-1-2", task: "Prepare interview questionnaires", status: "Complete" },
          { id: "subtask-1-1-3", task: "Document interview findings", status: "Complete" }
        ]
      },
      {
        id: "task-1-2",
        task: "Requirements Documentation",
        status: "Complete",
        subtasks: [
          { id: "subtask-1-2-1", task: "Create functional requirements document", status: "Complete" },
          { id: "subtask-1-2-2", task: "Define non-functional requirements", status: "Complete" }
        ]
      },
      {
        id: "task-1-3",
        task: "Requirements Review and Approval",
        status: "Complete",
        subtasks: []
      }
    ]
  },
  {
    id: "milestone2",
    name: "System Design",
    tasks: [
      {
        id: "task-2-1",
        task: "Architecture Design",
        status: "Complete",
        subtasks: [
          { id: "subtask-2-1-1", task: "Define system architecture", status: "Complete" },
          { id: "subtask-2-1-2", task: "Create architecture diagrams", status: "Complete" },
          { id: "subtask-2-1-3", task: "Review with technical team", status: "Complete" }
        ]
      },
      {
        id: "task-2-2",
        task: "Database Schema Design",
        status: "In Progress",
        subtasks: [
          { id: "subtask-2-2-1", task: "Design entity relationship diagram", status: "Complete" },
          { id: "subtask-2-2-2", task: "Define data models", status: "In Progress" },
          { id: "subtask-2-2-3", task: "Optimize indexing strategy", status: "In Progress" }
        ]
      },
      {
        id: "task-2-3",
        task: "UI/UX Design",
        status: "In Progress",
        subtasks: [
          { id: "subtask-2-3-1", task: "Create wireframes", status: "Complete" },
          { id: "subtask-2-3-2", task: "Design mockups", status: "In Progress" }
        ]
      }
    ]
  },
  {
    id: "milestone3",
    name: "Development",
    tasks: [
      {
        id: "task-3-1",
        task: "Backend Development",
        status: "In Progress",
        subtasks: [
          { id: "subtask-3-1-1", task: "Setup project structure", status: "Complete" },
          { id: "subtask-3-1-2", task: "Implement authentication module", status: "Complete" },
          { id: "subtask-3-1-3", task: "Build core API endpoints", status: "In Progress" },
          { id: "subtask-3-1-4", task: "Unit testing", status: "In Progress" }
        ]
      },
      {
        id: "task-3-2",
        task: "Frontend Development",
        status: "In Progress",
        subtasks: [
          { id: "subtask-3-2-1", task: "Setup React application", status: "Complete" },
          { id: "subtask-3-2-2", task: "Build dashboard components", status: "In Progress" },
          { id: "subtask-3-2-3", task: "Implement responsive design", status: "In Progress" }
        ]
      },
      {
        id: "task-3-3",
        task: "API Integration",
        status: "At Risk",
        subtasks: [
          { id: "subtask-3-3-1", task: "Payment gateway integration", status: "At Risk" },
          { id: "subtask-3-3-2", task: "Third-party service integration", status: "In Progress" }
        ]
      }
    ]
  }
];

interface BiWeeklyStatusTabProps {
  initialReportId?: number;
}

export function BiWeeklyStatusTab({ initialReportId }: BiWeeklyStatusTabProps = {}) {
  const { tr, isRTL } = useLanguage();
  const ta = (value: string) => tr(value, AR[value]);
  const td = (value: string) => (isRTL ? arDate(value) : value);
  const [viewMode, setViewMode] = useState<"list" | "detail">(initialReportId ? "detail" : "list");
  const [selectedReportId, setSelectedReportId] = useState<number | null>(initialReportId || null);
  const [expandedPanels, setExpandedPanels] = useState<string[]>(["executive", "timelines"]);
  const [reportStatus, setReportStatus] = useState<"Draft" | "Submitted" | "Approved" | "Locked">("Draft");
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [executiveSummary, setExecutiveSummary] = useState(INITIAL_EXECUTIVE_SUMMARY);
  const [showCreateReportDialog, setShowCreateReportDialog] = useState(false);
  const [editingReportId, setEditingReportId] = useState<number | null>(null);
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());

  // Auto-select report on initial load if initialReportId is provided
  useEffect(() => {
    if (initialReportId) {
      const report = mockReports.find(r => r.id === initialReportId);
      if (report) {
        setReportStatus(report.status);
      }
    }
  }, [initialReportId]);

  const togglePanel = (id: string) => {
    setExpandedPanels(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const toggleTask = (taskId: string) => {
    setExpandedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  const handleAIGenerateSummary = () => {
    setIsGeneratingAI(true);
    
    // Simulate AI generation with realistic delay
    setTimeout(() => {
      // AI-generated comprehensive executive summary
      const aiExecutiveSummary = AI_EXECUTIVE_SUMMARY;
      
      setExecutiveSummary(aiExecutiveSummary);
      setIsGeneratingAI(false);
    }, 2500); // 2.5 second realistic AI generation time
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Draft": return { bg: "#6b728020", color: "#6b7280" };
      case "Submitted": return { bg: "#00875520", color: "#008755" };
      case "Approved": return { bg: "#35774320", color: "#357743" };
      case "Locked": return { bg: "#1f293720", color: "#1f2937" };
      default: return { bg: "#6b728020", color: "#6b7280" };
    }
  };

  const handleSelectReport = (reportId: number) => {
    setSelectedReportId(reportId);
    const report = mockReports.find(r => r.id === reportId);
    if (report) {
      setReportStatus(report.status);
    }
    setViewMode("detail");
  };

  const handleBackToList = () => {
    setViewMode("list");
    setSelectedReportId(null);
  };

  const handleEditReport = (reportId: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click
    setEditingReportId(reportId);
    setShowCreateReportDialog(true);
  };

  const handleDeleteReport = (reportId: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click
    if (confirm(tr("Are you sure you want to delete this report?", "هل أنت متأكد من حذف هذا التقرير؟"))) {
      // Handle delete logic here
      console.log("Deleting report:", reportId);
    }
  };

  const selectedReport = selectedReportId ? mockReports.find(r => r.id === selectedReportId) : null;
  const reportComments = selectedReportId ? mockCommentsData[selectedReportId] || [] : [];

  // LIST VIEW
  if (viewMode === "list") {
    return (
      <>
        <div className="space-y-4">
          {/* Top Toolbar - List View */}
          <Card className="border-[#008755]/20 sticky top-0 z-10 bg-white shadow-md">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{tr("Bi-Weekly Status Reports", "تقارير الحالة نصف الشهرية")}</h2>
                  <p className="text-xs text-muted-foreground mt-1">{tr("View and manage all project status reports", "عرض وإدارة جميع تقارير حالة المشروع")}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-muted-foreground">{tr("Period:", "الفترة:")}</label>
                    <select className="px-3 py-1.5 border rounded text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                      <option>{tr("All Reports", "جميع التقارير")}</option>
                      <option>{tr("Last Month", "الشهر الماضي")}</option>
                      <option>{tr("Last 3 Months", "آخر 3 أشهر")}</option>
                      <option>{tr("Last 6 Months", "آخر 6 أشهر")}</option>
                      <option>{tr("This Year", "هذا العام")}</option>
                      <option>{tr("Custom Range", "نطاق مخصص")}</option>
                    </select>
                  </div>
                  <div className="h-6 w-px bg-border" />
                  <Button size="sm" className="bg-[#008755] hover:bg-[#006644] text-white text-xs" onClick={() => setShowCreateReportDialog(true)}>
                    <Plus className="h-3.5 w-3.5 me-1" />
                    {tr("Create New Report", "إنشاء تقرير جديد")}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reports List Table */}
          <Card className="border-[#008755]/20">
            <CardContent className="pt-4 pb-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/30">
                      <th className="text-start py-3 px-4 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3.5 w-3.5" />
                          {tr("Report Period", "فترة التقرير")}
                        </div>
                      </th>
                      <th className="text-start py-3 px-4 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Report Date", "تاريخ التقرير")}</th>
                      <th className="text-start py-3 px-4 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Status", "الحالة")}</th>
                      <th className="text-start py-3 px-4 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-3.5 w-3.5" />
                          {tr("Comments", "التعليقات")}
                        </div>
                      </th>
                      <th className="text-start py-3 px-4 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Last Updated", "آخر تحديث")}</th>
                      <th className="text-start py-3 px-4 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Updated By", "حُدّث بواسطة")}</th>
                      <th className="text-start py-3 px-4 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Actions", "الإجراءات")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockReports.map((report) => (
                      <tr 
                        key={report.id} 
                        className="border-b hover:bg-muted/30 transition-colors cursor-pointer"
                        onClick={() => handleSelectReport(report.id)}
                      >
                        <td className="py-4 px-4">
                          <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{td(report.period)}</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-sm text-[#1f2937]">{report.reportDate}</p>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            {report.status === "Approved" ? (
                              <Badge 
                                className="text-xs font-['Dubai:Medium',_'Dubai'] bg-orange-100 text-orange-700 border border-orange-300"
                              >
                                {tr("Pending Updates", "بانتظار التحديثات")}
                              </Badge>
                            ) : (
                              <Badge 
                                style={{ 
                                  backgroundColor: getStatusColor(report.status).bg, 
                                  color: getStatusColor(report.status).color 
                                }}
                                className="text-xs font-['Dubai:Medium',_'Dubai']"
                              >
                                {ta(report.status)}
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-sm text-[#1f2937]">{report.commentsCount}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-sm text-muted-foreground">{ta(report.lastUpdated)}</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-sm text-[#1f2937]">{ta(report.updatedBy)}</p>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Pencil className="h-3.5 w-3.5 text-[#008755] cursor-pointer" onClick={(e) => handleEditReport(report.id, e)} />
                            <Trash2 className="h-3.5 w-3.5 text-[#D83731] cursor-pointer" onClick={(e) => handleDeleteReport(report.id, e)} />
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
        
        {/* Create Report Dialog */}
        <CreateReportDialog open={showCreateReportDialog} onOpenChange={setShowCreateReportDialog} />
      </>
    );
  }

  // DETAIL VIEW
  return (
    <div className="space-y-4">
      {/* Top Sticky Toolbar - Detail View */}
      <Card className="border-[#008755]/20 sticky top-0 z-10 bg-white shadow-md">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleBackToList}
                className="text-xs"
              >
                <ArrowLeft className="h-3.5 w-3.5 me-1 rtl:rotate-180" />
                {tr("Back to Reports", "العودة إلى التقارير")}
              </Button>
              <div className="h-6 w-px bg-border" />
              <div>
                <p className="text-xs text-muted-foreground mb-1">{tr("Report Period", "فترة التقرير")}</p>
                <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{selectedReport ? td(selectedReport.period) : null}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">{tr("Status", "الحالة")}</p>
                {reportStatus === "Approved" ? (
                  <Badge 
                    className="text-xs font-['Dubai:Medium',_'Dubai'] bg-orange-100 text-orange-700 border border-orange-300"
                  >
                    {tr("Pending Updates", "بانتظار التحديثات")}
                  </Badge>
                ) : (
                  <Badge 
                    style={{ 
                      backgroundColor: getStatusColor(reportStatus).bg, 
                      color: getStatusColor(reportStatus).color 
                    }}
                    className="text-xs font-['Dubai:Medium',_'Dubai']"
                  >
                    {ta(reportStatus)}
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {reportStatus === "Draft" && (
                <Button 
                  size="sm" 
                  className="bg-[#008755] hover:bg-[#006644] text-white text-xs"
                  onClick={() => setReportStatus("Submitted")}
                >
                  <Send className="h-3.5 w-3.5 me-1" />
                  {tr("Submit for Approval", "إرسال للاعتماد")}
                </Button>
              )}
              {reportStatus === "Submitted" && (
                <Button 
                  size="sm" 
                  className="bg-[#357743] hover:bg-[#2d6237] text-white text-xs"
                  onClick={() => setReportStatus("Approved")}
                >
                  <CheckCircle2 className="h-3.5 w-3.5 me-1" />
                  {tr("Approve", "اعتماد")}
                </Button>
              )}
              <Button size="sm" variant="outline" className="text-xs">
                <FileDown className="h-3.5 w-3.5 me-1" />
                {tr("Export PPT", "تصدير PPT")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-4">
        {/* Left Panel - 70% - Report Sections */}
        <div className="lg:col-span-7 space-y-3">
          
          {/* Executive Summary Panel */}
          <Card className="border-[#008755]/20">
            <CardContent className="pt-0 pb-0">
              <div 
                className="flex items-center justify-between py-3 px-3 cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => togglePanel("executive")}
              >
                <div className="flex items-center gap-2">
                  {expandedPanels.includes("executive") ? (
                    <ChevronDown className="h-4 w-4 text-[#008755]" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground rtl:rotate-180" />
                  )}
                  <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{tr("Executive Summary", "الملخص التنفيذي")}</h3>
                </div>
                <div className="flex items-center gap-2">
                  
                </div>
              </div>

              {expandedPanels.includes("executive") && (
                <div className="border-t px-4 py-4 space-y-4">
                  {/* Table A - Project Details */}
                  <div>
                    <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-2">{tr("Project Information", "معلومات المشروع")}</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-muted/30 rounded">
                        <p className="text-xs text-muted-foreground">{tr("Project Name", "اسم المشروع")}</p>
                        <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{tr("Smart Clearance Initiative", "مبادرة التخليص الذكي")}</p>
                      </div>
                      <div className="p-3 bg-muted/30 rounded">
                        <p className="text-xs text-muted-foreground">{tr("Start Date", "تاريخ البدء")}</p>
                        <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{tr("Jan 15, 2025", "15 يناير 2025")}</p>
                      </div>
                      <div className="p-3 bg-muted/30 rounded">
                        <p className="text-xs text-muted-foreground">{tr("End Date", "تاريخ الانتهاء")}</p>
                        <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{tr("Dec 31, 2025", "31 ديسمبر 2025")}</p>
                      </div>
                      <div className="p-3 bg-muted/30 rounded">
                        <p className="text-xs text-muted-foreground">{tr("Duration", "المدة")}</p>
                        <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{tr("12 months", "12 شهرًا")}</p>
                      </div>
                      <div className="p-3 bg-muted/30 rounded">
                        <p className="text-xs text-muted-foreground">{tr("Phases", "المراحل")}</p>
                        <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">5</p>
                      </div>
                      <div className="p-3 bg-muted/30 rounded">
                        <p className="text-xs text-muted-foreground">{tr("Overall Progress", "التقدم الإجمالي")}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={65} className="h-2 flex-1" />
                          <span className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">65%</span>
                        </div>
                      </div>
                      <div className="p-3 bg-muted/30 rounded col-span-2">
                        <p className="text-xs text-muted-foreground">{tr("Support", "الدعم")}</p>
                        <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{tr("IT Department, Finance, Operations", "إدارة تقنية المعلومات، المالية، العمليات")}</p>
                      </div>
                    </div>
                  </div>

                  {/* Table B - Current Phase */}
                  <div>
                    <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-2">{tr("Current Phase Details", "تفاصيل المرحلة الحالية")}</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-[#008755]/10 rounded">
                        <p className="text-xs text-muted-foreground">{tr("Current Phase", "المرحلة الحالية")}</p>
                        <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{tr("Phase 3: Development", "المرحلة 3: التطوير")}</p>
                      </div>
                      <div className="p-3 bg-[#008755]/10 rounded">
                        <p className="text-xs text-muted-foreground">{tr("Start", "البداية")}</p>
                        <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{tr("Apr 01, 2025", "01 أبريل 2025")}</p>
                      </div>
                      <div className="p-3 bg-[#008755]/10 rounded">
                        <p className="text-xs text-muted-foreground">{tr("End", "النهاية")}</p>
                        <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{tr("Jun 30, 2025", "30 يونيو 2025")}</p>
                      </div>
                      <div className="p-3 bg-[#008755]/10 rounded">
                        <p className="text-xs text-muted-foreground">{tr("Duration", "المدة")}</p>
                        <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{tr("3 months", "3 أشهر")}</p>
                      </div>
                      <div className="p-3 bg-[#008755]/10 rounded">
                        <p className="text-xs text-muted-foreground">{tr("Completion %", "نسبة الإنجاز %")}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={45} className="h-2 flex-1" />
                          <span className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">45%</span>
                        </div>
                      </div>
                      <div className="p-3 bg-[#008755]/10 rounded">
                        <p className="text-xs text-muted-foreground">{tr("Status", "الحالة")}</p>
                        <Badge style={{ backgroundColor: "#F2A20020", color: "#F2A200" }} className="text-xs mt-1">{tr("At Risk", "معرض للخطر")}</Badge>
                      </div>
                      <div className="p-3 bg-[#008755]/10 rounded col-span-2">
                        <p className="text-xs text-muted-foreground">{tr("Revised Go-Live Date", "موعد الإطلاق المعدّل")}</p>
                        <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{tr("Jul 15, 2025", "15 يوليو 2025")}</p>
                      </div>
                    </div>
                  </div>

                  {/* Text Areas */}
                  <div>
                    <label className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-2 block">{tr("Executive Summary", "الملخص التنفيذي")}</label>
                    <div className="w-full px-3 py-2 border rounded text-sm min-h-[120px] bg-muted/30 text-[#1f2937] whitespace-pre-wrap">
                      {ta(executiveSummary)}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Weekly Status Report Milestones */}
          {milestoneTasksData.map((milestone) => (
            <WeeklyStatusReportMilestone
              key={milestone.id}
              milestoneName={ta(milestone.name)}
              tasks={milestone.tasks.map(task => ({
                ...task,
                task: ta(task.task),
                subtasks: task.subtasks.map(sub => ({ ...sub, task: ta(sub.task) })),
              }))}
              panelId={milestone.id}
              isExpanded={expandedPanels.includes(milestone.id)}
              onTogglePanel={() => togglePanel(milestone.id)}
            />
          ))}

          

          {/* Project Risks Summary Panel */}
          <Card className="border-[#008755]/20">
            <CardContent className="pt-0 pb-0">
              <div 
                className="flex items-center justify-between py-3 px-3 cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => togglePanel("risks")}
              >
                <div className="flex items-center gap-2">
                  {expandedPanels.includes("risks") ? (
                    <ChevronDown className="h-4 w-4 text-[#008755]" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground rtl:rotate-180" />
                  )}
                  <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{tr("Project Risks Summary", "ملخص مخاطر المشروع")}</h3>
                  <Badge variant="secondary" className="text-xs">{tr("4 active", "4 نشطة")}</Badge>
                </div>
              </div>

              {expandedPanels.includes("risks") && (
                <div className="border-t px-4 py-4">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/30">
                          <th className="text-start py-2 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Risk", "الخطر")}</th>
                          <th className="text-start py-2 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Description", "الوصف")}</th>
                          <th className="text-start py-2 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Severity", "الخطورة")}</th>
                          <th className="text-start py-2 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Mitigation Strategy", "استراتيجية التخفيف")}</th>
                          <th className="text-start py-2 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Support Required", "الدعم المطلوب")}</th>
                          <th className="text-start py-2 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Owner", "المسؤول")}</th>
                          <th className="text-start py-2 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Status", "الحالة")}</th>
                          <th className="text-start py-2 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Issues", "المشكلات")}</th>
                          <th className="text-start py-2 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Action", "الإجراء")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { 
                            risk: "R-001", 
                            desc: "Resource availability constraint", 
                            severity: "High", 
                            mitigation: "Hired contractors and cross-trained team members", 
                            support: "HR for recruitment",
                            owner: "Sarah Ahmed", 
                            status: "Active", 
                            issues: "2"
                          },
                          { 
                            risk: "R-002", 
                            desc: "Technology integration complexity", 
                            severity: "Medium", 
                            mitigation: "Weekly tech reviews and vendor support", 
                            support: "IT Infrastructure team",
                            owner: "Ahmed Khalil", 
                            status: "Monitoring", 
                            issues: "0"
                          },
                          { 
                            risk: "R-003", 
                            desc: "Stakeholder alignment gaps", 
                            severity: "Low", 
                            mitigation: "Bi-weekly stakeholder meetings", 
                            support: "Change Management",
                            owner: "Mohammed Ali", 
                            status: "Closed", 
                            issues: "0"
                          },
                        ].map((item, idx) => (
                          <tr key={idx} className="border-b hover:bg-muted/30 transition-colors">
                            <td className="py-3 px-3 text-sm font-['Dubai:Medium',_'Dubai'] text-[#008755]">{item.risk}</td>
                            <td className="py-3 px-3 text-sm text-[#1f2937] max-w-[200px]">{ta(item.desc)}</td>
                            <td className="py-3 px-3">
                              <Badge 
                                style={{ 
                                  backgroundColor: item.severity === "High" ? "#D83731" : item.severity === "Medium" ? "#F2A200" : "#357743",
                                  color: "#ffffff",
                                  borderColor: item.severity === "High" ? "#D83731" : item.severity === "Medium" ? "#F2A200" : "#357743"
                                }}
                                className="text-xs border-0"
                              >
                                {ta(item.severity)}
                              </Badge>
                            </td>
                            <td className="py-3 px-3 text-xs text-muted-foreground max-w-[200px]">{ta(item.mitigation)}</td>
                            <td className="py-3 px-3 text-xs text-muted-foreground max-w-[150px]">{ta(item.support)}</td>
                            <td className="py-3 px-3 text-sm text-[#1f2937]">{ta(item.owner)}</td>
                            <td className="py-3 px-3">
                              <Badge 
                                style={{ 
                                  backgroundColor: item.status === "Active" ? "#D83731" : item.status === "Monitoring" ? "#008755" : "#357743",
                                  color: "#ffffff",
                                  borderColor: item.status === "Active" ? "#D83731" : item.status === "Monitoring" ? "#008755" : "#357743"
                                }}
                                className="text-xs border-0"
                              >
                                {ta(item.status)}
                              </Badge>
                            </td>
                            <td className="py-3 px-3 text-sm text-[#1f2937] text-center">{item.issues}</td>
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
                </div>
              )}
            </CardContent>
          </Card>

          {/* Project Issues Summary Panel */}
          <Card className="border-[#008755]/20">
            <CardContent className="pt-0 pb-0">
              <div 
                className="flex items-center justify-between py-3 px-3 cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => togglePanel("issues")}
              >
                <div className="flex items-center gap-2">
                  {expandedPanels.includes("issues") ? (
                    <ChevronDown className="h-4 w-4 text-[#008755]" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground rtl:rotate-180" />
                  )}
                  <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{tr("Project Issues Summary", "ملخص مشكلات المشروع")}</h3>
                  <Badge variant="secondary" className="text-xs">{tr("2 open", "2 مفتوحة")}</Badge>
                </div>
              </div>

              {expandedPanels.includes("issues") && (
                <div className="border-t px-4 py-4">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/30">
                          <th className="text-start py-2 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Name", "الاسم")}</th>
                          <th className="text-start py-2 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Description", "الوصف")}</th>
                          <th className="text-start py-2 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Priority", "الأولوية")}</th>
                          <th className="text-start py-2 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Status", "الحالة")}</th>
                          <th className="text-start py-2 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Date Reported", "تاريخ الإبلاغ")}</th>
                          <th className="text-start py-2 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Action", "الإجراء")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { 
                            name: "ISS-001", 
                            desc: "API response time exceeding SLA", 
                            priority: "Critical", 
                            status: "Open",
                            dateReported: "Feb 10, 2026"
                          },
                          { 
                            name: "ISS-002", 
                            desc: "UI inconsistencies in mobile view", 
                            priority: "Medium", 
                            status: "In Progress",
                            dateReported: "Feb 08, 2026"
                          },
                          { 
                            name: "ISS-003", 
                            desc: "Payment gateway timeout during peak hours", 
                            priority: "High", 
                            status: "Resolved",
                            dateReported: "Feb 05, 2026"
                          },
                        ].map((item, idx) => (
                          <tr key={idx} className="border-b hover:bg-muted/30 transition-colors">
                            <td className="py-3 px-3 text-sm font-['Dubai:Medium',_'Dubai'] text-[#008755]">{item.name}</td>
                            <td className="py-3 px-3 text-sm text-[#1f2937] max-w-[250px]">{ta(item.desc)}</td>
                            <td className="py-3 px-3">
                              <Badge 
                                style={{ 
                                  backgroundColor: item.priority === "Critical" ? "#D83731" : item.priority === "High" ? "#F2A200" : item.priority === "Medium" ? "#008755" : "#357743",
                                  color: "#ffffff",
                                  borderColor: item.priority === "Critical" ? "#D83731" : item.priority === "High" ? "#F2A200" : item.priority === "Medium" ? "#008755" : "#357743"
                                }}
                                className="text-xs border-0"
                              >
                                {ta(item.priority)}
                              </Badge>
                            </td>
                            <td className="py-3 px-3">
                              <Badge 
                                style={{ 
                                  backgroundColor: item.status === "Open" ? "#D83731" : item.status === "In Progress" ? "#008755" : "#357743",
                                  color: "#ffffff",
                                  borderColor: item.status === "Open" ? "#D83731" : item.status === "In Progress" ? "#008755" : "#357743"
                                }}
                                className="text-xs border-0"
                              >
                                {ta(item.status)}
                              </Badge>
                            </td>
                            <td className="py-3 px-3 text-xs text-muted-foreground">{td(item.dateReported)}</td>
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
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - 30% - Comments & Info */}
        <div className="lg:col-span-3 space-y-3">
          {/* Comments Panel */}
          <Card className="border-[#008755]/20">
            <CardContent className="pt-4 pb-4">
              <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-3 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-[#008755]" />
                {tr("Comments", "التعليقات")}
                <Badge variant="secondary" className="text-xs ms-auto">{reportComments.length}</Badge>
              </h3>
              <div className="space-y-3 max-h-[300px] overflow-y-auto mb-3">
                {reportComments.map((item, idx) => (
                  <div key={idx} className="p-3 bg-muted/30 rounded text-sm">
                    <p className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] text-xs">{ta(item.user)}</p>
                    <p className="text-xs text-[#1f2937] mt-1">{ta(item.comment)}</p>
                    <p className="text-xs text-muted-foreground mt-1">{ta(item.time)}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder={tr("Add a comment...", "أضف تعليقًا...")}
                  className="flex-1 px-3 py-2 border rounded text-sm"
                />
                <Button size="sm" className="bg-[#008755] hover:bg-[#006644] text-white">
                  <Send className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Watchers & Approvers */}
          <Card className="border-[#008755]/20">
            <CardContent className="pt-4 pb-4">
              

              <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#357743]" />
                {tr("Approvers", "المعتمِدون")}
              </h3>
              <div className="space-y-2">
                {["Director General", "Finance Director"].map((name, idx) => (
                  <div key={idx} className="text-sm text-[#1f2937] flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-[#357743] text-white flex items-center justify-center text-xs">
                      {name.split(' ').map(n => n[0]).join('')}
                    </div>
                    {ta(name)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Last Updated */}
          <Card className="border-[#008755]/20">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <div>
                  <p className="text-xs">{tr("Last updated", "آخر تحديث")}</p>
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{selectedReport ? tr(`${selectedReport.lastUpdated} by ${selectedReport.updatedBy}`, `${ta(selectedReport.lastUpdated)} بواسطة ${ta(selectedReport.updatedBy)}`) : null}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}