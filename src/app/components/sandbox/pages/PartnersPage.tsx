import { useState } from 'react';
import { Users, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '../../ui/badge';
import { Sheet, SheetContent } from '../../ui/sheet';
import { STATUS_META, TYPES, money, PARTNERS, type Partner } from '../sandboxData';
import type { SandboxStore } from '../SandboxStore';
import { useLanguage } from '../../../i18n/LanguageContext';
import { useSandboxTr } from '../sandboxI18n';
import heroDecoration from '../../../../assets/sandbox-hero-decoration.png';

interface PageProps { store: SandboxStore; }

export function PartnersPage({ store }: PageProps) {
  const { tr, isRTL } = useLanguage();
  const ts = useSandboxTr();
  const fmtMoney = (v: number) => tr(money(v), `${v.toFixed(1)} مليون درهم`);
  const { search, projects } = store;
  const [selected, setSelected] = useState<Partner | null>(null);

  const list = PARTNERS.filter(p => !search || ((p.name + p.type).toLowerCase().includes(search.toLowerCase()) || (ts(p.name) + ts(p.type)).includes(search)));
  const jointProjects = selected ? projects.filter(x => x.partners.includes(selected.name)) : [];

  return (
    <div className="p-5 mx-auto space-y-5">
      <div className="rounded-2xl bg-gradient-to-br from-[#005844] via-[#008755] to-[#00a869] p-7 text-white relative overflow-hidden">
        <img src={heroDecoration} alt="" className="absolute -top-16 -end-16 h-160 w-160 rounded-full object-cover opacity-50 pointer-events-none select-none" />
        <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex gap-3.5">
            <div className="h-12 w-12 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center flex-shrink-0">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl   tracking-tight">{tr('Partners', 'الشركاء')}</h1>
              <p className="text-white/80 text-sm mt-1 max-w-md">{tr('Government, academic, international and technology organizations collaborating across the portfolio.', 'جهات حكومية وأكاديمية ودولية وتقنية تتعاون عبر محفظة المشاريع.')}</p>
            </div>
          </div>
          <button onClick={() => toast.success(tr('Partner onboarding form opened', 'تم فتح نموذج إضافة شريك'))} className="inline-flex items-center gap-1.5 rounded-lg bg-white text-[#005844] px-3.5 py-2 text-sm   hover:bg-white/90 transition-colors flex-shrink-0">
            <Plus className="h-3.5 w-3.5" /> {tr('Add Partner', 'إضافة شريك')}
          </button>
        </div>
        <div className="relative z-10 flex flex-wrap gap-6 mt-6">
          {[[tr('Active Partners', 'الشركاء النشطون'), 9], [tr('Categories', 'الفئات'), 4], [tr('Joint Projects', 'المشاريع المشتركة'), 21], [tr('Co-funded Value', 'قيمة التمويل المشترك'), tr('AED 19.4M', '19.4 مليون درهم')]].map(([l, v]) => (
            <div key={l as string} className="border-s-2 border-white/30 ps-3">
              <p className="text-xl   leading-none">{v}</p>
              <p className="text-sm uppercase tracking-wide text-white/75 mt-1 font-medium">{l}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-medium  mb-3">{tr('Partner Directory', 'دليل الشركاء')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {list.map(p => (
            <div key={p.name} onClick={() => setSelected(p)} className="bg-card border border-border rounded-xl overflow-hidden cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="h-16 relative" style={{ backgroundImage: `linear-gradient(135deg, ${p.gradientFrom}, ${p.gradientTo})` }}>
                <div className="absolute start-4 -bottom-5 h-12 w-12 rounded-xl bg-white shadow-md border border-border flex items-center justify-center font-bold text-sm text-foreground">
                  {p.initials}
                </div>
              </div>
              <div className="pt-8 pb-4 px-4">
                <p className="text-sm  ">{ts(p.name)}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{ts(p.type)} · {ts(p.country)}</p>
                <div className="flex gap-4 mt-3.5 pt-3 border-t border-border">
                  <div>
                    <p className="text-sm  ">{p.activeProjects}</p>
                    <p className="text-sm text-muted-foreground">{tr('Active projects', 'المشاريع النشطة')}</p>
                  </div>
                  <div>
                    <p className="text-sm  ">{p.since}</p>
                    <p className="text-sm text-muted-foreground">{tr('Partner since', 'شريك منذ')}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Sheet open={!!selected} onOpenChange={(open) => { if (!open) setSelected(null); }}>
        <SheetContent side={isRTL ? 'left' : 'right'} className="w-[520px] max-w-[94vw] sm:max-w-[520px] p-0 flex flex-col gap-0 overflow-hidden">
          {selected && (
            <>
              <div className="h-32 relative flex-shrink-0 flex items-end p-5" style={{ backgroundImage: `linear-gradient(135deg, ${selected.gradientFrom}, ${selected.gradientTo})` }}>
                <div className="text-white">
                  <h2 className="text-lg  ">{ts(selected.name)}</h2>
                  <p className="text-sm text-white/85 mt-1">{ts(selected.type)} · {ts(selected.country)} · {tr('Partner since', 'شريك منذ')} {selected.since}</p>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#f8f9fb]">
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-card border border-border rounded-xl px-3.5 py-3">
                    <p className="text-sm uppercase tracking-wide text-muted-foreground font-medium">{tr('Active Projects', 'المشاريع النشطة')}</p>
                    <p className="text-sm   mt-1">{selected.activeProjects}</p>
                  </div>
                  <div className="bg-card border border-border rounded-xl px-3.5 py-3">
                    <p className="text-sm uppercase tracking-wide text-muted-foreground font-medium">{tr('Category', 'الفئة')}</p>
                    <p className="text-sm   mt-1">{ts(selected.type)}</p>
                  </div>
                </div>
                <div className="bg-card border border-border rounded-xl p-4">
                  <h3 className="text-sm   mb-3">{tr('Joint Projects', 'المشاريع المشتركة')}</h3>
                  {jointProjects.length ? (
                    <div className="space-y-2.5">
                      {jointProjects.map(x => (
                        <div key={x.id} className="flex items-center gap-2.5 py-1.5 border-b border-border last:border-0">
                          {/* <span className="h-8 w-8 rounded-lg flex-shrink-0" style={{ backgroundImage: `linear-gradient(135deg, ${TYPES[x.type].gradientFrom}, ${TYPES[x.type].gradientTo})` }} /> */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm   truncate">{ts(x.name)}</p>
                            <p className="text-sm text-muted-foreground">{ts(x.dept)} · {fmtMoney(x.budget)}</p>
                          </div>
                          <Badge className={`${STATUS_META[x.status].badgeClass} border-0 text-sm`}>{ts(x.status)}</Badge>
                        </div>
                      ))}
                    </div>
                  ) : <p className="text-sm text-muted-foreground">{tr('No joint projects recorded.', 'لا توجد مشاريع مشتركة مسجلة.')}</p>}
                </div>
                <button onClick={() => toast.success(tr('Partner agreement opened', 'تم فتح اتفاقية الشراكة'))} className="w-full rounded-lg bg-[#008755] hover:bg-[#005844] text-white text-sm   py-2.5 transition-colors">
                  {tr('View Partnership Agreement', 'عرض اتفاقية الشراكة')}
                </button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
