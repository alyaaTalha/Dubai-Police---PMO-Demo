import { LayoutDashboard, Database, BarChart3, FileText, CheckSquare, FileBarChart } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../ui/utils';

interface LeftSidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'sources', label: 'Data Sources', icon: Database },
  { id: 'analysis', label: 'Analysis', icon: BarChart3 },
  { id: 'findings', label: 'Findings', icon: FileText },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'reports', label: 'Reports', icon: FileBarChart },
];

export function LeftSidebar({ currentPage, onNavigate }: LeftSidebarProps) {
  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Navigation</h3>
        <p className="text-xs text-muted-foreground mt-1">VoC Analytics Platform</p>
      </div>
      
      <nav className="flex-1 p-3 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start gap-3',
                isActive && 'bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary'
              )}
              onClick={() => onNavigate(item.id)}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Button>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-border">
        <div className="text-xs text-muted-foreground">
          <p>Version 2.1.0</p>
          <p className="mt-1">© 2025 Government Services</p>
        </div>
      </div>
    </div>
  );
}
