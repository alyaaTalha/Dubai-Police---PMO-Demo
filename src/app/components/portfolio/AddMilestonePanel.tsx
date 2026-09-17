import { useState } from "react";
import { X, ChevronDown, ChevronRight, CheckCircle2, Clock, AlertCircle, Upload } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface AddMilestonePanelProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
}

type SectionStatus = "Not Started" | "In Progress" | "Completed";

interface AccordionSection {
  id: string;
  title: string;
  status: SectionStatus;
  isExpanded: boolean;
}

export function AddMilestonePanel({ isOpen, onClose, projectName }: AddMilestonePanelProps) {
  const [sections, setSections] = useState<AccordionSection[]>([
    { id: "discovery", title: "Discovery", status: "Not Started", isExpanded: false },
    { id: "rootCause", title: "Root Cause Analysis & Impact Quantification", status: "Not Started", isExpanded: false },
    { id: "solution", title: "Solution Identification", status: "Not Started", isExpanded: false },
    { id: "roadmap", title: "Solution Implementation Roadmap", status: "Not Started", isExpanded: false },
  ]);

  const [formData, setFormData] = useState({
    project: "",
    titleEnglish: "",
    titleArabic: "",
    plannedBudget: "",
    actualBudget: "",
    file: null as File | null,
    comments: "",
    department: "",
    section: "",
  });

  const toggleSection = (sectionId: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? { ...section, isExpanded: !section.isExpanded }
          : section
      )
    );
  };

  const getStatusIcon = (status: SectionStatus) => {
    switch (status) {
      case "Completed":
        return <CheckCircle2 className="h-4 w-4 text-[#357743]" />;
      case "In Progress":
        return <Clock className="h-4 w-4 text-[#008755]" />;
      case "Not Started":
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: SectionStatus) => {
    switch (status) {
      case "Completed":
        return "bg-[#357743]/10 text-[#357743]";
      case "In Progress":
        return "bg-[#008755]/10 text-[#008755]";
      case "Not Started":
        return "bg-muted text-muted-foreground";
    }
  };

  if (!isOpen) return null;

  const renderFieldGroups = () => (
    <div className="space-y-6 p-4">
      {/* Group 1: Project Info */}
      <div className="space-y-4">
        <h4 className="text-xs font-['Dubai:Medium',_'Dubai'] text-black uppercase tracking-wide flex items-center gap-2">
          Project Info
        </h4>
        
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-1 block">
              Project <span className="text-[#D83731]">*</span>
            </label>
            <select
              value={formData.project}
              onChange={(e) => setFormData({ ...formData, project: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008755]/20 focus:border-[#008755]"
            >
              <option value="">Select project</option>
              <option value="blockchain">Blockchain Integration Project</option>
              <option value="ai-analytics">AI Analytics Platform</option>
              <option value="mobile-app">Mobile Application Development</option>
              <option value="data-migration">Data Migration Initiative</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-1 block">
                Title (English) <span className="text-[#D83731]">*</span>
              </label>
              <input
                type="text"
                value={formData.titleEnglish}
                onChange={(e) => setFormData({ ...formData, titleEnglish: e.target.value })}
                placeholder="Enter milestone title in English"
                className="w-full px-3 py-2 text-sm border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008755]/20 focus:border-[#008755]"
              />
            </div>

            <div>
              <label className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-1 block">
                Title (Arabic) <span className="text-[#D83731]">*</span>
              </label>
              <input
                type="text"
                value={formData.titleArabic}
                onChange={(e) => setFormData({ ...formData, titleArabic: e.target.value })}
                placeholder="أدخل عنوان المعلم بالعربية"
                dir="rtl"
                className="w-full px-3 py-2 text-sm border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008755]/20 focus:border-[#008755]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-muted/50" />

      {/* Group 2: Cost & Budgeting */}
      <div className="space-y-4">
        <h4 className="text-xs font-['Dubai:Medium',_'Dubai'] text-black uppercase tracking-wide flex items-center gap-2">
          Cost & Budgeting
        </h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-1 block">
              Planned Budget (AED) <span className="text-[#D83731]">*</span>
            </label>
            <input
              type="number"
              value={formData.plannedBudget}
              onChange={(e) => setFormData({ ...formData, plannedBudget: e.target.value })}
              placeholder="0"
              className="w-full px-3 py-2 text-sm border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008755]/20 focus:border-[#008755]"
            />
          </div>

          <div>
            <label className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-1 block">
              Actual Budget (AED) <span className="text-[#D83731]">*</span>
            </label>
            <input
              type="number"
              value={formData.actualBudget}
              onChange={(e) => setFormData({ ...formData, actualBudget: e.target.value })}
              placeholder="0"
              className="w-full px-3 py-2 text-sm border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008755]/20 focus:border-[#008755]"
            />
          </div>
        </div>

       
      </div>

      {/* Divider */}
      <div className="border-t border-muted/50" />

      {/* Group 3: Evidence */}
      <div className="space-y-4">
        <h4 className="text-xs font-['Dubai:Medium',_'Dubai'] text-black uppercase tracking-wide flex items-center gap-2">
          Evidence
        </h4>
        
        <div>
          <label className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-1 block">
            File Upload <span className="text-[#D83731]">*</span>
          </label>
            <input type="file" className="w-full border border-gray-100 rounded-md focus-visible:border-gray-300 focus-visible:ring-gray-300 outline-none bg-gray-100 text-gray-700 focus:border-gray-300 file:cursor-pointer file:border-0 file:me-2 file:py-[5px] file:px-[10px] file:rounded-l-md file:text-sm file:bg-gray-200 file:hover:bg-gray-300 file:text-gray-800"/>
          
          {/* <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center hover:border-[#008755] transition-colors cursor-pointer">
            <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-[#1f2937] font-['Dubai:Medium',_'Dubai'] mb-1">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-muted-foreground">
              PDF, DOC, DOCX, XLS, XLSX (Max 10MB)
            </p>
            {formData.file && (
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-[#357743]/10 text-[#357743] rounded text-xs">
                <CheckCircle2 className="h-3 w-3" />
                {formData.file.name}
              </div>
            )}
          </div> */}
        </div>

        <div>
          <label className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-1 block">
            Comments
          </label>
          <textarea
            value={formData.comments}
            onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
            placeholder="Add any additional comments or notes..."
            rows={4}
            className="w-full px-3 py-2 text-sm border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008755]/20 focus:border-[#008755] resize-none"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-muted/50" />

      {/* Group 4: Organization Unit */}
      <div className="space-y-4">
        <h4 className="text-xs font-['Dubai:Medium',_'Dubai'] text-black uppercase tracking-wide flex items-center gap-2">
          Organization Unit
        </h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-1 block">
              Department <span className="text-[#D83731]">*</span>
            </label>
            <select
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008755]/20 focus:border-[#008755]"
            >
              <option value="">Select department</option>
              <option value="it">Information Technology</option>
              <option value="operations">Operations</option>
              <option value="policy">Policy and Legislation</option>
              <option value="strategy">Strategy and Planning</option>
              <option value="finance">Finance</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-1 block">
              Section <span className="text-[#D83731]">*</span>
            </label>
            <select
              value={formData.section}
              onChange={(e) => setFormData({ ...formData, section: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008755]/20 focus:border-[#008755]"
            >
              <option value="">Select section</option>
              <option value="development">Development</option>
              <option value="infrastructure">Infrastructure</option>
              <option value="security">Security & Compliance</option>
              <option value="data">Data Management</option>
              <option value="support">Support Services</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Overlay Background */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Sliding Panel */}
      <div className="fixed right-0 top-0 h-full w-[50%] bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10  px-6 py-5 pb-0 shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-['Dubai:Medium',_'Dubai'] text-black mb-1">
                Add Milestone
              </h2>
              <p className="text-sm text-black">
                Linked to Project: <span className="font-['Dubai:Medium',_'Dubai']">{projectName}</span>
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 bg-white/20 rounded-md text-black/50"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Progress Indicator */}
          <div className="mt-4 flex items-center gap-2">
            {sections.map((section, index) => (
              <div key={section.id} className="flex-1">
                <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      section.status === "Completed" ? "bg-[#357743] w-full" :
                      section.status === "In Progress" ? "bg-white/60 w-1/2" :
                      "bg-transparent w-0"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="space-y-3">
            {sections.map((section) => (
              <div key={section.id} className="border border-muted rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {/* Accordion Header */}
                <div
                  onClick={() => toggleSection(section.id)}
                  className={`flex items-center justify-between p-4 cursor-pointer transition-all ${
                    section.isExpanded 
                      ? "bg-gradient-to-r from-[#008755]/10 to-white" 
                      : "bg-white hover:bg-muted/30"
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`transition-transform duration-300 ${section.isExpanded ? "rotate-90" : ""}`}>
                      <ChevronRight className="h-5 w-5 text-[#008755]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                        {section.title}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(section.status)}
                    <Badge className={`${getStatusColor(section.status)} text-xs`}>
                      {section.status}
                    </Badge>
                  </div>
                </div>

                {/* Accordion Content */}
                {section.isExpanded && (
                  <div className="bg-white border-t border-muted">
                    {renderFieldGroups()}
                  </div>
                )}
              </div>
            ))}
          </div>

         
        </div>

        {/* Sticky Footer */}
        <div className="sticky bottom-0 bg-white border-t border-[#008755]/20 px-6 py-4 shadow-lg">
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
                Save Draft
              </Button>
              <Button
                className="bg-[#008755] hover:bg-[#006644] text-white"
              >
                Create Milestone
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
