import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface PerformanceFiltersProps {
  year: string;
  quarter: string;
  department: string;
  kpiCategory: string;
  onYearChange: (value: string) => void;
  onQuarterChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onKpiCategoryChange: (value: string) => void;
}

export function PerformanceFilters({
  year,
  quarter,
  department,
  kpiCategory,
  onYearChange,
  onQuarterChange,
  onDepartmentChange,
  onKpiCategoryChange,
}: PerformanceFiltersProps) {
  return (
    <div className="flex gap-4 items-center">
      <div className="flex-1">
        <label className="block mb-1.5 font-['Dubai:Regular',_sans-serif] text-[#4a5565]">Year</label>
        <Select value={year} onValueChange={onYearChange}>
          <SelectTrigger className="w-full bg-white border-[#e0e0e0] font-['Dubai:Regular',_sans-serif]">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2025">2025</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1">
        <label className="block mb-1.5 font-['Dubai:Regular',_sans-serif] text-[#4a5565]">Quarter</label>
        <Select value={quarter} onValueChange={onQuarterChange}>
          <SelectTrigger className="w-full bg-white border-[#e0e0e0] font-['Dubai:Regular',_sans-serif]">
            <SelectValue placeholder="Select Quarter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Q1">Q1 2025</SelectItem>
            <SelectItem value="Q2">Q2 2025</SelectItem>
            <SelectItem value="Q3">Q3 2025</SelectItem>
            <SelectItem value="Q4">Q4 2025</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1">
        <label className="block mb-1.5 font-['Dubai:Regular',_sans-serif] text-[#4a5565]">Department</label>
        <Select value={department} onValueChange={onDepartmentChange}>
          <SelectTrigger className="w-full bg-white border-[#e0e0e0] font-['Dubai:Regular',_sans-serif]">
            <SelectValue placeholder="All Departments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="operations">Operations</SelectItem>
            <SelectItem value="customs-enforcement">Customs Enforcement</SelectItem>
            <SelectItem value="trade-facilitation">Trade Facilitation</SelectItem>
            <SelectItem value="it-digital">IT & Digital Services</SelectItem>
            <SelectItem value="hr">Human Resources</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1">
        <label className="block mb-1.5 font-['Dubai:Regular',_sans-serif] text-[#4a5565]">KPI Category</label>
        <Select value={kpiCategory} onValueChange={onKpiCategoryChange}>
          <SelectTrigger className="w-full bg-white border-[#e0e0e0] font-['Dubai:Regular',_sans-serif]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="strategic">Strategic</SelectItem>
            <SelectItem value="operational">Operational</SelectItem>
            <SelectItem value="financial">Financial</SelectItem>
            <SelectItem value="customer">Customer Service</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
