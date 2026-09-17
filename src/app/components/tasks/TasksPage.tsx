import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { mockTasks } from '../../lib/mockData';
import { Plus, CheckCircle2, Clock, Circle, Calendar, User, Filter } from 'lucide-react';
import { Task, TaskStatus } from '../../types';
import { StatCard } from '../shared/StatCard';

const getStatusBadge = (status: TaskStatus) => {
  switch (status) {
    case 'completed':
      return (
        <Badge className="bg-green-600">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Completed
        </Badge>
      );
    case 'in-progress':
      return (
        <Badge className="bg-blue-600">
          <Clock className="h-3 w-3 mr-1" />
          In Progress
        </Badge>
      );
    case 'not-started':
      return (
        <Badge variant="secondary">
          <Circle className="h-3 w-3 mr-1" />
          Not Started
        </Badge>
      );
  }
};

const getStatusProgress = (status: TaskStatus) => {
  switch (status) {
    case 'completed':
      return 100;
    case 'in-progress':
      return 50;
    case 'not-started':
      return 0;
  }
};

export function TasksPage() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [groupBy, setGroupBy] = useState<string>('none');
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const filteredTasks = mockTasks.filter(task => {
    if (statusFilter !== 'all' && task.status !== statusFilter) return false;
    if (departmentFilter !== 'all' && task.department !== departmentFilter) return false;
    return true;
  });

  const departments = Array.from(new Set(mockTasks.map(t => t.department)));
  const completedTasks = mockTasks.filter(t => t.status === 'completed').length;
  const inProgressTasks = mockTasks.filter(t => t.status === 'in-progress').length;
  const notStartedTasks = mockTasks.filter(t => t.status === 'not-started').length;
  const overdueTasks = mockTasks.filter(t => t.dueDate < new Date() && t.status !== 'completed').length;

  const renderTaskRows = (tasks: Task[]) => {
    return tasks.map(task => (
      <TableRow key={task.id}>
        <TableCell>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-gray-300" />
            <div>
              <div className="font-medium">{task.title}</div>
              <div className="text-xs text-muted-foreground mt-0.5">
                Ref: {task.findingId}
              </div>
            </div>
          </div>
        </TableCell>
        <TableCell>
          <div className="text-sm">{task.findingTitle}</div>
        </TableCell>
        <TableCell>
          <Badge variant="outline">{task.category}</Badge>
        </TableCell>
        <TableCell>{task.department}</TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <User className="h-3 w-3 text-muted-foreground" />
            {task.assignedTo}
          </div>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <Calendar className="h-3 w-3 text-muted-foreground" />
            {task.dueDate.toLocaleDateString()}
          </div>
          {task.dueDate < new Date() && task.status !== 'completed' && (
            <div className="text-xs text-red-600 mt-1">Overdue</div>
          )}
        </TableCell>
        <TableCell>{getStatusBadge(task.status)}</TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <Select defaultValue={task.status}>
              <SelectTrigger className="w-[140px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not-started">Not Started</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TableCell>
      </TableRow>
    ));
  };

  const renderGroupedTasks = () => {
    if (groupBy === 'category') {
      const groupedByCategory = filteredTasks.reduce((acc, task) => {
        if (!acc[task.category]) acc[task.category] = [];
        acc[task.category].push(task);
        return acc;
      }, {} as Record<string, Task[]>);

      return Object.entries(groupedByCategory).map(([category, tasks]) => (
        <div key={category} className="mb-6">
          <div className="bg-muted px-4 py-2 rounded-md mb-2">
            <h3 className="flex items-center justify-between">
              {category}
              <Badge variant="secondary">{tasks.length} tasks</Badge>
            </h3>
          </div>
          <Table>
            <TableBody>{renderTaskRows(tasks)}</TableBody>
          </Table>
        </div>
      ));
    } else if (groupBy === 'department') {
      const groupedByDepartment = filteredTasks.reduce((acc, task) => {
        if (!acc[task.department]) acc[task.department] = [];
        acc[task.department].push(task);
        return acc;
      }, {} as Record<string, Task[]>);

      return Object.entries(groupedByDepartment).map(([department, tasks]) => (
        <div key={department} className="mb-6">
          <div className="bg-muted px-4 py-2 rounded-md mb-2">
            <h3 className="flex items-center justify-between">
              {department}
              <Badge variant="secondary">{tasks.length} tasks</Badge>
            </h3>
          </div>
          <Table>
            <TableBody>{renderTaskRows(tasks)}</TableBody>
          </Table>
        </div>
      ));
    } else {
      return (
        <Table>
          <TableBody>{renderTaskRows(filteredTasks)}</TableBody>
        </Table>
      );
    }
  };

  return (
    <div>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1>Task Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track action items from findings
            </p>
          </div>
        <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>
                Add a new action item linked to a finding
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="task-title">Task Title</Label>
                <Input id="task-title" placeholder="Enter task title" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="finding">Associated Finding</Label>
                <Select>
                  <SelectTrigger id="finding">
                    <SelectValue placeholder="Select a finding" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="finding-1">Finding #1</SelectItem>
                    <SelectItem value="finding-2">Finding #2</SelectItem>
                    <SelectItem value="finding-3">Finding #3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="department">Department</Label>
                <Select>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="assignee">Assign To</Label>
                <Input id="assignee" placeholder="Enter assignee name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="due-date">Due Date</Label>
                <Input id="due-date" type="date" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Task description" rows={3} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddTaskOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddTaskOpen(false)}>Create Task</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Tasks"
          value={mockTasks.length}
          icon={CheckCircle2}
        />
        <StatCard
          title="In Progress"
          value={inProgressTasks}
          icon={Clock}
          subtitle={`${Math.round((inProgressTasks / mockTasks.length) * 100)}% of total`}
        />
        <StatCard
          title="Completed"
          value={completedTasks}
          icon={CheckCircle2}
          subtitle={`${Math.round((completedTasks / mockTasks.length) * 100)}% of total`}
        />
        <StatCard
          title="Overdue"
          value={overdueTasks}
          icon={Calendar}
          className="border-red-200"
        />
      </div>

      {/* Filters and Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Filters & View Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Label className="text-sm">Status:</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="not-started">Not Started</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Label className="text-sm">Department:</Label>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Label className="text-sm">Group By:</Label>
              <Select value={groupBy} onValueChange={setGroupBy}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="category">Category</SelectItem>
                  <SelectItem value="department">Department</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="ml-auto">
              <Badge variant="outline">
                {filteredTasks.length} tasks shown
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasks Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          {groupBy === 'none' && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Finding Reference</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>{renderTaskRows(filteredTasks)}</TableBody>
            </Table>
          )}
          {groupBy !== 'none' && renderGroupedTasks()}
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
