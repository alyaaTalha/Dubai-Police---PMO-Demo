import { useState } from "react";
import { X, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useLanguage } from "../../i18n/LanguageContext";

interface AddTaskPanelProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  milestoneId: string;
  milestoneName: string;
}

export function AddTaskPanel({ isOpen, onClose, projectName, milestoneId, milestoneName }: AddTaskPanelProps) {
  const { tr } = useLanguage();
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
      <div className="fixed end-0 top-0 h-full w-[45%] bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right rtl:slide-in-from-left duration-300">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-[#008755]/20 px-6 py-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-lg font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-1">
                {tr("Add Task", "إضافة مهمة")}
              </h2>
              <p className="text-sm text-muted-foreground">
                {tr("Linked to Project:", "مرتبطة بالمشروع:")} <span className="text-[#008755] font-['Dubai:Medium',_'Dubai']">{projectName}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {tr("Milestone:", "المرحلة الرئيسية:")} {milestoneName}
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
                {tr("Basic Information", "المعلومات الأساسية")}
              </h3>
              
              <div>
                <label className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-1 block">
                  {tr("Task ID (Auto-generated)", "رقم المهمة (يُنشأ تلقائيًا)")}
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
                  {tr("Task Name", "اسم المهمة")} <span className="text-[#D83731]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.taskName}
                  onChange={(e) => setFormData({ ...formData, taskName: e.target.value })}
                  placeholder={tr("Enter task name", "أدخل اسم المهمة")}
                  className="w-full px-3 py-2 text-sm border border-muted rounded focus:outline-none focus:ring-2 focus:ring-[#008755]/20 focus:border-[#008755]"
                />
              </div>

              <div>
                <label className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-1 block">
                  {tr("Project (Read-only)", "المشروع (للقراءة فقط)")}
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
                {tr("Duration", "المدة")}
              </h3>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-1 block">
                    {tr("Duration (days)", "المدة (أيام)")}
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
                    {tr("Start Date", "تاريخ البدء")}
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
                    {tr("Finish Date", "تاريخ الانتهاء")}
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
                  {tr("💡 Finish date auto-calculated based on duration and start date.", "💡 يُحتسب تاريخ الانتهاء تلقائيًا بناءً على المدة وتاريخ البدء.")}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-muted" />

            {/* SECTION 3 - PROGRESS & COST */}
            <div className="space-y-4">
              <h3 className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#008755] uppercase tracking-wide">
                {tr("Progress & Cost", "التقدم والتكلفة")}
              </h3>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-1 block">
                    {tr("% Complete", "نسبة الإنجاز %")}
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
                    {tr("Budget Cost (AED)", "التكلفة المعتمدة (درهم)")}
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
                    {tr("Actual Cost (AED)", "التكلفة الفعلية (درهم)")}
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
                  {tr("Task Weight", "وزن المهمة")}
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
                  {tr("Status", "الحالة")} <span className="text-[#D83731]">*</span>
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-muted rounded focus:outline-none focus:ring-2 focus:ring-[#008755]/20 focus:border-[#008755]"
                >
                  <option value="Not Started">{tr("Not Started", "لم يبدأ")}</option>
                  <option value="In Progress">{tr("In Progress", "قيد التنفيذ")}</option>
                  <option value="Delayed">{tr("Delayed", "متأخر")}</option>
                  <option value="Completed">{tr("Completed", "مكتمل")}</option>
                </select>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-muted" />

            {/* SECTION 4 - DEPENDENCIES */}
            <div className="space-y-4">
              <h3 className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#008755] uppercase tracking-wide">
                {tr("Dependencies", "الاعتماديات")}
              </h3>

              <div>
                <label className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-1 block">
                  {tr("Predecessors", "المهام السابقة")}
                </label>
                <select
                  multiple
                  className="w-full px-3 py-2 text-sm border border-muted rounded focus:outline-none focus:ring-2 focus:ring-[#008755]/20 focus:border-[#008755] h-24"
                >
                  <option value="T1">{tr("T1 - Stakeholder Interviews", "T1 - مقابلات أصحاب المصلحة")}</option>
                  <option value="T2">{tr("T2 - Requirements Documentation", "T2 - توثيق المتطلبات")}</option>
                  <option value="T4">{tr("T4 - Architecture Design", "T4 - تصميم البنية")}</option>
                  <option value="T5">{tr("T5 - Database Schema Design", "T5 - تصميم مخطط قاعدة البيانات")}</option>
                </select>
                <p className="text-xs text-muted-foreground mt-1">{tr("Hold Ctrl/Cmd to select multiple tasks", "اضغط مع الاستمرار على Ctrl/Cmd لاختيار عدة مهام")}</p>
              </div>

              <div className="bg-muted/30 border border-muted rounded p-3">
                <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-1">{tr("Dependency Chain Preview:", "معاينة سلسلة الاعتماديات:")}</p>
                <p className="text-xs text-[#008755]">{tr("No dependencies selected", "لم يتم اختيار أي اعتماديات")}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-muted" />

            {/* SECTION 5 - ASSIGNMENT */}
            <div className="space-y-4">
              <h3 className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#008755] uppercase tracking-wide">
                {tr("Assignment", "الإسناد")}
              </h3>

              <div>
                <label className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-1 block">
                  {tr("Assigned To", "مسندة إلى")}
                </label>
                <select
                  multiple
                  className="w-full px-3 py-2 text-sm border border-muted rounded focus:outline-none focus:ring-2 focus:ring-[#008755]/20 focus:border-[#008755] h-24"
                >
                  <option value="sarah">{tr("Sarah Ahmed", "سارة أحمد")}</option>
                  <option value="ali">{tr("Ali Hassan", "علي حسن")}</option>
                  <option value="fatima">{tr("Fatima Ibrahim", "فاطمة إبراهيم")}</option>
                  <option value="mohammed">{tr("Mohammed Ali", "محمد علي")}</option>
                  <option value="ahmed">{tr("Ahmed Khalil", "أحمد خليل")}</option>
                  <option value="layla">{tr("Layla Mohammed", "ليلى محمد")}</option>
                </select>
                <p className="text-xs text-muted-foreground mt-1">{tr("Hold Ctrl/Cmd to select multiple team members", "اضغط مع الاستمرار على Ctrl/Cmd لاختيار عدة أعضاء من الفريق")}</p>
              </div>

              <div>
                <label className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-1 block">
                  {tr("Priority", "الأولوية")}
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-muted rounded focus:outline-none focus:ring-2 focus:ring-[#008755]/20 focus:border-[#008755]"
                >
                  <option value="Low">{tr("Low", "منخفضة")}</option>
                  <option value="Medium">{tr("Medium", "متوسطة")}</option>
                  <option value="High">{tr("High", "مرتفعة")}</option>
                  <option value="Critical">{tr("Critical", "حرجة")}</option>
                </select>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-muted" />

            {/* SECTION 6 - AI TASK INSIGHT (Collapsible) */}
            <div className="space-y-3">
              <div 
                className="flex items-center justify-between cursor-pointer p-3 bg-gradient-to-r rtl:bg-gradient-to-l from-[#008755]/5 to-white border border-[#008755]/20 rounded hover:bg-[#008755]/10 transition-colors"
                onClick={() => setAiInsightExpanded(!aiInsightExpanded)}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#008755]" />
                  <h3 className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                    {tr("AI Task Insight", "رؤى الذكاء الاصطناعي للمهمة")}
                  </h3>
                  <Badge className="bg-[#008755]/10 text-[#008755] text-xs">{tr("Intelligence Layer", "طبقة الذكاء")}</Badge>
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
                      {tr("⚠️ Predicted Delay Risk", "⚠️ خطر التأخير المتوقع")}
                    </p>
                    <p className="text-sm text-[#F2A200]">{tr("Medium Risk - 15% probability of 3-day delay", "خطر متوسط - احتمال 15% لتأخير مدته 3 أيام")}</p>
                    <p className="text-xs text-muted-foreground mt-1">{tr("Based on similar historical tasks", "استنادًا إلى مهام سابقة مماثلة")}</p>
                  </div>

                  {/* Recommended Duration */}
                  <div className="p-3 bg-[#008755]/5 border border-[#008755]/30 rounded">
                    <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-1">
                      {tr("💡 Recommended Duration Adjustment", "💡 تعديل المدة المقترح")}
                    </p>
                    <p className="text-sm text-[#008755]">{tr("Add 2-3 buffer days for optimal scheduling", "أضف 2-3 أيام احتياطية لجدولة مثالية")}</p>
                    <p className="text-xs text-muted-foreground mt-1">{tr("AI analysis suggests extended timeline", "يقترح تحليل الذكاء الاصطناعي تمديد الجدول الزمني")}</p>
                  </div>

                  {/* Dependency Conflict */}
                  <div className="p-3 bg-[#357743]/5 border border-[#357743]/30 rounded">
                    <p className="text-xs font-['Dubai:Medium',_'Dubai'] text-muted-foreground mb-1">
                      {tr("✓ Dependency Conflict Detection", "✓ كشف تعارض الاعتماديات")}
                    </p>
                    <p className="text-sm text-[#357743]">{tr("No conflicts detected", "لم يتم اكتشاف أي تعارضات")}</p>
                    <p className="text-xs text-muted-foreground mt-1">{tr("Task dependencies are properly aligned", "اعتماديات المهمة متوافقة بشكل صحيح")}</p>
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
              {tr("Cancel", "إلغاء")}
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="text-[#008755] hover:bg-[#008755]/10"
              >
                {tr("Save & Add Another", "حفظ وإضافة أخرى")}
              </Button>
              <Button
                className="bg-[#008755] hover:bg-[#006644] text-white"
              >
                {tr("Save Task", "حفظ المهمة")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
