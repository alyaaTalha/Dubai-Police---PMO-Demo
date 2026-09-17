// Finance & Administration Affairs - Full KPI Data with Details

export interface KPIDetail {
  id: string;
  name: string;
  description: string;
  formula?: string;
  owner: string;
  target: number;
  actual: number;
  unit: string;
  status: "green" | "amber" | "red";
  dataSource: "manual" | "integrated-erp" | "integrated-hrms" | "integrated-crm";
  lastUpdated: string;
  sourceSystem?: string;
  trend: number[];
  comments?: string[];
  history?: {
    date: string;
    value: number;
    status: "green" | "amber" | "red";
  }[];
}

export const faaKPIData: KPIDetail[] = [
  // Outcomes
  {
    id: "faa-o1",
    name: "Global Profile (Media Coverage, Awards, Mentions)",
    description: "International recognition through global media, awards, and positive mentions",
    formula: "(Media Mentions + Awards Won + International Recognition) / Total Opportunities × 100",
    owner: "Corporate Communications",
    target: 85,
    actual: 87.5,
    unit: "%",
    status: "green",
    dataSource: "manual",
    lastUpdated: "2025-11-15T10:00:00",
    sourceSystem: "Media Tracking System",
    trend: [82, 84, 86, 87.5],
    history: [
      { date: "Q1 2025", value: 82, status: "amber" },
      { date: "Q2 2025", value: 84, status: "amber" },
      { date: "Q3 2025", value: 86, status: "green" },
      { date: "Q4 2025", value: 87.5, status: "green" },
    ],
    comments: ["Improved global visibility through trade forums", "Recognition at WCO summit"]
  },
  {
    id: "faa-o2",
    name: "Carbon Footprint",
    description: "Environmental sustainability and carbon reduction achievement rate",
    formula: "((Baseline Carbon - Current Carbon) / Baseline Carbon) × 100",
    owner: "Administration Affairs",
    target: 90,
    actual: 92.3,
    unit: "%",
    status: "green",
    dataSource: "integrated-erp",
    lastUpdated: "2025-11-18T14:30:00",
    sourceSystem: "Environmental Management System",
    trend: [88, 89, 91, 92.3],
    history: [
      { date: "Q1 2025", value: 88, status: "amber" },
      { date: "Q2 2025", value: 89, status: "amber" },
      { date: "Q3 2025", value: 91, status: "green" },
      { date: "Q4 2025", value: 92.3, status: "green" },
    ],
    comments: ["Solar panel installation completed", "Energy-efficient systems deployed"]
  },
  {
    id: "faa-o3",
    name: "Budget Performance",
    description: "Overall budget utilization and fiscal discipline achievement",
    formula: "(Budget Spent / Budget Allocated) × 100",
    owner: "Finance Department",
    target: 95,
    actual: 95.8,
    unit: "%",
    status: "green",
    dataSource: "integrated-erp",
    lastUpdated: "2025-11-19T09:00:00",
    sourceSystem: "Financial Management System",
    trend: [93, 94, 95, 95.8],
    history: [
      { date: "Q1 2025", value: 93, status: "amber" },
      { date: "Q2 2025", value: 94, status: "amber" },
      { date: "Q3 2025", value: 95, status: "green" },
      { date: "Q4 2025", value: 95.8, status: "green" },
    ],
    comments: ["Efficient budget allocation", "Cost optimization measures implemented"]
  },
  // Finance Process KPIs
  {
    id: "faa-p1",
    name: "Budget Performance (Utilization)",
    description: "Percentage of allocated budget effectively utilized across all departments",
    formula: "(Actual Expenditure / Budgeted Amount) × 100",
    owner: "Finance Department",
    target: 95,
    actual: 93.5,
    unit: "%",
    status: "amber",
    dataSource: "integrated-erp",
    lastUpdated: "2025-11-19T08:00:00",
    sourceSystem: "Oracle Financial System",
    trend: [91, 92, 93, 93.5],
    history: [
      { date: "Q1 2025", value: 91, status: "amber" },
      { date: "Q2 2025", value: 92, status: "amber" },
      { date: "Q3 2025", value: 93, status: "amber" },
      { date: "Q4 2025", value: 93.5, status: "amber" },
    ],
    comments: ["Budget utilization below target", "Action plan to improve spending efficiency"]
  },
  {
    id: "faa-p2",
    name: "Financial Audit Findings Closure Rate",
    description: "Percentage of audit findings closed within specified timeframe",
    formula: "(Closed Findings / Total Findings) × 100",
    owner: "Internal Audit",
    target: 90,
    actual: 88,
    unit: "%",
    status: "amber",
    dataSource: "manual",
    lastUpdated: "2025-11-17T12:00:00",
    sourceSystem: "Audit Management System",
    trend: [85, 86, 87, 88],
    history: [
      { date: "Q1 2025", value: 85, status: "red" },
      { date: "Q2 2025", value: 86, status: "amber" },
      { date: "Q3 2025", value: 87, status: "amber" },
      { date: "Q4 2025", value: 88, status: "amber" },
    ],
    comments: ["Improving trend in audit closure", "Enhanced follow-up processes"]
  },
  {
    id: "faa-p3",
    name: "Customer Satisfaction",
    description: "Customer satisfaction rate with financial services provided",
    formula: "(Satisfied Customers / Total Survey Responses) × 100",
    owner: "Finance Customer Services",
    target: 90,
    actual: 91,
    unit: "%",
    status: "green",
    dataSource: "integrated-crm",
    lastUpdated: "2025-11-18T16:00:00",
    sourceSystem: "CRM System",
    trend: [88, 89, 90, 91],
    history: [
      { date: "Q1 2025", value: 88, status: "amber" },
      { date: "Q2 2025", value: 89, status: "amber" },
      { date: "Q3 2025", value: 90, status: "green" },
      { date: "Q4 2025", value: 91, status: "green" },
    ],
    comments: ["Improved service delivery", "Faster response times"]
  },
  // Enablers
  {
    id: "faa-e1",
    name: "HR Happiness Index",
    description: "Employee happiness and engagement score within Finance & Administration Affairs",
    formula: "Composite score from employee satisfaction survey",
    owner: "Human Resources",
    target: 85,
    actual: 87.5,
    unit: "%",
    status: "green",
    dataSource: "integrated-hrms",
    lastUpdated: "2025-11-10T10:00:00",
    sourceSystem: "HRMS - Employee Engagement Module",
    trend: [84, 85, 86, 87.5],
    history: [
      { date: "Q1 2025", value: 84, status: "amber" },
      { date: "Q2 2025", value: 85, status: "green" },
      { date: "Q3 2025", value: 86, status: "green" },
      { date: "Q4 2025", value: 87.5, status: "green" },
    ],
    comments: ["Employee wellness programs launched", "Flexible work arrangements implemented"]
  },
  {
    id: "faa-e2",
    name: "% of Services Digitized",
    description: "Percentage of services fully digitized and accessible online",
    formula: "(Digitized Services / Total Services) × 100",
    owner: "IT Division",
    target: 92,
    actual: 94.2,
    unit: "%",
    status: "green",
    dataSource: "integrated-erp",
    lastUpdated: "2025-11-19T11:00:00",
    sourceSystem: "Digital Services Platform",
    trend: [90, 91, 93, 94.2],
    history: [
      { date: "Q1 2025", value: 90, status: "amber" },
      { date: "Q2 2025", value: 91, status: "amber" },
      { date: "Q3 2025", value: 93, status: "green" },
      { date: "Q4 2025", value: 94.2, status: "green" },
    ],
    comments: ["New digital services launched", "Mobile app enhancements completed"]
  },
  {
    id: "faa-e3",
    name: "External Audit Scores",
    description: "Composite score from external audit assessments",
    formula: "Weighted average of all external audit assessment scores",
    owner: "Corporate Excellence",
    target: 92,
    actual: 91.5,
    unit: "%",
    status: "amber",
    dataSource: "manual",
    lastUpdated: "2025-11-12T14:00:00",
    sourceSystem: "Excellence Management System",
    trend: [89, 90, 91, 91.5],
    history: [
      { date: "Q1 2025", value: 89, status: "amber" },
      { date: "Q2 2025", value: 90, status: "amber" },
      { date: "Q3 2025", value: 91, status: "amber" },
      { date: "Q4 2025", value: 91.5, status: "amber" },
    ],
    comments: ["Continuous improvement initiatives", "Preparing for next audit cycle"]
  },
  {
    id: "faa-e4",
    name: "Budget Performance",
    description: "Financial resource management and budget execution effectiveness",
    formula: "(Budget Utilized / Budget Allocated) × 100",
    owner: "Finance Department",
    target: 95,
    actual: 95.8,
    unit: "%",
    status: "green",
    dataSource: "integrated-erp",
    lastUpdated: "2025-11-19T09:30:00",
    sourceSystem: "Financial System",
    trend: [93, 94, 95, 95.8],
    history: [
      { date: "Q1 2025", value: 93, status: "amber" },
      { date: "Q2 2025", value: 94, status: "amber" },
      { date: "Q3 2025", value: 95, status: "green" },
      { date: "Q4 2025", value: 95.8, status: "green" },
    ],
    comments: ["Optimal budget utilization", "Cost efficiency measures successful"]
  },
  {
    id: "faa-e5",
    name: "OGA Engagement",
    description: "Other Government Agency collaboration and engagement effectiveness",
    formula: "(Successful Collaborations / Total Engagement Opportunities) × 100",
    owner: "Government Relations",
    target: 85,
    actual: 83.5,
    unit: "%",
    status: "amber",
    dataSource: "manual",
    lastUpdated: "2025-11-16T10:00:00",
    sourceSystem: "Partnership Management System",
    trend: [80, 81, 82, 83.5],
    history: [
      { date: "Q1 2025", value: 80, status: "red" },
      { date: "Q2 2025", value: 81, status: "amber" },
      { date: "Q3 2025", value: 82, status: "amber" },
      { date: "Q4 2025", value: 83.5, status: "amber" },
    ],
    comments: ["Improving partnership frameworks", "Joint initiatives under development"]
  },
];
