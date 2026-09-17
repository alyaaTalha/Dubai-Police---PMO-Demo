import { ArrowLeft, TrendingUp, Users, Activity, Award, ArrowDown } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

interface StrategyMapProps {
  onBack: () => void;
}

interface ObjectiveCardProps {
  title: string;
  code: string;
  perspective: string;
  color: string;
  status: "on-track" | "at-risk" | "achieved";
}

function ObjectiveCard({ title, code, perspective, color, status }: ObjectiveCardProps) {
  const statusColors = {
    "on-track": "bg-green-100 text-green-700",
    "at-risk": "bg-yellow-100 text-yellow-700",
    "achieved": "bg-blue-100 text-blue-700"
  };

  const statusLabels = {
    "on-track": "On Track",
    "at-risk": "At Risk",
    "achieved": "Achieved"
  };

  return (
    <Card className="border-l-4 hover:shadow-md transition-all cursor-pointer" style={{ borderLeftColor: color }}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <Badge variant="outline" className="text-xs mb-2">
            {code}
          </Badge>
          <Badge variant="secondary" className={`text-xs ${statusColors[status]}`}>
            {statusLabels[status]}
          </Badge>
        </div>
        <h4 className="text-sm font-['Dubai:Medium',_sans-serif] text-[#1f2937] leading-snug">
          {title}
        </h4>
      </CardContent>
    </Card>
  );
}

function ConnectorArrow() {
  return (
    <div className="flex justify-center my-3">
      <ArrowDown className="h-6 w-6 text-[#008755]" strokeWidth={2} />
    </div>
  );
}

