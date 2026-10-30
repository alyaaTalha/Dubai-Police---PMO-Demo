import { useState, useMemo } from 'react';
import { ArrowRight, CalendarDays, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
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
type NewsCategory =
  | 'AI'
  | 'Smart Policing'
  | 'Service Improvement'
  | 'Road Safety'
  | 'Customer Experience'
  | 'Awards'
  | 'Workshops'
  | 'Implemented Ideas';

interface NewsArticle {
  id: number;
  title: string;
  category: NewsCategory;
  date: string;
  summary: string;
}

const ALL_CATEGORIES: ('All' | NewsCategory)[] = [
  'All',
  'AI',
  'Smart Policing',
  'Service Improvement',
  'Road Safety',
  'Customer Experience',
  'Awards',
  'Workshops',
  'Implemented Ideas',
];

const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 1,
    title: 'Smart Patrol System Reduces Response Time by 34%',
    category: 'Smart Policing',
    date: 'Jul 28, 2025',
    summary:
      'A new AI-assisted dispatch system has cut emergency response times across Dubai by over a third.',
  },
  {
    id: 2,
    title: 'Employee Innovation Awards 2025 — Winners Announced',
    category: 'Awards',
    date: 'Jul 22, 2025',
    summary:
      '14 officers and staff recognized for outstanding contributions to the Innovation Platform this year.',
  },
  {
    id: 3,
    title: 'Digital Evidence Portal Goes Live Across All Precincts',
    category: 'Implemented Ideas',
    date: 'Jul 15, 2025',
    summary:
      'The paperless evidence management idea submitted in Q1 is now fully deployed, eliminating 12,000 paper forms per month.',
  },
  {
    id: 4,
    title: 'Community Safety App Reaches 500,000 Downloads',
    category: 'Customer Experience',
    date: 'Jul 10, 2025',
    summary:
      'The app, born from an Innovator-tier idea, has surpassed half a million downloads in its first year.',
  },
  {
    id: 5,
    title: 'Design Thinking Workshop — 120 Officers Graduate',
    category: 'Workshops',
    date: 'Jul 5, 2025',
    summary:
      "Dubai Police's second cohort of Design Thinking practitioners completed their certification.",
  },
  {
    id: 6,
    title: 'Smart Crosswalk Pilot Reduces Pedestrian Incidents by 18%',
    category: 'Road Safety',
    date: 'Jun 28, 2025',
    summary:
      'IoT-enabled crosswalks in Al Wasl district demonstrate real-world impact of the Road Safety challenge winner.',
  },
  {
    id: 7,
    title: 'Service Center Queue Times Cut in Half Through AI',
    category: 'Service Improvement',
    date: 'Jun 20, 2025',
    summary:
      "The AI Queue Management challenge winner's solution is now in production at 3 major service centers.",
  },
  {
    id: 8,
    title: 'Innovation Platform Reaches 10,000 Registered Innovators',
    category: 'AI',
    date: 'Jun 15, 2025',
    summary:
      'A major milestone for the platform as participation grows across all departments and ranks.',
  },
];

