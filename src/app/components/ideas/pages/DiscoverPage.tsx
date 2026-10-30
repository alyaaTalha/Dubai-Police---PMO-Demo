import { useState, useMemo, useRef, useEffect, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { cn } from '../../ui/utils';
import { useLanguage } from '../../../i18n/LanguageContext';
import {
  Sparkles, Search, ArrowRight, TrendingUp, Lightbulb, Users,
  AlertCircle, BarChart2, ChevronRight, Bot, Send, Star, Zap,
} from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

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

type ChatMessage = { role: 'user' | 'ai'; content: string | ReactNode };

// ── Browse ideas data ─────────────────────────────────────────────────────────

const IDEAS = [
  { id: 1,  title: 'Smart Queue Management',        cluster: 'Customer Experience',   dept: 'Digital Transformation', submitter: 'Fatima Al Mansoori', date: 'Jun 2025', status: 'Approved',         fit: 'High',   effort: 'Low',    ai: 'Strong' },
  { id: 2,  title: 'AI Patrol Scheduling',           cluster: 'Smart Operations',      dept: 'Operations',             submitter: 'Omar Al Zaabi',      date: 'Jun 2025', status: 'Director Review', fit: 'High',   effort: 'High',   ai: 'Strong' },
  { id: 3,  title: 'Community Feedback Automation',  cluster: 'Community Engagement',  dept: 'Community Affairs',      submitter: 'Hessa Al Blooshi',   date: 'May 2025', status: 'Under Review',    fit: 'High',   effort: 'Medium', ai: 'Strong' },
  { id: 4,  title: 'Digital Training Badges',        cluster: 'HR Innovation',         dept: 'HR & Training',          submitter: 'Saeed Al Ketbi',     date: 'May 2025', status: 'Approved',         fit: 'High',   effort: 'Low',    ai: 'Strong' },
  { id: 5,  title: 'Mobile Field Reports',           cluster: 'Process Automation',    dept: 'HR & Training',          submitter: 'Saeed Al Ketbi',     date: 'Apr 2025', status: 'Director Review', fit: 'Medium', effort: 'Medium', ai: 'Review' },
  { id: 6,  title: 'E-Grievance Tracker',            cluster: 'Customer Experience',   dept: 'Digital Transformation', submitter: 'Fatima Al Mansoori', date: 'Apr 2025', status: 'Submitted',        fit: 'Low',    effort: 'High',   ai: 'Review' },
  { id: 7,  title: 'Predictive Patrol Scheduling',   cluster: 'Smart Operations',      dept: 'Operations',             submitter: 'Omar Al Zaabi',      date: 'Mar 2025', status: 'Director Review', fit: 'Medium', effort: 'High',   ai: 'Review' },
  { id: 8,  title: 'Smart Evidence Tagging',         cluster: 'Safety & Security',     dept: 'Legal Affairs',          submitter: 'Mariam Al Suwaidi',  date: 'Mar 2025', status: 'Approved',         fit: 'High',   effort: 'Medium', ai: 'Strong' },
  { id: 9,  title: 'Green Fleet Initiative',         cluster: 'Sustainability',        dept: 'Operations',             submitter: 'Omar Al Zaabi',      date: 'Feb 2025', status: 'Submitted',        fit: 'Medium', effort: 'High',   ai: 'Review' },
  { id: 10, title: 'Real-Time Wait Times Display',   cluster: 'Customer Experience',   dept: 'Community Affairs',      submitter: 'Hessa Al Blooshi',   date: 'Feb 2025', status: 'Implemented',      fit: 'High',   effort: 'Low',    ai: 'Strong' },
  { id: 11, title: 'AR Training Simulations',        cluster: 'HR Innovation',         dept: 'HR & Training',          submitter: 'Saeed Al Ketbi',     date: 'Jan 2025', status: 'Submitted',        fit: 'Medium', effort: 'High',   ai: 'Review' },
  { id: 12, title: 'Smart Parking Enforcement',      cluster: 'Process Automation',    dept: 'Operations',             submitter: 'Omar Al Zaabi',      date: 'Jan 2025', status: 'Rejected',         fit: 'Low',    effort: 'High',   ai: 'Review' },
];

// ── Decide queue ──────────────────────────────────────────────────────────────

const DECIDE_QUEUE = [
  { id: 5,  title: 'Mobile Field Reports',         cluster: 'Process Automation', dept: 'HR & Training',   fit: 'Medium', effort: 'Medium', aiRec: 'Needs review', desc: 'Enables officers to submit field incident reports via mobile devices in real-time. Reduces administrative backlog and improves data accuracy at the point of capture.' },
  { id: 6,  title: 'E-Grievance Tracker',          cluster: 'Customer Experience', dept: 'Digital Transformation', fit: 'Low', effort: 'High', aiRec: 'Needs review', desc: 'A digital portal for citizens to submit and track the status of grievances. Requires significant integration with legacy case management systems.' },
  { id: 7,  title: 'Predictive Patrol Scheduling', cluster: 'Smart Operations',   dept: 'Operations',      fit: 'Medium', effort: 'High',   aiRec: 'Needs review', desc: 'Uses historical crime data and ML models to recommend optimal patrol routes and schedules. Promising approach but needs accuracy validation before rollout.' },
  { id: 9,  title: 'Green Fleet Initiative',       cluster: 'Sustainability',     dept: 'Operations',      fit: 'Medium', effort: 'High',   aiRec: 'Needs review', desc: 'Proposal to replace 30% of the vehicle fleet with electric alternatives over 36 months. Aligns with national sustainability targets but requires capital investment.' },
  { id: 11, title: 'AR Training Simulations',      cluster: 'HR Innovation',      dept: 'HR & Training',   fit: 'Medium', effort: 'High',   aiRec: 'Needs review', desc: 'Augmented reality training modules for high-risk scenario practice without physical risk. High development cost; recommend piloting in one division first.' },
  { id: 12, title: 'Smart Parking Enforcement',    cluster: 'Process Automation', dept: 'Operations',      fit: 'Low',    effort: 'High',   aiRec: 'Needs review', desc: 'Automated license-plate scanning for parking violations to reduce manual enforcement patrols. Overlap with existing RTA initiative may limit strategic value.' },
];

// ── Cluster color map ─────────────────────────────────────────────────────────

const CLUSTER_COLORS: Record<string, string> = {
  'Customer Experience':  'bg-blue-100   text-blue-700',
  'Smart Operations':     'bg-purple-100 text-purple-700',
  'Community Engagement': 'bg-teal-100   text-teal-700',
  'HR Innovation':        'bg-orange-100 text-orange-700',
  'Process Automation':   'bg-yellow-100 text-yellow-700',
  'Safety & Security':    'bg-red-100    text-red-700',
  'Sustainability':       'bg-green-100  text-green-700',
};

const clusterColor = (cluster: string) =>
  CLUSTER_COLORS[cluster] ?? 'bg-gray-100 text-gray-700';

// ── Status color map ──────────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, string> = {
  Submitted:        'bg-gray-100    text-gray-600',
  'Under Review':   'bg-blue-100   text-blue-700',
  'Director Review':'bg-yellow-100 text-yellow-700',
  Approved:         'bg-green-100  text-green-700',
  Implemented:      'bg-emerald-100 text-emerald-700',
  Rejected:         'bg-red-100    text-red-600',
};

