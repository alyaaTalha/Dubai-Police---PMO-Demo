import { Feed, Finding, Task, SentimentType, CategoryType } from '../types';

const departments = ['Public Services', 'Healthcare', 'Transportation', 'Education', 'Housing'];
const regions = ['North', 'South', 'East', 'West', 'Central'];
const ageGroups = ['18-25', '26-35', '36-45', '46-55', '56-65', '65+'];

export const mockFeeds: Feed[] = [
  // CRM feeds
  ...Array.from({ length: 150 }, (_, i) => ({
    id: `crm-${i}`,
    source: 'crm' as const,
    subSource: ['Email Support', 'Phone Support', 'Web Form', 'Live Chat'][i % 4],
    content: `Customer feedback about service quality and experience ${i}`,
    sentiment: (['positive', 'negative', 'neutral'][i % 3]) as SentimentType,
    categories: [(['Product Quality', 'Customer Service', 'Technical Support', 'User Experience'][i % 4])] as CategoryType[],
    timestamp: new Date(2025, 9, Math.floor(Math.random() * 30) + 1),
    department: departments[i % 5],
    region: regions[i % 5],
    ageGroup: ageGroups[i % 6],
  })),
  // Insights feeds
  ...Array.from({ length: 120 }, (_, i) => ({
    id: `insights-${i}`,
    source: 'insights' as const,
    subSource: ['Survey', 'Focus Group', 'Interview', 'Feedback Form'][i % 4],
    content: `User insights and survey response ${i}`,
    sentiment: (['positive', 'negative', 'neutral'][i % 3]) as SentimentType,
    categories: [(['Pricing', 'Delivery', 'Feature Request', 'Documentation'][i % 4])] as CategoryType[],
    timestamp: new Date(2025, 9, Math.floor(Math.random() * 30) + 1),
    department: departments[i % 5],
    region: regions[i % 5],
    ageGroup: ageGroups[i % 6],
  })),
  // Social Media feeds
  ...Array.from({ length: 200 }, (_, i) => ({
    id: `social-${i}`,
    source: 'social' as const,
    subSource: ['Twitter', 'Facebook', 'LinkedIn', 'Instagram'][i % 4],
    content: `Social media mention and comment ${i}`,
    sentiment: (['positive', 'negative', 'neutral'][i % 3]) as SentimentType,
    categories: [(['User Experience', 'Product Quality', 'Customer Service', 'Feature Request'][i % 4])] as CategoryType[],
    timestamp: new Date(2025, 9, Math.floor(Math.random() * 30) + 1),
    department: departments[i % 5],
    region: regions[i % 5],
    ageGroup: ageGroups[i % 6],
  })),
  // Customer Forum feeds
  ...Array.from({ length: 100 }, (_, i) => ({
    id: `forum-${i}`,
    source: 'forum' as const,
    subSource: ['Discussion Board', 'Q&A', 'Bug Report', 'Feature Request'][i % 4],
    content: `Forum post and discussion ${i}`,
    sentiment: (['positive', 'negative', 'neutral'][i % 3]) as SentimentType,
    categories: [(['Technical Support', 'Billing', 'Security', 'Documentation'][i % 4])] as CategoryType[],
    timestamp: new Date(2025, 9, Math.floor(Math.random() * 30) + 1),
    department: departments[i % 5],
    region: regions[i % 5],
    ageGroup: ageGroups[i % 6],
  })),
];