// ── Arabic display text (keyed by the English value) ──────────────────────────
const AR: Record<string, string> = {
  // Categories
  'All': 'الكل',
  'AI': 'الذكاء الاصطناعي',
  'Smart Policing': 'الشرطة الذكية',
  'Service Improvement': 'تحسين الخدمات',
  'Road Safety': 'السلامة المرورية',
  'Customer Experience': 'تجربة المتعاملين',
  'Awards': 'الجوائز',
  'Workshops': 'ورش العمل',
  'Implemented Ideas': 'الأفكار المنفّذة',
  // Titles
  'Smart Patrol System Reduces Response Time by 34%': 'نظام الدوريات الذكية يخفض زمن الاستجابة بنسبة 34%',
  'Employee Innovation Awards 2025 — Winners Announced': 'جوائز ابتكار الموظفين 2025 — الإعلان عن الفائزين',
  'Digital Evidence Portal Goes Live Across All Precincts': 'إطلاق بوابة الأدلة الرقمية في جميع المراكز',
  'Community Safety App Reaches 500,000 Downloads': 'تطبيق السلامة المجتمعية يتخطى 500,000 تنزيل',
  'Design Thinking Workshop — 120 Officers Graduate': 'ورشة التفكير التصميمي — تخريج 120 ضابطاً',
  'Smart Crosswalk Pilot Reduces Pedestrian Incidents by 18%': 'التجربة الأولية لممرات المشاة الذكية تخفض حوادث المشاة بنسبة 18%',
  'Service Center Queue Times Cut in Half Through AI': 'خفض أوقات الانتظار في مراكز الخدمة إلى النصف بفضل الذكاء الاصطناعي',
  'Innovation Platform Reaches 10,000 Registered Innovators': 'منصة الابتكار تصل إلى 10,000 مبتكر مسجّل',
  // Dates
  'Jul 28, 2025': '28 يوليو 2025',
  'Jul 22, 2025': '22 يوليو 2025',
  'Jul 15, 2025': '15 يوليو 2025',
  'Jul 10, 2025': '10 يوليو 2025',
  'Jul 5, 2025': '5 يوليو 2025',
  'Jun 28, 2025': '28 يونيو 2025',
  'Jun 20, 2025': '20 يونيو 2025',
  'Jun 15, 2025': '15 يونيو 2025',
  // Summaries
  'A new AI-assisted dispatch system has cut emergency response times across Dubai by over a third.':
    'خفّض نظام جديد لتوجيه البلاغات بمساعدة الذكاء الاصطناعي أوقات الاستجابة للطوارئ في دبي بأكثر من الثلث.',
  '14 officers and staff recognized for outstanding contributions to the Innovation Platform this year.':
    'تكريم 14 من الضباط والموظفين لإسهاماتهم المتميزة في منصة الابتكار هذا العام.',
  'The paperless evidence management idea submitted in Q1 is now fully deployed, eliminating 12,000 paper forms per month.':
    'تم تطبيق فكرة إدارة الأدلة دون ورق المقدّمة في الربع الأول بالكامل، ما أدى إلى الاستغناء عن 12,000 نموذج ورقي شهرياً.',
  'The app, born from an Innovator-tier idea, has surpassed half a million downloads in its first year.':
    'تجاوز التطبيق، الذي انبثق من فكرة على مستوى المبتكرين، نصف مليون تنزيل في عامه الأول.',
  "Dubai Police's second cohort of Design Thinking practitioners completed their certification.":
    'أكملت الدفعة الثانية من ممارسي التفكير التصميمي في شرطة دبي متطلبات الاعتماد.',
  'IoT-enabled crosswalks in Al Wasl district demonstrate real-world impact of the Road Safety challenge winner.':
    'تُظهر ممرات المشاة المدعومة بإنترنت الأشياء في منطقة الوصل الأثر الفعلي للحل الفائز في تحدي السلامة المرورية.',
  "The AI Queue Management challenge winner's solution is now in production at 3 major service centers.":
    'أصبح الحل الفائز في تحدي إدارة الطوابير بالذكاء الاصطناعي قيد التشغيل الفعلي في 3 مراكز خدمة رئيسية.',
  'A major milestone for the platform as participation grows across all departments and ranks.':
    'إنجاز كبير للمنصة مع تنامي المشاركة في جميع الإدارات والرتب.',
};

