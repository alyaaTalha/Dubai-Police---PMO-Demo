import { useState, useRef, useEffect } from 'react';
import {
  Sparkles, ChevronRight, Check, Minus, Star, ArrowLeft,
  MessageSquare, FileText, AlertTriangle, CheckCircle2,
} from 'lucide-react';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Progress } from '../../ui/progress';
import { Textarea } from '../../ui/textarea';
import { Input } from '../../ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '../../ui/select';
import { cn } from '../../ui/utils';

// ── Types ─────────────────────────────────────────────────────────────────────
type IdeasRole = 'innovator' | 'coordinator' | 'director' | 'admin';
interface User { name: string; role: string; subtitle: string; xp: number; initials: string; chip: string; }
interface PageProps { user: User; role: IdeasRole; onNavigate: (id: string) => void; }

type Mode = null | 'ai' | 'form';
type Step = 'start' | 'problem' | 'solution' | 'beneficiaries' | 'benefits' | 'expertise' | 'review';

const STEPS: Step[] = ['start', 'problem', 'solution', 'beneficiaries', 'benefits', 'expertise', 'review'];

const STEP_LABELS: Record<Step, string> = {
  start: 'Your Idea',
  problem: 'Problem Statement',
  solution: 'Proposed Solution',
  beneficiaries: 'Beneficiaries',
  benefits: 'Expected Benefits',
  expertise: 'Area of Expertise',
  review: 'Review & Submit',
};

const AI_PROMPTS: Partial<Record<Step, string>> = {
  problem: 'Great! Can you describe the problem this solves?',
  solution: 'How exactly would your solution work?',
  beneficiaries: 'Who would benefit from this idea?',
  benefits: 'What measurable impact do you expect?',
  expertise: "What's your area of expertise related to this idea?",
};

const EXAMPLE_CHIPS = [
  'AI-powered queue management at service centers',
  'Smart patrol route optimization using traffic data',
  'Digital evidence management going fully paperless',
  'Predictive maintenance for police vehicles',
];

const DEPARTMENTS = [
  'Digital Transformation', 'Operations', 'Community Affairs',
  'HR & Training', 'Legal Affairs', 'Finance', 'Strategic Planning',
];

const CATEGORIES = [
  'Technology & Innovation', 'Process Improvement', 'Customer Experience',
  'Safety & Security', 'Environmental', 'Social Initiative',
];

// Simulated duplicate database
const SIMILAR_IDEAS: { keywords: string[]; title: string; submitter: string; year: number }[] = [
  { keywords: ['queue', 'waiting', 'service center'], title: 'AI-Powered Citizen Queue System', submitter: 'Fatima Al Mansoori', year: 2023 },
  { keywords: ['patrol', 'route', 'optimization'], title: 'Smart Patrol Analytics Dashboard', submitter: 'Omar Al Zaabi', year: 2024 },
  { keywords: ['evidence', 'paperless', 'digital evidence'], title: 'Digital Evidence Repository', submitter: 'Hessa Al Blooshi', year: 2023 },
  { keywords: ['maintenance', 'vehicle', 'fleet', 'predictive'], title: 'Predictive Fleet Maintenance AI', submitter: 'Khalid Al Ameri', year: 2024 },
];

interface Message { type: 'ai' | 'user'; text: string; }

// ── Duplicate check logic ─────────────────────────────────────────────────────
function findSimilar(text: string) {
  if (!text || text.length < 10) return null;
  const lower = text.toLowerCase();
  return SIMILAR_IDEAS.find(s => s.keywords.some(kw => lower.includes(kw))) ?? null;
}

// ── Circular progress SVG ─────────────────────────────────────────────────────
function CircularScore({ score }: { score: number }) {
  const r = 38;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - score / 100);
  return (
    <div className="relative h-24 w-24">
      <svg className="h-24 w-24 -rotate-90" viewBox="0 0 96 96">
        <circle cx="48" cy="48" r={r} fill="none" stroke="#e5e7eb" strokeWidth="8" />
        <circle
          cx="48" cy="48" r={r}
          fill="none" stroke="#008755" strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-['Dubai:Medium',_sans-serif] text-[#008755] leading-none">{score}%</span>
      </div>
    </div>
  );
}

