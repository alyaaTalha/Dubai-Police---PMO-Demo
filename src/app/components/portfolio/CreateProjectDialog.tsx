import { useState } from "react";
import {
  X,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  AlertCircle,
  Save,
  Send,
  FileText,
  Building2,
  DollarSign,
  ShieldAlert,
  Users,
  Target,
  Calendar,
  TrendingUp,
  Clock,
  Plus,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import bannerImage from "figma:asset/2ceb5f3890ecf49940adbd1e2cca8cf7647ce99f.png";

interface CreateProjectDialogProps {
  onClick?: () => void;
}

type SectionStatus = "Not Started" | "In Progress" | "Completed";
type FinanceStatus = "Not Submitted" | "Under Review" | "Approved" | "Rejected";

export function CreateProjectDialog({ onClick }: CreateProjectDialogProps) {
  return (
    <Button 
      size="lg" 
      className="bg-white text-[#008755] hover:bg-white/90"
      onClick={onClick}
    >
      <Plus className="h-4 w-4 mr-2" />
      Create Project
    </Button>
  );
}