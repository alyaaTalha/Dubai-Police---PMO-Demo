import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  AlertCircle,
  Calendar,
  Users,
  Clock,
  Pin,
  ExternalLink,
  Edit,
  LayoutGrid
} from "lucide-react";

interface Project {
  serialNumber: number;
  projectName: string;
  projectType: string;
  status: string;
  projectCode: string;
  description: string;
  percentageComplete: number;
  latestProgress: string;
  executionUpdate: string;
  nextMilestone: string;
  requestForSupport: string;
  nextMilestoneDate: string;
  targetCompletionDate: string;
  lastTouchpoint: string;
  owner: string;
  manager: string;
  coordinator: string;
}

interface EnhancedProjectViewProps {
  projects: Project[];
  selectedProjectId: number | null;
  setSelectedProjectId: (id: number | null) => void;
  pinnedProjects: number[];
  togglePin: (id: number) => void;
  getStatusColor: (status: string) => string;
}

export function EnhancedProjectView({
  projects,
  selectedProjectId,
  setSelectedProjectId,
  pinnedProjects,
  togglePin,
  getStatusColor
}: EnhancedProjectViewProps) {
  const needsAttention = (project: Project) => {
    return project.status === "Delayed / At Risk" || project.requestForSupport !== "—";
  };

  const selectedProject = selectedProjectId 
    ? projects.find(p => p.serialNumber === selectedProjectId)
    : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
      {/* Left Panel - Project List */}
      <div className="lg:col-span-1">
        <Card className="h-[calc(100vh-280px)]">
          <CardHeader className="pb-3">
            <CardTitle className="font-['Dubai:Medium',_'Dubai'] text-base">
              Projects ({projects.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-y-auto h-[calc(100vh-360px)] px-4 space-y-2">
              {projects.map((project) => (
                <div
                  key={project.serialNumber}
                  onClick={() => setSelectedProjectId(project.serialNumber)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                    selectedProjectId === project.serialNumber
                      ? 'border-[#008755] bg-[#008755]/5 shadow-sm'
                      : 'border-border bg-card hover:border-[#008755]/50'
                  }`}
                >
                  {/* Header with Pin and Alert */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      {pinnedProjects.includes(project.serialNumber) && (
                        <Pin className="h-3 w-3 text-[#008755] fill-[#008755]" />
                      )}
                      {needsAttention(project) && (
                        <AlertCircle className="h-3 w-3 text-[#D83731]" />
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePin(project.serialNumber);
                      }}
                    >
                      <Pin className={`h-3 w-3 ${pinnedProjects.includes(project.serialNumber) ? 'fill-[#008755] text-[#008755]' : 'text-muted-foreground'}`} />
                    </Button>
                  </div>

                  {/* Project Name */}
                  <h4 className="font-['Dubai:Medium',_'Dubai'] text-sm text-[#1f2937] mb-2 line-clamp-2">
                    {project.projectName}
                  </h4>

                  {/* Status and Type */}
                  <div className="flex items-center gap-2 mb-2">
                    <Badge 
                      style={{
                        backgroundColor: `${getStatusColor(project.status)}20`,
                        color: getStatusColor(project.status)
                      }}
                      className="text-xs"
                    >
                      {project.status}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {project.projectType}
                    </Badge>
                  </div>

                  {/* Progress */}
                  <div className="mb-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Completion</span>
                      <span className="text-xs font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                        {project.percentageComplete}%
                      </span>
                    </div>
                    <Progress value={project.percentageComplete} className="h-1.5" />
                  </div>

                  {/* Next Milestone */}
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Next Milestone</div>
                    <div className="text-xs text-[#1f2937] line-clamp-2">
                      {project.nextMilestone}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{project.nextMilestoneDate}</span>
                    </div>
                  </div>

                  {/* Owner */}
                  <div className="mt-2 pt-2 border-t flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    <span>{project.owner}</span>
                  </div>
                </div>
              ))}
              
              {projects.length === 0 && (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No projects match the selected filters
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - Project Details */}
      <div className="lg:col-span-2">
        {selectedProject ? (
          <Card className="h-[calc(100vh-280px)]">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="font-['Dubai:Medium',_'Dubai'] text-lg mb-2">
                    {selectedProject.projectName}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {selectedProject.projectCode}
                    </code>
                    <Badge variant="outline">{selectedProject.projectType}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Open Project
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="overflow-y-auto h-[calc(100vh-420px)]">
              <div className="space-y-6">
                {/* Section 1: Project Information */}
                <div>
                  <h3 className="font-['Dubai:Medium',_'Dubai'] text-sm text-[#1f2937] mb-3 pb-2 border-b">
                    Project Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Status</div>
                      <Badge 
                        style={{
                          backgroundColor: `${getStatusColor(selectedProject.status)}20`,
                          color: getStatusColor(selectedProject.status)
                        }}
                      >
                        {selectedProject.status}
                      </Badge>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Completion</div>
                      <div className="flex items-center gap-2">
                        <Progress value={selectedProject.percentageComplete} className="h-2 flex-1" />
                        <span className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                          {selectedProject.percentageComplete}%
                        </span>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-xs text-muted-foreground mb-1">Description</div>
                      <div className="text-sm text-[#1f2937]">
                        {selectedProject.description}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Target Completion Date</div>
                      <div className="text-sm text-[#1f2937] flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {selectedProject.targetCompletionDate}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Execution Updates */}
                <div>
                  <h3 className="font-['Dubai:Medium',_'Dubai'] text-sm text-[#1f2937] mb-3 pb-2 border-b">
                    Execution Updates
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Latest Progress</div>
                      <div className="text-sm text-[#1f2937] p-3 bg-muted/30 rounded-lg">
                        {selectedProject.latestProgress}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Execution Update</div>
                      <div className="text-sm text-[#1f2937] p-3 bg-muted/30 rounded-lg">
                        {selectedProject.executionUpdate}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Last Touchpoint</div>
                      <div className="text-sm text-[#1f2937] flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {selectedProject.lastTouchpoint}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 3: Milestones & Escalations */}
                <div>
                  <h3 className="font-['Dubai:Medium',_'Dubai'] text-sm text-[#1f2937] mb-3 pb-2 border-b">
                    Milestones & Escalations
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Next Milestone</div>
                      <div className="text-sm text-[#1f2937] p-3 bg-[#008755]/5 border border-[#008755]/20 rounded-lg">
                        {selectedProject.nextMilestone}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Next Milestone Date</div>
                      <div className="text-sm text-[#1f2937] flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {selectedProject.nextMilestoneDate}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Request for Support</div>
                      <div className={`text-sm p-3 rounded-lg ${
                        selectedProject.requestForSupport !== "—"
                          ? 'text-[#D83731] bg-[#D83731]/5 border border-[#D83731]/20'
                          : 'text-muted-foreground bg-muted/30'
                      }`}>
                        {selectedProject.requestForSupport}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 4: Governance & Ownership */}
                <div>
                  <h3 className="font-['Dubai:Medium',_'Dubai'] text-sm text-[#1f2937] mb-3 pb-2 border-b">
                    Governance & Ownership
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Owner</div>
                      <div className="text-sm text-[#1f2937] font-['Dubai:Medium',_'Dubai']">
                        {selectedProject.owner}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Manager</div>
                      <div className="text-sm text-[#1f2937] font-['Dubai:Medium',_'Dubai']">
                        {selectedProject.manager}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Co-ordinator</div>
                      <div className="text-sm text-[#1f2937] font-['Dubai:Medium',_'Dubai']">
                        {selectedProject.coordinator}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="h-[calc(100vh-280px)] flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <LayoutGrid className="h-12 w-12 mx-auto mb-3 opacity-20" />
              <p>Select a project to view details</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}