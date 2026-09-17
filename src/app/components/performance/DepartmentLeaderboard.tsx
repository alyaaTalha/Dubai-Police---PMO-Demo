import { useState } from "react";
import { ArrowUpDown, TrendingUp, TrendingDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface Department {
  id: string;
  name: string;
  score: number;
  kpisCompleted: number;
  totalKpis: number;
  trend: number;
  status: "on-track" | "at-risk" | "off-track";
}

interface DepartmentLeaderboardProps {
  onDepartmentClick: (departmentId: string) => void;
}

export function DepartmentLeaderboard({
  onDepartmentClick,
}: DepartmentLeaderboardProps) {
  const [sortField, setSortField] = useState<keyof Department>("score");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const departments: Department[] = [
    {
      id: "ops",
      name: "Operations",
      score: 94,
      kpisCompleted: 47,
      totalKpis: 50,
      trend: 5,
      status: "on-track",
    },
    {
      id: "customs",
      name: "Customs Enforcement",
      score: 89,
      kpisCompleted: 53,
      totalKpis: 60,
      trend: 2,
      status: "on-track",
    },
    {
      id: "trade",
      name: "Trade Facilitation",
      score: 85,
      kpisCompleted: 34,
      totalKpis: 40,
      trend: -3,
      status: "on-track",
    },
    {
      id: "it",
      name: "IT & Digital Services",
      score: 76,
      kpisCompleted: 38,
      totalKpis: 50,
      trend: -1,
      status: "at-risk",
    },
    {
      id: "hr",
      name: "Human Resources",
      score: 68,
      kpisCompleted: 20,
      totalKpis: 30,
      trend: -5,
      status: "off-track",
    },
  ];

  const sortedDepartments = [...departments].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    const direction = sortDirection === "asc" ? 1 : -1;

    if (typeof aValue === "number" && typeof bValue === "number") {
      return (aValue - bValue) * direction;
    }
    return 0;
  });

  const handleSort = (field: keyof Department) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const getStatusColor = (status: Department["status"]) => {
    switch (status) {
      case "on-track":
        return "#22c55e";
      case "at-risk":
        return "#f59e0b";
      case "off-track":
        return "#ef4444";
    }
  };

  const getStatusBgColor = (status: Department["status"]) => {
    switch (status) {
      case "on-track":
        return "#f0fdf4";
      case "at-risk":
        return "#fffbeb";
      case "off-track":
        return "#fef2f2";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-[#e0e0e0] overflow-hidden">
      <div className="p-6 border-b border-[#e5e7eb]">
        <h3 className="font-['Dubai:Medium',_sans-serif] text-[#1f2937]">
          Department Performance Leaderboard
        </h3>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-['Dubai:Medium',_sans-serif]">
              Rank
            </TableHead>
            <TableHead className="font-['Dubai:Medium',_sans-serif]">
              Department
            </TableHead>
            <TableHead
              className="font-['Dubai:Medium',_sans-serif] cursor-pointer"
              onClick={() => handleSort("score")}
            >
              <div className="flex items-center gap-2">
                Score
                <ArrowUpDown className="w-4 h-4" />
              </div>
            </TableHead>
            <TableHead className="font-['Dubai:Medium',_sans-serif]">
              KPIs Completed
            </TableHead>
            <TableHead className="font-['Dubai:Medium',_sans-serif]">
              Trend
            </TableHead>
            <TableHead className="font-['Dubai:Medium',_sans-serif]">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedDepartments.map((dept, index) => (
            <TableRow
              key={dept.id}
              className="cursor-pointer hover:bg-[#f9fafb] transition-colors"
              onClick={() => onDepartmentClick(dept.id)}
            >
              <TableCell className="font-['Dubai:Medium',_sans-serif] text-[#008755]">
                #{index + 1}
              </TableCell>
              <TableCell className="font-['Dubai:Regular',_sans-serif]">
                {dept.name}
              </TableCell>
              <TableCell className="font-['Dubai:Bold',_sans-serif]">
                {dept.score}
              </TableCell>
              <TableCell className="font-['Dubai:Regular',_sans-serif]">
                {dept.kpisCompleted}/{dept.totalKpis}
              </TableCell>
              <TableCell>
                <div
                  className={`flex items-center gap-1 ${
                    dept.trend >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"
                  }`}
                >
                  {dept.trend >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span className="font-['Dubai:Medium',_sans-serif]">
                    {Math.abs(dept.trend)}%
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div
                  className="inline-flex items-center px-3 py-1 rounded-full font-['Dubai:Medium',_sans-serif]"
                  style={{
                    color: getStatusColor(dept.status),
                    backgroundColor: getStatusBgColor(dept.status),
                  }}
                >
                  {dept.status === "on-track"
                    ? "On Track"
                    : dept.status === "at-risk"
                    ? "At Risk"
                    : "Off Track"}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
