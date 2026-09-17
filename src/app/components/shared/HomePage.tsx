import { useState } from "react";
import { 
  Award, 
  ArrowRight, 
  BarChart3, 
  Target,
  Users,
  TrendingUp,
  FileText,
  Activity,
  Bell,
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Lightbulb,
  ChevronRight,
  ArrowUpDown,
  Briefcase
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import bannerImage from "figma:asset/2ceb5f3890ecf49940adbd1e2cca8cf7647ce99f.png";

interface HomePageProps {
  onNavigate: (view: 'strategy' | 'performance' | 'scorecards' | 'home' | 'partnership' | 'voc' | 'portfolio' | 'ideas-platform' | 'sandbox-platform') => void;
}

// Mock tasks data
const tasks = [
  { id: 1, title: 'Review Q4 Performance Reports', status: 'in-progress', priority: 'high', dueDate: '2025-10-28' },
  { id: 2, title: 'Update Strategic Objectives for 2026', status: 'open', priority: 'medium', dueDate: '2025-10-30' },
  { id: 3, title: 'Approve Department KPIs', status: 'completed', priority: 'high', dueDate: '2025-10-25' },
  { id: 4, title: 'Conduct Mid-Year Review Meeting', status: 'open', priority: 'low', dueDate: '2025-11-05' },
];

// Mock announcements data
const announcements = [
  {
    id: 1,
    title: 'Q4 Performance Evaluation Cycle Now Open',
    description: 'The deadline for Excellence in Public Service nominations has been extended to March 15th.',
    timestamp: '2 days ago',
    badges: []
  },
  {
    id: 2,
    title: 'New Strategic Initiative Added: "Smart Trade 2030"',
    description: 'A new corporate initiative has been added under the STG Dashboard for Dubai Customs innovation roadmap.',
    timestamp: '1 week ago',
    badges: []
  },
  {
    id: 3,
    title: 'Policy Update — KPI Review Process',
    description: 'The process for KPI approval and quarterly reviews has been updated to enhance governance.',
    timestamp: '3 days ago',
    badges: [
      { label: 'Policy', variant: 'default' as const },
      { label: 'Guidelines', variant: 'secondary' as const }
    ]
  }
];

// Mock recent activity data
const recentActivity = [
  {
    id: 1,
    text: 'Target completion adjusted from Q2 2026 → Q1 2026, reflecting improved project progress',
    timestamp: '5 hours ago',
    type: 'update'
  },
  {
    id: 2,
    text: 'The Performance Management System now displays live progress indicators for departmental KPIs',
    timestamp: '1 day ago',
    type: 'info'
  },
  {
    id: 3,
    text: 'Latest performance results show exceptional alignment with strategic goals, marking a +7% improvement',
    timestamp: '2 days ago',
    type: 'success'
  }
];

export function HomePage({ onNavigate }: HomePageProps) {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [prioritySort, setPrioritySort] = useState<'asc' | 'desc' | null>(null);
  const [dateSort, setDateSort] = useState<'asc' | 'desc' | null>(null);
  const [frequency, setFrequency] = useState<string>('quarterly');
  const [yearFrom, setYearFrom] = useState<number>(2025);
  const [yearTo, setYearTo] = useState<number>(2025);

  // Filter and sort tasks
  const getFilteredAndSortedTasks = () => {
    let filteredTasks = [...tasks];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.status === statusFilter);
    }
    
    // Apply priority sort
    if (prioritySort) {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      filteredTasks.sort((a, b) => {
        const aVal = priorityOrder[a.priority];
        const bVal = priorityOrder[b.priority];
        return prioritySort === 'asc' ? aVal - bVal : bVal - aVal;
      });
    }
    
    // Apply date sort
    if (dateSort) {
      filteredTasks.sort((a, b) => {
        const aDate = new Date(a.dueDate).getTime();
        const bDate = new Date(b.dueDate).getTime();
        return dateSort === 'asc' ? aDate - bDate : bDate - aDate;
      });
    }
    
    return filteredTasks;
  };

  const filteredTasks = getFilteredAndSortedTasks();

  // Generate performance data based on frequency and year range
  const getPerformanceData = () => {
    const divisions = ["Customs Development", "Customs Inspection", "Finance and Administrative affairs", "Human Resources", "Director General", "Policy and Legislation"];
    
    if (frequency === 'annual') {
      // Generate annual data
      const data = [];
      for (let year = yearFrom; year <= yearTo; year++) {
        const yearData: any = { period: year.toString() };
        divisions.forEach(division => {
          yearData[division] = Math.floor(Math.random() * 20) + 75; // Random value between 75-95
        });
        data.push(yearData);
      }
      return data;
    } else if (frequency === 'quarterly') {
      // Generate quarterly data for the range
      const data = [];
      for (let year = yearFrom; year <= yearTo; year++) {
        for (let q = 1; q <= 4; q++) {
          const quarterData: any = { period: `Q${q} ${year}` };
          divisions.forEach(division => {
            quarterData[division] = Math.floor(Math.random() * 20) + 75;
          });
          data.push(quarterData);
        }
      }
      return data;
    } else if (frequency === 'monthly') {
      // Generate monthly data for the range (last 6 months to keep chart readable)
      const data = [];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      for (let year = yearFrom; year <= yearTo; year++) {
        months.forEach((month, idx) => {
          const monthData: any = { period: `${month} ${year}` };
          divisions.forEach(division => {
            monthData[division] = Math.floor(Math.random() * 20) + 75;
          });
          data.push(monthData);
        });
      }
      // Return only last 12 months for readability
      return data.slice(-12);
    }
    return [];
  };

  const performanceData = getPerformanceData();

  return (
    <div className="h-full overflow-hidden flex">
      {/* Main Content Area - Scrollable */}
      <div className="flex-1 overflow-auto">
        <div className="space-y-3 p-3 pr-0">
        {/* Hero Banner with CTA */}
        <Card className="relative text-white border-none shadow-lg overflow-hidden">
          <img 
            src={bannerImage}
            alt="Dubai Customs Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#005844]/80 to-[#008755]/80" />
          <CardContent className="pt-3 pb-3 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="h-10 w-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h1 className="text-xl font-['Dubai:Medium',_sans-serif] mb-0.5">
                      Good Morning, User
                    </h1>
                    <p className="text-white/90 text-sm">
                      Strategy and Performance Management System
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div 
                    className="flex flex-col items-center gap-1.5 cursor-pointer group"
                    onClick={() => onNavigate('performance')}
                  >
                    <div className="relative size-[40px]">
                      <div className="absolute inset-0 rounded-full bg-white" />
                      <div className="absolute inset-[1px] rounded-full bg-[#005844] flex items-center justify-center group-hover:bg-[#008755] transition-colors">
                        <BarChart3 className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <p className="text-xs text-white font-[Dubai]">Performance</p>
                  </div>

                  <div 
                    className="flex flex-col items-center gap-1.5 cursor-pointer group"
                    onClick={() => onNavigate('strategy')}
                  >
                    <div className="relative size-[40px]">
                      <div className="absolute inset-0 rounded-full bg-white" />
                      <div className="absolute inset-[1px] rounded-full bg-[#005844] flex items-center justify-center group-hover:bg-[#008755] transition-colors">
                        <Target className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <p className="text-xs text-white font-[Dubai]">Strategy</p>
                  </div>

                  <div 
                    className="flex flex-col items-center gap-1.5 cursor-pointer group"
                    onClick={() => onNavigate('partnership')}
                  >
                    <div className="relative size-[40px]">
                      <div className="absolute inset-0 rounded-full bg-white" />
                      <div className="absolute inset-[1px] rounded-full bg-[#005844] flex items-center justify-center group-hover:bg-[#008755] transition-colors">
                        <Users className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <p className="text-xs text-white font-[Dubai]">Partnership</p>
                  </div>

                  <div 
                    className="flex flex-col items-center gap-1.5 cursor-pointer group"
                    onClick={() => onNavigate('voc')}
                  >
                    <div className="relative size-[40px]">
                      <div className="absolute inset-0 rounded-full bg-white" />
                      <div className="absolute inset-[1px] rounded-full bg-[#005844] flex items-center justify-center group-hover:bg-[#008755] transition-colors">
                        <FileText className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <p className="text-xs text-white font-[Dubai]">VOC</p>
                  </div>

                  <div
                    className="flex flex-col items-center gap-1.5 cursor-pointer group"
                    onClick={() => onNavigate('sandbox-platform')}
                  >
                    <div className="relative size-[40px]">
                      <div className="absolute inset-0 rounded-full bg-white" />
                      <div className="absolute inset-[1px] rounded-full bg-[#005844] flex items-center justify-center group-hover:bg-[#008755] transition-colors">
                        <Briefcase className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <p className="text-xs text-white font-[Dubai]">Sandbox</p>
                  </div>

                  <div
                    className="flex flex-col items-center gap-1.5 cursor-pointer group"
                    onClick={() => onNavigate('ideas-platform')}
                  >
                    <div className="relative size-[40px]">
                      <div className="absolute inset-0 rounded-full bg-white" />
                      <div className="absolute inset-[1px] rounded-full bg-[#26D07C] flex items-center justify-center group-hover:bg-[#008755] transition-colors">
                        <Lightbulb className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <p className="text-xs text-white font-[Dubai]">Ideas</p>
                  </div>
                </div>
              </div>
              <div className="hidden xl:block">
                <div className="relative h-32 w-32">
                  <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-['Dubai:Medium',_sans-serif] mb-0.5">2025</div>
                      <div className="text-xs text-white/80">Active Year</div>
                      <div className="text-[10px] text-white/60">Q1 - Q4</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Access Cards */}
        <div>
          <h2 className="text-lg font-['Dubai:Medium',_sans-serif] text-[#1f2937] mb-1.5 font-[Dubai] font-normal">
            Quick Access
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <Card 
              className="cursor-pointer transition-all hover:shadow-md hover:border-[#008755]/50"
              onClick={() => onNavigate('performance')}
            >
              <CardContent className="pt-3 pb-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#008755] to-[#008755]/80 flex items-center justify-center text-white mb-2">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <h3 className="font-['Dubai:Medium',_sans-serif] text-[#1f2937] mb-1 text-sm font-[Dubai]">
                  Performance Dashboard
                </h3>
                <p className="text-xs text-muted-foreground mb-2">
                  Monitor KPIs and track organizational performance
                </p>
                <div className="flex items-center text-[#008755] text-xs font-['Dubai:Medium',_sans-serif]">
                  <span>Open Dashboard</span>
                  <ArrowRight className="h-3 w-3 ml-1" />
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer transition-all hover:shadow-md hover:border-[#008755]/50"
              onClick={() => onNavigate('scorecards')}
            >
              <CardContent className="pt-3 pb-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#008755] to-[#008755]/80 flex items-center justify-center text-white mb-2">
                  <Target className="h-5 w-5" />
                </div>
                <h3 className="font-['Dubai:Medium',_sans-serif] text-[#1f2937] mb-1 text-sm font-[Dubai]">
                  Scorecards
                </h3>
                <p className="text-xs text-muted-foreground mb-2">
                  View all organizational scorecards and metrics
                </p>
                <div className="flex items-center text-[#008755] text-xs font-['Dubai:Medium',_sans-serif]">
                  <span>View Scorecards</span>
                  <ArrowRight className="h-3 w-3 ml-1" />
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer transition-all hover:shadow-md hover:border-[#008755]/50"
              onClick={() => onNavigate('strategy')}
            >
              <CardContent className="pt-3 pb-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#008755] to-[#008755]/80 flex items-center justify-center text-white mb-2">
                  <Activity className="h-5 w-5" />
                </div>
                <h3 className="font-['Dubai:Medium',_sans-serif] text-[#1f2937] mb-1 text-sm font-[Dubai]">
                  Strategy
                </h3>
                <p className="text-xs text-muted-foreground mb-2">
                  Strategic planning and alignment tools
                </p>
                <div className="flex items-center text-[#008755] text-xs font-['Dubai:Medium',_sans-serif]">
                  <span>View Strategy</span>
                  <ArrowRight className="h-3 w-3 ml-1" />
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer transition-all hover:shadow-md hover:border-[#008755]/50">
              <CardContent className="pt-3 pb-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#008755] to-[#008755]/80 flex items-center justify-center text-white mb-2">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="font-['Dubai:Medium',_sans-serif] text-[#1f2937] mb-1 text-sm font-[Dubai]">
                  Reports
                </h3>
                <p className="text-xs text-muted-foreground mb-2">
                  Generate and export performance reports
                </p>
                <div className="flex items-center text-[#008755] text-xs font-['Dubai:Medium',_sans-serif]">
                  <span>View Reports</span>
                  <ArrowRight className="h-3 w-3 ml-1" />
                </div>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer transition-all hover:shadow-md hover:border-[#26D07C]/50"
              onClick={() => onNavigate('ideas-platform')}
            >
              <CardContent className="pt-3 pb-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#26D07C] to-[#008755] flex items-center justify-center text-white mb-2">
                  <Lightbulb className="h-5 w-5" />
                </div>
                <h3 className="font-['Dubai:Medium',_sans-serif] text-[#1f2937] mb-1 text-sm font-[Dubai]">
                  Ideas Platform
                </h3>
                <p className="text-xs text-muted-foreground mb-2">
                  Submit, review and track innovation ideas
                </p>
                <div className="flex items-center text-[#26D07C] text-xs font-['Dubai:Medium',_sans-serif]">
                  <span>Open Platform</span>
                  <ArrowRight className="h-3 w-3 ml-1" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Performance Trend */}
        <div className="pr-6">
          <h2 className="text-lg font-['Dubai:Medium',_sans-serif] text-[#1f2937] mb-1.5 font-[Dubai]">
            Performance Trend
          </h2>
          <Card>
            <CardHeader>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-['Dubai:Medium',_sans-serif] font-[Dubai]">
                      Division Performance Trends
                    </CardTitle>
                    <CardDescription>
                      Performance score trends by division - {frequency.charAt(0).toUpperCase() + frequency.slice(1)} view from {yearFrom} to {yearTo}
                    </CardDescription>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground font-[Dubai]">Frequency:</span>
                    <Select value={frequency} onValueChange={setFrequency}>
                      <SelectTrigger className="w-[120px] h-8">
                        <SelectValue placeholder="Frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="annual">Annual</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground font-[Dubai]">Year From:</span>
                    <Select value={yearFrom.toString()} onValueChange={(value) => {
                      const newFrom = Number(value);
                      setYearFrom(newFrom);
                      if (newFrom > yearTo) setYearTo(newFrom);
                    }}>
                      <SelectTrigger className="w-[100px] h-8">
                        <SelectValue placeholder="From" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2020">2020</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground font-[Dubai]">Year To:</span>
                    <Select value={yearTo.toString()} onValueChange={(value) => {
                      const newTo = Number(value);
                      setYearTo(newTo);
                      if (newTo < yearFrom) setYearFrom(newTo);
                    }}>
                      <SelectTrigger className="w-[100px] h-8">
                        <SelectValue placeholder="To" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2020">2020</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart
                  data={performanceData}
                  margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="period" 
                    stroke="#6b7280"
                    style={{ fontSize: '12px', fontFamily: 'Dubai, sans-serif' }}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    domain={[60, 100]}
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
                  <Line key="customs-dev" type="monotone" dataKey="Customs Development" stroke="#00B0AA" strokeWidth={2} dot={{ r: 4 }} />
                  <Line key="customs-inspect" type="monotone" dataKey="Customs Inspection" stroke="#BB9956" strokeWidth={2} dot={{ r: 4 }} />
                  <Line key="finance-admin" type="monotone" dataKey="Finance and Administrative affairs" stroke="#008755" strokeWidth={2} dot={{ r: 4 }} />
                  <Line key="hr" type="monotone" dataKey="Human Resources" stroke="#005844" strokeWidth={2} dot={{ r: 4 }} />
                  <Line key="director-gen" type="monotone" dataKey="Director General" stroke="#115E67" strokeWidth={2} dot={{ r: 4 }} />
                  <Line key="policy-leg" type="monotone" dataKey="Policy and Legislation" stroke="#FFBE9F" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Task List */}
        <div className="pr-6">
          <div className="flex items-center justify-between mb-1.5">
            <h2 className="text-lg font-['Dubai:Medium'] text-[#1f2937] font-[Dubai]">
              Task List
            </h2>
            <Button variant="ghost" size="sm" className="text-[#008755]">
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground font-[Dubai]">Filter:</span>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[130px] h-8">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground font-[Dubai]">Sort:</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8"
                    onClick={() => {
                      if (prioritySort === null) {
                        setPrioritySort('desc');
                        setDateSort(null);
                      } else if (prioritySort === 'desc') {
                        setPrioritySort('asc');
                      } else {
                        setPrioritySort(null);
                      }
                    }}
                  >
                    Priority
                    <ArrowUpDown className="h-3 w-3 ml-1" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8"
                    onClick={() => {
                      if (dateSort === null) {
                        setDateSort('asc');
                        setPrioritySort(null);
                      } else if (dateSort === 'asc') {
                        setDateSort('desc');
                      } else {
                        setDateSort(null);
                      }
                    }}
                  >
                    Date
                    <ArrowUpDown className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                {filteredTasks.map((task) => (
                  <div 
                    key={task.id} 
                    className={`flex items-start pb-3 border-b last:border-b-0 last:pb-0 ${
                      task.status === 'completed' ? 'opacity-60' : ''
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className={`font-['Dubai:Medium',_'Dubai'] ${
                          task.status === 'completed' ? 'text-muted-foreground' : 'text-[#1f2937]'
                        }`}>
                          {task.title}
                        </p>
                        <div className="flex gap-2">
                          <Badge 
                            style={{
                              backgroundColor: 
                                task.status === 'completed' ? '#35774320' :
                                task.status === 'in-progress' ? '#00875520' : '#F2A20020',
                              color: 
                                task.status === 'completed' ? '#357743' :
                                task.status === 'in-progress' ? '#008755' : '#F2A200'
                            }}
                            className="min-w-[90px] justify-center"
                          >
                            {task.status === 'in-progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                          </Badge>
                          <Badge 
                            style={{
                              backgroundColor: task.priority === 'high' ? '#D8373120' : 
                                task.priority === 'medium' ? '#F2A20020' : '#35774320',
                              color: task.priority === 'high' ? '#D83731' : 
                                task.priority === 'medium' ? '#F2A200' : '#357743'
                            }}
                            className="min-w-[80px] justify-center"
                          >
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>Due: {task.dueDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights Section */}
        <div className="pr-6">
          <h2 className="text-lg font-['Dubai:Medium',_sans-serif] text-[#1f2937] mb-1.5 font-[Dubai]">
            Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Performance Insights */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-[#008755]/10 flex items-center justify-center">
                    <Lightbulb className="h-4 w-4 text-[#008755]" />
                  </div>
                  <CardTitle className="text-base">Performance Insights</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <ChevronRight className="h-4 w-4 text-[#008755] mt-0.5 flex-shrink-0" />
                    <span>Overall performance has improved by 12% compared to last quarter</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <ChevronRight className="h-4 w-4 text-[#008755] mt-0.5 flex-shrink-0" />
                    <span>Customer satisfaction metrics exceeded targets by 7%</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <ChevronRight className="h-4 w-4 text-[#008755] mt-0.5 flex-shrink-0" />
                    <span>3 departments require attention for below-target KPIs</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Strategy Insights */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-[#008755]/10 flex items-center justify-center">
                    <Lightbulb className="h-4 w-4 text-[#008755]" />
                  </div>
                  <CardTitle className="text-base">Strategy Insights</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <ChevronRight className="h-4 w-4 text-[#008755] mt-0.5 flex-shrink-0" />
                    <span>Strategic alignment improved across all divisions</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <ChevronRight className="h-4 w-4 text-[#008755] mt-0.5 flex-shrink-0" />
                    <span>Innovation initiatives show 85% completion rate</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <ChevronRight className="h-4 w-4 text-[#008755] mt-0.5 flex-shrink-0" />
                    <span>2 new strategic objectives added for Q1 2026</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>

      {/* Fixed Right Sidebar */}
      <div className="w-80 border-l bg-gray-50 overflow-auto flex-shrink-0">
        <div className="p-6 space-y-8 bg-white">
          {/* Announcements */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-5 w-5 text-[#008755]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
                </svg>
              </div>
              <h3 className="font-['Dubai:Medium',_sans-serif] text-[#008755] font-[Dubai]">
                Announcements
              </h3>
            </div>
            <div className="space-y-2">
              {announcements.map((announcement) => (
                <Card key={announcement.id} className="border border-gray-200 bg-white rounded-xl">
                  <CardContent className="p-3">
                    <h4 className="font-['Dubai:Medium',_sans-serif] text-sm text-[#1a1a1a] mb-1.5 leading-snug font-[Dubai]">
                      {announcement.title}
                    </h4>
                    <p className="text-xs text-[#666666] mb-2 leading-relaxed">
                      {announcement.description}
                    </p>
                    {announcement.badges.length > 0 && (
                      <div className="flex gap-2 mb-2">
                        {announcement.badges.map((badge, idx) => (
                          <Badge 
                            key={idx} 
                            className={`text-[10px] px-2 py-0.5 rounded ${
                              badge.label === 'Policy' 
                                ? 'bg-[#16a8b8] text-white hover:bg-[#16a8b8]' 
                                : 'bg-[#ffb088] text-white hover:bg-[#ffb088]'
                            }`}
                          >
                            {badge.label}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 text-[11px] text-[#999999]">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                        <line x1="16" x2="16" y1="2" y2="6"/>
                        <line x1="8" x2="8" y1="2" y2="6"/>
                        <line x1="3" x2="21" y1="10" y2="10"/>
                      </svg>
                      <span>{announcement.timestamp}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-5 w-5 text-[#008755]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
                </svg>
              </div>
              <h3 className="font-['Dubai:Medium',_sans-serif] text-[#008755] font-[Dubai]">
                Recent Activity
              </h3>
            </div>
            <div className="bg-[#f5f8fa] rounded-xl p-4">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-[#008755]">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                        <polyline points="14 2 14 8 20 8"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-[#1a1a1a] mb-1.5 leading-relaxed">
                        {activity.text}
                      </p>
                      <div className="flex items-center gap-1.5 text-[11px] text-[#999999]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                          <circle cx="12" cy="12" r="10"/>
                          <polyline points="12 6 12 12 16 14"/>
                        </svg>
                        <span>{activity.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}