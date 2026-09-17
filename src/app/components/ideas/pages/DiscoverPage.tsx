import { useState, useMemo, useRef, useEffect, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { cn } from '../../ui/utils';
import {
  Sparkles, Search, ArrowRight, TrendingUp, Lightbulb, Users,
  AlertCircle, BarChart2, ChevronRight, Bot, Send, Star, Zap,
} from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

type IdeasRole = 'innovator' | 'coordinator' | 'director' | 'admin';

interface User {
  name: string;
  role: string;
  subtitle: string;
  xp: number;
  initials: string;
  chip: string;
}

interface PageProps {
  user: User;
  role: IdeasRole;
  onNavigate: (id: string) => void;
}

type ChatMessage = { role: 'user' | 'ai'; content: string | ReactNode };

// ── Browse ideas data ─────────────────────────────────────────────────────────

const IDEAS = [
  { id: 1,  title: 'Smart Queue Management',        cluster: 'Customer Experience',   dept: 'Digital Transformation', submitter: 'Fatima Al Mansoori', date: 'Jun 2025', status: 'Approved',         fit: 'High',   effort: 'Low',    ai: 'Strong' },
  { id: 2,  title: 'AI Patrol Scheduling',           cluster: 'Smart Operations',      dept: 'Operations',             submitter: 'Omar Al Zaabi',      date: 'Jun 2025', status: 'Director Review', fit: 'High',   effort: 'High',   ai: 'Strong' },
  { id: 3,  title: 'Community Feedback Automation',  cluster: 'Community Engagement',  dept: 'Community Affairs',      submitter: 'Hessa Al Blooshi',   date: 'May 2025', status: 'Under Review',    fit: 'High',   effort: 'Medium', ai: 'Strong' },
  { id: 4,  title: 'Digital Training Badges',        cluster: 'HR Innovation',         dept: 'HR & Training',          submitter: 'Saeed Al Ketbi',     date: 'May 2025', status: 'Approved',         fit: 'High',   effort: 'Low',    ai: 'Strong' },
  { id: 5,  title: 'Mobile Field Reports',           cluster: 'Process Automation',    dept: 'HR & Training',          submitter: 'Saeed Al Ketbi',     date: 'Apr 2025', status: 'Director Review', fit: 'Medium', effort: 'Medium', ai: 'Review' },
  { id: 6,  title: 'E-Grievance Tracker',            cluster: 'Customer Experience',   dept: 'Digital Transformation', submitter: 'Fatima Al Mansoori', date: 'Apr 2025', status: 'Submitted',        fit: 'Low',    effort: 'High',   ai: 'Review' },
  { id: 7,  title: 'Predictive Patrol Scheduling',   cluster: 'Smart Operations',      dept: 'Operations',             submitter: 'Omar Al Zaabi',      date: 'Mar 2025', status: 'Director Review', fit: 'Medium', effort: 'High',   ai: 'Review' },
  { id: 8,  title: 'Smart Evidence Tagging',         cluster: 'Safety & Security',     dept: 'Legal Affairs',          submitter: 'Mariam Al Suwaidi',  date: 'Mar 2025', status: 'Approved',         fit: 'High',   effort: 'Medium', ai: 'Strong' },
  { id: 9,  title: 'Green Fleet Initiative',         cluster: 'Sustainability',        dept: 'Operations',             submitter: 'Omar Al Zaabi',      date: 'Feb 2025', status: 'Submitted',        fit: 'Medium', effort: 'High',   ai: 'Review' },
  { id: 10, title: 'Real-Time Wait Times Display',   cluster: 'Customer Experience',   dept: 'Community Affairs',      submitter: 'Hessa Al Blooshi',   date: 'Feb 2025', status: 'Implemented',      fit: 'High',   effort: 'Low',    ai: 'Strong' },
  { id: 11, title: 'AR Training Simulations',        cluster: 'HR Innovation',         dept: 'HR & Training',          submitter: 'Saeed Al Ketbi',     date: 'Jan 2025', status: 'Submitted',        fit: 'Medium', effort: 'High',   ai: 'Review' },
  { id: 12, title: 'Smart Parking Enforcement',      cluster: 'Process Automation',    dept: 'Operations',             submitter: 'Omar Al Zaabi',      date: 'Jan 2025', status: 'Rejected',         fit: 'Low',    effort: 'High',   ai: 'Review' },
];

// ── Decide queue ──────────────────────────────────────────────────────────────

const DECIDE_QUEUE = [
  { id: 5,  title: 'Mobile Field Reports',         cluster: 'Process Automation', dept: 'HR & Training',   fit: 'Medium', effort: 'Medium', aiRec: 'Needs review', desc: 'Enables officers to submit field incident reports via mobile devices in real-time. Reduces administrative backlog and improves data accuracy at the point of capture.' },
  { id: 6,  title: 'E-Grievance Tracker',          cluster: 'Customer Experience', dept: 'Digital Transformation', fit: 'Low', effort: 'High', aiRec: 'Needs review', desc: 'A digital portal for citizens to submit and track the status of grievances. Requires significant integration with legacy case management systems.' },
  { id: 7,  title: 'Predictive Patrol Scheduling', cluster: 'Smart Operations',   dept: 'Operations',      fit: 'Medium', effort: 'High',   aiRec: 'Needs review', desc: 'Uses historical crime data and ML models to recommend optimal patrol routes and schedules. Promising approach but needs accuracy validation before rollout.' },
  { id: 9,  title: 'Green Fleet Initiative',       cluster: 'Sustainability',     dept: 'Operations',      fit: 'Medium', effort: 'High',   aiRec: 'Needs review', desc: 'Proposal to replace 30% of the vehicle fleet with electric alternatives over 36 months. Aligns with national sustainability targets but requires capital investment.' },
  { id: 11, title: 'AR Training Simulations',      cluster: 'HR Innovation',      dept: 'HR & Training',   fit: 'Medium', effort: 'High',   aiRec: 'Needs review', desc: 'Augmented reality training modules for high-risk scenario practice without physical risk. High development cost; recommend piloting in one division first.' },
  { id: 12, title: 'Smart Parking Enforcement',    cluster: 'Process Automation', dept: 'Operations',      fit: 'Low',    effort: 'High',   aiRec: 'Needs review', desc: 'Automated license-plate scanning for parking violations to reduce manual enforcement patrols. Overlap with existing RTA initiative may limit strategic value.' },
];

// ── Cluster color map ─────────────────────────────────────────────────────────

const CLUSTER_COLORS: Record<string, string> = {
  'Customer Experience':  'bg-blue-100   text-blue-700',
  'Smart Operations':     'bg-purple-100 text-purple-700',
  'Community Engagement': 'bg-teal-100   text-teal-700',
  'HR Innovation':        'bg-orange-100 text-orange-700',
  'Process Automation':   'bg-yellow-100 text-yellow-700',
  'Safety & Security':    'bg-red-100    text-red-700',
  'Sustainability':       'bg-green-100  text-green-700',
};

const clusterColor = (cluster: string) =>
  CLUSTER_COLORS[cluster] ?? 'bg-gray-100 text-gray-700';

// ── Status color map ──────────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, string> = {
  Submitted:        'bg-gray-100    text-gray-600',
  'Under Review':   'bg-blue-100   text-blue-700',
  'Director Review':'bg-yellow-100 text-yellow-700',
  Approved:         'bg-green-100  text-green-700',
  Implemented:      'bg-emerald-100 text-emerald-700',
  Rejected:         'bg-red-100    text-red-600',
};

