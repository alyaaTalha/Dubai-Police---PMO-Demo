import { useState } from 'react';
import {
  ArrowLeft, Info, Download, Sparkles, ChevronUp, ChevronDown, ChevronRight,
  Shield, Users, Calendar, Wallet, Layers, TrendingUp, TrendingDown, Lightbulb,
  CheckCircle2, FileText, Building2, ClipboardCheck, Target, ListTodo, AlertTriangle,
  Trophy, BarChart3, RefreshCw, FolderCheck, MessageSquare, Handshake, Plus, Edit,
  Trash2, Eye, GripVertical, Link2, X, IdCard,
} from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Button } from '../../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { cn } from '../../ui/utils';
import {
  CRITERIA, STAGES, STATUS_META, TYPES, money, IP_REGISTER, PARTNERS,
  type Project,
} from '../sandboxData';
import type { SandboxPage, SandboxStore } from '../SandboxStore';
import heroDecoration from '../../../../assets/sandbox-hero-decoration.png';
import { KanbanView, GanttView } from '../../portfolio/MilestoneViews';
import {
  RiskRegisterTab, StakeholdersTab, GoalsBenefitsTab, ProjectClosureTab, CollaborationTab,
} from '../../portfolio/ProjectTabsContent';
import { KPIsTab } from '../../portfolio/KPIsTab';
import { BiWeeklyStatusTab } from '../../portfolio/BiWeeklyStatusTab';
import { AddTaskPanel } from '../../portfolio/AddTaskPanel';
import { AddMilestonePanel } from '../../portfolio/AddMilestonePanel';
import { ProjectCardTab } from './ProjectCardTab';
import { useLanguage } from '../../../i18n/LanguageContext';
import { SANDBOX_AR, useSandboxTr } from '../sandboxI18n';

interface PageProps {
  project: Project;
  store: SandboxStore;
  onBack: () => void;
  onNavigate: (page: SandboxPage) => void;
}

type DetailTab =
  | 'overview' | 'card' | 'biweekly' | 'milestones' | 'risk' | 'stakeholders' | 'goals'
  | 'evaluation' | 'kpis' | 'partners' | 'ip' | 'change-management' | 'closure' | 'documents';

const TABS: Array<{ key: DetailTab; label: string; labelAr: string; icon: React.ElementType }> = [
  { key: 'overview', label: 'Overview', labelAr: 'نظرة عامة', icon: CheckCircle2 },
  { key: 'card', label: 'Project Card', labelAr: 'بطاقة المشروع', icon: IdCard },
  { key: 'biweekly', label: 'Bi-Weekly Status', labelAr: 'الحالة نصف الشهرية', icon: Calendar },
  { key: 'milestones', label: 'Milestones & Tasks', labelAr: 'المراحل والمهام', icon: ListTodo },
  { key: 'risk', label: 'Risk Register', labelAr: 'سجل المخاطر', icon: AlertTriangle },
  { key: 'stakeholders', label: 'Stakeholders', labelAr: 'أصحاب المصلحة', icon: Users },
  { key: 'goals', label: 'Goals & Benefits', labelAr: 'الأهداف والفوائد', icon: Trophy },
  // { key: 'evaluation', label: 'Evaluation', labelAr: 'التقييم', icon: ClipboardCheck },
  { key: 'kpis', label: 'KPIs', labelAr: 'مؤشرات الأداء', icon: BarChart3 },
  // { key: 'partners', label: 'Partners', labelAr: 'الشركاء', icon: Handshake },
  // { key: 'ip', label: 'Intellectual Property', labelAr: 'الملكية الفكرية', icon: Shield },
  { key: 'change-management', label: 'Change Management', labelAr: 'إدارة التغيير', icon: RefreshCw },
  { key: 'closure', label: 'Project Closure', labelAr: 'إغلاق المشروع', icon: FolderCheck },
  { key: 'documents', label: 'Documents', labelAr: 'المستندات', icon: MessageSquare },
];

const CRITERIA_OFFSETS = [6, -4, 2, -8, 4];

// This page always uses the platform's primary green as its accent —
// regardless of project type — rather than the type's own color (which
// would render R&D's blue, #1d5fa8, here).
const ACCENT = '#008755';
const ACCENT_GRADIENT_FROM = '#00a869';
const ACCENT_GRADIENT_TO = '#005844';

// ── Dummy milestone / task data — shared placeholder timeline for every
// project record, mirroring the portfolio ProjectDetailsPage pattern. ──────
interface SubTask {
  id: string; name: string; owner: string; priority: string; progress: number;
  status: string; timeline: string; dependencies: string; isOverdue: boolean;
}
interface TaskItem extends SubTask { subtasks?: SubTask[] }
interface MilestoneItem {
  id: string; name: string; status: string; completion: number; dueDate: string; tasks: TaskItem[];
}

