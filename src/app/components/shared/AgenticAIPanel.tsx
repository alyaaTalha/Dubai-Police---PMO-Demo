import { useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { useLanguage } from '../../i18n/LanguageContext';
import { Brain, Sparkles, AlertTriangle, Clock, FileText, BarChart3, Send, TrendingUp } from 'lucide-react';

export function AgenticAIPanel() {
  const { tr, isRTL } = useLanguage();
  const [chatInput, setChatInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'insights' | 'chat'>('chat');

  const aiInsights = [
    {
      category: tr('Projects at Risk', 'مشاريع معرّضة للخطر'),
      priority: tr('High', 'عالية'),
      description: tr('5 projects flagged for deadline breach this quarter', 'تم رصد 5 مشاريع معرّضة لتجاوز المواعيد النهائية هذا الربع'),
      color: 'red',
      icon: AlertTriangle,
    },
    {
      category: tr('Pending Approvals', 'اعتمادات معلّقة'),
      priority: tr('Medium', 'متوسطة'),
      description: tr('12 approval steps overdue by more than 7 days', '12 خطوة اعتماد متأخرة لأكثر من 7 أيام'),
      color: 'amber',
      icon: Clock,
    },
    {
      category: tr('On-Track Projects', 'مشاريع وفق الخطة'),
      priority: tr('Trending', 'في تصاعد'),
      description: tr('Completion rate up 18% compared to last quarter', 'ارتفع معدل الإنجاز بنسبة 18% مقارنة بالربع الماضي'),
      color: 'green',
      icon: TrendingUp,
    },
  ];

  const aiActions = [
    {
      label: tr('Generate PMO Weekly Report', 'إنشاء التقرير الأسبوعي لمكتب إدارة المشاريع'),
      icon: FileText,
      description: tr('Comprehensive summary of all active projects', 'ملخص شامل لجميع المشاريع النشطة'),
    },
    {
      label: tr('Summarize Overdue Approvals', 'تلخيص الاعتمادات المتأخرة'),
      icon: Clock,
      description: tr('Identify bottlenecks across workflow stages', 'تحديد الاختناقات عبر مراحل سير العمل'),
    },
    {
      label: tr('Compare Phase Progress by Quarter', 'مقارنة تقدم المراحل حسب الربع'),
      icon: BarChart3,
      description: tr('Ideation to implementation trend analysis', 'تحليل الاتجاه من توليد الأفكار إلى التنفيذ'),
    },
  ];

  const chatMessages = [
    {
      type: 'ai',
      content: tr("Hello! I'm your PMO assistant. You can ask me about project health, approval bottlenecks, phase progress, team workloads, or request reports. What would you like to know?", 'مرحباً! أنا مساعدك في مكتب إدارة المشاريع. يمكنك سؤالي عن سلامة المشاريع، واختناقات الاعتماد، وتقدم المراحل، وأعباء عمل الفرق، أو طلب التقارير. ماذا تود أن تعرف؟'),
    },
    {
      type: 'user',
      content: tr('Which projects are stuck in the approval stage?', 'ما المشاريع المتوقفة في مرحلة الاعتماد؟'),
    },
    {
      type: 'ai',
      content: tr(`I found 4 projects currently stalled in an approval step for more than 14 days:
• Smart Infrastructure Initiative — BRD review, 18 days
• Digital HR Transformation — Legal feasibility, 21 days
• E-Services Portal Upgrade — FSD review, 15 days
• Data Governance Framework — Directional approval, 31 days

Would you like me to escalate these or generate a report?`, `وجدت 4 مشاريع متوقفة حالياً في خطوة اعتماد لأكثر من 14 يوماً:
• مبادرة البنية التحتية الذكية — مراجعة وثيقة متطلبات الأعمال، 18 يوماً
• التحول الرقمي للموارد البشرية — الجدوى القانونية، 21 يوماً
• تطوير بوابة الخدمات الإلكترونية — مراجعة وثيقة المواصفات الوظيفية، 15 يوماً
• إطار حوكمة البيانات — الاعتماد التوجيهي، 31 يوماً

هل تود أن أصعّد هذه المشاريع أو أنشئ تقريراً؟`),
    },
    {
      type: 'user',
      content: tr('Generate a report for the overdue ones', 'أنشئ تقريراً للمشاريع المتأخرة'),
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
          <span className="hidden sm:inline">{tr('Ask AI', 'اسأل الذكاء الاصطناعي')}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side={isRTL ? 'left' : 'right'} className="w-[420px] p-0 flex flex-col">
        <SheetHeader className="p-4 pb-3 border-b">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[#008755]/10">
              <Sparkles className="h-5 w-5 text-[#008755]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <SheetTitle className="text-base font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                  {tr('PMO AI Assistant', 'المساعد الذكي لمكتب إدارة المشاريع')}
                </SheetTitle>
                <Badge className="gap-1 bg-green-100 text-green-700 border-green-300 hover:bg-green-100">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-600" />
                  {tr('Active', 'نشط')}
                </Badge>
              </div>
              <SheetDescription className="text-xs text-muted-foreground">
                {tr('Your intelligent project management companion', 'رفيقك الذكي في إدارة المشاريع')}
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
              {tr('Insights', 'الرؤى')}
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-4 py-2.5 text-sm font-['Dubai:Medium',_'Dubai'] transition-all border-b-2 ${
                activeTab === 'chat'
                  ? 'border-[#BB9956] text-[#BB9956]'
                  : 'border-transparent text-muted-foreground hover:text-[#1f2937]'
              }`}
            >
              {tr('Ask AI', 'اسأل الذكاء الاصطناعي')}
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
                  {tr('AI Insights Summary', 'ملخص رؤى الذكاء الاصطناعي')}
                </h3>
                <div className="space-y-2">
                  {aiInsights.map((insight, index) => {
                    const Icon = insight.icon;
                    return (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border-s-4 ${
                          insight.color === 'red'
                            ? 'bg-red-50 border-s-red-500'
                            : insight.color === 'amber'
                            ? 'bg-amber-50 border-s-amber-500'
                            : 'bg-green-50 border-s-green-500'
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
                        <p className="text-xs text-muted-foreground ms-6">{insight.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* AI Actions */}
              <div>
                <h3 className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#008755]" />
                  {tr('AI Actions', 'إجراءات الذكاء الاصطناعي')}
                </h3>
                <div className="space-y-2">
                  {aiActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={index}
                        className="w-full p-3 rounded-lg border bg-white hover:bg-accent transition-colors text-start"
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
                  placeholder={tr('Ask anything about your projects…', 'اسأل أي شيء عن مشاريعك…')}
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
                  <Send className="h-4 w-4 rtl:-scale-x-100" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                {tr('AI responses are based on live project data', 'تستند إجابات الذكاء الاصطناعي إلى بيانات المشاريع الحية')}
              </p>
            </div>
          </>
        )}

      </SheetContent>
    </Sheet>
  );
}