// ── Category color map ─────────────────────────────────────────────────────────
const CATEGORY_STYLES: Record<NewsCategory, { chip: string; text: string }> = {
  AI: { chip: 'bg-indigo-100 text-indigo-700', text: 'text-indigo-700' },
  'Smart Policing': { chip: 'bg-blue-100 text-blue-700', text: 'text-blue-700' },
  Awards: { chip: 'bg-amber-100 text-amber-700', text: 'text-amber-700' },
  'Implemented Ideas': { chip: 'bg-emerald-100 text-emerald-700', text: 'text-emerald-700' },
  'Customer Experience': { chip: 'bg-purple-100 text-purple-700', text: 'text-purple-700' },
  'Road Safety': { chip: 'bg-red-100 text-red-700', text: 'text-red-700' },
  Workshops: { chip: 'bg-teal-100 text-teal-700', text: 'text-teal-700' },
  'Service Improvement': { chip: 'bg-cyan-100 text-cyan-700', text: 'text-cyan-700' },
};

function CategoryChip({ category }: { category: NewsCategory }) {
  const { tr } = useLanguage();
  const style = CATEGORY_STYLES[category];
  return (
    <span
      className={cn(
        'inline-flex items-center text-[10px] font-medium rounded-full px-2 py-0.5 w-fit',
        style.chip
      )}
    >
      {tr(category, AR[category])}
    </span>
  );
}

// ── News Card ──────────────────────────────────────────────────────────────────
function NewsCard({ article }: { article: NewsArticle }) {
  const { tr } = useLanguage();
  return (
    <Card className="rounded-xl bg-white hover:shadow-md transition-shadow flex flex-col">
      <CardContent className="pt-4 pb-4 flex flex-col gap-2.5 flex-1">
        <CategoryChip category={article.category} />
        <h3 className="  text-sm text-gray-900 leading-snug line-clamp-2">
          {tr(article.title, AR[article.title])}
        </h3>
        <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
          <CalendarDays className="h-3 w-3" />
          {tr(article.date, AR[article.date])}
        </div>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 flex-1">
          {tr(article.summary, AR[article.summary])}
        </p>
        <button className="flex items-center gap-0.5 text-xs text-[#008755] hover:text-[#005844] transition-colors font-medium mt-auto pt-1 w-fit">
          {tr('Read More', 'اقرأ المزيد')}
          <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
        </button>
      </CardContent>
    </Card>
  );
}

