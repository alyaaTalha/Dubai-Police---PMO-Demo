import { useState, useMemo } from 'react';
import {
  CheckCircle2, MessageSquare, Bell, Zap, Trophy,
  ClipboardList, GitMerge, Clock, ArrowUp, BarChart2,
  Medal, CheckSquare, BellRing,
} from 'lucide-react';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/tabs';
import { cn } from '../../ui/utils';
import { useLanguage } from '../../../i18n/LanguageContext';

type IdeasRole = 'innovator' | 'coordinator' | 'director' | 'admin';

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

interface PageProps {
  user: User;
  role: IdeasRole;
  onNavigate: (id: string) => void;
}

// ── Types ──────────────────────────────────────────────────────────────────────
type NotifType = 'success' | 'action' | 'alert' | 'info';
type NotifAudience = 'innovator' | 'coordinator' | 'director';

interface Notification {
  id: string;
  audience: NotifAudience;
  type: NotifType;
  icon: React.ElementType;
  title: string;
  titleAr: string;
  timeAgo: string;
  sortMinutes: number; // for interleaved sort
  actionLabel: string;
  actionLabelAr: string;
  actionId: string;
}

// ── Notification data ──────────────────────────────────────────────────────────
const ALL_NOTIFICATIONS: Notification[] = [
  // ── Innovator ──────────────────────────────────────────────────────────────
  {
    id: 'inv-1',
    audience: 'innovator',
    type: 'success',
    icon: CheckCircle2,
    title: 'Your idea "AI Queue Management" has been approved',
    titleAr: 'تمت الموافقة على فكرتك "إدارة الطوابير بالذكاء الاصطناعي"',
    timeAgo: '2h ago',
    sortMinutes: 120,
    actionLabel: 'View Idea',
    actionLabelAr: 'عرض الفكرة',
    actionId: 'idea-ai-queue',
  },
  {
    id: 'inv-2',
    audience: 'innovator',
    type: 'action',
    icon: MessageSquare,
    title: 'Reviewer requested more information on "Smart Patrol Routing"',
    titleAr: 'طلب المراجع مزيداً من المعلومات حول "التوجيه الذكي للدوريات"',
    timeAgo: '5h ago',
    sortMinutes: 300,
    actionLabel: 'Respond Now',
    actionLabelAr: 'الرد الآن',
    actionId: 'idea-smart-patrol',
  },
  {
    id: 'inv-3',
    audience: 'innovator',
    type: 'alert',
    icon: Bell,
    title: 'Challenge closing soon: "Digital Evidence Management" — closes in 2 days',
    titleAr: 'تحدٍّ يغلق قريباً: "إدارة الأدلة الرقمية" — يغلق خلال يومين',
    timeAgo: '1d ago',
    sortMinutes: 1440,
    actionLabel: 'View Challenge',
    actionLabelAr: 'عرض التحدي',
    actionId: 'challenge-digital-evidence',
  },
  {
    id: 'inv-4',
    audience: 'innovator',
    type: 'info',
    icon: Zap,
    title: 'Similar idea detected: Your idea overlaps with "Smart Evidence Portal" submitted in March',
    titleAr: 'تم رصد فكرة مشابهة: فكرتك تتداخل مع "بوابة الأدلة الذكية" المقدّمة في مارس',
    timeAgo: '2d ago',
    sortMinutes: 2880,
    actionLabel: 'Compare Ideas',
    actionLabelAr: 'مقارنة الأفكار',
    actionId: 'compare-ideas',
  },
  {
    id: 'inv-5',
    audience: 'innovator',
    type: 'info',
    icon: Trophy,
    title: 'You earned the "First Approval" badge',
    titleAr: 'حصلت على شارة "الموافقة الأولى"',
    timeAgo: '3d ago',
    sortMinutes: 4320,
    actionLabel: 'View Profile',
    actionLabelAr: 'عرض الملف الشخصي',
    actionId: 'profile',
  },

  // ── Coordinator ────────────────────────────────────────────────────────────
  {
    id: 'crd-1',
    audience: 'coordinator',
    type: 'action',
    icon: ClipboardList,
    title: '5 new ideas pending your review',
    titleAr: '5 أفكار جديدة بانتظار مراجعتك',
    timeAgo: '1h ago',
    sortMinutes: 60,
    actionLabel: 'Review Ideas',
    actionLabelAr: 'مراجعة الأفكار',
    actionId: 'review-ideas',
  },
  {
    id: 'crd-2',
    audience: 'coordinator',
    type: 'info',
    icon: GitMerge,
    title: 'Idea cluster ready: 3 similar AI-related ideas need clustering',
    titleAr: 'مجموعة أفكار جاهزة: 3 أفكار متشابهة متعلقة بالذكاء الاصطناعي بحاجة إلى التجميع',
    timeAgo: '3h ago',
    sortMinutes: 180,
    actionLabel: 'View Cluster',
    actionLabelAr: 'عرض المجموعة',
    actionId: 'idea-cluster',
  },
  {
    id: 'crd-3',
    audience: 'coordinator',
    type: 'success',
    icon: CheckCircle2,
    title: 'Department Director approved the "Smart Patrol Routing" idea',
    titleAr: 'وافق مدير الإدارة على فكرة "التوجيه الذكي للدوريات"',
    timeAgo: '6h ago',
    sortMinutes: 360,
    actionLabel: 'View Idea',
    actionLabelAr: 'عرض الفكرة',
    actionId: 'idea-smart-patrol',
  },
  {
    id: 'crd-4',
    audience: 'coordinator',
    type: 'alert',
    icon: Clock,
    title: 'Review deadline approaching: 8 ideas due for review by Sep 10',
    titleAr: 'اقتراب الموعد النهائي للمراجعة: 8 أفكار مستحقة المراجعة بحلول 10 سبتمبر',
    timeAgo: '1d ago',
    sortMinutes: 1440,
    actionLabel: 'Review Now',
    actionLabelAr: 'المراجعة الآن',
    actionId: 'review-deadline',
  },

  // ── Director ───────────────────────────────────────────────────────────────
  {
    id: 'dir-1',
    audience: 'director',
    type: 'action',
    icon: ArrowUp,
    title: '3 ideas escalated for your decision',
    titleAr: 'تم تصعيد 3 أفكار لاتخاذ قرارك',
    timeAgo: '2h ago',
    sortMinutes: 120,
    actionLabel: 'Review Pipeline',
    actionLabelAr: 'مراجعة مسار الأفكار',
    actionId: 'pipeline',
  },
  {
    id: 'dir-2',
    audience: 'director',
    type: 'info',
    icon: BarChart2,
    title: 'Monthly innovation report is ready',
    titleAr: 'تقرير الابتكار الشهري جاهز',
    timeAgo: '1d ago',
    sortMinutes: 1440,
    actionLabel: 'View Report',
    actionLabelAr: 'عرض التقرير',
    actionId: 'innovation-report',
  },
  {
    id: 'dir-3',
    audience: 'director',
    type: 'success',
    icon: Medal,
    title: 'Your department ranked #2 in Ideas Adopted this month',
    titleAr: 'حلّت إدارتك في المركز الثاني في الأفكار المعتمدة هذا الشهر',
    timeAgo: '2d ago',
    sortMinutes: 2880,
    actionLabel: 'View Leaderboard',
    actionLabelAr: 'عرض لوحة المتصدرين',
    actionId: 'leaderboard',
  },
  {
    id: 'dir-4',
    audience: 'director',
    type: 'action',
    icon: CheckSquare,
    title: 'Coordinator submitted 12 ideas for your approval',
    titleAr: 'قدّم المنسق 12 فكرة لاعتمادك',
    timeAgo: '3d ago',
    sortMinutes: 4320,
    actionLabel: 'Approve / Reject',
    actionLabelAr: 'اعتماد / رفض',
    actionId: 'approve-ideas',
  },
];

