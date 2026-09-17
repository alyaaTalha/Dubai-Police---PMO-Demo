import { useState } from "react";
import { X, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface AddTaskPanelProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  milestoneId: string;
  milestoneName: string;
}

export function AddTaskPanel({ isOpen, onClose, projectName, milestoneId, milestoneName }: AddTaskPanelProps) {
  const [aiInsightExpanded, setAiInsightExpanded] = useState(false);
  const [formData, setFormData] = useState({
    taskId: `T-${Date.now().toString().slice(-6)}`,
    taskName: "",
    duration: "",
    startDate: "",
    finishDate: "",
    percentComplete: "0",
    budgetCost: "",
    actualCost: "",
    taskWeight: "",
    status: "Not Started",
    predecessors: [],
    assignedTo: [],
    priority: "Medium",
  });

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay Background */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Sliding Panel */}
      <div className="fixed right-0 top-0 h-full w-[45%] bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-[#008755]/20 px-6 py-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-lg font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-1">
                Add Task
              </h2>
              <p className="text-sm text-muted-foreground">
                Linked to Project: <span className="text-[#008755] font-['Dubai:Medium',_'Dubai']">{projectName}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Milestone: {milestoneName}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-muted rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="space-y-6">
            {/* SECTION 1 - BASIC INFORMATION */}
            <div className="space-y-4">
              <h3 className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#008755] uppercase tracking-wide">
                Basic Information
              </h3>
              
              <div>
                <label className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-1 block">
                  Task ID (Auto-generated)
                </label>
                <input
                  type="text"
                  value={formData.taskId}
                  disabled
                  className="w-full px-3 py-2 text-sm border border-muted rounded bg-muted/30 text-muted-foreground cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-1 block">
                  Task Name <span className="text-[#D83731]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.taskName}
                  onChange={(e) => setFormData({ ...formData, taskName: e.target.value })}
                  placeholder="Enter task name"
                  className="w-full px-3 py-2 text-sm border border-muted rounded focus:outline-none focus:ring-2 focus:ring-[#008755]/20 focus:border-[#008755]"
                />
              </div>

              <div>
                <label className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-1 block">
                  Project (Read-only)
                </label>
                <div className="flex items-center gap-2 px-3 py-2 border border-muted rounded bg-muted/10">
                  <span className="text-sm text-[#008755] font-['Dubai:Medium',_'Dubai']">{projectName}</span>
                  <Badge variant="outline" className="text-xs">{milestoneId}</Badge>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-muted" />

            {/* SECTION 2 - DURATION */}
            <div className="space-y-4">
              <h3 className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#008755] uppercase tracking-wide">
                Duration
              </h3>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-1 block">
                    Duration (days)
                  </label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="0"
                    className="w-full px-3 py-2 text-sm border border-muted rounded focus:outline-none focus:ring-2 focus:ring-[#008755]/20 focus:border-[#008755]"
                  />
                </div>

                <div>
                  <label className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-1 block">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-muted rounded focus:outline-none focus:ring-2 focus:ring-[#008755]/20 focus:border-[#008755]"
                  />
                </div>

                <div>
                  <label className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-1 block">
                    Finish Date
                  </label>
                  <input
                    type="date"
                    value={formData.finishDate}
                    onChange={(e) => setFormData({ ...formData, finishDate: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-muted rounded focus:outline-none focus:ring-2 focus:ring-[#008755]/20 focus:border-[#008755]"
                  />
                </div>
              </div>

              <div className="bg-[#008755]/5 border border-[#008755]/20 rounded p-3">
                <p className="text-xs text-[#008755]">
                  💡 Finish date auto-calculated based on duration and start date.
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-muted" />

            {/* SECTION 3 - PROGRESS & COST */}
            <div className="space-y-4">
              <h3 className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#008755] uppercase tracking-wide">
                Progress & Cost
              </h3>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-1 block">
                    % Complete
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.percentComplete}
                    onChange={(e) => setFormData({ ...formData, percentComplete: e.target.value })}
                    placeholder="0"
                    className="w-full px-3 py-2 text-sm border border-muted rounded focus:outline-none focus:ring-2 focus:ring-[#008755]/20 focus:border-[#008755]"
                  />
                </div>

                <div>
                  <label className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-1 block">
                    Budget Cost (AED)
                  </label>
                  <input
                    type="number"
                    value={formData.budgetCost}
                    onChange={(e) => setFormData({ ...formData, budgetCost: e.target.value })}
                    placeholder="0"
                    className="w-full px-3 py-2 text-sm border border-muted rounded focus:outline-none focus:ring-2 focus:ring-[#008755]/20 focus:border-[#008755]"
                  />
                </div>

                <div>
                  <label className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-1 block">
                    Actual Cost (AED)
                  </label>
                  <input
                    type="number"
                    value={formData.actualCost}
                    onChange={(e) => setFormData({ ...formData, actualCost: e.target.value })}
                    placeholder="0"
                    className="w-full px-3 py-2 text-sm border border-muted rounded focus:outline-none focus:ring-2 focus:ring-[#008755]/20 focus:border-[#008755]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-1 block">
                  Task Weight
                </label>
                <input
                  type="number"
                  value={formData.taskWeight}
                  onChange={(e) => setFormData({ ...formData, taskWeight: e.target.value })}
                  placeholder="0"
                  className="w-full px-3 py-2 text-sm border border-muted rounded focus:outline-none focus:ring-2 focus:ring-[#008755]/20 focus:border-[#008755]"
                />
              </div>

              <div>
                <label className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-1 block">
                  Status <span className="text-[#D83731]">*</span>
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-muted rounded focus:outline-none focus:ring-2 focus:ring-[#008755]/20 focus:border-[#008755]"
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Delayed">Delayed</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-muted" />

            {/* SECTION 4 - DEPENDENCIES */}
            <div className="space-y-4">
              <h3 className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#008755] uppercase tracking-wide">
                Dependencies
              </h3>

              <div>
                <label className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-1 block">
                  Predecessors
                </label>
                <select
                  multiple
                  className="w-full px-3 py-2 text-sm border border-muted rounded focus:outline-none focus:ring-2 focus:ring-[#008755]/20 focus:border-[#008755] h-24"
                >
                  <option value="T1">T1 - Stakeholder Interviews</option>
                  <option value="T2">T2 - Requirements Documentation</option>
                  <option value="T4">T4 - Architecture Design</option>
                  <option value="T5">T5 - Database Schema Design</option>
                </select>
                <p className="text-xs text-muted-foreground mt-1">Hold Ctrl/Cmd to select multiple tasks</p>
              </div>

              <div className="bg-muted/30 border border-muted rounded p-3">
                <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-1">Dependency Chain Preview:</p>
                <p className="text-xs text-[#008755]">No dependencies selected</p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-muted" />

            {/* SECTION 5 - ASSIGNMENT */}
            <div className="space-y-4">
              <h3 className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#008755] uppercase tracking-wide">
                Assignment
              </h3>

              <div>
                <label className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-1 block">
                  Assigned To
                </label>
                <select
                  multiple
                  className="w-full px-3 py-2 text-sm border border-muted rounded focus:outline-none focus:ring-2 focus:ring-[#008755]/20 focus:border-[#008755] h-24"
                >
                  <option value="sarah">Sarah Ahmed</option>
                  <option value="ali">Ali Hassan</option>
                  <option value="fatima">Fatima Ibrahim</option>
                  <option value="mohammed">Mohammed Ali</option>
                  <option value="ahmed">Ahmed Khalil</option>
                  <option value="layla">Layla Mohammed</option>
                </select>
                <p className="text-xs text-muted-foreground mt-1">Hold Ctrl/Cmd to select multiple team members</p>
              </div>

              <div>
                <label className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-1 block">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-muted rounded focus:outline-none focus:ring-2 focus:ring-[#008755]/20 focus:border-[#008755]"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-muted" />

            {/* SECTION 6 - AI TASK INSIGHT (Collapsible) */}
            <div className="space-y-3">
              <div 
                className="flex items-center justify-between cursor-pointer p-3 bg-gradient-to-r from-[#008755]/5 to-white border border-[#008755]/20 rounded hover:bg-[#008755]/10 transition-colors"
                onClick={() => setAiInsightExpanded(!aiInsightExpanded)}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#008755]" />
                  <h3 className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                    AI Task Insight
                  </h3>
                  <Badge className="bg-[#008755]/10 text-[#008755] text-xs">Intelligence Layer</Badge>
                </div>
                {aiInsightExpanded ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </div>

              {aiInsightExpanded && (
                <div className="space-y-3 p-4 bg-white border border-[#008755]/20 rounded">
                  {/* Predicted Delay Risk */}
                  <div className="p-3 bg-[#F2A200]/5 border border-[#F2A200]/30 rounded">
                    <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-1">
                      ⚠️ Predicted Delay Risk
                    </p>
                    <p className="text-sm text-[#F2A200]">Medium Risk - 15% probability of 3-day delay</p>
                    <p className="text-xs text-muted-foreground mt-1">Based on similar historical tasks</p>
                  </div>

                  {/* Recommended Duration */}
                  <div className="p-3 bg-[#008755]/5 border border-[#008755]/30 rounded">
                    <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-1">
                      💡 Recommended Duration Adjustment
                    </p>
                    <p className="text-sm text-[#008755]">Add 2-3 buffer days for optimal scheduling</p>
                    <p className="text-xs text-muted-foreground mt-1">AI analysis suggests extended timeline</p>
                  </div>

                  {/* Dependency Conflict */}
                  <div className="p-3 bg-[#357743]/5 border border-[#357743]/30 rounded">
                    <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-1">
                      ✓ Dependency Conflict Detection
                    </p>
                    <p className="text-sm text-[#357743]">No conflicts detected</p>
                    <p className="text-xs text-muted-foreground mt-1">Task dependencies are properly aligned</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="sticky bottom-0 bg-white border-t border-[#008755]/20 px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-muted text-muted-foreground hover:bg-muted"
            >
              Cancel
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="text-[#008755] hover:bg-[#008755]/10"
              >
                Save & Add Another
              </Button>
              <Button
                className="bg-[#008755] hover:bg-[#006644] text-white"
              >
                Save Task
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