export const mockFindings: Finding[] = [
  {
    id: 'finding-1',
    title: 'High volume of complaints about service response time',
    description: 'Multiple customers reporting delayed response times across all channels',
    feedIds: mockFeeds.slice(0, 15).map(f => f.id),
    categories: ['Customer Service', 'Technical Support'],
    sentiment: 'negative',
    isDuplicate: false,
    department: 'Public Services',
    createdAt: new Date(2025, 9, 15),
  },
  {
    id: 'finding-2',
    title: 'Positive feedback on new mobile application features',
    description: 'Users appreciating the improved UI and functionality',
    feedIds: mockFeeds.slice(15, 30).map(f => f.id),
    categories: ['User Experience', 'Feature Request'],
    sentiment: 'positive',
    isDuplicate: false,
    department: 'Transportation',
    createdAt: new Date(2025, 9, 18),
  },
  {
    id: 'finding-3',
    title: 'Service response time concerns',
    description: 'Customers experiencing delays in getting support',
    feedIds: mockFeeds.slice(30, 40).map(f => f.id),
    categories: ['Customer Service', 'Technical Support'],
    sentiment: 'negative',
    isDuplicate: true,
    duplicateOf: 'finding-1',
    department: 'Public Services',
    createdAt: new Date(2025, 9, 20),
  },
  {
    id: 'finding-4',
    title: 'Documentation needs improvement',
    description: 'Users finding it difficult to navigate help documentation',
    feedIds: mockFeeds.slice(40, 55).map(f => f.id),
    categories: ['Documentation', 'User Experience'],
    sentiment: 'neutral',
    isDuplicate: false,
    department: 'Education',
    createdAt: new Date(2025, 9, 22),
  },
  {
    id: 'finding-5',
    title: 'Billing process confusion',
    description: 'Multiple reports of unclear billing statements',
    feedIds: mockFeeds.slice(55, 70).map(f => f.id),
    categories: ['Billing', 'Customer Service'],
    sentiment: 'negative',
    isDuplicate: false,
    department: 'Healthcare',
    createdAt: new Date(2025, 9, 24),
  },
  {
    id: 'finding-6',
    title: 'Security features highly appreciated',
    description: 'Users expressing satisfaction with security measures',
    feedIds: mockFeeds.slice(70, 85).map(f => f.id),
    categories: ['Security', 'Product Quality'],
    sentiment: 'positive',
    isDuplicate: false,
    department: 'Housing',
    createdAt: new Date(2025, 9, 25),
  },
  {
    id: 'finding-7',
    title: 'Delivery timeframe concerns',
    description: 'Customers reporting delays in service delivery',
    feedIds: mockFeeds.slice(85, 95).map(f => f.id),
    categories: ['Delivery', 'Customer Service'],
    sentiment: 'negative',
    isDuplicate: false,
    department: 'Public Services',
    createdAt: new Date(2025, 9, 26),
  },
  {
    id: 'finding-8',
    title: 'Pricing structure clarity needed',
    description: 'Users requesting more transparent pricing information',
    feedIds: mockFeeds.slice(95, 105).map(f => f.id),
    categories: ['Pricing', 'Documentation'],
    sentiment: 'neutral',
    isDuplicate: false,
    department: 'Transportation',
    createdAt: new Date(2025, 9, 28),
  },
];

export const mockTasks: Task[] = [
  {
    id: 'task-1',
    findingId: 'finding-1',
    findingTitle: 'High volume of complaints about service response time',
    title: 'Review current support ticket queue system',
    department: 'Public Services',
    assignedTo: 'John Smith',
    dueDate: new Date(2025, 9, 20),
    status: 'in-progress',
    category: 'Customer Service',
  },
  {
    id: 'task-2',
    findingId: 'finding-1',
    findingTitle: 'High volume of complaints about service response time',
    title: 'Increase support staff during peak hours',
    department: 'Public Services',
    assignedTo: 'Sarah Johnson',
    dueDate: new Date(2025, 9, 25),
    status: 'not-started',
    category: 'Customer Service',
  },
  {
    id: 'task-3',
    findingId: 'finding-2',
    findingTitle: 'Positive feedback on new mobile application features',
    title: 'Document successful features for future development',
    department: 'Transportation',
    assignedTo: 'Mike Chen',
    dueDate: new Date(2025, 9, 22),
    status: 'completed',
    category: 'User Experience',
  },
  {
    id: 'task-4',
    findingId: 'finding-4',
    findingTitle: 'Documentation needs improvement',
    title: 'Conduct user research on documentation pain points',
    department: 'Education',
    assignedTo: 'Emily Davis',
    dueDate: new Date(2025, 10, 5),
    status: 'in-progress',
    category: 'Documentation',
  },
  {
    id: 'task-5',
    findingId: 'finding-4',
    findingTitle: 'Documentation needs improvement',
    title: 'Redesign help center navigation structure',
    department: 'Education',
    assignedTo: 'Robert Wilson',
    dueDate: new Date(2025, 10, 15),
    status: 'not-started',
    category: 'Documentation',
  },
  {
    id: 'task-6',
    findingId: 'finding-5',
    findingTitle: 'Billing process confusion',
    title: 'Simplify billing statement format',
    department: 'Healthcare',
    assignedTo: 'Lisa Anderson',
    dueDate: new Date(2025, 10, 1),
    status: 'in-progress',
    category: 'Billing',
  },
  {
    id: 'task-7',
    findingId: 'finding-5',
    findingTitle: 'Billing process confusion',
    title: 'Create billing FAQ document',
    department: 'Healthcare',
    assignedTo: 'David Brown',
    dueDate: new Date(2025, 9, 30),
    status: 'completed',
    category: 'Billing',
  },
  {
    id: 'task-8',
    findingId: 'finding-7',
    findingTitle: 'Delivery timeframe concerns',
    title: 'Analyze delivery process bottlenecks',
    department: 'Public Services',
    assignedTo: 'Jennifer Martinez',
    dueDate: new Date(2025, 10, 10),
    status: 'not-started',
    category: 'Delivery',
  },
  {
    id: 'task-9',
    findingId: 'finding-8',
    findingTitle: 'Pricing structure clarity needed',
    title: 'Create pricing comparison tool',
    department: 'Transportation',
    assignedTo: 'Alex Thompson',
    dueDate: new Date(2025, 10, 12),
    status: 'not-started',
    category: 'Pricing',
  },
  {
    id: 'task-10',
    findingId: 'finding-6',
    findingTitle: 'Security features highly appreciated',
    title: 'Document security best practices for promotion',
    department: 'Housing',
    assignedTo: 'Maria Garcia',
    dueDate: new Date(2025, 10, 8),
    status: 'in-progress',
    category: 'Security',
  },
];