const MOCK_MILESTONES: MilestoneItem[] = [
  {
    id: 'M1', name: 'Idea & Feasibility', status: 'Complete', completion: 100, dueDate: 'Feb 10, 2026',
    tasks: [
      {
        id: 'T1', name: 'Landscape & Literature Review', owner: 'Dr. Layla Ahmed', priority: 'High', progress: 100,
        status: 'Complete', timeline: 'Jan 05 - Jan 18', dependencies: 'None', isOverdue: false,
        subtasks: [
          { id: 'T1.1', name: 'Prior art & patent scan', owner: 'Dr. Layla Ahmed', priority: 'Medium', progress: 100, status: 'Complete', timeline: 'Jan 05 - Jan 09', dependencies: 'None', isOverdue: false },
          { id: 'T1.2', name: 'Stakeholder needs interviews', owner: 'Dr. Layla Ahmed', priority: 'High', progress: 100, status: 'Complete', timeline: 'Jan 10 - Jan 15', dependencies: 'T1.1', isOverdue: false },
          { id: 'T1.3', name: 'Feasibility findings memo', owner: 'Dr. Layla Ahmed', priority: 'Medium', progress: 100, status: 'Complete', timeline: 'Jan 16 - Jan 18', dependencies: 'T1.2', isOverdue: false },
        ],
      },
      { id: 'T2', name: 'Feasibility Report', owner: 'Eng. Sara Al Neyadi', priority: 'Critical', progress: 100, status: 'Complete', timeline: 'Jan 19 - Jan 28', dependencies: 'T1', isOverdue: false },
      { id: 'T3', name: 'Feasibility Sign-off', owner: 'Mohammed Hassan', priority: 'High', progress: 100, status: 'Complete', timeline: 'Jan 29 - Feb 10', dependencies: 'T2', isOverdue: false },
    ],
  },
  {
    id: 'M2', name: 'Approval & Solution Design', status: 'In Progress', completion: 70, dueDate: 'Apr 20, 2026',
    tasks: [
      { id: 'T4', name: 'Solution Architecture', owner: 'Ahmed Khalil', priority: 'Critical', progress: 100, status: 'Complete', timeline: 'Feb 11 - Feb 24', dependencies: 'M1', isOverdue: false },
      {
        id: 'T5', name: 'Data & Integration Design', owner: 'Ahmed Khalil', priority: 'High', progress: 80,
        status: 'In Progress', timeline: 'Feb 25 - Mar 15', dependencies: 'T4', isOverdue: false,
        subtasks: [
          { id: 'T5.1', name: 'Partner data-sharing model', owner: 'Ahmed Khalil', priority: 'High', progress: 100, status: 'Complete', timeline: 'Feb 25 - Mar 02', dependencies: 'None', isOverdue: false },
          { id: 'T5.2', name: 'Sandbox environment spec', owner: 'Ahmed Khalil', priority: 'High', progress: 85, status: 'In Progress', timeline: 'Mar 03 - Mar 10', dependencies: 'T5.1', isOverdue: false },
          { id: 'T5.3', name: 'Security & privacy review', owner: 'Ahmed Khalil', priority: 'Medium', progress: 55, status: 'In Progress', timeline: 'Mar 11 - Mar 15', dependencies: 'T5.2', isOverdue: false },
        ],
      },
      { id: 'T6', name: 'Governance Briefing Deck', owner: 'Layla Mohammed', priority: 'Medium', progress: 90, status: 'In Progress', timeline: 'Feb 25 - Mar 20', dependencies: 'T4', isOverdue: false },
      { id: 'T7', name: 'Approval Board Review', owner: 'Sarah Ahmed', priority: 'High', progress: 20, status: 'Not Started', timeline: 'Mar 21 - Apr 20', dependencies: 'T5, T6', isOverdue: false },
    ],
  },
  {
    id: 'M3', name: 'Development & Sandbox Pilot', status: 'At Risk', completion: 40, dueDate: 'Aug 30, 2026',
    tasks: [
      {
        id: 'T8', name: 'Core Build', owner: 'Omar Ali', priority: 'Critical', progress: 55,
        status: 'In Progress', timeline: 'Apr 21 - Jun 30', dependencies: 'M2', isOverdue: false,
        subtasks: [
          { id: 'T8.1', name: 'Environment setup', owner: 'Omar Ali', priority: 'Critical', progress: 100, status: 'Complete', timeline: 'Apr 21 - Apr 25', dependencies: 'None', isOverdue: false },
          { id: 'T8.2', name: 'Core module development', owner: 'Omar Ali', priority: 'Critical', progress: 70, status: 'In Progress', timeline: 'Apr 26 - Jun 05', dependencies: 'T8.1', isOverdue: false },
          { id: 'T8.3', name: 'Unit & integration tests', owner: 'Omar Ali', priority: 'High', progress: 25, status: 'In Progress', timeline: 'Jun 06 - Jun 30', dependencies: 'T8.2', isOverdue: false },
        ],
      },
      {
        id: 'T9', name: 'Sandbox Integration', owner: 'Noor Hassan', priority: 'Critical', progress: 45,
        status: 'At Risk', timeline: 'May 15 - Jul 25', dependencies: 'T8', isOverdue: true,
        subtasks: [
          { id: 'T9.1', name: 'Sandbox environment provisioning', owner: 'Noor Hassan', priority: 'High', progress: 100, status: 'Complete', timeline: 'May 15 - May 22', dependencies: 'None', isOverdue: false },
          { id: 'T9.2', name: 'Live data pilot', owner: 'Noor Hassan', priority: 'Critical', progress: 60, status: 'In Progress', timeline: 'May 23 - Jun 30', dependencies: 'T9.1', isOverdue: false },
          { id: 'T9.3', name: 'Partner acceptance review', owner: 'Noor Hassan', priority: 'High', progress: 20, status: 'At Risk', timeline: 'Jul 01 - Jul 25', dependencies: 'T9.2', isOverdue: true },
        ],
      },
      { id: 'T10', name: 'Partner Data Exchange Setup', owner: 'Youssef Ahmed', priority: 'High', progress: 20, status: 'Blocked', timeline: 'Jun 01 - Jul 10', dependencies: 'T8', isOverdue: false },
      { id: 'T11', name: 'Acceptance & Readiness Testing', owner: 'Maryam Khalil', priority: 'Medium', progress: 10, status: 'Not Started', timeline: 'Jul 26 - Aug 30', dependencies: 'T9, T10', isOverdue: false },
    ],
  },
];

const MOCK_CHANGE_RECORDS = [
  { id: 'CM-001', rationale: 'Partner feedback from feasibility review', description: 'Extend data-sharing scope to include real-time telemetry from partner systems', status: 'Completed', completedOn: '2026-03-05', actionTaken: 'Updated integration design and partner MOU; security review completed.' },
  { id: 'CM-002', rationale: 'Evaluation committee recommendation', description: 'Add a dedicated privacy-impact assessment step before sandbox rollout', status: 'In Progress', completedOn: '', actionTaken: 'Privacy assessment template drafted; scheduling review with Legal Affairs.' },
  { id: 'CM-003', rationale: 'Budget re-forecast', description: 'Reallocate AED 0.3M from documentation to additional sandbox compute capacity', status: 'Pending Approval', completedOn: '', actionTaken: 'Budget variance submitted to Finance for sign-off.' },
  { id: 'CM-004', rationale: 'Sandbox pilot scope change', description: 'Reduce pilot precincts from three to two to de-risk the initial rollout', status: 'Completed', completedOn: '2026-05-12', actionTaken: 'Updated rollout plan and stakeholder communications distributed.' },
];

