import { useEffect, useRef, useState } from 'react';
import { Sparkles, Send } from 'lucide-react';
import { cn } from '../../ui/utils';
import type { SandboxStore } from '../SandboxStore';

interface PageProps { store: SandboxStore; }

const CHIPS = [
  'How many patents are under approval?',
  'Which department leads on R&D?',
  'Show projects with no evaluator',
  'What reached Sandbox stage this year?',
  'Compare budget across project types',
];

function getReply(question: string): string {
  const q = question.toLowerCase();
  if (q.includes('patent')) {
    return '5 patents are currently under approval out of 12 filed. The oldest pending filing is Predictive Patrol Routing Method (submitted 30 Jul 2025, 412 days in queue).\n\nGranted: 7 · Pending: 5 · Trademarks: 9\nSource: IP Register · 13 records';
  }
  if (q.includes('r&d') || q.includes('research') || q.includes('department lead')) {
    return 'Digital Transformation leads R&D with 2 of 6 active research projects and AED 7.1M allocated — followed by Operations and Forensics.\n\nR&D Projects: 6 · Budget: 16.0M · Studies: 38\nSource: Project register, filtered type = R&D';
  }
  if (q.includes('evaluator') || q.includes('unassigned')) {
    return '4 projects have no evaluator assigned: Autonomous Patrol Drone Study, Next-Gen Body Camera Optics, Multilingual Virtual Help Assistant and Drone-Assisted Crowd Analytics. Two have been waiting over 14 days.\n\nRecommend assigning before the quarterly review.';
  }
  if (q.includes('sandbox')) {
    return '4 projects have reached Sandbox stage: Quantum-Resistant Encryption Pilot, AI Complaint Triage Engine, Smart Queue Management and Officer Field Manual Digitization — a 33% increase on last year.\n\nSource: Stage funnel, all types';
  }
  if (q.includes('budget') || q.includes('compare')) {
    return 'Budget splits as follows across the portfolio:\n\nR&D: 16.0M · Innovation: 21.6M · Knowledge: 12.6M\n\nInnovation holds the largest share at 43%, driven by Digital Twin — Traffic Network (AED 6.8M).\nSource: 20 project records';
  }
  return 'I can answer questions on projects, budgets, patents, partners, evaluation scores and stage progression. Try asking about patents under approval, unassigned evaluators, or budget by type.';
}

export function AssistantPage(_props: PageProps) {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'ai'; content: string }>>([
    { role: 'ai', content: 'Good morning, Mohammed. The portfolio holds 20 projects worth AED 50.2M across R&D, Innovation and Knowledge. Four projects are awaiting evaluator assignment and five patents are pending approval. What would you like to look at?' },
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = (text?: string) => {
    const q = (text ?? input).trim();
    if (!q) return;
    setMessages(prev => [...prev, { role: 'user', content: q }]);
    setInput('');
    setTimeout(() => setMessages(prev => [...prev, { role: 'ai', content: getReply(q) }]), 500);
  };

  return (
    <div className="p-5 max-w-[1000px] mx-auto h-full">
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col h-[75vh] min-h-[480px]">
        <div className="bg-gradient-to-r from-[#005844] via-[#008755] to-[#00a869] px-6 py-5 flex items-center gap-4 text-white flex-shrink-0">
          <div className="h-11 w-11 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-['Dubai:Medium',_sans-serif]">Sandbox Intelligence Assistant</h3>
            <p className="text-xs text-white/85 mt-0.5">Ask anything about projects, patents, partners or evaluations — answers are grounded in platform data.</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 bg-[#fbfcfc]">
          {messages.map((m, i) => (
            <div key={i} className={cn('flex gap-2.5 max-w-[78%]', m.role === 'user' ? 'ml-auto flex-row-reverse' : '')}>
              <div className={cn('h-8 w-8 rounded-lg flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white',
                m.role === 'user' ? 'bg-foreground' : 'bg-gradient-to-br from-[#00a869] to-[#005844]')}>
                {m.role === 'user' ? 'MH' : 'AI'}
              </div>
              <div className={cn('rounded-2xl px-4 py-3 text-xs leading-relaxed whitespace-pre-line shadow-sm',
                m.role === 'user' ? 'bg-[#008755] text-white rounded-tr-sm' : 'bg-white border border-border rounded-tl-sm')}>
                {m.content}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <div className="flex flex-wrap gap-2 px-6 pt-3 bg-[#fbfcfc] flex-shrink-0">
          {CHIPS.map(c => (
            <button key={c} onClick={() => send(c)} className="text-[11px] font-medium px-3 py-1.5 rounded-full border border-border hover:border-[#008755] hover:text-[#008755] hover:bg-[#008755]/5 transition-colors">
              {c}
            </button>
          ))}
        </div>

        <div className="flex gap-2.5 px-6 py-4 border-t border-border bg-white flex-shrink-0">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
            placeholder="Ask about projects, patents, partners, or evaluations…"
            className="flex-1 rounded-xl border border-border bg-muted/30 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#008755]/20 focus:border-[#008755] transition-colors"
          />
          <button onClick={() => send()} className="h-11 w-11 rounded-xl bg-[#008755] hover:bg-[#005844] text-white flex items-center justify-center flex-shrink-0 transition-colors">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
