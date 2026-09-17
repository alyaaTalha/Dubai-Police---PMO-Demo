// ── Sandbox Platform — shared types & seed data ──────────────────────────────
// Ported from the R&D / Innovation / Knowledge sandbox reference build, kept
// in the same shape as the PMO's other in-app data modules.

export type ProjectType = 'rd' | 'innov' | 'know';
export type ProjectStatus = 'Ongoing' | 'Completed' | 'Delayed' | 'Pending Approval' | 'Rejected';
export type Stage = 'Idea' | 'Feasibility Study' | 'Approval' | 'Development' | 'Sandbox';

export interface Project {
  id: string;
  name: string;
  type: ProjectType;
  status: ProjectStatus;
  stage: Stage;
  budget: number; // AED millions
  dept: string;
  start: number;
  end: number;
  cls: string; // classification, e.g. IN1, Class 6, '—'
  evaluator: string | null;
  score: number | null;
  partners: string[];
  ip: string[];
  desc: string;
}

export const STAGES: Stage[] = ['Idea', 'Feasibility Study', 'Approval', 'Development', 'Sandbox'];
export const STAGE_SUBLABELS: Record<Stage, string> = {
  'Idea': 'Intake',
  'Feasibility Study': 'Assessing',
  'Approval': 'Governance',
  'Development': 'Building',
  'Sandbox': 'Piloting',
};

export const TYPES: Record<ProjectType, {
  label: string; full: string; color: string;
  badgeClass: string; gradientFrom: string; gradientTo: string;
}> = {
  rd:    { label: 'R&D',        full: 'Research & Development', color: '#1d5fa8', badgeClass: 'bg-blue-50 text-blue-700',        gradientFrom: '#3b8fe0', gradientTo: '#17457e' },
  innov: { label: 'Innovation', full: 'Innovation',              color: '#008755', badgeClass: 'bg-[#008755]/10 text-[#008755]', gradientFrom: '#00a869', gradientTo: '#005844' },
  know:  { label: 'Knowledge',  full: 'Knowledge',               color: '#a8710d', badgeClass: 'bg-amber-50 text-amber-700',     gradientFrom: '#e0a83b', gradientTo: '#8a5c07' },
};

export const STATUS_META: Record<ProjectStatus, { badgeClass: string; dot: string }> = {
  'Ongoing':          { badgeClass: 'bg-[#008755]/10 text-[#008755]', dot: '#008755' },
  'Completed':        { badgeClass: 'bg-slate-100 text-slate-600',    dot: '#005844' },
  'Delayed':          { badgeClass: 'bg-amber-50 text-amber-700',     dot: '#a8710d' },
  'Pending Approval': { badgeClass: 'bg-blue-50 text-blue-700',       dot: '#1d5fa8' },
  'Rejected':         { badgeClass: 'bg-red-50 text-red-700',         dot: '#bd3826' },
};

export const CRITERIA: Record<ProjectType, Array<[string, number]>> = {
  rd:    [['Scientific Merit', 25], ['Technical Feasibility', 25], ['Research Capability', 20], ['Cost Efficiency', 15], ['IP / Publication Potential', 15]],
  innov: [['Novelty', 20], ['Strategic Alignment', 25], ['Expected Impact', 25], ['Implementation Readiness', 15], ['Scalability', 15]],
  know:  [['Content Quality', 30], ['Reusability', 20], ['Institutional Value', 25], ['Accessibility', 15], ['Maintenance Plan', 10]],
};

export function money(v: number): string {
  return `AED ${v.toFixed(1)}M`;
}

