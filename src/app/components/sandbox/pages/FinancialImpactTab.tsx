import { Coins, PiggyBank, TrendingUp, Wallet } from 'lucide-react';
import { Progress } from '../../ui/progress';
import type { Project } from '../sandboxData';
import { useLanguage } from '../../../i18n/LanguageContext';

// ── Financial Impact ─────────────────────────────────────────────────────────
// Financial impact (الأثر المالي), realised savings (الوفر المالي — المنصرف)
// and income (الدخل) for a project. Planned figures are derived from the
// project budget; actuals scale with how far the project has progressed.

const ACCENT = '#008755';
const NAVY = '#00205B';
const GOLD = '#a8710d';

interface Line { label: string; labelAr: string; factor: number }

const SAVINGS: Line[] = [
  { label: 'Reduced manual work hours', labelAr: 'تقليل ساعات العمل اليدوي', factor: 0.35 },
  { label: 'Operational cost reduction', labelAr: 'خفض التكاليف التشغيلية', factor: 0.25 },
  { label: 'Avoided procurement costs', labelAr: 'تجنّب تكاليف الشراء', factor: 0.18 },
  { label: 'Maintenance & licensing', labelAr: 'الصيانة والتراخيص', factor: 0.08 },
];

const INCOME: Line[] = [
  { label: 'Service fees', labelAr: 'رسوم الخدمات', factor: 0.22 },
  { label: 'IP licensing', labelAr: 'ترخيص الملكية الفكرية', factor: 0.12 },
  { label: 'Partner contributions', labelAr: 'مساهمات الشركاء', factor: 0.1 },
];

const STAGE_REALISATION: Record<string, number> = {
  'Idea': 0, 'Feasibility Study': 0, 'Approval': 0.1, 'Development': 0.45, 'Sandbox': 0.85,
};

function buildRows(lines: Line[], budget: number, realised: number) {
  return lines.map(l => {
    const planned = budget * l.factor;
    return { ...l, planned, actual: planned * realised };
  });
}

const sum = (rows: Array<{ planned: number; actual: number }>, k: 'planned' | 'actual') => rows.reduce((a, r) => a + r[k], 0);

export function FinancialImpactTab({ project }: { project: Project }) {
  const { tr } = useLanguage();
  const fmt = (v: number) => tr(`AED ${v.toFixed(2)}M`, `${v.toFixed(2)} مليون درهم`);
  const pct = (a: number, p: number) => (p ? Math.round((a / p) * 100) : 0);

  const realised = project.status === 'Completed' ? 1 : STAGE_REALISATION[project.stage] ?? 0;
  const savings = buildRows(SAVINGS, project.budget, realised);
  const income = buildRows(INCOME, project.budget, realised).map(r =>
    r.label === 'IP licensing' && project.ip.length === 0 ? { ...r, planned: 0, actual: 0 } : r);

  const savingsPlanned = sum(savings, 'planned');
  const savingsActual = sum(savings, 'actual');
  const incomePlanned = sum(income, 'planned');
  const incomeActual = sum(income, 'actual');
  const impactPlanned = savingsPlanned + incomePlanned;
  const impactActual = savingsActual + incomeActual;
  const roi = Math.round(((impactPlanned - project.budget) / project.budget) * 100);
  const paybackYears = impactPlanned ? project.budget / impactPlanned : 0;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base   text-foreground">{tr('Financial Impact', 'الأثر المالي')}</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          {tr('Annual financial return from savings and income against the project budget.', 'العائد المالي السنوي من الوفر والدخل مقارنةً بميزانية المشروع.')}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KpiTile icon={TrendingUp} color={ACCENT} label={tr('Financial Impact', 'الأثر المالي')} value={fmt(impactActual)} detail={tr(`of ${fmt(impactPlanned)} planned`, `من ${fmt(impactPlanned)} مخطط`)} />
        <KpiTile icon={PiggyBank} color={NAVY} label={tr('Financial Savings (Spent)', 'الوفر المالي (المنصرف)')} value={fmt(savingsActual)} detail={tr(`of ${fmt(savingsPlanned)} planned`, `من ${fmt(savingsPlanned)} مخطط`)} />
        <KpiTile icon={Coins} color={GOLD} label={tr('Income', 'الدخل')} value={fmt(incomeActual)} detail={tr(`of ${fmt(incomePlanned)} planned`, `من ${fmt(incomePlanned)} مخطط`)} />
        <KpiTile icon={Wallet} color={roi >= 0 ? ACCENT : '#D83731'} label={tr('Return on Investment', 'العائد على الاستثمار')} value={`${roi}%`} detail={tr(`Payback in ${paybackYears.toFixed(1)} years`, `استرداد التكلفة خلال ${paybackYears.toFixed(1)} سنة`)} />
      </div>

      {/* Financial impact composition */}
      <div className="border border-border rounded-xl p-4 space-y-3">
        <h3 className="text-sm  ">{tr('Financial Impact Breakdown', 'تفاصيل الأثر المالي')}</h3>
        <ImpactBar label={tr('Financial Savings (Spent)', 'الوفر المالي (المنصرف)')} actual={savingsActual} planned={savingsPlanned} color={NAVY} fmt={fmt} />
        <ImpactBar label={tr('Income', 'الدخل')} actual={incomeActual} planned={incomePlanned} color={GOLD} fmt={fmt} />
        <ImpactBar label={tr('Total Financial Impact', 'إجمالي الأثر المالي')} actual={impactActual} planned={impactPlanned} color={ACCENT} fmt={fmt} />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-border text-sm">
          <Stat label={tr('Project Budget', 'ميزانية المشروع')} value={fmt(project.budget)} />
          <Stat label={tr('Net Impact (Planned)', 'صافي الأثر (المخطط)')} value={fmt(impactPlanned - project.budget)} />
          <Stat label={tr('Achieved to Date', 'المحقق حتى تاريخه')} value={`${pct(impactActual, impactPlanned)}%`} />
        </div>
      </div>

      {/* <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <BreakdownTable
          title={tr('Financial Savings (Spent)', 'الوفر المالي (المنصرف)')}
          itemHeader={tr('Savings Item', 'بند الوفر')}
          rows={savings}
          color={NAVY}
          fmt={fmt}
        />
        <BreakdownTable
          title={tr('Income', 'الدخل')}
          itemHeader={tr('Income Source', 'مصدر الدخل')}
          rows={income}
          color={GOLD}
          fmt={fmt}
        />
      </div> */}
    </div>
  );
}

