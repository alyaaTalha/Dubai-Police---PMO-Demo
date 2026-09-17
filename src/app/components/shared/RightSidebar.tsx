import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { CheckSquare, Calendar, Users, ChevronDown, ChevronUp, Plus, Eye, Sparkles, AlertCircle, FileText } from 'lucide-react';
import { useState } from 'react';

interface TaskCardProps {
  title: string;
  dueDate: string;
  department: string;
  status: 'in-progress' | 'completed' | 'not-started';
  aiCluster?: string;
}

interface FeedGroupProps {
  topic: string;
  count: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  isDuplicate?: boolean;
  aiRecommendation?: string;
}

const TaskCard = ({ title, dueDate, department, status, aiCluster }: TaskCardProps) => {
  const statusColors = {
    'in-progress': 'bg-blue-100 text-blue-700 border-blue-200',
    'completed': 'bg-green-100 text-green-700 border-green-200',
    'not-started': 'bg-gray-100 text-gray-700 border-gray-200',
  };

  const statusLabels = {
    'in-progress': 'In Progress',
    'completed': 'Completed',
    'not-started': 'Not Started',
  };

  return (
    <Card className="border-l-4 border-l-primary">
      <CardContent className="p-3 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium line-clamp-2">{title}</p>
          <Badge 
            variant="outline" 
            className={`text-xs shrink-0 ${statusColors[status]}`}
          >
            {statusLabels[status]}
          </Badge>
        </div>
        
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{dueDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{department}</span>
          </div>
        </div>

        {aiCluster && (
          <div className="pt-2 border-t border-border">
            <Badge variant="secondary" className="text-xs gap-1">
              <Sparkles className="h-3 w-3" />
              {aiCluster}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const FeedGroup = ({ topic, count, sentiment, isDuplicate, aiRecommendation }: FeedGroupProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const sentimentColors = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-yellow-600',
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="border">
        <CardContent className="p-3">
          <CollapsibleTrigger className="w-full">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium">{topic}</p>
                  <Badge variant="secondary" className="text-xs">
                    {count} feeds
                  </Badge>
                </div>
                {isDuplicate && (
                  <div className="flex items-center gap-1 text-xs text-orange-600 mb-1">
                    <AlertCircle className="h-3 w-3" />
                    <span>Potential duplicate cluster</span>
                  </div>
                )}
                {aiRecommendation && (
                  <p className="text-xs text-muted-foreground">{aiRecommendation}</p>
                )}
              </div>
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${sentiment === 'positive' ? 'bg-green-500' : sentiment === 'negative' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent className="space-y-2 mt-3">
            <Separator />
            <div className="space-y-2 pt-2">
              <div className="text-xs text-muted-foreground space-y-1">
                <p>• "Upload button not responding..." - CRM</p>
                <p>• "File upload fails on mobile..." - Forum</p>
                <p>• "Cannot attach documents..." - Social</p>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1 text-xs h-8">
                  <Plus className="h-3 w-3 mr-1" />
                  Add Task
                </Button>
                <Button size="sm" variant="default" className="flex-1 text-xs h-8">
                  <Eye className="h-3 w-3 mr-1" />
                  View Tasks
                </Button>
              </div>
            </div>
          </CollapsibleContent>
        </CardContent>
      </Card>
    </Collapsible>
  );
};

export function RightSidebar() {
  const tasks = [
    {
      title: 'Review file upload infrastructure',
      dueDate: 'Oct 25, 2025',
      department: 'IT Services',
      status: 'in-progress' as const,
      aiCluster: '4 tasks about file upload issues',
    },
    {
      title: 'Update mobile app documentation',
      dueDate: 'Oct 28, 2025',
      department: 'Documentation',
      status: 'not-started' as const,
    },
    {
      title: 'Investigate payment gateway errors',
      dueDate: 'Oct 22, 2025',
      department: 'Finance',
      status: 'in-progress' as const,
      aiCluster: '3 tasks about payment issues',
    },
    {
      title: 'Deploy security patch v2.4',
      dueDate: 'Oct 20, 2025',
      department: 'Security',
      status: 'completed' as const,
    },
  ];

  const feedGroups: FeedGroupProps[] = [
    {
      topic: 'Upload Issues',
      count: 8,
      sentiment: 'negative',
      aiRecommendation: 'High priority - affecting 18% of users',
    },
    {
      topic: 'Payment Concerns',
      count: 5,
      sentiment: 'negative',
      isDuplicate: true,
      aiRecommendation: 'Merged with "Billing Issues" cluster',
    },
    {
      topic: 'Mobile App Praise',
      count: 12,
      sentiment: 'positive',
      aiRecommendation: 'Document success patterns for future releases',
    },
    {
      topic: 'Navigation Confusion',
      count: 6,
      sentiment: 'neutral',
      aiRecommendation: 'Consider UX audit',
    },
  ];

  return (
    <div className="w-80 bg-background border-l border-border fixed right-0 top-32 h-[calc(100vh-8rem)] overflow-hidden">
      <ScrollArea className="h-full">
        <div className="p-4 space-y-4">
          {/* Tasks Section */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Tasks</CardTitle>
                <Badge variant="outline" className="gap-1">
                  <Sparkles className="h-3 w-3" />
                  AI Grouped
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <ScrollArea className="h-[280px] pr-3">
                <div className="space-y-2">
                  {tasks.map((task, index) => (
                    <TaskCard key={index} {...task} />
                  ))}
                </div>
              </ScrollArea>
              <Button variant="outline" size="sm" className="w-full text-xs">
                <Plus className="h-3 w-3 mr-1" />
                Create New Task
              </Button>
            </CardContent>
          </Card>

          {/* Minutes of Meeting Summary */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <CardTitle className="text-base">Meeting Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                  <div className="flex items-start gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-foreground">AI-Extracted Key Points</p>
                      <p className="text-xs text-muted-foreground mt-0.5">From Oct 8 stakeholder meeting</p>
                    </div>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-2 ml-6">
                    <li>• Priority: Fix file upload issues affecting mobile users</li>
                    <li>• Action: Audit payment gateway by end of week</li>
                    <li>• Success: New mobile features received positive feedback</li>
                    <li>• Follow-up: Schedule UX review for navigation concerns</li>
                  </ul>
                </div>
                <Button variant="outline" size="sm" className="w-full text-xs">
                  View Full Minutes
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Feeds Section */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Recent Feeds</CardTitle>
                <Badge variant="outline" className="gap-1">
                  <Sparkles className="h-3 w-3" />
                  Auto-Clustered
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                AI grouped {feedGroups.reduce((acc, g) => acc + g.count, 0)} feedback items
              </p>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[320px] pr-3">
                <div className="space-y-2">
                  {feedGroups.map((group, index) => (
                    <FeedGroup key={index} {...group} />
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}
