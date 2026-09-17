import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { KPICard } from '../shared/KPICard';
import { GlobalFilters } from '../shared/GlobalFilters';
import { InsightsVisualization } from './InsightsVisualization';
import { TasksAndFeedsPanel } from './TasksAndFeedsPanel';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Database, TrendingUp, Tag, FileText, CheckSquare, ThumbsUp, ThumbsDown, Minus, MessageSquare, Users, BarChart3, Plus, Settings, Sparkles } from 'lucide-react';
import { mockFeeds, getSentimentCounts, getCategoryCounts, getDemographicData, getTimeSeriesData } from '../../lib/mockData';
import { mockFindings, mockTasks } from '../../lib/mockData';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';

const SENTIMENT_COLORS = {
  positive: '#22c55e',
  negative: '#ef4444',
  neutral: '#eab308',
};

const CHART_COLORS = {
  area1: '#93c5fd',
  area2: '#bfdbfe', 
  area3: '#dbeafe',
  area4: '#7dd3fc',
  area5: '#60a5fa',
};

interface MainDashboardProps {
  onNavigate?: (page: string) => void;
}

export function MainDashboard({ onNavigate }: MainDashboardProps = {}) {
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedDataSources, setSelectedDataSources] = useState<string[]>([]);

  const departments = ['Public Services', 'Healthcare', 'Transportation', 'Education', 'Housing'];
  const dataSources = [
    { value: 'crm', label: 'CRM' },
    { value: 'insights', label: 'Insights' },
    { value: 'social', label: 'Social Media' },
    { value: 'forum', label: 'Customer Forum' },
  ];

  const filteredFeeds = mockFeeds.filter(feed => {
    if (selectedDepartments.length > 0 && !selectedDepartments.includes(feed.department)) return false;
    if (selectedDataSources.length > 0 && !selectedDataSources.includes(feed.source)) return false;
    return true;
  });

  const sentimentCounts = getSentimentCounts(filteredFeeds);
  const categoryCounts = getCategoryCounts(filteredFeeds).slice(0, 10);
  const demographicData = getDemographicData();
  const timeSeriesData = getTimeSeriesData();

  const sourceBreakdown = [
    { name: 'CRM', value: mockFeeds.filter(f => f.source === 'crm').length, color: '#3b82f6' },
    { name: 'Insights', value: mockFeeds.filter(f => f.source === 'insights').length, color: '#8b5cf6' },
    { name: 'Social Media', value: mockFeeds.filter(f => f.source === 'social').length, color: '#ec4899' },
    { name: 'Customer Forum', value: mockFeeds.filter(f => f.source === 'forum').length, color: '#10b981' },
  ];

  const sentimentData = [
    { name: 'Positive', value: sentimentCounts.positive, color: SENTIMENT_COLORS.positive },
    { name: 'Negative', value: sentimentCounts.negative, color: SENTIMENT_COLORS.negative },
    { name: 'Neutral', value: sentimentCounts.neutral, color: SENTIMENT_COLORS.neutral },
  ];

  const openTasks = mockTasks.filter(t => t.status !== 'completed').length;

  return (
    <div>
      <div className="p-6 space-y-6">
        {/* Analysis CTA Banner */}
        <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-purple-500/5 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20 relative">
                <BarChart3 className="h-5 w-5 text-primary" />
                <div className="absolute -top-1 -right-1">
                  <Badge className="h-5 w-5 p-0 flex items-center justify-center text-xs bg-orange-500">
                    {mockFindings.filter(f => f.status === 'in-progress').length}
                  </Badge>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">Analysis in Progress</div>
                <p className="text-xs text-muted-foreground">{mockFindings.filter(f => f.status === 'in-progress').length} findings pending review</p>
              </div>
            </div>
            <Button size="sm" className="gap-2" onClick={() => onNavigate?.('analysis')}>
              View Analysis
              <Sparkles className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Page Title and Filters */}
        <div className="flex items-center justify-between">
          <h1>Voice of Customer</h1>
          <GlobalFilters
            departments={departments}
            selectedDepartments={selectedDepartments}
            onDepartmentChange={setSelectedDepartments}
            dataSources={dataSources}
            selectedDataSources={selectedDataSources}
            onDataSourceChange={setSelectedDataSources}
          />
        </div>

        {/* Data Sources Overview Section */}
        <div>
          <div className="mb-4">
            <h2>Data Sources Overview</h2>
            <p className="text-sm text-muted-foreground mt-1">Real-time analytics across all customer feedback channels</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              title="CRM"
              value="5,290"
              icon={Database}
              variant="primary"
              trend={{ value: 12, isPositive: true }}
              aiInsight="Support ticket volume increased 12% due to new service inquiries"
              showExternalLink
              onClick={() => console.log('Navigate to CRM dashboard')}
            />
            <KPICard
              title="Customer Forum"
              value="5,290"
              icon={MessageSquare}
              variant="primary"
              trend={{ value: 18, isPositive: true }}
              aiInsight="Forum activity up 18% due to renewal feedback and payment discussions"
              showExternalLink
              onClick={() => console.log('Navigate to Forum dashboard')}
            />
            <KPICard
              title="Insights"
              value="5,290"
              icon={BarChart3}
              variant="primary"
              trend={{ value: 5, isPositive: false }}
              aiInsight="Survey response rate decreased 5% - consider optimizing survey length"
              showExternalLink
              onClick={() => console.log('Navigate to Insights dashboard')}
            />
            <KPICard
              title="Social Media"
              value="5,290"
              icon={Users}
              variant="primary"
              trend={{ value: 23, isPositive: true }}
              aiInsight="Social engagement surged 23% following recent service improvement announcement"
              showExternalLink
              onClick={() => console.log('Navigate to Social Media dashboard')}
            />
          </div>
        </div>

        {/* AI Summary Banner */}
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">AI Summary</div>
              <p className="text-sm text-muted-foreground mt-1">
                Customer satisfaction improved by 6%. Upload issues remain frequent.
              </p>
            </div>
          </div>
        </div>

        {/* KPI Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Customer Happiness Index */}
          <Card className="rounded-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <ThumbsUp className="h-4 w-4 text-primary" />
                </div>
                <div className="text-sm text-muted-foreground">CHI</div>
              </div>
              <div className="text-2xl font-semibold text-foreground">8.4</div>
              <div className="text-xs text-muted-foreground mt-1">Customer Happiness</div>
            </CardContent>
          </Card>

          {/* Sentiment Balance */}
          <Card className="rounded-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <BarChart3 className="h-4 w-4 text-primary" />
                </div>
                <div className="text-sm text-muted-foreground">Sentiment</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-xs text-muted-foreground">47%</span>
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <span className="text-xs text-muted-foreground">40%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span className="text-xs text-muted-foreground">13%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Findings */}
          <Card className="rounded-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div className="text-sm text-muted-foreground">Findings</div>
              </div>
              <div className="text-2xl font-semibold text-foreground">{mockFindings.length}</div>
              <div className="text-xs text-muted-foreground mt-1">Total Findings</div>
            </CardContent>
          </Card>

          {/* Resolved Issues */}
          <Card className="rounded-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <CheckSquare className="h-4 w-4 text-primary" />
                </div>
                <div className="text-sm text-muted-foreground">Resolved</div>
              </div>
              <div className="text-2xl font-semibold text-foreground">68%</div>
              <div className="text-xs text-muted-foreground mt-1">Issues Resolved</div>
            </CardContent>
          </Card>

          {/* AI Confidence Level */}
          <Card className="rounded-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <div className="text-sm text-muted-foreground">AI Confidence</div>
              </div>
              <div className="text-2xl font-semibold text-foreground">94%</div>
              <div className="text-xs text-muted-foreground mt-1">Confidence Level</div>
            </CardContent>
          </Card>
        </div>

        {/* AI Summary Banner */}
        <Alert className="bg-primary/5 border-primary/20">
          <Sparkles className="h-4 w-4 text-primary" />
          <AlertDescription className="ml-2">
            <span className="font-medium">AI Summary:</span> Customer satisfaction improved by 6%. Upload issues remain frequent.
          </AlertDescription>
        </Alert>

        {/* Insights Visualization Section */}
        <InsightsVisualization />

        {/* Main Layout: Left Content + Right Tasks Panel */}

      </div>
    </div>
  );
}
