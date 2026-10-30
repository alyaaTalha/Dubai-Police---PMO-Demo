import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/tabs';
import { cn } from '../../ui/utils';
import {
  Users,
  Settings,
  Tag,
  ScrollText,
  Search,
  UserPlus,
  ChevronDown,
  Edit2,
  UserX,
  Save,
  PlusCircle,
  Download,
  BrainCircuit,
  AlertCircle,
  AlertTriangle,
  Info,
  Laptop,
  RefreshCw,
  Leaf,
  HeartPulse,
  Handshake,
  ShieldCheck,
  Smile,
  Workflow,
} from 'lucide-react';
import { useLanguage } from '../../../i18n/LanguageContext';

// ─── Types ────────────────────────────────────────────────────────────────────

interface User {
  name: string;
  role: string;
  subtitle: string;
  xp: number;
  initials: string;
  chip: string;
  nameAr?: string;
  roleAr?: string;
  subtitleAr?: string;
  chipAr?: string;
}

type IdeasRole = 'innovator' | 'coordinator' | 'director' | 'admin';

interface PageProps {
  user: User;
  role: IdeasRole;
  onNavigate: (id: string) => void;
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────

type PlatformRole = 'Innovator' | 'Primary Coordinator' | 'Department Director' | 'System Admin';
type UserStatus = 'Active' | 'Inactive';

interface MockUser {
  id: number;
  name: string;
  department: string;
  role: PlatformRole;
  status: UserStatus;
  ideasSubmitted: number;
  lastActive: string;
  initials: string;
}

const MOCK_USERS: MockUser[] = [
  { id: 1, name: 'Lt. Ahmed Al Mansouri', department: 'Cybercrime', role: 'Innovator', status: 'Active', ideasSubmitted: 12, lastActive: '2 hours ago', initials: 'AA' },
  { id: 2, name: 'Cpt. Fatima Al Zaabi', department: 'Traffic & Patrol', role: 'Primary Coordinator', status: 'Active', ideasSubmitted: 8, lastActive: '1 day ago', initials: 'FZ' },
  { id: 3, name: 'Maj. Khalid Al Rashidi', department: 'Criminal Investigations', role: 'Department Director', status: 'Active', ideasSubmitted: 5, lastActive: '3 days ago', initials: 'KR' },
  { id: 4, name: 'Sgt. Mariam Al Falasi', department: 'Community Service', role: 'Innovator', status: 'Active', ideasSubmitted: 17, lastActive: '30 minutes ago', initials: 'MF' },
  { id: 5, name: 'Insp. Omar Al Ketbi', department: 'Smart Services', role: 'Primary Coordinator', status: 'Inactive', ideasSubmitted: 3, lastActive: '2 weeks ago', initials: 'OK' },
  { id: 6, name: 'Col. Sara Al Muhairi', department: 'Operations', role: 'Department Director', status: 'Active', ideasSubmitted: 9, lastActive: '5 hours ago', initials: 'SM' },
  { id: 7, name: 'Cpl. Yousef Al Shamsi', department: 'Logistics', role: 'Innovator', status: 'Active', ideasSubmitted: 6, lastActive: '1 day ago', initials: 'YS' },
  { id: 8, name: 'Brig. Noura Al Hashimi', department: 'HR & Training', role: 'System Admin', status: 'Active', ideasSubmitted: 2, lastActive: '4 hours ago', initials: 'NH' },
];

type CategoryIcon = React.FC<React.SVGProps<SVGSVGElement>>;

interface Category {
  id: number;
  name: string;
  icon: CategoryIcon;
  ideaCount: number;
  active: boolean;
  color: string;
}

const CATEGORIES: Category[] = [
  { id: 1, name: 'Technology', icon: Laptop, ideaCount: 48, active: true, color: 'text-blue-600' },
  { id: 2, name: 'Process Improvement', icon: RefreshCw, ideaCount: 35, active: true, color: 'text-purple-600' },
  { id: 3, name: 'Customer Experience', icon: Smile, ideaCount: 27, active: true, color: 'text-pink-600' },
  { id: 4, name: 'Safety & Security', icon: ShieldCheck, ideaCount: 41, active: true, color: 'text-red-600' },
  { id: 5, name: 'Environmental', icon: Leaf, ideaCount: 19, active: true, color: 'text-green-600' },
  { id: 6, name: 'HR & Wellbeing', icon: HeartPulse, ideaCount: 22, active: true, color: 'text-orange-600' },
  { id: 7, name: 'Digital Transformation', icon: Workflow, ideaCount: 53, active: true, color: 'text-indigo-600' },
  { id: 8, name: 'Strategic Partnerships', icon: Handshake, ideaCount: 14, active: false, color: 'text-teal-600' },
];

type LogLevel = 'Error' | 'Warning' | 'Info';

interface LogEntry {
  id: number;
  timestamp: string;
  level: LogLevel;
  event: string;
  user: string;
  details: string;
}

const SYSTEM_LOGS: LogEntry[] = [
  { id: 1, timestamp: '2024-06-10 09:42:11', level: 'Info', event: 'User login', user: 'fatima.alzaabi@dubaipolice.gov.ae', details: 'Successful login from 10.0.1.45' },
  { id: 2, timestamp: '2024-06-10 09:38:05', level: 'Warning', event: 'SLA breach', user: 'system', details: 'Idea #1042 exceeded coordinator review SLA by 2 days' },
  { id: 3, timestamp: '2024-06-10 09:15:33', level: 'Error', event: 'Email delivery failed', user: 'system', details: 'SMTP error 550 for omar.alketbi@dubaipolice.gov.ae' },
  { id: 4, timestamp: '2024-06-10 08:55:00', level: 'Info', event: 'Idea submitted', user: 'mariam.alfalasi@dubaipolice.gov.ae', details: 'Idea #1055 submitted in category: Technology' },
  { id: 5, timestamp: '2024-06-10 08:30:47', level: 'Info', event: 'Role updated', user: 'noura.alhashimi@dubaipolice.gov.ae', details: 'User omar.alketbi promoted to Primary Coordinator' },
  { id: 6, timestamp: '2024-06-09 17:22:10', level: 'Warning', event: 'Rate limit', user: 'yousef.alshamsi@dubaipolice.gov.ae', details: 'Monthly idea submission limit reached (3/3)' },
  { id: 7, timestamp: '2024-06-09 16:45:55', level: 'Info', event: 'Category updated', user: 'noura.alhashimi@dubaipolice.gov.ae', details: 'Category "Strategic Partnerships" deactivated' },
  { id: 8, timestamp: '2024-06-09 15:10:02', level: 'Error', event: 'DB connection timeout', user: 'system', details: 'Primary DB timeout, fell back to replica (recovered in 3s)' },
  { id: 9, timestamp: '2024-06-09 14:05:39', level: 'Info', event: 'Settings saved', user: 'noura.alhashimi@dubaipolice.gov.ae', details: 'Platform settings updated: max_description_length=2000' },
  { id: 10, timestamp: '2024-06-09 13:30:18', level: 'Warning', event: 'Failed login attempt', user: 'unknown', details: '3 consecutive failed logins from 192.168.2.101' },
  { id: 11, timestamp: '2024-06-09 11:58:44', level: 'Info', event: 'Export completed', user: 'sara.almuhairi@dubaipolice.gov.ae', details: 'Ideas export (CSV, 127 records) downloaded successfully' },
  { id: 12, timestamp: '2024-06-09 10:12:07', level: 'Error', event: 'File upload error', user: 'ahmed.almansouri@dubaipolice.gov.ae', details: 'Attachment exceeds 10 MB limit for idea #1048' },
];

// ─── Arabic translations for mock data (keyed by English value) ───────────────

const AR: Record<string, string> = {
  // Users
  'Lt. Ahmed Al Mansouri': 'ملازم أحمد المنصوري',
  'Cpt. Fatima Al Zaabi': 'نقيب فاطمة الزعابي',
  'Maj. Khalid Al Rashidi': 'رائد خالد الراشدي',
  'Sgt. Mariam Al Falasi': 'رقيب مريم الفلاسي',
  'Insp. Omar Al Ketbi': 'مفتش عمر الكتبي',
  'Col. Sara Al Muhairi': 'عقيد سارة المهيري',
  'Cpl. Yousef Al Shamsi': 'عريف يوسف الشامسي',
  'Brig. Noura Al Hashimi': 'عميد نورة الهاشمي',
  // Departments
  'Cybercrime': 'الجرائم الإلكترونية',
  'Traffic & Patrol': 'المرور والدوريات',
  'Criminal Investigations': 'التحريات الجنائية',
  'Community Service': 'خدمة المجتمع',
  'Smart Services': 'الخدمات الذكية',
  'Operations': 'العمليات',
  'Logistics': 'الخدمات اللوجستية',
  'HR & Training': 'الموارد البشرية والتدريب',
  // Roles
  'Innovator': 'مبتكر',
  'Primary Coordinator': 'منسق رئيسي',
  'Department Director': 'مدير إدارة',
  'System Admin': 'مسؤول النظام',
  // Status
  'Active': 'نشط',
  'Inactive': 'غير نشط',
  // Last active
  '2 hours ago': 'منذ ساعتين',
  '1 day ago': 'منذ يوم',
  '3 days ago': 'منذ 3 أيام',
  '30 minutes ago': 'منذ 30 دقيقة',
  '2 weeks ago': 'منذ أسبوعين',
  '5 hours ago': 'منذ 5 ساعات',
  '4 hours ago': 'منذ 4 ساعات',
  // Categories
  'Technology': 'التكنولوجيا',
  'Process Improvement': 'تحسين العمليات',
  'Customer Experience': 'تجربة المتعاملين',
  'Safety & Security': 'السلامة والأمن',
  'Environmental': 'البيئة',
  'HR & Wellbeing': 'الموارد البشرية وجودة الحياة',
  'Digital Transformation': 'التحول الرقمي',
  'Strategic Partnerships': 'الشراكات الاستراتيجية',
  // Log levels
  'All': 'الكل',
  'Error': 'خطأ',
  'Warning': 'تحذير',
  'Info': 'معلومات',
  // Log events
  'User login': 'تسجيل دخول مستخدم',
  'SLA breach': 'تجاوز مهلة مستوى الخدمة',
  'Email delivery failed': 'فشل إرسال البريد الإلكتروني',
  'Idea submitted': 'تم تقديم فكرة',
  'Role updated': 'تم تحديث الدور',
  'Rate limit': 'تجاوز حد الاستخدام',
  'Category updated': 'تم تحديث الفئة',
  'DB connection timeout': 'انتهاء مهلة الاتصال بقاعدة البيانات',
  'Settings saved': 'تم حفظ الإعدادات',
  'Failed login attempt': 'محاولة دخول فاشلة',
  'Export completed': 'اكتمل التصدير',
  'File upload error': 'خطأ في رفع الملف',
  // Log users
  'system': 'النظام',
  'unknown': 'غير معروف',
  // Log details
  'Successful login from 10.0.1.45': 'تسجيل دخول ناجح من 10.0.1.45',
  'Idea #1042 exceeded coordinator review SLA by 2 days': 'تجاوزت الفكرة رقم 1042 مهلة مراجعة المنسق بيومين',
  'SMTP error 550 for omar.alketbi@dubaipolice.gov.ae': 'خطأ SMTP رقم 550 للعنوان omar.alketbi@dubaipolice.gov.ae',
  'Idea #1055 submitted in category: Technology': 'تم تقديم الفكرة رقم 1055 ضمن فئة: التكنولوجيا',
  'User omar.alketbi promoted to Primary Coordinator': 'تمت ترقية المستخدم omar.alketbi إلى منسق رئيسي',
  'Monthly idea submission limit reached (3/3)': 'تم بلوغ الحد الشهري لتقديم الأفكار (3/3)',
  'Category "Strategic Partnerships" deactivated': 'تم تعطيل فئة "الشراكات الاستراتيجية"',
  'Primary DB timeout, fell back to replica (recovered in 3s)': 'انتهت مهلة قاعدة البيانات الرئيسية وتم التحويل إلى النسخة الاحتياطية (استُعيدت خلال 3 ثوانٍ)',
  'Platform settings updated: max_description_length=2000': 'تم تحديث إعدادات المنصة: max_description_length=2000',
  '3 consecutive failed logins from 192.168.2.101': '3 محاولات دخول فاشلة متتالية من 192.168.2.101',
  'Ideas export (CSV, 127 records) downloaded successfully': 'تم تنزيل ملف تصدير الأفكار (CSV، 127 سجلاً) بنجاح',
  'Attachment exceeds 10 MB limit for idea #1048': 'المرفق يتجاوز الحد المسموح (10 ميجابايت) للفكرة رقم 1048',
};

/** Translate a mock-data value at render time (logic keys remain English). */
function useDataTr() {
  const { tr } = useLanguage();
  return (value: string) => tr(value, AR[value]);
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={cn(
        'relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#008755]',
        checked ? 'bg-[#008755]' : 'bg-gray-200',
      )}
    >
      <span
        className={cn(
          'pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform',
          checked ? 'translate-x-4 rtl:-translate-x-4' : 'translate-x-0',
        )}
      />
    </button>
  );
}

