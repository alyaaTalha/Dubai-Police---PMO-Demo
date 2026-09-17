import { AlertCircle, Clock, TrendingDown, Bell } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

interface Alert {
  id: string;
  type: "threshold" | "overdue" | "trend";
  title: string;
  description: string;
  timestamp: string;
  severity: "high" | "medium" | "low";
}

const alerts: Alert[] = [
  {
    id: "1",
    type: "threshold",
    title: "Customer Satisfaction Below Threshold",
    description: "Q1 customer satisfaction score dropped to 72% (target: 85%)",
    timestamp: "2 hours ago",
    severity: "high",
  },
  {
    id: "2",
    type: "overdue",
    title: "KPI Update Overdue",
    description: "Operations department has 3 KPI updates pending for 5 days",
    timestamp: "4 hours ago",
    severity: "medium",
  },
  {
    id: "3",
    type: "trend",
    title: "Negative Trend Detected",
    description: "Processing time showing consistent decline over last 4 weeks",
    timestamp: "6 hours ago",
    severity: "medium",
  },
  {
    id: "4",
    type: "threshold",
    title: "Budget Variance Alert",
    description: "IT Department exceeded quarterly budget by 12%",
    timestamp: "1 day ago",
    severity: "high",
  },
  {
    id: "5",
    type: "overdue",
    title: "Strategic KPI Review Pending",
    description: "Annual strategic review for 8 KPIs requires action",
    timestamp: "1 day ago",
    severity: "low",
  },
];

export function AlertsFeed() {
  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "threshold":
        return AlertCircle;
      case "overdue":
        return Clock;
      case "trend":
        return TrendingDown;
    }
  };

  const getSeverityColor = (severity: Alert["severity"]) => {
    switch (severity) {
      case "high":
        return "#ef4444";
      case "medium":
        return "#f59e0b";
      case "low":
        return "#6b7280";
    }
  };

  const getSeverityBgColor = (severity: Alert["severity"]) => {
    switch (severity) {
      case "high":
        return "#fef2f2";
      case "medium":
        return "#fffbeb";
      case "low":
        return "#f9fafb";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-[#e0e0e0] overflow-hidden">
      <div className="p-6 border-b border-[#e5e7eb] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#fef2f2] rounded-lg">
            <Bell className="w-5 h-5 text-[#ef4444]" />
          </div>
          <div>
            <h3 className="font-['Dubai:Medium',_sans-serif] text-[#1f2937]">
              Recent Alerts
            </h3>
            <p className="font-['Dubai:Regular',_sans-serif] text-[#6b7280]">
              {alerts.length} active alerts
            </p>
          </div>
        </div>
      </div>

      <ScrollArea className="h-[400px]">
        <div className="p-4 space-y-3">
          {alerts.map((alert) => {
            const Icon = getAlertIcon(alert.type);
            return (
              <div
                key={alert.id}
                className="p-4 rounded-lg border border-[#e5e7eb] hover:border-[#008755] transition-colors cursor-pointer"
                style={{ backgroundColor: getSeverityBgColor(alert.severity) }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="p-2 rounded-lg shrink-0"
                    style={{
                      backgroundColor: "white",
                      border: `1px solid ${getSeverityColor(alert.severity)}`,
                    }}
                  >
                    <Icon
                      className="w-4 h-4"
                      style={{ color: getSeverityColor(alert.severity) }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4
                        className="font-['Dubai:Medium',_sans-serif]"
                        style={{ color: getSeverityColor(alert.severity) }}
                      >
                        {alert.title}
                      </h4>
                      <span className="font-['Dubai:Regular',_sans-serif] text-[#9ca3af] text-nowrap shrink-0">
                        {alert.timestamp}
                      </span>
                    </div>
                    <p className="font-['Dubai:Regular',_sans-serif] text-[#6b7280]">
                      {alert.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
