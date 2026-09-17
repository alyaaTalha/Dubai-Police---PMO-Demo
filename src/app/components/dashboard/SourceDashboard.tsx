import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { StatCard } from '../shared/StatCard';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Database, TrendingUp, AlertCircle, CheckCircle, ThumbsUp, ThumbsDown, Minus } from 'lucide-react';
import { mockFeeds, getSentimentCounts, getCategoryCounts } from '../../lib/mockData';
import { DataSourceType, SentimentType } from '../../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

const SENTIMENT_COLORS = {
  positive: '#22c55e',
  negative: '#ef4444',
  neutral: '#eab308',
};

const dataSourceConfig = {
  crm: {
    label: 'CRM',
    subSources: ['Email Support', 'Phone Support', 'Web Form', 'Live Chat'],
    color: '#3b82f6',
  },
  insights: {
    label: 'Insights',
    subSources: ['Survey', 'Focus Group', 'Interview', 'Feedback Form'],
    color: '#8b5cf6',
  },
  social: {
    label: 'Social Media',
    subSources: ['Twitter', 'Facebook', 'LinkedIn', 'Instagram'],
    color: '#ec4899',
  },
  forum: {
    label: 'Customer Forum',
    subSources: ['Discussion Board', 'Q&A', 'Bug Report', 'Feature Request'],
    color: '#10b981',
  },
};

export function SourceDashboard() {
  const [activeSource, setActiveSource] = useState<DataSourceType>('crm');

  const renderSourceContent = (source: DataSourceType) => {
    const config = dataSourceConfig[source];
    const sourceFeeds = mockFeeds.filter(f => f.source === source);
    const sentimentCounts = getSentimentCounts(sourceFeeds);
    const categoryCounts = getCategoryCounts(sourceFeeds).slice(0, 8);

    const sentimentData = [
      { name: 'Positive', value: sentimentCounts.positive, color: SENTIMENT_COLORS.positive },
      { name: 'Negative', value: sentimentCounts.negative, color: SENTIMENT_COLORS.negative },
      { name: 'Neutral', value: sentimentCounts.neutral, color: SENTIMENT_COLORS.neutral },
    ];

    const subSourceData = config.subSources.map(subSource => {
      const subFeeds = sourceFeeds.filter(f => f.subSource === subSource);
      const subSentiment = getSentimentCounts(subFeeds);
      return {
        name: subSource,
        total: subFeeds.length,
        positive: subSentiment.positive,
        negative: subSentiment.negative,
        neutral: subSentiment.neutral,
        status: subFeeds.length > 0 ? 'active' : 'inactive',
      };
    });

    return (
      <div className="space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Volume"
            value={sourceFeeds.length.toLocaleString()}
            icon={Database}
          />
          <StatCard
            title="Positive Sentiment"
            value={sentimentCounts.positive}
            icon={ThumbsUp}
            subtitle={`${Math.round((sentimentCounts.positive / sourceFeeds.length) * 100)}% of total`}
          />
          <StatCard
            title="Negative Sentiment"
            value={sentimentCounts.negative}
            icon={ThumbsDown}
            subtitle={`${Math.round((sentimentCounts.negative / sourceFeeds.length) * 100)}% of total`}
          />
          <StatCard
            title="Neutral Sentiment"
            value={sentimentCounts.neutral}
            icon={Minus}
            subtitle={`${Math.round((sentimentCounts.neutral / sourceFeeds.length) * 100)}% of total`}
          />
        </div>

        {/* Sub-Sources Table */}
        <Card>
          <CardHeader>
            <CardTitle>Sub-Source Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sub-Source</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total Feeds</TableHead>
                  <TableHead className="text-right">Positive</TableHead>
                  <TableHead className="text-right">Negative</TableHead>
                  <TableHead className="text-right">Neutral</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subSourceData.map(sub => (
                  <TableRow key={sub.name}>
                    <TableCell>{sub.name}</TableCell>
                    <TableCell>
                      {sub.status === 'active' ? (
                        <Badge variant="default" className="bg-green-600">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Inactive
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">{sub.total}</TableCell>
                    <TableCell className="text-right text-green-600">{sub.positive}</TableCell>
                    <TableCell className="text-right text-red-600">{sub.negative}</TableCell>
                    <TableCell className="text-right text-yellow-600">{sub.neutral}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sentiment Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Sentiment Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Top Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryCounts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill={config.color} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Volume by Sub-Source */}
        <Card>
          <CardHeader>
            <CardTitle>Volume by Sub-Source</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subSourceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill={config.color} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1>Data Source Analysis</h1>
          <p className="text-muted-foreground mt-1">
            Deep dive into feedback from individual data sources
          </p>
        </div>

      {/* Tabs */}
      <Tabs value={activeSource} onValueChange={(v) => setActiveSource(v as DataSourceType)}>
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="crm">CRM</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="forum">Forum</TabsTrigger>
        </TabsList>

        <TabsContent value="crm" className="mt-6">
          {renderSourceContent('crm')}
        </TabsContent>

        <TabsContent value="insights" className="mt-6">
          {renderSourceContent('insights')}
        </TabsContent>

        <TabsContent value="social" className="mt-6">
          {renderSourceContent('social')}
        </TabsContent>

        <TabsContent value="forum" className="mt-6">
          {renderSourceContent('forum')}
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
}
