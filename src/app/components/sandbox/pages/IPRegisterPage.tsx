import { useMemo, useState } from 'react';
import { Shield, CheckCircle2, Clock, BookMarked, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '../../ui/badge';
import { cn } from '../../ui/utils';
import { IP_REGISTER, type IPItem } from '../sandboxData';
import type { SandboxStore } from '../SandboxStore';
import heroDecoration from '../../../../assets/sandbox-hero-decoration.png';

interface PageProps { store: SandboxStore; }

const FILTERS: Array<'all' | IPItem['kind']> = ['all', 'Patent', 'Trademark', 'Intellectual Work'];

export function IPRegisterPage({ store }: PageProps) {
  const { search } = store;
  const [filter, setFilter] = useState<'all' | IPItem['kind']>('all');

  const list = useMemo(() => IP_REGISTER.filter(x =>
    (filter === 'all' || x.kind === filter) &&
    (!search || (x.title + x.dept + x.proj).toLowerCase().includes(search.toLowerCase()))
  ), [filter, search]);

  const granted = IP_REGISTER.filter(x => x.status === 'Granted').length;
  const pending = IP_REGISTER.filter(x => x.status === 'Under Approval').length;
  const patents = IP_REGISTER.filter(x => x.kind === 'Patent').length;
  const others = IP_REGISTER.length - patents;

  return (
    <div className="p-5 mx-auto space-y-5">
      <div className="rounded-2xl bg-gradient-to-br from-[#005844] via-[#008755] to-[#00a869] p-7 text-white relative overflow-hidden">
        <img src={heroDecoration} alt="" className="absolute -top-16 -right-16 h-160 w-160 rounded-full object-cover opacity-50 pointer-events-none select-none" />
        <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex gap-3.5">
            <div className="h-12 w-12 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center flex-shrink-0">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl   tracking-tight">Patents &amp; Intellectual Property</h1>
              <p className="text-white/80 text-sm mt-1 max-w-md">Institutional IP register spanning every project type, with filing status and ownership.</p>
            </div>
          </div>
          <button
            onClick={() => { toast.success('IP registration form opened'); store.addAudit({ title: 'IP registration started', detail: 'New IP filing initiated from the register', kind: 'info' }); }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-white text-[#005844] px-3.5 py-2 text-sm   hover:bg-white/90 transition-colors flex-shrink-0"
          >
            <Plus className="h-3.5 w-3.5" /> Register IP
          </button>
        </div>
        <div className="relative z-10 flex flex-wrap gap-6 mt-6">
          {[['Patents', patents], ['Granted / Pending', `${granted} / ${pending}`], ['Trademarks', IP_REGISTER.filter(x => x.kind === 'Trademark').length], ['Intellectual Works', IP_REGISTER.filter(x => x.kind === 'Intellectual Work').length]].map(([l, v]) => (
            <div key={l as string} className="border-l-2 border-white/30 pl-3">
              <p className="text-xl   leading-none">{v}</p>
              <p className="text-sm uppercase tracking-wide text-white/75 mt-1 font-medium">{l}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          [Shield, patents, 'Patents Filed'],
          [CheckCircle2, granted, 'Granted'],
          [Clock, pending, 'Under Approval'],
          [BookMarked, others, 'Trademarks & Works'],
        ].map(([Icon, v, l], i) => {
          const IconComp = Icon as React.ElementType;
          return (
            <div key={i} className="bg-card border border-border rounded-xl p-4">
              <div className="h-9 w-9 rounded-lg bg-[#008755]/10 flex items-center justify-center mb-3">
                <IconComp className="h-4 w-4 text-[#008755]" />
              </div>
              <p className="text-xl   leading-none">{v}</p>
              <p className="text-sm text-muted-foreground mt-1.5">{l}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5 border-b border-border">
          <div>
            <h3 className="text-sm  ">IP Register</h3>
            <p className="text-sm text-muted-foreground mt-0.5">All filed patents, trademarks and intellectual works</p>
          </div>
          <div className="flex gap-1">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn('px-2.5 py-1 rounded-md border text-sm font-medium transition-colors',
                  filter === f ? 'bg-[#008755] border-[#008755] text-white' : 'border-border text-muted-foreground hover:border-[#008755] hover:text-[#008755]')}
              >
                {f === 'all' ? 'All' : f === 'Intellectual Work' ? 'Works' : `${f}s`}
              </button>
            ))}
          </div>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-sm uppercase tracking-wide text-muted-foreground bg-muted/30">
              <th className="px-4 py-2.5 font-semibold">Title</th>
              <th className="px-4 py-2.5 font-semibold">Type</th>
              <th className="px-4 py-2.5 font-semibold">Status</th>
              <th className="px-4 py-2.5 font-semibold">Filed</th>
              <th className="px-4 py-2.5 font-semibold">Department</th>
              <th className="px-4 py-2.5 font-semibold">Linked Project</th>
            </tr>
          </thead>
          <tbody>
            {list.map(x => (
              <tr key={x.title} onClick={() => toast.info(`Opening IP record: ${x.title}`)} className="border-b border-border last:border-0 hover:bg-muted/30 cursor-pointer transition-colors">
                <td className="px-4 py-3  ">{x.title}</td>
                <td className="px-4 py-3">
                  <Badge className={cn('border-0 text-sm',
                    x.kind === 'Patent' ? 'bg-blue-50 text-blue-700' : x.kind === 'Trademark' ? 'bg-[#008755]/10 text-[#008755]' : 'bg-amber-50 text-amber-700')}>
                    {x.kind}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <Badge className={cn('border-0 text-sm', x.status === 'Granted' ? 'bg-[#008755]/10 text-[#008755]' : 'bg-blue-50 text-blue-700')}>{x.status}</Badge>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{x.filed}</td>
                <td className="px-4 py-3 text-sm">{x.dept}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{x.proj}</td>
              </tr>
            ))}
            {!list.length && (
              <tr><td colSpan={6} className="px-4 py-10 text-center text-sm text-muted-foreground">No IP records found. Try a different filter.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
