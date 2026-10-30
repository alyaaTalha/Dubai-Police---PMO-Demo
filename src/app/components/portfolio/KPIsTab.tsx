import {
  Search,
  Calendar as CalendarIcon,
  Grid3x3,
  List,
  Building2,
  ArrowUp,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";

// Arabic display values for the mock KPI data (keys stay English for filtering).
const AR: Record<string, string> = {
  "Procurement from SMEs Rate": "نسبة المشتريات من المشاريع الصغيرة والمتوسطة",
  "Global Livability and safe city ranking": "التصنيف العالمي لجودة الحياة والمدينة الآمنة",
  "Budget Performance": "أداء الميزانية",
  "Compliance Index": "مؤشر الامتثال",
  "% of Role Amendment Requests Completed Within SLA": "نسبة طلبات تعديل الأدوار المنجزة ضمن اتفاقية مستوى الخدمة",
  "Percentage of customer retention": "نسبة الاحتفاظ بالمتعاملين",
  "Effectiveness in engaging with OGAs": "فاعلية التواصل مع الجهات الحكومية الأخرى",
  "Administration Affairs": "الشؤون الإدارية",
  "Director General Division": "مكتب المدير العام",
  "Statistics Department": "إدارة الإحصاء",
  "Organizational Development": "التطوير المؤسسي",
  "Client Happiness Management": "إدارة إسعاد المتعاملين",
  "External Relations Department": "إدارة العلاقات الخارجية",
  "Outcomes": "النتائج",
  "Internal Processes": "العمليات الداخلية",
  "Customer": "المتعاملون",
  "Learning & Growth": "التعلم والنمو",
  "Active": "نشط",
  "Inactive": "غير نشط",
  "Draft": "مسودة",
};

export function KPIsTab() {
  const { tr } = useLanguage();
  const ta = (value: string) => tr(value, AR[value]);
  const [view, setView] = useState<"table" | "grid">("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPerspective, setSelectedPerspective] = useState("all");

  // Mock KPI data
  const kpis = [
    {
      id: "kpi-1",
      name: "Procurement from SMEs Rate",
      code: "KPI-001",
      department: "Administration Affairs",
      perspective: "Outcomes",
      achievement: 8.00,
      target: 200.00,
      actual: 8.00,
      trend: "up",
      status: "Active"
    },
    {
      id: "kpi-2",
      name: "Global Livability and safe city ranking",
      code: "KPI-002",
      department: "Director General Division",
      perspective: "Outcomes",
      achievement: 0.00,
      target: 0.00,
      actual: 0,
      trend: "up",
      status: "Active"
    },
    {
      id: "kpi-3",
      name: "Budget Performance",
      code: "KPI-003",
      department: "Statistics Department",
      perspective: "Outcomes",
      achievement: 0.00,
      target: 123.00,
      actual: 0,
      trend: "up",
      status: "Active"
    },
    {
      id: "kpi-4",
      name: "Compliance Index",
      code: "KPI-004",
      department: "Statistics Department",
      perspective: "Internal Processes",
      achievement: 0.00,
      target: 111.00,
      actual: 0,
      trend: "up",
      status: "Active"
    },
    {
      id: "kpi-5",
      name: "% of Role Amendment Requests Completed Within SLA",
      code: "KPI-005",
      department: "Organizational Development",
      perspective: "Internal Processes",
      achievement: 0.00,
      target: 100.00,
      actual: 0,
      trend: "up",
      status: "Active"
    },
    {
      id: "kpi-6",
      name: "Percentage of customer retention",
      code: "KPI-006",
      department: "Client Happiness Management",
      perspective: "Outcomes",
      achievement: 0.00,
      target: 100.00,
      actual: 0,
      trend: "up",
      status: "Active"
    },
    {
      id: "kpi-7",
      name: "Effectiveness in engaging with OGAs",
      code: "KPI-007",
      department: "External Relations Department",
      perspective: "Outcomes",
      achievement: 0.00,
      target: 100.00,
      actual: 0,
      trend: "up",
      status: "Active"
    }
  ];

  // Filter KPIs based on search and filters
  const filteredKpis = kpis.filter(kpi => {
    const matchesSearch = searchQuery === "" || 
      kpi.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kpi.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kpi.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (AR[kpi.name] ?? "").includes(searchQuery) ||
      (AR[kpi.department] ?? "").includes(searchQuery);
    
    const matchesBusinessUnit = selectedBusinessUnit === "all" || kpi.department === selectedBusinessUnit;
    const matchesStatus = selectedStatus === "all" || kpi.status === selectedStatus;
    const matchesPerspective = selectedPerspective === "all" || kpi.perspective === selectedPerspective;
    
    return matchesSearch && matchesBusinessUnit && matchesStatus && matchesPerspective;
  });

  // Get color based on achievement percentage
  const getAchievementColor = (value: number) => {
    if (value >= 100) return '#008755'; // Blue for 100%+
    if (value >= 80) return '#357743'; // Green for 80-100%
    if (value >= 40) return '#F2A200'; // Yellow for 40-80%
    return '#D83731'; // Red for 0-40%
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters Bar */}
      <Card className="border-[#008755]/20">
        <CardContent className="pt-4 pb-4">
          <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 w-full lg:max-w-md">
              <Search className="absolute start-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={tr("Search KPIs by Name, Code or Department...", "ابحث عن المؤشرات بالاسم أو الرمز أو الإدارة...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ps-9 bg-background"
              />
            </div>

            {/* Filters and View Toggle */}
            <div className="flex flex-wrap gap-2 items-center w-full lg:w-auto">
              {/* Business Unit Filter */}
              <Select value={selectedBusinessUnit} onValueChange={setSelectedBusinessUnit}>
                <SelectTrigger className="w-[180px] bg-background">
                  <SelectValue placeholder={tr("Business Unit", "وحدة العمل")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{tr("All Business Units", "جميع وحدات العمل")}</SelectItem>
                  <SelectItem value="Administration Affairs">{ta("Administration Affairs")}</SelectItem>
                  <SelectItem value="Statistics Department">{ta("Statistics Department")}</SelectItem>
                  <SelectItem value="Organizational Development">{ta("Organizational Development")}</SelectItem>
                  <SelectItem value="Client Happiness Management">{ta("Client Happiness Management")}</SelectItem>
                  <SelectItem value="External Relations Department">{ta("External Relations Department")}</SelectItem>
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[150px] bg-background">
                  <SelectValue placeholder={tr("Status", "الحالة")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{tr("All Statuses", "جميع الحالات")}</SelectItem>
                  <SelectItem value="Active">{ta("Active")}</SelectItem>
                  <SelectItem value="Inactive">{ta("Inactive")}</SelectItem>
                  <SelectItem value="Draft">{ta("Draft")}</SelectItem>
                </SelectContent>
              </Select>

              {/* Perspective Filter */}
              <Select value={selectedPerspective} onValueChange={setSelectedPerspective}>
                <SelectTrigger className="w-[180px] bg-background">
                  <SelectValue placeholder={tr("All Perspectives", "جميع المحاور")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{tr("All Perspectives", "جميع المحاور")}</SelectItem>
                  <SelectItem value="Outcomes">{ta("Outcomes")}</SelectItem>
                  <SelectItem value="Internal Processes">{ta("Internal Processes")}</SelectItem>
                  <SelectItem value="Customer">{ta("Customer")}</SelectItem>
                  <SelectItem value="Learning & Growth">{ta("Learning & Growth")}</SelectItem>
                </SelectContent>
              </Select>

              {/* Date Picker Placeholder */}
              <Button variant="outline" size="default" className="gap-2">
                <CalendarIcon className="h-4 w-4" />
                {tr("dd/mm/yyyy", "يوم/شهر/سنة")}
              </Button>

              {/* View Toggle Buttons */}
              <div className="flex border rounded-md overflow-hidden">
                <Button
                  variant={view === "table" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setView("table")}
                  className={view === "table" ? "bg-[#008755] hover:bg-[#006644]" : ""}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={view === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setView("grid")}
                  className={view === "grid" ? "bg-[#008755] hover:bg-[#006644]" : ""}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-3 text-sm text-[#008755]">
            {tr(
              `Showing 1 - ${filteredKpis.length} of ${kpis.length} KPIs`,
              `عرض 1 - ${filteredKpis.length} من أصل ${kpis.length} مؤشرات`
            )}
          </div>
        </CardContent>
      </Card>

      {/* Table View */}
      {view === "table" && (
        <Card className="border-[#008755]/20">
          <CardContent className="pt-4 pb-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="text-start py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("KPI Name", "اسم المؤشر")}</th>
                    <th className="text-start py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Department", "الإدارة")}</th>
                    <th className="text-start py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Perspective", "المحور")}</th>
                    <th className="text-start py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground min-w-[250px]">{tr("Achievement", "نسبة الإنجاز")}</th>
                    <th className="text-start py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Target", "المستهدف")}</th>
                    <th className="text-start py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Actual", "الفعلي")}</th>
                    <th className="text-start py-3 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">{tr("Trend", "الاتجاه")}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredKpis.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center p-6 text-muted-foreground">
                        {tr("No KPIs found matching your criteria.", "لا توجد مؤشرات مطابقة لمعايير البحث.")}
                      </td>
                    </tr>
                  ) : (
                    filteredKpis.map((kpi) => (
                      <tr key={kpi.id} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-3 text-sm text-[#1f2937]">{ta(kpi.name)}</td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2 text-sm text-[#1f2937]">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            {ta(kpi.department)}
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <Badge 
                            variant="outline" 
                            className="text-xs bg-[#008755]/10 text-[#008755] border-[#008755]/20"
                          >
                            {ta(kpi.perspective)}
                          </Badge>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-start gap-2">
                            <div className="flex-1">
                              {/* Achievement percentage text */}
                              <div className="text-xs font-['Dubai:Medium',_'Dubai'] mb-1" style={{ color: getAchievementColor(kpi.achievement) }}>
                                {kpi.achievement.toFixed(2)}%
                              </div>
                              {/* Horizontal gauge */}
                              <div className="relative w-full h-6 bg-gray-100 rounded-sm overflow-hidden">
                                {/* Scale labels */}
                                <div className="absolute inset-0 flex items-center justify-between px-1 text-[10px] text-gray-500 z-10">
                                  <span>0</span>
                                  <span className="ms-auto">140%</span>
                                </div>
                                {/* Colored segments background - full width */}
                                <div className="absolute inset-0 flex">
                                  {/* Red segment: 0-40% */}
                                  <div className="h-full" style={{ width: '28.57%', backgroundColor: '#D8373150' }}></div>
                                  {/* Yellow segment: 40-80% */}
                                  <div className="h-full" style={{ width: '28.57%', backgroundColor: '#F2A20050' }}></div>
                                  {/* Green segment: 80-100% */}
                                  <div className="h-full" style={{ width: '14.29%', backgroundColor: '#35774350' }}></div>
                                  {/* Blue segment: 100-120% */}
                                  <div className="h-full" style={{ width: '14.29%', backgroundColor: '#00875550' }}></div>
                                  {/* Light blue segment: 120-140% */}
                                  <div className="h-full" style={{ width: '14.29%', backgroundColor: '#00875530' }}></div>
                                </div>
                                {/* Achievement marker/indicator */}
                                <div 
                                  className="absolute top-0 bottom-0 w-1 z-20" 
                                  style={{ 
                                    insetInlineStart: `${Math.min(kpi.achievement / 140 * 100, 100)}%`,
                                    backgroundColor: getAchievementColor(kpi.achievement),
                                    boxShadow: '0 0 4px rgba(0,0,0,0.3)'
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-sm text-[#1f2937]">{kpi.target.toFixed(2)} %</td>
                        <td className="py-3 px-3 text-sm text-[#008755] font-['Dubai:Medium',_'Dubai']">{kpi.actual.toFixed(2)} %</td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1 text-xs text-[#357743]">
                            <ArrowUp className="h-3 w-3" />
                            <span className="font-['Dubai:Medium',_'Dubai']">{tr("Up", "صعود")}</span>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Grid View */}
      {view === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredKpis.length === 0 ? (
            <div className="col-span-full text-center p-12 text-muted-foreground">
              {tr("No KPIs found matching your criteria.", "لا توجد مؤشرات مطابقة لمعايير البحث.")}
            </div>
          ) : (
            filteredKpis.map((kpi) => (
              <Card key={kpi.id} className="border-[#008755]/20 hover:shadow-md transition-shadow">
                <CardContent className="pt-4 pb-4">
                  {/* KPI Name */}
                  <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-3 text-sm min-h-[40px]">
                    {ta(kpi.name)}
                  </h3>

                  {/* Department and Perspective */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Building2 className="h-3 w-3" />
                      <span>{ta(kpi.department)}</span>
                    </div>
                    <Badge 
                      variant="outline" 
                      className="text-xs bg-[#008755]/10 text-[#008755] border-[#008755]/20"
                    >
                      {ta(kpi.perspective)}
                    </Badge>
                  </div>

                  {/* Achievement Gauge */}
                  <div className="mb-3">
                    <div className="text-xs text-muted-foreground mb-1">{tr("Achievement", "نسبة الإنجاز")}</div>
                    <div className="flex items-start gap-2">
                      <div className="flex-1">
                        {/* Achievement percentage text */}
                        <div className="text-xs font-['Dubai:Medium',_'Dubai'] mb-1" style={{ color: getAchievementColor(kpi.achievement) }}>
                          {kpi.achievement.toFixed(2)}%
                        </div>
                        {/* Horizontal gauge */}
                        <div className="relative w-full h-6 bg-gray-100 rounded-sm overflow-hidden">
                          {/* Scale labels */}
                          <div className="absolute inset-0 flex items-center justify-between px-1 text-[10px] text-gray-500 z-10">
                            <span>0</span>
                            <span className="ms-auto">140%</span>
                          </div>
                          {/* Colored segments background - full width */}
                          <div className="absolute inset-0 flex">
                            {/* Red segment: 0-40% */}
                            <div className="h-full" style={{ width: '28.57%', backgroundColor: '#D8373150' }}></div>
                            {/* Yellow segment: 40-80% */}
                            <div className="h-full" style={{ width: '28.57%', backgroundColor: '#F2A20050' }}></div>
                            {/* Green segment: 80-100% */}
                            <div className="h-full" style={{ width: '14.29%', backgroundColor: '#35774350' }}></div>
                            {/* Blue segment: 100-120% */}
                            <div className="h-full" style={{ width: '14.29%', backgroundColor: '#00875550' }}></div>
                            {/* Light blue segment: 120-140% */}
                            <div className="h-full" style={{ width: '14.29%', backgroundColor: '#00875530' }}></div>
                          </div>
                          {/* Achievement marker/indicator */}
                          <div 
                            className="absolute top-0 bottom-0 w-1 z-20" 
                            style={{ 
                              insetInlineStart: `${Math.min(kpi.achievement / 140 * 100, 100)}%`,
                              backgroundColor: getAchievementColor(kpi.achievement),
                              boxShadow: '0 0 4px rgba(0,0,0,0.3)'
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Target, Actual, Trend */}
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">{tr("Target", "المستهدف")}</div>
                      <div className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{kpi.target.toFixed(2)}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">{tr("Actual", "الفعلي")}</div>
                      <div className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#008755]">{kpi.actual.toFixed(2)}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">{tr("Trend", "الاتجاه")}</div>
                      <div className="flex items-center gap-1 text-xs text-[#357743]">
                        <ArrowUp className="h-3 w-3" />
                        <span className="font-['Dubai:Medium',_'Dubai']">{tr("Up", "صعود")}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
