import { useState } from 'react';
import { toast } from 'sonner';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { DEPARTMENTS, STAGES, type Project, type ProjectType } from './sandboxData';
import type { SandboxStore } from './SandboxStore';
import { useLanguage } from '../../i18n/LanguageContext';
import { useSandboxTr } from './sandboxI18n';

interface NewProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  store: SandboxStore;
  defaultType?: ProjectType;
}

export function NewProjectDialog({ open, onOpenChange, store, defaultType }: NewProjectDialogProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState<ProjectType>(defaultType ?? 'rd');
  const [dept, setDept] = useState(DEPARTMENTS[0]);
  const [stage, setStage] = useState<Project['stage']>('Idea');
  const [budget, setBudget] = useState('1.0');
  const [start, setStart] = useState('2026');
  const [end, setEnd] = useState('2027');
  const [desc, setDesc] = useState('');
  const { tr } = useLanguage();
  const ts = useSandboxTr();

  const reset = () => { setName(''); setBudget('1.0'); setDesc(''); };

  const handleSave = () => {
    if (!name.trim()) { toast.error(tr('Please enter a project title', 'يرجى إدخال عنوان المشروع')); return; }
    const id = `P-${900 + Math.floor(Math.random() * 90)}`;
    const cls = type === 'innov' ? 'IN2' : type === 'know' ? 'Class 6' : '—';
    const project: Project = {
      id, name: name.trim(), type, status: 'Pending Approval', stage,
      budget: parseFloat(budget) || 1.0, dept, start: +start, end: +end, cls,
      evaluator: null, score: null, partners: [], ip: [],
      desc: desc.trim() || 'Newly registered project awaiting feasibility assessment.',
    };
    store.setProjects(prev => [project, ...prev]);
    store.addAudit({
      title: 'Project registered',
      detail: `${project.name} added to the portfolio by Mohammed Hassan`,
      kind: 'ok',
    });
    toast.success(tr(`"${project.name}" registered successfully`, `تم تسجيل «${project.name}» بنجاح`));
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className=" ">{tr('Register New Project', 'تسجيل مشروع جديد')}</DialogTitle>
          <DialogDescription>{tr('Add an R&D, Innovation or Knowledge project to the portfolio', 'أضف مشروعاً للبحث والتطوير أو الابتكار أو المعرفة إلى المحفظة')}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-1">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">{tr('Project Title', 'عنوان المشروع')}</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={tr('e.g. Autonomous Evidence Drone Pilot', 'مثال: تجربة الطائرات المسيّرة ذاتية القيادة لجمع الأدلة')} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">{tr('Project Type', 'نوع المشروع')}</label>
              <Select value={type} onValueChange={(v) => setType(v as ProjectType)}>
                <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="rd">{tr('Research & Development', 'البحث والتطوير')}</SelectItem>
                  <SelectItem value="innov">{tr('Innovation', 'الابتكار')}</SelectItem>
                  <SelectItem value="know">{tr('Knowledge', 'المعرفة')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">{tr('Department', 'الإدارة')}</label>
              <Select value={dept} onValueChange={setDept}>
                <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {DEPARTMENTS.map(d => <SelectItem key={d} value={d}>{ts(d)}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">{tr('Stage', 'المرحلة')}</label>
              <Select value={stage} onValueChange={(v) => setStage(v as Project['stage'])}>
                <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {STAGES.map(s => <SelectItem key={s} value={s}>{ts(s)}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">{tr('Budget (AED M)', 'الميزانية (مليون درهم)')}</label>
              <Input type="number" step="0.1" value={budget} onChange={(e) => setBudget(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">{tr('Start Year', 'سنة البدء')}</label>
              <Select value={start} onValueChange={setStart}>
                <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['2024', '2025', '2026'].map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">{tr('Expected Finish', 'الانتهاء المتوقع')}</label>
              <Select value={end} onValueChange={setEnd}>
                <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['2026', '2027', '2028'].map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">{tr('Description', 'الوصف')}</label>
            <Textarea rows={3} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder={tr('Brief summary of scope and expected outcome…', 'ملخص موجز للنطاق والنتائج المتوقعة…')} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>{tr('Cancel', 'إلغاء')}</Button>
          <Button className="bg-[#008755] hover:bg-[#005844] text-white" onClick={handleSave}>{tr('Register Project', 'تسجيل المشروع')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
