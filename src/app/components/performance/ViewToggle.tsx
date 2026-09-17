import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Building2, Users, User } from "lucide-react";

interface ViewToggleProps {
  currentView: "executive" | "department" | "individual";
  onViewChange: (view: "executive" | "department" | "individual") => void;
}

export function ViewToggle({ currentView, onViewChange }: ViewToggleProps) {
  return (
    <ToggleGroup
      type="single"
      value={currentView}
      onValueChange={(value) => {
        if (value) onViewChange(value as "executive" | "department" | "individual");
      }}
      className="bg-white border border-[#e0e0e0] rounded-lg p-1"
    >
      <ToggleGroupItem
        value="executive"
        aria-label="Executive View"
        className="flex items-center gap-2 font-['Dubai:Regular',_sans-serif] data-[state=on]:bg-[#008755] data-[state=on]:text-white"
      >
        <Building2 className="w-4 h-4" />
        Executive
      </ToggleGroupItem>
      <ToggleGroupItem
        value="department"
        aria-label="Department View"
        className="flex items-center gap-2 font-['Dubai:Regular',_sans-serif] data-[state=on]:bg-[#008755] data-[state=on]:text-white"
      >
        <Users className="w-4 h-4" />
        Department
      </ToggleGroupItem>
      <ToggleGroupItem
        value="individual"
        aria-label="Individual View"
        className="flex items-center gap-2 font-['Dubai:Regular',_sans-serif] data-[state=on]:bg-[#008755] data-[state=on]:text-white"
      >
        <User className="w-4 h-4" />
        Individual
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
