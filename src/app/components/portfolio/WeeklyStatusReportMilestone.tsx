import { useState } from "react";
import { ChevronDown, ChevronRight, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface Subtask {
  id: string;
  task: string;
  status: string;
}

interface Task {
  id: string;
  task: string;
  status: string;
  subtasks: Subtask[];
}

interface WeeklyStatusReportMilestoneProps {
  milestoneName: string;
  tasks: Task[];
  panelId: string;
  isExpanded: boolean;
  onTogglePanel: () => void;
}

export function WeeklyStatusReportMilestone({
  milestoneName,
  tasks,
  panelId,
  isExpanded,
  onTogglePanel,
}: WeeklyStatusReportMilestoneProps) {
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());

  const toggleTask = (taskId: string) => {
    setExpandedTasks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  const getStatusColor = (status: string) => {
    if (status === "Complete") return { bg: "#357743", color: "#ffffff" };
    if (status === "In Progress") return { bg: "#008755", color: "#ffffff" };
    if (status === "At Risk") return { bg: "#F2A200", color: "#ffffff" };
    if (status === "Blocked") return { bg: "#D83731", color: "#ffffff" };
    if (status === "Not Started") return { bg: "#6b7280", color: "#ffffff" };
    // Default
    return { bg: "#6b7280", color: "#ffffff" };
  };

  return (
    <Card className="border-[#008755]/20">
      <CardContent className="pt-0 pb-0">
        <div
          className="flex items-center justify-between py-3 px-3 cursor-pointer hover:bg-muted/30 transition-colors"
          onClick={onTogglePanel}
        >
          <div className="flex items-center gap-2">
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-[#008755]" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
            <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
              Weekly Status Report ({milestoneName})
            </h3>
          </div>
        </div>

        {isExpanded && (
          <div className="border-t px-4 py-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="text-left py-2 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground w-8"></th>
                    <th className="text-left py-2 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">
                      Task
                    </th>
                    <th className="text-left py-2 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">
                      Status
                    </th>
                    <th className="text-left py-2 px-3 text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((item) => (
                    <>
                      <tr
                        key={item.id}
                        className="border-b hover:bg-muted/30 transition-colors"
                      >
                        <td className="py-3 px-3">
                          {item.subtasks.length > 0 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleTask(item.id);
                              }}
                              className="cursor-pointer"
                            >
                              {expandedTasks.has(item.id) ? (
                                <ChevronDown className="h-3.5 w-3.5 text-[#008755]" />
                              ) : (
                                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                              )}
                            </button>
                          )}
                        </td>
                        <td className="py-3 px-3 text-sm text-[#1f2937]">
                          {item.task}
                        </td>
                        <td className="py-3 px-3">
                          <Badge
                            style={{
                              backgroundColor: getStatusColor(item.status).bg,
                              color: getStatusColor(item.status).color,
                              borderColor: getStatusColor(item.status).bg
                            }}
                            className="text-xs border-0"
                          >
                            {item.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0"
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0 text-[#D83731]"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                      {expandedTasks.has(item.id) &&
                        item.subtasks.map((subtask) => (
                          <tr key={subtask.id} className="border-b bg-muted/10">
                            <td className="py-2 px-3"></td>
                            <td className="py-2 px-3 pl-8 text-sm text-muted-foreground">
                              {subtask.task}
                            </td>
                            <td className="py-2 px-3">
                              <Badge
                                style={{
                                  backgroundColor: getStatusColor(subtask.status).bg,
                                  color: getStatusColor(subtask.status).color,
                                  borderColor: getStatusColor(subtask.status).bg
                                }}
                                className="text-xs border-0"
                              >
                                {subtask.status}
                              </Badge>
                            </td>
                            <td className="py-2 px-3">
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0"
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 text-[#D83731]"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}