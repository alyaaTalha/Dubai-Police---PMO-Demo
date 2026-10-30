import {
  Lightbulb, Send, Trophy, FileText,
  Clock, ChevronRight, Calendar,
  Award, CheckCircle2, ArrowUpRight,
  MapPin, Users, Zap,
} from 'lucide-react';
import { Badge } from '../../ui/badge';
import { cn } from '../../ui/utils';
import { useLanguage } from '../../../i18n/LanguageContext';
import heroDecoration from '../../../../assets/sandbox-hero-decoration.png';

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

const ROLE_STATS: Record<IdeasRole, { submitted: number; review: number; applied: number; awards: number }> = {
  innovator:   { submitted: 7,  review: 2,  applied: 3,  awards: 1 },
  coordinator: { submitted: 12, review: 4,  applied: 6,  awards: 2 },
  director:    { submitted: 23, review: 8,  applied: 14, awards: 5 },
  admin:       { submitted: 45, review: 15, applied: 28, awards: 9 },
};

const CHALLENGES = [
  {
    title: 'AI-Assisted Crime Prediction Model',
    dept: 'Operations',
    deadline: 'Sep 30, 2025',
    participants: 24,
    tag: 'Closing soon',
    tagColor: 'text-red-600 bg-red-50',
  },
  {
    title: 'Contactless Public Service Kiosks',
    dept: 'Community Affairs',
    deadline: 'Oct 15, 2025',
    participants: 18,
    tag: 'Open',
    tagColor: 'text-[#008755] bg-[#008755]/10',
  },
  {
    title: 'Predictive Fleet Maintenance System',
    dept: 'Logistics',
    deadline: 'Oct 28, 2025',
    participants: 31,
    tag: 'Open',
    tagColor: 'text-[#008755] bg-[#008755]/10',
  },
];

const EVENTS = [
  { month: 'SEP', day: '15', title: 'Innovation Hackathon 2025', location: 'Innovation Lab', time: '9:00 AM' },
  { month: 'SEP', day: '22', title: 'Design Thinking Workshop', location: 'Training Center', time: '2:00 PM' },
  { month: 'OCT', day: '3',  title: 'Smart Policing Summit', location: 'Grand Auditorium', time: '10:00 AM' },
];

const NEWS = [
  { title: 'Dubai Police Wins GITEX Innovation Award 2025', category: 'Awards', date: 'Aug 1' },
  { title: 'New AI Strategy Unveiled for Smart Policing', category: 'Strategy', date: 'Jul 28' },
  { title: 'Innovation Programme Surpasses 1,000 Submissions', category: 'Milestone', date: 'Jul 22' },
];

// Arabic display text for the mock data above (keyed by the English value).
const AR: Record<string, string> = {
  'AI-Assisted Crime Prediction Model': 'نموذج التنبؤ بالجريمة بمساعدة الذكاء الاصطناعي',
  'Contactless Public Service Kiosks': 'أكشاك الخدمات العامة اللاتلامسية',
  'Predictive Fleet Maintenance System': 'نظام الصيانة التنبؤية للأسطول',
  'Operations': 'العمليات',
  'Community Affairs': 'شؤون المجتمع',
  'Logistics': 'الخدمات اللوجستية',
  'Sep 30, 2025': '30 سبتمبر 2025',
  'Oct 15, 2025': '15 أكتوبر 2025',
  'Oct 28, 2025': '28 أكتوبر 2025',
  'Closing soon': 'يغلق قريباً',
  'Open': 'مفتوح',
  'SEP': 'سبتمبر',
  'OCT': 'أكتوبر',
  'Innovation Hackathon 2025': 'هاكاثون الابتكار 2025',
  'Design Thinking Workshop': 'ورشة التفكير التصميمي',
  'Smart Policing Summit': 'قمة الشرطة الذكية',
  'Innovation Lab': 'مختبر الابتكار',
  'Training Center': 'مركز التدريب',
  'Grand Auditorium': 'القاعة الكبرى',
  '9:00 AM': '9:00 ص',
  '2:00 PM': '2:00 م',
  '10:00 AM': '10:00 ص',
  'Dubai Police Wins GITEX Innovation Award 2025': 'شرطة دبي تفوز بجائزة جيتكس للابتكار 2025',
  'New AI Strategy Unveiled for Smart Policing': 'الكشف عن استراتيجية جديدة للذكاء الاصطناعي في الشرطة الذكية',
  'Innovation Programme Surpasses 1,000 Submissions': 'برنامج الابتكار يتجاوز 1,000 مشاركة',
  'Awards': 'الجوائز',
  'Strategy': 'الاستراتيجية',
  'Milestone': 'إنجاز',
  'Aug 1': '1 أغسطس',
  'Jul 28': '28 يوليو',
  'Jul 22': '22 يوليو',
};