export function StrategyMap({ onBack }: StrategyMapProps) {
  return (
    <div className="h-full overflow-auto bg-[#f8f9fa]">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-xl font-['Dubai:Medium',_sans-serif] text-[#1f2937]">
                Strategy Map
              </h1>
              <p className="text-sm text-muted-foreground">
                Dubai Customs Strategic Objectives & Cause-Effect Relationships
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="text-sm">
            2025-2027
          </Badge>
        </div>

        {/* Vision & Mission */}
        <Card className="bg-gradient-to-r from-[#005844] to-[#008755] text-white border-none">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-['Dubai:Medium',_sans-serif] mb-2 text-white/80">
                  Vision
                </h3>
                <p className="text-base font-['Dubai:Medium',_sans-serif]">
                  To be a leading customs administration globally recognized for excellence, innovation, and seamless trade facilitation
                </p>
              </div>
              <div>
                <h3 className="text-sm font-['Dubai:Medium',_sans-serif] mb-2 text-white/80">
                  Mission
                </h3>
                <p className="text-base font-['Dubai:Medium',_sans-serif]">
                  Protecting society and facilitating trade through smart customs solutions, while ensuring compliance and enhancing customer experience
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <ConnectorArrow />

        {/* Strategic Themes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { theme: "Digital Transformation", color: "#115E67" },
            { theme: "Customer Excellence", color: "#386992" },
            { theme: "Operational Excellence", color: "#BB9956" },
            { theme: "Innovation & Growth", color: "#B94700" }
          ].map((theme, idx) => (
            <Card key={idx} className="text-white border-none" style={{ background: theme.color }}>
              <CardContent className="p-4 text-center">
                <p className="text-sm font-['Dubai:Medium',_sans-serif]">{theme.theme}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <ConnectorArrow />

        {/* Strategy Map - Balanced Scorecard Perspectives */}
        <div className="space-y-6">
          {/* Financial Perspective */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg flex items-center justify-center text-white" style={{ background: "#115E67" }}>
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-['Dubai:Medium',_sans-serif] text-[#1f2937]">
                  Financial Perspective
                </h2>
                <p className="text-xs text-muted-foreground">
                  Sustainable financial performance and resource optimization
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ObjectiveCard
                title="Maximize Revenue Collection"
                code="FIN-01"
                perspective="Financial"
                color="#115E67"
                status="on-track"
              />
              <ObjectiveCard
                title="Optimize Resource Utilization"
                code="FIN-02"
                perspective="Financial"
                color="#115E67"
                status="on-track"
              />
              <ObjectiveCard
                title="Enhance Cost Efficiency"
                code="FIN-03"
                perspective="Financial"
                color="#115E67"
                status="achieved"
              />
            </div>
          </div>

          <ConnectorArrow />

          {/* Customer Perspective */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg flex items-center justify-center text-white" style={{ background: "#386992" }}>
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-['Dubai:Medium',_sans-serif] text-[#1f2937]">
                  Customer Perspective
                </h2>
                <p className="text-xs text-muted-foreground">
                  Exceptional customer experience and stakeholder satisfaction
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ObjectiveCard
                title="Enhance Customer Satisfaction"
                code="CUS-01"
                perspective="Customer"
                color="#386992"
                status="on-track"
              />
              <ObjectiveCard
                title="Improve Service Delivery Speed"
                code="CUS-02"
                perspective="Customer"
                color="#386992"
                status="on-track"
              />
              <ObjectiveCard
                title="Strengthen Stakeholder Partnership"
                code="CUS-03"
                perspective="Customer"
                color="#386992"
                status="on-track"
              />
              <ObjectiveCard
                title="Increase Digital Channel Adoption"
                code="CUS-04"
                perspective="Customer"
                color="#386992"
                status="at-risk"
              />
              <ObjectiveCard
                title="Enhance Transparency & Communication"
                code="CUS-05"
                perspective="Customer"
                color="#386992"
                status="on-track"
              />
            </div>
          </div>

          <ConnectorArrow />

          {/* Internal Process Perspective */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg flex items-center justify-center text-white" style={{ background: "#BB9956" }}>
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-['Dubai:Medium',_sans-serif] text-[#1f2937]">
                  Internal Process Perspective
                </h2>
                <p className="text-xs text-muted-foreground">
                  Operational excellence and process optimization
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ObjectiveCard
                title="Streamline Customs Clearance Process"
                code="INT-01"
                perspective="Internal"
                color="#BB9956"
                status="on-track"
              />
              <ObjectiveCard
                title="Enhance Risk Management & Compliance"
                code="INT-02"
                perspective="Internal"
                color="#BB9956"
                status="on-track"
              />
              <ObjectiveCard
                title="Strengthen Border Security"
                code="INT-03"
                perspective="Internal"
                color="#BB9956"
                status="achieved"
              />
              <ObjectiveCard
                title="Implement Smart Inspection Technologies"
                code="INT-04"
                perspective="Internal"
                color="#BB9956"
                status="on-track"
              />
              <ObjectiveCard
                title="Optimize Supply Chain Integration"
                code="INT-05"
                perspective="Internal"
                color="#BB9956"
                status="on-track"
              />
              <ObjectiveCard
                title="Improve Data Quality & Analytics"
                code="INT-06"
                perspective="Internal"
                color="#BB9956"
                status="at-risk"
              />
            </div>
          </div>

          <ConnectorArrow />

          {/* Learning & Growth Perspective */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg flex items-center justify-center text-white" style={{ background: "#FFBE9F" }}>
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-['Dubai:Medium',_sans-serif] text-[#1f2937]">
                  Learning & Growth Perspective
                </h2>
                <p className="text-xs text-muted-foreground">
                  Building capabilities, innovation, and organizational culture
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ObjectiveCard
                title="Develop Skilled & Competent Workforce"
                code="LEA-01"
                perspective="Learning"
                color="#FFBE9F"
                status="on-track"
              />
              <ObjectiveCard
                title="Foster Innovation Culture"
                code="LEA-02"
                perspective="Learning"
                color="#FFBE9F"
                status="on-track"
              />
              <ObjectiveCard
                title="Enhance Employee Engagement"
                code="LEA-03"
                perspective="Learning"
                color="#FFBE9F"
                status="on-track"
              />
              <ObjectiveCard
                title="Build Digital Capabilities"
                code="LEA-04"
                perspective="Learning"
                color="#FFBE9F"
                status="on-track"
              />
              <ObjectiveCard
                title="Strengthen Knowledge Management"
                code="LEA-05"
                perspective="Learning"
                color="#FFBE9F"
                status="achieved"
              />
            </div>
          </div>
        </div>

        {/* Legend */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-['Dubai:Medium',_sans-serif] text-[#1f2937]">
                  Status Legend:
                </span>
                <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                  On Track
                </Badge>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 text-xs">
                  At Risk
                </Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                  Achieved
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ArrowDown className="h-4 w-4 text-[#008755]" />
                <span>Cause-effect relationships flow from bottom to top</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