const TIME_AGO_AR: Record<string, string> = {
  '1h ago': 'منذ ساعة',
  '2h ago': 'منذ ساعتين',
  '3h ago': 'منذ 3 ساعات',
  '5h ago': 'منذ 5 ساعات',
  '6h ago': 'منذ 6 ساعات',
  '1d ago': 'منذ يوم',
  '2d ago': 'منذ يومين',
  '3d ago': 'منذ 3 أيام',
};

// ── Border colors by type ──────────────────────────────────────────────────────
const TYPE_BORDER: Record<NotifType, string> = {
  success: 'border-s-4 border-[#008755]',
  action:  'border-s-4 border-amber-400',
  alert:   'border-s-4 border-[#E4002B]',
  info:    'border-s-4 border-blue-400',
};

const TYPE_ICON_COLOR: Record<NotifType, string> = {
  success: 'text-[#008755]',
  action:  'text-amber-500',
  alert:   'text-[#E4002B]',
  info:    'text-blue-500',
};

// ── Single notification row ────────────────────────────────────────────────────
function NotificationRow({
  notif,
  isRead,
  onRead,
  onNavigate,
}: {
  notif: Notification;
  isRead: boolean;
  onRead: (id: string) => void;
  onNavigate: (id: string) => void;
}) {
  const { tr } = useLanguage();
  const Icon = notif.icon;

  return (
    <div
      className={cn(
        'rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-colors',
        TYPE_BORDER[notif.type],
        !isRead && 'bg-[#008755]/5',
        isRead && 'bg-white',
      )}
    >
      <div className="flex items-start gap-3 px-4 py-3">
        {/* Icon */}
        <div className={cn('mt-0.5 flex-shrink-0', TYPE_ICON_COLOR[notif.type])}>
          <Icon className="w-5 h-5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className={cn('text-sm leading-snug', !isRead ? 'font-semibold text-[#1a1a1a]' : 'text-[#444]')}>
              {tr(notif.title, notif.titleAr)}
            </p>
            <span className="text-xs text-[#8D9093] flex-shrink-0 mt-0.5">{tr(notif.timeAgo, TIME_AGO_AR[notif.timeAgo])}</span>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <Button
              size="sm"
              onClick={() => onNavigate(notif.actionId)}
              className="h-7 px-3 text-xs bg-[#008755] hover:bg-[#005844] text-white rounded-lg"
            >
              {tr(notif.actionLabel, notif.actionLabelAr)}
            </Button>

            {!isRead && (
              <button
                onClick={() => onRead(notif.id)}
                className="text-xs text-[#8D9093] hover:text-[#005844] transition-colors underline underline-offset-2"
              >
                {tr('Mark as read', 'تعيين كمقروء')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Notification list ──────────────────────────────────────────────────────────
function NotificationList({
  notifications,
  readSet,
  onRead,
  onNavigate,
}: {
  notifications: Notification[];
  readSet: Set<string>;
  onRead: (id: string) => void;
  onNavigate: (id: string) => void;
}) {
  const { tr } = useLanguage();
  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center py-16 text-[#8D9093]">
        <BellRing className="w-10 h-10 mb-3 opacity-30" />
        <p className="text-sm">{tr('No notifications to show', 'لا توجد إشعارات لعرضها')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {notifications.map((n) => (
        <NotificationRow
          key={n.id}
          notif={n}
          isRead={readSet.has(n.id)}
          onRead={onRead}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
export function NotificationsPage({ user, role, onNavigate }: PageProps) {
  const { tr } = useLanguage();
  // All notifications start as unread
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  const markRead = (id: string) => {
    setReadIds((prev) => new Set([...prev, id]));
  };

  const markAllRead = (ids: string[]) => {
    setReadIds((prev) => new Set([...prev, ...ids]));
  };

  // Derive the list for the current role (non-admin)
  const roleNotifications = useMemo(() => {
    if (role === 'admin') return ALL_NOTIFICATIONS.slice().sort((a, b) => a.sortMinutes - b.sortMinutes);
    const audienceMap: Record<Exclude<IdeasRole, 'admin'>, NotifAudience> = {
      innovator: 'innovator',
      coordinator: 'coordinator',
      director: 'director',
    };
    return ALL_NOTIFICATIONS
      .filter((n) => n.audience === audienceMap[role as Exclude<IdeasRole, 'admin'>])
      .sort((a, b) => a.sortMinutes - b.sortMinutes);
  }, [role]);

  const byAudience = (audience: NotifAudience) =>
    ALL_NOTIFICATIONS.filter((n) => n.audience === audience).sort((a, b) => a.sortMinutes - b.sortMinutes);

  const unreadCount = roleNotifications.filter((n) => !readIds.has(n.id)).length;

  // ── Admin view with role tabs ────────────────────────────────────────────────
  if (role === 'admin') {
    return (
      <div className="space-y-6 pb-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1
              className="text-2xl text-[#005844] tracking-tight"
              style={{ fontFamily: "'Dubai Medium', sans-serif" }}
            >
              {tr('Notifications', 'الإشعارات')}
            </h1>
            {unreadCount > 0 && (
              <p className="text-sm text-[#8D9093] mt-0.5">{unreadCount} {tr('unread', 'غير مقروءة')}</p>
            )}
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => markAllRead(roleNotifications.map((n) => n.id))}
            className="text-xs border-[#008755] text-[#008755] hover:bg-[#008755]/5"
          >
            <CheckCircle2 className="w-3.5 h-3.5 me-1.5" />
            {tr('Mark all as read', 'تعيين الكل كمقروء')}
          </Button>
        </div>

        {/* Admin role tabs */}
        <Tabs defaultValue="all">
          <TabsList className="bg-gray-100 rounded-lg p-1 w-full sm:w-auto">
            <TabsTrigger value="all" className="text-xs data-[state=active]:bg-white data-[state=active]:text-[#008755] data-[state=active]:shadow-sm rounded-md px-4">
              {tr('All Roles', 'جميع الأدوار')}
            </TabsTrigger>
            <TabsTrigger value="innovator" className="text-xs data-[state=active]:bg-white data-[state=active]:text-[#008755] data-[state=active]:shadow-sm rounded-md px-4">
              {tr('Innovator', 'المبتكر')}
            </TabsTrigger>
            <TabsTrigger value="coordinator" className="text-xs data-[state=active]:bg-white data-[state=active]:text-[#008755] data-[state=active]:shadow-sm rounded-md px-4">
              {tr('Coordinator', 'المنسق')}
            </TabsTrigger>
            <TabsTrigger value="director" className="text-xs data-[state=active]:bg-white data-[state=active]:text-[#008755] data-[state=active]:shadow-sm rounded-md px-4">
              {tr('Director', 'المدير')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <NotificationList
              notifications={roleNotifications}
              readSet={readIds}
              onRead={markRead}
              onNavigate={onNavigate}
            />
          </TabsContent>

          <TabsContent value="innovator" className="mt-4">
            <NotificationList
              notifications={byAudience('innovator')}
              readSet={readIds}
              onRead={markRead}
              onNavigate={onNavigate}
            />
          </TabsContent>

          <TabsContent value="coordinator" className="mt-4">
            <NotificationList
              notifications={byAudience('coordinator')}
              readSet={readIds}
              onRead={markRead}
              onNavigate={onNavigate}
            />
          </TabsContent>

          <TabsContent value="director" className="mt-4">
            <NotificationList
              notifications={byAudience('director')}
              readSet={readIds}
              onRead={markRead}
              onNavigate={onNavigate}
            />
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  // ── Non-admin view ───────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-2xl text-[#005844] tracking-tight"
            style={{ fontFamily: "'Dubai Medium', sans-serif" }}
          >
            {tr('Notifications', 'الإشعارات')}
          </h1>
          {unreadCount > 0 && (
            <p className="text-sm text-[#8D9093] mt-0.5">{unreadCount} {tr('unread', 'غير مقروءة')}</p>
          )}
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={() => markAllRead(roleNotifications.map((n) => n.id))}
          className="text-xs border-[#008755] text-[#008755] hover:bg-[#008755]/5"
        >
          <CheckCircle2 className="w-3.5 h-3.5 me-1.5" />
          {tr('Mark all as read', 'تعيين الكل كمقروء')}
        </Button>
      </div>

      <NotificationList
        notifications={roleNotifications}
        readSet={readIds}
        onRead={markRead}
        onNavigate={onNavigate}
      />
    </div>
  );
}
