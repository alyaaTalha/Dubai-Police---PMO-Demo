import { useState, useMemo } from 'react';
import {
  Trophy, Calendar, Search, ArrowLeft, ChevronRight,
  Users, CheckCircle, Clock, Tag, Target, Lightbulb, Star,
} from 'lucide-react';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { cn } from '../../ui/utils';
import { useLanguage } from '../../../i18n/LanguageContext';

// ── Types ──────────────────────────────────────────────────────────────────────
export type IdeasRole = 'innovator' | 'coordinator' | 'director' | 'admin';

export interface User {
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

export interface PageProps {
  user: User;
  role: IdeasRole;
  onNavigate: (id: string) => void;
}

// ── Data ───────────────────────────────────────────────────────────────────────
type ChallengeStatus = 'Open' | 'Closing Soon' | 'Closed';

interface Challenge {
  id: number;
  title: string;
  department: string;
  status: ChallengeStatus;
  deadline: string;
  prize: string;
  tags: string[];
  description: string;
  submissions: number;
  winnerAnnounced?: boolean;
}

const CHALLENGES: Challenge[] = [
  {
    id: 1,
    title: 'AI-Powered Queue Management',
    department: 'Digital Transformation',
    status: 'Open',
    deadline: 'Sep 30, 2025',
    prize: '5,000 AED',
    tags: ['AI', 'Customer Experience', 'Automation'],
    description:
      'Design an AI system to predict and dynamically manage service center queue times, reducing average wait from 25 minutes to under 10 minutes.',
    submissions: 14,
  },
  {
    id: 2,
    title: 'Smart Patrol Route Optimization',
    department: 'Operations',
    status: 'Open',
    deadline: 'Oct 15, 2025',
    prize: '8,000 AED',
    tags: ['Smart Policing', 'AI', 'Route Planning'],
    description:
      'Develop an algorithm or solution that dynamically adjusts patrol routes based on real-time incident data, traffic, and historical crime patterns.',
    submissions: 9,
  },
  {
    id: 3,
    title: 'Digital Evidence Management',
    department: 'Legal Affairs',
    status: 'Closing Soon',
    deadline: 'Sep 10, 2025',
    prize: '6,500 AED',
    tags: ['Digitalization', 'Legal', 'Paperless'],
    description:
      'Propose a secure, fully digital chain-of-custody system for managing evidence from collection to court presentation with zero paper touchpoints.',
    submissions: 21,
  },
  {
    id: 4,
    title: 'Employee Wellness & Productivity',
    department: 'HR & Training',
    status: 'Open',
    deadline: 'Nov 1, 2025',
    prize: '4,000 AED',
    tags: ['Wellness', 'Productivity', 'HR'],
    description:
      'Design a program or app to monitor and improve employee mental and physical wellness, with measurable productivity impact.',
    submissions: 6,
  },
  {
    id: 5,
    title: 'Community Safety Awareness',
    department: 'Community Affairs',
    status: 'Closing Soon',
    deadline: 'Sep 12, 2025',
    prize: '3,500 AED',
    tags: ['Community', 'Awareness', 'Safety'],
    description:
      'Develop a scalable digital or on-ground campaign to improve public awareness of personal safety and emergency response procedures.',
    submissions: 18,
  },
  {
    id: 6,
    title: 'Paperless Operations Initiative',
    department: 'Finance',
    status: 'Open',
    deadline: 'Oct 28, 2025',
    prize: '5,500 AED',
    tags: ['Paperless', 'Efficiency', 'Environment'],
    description:
      'Map and propose a roadmap to eliminate all paper-based processes across financial operations, targeting 100% digital workflows within 12 months.',
    submissions: 7,
  },
  {
    id: 7,
    title: 'Predictive Vehicle Maintenance',
    department: 'Operations',
    status: 'Closed',
    deadline: 'Aug 1, 2025',
    prize: '7,000 AED',
    tags: ['AI', 'Fleet Management', 'IoT'],
    description:
      'Use IoT sensors and machine learning to predict vehicle maintenance needs before failure, reducing downtime by 40%.',
    submissions: 31,
    winnerAnnounced: true,
  },
  {
    id: 8,
    title: 'Smart Speed Camera Network',
    department: 'Operations',
    status: 'Closed',
    deadline: 'Jul 15, 2025',
    prize: '9,000 AED',
    tags: ['Smart Infrastructure', 'Road Safety'],
    description:
      'Design an integrated, AI-linked speed camera network that automatically adjusts speed limits and routes traffic based on conditions.',
    submissions: 25,
    winnerAnnounced: true,
  },
];

const DEPARTMENTS = [
  'All',
  'Operations',
  'Digital Transformation',
  'Community Affairs',
  'HR & Training',
  'Legal Affairs',
  'Finance',
];

// ── Arabic translations for mock data (keyed by English value) ────────────────
const AR: Record<string, string> = {
  // Titles
  'AI-Powered Queue Management': 'إدارة الطوابير بالذكاء الاصطناعي',
  'Smart Patrol Route Optimization': 'التحسين الذكي لمسارات الدوريات',
  'Digital Evidence Management': 'الإدارة الرقمية للأدلة',
  'Employee Wellness & Productivity': 'رفاهية الموظفين وإنتاجيتهم',
  'Community Safety Awareness': 'التوعية بالسلامة المجتمعية',
  'Paperless Operations Initiative': 'مبادرة العمليات اللاورقية',
  'Predictive Vehicle Maintenance': 'الصيانة التنبؤية للمركبات',
  'Smart Speed Camera Network': 'شبكة رادارات السرعة الذكية',
  // Departments
  'Digital Transformation': 'التحول الرقمي',
  'Operations': 'العمليات',
  'Legal Affairs': 'الشؤون القانونية',
  'HR & Training': 'الموارد البشرية والتدريب',
  'Community Affairs': 'شؤون المجتمع',
  'Finance': 'المالية',
  // Statuses
  'Open': 'مفتوح',
  'Closing Soon': 'يغلق قريباً',
  'Closed': 'مغلق',
  // Deadlines
  'Sep 30, 2025': '30 سبتمبر 2025',
  'Oct 15, 2025': '15 أكتوبر 2025',
  'Sep 10, 2025': '10 سبتمبر 2025',
  'Nov 1, 2025': '1 نوفمبر 2025',
  'Sep 12, 2025': '12 سبتمبر 2025',
  'Oct 28, 2025': '28 أكتوبر 2025',
  'Aug 1, 2025': '1 أغسطس 2025',
  'Jul 15, 2025': '15 يوليو 2025',
  // Prizes
  '5,000 AED': '5,000 درهم',
  '8,000 AED': '8,000 درهم',
  '6,500 AED': '6,500 درهم',
  '4,000 AED': '4,000 درهم',
  '3,500 AED': '3,500 درهم',
  '5,500 AED': '5,500 درهم',
  '7,000 AED': '7,000 درهم',
  '9,000 AED': '9,000 درهم',
  // Tags
  'AI': 'الذكاء الاصطناعي',
  'Customer Experience': 'تجربة المتعاملين',
  'Automation': 'الأتمتة',
  'Smart Policing': 'العمل الشرطي الذكي',
  'Route Planning': 'تخطيط المسارات',
  'Digitalization': 'الرقمنة',
  'Legal': 'قانوني',
  'Paperless': 'لاورقي',
  'Wellness': 'جودة الحياة',
  'Productivity': 'الإنتاجية',
  'HR': 'الموارد البشرية',
  'Community': 'المجتمع',
  'Awareness': 'التوعية',
  'Safety': 'السلامة',
  'Efficiency': 'الكفاءة',
  'Environment': 'البيئة',
  'Fleet Management': 'إدارة الأسطول',
  'IoT': 'إنترنت الأشياء',
  'Smart Infrastructure': 'البنية التحتية الذكية',
  'Road Safety': 'السلامة المرورية',
  // Descriptions
  'Design an AI system to predict and dynamically manage service center queue times, reducing average wait from 25 minutes to under 10 minutes.':
    'تصميم نظام ذكاء اصطناعي للتنبؤ بأوقات الانتظار في مراكز الخدمة وإدارتها ديناميكياً، وخفض متوسط الانتظار من 25 دقيقة إلى أقل من 10 دقائق.',
  'Develop an algorithm or solution that dynamically adjusts patrol routes based on real-time incident data, traffic, and historical crime patterns.':
    'تطوير خوارزمية أو حل يعدّل مسارات الدوريات ديناميكياً بناءً على بيانات البلاغات الآنية وحركة المرور وأنماط الجريمة التاريخية.',
  'Propose a secure, fully digital chain-of-custody system for managing evidence from collection to court presentation with zero paper touchpoints.':
    'اقتراح نظام رقمي آمن بالكامل لسلسلة حفظ الأدلة، يدير الأدلة من مرحلة الجمع حتى العرض أمام المحكمة دون أي معاملات ورقية.',
  'Design a program or app to monitor and improve employee mental and physical wellness, with measurable productivity impact.':
    'تصميم برنامج أو تطبيق لمتابعة الصحة النفسية والبدنية للموظفين وتحسينها، مع أثر قابل للقياس على الإنتاجية.',
  'Develop a scalable digital or on-ground campaign to improve public awareness of personal safety and emergency response procedures.':
    'تطوير حملة رقمية أو ميدانية قابلة للتوسع لتعزيز وعي الجمهور بالسلامة الشخصية وإجراءات الاستجابة للطوارئ.',
  'Map and propose a roadmap to eliminate all paper-based processes across financial operations, targeting 100% digital workflows within 12 months.':
    'حصر الإجراءات الورقية في العمليات المالية واقتراح خارطة طريق للتخلص منها، بهدف الوصول إلى سير عمل رقمي بنسبة 100% خلال 12 شهراً.',
  'Use IoT sensors and machine learning to predict vehicle maintenance needs before failure, reducing downtime by 40%.':
    'استخدام مستشعرات إنترنت الأشياء والتعلم الآلي للتنبؤ باحتياجات صيانة المركبات قبل حدوث الأعطال، وخفض فترات التوقف بنسبة 40%.',
  'Design an integrated, AI-linked speed camera network that automatically adjusts speed limits and routes traffic based on conditions.':
    'تصميم شبكة رادارات سرعة متكاملة مرتبطة بالذكاء الاصطناعي تعدّل حدود السرعة وتوجّه حركة المرور تلقائياً وفقاً للظروف.',
};

function useDataTr() {
  const { tr } = useLanguage();
  return (value: string) => tr(value, AR[value]);
}

// ── Helpers ────────────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: ChallengeStatus }) {
  const { tr } = useLanguage();
  if (status === 'Open')
    return (
      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-[11px] font-medium">
        {tr('Open', 'مفتوح')}
      </Badge>
    );
  if (status === 'Closing Soon')
    return (
      <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-[11px] font-medium">
        {tr('Closing Soon', 'يغلق قريباً')}
      </Badge>
    );
  return (
    <Badge className="bg-gray-100 text-gray-500 border-gray-200 text-[11px] font-medium">
      {tr('Closed', 'مغلق')}
    </Badge>
  );
}

