import { useState } from "react";
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Workflow,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface ApprovalWorkflowsPageProps {
  onBack: () => void;
  onEditWorkflow: (workflowId: string) => void;
}

export function ApprovalWorkflowsPage({
  onBack,
  onEditWorkflow,
}: ApprovalWorkflowsPageProps) {
  // Sample workflow data
  const workflows = [
    {
      id: "wf-01",
      name: "Digital Project Lifecycle",
      description: "BRD → FSD → Legal feasibility approval chain",
      steps: 3,
      lastModified: "2 weeks ago",
      canDelete: false,
    },
    {
      id: "wf-02",
      name: "Non-Digital Project Lifecycle",
      description: "Directional approval → pilot → implementation",
      steps: 4,
      lastModified: "3 weeks ago",
      canDelete: false,
    },
    {
      id: "wf-03",
      name: "Ideation Phase — Internal Proposal",
      description: "Draft proposal → directional approval → further detailing",
      steps: 3,
      lastModified: "5 weeks ago",
      canDelete: true,
    },
    {
      id: "wf-04",
      name: "Project Elimination Review",
      description: "Escalated directional review for rejected proposals",
      steps: 2,
      lastModified: "8 weeks ago",
      canDelete: true,
    },
  ];

  const handleDelete = (workflowId: string) => {
    // Handle delete logic here
    console.log("Delete workflow:", workflowId);
  };

  return (
    <div className="h-full overflow-auto">
      <div className="space-y-3 p-3">
        {/* Header Section */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="-ml-2"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <div className="h-12 w-12 rounded-lg bg-[#008755]/10 flex items-center justify-center">
              <Workflow className="h-6 w-6 text-[#008755]" />
            </div>
            <div>
              <h1 className="text-xl   text-[#1f2937]">
                Approval Workflows
              </h1>
              <p className="text-sm text-muted-foreground">
                Manage multi-stage PMO approval workflows and assign reviewers
              </p>
            </div>
          </div>
          <Button size="lg" className="bg-[#008755] hover:bg-[#008755]/90">
            <Plus className="h-4 w-4 mr-2" />
            New Workflow
          </Button>
        </div>

        {/* Workflows Table */}
        <Card>
          <CardHeader>
            <CardTitle className="font-['Dubai:Medium',_'Dubai']">
              All Workflows
            </CardTitle>
            <CardDescription>
              View and manage approval workflow configurations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-['Dubai:Medium',_'Dubai']">
                      Workflow Name
                    </TableHead>
                    <TableHead className="font-['Dubai:Medium',_'Dubai']">
                      Description
                    </TableHead>
                    <TableHead className="font-['Dubai:Medium',_'Dubai']">
                      Steps
                    </TableHead>
                    <TableHead className="font-['Dubai:Medium',_'Dubai']">
                      Last Modified
                    </TableHead>
                    <TableHead className="font-['Dubai:Medium',_'Dubai'] text-right">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workflows.map((workflow) => (
                    <TableRow key={workflow.id}>
                      <TableCell>
                        <div>
                          <div className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                            {workflow.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            ID: {workflow.id}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <div className="text-sm text-muted-foreground truncate">
                          {workflow.description}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {workflow.steps}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground">
                          {workflow.lastModified}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onEditWorkflow(workflow.id)}
                            className="inline-flex items-center gap-1 text-sm text-[#BB9956] hover:text-[#BB9956]/80 transition-colors"
                          >
                            <Edit className="h-3.5 w-3.5" />
                            Edit
                          </button>
                          {workflow.canDelete && (
                            <button
                              onClick={() => handleDelete(workflow.id)}
                              className="inline-flex items-center gap-1 text-sm text-destructive hover:text-destructive/80 transition-colors"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Delete
                            </button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
