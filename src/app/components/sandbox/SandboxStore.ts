import type { Dispatch, SetStateAction } from 'react';
import type { AuditEntry, HistoryEntry, Project, ReportDef } from './sandboxData';

// Shared state bundle handed down to every Sandbox Platform page — mirrors
// how the Ideas Platform pages receive `user` / `role` / `onNavigate`.
export interface SandboxStore {
  projects: Project[];
  setProjects: Dispatch<SetStateAction<Project[]>>;
  reports: ReportDef[];
  setReports: Dispatch<SetStateAction<ReportDef[]>>;
  history: HistoryEntry[];
  addHistory: (entry: HistoryEntry) => void;
  audit: AuditEntry[];
  addAudit: (entry: Omit<AuditEntry, 'tm'>) => void;
  search: string;
  setSearch: (s: string) => void;
  openProject: (id: string) => void;
}

export type SandboxPage =
  | 'home' | 'rd' | 'innovation' | 'knowledge'
  | 'ip' | 'partners' | 'evaluation' | 'reports' | 'assistant' | 'project';

export const SANDBOX_PAGE_LABELS: Record<SandboxPage, string> = {
  home: 'Home',
  rd: 'Research & Development',
  innovation: 'Innovation',
  knowledge: 'Knowledge',
  ip: 'Intellectual Property',
  partners: 'Partners',
  evaluation: 'Project Evaluation',
  reports: 'Reports',
  assistant: 'Virtual Assistant',
  project: 'Project Record',
};
