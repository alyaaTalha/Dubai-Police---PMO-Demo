import { useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Brain, Sparkles, AlertTriangle, Clock, FileText, BarChart3, Send, TrendingUp } from 'lucide-react';

export function AgenticAIPanel() {
  const [chatInput, setChatInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'insights' | 'chat'>('chat');

  const aiInsights = [
    {
      category: 'Projects at Risk',
      priority: 'High',
      description: '5 projects flagged for deadline breach this quarter',
      color: 'red',
      icon: AlertTriangle,
    },
    {
      category: 'Pending Approvals',
      priority: 'Medium',
      description: '12 approval steps overdue by more than 7 days',
      color: 'amber',
      icon: Clock,
    },
    {
      category: 'On-Track Projects',
      priority: 'Trending',
      description: 'Completion rate up 18% compared to last quarter',
      color: 'green',
      icon: TrendingUp,
    },
  ];

  const aiActions = [
    {
      label: 'Generate PMO Weekly Report',
      icon: FileText,
      description: 'Comprehensive summary of all active projects',
    },
    {
      label: 'Summarize Overdue Approvals',
      icon: Clock,
      description: 'Identify bottlenecks across workflow stages',
    },
    {
      label: 'Compare Phase Progress by Quarter',
      icon: BarChart3,
      description: 'Ideation to implementation trend analysis',
    },
  ];

  const chatMessages = [
    {
      type: 'ai',
      content: "Hello! I'm your PMO assistant. You can ask me about project health, approval bottlenecks, phase progress, team workloads, or request reports. What would you like to know?",
    },
    {
      type: 'user',
      content: 'Which projects are stuck in the approval stage?',
    },
    {
      type: 'ai',
      content: `I found 4 projects currently stalled in an approval step for more than 14 days:
• Smart Infrastructure Initiative — BRD review, 18 days
• Digital HR Transformation — Legal feasibility, 21 days
• E-Services Portal Upgrade — FSD review, 15 days
• Data Governance Framework — Directional approval, 31 days

Would you like me to escalate these or generate a report?`,
    },
    {
      type: 'user',
      content: 'Generate a report for the overdue ones',
    },
    {
      type: 'ai',
      content: 'typing',
    },
  ];


  const handleSendMessage = () => {
    if (chatInput.trim()) {
      console.log('AI Query:', chatInput);
      setChatInput('');
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="gap-2">
          <Brain className="h-4 w-4" />
          <span className="hidden sm:inline">Ask AI</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[420px] p-0 flex flex-col">
        <SheetHeader className="p-4 pb-3 border-b">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[#008755]/10">
              <Sparkles className="h-5 w-5 text-[#008755]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <SheetTitle className="text-base font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                  PMO AI Assistant
                </SheetTitle>
                <Badge className="gap-1 bg-green-100 text-green-700 border-green-300 hover:bg-green-100">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-600" />
                  Active
                </Badge>
              </div>
              <SheetDescription className="text-xs text-muted-foreground">
                Your intelligent project management companion
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        {/* Tab Navigation */}
        <div className="border-b px-4">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('insights')}
              className={`px-4 py-2.5 text-sm font-['Dubai:Medium',_'Dubai'] transition-all border-b-2 ${
                activeTab === 'insights'
                  ? 'border-[#BB9956] text-[#BB9956]'
                  : 'border-transparent text-muted-foreground hover:text-[#1f2937]'
              }`}
            >
              Insights
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-4 py-2.5 text-sm font-['Dubai:Medium',_'Dubai'] transition-all border-b-2 ${
                activeTab === 'chat'
                  ? 'border-[#BB9956] text-[#BB9956]'
                  : 'border-transparent text-muted-foreground hover:text-[#1f2937]'
              }`}
            >
              Ask AI
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'insights' ? (
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              {/* AI Insights Summary */}
              <div>
                <h3 className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#008755]" />
                  AI Insights Summary
                </h3>
                <div className="space-y-2">
                  {aiInsights.map((insight, index) => {
                    const Icon = insight.icon;
                    return (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border-l-4 ${
                          insight.color === 'red'
                            ? 'bg-red-50 border-l-red-500'
                            : insight.color === 'amber'
                            ? 'bg-amber-50 border-l-amber-500'
                            : 'bg-green-50 border-l-green-500'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="flex items-center gap-2">
                            <Icon className={`h-4 w-4 ${
                              insight.color === 'red'
                                ? 'text-red-600'
                                : insight.color === 'amber'
                                ? 'text-amber-600'
                                : 'text-green-600'
                            }`} />
                            <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">{insight.category}</p>
                          </div>
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              insight.color === 'red'
                                ? 'bg-red-100 text-red-700 border-red-300'
                                : insight.color === 'amber'
                                ? 'bg-amber-100 text-amber-700 border-amber-300'
                                : 'bg-green-100 text-green-700 border-green-300'
                            }`}
                          >
                            {insight.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground ml-6">{insight.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* AI Actions */}
              <div>
                <h3 className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#008755]" />
                  AI Actions
                </h3>
                <div className="space-y-2">
                  {aiActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={index}
                        className="w-full p-3 rounded-lg border bg-white hover:bg-accent transition-colors text-left"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-md bg-[#008755]/10">
                            <Icon className="h-4 w-4 text-[#008755]" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-0.5">{action.label}</p>
                            <p className="text-xs text-muted-foreground">{action.description}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollArea>
        ) : (
          <>
            {/* Zone 2: Chat Messages - Scrollable area that fills remaining space */}
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-4">
                  {chatMessages.map((message, index) => (
                    <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {message.type === 'ai' ? (
                        <div className="flex gap-2 max-w-[85%]">
                          <div className="flex-shrink-0 h-7 w-7 rounded-full bg-[#008755]/10 flex items-center justify-center">
                            <Sparkles className="h-4 w-4 text-[#008755]" />
                          </div>
                          <div className="bg-muted rounded-lg p-3">
                            {message.content === 'typing' ? (
                              <div className="flex gap-1">
                                <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
                              </div>
                            ) : (
                              <p className="text-sm text-[#1f2937] whitespace-pre-line">{message.content}</p>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="bg-[#008755] text-white rounded-lg p-3 max-w-[85%]">
                          <p className="text-sm">{message.content}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Zone 3: Chat Input - Fixed to bottom, always visible */}
            <div className="border-t bg-white p-4 flex-shrink-0">
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Ask anything about your projects…"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#008755]/50"
                />
                <Button
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={!chatInput.trim()}
                  className="bg-[#008755] hover:bg-[#008755]/90 flex-shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                AI responses are based on live project data
              </p>
            </div>
          </>
        )}

      </SheetContent>
    </Sheet>
  );
}