// ── Arabic display translations (keyed by English value; render-time only) ──────

const AR: Record<string, string> = {
  // Idea titles
  'Smart Queue Management': 'الإدارة الذكية للطوابير',
  'AI Patrol Scheduling': 'جدولة الدوريات بالذكاء الاصطناعي',
  'Community Feedback Automation': 'أتمتة ملاحظات المجتمع',
  'Digital Training Badges': 'الشارات الرقمية للتدريب',
  'Mobile Field Reports': 'التقارير الميدانية عبر الهاتف',
  'E-Grievance Tracker': 'متتبع الشكاوى الإلكترونية',
  'E-Grievance Resolution Tracker': 'متتبع حل الشكاوى الإلكترونية',
  'Predictive Patrol Scheduling': 'الجدولة التنبؤية للدوريات',
  'Smart Evidence Tagging': 'الوسم الذكي للأدلة',
  'Green Fleet Initiative': 'مبادرة الأسطول الأخضر',
  'Real-Time Wait Times Display': 'عرض أوقات الانتظار لحظياً',
  'AR Training Simulations': 'محاكاة التدريب بالواقع المعزز',
  'Smart Parking Enforcement': 'الرقابة الذكية على المواقف',
  'Drone Emergency Response Kit': 'حقيبة الاستجابة للطوارئ بالطائرات المسيّرة',
  // Clusters
  'Customer Experience': 'تجربة المتعاملين',
  'Smart Operations': 'العمليات الذكية',
  'Community Engagement': 'المشاركة المجتمعية',
  'HR Innovation': 'ابتكار الموارد البشرية',
  'Process Automation': 'أتمتة الإجراءات',
  'Safety & Security': 'السلامة والأمن',
  'Sustainability': 'الاستدامة',
  // Departments
  'Digital Transformation': 'التحول الرقمي',
  'Operations': 'العمليات',
  'Community Affairs': 'شؤون المجتمع',
  'HR & Training': 'الموارد البشرية والتدريب',
  'Legal Affairs': 'الشؤون القانونية',
  // People
  'Fatima Al Mansoori': 'فاطمة المنصوري',
  'Omar Al Zaabi': 'عمر الزعابي',
  'Hessa Al Blooshi': 'حصة البلوشي',
  'Saeed Al Ketbi': 'سعيد الكتبي',
  'Mariam Al Suwaidi': 'مريم السويدي',
  // Dates
  'Jun 2025': 'يونيو 2025',
  'May 2025': 'مايو 2025',
  'Apr 2025': 'أبريل 2025',
  'Mar 2025': 'مارس 2025',
  'Feb 2025': 'فبراير 2025',
  'Jan 2025': 'يناير 2025',
  // Statuses / decisions
  'Submitted': 'مقدمة',
  'Under Review': 'قيد المراجعة',
  'Director Review': 'مراجعة المدير',
  'Approved': 'معتمدة',
  'Implemented': 'منفذة',
  'Rejected': 'مرفوضة',
  'Skipped': 'متخطاة',
  // Levels / AI signal
  'High': 'مرتفع',
  'Medium': 'متوسط',
  'Low': 'منخفض',
  'Needs review': 'تحتاج إلى مراجعة',
  'Strong potential': 'إمكانات قوية',
  // Decide queue descriptions
  'Enables officers to submit field incident reports via mobile devices in real-time. Reduces administrative backlog and improves data accuracy at the point of capture.':
    'تمكّن الضباط من تقديم تقارير الحوادث الميدانية عبر الأجهزة المحمولة بشكل لحظي، مما يقلل التراكم الإداري ويحسّن دقة البيانات عند جمعها.',
  'A digital portal for citizens to submit and track the status of grievances. Requires significant integration with legacy case management systems.':
    'بوابة رقمية تتيح للمتعاملين تقديم الشكاوى ومتابعة حالتها. تتطلب تكاملاً كبيراً مع أنظمة إدارة القضايا القديمة.',
  'Uses historical crime data and ML models to recommend optimal patrol routes and schedules. Promising approach but needs accuracy validation before rollout.':
    'تستخدم بيانات الجرائم التاريخية ونماذج التعلم الآلي لاقتراح المسارات والجداول المثلى للدوريات. نهج واعد لكنه يحتاج إلى التحقق من الدقة قبل التعميم.',
  'Proposal to replace 30% of the vehicle fleet with electric alternatives over 36 months. Aligns with national sustainability targets but requires capital investment.':
    'مقترح لاستبدال 30% من أسطول المركبات ببدائل كهربائية خلال 36 شهراً. يتوافق مع مستهدفات الاستدامة الوطنية لكنه يتطلب استثماراً رأسمالياً.',
  'Augmented reality training modules for high-risk scenario practice without physical risk. High development cost; recommend piloting in one division first.':
    'وحدات تدريبية بالواقع المعزز للتدرّب على السيناريوهات عالية الخطورة دون مخاطر فعلية. تكلفة التطوير مرتفعة؛ يُوصى بالتجربة في قسم واحد أولاً.',
  'Automated license-plate scanning for parking violations to reduce manual enforcement patrols. Overlap with existing RTA initiative may limit strategic value.':
    'مسح آلي للوحات المركبات لرصد مخالفات المواقف وتقليل دوريات الرقابة اليدوية. قد يحدّ التداخل مع مبادرة هيئة الطرق والمواصلات القائمة من القيمة الاستراتيجية.',
  // AI response snippets
  'Reduces citizen wait time by 40%': 'يقلل وقت انتظار المتعاملين بنسبة 40%',
  'Optimises 35% of shift coverage': 'يحسّن تغطية 35% من المناوبات',
  'First-response time cut by 18 min': 'يخفض زمن الاستجابة الأولى بمقدار 18 دقيقة',
  // Suggested prompts
  'Which department submits the most ideas?': 'ما الإدارة الأكثر تقديماً للأفكار؟',
  'Show me high-potential ideas': 'اعرض الأفكار عالية الإمكانات',
  'What are the main idea clusters this quarter?': 'ما أبرز مجموعات الأفكار هذا الربع؟',
  'Which ideas are overdue for director review?': 'ما الأفكار المتأخرة عن مراجعة المدير؟',
  "What's our implementation rate compared to last year?": 'ما معدل التنفيذ لدينا مقارنة بالعام الماضي؟',
  'Show me ideas aligned to Innovation Excellence pillar': 'اعرض الأفكار المتوافقة مع ركيزة التميز في الابتكار',
};