export const INITIAL_PROJECTS: Project[] = [
  { id: 'P-101', name: 'Predictive Threat Modeling Engine', type: 'rd', status: 'Ongoing', stage: 'Development', budget: 4.2, dept: 'Digital Transformation', start: 2025, end: 2026, cls: '—', evaluator: 'Dr. Layla Ahmed', score: 88, partners: ['Khalifa University', 'Patsnap'], ip: ['AI-Powered Threat Detection Algorithm'], desc: 'Machine-learning engine forecasting incident hotspots from historical and environmental signals.' },
  { id: 'P-102', name: 'Autonomous Patrol Drone Study', type: 'rd', status: 'Pending Approval', stage: 'Feasibility Study', budget: 1.8, dept: 'Operations', start: 2026, end: 2027, cls: '—', evaluator: null, score: null, partners: ['Interpol Innovation Lab'], ip: [], desc: 'Feasibility assessment of autonomous aerial patrol units across designated districts.' },
  { id: 'P-103', name: 'Forensic DNA Rapid-Analysis Method', type: 'rd', status: 'Ongoing', stage: 'Development', budget: 3.6, dept: 'Forensics', start: 2024, end: 2026, cls: '—', evaluator: 'Dr. Hessa Al Blooshi', score: 91, partners: ['Khalifa University'], ip: ['Rapid DNA Sequencing Protocol'], desc: 'Reducing forensic DNA turnaround from 48 hours to under 6 hours.' },
  { id: 'P-104', name: 'Behavioral Risk Prediction Study', type: 'rd', status: 'Delayed', stage: 'Approval', budget: 2.1, dept: 'Community Affairs', start: 2025, end: 2026, cls: '—', evaluator: 'Omar Al Zaabi', score: 64, partners: [], ip: [], desc: 'Longitudinal study on early behavioral indicators for community intervention programmes.' },
  { id: 'P-105', name: 'Quantum-Resistant Encryption Pilot', type: 'rd', status: 'Completed', stage: 'Sandbox', budget: 2.9, dept: 'Digital Transformation', start: 2024, end: 2025, cls: '—', evaluator: 'Dr. Layla Ahmed', score: 95, partners: ['Smart Dubai Ventures'], ip: ['Post-Quantum Key Exchange Method'], desc: 'Pilot deployment of post-quantum cryptography across internal communication channels.' },
  { id: 'P-106', name: 'Next-Gen Body Camera Optics', type: 'rd', status: 'Ongoing', stage: 'Idea', budget: 1.4, dept: 'Operations', start: 2026, end: 2027, cls: '—', evaluator: null, score: null, partners: [], ip: [], desc: 'Low-light optical research for next generation officer-worn recording devices.' },

  { id: 'P-201', name: 'Smart Evidence Room (RFID)', type: 'innov', status: 'Ongoing', stage: 'Development', budget: 5.1, dept: 'Legal Affairs', start: 2025, end: 2026, cls: 'IN1', evaluator: 'Eng. Sara Al Neyadi', score: 94, partners: ['Dubai Future Foundation'], ip: ['Smart Evidence Chain-of-Custody Protocol'], desc: 'Fully digital evidence room with RFID tracking, eliminating manual custody logs.' },
  { id: 'P-202', name: 'AI Complaint Triage Engine', type: 'innov', status: 'Completed', stage: 'Sandbox', budget: 2.4, dept: 'Community Affairs', start: 2024, end: 2025, cls: 'IN1', evaluator: 'Fatima Al Mansoori', score: 89, partners: ['Smart Dubai Ventures'], ip: ['Automated Complaint Routing Method'], desc: 'NLP triage routing public complaints 40% faster than the manual process.' },
  { id: 'P-203', name: 'Digital Twin — Traffic Network', type: 'innov', status: 'Ongoing', stage: 'Development', budget: 6.8, dept: 'Traffic', start: 2025, end: 2027, cls: 'IN2', evaluator: 'Fatima Al Mansoori', score: 81, partners: ['Dubai Future Foundation', 'Khalifa University'], ip: [], desc: 'Real-time digital twin simulating traffic interventions before field deployment.' },
  { id: 'P-204', name: 'Multilingual Virtual Help Assistant', type: 'innov', status: 'Pending Approval', stage: 'Approval', budget: 1.2, dept: 'Customer Happiness', start: 2026, end: 2027, cls: 'IN2', evaluator: null, score: null, partners: [], ip: [], desc: 'Arabic/English conversational assistant for public service enquiries.' },
  { id: 'P-205', name: 'Predictive Vehicle Maintenance', type: 'innov', status: 'Delayed', stage: 'Development', budget: 1.9, dept: 'Logistics', start: 2025, end: 2026, cls: 'IN3', evaluator: 'Saeed Al Ketbi', score: 72, partners: ['Patsnap'], ip: [], desc: 'IoT sensor network predicting fleet maintenance needs before failure.' },
  { id: 'P-206', name: 'Smart Queue Management', type: 'innov', status: 'Completed', stage: 'Sandbox', budget: 0.9, dept: 'Customer Happiness', start: 2024, end: 2025, cls: 'IN1', evaluator: 'Fatima Al Mansoori', score: 92, partners: [], ip: ['Dynamic Queue Allocation System'], desc: 'Reduced average service centre wait time from 25 to 9 minutes.' },
  { id: 'P-207', name: 'Drone-Assisted Crowd Analytics', type: 'innov', status: 'Ongoing', stage: 'Feasibility Study', budget: 3.3, dept: 'Operations', start: 2026, end: 2027, cls: 'IN2', evaluator: null, score: null, partners: ['Interpol Innovation Lab'], ip: [], desc: 'Aerial analytics for large-event crowd density and flow management.' },

  { id: 'P-301', name: 'Institutional Case-Law Knowledge Base', type: 'know', status: 'Ongoing', stage: 'Development', budget: 2.0, dept: 'Legal Affairs', start: 2025, end: 2026, cls: 'Class 6', evaluator: 'Mariam Al Suwaidi', score: 78, partners: [], ip: [], desc: 'Searchable repository of internal case-law precedent and legal opinions.' },
  { id: 'P-302', name: 'Officer Field Manual Digitization', type: 'know', status: 'Completed', stage: 'Sandbox', budget: 0.9, dept: 'HR & Training', start: 2024, end: 2025, cls: 'Class 5', evaluator: 'Saeed Al Ketbi', score: 85, partners: [], ip: ['Field Operations Handbook'], desc: 'Full digitization of operational field manuals with offline mobile access.' },
  { id: 'P-303', name: 'Cross-Agency Threat Intelligence Library', type: 'know', status: 'Ongoing', stage: 'Approval', budget: 3.4, dept: 'Strategic Planning', start: 2025, end: 2027, cls: 'Class 7', evaluator: 'Omar Al Zaabi', score: 76, partners: ['Interpol Innovation Lab'], ip: [], desc: 'Shared intelligence knowledge base across partner agencies.' },
  { id: 'P-304', name: 'Community Policing Best-Practice Archive', type: 'know', status: 'Pending Approval', stage: 'Idea', budget: 1.1, dept: 'Community Affairs', start: 2026, end: 2027, cls: 'Class 6', evaluator: null, score: null, partners: [], ip: [], desc: 'Curated archive of community engagement programmes and measured outcomes.' },
  { id: 'P-305', name: 'National Forensics Knowledge Standard', type: 'know', status: 'Ongoing', stage: 'Development', budget: 4.6, dept: 'Forensics', start: 2024, end: 2026, cls: 'Class 7+', evaluator: 'Mariam Al Suwaidi', score: 88, partners: ['Khalifa University', 'Dubai Future Foundation'], ip: ['National Forensics Knowledge Standard'], desc: 'Federal-level standard for forensic documentation and methodology.' },
  { id: 'P-306', name: 'Legacy Records Migration Study', type: 'know', status: 'Rejected', stage: 'Idea', budget: 0.6, dept: 'Digital Transformation', start: 2024, end: 2025, cls: 'Class 5', evaluator: 'Omar Al Zaabi', score: 41, partners: [], ip: [], desc: 'Superseded by the enterprise records modernization programme.' },
];

