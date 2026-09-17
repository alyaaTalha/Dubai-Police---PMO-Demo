import { useState } from 'react';
import { Search, Globe, User, Building2, Bell, Mail, CheckCheck, X, TrendingUp, AlertTriangle, CheckCircle2, Info, Clock, ChevronDown, Shield } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { AgenticAIPanel } from './AgenticAIPanel';
import { AccessibilityMenu } from './AccessibilityMenu';
import dubaiCustomsLogo from '../../../imports/Dubai-police-logo-vector__1_.png';

interface HeaderProps {
  breadcrumbs: Array<{ label: string; href?: string; onClick?: () => void }>;
  onNavigate?: (view: string) => void;
}

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

export function Header({ breadcrumbs, onNavigate }: HeaderProps) {
  const [userRole, setUserRole] = useState<'User' | 'System Admin'>('User');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'KPI Target Achieved',
      message: 'Customer Satisfaction has reached 94.2%, exceeding the target of 92%',
      time: '5 minutes ago',
      isRead: false
    },
    {
      id: '2',
      type: 'warning',
      title: 'Performance Alert',
      message: 'Operational Efficiency dropped to 91%, below target of 93%',
      time: '1 hour ago',
      isRead: false
    },
    {
      id: '3',
      type: 'info',
      title: 'Strategic Update',
      message: 'New quarterly strategic objectives have been published',
      time: '2 hours ago',
      isRead: false
    },
    {
      id: '4',
      type: 'success',
      title: 'Task Completed',
      message: 'Digital Transformation initiative reached 85% completion',
      time: '3 hours ago',
      isRead: true
    },
    {
      id: '5',
      type: 'warning',
      title: 'Upcoming Deadline',
      message: 'Q4 Budget Allocation review due in 2 days',
      time: '5 hours ago',
      isRead: true
    },
    {
      id: '6',
      type: 'info',
      title: 'Ideas Platform — 6 Pending Reviews',
      message: '6 ideas are awaiting your decision in the Innovation Pipeline. 2 are overdue.',
      time: '30 minutes ago',
      isRead: false
    },
    {
      id: '7',
      type: 'success',
      title: 'Idea Converted to Initiative',
      message: '"AI Patrol Scheduling" was approved and converted to a strategic initiative in the PMO Portfolio.',
      time: '2 hours ago',
      isRead: false
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-600" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-600" />;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-amber-50 border-amber-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
    }
  };
  return (
    <div className="w-full bg-white border-b border-border shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Logo and Branding */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-auto flex items-center justify-center">
              <img 
                src={dubaiCustomsLogo}
                alt="Dubai Customs Logo"
                className="h-16 w-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Search and User Actions */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search insights, feedback, tasks..."
              className="pl-10 w-[320px] bg-muted/50 border-border/50 focus:bg-background"
            />
          </div>
          
          <AgenticAIPanel />
          
          <Button variant="ghost" className="gap-2">
            <Mail className="h-5 w-5" />
            <span>Email</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-destructive">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[420px] p-0">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div>
                  <h3 className="  text-[#1f2937]">Notifications</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
                  </p>
                </div>
                {unreadCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={markAllAsRead}
                    className="h-8 text-xs"
                  >
                    <CheckCheck className="h-3 w-3 mr-1" />
                    Mark all read
                  </Button>
                )}
              </div>

              {/* Notifications List */}
              <ScrollArea className="h-[400px]">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 px-4">
                    <Bell className="h-12 w-12 text-muted-foreground/30 mb-3" />
                    <p className="text-sm text-muted-foreground">No notifications</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 hover:bg-muted/50 transition-colors ${
                          !notification.isRead ? 'bg-blue-50/30' : ''
                        }`}
                      >
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4 className={`text-sm ${!notification.isRead ? " " : ""}`}>
                                {notification.title}
                              </h4>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 flex-shrink-0"
                                onClick={() => removeNotification(notification.id)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>{notification.time}</span>
                              </div>
                              {!notification.isRead && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 text-xs px-2"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  Mark as read
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="p-3 border-t">
                  <Button variant="ghost" className="w-full text-sm text-[#008755] hover:text-[#008755]/80">
                    View all notifications
                  </Button>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="ghost" className="gap-2">
            <Globe className="h-5 w-5" />
            <span>العربية</span>
          </Button>
          
          <AccessibilityMenu />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-3 pl-3 border-l border-border cursor-pointer hover:bg-muted/50 -mr-3 pr-3 py-2 rounded-r transition-colors">
                <div className="text-right">
                  <div className="text-sm font-medium">Mohammed Hassan</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    {userRole === 'System Admin' && <Shield className="h-3 w-3" />}
                    <span>{userRole}</span>
                    <ChevronDown className="h-3 w-3" />
                  </div>
                </div>
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary text-primary-foreground">MH</AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <div className="p-1">
                <button
                  onClick={() => setUserRole('User')}
                  className={`w-full text-left px-3 py-2 rounded text-sm flex items-center gap-2 hover:bg-muted transition-colors ${
                    userRole === 'User' ? 'bg-muted' : ''
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span>User</span>
                </button>
                <button
                  onClick={() => {
                    setUserRole('System Admin');
                    if (onNavigate) {
                      onNavigate('system-admin');
                    }
                  }}
                  className={`w-full text-left px-3 py-2 rounded text-sm flex items-center gap-2 hover:bg-muted transition-colors ${
                    userRole === 'System Admin' ? 'bg-muted' : ''
                  }`}
                >
                  <Shield className="h-4 w-4" />
                  <span>System Admin</span>
                </button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="px-6 py-2.5 bg-muted/30 border-t border-border/50">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center">
                {index > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {index === breadcrumbs.length - 1 ? (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (crumb.onClick) {
                          crumb.onClick();
                        }
                      }}
                    >
                      {crumb.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
