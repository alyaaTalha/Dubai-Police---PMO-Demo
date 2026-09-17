import { 
  ArrowLeft,
  TrendingUp,
  Users,
  FileText,
  Target,
  Building2,
  Globe,
  Briefcase,
  Award,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import bannerImage from "figma:asset/2ceb5f3890ecf49940adbd1e2cca8cf7647ce99f.png";
import worldMapImage from "figma:asset/30613c00dcdc06e1abc3143fdb322790b908bda0.png";

interface PartnershipDashboardPageProps {
  onBack: () => void;
}

export function PartnershipDashboardPage({ onBack }: PartnershipDashboardPageProps) {
  // Mock data for Partnerships by Sector
  const partnershipsBySector = [
    { name: "Trade & Logistics", value: 35, color: "#008755" },
    { name: "Security & Border", value: 28, color: "#00B0AA" },
    { name: "Finance & Banking", value: 22, color: "#BB9956" },
    { name: "Technology & Innovation", value: 18, color: "#005844" },
    { name: "Tourism & Hospitality", value: 24, color: "#357743" }
  ];

  // Mock data for Partners by Segment
  const partnersBySegment = [
    { name: "Government", value: 35, color: "#00B0AA" },
    { name: "Private Sector", value: 48, color: "#BB9956" },
    { name: "International", value: 28, color: "#008755" },
    { name: "Academic", value: 16, color: "#005844" }
  ];

  // Mock data for Partnerships by Status
  const partnershipsByStatus = [
    { status: "Active", count: 89, color: "#357743" },
    { status: "In Progress", count: 23, color: "#F2A200" },
    { status: "Planning", count: 15, color: "#008755" },
    { status: "Under Review", count: 8, color: "#BB9956" }
  ];

  // Mock data for Partnerships by Type
  const partnershipsByType = [
    { type: "MOU", count: 89 },
    { type: "Joint Initiative", count: 43 },
    { type: "Strategic Alliance", count: 32 },
    { type: "Service Agreement", count: 28 },
    { type: "Data Sharing", count: 21 }
  ];

  // Mock data for Top Partners
  const topPartners = [
    { 
      rank: 1, 
      name: "Dubai Police", 
      segment: "Government", 
      partnerships: 12, 
      status: "Active",
      engagement: 98 
    },
    { 
      rank: 2, 
      name: "DP World", 
      segment: "Private Sector", 
      partnerships: 10, 
      status: "Active",
      engagement: 95 
    },
    { 
      rank: 3, 
      name: "Emirates NBD", 
      segment: "Private Sector", 
      partnerships: 9, 
      status: "Active",
      engagement: 92 
    },
    { 
      rank: 4, 
      name: "Abu Dhabi Customs", 
      segment: "Government", 
      partnerships: 8, 
      status: "Active",
      engagement: 90 
    },
    { 
      rank: 5, 
      name: "Dubai Airports", 
      segment: "Private Sector", 
      partnerships: 7, 
      status: "Active",
      engagement: 88 
    }
  ];

  // Mock data for Geographic Distribution
  const geographicData = [
    { region: "UAE", partners: 78, partnerships: 95 },
    { region: "GCC Countries", partners: 24, partnerships: 28 },
    { region: "Europe", partners: 12, partnerships: 15 },
    { region: "Asia", partners: 8, partnerships: 10 },
    { region: "Americas", partners: 5, partnerships: 7 }
  ];

  const totalPartnerships = partnershipsBySector.reduce((sum, item) => sum + item.value, 0);
  const totalPartners = partnersBySegment.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="h-full overflow-auto">
      <div className="space-y-3 p-3">
        {/* Banner Header */}
        <Card className="relative text-white border-none shadow-lg overflow-hidden">
          <img 
            src={bannerImage}
            alt="Dubai Customs Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#005844]/80 to-[#008755]/80" />
          <CardContent className="pt-3 pb-3 relative z-10">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="mb-2 text-white hover:text-white hover:bg-white/20 -ml-2"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Partnership Management
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-['Dubai:Medium',_sans-serif] mb-1">
                  Partnership Dashboard
                </h1>
                <p className="text-white/90 text-sm">
                  Comprehensive overview of all partnership activities and performance metrics
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overview Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="font-['Dubai:Medium',_'Dubai']">
              Partnership Overview
            </CardTitle>
            <CardDescription>
              Key metrics and performance indicators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="h-4 w-4" />
                  <span className="text-sm">Total Partners</span>
                </div>
                <div className="text-3xl font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                  127
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="h-3 w-3 text-[#357743]" />
                  <span className="text-[#357743]">+12% from last quarter</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm">Active Partnerships</span>
                </div>
                <div className="text-3xl font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                  89
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="h-3 w-3 text-[#357743]" />
                  <span className="text-[#357743]">+8% from last quarter</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Target className="h-4 w-4" />
                  <span className="text-sm">Joint Initiatives</span>
                </div>
                <div className="text-3xl font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                  43
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="h-3 w-3 text-[#357743]" />
                  <span className="text-[#357743]">+15% from last quarter</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-sm">Engagement Score</span>
                </div>
                <div className="text-3xl font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                  92%
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="h-3 w-3 text-[#357743]" />
                  <span className="text-[#357743]">+5% from last quarter</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Partnerships by Sector */}
          <Card>
            <CardHeader>
              <CardTitle className="font-['Dubai:Medium',_'Dubai']">
                Partnerships by Sector
              </CardTitle>
              <CardDescription>
                Distribution across industry sectors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie
                        data={partnershipsBySector}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                      >
                        {partnershipsBySector.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '6px',
                          fontFamily: 'Dubai, sans-serif'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3">
                  {partnershipsBySector.map((sector, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        className="h-3 w-3 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: sector.color }}
                      />
                      <div className="flex-1">
                        <div className="text-sm text-[#1f2937]">{sector.name}</div>
                        <div className="text-xs text-muted-foreground">{sector.value} partnerships</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Partners by Segment */}
          <Card>
            <CardHeader>
              <CardTitle className="font-['Dubai:Medium',_'Dubai']">
                Partners by Segment
              </CardTitle>
              <CardDescription>
                Distribution by partner type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie
                        data={partnersBySegment}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                      >
                        {partnersBySegment.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '6px',
                          fontFamily: 'Dubai, sans-serif'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3">
                  {partnersBySegment.map((segment, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        className="h-3 w-3 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: segment.color }}
                      />
                      <div className="flex-1">
                        <div className="text-sm text-[#1f2937]">{segment.name}</div>
                        <div className="text-xs text-muted-foreground">{segment.value} partners</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Partnerships by Status */}
          <Card>
            <CardHeader>
              <CardTitle className="font-['Dubai:Medium',_'Dubai']">
                Partnerships by Status
              </CardTitle>
              <CardDescription>
                Current status of all partnerships
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={partnershipsByStatus}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="status" 
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
                  <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                    {partnershipsByStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Partnerships by Type */}
          <Card>
            <CardHeader>
              <CardTitle className="font-['Dubai:Medium',_'Dubai']">
                Partnerships by Type
              </CardTitle>
              <CardDescription>
                Distribution by partnership type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={partnershipsByType} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    type="number"
                    stroke="#6b7280"
                    style={{ fontSize: '12px', fontFamily: 'Dubai, sans-serif' }}
                  />
                  <YAxis 
                    type="category"
                    dataKey="type" 
                    stroke="#6b7280"
                    style={{ fontSize: '12px', fontFamily: 'Dubai, sans-serif' }}
                    width={120}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      fontFamily: 'Dubai, sans-serif'
                    }}
                  />
                  <Bar dataKey="count" fill="#008755" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top Partners Table */}
        <Card>
          <CardHeader>
            <CardTitle className="font-['Dubai:Medium',_'Dubai']">
              Top Partners
            </CardTitle>
            <CardDescription>
              Partners ranked by number of active partnerships
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Rank</TableHead>
                  <TableHead>Partner Name</TableHead>
                  <TableHead>Segment</TableHead>
                  <TableHead className="text-center">Partnerships</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead>Engagement Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topPartners.map((partner) => (
                  <TableRow key={partner.rank}>
                    <TableCell>
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#008755]/10 text-[#008755] font-['Dubai:Medium',_'Dubai']">
                        {partner.rank}
                      </div>
                    </TableCell>
                    <TableCell className="font-['Dubai:Medium',_'Dubai']">
                      {partner.name}
                    </TableCell>
                    <TableCell>
                      <Badge
                        style={{
                          backgroundColor: 
                            partner.segment === "Government" ? "#00B0AA20" :
                            partner.segment === "Private Sector" ? "#BB995620" :
                            partner.segment === "International" ? "#00875520" : "#00584420",
                          color:
                            partner.segment === "Government" ? "#00B0AA" :
                            partner.segment === "Private Sector" ? "#BB9956" :
                            partner.segment === "International" ? "#008755" : "#005844"
                        }}
                      >
                        {partner.segment}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center font-['Dubai:Medium',_'Dubai']">
                      {partner.partnerships}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        style={{
                          backgroundColor: "#35774320",
                          color: "#357743"
                        }}
                      >
                        {partner.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={partner.engagement} className="h-2 flex-1" />
                        <span className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] min-w-[40px]">
                          {partner.engagement}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Geographic Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="font-['Dubai:Medium',_'Dubai']">
              Geographic Distribution
            </CardTitle>
            <CardDescription>
              Partners and partnerships by region
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* World Map Visualization */}
              <div className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border">
                <div className="relative w-full h-full min-h-[300px]">
                  <img 
                    src={worldMapImage}
                    alt="World Map - Geographic Distribution"
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
              </div>

              {/* Regional Breakdown */}
              <div className="space-y-4">
                {geographicData.map((region, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-[#008755]" />
                        <span className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                          {region.region}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground">
                          {region.partners} partners
                        </span>
                        <span className="text-[#008755] font-['Dubai:Medium',_'Dubai']">
                          {region.partnerships} partnerships
                        </span>
                      </div>
                    </div>
                    <Progress 
                      value={(region.partnerships / 155) * 100} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Documents & References */}
        <Card>
          <CardHeader>
            <CardTitle className="font-['Dubai:Medium',_'Dubai']">
              Recent Documents & References
            </CardTitle>
            <CardDescription>
              Latest partnership documentation and reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  title: "Q4 2024 Partnership Performance Report",
                  type: "Report",
                  date: "Jan 15, 2025",
                  status: "Published"
                },
                {
                  title: "Strategic Partnership Framework 2025-2030",
                  type: "Strategy Document",
                  date: "Jan 10, 2025",
                  status: "Published"
                },
                {
                  title: "Partnership Governance Guidelines",
                  type: "Policy",
                  date: "Dec 20, 2024",
                  status: "Published"
                },
                {
                  title: "Annual Partnership Review 2024",
                  type: "Report",
                  date: "Dec 15, 2024",
                  status: "Published"
                }
              ].map((doc, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-[#008755]/10 flex items-center justify-center text-[#008755]">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-1">
                        {doc.title}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{doc.type}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {doc.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}