import { CalendarIcon, Filter } from 'lucide-react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';

interface GlobalFiltersProps {
  departments: string[];
  selectedDepartments: string[];
  onDepartmentChange: (departments: string[]) => void;
  dataSources: Array<{ value: string; label: string }>;
  selectedDataSources: string[];
  onDataSourceChange: (sources: string[]) => void;
}

export function GlobalFilters({
  departments,
  selectedDepartments,
  onDepartmentChange,
  dataSources,
  selectedDataSources,
  onDataSourceChange,
}: GlobalFiltersProps) {
  const toggleDepartment = (dept: string) => {
    if (selectedDepartments.includes(dept)) {
      onDepartmentChange(selectedDepartments.filter(d => d !== dept));
    } else {
      onDepartmentChange([...selectedDepartments, dept]);
    }
  };

  const toggleDataSource = (source: string) => {
    if (selectedDataSources.includes(source)) {
      onDataSourceChange(selectedDataSources.filter(s => s !== source));
    } else {
      onDataSourceChange([...selectedDataSources, source]);
    }
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex items-center gap-2">
        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
        <Select defaultValue="30days">
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
            <SelectItem value="custom">Custom range</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="h-4 w-4 mr-2" />
            Department
            {selectedDepartments.length > 0 && (
              <Badge variant="secondary" className="ml-2 rounded-full px-1.5 py-0">
                {selectedDepartments.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-3" align="start">
          <div className="space-y-2">
            <div className="text-sm font-medium mb-3">Filter by Department</div>
            {departments.map(dept => (
              <label key={dept} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedDepartments.includes(dept)}
                  onChange={() => toggleDepartment(dept)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">{dept}</span>
              </label>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="h-4 w-4 mr-2" />
            Data Source
            {selectedDataSources.length > 0 && (
              <Badge variant="secondary" className="ml-2 rounded-full px-1.5 py-0">
                {selectedDataSources.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-3" align="start">
          <div className="space-y-2">
            <div className="text-sm font-medium mb-3">Filter by Data Source</div>
            {dataSources.map(source => (
              <label key={source.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedDataSources.includes(source.value)}
                  onChange={() => toggleDataSource(source.value)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">{source.label}</span>
              </label>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {(selectedDepartments.length > 0 || selectedDataSources.length > 0) && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            onDepartmentChange([]);
            onDataSourceChange([]);
          }}
          className="h-9"
        >
          Clear filters
        </Button>
      )}
    </div>
  );
}
