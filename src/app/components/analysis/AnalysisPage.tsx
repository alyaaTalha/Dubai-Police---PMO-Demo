import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { LeftSidebar } from '../shared/LeftSidebar';
import { AgenticAIPanel } from '../shared/AgenticAIPanel';
import { mockFindings, mockFeeds, getSentimentCounts, getCategoryCounts } from '../../lib/mockData';
import { Check, AlertTriangle, Download, Copy, Sparkles, TrendingUp, Clock, FileText, CheckSquare, Info, RotateCcw, FileSpreadsheet, BarChart3, PieChart as PieChartIcon, Calendar } from 'lucide-react';
import { Separator } from '../ui/separator';
import { BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';

const analysisSteps = [
  { 
    id: 1, 
    name: 'Feed Collection', 
    status: 'completed', 
    progress: 100,
    tooltip: 'Successfully collected 152,348 customer feedback items from all connected data sources.'
  },
  { 
    id: 2, 
    name: 'Sentiment Analysis', 
    status: 'completed', 
    progress: 100,
    tooltip: 'Sentiment analysis completed on 152,000 feeds with 94% confidence using advanced NLP models.'
  },
  { 
    id: 3, 
    name: 'Categorization (Max 10)', 
    status: 'completed', 
    progress: 100,
    tooltip: 'Categorized all feeds into 8 distinct categories with 91% accuracy. Categories: Service Quality, Wait Times, Staff Behavior, Facility Conditions, Digital Services, Communication, Accessibility, Pricing.'
  },
  { 
    id: 4, 
    name: 'Findings Generation (LLM)', 
    status: 'in-progress', 
    progress: 75,
    tooltip: 'LLM-powered analysis generating actionable findings from categorized data. Currently processing 75% of patterns and insights.'
  },
  { 
    id: 5, 
    name: 'Duplication Check', 
    status: 'pending', 
    progress: 0,
    tooltip: 'Awaiting completion of findings generation to perform AI-powered deduplication analysis.'
  },
  { 
    id: 6, 
    name: 'Action Plan Creation', 
    status: 'pending', 
    progress: 0,
    tooltip: 'Will automatically generate strategic action plans and tasks based on validated findings.'
  },
];

const getSentimentColor = (sentiment: string) => {
  switch (sentiment) {
    case 'positive':
      return 'bg-green-600';
    case 'negative':
      return 'bg-red-600';
    case 'neutral':
      return 'bg-yellow-600';
    default:
      return 'bg-gray-600';
  }
};

interface AnalysisPageProps {
  onNavigate?: (page: string) => void;
}

export function AnalysisPage({ onNavigate }: AnalysisPageProps = {}) {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedDataSource, setSelectedDataSource] = useState<string>('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('30days');
  const [selectedFinding, setSelectedFinding] = useState<string | null>(null);
  const [insightsView, setInsightsView] = useState<'sentiment' | 'category' | 'timeseries'>('sentiment');

  const departments = ['All Departments', 'Public Services', 'Healthcare', 'Transportation', 'Education', 'Housing'];
  const dataSources = ['All Sources', 'CRM', 'Insights', 'Social Media', 'Customer Forum'];
  const timeframes = [
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 90 Days' },
    { value: 'custom', label: 'Custom Range' },
  ];

  const filteredFindings = mockFindings.filter(finding => {
    if (selectedDepartment !== 'all' && finding.department !== selectedDepartment) return false;
    return true;
  });

  const overallProgress = Math.round(
    analysisSteps.reduce((sum, step) => sum + step.progress, 0) / analysisSteps.length
  );

  const inProgressFindings = mockFindings.filter(f => f.status === 'in-progress').length;
  const completedFindings = mockFindings.filter(f => f.status === 'completed').length;

  // Prepare data for AI Analysis Insights
  const sentimentCounts = getSentimentCounts(mockFeeds);
  const totalFeeds = mockFeeds.length;
  const sentimentData = [
    { name: 'Positive', value: sentimentCounts.positive, percentage: Math.round((sentimentCounts.positive / totalFeeds) * 100) },
    { name: 'Neutral', value: sentimentCounts.neutral, percentage: Math.round((sentimentCounts.neutral / totalFeeds) * 100) },
    { name: 'Negative', value: sentimentCounts.negative, percentage: Math.round((sentimentCounts.negative / totalFeeds) * 100) },
  ];

  // Category distribution data (simulating Complaint, Inquiry, Suggestion, Appreciation)
  const categoryData = [
    { name: 'Complaint', value: 245, percentage: 43, aiInsight: 'Primarily from Social Media and CRM channels. Response time is the top issue.' },
    { name: 'Inquiry', value: 178, percentage: 31, aiInsight: 'Most common in Customer Forum. Documentation and billing questions dominate.' },
    { name: 'Suggestion', value: 89, percentage: 16, aiInsight: 'Evenly distributed across channels. Feature requests show consistent patterns.' },
    { name: 'Appreciation', value: 58, percentage: 10, aiInsight: 'Higher in CRM emails. Security features and new UI updates are well-received.' },
  ];

  // Sentiment by Source data
  const sentimentBySourceData = [
    { source: 'CRM', positive: 85, neutral: 45, negative: 20, aiInsight: 'Strong positive sentiment in email support interactions.' },
    { source: 'Social Media', positive: 90, neutral: 50, negative: 60, aiInsight: 'Spike in negative sentiment on July 12 – related to app renewal complaints.' },
    { source: 'Customer Forum', positive: 50, neutral: 35, negative: 15, aiInsight: 'Balanced sentiment. Most queries are product-related.' },
    { source: 'Insights', positive: 75, neutral: 30, negative: 15, aiInsight: 'Survey responses show high satisfaction with recent updates.' },
  ];

  // Time series data for the last 7 days
  const timeSeriesData = [
    { date: 'Oct 3', positive: 42, neutral: 28, negative: 15, total: 85 },
    { date: 'Oct 4', positive: 38, neutral: 32, negative: 18, total: 88 },
    { date: 'Oct 5', positive: 45, neutral: 25, negative: 12, total: 82 },
    { date: 'Oct 6', positive: 50, neutral: 30, negative: 20, total: 100 },
    { date: 'Oct 7', positive: 48, neutral: 28, negative: 16, total: 92 },
    { date: 'Oct 8', positive: 52, neutral: 35, negative: 22, total: 109 },
    { date: 'Oct 9', positive: 55, neutral: 30, negative: 18, total: 103 },
  ];

  // Heatmap data: Volume by Source and Department
  const heatmapDataSources = ['CRM', 'Social Media', 'Forum', 'Insights'];
  const heatmapDepartments = ['Public Services', 'Healthcare', 'Transportation', 'Education', 'Housing'];
  const heatmapData = heatmapDepartments.map(dept => {
    const row: any = { department: dept };
    heatmapDataSources.forEach(source => {
      row[source] = Math.round(20 + Math.random() * 60);
    });
    return row;
  });

  const SENTIMENT_COLORS = {
    positive: '#10b981',
    neutral: '#fbbf24', 
    negative: '#ef4444',
  };

  const CATEGORY_COLORS = ['#0ea5e9', '#8b5cf6', '#ec4899', '#f59e0b'];

  return (
    <div className="flex h-full">
      {/* Left Sidebar Navigation */}
      <LeftSidebar currentPage="analysis" onNavigate={onNavigate || (() => {})} />
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-start justify-between">
            <div>
              <h1>Analysis Overview</h1>
              <p className="text-muted-foreground mt-1">
                Track analysis progress and review generated findings
              </p>
            </div>
            <AgenticAIPanel />
          </div>

          {/* Analysis Workflow Tracker */}
          <Card className="border-primary/30 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Analysis Workflow
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Automated AI-powered analysis pipeline
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Re-run Analysis
                  </Button>
                  <Button size="sm" className="gap-2">
                    <FileSpreadsheet className="h-4 w-4" />
                    Generate Summary Report
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <TooltipProvider>
                <div className="space-y-4">
                  {analysisSteps.map((step, index) => (
                    <div key={step.id} className="relative">
                      {/* Connector line */}
                      {index < analysisSteps.length - 1 && (
                        <div className="absolute left-4 top-12 w-0.5 h-8 bg-border" />
                      )}
                      
                      <div className="flex items-start gap-4">
                        {/* Step Number Circle */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm ${
                          step.status === 'completed' ? 'bg-green-600' :
                          step.status === 'in-progress' ? 'bg-blue-600' :
                          step.status === 'delayed' ? 'bg-red-600' :
                          'bg-gray-400'
                        }`}>
                          {step.status === 'completed' ? <Check className="h-4 w-4" /> : step.id}
                        </div>

                        {/* Step Content */}
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-foreground">{step.name}</h4>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-4 w-4 text-muted-foreground cursor-help hover:text-primary transition-colors" />
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs">
                                  <p className="text-sm">{step.tooltip}</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            
                            <Badge 
                              variant={
                                step.status === 'completed' ? 'default' :
                                step.status === 'in-progress' ? 'secondary' :
                                step.status === 'delayed' ? 'destructive' :
                                'outline'
                              }
                              className={
                                step.status === 'completed' ? 'bg-green-600 hover:bg-green-700' :
                                step.status === 'in-progress' ? 'bg-blue-600 hover:bg-blue-700' :
                                step.status === 'delayed' ? 'bg-red-600 hover:bg-red-700' :
                                ''
                              }
                            >
                              {step.status === 'completed' ? 'Completed' :
                               step.status === 'in-progress' ? 'In Progress' :
                               step.status === 'delayed' ? 'Delayed' :
                               'Pending'}
                            </Badge>
                          </div>

                          {/* Progress Bar */}
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>Progress</span>
                              <span className="font-medium">{step.progress}%</span>
                            </div>
                            <Progress 
                              value={step.progress} 
                              className={`h-2 ${
                                step.status === 'completed' ? '[&>div]:bg-green-600' :
                                step.status === 'in-progress' ? '[&>div]:bg-blue-600' :
                                step.status === 'delayed' ? '[&>div]:bg-red-600' :
                                ''
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TooltipProvider>
            </CardContent>
          </Card>

          {/* Quick Filters */}
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-foreground whitespace-nowrap">Department:</label>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="w-[180px] bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.slice(1).map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator orientation="vertical" className="h-8" />

                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-foreground whitespace-nowrap">Data Source:</label>
                  <Select value={selectedDataSource} onValueChange={setSelectedDataSource}>
                    <SelectTrigger className="w-[180px] bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sources</SelectItem>
                      {dataSources.slice(1).map(source => (
                        <SelectItem key={source} value={source}>{source}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator orientation="vertical" className="h-8" />

                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-foreground whitespace-nowrap">Timeframe:</label>
                  <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                    <SelectTrigger className="w-[180px] bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeframes.map(tf => (
                        <SelectItem key={tf.value} value={tf.value}>{tf.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Analysis Insights */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <CardTitle>AI Analysis Insights</CardTitle>
                </div>
                <Tabs value={insightsView} onValueChange={(v) => setInsightsView(v as any)}>
                  <TabsList>
                    <TabsTrigger value="sentiment" className="gap-2">
                      <PieChartIcon className="h-4 w-4" />
                      Sentiment by Source
                    </TabsTrigger>
                    <TabsTrigger value="category" className="gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Category Trends
                    </TabsTrigger>
                    <TabsTrigger value="timeseries" className="gap-2">
                      <Calendar className="h-4 w-4" />
                      Time Series
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Main Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Chart - Changes based on view */}
                  <div>
                    <h4 className="text-sm font-medium mb-4">
                      {insightsView === 'sentiment' && 'Sentiment Distribution by Source'}
                      {insightsView === 'category' && 'Feed Distribution by Category'}
                      {insightsView === 'timeseries' && 'Sentiment Trends (Last 7 Days)'}
                    </h4>
                    <ResponsiveContainer width="100%" height={300}>
                      {insightsView === 'sentiment' ? (
                        <BarChart data={sentimentBySourceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="source" />
                          <YAxis />
                          <RechartsTooltip 
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                  <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                                    <p className="font-medium mb-2">{data.source}</p>
                                    <div className="space-y-1 text-sm">
                                      <p className="text-green-600">Positive: {data.positive}</p>
                                      <p className="text-yellow-600">Neutral: {data.neutral}</p>
                                      <p className="text-red-600">Negative: {data.negative}</p>
                                    </div>
                                    <div className="mt-2 pt-2 border-t text-xs text-muted-foreground">
                                      <div className="flex items-start gap-1">
                                        <Sparkles className="h-3 w-3 mt-0.5 flex-shrink-0" />
                                        <span>{data.aiInsight}</span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Legend />
                          <Bar dataKey="positive" fill={SENTIMENT_COLORS.positive} name="Positive" />
                          <Bar dataKey="neutral" fill={SENTIMENT_COLORS.neutral} name="Neutral" />
                          <Bar dataKey="negative" fill={SENTIMENT_COLORS.negative} name="Negative" />
                        </BarChart>
                      ) : insightsView === 'category' ? (
                        <BarChart data={categoryData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <RechartsTooltip 
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                  <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                                    <p className="font-medium mb-2">{data.name}</p>
                                    <div className="space-y-1 text-sm">
                                      <p>Count: {data.value}</p>
                                      <p>Percentage: {data.percentage}%</p>
                                    </div>
                                    <div className="mt-2 pt-2 border-t text-xs text-muted-foreground">
                                      <div className="flex items-start gap-1">
                                        <Sparkles className="h-3 w-3 mt-0.5 flex-shrink-0" />
                                        <span>{data.aiInsight}</span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Legend />
                          <Bar dataKey="value" fill="#0ea5e9" name="Feed Count">
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index]} />
                            ))}
                          </Bar>
                        </BarChart>
                      ) : (
                        <AreaChart data={timeSeriesData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <RechartsTooltip 
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                  <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                                    <p className="font-medium mb-2">{data.date}</p>
                                    <div className="space-y-1 text-sm">
                                      <p className="text-green-600">Positive: {data.positive}</p>
                                      <p className="text-yellow-600">Neutral: {data.neutral}</p>
                                      <p className="text-red-600">Negative: {data.negative}</p>
                                      <p className="font-medium mt-1">Total: {data.total}</p>
                                    </div>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Legend />
                          <Area type="monotone" dataKey="positive" stackId="1" stroke={SENTIMENT_COLORS.positive} fill={SENTIMENT_COLORS.positive} name="Positive" />
                          <Area type="monotone" dataKey="neutral" stackId="1" stroke={SENTIMENT_COLORS.neutral} fill={SENTIMENT_COLORS.neutral} name="Neutral" />
                          <Area type="monotone" dataKey="negative" stackId="1" stroke={SENTIMENT_COLORS.negative} fill={SENTIMENT_COLORS.negative} name="Negative" />
                        </AreaChart>
                      )}
                    </ResponsiveContainer>
                  </div>

                  {/* Right Chart - Sentiment Pie Chart */}
                  <div>
                    <h4 className="text-sm font-medium mb-4">Overall Sentiment Distribution</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={sentimentData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percentage }) => `${name}: ${percentage}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          <Cell fill={SENTIMENT_COLORS.positive} />
                          <Cell fill={SENTIMENT_COLORS.neutral} />
                          <Cell fill={SENTIMENT_COLORS.negative} />
                        </Pie>
                        <RechartsTooltip 
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                                  <p className="font-medium mb-1">{data.name}</p>
                                  <p className="text-sm">Count: {data.value}</p>
                                  <p className="text-sm">Percentage: {data.percentage}%</p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Heatmap Section - Volume by Source and Department */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium">Analysis Volume by Source & Department</h4>
                    <Badge variant="secondary" className="gap-1">
                      <Sparkles className="h-3 w-3" />
                      AI-Generated Insights
                    </Badge>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-medium">Department</th>
                          {heatmapDataSources.map(source => (
                            <th key={source} className="text-center p-3 font-medium">{source}</th>
                          ))}
                          <th className="text-center p-3 font-medium">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {heatmapData.map((row, idx) => {
                          const total = heatmapDataSources.reduce((sum, source) => sum + row[source], 0);
                          return (
                            <tr key={idx} className="border-b hover:bg-muted/50 transition-colors">
                              <td className="p-3 font-medium">{row.department}</td>
                              {heatmapDataSources.map(source => {
                                const value = row[source];
                                const intensity = Math.min(100, (value / 80) * 100);
                                return (
                                  <TooltipProvider key={source}>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <td 
                                          className="text-center p-3 cursor-help"
                                          style={{
                                            backgroundColor: `rgba(14, 165, 233, ${intensity / 100})`,
                                            color: intensity > 50 ? 'white' : 'inherit'
                                          }}
                                        >
                                          {value}
                                        </td>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <div className="space-y-1">
                                          <p className="font-medium">{source} - {row.department}</p>
                                          <p className="text-xs">{value} analyzed feeds</p>
                                          <div className="flex items-start gap-1 text-xs text-muted-foreground pt-1 border-t">
                                            <Sparkles className="h-3 w-3 mt-0.5 flex-shrink-0" />
                                            <span>
                                              {value > 60 ? 'High activity detected. Requires attention.' : 
                                               value > 40 ? 'Moderate activity level.' : 
                                               'Low activity. Within normal range.'}
                                            </span>
                                          </div>
                                        </div>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                );
                              })}
                              <td className="text-center p-3 font-semibold bg-muted">{total}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analysis Progress Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Overall Progress Card */}
            <Card className="lg:col-span-1">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-24 h-24 mb-4">
                    <svg className="transform -rotate-90 w-24 h-24">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-muted"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - overallProgress / 100)}`}
                        className="text-primary"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">{overallProgress}%</span>
                    </div>
                  </div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Overall Progress</h3>
                  <p className="text-xs text-muted-foreground">Analysis Pipeline</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                    <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-sm text-muted-foreground">In Progress</div>
                </div>
                <div className="text-2xl font-semibold text-foreground">{inProgressFindings}</div>
                <div className="text-xs text-muted-foreground mt-1">Active analyses</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
                    <CheckSquare className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
                <div className="text-2xl font-semibold text-foreground">{completedFindings}</div>
                <div className="text-xs text-muted-foreground mt-1">Finished findings</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                    <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-sm text-muted-foreground">Total Findings</div>
                </div>
                <div className="text-2xl font-semibold text-foreground">{mockFindings.length}</div>
                <div className="text-xs text-muted-foreground mt-1">All time</div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Steps */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Analysis Pipeline Status</CardTitle>
                <Badge variant="secondary" className="gap-1">
                  <Sparkles className="h-3 w-3" />
                  AI-Powered
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress value={overallProgress} className="h-3" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                  {analysisSteps.map((step) => (
                    <div key={step.id} className="relative">
                      <Card className={step.status === 'completed' ? 'border-green-600' : step.status === 'in-progress' ? 'border-blue-600' : ''}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${
                                step.status === 'completed' ? 'bg-green-600' :
                                step.status === 'in-progress' ? 'bg-blue-600' :
                                'bg-gray-400'
                              }`}>
                                {step.status === 'completed' ? <Check className="h-4 w-4" /> : step.id}
                              </div>
                            </div>
                            <Badge variant={
                              step.status === 'completed' ? 'default' :
                              step.status === 'in-progress' ? 'secondary' :
                              'outline'
                            } className={
                              step.status === 'completed' ? 'bg-green-600' :
                              step.status === 'in-progress' ? 'bg-blue-600' :
                              ''
                            }>
                              {step.status === 'completed' ? 'Done' :
                               step.status === 'in-progress' ? 'Active' :
                               'Pending'}
                            </Badge>
                          </div>
                          <p className="text-sm mb-2">{step.name}</p>
                          <Progress value={step.progress} className="h-1.5" />
                          <p className="text-xs text-muted-foreground mt-1">{step.progress}%</p>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Findings Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Findings List */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Generated Findings</CardTitle>
                  <Button size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {filteredFindings.map((finding) => (
                      <Card
                        key={finding.id}
                        className={`cursor-pointer transition-all hover:border-primary ${
                          selectedFinding === finding.id ? 'border-primary shadow-sm' : ''
                        } ${finding.isDuplicate ? 'border-orange-300 bg-orange-50/50 dark:bg-orange-950/20' : ''}`}
                        onClick={() => setSelectedFinding(finding.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-start gap-2 mb-2">
                                <h4 className="flex-1">{finding.title}</h4>
                                {finding.isDuplicate && (
                                  <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300">
                                    <Copy className="h-3 w-3 mr-1" />
                                    Duplicate
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">
                                {finding.description}
                              </p>
                              <div className="flex items-center gap-2 flex-wrap">
                                <Badge className={getSentimentColor(finding.sentiment)}>
                                  {finding.sentiment}
                                </Badge>
                                {finding.categories.map(cat => (
                                  <Badge key={cat} variant="outline">
                                    {cat}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-muted-foreground mb-1">
                                {finding.feedIds.length} feeds
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {finding.department}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {finding.createdAt.toLocaleDateString()}
                              </div>
                            </div>
                          </div>

                          {finding.isDuplicate && (
                            <div className="mt-3 pt-3 border-t border-orange-200">
                              <div className="flex items-center gap-2 text-sm text-orange-700">
                                <AlertTriangle className="h-4 w-4" />
                                <span>Possible duplicate of Finding #{finding.duplicateOf}</span>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Details Panel */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle>Finding Details</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedFinding ? (
                    <div className="space-y-4">
                      {(() => {
                        const finding = mockFindings.find(f => f.id === selectedFinding);
                        if (!finding) return null;

                        return (
                          <>
                            <div>
                              <label className="text-sm text-muted-foreground">Finding ID</label>
                              <p className="text-sm mt-1">{finding.id}</p>
                            </div>

                            <Separator />

                            <div>
                              <label className="text-sm text-muted-foreground">Department</label>
                              <p className="text-sm mt-1">{finding.department}</p>
                            </div>

                            <Separator />

                            <div>
                              <label className="text-sm text-muted-foreground">Associated Feeds</label>
                              <p className="text-sm mt-1">{finding.feedIds.length} customer feedback items</p>
                            </div>

                            <Separator />

                            <div>
                              <label className="text-sm text-muted-foreground">Categories</label>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {finding.categories.map(cat => (
                                  <Badge key={cat} variant="secondary">
                                    {cat}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <Separator />

                            <div>
                              <label className="text-sm text-muted-foreground">Sentiment</label>
                              <div className="mt-2">
                                <Badge className={getSentimentColor(finding.sentiment)}>
                                  {finding.sentiment.charAt(0).toUpperCase() + finding.sentiment.slice(1)}
                                </Badge>
                              </div>
                            </div>

                            <Separator />

                            <div>
                              <label className="text-sm text-muted-foreground">Created Date</label>
                              <p className="text-sm mt-1">{finding.createdAt.toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}</p>
                            </div>

                            {finding.isDuplicate && (
                              <>
                                <Separator />
                                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 dark:bg-orange-950/20">
                                  <div className="flex items-center gap-2 mb-2">
                                    <AlertTriangle className="h-4 w-4 text-orange-700" />
                                    <span className="text-sm font-medium text-orange-700">Duplicate Warning</span>
                                  </div>
                                  <p className="text-xs text-orange-600">
                                    This finding appears to be similar to Finding #{finding.duplicateOf}. 
                                    Consider merging or reviewing for consolidation.
                                  </p>
                                </div>
                              </>
                            )}

                            <div className="pt-2">
                              <Button className="w-full" size="sm">
                                Create Action Plan
                              </Button>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      Select a finding to view details
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
