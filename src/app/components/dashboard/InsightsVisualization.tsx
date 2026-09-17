import { useState } from 'react';
import { AreaChart, Area, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceDot } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { AlertCircle, TrendingUp, Database, MessageSquare } from 'lucide-react';
import { getMonthlyVolumeData, getVolumeBySourceData, getTopIssuesData, getKeywordsData } from '../../lib/mockData';

const SENTIMENT_COLORS = {
  positive: '#22c55e',
  negative: '#ef4444',
  neutral: '#eab308',
};

type ChartView = 'sentiment' | 'source' | 'issues';

// Custom tooltip for anomaly detection
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background border border-border rounded-lg shadow-lg p-3">
        <p className="font-medium mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
        {data.isAnomaly && (
          <div className="mt-2 pt-2 border-t border-border">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-orange-600">{data.anomalyReason}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
  return null;
};

// Custom tooltip for keyword word cloud
const KeywordTooltip = ({ text, percentage, context }: { text: string; percentage: number; context: string }) => (
  <div className="absolute z-10 bg-background border border-border rounded-lg shadow-lg p-2 text-xs whitespace-nowrap pointer-events-none">
    <p className="font-medium">{text}</p>
    <p className="text-muted-foreground">{context}</p>
  </div>
);

export function InsightsVisualization() {
  const [chartView, setChartView] = useState<ChartView>('sentiment');
  const [hoveredKeyword, setHoveredKeyword] = useState<string | null>(null);

  const sentimentData = getMonthlyVolumeData();
  const sourceData = getVolumeBySourceData();
  const issuesData = getTopIssuesData();
  const keywordsData = getKeywordsData();

  const sentimentTotal = sentimentData.reduce((acc, d) => ({
    positive: acc.positive + d.positive,
    negative: acc.negative + d.negative,
    neutral: acc.neutral + d.neutral,
  }), { positive: 0, negative: 0, neutral: 0 });

  const total = sentimentTotal.positive + sentimentTotal.negative + sentimentTotal.neutral;

  const donutData = [
    { name: 'Positive', value: sentimentTotal.positive, color: SENTIMENT_COLORS.positive, percentage: Math.round((sentimentTotal.positive / total) * 100) },
    { name: 'Neutral', value: sentimentTotal.neutral, color: SENTIMENT_COLORS.neutral, percentage: Math.round((sentimentTotal.neutral / total) * 100) },
    { name: 'Negative', value: sentimentTotal.negative, color: SENTIMENT_COLORS.negative, percentage: Math.round((sentimentTotal.negative / total) * 100) },
  ];

  const getChartData = () => {
    switch (chartView) {
      case 'sentiment':
        return sentimentData;
      case 'source':
        return sourceData;
      case 'issues':
        return issuesData;
      default:
        return sentimentData;
    }
  };

  const renderChart = () => {
    const data = getChartData();

    if (chartView === 'sentiment') {
      return (
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={SENTIMENT_COLORS.positive} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={SENTIMENT_COLORS.positive} stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={SENTIMENT_COLORS.negative} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={SENTIMENT_COLORS.negative} stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorNeutral" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={SENTIMENT_COLORS.neutral} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={SENTIMENT_COLORS.neutral} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area
            type="monotone"
            dataKey="positive"
            stroke={SENTIMENT_COLORS.positive}
            fill="url(#colorPositive)"
            fillOpacity={1}
            strokeWidth={2}
            name="Positive"
          />
          <Area
            type="monotone"
            dataKey="neutral"
            stroke={SENTIMENT_COLORS.neutral}
            fill="url(#colorNeutral)"
            fillOpacity={1}
            strokeWidth={2}
            name="Neutral"
          />
          <Area
            type="monotone"
            dataKey="negative"
            stroke={SENTIMENT_COLORS.negative}
            fill="url(#colorNegative)"
            fillOpacity={1}
            strokeWidth={2}
            name="Negative"
          />
          {/* Anomaly markers */}
          {data.map((entry, index) => 
            entry.isAnomaly ? (
              <ReferenceDot
                key={index}
                x={entry.month}
                y={entry.total}
                r={8}
                fill="#f97316"
                stroke="#fff"
                strokeWidth={2}
              />
            ) : null
          )}
        </AreaChart>
      );
    } else {
      return (
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip />
          <Legend />
          {(data.length > 0 ? Object.keys(data[0]) : [])
            .filter(key => key !== 'month')
            .map((key, index) => {
              const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];
              return (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  name={key}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              );
            })}
        </LineChart>
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Interactive Trend Graph and Donut Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Graph - 2 columns */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="space-y-4">
              <div>
                <CardTitle>Insights Visualization</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Interactive feedback trends and anomaly detection</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={chartView === 'sentiment' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setChartView('sentiment')}
                >
                  Sentiment Over Time
                </Button>
                <Button
                  variant={chartView === 'source' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setChartView('source')}
                >
                  Volume by Source
                </Button>
                <Button
                  variant={chartView === 'issues' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setChartView('issues')}
                >
                  Top Issues
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              {renderChart()}
            </ResponsiveContainer>
            
            {/* AI Anomaly Legend */}
            {chartView === 'sentiment' && (
              <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-900">AI Anomaly Detection Enabled</span>
                </div>
                <p className="text-xs text-orange-700 mt-1 ml-6">
                  Orange markers indicate unusual spikes or drops. Hover over data points for AI-generated insights.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sentiment Distribution Donut - 1 column */}
        <Card>
          <CardHeader>
            <CardTitle>Sentiment Distribution</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Overall feedback sentiment breakdown</p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    labelLine={false}
                    dataKey="value"
                  >
                    {donutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Sentiment Labels */}
            <div className="space-y-3 mt-4">
              {donutData.map((entry) => (
                <div key={entry.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-sm">{entry.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">{entry.value}</span>
                    <Badge variant="secondary" className="text-xs">
                      {entry.percentage}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Word Cloud Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Top Keywords</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Dynamic word cloud extracted from customer feedback</p>
            </div>
            <Badge variant="outline" className="gap-1">
              <TrendingUp className="h-3 w-3" />
              AI-Powered Analysis
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative flex flex-wrap items-center justify-center gap-4 py-8 min-h-[200px]">
            {keywordsData.map((keyword) => {
              const fontSize = Math.max(14, Math.min(48, keyword.value / 2));
              const color = keyword.sentiment === 'positive' 
                ? SENTIMENT_COLORS.positive
                : keyword.sentiment === 'negative'
                ? SENTIMENT_COLORS.negative
                : SENTIMENT_COLORS.neutral;

              return (
                <div
                  key={keyword.text}
                  className="relative cursor-pointer transition-all hover:scale-110"
                  style={{
                    fontSize: `${fontSize}px`,
                    color: color,
                    fontWeight: fontSize > 30 ? 700 : fontSize > 20 ? 600 : 400,
                  }}
                  onMouseEnter={() => setHoveredKeyword(keyword.text)}
                  onMouseLeave={() => setHoveredKeyword(null)}
                >
                  {keyword.text}
                  {hoveredKeyword === keyword.text && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-10 bg-background border border-border rounded-lg shadow-lg p-2 text-xs whitespace-nowrap">
                      <p className="font-medium text-foreground">{keyword.text}</p>
                      <p className="text-muted-foreground">{keyword.context}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Word Cloud Legend */}
          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: SENTIMENT_COLORS.positive }} />
                <span>Positive Context</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: SENTIMENT_COLORS.neutral }} />
                <span>Neutral Context</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: SENTIMENT_COLORS.negative }} />
                <span>Negative Context</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-3">
              Hover over keywords to see frequency and context. Size indicates importance.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