// ── AI response logic ─────────────────────────────────────────────────────────

/** Rendered as a component so the answer re-translates when the language is toggled. */
function AiResponse({ input }: { input: string }) {
  const { tr } = useLanguage();
  const L = (s: string) => tr(s, AR[s]);
  // Arabic suggestion chips map back to their English prompt for keyword matching.
  const q = (Object.keys(AR).find(k => AR[k] === input) ?? input).toLowerCase();

  if (q.includes('department') || q.includes('submits') || q.includes('most ideas')) {
    return (
      <div className="space-y-2">
        <p>{tr('Digital Transformation leads with ', 'تتصدر إدارة التحول الرقمي بـ ')}<strong>{tr('22 ideas', '22 فكرة')}</strong>{tr(' submitted this quarter, followed by Operations (18) and Community Affairs (15). Digital Transformation also has the highest approval rate at ', ' مقدمة هذا الربع، تليها العمليات (18) وشؤون المجتمع (15). كما تسجّل إدارة التحول الرقمي أعلى معدل اعتماد بنسبة ')}<strong>72%</strong>.</p>
        <div className="flex flex-wrap gap-2 pt-1">
          {[['Digital Transformation','22','72%'],['Operations','18','54%'],['Community Affairs','15','60%']].map(([d,n,r]) => (
            <div key={d} className="rounded-lg border bg-white px-3 py-2 text-xs shadow-sm">
              <div className="font-semibold text-[#005844]">{L(d)}</div>
              <div className="text-muted-foreground">{tr(`${n} ideas · ${r} approval`, `${n} فكرة · اعتماد ${r}`)}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (q.includes('high-potential') || q.includes('high potential')) {
    return (
      <div className="space-y-2">
        <p>{tr('Here are 3 high-potential ideas from your pipeline:', 'إليك 3 أفكار عالية الإمكانات من مسار أفكارك:')}</p>
        <div className="space-y-2">
          {[
            { title: 'Smart Queue Management',       dept: 'Digital Transformation', impact: 'Reduces citizen wait time by 40%' },
            { title: 'AI Patrol Scheduling',          dept: 'Operations',             impact: 'Optimises 35% of shift coverage' },
            { title: 'Drone Emergency Response Kit',  dept: 'Operations',             impact: 'First-response time cut by 18 min' },
          ].map(idea => (
            <div key={idea.title} className="flex items-start gap-2 rounded-lg border bg-white p-3 shadow-sm">
              <Sparkles className="mt-0.5 size-4 shrink-0 text-[#26D07C]" />
              <div>
                <div className="font-semibold text-sm">{L(idea.title)}</div>
                <div className="text-xs text-muted-foreground">{L(idea.dept)}</div>
                <div className="text-xs text-[#005844] font-medium mt-0.5">{L(idea.impact)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (q.includes('cluster') || q.includes('theme')) {
    return (
      <div className="space-y-2">
        <p><strong>{tr('8 thematic clusters', '8 مجموعات موضوعية')}</strong>{tr(' detected this quarter. The largest:', ' تم رصدها هذا الربع. الأكبر منها:')}</p>
        <div className="grid grid-cols-3 gap-2">
          {[['Smart Operations','14'],['Customer Experience','12'],['Digital Transformation','11']].map(([c,n]) => (
            <div key={c} className="rounded-lg border bg-white px-2 py-2 text-center text-xs shadow-sm">
              <div className="text-lg font-bold text-[#008755]">{n}</div>
              <div className="text-muted-foreground leading-tight">{L(c)}</div>
            </div>
          ))}
        </div>
        <p className="text-sm">{tr('Cross-cluster themes: ', 'محاور مشتركة بين المجموعات: ')}<em>{tr('AI & Automation', 'الذكاء الاصطناعي والأتمتة')}</em>{tr(' and ', ' و')}<em>{tr('Customer-Centric Services', 'الخدمات المتمحورة حول المتعامل')}</em>.</p>
      </div>
    );
  }

  if (q.includes('overdue') || q.includes('waiting') || q.includes('pending')) {
    return (
      <div className="space-y-2">
        <p><strong>{tr('6 ideas', '6 أفكار')}</strong>{tr(' have been waiting more than 5 days for director review. The oldest:', ' بانتظار مراجعة المدير منذ أكثر من 5 أيام. أقدمها:')}</p>
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm">
          <div className="font-semibold text-amber-800">{L('E-Grievance Resolution Tracker')}</div>
          <div className="text-amber-700 text-xs">{tr('9 days awaiting review · Digital Transformation', '9 أيام بانتظار المراجعة · التحول الرقمي')}</div>
        </div>
        <p className="text-sm text-muted-foreground">{tr('Recommend scheduling a review session to clear the backlog.', 'يُوصى بجدولة جلسة مراجعة لإنهاء الأفكار المتراكمة.')}</p>
      </div>
    );
  }

  if (q.includes('implementation') || q.includes('implement') || q.includes('rate') || q.includes('last year')) {
    return (
      <div className="space-y-2">
        <p>{tr('Current implementation rate: ', 'معدل التنفيذ الحالي: ')}<strong>6.4%</strong>{tr(' (3 of 47 ideas reached implementation). Last year: ', ' (وصلت 3 أفكار من أصل 47 إلى التنفيذ). العام الماضي: ')}<strong>4.1%</strong>{tr('. Trend is improving.', '. الاتجاه في تحسن.')}</p>
        <div className="rounded-lg border bg-white px-3 py-2 shadow-sm">
          <div className="text-xs text-muted-foreground mb-1">{tr('Top implemented idea', 'أبرز فكرة منفذة')}</div>
          <div className="font-semibold text-sm text-[#005844]">{L('Smart Queue Management')}</div>
        </div>
      </div>
    );
  }

  return (
    <p>{tr('Based on your pipeline data for Community Affairs: ', 'استناداً إلى بيانات مسار أفكار شؤون المجتمع: ')}<strong>{tr('47 ideas submitted', '47 فكرة مقدمة')}</strong>{tr(', 12 in director review, 3 implemented. Highest activity area: ', '، و12 قيد مراجعة المدير، و3 منفذة. المجال الأكثر نشاطاً: ')}<em>{L('Customer Experience')}</em>.</p>
  );
}

// ── Suggested prompts ─────────────────────────────────────────────────────────

const SUGGESTIONS = [
  'Which department submits the most ideas?',
  'Show me high-potential ideas',
  'What are the main idea clusters this quarter?',
  'Which ideas are overdue for director review?',
  "What's our implementation rate compared to last year?",
  'Show me ideas aligned to Innovation Excellence pillar',
];

// ── Mode tab pill ─────────────────────────────────────────────────────────────

function ModePill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-5 py-2 rounded-full text-sm font-medium transition-all',
        active
          ? 'bg-[#008755] text-white shadow'
          : 'bg-white text-gray-600 border border-border hover:bg-gray-50',
      )}
    >
      {label}
    </button>
  );
}

// ── Typing indicator ──────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#008755]/10">
        <Bot className="size-3.5 text-[#008755]" />
      </div>
      <div className="flex items-center gap-1 rounded-2xl bg-muted px-4 py-2.5">
        {[0, 150, 300].map(delay => (
          <span
            key={delay}
            className="block size-1.5 rounded-full bg-[#008755] animate-bounce"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

// ── MODE 1: Ask ───────────────────────────────────────────────────────────────

function AskMode() {
  const { tr } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: trimmed }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      // Store the question; <AiResponse> renders the answer in the active language.
      setMessages(prev => [...prev, { role: 'ai', content: trimmed }]);
    }, 800);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage(input);
  };

  return (
    <div className="space-y-4">
      {/* Hero banner */}
      <div className="rounded-xl bg-gradient-to-r rtl:bg-gradient-to-l from-[#005844] to-[#008755] px-6 py-5 text-white">
        <div className="flex items-center gap-3 mb-1">
          <Sparkles className="size-6 opacity-90" />
          <h2 className="text-xl font-semibold  ">{tr('Ask Anything About Your Pipeline', 'اسأل أي شيء عن مسار أفكارك')}</h2>
        </div>
        <p className="text-sm text-white/80 ms-9">{tr('Powered by Dubai Police Innovation AI', 'مدعوم بالذكاء الاصطناعي للابتكار في شرطة دبي')}</p>
      </div>

      {/* Chat area */}
      <Card className="rounded-xl border border-border bg-white shadow-sm">
        <CardContent className="p-4">
          <div className="overflow-y-auto h-[350px] space-y-1 pe-1" style={{ scrollbarWidth: 'thin' }}>
            {messages.length === 0 && !isTyping ? (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-muted-foreground">
                <div className="flex size-14 items-center justify-center rounded-full bg-[#008755]/10">
                  <Bot className="size-7 text-[#008755]" />
                </div>
                <p className="text-sm max-w-xs">{tr('Ask a question to explore your innovation pipeline.', 'اطرح سؤالاً لاستكشاف مسار الابتكار لديك.')}</p>
              </div>
            ) : (
              <>
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={cn('flex mb-3', msg.role === 'user' ? 'justify-end' : 'justify-start items-start gap-2')}
                  >
                    {msg.role === 'ai' && (
                      <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#008755]/10 mt-0.5">
                        <Bot className="size-3.5 text-[#008755]" />
                      </div>
                    )}
                    <div
                      className={cn(
                        'max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                        msg.role === 'user'
                          ? 'bg-[#008755] text-white rounded-ee-sm'
                          : 'bg-muted text-foreground rounded-es-sm',
                      )}
                    >
                      {msg.role === 'ai' && typeof msg.content === 'string'
                        ? <AiResponse input={msg.content} />
                        : msg.content}
                    </div>
                  </div>
                ))}
                {isTyping && <TypingIndicator />}
                <div ref={chatEndRef} />
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Suggested prompts */}
      <div className="flex flex-wrap gap-2">
        {SUGGESTIONS.map(s => (
          <button
            key={s}
            onClick={() => { setInput(tr(s, AR[s])); }}
            className="rounded-full border border-border bg-white px-3 py-1.5 text-xs text-gray-600 hover:border-[#008755] hover:text-[#008755] transition-colors"
          >
            {tr(s, AR[s])}
          </button>
        ))}
      </div>

      {/* Input bar */}
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder={tr('Ask about your pipeline…', 'اسأل عن مسار أفكارك…')}
          className="flex-1 rounded-xl border-border"
          disabled={isTyping}
        />
        <Button
          onClick={() => sendMessage(input)}
          disabled={isTyping || !input.trim()}
          className="rounded-xl bg-[#008755] hover:bg-[#005844] text-white px-4"
        >
          <Send className="size-4 rtl:-scale-x-100" />
        </Button>
      </div>
    </div>
  );
}

// ── MODE 2: Browse ────────────────────────────────────────────────────────────

const ALL_CLUSTERS  = ['All', ...Array.from(new Set(IDEAS.map(i => i.cluster)))];
const ALL_STATUSES  = ['All', ...Array.from(new Set(IDEAS.map(i => i.status)))];
const ALL_IMPACTS   = ['All', 'High', 'Medium', 'Low'];

function BrowseMode() {
  const { tr } = useLanguage();
  const L = (s: string) => tr(s, AR[s]);
  const [search, setSearch]       = useState('');
  const [cluster, setCluster]     = useState('All');
  const [status, setStatus]       = useState('All');
  const [impact, setImpact]       = useState('All');
  const [starred, setStarred]     = useState<Set<number>>(new Set());

  const toggleStar = (id: number) =>
    setStarred(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return IDEAS.filter(idea => {
      if (q && ![idea.title, idea.dept, idea.cluster].some(v => v.toLowerCase().includes(q) || (AR[v] ?? '').includes(q))) return false;
      if (cluster !== 'All' && idea.cluster !== cluster) return false;
      if (status  !== 'All' && idea.status  !== status)  return false;
      if (impact  !== 'All' && idea.fit     !== impact)  return false;
      return true;
    });
  }, [search, cluster, status, impact]);

  return (
    <div className="space-y-4">
      {/* Filter bar */}
      <Card className="rounded-xl border border-border bg-white shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <Input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={tr('Search ideas…', 'ابحث عن الأفكار…')}
                className="ps-9 rounded-xl border-border"
              />
            </div>
            {[
              { label: 'Cluster',     allLabel: tr('All Clusters', 'جميع المجموعات'), value: cluster, setter: setCluster, options: ALL_CLUSTERS },
              { label: 'Status',      allLabel: tr('All Statuses', 'جميع الحالات'),   value: status,  setter: setStatus,  options: ALL_STATUSES },
              { label: 'Impact',      allLabel: tr('All Impacts', 'جميع مستويات الأثر'), value: impact,  setter: setImpact,  options: ALL_IMPACTS },
            ].map(({ label, allLabel, value, setter, options }) => (
              <select
                key={label}
                value={value}
                onChange={e => setter(e.target.value)}
                className="rounded-xl border border-border bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#008755]/30"
              >
                {options.map(o => <option key={o} value={o}>{o === 'All' ? allLabel : L(o)}</option>)}
              </select>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Result count */}
      <p className="text-sm text-muted-foreground px-1">{tr(`${filtered.length} idea${filtered.length !== 1 ? 's' : ''} found`, `تم العثور على ${filtered.length} فكرة`)}</p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
          <Search className="size-10 opacity-30" />
          <p>{tr('No ideas match your filters.', 'لا توجد أفكار مطابقة لعوامل التصفية.')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map(idea => (
            <Card key={idea.id} className="rounded-xl border border-border bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <CardContent className="p-4 flex flex-col gap-3 flex-1">
                {/* Cluster badge */}
                <div className="flex items-start justify-between gap-2">
                  <span className={cn('rounded-full px-2 py-0.5 text-xs font-medium', clusterColor(idea.cluster))}>
                    {L(idea.cluster)}
                  </span>
                  <button onClick={() => toggleStar(idea.id)} className="shrink-0 mt-0.5">
                    <Star
                      className={cn('size-4 transition-colors', starred.has(idea.id) ? 'fill-amber-400 text-amber-400' : 'text-gray-300 hover:text-amber-300')}
                    />
                  </button>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-sm leading-snug">{L(idea.title)}</h3>

                {/* Meta */}
                <p className="text-xs text-muted-foreground">{L(idea.dept)} · {L(idea.submitter)} · {L(idea.date)}</p>

                {/* Status */}
                <span className={cn('self-start rounded-full px-2 py-0.5 text-xs font-medium', STATUS_COLORS[idea.status] ?? 'bg-gray-100 text-gray-600')}>
                  {L(idea.status)}
                </span>

                {/* Chips */}
                <div className="flex flex-wrap gap-1.5 text-xs">
                  <span className="rounded-md bg-gray-100 px-2 py-0.5 text-gray-600">{tr('Fit', 'التوافق')}: {L(idea.fit)}</span>
                  <span className="rounded-md bg-gray-100 px-2 py-0.5 text-gray-600">{tr('Effort', 'الجهد')}: {L(idea.effort)}</span>
                </div>

                {/* AI signal */}
                <div className={cn('flex items-center gap-1 text-xs mt-auto', idea.ai === 'Strong' ? 'text-[#008755]' : 'text-amber-600')}>
                  <Sparkles className="size-3" />
                  <span>{tr('AI', 'الذكاء الاصطناعي')}: {idea.ai === 'Strong' ? tr('✓ Strong potential', '✓ إمكانات قوية') : tr('⚠ Needs review', '⚠ تحتاج إلى مراجعة')}</span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-border pt-2 mt-1">
                  <button className="flex items-center gap-1 text-xs text-[#008755] hover:text-[#005844] font-medium transition-colors">
                    {tr('View details', 'عرض التفاصيل')} <ArrowRight className="size-3 rtl:rotate-180" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ── MODE 3: Decide ────────────────────────────────────────────────────────────

type Decision = 'Approved' | 'Rejected' | 'Skipped';

function DecideMode() {
  const { tr } = useLanguage();
  const L = (s: string) => tr(s, AR[s]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [decisions, setDecisions]       = useState<Array<{ id: number; decision: Decision }>>([]);

  const remaining = DECIDE_QUEUE.length - decisions.filter(d => d.decision !== 'Skipped').length;
  const idea       = DECIDE_QUEUE[currentIndex];
  const allDone    = currentIndex >= DECIDE_QUEUE.length;

  const decide = (decision: Decision) => {
    setDecisions(prev => [...prev, { id: idea.id, decision }]);
    setCurrentIndex(prev => prev + 1);
  };

  const reset = () => {
    setCurrentIndex(0);
    setDecisions([]);
  };

  if (allDone) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-20">
        <div className="flex size-20 items-center justify-center rounded-full bg-[#008755]/10">
          <Zap className="size-10 text-[#008755]" />
        </div>
        <div className="text-center space-y-1">
          <h3 className="text-xl font-semibold text-[#005844]  ">{tr('All done!', 'تم الانتهاء!')}</h3>
          <p className="text-muted-foreground text-sm">{tr(`You've worked through all ${DECIDE_QUEUE.length} ideas in the queue.`, `لقد أنهيت مراجعة جميع الأفكار في القائمة وعددها ${DECIDE_QUEUE.length}.`)}</p>
        </div>
        <div className="flex gap-3 text-sm">
          {(['Approved','Rejected','Skipped'] as Decision[]).map(d => {
            const count = decisions.filter(x => x.decision === d).length;
            const colors: Record<Decision, string> = { Approved: 'text-green-700 bg-green-50 border-green-200', Rejected: 'text-red-600 bg-red-50 border-red-200', Skipped: 'text-gray-600 bg-gray-50 border-gray-200' };
            return (
              <div key={d} className={cn('rounded-xl border px-4 py-2 text-center', colors[d])}>
                <div className="text-2xl font-bold">{count}</div>
                <div className="text-xs">{L(d)}</div>
              </div>
            );
          })}
        </div>
        <Button onClick={reset} variant="outline" className="rounded-xl border-[#008755] text-[#008755] hover:bg-[#008755]/5">
          {tr('Review again', 'المراجعة مجدداً')}
        </Button>
      </div>
    );
  }

  const skipped = decisions.filter(d => d.decision === 'Skipped').length;
  const decided  = decisions.filter(d => d.decision !== 'Skipped').length;

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Header */}
      <div className="w-full text-center space-y-1">
        <h2 className="text-lg font-semibold text-[#005844]  ">{tr('Fast-Track Decisions', 'القرارات السريعة')}</h2>
        <p className="text-sm text-muted-foreground">{tr('Work through ideas that need your input, one at a time.', 'راجع الأفكار التي تحتاج إلى رأيك، فكرة تلو الأخرى.')}</p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5">
          {DECIDE_QUEUE.map((_, i) => (
            <div
              key={i}
              className={cn(
                'h-2 rounded-full transition-all',
                i < currentIndex
                  ? decisions[i]?.decision === 'Approved' ? 'bg-green-500 w-4' : decisions[i]?.decision === 'Rejected' ? 'bg-red-400 w-4' : 'bg-gray-300 w-4'
                  : i === currentIndex ? 'bg-[#008755] w-6' : 'bg-gray-200 w-4',
              )}
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {tr(`${decided} decided · ${DECIDE_QUEUE.length - currentIndex} remaining`, `${decided} تم البت فيها · ${DECIDE_QUEUE.length - currentIndex} متبقية`)}
        </span>
      </div>

      {/* Card */}
      <Card className="w-full max-w-xl rounded-xl border border-border bg-white shadow-md">
        <CardContent className="p-6 space-y-5">
          {/* Cluster + Dept */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-medium', clusterColor(idea.cluster))}>{L(idea.cluster)}</span>
            <span className="text-xs text-muted-foreground">{L(idea.dept)}</span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-900  ">{L(idea.title)}</h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">{L(idea.desc)}</p>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: tr('Strategic Fit', 'التوافق الاستراتيجي'), value: idea.fit,    colors: { High: 'text-green-700 bg-green-50', Medium: 'text-yellow-700 bg-yellow-50', Low: 'text-red-600 bg-red-50' } },
              { label: tr('Effort', 'الجهد'),        value: idea.effort, colors: { Low: 'text-green-700 bg-green-50', Medium: 'text-yellow-700 bg-yellow-50', High: 'text-red-600 bg-red-50' } },
              { label: tr('AI Signal', 'مؤشر الذكاء الاصطناعي'),     value: idea.aiRec,  colors: { 'Strong potential': 'text-[#008755] bg-[#008755]/10', 'Needs review': 'text-amber-700 bg-amber-50' } },
            ].map(({ label, value, colors }) => (
              <div key={label} className="rounded-lg bg-gray-50 border border-border p-3 text-center">
                <div className="text-xs text-muted-foreground mb-1">{label}</div>
                <div className={cn('text-sm font-semibold rounded-md px-1', (colors as Record<string, string>)[value] ?? 'text-gray-700')}>
                  {L(value)}
                </div>
              </div>
            ))}
          </div>

          {/* AI recommendation callout */}
          <div className="flex items-center gap-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2.5 text-sm text-amber-700">
            <Sparkles className="size-4 shrink-0" />
            <span><strong>{tr('AI recommends:', 'توصية الذكاء الاصطناعي:')}</strong> {L(idea.aiRec)} — {tr('validate alignment before approving.', 'تحقق من التوافق قبل الاعتماد.')}</span>
          </div>
        </CardContent>
      </Card>

      {/* Action buttons */}
      <div className="flex items-center gap-4 w-full max-w-xl">
        <Button
          onClick={() => decide('Rejected')}
          variant="outline"
          className="flex-1 rounded-xl border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 py-6 text-base font-semibold"
        >
          {tr('✗ Reject', '✗ رفض')}
        </Button>
        <Button
          onClick={() => decide('Skipped')}
          variant="outline"
          className="rounded-xl border-border text-gray-500 hover:bg-gray-50 px-5 py-6 text-base"
        >
          {tr('⟳ Skip', '⟳ تخطي')}
        </Button>
        <Button
          onClick={() => decide('Approved')}
          className="flex-1 rounded-xl bg-[#008755] hover:bg-[#005844] text-white py-6 text-base font-semibold"
        >
          {tr('✓ Approve', '✓ اعتماد')}
        </Button>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

type Mode = 'ask' | 'browse' | 'decide';

export function DiscoverPage({ user, role, onNavigate }: PageProps) {
  const [activeMode, setActiveMode] = useState<Mode>('ask');
  const { tr } = useLanguage();

  return (
    <div className="p-4 space-y-6">
      {/* Mode switcher */}
      <div className="flex items-center gap-2">
        <ModePill label={tr('Ask', 'اسأل')}    active={activeMode === 'ask'}    onClick={() => setActiveMode('ask')}    />
        <ModePill label={tr('Browse', 'تصفح')} active={activeMode === 'browse'} onClick={() => setActiveMode('browse')} />
        <ModePill label={tr('Decide', 'قرّر')} active={activeMode === 'decide'} onClick={() => setActiveMode('decide')} />
      </div>

      {/* Mode content */}
      {activeMode === 'ask'    && <AskMode    />}
      {activeMode === 'browse' && <BrowseMode />}
      {activeMode === 'decide' && <DecideMode />}
    </div>
  );
}