// ── AI chat bubbles ───────────────────────────────────────────────────────────
function AiBubble({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="h-7 w-7 rounded-full bg-[#008755] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
        <Sparkles className="h-3.5 w-3.5 text-white" />
      </div>
      <div className="bg-[#008755]/10 border-l-2 border-[#008755] rounded-xl p-3 max-w-lg">
        <p className="text-sm text-foreground leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function UserBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <div className="bg-muted rounded-xl px-3 py-2 max-w-md border border-border">
        <p className="text-sm text-foreground leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

// ── Duplicate check tag ───────────────────────────────────────────────────────
function DuplicateCheckTag({ title }: { title: string }) {
  if (!title || title.length < 10) {
    return (
      <div className="flex items-center gap-1.5 rounded-lg bg-gray-50 border border-gray-200 px-3 py-2">
        <div className="h-1.5 w-1.5 rounded-full bg-gray-300 animate-pulse" />
        <span className="text-[11px] text-gray-400">Duplicate check — type your title to scan</span>
      </div>
    );
  }

  const similar = findSimilar(title);

  if (similar) {
    return (
      <div className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2.5 space-y-1">
        <div className="flex items-center gap-1.5">
          <AlertTriangle className="h-3.5 w-3.5 text-amber-600 flex-shrink-0" />
          <span className="text-[11px] font-['Dubai:Medium',_sans-serif] text-amber-700">Similar idea found</span>
        </div>
        <p className="text-[11px] text-amber-700 pl-5 leading-snug">
          "{similar.title}" — {similar.submitter}, {similar.year}
        </p>
        <p className="text-[10px] text-amber-500 pl-5">Review before submitting to avoid duplication</p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 rounded-lg bg-[#008755]/5 border border-[#008755]/20 px-3 py-2">
      <CheckCircle2 className="h-3.5 w-3.5 text-[#008755] flex-shrink-0" />
      <span className="text-[11px] text-[#008755] font-['Dubai:Medium',_sans-serif]">No duplicates detected</span>
    </div>
  );
}

// ── Right sidebar (shared) ────────────────────────────────────────────────────
function RightSidebar({
  completenessScore,
  fieldsChecked,
  ideaTitle,
  department,
  category,
  setDepartment,
  setCategory,
  showAiSuggestions,
}: {
  completenessScore: number;
  fieldsChecked: Record<string, boolean>;
  ideaTitle: string;
  department: string;
  category: string;
  setDepartment: (v: string) => void;
  setCategory: (v: string) => void;
  showAiSuggestions: boolean;
}) {
  return (
    <div className="flex-[2] p-6 overflow-y-auto">
      <div className="sticky top-0 space-y-3">

        {/* Duplicate check */}
        <DuplicateCheckTag title={ideaTitle} />

        <Card className="rounded-xl">
          <CardContent className="pt-4 pb-4">

            {/* Circular completeness score */}
            <div className="flex flex-col items-center py-4 border-b border-border mb-4">
              <CircularScore score={completenessScore} />
              <p className="text-sm font-['Dubai:Medium',_sans-serif] text-foreground mt-3">Idea Completeness</p>
              <p className="text-xs text-muted-foreground mt-0.5 text-center">
                Fill in all fields to maximise your score
              </p>
            </div>

            {/* Fields checklist */}
            <div className="space-y-2.5 mb-4">
              {Object.entries(fieldsChecked).map(([field, checked]) => (
                <div key={field} className="flex items-center gap-2.5">
                  <div className={cn(
                    'h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors',
                    checked ? 'bg-[#008755]/15' : 'bg-muted',
                  )}>
                    {checked
                      ? <Check className="h-3 w-3 text-[#008755]" />
                      : <Minus className="h-3 w-3 text-muted-foreground" />}
                  </div>
                  <span className={cn('text-xs', checked ? 'text-foreground' : 'text-muted-foreground')}>
                    {field}
                  </span>
                </div>
              ))}
            </div>

            {/* AI Suggestions */}
            {showAiSuggestions && (
              <div className="border-t border-border pt-4 mb-4 space-y-3">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-[#008755]" />
                  <p className="text-xs font-['Dubai:Medium',_sans-serif] text-[#008755]">AI Suggestions</p>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground mb-1.5">Suggested Department</p>
                  <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger size="sm" className="text-xs h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DEPARTMENTS.map(d => (
                        <SelectItem key={d} value={d} className="text-xs">{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground mb-1.5">Suggested Category</p>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger size="sm" className="text-xs h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(c => (
                        <SelectItem key={c} value={c} className="text-xs">{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* XP Preview */}
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mt-2">
              <Star className="h-4 w-4 text-amber-500 fill-amber-400 flex-shrink-0" />
              <span className="text-xs font-['Dubai:Medium',_sans-serif] text-amber-700">
                Submitting earns you +150 XP
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function SubmitIdeaPage({ user, role: _role, onNavigate }: PageProps) {
  const [mode, setMode] = useState<Mode>(null);
  const [step, setStep] = useState<Step>('start');
  const [answers, setAnswers] = useState({
    ideaText: '', problem: '', solution: '',
    beneficiaries: '', benefits: '', expertise: '',
  });
  const [currentInput, setCurrentInput] = useState('');
  const [department, setDepartment] = useState('Digital Transformation');
  const [category, setCategory] = useState('Technology & Innovation');
  const [messages, setMessages] = useState<Message[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const stepIndex = STEPS.indexOf(step) + 1;
  const progress = (stepIndex / 7) * 100;

  const fieldsChecked: Record<string, boolean> = {
    'Idea Title': !!answers.ideaText,
    'Problem Statement': !!answers.problem,
    'Proposed Solution': !!answers.solution,
    'Beneficiaries': !!answers.beneficiaries,
    'Expected Benefits': !!answers.benefits,
    'Area of Expertise': !!answers.expertise,
  };

  const completenessScore = Math.round(
    (Object.values(fieldsChecked).filter(Boolean).length / 6) * 100,
  );

  const showAiSuggestions = mode === 'ai' && STEPS.indexOf(step) >= 2;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ── AI path: advance conversation ─────────────────────────────────────────
  const handleAdvance = (inputValue: string) => {
    if (!inputValue.trim()) return;
    const trimmed = inputValue.trim();
    const next = [...messages, { type: 'user' as const, text: trimmed }];

    if (step === 'start') {
      next.push({ type: 'ai', text: AI_PROMPTS.problem! });
      setAnswers(p => ({ ...p, ideaText: trimmed }));
      setStep('problem');
    } else if (step === 'problem') {
      next.push({ type: 'ai', text: AI_PROMPTS.solution! });
      setAnswers(p => ({ ...p, problem: trimmed }));
      setStep('solution');
    } else if (step === 'solution') {
      next.push({ type: 'ai', text: AI_PROMPTS.beneficiaries! });
      setAnswers(p => ({ ...p, solution: trimmed }));
      setStep('beneficiaries');
    } else if (step === 'beneficiaries') {
      next.push({ type: 'ai', text: AI_PROMPTS.benefits! });
      setAnswers(p => ({ ...p, beneficiaries: trimmed }));
      setStep('benefits');
    } else if (step === 'benefits') {
      next.push({ type: 'ai', text: AI_PROMPTS.expertise! });
      setAnswers(p => ({ ...p, benefits: trimmed }));
      setStep('expertise');
    } else if (step === 'expertise') {
      setAnswers(p => ({ ...p, expertise: trimmed }));
      setStep('review');
    }

    setMessages(next);
    setCurrentInput('');
  };

  const handleSubmit = () => setSubmitted(true);

  // ── Submission success ────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-8">
        <div className="h-16 w-16 rounded-2xl bg-[#008755]/10 flex items-center justify-center mb-4">
          <Check className="h-8 w-8 text-[#008755]" />
        </div>
        <h2 className="font-['Dubai:Medium',_sans-serif] text-xl text-foreground mb-2">Idea Submitted!</h2>
        <p className="text-sm text-muted-foreground max-w-xs mb-3">
          Your idea has been submitted for review. You'll be notified when it moves forward.
        </p>
        <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-full px-4 py-2 mb-6">
          <Star className="h-4 w-4 text-amber-500 fill-amber-400" />
          <span className="text-sm font-['Dubai:Medium',_sans-serif] text-amber-700">+150 XP Earned!</span>
        </div>
        <Button onClick={() => onNavigate('my-ideas')} className="bg-[#008755] hover:bg-[#005844] text-white gap-1.5">
          View My Ideas <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  // ── Mode picker ───────────────────────────────────────────────────────────
  if (mode === null) {
    return (
      <div className="flex h-full overflow-hidden">
        <div className="flex-[3] flex flex-col justify-center px-10 border-r border-border">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-[#008755] transition-colors mb-8 w-fit"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Home
          </button>

          <h1 className="text-2xl font-['Dubai:Medium',_sans-serif] text-foreground mb-1">Submit an Idea</h1>
          <p className="text-sm text-muted-foreground mb-8">
            How would you like to build your submission?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
            {/* AI path */}
            <button
              onClick={() => setMode('ai')}
              className="group text-left rounded-2xl border-2 border-border hover:border-[#008755] bg-white hover:bg-[#008755]/3 p-6 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008755]"
            >
              <div className="h-10 w-10 rounded-xl bg-[#008755]/10 flex items-center justify-center mb-4 group-hover:bg-[#008755]/20 transition-colors">
                <MessageSquare className="h-5 w-5 text-[#008755]" />
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <p className="text-sm font-['Dubai:Medium',_sans-serif] text-foreground">Guide me with AI</p>
                <span className="text-[10px] bg-[#008755]/10 text-[#008755] rounded-full px-2 py-0.5 font-medium">Recommended</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Answer a few short questions. AI will shape your idea step by step and suggest department & category.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs text-[#008755] font-['Dubai:Medium',_sans-serif] opacity-0 group-hover:opacity-100 transition-opacity">
                Let's start <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </button>

            {/* Manual form path */}
            <button
              onClick={() => setMode('form')}
              className="group text-left rounded-2xl border-2 border-border hover:border-gray-400 bg-white hover:bg-gray-50 p-6 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
            >
              <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-colors">
                <FileText className="h-5 w-5 text-gray-600" />
              </div>
              <p className="text-sm font-['Dubai:Medium',_sans-serif] text-foreground mb-1.5">Fill in the form myself</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Prefer to write directly? See all fields at once and fill them in your own time.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs text-gray-500 font-['Dubai:Medium',_sans-serif] opacity-0 group-hover:opacity-100 transition-opacity">
                Open form <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </button>
          </div>
        </div>

        {/* Right col — static preview while choosing */}
        <div className="flex-[2] p-6 overflow-y-auto">
          <div className="sticky top-0 space-y-3">
            <DuplicateCheckTag title="" />
            <Card className="rounded-xl">
              <CardContent className="pt-4 pb-4">
                <div className="flex flex-col items-center py-4 border-b border-border mb-4">
                  <CircularScore score={0} />
                  <p className="text-sm font-['Dubai:Medium',_sans-serif] text-foreground mt-3">Idea Completeness</p>
                  <p className="text-xs text-muted-foreground mt-0.5 text-center">Choose a path to get started</p>
                </div>
                <div className="space-y-2.5 mb-4">
                  {Object.keys(fieldsChecked).map(field => (
                    <div key={field} className="flex items-center gap-2.5">
                      <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <Minus className="h-3 w-3 text-muted-foreground" />
                      </div>
                      <span className="text-xs text-muted-foreground">{field}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-400 flex-shrink-0" />
                  <span className="text-xs font-['Dubai:Medium',_sans-serif] text-amber-700">Submitting earns you +150 XP</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // ── Manual form path ──────────────────────────────────────────────────────
  if (mode === 'form') {
    return (
      <div className="flex h-full overflow-hidden">
        <div className="flex-[3] flex flex-col min-w-0 border-r border-border overflow-hidden">

          {/* Header */}
          <div className="flex-shrink-0 px-6 pt-6 pb-0">
            <button
              onClick={() => setMode(null)}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-[#008755] transition-colors mb-4 w-fit"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Change submission method
            </button>
            <div className="flex items-center gap-2 mb-1">
              <div className="h-6 w-6 rounded-lg bg-gray-100 flex items-center justify-center">
                <FileText className="h-3.5 w-3.5 text-gray-600" />
              </div>
              <h1 className="text-xl font-['Dubai:Medium',_sans-serif] text-foreground">Submit an Idea</h1>
            </div>
            <p className="text-sm text-muted-foreground mb-5">Fill in all fields below at your own pace.</p>
          </div>

          {/* Scrollable form */}
          <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-4 min-h-0">

            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-['Dubai:Medium',_sans-serif] text-foreground">
                Idea Title <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Give your idea a short, clear title"
                value={answers.ideaText}
                onChange={e => setAnswers(p => ({ ...p, ideaText: e.target.value }))}
                className="h-9 text-sm"
              />
            </div>

            {/* Problem Statement */}
            <div className="space-y-1.5">
              <label className="text-xs font-['Dubai:Medium',_sans-serif] text-foreground">
                Problem Statement <span className="text-red-500">*</span>
              </label>
              <p className="text-[11px] text-muted-foreground">What challenge or gap does this idea address?</p>
              <Textarea
                placeholder="Describe the problem in detail..."
                value={answers.problem}
                onChange={e => setAnswers(p => ({ ...p, problem: e.target.value }))}
                className="min-h-[80px] text-sm resize-none"
              />
            </div>

            {/* Proposed Solution */}
            <div className="space-y-1.5">
              <label className="text-xs font-['Dubai:Medium',_sans-serif] text-foreground">
                Proposed Solution <span className="text-red-500">*</span>
              </label>
              <p className="text-[11px] text-muted-foreground">How exactly would your solution work?</p>
              <Textarea
                placeholder="Explain how you'd solve it..."
                value={answers.solution}
                onChange={e => setAnswers(p => ({ ...p, solution: e.target.value }))}
                className="min-h-[80px] text-sm resize-none"
              />
            </div>

            {/* Beneficiaries */}
            <div className="space-y-1.5">
              <label className="text-xs font-['Dubai:Medium',_sans-serif] text-foreground">
                Beneficiaries <span className="text-red-500">*</span>
              </label>
              <p className="text-[11px] text-muted-foreground">Who would benefit — citizens, officers, departments?</p>
              <Textarea
                placeholder="e.g. Frontline officers, residents in North district..."
                value={answers.beneficiaries}
                onChange={e => setAnswers(p => ({ ...p, beneficiaries: e.target.value }))}
                className="min-h-[60px] text-sm resize-none"
              />
            </div>

            {/* Expected Benefits */}
            <div className="space-y-1.5">
              <label className="text-xs font-['Dubai:Medium',_sans-serif] text-foreground">
                Expected Benefits <span className="text-red-500">*</span>
              </label>
              <p className="text-[11px] text-muted-foreground">What measurable impact do you expect?</p>
              <Textarea
                placeholder="e.g. 30% reduction in wait time, cost saving of AED 200K/year..."
                value={answers.benefits}
                onChange={e => setAnswers(p => ({ ...p, benefits: e.target.value }))}
                className="min-h-[60px] text-sm resize-none"
              />
            </div>

            {/* Area of Expertise */}
            <div className="space-y-1.5">
              <label className="text-xs font-['Dubai:Medium',_sans-serif] text-foreground">
                Area of Expertise <span className="text-red-500">*</span>
              </label>
              <p className="text-[11px] text-muted-foreground">Your relevant background for this idea</p>
              <Input
                placeholder="e.g. Data Engineering, Field Operations, Legal Compliance..."
                value={answers.expertise}
                onChange={e => setAnswers(p => ({ ...p, expertise: e.target.value }))}
                className="h-9 text-sm"
              />
            </div>

            {/* Department + Category */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-['Dubai:Medium',_sans-serif] text-foreground">Department</label>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-['Dubai:Medium',_sans-serif] text-foreground">Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2 flex justify-end">
              <Button
                onClick={handleSubmit}
                disabled={completenessScore < 100}
                className="bg-[#008755] hover:bg-[#005844] text-white gap-1.5 disabled:opacity-50"
              >
                Submit Idea <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <RightSidebar
          completenessScore={completenessScore}
          fieldsChecked={fieldsChecked}
          ideaTitle={answers.ideaText}
          department={department}
          category={category}
          setDepartment={setDepartment}
          setCategory={setCategory}
          showAiSuggestions={false}
        />
      </div>
    );
  }

  // ── AI conversation path ──────────────────────────────────────────────────
  return (
    <div className="flex h-full overflow-hidden">
      <div className="flex-[3] flex flex-col min-w-0 border-r border-border overflow-hidden">

        {/* Static header */}
        <div className="flex-shrink-0 px-6 pt-6 pb-0">
          <button
            onClick={() => setMode(null)}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-[#008755] transition-colors mb-4 w-fit"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Change submission method
          </button>

          <div className="flex items-center gap-2 mb-1">
            <div className="h-6 w-6 rounded-lg bg-[#008755]/10 flex items-center justify-center">
              <MessageSquare className="h-3.5 w-3.5 text-[#008755]" />
            </div>
            <h1 className="text-xl font-['Dubai:Medium',_sans-serif] text-foreground">Submit an Idea</h1>
          </div>
          <p className="text-sm text-muted-foreground mb-5">
            AI will guide you step by step.
          </p>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-['Dubai:Medium',_sans-serif] text-muted-foreground">
                Step {stepIndex} of 7 — {STEP_LABELS[step]}
              </span>
              <span className="text-xs font-['Dubai:Medium',_sans-serif] text-[#008755]">
                {Math.round(progress)}% complete
              </span>
            </div>
            <Progress value={progress} indicatorColor="#008755" className="h-1.5" />
            <div className="flex gap-1 mt-1.5">
              {STEPS.map((s, i) => (
                <div
                  key={s}
                  className={cn(
                    'flex-1 h-0.5 rounded-full transition-all duration-300',
                    i < stepIndex ? 'bg-[#008755]' : 'bg-border',
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Conversation — scrolls independently */}
        <div className="flex-1 overflow-y-auto px-6 py-3 space-y-3 min-h-0">
          {step === 'start' && (
            <AiBubble
              text={`Hello ${user.name.split(' ')[0]}! I'm here to help you shape your idea. Describe it in your own words — no need to be perfect.`}
            />
          )}
          {messages.map((msg, i) =>
            msg.type === 'ai'
              ? <AiBubble key={i} text={msg.text} />
              : <UserBubble key={i} text={msg.text} />,
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input — pinned at bottom */}
        {step !== 'review' && (
          <div className="flex-shrink-0 space-y-3 border-t border-border px-6 pt-3 pb-4 bg-background">
            <Textarea
              value={currentInput}
              onChange={e => setCurrentInput(e.target.value)}
              placeholder={step === 'start' ? 'Describe your idea in your own words...' : 'Type your answer here...'}
              className="min-h-[90px]"
              onKeyDown={e => {
                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                  e.preventDefault();
                  handleAdvance(currentInput);
                }
              }}
            />
            {step === 'start' && (
              <div className="flex flex-wrap gap-2">
                {EXAMPLE_CHIPS.map(chip => (
                  <button
                    key={chip}
                    onClick={() => setCurrentInput(chip)}
                    className={cn(
                      'text-xs rounded-full px-3 py-1.5 border text-left transition-colors',
                      currentInput === chip
                        ? 'border-[#008755] bg-[#008755]/5 text-[#008755]'
                        : 'border-border bg-white text-muted-foreground hover:border-[#008755] hover:text-[#008755]',
                    )}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}
            <div className="flex justify-end">
              <Button
                onClick={() => handleAdvance(currentInput)}
                disabled={!currentInput.trim()}
                className="bg-[#008755] hover:bg-[#005844] text-white gap-1.5"
              >
                {step === 'expertise' ? 'Review Idea →' : 'Continue →'}
              </Button>
            </div>
          </div>
        )}

        {/* Review step */}
        {step === 'review' && (
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            <div className="bg-white rounded-xl border border-border divide-y divide-border overflow-hidden">
              {[
                { label: 'Idea Title', value: answers.ideaText },
                { label: 'Problem Statement', value: answers.problem },
                { label: 'Proposed Solution', value: answers.solution },
                { label: 'Beneficiaries', value: answers.beneficiaries },
                { label: 'Expected Benefits', value: answers.benefits },
                { label: 'Area of Expertise', value: answers.expertise },
              ].map(({ label, value }) => (
                <div key={label} className="px-4 py-3">
                  <p className="text-[11px] font-['Dubai:Medium',_sans-serif] text-muted-foreground mb-0.5">{label}</p>
                  <p className="text-sm text-foreground leading-relaxed">{value || '—'}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs font-['Dubai:Medium',_sans-serif] text-muted-foreground mb-1.5">Department</p>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p className="text-xs font-['Dubai:Medium',_sans-serif] text-muted-foreground mb-1.5">Category</p>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-between items-center pt-1">
              <Button variant="outline" size="sm" onClick={() => setStep('expertise')}>
                <ArrowLeft className="h-3.5 w-3.5" /> Back
              </Button>
              <Button onClick={handleSubmit} className="bg-[#008755] hover:bg-[#005844] text-white gap-1.5">
                Submit Idea <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      <RightSidebar
        completenessScore={completenessScore}
        fieldsChecked={fieldsChecked}
        ideaTitle={answers.ideaText}
        department={department}
        category={category}
        setDepartment={setDepartment}
        setCategory={setCategory}
        showAiSuggestions={showAiSuggestions}
      />
    </div>
  );
}