function DeptBadge({ dept }: { dept: string }) {
  const td = useDataTr();
  return (
    <Badge
      variant="outline"
      className="text-[11px] text-[#005844] border-[#008755]/40 bg-[#008755]/5 font-medium"
    >
      {td(dept)}
    </Badge>
  );
}

// ── Challenge Card ─────────────────────────────────────────────────────────────
interface ChallengeCardProps {
  challenge: Challenge;
  onViewDetails: (c: Challenge) => void;
}

function ChallengeCard({ challenge, onViewDetails }: ChallengeCardProps) {
  const { tr } = useLanguage();
  const td = useDataTr();
  const isClosingSoon = challenge.status === 'Closing Soon';
  const isClosed = challenge.status === 'Closed';

  return (
    <Card
      className={cn(
        'rounded-xl hover:shadow-md transition-shadow cursor-pointer bg-white',
        isClosingSoon && 'border-s-4 border-amber-400'
      )}
    >
      <CardContent className="pt-4 pb-4 flex flex-col gap-3">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            <DeptBadge dept={challenge.department} />
            <StatusBadge status={challenge.status} />
          </div>
        </div>

        {/* Title */}
        <h3 className="  text-sm text-gray-900 leading-snug line-clamp-2">
          {td(challenge.title)}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
          {td(challenge.description)}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {challenge.tags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center gap-0.5 text-[10px] bg-gray-100 text-gray-500 rounded-full px-2 py-0.5"
            >
              <Tag className="h-2.5 w-2.5" />
              {td(tag)}
            </span>
          ))}
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-500 pt-1 border-t border-gray-100">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3 text-gray-400" />
            {td(challenge.deadline)}
          </span>
          <span className="flex items-center gap-1">
            <Trophy className="h-3 w-3 text-amber-500" />
            {td(challenge.prize)}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3 text-gray-400" />
            {challenge.submissions} {tr('submissions', 'مشاركة')}
          </span>
          {challenge.winnerAnnounced && (
            <span className="flex items-center gap-1 text-emerald-600">
              <CheckCircle className="h-3 w-3" />
              {tr('Winner Announced', 'تم إعلان الفائز')}
            </span>
          )}
        </div>

        {/* Action row */}
        <div className="flex gap-2 pt-0.5">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 h-7 text-[11px] border-[#008755]/40 text-[#008755] hover:bg-[#008755]/5"
            onClick={() => onViewDetails(challenge)}
          >
            {tr('View Details', 'عرض التفاصيل')}
          </Button>
          <Button
            size="sm"
            className="flex-1 h-7 text-[11px] bg-[#008755] hover:bg-[#005844] text-white"
            disabled={isClosed}
            onClick={() => onViewDetails(challenge)}
          >
            {isClosed ? tr('Closed', 'مغلق') : tr('Submit Response', 'تقديم مشاركة')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Detail Panel ───────────────────────────────────────────────────────────────
interface DetailViewProps {
  challenge: Challenge;
  allChallenges: Challenge[];
  onBack: () => void;
  onViewDetails: (c: Challenge) => void;
}

const EVAL_CRITERIA = [
  {
    icon: Lightbulb,
    label: 'Innovation',
    labelAr: 'الابتكار',
    desc: 'Novelty and creativity of the proposed solution relative to existing approaches.',
    descAr: 'مدى جدة الحل المقترح وإبداعه مقارنة بالأساليب الحالية.',
  },
  {
    icon: Target,
    label: 'Feasibility',
    labelAr: 'قابلية التطبيق',
    desc: 'Technical and operational viability for implementation within Dubai Police.',
    descAr: 'الجدوى الفنية والتشغيلية للتطبيق داخل القيادة العامة لشرطة دبي.',
  },
  {
    icon: Star,
    label: 'Impact',
    labelAr: 'الأثر',
    desc: 'Measurable improvement to operations, community safety, or employee wellbeing.',
    descAr: 'تحسين قابل للقياس في العمليات أو سلامة المجتمع أو جودة حياة الموظفين.',
  },
];

function DetailView({ challenge, allChallenges, onBack, onViewDetails }: DetailViewProps) {
  const related = allChallenges
    .filter(c => c.id !== challenge.id && c.department === challenge.department)
    .slice(0, 2)
    .concat(
      allChallenges
        .filter(
          c =>
            c.id !== challenge.id &&
            c.department !== challenge.department &&
            c.status === challenge.status
        )
        .slice(0, Math.max(0, 2 - allChallenges.filter(c => c.id !== challenge.id && c.department === challenge.department).length))
    )
    .slice(0, 2);

  const { tr } = useLanguage();
  const td = useDataTr();
  const isClosed = challenge.status === 'Closed';
  const isOpen = challenge.status !== 'Closed';

  return (
    <div className="flex flex-col gap-5">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-[#008755] hover:text-[#005844] transition-colors w-fit"
      >
        <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
        {tr('All Challenges', 'جميع التحديات')}
      </button>

      {/* Main detail card */}
      <Card className="rounded-xl bg-white">
        <CardContent className="pt-4 pb-4 flex flex-col gap-5">
          {/* Top */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-2 items-center">
              <DeptBadge dept={challenge.department} />
              <StatusBadge status={challenge.status} />
              {challenge.winnerAnnounced && (
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-[11px]">
                  <CheckCircle className="h-3 w-3 me-1" /> {tr('Winner Announced', 'تم إعلان الفائز')}
                </Badge>
              )}
            </div>
            <h1 className="  text-xl text-gray-900 leading-snug">
              {td(challenge.title)}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-gray-400" />
                {tr('Deadline:', 'الموعد النهائي:')} <strong>{td(challenge.deadline)}</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <Trophy className="h-4 w-4 text-amber-500" />
                {tr('Prize:', 'الجائزة:')} <strong>{td(challenge.prize)}</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-gray-400" />
                <strong>{challenge.submissions}</strong> {tr('submissions so far', 'مشاركة حتى الآن')}
              </span>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Description */}
          <div>
            <h2 className="  text-sm text-gray-700 mb-2">
              {tr('Challenge Overview', 'نظرة عامة على التحدي')}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">{td(challenge.description)}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {challenge.tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-600 rounded-full px-3 py-1"
              >
                <Tag className="h-3 w-3" />
                {td(tag)}
              </span>
            ))}
          </div>

          <hr className="border-gray-100" />

          {/* Evaluation criteria */}
          <div>
            <h2 className="  text-sm text-gray-700 mb-3">
              {tr('Evaluation Criteria', 'معايير التقييم')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {EVAL_CRITERIA.map(criterion => (
                <div
                  key={criterion.label}
                  className="flex flex-col gap-1.5 p-3 rounded-lg bg-[#008755]/5 border border-[#008755]/10"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-md bg-[#008755]/10 flex items-center justify-center flex-shrink-0">
                      <criterion.icon className="h-3.5 w-3.5 text-[#008755]" />
                    </div>
                    <span className="  text-xs text-gray-800">
                      {tr(criterion.label, criterion.labelAr)}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{tr(criterion.desc, criterion.descAr)}</p>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Submissions & status */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-[#008755]/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-[#008755]" />
              </div>
              <div>
                <p className="  text-sm text-gray-900">
                  {challenge.submissions} {tr('Submissions', 'مشاركة')}
                </p>
                <p className="text-xs text-gray-500">
                  {isClosed
                    ? challenge.winnerAnnounced
                      ? tr('Review complete — winner selected', 'اكتملت المراجعة — تم اختيار الفائز')
                      : tr('Challenge closed — under review', 'أُغلق التحدي — قيد المراجعة')
                    : tr(
                        `Still accepting submissions until ${challenge.deadline}`,
                        `لا يزال استقبال المشاركات متاحاً حتى ${td(challenge.deadline)}`,
                      )}
                </p>
              </div>
            </div>

            {isClosed ? (
              <Button className="bg-[#008755] hover:bg-[#005844] text-white h-9 px-6 text-sm">
                <Trophy className="h-4 w-4 me-2" />
                {tr('View Winning Entry', 'عرض المشاركة الفائزة')}
              </Button>
            ) : (
              <Button className="bg-[#008755] hover:bg-[#005844] text-white h-9 px-6 text-sm">
                <ChevronRight className="h-4 w-4 me-1.5 rtl:rotate-180" />
                {tr('Submit Your Response', 'قدّم مشاركتك')}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Related challenges */}
      {related.length > 0 && (
        <div>
          <h2 className="  text-sm text-gray-700 mb-3">
            {tr('Related Challenges', 'تحديات ذات صلة')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map(c => (
              <ChallengeCard key={c.id} challenge={c} onViewDetails={onViewDetails} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── ChallengesPage ─────────────────────────────────────────────────────────────
export function ChallengesPage({ user: _user, role: _role, onNavigate: _onNavigate }: PageProps) {
  const { tr } = useLanguage();
  const td = useDataTr();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [deptFilter, setDeptFilter] = useState('All');
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  const filtered = useMemo(() => {
    return CHALLENGES.filter(c => {
      const matchSearch =
        !search ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.department.toLowerCase().includes(search.toLowerCase()) ||
        c.tags.some(t => t.toLowerCase().includes(search.toLowerCase())) ||
        td(c.title).includes(search) ||
        td(c.department).includes(search) ||
        c.tags.some(t => td(t).includes(search));
      const matchStatus = statusFilter === 'All' || c.status === statusFilter;
      const matchDept = deptFilter === 'All' || c.department === deptFilter;
      return matchSearch && matchStatus && matchDept;
    });
  }, [search, statusFilter, deptFilter, tr]);

  const stats = {
    active: CHALLENGES.filter(c => c.status === 'Open').length,
    closingSoon: CHALLENGES.filter(c => c.status === 'Closing Soon').length,
    total: CHALLENGES.length,
  };

  if (selectedChallenge) {
    return (
      <div className="p-6">
        <DetailView
          challenge={selectedChallenge}
          allChallenges={CHALLENGES}
          onBack={() => setSelectedChallenge(null)}
          onViewDetails={setSelectedChallenge}
        />
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col gap-5">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="  text-xl text-gray-900">{tr('Challenges', 'التحديات')}</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            <span className="text-[#008755] font-medium">{stats.active} {tr('Active', 'نشط')}</span>
            <span className="mx-1.5 text-gray-300">·</span>
            <span className="text-amber-600 font-medium">{stats.closingSoon} {tr('Closing Soon', 'يغلق قريباً')}</span>
            <span className="mx-1.5 text-gray-300">·</span>
            <span className="text-gray-500">{stats.total} {tr('Total', 'الإجمالي')}</span>
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock className="h-3.5 w-3.5 text-amber-500" />
          {tr('Updated just now', 'تم التحديث الآن')}
        </div>
      </div>

      {/* Filter bar */}
      <Card className="rounded-xl bg-white">
        <CardContent className="pt-4 pb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={tr('Search challenges...', 'ابحث في التحديات...')}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="ps-9 h-9 text-sm"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-9 text-sm w-full sm:w-44">
                <SelectValue placeholder={tr('Status', 'الحالة')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">{tr('All Statuses', 'جميع الحالات')}</SelectItem>
                <SelectItem value="Open">{tr('Open', 'مفتوح')}</SelectItem>
                <SelectItem value="Closing Soon">{tr('Closing Soon', 'يغلق قريباً')}</SelectItem>
                <SelectItem value="Closed">{tr('Closed', 'مغلق')}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={deptFilter} onValueChange={setDeptFilter}>
              <SelectTrigger className="h-9 text-sm w-full sm:w-52">
                <SelectValue placeholder={tr('Department', 'الإدارة')} />
              </SelectTrigger>
              <SelectContent>
                {DEPARTMENTS.map(d => (
                  <SelectItem key={d} value={d}>
                    {d === 'All' ? tr('All Departments', 'جميع الإدارات') : td(d)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results count */}
      {(search || statusFilter !== 'All' || deptFilter !== 'All') && (
        <p className="text-xs text-gray-500">
          {tr(
            `Showing ${filtered.length} of ${CHALLENGES.length} challenges`,
            `عرض ${filtered.length} من أصل ${CHALLENGES.length} تحدياً`,
          )}
        </p>
      )}

      {/* Challenge grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(challenge => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              onViewDetails={setSelectedChallenge}
            />
          ))}
        </div>
      ) : (
        <Card className="rounded-xl bg-white">
          <CardContent className="pt-4 pb-4 flex flex-col items-center justify-center py-16 text-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <p className="  text-sm text-gray-700">
              {tr('No challenges found', 'لم يتم العثور على تحديات')}
            </p>
            <p className="text-xs text-gray-400 max-w-xs">
              {tr('Try adjusting your search or filters to find relevant challenges.', 'جرّب تعديل البحث أو عوامل التصفية للعثور على التحديات المناسبة.')}
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-1 text-xs border-[#008755]/40 text-[#008755]"
              onClick={() => {
                setSearch('');
                setStatusFilter('All');
                setDeptFilter('All');
              }}
            >
              {tr('Clear Filters', 'مسح عوامل التصفية')}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
