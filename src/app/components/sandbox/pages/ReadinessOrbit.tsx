import { useEffect, useMemo, useState } from 'react';
import { FlaskConical, Lightbulb, BookOpen, Orbit, ArrowRight, X } from 'lucide-react';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { cn } from '../../ui/utils';
import {
  INNOV_LEVELS, KNOW_LEVELS, STATUS_META, TRL_LABELS, TRL_LEVELS, TYPES, money,
  type Project, type ProjectStatus, type ProjectType,
} from '../sandboxData';

// ── Project Readiness Map ────────────────────────────────────────────────────
// Orbital view of the filtered portfolio: the core is full readiness, each ring
// is one maturity level (TRL for R&D, IN class for Innovation, tier for
// Knowledge) and projects sit on the ring that matches their current level.
// "All Types" splits the circle into three sectors, one per project type, each
// keeping its own scale.

interface ReadinessOrbitProps {
  projects: Project[];
  typeFilter: 'all' | ProjectType;
  onOpenProject: (id: string) => void;
}

type Level = string | number;

const SCALES: Record<ProjectType, {
  tab: string; title: string; subtitle: string; icon: React.ElementType;
  levels: Level[]; label: (l: Level) => string; levelOf: (p: Project) => Level | null;
}> = {
  rd: {
    tab: 'R&D · TRL', title: 'Technology Readiness Level',
    subtitle: 'TRL 1 – 9 · inner rings are closer to operational deployment',
    icon: FlaskConical, levels: TRL_LEVELS, label: (l) => `TRL ${l}`,
    levelOf: (p) => p.trl ?? null,
  },
  innov: {
    tab: 'Innovation · IN', title: 'Innovation Classification',
    subtitle: 'GIMI-aligned IN1 – IN3 · IN1 sits closest to the core',
    icon: Lightbulb, levels: INNOV_LEVELS, label: (l) => String(l),
    levelOf: (p) => (INNOV_LEVELS.includes(p.cls) ? p.cls : null),
  },
  know: {
    tab: 'Knowledge · Class', title: 'Knowledge Classification',
    subtitle: 'Institutional knowledge tiers · Class 7+ sits closest to the core',
    icon: BookOpen, levels: KNOW_LEVELS, label: (l) => String(l),
    levelOf: (p) => (KNOW_LEVELS.includes(p.cls) ? p.cls : null),
  },
};

// Status colors tuned for the dark orbit canvas (same hues as STATUS_META).
const NODE_COLORS: Record<ProjectStatus, string> = {
  'Ongoing': '#34d399',
  'Completed': '#5eead4',
  'Delayed': '#fbbf24',
  'Pending Approval': '#93c5fd',
  'Rejected': '#f87171',
};

const SIZE = 600;
const C = SIZE / 2;
const CORE_R = 50;
const INNER_R = 86;
const OUTER_R = 244;

function ringRadius(i: number, n: number) {
  // Scales with few levels start further out so the inner ring has room for several projects.
  const inner = n <= 4 ? 112 : INNER_R;
  return n === 1 ? (inner + OUTER_R) / 2 : inner + (i * (OUTER_R - inner)) / (n - 1);
}

type View = 'all' | ProjectType;
const TYPE_ORDER: ProjectType[] = ['rd', 'innov', 'know'];

// Angular span (degrees, 0 = right, clockwise) each type occupies in a view.
function sectorsFor(view: View): Record<ProjectType, [number, number] | null> {
  if (view === 'all') return { rd: [-150, -30], innov: [-30, 90], know: [90, 210] };
  return { rd: null, innov: null, know: null, [view]: [-90, 270] } as Record<ProjectType, [number, number] | null>;
}

function polar(r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: C + r * Math.cos(rad), y: C + r * Math.sin(rad) };
}