export const getDemographicData = () => {
  const regionCounts = mockFeeds.reduce((acc, feed) => {
    acc[feed.region] = (acc[feed.region] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const ageGroupCounts = mockFeeds.reduce((acc, feed) => {
    acc[feed.ageGroup] = (acc[feed.ageGroup] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const departmentCounts = mockFeeds.reduce((acc, feed) => {
    acc[feed.department] = (acc[feed.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    regions: Object.entries(regionCounts).map(([name, value]) => ({ name, value })),
    ageGroups: Object.entries(ageGroupCounts).map(([name, value]) => ({ name, value })),
    departments: Object.entries(departmentCounts).map(([name, value]) => ({ name, value })),
  };
};

export const getSentimentCounts = (feeds: Feed[]) => {
  return feeds.reduce(
    (acc, feed) => {
      acc[feed.sentiment]++;
      return acc;
    },
    { positive: 0, negative: 0, neutral: 0 }
  );
};

export const getCategoryCounts = (feeds: Feed[]) => {
  const counts: Record<string, number> = {};
  feeds.forEach(feed => {
    feed.categories.forEach(cat => {
      counts[cat] = (counts[cat] || 0) + 1;
    });
  });
  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

export const getTimeSeriesData = () => {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  return days.map(day => {
    const dayFeeds = mockFeeds.filter(f => f.timestamp.getDate() === day);
    const sentiment = getSentimentCounts(dayFeeds);
    return {
      date: `Oct ${day}`,
      total: dayFeeds.length,
      positive: sentiment.positive,
      negative: sentiment.negative,
      neutral: sentiment.neutral,
    };
  });
};

export const getMonthlyVolumeData = () => {
  const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map((month, index) => {
    const basePositive = 150 + Math.random() * 50;
    const baseNegative = 40 + Math.random() * 20;
    const baseNeutral = 100 + Math.random() * 40;
    
    // Add anomaly for August (app downtime)
    const isAnomaly = month === 'Aug';
    const positive = isAnomaly ? basePositive * 0.6 : basePositive;
    const negative = isAnomaly ? baseNegative * 2.5 : baseNegative;
    const neutral = isAnomaly ? baseNeutral * 1.2 : baseNeutral;
    
    return {
      month,
      positive: Math.round(positive),
      negative: Math.round(negative),
      neutral: Math.round(neutral),
      total: Math.round(positive + negative + neutral),
      isAnomaly,
      anomalyReason: isAnomaly ? 'Spike due to app downtime (Aug 12-14)' : undefined,
    };
  });
};

export const getVolumeBySourceData = () => {
  const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    month,
    CRM: Math.round(120 + Math.random() * 40),
    'Customer Forum': Math.round(100 + Math.random() * 30),
    Insights: Math.round(80 + Math.random() * 25),
    'Social Media': Math.round(150 + Math.random() * 50),
  }));
};

export const getTopIssuesData = () => {
  const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    month,
    'Response Time': Math.round(40 + Math.random() * 20),
    'Documentation': Math.round(30 + Math.random() * 15),
    'Billing': Math.round(25 + Math.random() * 10),
    'User Experience': Math.round(35 + Math.random() * 15),
  }));
};

export const getKeywordsData = () => {
  return [
    { text: 'Ease of Use', value: 72, sentiment: 'positive', context: 'Appears in 18% of positive comments' },
    { text: 'Response Time', value: 68, sentiment: 'negative', context: 'Mentioned in 15% of negative feedback' },
    { text: 'Inquiry', value: 55, sentiment: 'neutral', context: 'Found in 12% of all feedback' },
    { text: 'Clarity', value: 48, sentiment: 'positive', context: 'Appears in 10% of positive comments' },
    { text: 'Invalid', value: 45, sentiment: 'negative', context: 'Mentioned in 9% of negative feedback' },
    { text: 'Phone', value: 52, sentiment: 'neutral', context: 'Found in 11% of all feedback' },
    { text: 'Wait', value: 38, sentiment: 'negative', context: 'Mentioned in 8% of negative feedback' },
    { text: 'Renewal', value: 42, sentiment: 'neutral', context: 'Found in 9% of all feedback' },
    { text: 'Redirect', value: 35, sentiment: 'neutral', context: 'Found in 7% of all feedback' },
    { text: 'Interface', value: 40, sentiment: 'positive', context: 'Appears in 8% of positive comments' },
    { text: 'Helpful', value: 58, sentiment: 'positive', context: 'Appears in 14% of positive comments' },
    { text: 'Confusing', value: 32, sentiment: 'negative', context: 'Mentioned in 7% of negative feedback' },
    { text: 'Payment', value: 44, sentiment: 'neutral', context: 'Found in 10% of all feedback' },
    { text: 'Support', value: 62, sentiment: 'positive', context: 'Appears in 15% of positive comments' },
    { text: 'Delay', value: 36, sentiment: 'negative', context: 'Mentioned in 8% of negative feedback' },
  ];
};