export function IdeasHomePage({ user, role, onNavigate }: PageProps) {
  const { tr } = useLanguage();
  const t = (en: string) => tr(en, AR[en]);
  const stats = ROLE_STATS[role];

  return (
    <div className="flex flex-col gap-6 p-6 mx-auto w-full">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl bg-gradient-to-br from-[#005844] via-[#008755] to-[#00a869] p-8 text-white relative overflow-hidden">
        <img
          src={heroDecoration}
          alt=""
          className="absolute -top-16 -end-16 h-160 w-160 rounded-full object-cover opacity-50 pointer-events-none select-none"
        />

        <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs text-white/90">
              <Zap className="h-3 w-3 fill-amber-300 text-amber-300" />
              {user.xp.toLocaleString()} {tr('XP', 'نقطة خبرة')} · {tr(user.chip, user.chipAr)}
            </div>
            <h1 className="text-3xl   tracking-tight">
              {tr('Good morning,', 'صباح الخير،')} {tr(user.name, user.nameAr).split(' ')[0]}
            </h1>
            <p className="text-white/65 text-sm">{tr(user.subtitle, user.subtitleAr)}</p>
          </div>

          <div className="flex flex-col gap-2 sm:items-end">
            <button
              onClick={() => onNavigate('submit-idea')}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm   text-[#008755] hover:bg-white/90 transition-colors shadow-sm"
            >
              <Send className="h-4 w-4" />
              {tr('Submit an Idea', 'قدّم فكرة')}
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => onNavigate('challenges')}
                className="inline-flex items-center gap-1.5 rounded-lg bg-white/15 border border-white/20 px-3 py-1.5 text-xs text-white hover:bg-white/25 transition-colors"
              >
                <Trophy className="h-3.5 w-3.5" />
                {tr('Challenges', 'التحديات')}
              </button>
              <button
                onClick={() => onNavigate('my-ideas')}
                className="inline-flex items-center gap-1.5 rounded-lg bg-white/15 border border-white/20 px-3 py-1.5 text-xs text-white hover:bg-white/25 transition-colors"
              >
                <FileText className="h-3.5 w-3.5" />
                {tr('My Ideas', 'أفكاري')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Activity Stats ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: tr('Submitted', 'المقدّمة'),       value: stats.submitted, icon: Lightbulb,    sub: tr('ideas total', 'إجمالي الأفكار') },
          { label: tr('Under Review', 'قيد المراجعة'), value: stats.review,    icon: Clock,         sub: tr('in progress', 'قيد التنفيذ') },
          { label: tr('Applied', 'المطبّقة'),          value: stats.applied,   icon: CheckCircle2,  sub: tr('implemented', 'تم تنفيذها') },
          { label: tr('Awards', 'الجوائز'),            value: stats.awards,    icon: Award,         sub: tr('recognition', 'التكريم') },
        ].map(({ label, value, icon: Icon, sub }) => (
          <div
            key={label}
            className="bg-card border border-border rounded-xl px-4 py-4 flex items-center gap-3"
          >
            <div className="h-10 w-10 rounded-xl bg-[#008755]/10 flex items-center justify-center flex-shrink-0">
              <Icon className="text-[#008755]" style={{ height: 18, width: 18 }} />
            </div>
            <div>
              <p className="text-2xl   text-foreground leading-none">{value}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Main content: Challenges + Sidebar ─────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Active Challenges */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border">
            <h2 className="text-sm   text-foreground">{tr('Active Challenges', 'التحديات النشطة')}</h2>
            <button
              onClick={() => onNavigate('challenges')}
              className="inline-flex items-center gap-0.5 text-xs text-[#008755] hover:underline"
            >
              {tr('View all', 'عرض الكل')} <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
            </button>
          </div>
          <div className="divide-y divide-border">
            {CHALLENGES.map((ch) => (
              <div
                key={ch.title}
                className="flex items-center gap-4 px-5 py-4 hover:bg-muted/30 transition-colors cursor-pointer group"
                onClick={() => onNavigate('challenges')}
              >
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-start gap-2">
                    <p className="text-sm text-foreground leading-snug   flex-1">
                      {t(ch.title)}
                    </p>
                    <span className={cn('text-[10px] rounded-full px-2 py-0.5 flex-shrink-0 font-medium', ch.tagColor)}>
                      {t(ch.tag)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {t(ch.deadline)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" /> {ch.participants} {tr('joined', 'مشارك')}
                    </span>
                    <Badge className="bg-[#008755]/10 text-[#008755] border-0 text-[10px] px-1.5 py-0">
                      {t(ch.dept)}
                    </Badge>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100 text-muted-foreground/40 group-hover:text-[#008755] transition-colors flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Events + Quick News */}
        <div className="flex flex-col gap-4">

          {/* Upcoming Events */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-border">
              <h2 className="text-sm   text-foreground">{tr('Upcoming Events', 'الفعاليات القادمة')}</h2>
            </div>
            <div className="divide-y divide-border">
              {EVENTS.map((ev) => (
                <div key={ev.title} className="flex items-center gap-3 px-4 py-3">
                  <div className="flex flex-col items-center justify-center bg-[#008755]/10 rounded-lg w-10 h-10 flex-shrink-0">
                    <span className="text-[9px]   text-[#008755] uppercase leading-none">{t(ev.month)}</span>
                    <span className="text-base   text-[#008755] leading-tight">{ev.day}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs   text-foreground leading-snug truncate">{t(ev.title)}</p>
                    <div className="flex items-center gap-2.5 mt-0.5 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-0.5">
                        <MapPin className="h-2.5 w-2.5" /> {t(ev.location)}
                      </span>
                      <span>{t(ev.time)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* News */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-border">
              <h2 className="text-sm   text-foreground">{tr('Innovation News', 'أخبار الابتكار')}</h2>
              <button
                onClick={() => onNavigate('innovation-news')}
                className="text-xs text-[#008755] hover:underline flex items-center gap-0.5"
              >
                {tr('All', 'الكل')} <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
              </button>
            </div>
            <div className="divide-y divide-border">
              {NEWS.map((n) => (
                <div key={n.title} className="px-4 py-3 flex items-start justify-between gap-2 cursor-pointer hover:bg-muted/30 transition-colors">
                  <div className="space-y-1 min-w-0">
                    <p className="text-xs text-foreground leading-snug line-clamp-2">{t(n.title)}</p>
                    <span className={cn(
                      'inline-block text-[10px] rounded-full px-2 py-0.5',
                      n.category === 'Awards'    ? 'bg-amber-50 text-amber-700' :
                      n.category === 'Strategy'  ? 'bg-[#008755]/10 text-[#008755]' :
                                                   'bg-blue-50 text-blue-700'
                    )}>
                      {t(n.category)}
                    </span>
                  </div>
                  <span className="text-[11px] text-muted-foreground flex-shrink-0">{t(n.date)}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