function KpiTile({ icon: Icon, color, label, value, detail }: { icon: React.ElementType; color: string; label: string; value: string; detail: string }) {
  return (
    <div className="bg-card border border-border rounded-lg p-3">
      <div className="h-8 w-8 rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: `${color}1a` }}>
        <Icon className="h-4 w-4" style={{ color }} />
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-lg mt-0.5" style={{ color }}>{value}</p>
      <p className="text-sm text-muted-foreground">{detail}</p>
    </div>
  );
}

function ImpactBar({ label, actual, planned, color, fmt }: { label: string; actual: number; planned: number; color: string; fmt: (v: number) => string }) {
  const value = planned ? Math.round((actual / planned) * 100) : 0;
  return (
    <div className="flex items-center gap-3 text-sm flex-wrap sm:flex-nowrap">
      <span className="w-48 flex-shrink-0 text-foreground/80">{label}</span>
      <Progress value={value} className="flex-1 h-2 min-w-[120px]" indicatorColor={color} />
      <span className="w-56 text-end text-muted-foreground whitespace-nowrap">{fmt(actual)} / {fmt(planned)}</span>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-muted/30 rounded-lg p-3">
      <p className="text-muted-foreground">{label}</p>
      <p className="mt-0.5">{value}</p>
    </div>
  );
}

function BreakdownTable({ title, itemHeader, rows, color, fmt }: {
  title: string;
  itemHeader: string;
  rows: Array<Line & { planned: number; actual: number }>;
  color: string;
  fmt: (v: number) => string;
}) {
  const { tr } = useLanguage();
  const planned = sum(rows, 'planned');
  const actual = sum(rows, 'actual');
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-border flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
        <h3 className="text-sm  ">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30 text-muted-foreground">
              <th className="text-start py-2 px-3 font-medium">{itemHeader}</th>
              <th className="text-start py-2 px-3 font-medium">{tr('Planned', 'المخطط')}</th>
              <th className="text-start py-2 px-3 font-medium">{tr('Actual', 'الفعلي')}</th>
              <th className="text-start py-2 px-3 font-medium">{tr('Achieved', 'نسبة التحقق')}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.label} className="border-b border-border last:border-0">
                <td className="py-2 px-3">{tr(r.label, r.labelAr)}</td>
                <td className="py-2 px-3 whitespace-nowrap">{fmt(r.planned)}</td>
                <td className="py-2 px-3 whitespace-nowrap">{fmt(r.actual)}</td>
                <td className="py-2 px-3">{r.planned ? `${Math.round((r.actual / r.planned) * 100)}%` : '—'}</td>
              </tr>
            ))}
            <tr className="bg-muted/30">
              <td className="py-2 px-3">{tr('Total', 'الإجمالي')}</td>
              <td className="py-2 px-3 whitespace-nowrap">{fmt(planned)}</td>
              <td className="py-2 px-3 whitespace-nowrap">{fmt(actual)}</td>
              <td className="py-2 px-3">{planned ? `${Math.round((actual / planned) * 100)}%` : '—'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
