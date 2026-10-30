import { useEffect, useRef, useState } from 'react';
import { Sparkles, Send } from 'lucide-react';
import { cn } from '../../ui/utils';
import type { SandboxStore } from '../SandboxStore';
import { useLanguage } from '../../../i18n/LanguageContext';

interface PageProps { store: SandboxStore; }

interface BiText { en: string; ar: string; }

const CHIPS: BiText[] = [
  { en: 'How many patents are under approval?', ar: 'كم عدد براءات الاختراع قيد الاعتماد؟' },
  { en: 'Which department leads on R&D?', ar: 'ما الإدارة الرائدة في البحث والتطوير؟' },
  { en: 'Show projects with no evaluator', ar: 'اعرض المشاريع التي ليس لها مقيّم' },
  { en: 'What reached Sandbox stage this year?', ar: 'ما المشاريع التي وصلت إلى مرحلة البيئة التجريبية هذا العام؟' },
  { en: 'Compare budget across project types', ar: 'قارن الميزانية بين أنواع المشاريع' },
];

const GREETING: BiText = {
  en: 'Good morning, Mohammed. The portfolio holds 20 projects worth AED 50.2M across R&D, Innovation and Knowledge. Four projects are awaiting evaluator assignment and five patents are pending approval. What would you like to look at?',
  ar: 'صباح الخير يا محمد. تضم المحفظة 20 مشروعاً بقيمة 50.2 مليون درهم موزعة على البحث والتطوير والابتكار والمعرفة. هناك أربعة مشاريع بانتظار إسناد مقيّم، وخمس براءات اختراع بانتظار الاعتماد. ما الذي تود الاطلاع عليه؟',
};

function getReply(question: string): BiText {
  const q = question.toLowerCase();
  if (q.includes('patent') || q.includes('براء')) {
    return {
      en: '5 patents are currently under approval out of 12 filed. The oldest pending filing is Predictive Patrol Routing Method (submitted 30 Jul 2025, 412 days in queue).\n\nGranted: 7 · Pending: 5 · Trademarks: 9\nSource: IP Register · 13 records',
      ar: 'توجد حالياً 5 براءات اختراع قيد الاعتماد من أصل 12 براءة مودعة. أقدم طلب معلّق هو طريقة التوجيه التنبؤي للدوريات (قُدّم في 30 يوليو 2025، منذ 412 يوماً في قائمة الانتظار).\n\nممنوحة: 7 · معلّقة: 5 · علامات تجارية: 9\nالمصدر: سجل الملكية الفكرية · 13 سجلاً',
    };
  }
  if (q.includes('r&d') || q.includes('research') || q.includes('department lead') || q.includes('البحث') || q.includes('الإدارة')) {
    return {
      en: 'Digital Transformation leads R&D with 2 of 6 active research projects and AED 7.1M allocated — followed by Operations and Forensics.\n\nR&D Projects: 6 · Budget: 16.0M · Studies: 38\nSource: Project register, filtered type = R&D',
      ar: 'تتصدر إدارة التحول الرقمي البحث والتطوير بمشروعين من أصل 6 مشاريع بحثية نشطة وميزانية مخصصة قدرها 7.1 مليون درهم — تليها إدارة العمليات ثم الأدلة الجنائية.\n\nمشاريع البحث والتطوير: 6 · الميزانية: 16.0 مليون · الدراسات: 38\nالمصدر: سجل المشاريع، مصفّى حسب النوع = البحث والتطوير',
    };
  }
  if (q.includes('evaluator') || q.includes('unassigned') || q.includes('مقيّم') || q.includes('مقيم')) {
    return {
      en: '4 projects have no evaluator assigned: Autonomous Patrol Drone Study, Next-Gen Body Camera Optics, Multilingual Virtual Help Assistant and Drone-Assisted Crowd Analytics. Two have been waiting over 14 days.\n\nRecommend assigning before the quarterly review.',
      ar: 'هناك 4 مشاريع لم يُسند إليها مقيّم: دراسة طائرات الدوريات ذاتية القيادة، وبصريات كاميرات الجسم من الجيل التالي، والمساعد الافتراضي متعدد اللغات، وتحليلات الحشود بمساعدة الطائرات المسيّرة. اثنان منها في الانتظار منذ أكثر من 14 يوماً.\n\nيُوصى بإسناد المقيّمين قبل المراجعة الربعية.',
    };
  }
  if (q.includes('sandbox') || q.includes('التجريبية')) {
    return {
      en: '4 projects have reached Sandbox stage: Quantum-Resistant Encryption Pilot, AI Complaint Triage Engine, Smart Queue Management and Officer Field Manual Digitization — a 33% increase on last year.\n\nSource: Stage funnel, all types',
      ar: 'وصلت 4 مشاريع إلى مرحلة البيئة التجريبية: تجربة التشفير المقاوم للحوسبة الكمية، ومحرك فرز الشكاوى بالذكاء الاصطناعي، والإدارة الذكية للطوابير، ورقمنة الدليل الميداني للضباط — بزيادة 33% عن العام الماضي.\n\nالمصدر: مسار المراحل، جميع الأنواع',
    };
  }
  if (q.includes('budget') || q.includes('compare') || q.includes('ميزانية') || q.includes('قارن')) {
    return {
      en: 'Budget splits as follows across the portfolio:\n\nR&D: 16.0M · Innovation: 21.6M · Knowledge: 12.6M\n\nInnovation holds the largest share at 43%, driven by Digital Twin — Traffic Network (AED 6.8M).\nSource: 20 project records',
      ar: 'تتوزع الميزانية على المحفظة كما يلي:\n\nالبحث والتطوير: 16.0 مليون · الابتكار: 21.6 مليون · المعرفة: 12.6 مليون\n\nيستحوذ الابتكار على الحصة الأكبر بنسبة 43%، مدفوعاً بمشروع التوأم الرقمي — شبكة المرور (6.8 مليون درهم).\nالمصدر: 20 سجل مشروع',
    };
  }
  return {
    en: 'I can answer questions on projects, budgets, patents, partners, evaluation scores and stage progression. Try asking about patents under approval, unassigned evaluators, or budget by type.',
    ar: 'يمكنني الإجابة عن الأسئلة المتعلقة بالمشاريع والميزانيات وبراءات الاختراع والشركاء ودرجات التقييم وتقدّم المراحل. جرّب السؤال عن براءات الاختراع قيد الاعتماد، أو المشاريع دون مقيّم، أو الميزانية حسب النوع.',
  };
}

