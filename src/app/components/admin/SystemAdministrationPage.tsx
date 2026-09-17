import { useState, useEffect } from "react";
import {
  FolderKanban,
  Workflow,
  Users,
  UsersRound,
  Database,
  Activity,
  CheckCircle2,
  Settings,
  ChevronRight,
  Clock,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import bannerImage from "figma:asset/2ceb5f3890ecf49940adbd1e2cca8cf7647ce99f.png";
import { ApprovalWorkflowsPage } from "./ApprovalWorkflowsPage";
import { EditWorkflowPage } from "./EditWorkflowPage";
import { AnnouncementsPage } from "./AnnouncementsPage";

interface SystemAdministrationPageProps {
  onBack: () => void;
  setBreadcrumbs: (breadcrumbs: Array<{ label: string; onClick?: () => void }>) => void;
}

export function SystemAdministrationPage({
  onBack,
  setBreadcrumbs,
}: SystemAdministrationPageProps) {
  const [activeView, setActiveView] = useState<'dashboard' | 'approval-workflows' | 'edit-workflow' | 'announcements'>('dashboard');
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string | null>(null);

  // Update breadcrumbs when active view changes
  useEffect(() => {
    if (activeView === 'approval-workflows') {
      setBreadcrumbs([
        { label: 'Home', onClick: onBack },
        { label: 'System Administration', onClick: () => setActiveView('dashboard') },
        { label: 'Approval Workflows' }
      ]);
    } else if (activeView === 'edit-workflow') {
      setBreadcrumbs([
        { label: 'Home', onClick: onBack },
        { label: 'System Administration', onClick: () => setActiveView('dashboard') },
        { label: 'Approval Workflows', onClick: () => setActiveView('approval-workflows') },
        { label: 'Edit Workflow' }
      ]);
    } else if (activeView === 'announcements') {
      setBreadcrumbs([
        { label: 'Home', onClick: onBack },
        { label: 'System Administration', onClick: () => setActiveView('dashboard') },
        { label: 'Announcements' }
      ]);
    } else if (activeView === 'dashboard') {
      setBreadcrumbs([
        { label: 'Home', onClick: onBack },
        { label: 'System Administration' }
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeView]);

  // Show Approval Workflows page
  if (activeView === 'approval-workflows') {
    return (
      <ApprovalWorkflowsPage
        key="approval-workflows"
        onBack={() => setActiveView('dashboard')}
        onEditWorkflow={(workflowId) => {
          setSelectedWorkflowId(workflowId);
          setActiveView('edit-workflow');
        }}
      />
    );
  }

  // Show Edit Workflow page
  if (activeView === 'edit-workflow' && selectedWorkflowId) {
    return (
      <EditWorkflowPage
        key={`edit-workflow-${selectedWorkflowId}`}
        workflowId={selectedWorkflowId}
        onBack={() => setActiveView('approval-workflows')}
      />
    );
  }

  // Show Announcements page
  if (activeView === 'announcements') {
    return (
      <AnnouncementsPage
        key="announcements"
        onBack={() => setActiveView('dashboard')}
      />
    );
  }
  // Summary stats
  const summaryStats = [
    {
      title: "Total Projects",
      value: "57",
      icon: <FolderKanban className="h-5 w-5" />,
    },
    {
      title: "Active Workflows",
      value: "12",
      icon: <Workflow className="h-5 w-5" />,
    },
    {
      title: "Total Users",
      value: "284",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Total Groups",
      value: "18",
      icon: <UsersRound className="h-5 w-5" />,
    },
  ];

  // System Configuration items
  const configurationItems = [
    {
      label: "Approval Workflows",
      description: "Configure multi-stage PMO approval processes",
      onClick: () => setActiveView('approval-workflows'),
    },
    {
      label: "Announcements",
      description: "Manage project notifications and updates",
      onClick: () => setActiveView('announcements'),
    },
  ];

  // System Status
  const systemStatus = [
    { label: "System Health", value: "Operational", status: "success" },
    { label: "Database Status", value: "Connected", status: "success" },
    { label: "Active Users", value: "147", status: "info" },
    { label: "Pending Reviews", value: "23", status: "warning" },
    { label: "Last Backup", value: "2 hours ago", status: "info" },
  ];

  // Recent Activity
  const recentActivity = [
    {
      actor: "Sarah Al-Mansoori",
      project: "Smart Trade 2030",
      action: "updated workflow configuration for",
      recordType: "Approval Workflow",
      timestamp: "5 minutes ago",
    },
    {
      actor: "Ahmed Hassan",
      project: "Digital Customs Platform",
      action: "created new team group for",
      recordType: "Team Group",
      timestamp: "15 minutes ago",
    },
    {
      actor: "Fatima Abdullah",
      project: "AI Risk Assessment",
      action: "modified phase template for",
      recordType: "Phase Template",
      timestamp: "1 hour ago",
    },
    {
      actor: "Mohammed Al-Rashid",
      project: "Blockchain Integration",
      action: "published announcement for",
      recordType: "Announcement",
      timestamp: "2 hours ago",
    },
    {
      actor: "Noura Al-Zaabi",
      project: "Cloud Migration",
      action: "added new project type for",
      recordType: "Project Type",
      timestamp: "3 hours ago",
    },
    {
      actor: "Khalid Al-Mazrouei",
      project: "Mobile App Redesign",
      action: "assigned reviewer team to",
      recordType: "Team Assignment",
      timestamp: "4 hours ago",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-[#357743]";
      case "warning":
        return "text-[#F2A200]";
      case "info":
        return "text-[#008755]";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="h-full overflow-auto">
      <div className="space-y-3 p-3">
        {/* Hero Banner */}
        <Card className="relative text-white border-none shadow-lg overflow-hidden">
          <img
            src={bannerImage}
            alt="Dubai Customs Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#005844]/80 to-[#008755]/80" />
          <CardContent className="pt-3 pb-3 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-12 w-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Settings className="h-6 w-6" />
                  </div>
                  <div>
                    <h1 className="text-xl font-['Dubai:Medium',_sans-serif] mb-1">
                      System Administration
                    </h1>
                    <p className="text-white/90 text-sm">
                      Configure project workflows, team groups, and system settings
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {summaryStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-3 !pb-3 !px-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="h-10 w-10 rounded-lg bg-[#008755]/10 flex items-center justify-center text-[#008755]">
                    {stat.icon}
                  </div>
                </div>
                <p className="text-2xl font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-1">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">
                  {stat.title}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Left Column - System Configuration */}
          <Card>
            <CardHeader className="!px-4 pt-3">
              <CardTitle className="font-['Dubai:Medium',_'Dubai']">
                System Configuration
              </CardTitle>
              <CardDescription>
                Manage core system settings and configurations
              </CardDescription>
            </CardHeader>
            <CardContent className="!px-4 !pb-3">
              <div className="space-y-3">
                {configurationItems.map((item, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg border bg-background hover:bg-accent transition-colors cursor-pointer group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-1">
                          {item.label}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#BB9956] hover:text-[#BB9956]/80 -mr-2"
                        onClick={item.onClick}
                      >
                        Manage
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Right Column - System Status */}
          <Card>
            <CardHeader className="!px-4 pt-3">
              <CardTitle className="font-['Dubai:Medium',_'Dubai']">
                System Status
              </CardTitle>
              <CardDescription>
                Current system health and operational metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="!px-4 !pb-3">
              <div className="space-y-4">
                {systemStatus.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b last:border-b-0"
                  >
                    <span className="text-sm text-muted-foreground">
                      {item.label}
                    </span>
                    <div className="flex items-center gap-2">
                      {item.status === "success" && (
                        <CheckCircle2 className="h-4 w-4 text-[#357743]" />
                      )}
                      {item.status === "warning" && (
                        <Activity className="h-4 w-4 text-[#F2A200]" />
                      )}
                      {item.status === "info" && (
                        <Database className="h-4 w-4 text-[#008755]" />
                      )}
                      <span className={`text-sm font-['Dubai:Medium',_'Dubai'] ${getStatusColor(item.status)}`}>
                        {item.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="!px-4 pt-3">
            <CardTitle className="font-['Dubai:Medium',_'Dubai']">
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest administrative actions across the system
            </CardDescription>
          </CardHeader>
          <CardContent className="!px-4 !pb-3">
            <div className="space-y-2">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between py-3 border-b last:border-b-0 hover:bg-accent/50 -mx-4 px-4 transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                        {activity.actor}
                      </span>
                      {" "}
                      <span className="text-muted-foreground">
                        {activity.action}
                      </span>
                      {" "}
                      <span className="text-[#BB9956] hover:underline cursor-pointer">
                        {activity.project}
                      </span>
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {activity.recordType}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground ml-4">
                    <Clock className="h-3 w-3" />
                    <span>{activity.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
