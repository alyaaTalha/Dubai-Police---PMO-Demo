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

type IdeasRole = 'innovator' | 'coordinator' | 'director' | 'admin';

interface User {
  name: string;
  role: string;
  subtitle: string;
  xp: number;
  initials: string;
  chip: string;
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
  timeAgo: string;
  sortMinutes: number; // for interleaved sort
  actionLabel: string;
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
    timeAgo: '2h ago',
    sortMinutes: 120,
    actionLabel: 'View Idea',
    actionId: 'idea-ai-queue',
  },
  {
    id: 'inv-2',
    audience: 'innovator',
    type: 'action',
    icon: MessageSquare,
    title: 'Reviewer requested more information on "Smart Patrol Routing"',
    timeAgo: '5h ago',
    sortMinutes: 300,
    actionLabel: 'Respond Now',
    actionId: 'idea-smart-patrol',
  },
  {
    id: 'inv-3',
    audience: 'innovator',
    type: 'alert',
    icon: Bell,
    title: 'Challenge closing soon: "Digital Evidence Management" — closes in 2 days',
    timeAgo: '1d ago',
    sortMinutes: 1440,
    actionLabel: 'View Challenge',
    actionId: 'challenge-digital-evidence',
  },
  {
    id: 'inv-4',
    audience: 'innovator',
    type: 'info',
    icon: Zap,
    title: 'Similar idea detected: Your idea overlaps with "Smart Evidence Portal" submitted in March',
    timeAgo: '2d ago',
    sortMinutes: 2880,
    actionLabel: 'Compare Ideas',
    actionId: 'compare-ideas',
  },
  {
    id: 'inv-5',
    audience: 'innovator',
    type: 'info',
    icon: Trophy,
    title: 'You earned the "First Approval" badge',
    timeAgo: '3d ago',
    sortMinutes: 4320,
    actionLabel: 'View Profile',
    actionId: 'profile',
  },

  // ── Coordinator ────────────────────────────────────────────────────────────
  {
    id: 'crd-1',
    audience: 'coordinator',
    type: 'action',
    icon: ClipboardList,
    title: '5 new ideas pending your review',
    timeAgo: '1h ago',
    sortMinutes: 60,
    actionLabel: 'Review Ideas',
    actionId: 'review-ideas',
  },
  {
    id: 'crd-2',
    audience: 'coordinator',
    type: 'info',
    icon: GitMerge,
    title: 'Idea cluster ready: 3 similar AI-related ideas need clustering',
    timeAgo: '3h ago',
    sortMinutes: 180,
    actionLabel: 'View Cluster',
    actionId: 'idea-cluster',
  },
  {
    id: 'crd-3',
    audience: 'coordinator',
    type: 'success',
    icon: CheckCircle2,
    title: 'Department Director approved the "Smart Patrol Routing" idea',
    timeAgo: '6h ago',
    sortMinutes: 360,
    actionLabel: 'View Idea',
    actionId: 'idea-smart-patrol',
  },
  {
    id: 'crd-4',
    audience: 'coordinator',
    type: 'alert',
    icon: Clock,
    title: 'Review deadline approaching: 8 ideas due for review by Sep 10',
    timeAgo: '1d ago',
    sortMinutes: 1440,
    actionLabel: 'Review Now',
    actionId: 'review-deadline',
  },

  // ── Director ───────────────────────────────────────────────────────────────
  {
    id: 'dir-1',
    audience: 'director',
    type: 'action',
    icon: ArrowUp,
    title: '3 ideas escalated for your decision',
    timeAgo: '2h ago',
    sortMinutes: 120,
    actionLabel: 'Review Pipeline',
    actionId: 'pipeline',
  },
  {
    id: 'dir-2',
    audience: 'director',
    type: 'info',
    icon: BarChart2,
    title: 'Monthly innovation report is ready',
    timeAgo: '1d ago',
    sortMinutes: 1440,
    actionLabel: 'View Report',
    actionId: 'innovation-report',
  },
  {
    id: 'dir-3',
    audience: 'director',
    type: 'success',
    icon: Medal,
    title: 'Your department ranked #2 in Ideas Adopted this month',
    timeAgo: '2d ago',
    sortMinutes: 2880,
    actionLabel: 'View Leaderboard',
    actionId: 'leaderboard',
  },
  {
    id: 'dir-4',
    audience: 'director',
    type: 'action',
    icon: CheckSquare,
    title: 'Coordinator submitted 12 ideas for your approval',
    timeAgo: '3d ago',
    sortMinutes: 4320,
    actionLabel: 'Approve / Reject',
    actionId: 'approve-ideas',
  },
];

// ── Border colors by type ──────────────────────────────────────────────────────
const TYPE_BORDER: Record<NotifType, string> = {
  success: 'border-l-4 border-[#008755]',
  action:  'border-l-4 border-amber-400',
  alert:   'border-l-4 border-[#E4002B]',
  info:    'border-l-4 border-blue-400',
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
              {notif.title}
            </p>
            <span className="text-xs text-[#8D9093] flex-shrink-0 mt-0.5">{notif.timeAgo}</span>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <Button
              size="sm"
              onClick={() => onNavigate(notif.actionId)}
              className="h-7 px-3 text-xs bg-[#008755] hover:bg-[#005844] text-white rounded-lg"
            >
              {notif.actionLabel}
            </Button>

            {!isRead && (
              <button
                onClick={() => onRead(notif.id)}
                className="text-xs text-[#8D9093] hover:text-[#005844] transition-colors underline underline-offset-2"
              >
                Mark as read
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
  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center py-16 text-[#8D9093]">
        <BellRing className="w-10 h-10 mb-3 opacity-30" />
        <p className="text-sm">No notifications to show</p>
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
              Notifications
            </h1>
            {unreadCount > 0 && (
              <p className="text-sm text-[#8D9093] mt-0.5">{unreadCount} unread</p>
            )}
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => markAllRead(roleNotifications.map((n) => n.id))}
            className="text-xs border-[#008755] text-[#008755] hover:bg-[#008755]/5"
          >
            <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
            Mark all as read
          </Button>
        </div>

        {/* Admin role tabs */}
        <Tabs defaultValue="all">
          <TabsList className="bg-gray-100 rounded-lg p-1 w-full sm:w-auto">
            <TabsTrigger value="all" className="text-xs data-[state=active]:bg-white data-[state=active]:text-[#008755] data-[state=active]:shadow-sm rounded-md px-4">
              All Roles
            </TabsTrigger>
            <TabsTrigger value="innovator" className="text-xs data-[state=active]:bg-white data-[state=active]:text-[#008755] data-[state=active]:shadow-sm rounded-md px-4">
              Innovator
            </TabsTrigger>
            <TabsTrigger value="coordinator" className="text-xs data-[state=active]:bg-white data-[state=active]:text-[#008755] data-[state=active]:shadow-sm rounded-md px-4">
              Coordinator
            </TabsTrigger>
            <TabsTrigger value="director" className="text-xs data-[state=active]:bg-white data-[state=active]:text-[#008755] data-[state=active]:shadow-sm rounded-md px-4">
              Director
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
            Notifications
          </h1>
          {unreadCount > 0 && (
            <p className="text-sm text-[#8D9093] mt-0.5">{unreadCount} unread</p>
          )}
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={() => markAllRead(roleNotifications.map((n) => n.id))}
          className="text-xs border-[#008755] text-[#008755] hover:bg-[#008755]/5"
        >
          <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
          Mark all as read
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
