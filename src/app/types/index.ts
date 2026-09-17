export type SentimentType = 'positive' | 'negative' | 'neutral';

export type DataSourceType = 'crm' | 'insights' | 'social' | 'forum';

export type CategoryType = 
  | 'Product Quality'
  | 'Customer Service'
  | 'Pricing'
  | 'Delivery'
  | 'Technical Support'
  | 'User Experience'
  | 'Documentation'
  | 'Feature Request'
  | 'Billing'
  | 'Security';

export type TaskStatus = 'not-started' | 'in-progress' | 'completed';

export interface Feed {
  id: string;
  source: DataSourceType;
  subSource: string;
  content: string;
  sentiment: SentimentType;
  categories: CategoryType[];
  timestamp: Date;
  department: string;
  region: string;
  ageGroup: string;
}

export interface Finding {
  id: string;
  title: string;
  description: string;
  feedIds: string[];
  categories: CategoryType[];
  sentiment: SentimentType;
  isDuplicate: boolean;
  duplicateOf?: string;
  department: string;
  createdAt: Date;
}

export interface Task {
  id: string;
  findingId: string;
  findingTitle: string;
  title: string;
  department: string;
  assignedTo: string;
  dueDate: Date;
  status: TaskStatus;
  category: CategoryType;
}

export interface FilterState {
  dateRange: { start: Date; end: Date };
  department: string[];
  dataSource: DataSourceType[];
}
