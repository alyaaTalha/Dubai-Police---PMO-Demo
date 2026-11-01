// Shared Arabic translations for navigation labels that are passed around as plain
// strings (e.g. breadcrumbs built in App.tsx). Components translate their own copy
// inline with `tr(en, ar)`; this map only covers labels that cross component boundaries.
export const COMMON_LABELS_AR: Record<string, string> = {
  'Home': 'الرئيسية',
  'Dashboard': 'لوحة المعلومات',
  'Strategy': 'الاستراتيجية',
  'Performance': 'الأداء',
  'Scorecards': 'بطاقات الأداء',
  'Partnership': 'الشراكات',
  'VOC': 'صوت المتعامل',
  'Portfolio': 'المحفظة',
  'System Administration': 'إدارة النظام',
  'Ideas Platform': 'منصة الأفكار',
  'Sandbox Platform': 'منصة المشاريع',
  'Sandbox': 'البيئة التجريبية',
};

export function translateLabel(label: string, lang: 'en' | 'ar'): string {
  return lang === 'ar' ? COMMON_LABELS_AR[label] ?? label : label;
}
