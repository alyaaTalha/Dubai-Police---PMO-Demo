import { 
  Calendar,
  User,
  MoreVertical,
  CheckCircle2,
  AlertTriangle,
  Link2,
  Progress as ProgressIcon,
  GripVertical
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { useState } from "react";

interface Task {
  id: string;
  name: string;
  owner: string;
  priority: string;
  progress: number;
  status: string;
  timeline: string;
  dependencies: string;
  isOverdue: boolean;
}

interface Milestone {
  id: string;
  name: string;
  status: string;
  completion: number;
  dueDate: string;
  tasks: Task[];
}

interface MilestoneViewsProps {
  mockMilestones: Milestone[];
  getPriorityColor: (priority: string) => string;
  getStatusColor: (status: string) => string;
}

export function KanbanView({ mockMilestones, getPriorityColor, getStatusColor }: MilestoneViewsProps) {
  const [tasks, setTasks] = useState<Task[]>(mockMilestones.flatMap(m => m.tasks));
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const columns = [
    { status: "Not Started", color: "#6b7280", borderColor: "border-[#6b7280]/30" },
    { status: "In Progress", color: "#008755", borderColor: "border-[#008755]/30" },
    { status: "At Risk", color: "#F2A200", borderColor: "border-[#F2A200]/30" },
    { status: "Blocked", color: "#D83731", borderColor: "border-[#D83731]/30" },
    { status: "Complete", color: "#357743", borderColor: "border-[#357743]/30" }
  ];

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.currentTarget.innerHTML);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    if (draggedTaskId) {
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === draggedTaskId ? { ...task, status: newStatus } : task
        )
      );
      setDraggedTaskId(null);
    }
  };

  const handleDragEnd = () => {
    setDraggedTaskId(null);
  };

  return (
    <div className="flex gap-3 overflow-x-auto pb-4">
      {columns.map((column) => {
        const columnTasks = tasks.filter(t => t.status === column.status);
        
        return (
          <div 
            key={column.status} 
            className="flex-shrink-0 w-[280px]"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.status)}
          >
            <Card className={`${column.borderColor} transition-all`}>
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: column.color }} />
                    <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{column.status}</h3>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {columnTasks.length}
                  </Badge>
                </div>
                <div className="space-y-2 min-h-[200px]">
                  {columnTasks.map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task.id)}
                      onDragEnd={handleDragEnd}
                      className="cursor-move"
                      style={{ opacity: draggedTaskId === task.id ? 0.5 : 1 }}
                    >
                      <Card 
                        className={`border hover:shadow-md transition-shadow ${
                          column.status === "Complete" ? "bg-[#357743]/5" : ""
                        }`}
                      >
                        <CardContent className="pt-3 pb-3">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-start gap-2 flex-1">
                              <div className="mt-1">
                                <GripVertical className="h-4 w-4 text-muted-foreground" />
                              </div>
                              <p className={`text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] flex-1 ${
                                column.status === "Complete" ? "line-through opacity-75" : ""
                              }`}>
                                {task.name}
                              </p>
                            </div>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <MoreVertical className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <User className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{task.owner}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <Badge
                                style={{
                                  backgroundColor: `${getPriorityColor(task.priority)}20`,
                                  color: getPriorityColor(task.priority)
                                }}
                                className="text-xs"
                              >
                                {task.priority}
                              </Badge>
                              {column.status === "Complete" ? (
                                <CheckCircle2 className="h-4 w-4 text-[#357743]" />
                              ) : (
                                <span className="text-xs text-muted-foreground">
                                  {task.timeline.split(' - ')[1] || task.timeline}
                                </span>
                              )}
                            </div>
                            <Progress value={task.progress} className="h-1.5" />
                            {task.isOverdue && column.status !== "Complete" && (
                              <Badge variant="destructive" className="text-xs w-full justify-center">
                                Overdue
                              </Badge>
                            )}
                            {column.status === "Blocked" && (
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Link2 className="h-3 w-3" />
                                <span>Waiting on dependencies</span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
}

export function GanttView({ mockMilestones, getStatusColor }: MilestoneViewsProps) {
  return (
    <div className="space-y-4">
      <Card className="border-[#008755]/20">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">Project Timeline - Gantt Chart</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-8 rounded" style={{ backgroundColor: "#D83731" }} />
                <span className="text-xs text-muted-foreground">Critical Path</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Jan 15, 2025 - Jun 30, 2025</span>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <div className="min-w-[1200px]">
              {/* Timeline Headers */}
              <div className="flex border-b pb-2 mb-4">
                <div className="w-[240px] flex-shrink-0 pr-4">
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Task Name</p>
                </div>
                <div className="flex-1">
                  {/* Month Headers */}
                  <div className="grid grid-cols-24 gap-px mb-2">
                    {Array.from({ length: 6 }).map((_, monthIdx) => (
                      <div 
                        key={monthIdx} 
                        className="col-span-4 text-center text-xs font-['Dubai:Medium',_'Dubai'] text-[#1f2937] bg-muted/30 py-1.5 rounded"
                      >
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][monthIdx]} 2025
                      </div>
                    ))}
                  </div>
                  {/* Week Grid */}
                  <div className="grid grid-cols-24 gap-px">
                    {Array.from({ length: 24 }).map((_, weekIdx) => (
                      <div 
                        key={weekIdx} 
                        className="text-center text-[10px] text-muted-foreground bg-muted/10 py-1 border-r border-muted"
                      >
                        W{weekIdx + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Gantt Chart Tasks */}
              <div className="space-y-1 relative">
                {/* Vertical Week Grid Lines */}
                <div className="absolute left-[240px] right-0 top-0 bottom-0 grid grid-cols-24 gap-px pointer-events-none">
                  {Array.from({ length: 24 }).map((_, idx) => (
                    <div key={idx} className="border-r border-muted/30" />
                  ))}
                </div>

                {/* Today Marker */}
                <div className="absolute top-0 bottom-0 pointer-events-none z-20" style={{ left: 'calc(240px + 33.33%)' }}>
                  <div className="h-full w-px bg-[#008755] relative">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#008755] text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap">
                      Today
                    </div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#008755]" />
                  </div>
                </div>

                {/* Task: Requirements Analysis - CRITICAL PATH */}
                <div className="flex items-center relative z-10 group hover:bg-muted/20 py-2 rounded">
                  <div className="w-[240px] flex-shrink-0 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-[#D83731] bg-white flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-[#D83731]" />
                      </div>
                      <div>
                        <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">Requirements Analysis</p>
                        <p className="text-[10px] text-muted-foreground">M1 - Foundation</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 relative h-10">
                    {/* Task Bar - CRITICAL */}
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 h-7 rounded shadow-sm flex items-center justify-between px-2 border-2"
                      style={{ 
                        left: '0%', 
                        width: '16.66%', // 4 weeks
                        backgroundColor: '#D83731',
                        borderColor: '#B82A25'
                      }}
                    >
                      <span className="text-[10px] font-['Dubai:Medium',_'Dubai'] text-white">100%</span>
                      <span className="text-[10px] text-white/90">4 weeks</span>
                    </div>
                    {/* Float/Slack indicator - none for critical path */}
                  </div>
                </div>

                {/* Task: System Architecture Design - CRITICAL PATH */}
                <div className="flex items-center relative z-10 group hover:bg-muted/20 py-2 rounded">
                  <div className="w-[240px] flex-shrink-0 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-[#D83731] bg-white flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-[#D83731]" />
                      </div>
                      <div>
                        <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">System Architecture Design</p>
                        <p className="text-[10px] text-muted-foreground">M1 - Foundation</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 relative h-10">
                    {/* Dependency Arrow from previous task */}
                    <svg className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#D83731]" style={{ left: 'calc(16.66% - 12px)' }}>
                      <path d="M 0 12 L 20 12 M 15 8 L 20 12 L 15 16" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    </svg>
                    {/* Task Bar - CRITICAL */}
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 h-7 rounded shadow-sm flex items-center justify-between px-2 border-2"
                      style={{ 
                        left: '16.66%', 
                        width: '12.5%', // 3 weeks
                        backgroundColor: '#D83731',
                        borderColor: '#B82A25'
                      }}
                    >
                      <span className="text-[10px] font-['Dubai:Medium',_'Dubai'] text-white">85%</span>
                      <span className="text-[10px] text-white/90">3 weeks</span>
                    </div>
                  </div>
                </div>

                {/* Task: Database Setup - NON-CRITICAL (has slack) */}
                <div className="flex items-center relative z-10 group hover:bg-muted/20 py-2 rounded">
                  <div className="w-[240px] flex-shrink-0 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-[#008755] bg-white flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-[#008755]" />
                      </div>
                      <div>
                        <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">Database Setup</p>
                        <p className="text-[10px] text-muted-foreground">M1 - Foundation</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 relative h-10">
                    {/* Dependency Arrow */}
                    <svg className="absolute top-1/2 -translate-y-1/2 w-6 h-6 text-[#008755]/40" style={{ left: 'calc(16.66% - 12px)' }}>
                      <path d="M 0 12 L 20 12 M 15 8 L 20 12 L 15 16" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    </svg>
                    {/* Task Bar - Non-critical */}
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 h-7 rounded shadow-sm flex items-center justify-between px-2 border-2"
                      style={{ 
                        left: '16.66%', 
                        width: '8.33%', // 2 weeks
                        backgroundColor: '#008755',
                        borderColor: '#006644'
                      }}
                    >
                      <span className="text-[10px] font-['Dubai:Medium',_'Dubai'] text-white">90%</span>
                      <span className="text-[10px] text-white/90">2 weeks</span>
                    </div>
                    {/* Slack/Float indicator */}
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 h-2 rounded-sm border border-dashed border-[#008755]/40"
                      style={{ 
                        left: 'calc(16.66% + 8.33%)', 
                        width: '4.16%', // 1 week slack
                        backgroundColor: 'transparent'
                      }}
                    />
                  </div>
                </div>

                {/* Task: Core Module Development - CRITICAL PATH */}
                <div className="flex items-center relative z-10 group hover:bg-muted/20 py-2 rounded">
                  <div className="w-[240px] flex-shrink-0 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-[#D83731] bg-white flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-[#D83731]" />
                      </div>
                      <div>
                        <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">Core Module Development</p>
                        <p className="text-[10px] text-muted-foreground">M2 - Development</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 relative h-10">
                    {/* Dependency Arrow */}
                    <svg className="absolute top-1/2 -translate-y-1/2 w-6 h-6 text-[#D83731]" style={{ left: 'calc(29.16% - 12px)' }}>
                      <path d="M 0 12 L 20 12 M 15 8 L 20 12 L 15 16" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    </svg>
                    {/* Task Bar - CRITICAL */}
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 h-7 rounded shadow-sm flex items-center justify-between px-2 border-2"
                      style={{ 
                        left: '29.16%', 
                        width: '20.83%', // 5 weeks
                        backgroundColor: '#D83731',
                        borderColor: '#B82A25'
                      }}
                    >
                      <span className="text-[10px] font-['Dubai:Medium',_'Dubai'] text-white">65%</span>
                      <span className="text-[10px] text-white/90">5 weeks</span>
                    </div>
                  </div>
                </div>

                {/* Task: UI/UX Design - NON-CRITICAL */}
                <div className="flex items-center relative z-10 group hover:bg-muted/20 py-2 rounded">
                  <div className="w-[240px] flex-shrink-0 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-[#008755] bg-white flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-[#008755]" />
                      </div>
                      <div>
                        <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">UI/UX Design</p>
                        <p className="text-[10px] text-muted-foreground">M2 - Development</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 relative h-10">
                    {/* Dependency Arrow */}
                    <svg className="absolute top-1/2 -translate-y-1/2 w-6 h-6 text-[#008755]/40" style={{ left: 'calc(24.99% - 12px)' }}>
                      <path d="M 0 12 L 20 12 M 15 8 L 20 12 L 15 16" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    </svg>
                    {/* Task Bar */}
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 h-7 rounded shadow-sm flex items-center justify-between px-2 border-2"
                      style={{ 
                        left: '24.99%', 
                        width: '12.5%', // 3 weeks
                        backgroundColor: '#008755',
                        borderColor: '#006644'
                      }}
                    >
                      <span className="text-[10px] font-['Dubai:Medium',_'Dubai'] text-white">75%</span>
                      <span className="text-[10px] text-white/90">3 weeks</span>
                    </div>
                    {/* Slack */}
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 h-2 rounded-sm border border-dashed border-[#008755]/40"
                      style={{ 
                        left: 'calc(24.99% + 12.5%)', 
                        width: '12.5%', // 3 weeks slack
                        backgroundColor: 'transparent'
                      }}
                    />
                  </div>
                </div>

                {/* Task: API Integration - NON-CRITICAL */}
                <div className="flex items-center relative z-10 group hover:bg-muted/20 py-2 rounded">
                  <div className="w-[240px] flex-shrink-0 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-[#008755] bg-white flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-[#008755]" />
                      </div>
                      <div>
                        <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">API Integration</p>
                        <p className="text-[10px] text-muted-foreground">M2 - Development</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 relative h-10">
                    {/* Dependency Arrow */}
                    <svg className="absolute top-1/2 -translate-y-1/2 w-6 h-6 text-[#008755]/40" style={{ left: 'calc(37.49% - 12px)' }}>
                      <path d="M 0 12 L 20 12 M 15 8 L 20 12 L 15 16" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    </svg>
                    {/* Task Bar */}
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 h-7 rounded shadow-sm flex items-center justify-between px-2 border-2"
                      style={{ 
                        left: '37.49%', 
                        width: '8.33%', // 2 weeks
                        backgroundColor: '#008755',
                        borderColor: '#006644'
                      }}
                    >
                      <span className="text-[10px] font-['Dubai:Medium',_'Dubai'] text-white">60%</span>
                      <span className="text-[10px] text-white/90">2 weeks</span>
                    </div>
                    {/* Slack */}
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 h-2 rounded-sm border border-dashed border-[#008755]/40"
                      style={{ 
                        left: 'calc(37.49% + 8.33%)', 
                        width: '4.16%', 
                        backgroundColor: 'transparent'
                      }}
                    />
                  </div>
                </div>

                {/* Task: Integration Testing - CRITICAL PATH */}
                <div className="flex items-center relative z-10 group hover:bg-muted/20 py-2 rounded">
                  <div className="w-[240px] flex-shrink-0 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-[#D83731] bg-white flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-[#D83731]" />
                      </div>
                      <div>
                        <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">Integration Testing</p>
                        <p className="text-[10px] text-muted-foreground">M3 - Testing</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 relative h-10">
                    {/* Dependency Arrow */}
                    <svg className="absolute top-1/2 -translate-y-1/2 w-6 h-6 text-[#D83731]" style={{ left: 'calc(49.99% - 12px)' }}>
                      <path d="M 0 12 L 20 12 M 15 8 L 20 12 L 15 16" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    </svg>
                    {/* Task Bar - CRITICAL */}
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 h-7 rounded shadow-sm flex items-center justify-between px-2 border-2"
                      style={{ 
                        left: '49.99%', 
                        width: '16.66%', // 4 weeks
                        backgroundColor: '#D83731',
                        borderColor: '#B82A25'
                      }}
                    >
                      <span className="text-[10px] font-['Dubai:Medium',_'Dubai'] text-white">45%</span>
                      <span className="text-[10px] text-white/90">4 weeks</span>
                    </div>
                  </div>
                </div>

                {/* Task: Documentation - NON-CRITICAL */}
                <div className="flex items-center relative z-10 group hover:bg-muted/20 py-2 rounded">
                  <div className="w-[240px] flex-shrink-0 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-[#357743] bg-white flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-[#357743]" />
                      </div>
                      <div>
                        <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">Documentation</p>
                        <p className="text-[10px] text-muted-foreground">M3 - Testing</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 relative h-10">
                    {/* Parallel to testing, no hard dependency */}
                    {/* Task Bar */}
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 h-7 rounded shadow-sm flex items-center justify-between px-2 border-2"
                      style={{ 
                        left: '54.16%', 
                        width: '8.33%', // 2 weeks
                        backgroundColor: '#357743',
                        borderColor: '#2A5E35'
                      }}
                    >
                      <span className="text-[10px] font-['Dubai:Medium',_'Dubai'] text-white">40%</span>
                      <span className="text-[10px] text-white/90">2 weeks</span>
                    </div>
                    {/* Slack */}
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 h-2 rounded-sm border border-dashed border-[#357743]/40"
                      style={{ 
                        left: 'calc(54.16% + 8.33%)', 
                        width: '4.16%', 
                        backgroundColor: 'transparent'
                      }}
                    />
                  </div>
                </div>

                {/* Task: UAT & Bug Fixes - CRITICAL PATH */}
                <div className="flex items-center relative z-10 group hover:bg-muted/20 py-2 rounded">
                  <div className="w-[240px] flex-shrink-0 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-[#D83731] bg-white flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-[#D83731]" />
                      </div>
                      <div>
                        <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">UAT & Bug Fixes</p>
                        <p className="text-[10px] text-muted-foreground">M3 - Testing</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 relative h-10">
                    {/* Dependency Arrow */}
                    <svg className="absolute top-1/2 -translate-y-1/2 w-6 h-6 text-[#D83731]" style={{ left: 'calc(66.65% - 12px)' }}>
                      <path d="M 0 12 L 20 12 M 15 8 L 20 12 L 15 16" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    </svg>
                    {/* Task Bar - CRITICAL */}
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 h-7 rounded shadow-sm flex items-center justify-between px-2 border-2"
                      style={{ 
                        left: '66.65%', 
                        width: '12.5%', // 3 weeks
                        backgroundColor: '#D83731',
                        borderColor: '#B82A25'
                      }}
                    >
                      <span className="text-[10px] font-['Dubai:Medium',_'Dubai'] text-white">30%</span>
                      <span className="text-[10px] text-white/90">3 weeks</span>
                    </div>
                  </div>
                </div>

                {/* Task: Deployment & Go-Live - CRITICAL PATH */}
                <div className="flex items-center relative z-10 group hover:bg-muted/20 py-2 rounded">
                  <div className="w-[240px] flex-shrink-0 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-[#D83731] bg-white flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-[#D83731]" />
                      </div>
                      <div>
                        <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">Deployment & Go-Live</p>
                        <p className="text-[10px] text-muted-foreground">M3 - Testing</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 relative h-10">
                    {/* Dependency Arrow */}
                    <svg className="absolute top-1/2 -translate-y-1/2 w-6 h-6 text-[#D83731]" style={{ left: 'calc(79.15% - 12px)' }}>
                      <path d="M 0 12 L 20 12 M 15 8 L 20 12 L 15 16" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    </svg>
                    {/* Task Bar - CRITICAL */}
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 h-7 rounded shadow-sm flex items-center justify-between px-2 border-2"
                      style={{ 
                        left: '79.15%', 
                        width: '8.33%', // 2 weeks
                        backgroundColor: '#D83731',
                        borderColor: '#B82A25'
                      }}
                    >
                      <span className="text-[10px] font-['Dubai:Medium',_'Dubai'] text-white">0%</span>
                      <span className="text-[10px] text-white/90">2 weeks</span>
                    </div>
                    {/* Milestone Diamond */}
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#FFD700] border-2 border-[#DAA520] transform rotate-45 shadow-lg"
                      style={{ left: 'calc(79.15% + 8.33% + 8px)' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Legend & Critical Path Info */}
          <div className="mt-6 pt-4 border-t space-y-3">
            <div className="flex items-center gap-6 flex-wrap">
              <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground">Legend:</p>
              <div className="flex items-center gap-2">
                <div className="h-4 w-8 rounded border-2" style={{ backgroundColor: '#D83731', borderColor: '#B82A25' }} />
                <span className="text-xs text-muted-foreground">Critical Path Task</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-8 rounded border-2" style={{ backgroundColor: '#008755', borderColor: '#006644' }} />
                <span className="text-xs text-muted-foreground">Non-Critical Task</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-8 rounded-sm border border-dashed border-[#008755]/40" />
                <span className="text-xs text-muted-foreground">Available Slack Time</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#FFD700] border-2 border-[#DAA520] transform rotate-45" />
                <span className="text-xs text-muted-foreground">Milestone</span>
              </div>
            </div>
            
            <div className="p-3 bg-[#D83731]/5 border border-[#D83731]/20 rounded">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-[#D83731] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-1">
                    Critical Path: 21 weeks total duration
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Tasks on the critical path (shown in red) have zero slack. Any delay in these tasks will delay the entire project completion date. 
                    Non-critical tasks have available slack time (shown as dashed lines) and can be delayed without affecting the project end date.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}