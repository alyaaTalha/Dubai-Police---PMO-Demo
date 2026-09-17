import { useState } from "react";
import { 
  ArrowRight, 
  TrendingUp, 
  Target, 
  AlertTriangle, 
  CheckCircle2,
  BarChart3,
  Users,
  Building2,
  Network,
  GitCompare,
  FileText,
  Activity,
  Award,
  ChevronRight,
  Calendar,
  Clock,
  Handshake,
  Globe,
  Briefcase,
  TrendingDown
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import heroDecoration from "../../../assets/sandbox-hero-decoration.png";
import { PartnerListPage } from "./PartnerListPage";
import { PartnershipListPage } from "./PartnershipListPage";
import { PartnershipDashboardPage } from "./PartnershipDashboardPage";

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

interface PartnershipDashboardProps {
  onNavigate?: (view: 'strategy' | 'performance' | 'scorecards' | 'partnership') => void;
}

export function PartnershipDashboard({ onNavigate }: PartnershipDashboardProps) {
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [activeView, setActiveView] = useState<'dashboard' | 'partnerList' | 'partnershipList' | 'partnershipDashboard'>('dashboard');

  // Mock data for partnership trends
  const partnershipTrends = [
    { quarter: "Q1", "Government": 12, "Private Sector": 18, "International": 8, "Academic": 6 },
    { quarter: "Q2", "Government": 15, "Private Sector": 22, "International": 10, "Academic": 9 },
    { quarter: "Q3", "Government": 18, "Private Sector": 25, "International": 12, "Academic": 11 },
    { quarter: "Q4", "Government": 21, "Private Sector": 28, "International": 15, "Academic": 13 }
  ];

  // Show Partner List Page if that view is active
  if (activeView === "partnerList") {
    return <PartnerListPage onBack={() => setActiveView("dashboard")} />;
  }

  // Show Partnership List Page if that view is active
  if (activeView === "partnershipList") {
    return <PartnershipListPage onBack={() => setActiveView("dashboard")} />;
  }

  // Show Partnership Dashboard Page if that view is active
  if (activeView === "partnershipDashboard") {
    return <PartnershipDashboardPage onBack={() => setActiveView("dashboard")} />;
  }

  return (
    <div className="h-full overflow-auto">
      <div className="space-y-3 p-3">
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
                    <Handshake className="h-6 w-6" />
                  </div>
                  <div>
                    <h1 className="text-xl   mb-1">
                      Partnership Management
                    </h1>
                    <p className="text-white/90 text-sm">
                      Partnership Management Homepage
                    </p>
                  </div>
                </div>
                <p className="text-white/80 text-sm max-w-2xl">
                  Monitor and manage strategic partnerships, collaborative initiatives, and stakeholder engagement across government, private sector, and international organizations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div>
          <h2 className="text-lg font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-1.5">
            Key Partnership Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard
              title="Active Partners"
              value="127"
              change="+12%"
              isPositive={true}
              icon={<Users className="h-5 w-5" />}
            />
            <StatCard
              title="Active MOUs"
              value="89"
              change="+8%"
              isPositive={true}
              icon={<FileText className="h-5 w-5" />}
            />
            <StatCard
              title="Joint Initiatives"
              value="43"
              change="+15%"
              isPositive={true}
              icon={<Target className="h-5 w-5" />}
            />
            <StatCard
              title="Engagement Score"
              value="92%"
              change="+5%"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <QuickAccessCard
              title="Partner Organizations"
              description="View and manage partner profiles"
              icon={<Building2 className="h-6 w-6" />}
              badge="127 Active"
              onClick={() => setActiveView("partnerList")}
            />
            <QuickAccessCard
              title="Partnerships"
              description="Track memorandums of understanding"
              icon={<FileText className="h-6 w-6" />}
              badge="89 Active"
              onClick={() => setActiveView("partnershipList")}
            />
            <QuickAccessCard
              title="Partnership Dashboard"
              description="Overview of all partnership activities"
              icon={<Network className="h-6 w-6" />}
              badge="127 Total"
              onClick={() => setActiveView("partnershipDashboard")}
            />
            <QuickAccessCard
              title="Reports"
              description="Partnership analytics and insights"
              icon={<BarChart3 className="h-6 w-6" />}
              badge="8 Available"
              onClick={() => {}}
            />
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Partnership Growth Trend */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-['Dubai:Medium',_'Dubai']">
                    Partnership Growth Trend
                  </CardTitle>
                  <CardDescription>
                    Active partnerships by category - {selectedYear}
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
                <BarChart data={partnershipTrends}>
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
                  <Bar key="partnership-gov" dataKey="Government" fill="#00B0AA" />
                  <Bar key="partnership-private" dataKey="Private Sector" fill="#BB9956" />
                  <Bar key="partnership-intl" dataKey="International" fill="#008755" />
                  <Bar key="partnership-academic" dataKey="Academic" fill="#005844" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Activities & Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="font-['Dubai:Medium',_'Dubai']">
                Recent Activities & Alerts
              </CardTitle>
              <CardDescription>
                Latest partnership updates and action items
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 overflow-y-auto max-h-[220px] pr-2">
                <div className="flex items-start gap-2 mb-3">
                  <Activity className="h-4 w-4 text-[#008755] mt-0.5" />
                  <h3 className="font-['Dubai:Medium',_'Dubai'] text-sm">Recent Activities</h3>
                </div>
                <AlertItem
                  title="New MOU Signed"
                  description="Partnership agreement with Abu Dhabi Customs"
                  time="2 hours ago"
                  severity="low"
                  type="Government"
                />
                <AlertItem
                  title="Joint Initiative Launched"
                  description="Smart Trade Platform with DP World"
                  time="1 day ago"
                  severity="low"
                  type="Private"
                />
                
                <div className="flex items-start gap-2 mb-3 mt-6">
                  <AlertTriangle className="h-4 w-4 text-[#F2A200] mt-0.5" />
                  <h3 className="font-['Dubai:Medium',_'Dubai'] text-sm">Partnership Alerts</h3>
                </div>
                <AlertItem
                  title="MOU Renewal Due"
                  description="3 memorandums expiring in next 30 days"
                  time="Today"
                  severity="high"
                  type="Action Required"
                />
                <AlertItem
                  title="Engagement Drop"
                  description="Partner activity decreased by 15%"
                  time="Yesterday"
                  severity="medium"
                  type="Monitor"
                />
                <AlertItem
                  title="New Partner Request"
                  description="2 organizations pending approval"
                  time="2 days ago"
                  severity="medium"
                  type="Pending"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Partnership Categories */}
        <div>
          <h2 className="text-lg font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-1.5">
            Partnership Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { 
                name: "Government", 
                count: 35, 
                active: 32, 
                color: "#00B0AA",
                icon: <Building2 className="h-5 w-5" />
              },
              { 
                name: "Private Sector", 
                count: 48, 
                active: 45, 
                color: "#BB9956",
                icon: <Briefcase className="h-5 w-5" />
              },
              { 
                name: "International", 
                count: 28, 
                active: 26, 
                color: "#008755",
                icon: <Globe className="h-5 w-5" />
              },
              { 
                name: "Academic", 
                count: 16, 
                active: 15, 
                color: "#005844",
                icon: <Award className="h-5 w-5" />
              }
            ].map((category, index) => (
              <Card key={index} className="relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: category.color }} />
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-10 w-10 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: category.color }}>
                      {category.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                        {category.count}
                      </div>
                      <div className="text-xs text-muted-foreground">Partners</div>
                    </div>
                  </div>
                  <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-3">
                    {category.name}
                  </h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{category.count} Total</span>
                    <span className="text-green-600 font-['Dubai:Medium',_'Dubai']">
                      {category.active} Active
                    </span>
                  </div>
                  <Progress 
                    value={(category.active / category.count) * 100} 
                    className="h-1.5 mt-3"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}