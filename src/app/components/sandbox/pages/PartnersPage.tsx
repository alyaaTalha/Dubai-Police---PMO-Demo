import { useState } from 'react';
import { Users, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '../../ui/badge';
import { Sheet, SheetContent } from '../../ui/sheet';
import { STATUS_META, TYPES, money, PARTNERS, type Partner } from '../sandboxData';
import type { SandboxStore } from '../SandboxStore';
import heroDecoration from '../../../../assets/sandbox-hero-decoration.png';

interface PageProps { store: SandboxStore; }

export function PartnersPage({ store }: PageProps) {
  const { search, projects } = store;
  const [selected, setSelected] = useState<Partner | null>(null);

  const list = PARTNERS.filter(p => !search || (p.name + p.type).toLowerCase().includes(search.toLowerCase()));
  const jointProjects = selected ? projects.filter(x => x.partners.includes(selected.name)) : [];

  return (
    <div className="p-5 mx-auto space-y-5">
      <div className="rounded-2xl bg-gradient-to-br from-[#005844] via-[#008755] to-[#00a869] p-7 text-white relative overflow-hidden">
        <img src={heroDecoration} alt="" className="absolute -top-16 -right-16 h-160 w-160 rounded-full object-cover opacity-50 pointer-events-none select-none" />
        <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex gap-3.5">
            <div className="h-12 w-12 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center flex-shrink-0">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl   tracking-tight">Partners</h1>
              <p className="text-white/80 text-sm mt-1 max-w-md">Government, academic, international and technology organizations collaborating across the portfolio.</p>
            </div>
          </div>
          <button onClick={() => toast.success('Partner onboarding form opened')} className="inline-flex items-center gap-1.5 rounded-lg bg-white text-[#005844] px-3.5 py-2 text-sm   hover:bg-white/90 transition-colors flex-shrink-0">
            <Plus className="h-3.5 w-3.5" /> Add Partner
          </button>
        </div>
        <div className="relative z-10 flex flex-wrap gap-6 mt-6">
          {[['Active Partners', 9], ['Categories', 4], ['Joint Projects', 21], ['Co-funded Value', 'AED 19.4M']].map(([l, v]) => (
            <div key={l as string} className="border-l-2 border-white/30 pl-3">
              <p className="text-xl   leading-none">{v}</p>
              <p className="text-sm uppercase tracking-wide text-white/75 mt-1 font-medium">{l}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-medium  mb-3">Partner Directory</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {list.map(p => (
            <div key={p.name} onClick={() => setSelected(p)} className="bg-card border border-border rounded-xl overflow-hidden cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="h-16 relative" style={{ backgroundImage: `linear-gradient(135deg, ${p.gradientFrom}, ${p.gradientTo})` }}>
                <div className="absolute left-4 -bottom-5 h-12 w-12 rounded-xl bg-white shadow-md border border-border flex items-center justify-center font-bold text-sm text-foreground">
                  {p.initials}
                </div>
              </div>
              <div className="pt-8 pb-4 px-4">
                <p className="text-sm  ">{p.name}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{p.type} · {p.country}</p>
                <div className="flex gap-4 mt-3.5 pt-3 border-t border-border">
                  <div>
                    <p className="text-sm  ">{p.activeProjects}</p>
                    <p className="text-sm text-muted-foreground">Active projects</p>
                  </div>
                  <div>
                    <p className="text-sm  ">{p.since}</p>
                    <p className="text-sm text-muted-foreground">Partner since</p>
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
                  <h2 className="text-lg  ">{selected.name}</h2>
                  <p className="text-sm text-white/85 mt-1">{selected.type} · {selected.country} · Partner since {selected.since}</p>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#f8f9fb]">
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-card border border-border rounded-xl px-3.5 py-3">
                    <p className="text-sm uppercase tracking-wide text-muted-foreground font-medium">Active Projects</p>
                    <p className="text-sm   mt-1">{selected.activeProjects}</p>
                  </div>
                  <div className="bg-card border border-border rounded-xl px-3.5 py-3">
                    <p className="text-sm uppercase tracking-wide text-muted-foreground font-medium">Category</p>
                    <p className="text-sm   mt-1">{selected.type}</p>
                  </div>
                </div>
                <div className="bg-card border border-border rounded-xl p-4">
                  <h3 className="text-sm   mb-3">Joint Projects</h3>
                  {jointProjects.length ? (
                    <div className="space-y-2.5">
                      {jointProjects.map(x => (
                        <div key={x.id} className="flex items-center gap-2.5 py-1.5 border-b border-border last:border-0">
                          {/* <span className="h-8 w-8 rounded-lg flex-shrink-0" style={{ backgroundImage: `linear-gradient(135deg, ${TYPES[x.type].gradientFrom}, ${TYPES[x.type].gradientTo})` }} /> */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm   truncate">{x.name}</p>
                            <p className="text-sm text-muted-foreground">{x.dept} · {money(x.budget)}</p>
                          </div>
                          <Badge className={`${STATUS_META[x.status].badgeClass} border-0 text-sm`}>{x.status}</Badge>
                        </div>
                      ))}
                    </div>
                  ) : <p className="text-sm text-muted-foreground">No joint projects recorded.</p>}
                </div>
                <button onClick={() => toast.success('Partner agreement opened')} className="w-full rounded-lg bg-[#008755] hover:bg-[#005844] text-white text-sm   py-2.5 transition-colors">
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