function arcPath(r: number, from: number, to: number) {
  const a = polar(r, from);
  const b = polar(r, to);
  return `M ${a.x} ${a.y} A ${r} ${r} 0 ${to - from > 180 ? 1 : 0} 1 ${b.x} ${b.y}`;
}

interface OrbitNode { p: Project; type: ProjectType; level: Level; x: number; y: number }

export function ReadinessOrbit({ projects, typeFilter, onOpenProject }: ReadinessOrbitProps) {
  const [view, setView] = useState<View>(typeFilter);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);

  useEffect(() => { setView(typeFilter); }, [typeFilter]);

  const sectors = sectorsFor(view);
  const shownTypes = TYPE_ORDER.filter(t => sectors[t]);
  const shown = useMemo(() => projects.filter(p => sectors[p.type]), [projects, view]); // eslint-disable-line react-hooks/exhaustive-deps
  const unassessed = shown.filter(p => SCALES[p.type].levelOf(p) === null);

  // Position every assessed project on its ring, inside its type's sector.
  // Each node is placed at the free angle that is furthest from the nodes
  // already placed — measured against the size of its name label (wide,
  // sitting below the icon) — so names on neighbouring rings never collide.
  // In "All Types" names only appear on hover/selection, so nodes need far less room.
  const compact = view === 'all';
  const nodes = useMemo(() => {
    const placed: OrbitNode[] = [];
    const [boxW, boxH] = compact ? [50, 50] : [160, 70];
    // Ring labels sit along each sector's first edge — keep icons off them.
    const ringLabels = compact
      ? shownTypes.flatMap(t => SCALES[t].levels.map((_, i) => polar(ringRadius(i, SCALES[t].levels.length), sectors[t]![0] + 6)))
      : [];
    shownTypes.forEach(type => {
      const scale = SCALES[type];
      const [from, to] = sectors[type]!;
      const full = to - from >= 360;
      const n = scale.levels.length;
      scale.levels.forEach((level, i) => {
        const r = ringRadius(i, n);
        shown.filter(p => p.type === type && scale.levelOf(p) === level).forEach(p => {
          let best = { x: C, y: C, score: -Infinity };
          // In a sector, skip the strip by its first edge where ring labels sit.
          for (let deg = full ? from : from + 10; deg <= (full ? to - 1 : to - 4); deg += 2) {
            const fromTop = (((deg + 90) % 360) + 360) % 360;
            if (Math.abs(fromTop - 180) < 22) continue;       // keep labels off the legend
            const { x, y } = polar(r, deg);
            if (full && y < C && Math.abs(x - C) < 95) continue; // ring-label column above the core
            // Each node + name label is roughly a 160 × 70 box (in map units, sized
            // for smaller screens); a gap above 1 means the boxes don't touch.
            const gap = Math.min(
              compact ? Math.hypot(x - C, y - C) / (CORE_R + 30) : Math.max(Math.abs(x - C) / 130, Math.abs(y - C) / 95), // the core circle
              ...placed.map(o => Math.max(Math.abs(x - o.x) / boxW, Math.abs(y - o.y) / boxH)),
              ...ringLabels.map(l => Math.max(Math.abs(x - l.x) / 42, Math.abs(y - l.y) / 26)),
            );
            const score = gap - Math.abs(fromTop - 135) / 3600; // tie-break: favour the right side
            if (score > best.score) best = { x, y, score };
          }
          placed.push({ p, type, level, x: best.x, y: best.y });
        });
      });
    });
    return placed;
  }, [shown, view]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (selectedId && !nodes.some(nd => nd.p.id === selectedId)) setSelectedId(null);
  }, [nodes, selectedId]);

  const activeId = hoverId ?? selectedId;
  const active = nodes.find(nd => nd.p.id === activeId) ?? null;
  const selected = nodes.find(nd => nd.p.id === selectedId) ?? null;

  const isHot = (type: ProjectType, level: Level) => active?.type === type && active.level === level;

  const single = view === 'all' ? null : SCALES[view];
  const counts = single
    ? single.levels.map(l => ({ key: String(l), label: single.label(l), color: TYPES[view as ProjectType].color, v: shown.filter(p => single.levelOf(p) === l).length }))
    : TYPE_ORDER.map(t => ({ key: t, label: TYPES[t].label, color: TYPES[t].color, v: shown.filter(p => p.type === t).length }));
  const cmax = Math.max(...counts.map(c => c.v), 1);

  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium">Project Readiness Map</h3>
            <Badge className="bg-[#008755]/10 text-[#008755] border-0 text-sm">{single ? single.title.toUpperCase() : 'ALL PROJECT TYPES'}</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">
            {single ? single.subtitle : 'One sector per type — TRL for R&D, IN for Innovation, Class for Knowledge · inner rings are more mature'}
          </p>
        </div>
        <div className="flex gap-0.5 bg-muted/60 rounded-lg p-0.5">
          {(['all', ...TYPE_ORDER] as View[]).map(k => {
            const Icon = k === 'all' ? Orbit : SCALES[k].icon;
            return (
              <button
                key={k}
                onClick={() => { setView(k); setSelectedId(null); }}
                className={cn('flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm font-medium transition-colors',
                  view === k ? 'bg-white shadow-sm text-[#008755]' : 'text-muted-foreground hover:text-foreground')}
              >
                <Icon className="h-3 w-3" /> {k === 'all' ? 'All Types' : SCALES[k].tab}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">
        {/* ── Orbit canvas ─────────────────────────────────────────────── */}
        <div
          className="relative rounded-xl overflow-hidden"
          style={{ backgroundImage: 'linear-gradient(150deg, #02241b, #004734 55%, #00674b)' }}
          onClick={() => setSelectedId(null)}
        >
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 80% 15%, rgba(255,255,255,.25), transparent 55%)' }} />
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
          />

          <div className="relative w-full max-w-[580px] mx-auto aspect-square">
            <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 h-full w-full">
              {shownTypes.flatMap(type => {
                const [from, to] = sectors[type]!;
                const levels = SCALES[type].levels;
                return levels.map((level, i) => {
                  const r = ringRadius(i, levels.length);
                  const hot = isHot(type, level);
                  const stroke = hot ? 'rgba(94,234,212,.55)' : 'rgba(255,255,255,.16)';
                  return to - from >= 360
                    ? <circle key={`${type}-${level}`} cx={C} cy={C} r={r} fill="none" stroke={stroke} strokeWidth={hot ? 1.6 : 1} />
                    : <path key={`${type}-${level}`} d={arcPath(r, from + 1.5, to - 1.5)} fill="none" stroke={stroke} strokeWidth={hot ? 1.6 : 1} />;
                });
              })}

              {view === 'all' && TYPE_ORDER.map(type => {
                const a = polar(CORE_R + 8, sectors[type]![0]);
                const b = polar(OUTER_R + 16, sectors[type]![0]);
                return <line key={`div-${type}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgba(255,255,255,.4)" strokeWidth={1.2} strokeDasharray="4 4" />;
              })}

              {nodes.map(nd => (
                <line key={nd.p.id} x1={C} y1={C} x2={nd.x} y2={nd.y} stroke="rgba(255,255,255,.07)" strokeWidth={1} />
              ))}

              {active && (
                <>
                  <line x1={C} y1={C} x2={active.x} y2={active.y} stroke={NODE_COLORS[active.p.status]} strokeWidth={3} strokeLinecap="round" opacity={0.9} />
                  <circle cx={(C + active.x) / 2} cy={(C + active.y) / 2} r={5} fill={NODE_COLORS[active.p.status]} />
                </>
              )}

              {shownTypes.flatMap(type => {
                const [from, to] = sectors[type]!;
                const scale = SCALES[type];
                return scale.levels.map((level, i) => {
                  const r = ringRadius(i, scale.levels.length);
                  // Full view: a column above the core. Sector view: along the sector's first edge.
                  const pos = to - from >= 360 ? { x: C, y: C - r } : polar(r, from + 6);
                  return (
                    <text
                      key={`lbl-${type}-${level}`} x={pos.x} y={pos.y + 4}
                      textAnchor="middle" fontSize={to - from >= 360 ? 11 : 9.5} fontWeight={600}
                      fill={isHot(type, level) ? '#5eead4' : 'rgba(255,255,255,.55)'}
                      stroke="#023126" strokeWidth={5} paintOrder="stroke" style={{ letterSpacing: '.04em' }}
                    >
                      {scale.label(level)}
                    </text>
                  );
                });
              })}

              {view === 'all' && TYPE_ORDER.map(type => {
                const [from, to] = sectors[type]!;
                const pos = polar(OUTER_R + 30, (from + to) / 2);
                return (
                  <text
                    key={`title-${type}`} x={pos.x} y={pos.y + 4} textAnchor="middle"
                    fontSize={11} fontWeight={700} fill="rgba(255,255,255,.85)" style={{ letterSpacing: '.12em' }}
                  >
                    {TYPES[type].label.toUpperCase()}
                  </text>
                );
              })}
            </svg>

            {/* Core */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex flex-col items-center justify-center text-white border border-[#5eead4]/40 bg-gradient-to-br from-[#00a869] to-[#005844] shadow-[0_0_40px_rgba(52,211,153,.25)]"
              style={{ left: '50%', top: '50%', width: `${(CORE_R * 2 / SIZE) * 100}%`, height: `${(CORE_R * 2 / SIZE) * 100}%` }}
            >
              <span className="text-xl leading-none">{nodes.length}</span>
              <span className="text-[9px] uppercase tracking-wide text-white/80 mt-1">{view === 'all' ? 'Projects' : TYPES[view].label}</span>
            </div>

            {/* Project nodes */}
            {nodes.map(nd => {
              const color = NODE_COLORS[nd.p.status];
              const isSel = nd.p.id === selectedId;
              const isActive = nd.p.id === activeId;
              return (
                <button
                  key={nd.p.id}
                  onClick={(e) => { e.stopPropagation(); setSelectedId(isSel ? null : nd.p.id); }}
                  onMouseEnter={() => setHoverId(nd.p.id)}
                  onMouseLeave={() => setHoverId(null)}
                  className={cn('absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 group', isActive ? 'z-20' : 'z-10')}
                  style={{ left: `${(nd.x / SIZE) * 100}%`, top: `${(nd.y / SIZE) * 100}%` }}
                  title={`${nd.p.name} · ${SCALES[nd.type].label(nd.level)} · ${nd.p.status}`}
                >
                  <span
                    className={cn('h-8 w-8 rounded-full flex items-center justify-center border-2 transition-all', isActive ? 'scale-125' : 'group-hover:scale-110')}
                    style={isActive
                      ? { background: color, borderColor: color, boxShadow: `0 0 18px ${color}99` }
                      : { background: 'rgba(2,36,27,.9)', borderColor: `${color}b3` }}
                  >
                    {(() => { const Icon = SCALES[nd.type].icon; return <Icon className="h-3.5 w-3.5" style={{ color: isActive ? '#02241b' : color }} />; })()}
                  </span>
                  {(!compact || isActive) && (
                    <span className={cn('absolute top-full mt-1 w-[120px] text-center text-[10.5px] leading-tight line-clamp-2 pointer-events-none',
                      isActive ? 'text-white font-medium' : 'text-white/70',
                      compact && 'mt-2 rounded-md bg-[#02241b]/90 border border-white/15 px-1.5 py-1')}>
                      {nd.p.name}
                    </span>
                  )}
                </button>
              );
            })}

            {!nodes.length && (
              <div className="absolute inset-x-0 bottom-[14%] text-center text-sm text-white/70">
                No {view === 'all' ? '' : `${TYPES[view].full} `}projects match the current filters.
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="relative flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 px-4 pt-4 pb-3.5 text-[11px] text-white/75">
            {(Object.keys(NODE_COLORS) as ProjectStatus[]).map(s => (
              <span key={s} className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ background: NODE_COLORS[s] }} /> {s}
              </span>
            ))}
          </div>
        </div>

        {/* ── Side panel ───────────────────────────────────────────────── */}
        <div className="bg-muted/30 rounded-xl p-4 h-fit">
          {selected ? (
            <div className="space-y-3.5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground">{selected.p.id} · {selected.p.start}–{selected.p.end}</p>
                  <h4 className="font-medium leading-snug mt-0.5">{selected.p.name}</h4>
                </div>
                <button onClick={() => setSelectedId(null)} className="h-6 w-6 rounded-md hover:bg-muted flex items-center justify-center flex-shrink-0">
                  <X className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
              </div>

              <div className="rounded-lg border border-[#008755]/30 bg-gradient-to-r from-[#008755]/5 to-white p-3">
                <p className="text-sm text-muted-foreground">Current level</p>
                <p className="text-lg text-[#008755] leading-tight mt-0.5">{SCALES[selected.type].label(selected.level)}</p>
                {selected.type === 'rd' && <p className="text-sm text-muted-foreground mt-0.5">{TRL_LABELS[selected.level as number]}</p>}
                <div className="flex gap-1 mt-2.5">
                  {[...SCALES[selected.type].levels].reverse().map(l => {
                    const levels = SCALES[selected.type].levels;
                    const reached = levels.indexOf(l) >= levels.indexOf(selected.level);
                    return <span key={String(l)} className={cn('h-1.5 flex-1 rounded-full', reached ? 'bg-[#008755]' : 'bg-muted')} />;
                  })}
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                <Badge className={`${STATUS_META[selected.p.status].badgeClass} border-0 text-sm`}>{selected.p.status}</Badge>
                <Badge className={`${TYPES[selected.p.type].badgeClass} border-0 text-sm`}>{TYPES[selected.p.type].label}</Badge>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">{selected.p.desc}</p>

              <div className="grid grid-cols-2 gap-2.5 text-sm">
                {[['Stage', selected.p.stage], ['Budget', money(selected.p.budget)], ['Department', selected.p.dept], ['Score', selected.p.score ? `${selected.p.score}/100` : 'Pending']].map(([l, v]) => (
                  <div key={l}>
                    <p className="text-muted-foreground">{l}</p>
                    <p className="font-medium truncate">{v}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onOpenProject(selected.p.id)}
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#008755] hover:bg-[#005844] text-white text-sm px-4 py-2.5 transition-colors"
              >
                Open Project Record <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 border-b border-border pb-2.5 mb-3.5">
                <Orbit className="h-4 w-4 text-[#008755]" />
                <h4 className="text-sm">{single ? 'Projects by Level' : 'Projects by Type'}</h4>
              </div>
              <div className="space-y-2.5">
                {counts.map(({ key, label, color, v }) => (
                  <div key={key} className="grid grid-cols-[72px_1fr_22px] items-center gap-2.5 text-sm">
                    <span className="text-foreground/80 font-medium">{label}</span>
                    <Progress value={(v / cmax) * 100} className="h-2" indicatorColor={color} />
                    <span className="text-right">{v}</span>
                  </div>
                ))}
              </div>
              {unassessed.length > 0 && (
                <p className="text-sm text-amber-700 mt-3.5">{unassessed.length} project{unassessed.length > 1 ? 's' : ''} not yet assessed</p>
              )}
              <p className="text-sm text-muted-foreground mt-3.5 pt-3 border-t border-border">
                {single ? 'Select a project on the map to see its readiness details.' : 'Select a project for its details, or pick a type above to see its levels.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
