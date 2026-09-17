import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { LucideIcon, ExternalLink, TrendingUp, TrendingDown, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
  aiInsight?: string;
  className?: string;
  variant?: 'default' | 'primary';
  showExternalLink?: boolean;
  onClick?: () => void;
}

export function KPICard({ title, value, icon: Icon, trend, subtitle, aiInsight, className, variant = 'default', showExternalLink, onClick }: KPICardProps) {
  return (
    <Card 
      className={`bg-white border-blue-200 ${onClick ? 'cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5' : ''} ${className || ''}`}
      style={{
        backgroundImage: `
          linear-gradient(
            135deg,
            rgba(59, 130, 246, 0.03) 0%,
            rgba(255, 255, 255, 0) 50%,
            rgba(59, 130, 246, 0.015) 100%
          )
        `
      }}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${variant === 'primary' ? 'bg-primary/10' : 'bg-muted'}`}>
            <Icon className={`h-4 w-4 ${variant === 'primary' ? 'text-primary' : 'text-muted-foreground'}`} />
          </div>
          <CardTitle className="text-sm font-normal text-muted-foreground">{title}</CardTitle>
        </div>
        {showExternalLink && (
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex items-baseline gap-2">
          <span className="text-sm text-muted-foreground">Entries</span>
          <span className="text-2xl font-semibold">{value}</span>
        </div>
        {trend && (
          <div className={`flex items-center gap-1 mt-1.5 ${trend.isPositive ? 'text-teal-600' : 'text-orange-500'}`}>
            {trend.isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            <span className="text-sm font-medium">{trend.isPositive ? '+' : ''}{trend.value}%</span>
            <span className="text-xs text-muted-foreground ml-1">vs last period</span>
          </div>
        )}
        {aiInsight && (
          <div className="mt-2 pt-2 border-t border-border/50">
            <div className="flex items-start gap-2">
              <Sparkles className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">{aiInsight}</p>
            </div>
          </div>
        )}
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  );
}