export interface IPItem {
  title: string;
  kind: 'Patent' | 'Trademark' | 'Intellectual Work';
  status: 'Granted' | 'Under Approval';
  filed: string;
  dept: string;
  proj: string;
}

export const IP_REGISTER: IPItem[] = [
  { title: 'AI-Powered Threat Detection Algorithm', kind: 'Patent', status: 'Under Approval', filed: '2025-03-12', dept: 'Digital Transformation', proj: 'Predictive Threat Modeling Engine' },
  { title: 'Smart Evidence Chain-of-Custody Protocol', kind: 'Patent', status: 'Granted', filed: '2024-11-02', dept: 'Legal Affairs', proj: 'Smart Evidence Room (RFID)' },
  { title: 'Post-Quantum Key Exchange Method', kind: 'Patent', status: 'Granted', filed: '2024-04-19', dept: 'Digital Transformation', proj: 'Quantum-Resistant Encryption Pilot' },
  { title: 'Rapid DNA Sequencing Protocol', kind: 'Patent', status: 'Under Approval', filed: '2025-06-08', dept: 'Forensics', proj: 'Forensic DNA Rapid-Analysis Method' },
  { title: 'Automated Complaint Routing Method', kind: 'Patent', status: 'Granted', filed: '2024-08-27', dept: 'Community Affairs', proj: 'AI Complaint Triage Engine' },
  { title: 'Dynamic Queue Allocation System', kind: 'Patent', status: 'Granted', filed: '2024-02-11', dept: 'Customer Happiness', proj: 'Smart Queue Management' },
  { title: 'Predictive Patrol Routing Method', kind: 'Patent', status: 'Under Approval', filed: '2025-07-30', dept: 'Operations', proj: '—' },
  { title: 'Sandbox Platform Wordmark', kind: 'Trademark', status: 'Granted', filed: '2025-01-22', dept: 'Strategic Planning', proj: '—' },
  { title: 'Innovation Programme Emblem', kind: 'Trademark', status: 'Granted', filed: '2024-06-18', dept: 'Community Affairs', proj: '—' },
  { title: 'Smart Policing Identity Suite', kind: 'Trademark', status: 'Under Approval', filed: '2025-09-03', dept: 'Digital Transformation', proj: '—' },
  { title: 'Field Operations Handbook', kind: 'Intellectual Work', status: 'Granted', filed: '2024-10-15', dept: 'HR & Training', proj: 'Officer Field Manual Digitization' },
  { title: 'National Forensics Knowledge Standard', kind: 'Intellectual Work', status: 'Granted', filed: '2024-02-14', dept: 'Forensics', proj: 'National Forensics Knowledge Standard' },
  { title: 'Community Engagement Playbook', kind: 'Intellectual Work', status: 'Under Approval', filed: '2025-05-20', dept: 'Community Affairs', proj: '—' },
];