// ── Featured Story ─────────────────────────────────────────────────────────────
function FeaturedStory() {
  const { tr } = useLanguage();
  return (
    <Card className="rounded-xl overflow-hidden bg-white">
      <div className="flex flex-col md:flex-row min-h-[220px]">
        {/* Left — gradient panel */}
        <div className="md:w-64 bg-gradient-to-br from-[#005844] to-[#008755] flex flex-col justify-between p-6 flex-shrink-0">
          <div>
            <span className="inline-flex items-center text-[10px] font-medium rounded-full px-2 py-0.5 bg-white/20 text-white mb-3">
              {tr('AI', 'الذكاء الاصطناعي')}
            </span>
            <p className="text-white/60 text-xs mb-1">{tr('Featured Story', 'القصة المميزة')}</p>
          </div>
          <div>
            <p className="text-white/80 text-[11px] mb-1">{tr('August 5, 2025', '5 أغسطس 2025')}</p>
            <div className="h-px bg-white/20 w-8" />
          </div>
        </div>

        {/* Right — content */}
        <div className="flex-1 p-6 flex flex-col gap-3 justify-center">
          <h2 className="  text-lg text-gray-900 leading-snug">
            {tr('Dubai Police Launches AI-Powered Crime Prediction Platform', 'شرطة دبي تطلق منصة التنبؤ بالجريمة المدعومة بالذكاء الاصطناعي')}
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {tr(
              'Dubai Police has officially launched its enterprise-wide AI crime prediction platform, integrating real-time incident feeds, historical crime data, and environmental signals across all 12 districts. The platform, developed internally through the Innovation Programme, uses ensemble machine learning models to generate 24-hour risk forecasts with 87% accuracy. Patrol commanders can now receive proactive deployment recommendations directly in the field operations dashboard, reducing reactive incidents by an estimated 22% in the first quarter of rollout.',
              'أطلقت شرطة دبي رسمياً منصتها المؤسسية للتنبؤ بالجريمة بالذكاء الاصطناعي، والتي تدمج بيانات الحوادث الفورية والبيانات التاريخية للجرائم والمؤشرات البيئية في جميع المناطق الـ12. وتستخدم المنصة، التي طُوّرت داخلياً عبر برنامج الابتكار، نماذج تعلم آلي مجمّعة لإصدار توقعات للمخاطر على مدى 24 ساعة بدقة تبلغ 87%. وأصبح بإمكان قادة الدوريات الآن تلقي توصيات استباقية للانتشار مباشرةً عبر لوحة العمليات الميدانية، مما أسهم في خفض الحوادث التفاعلية بنحو 22% في الربع الأول من التطبيق.',
            )}
          </p>
          <div className="pt-1">
            <Button className="bg-[#008755] hover:bg-[#005844] text-white h-8 px-5 text-xs gap-1.5">
              {tr('Read Full Story', 'اقرأ القصة كاملة')}
              <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

// ── InnovationNewsPage ─────────────────────────────────────────────────────────
export function InnovationNewsPage({
  user: _user,
  role: _role,
  onNavigate: _onNavigate,
}: PageProps) {
  const { tr } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'All' | NewsCategory>('All');

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return NEWS_ARTICLES;
    return NEWS_ARTICLES.filter(a => a.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="p-6 flex flex-col gap-5">
      {/* Page header */}
      <div>
        <h1 className="  text-xl text-gray-900">
          {tr('Innovation News', 'أخبار الابتكار')}
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {tr('Stay updated on innovation across Dubai Police', 'تابع آخر مستجدات الابتكار في شرطة دبي')}
        </p>
      </div>

      {/* Category filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {ALL_CATEGORIES.map(cat => {
          const isActive = activeCategory === cat;
          const catStyle = cat !== 'All' ? CATEGORY_STYLES[cat as NewsCategory] : null;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as 'All' | NewsCategory)}
              className={cn(
                'flex-shrink-0 text-xs font-medium rounded-full px-3.5 py-1.5 transition-all border',
                isActive
                  ? 'bg-[#008755] text-white border-[#008755]'
                  : catStyle
                  ? cn(catStyle.chip, 'border-transparent hover:opacity-80')
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              )}
            >
              {tr(cat, AR[cat])}
            </button>
          );
        })}
      </div>

      {/* Featured story — always shown when "All" is selected */}
      {activeCategory === 'All' && <FeaturedStory />}

      {/* Section label */}
      <div className="flex items-center justify-between">
        <h2 className="  text-sm text-gray-700">
          {activeCategory === 'All' ? tr('Latest Stories', 'أحدث القصص') : tr(activeCategory, AR[activeCategory])}
          <span className="ms-2 text-xs font-normal text-gray-400">
            {filtered.length} {filtered.length === 1 ? tr('article', 'مقال') : tr('articles', 'مقالات')}
          </span>
        </h2>
      </div>

      {/* News grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(article => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <Card className="rounded-xl bg-white">
          <CardContent className="pt-4 pb-4 flex flex-col items-center justify-center py-16 text-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center">
              <CalendarDays className="h-5 w-5 text-gray-400" />
            </div>
            <p className="  text-sm text-gray-700">
              {tr('No articles in this category', 'لا توجد مقالات في هذه الفئة')}
            </p>
            <p className="text-xs text-gray-400 max-w-xs">
              {tr('Check back soon or browse another category.', 'عُد لاحقاً أو تصفّح فئة أخرى.')}
            </p>
            <button
              className="text-xs text-[#008755] hover:text-[#005844] font-medium transition-colors mt-1"
              onClick={() => setActiveCategory('All')}
            >
              {tr('View all news', 'عرض جميع الأخبار')}
            </button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