// ── AI response logic ─────────────────────────────────────────────────────────

function getAiResponse(input: string): ReactNode {
  const q = input.toLowerCase();

  if (q.includes('department') || q.includes('submits') || q.includes('most ideas')) {
    return (
      <div className="space-y-2">
        <p>Digital Transformation leads with <strong>22 ideas</strong> submitted this quarter, followed by Operations (18) and Community Affairs (15). Digital Transformation also has the highest approval rate at <strong>72%</strong>.</p>
        <div className="flex flex-wrap gap-2 pt-1">
          {[['Digital Transformation','22','72%'],['Operations','18','54%'],['Community Affairs','15','60%']].map(([d,n,r]) => (
            <div key={d} className="rounded-lg border bg-white px-3 py-2 text-xs shadow-sm">
              <div className="font-semibold text-[#005844]">{d}</div>
              <div className="text-muted-foreground">{n} ideas · {r} approval</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (q.includes('high-potential') || q.includes('high potential')) {
    return (
      <div className="space-y-2">
        <p>Here are 3 high-potential ideas from your pipeline:</p>
        <div className="space-y-2">
          {[
            { title: 'Smart Queue Management',       dept: 'Digital Transformation', impact: 'Reduces citizen wait time by 40%' },
            { title: 'AI Patrol Scheduling',          dept: 'Operations',             impact: 'Optimises 35% of shift coverage' },
            { title: 'Drone Emergency Response Kit',  dept: 'Operations',             impact: 'First-response time cut by 18 min' },
          ].map(idea => (
            <div key={idea.title} className="flex items-start gap-2 rounded-lg border bg-white p-3 shadow-sm">
              <Sparkles className="mt-0.5 size-4 shrink-0 text-[#26D07C]" />
              <div>
                <div className="font-semibold text-sm">{idea.title}</div>
                <div className="text-xs text-muted-foreground">{idea.dept}</div>
                <div className="text-xs text-[#005844] font-medium mt-0.5">{idea.impact}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (q.includes('cluster') || q.includes('theme')) {
    return (
      <div className="space-y-2">
        <p><strong>8 thematic clusters</strong> detected this quarter. The largest:</p>
        <div className="grid grid-cols-3 gap-2">
          {[['Smart Operations','14'],['Customer Experience','12'],['Digital Transformation','11']].map(([c,n]) => (
            <div key={c} className="rounded-lg border bg-white px-2 py-2 text-center text-xs shadow-sm">
              <div className="text-lg font-bold text-[#008755]">{n}</div>
              <div className="text-muted-foreground leading-tight">{c}</div>
            </div>
          ))}
        </div>
        <p className="text-sm">Cross-cluster themes: <em>AI & Automation</em> and <em>Customer-Centric Services</em>.</p>
      </div>
    );
  }

  if (q.includes('overdue') || q.includes('waiting') || q.includes('pending')) {
    return (
      <div className="space-y-2">
        <p><strong>6 ideas</strong> have been waiting more than 5 days for director review. The oldest:</p>
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm">
          <div className="font-semibold text-amber-800">E-Grievance Resolution Tracker</div>
          <div className="text-amber-700 text-xs">9 days awaiting review · Digital Transformation</div>
        </div>
        <p className="text-sm text-muted-foreground">Recommend scheduling a review session to clear the backlog.</p>
      </div>
    );
  }

  if (q.includes('implementation') || q.includes('implement') || q.includes('rate') || q.includes('last year')) {
    return (
      <div className="space-y-2">
        <p>Current implementation rate: <strong>6.4%</strong> (3 of 47 ideas reached implementation). Last year: <strong>4.1%</strong>. Trend is improving.</p>
        <div className="rounded-lg border bg-white px-3 py-2 shadow-sm">
          <div className="text-xs text-muted-foreground mb-1">Top implemented idea</div>
          <div className="font-semibold text-sm text-[#005844]">Smart Queue Management</div>
        </div>
      </div>
    );
  }

  return (
    <p>Based on your pipeline data for Community Affairs: <strong>47 ideas submitted</strong>, 12 in director review, 3 implemented. Highest activity area: <em>Customer Experience</em>.</p>
  );
}

// ── Suggested prompts ─────────────────────────────────────────────────────────

const SUGGESTIONS = [
  'Which department submits the most ideas?',
  'Show me high-potential ideas',
  'What are the main idea clusters this quarter?',
  'Which ideas are overdue for director review?',
  "What's our implementation rate compared to last year?",
  'Show me ideas aligned to Innovation Excellence pillar',
];

// ── Mode tab pill ─────────────────────────────────────────────────────────────

function ModePill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-5 py-2 rounded-full text-sm font-medium transition-all',
        active
          ? 'bg-[#008755] text-white shadow'
          : 'bg-white text-gray-600 border border-border hover:bg-gray-50',
      )}
    >
      {label}
    </button>
  );
}

// ── Typing indicator ──────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#008755]/10">
        <Bot className="size-3.5 text-[#008755]" />
      </div>
      <div className="flex items-center gap-1 rounded-2xl bg-muted px-4 py-2.5">
        {[0, 150, 300].map(delay => (
          <span
            key={delay}
            className="block size-1.5 rounded-full bg-[#008755] animate-bounce"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

// ── MODE 1: Ask ───────────────────────────────────────────────────────────────

function AskMode() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: trimmed }]);
    setIsTyping(true);
    setTimeout(() => {
      const response = getAiResponse(trimmed);
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'ai', content: response }]);
    }, 800);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage(input);
  };

  return (
    <div className="space-y-4">
      {/* Hero banner */}
      <div className="rounded-xl bg-gradient-to-r from-[#005844] to-[#008755] px-6 py-5 text-white">
        <div className="flex items-center gap-3 mb-1">
          <Sparkles className="size-6 opacity-90" />
          <h2 className="text-xl font-semibold font-['Dubai:Medium',_sans-serif]">Ask Anything About Your Pipeline</h2>
        </div>
        <p className="text-sm text-white/80 ml-9">Powered by Dubai Police Innovation AI</p>
      </div>

      {/* Chat area */}
      <Card className="rounded-xl border border-border bg-white shadow-sm">
        <CardContent className="p-4">
          <div className="overflow-y-auto h-[350px] space-y-1 pr-1" style={{ scrollbarWidth: 'thin' }}>
            {messages.length === 0 && !isTyping ? (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-muted-foreground">
                <div className="flex size-14 items-center justify-center rounded-full bg-[#008755]/10">
                  <Bot className="size-7 text-[#008755]" />
                </div>
                <p className="text-sm max-w-xs">Ask a question to explore your innovation pipeline.</p>
              </div>
            ) : (
              <>
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={cn('flex mb-3', msg.role === 'user' ? 'justify-end' : 'justify-start items-start gap-2')}
                  >
                    {msg.role === 'ai' && (
                      <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#008755]/10 mt-0.5">
                        <Bot className="size-3.5 text-[#008755]" />
                      </div>
                    )}
                    <div
                      className={cn(
                        'max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                        msg.role === 'user'
                          ? 'bg-[#008755] text-white rounded-br-sm'
                          : 'bg-muted text-foreground rounded-bl-sm',
                      )}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isTyping && <TypingIndicator />}
                <div ref={chatEndRef} />
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Suggested prompts */}
      <div className="flex flex-wrap gap-2">
        {SUGGESTIONS.map(s => (
          <button
            key={s}
            onClick={() => { setInput(s); }}
            className="rounded-full border border-border bg-white px-3 py-1.5 text-xs text-gray-600 hover:border-[#008755] hover:text-[#008755] transition-colors"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input bar */}
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask about your pipeline…"
          className="flex-1 rounded-xl border-border"
          disabled={isTyping}
        />
        <Button
          onClick={() => sendMessage(input)}
          disabled={isTyping || !input.trim()}
          className="rounded-xl bg-[#008755] hover:bg-[#005844] text-white px-4"
        >
          <Send className="size-4" />
        </Button>
      </div>
    </div>
  );
}

// ── MODE 2: Browse ────────────────────────────────────────────────────────────

const ALL_CLUSTERS  = ['All', ...Array.from(new Set(IDEAS.map(i => i.cluster)))];
const ALL_STATUSES  = ['All', ...Array.from(new Set(IDEAS.map(i => i.status)))];
const ALL_IMPACTS   = ['All', 'High', 'Medium', 'Low'];

function BrowseMode() {
  const [search, setSearch]       = useState('');
  const [cluster, setCluster]     = useState('All');
  const [status, setStatus]       = useState('All');
  const [impact, setImpact]       = useState('All');
  const [starred, setStarred]     = useState<Set<number>>(new Set());

  const toggleStar = (id: number) =>
    setStarred(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return IDEAS.filter(idea => {
      if (q && !idea.title.toLowerCase().includes(q) && !idea.dept.toLowerCase().includes(q) && !idea.cluster.toLowerCase().includes(q)) return false;
      if (cluster !== 'All' && idea.cluster !== cluster) return false;
      if (status  !== 'All' && idea.status  !== status)  return false;
      if (impact  !== 'All' && idea.fit     !== impact)  return false;
      return true;
    });
  }, [search, cluster, status, impact]);

  return (
    <div className="space-y-4">
      {/* Filter bar */}
      <Card className="rounded-xl border border-border bg-white shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <Input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search ideas…"
                className="pl-9 rounded-xl border-border"
              />
            </div>
            {[
              { label: 'Cluster',     value: cluster, setter: setCluster, options: ALL_CLUSTERS },
              { label: 'Status',      value: status,  setter: setStatus,  options: ALL_STATUSES },
              { label: 'Impact',      value: impact,  setter: setImpact,  options: ALL_IMPACTS },
            ].map(({ label, value, setter, options }) => (
              <select
                key={label}
                value={value}
                onChange={e => setter(e.target.value)}
                className="rounded-xl border border-border bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#008755]/30"
              >
                {options.map(o => <option key={o}>{o === 'All' ? `All ${label}s` : o}</option>)}
              </select>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Result count */}
      <p className="text-sm text-muted-foreground px-1">{filtered.length} idea{filtered.length !== 1 ? 's' : ''} found</p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
          <Search className="size-10 opacity-30" />
          <p>No ideas match your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map(idea => (
            <Card key={idea.id} className="rounded-xl border border-border bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <CardContent className="p-4 flex flex-col gap-3 flex-1">
                {/* Cluster badge */}
                <div className="flex items-start justify-between gap-2">
                  <span className={cn('rounded-full px-2 py-0.5 text-xs font-medium', clusterColor(idea.cluster))}>
                    {idea.cluster}
                  </span>
                  <button onClick={() => toggleStar(idea.id)} className="shrink-0 mt-0.5">
                    <Star
                      className={cn('size-4 transition-colors', starred.has(idea.id) ? 'fill-amber-400 text-amber-400' : 'text-gray-300 hover:text-amber-300')}
                    />
                  </button>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-sm leading-snug">{idea.title}</h3>

                {/* Meta */}
                <p className="text-xs text-muted-foreground">{idea.dept} · {idea.submitter} · {idea.date}</p>

                {/* Status */}
                <span className={cn('self-start rounded-full px-2 py-0.5 text-xs font-medium', STATUS_COLORS[idea.status] ?? 'bg-gray-100 text-gray-600')}>
                  {idea.status}
                </span>

                {/* Chips */}
                <div className="flex flex-wrap gap-1.5 text-xs">
                  <span className="rounded-md bg-gray-100 px-2 py-0.5 text-gray-600">Fit: {idea.fit}</span>
                  <span className="rounded-md bg-gray-100 px-2 py-0.5 text-gray-600">Effort: {idea.effort}</span>
                </div>

                {/* AI signal */}
                <div className={cn('flex items-center gap-1 text-xs mt-auto', idea.ai === 'Strong' ? 'text-[#008755]' : 'text-amber-600')}>
                  <Sparkles className="size-3" />
                  <span>AI: {idea.ai === 'Strong' ? '✓ Strong potential' : '⚠ Needs review'}</span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-border pt-2 mt-1">
                  <button className="flex items-center gap-1 text-xs text-[#008755] hover:text-[#005844] font-medium transition-colors">
                    View details <ArrowRight className="size-3" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ── MODE 3: Decide ────────────────────────────────────────────────────────────

type Decision = 'Approved' | 'Rejected' | 'Skipped';

function DecideMode() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [decisions, setDecisions]       = useState<Array<{ id: number; decision: Decision }>>([]);

  const remaining = DECIDE_QUEUE.length - decisions.filter(d => d.decision !== 'Skipped').length;
  const idea       = DECIDE_QUEUE[currentIndex];
  const allDone    = currentIndex >= DECIDE_QUEUE.length;

  const decide = (decision: Decision) => {
    setDecisions(prev => [...prev, { id: idea.id, decision }]);
    setCurrentIndex(prev => prev + 1);
  };

  const reset = () => {
    setCurrentIndex(0);
    setDecisions([]);
  };

  if (allDone) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-20">
        <div className="flex size-20 items-center justify-center rounded-full bg-[#008755]/10">
          <Zap className="size-10 text-[#008755]" />
        </div>
        <div className="text-center space-y-1">
          <h3 className="text-xl font-semibold text-[#005844] font-['Dubai:Medium',_sans-serif]">All done!</h3>
          <p className="text-muted-foreground text-sm">You've worked through all {DECIDE_QUEUE.length} ideas in the queue.</p>
        </div>
        <div className="flex gap-3 text-sm">
          {(['Approved','Rejected','Skipped'] as Decision[]).map(d => {
            const count = decisions.filter(x => x.decision === d).length;
            const colors: Record<Decision, string> = { Approved: 'text-green-700 bg-green-50 border-green-200', Rejected: 'text-red-600 bg-red-50 border-red-200', Skipped: 'text-gray-600 bg-gray-50 border-gray-200' };
            return (
              <div key={d} className={cn('rounded-xl border px-4 py-2 text-center', colors[d])}>
                <div className="text-2xl font-bold">{count}</div>
                <div className="text-xs">{d}</div>
              </div>
            );
          })}
        </div>
        <Button onClick={reset} variant="outline" className="rounded-xl border-[#008755] text-[#008755] hover:bg-[#008755]/5">
          Review again
        </Button>
      </div>
    );
  }

  const skipped = decisions.filter(d => d.decision === 'Skipped').length;
  const decided  = decisions.filter(d => d.decision !== 'Skipped').length;

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Header */}
      <div className="w-full text-center space-y-1">
        <h2 className="text-lg font-semibold text-[#005844] font-['Dubai:Medium',_sans-serif]">Fast-Track Decisions</h2>
        <p className="text-sm text-muted-foreground">Work through ideas that need your input, one at a time.</p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5">
          {DECIDE_QUEUE.map((_, i) => (
            <div
              key={i}
              className={cn(
                'h-2 rounded-full transition-all',
                i < currentIndex
                  ? decisions[i]?.decision === 'Approved' ? 'bg-green-500 w-4' : decisions[i]?.decision === 'Rejected' ? 'bg-red-400 w-4' : 'bg-gray-300 w-4'
                  : i === currentIndex ? 'bg-[#008755] w-6' : 'bg-gray-200 w-4',
              )}
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {decided} decided · {DECIDE_QUEUE.length - currentIndex} remaining
        </span>
      </div>

      {/* Card */}
      <Card className="w-full max-w-xl rounded-xl border border-border bg-white shadow-md">
        <CardContent className="p-6 space-y-5">
          {/* Cluster + Dept */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-medium', clusterColor(idea.cluster))}>{idea.cluster}</span>
            <span className="text-xs text-muted-foreground">{idea.dept}</span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-900 font-['Dubai:Medium',_sans-serif]">{idea.title}</h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">{idea.desc}</p>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Strategic Fit', value: idea.fit,    colors: { High: 'text-green-700 bg-green-50', Medium: 'text-yellow-700 bg-yellow-50', Low: 'text-red-600 bg-red-50' } },
              { label: 'Effort',        value: idea.effort, colors: { Low: 'text-green-700 bg-green-50', Medium: 'text-yellow-700 bg-yellow-50', High: 'text-red-600 bg-red-50' } },
              { label: 'AI Signal',     value: idea.aiRec,  colors: { 'Strong potential': 'text-[#008755] bg-[#008755]/10', 'Needs review': 'text-amber-700 bg-amber-50' } },
            ].map(({ label, value, colors }) => (
              <div key={label} className="rounded-lg bg-gray-50 border border-border p-3 text-center">
                <div className="text-xs text-muted-foreground mb-1">{label}</div>
                <div className={cn('text-sm font-semibold rounded-md px-1', (colors as Record<string, string>)[value] ?? 'text-gray-700')}>
                  {value}
                </div>
              </div>
            ))}
          </div>

          {/* AI recommendation callout */}
          <div className="flex items-center gap-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2.5 text-sm text-amber-700">
            <Sparkles className="size-4 shrink-0" />
            <span><strong>AI recommends:</strong> {idea.aiRec} — validate alignment before approving.</span>
          </div>
        </CardContent>
      </Card>

      {/* Action buttons */}
      <div className="flex items-center gap-4 w-full max-w-xl">
        <Button
          onClick={() => decide('Rejected')}
          variant="outline"
          className="flex-1 rounded-xl border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 py-6 text-base font-semibold"
        >
          ✗ Reject
        </Button>
        <Button
          onClick={() => decide('Skipped')}
          variant="outline"
          className="rounded-xl border-border text-gray-500 hover:bg-gray-50 px-5 py-6 text-base"
        >
          ⟳ Skip
        </Button>
        <Button
          onClick={() => decide('Approved')}
          className="flex-1 rounded-xl bg-[#008755] hover:bg-[#005844] text-white py-6 text-base font-semibold"
        >
          ✓ Approve
        </Button>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

type Mode = 'ask' | 'browse' | 'decide';

export function DiscoverPage({ user, role, onNavigate }: PageProps) {
  const [activeMode, setActiveMode] = useState<Mode>('ask');

  return (
    <div className="p-4 space-y-6">
      {/* Mode switcher */}
      <div className="flex items-center gap-2">
        <ModePill label="Ask"    active={activeMode === 'ask'}    onClick={() => setActiveMode('ask')}    />
        <ModePill label="Browse" active={activeMode === 'browse'} onClick={() => setActiveMode('browse')} />
        <ModePill label="Decide" active={activeMode === 'decide'} onClick={() => setActiveMode('decide')} />
      </div>

      {/* Mode content */}
      {activeMode === 'ask'    && <AskMode    />}
      {activeMode === 'browse' && <BrowseMode />}
      {activeMode === 'decide' && <DecideMode />}
    </div>
  );
}