export interface Partner {
  name: string;
  type: string;
  country: string;
  activeProjects: number;
  since: number;
  gradientFrom: string;
  gradientTo: string;
  initials: string;
}

export const PARTNERS: Partner[] = [
  { name: 'Dubai Future Foundation', type: 'Government', country: 'UAE', activeProjects: 4, since: 2022, gradientFrom: '#00a869', gradientTo: '#005844', initials: 'DF' },
  { name: 'Khalifa University', type: 'Academic', country: 'UAE', activeProjects: 4, since: 2021, gradientFrom: '#3b8fe0', gradientTo: '#17457e', initials: 'KU' },
  { name: 'Interpol Innovation Lab', type: 'International', country: 'Global', activeProjects: 3, since: 2023, gradientFrom: '#8b6fd4', gradientTo: '#4a2f8f', initials: 'IL' },
  { name: 'Patsnap', type: 'Technology Vendor', country: 'Global', activeProjects: 2, since: 2024, gradientFrom: '#e0a83b', gradientTo: '#8a5c07', initials: 'PS' },
  { name: 'Smart Dubai Ventures', type: 'Government', country: 'UAE', activeProjects: 2, since: 2023, gradientFrom: '#00a869', gradientTo: '#00402f', initials: 'SV' },
  { name: 'GITEX Innovation Council', type: 'Industry Body', country: 'UAE', activeProjects: 2, since: 2023, gradientFrom: '#2c3e38', gradientTo: '#13201c', initials: 'GI' },
  { name: 'Mohammed Bin Rashid Space Centre', type: 'Government', country: 'UAE', activeProjects: 2, since: 2024, gradientFrom: '#3b8fe0', gradientTo: '#005844', initials: 'MB' },
  { name: 'UAE University', type: 'Academic', country: 'UAE', activeProjects: 1, since: 2022, gradientFrom: '#e0a83b', gradientTo: '#a8710d', initials: 'UU' },
  { name: 'Europol Tech Exchange', type: 'International', country: 'Global', activeProjects: 1, since: 2025, gradientFrom: '#8b6fd4', gradientTo: '#1d5fa8', initials: 'ET' },
];

export interface ReportDef {
  key: string;
  title: string;
  desc: string;
  last: string;
}