// Arabic translations for the mock milestones / change records above, keyed by English value.
// Values are only translated at render time — status / priority strings stay English for logic.
const DETAILS_AR: Record<string, string> = {
  // Milestones
  'Idea & Feasibility': 'الفكرة ودراسة الجدوى',
  'Approval & Solution Design': 'الاعتماد وتصميم الحل',
  'Development & Sandbox Pilot': 'التطوير والتجربة في البيئة التجريبية',
  // Tasks
  'Landscape & Literature Review': 'مراجعة المشهد والأدبيات',
  'Prior art & patent scan': 'مسح التقنيات السابقة وبراءات الاختراع',
  'Stakeholder needs interviews': 'مقابلات احتياجات أصحاب المصلحة',
  'Feasibility findings memo': 'مذكرة نتائج دراسة الجدوى',
  'Feasibility Report': 'تقرير دراسة الجدوى',
  'Feasibility Sign-off': 'اعتماد دراسة الجدوى',
  'Solution Architecture': 'معمارية الحل',
  'Data & Integration Design': 'تصميم البيانات والتكامل',
  'Partner data-sharing model': 'نموذج مشاركة البيانات مع الشركاء',
  'Sandbox environment spec': 'مواصفات البيئة التجريبية',
  'Security & privacy review': 'مراجعة الأمن والخصوصية',
  'Governance Briefing Deck': 'عرض إحاطة الحوكمة',
  'Approval Board Review': 'مراجعة مجلس الاعتماد',
  'Core Build': 'البناء الأساسي',
  'Environment setup': 'تهيئة البيئة',
  'Core module development': 'تطوير الوحدات الأساسية',
  'Unit & integration tests': 'اختبارات الوحدات والتكامل',
  'Sandbox Integration': 'التكامل مع البيئة التجريبية',
  'Sandbox environment provisioning': 'تجهيز البيئة التجريبية',
  'Live data pilot': 'تجربة البيانات الحية',
  'Partner acceptance review': 'مراجعة قبول الشركاء',
  'Partner Data Exchange Setup': 'إعداد تبادل البيانات مع الشركاء',
  'Acceptance & Readiness Testing': 'اختبارات القبول والجاهزية',
  // People
  'Ahmed Khalil': 'أحمد خليل',
  'Layla Mohammed': 'ليلى محمد',
  'Sarah Ahmed': 'سارة أحمد',
  'Omar Ali': 'عمر علي',
  'Noor Hassan': 'نور حسن',
  'Youssef Ahmed': 'يوسف أحمد',
  'Maryam Khalil': 'مريم خليل',
  // Statuses & priorities
  'Complete': 'مكتمل',
  'In Progress': 'قيد التنفيذ',
  'At Risk': 'معرّض للخطر',
  'Blocked': 'متوقف',
  'Not Started': 'لم يبدأ',
  'Approved': 'معتمد',
  'Critical': 'حرج',
  'High': 'مرتفع',
  'Medium': 'متوسط',
  'Low': 'منخفض',
  'None': 'لا يوجد',
  // Milestone views
  'Tasks': 'المهام',
  'Kanban': 'كانبان',
  'Gantt': 'مخطط جانت',
  'Deliverables': 'المخرجات',
  // Change-impact types
  'Schedule': 'الجدول الزمني',
  'Budget': 'الميزانية',
  'Resources': 'الموارد',
  'Scope': 'النطاق',
  'Quality': 'الجودة',
  'Risk': 'المخاطر',
  'Stakeholders': 'أصحاب المصلحة',
  // Change records
  'Partner feedback from feasibility review': 'ملاحظات الشركاء من مراجعة دراسة الجدوى',
  'Extend data-sharing scope to include real-time telemetry from partner systems': 'توسيع نطاق مشاركة البيانات ليشمل القياس عن بُعد الآني من أنظمة الشركاء',
  'Updated integration design and partner MOU; security review completed.': 'تم تحديث تصميم التكامل ومذكرة التفاهم مع الشريك، واستكمال المراجعة الأمنية.',
  'Evaluation committee recommendation': 'توصية لجنة التقييم',
  'Add a dedicated privacy-impact assessment step before sandbox rollout': 'إضافة خطوة مخصصة لتقييم الأثر على الخصوصية قبل الإطلاق في البيئة التجريبية',
  'Privacy assessment template drafted; scheduling review with Legal Affairs.': 'تمت صياغة نموذج تقييم الخصوصية، وجارٍ تحديد موعد المراجعة مع الشؤون القانونية.',
  'Budget re-forecast': 'إعادة توقع الميزانية',
  'Reallocate AED 0.3M from documentation to additional sandbox compute capacity': 'إعادة تخصيص 0.3 مليون درهم من التوثيق إلى قدرة حاسوبية إضافية للبيئة التجريبية',
  'Budget variance submitted to Finance for sign-off.': 'تم رفع فرق الميزانية إلى الإدارة المالية للاعتماد.',
  'Sandbox pilot scope change': 'تغيير نطاق التجربة في البيئة التجريبية',
  'Reduce pilot precincts from three to two to de-risk the initial rollout': 'تقليص المراكز التجريبية من ثلاثة إلى اثنين للحد من مخاطر الإطلاق الأولي',
  'Updated rollout plan and stakeholder communications distributed.': 'تم تحديث خطة الإطلاق وتوزيع المراسلات على أصحاب المصلحة.',
};

const MONTHS_AR: Record<string, string> = {
  Jan: 'يناير', Feb: 'فبراير', Mar: 'مارس', Apr: 'أبريل', May: 'مايو', Jun: 'يونيو',
  Jul: 'يوليو', Aug: 'أغسطس', Sep: 'سبتمبر', Oct: 'أكتوبر', Nov: 'نوفمبر', Dec: 'ديسمبر',
};

/** 'Feb 10, 2026' -> '10 فبراير 2026'; 'Jan 05 - Jan 18' -> '05 يناير - 18 يناير' */
function dateAr(s: string): string {
  return s.replace(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{1,2})(?:, (\d{4}))?/g,
    (_, m: string, d: string, y?: string) => `${d} ${MONTHS_AR[m]}${y ? ` ${y}` : ''}`);
}

/** Hook returning a translator for this page's mock data (page dictionary first, then the Sandbox dictionary). */
function useDetailsTr() {
  const { lang } = useLanguage();
  return {
    td: (en: string) => (lang === 'ar' ? DETAILS_AR[en] ?? SANDBOX_AR[en] ?? en : en),
    tdate: (en: string) => (lang === 'ar' ? dateAr(en) : en),
  };
}

function getPriorityColor(priority: string) {
  switch (priority) {
    case 'Critical': return '#D83731';
    case 'High': return '#FF9800';
    case 'Medium': return '#F2A200';
    case 'Low': return '#357743';
    default: return '#6b7280';
  }
}
function getTaskStatusColor(status: string) {
  switch (status) {
    case 'Complete': return '#357743';
    case 'In Progress': return '#008755';
    case 'At Risk': return '#F2A200';
    case 'Blocked': return '#D83731';
    case 'Not Started': return '#6b7280';
    default: return '#6b7280';
  }
}

