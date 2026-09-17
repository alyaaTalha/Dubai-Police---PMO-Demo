import { useState } from "react";
import {
  ArrowLeft,
  Save,
  Plus,
  GripVertical,
  Trash2,
  Users,
  CheckSquare,
  Layout,
  X,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface EditWorkflowPageProps {
  workflowId: string;
  onBack: () => void;
}

interface ApprovalStep {
  id: string;
  order: number;
  titleEn: string;
  titleAr: string;
  reviewer: string;
  timeLimit: number;
  timeLimitUnit: "days" | "weeks";
  descriptionEn: string;
  descriptionAr: string;
  stepType: "Project Approval" | "Document Review" | "Directional Decision" | "Legal Review" | "Feasibility Assessment";
  autoEscalation: boolean;
  escalationAction?: "Email Reminder" | "Manager Notification" | "Skip to Next Level";
  escalateAfter?: number;
  escalateAfterUnit?: "days" | "weeks";
  checklistItems: string[];
  availableChecklistItems: string[];
  visibleTabs: string[];
}

const ItemType = "APPROVAL_STEP";

interface DraggableStepProps {
  step: ApprovalStep;
  index: number;
  moveStep: (dragIndex: number, hoverIndex: number) => void;
  onUpdate: (id: string, field: string, value: any) => void;
  onRemove: (id: string) => void;
}

function DraggableStep({ step, index, moveStep, onUpdate, onRemove }: DraggableStepProps) {
  const [addItemDialogOpen, setAddItemDialogOpen] = useState(false);
  const [newChecklistItem, setNewChecklistItem] = useState("");

  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveStep(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div ref={(node) => preview(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Card className="mb-3">
        <CardContent className="pt-4 !pb-4 !px-4">
          <div className="flex gap-3">
            {/* Drag Handle and Step Number */}
            <div className="flex flex-col items-center gap-2 pt-2">
              <div ref={drag} className="cursor-move">
                <GripVertical className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="h-8 w-8 rounded-full border-2 border-[#BB9956] flex items-center justify-center">
                <span className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#BB9956]">
                  {step.order}
                </span>
              </div>
            </div>

            {/* Step Content */}
            <div className="flex-1 space-y-3">
              {/* Step Titles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label htmlFor={`step-title-en-${step.id}`} className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                    Step Title (English)
                  </label>
                  <input
                    id={`step-title-en-${step.id}`}
                    type="text"
                    className="w-full px-3 py-2 border rounded text-sm"
                    value={step.titleEn}
                    onChange={(e) => onUpdate(step.id, "titleEn", e.target.value)}
                    placeholder="Enter step title"
                  />
                </div>
                <div>
                  <label htmlFor={`step-title-ar-${step.id}`} className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                    Step Title (Arabic)
                  </label>
                  <input
                    id={`step-title-ar-${step.id}`}
                    type="text"
                    className="w-full px-3 py-2 border rounded text-sm text-right"
                    value={step.titleAr}
                    onChange={(e) => onUpdate(step.id, "titleAr", e.target.value)}
                    placeholder="أدخل عنوان الخطوة"
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Reviewer and Time Limit */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label htmlFor={`reviewer-${step.id}`} className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                    Reviewer / Team Group
                  </label>
                  <select
                    id={`reviewer-${step.id}`}
                    className="w-full px-3 py-2 border rounded text-sm"
                    value={step.reviewer}
                    onChange={(e) => onUpdate(step.id, "reviewer", e.target.value)}
                  >
                    <option value="PMO Review Committee">PMO Review Committee</option>
                    <option value="Digital Transformation Team">Digital Transformation Team</option>
                    <option value="Legal & Compliance Team">Legal & Compliance Team</option>
                    <option value="Finance Team">Finance Team</option>
                    <option value="Executive Committee">Executive Committee</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor={`time-limit-${step.id}`} className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                      Time Limit
                    </label>
                    <input
                      id={`time-limit-${step.id}`}
                      type="number"
                      className="w-full px-3 py-2 border rounded text-sm"
                      value={step.timeLimit}
                      onChange={(e) => onUpdate(step.id, "timeLimit", parseInt(e.target.value) || 0)}
                      min="1"
                    />
                  </div>
                  <div>
                    <label htmlFor={`time-unit-${step.id}`} className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                      Unit
                    </label>
                    <select
                      id={`time-unit-${step.id}`}
                      className="w-full px-3 py-2 border rounded text-sm"
                      value={step.timeLimitUnit}
                      onChange={(e) => onUpdate(step.id, "timeLimitUnit", e.target.value as "days" | "weeks")}
                    >
                      <option value="days">Day(s)</option>
                      <option value="weeks">Week(s)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step Descriptions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label htmlFor={`desc-en-${step.id}`} className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                    Description (English)
                  </label>
                  <textarea
                    id={`desc-en-${step.id}`}
                    className="w-full px-3 py-2 border rounded text-sm min-h-[80px]"
                    value={step.descriptionEn}
                    onChange={(e) => onUpdate(step.id, "descriptionEn", e.target.value)}
                    placeholder="Enter step description"
                    rows={3}
                  />
                </div>
                <div>
                  <label htmlFor={`desc-ar-${step.id}`} className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                    Description (Arabic)
                  </label>
                  <textarea
                    id={`desc-ar-${step.id}`}
                    className="w-full px-3 py-2 border rounded text-sm min-h-[80px] text-right"
                    value={step.descriptionAr}
                    onChange={(e) => onUpdate(step.id, "descriptionAr", e.target.value)}
                    placeholder="أدخل وصف الخطوة"
                    dir="rtl"
                    rows={3}
                  />
                </div>
              </div>

              {/* SECTION B - Step Type */}
              <div>
                <label htmlFor={`step-type-${step.id}`} className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                  Step Type
                </label>
                <select
                  id={`step-type-${step.id}`}
                  className="w-full px-3 py-2 border rounded text-sm"
                  value={step.stepType}
                  onChange={(e) => onUpdate(step.id, "stepType", e.target.value)}
                >
                  <option value="Project Approval">Project Approval</option>
                  <option value="Document Review">Document Review</option>
                  <option value="Directional Decision">Directional Decision</option>
                  <option value="Legal Review">Legal Review</option>
                  <option value="Feasibility Assessment">Feasibility Assessment</option>
                </select>
              </div>

              {/* SECTION C - Auto-escalation */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 rounded-lg border bg-muted/50">
                  <Label htmlFor={`escalation-${step.id}`} className="text-sm cursor-pointer">
                    Auto-escalation
                  </Label>
                  <Switch
                    id={`escalation-${step.id}`}
                    checked={step.autoEscalation}
                    onCheckedChange={(checked) => onUpdate(step.id, "autoEscalation", checked)}
                  />
                </div>

                {step.autoEscalation && (
                  <div className="ml-4 space-y-3 p-3 border-l-2 border-[#008755]/30">
                    <div>
                      <label htmlFor={`escalation-action-${step.id}`} className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                        Escalation Action
                      </label>
                      <select
                        id={`escalation-action-${step.id}`}
                        className="w-full px-3 py-2 border rounded text-sm"
                        value={step.escalationAction || ""}
                        onChange={(e) => onUpdate(step.id, "escalationAction", e.target.value)}
                      >
                        <option value="">Select escalation action</option>
                        <option value="Email Reminder">Email Reminder — Send automated email reminder</option>
                        <option value="Manager Notification">Manager Notification — Notify the reviewer's manager</option>
                        <option value="Skip to Next Level">Skip to Next Level — Automatically move to next approval step</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label htmlFor={`escalate-after-${step.id}`} className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                          Escalate after
                        </label>
                        <input
                          id={`escalate-after-${step.id}`}
                          type="number"
                          className="w-full px-3 py-2 border rounded text-sm"
                          value={step.escalateAfter || ""}
                          onChange={(e) => onUpdate(step.id, "escalateAfter", parseInt(e.target.value) || 0)}
                          min="1"
                        />
                      </div>
                      <div>
                        <label htmlFor={`escalate-unit-${step.id}`} className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                          Unit
                        </label>
                        <select
                          id={`escalate-unit-${step.id}`}
                          className="w-full px-3 py-2 border rounded text-sm"
                          value={step.escalateAfterUnit || "days"}
                          onChange={(e) => onUpdate(step.id, "escalateAfterUnit", e.target.value as "days" | "weeks")}
                        >
                          <option value="days">Day(s)</option>
                          <option value="weeks">Week(s)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION D - Checklist Items */}
              <div className="space-y-2 p-3 rounded-lg border bg-muted/30">
                <div className="flex items-center gap-2 mb-2">
                  <CheckSquare className="h-4 w-4 text-[#008755]" />
                  <h4 className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">Checklist Items</h4>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Select which checklist items appear for this step on the user-facing project page
                </p>

                <div className="flex flex-wrap gap-2">
                  {step.checklistItems.map((item, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#008755] text-white text-xs"
                    >
                      <span>{item}</span>
                      <button
                        onClick={() => {
                          const newItems = step.checklistItems.filter((_, i) => i !== index);
                          const newAvailable = [...step.availableChecklistItems, item];
                          onUpdate(step.id, "checklistItems", newItems);
                          onUpdate(step.id, "availableChecklistItems", newAvailable);
                        }}
                        className="ml-1 hover:bg-white/20 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}

                  {step.availableChecklistItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        const newAvailable = step.availableChecklistItems.filter((_, i) => i !== index);
                        const newItems = [...step.checklistItems, item];
                        onUpdate(step.id, "checklistItems", newItems);
                        onUpdate(step.id, "availableChecklistItems", newAvailable);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-muted-foreground/30 text-muted-foreground hover:border-[#008755] hover:text-[#008755] text-xs transition-colors"
                    >
                      {item}
                    </button>
                  ))}

                  <button
                    onClick={() => setAddItemDialogOpen(true)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-dashed border-[#008755] text-[#008755] hover:bg-[#008755]/10 text-xs transition-colors"
                  >
                    <Plus className="h-3 w-3" />
                    Add Item
                  </button>
                </div>
              </div>

              {/* SECTION E - Tabs Configuration */}
              <div className="space-y-2 p-3 rounded-lg border bg-muted/30">
                <div className="flex items-center gap-2 mb-2">
                  <Layout className="h-4 w-4 text-[#008755]" />
                  <h4 className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">Visible Tabs</h4>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Select which tabs appear on the user-facing project page for this step
                </p>

                <div className="flex flex-wrap gap-2">
                  {["Basic Information", "Timeline", "Goals & Benefits", "Risks & Issues", "Team", "Stakeholders"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        const isVisible = step.visibleTabs.includes(tab);
                        const newTabs = isVisible
                          ? step.visibleTabs.filter(t => t !== tab)
                          : [...step.visibleTabs, tab];
                        onUpdate(step.id, "visibleTabs", newTabs);
                      }}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs transition-colors ${
                        step.visibleTabs.includes(tab)
                          ? "bg-[#008755] text-white"
                          : "border border-muted-foreground/30 text-muted-foreground hover:border-[#008755] hover:text-[#008755]"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step Footer */}
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{step.reviewer}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemove(step.id)}
                  className="text-destructive hover:text-destructive/80"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Checklist Item Dialog */}
      <Dialog open={addItemDialogOpen} onOpenChange={setAddItemDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-['Dubai:Medium',_'Dubai']">Add Checklist Item</DialogTitle>
            <DialogDescription>
              Enter a custom checklist item for this approval step
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <label htmlFor="new-item" className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
              Item Name
            </label>
            <input
              id="new-item"
              type="text"
              className="w-full px-3 py-2 border rounded text-sm"
              value={newChecklistItem}
              onChange={(e) => setNewChecklistItem(e.target.value)}
              placeholder="Enter checklist item name"
              onKeyDown={(e) => {
                if (e.key === "Enter" && newChecklistItem.trim()) {
                  const newItems = [...step.checklistItems, newChecklistItem.trim()];
                  onUpdate(step.id, "checklistItems", newItems);
                  setNewChecklistItem("");
                  setAddItemDialogOpen(false);
                }
              }}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setNewChecklistItem("");
                setAddItemDialogOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (newChecklistItem.trim()) {
                  const newItems = [...step.checklistItems, newChecklistItem.trim()];
                  onUpdate(step.id, "checklistItems", newItems);
                  setNewChecklistItem("");
                  setAddItemDialogOpen(false);
                }
              }}
              className="bg-[#008755] hover:bg-[#008755]/90"
            >
              Add Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function EditWorkflowPage({ workflowId, onBack }: EditWorkflowPageProps) {
  // Workflow configuration state
  const [workflowNameEn, setWorkflowNameEn] = useState("Digital Project Lifecycle");
  const [workflowNameAr, setWorkflowNameAr] = useState("دورة حياة المشروع الرقمي");
  const [workflowDescEn, setWorkflowDescEn] = useState("Multi-stage approval workflow for digital transformation projects");
  const [workflowDescAr, setWorkflowDescAr] = useState("سير عمل الموافقة متعدد المراحل لمشاريع التحول الرقمي");
  const [projectType, setProjectType] = useState("Digital Projects");
  const [workflowTrigger, setWorkflowTrigger] = useState("Project Proposal Submission");

  // Approval steps state
  const [steps, setSteps] = useState<ApprovalStep[]>([
    {
      id: "step-1",
      order: 1,
      titleEn: "Upload Documents",
      titleAr: "تحميل المستندات",
      reviewer: "PMO Review Committee",
      timeLimit: 7,
      timeLimitUnit: "days",
      descriptionEn: "Upload required project documents",
      descriptionAr: "تحميل مستندات المشروع المطلوبة",
      stepType: "Project Approval",
      autoEscalation: false,
      checklistItems: [
        "Business Requirement Document",
        "Functional Requirement Document",
        "Legal Feasibility Assessment",
      ],
      availableChecklistItems: [
        "Project Charter",
        "Stakeholder Sign-off",
        "Risk Assessment Form",
        "Technical Feasibility Report",
      ],
      visibleTabs: [
        "Basic Information",
        "Timeline",
        "Goals & Benefits",
      ],
    },
    {
      id: "step-2",
      order: 2,
      titleEn: "Review document",
      titleAr: "مراجعة الوثيقة",
      reviewer: "Digital Transformation Team",
      timeLimit: 10,
      timeLimitUnit: "days",
      descriptionEn: "Review submitted documents",
      descriptionAr: "مراجعة المستندات المقدمة",
      stepType: "Document Review",
      autoEscalation: true,
      escalationAction: "Email Reminder",
      escalateAfter: 3,
      escalateAfterUnit: "days",
      checklistItems: [
        "Functional Requirement Document",
        "Technical Feasibility Report",
      ],
      availableChecklistItems: [
        "Business Requirement Document",
        "Project Charter",
        "Stakeholder Sign-off",
        "Risk Assessment Form",
        "Legal Feasibility Assessment",
      ],
      visibleTabs: [
        "Basic Information",
        "Timeline",
        "Goals & Benefits",
        "Team",
      ],
    },
  ]);

  const moveStep = (dragIndex: number, hoverIndex: number) => {
    const newSteps = [...steps];
    const [removed] = newSteps.splice(dragIndex, 1);
    newSteps.splice(hoverIndex, 0, removed);

    // Renumber steps
    const reordered = newSteps.map((step, index) => ({
      ...step,
      order: index + 1,
    }));

    setSteps(reordered);
  };

  const updateStep = (id: string, field: string, value: any) => {
    setSteps((prev) =>
      prev.map((step) =>
        step.id === id ? { ...step, [field]: value } : step
      )
    );
  };

  const removeStep = (id: string) => {
    const newSteps = steps.filter((step) => step.id !== id);
    // Renumber remaining steps
    const renumbered = newSteps.map((step, index) => ({
      ...step,
      order: index + 1,
    }));
    setSteps(renumbered);
  };

  const addStep = () => {
    const newStep: ApprovalStep = {
      id: `step-${Date.now()}`,
      order: steps.length + 1,
      titleEn: "",
      titleAr: "",
      reviewer: "PMO Review Committee",
      timeLimit: 7,
      timeLimitUnit: "days",
      descriptionEn: "",
      descriptionAr: "",
      stepType: "Project Approval",
      autoEscalation: false,
      checklistItems: [],
      availableChecklistItems: [
        "Business Requirement Document",
        "Functional Requirement Document",
        "Legal Feasibility Assessment",
        "Project Charter",
        "Stakeholder Sign-off",
        "Risk Assessment Form",
        "Technical Feasibility Report",
      ],
      visibleTabs: ["Basic Information"],
    };
    setSteps([...steps, newStep]);
  };

  const handleSave = () => {
    console.log("Saving workflow...", {
      workflowNameEn,
      workflowNameAr,
      workflowDescEn,
      workflowDescAr,
      projectType,
      workflowTrigger,
      steps,
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-full overflow-auto">
        <div className="space-y-3 p-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="-ml-2"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Workflows
              </Button>
              <div>
                <h1 className="text-xl font-['Dubai:Medium',_sans-serif] text-[#1f2937]">
                  Edit Workflow
                </h1>
                <p className="text-sm text-muted-foreground">
                  Configure approval steps and assign reviewers
                </p>
              </div>
            </div>
            <Button size="lg" onClick={handleSave} className="bg-[#008755] hover:bg-[#008755]/90">
              <Save className="h-4 w-4 mr-2" />
              Save Workflow
            </Button>
          </div>

          {/* Section 1: Workflow Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="font-['Dubai:Medium',_'Dubai']">
                Workflow Configuration — {workflowNameEn}
              </CardTitle>
              <CardDescription>
                Define workflow properties and trigger conditions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Workflow Names */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="workflow-name-en" className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                    Workflow Name (English) <span className="text-[#D83731]">*</span>
                  </label>
                  <input
                    id="workflow-name-en"
                    type="text"
                    className="w-full px-3 py-2 border rounded text-sm"
                    value={workflowNameEn}
                    onChange={(e) => setWorkflowNameEn(e.target.value)}
                    placeholder="Enter workflow name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="workflow-name-ar" className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                    Workflow Name (Arabic) <span className="text-[#D83731]">*</span>
                  </label>
                  <input
                    id="workflow-name-ar"
                    type="text"
                    className="w-full px-3 py-2 border rounded text-sm text-right"
                    value={workflowNameAr}
                    onChange={(e) => setWorkflowNameAr(e.target.value)}
                    placeholder="أدخل اسم سير العمل"
                    dir="rtl"
                    required
                  />
                </div>
              </div>

              {/* Workflow Descriptions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="workflow-desc-en" className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                    Workflow Description (English)
                  </label>
                  <textarea
                    id="workflow-desc-en"
                    className="w-full px-3 py-2 border rounded text-sm min-h-[100px]"
                    value={workflowDescEn}
                    onChange={(e) => setWorkflowDescEn(e.target.value)}
                    placeholder="Enter workflow description"
                    rows={4}
                  />
                </div>
                <div>
                  <label htmlFor="workflow-desc-ar" className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                    Workflow Description (Arabic)
                  </label>
                  <textarea
                    id="workflow-desc-ar"
                    className="w-full px-3 py-2 border rounded text-sm min-h-[100px] text-right"
                    value={workflowDescAr}
                    onChange={(e) => setWorkflowDescAr(e.target.value)}
                    placeholder="أدخل وصف سير العمل"
                    dir="rtl"
                    rows={4}
                  />
                </div>
              </div>

              {/* Project Type and Trigger */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="project-type" className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                    Applies to Project Type
                  </label>
                  <select
                    id="project-type"
                    className="w-full px-3 py-2 border rounded text-sm"
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                  >
                    <option value="Digital Projects">Digital Projects</option>
                    <option value="Non-Digital Projects">Non-Digital Projects</option>
                    <option value="All Project Types">All Project Types</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="workflow-trigger" className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                    Workflow Trigger
                  </label>
                  <select
                    id="workflow-trigger"
                    className="w-full px-3 py-2 border rounded text-sm"
                    value={workflowTrigger}
                    onChange={(e) => setWorkflowTrigger(e.target.value)}
                  >
                    <option value="Project Proposal Submission">Project Proposal Submission</option>
                    <option value="Directional Approval Granted">Directional Approval Granted</option>
                    <option value="Pilot Phase Completion">Pilot Phase Completion</option>
                    <option value="Manual Trigger">Manual Trigger</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Approval Steps */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                Approval Steps
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={addStep}
                className="border-[#BB9956] text-[#BB9956] hover:bg-[#BB9956]/10"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Step
              </Button>
            </div>

            {/* Steps List */}
            {steps.map((step, index) => (
              <DraggableStep
                key={step.id}
                step={step}
                index={index}
                moveStep={moveStep}
                onUpdate={updateStep}
                onRemove={removeStep}
              />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