export const REPORTS: ReportDef[] = [
  { key: 'rd',       title: 'R&D Portfolio Report',               desc: 'Full breakdown of research projects, budget allocation and study output.',   last: 'Aug 20, 2026' },
  { key: 'innov',    title: 'Innovation Classification Report',   desc: 'GIMI-aligned IN1/IN2/IN3 classification across all innovation projects.',      last: 'Aug 18, 2026' },
  { key: 'ip',       title: 'Patents & Trademarks Report',        desc: 'Status of every filed IP asset, granted and under approval.',                  last: 'Aug 15, 2026' },
  { key: 'partners', title: 'Partner Collaboration Report',       desc: 'Active partnerships, co-funding and joint project contributions.',             last: 'Aug 10, 2026' },
  { key: 'ready',    title: 'Institutional Readiness Report',     desc: 'Innovation readiness rate and technology investment trends.',                  last: 'Aug 5, 2026' },
  { key: 'index',    title: 'Annual Innovation Index Submission', desc: 'Consolidated indicators formatted for national index submission.',             last: 'Jul 30, 2026' },
];

export interface HistoryEntry {
  report: string;
  by: string;
  date: string;
  period: string;
  format: 'PDF' | 'XLSX';
}

export const INITIAL_HISTORY: HistoryEntry[] = [
  { report: 'Annual Innovation Index Submission', by: 'Aisha Al Suwaidi', date: 'Jul 30, 2026', period: 'FY 2025–26', format: 'PDF' },
  { report: 'Patents & Trademarks Report',        by: 'Khalid Al Rashid', date: 'Aug 15, 2026', period: 'Q3 2026',    format: 'XLSX' },
  { report: 'R&D Portfolio Report',               by: 'Mohammed Hassan', date: 'Aug 20, 2026', period: 'Aug 2026',   format: 'PDF' },
  { report: 'Partner Collaboration Report',       by: 'Aisha Al Suwaidi', date: 'Aug 10, 2026', period: 'H1 2026',    format: 'PDF' },
  { report: 'Institutional Readiness Report',     by: 'Mariam Al Suwaidi', date: 'Aug 5, 2026',  period: 'Q2 2026',    format: 'XLSX' },
];

export type AuditKind = 'ok' | 'info' | 'warn' | 'violet' | 'danger';

export interface AuditEntry {
  title: string;
  detail: string;
  tm: string;
  kind: AuditKind;
}

export const AUDIT_KIND_CLASSES: Record<AuditKind, { bg: string; fg: string }> = {
  ok:     { bg: 'bg-[#008755]/10', fg: 'text-[#008755]' },
  info:   { bg: 'bg-blue-50',      fg: 'text-blue-700' },
  warn:   { bg: 'bg-amber-50',     fg: 'text-amber-700' },
  violet: { bg: 'bg-violet-50',    fg: 'text-violet-700' },
  danger: { bg: 'bg-red-50',       fg: 'text-red-700' },
};

export const INITIAL_AUDIT: AuditEntry[] = [
  { title: 'Patent granted', detail: 'Smart Evidence Chain-of-Custody Protocol approved by the IP office', tm: '2 hours ago', kind: 'ok' },
  { title: 'Evaluation submitted', detail: 'Eng. Sara Al Neyadi scored Smart Evidence Room (RFID) at 94/100', tm: 'Yesterday, 16:42', kind: 'info' },
  { title: 'Stage advanced', detail: 'Quantum-Resistant Encryption Pilot moved from Development to Sandbox', tm: '2 days ago', kind: 'ok' },
  { title: 'Partner agreement signed', detail: 'Khalifa University added to 2 additional R&D projects', tm: '3 days ago', kind: 'violet' },
  { title: 'Project rejected', detail: 'Legacy Records Migration Study closed — superseded by records modernization', tm: '5 days ago', kind: 'danger' },
  { title: 'Report generated', detail: 'Annual Innovation Index Submission produced by Aisha Al Suwaidi', tm: 'Jul 30, 2026', kind: 'warn' },
];

export const DEPARTMENTS = Array.from(new Set(INITIAL_PROJECTS.map(p => p.dept))).sort();

export function scoreVerdict(total: number): string {
  if (total >= 85) return 'Strong';
  if (total >= 70) return 'Approve';
  if (total >= 55) return 'Revise';
  return 'Reject';
}