export function SandboxProjectDetailsPage({ project, store, onBack, onNavigate }: PageProps) {
  const [infoExpanded, setInfoExpanded] = useState(true);
  const [healthExpanded, setHealthExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState<DetailTab>('overview');

  // Milestones & Tasks tab state
  const [milestoneView, setMilestoneView] = useState<'Tasks' | 'Kanban' | 'Gantt' | 'Deliverables'>('Tasks');
  const [ownerFilter, setOwnerFilter] = useState('all');
  const [expandedMilestones, setExpandedMilestones] = useState<string[]>(['M1', 'M2']);
  const [expandedTasks, setExpandedTasks] = useState<string[]>([]);
  const [showAddTaskPanel, setShowAddTaskPanel] = useState(false);
  const [showAddMilestonePanel, setShowAddMilestonePanel] = useState(false);
  const [selectedMilestoneForTask, setSelectedMilestoneForTask] = useState('');

  // Change Management tab state
  const [showAddChangePanel, setShowAddChangePanel] = useState(false);
  const [impactAssessments, setImpactAssessments] = useState([{ id: '1', impactType: '', details: '', preChange: '', postChange: '' }]);

  const { tr, isRTL } = useLanguage();
  const ts = useSandboxTr();
  const { td, tdate } = useDetailsTr();
  const fmtMoney = (v: number) => tr(money(v), `${v.toFixed(1)} مليون درهم`);
  const stagesComplete = (n: number) => tr(`${n} of ${STAGES.length} stages complete`, `اكتملت ${n} من ${STAGES.length} مراحل`);
  const scored = (n: number) => tr(`Scored ${n}/100`, `الدرجة ${n}/100`);

  const t = TYPES[project.type];
  const stageIndex = STAGES.indexOf(project.stage);
  const progress = Math.round(((stageIndex + 1) / STAGES.length) * 100);

  const forecast = project.status === 'Delayed'
    ? { label: tr('Delayed — Reassess Timeline', 'متأخر — إعادة تقييم الجدول الزمني'), color: '#bd3826', icon: TrendingDown, detail: stagesComplete(stageIndex + 1) }
    : project.stage === 'Sandbox' || project.status === 'Completed'
    ? { label: tr('On Track — Sandbox Reached', 'على المسار — تم الوصول إلى البيئة التجريبية'), color: '#008755', icon: TrendingUp, detail: tr('Final stage of the pipeline', 'المرحلة الأخيرة من مسار العمل') }
    : { label: tr('On Track — In Progress', 'على المسار — قيد التنفيذ'), color: '#008755', icon: TrendingUp, detail: stagesComplete(stageIndex + 1) };

  const contribution = project.score === null
    ? { label: tr('Pending Evaluation', 'بانتظار التقييم'), color: '#a8710d', detail: tr('Not yet scored', 'لم يتم التقييم بعد') }
    : project.score >= 85
    ? { label: tr('High Impact', 'أثر مرتفع'), color: '#008755', detail: scored(project.score) }
    : project.score >= 70
    ? { label: tr('Solid Contribution', 'مساهمة جيدة'), color: '#008755', detail: scored(project.score) }
    : { label: tr('Needs Improvement', 'يحتاج إلى تحسين'), color: '#a8710d', detail: scored(project.score) };

  const recommendation = !project.evaluator
    ? tr('Assign an Evaluator', 'تعيين مُقيّم')
    : project.status === 'Pending Approval'
    ? tr('Progress to Approval Review', 'الانتقال إلى مراجعة الاعتماد')
    : project.status === 'Delayed'
    ? tr('Reallocate Resources', 'إعادة تخصيص الموارد')
    : tr('Continue Current Plan', 'مواصلة الخطة الحالية');

  const linkedIp = project.ip.map(name => IP_REGISTER.find(x => x.title === name)).filter(Boolean) as typeof IP_REGISTER;
  const linkedPartners = project.partners.map(name => PARTNERS.find(p => p.name === name)).filter(Boolean) as typeof PARTNERS;

  const uniqueOwners = Array.from(new Set(
    MOCK_MILESTONES.flatMap(m => m.tasks.flatMap(task => [task.owner, ...(task.subtasks?.map(s => s.owner) ?? [])])),
  )).sort();

  const filteredMilestones = ownerFilter === 'all'
    ? MOCK_MILESTONES
    : MOCK_MILESTONES.map(m => ({
        ...m,
        tasks: m.tasks
          .filter(task => task.owner === ownerFilter || task.subtasks?.some(s => s.owner === ownerFilter))
          .map(task => ({ ...task, subtasks: task.subtasks?.filter(s => s.owner === ownerFilter) })),
      })).filter(m => m.tasks.length > 0);

  const toggleMilestone = (id: string) => setExpandedMilestones(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);
  const toggleTask = (id: string) => setExpandedTasks(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  // Display copy of the milestones for Kanban / Gantt views — only text is translated;
  // status / priority stay English because those views group and colour by them.
  const localize = <T extends SubTask>(task: T): T => ({ ...task, name: td(task.name), owner: td(task.owner), timeline: tdate(task.timeline) });
  const displayMilestones = filteredMilestones.map(m => ({
    ...m,
    name: td(m.name),
    dueDate: tdate(m.dueDate),
    tasks: m.tasks.map(task => ({ ...localize(task), subtasks: task.subtasks?.map(localize) })),
  }));

  return (
    <div className="p-5 mx-auto space-y-4">
      {/* Banner */}
      <div className="rounded-2xl text-white shadow-lg relative overflow-hidden p-5" style={{ backgroundImage: `linear-gradient(${isRTL ? 245 : 115}deg, ${ACCENT_GRADIENT_TO}, ${ACCENT_GRADIENT_FROM})` }}>
        <img src={heroDecoration} alt="" className="absolute -top-16 -end-16 h-140 w-140 rounded-full object-cover opacity-50 pointer-events-none select-none" />
        <div className="relative z-10 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="h-9 w-9 rounded-lg hover:bg-white/15 flex items-center justify-center transition-colors flex-shrink-0">
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            </button>
            <div className="h-6 w-px bg-white/30" />
            <div>
              <h1 className="text-xl   leading-tight">{ts(project.name)}</h1>
              <p className="text-white/85 text-sm mt-1">{project.id} · {ts(project.dept)}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setInfoExpanded(v => !v)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/40 px-3.5 py-2 text-sm   hover:bg-white/15 transition-colors"
            >
              <Info className="h-3.5 w-3.5" /> {tr('Project Info', 'معلومات المشروع')}
            </button>
            <button
              onClick={() => {
                toast.success(tr('Project report exported', 'تم تصدير تقرير المشروع'));
                store.addAudit({ title: 'Project report exported', detail: `${project.name} exported by Mohammed Hassan`, kind: 'warn' });
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/40 px-3.5 py-2 text-sm   hover:bg-white/15 transition-colors"
            >
              <Download className="h-3.5 w-3.5" /> {tr('Export Report', 'تصدير التقرير')}
            </button>
          </div>
        </div>
      </div>

      {/* Project Info strip */}
      {infoExpanded && (
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-4">
            <Field label={tr('Status', 'الحالة')}><Badge className={`${STATUS_META[project.status].badgeClass} border-0 w-fit`}>{ts(project.status)}</Badge></Field>
            <Field label={tr('Type', 'النوع')}><Badge className={`${t.badgeClass} border-0 w-fit`}>{ts(t.label)}</Badge></Field>
            <Field label={tr('Classification', 'التصنيف')}>{project.cls === '—' ? <span className="text-sm text-muted-foreground">—</span> : <Badge className="bg-violet-50 text-violet-700 border-0 w-fit">{ts(project.cls)}</Badge>}</Field>
            <Field label={tr('Department', 'الإدارة')}><p className="text-sm font-medium">{ts(project.dept)}</p></Field>
            <Field label={tr('Budget', 'الميزانية')}><p className="text-sm  ">{fmtMoney(project.budget)}</p></Field>
            <Field label={tr('Timeline', 'الجدول الزمني')}><p className="text-sm font-medium">{project.start} – {project.end}</p></Field>
            <Field label={tr('Stage', 'المرحلة')}><p className="text-sm font-medium">{ts(project.stage)}</p></Field>
            <Field label={tr('Stage Progress', 'تقدم المرحلة')}>
              <div className="flex items-center gap-2">
                <Progress value={progress} className="h-2 flex-1 max-w-[90px]" indicatorColor={ACCENT} />
                <span className="text-sm font-medium whitespace-nowrap">{progress}%</span>
              </div>
            </Field>
            <Field label={tr('Evaluator', 'المُقيّم')}><p className="text-sm font-medium">{project.evaluator ? ts(project.evaluator) : <span className="text-amber-600">{tr('Unassigned', 'غير معيّن')}</span>}</p></Field>
            <Field label={tr('Evaluation Score', 'درجة التقييم')}><p className="text-sm  ">{project.score ? `${project.score}/100` : '—'}</p></Field>
          </div>
        </div>
      )}

      {/* AI-style intelligence summary */}
      <div className="bg-gradient-to-r rtl:bg-gradient-to-l from-[#008755]/5 to-white border border-[#008755]/30 rounded-xl p-4">
        <div className="flex items-center justify-between cursor-pointer" onClick={() => setHealthExpanded(v => !v)}>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#008755]" />
            <h3 className="text-sm  ">{tr('Project Intelligence Summary', 'ملخص ذكاء المشروع')}</h3>
            <Badge className="bg-[#008755]/10 text-[#008755] border-0 text-sm">{tr('INTELLIGENCE LAYER', 'طبقة الذكاء')}</Badge>
          </div>
          {healthExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
        </div>

        {healthExpanded && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            <InsightTile icon={forecast.icon} color={forecast.color} label={tr('Stage Forecast', 'توقع المرحلة')} value={forecast.label} detail={forecast.detail} />
            <InsightTile icon={Target} color={contribution.color} label={tr('Strategic Contribution', 'المساهمة الاستراتيجية')} value={contribution.label} detail={contribution.detail} />
            <InsightTile icon={Lightbulb} color="#a8710d" label={tr('Recommended Action', 'الإجراء الموصى به')} value={recommendation} detail={tr('Based on current status', 'بناءً على الحالة الحالية')} />
          </div>
        )}
      </div>

      {/* Tab bar */}
      <div className="bg-card border border-border rounded-xl px-2">
        <div className="flex items-center gap-1 overflow-x-auto">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  'flex items-center gap-2 px-4 py-3 border-b-2 text-sm font-medium whitespace-nowrap transition-colors',
                  active ? "border-[#008755] text-[#008755]   bg-[#008755]/5" : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/40',
                )}
              >
                <Icon className="h-3.5 w-3.5" /> {tr(tab.label, tab.labelAr)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      <div className="bg-card border border-border rounded-xl p-5 min-h-[380px]">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">
            <div className="space-y-4">
              <div className="flex items-center gap-6 flex-wrap bg-muted/30 rounded-xl p-4">
                <div className="relative h-28 w-28 flex-shrink-0">
                  <svg viewBox="0 0 100 100" className="-rotate-90 h-full w-full">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke={ACCENT} strokeWidth="10" strokeLinecap="round" strokeDasharray={`${progress * 2.513} 251.3`} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl  ">{progress}%</span>
                    <span className="text-sm text-muted-foreground">{tr('Complete', 'مكتمل')}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-[220px]">
                  <h3 className="text-sm   mb-1">{tr('Stage progress', 'تقدم المرحلة')} — {ts(project.stage)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{ts(project.desc)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <StatTile icon={Wallet} label={tr('Budget', 'الميزانية')} value={fmtMoney(project.budget)} />
                <StatTile icon={Calendar} label={tr('Timeline', 'الجدول الزمني')} value={`${project.start} – ${project.end}`} />
                <StatTile icon={Building2} label={tr('Department', 'الإدارة')} value={ts(project.dept)} />
              </div>
            </div>

            <div className="bg-muted/30 rounded-xl p-4 space-y-3.5 h-fit">
              <h3 className="text-sm   border-b border-border pb-2.5">{tr('Project Details', 'تفاصيل المشروع')}</h3>
              <DetailRow icon={FileText} label={tr('Evaluator', 'المُقيّم')} value={project.evaluator ? ts(project.evaluator) : tr('Unassigned', 'غير معيّن')} />
              <DetailRow icon={ClipboardCheck} label={tr('Evaluation Score', 'درجة التقييم')} value={project.score ? `${project.score}/100` : tr('Pending', 'قيد الانتظار')} />
              <DetailRow icon={Users} label={tr('Linked Partners', 'الشركاء المرتبطون')} value={String(linkedPartners.length)} />
              <DetailRow icon={Shield} label={tr('Linked IP Assets', 'أصول الملكية الفكرية المرتبطة')} value={String(linkedIp.length)} />
              <DetailRow icon={Layers} label={tr('Classification', 'التصنيف')} value={project.cls === '—' ? tr('Not classified', 'غير مصنّف') : ts(project.cls)} />
            </div>
          </div>
        )}

        {activeTab === 'card' && (
          <ProjectCardTab
            project={project}
            cardNumber={store.projects.findIndex(p => p.id === project.id) + 1}
            onExport={() => {
              toast.success(tr('Project card exported', 'تم تصدير بطاقة المشروع'));
              store.addAudit({ title: 'Project card exported', detail: `${project.name} card exported by Mohammed Hassan`, kind: 'warn' });
            }}
          />
        )}

        {activeTab === 'biweekly' && <BiWeeklyStatusTab />}

        {activeTab === 'milestones' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="text-base   text-foreground">{tr('Project Milestones & Tasks', 'مراحل المشروع والمهام')}</h2>
              <div className="flex items-center gap-3 flex-wrap">
                <Select value={ownerFilter} onValueChange={setOwnerFilter}>
                  <SelectTrigger className="w-[180px] h-9 text-sm"><SelectValue placeholder={tr('All Owners', 'جميع المسؤولين')} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{tr('All Owners', 'جميع المسؤولين')}</SelectItem>
                    {uniqueOwners.map(owner => <SelectItem key={owner} value={owner}>{td(owner)}</SelectItem>)}
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg">
                  {(['Tasks', 'Kanban', 'Gantt', 'Deliverables'] as const).map(view => (
                    <button
                      key={view}
                      onClick={() => setMilestoneView(view)}
                      className={cn('px-3 py-1 text-sm rounded-md transition-colors',
                        milestoneView === view ? "bg-white text-[#008755]   shadow-sm" : 'text-muted-foreground hover:text-foreground')}
                    >
                      {td(view)}
                    </button>
                  ))}
                </div>
                <Button size="sm" className="bg-[#008755] hover:bg-[#005844] text-white" onClick={() => setShowAddMilestonePanel(true)}>
                  <Plus className="h-3.5 w-3.5 me-1.5" /> {tr('Add Milestone', 'إضافة مرحلة')}
                </Button>
              </div>
            </div>

            {milestoneView === 'Tasks' ? (
              <div className="space-y-3">
                {filteredMilestones.map(milestone => (
                  <div key={milestone.id} className="border border-border rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between py-3 px-3">
                      <div className="flex items-center gap-3 flex-1 cursor-pointer hover:bg-muted/30 transition-colors -m-3 p-3 rounded" onClick={() => toggleMilestone(milestone.id)}>
                        {expandedMilestones.includes(milestone.id) ? <ChevronDown className="h-4 w-4 text-[#008755] flex-shrink-0" /> : <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0 rtl:rotate-180" />}
                        <h3 className="text-sm   text-foreground">{td(milestone.name)}</h3>
                        <Badge style={{ backgroundColor: `${getTaskStatusColor(milestone.status)}20`, color: getTaskStatusColor(milestone.status) }} className="text-sm border-0">{td(milestone.status)}</Badge>
                        {milestone.id === 'M3' && (
                          <Badge className="bg-[#D83731]/10 text-[#D83731] text-sm border-0 flex items-center gap-1">{tr('AI: 5w delay risk', 'الذكاء الاصطناعي: خطر تأخير 5 أسابيع')}</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="hidden sm:flex items-center gap-2">
                          <Progress value={milestone.completion} className="h-2 w-[80px]" indicatorColor={ACCENT} />
                          <span className="text-sm   w-9">{milestone.completion}%</span>
                        </div>
                        <span className="hidden md:flex items-center gap-1 text-sm text-muted-foreground"><Calendar className="h-3 w-3" />{tdate(milestone.dueDate)}</span>
                        <Badge variant="outline" className="text-sm">{milestone.tasks.length} {tr('tasks', 'مهام')}</Badge>
                        <button
                          onClick={(e) => { e.stopPropagation(); setSelectedMilestoneForTask(milestone.id); setShowAddTaskPanel(true); }}
                          className="text-sm font-medium text-[#008755] hover:bg-[#008755]/10 rounded-md px-2 py-1 transition-colors"
                        >
                          <Plus className="h-3 w-3 inline me-1" />{tr('Add Task', 'إضافة مهمة')}
                        </button>
                      </div>
                    </div>

                    {expandedMilestones.includes(milestone.id) && (
                      <div className="border-t border-border overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border bg-muted/30 text-muted-foreground">
                              <th className="w-7"></th>
                              <th className="text-start py-2 px-2 font-medium">{tr('Task', 'المهمة')}</th>
                              <th className="text-start py-2 px-2 font-medium">{tr('Owner', 'المسؤول')}</th>
                              <th className="text-start py-2 px-2 font-medium">{tr('Priority', 'الأولوية')}</th>
                              <th className="text-start py-2 px-2 font-medium">{tr('Progress', 'التقدم')}</th>
                              <th className="text-start py-2 px-2 font-medium">{tr('Status', 'الحالة')}</th>
                              <th className="text-start py-2 px-2 font-medium">{tr('Timeline', 'الجدول الزمني')}</th>
                              <th className="text-start py-2 px-2 font-medium">{tr('Predecessors', 'المهام السابقة')}</th>
                              <th className="text-start py-2 px-2 font-medium">{tr('Actions', 'الإجراءات')}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {milestone.tasks.map(task => (
                              <TaskRow key={task.id} task={task} expandedTasks={expandedTasks} toggleTask={toggleTask} />
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : milestoneView === 'Kanban' ? (
              <KanbanView mockMilestones={displayMilestones} getPriorityColor={getPriorityColor} getStatusColor={getTaskStatusColor} />
            ) : milestoneView === 'Gantt' ? (
              <GanttView mockMilestones={displayMilestones} getPriorityColor={getPriorityColor} getStatusColor={getTaskStatusColor} />
            ) : (
              <EmptyState icon={FolderCheck} text={tr('Deliverables tracking for this project will be available in a future release.', 'سيتوفر تتبع مخرجات هذا المشروع في إصدار قادم.')} actionLabel={tr('Back to Tasks', 'العودة إلى المهام')} onAction={() => setMilestoneView('Tasks')} />
            )}
          </div>
        )}

        {activeTab === 'risk' && <RiskRegisterTab />}
        {activeTab === 'stakeholders' && <StakeholdersTab />}
        {activeTab === 'goals' && <GoalsBenefitsTab strategicPillar={ts(t.full)} />}

        {activeTab === 'evaluation' && (
          project.score !== null ? (
            <div className="max-w-lg">
              <h3 className="text-sm  ">{tr('Evaluation Breakdown', 'تفاصيل التقييم')}</h3>
              <p className="text-sm text-muted-foreground mb-4">{tr(`Scored against ${t.full} criteria · Evaluated by ${project.evaluator}`, `مُقيّم وفق معايير ${ts(t.full)} · قيّمه ${ts(project.evaluator ?? '')}`)}</p>
              <div className="space-y-3">
                {CRITERIA[project.type].map(([label], i) => {
                  const v = Math.max(35, Math.min(100, (project.score as number) + CRITERIA_OFFSETS[i]));
                  return (
                    <div key={label} className="flex items-center gap-3 text-sm">
                      <span className="w-40 flex-shrink-0 text-foreground/80 truncate">{ts(label)}</span>
                      <Progress value={v} className="flex-1 h-2" indicatorColor={ACCENT} />
                      <span className="w-8 text-end  ">{v}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <EmptyState
              icon={ClipboardCheck}
              text={tr('This project has not been evaluated yet.', 'لم يتم تقييم هذا المشروع بعد.')}
              actionLabel={tr('Open Evaluation Register', 'فتح سجل التقييم')}
              onAction={() => onNavigate('evaluation')}
            />
          )
        )}

        {activeTab === 'kpis' && <KPIsTab />}

        {activeTab === 'partners' && (
          linkedPartners.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
              {linkedPartners.map(p => (
                <div key={p.name} className="flex items-center gap-3 border border-border rounded-lg p-3">
                  <span
                    className="h-9 w-9 rounded-lg flex-shrink-0 flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundImage: `linear-gradient(135deg, ${p.gradientFrom}, ${p.gradientTo})` }}
                  >
                    {p.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm   truncate">{ts(p.name)}</p>
                    <p className="text-sm text-muted-foreground">{ts(p.type)} · {ts(p.country)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState icon={Handshake} text={tr('No partners linked to this project.', 'لا يوجد شركاء مرتبطون بهذا المشروع.')} actionLabel={tr('Browse Partners', 'تصفح الشركاء')} onAction={() => onNavigate('partners')} />
          )
        )}

        {activeTab === 'ip' && (
          linkedIp.length ? (
            <div className="space-y-2.5 max-w-2xl">
              {linkedIp.map(item => (
                <div key={item.title} className="flex items-center gap-3 border border-border rounded-lg p-3">
                  <div className="h-9 w-9 rounded-lg bg-[#008755]/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-4 w-4 text-[#008755]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm   truncate">{ts(item.title)}</p>
                    <p className="text-sm text-muted-foreground">{ts(item.kind)} · {tr('Filed', 'أُودعت في')} {item.filed}</p>
                  </div>
                  <Badge className={cn('border-0 text-sm', item.status === 'Granted' ? 'bg-[#008755]/10 text-[#008755]' : 'bg-blue-50 text-blue-700')}>{ts(item.status)}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState icon={Shield} text={tr('No IP has been filed from this project yet.', 'لم تُودع أي ملكية فكرية من هذا المشروع بعد.')} actionLabel={tr('View IP Register', 'عرض سجل الملكية الفكرية')} onAction={() => onNavigate('ip')} />
          )
        )}

        {activeTab === 'change-management' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base   text-foreground">{tr('Change Management', 'إدارة التغيير')}</h2>
              <Button
                size="sm"
                className="bg-[#008755] hover:bg-[#005844] text-white"
                onClick={() => { setImpactAssessments([{ id: '1', impactType: '', details: '', preChange: '', postChange: '' }]); setShowAddChangePanel(true); }}
              >
                <Plus className="h-3.5 w-3.5 me-1.5" /> {tr('Add Change', 'إضافة تغيير')}
              </Button>
            </div>
            <div className="border border-border rounded-xl overflow-hidden overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30 text-muted-foreground">
                    <th className="text-start py-2.5 px-3 font-medium">{tr('Rationale', 'المبرر')}</th>
                    <th className="text-start py-2.5 px-3 font-medium">{tr('Description', 'الوصف')}</th>
                    <th className="text-start py-2.5 px-3 font-medium">{tr('Status', 'الحالة')}</th>
                    <th className="text-start py-2.5 px-3 font-medium">{tr('Completed', 'تاريخ الإنجاز')}</th>
                    <th className="text-start py-2.5 px-3 font-medium">{tr('Action Taken', 'الإجراء المتخذ')}</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_CHANGE_RECORDS.map(record => (
                    <tr key={record.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="py-2.5 px-3">{td(record.rationale)}</td>
                      <td className="py-2.5 px-3 text-muted-foreground">{td(record.description)}</td>
                      <td className="py-2.5 px-3">
                        <Badge className={cn('border-0 text-sm',
                          record.status === 'Completed' ? 'bg-[#008755]/10 text-[#008755]' : record.status === 'In Progress' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700')}>
                          {td(record.status)}
                        </Badge>
                      </td>
                      <td className="py-2.5 px-3 text-muted-foreground">{record.completedOn || tr('N/A', 'غير متاح')}</td>
                      <td className="py-2.5 px-3 text-muted-foreground">{td(record.actionTaken)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'closure' && <ProjectClosureTab />}
        {activeTab === 'documents' && <CollaborationTab />}
      </div>

      {/* Add Task Panel */}
      <AddTaskPanel
        isOpen={showAddTaskPanel}
        onClose={() => setShowAddTaskPanel(false)}
        projectName={ts(project.name)}
        milestoneId={selectedMilestoneForTask}
        milestoneName={td(MOCK_MILESTONES.find(m => m.id === selectedMilestoneForTask)?.name || '')}
      />

      {/* Add Milestone Panel */}
      <AddMilestonePanel
        isOpen={showAddMilestonePanel}
        onClose={() => setShowAddMilestonePanel(false)}
        projectName={ts(project.name)}
      />

      {/* Add Change Panel */}
      {showAddChangePanel && (
        <>
          <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setShowAddChangePanel(false)} />
          <div className={cn('fixed end-0 top-0 h-full w-[560px] max-w-[94vw] bg-white shadow-2xl z-50 flex flex-col animate-in duration-300', isRTL ? 'slide-in-from-left' : 'slide-in-from-right')}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="text-lg   text-[#008755]">{tr('Add Change Request', 'إضافة طلب تغيير')}</h2>
              <button onClick={() => setShowAddChangePanel(false)} className="h-8 w-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="text-sm   text-foreground mb-2 block">{tr('Rationale', 'المبرر')} <span className="text-[#D83731]">*</span></label>
                  <input type="text" placeholder={tr('Enter the reason for this change', 'أدخل سبب هذا التغيير')} className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#008755] focus:border-transparent" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm   text-foreground mb-2 block">{tr('Description', 'الوصف')} <span className="text-[#D83731]">*</span></label>
                  <textarea placeholder={tr('Provide detailed description of the change', 'قدّم وصفاً تفصيلياً للتغيير')} rows={4} className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#008755] focus:border-transparent resize-none" />
                </div>
                <div>
                  <label className="text-sm   text-foreground mb-2 block">{tr('Status', 'الحالة')} <span className="text-[#D83731]">*</span></label>
                  <select className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#008755] focus:border-transparent">
                    <option value="">{tr('Select status', 'اختر الحالة')}</option>
                    {['Pending Approval', 'Approved', 'In Progress', 'Completed', 'Rejected'].map(o => (
                      <option key={o} value={o}>{td(o)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm   text-foreground mb-2 block">{tr('Completed On', 'تاريخ الإنجاز')}</label>
                  <input type="date" className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#008755] focus:border-transparent" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm   text-foreground mb-2 block">{tr('Action Taken', 'الإجراء المتخذ')} <span className="text-[#D83731]">*</span></label>
                  <textarea placeholder={tr('Describe the actions taken or planned for this change', 'صف الإجراءات المتخذة أو المخطط لها لهذا التغيير')} rows={3} className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#008755] focus:border-transparent resize-none" />
                </div>

                <div className="border-t border-border pt-5 mt-2 md:col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm   text-foreground">{tr('Impact Assessment', 'تقييم الأثر')}</h3>
                    <Button
                      size="sm" variant="outline" className="text-[#008755] border-[#008755] hover:bg-[#008755]/10"
                      onClick={() => setImpactAssessments(prev => [...prev, { id: Date.now().toString(), impactType: '', details: '', preChange: '', postChange: '' }])}
                    >
                      <Plus className="h-3.5 w-3.5 me-1" /> {tr('Add New', 'إضافة جديد')}
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {impactAssessments.map((assessment, index) => (
                      <div key={assessment.id} className="border border-border rounded-lg bg-muted/20 p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm   text-[#008755]">{tr('Impact', 'الأثر')} #{index + 1}</span>
                          {impactAssessments.length > 1 && (
                            <button
                              onClick={() => setImpactAssessments(prev => prev.filter((_, i) => i !== index))}
                              className="h-6 w-6 rounded flex items-center justify-center text-[#D83731] hover:bg-[#D83731]/10 transition-colors"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm   text-foreground mb-1 block">{tr('Impact Type', 'نوع الأثر')}</label>
                            <select className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#008755] focus:border-transparent">
                              <option value="">{tr('Select type', 'اختر النوع')}</option>
                              {['Schedule', 'Budget', 'Resources', 'Scope', 'Quality', 'Risk', 'Stakeholders'].map(o => (
                                <option key={o} value={o}>{td(o)}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="text-sm   text-foreground mb-1 block">{tr('Details', 'التفاصيل')}</label>
                            <input type="text" placeholder={tr('Describe the impact', 'صف الأثر')} className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#008755] focus:border-transparent" />
                          </div>
                          <div>
                            <label className="text-sm   text-foreground mb-1 block">{tr('Pre Change', 'قبل التغيير')}</label>
                            <input type="text" placeholder={tr('State before change', 'الوضع قبل التغيير')} className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#008755] focus:border-transparent" />
                          </div>
                          <div>
                            <label className="text-sm   text-foreground mb-1 block">{tr('Post Change', 'بعد التغيير')}</label>
                            <input type="text" placeholder={tr('Expected state after change', 'الوضع المتوقع بعد التغيير')} className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#008755] focus:border-transparent" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-muted/20">
              <Button variant="outline" onClick={() => setShowAddChangePanel(false)}>{tr('Cancel', 'إلغاء')}</Button>
              <Button
                className="bg-[#008755] hover:bg-[#005844] text-white"
                onClick={() => {
                  toast.success(tr('Change request submitted', 'تم تقديم طلب التغيير'));
                  store.addAudit({ title: 'Change request submitted', detail: `New change request logged against ${project.name}`, kind: 'info' });
                  setShowAddChangePanel(false);
                }}
              >
                {tr('Submit Change Request', 'تقديم طلب التغيير')}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function TaskRow({ task, expandedTasks, toggleTask }: { task: TaskItem; expandedTasks: string[]; toggleTask: (id: string) => void }) {
  const { tr } = useLanguage();
  const { td, tdate } = useDetailsTr();
  return (
    <>
      <tr className={cn('border-b border-border last:border-0 hover:bg-muted/30 transition-colors', task.isOverdue && 'bg-red-50/60')}>
        <td className="py-2 px-2">
          {task.subtasks?.length ? (
            <button onClick={() => toggleTask(task.id)} className="h-4 w-4 flex items-center justify-center hover:bg-muted rounded">
              {expandedTasks.includes(task.id) ? <ChevronDown className="h-3.5 w-3.5 text-[#008755]" /> : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground rtl:rotate-180" />}
            </button>
          ) : (
            <GripVertical className="h-3.5 w-3.5 text-muted-foreground" />
          )}
        </td>
        <td className="py-2 px-2">
          <div className="flex items-center gap-2">
            <span className={cn(task.isOverdue ? "text-[#D83731]  " : 'text-foreground')}>{td(task.name)}</span>
            {task.isOverdue && <Badge variant="destructive" className="text-[9.5px]">{tr('Overdue', 'متأخرة')}</Badge>}
            {!!task.subtasks?.length && <Badge variant="outline" className="text-[9.5px] text-muted-foreground">{task.subtasks.length} {tr('subtasks', 'مهام فرعية')}</Badge>}
          </div>
        </td>
        <td className="py-2 px-2 text-foreground">{td(task.owner)}</td>
        <td className="py-2 px-2"><Badge style={{ backgroundColor: `${getPriorityColor(task.priority)}20`, color: getPriorityColor(task.priority) }} className="text-sm border-0">{td(task.priority)}</Badge></td>
        <td className="py-2 px-2">
          <div className="flex items-center gap-2">
            <Progress value={task.progress} className="h-1.5 w-[56px]" indicatorColor={getTaskStatusColor(task.status)} />
            <span className="text-sm">{task.progress}%</span>
          </div>
        </td>
        <td className="py-2 px-2"><Badge style={{ backgroundColor: `${getTaskStatusColor(task.status)}20`, color: getTaskStatusColor(task.status) }} className="text-sm border-0">{td(task.status)}</Badge></td>
        <td className="py-2 px-2 text-muted-foreground whitespace-nowrap">{tdate(task.timeline)}</td>
        <td className="py-2 px-2">
          {task.dependencies === 'None'
            ? <span className="text-muted-foreground">{tr('None', 'لا يوجد')}</span>
            : <span className="text-[#008755] flex items-center gap-1"><Link2 className="h-3 w-3" />{task.dependencies}</span>}
        </td>
        <td className="py-2 px-2">
          <div className="flex items-center gap-0.5">
            <button title={tr('View', 'عرض')} aria-label={tr('View', 'عرض')} className="h-6 w-6 rounded flex items-center justify-center hover:bg-muted"><Eye className="h-3.5 w-3.5 text-muted-foreground" /></button>
            <button title={tr('Edit', 'تعديل')} aria-label={tr('Edit', 'تعديل')} className="h-6 w-6 rounded flex items-center justify-center hover:bg-muted"><Edit className="h-3.5 w-3.5 text-muted-foreground" /></button>
            <button title={tr('Delete', 'حذف')} aria-label={tr('Delete', 'حذف')} className="h-6 w-6 rounded flex items-center justify-center hover:bg-[#D83731]/10"><Trash2 className="h-3.5 w-3.5 text-[#D83731]" /></button>
          </div>
        </td>
      </tr>
      {task.subtasks?.length && expandedTasks.includes(task.id) && task.subtasks.map(sub => (
        <tr key={sub.id} className={cn('border-b border-border last:border-0 bg-muted/20 hover:bg-muted/40 transition-colors', sub.isOverdue && 'bg-red-50/60')}>
          <td className="py-2 px-2" />
          <td className="py-2 px-2 ps-7">
            <div className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
              <span className={cn(sub.isOverdue ? "text-[#D83731]  " : 'text-foreground')}>{td(sub.name)}</span>
              {sub.isOverdue && <Badge variant="destructive" className="text-[9.5px]">{tr('Overdue', 'متأخرة')}</Badge>}
            </div>
          </td>
          <td className="py-2 px-2 text-foreground">{td(sub.owner)}</td>
          <td className="py-2 px-2"><Badge style={{ backgroundColor: `${getPriorityColor(sub.priority)}20`, color: getPriorityColor(sub.priority) }} className="text-sm border-0">{td(sub.priority)}</Badge></td>
          <td className="py-2 px-2">
            <div className="flex items-center gap-2">
              <Progress value={sub.progress} className="h-1.5 w-[56px]" indicatorColor={getTaskStatusColor(sub.status)} />
              <span className="text-sm">{sub.progress}%</span>
            </div>
          </td>
          <td className="py-2 px-2"><Badge style={{ backgroundColor: `${getTaskStatusColor(sub.status)}20`, color: getTaskStatusColor(sub.status) }} className="text-sm border-0">{td(sub.status)}</Badge></td>
          <td className="py-2 px-2 text-muted-foreground whitespace-nowrap">{tdate(sub.timeline)}</td>
          <td className="py-2 px-2">
            {sub.dependencies === 'None'
              ? <span className="text-muted-foreground">{tr('None', 'لا يوجد')}</span>
              : <span className="text-[#008755] flex items-center gap-1"><Link2 className="h-3 w-3" />{sub.dependencies}</span>}
          </td>
          <td className="py-2 px-2">
            <div className="flex items-center gap-0.5">
              <button title={tr('View', 'عرض')} aria-label={tr('View', 'عرض')} className="h-6 w-6 rounded flex items-center justify-center hover:bg-muted"><Eye className="h-3.5 w-3.5 text-muted-foreground" /></button>
              <button title={tr('Edit', 'تعديل')} aria-label={tr('Edit', 'تعديل')} className="h-6 w-6 rounded flex items-center justify-center hover:bg-muted"><Edit className="h-3.5 w-3.5 text-muted-foreground" /></button>
              <button title={tr('Delete', 'حذف')} aria-label={tr('Delete', 'حذف')} className="h-6 w-6 rounded flex items-center justify-center hover:bg-[#D83731]/10"><Trash2 className="h-3.5 w-3.5 text-[#D83731]" /></button>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 min-w-0">
      <p className="text-sm uppercase tracking-wide text-muted-foreground font-medium">{label}</p>
      {children}
    </div>
  );
}

function InsightTile({ icon: Icon, color, label, value, detail }: { icon: React.ElementType; color: string; label: string; value: string; detail: string }) {
  return (
    <div className="bg-white rounded-lg p-3 border" style={{ borderColor: `${color}4d` }}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-3.5 w-3.5" style={{ color }} />
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
      <p className="text-sm   mb-0.5" style={{ color }}>{value}</p>
      <p className="text-sm text-muted-foreground">{detail}</p>
    </div>
  );
}

function StatTile({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="bg-card border border-border rounded-lg p-3">
      <Icon className="h-3.5 w-3.5 text-[#008755] mb-1.5" />
      <p className="text-sm uppercase tracking-wide text-muted-foreground font-medium">{label}</p>
      <p className="text-sm   mt-0.5 truncate">{value}</p>
    </div>
  );
}

function DetailRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="h-3.5 w-3.5 text-[#008755] mt-0.5 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-sm   truncate">{value}</p>
      </div>
    </div>
  );
}

function EmptyState({ icon: Icon, text, actionLabel, onAction }: { icon: React.ElementType; text: string; actionLabel: string; onAction: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14">
      <div className="h-12 w-12 rounded-xl bg-[#008755]/10 flex items-center justify-center mb-3">
        <Icon className="h-5 w-5 text-[#008755]" />
      </div>
      <p className="text-sm text-muted-foreground mb-4 max-w-xs">{text}</p>
      <button onClick={onAction} className="rounded-lg bg-[#008755] hover:bg-[#005844] text-white text-sm   px-4 py-2.5 transition-colors">
        {actionLabel}
      </button>
    </div>
  );
}
