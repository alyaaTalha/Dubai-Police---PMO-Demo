import { useState } from 'react';
import { Users, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '../../ui/badge';
import { Sheet, SheetContent } from '../../ui/sheet';
import { STATUS_META, TYPES, money, PARTNERS, type Partner } from '../sandboxData';
import type { SandboxStore } from '../SandboxStore';

interface PageProps { store: SandboxStore; }

export function PartnersPage({ store }: PageProps) {
  const { search, projects } = store;
  const [selected, setSelected] = useState<Partner | null>(null);

  const list = PARTNERS.filter(p => !search || (p.name + p.type).toLowerCase().includes(search.toLowerCase()));
  const jointProjects = selected ? projects.filter(x => x.partners.includes(selected.name)) : [];

  return (
    <div className="p-5 mx-auto space-y-5">
      <div className="rounded-2xl bg-gradient-to-br from-[#005844] via-[#008755] to-[#00a869] p-7 text-white relative overflow-hidden">
        <div className="absolute -top-10 -right-10 h-56 w-56 rounded-full bg-white/[0.05] pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex gap-3.5">
            <div className="h-12 w-12 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center flex-shrink-0">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-['Dubai:Medium',_sans-serif] tracking-tight">Partners</h1>
              <p className="text-white/80 text-sm mt-1 max-w-md">Government, academic, international and technology organizations collaborating across the portfolio.</p>
            </div>
          </div>
          <button onClick={() => toast.success('Partner onboarding form opened')} className="inline-flex items-center gap-1.5 rounded-lg bg-white text-[#005844] px-3.5 py-2 text-xs font-['Dubai:Medium',_sans-serif] hover:bg-white/90 transition-colors flex-shrink-0">
            <Plus className="h-3.5 w-3.5" /> Add Partner
          </button>
        </div>
        <div className="relative z-10 flex flex-wrap gap-6 mt-6">
          {[['Active Partners', 9], ['Categories', 4], ['Joint Projects', 21], ['Co-funded Value', 'AED 19.4M']].map(([l, v]) => (
            <div key={l as string} className="border-l-2 border-white/30 pl-3">
              <p className="text-xl font-['Dubai:Medium',_sans-serif] leading-none">{v}</p>
              <p className="text-[10.5px] uppercase tracking-wide text-white/75 mt-1 font-medium">{l}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-sm font-['Dubai:Medium',_sans-serif] mb-3">Partner Directory</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {list.map(p => (
            <div key={p.name} onClick={() => setSelected(p)} className="bg-card border border-border rounded-xl overflow-hidden cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="h-16 relative" style={{ backgroundImage: `linear-gradient(135deg, ${p.gradientFrom}, ${p.gradientTo})` }}>
                <div className="absolute left-4 -bottom-5 h-12 w-12 rounded-xl bg-white shadow-md border border-border flex items-center justify-center font-bold text-sm text-foreground">
                  {p.initials}
                </div>
              </div>
              <div className="pt-8 pb-4 px-4">
                <p className="text-sm font-['Dubai:Medium',_sans-serif]">{p.name}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{p.type} · {p.country}</p>
                <div className="flex gap-4 mt-3.5 pt-3 border-t border-border">
                  <div>
                    <p className="text-sm font-['Dubai:Medium',_sans-serif]">{p.activeProjects}</p>
                    <p className="text-[10px] text-muted-foreground">Active projects</p>
                  </div>
                  <div>
                    <p className="text-sm font-['Dubai:Medium',_sans-serif]">{p.since}</p>
                    <p className="text-[10px] text-muted-foreground">Partner since</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Sheet open={!!selected} onOpenChange={(open) => { if (!open) setSelected(null); }}>
        <SheetContent side="right" className="w-[520px] max-w-[94vw] sm:max-w-[520px] p-0 flex flex-col gap-0 overflow-hidden">
          {selected && (
            <>
              <div className="h-32 relative flex-shrink-0 flex items-end p-5" style={{ backgroundImage: `linear-gradient(135deg, ${selected.gradientFrom}, ${selected.gradientTo})` }}>
                <div className="text-white">
                  <h2 className="text-lg font-['Dubai:Medium',_sans-serif]">{selected.name}</h2>
                  <p className="text-xs text-white/85 mt-1">{selected.type} · {selected.country} · Partner since {selected.since}</p>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#f8f9fb]">
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-card border border-border rounded-xl px-3.5 py-3">
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium">Active Projects</p>
                    <p className="text-sm font-['Dubai:Medium',_sans-serif] mt-1">{selected.activeProjects}</p>
                  </div>
                  <div className="bg-card border border-border rounded-xl px-3.5 py-3">
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium">Category</p>
                    <p className="text-sm font-['Dubai:Medium',_sans-serif] mt-1">{selected.type}</p>
                  </div>
                </div>
                <div className="bg-card border border-border rounded-xl p-4">
                  <h3 className="text-sm font-['Dubai:Medium',_sans-serif] mb-3">Joint Projects</h3>
                  {jointProjects.length ? (
                    <div className="space-y-2.5">
                      {jointProjects.map(x => (
                        <div key={x.id} className="flex items-center gap-2.5 py-1.5 border-b border-border last:border-0">
                          <span className="h-8 w-8 rounded-lg flex-shrink-0" style={{ backgroundImage: `linear-gradient(135deg, ${TYPES[x.type].gradientFrom}, ${TYPES[x.type].gradientTo})` }} />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-['Dubai:Medium',_sans-serif] truncate">{x.name}</p>
                            <p className="text-[10.5px] text-muted-foreground">{x.dept} · {money(x.budget)}</p>
                          </div>
                          <Badge className={`${STATUS_META[x.status].badgeClass} border-0 text-[10px]`}>{x.status}</Badge>
                        </div>
                      ))}
                    </div>
                  ) : <p className="text-xs text-muted-foreground">No joint projects recorded.</p>}
                </div>
                <button onClick={() => toast.success('Partner agreement opened')} className="w-full rounded-lg bg-[#008755] hover:bg-[#005844] text-white text-xs font-['Dubai:Medium',_sans-serif] py-2.5 transition-colors">
                  View Partnership Agreement
                </button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
