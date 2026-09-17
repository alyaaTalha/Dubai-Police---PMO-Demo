import { useState } from "react";
import { 
  MessageSquare,
  ArrowRight, 
  TrendingUp, 
  Target, 
  AlertTriangle, 
  CheckCircle2,
  BarChart3,
  Users,
  Database,
  FileSearch,
  ListChecks,
  FileText,
  Activity,
  ChevronRight,
  Calendar,
  Clock,
  Smile,
  Frown,
  Meh
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import heroDecoration from "../../../assets/sandbox-hero-decoration.png";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

function StatCard({ title, value, change, isPositive, icon }: StatCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="h-10 w-10 rounded-lg bg-[#008755]/10 flex items-center justify-center text-[#008755]">
            {icon}
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-['Dubai:Medium',_'Dubai']">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

interface QuickAccessCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "outline" | "destructive";
  onClick: () => void;
}

function QuickAccessCard({ title, description, icon, badge, badgeVariant = "secondary", onClick }: QuickAccessCardProps) {
  return (
    <Card className="cursor-pointer transition-all hover:shadow-md hover:border-[#008755]/50" onClick={onClick}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-3">
          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-[#008755] to-[#008755]/80 flex items-center justify-center text-white">
            {icon}
          </div>
          {badge && (
            <Badge variant={badgeVariant}>{badge}</Badge>
          )}
        </div>
        <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex items-center text-[#008755] text-sm font-['Dubai:Medium',_'Dubai']">
          <span>View Details</span>
          <ChevronRight className="h-4 w-4 ml-1" />
        </div>
      </CardContent>
    </Card>
  );
}

interface AlertItemProps {
  title: string;
  description: string;
  time: string;
  severity: "high" | "medium" | "low";
  type?: string;
}

function AlertItem({ title, description, time, severity, type }: AlertItemProps) {
  const severityConfig = {
    high: { bg: '#D83731', text: 'white' },
    medium: { bg: '#F2A200', text: 'white' },
    low: { bg: '#357743', text: 'white' }
  };

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
      <div 
        className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${severityConfig[severity].bg}20` }}
      >
        <AlertTriangle className="h-4 w-4" style={{ color: severityConfig[severity].bg }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{title}</p>
          {type && (
            <Badge 
              style={{
                backgroundColor: severity === 'high' ? '#D8373120' : 
                  severity === 'medium' ? '#F2A20020' : '#35774320',
                color: severity === 'high' ? '#D83731' : 
                  severity === 'medium' ? '#F2A200' : '#357743'
              }}
            >
              {type}
            </Badge>
          )}
        </div>
        <p className="text-xs text-muted-foreground mb-1">{description}</p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}

interface VocDashboardProps {
  onNavigate?: (view: 'strategy' | 'performance' | 'scorecards' | 'partnership' | 'voc' | 'home') => void;
}

export function VocDashboard({ onNavigate }: VocDashboardProps) {
  const [selectedYear, setSelectedYear] = useState<number>(2025);

  // Mock data for sentiment analysis trends
  const sentimentTrends = [
    { quarter: "Q1", "Positive": 68, "Neutral": 22, "Negative": 10 },
    { quarter: "Q2", "Positive": 72, "Neutral": 19, "Negative": 9 },
    { quarter: "Q3", "Positive": 75, "Neutral": 17, "Negative": 8 },
    { quarter: "Q4", "Positive": 78, "Neutral": 15, "Negative": 7 }
  ];

  return (
    <div className="h-full overflow-auto">
      <div className="space-y-3 p-3">
        {/* VOC Navigation */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <nav className="flex items-center gap-1 p-1">
            <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#008755] text-white transition-colors">
              <BarChart3 className="h-4 w-4" />
              <span className="text-sm font-['Dubai:Medium',_'Dubai']">Dashboard</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700 transition-colors">
              <Database className="h-4 w-4" />
              <span className="text-sm font-['Dubai:Medium',_'Dubai']">Data sources</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700 transition-colors">
              <Activity className="h-4 w-4" />
              <span className="text-sm font-['Dubai:Medium',_'Dubai']">Analysis</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700 transition-colors">
              <ListChecks className="h-4 w-4" />
              <span className="text-sm font-['Dubai:Medium',_'Dubai']">Tasks</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700 transition-colors">
              <FileSearch className="h-4 w-4" />
              <span className="text-sm font-['Dubai:Medium',_'Dubai']">Findings</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700 transition-colors">
              <FileText className="h-4 w-4" />
              <span className="text-sm font-['Dubai:Medium',_'Dubai']">Reports</span>
            </button>
          </nav>
        </div>

        {/* Hero CTA Section */}
        <Card className="relative text-white border-none shadow-lg overflow-hidden bg-gradient-to-br from-[#005844] via-[#008755] to-[#00a869]">
          <img
            src={heroDecoration}
            alt=""
            className="absolute -top-16 -right-16 h-160 w-160 rounded-full object-cover opacity-50 pointer-events-none select-none"
          />
          <CardContent className="pt-3 pb-3 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-12 w-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div>
                    <h1 className="text-xl   mb-1">
                      Voice of Customer
                    </h1>
                    <p className="text-white/90 text-sm">
                      Customer Feedback Analysis Platform
                    </p>
                  </div>
                </div>
                <p className="text-white/80 text-sm max-w-2xl">
                  Comprehensive customer feedback analysis system for Dubai Customs. Analyze sentiment, track findings, and drive customer satisfaction across all channels.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div>
          <h2 className="text-lg font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-1.5">
            Key VOC Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard
              title="Total Feedback"
              value="12,847"
              change="+15%"
              isPositive={true}
              icon={<MessageSquare className="h-5 w-5" />}
            />
            <StatCard
              title="Positive Sentiment"
              value="78%"
              change="+8%"
              isPositive={true}
              icon={<Smile className="h-5 w-5" />}
            />
            <StatCard
              title="Active Findings"
              value="43"
              change="+12%"
              isPositive={true}
              icon={<FileSearch className="h-5 w-5" />}
            />
            <StatCard
              title="Satisfaction Score"
              value="4.2/5"
              change="+0.3"
              isPositive={true}
              icon={<TrendingUp className="h-5 w-5" />}
            />
          </div>
        </div>

        {/* Quick Access */}
        <div>
          <h2 className="text-lg font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-1.5">
            Quick Access
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <QuickAccessCard
              title="Dashboard"
              description="Overview of customer feedback metrics"
              icon={<BarChart3 className="h-6 w-6" />}
              badge="Live"
              onClick={() => {}}
            />
            <QuickAccessCard
              title="Analysis"
              description="Sentiment and feedback analysis"
              icon={<Activity className="h-6 w-6" />}
              badge="12,847 Items"
              onClick={() => {}}
            />
            <QuickAccessCard
              title="Task Management"
              description="Track and manage action items"
              icon={<ListChecks className="h-6 w-6" />}
              badge="89 Active"
              onClick={() => {}}
            />
            <QuickAccessCard
              title="Findings"
              description="Customer insights and findings"
              icon={<FileSearch className="h-6 w-6" />}
              badge="43 Active"
              onClick={() => {}}
            />
            <QuickAccessCard
              title="Reports"
              description="VOC analytics and reports"
              icon={<FileText className="h-6 w-6" />}
              badge="15 Available"
              onClick={() => {}}
            />
            <QuickAccessCard
              title="Datasources"
              description="Manage feedback data sources"
              icon={<Database className="h-6 w-6" />}
              badge="6 Sources"
              onClick={() => {}}
            />
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Sentiment Analysis Trend */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-['Dubai:Medium',_'Dubai']">
                    Sentiment Analysis Trend
                  </CardTitle>
                  <CardDescription>
                    Customer sentiment distribution - {selectedYear}
                  </CardDescription>
                </div>
                <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(Number(value))}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={sentimentTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="quarter" 
                    stroke="#6b7280"
                    style={{ fontSize: '12px', fontFamily: 'Dubai, sans-serif' }}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    style={{ fontSize: '12px', fontFamily: 'Dubai, sans-serif' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      fontFamily: 'Dubai, sans-serif'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ 
                      fontSize: '12px',
                      fontFamily: 'Dubai, sans-serif'
                    }}
                  />
                  <Line type="monotone" dataKey="Positive" stroke="#357743" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="Neutral" stroke="#F2A200" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="Negative" stroke="#D83731" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Alerts & Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="font-['Dubai:Medium',_'Dubai']">
                Recent Alerts & Activities
              </CardTitle>
              <CardDescription>
                Latest feedback alerts and action items
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 overflow-y-auto max-h-[220px] pr-2">
                <div className="flex items-start gap-2 mb-3">
                  <Activity className="h-4 w-4 text-[#008755] mt-0.5" />
                  <h3 className="font-['Dubai:Medium',_'Dubai'] text-sm">Recent Activities</h3>
                </div>
                <AlertItem
                  title="Positive Feedback Spike"
                  description="Customer satisfaction increased by 15% this week"
                  time="2 hours ago"
                  severity="low"
                  type="CRM"
                />
                <AlertItem
                  title="New Finding Generated"
                  description="AI identified emerging theme in social media feedback"
                  time="1 day ago"
                  severity="low"
                  type="Social Media"
                />
                
                <div className="flex items-start gap-2 mb-3 mt-6">
                  <AlertTriangle className="h-4 w-4 text-[#F2A200] mt-0.5" />
                  <h3 className="font-['Dubai:Medium',_'Dubai'] text-sm">Feedback Alerts</h3>
                </div>
                <AlertItem
                  title="Negative Sentiment Increase"
                  description="Customer complaints up 12% in processing time category"
                  time="Today"
                  severity="high"
                  type="Action Required"
                />
                <AlertItem
                  title="Response Time Delay"
                  description="Average response time exceeds target by 2 hours"
                  time="Yesterday"
                  severity="medium"
                  type="Monitor"
                />
                <AlertItem
                  title="New Data Source Available"
                  description="Customer forum integration ready for review"
                  time="2 days ago"
                  severity="medium"
                  type="Pending"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Sources Overview */}
        <div>
          <h2 className="text-lg font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-1.5">
            Data Sources Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { 
                name: "CRM System", 
                count: 5847, 
                active: true, 
                color: "#00B0AA",
                icon: <Database className="h-5 w-5" />,
                sentiment: { positive: 72, neutral: 20, negative: 8 }
              },
              { 
                name: "Social Media", 
                count: 3892, 
                active: true, 
                color: "#BB9956",
                icon: <Users className="h-5 w-5" />,
                sentiment: { positive: 65, neutral: 25, negative: 10 }
              },
              { 
                name: "Customer Forum", 
                count: 2156, 
                active: true, 
                color: "#008755",
                icon: <MessageSquare className="h-5 w-5" />,
                sentiment: { positive: 81, neutral: 13, negative: 6 }
              },
              { 
                name: "Survey Responses", 
                count: 952, 
                active: true, 
                color: "#005844",
                icon: <FileText className="h-5 w-5" />,
                sentiment: { positive: 88, neutral: 9, negative: 3 }
              },
              { 
                name: "Email Feedback", 
                count: 1543, 
                active: true, 
                color: "#115E67",
                icon: <Activity className="h-5 w-5" />,
                sentiment: { positive: 74, neutral: 18, negative: 8 }
              },
              { 
                name: "Call Center", 
                count: 1457, 
                active: true, 
                color: "#FFBE9F",
                icon: <Target className="h-5 w-5" />,
                sentiment: { positive: 69, neutral: 22, negative: 9 }
              }
            ].map((source, index) => (
              <Card key={index} className="relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: source.color }} />
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-10 w-10 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: source.color }}>
                      {source.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                        {source.count.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">Feedback Items</div>
                    </div>
                  </div>
                  <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-3">
                    {source.name}
                  </h3>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1">
                        <Smile className="h-3 w-3 text-[#357743]" />
                        <span className="text-muted-foreground">Positive</span>
                      </span>
                      <span className="font-['Dubai:Medium',_'Dubai']" style={{ color: '#357743' }}>
                        {source.sentiment.positive}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1">
                        <Meh className="h-3 w-3 text-[#F2A200]" />
                        <span className="text-muted-foreground">Neutral</span>
                      </span>
                      <span className="font-['Dubai:Medium',_'Dubai']" style={{ color: '#F2A200' }}>
                        {source.sentiment.neutral}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1">
                        <Frown className="h-3 w-3 text-[#D83731]" />
                        <span className="text-muted-foreground">Negative</span>
                      </span>
                      <span className="font-['Dubai:Medium',_'Dubai']" style={{ color: '#D83731' }}>
                        {source.sentiment.negative}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}