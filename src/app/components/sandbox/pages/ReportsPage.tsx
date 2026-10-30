import { FileText, Clock, Download, CheckCircle2, Info, AlertTriangle, ShieldCheck, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '../../ui/badge';
import { cn } from '../../ui/utils';
import { AUDIT_KIND_CLASSES, type AuditKind } from '../sandboxData';
import type { SandboxStore } from '../SandboxStore';
import { useLanguage } from '../../../i18n/LanguageContext';
import { useSandboxTr } from '../sandboxI18n';
import heroDecoration from '../../../../assets/sandbox-hero-decoration.png';

interface PageProps { store: SandboxStore; }

const AUDIT_ICON: Record<AuditKind, React.ElementType> = {
  ok: CheckCircle2, info: Info, warn: AlertTriangle, violet: ShieldCheck, danger: XCircle,
};

const AR_MONTHS: Record<string, string> = {
  Jan: 'يناير', Feb: 'فبراير', Mar: 'مارس', Apr: 'أبريل', May: 'مايو', Jun: 'يونيو',
  Jul: 'يوليو', Aug: 'أغسطس', Sep: 'سبتمبر', Oct: 'أكتوبر', Nov: 'نوفمبر', Dec: 'ديسمبر',
};
const AR_ORDINAL: Record<string, string> = { '1': 'الأول', '2': 'الثاني', '3': 'الثالث', '4': 'الرابع' };

/** Arabic rendering for date / period strings such as "Aug 20, 2026", "Q3 2026", "H1 2026", "FY 2025–26", "Today". */
function arDate(v: string): string {
  if (v === 'Today') return 'اليوم';
  if (v === 'Current period') return 'الفترة الحالية';
  let m = v.match(/^([A-Z][a-z]{2}) (\d{1,2}), (\d{4})$/);
  if (m && AR_MONTHS[m[1]]) return `${m[2]} ${AR_MONTHS[m[1]]} ${m[3]}`;
  m = v.match(/^([A-Z][a-z]{2}) (\d{4})$/);
  if (m && AR_MONTHS[m[1]]) return `${AR_MONTHS[m[1]]} ${m[2]}`;
  m = v.match(/^Q(\d) (\d{4})$/);
  if (m) return `الربع ${AR_ORDINAL[m[1]] ?? m[1]} ${m[2]}`;
  m = v.match(/^H(\d) (\d{4})$/);
  if (m) return `النصف ${AR_ORDINAL[m[1]] ?? m[1]} ${m[2]}`;
  m = v.match(/^FY (.+)$/);
  if (m) return `السنة المالية ${m[1]}`;
  return v;
}

// Audit entries created live in this session (not covered by SANDBOX_AR).
const AUDIT_TITLE_AR: Record<string, string> = {
  'Evaluator assigned': 'إسناد مقيّم',
  'Stage changed': 'تغيير المرحلة',
  'Data exported': 'تصدير البيانات',
  'IP registration started': 'بدء تسجيل ملكية فكرية',
  'Audit log exported': 'تصدير سجل التدقيق',
  'Project registered': 'تسجيل مشروع',
  'Project report exported': 'تصدير تقرير مشروع',
  'Project card exported': 'تصدير بطاقة مشروع',
  'Change request submitted': 'تقديم طلب تغيير',
  'New IP filing initiated from the register': 'بدء إيداع ملكية فكرية جديد من السجل',
  'Full audit trail exported for the selected period': 'تصدير سجل التدقيق الكامل للفترة المحددة',
};

function arAudit(text: string, ts: (v: string) => string): string {
  const direct = ts(text);
  if (direct !== text) return direct;
  if (AUDIT_TITLE_AR[text]) return AUDIT_TITLE_AR[text];
  let m = text.match(/^(.+) produced by (.+)$/);
  if (m) return `أعدّ ${ts(m[2])} ${ts(m[1])}`;
  m = text.match(/^(\d+) project records exported to CSV by (.+)$/);
  if (m) return `صدّر ${ts(m[2])} ${m[1]} من سجلات المشاريع إلى CSV`;
  m = text.match(/^(.+) added to the portfolio by (.+)$/);
  if (m) return `أضاف ${ts(m[2])} ${ts(m[1])} إلى المحفظة`;
  m = text.match(/^(.+) card exported by (.+)$/);
  if (m) return `صدّر ${ts(m[2])} بطاقة ${ts(m[1])}`;
  m = text.match(/^(.+) exported by (.+)$/);
  if (m) return `صدّر ${ts(m[2])} ${ts(m[1])}`;
  m = text.match(/^New change request logged against (.+)$/);
  if (m) return `تسجيل طلب تغيير جديد على ${ts(m[1])}`;
  m = text.match(/^(.+) moved from (.+) to (.+)$/);
  if (m) return `انتقل ${ts(m[1])} من ${ts(m[2])} إلى ${ts(m[3])}`;
  m = text.match(/^(.+) assigned to (.+) for assessment$/);
  if (m) return `إسناد ${ts(m[1])} إلى ${ts(m[2])} للتقييم`;
  m = text.match(/^(.+) scored (\d+)\/100 against (.+) criteria by (.+)$/);
  if (m) return `حصل ${ts(m[1])} على ${m[2]}/100 وفق معايير ${ts(m[3])} بتقييم ${ts(m[4])}`;
  return text;
}

export function ReportsPage({ store }: PageProps) {
  const { tr, isRTL } = useLanguage();
  const ts = useSandboxTr();
  const td = (v: string) => (isRTL ? arDate(v) : v);
  const ta = (v: string) => (isRTL ? arAudit(v, ts) : v);
  const { reports, setReports, history, addHistory, audit, addAudit } = store;

  const generate = (key: string) => {
    const r = reports.find(x => x.key === key);
    if (!r) return;
    setReports(prev => prev.map(x => x.key === key ? { ...x, last: 'Today' } : x));
    addHistory({ report: r.title, by: 'Mohammed Hassan', date: 'Today', period: 'Current period', format: 'PDF' });
    addAudit({ title: 'Report generated', detail: `${r.title} produced by Mohammed Hassan`, kind: 'warn' });
    toast.success(tr(`"${r.title}" generated`, `تم إنشاء "${ts(r.title)}"`));
  };

  const exportHistoryCsv = () => toast.success(tr('Report history exported to CSV', 'تم تصدير سجل التقارير إلى CSV'));
  const exportAuditCsv = () => {
    toast.success(tr('Audit log downloaded', 'تم تنزيل سجل التدقيق'));
    addAudit({ title: 'Audit log exported', detail: 'Full audit trail exported for the selected period', kind: 'info' });
  };

  return (
    <div className="p-5 mx-auto space-y-5">
      <div className="rounded-2xl bg-gradient-to-br from-[#005844] via-[#008755] to-[#00a869] p-7 text-white relative overflow-hidden">
        <img src={heroDecoration} alt="" className="absolute -top-16 -end-16 h-160 w-160 rounded-full object-cover opacity-50 pointer-events-none select-none" />
        <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex gap-3.5">
            <div className="h-12 w-12 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center flex-shrink-0">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl   tracking-tight">{tr('Reports', 'التقارير')}</h1>
              <p className="text-white/80 text-sm mt-1 max-w-md">{tr('Generate institutional reports for leadership review, audits and national index submissions.', 'أنشئ تقارير مؤسسية لمراجعة القيادة وعمليات التدقيق وتقديمات المؤشرات الوطنية.')}</p>
            </div>
          </div>
          <button onClick={() => toast.info(tr('Report schedule settings opened', 'تم فتح إعدادات جدولة التقارير'))} className="inline-flex items-center gap-1.5 rounded-lg bg-white/15 border border-white/30 px-3.5 py-2 text-sm   hover:bg-white/25 transition-colors flex-shrink-0">
            <Clock className="h-3.5 w-3.5" /> {tr('Schedule', 'جدولة')}
          </button>
        </div>
      </div>

      <div>
        <h2 className="font-medium mb-3">{tr('Available Reports', 'التقارير المتاحة')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {reports.map(r => (
            <div key={r.key} className="bg-card border border-border rounded-xl p-4 flex flex-col">
              <div className="h-9 w-9 rounded-lg bg-[#008755]/10 flex items-center justify-center mb-3.5">
                <FileText className="h-4 w-4 text-[#008755]" />
              </div>
              <h4 className="  ">{ts(r.title)}</h4>
              <p className="text-sm text-muted-foreground mt-0.5">{tr('Last generated', 'آخر إنشاء')} {td(r.last)}</p>
              <p className="text-sm text-muted-foreground my-3 leading-relaxed flex-1">{ts(r.desc)}</p>
              <div className="flex gap-2">
                <button onClick={() => generate(r.key)} className="flex-1 rounded-lg bg-[#008755] hover:bg-[#005844] text-white text-sm   py-2 flex items-center justify-center gap-1.5 transition-colors">
                  <FileText className="h-3 w-3" /> {tr('Generate', 'إنشاء')}
                </button>
                <button onClick={() => toast.success(tr('Report downloaded', 'تم تنزيل التقرير'))} aria-label={tr('Download', 'تنزيل')} className="rounded-lg border border-border px-3 hover:bg-muted/40 transition-colors">
                  <Download className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <h2 className="font-medium ">{tr('Recent Report History', 'سجل التقارير الأخيرة')}</h2>
          <button onClick={exportHistoryCsv} className="ms-auto text-sm text-[#008755] hover:underline flex items-center gap-1">
            {tr('Export CSV', 'تصدير CSV')} <Download className="h-3 w-3" />
          </button>
        </div>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-start text-sm uppercase tracking-wide text-muted-foreground bg-muted/30">
                <th className="px-4 py-2.5 font-semibold text-start">{tr('Report', 'التقرير')}</th>
                <th className="px-4 py-2.5 font-semibold text-start">{tr('Generated By', 'أعدّه')}</th>
                <th className="px-4 py-2.5 font-semibold text-start">{tr('Date', 'التاريخ')}</th>
                <th className="px-4 py-2.5 font-semibold text-start">{tr('Period', 'الفترة')}</th>
                <th className="px-4 py-2.5 font-semibold text-start">{tr('Format', 'الصيغة')}</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h, i) => (
                <tr key={i} onClick={() => toast.info(tr(`Opening ${h.report}`, `جارٍ فتح ${ts(h.report)}`))} className="border-b border-border last:border-0 hover:bg-muted/30 cursor-pointer transition-colors">
                  <td className="px-4 py-3  ">{ts(h.report)}</td>
                  <td className="px-4 py-3 text-sm">{ts(h.by)}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{td(h.date)}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{td(h.period)}</td>
                  <td className="px-4 py-3">
                    <Badge className={cn('border-0 text-sm', h.format === 'PDF' ? 'bg-blue-50 text-blue-700' : 'bg-[#008755]/10 text-[#008755]')}>{h.format}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <h2 className="font-medium ">{tr('Audit Trail', 'سجل التدقيق')}</h2>
          <Badge className="bg-[#008755]/10 text-[#008755] border-0 text-sm">{tr('IMMUTABLE LOG', 'سجل غير قابل للتعديل')}</Badge>
          <button onClick={exportAuditCsv} className="ms-auto text-sm text-[#008755] hover:underline flex items-center gap-1">
            {tr('Export audit log', 'تصدير سجل التدقيق')} <Download className="h-3 w-3" />
          </button>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="text-sm  ">{tr('System Activity', 'نشاط النظام')}</h3>
          <p className="text-sm text-muted-foreground mb-3.5">{tr('Every material action is recorded with actor and timestamp — actions you take in this session are logged live', 'يُسجَّل كل إجراء جوهري مع منفّذه ووقته — تُسجَّل الإجراءات التي تتخذها في هذه الجلسة مباشرةً')}</p>
          <div className="divide-y divide-border">
            {audit.slice(0, 14).map((a, i) => {
              const Icon = AUDIT_ICON[a.kind];
              const cls = AUDIT_KIND_CLASSES[a.kind];
              return (
                <div key={i} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                  <div className={cn('h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0', cls.bg, cls.fg)}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm  ">{ta(a.title)}</p>
                    <p className="text-[11.5px] text-muted-foreground mt-0.5 leading-relaxed">{ta(a.detail)}</p>
                  </div>
                  <span className="text-sm text-muted-foreground flex-shrink-0 whitespace-nowrap pt-0.5">{ts(a.tm)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