export function AssistantPage(_props: PageProps) {
  const { tr } = useLanguage();
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'ai'; content: string; contentAr?: string }>>([
    { role: 'ai', content: GREETING.en, contentAr: GREETING.ar },
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = (chip?: BiText) => {
    const q = (chip ? chip.en : input).trim();
    if (!q) return;
    setMessages(prev => [...prev, { role: 'user', content: q, contentAr: chip?.ar }]);
    setInput('');
    const reply = getReply(q);
    setTimeout(() => setMessages(prev => [...prev, { role: 'ai', content: reply.en, contentAr: reply.ar }]), 500);
  };

  return (
    <div className="p-5 max-w-[1400px] mx-auto h-full">
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col h-[75vh] min-h-[480px]">
        <div className="bg-gradient-to-r rtl:bg-gradient-to-l from-[#005844] via-[#008755] to-[#00a869] px-6 py-5 flex items-center gap-4 text-white flex-shrink-0">
          <div className="h-11 w-11 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base  ">{tr('Sandbox Intelligence Assistant', 'المساعد الذكي للبيئة التجريبية')}</h3>
            <p className="text-sm text-white/85 mt-0.5">{tr('Ask anything about projects, patents, partners or evaluations — answers are grounded in platform data.', 'اسأل عن أي شيء يتعلق بالمشاريع أو براءات الاختراع أو الشركاء أو التقييمات — الإجابات مستندة إلى بيانات المنصة.')}</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 bg-[#fbfcfc]">
          {messages.map((m, i) => (
            <div key={i} className={cn('flex gap-2.5 max-w-[78%]', m.role === 'user' ? 'ms-auto flex-row-reverse' : '')}>
              <div className={cn('h-8 w-8 rounded-lg flex-shrink-0 flex items-center justify-center text-sm font-bold text-white',
                m.role === 'user' ? 'bg-foreground' : 'bg-gradient-to-br from-[#00a869] to-[#005844]')}>
                {m.role === 'user' ? tr('MH', 'مح') : tr('AI', 'ذك')}
              </div>
              <div className={cn('rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line shadow-sm',
                m.role === 'user' ? 'bg-[#008755] text-white rounded-se-sm' : 'bg-white border border-border rounded-ss-sm')}>
                {tr(m.content, m.contentAr)}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <div className="flex flex-wrap gap-2 px-6 pt-3 bg-[#fbfcfc] flex-shrink-0">
          {CHIPS.map(c => (
            <button key={c.en} onClick={() => send(c)} className="text-sm font-medium px-3 py-1.5 rounded-full border border-border hover:border-[#008755] hover:text-[#008755] hover:bg-[#008755]/5 transition-colors">
              {tr(c.en, c.ar)}
            </button>
          ))}
        </div>

        <div className="flex gap-2.5 px-6 py-4 border-t border-border bg-white flex-shrink-0">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
            placeholder={tr('Ask about projects, patents, partners, or evaluations…', 'اسأل عن المشاريع أو براءات الاختراع أو الشركاء أو التقييمات…')}
            className="flex-1 rounded-xl border border-border bg-muted/30 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#008755]/20 focus:border-[#008755] transition-colors"
          />
          <button onClick={() => send()} aria-label={tr('Send', 'إرسال')} className="h-11 w-11 rounded-xl bg-[#008755] hover:bg-[#005844] text-white flex items-center justify-center flex-shrink-0 transition-colors">
            <Send className="h-4 w-4 rtl:-scale-x-100" />
          </button>
        </div>
      </div>
    </div>
  );
}
