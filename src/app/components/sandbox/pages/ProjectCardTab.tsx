import { Check, Download, Hexagon, Image as ImageIcon, Printer, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '../../ui/badge';
import { cn } from '../../ui/utils';
import { TRL_LABELS, type Project } from '../sandboxData';
import dubaiPolice from '../../../../assets/Dubai-Police-Image.jpeg';
import dubaiPolice2 from '../../../../assets/dubai-police.jpg';
import dubaiPolice3 from '../../../../assets/img1.jpeg';
import dubaiPolice4 from '../../../../assets/img2.jpg';
import dubaiPolice5 from '../../../../assets/img3.jpg';
import dubaiPolice6 from '../../../../assets/img4.jpg';
import hero from '../../../../assets/hero.jpeg';

// ── Project Card ─────────────────────────────────────────────────────────────
// Structured one-page project card used by the Innovation Labs (R&D section):
// ten numbered fields covering submitter, classification, summary, image,
// prior application, feasibility, candidate vendors and the recommendation.

type Applied = 'Yes' | 'No' | 'Not Sure';
type Feasible = 'Yes' | 'No' | 'Needs Study';

interface CardDetails {
  submitter: string;
  filledOn: string;
  appliedElsewhere: Applied;
  appliedNote: string;
  feasible: Feasible;
  feasibleNote: string;
  companies: string[];
  recommendation: string;
}

const CARD_DETAILS: Record<string, Partial<CardDetails>> = {
  'P-101': { submitter: 'Capt. Khalid Al Rashid', filledOn: 'Mar 04, 2025', appliedElsewhere: 'Not Sure', appliedNote: 'Similar predictive models are reported by two international police forces; no UAE deployment confirmed.', feasible: 'Yes', feasibleNote: 'Historical incident data is available and cleansed; compute capacity secured in the sandbox.', recommendation: 'Proceed to field validation in two districts and file the detection algorithm patent.' },
  'P-102': { submitter: 'Lt. Hamad Al Falasi', filledOn: 'Jan 18, 2026', appliedElsewhere: 'Yes', appliedNote: 'Trialled by partner agencies abroad for event monitoring; airspace rules differ locally.', feasible: 'Needs Study', feasibleNote: 'Depends on GCAA regulatory clearance and flight-endurance benchmarks.', recommendation: 'Complete the feasibility study and secure regulatory clearance before approval.' },
  'P-103': { submitter: 'Dr. Hessa Al Blooshi', filledOn: 'Feb 11, 2024', appliedElsewhere: 'No', appliedNote: 'No equivalent rapid-analysis protocol in use across federal forensic labs.', feasible: 'Yes', feasibleNote: 'Lab trials show a stable sub-6-hour turnaround on reference samples.', recommendation: 'Continue development and progress the sequencing protocol patent.' },
  'P-104': { submitter: 'Maj. Noura Al Hammadi', filledOn: 'Apr 22, 2025', appliedElsewhere: 'Not Sure', feasible: 'Needs Study', feasibleNote: 'Ethics and privacy review must be completed before data collection.', recommendation: 'Re-baseline the timeline after the ethics review concludes.' },
  'P-105': { submitter: 'Dr. Layla Ahmed', filledOn: 'Jan 09, 2024', appliedElsewhere: 'No', appliedNote: 'First post-quantum pilot across a UAE government communications network.', feasible: 'Yes', feasibleNote: 'Pilot completed with no measurable latency impact.', recommendation: 'Applied — scale to all internal channels.' },
  'P-106': { submitter: 'Eng. Saif Al Mazrouei', filledOn: 'Feb 02, 2026', appliedElsewhere: 'No', feasible: 'Needs Study', feasibleNote: 'Optical components require vendor benchmarking.', recommendation: 'Run a vendor benchmarking exercise before feasibility sign-off.' },
  'P-201': { submitter: 'Eng. Sara Al Neyadi', filledOn: 'Mar 15, 2025', appliedElsewhere: 'No', appliedNote: 'First fully digital evidence room in the region.', feasible: 'Yes', feasibleNote: 'Running in sandbox across two precincts with a 71% drop in custody errors.', recommendation: 'Roll out to all precincts and pursue federal accreditation.' },
  'P-202': { submitter: 'Fatima Al Mansoori', filledOn: 'May 06, 2024', appliedElsewhere: 'Yes', appliedNote: 'Comparable NLP triage used in other government call centres.', feasible: 'Yes', feasibleNote: 'Routing complaints 40% faster than the manual process.', recommendation: 'Applied — extend triage to Arabic voice channels.' },
  'P-203': { submitter: 'Maj. Rashid Al Suwaidi', filledOn: 'Jun 10, 2025', appliedElsewhere: 'Yes', appliedNote: 'Digital twins in use by city transport authorities for planning.', feasible: 'Yes', feasibleNote: 'Live sensor feeds available through the traffic control centre.', recommendation: 'Continue build and integrate with the RTA data exchange.' },
  'P-205': { submitter: 'Saeed Al Ketbi', filledOn: 'Aug 19, 2025', appliedElsewhere: 'Yes', feasible: 'Needs Study', feasibleNote: 'Sensor installation across the fleet is behind schedule.', recommendation: 'Reallocate resources to recover the installation schedule.' },
  'P-206': { submitter: 'Fatima Al Mansoori', filledOn: 'Mar 02, 2024', appliedElsewhere: 'Yes', appliedNote: 'Queue systems are common; dynamic allocation method is proprietary.', feasible: 'Yes', feasibleNote: 'Wait times reduced from 25 to 9 minutes across pilot centres.', recommendation: 'Applied — deploy to remaining service centres.' },
  'P-302': { submitter: 'Saeed Al Ketbi', filledOn: 'Feb 20, 2024', appliedElsewhere: 'No', feasible: 'Yes', feasibleNote: 'Deployed to every frontline officer device.', recommendation: 'Applied — maintain quarterly content updates.' },
  'P-305': { submitter: 'Mariam Al Suwaidi', filledOn: 'Jan 15, 2024', appliedElsewhere: 'No', appliedNote: 'Positioned as the first federal forensic documentation standard.', feasible: 'Yes', feasibleNote: 'Endorsed by partner universities and forensic leads.', recommendation: 'Submit for federal adoption.' },
};

const CARD_IMAGES: Record<string, string> = {
  'P-201': dubaiPolice, 'P-102': dubaiPolice2, 'P-103': dubaiPolice3, 'P-203': dubaiPolice4,
  'P-302': dubaiPolice5, 'P-105': dubaiPolice6, 'P-206': hero,
};

function cardFor(project: Project): CardDetails {
  const d = CARD_DETAILS[project.id] ?? {};
  const applied = project.status === 'Completed' || project.stage === 'Sandbox';
  return {
    submitter: d.submitter ?? project.evaluator ?? 'Mohammed Hassan',
    filledOn: d.filledOn ?? `Jan 01, ${project.start}`,
    appliedElsewhere: d.appliedElsewhere ?? 'Not Sure',
    appliedNote: d.appliedNote ?? '',
    feasible: d.feasible ?? (project.status === 'Rejected' ? 'No' : project.score ? 'Yes' : 'Needs Study'),
    feasibleNote: d.feasibleNote ?? '',
    companies: d.companies ?? project.partners,
    recommendation: d.recommendation ?? (applied ? 'Applied — continue operation and monitor outcomes.' : 'Continue current plan pending evaluation.'),
  };
}

interface ProjectCardTabProps {
  project: Project;
  cardNumber: number;
  onExport: () => void;
}

export function ProjectCardTab({ project, cardNumber, onExport }: ProjectCardTabProps) {
  const card = cardFor(project);
  const image = CARD_IMAGES[project.id];
  const isApplied = project.status === 'Completed' || project.stage === 'Sandbox';

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-dashed border-[#008755]/40">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#00a869] to-[#005844] flex items-center justify-center flex-shrink-0">
            <Hexagon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg leading-tight">Project Card</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Innovation Labs — Research &amp; Development Section</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="rounded-lg border border-border px-3 py-1.5 text-sm">
            <span className="text-muted-foreground">Filled on: </span><span className="font-medium">{card.filledOn}</span>
          </div>
          <div className="rounded-lg border border-[#008755] bg-[#008755]/10 text-[#008755] px-3 py-1.5 text-sm font-medium">
            Card No. {String(cardNumber).padStart(2, '0')}
          </div>
          <button onClick={() => toast.success('Project card sent to printer')} className="h-8 w-8 rounded-lg border border-border hover:bg-muted/40 flex items-center justify-center transition-colors" title="Print">
            <Printer className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
          <button onClick={onExport} className="inline-flex items-center gap-1.5 rounded-lg bg-[#008755] hover:bg-[#005844] text-white text-sm px-3.5 py-1.5 transition-colors">
            <Download className="h-3.5 w-3.5" /> Export Card
          </button>
        </div>
      </div>

      {/* 01–06 */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <CardField n={1} label="Submitted By"><ValueBox>{card.submitter}</ValueBox></CardField>
            <CardField n={2} label="Beneficiary Department"><ValueBox>{project.dept}</ValueBox></CardField>
            <CardField n={3} label="Project Name"><ValueBox>{project.name}</ValueBox></CardField>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 bg-muted/30 border border-border rounded-xl px-4 py-3">
            <FieldTitle n={4} label="Project Classification" />
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 ml-auto">
              <Choice checked={project.type === 'innov'} label="Innovation" />
              <Choice checked={project.type === 'rd'} label="Research & Development" />
              <Choice checked={project.type === 'know'} label="Knowledge" />
              <Choice checked={isApplied} label="Applied" />
              {project.type === 'rd' && project.trl && (
                <Badge className="bg-blue-50 text-blue-700 border-0 text-sm" title={TRL_LABELS[project.trl]}>TRL {project.trl}</Badge>
              )}
              {project.cls !== '—' && <Badge className="bg-violet-50 text-violet-700 border-0 text-sm">{project.cls}</Badge>}
            </div>
          </div>

          <CardField n={5} label="Project Summary">
            <ValueBox className="min-h-[96px] leading-relaxed">{project.desc}</ValueBox>
          </CardField>
        </div>

        <CardField n={6} label="Project Image">
          <div className="relative flex-1 min-h-[220px] rounded-xl border-2 border-dashed border-[#008755]/50 overflow-hidden bg-[#008755]/5">
            {image ? (
              <img src={image} alt={project.name} className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center p-4">
                <ImageIcon className="h-9 w-9 text-[#008755]" />
                <p className="text-sm text-muted-foreground">No image uploaded yet</p>
                <button onClick={() => toast.info('Image upload opened')} className="inline-flex items-center gap-1.5 text-sm text-[#008755] hover:underline">
                  <Upload className="h-3.5 w-3.5" /> Upload image
                </button>
              </div>
            )}
          </div>
        </CardField>
      </div>

      {/* 07–09 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <QuestionBox n={7} label="Applied in another department or entity?" options={['Yes', 'No', 'Not Sure']} value={card.appliedElsewhere} note={card.appliedNote} />
        <QuestionBox n={8} label="Is the project feasible to implement?" options={['Yes', 'No', 'Needs Study']} value={card.feasible} note={card.feasibleNote} />
        <QuestionBox
          n={9} label="Candidate companies for implementation"
          options={['Companies identified', 'None']}
          value={card.companies.length ? 'Companies identified' : 'None'}
          note={card.companies.join(' · ')}
        />
      </div>

      {/* 10 */}
      <div className="rounded-xl border-2 border-[#008755]/40 bg-gradient-to-r from-[#008755]/5 to-white p-4">
        <FieldTitle n={10} label="Recommendation" />
        <ValueBox className="mt-3 bg-white">{card.recommendation}</ValueBox>
      </div>
    </div>
  );
}

function NumberTag({ n }: { n: number }) {
  return (
    <span className="h-7 min-w-7 px-1.5 rounded-md border border-[#008755]/50 bg-[#008755]/10 text-[#008755] text-sm font-medium flex items-center justify-center flex-shrink-0">
      {String(n).padStart(2, '0')}
    </span>
  );
}

function FieldTitle({ n, label }: { n: number; label: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <NumberTag n={n} />
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}

function CardField({ n, label, children }: { n: number; label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 min-w-0">
      <FieldTitle n={n} label={label} />
      {children}
    </div>
  );
}

function ValueBox({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-lg border border-border bg-muted/20 px-3 py-2.5 text-sm min-h-[42px]', className)}>
      {children}
    </div>
  );
}

function Choice({ checked, label }: { checked: boolean; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm">
      <span className={cn('h-4 w-4 rounded border flex items-center justify-center flex-shrink-0',
        checked ? 'bg-[#008755] border-[#008755]' : 'border-muted-foreground/40 bg-white')}>
        {checked && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
      </span>
      <span className={checked ? 'font-medium text-foreground' : 'text-muted-foreground'}>{label}</span>
    </span>
  );
}

function QuestionBox({ n, label, options, value, note }: { n: number; label: string; options: string[]; value: string; note: string }) {
  return (
    <div className="bg-muted/30 border border-border rounded-xl p-4 flex flex-col gap-3">
      <FieldTitle n={n} label={label} />
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {options.map(o => <Choice key={o} checked={o === value} label={o} />)}
      </div>
      <ValueBox className="bg-white flex-1 min-h-[64px]">
        {note || <span className="text-muted-foreground">No additional notes</span>}
      </ValueBox>
    </div>
  );
}