function StatusBadge({ status }: { status: UserStatus }) {
  const td = useDataTr();
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        status === 'Active'
          ? 'bg-green-100 text-green-700'
          : 'bg-gray-100 text-gray-500',
      )}
    >
      {td(status)}
    </span>
  );
}

function LogLevelBadge({ level }: { level: LogLevel }) {
  const td = useDataTr();
  const styles: Record<LogLevel, string> = {
    Error: 'bg-red-100 text-red-700',
    Warning: 'bg-amber-100 text-amber-700',
    Info: 'bg-blue-100 text-blue-700',
  };
  const icons: Record<LogLevel, React.ReactNode> = {
    Error: <AlertCircle className="size-3" />,
    Warning: <AlertTriangle className="size-3" />,
    Info: <Info className="size-3" />,
  };
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium', styles[level])}>
      {icons[level]}
      {td(level)}
    </span>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function UserManagementTab() {
  const { tr } = useLanguage();
  const td = useDataTr();
  const [users, setUsers] = useState<MockUser[]>(MOCK_USERS);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<number[]>([]);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.department.toLowerCase().includes(search.toLowerCase()) ||
      td(u.name).includes(search) ||
      td(u.department).includes(search),
  );

  const allSelected = filtered.length > 0 && filtered.every((u) => selected.includes(u.id));

  function toggleSelect(id: number) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function toggleSelectAll() {
    if (allSelected) {
      setSelected((prev) => prev.filter((id) => !filtered.map((u) => u.id).includes(id)));
    } else {
      setSelected((prev) => Array.from(new Set([...prev, ...filtered.map((u) => u.id)])));
    }
  }

  function deactivateSelected() {
    setUsers((prev) =>
      prev.map((u) => (selected.includes(u.id) ? { ...u, status: 'Inactive' as UserStatus } : u)),
    );
    setSelected([]);
  }

  function toggleStatus(id: number) {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u,
      ),
    );
  }

  function changeRole(id: number, role: PlatformRole) {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
  }

  const ROLES: PlatformRole[] = ['Innovator', 'Primary Coordinator', 'Department Director', 'System Admin'];

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <Input
            placeholder={tr('Search users or department…', 'ابحث عن مستخدم أو إدارة…')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ps-9"
          />
        </div>
        <Button className="gap-2 bg-[#008755] hover:bg-[#005844] text-white">
          <UserPlus className="size-4" />
          {tr('Invite User', 'دعوة مستخدم')}
        </Button>
      </div>

      {/* Bulk actions */}
      {selected.length > 0 && (
        <div className="flex items-center gap-3 rounded-lg bg-[#008755]/10 border border-[#008755]/30 px-4 py-2">
          <span className="text-sm font-medium text-[#005844]">{selected.length} {tr('selected', 'محدد')}</span>
          <Button
            size="sm"
            variant="outline"
            className="h-7 text-xs"
            onClick={deactivateSelected}
          >
            <UserX className="size-3 me-1" />
            {tr('Deactivate Selected', 'تعطيل المحدد')}
          </Button>
          <Button size="sm" variant="outline" className="h-7 text-xs">
            <Download className="size-3 me-1" />
            {tr('Export', 'تصدير')}
          </Button>
        </div>
      )}

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="w-10 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 accent-[#008755]"
                  />
                </th>
                <th className="px-4 py-3 text-start text-xs font-semibold text-gray-500 uppercase tracking-wide">{tr('Name', 'الاسم')}</th>
                <th className="px-4 py-3 text-start text-xs font-semibold text-gray-500 uppercase tracking-wide">{tr('Department', 'الإدارة')}</th>
                <th className="px-4 py-3 text-start text-xs font-semibold text-gray-500 uppercase tracking-wide">{tr('Role', 'الدور')}</th>
                <th className="px-4 py-3 text-start text-xs font-semibold text-gray-500 uppercase tracking-wide">{tr('Status', 'الحالة')}</th>
                <th className="px-4 py-3 text-end text-xs font-semibold text-gray-500 uppercase tracking-wide">{tr('Ideas', 'الأفكار')}</th>
                <th className="px-4 py-3 text-start text-xs font-semibold text-gray-500 uppercase tracking-wide">{tr('Last Active', 'آخر نشاط')}</th>
                <th className="px-4 py-3 text-start text-xs font-semibold text-gray-500 uppercase tracking-wide">{tr('Actions', 'الإجراءات')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((u) => (
                <tr key={u.id} className={cn('transition-colors hover:bg-gray-50', selected.includes(u.id) && 'bg-green-50/50')}>
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selected.includes(u.id)}
                      onChange={() => toggleSelect(u.id)}
                      className="rounded border-gray-300 accent-[#008755]"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#008755]/10 text-[#008755] text-xs font-bold">
                        {u.initials}
                      </div>
                      <span className="font-medium text-gray-900">{td(u.name)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{td(u.department)}</td>
                  <td className="px-4 py-3">
                    <div className="relative">
                      <select
                        value={u.role}
                        onChange={(e) => changeRole(u.id, e.target.value as PlatformRole)}
                        className="appearance-none rounded-md border border-gray-200 bg-white py-1 ps-2 pe-7 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#008755]/40 cursor-pointer"
                      >
                        {ROLES.map((r) => (
                          <option key={r} value={r}>{td(r)}</option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute end-2 top-1/2 -translate-y-1/2 size-3 text-gray-400" />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Toggle
                        checked={u.status === 'Active'}
                        onChange={() => toggleStatus(u.id)}
                      />
                      <StatusBadge status={u.status} />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-end font-medium text-gray-800">{u.ideasSubmitted}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{td(u.lastActive)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-gray-500 hover:text-[#008755]" aria-label={tr('Edit', 'تعديل')}>
                        <Edit2 className="size-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0 text-gray-500 hover:text-red-600"
                        onClick={() => toggleStatus(u.id)}
                      >
                        <UserX className="size-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-10 text-center text-sm text-gray-400">{tr('No users match your search.', 'لا يوجد مستخدمون مطابقون لبحثك.')}</div>
          )}
        </div>
      </Card>
    </div>
  );
}

function SettingRow({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function NumberInput({ defaultValue, min = 1, max = 9999 }: { defaultValue: number; min?: number; max?: number }) {
  const [val, setVal] = useState(String(defaultValue));
  return (
    <Input
      type="number"
      value={val}
      min={min}
      max={max}
      onChange={(e) => setVal(e.target.value)}
      className="w-24 text-center"
    />
  );
}

function PlatformSettingsTab() {
  const { tr } = useLanguage();
  const [aiAssist, setAiAssist] = useState(true);
  const [anonSubmit, setAnonSubmit] = useState(false);
  const [autoAssign, setAutoAssign] = useState(true);
  const [slaEmail, setSlaEmail] = useState(true);
  const [showScores, setShowScores] = useState(false);
  const [publicLeaderboard, setPublicLeaderboard] = useState(true);
  const [upvoting, setUpvoting] = useState(true);

  return (
    <div className="space-y-4">
      {/* Submission Settings */}
      <Card>
        <CardHeader className="px-4 pt-4 pb-2">
          <CardTitle className="text-base font-semibold text-gray-900">{tr('Submission Settings', 'إعدادات التقديم')}</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 divide-y divide-gray-100">
          <SettingRow label={tr('Ideas per employee per month', 'عدد الأفكار لكل موظف شهرياً')} description={tr('Maximum ideas one employee can submit per month.', 'الحد الأقصى لعدد الأفكار التي يمكن للموظف تقديمها شهرياً.')}>
            <NumberInput defaultValue={3} />
          </SettingRow>
          <SettingRow label={tr('Max idea description length', 'الحد الأقصى لطول وصف الفكرة')} description={tr('Character limit for the idea description field.', 'الحد الأقصى لعدد الأحرف في حقل وصف الفكرة.')}>
            <NumberInput defaultValue={2000} max={10000} />
          </SettingRow>
          <SettingRow label={tr('Allow anonymous submissions', 'السماح بالتقديم دون الكشف عن الهوية')} description={tr('Employees can submit ideas without revealing their identity.', 'يمكن للموظفين تقديم الأفكار دون الكشف عن هويتهم.')}>
            <Toggle checked={anonSubmit} onChange={() => setAnonSubmit((v) => !v)} />
          </SettingRow>
          <SettingRow label={tr('Auto-assign coordinator by department', 'التعيين التلقائي للمنسق حسب الإدارة')} description={tr("Automatically route ideas to the coordinator of the submitter's department.", 'توجيه الأفكار تلقائياً إلى منسق الإدارة التي ينتمي إليها مقدّم الفكرة.')}>
            <Toggle checked={autoAssign} onChange={() => setAutoAssign((v) => !v)} />
          </SettingRow>
        </CardContent>
      </Card>

      {/* SLA Settings */}
      <Card>
        <CardHeader className="px-4 pt-4 pb-2">
          <CardTitle className="text-base font-semibold text-gray-900">{tr('Review SLA Settings', 'إعدادات مهل المراجعة')}</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 divide-y divide-gray-100">
          <SettingRow label={tr('Initial review SLA', 'مهلة المراجعة الأولية')} description={tr('Days before an unreviewed idea triggers an alert.', 'عدد الأيام قبل أن تُطلق الفكرة غير المراجَعة تنبيهاً.')}>
            <div className="flex items-center gap-2">
              <NumberInput defaultValue={3} max={30} />
              <span className="text-sm text-gray-500">{tr('days', 'أيام')}</span>
            </div>
          </SettingRow>
          <SettingRow label={tr('Coordinator decision SLA', 'مهلة قرار المنسق')} description={tr('Days for a coordinator to approve or reject an idea.', 'عدد الأيام المتاحة للمنسق لاعتماد الفكرة أو رفضها.')}>
            <div className="flex items-center gap-2">
              <NumberInput defaultValue={7} max={30} />
              <span className="text-sm text-gray-500">{tr('days', 'أيام')}</span>
            </div>
          </SettingRow>
          <SettingRow label={tr('Director approval SLA', 'مهلة اعتماد المدير')} description={tr('Days for a director to make a final decision.', 'عدد الأيام المتاحة للمدير لاتخاذ القرار النهائي.')}>
            <div className="flex items-center gap-2">
              <NumberInput defaultValue={5} max={30} />
              <span className="text-sm text-gray-500">{tr('days', 'أيام')}</span>
            </div>
          </SettingRow>
          <SettingRow label={tr('SLA breach email notifications', 'إشعارات البريد عند تجاوز المهلة')} description={tr('Send email alerts when an SLA is breached.', 'إرسال تنبيهات بالبريد الإلكتروني عند تجاوز مهلة مستوى الخدمة.')}>
            <Toggle checked={slaEmail} onChange={() => setSlaEmail((v) => !v)} />
          </SettingRow>
        </CardContent>
      </Card>

      {/* Scoring & Visibility */}
      <Card>
        <CardHeader className="px-4 pt-4 pb-2">
          <CardTitle className="text-base font-semibold text-gray-900">{tr('Scoring & Visibility', 'التقييم والظهور')}</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 divide-y divide-gray-100">
          <SettingRow label={tr('Show idea scores to innovators', 'إظهار تقييم الأفكار للمبتكرين')} description={tr('Innovators can see the evaluation score their ideas received.', 'يمكن للمبتكرين الاطلاع على درجة التقييم التي حصلت عليها أفكارهم.')}>
            <Toggle checked={showScores} onChange={() => setShowScores((v) => !v)} />
          </SettingRow>
          <SettingRow label={tr('Public leaderboard', 'لوحة المتصدرين العامة')} description={tr('Display a ranked leaderboard of top innovators on the platform.', 'عرض لوحة ترتيب لأفضل المبتكرين على المنصة.')}>
            <Toggle checked={publicLeaderboard} onChange={() => setPublicLeaderboard((v) => !v)} />
          </SettingRow>
          <SettingRow label={tr('Allow idea upvoting', 'السماح بالتصويت للأفكار')} description={tr('Employees can upvote ideas they find valuable.', 'يمكن للموظفين التصويت للأفكار التي يرونها ذات قيمة.')}>
            <Toggle checked={upvoting} onChange={() => setUpvoting((v) => !v)} />
          </SettingRow>
        </CardContent>
      </Card>

      {/* AI Controls */}
      <Card>
        <CardHeader className="px-4 pt-4 pb-2">
          <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <BrainCircuit className="size-4 text-[#008755]" />
            {tr('AI Controls', 'ضوابط الذكاء الاصطناعي')}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 divide-y divide-gray-100">
          <SettingRow
            label={tr('AI Assistance', 'مساعدة الذكاء الاصطناعي')}
            description={tr(
              'When off, AI suggestions, similarity checks, and drafting are disabled platform-wide — submission, review, and decision actions continue to work normally.',
              'عند الإيقاف، يتم تعطيل اقتراحات الذكاء الاصطناعي وفحص التشابه والصياغة على مستوى المنصة، مع استمرار عمل إجراءات التقديم والمراجعة واتخاذ القرار بشكل طبيعي.',
            )}
          >
            <div className="flex items-center gap-2">
              <Toggle checked={aiAssist} onChange={() => setAiAssist((v) => !v)} />
              <span className={cn('text-xs font-medium', aiAssist ? 'text-[#008755]' : 'text-gray-400')}>
                {aiAssist ? tr('On', 'مفعّل') : tr('Off', 'معطّل')}
              </span>
            </div>
          </SettingRow>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="gap-2 bg-[#008755] hover:bg-[#005844] text-white">
          <Save className="size-4" />
          {tr('Save Changes', 'حفظ التغييرات')}
        </Button>
      </div>
    </div>
  );
}

function CategoryManagementTab() {
  const { tr } = useLanguage();
  const td = useDataTr();
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);

  function toggleCategory(id: number) {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c)));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">{categories.length} {tr('categories configured', 'فئات مُعدّة')}</p>
        <Button className="gap-2 bg-[#008755] hover:bg-[#005844] text-white">
          <PlusCircle className="size-4" />
          {tr('Add Category', 'إضافة فئة')}
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="px-4 py-3 text-start text-xs font-semibold text-gray-500 uppercase tracking-wide w-10">{tr('Icon', 'الأيقونة')}</th>
                <th className="px-4 py-3 text-start text-xs font-semibold text-gray-500 uppercase tracking-wide">{tr('Category Name', 'اسم الفئة')}</th>
                <th className="px-4 py-3 text-end text-xs font-semibold text-gray-500 uppercase tracking-wide">{tr('Ideas', 'الأفكار')}</th>
                <th className="px-4 py-3 text-start text-xs font-semibold text-gray-500 uppercase tracking-wide">{tr('Status', 'الحالة')}</th>
                <th className="px-4 py-3 text-start text-xs font-semibold text-gray-500 uppercase tracking-wide">{tr('Actions', 'الإجراءات')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className={cn('flex size-8 items-center justify-center rounded-lg bg-gray-100', cat.color)}>
                        <Icon className="size-4" />
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">{td(cat.name)}</td>
                    <td className="px-4 py-3 text-end text-gray-700 font-medium">{cat.ideaCount}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Toggle checked={cat.active} onChange={() => toggleCategory(cat.id)} />
                        <span className={cn('text-xs', cat.active ? 'text-green-700' : 'text-gray-400')}>
                          {cat.active ? td('Active') : td('Inactive')}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-gray-500 hover:text-[#008755]" aria-label={tr('Edit', 'تعديل')}>
                          <Edit2 className="size-3.5" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-gray-500 hover:text-[#E4002B]">
                          <UserX className="size-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

type LogLevelFilter = 'All' | LogLevel;

function SystemLogsTab() {
  const { tr } = useLanguage();
  const td = useDataTr();
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState<LogLevelFilter>('All');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const filtered = SYSTEM_LOGS.filter((log) => {
    const matchSearch =
      log.event.toLowerCase().includes(search.toLowerCase()) ||
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.details.toLowerCase().includes(search.toLowerCase()) ||
      td(log.event).includes(search) ||
      td(log.details).includes(search);
    const matchLevel = levelFilter === 'All' || log.level === levelFilter;
    return matchSearch && matchLevel;
  });

  const LEVEL_OPTIONS: LogLevelFilter[] = ['All', 'Error', 'Warning', 'Info'];

  return (
    <div className="space-y-4">
      {/* Filter Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <Input
            placeholder={tr('Search logs…', 'ابحث في السجلات…')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ps-9"
          />
        </div>

        <div className="flex items-center gap-2">
          {LEVEL_OPTIONS.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={cn(
                'rounded-full px-3 py-1 text-xs font-medium border transition-colors',
                levelFilter === lvl
                  ? 'bg-[#008755] text-white border-[#008755]'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300',
              )}
            >
              {td(lvl)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="h-8 w-32 text-xs"
          />
          <span>–</span>
          <Input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="h-8 w-32 text-xs"
          />
        </div>

        <Button variant="outline" size="sm" className="gap-2 ms-auto">
          <Download className="size-3.5" />
          {tr('Export', 'تصدير')}
        </Button>
      </div>

      {/* Logs Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="px-4 py-3 text-start text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{tr('Timestamp', 'الوقت')}</th>
                <th className="px-4 py-3 text-start text-xs font-semibold text-gray-500 uppercase tracking-wide">{tr('Level', 'المستوى')}</th>
                <th className="px-4 py-3 text-start text-xs font-semibold text-gray-500 uppercase tracking-wide">{tr('Event', 'الحدث')}</th>
                <th className="px-4 py-3 text-start text-xs font-semibold text-gray-500 uppercase tracking-wide">{tr('User', 'المستخدم')}</th>
                <th className="px-4 py-3 text-start text-xs font-semibold text-gray-500 uppercase tracking-wide">{tr('Details', 'التفاصيل')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-xs text-gray-500 font-mono whitespace-nowrap">{log.timestamp}</td>
                  <td className="px-4 py-3">
                    <LogLevelBadge level={log.level} />
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{td(log.event)}</td>
                  <td className="px-4 py-3 text-xs text-gray-600 max-w-[180px] truncate">{td(log.user)}</td>
                  <td className="px-4 py-3 text-xs text-gray-500 max-w-[300px]">{td(log.details)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-10 text-center text-sm text-gray-400">{tr('No log entries match your filters.', 'لا توجد سجلات مطابقة لعوامل التصفية.')}</div>
          )}
        </div>
      </Card>

      <p className="text-xs text-gray-400 text-end">
        {tr(
          `Showing ${filtered.length} of ${SYSTEM_LOGS.length} entries`,
          `عرض ${filtered.length} من أصل ${SYSTEM_LOGS.length} سجلاً`,
        )}
      </p>
    </div>
  );
}

// ─── Main Export ───────────────────────────────────────────────────────────────

export function AdminSettingsPage({ user, role, onNavigate }: PageProps) {
  const { tr } = useLanguage();
  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{tr('Admin Settings', 'إعدادات المسؤول')}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {tr('Manage platform users, settings, and system configuration.', 'إدارة مستخدمي المنصة والإعدادات وتهيئة النظام.')}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-gray-500 hidden sm:inline">{tr('Signed in as', 'مسجّل الدخول باسم')}</span>
          <div className="flex size-8 items-center justify-center rounded-full bg-[#008755]/10 text-[#008755] text-xs font-bold">
            {user.initials}
          </div>
          <span className="hidden sm:inline text-sm font-medium text-gray-700">{tr(user.name, user.nameAr)}</span>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="users" className="gap-1.5">
            <Users className="size-4" />
            <span className="hidden sm:inline">{tr('User Management', 'إدارة المستخدمين')}</span>
            <span className="sm:hidden">{tr('Users', 'المستخدمون')}</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-1.5">
            <Settings className="size-4" />
            <span className="hidden sm:inline">{tr('Platform Settings', 'إعدادات المنصة')}</span>
            <span className="sm:hidden">{tr('Settings', 'الإعدادات')}</span>
          </TabsTrigger>
          <TabsTrigger value="categories" className="gap-1.5">
            <Tag className="size-4" />
            <span className="hidden sm:inline">{tr('Category Management', 'إدارة الفئات')}</span>
            <span className="sm:hidden">{tr('Categories', 'الفئات')}</span>
          </TabsTrigger>
          <TabsTrigger value="logs" className="gap-1.5">
            <ScrollText className="size-4" />
            <span className="hidden sm:inline">{tr('System Logs', 'سجلات النظام')}</span>
            <span className="sm:hidden">{tr('Logs', 'السجلات')}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-4">
          <UserManagementTab />
        </TabsContent>

        <TabsContent value="settings" className="mt-4">
          <PlatformSettingsTab />
        </TabsContent>

        <TabsContent value="categories" className="mt-4">
          <CategoryManagementTab />
        </TabsContent>

        <TabsContent value="logs" className="mt-4">
          <SystemLogsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
