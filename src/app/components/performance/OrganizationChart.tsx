import { useState, useRef } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Progress } from "../ui/progress";
import { 
  ArrowLeft, 
  Download, 
  Building2, 
  Search, 
  ZoomIn, 
  ZoomOut, 
  Maximize2,
  ChevronDown,
  ChevronRight,
  Users,
  TrendingUp,
  Target,
  FileText,
  X,
  ExternalLink,
  Home,
  ChevronLeft,
  Filter,
  BarChart
} from "lucide-react";
import bannerImage from "figma:asset/2ceb5f3890ecf49940adbd1e2cca8cf7647ce99f.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

// KPI Gauge Colors - Achievement Thresholds
export const KPI_GAUGE_COLORS = {
  GREEN: '#357743',   // 90-100%
  BLUE: '#335CFF',    // 75-89%
  YELLOW: '#F2E600',  // 50-74%
  RED: '#D83731'      // 0-49%
};

interface OrganizationChartProps {
  onBack: () => void;
}

interface Section {
  id: string;
  name: string;
  kpiCount: number;
  achievement: number;
  status: "green" | "amber" | "red";
  owner: {
    name: string;
    role: string;
    avatar?: string;
  };
}

interface Department {
  id: string;
  name: string;
  code: string;
  kpiCount: number;
  achievement: number;
  status: "green" | "amber" | "red";
  sections: Section[];
  owner: {
    name: string;
    role: string;
    avatar?: string;
  };
}

interface Division {
  id: string;
  name: string;
  code: string;
  color: string;
  totalKPIs: number;
  achievedPercentage: number;
  underperformingCount: number;
  departments: Department[];
}

const organizationData: Division[] = [
  {
    id: "cdd",
    name: "Customs Development Division",
    code: "CDD",
    color: "#00B0AA",
    totalKPIs: 24,
    achievedPercentage: 87,
    underperformingCount: 2,
    departments: [
      {
        id: "itd",
        name: "Information Technology",
        code: "ITD",
        kpiCount: 8,
        achievement: 92,
        status: "green",
        owner: {
          name: "Ahmed Al Mansoori",
          role: "IT Director",
        },
        sections: [
          { id: "itd-1", name: "Customs IT Solution Services", kpiCount: 4, achievement: 95, status: "green", owner: { name: "Sara Hassan", role: "Section Head" } },
          { id: "itd-2", name: "Information Security", kpiCount: 5, achievement: 88, status: "green", owner: { name: "Mohammed Ali", role: "Section Head" } },
          { id: "itd-3", name: "Infrastructure", kpiCount: 6, achievement: 90, status: "green", owner: { name: "Fatima Ahmed", role: "Section Head" } },
          { id: "itd-4", name: "Solutions Delivery", kpiCount: 4, achievement: 94, status: "green", owner: { name: "Khalid Omar", role: "Section Head" } }
        ]
      },
      {
        id: "pdd",
        name: "Projects Delivery",
        code: "PDD",
        kpiCount: 6,
        achievement: 85,
        status: "green",
        owner: {
          name: "Mariam Al Hashimi",
          role: "Projects Director",
        },
        sections: [
          { id: "pdd-1", name: "Projects Delivery", kpiCount: 6, achievement: 85, status: "green", owner: { name: "Rashid Saeed", role: "Section Head" } }
        ]
      },
      {
        id: "sid",
        name: "Services Innovation",
        code: "SID",
        kpiCount: 10,
        achievement: 84,
        status: "green",
        owner: {
          name: "Noura Al Zaabi",
          role: "Innovation Director",
        },
        sections: [
          { id: "sid-1", name: "Business Process Analysis", kpiCount: 3, achievement: 82, status: "green", owner: { name: "Abdullah Khan", role: "Section Head" } },
          { id: "sid-2", name: "Business Process Improvement", kpiCount: 4, achievement: 86, status: "green", owner: { name: "Layla Ibrahim", role: "Section Head" } },
          { id: "sid-3", name: "IT Strategy & Enterprise Architecture", kpiCount: 3, achievement: 84, status: "green", owner: { name: "Omar Rashid", role: "Section Head" } }
        ]
      }
    ]
  },
  {
    id: "cid",
    name: "Customs Inspection Division",
    code: "CID",
    color: "#BB9956",
    totalKPIs: 32,
    achievedPercentage: 91,
    underperformingCount: 1,
    departments: [
      {
        id: "acc",
        name: "Air Cargo Centers Management",
        code: "ACC",
        kpiCount: 7,
        achievement: 93,
        status: "green",
        owner: {
          name: "Salem Al Ketbi",
          role: "Air Cargo Director",
        },
        sections: [
          { id: "acc-1", name: "Airport Free Zone Inspection Center", kpiCount: 3, achievement: 94, status: "green", owner: { name: "Yousef Ali", role: "Section Head" } },
          { id: "acc-2", name: "Al Maktoum Cargo Inspection Centre", kpiCount: 2, achievement: 92, status: "green", owner: { name: "Amina Hassan", role: "Section Head" } },
          { id: "acc-3", name: "DMCC Inspection Center", kpiCount: 2, achievement: 93, status: "green", owner: { name: "Hamad Saif", role: "Section Head" } }
        ]
      },
      {
        id: "icc",
        name: "Inland Customs Centers Management",
        code: "ICC",
        kpiCount: 6,
        achievement: 88,
        status: "green",
        owner: {
          name: "Rashid Al Mheiri",
          role: "Inland Centers Director",
        },
        sections: [
          { id: "icc-1", name: "Dry Port & Textile Customs Center", kpiCount: 2, achievement: 90, status: "green", owner: { name: "Maryam Said", role: "Section Head" } },
          { id: "icc-2", name: "Ducamz Inspection Center", kpiCount: 2, achievement: 86, status: "green", owner: { name: "Ali Ahmed", role: "Section Head" } },
          { id: "icc-3", name: "Hatta Customs Center", kpiCount: 2, achievement: 88, status: "green", owner: { name: "Shamma Khalid", role: "Section Head" } }
        ]
      },
      {
        id: "pod",
        name: "Passenger Operations",
        code: "POD",
        kpiCount: 9,
        achievement: 94,
        status: "green",
        owner: {
          name: "Majid Al Suwaidi",
          role: "Passenger Operations Director",
        },
        sections: [
          { id: "pod-1", name: "Al Maktoum Terminal Passenger Operations", kpiCount: 2, achievement: 95, status: "green", owner: { name: "Noor Hassan", role: "Section Head" } },
          { id: "pod-2", name: "Passenger Investigation Office", kpiCount: 2, achievement: 93, status: "green", owner: { name: "Saeed Omar", role: "Section Head" } },
          { id: "pod-3", name: "Passenger Operations Terminal 1", kpiCount: 2, achievement: 94, status: "green", owner: { name: "Hessa Ali", role: "Section Head" } },
          { id: "pod-4", name: "Passenger Operations Terminal 2", kpiCount: 2, achievement: 94, status: "green", owner: { name: "Sultan Ahmed", role: "Section Head" } },
          { id: "pod-5", name: "Passenger Operations Terminal 3", kpiCount: 1, achievement: 94, status: "green", owner: { name: "Moza Khalid", role: "Section Head" } }
        ]
      },
      {
        id: "scc",
        name: "Sea Customs Centers Management",
        code: "SCC",
        kpiCount: 5,
        achievement: 90,
        status: "green",
        owner: {
          name: "Khalifa Al Nuaimi",
          role: "Sea Centers Director",
        },
        sections: [
          { id: "scc-1", name: "Dubai Logistics City Inspection Center", kpiCount: 2, achievement: 91, status: "green", owner: { name: "Reem Saeed", role: "Section Head" } },
          { id: "scc-2", name: "Jabel Ali Port & Tecom Inspection Center", kpiCount: 3, achievement: 89, status: "green", owner: { name: "Jamal Ibrahim", role: "Section Head" } }
        ]
      },
      {
        id: "tsd",
        name: "Technical Support",
        code: "TSD",
        kpiCount: 5,
        achievement: 91,
        status: "green",
        owner: {
          name: "Hamdan Al Kaabi",
          role: "Technical Support Director",
        },
        sections: [
          { id: "tsd-1", name: "Special Task", kpiCount: 3, achievement: 92, status: "green", owner: { name: "Latifa Ahmed", role: "Section Head" } },
          { id: "tsd-2", name: "Special Units", kpiCount: 2, achievement: 90, status: "green", owner: { name: "Obaid Rashid", role: "Section Head" } }
        ]
      }
    ]
  },
  {
    id: "dgd",
    name: "Director General Division",
    code: "DGD",
    color: "#115E67",
    totalKPIs: 18,
    achievedPercentage: 89,
    underperformingCount: 2,
    departments: [
      {
        id: "exd",
        name: "External Relations",
        code: "EXD",
        kpiCount: 4,
        achievement: 87,
        status: "green",
        owner: {
          name: "Aisha Al Falasi",
          role: "External Relations Director",
        },
        sections: [
          { id: "exd-1", name: "External Relations", kpiCount: 4, achievement: 87, status: "green", owner: { name: "Hamed Ali", role: "Section Head" } }
        ]
      },
      {
        id: "icd",
        name: "Internal Control",
        code: "ICD",
        kpiCount: 5,
        achievement: 91,
        status: "green",
        owner: {
          name: "Ibrahim Al Shamsi",
          role: "Internal Control Director",
        },
        sections: [
          { id: "icd-1", name: "Internal Control", kpiCount: 5, achievement: 91, status: "green", owner: { name: "Amal Hassan", role: "Section Head" } }
        ]
      },
      {
        id: "scd",
        name: "Statistics",
        code: "SCD",
        kpiCount: 4,
        achievement: 88,
        status: "green",
        owner: {
          name: "Maryam Al Dhaheri",
          role: "Statistics Director",
        },
        sections: [
          { id: "scd-1", name: "Statistics", kpiCount: 4, achievement: 88, status: "green", owner: { name: "Waleed Omar", role: "Section Head" } }
        ]
      },
      {
        id: "sed",
        name: "Strategy & Excellence",
        code: "SED",
        kpiCount: 5,
        achievement: 90,
        status: "green",
        owner: {
          name: "Essa Al Marzouqi",
          role: "Strategy Director",
        },
        sections: [
          { id: "sed-1", name: "Corporate Excellence + Risk Management", kpiCount: 1, achievement: 92, status: "green", owner: { name: "Salama Saeed", role: "Section Head" } },
          { id: "sed-2", name: "Corporate Performance Management", kpiCount: 1, achievement: 89, status: "green", owner: { name: "Mansoor Ali", role: "Section Head" } },
          { id: "sed-3", name: "Innovation Center + Future Foresight", kpiCount: 1, achievement: 91, status: "green", owner: { name: "Dana Ahmed", role: "Section Head" } },
          { id: "sed-4", name: "Quality Assurance & Corporate Governance", kpiCount: 1, achievement: 88, status: "green", owner: { name: "Tariq Hassan", role: "Section Head" } },
          { id: "sed-5", name: "Strategy + Change Management", kpiCount: 1, achievement: 90, status: "green", owner: { name: "Maitha Rashid", role: "Section Head" } }
        ]
      }
    ]
  },
  {
    id: "faa",
    name: "Finance & Administration Affairs",
    code: "FAA",
    color: "#008755",
    totalKPIs: 26,
    achievedPercentage: 68,
    underperformingCount: 5,
    departments: [
      {
        id: "aad",
        name: "Administration Affairs",
        code: "AAD",
        kpiCount: 8,
        achievement: 65,
        status: "amber",
        owner: {
          name: "Hamad Al Mazrouei",
          role: "Administration Director",
        },
        sections: [
          { id: "aad-1", name: "Contracts & Procurements", kpiCount: 2, achievement: 68, status: "amber", owner: { name: "Shamsa Ali", role: "Section Head" } },
          { id: "aad-2", name: "Environmental Health & Safety", kpiCount: 2, achievement: 63, status: "amber", owner: { name: "Zayed Omar", role: "Section Head" } },
          { id: "aad-3", name: "Facility Management & Construction Projects", kpiCount: 2, achievement: 64, status: "amber", owner: { name: "Basma Hassan", role: "Section Head" } },
          { id: "aad-4", name: "Property & General Administration", kpiCount: 2, achievement: 66, status: "amber", owner: { name: "Rashed Saeed", role: "Section Head" } }
        ]
      },
      {
        id: "ccd",
        name: "Corporate Communication",
        code: "CCD",
        kpiCount: 6,
        achievement: 72,
        status: "amber",
        owner: {
          name: "Khaled Al Ahbabi",
          role: "Communication Director",
        },
        sections: [
          { id: "ccd-1", name: "Corporate Social Responsibility", kpiCount: 2, achievement: 74, status: "amber", owner: { name: "Mahra Ahmed", role: "Section Head" } },
          { id: "ccd-2", name: "Creative Services & Events", kpiCount: 2, achievement: 71, status: "amber", owner: { name: "Saif Ali", role: "Section Head" } },
          { id: "ccd-3", name: "Government Partnership", kpiCount: 1, achievement: 72, status: "amber", owner: { name: "Meera Hassan", role: "Section Head" } },
          { id: "ccd-4", name: "Public & Media Relations", kpiCount: 1, achievement: 71, status: "amber", owner: { name: "Faisal Omar", role: "Section Head" } }
        ]
      },
      {
        id: "crm",
        name: "Customs Refund Management",
        code: "CRM",
        kpiCount: 4,
        achievement: 67,
        status: "amber",
        owner: {
          name: "Abdulla Al Ghurair",
          role: "Refund Director",
        },
        sections: [
          { id: "crm-1", name: "Makasa", kpiCount: 2, achievement: 66, status: "amber", owner: { name: "Mariam Saeed", role: "Section Head" } },
          { id: "crm-2", name: "Refund", kpiCount: 2, achievement: 68, status: "amber", owner: { name: "Ahmed Ali", role: "Section Head" } }
        ]
      },
      {
        id: "fnd",
        name: "Finance",
        code: "FND",
        kpiCount: 8,
        achievement: 70,
        status: "amber",
        owner: {
          name: "Moza Al Marri",
          role: "Finance Director",
        },
        sections: [
          { id: "fnd-1", name: "Accounts Payable", kpiCount: 2, achievement: 71, status: "amber", owner: { name: "Layla Hassan", role: "Section Head" } },
          { id: "fnd-2", name: "General Accounting", kpiCount: 2, achievement: 69, status: "amber", owner: { name: "Suhail Ahmed", role: "Section Head" } },
          { id: "fnd-3", name: "Management Accounting", kpiCount: 2, achievement: 70, status: "amber", owner: { name: "Asma Khalid", role: "Section Head" } },
          { id: "fnd-4", name: "Revenue & Collections", kpiCount: 2, achievement: 70, status: "amber", owner: { name: "Majid Rashid", role: "Section Head" } }
        ]
      }
    ]
  },
  {
    id: "hrd",
    name: "Human Resources Division",
    code: "HRD",
    color: "#005844",
    totalKPIs: 38,
    achievedPercentage: 62,
    underperformingCount: 6,
    departments: [
      {
        id: "chm",
        name: "Client Happiness Management",
        code: "CHM",
        kpiCount: 8,
        achievement: 58,
        status: "amber",
        owner: {
          name: "Hessa Al Suwaidi",
          role: "Client Happiness Director",
        },
        sections: [
          { id: "chm-1", name: "Airport FZ & Silicon Customer Service Center", kpiCount: 2, achievement: 60, status: "amber", owner: { name: "Nora Ali", role: "Section Head" } },
          { id: "chm-2", name: "Call Center", kpiCount: 1, achievement: 61, status: "amber", owner: { name: "Khalfan Omar", role: "Section Head" } },
          { id: "chm-3", name: "Client Partnership", kpiCount: 2, achievement: 57, status: "amber", owner: { name: "Sheikha Hassan", role: "Section Head" } },
          { id: "chm-4", name: "Client Services Development", kpiCount: 1, achievement: 58, status: "amber", owner: { name: "Talal Saeed", role: "Section Head" } },
          { id: "chm-5", name: "Customer Service Management", kpiCount: 1, achievement: 57, status: "amber", owner: { name: "Roudha Ahmed", role: "Section Head" } },
          { id: "chm-6", name: "E-commerce", kpiCount: 1, achievement: 59, status: "amber", owner: { name: "Majed Ali", role: "Section Head" } }
        ]
      },
      {
        id: "dla",
        name: "Dubai Logistics Academy",
        code: "DLA",
        kpiCount: 5,
        achievement: 64,
        status: "amber",
        owner: {
          name: "Juma Al Falasi",
          role: "Academy Director",
        },
        sections: [
          { id: "dla-1", name: "Training Design & Development", kpiCount: 3, achievement: 65, status: "amber", owner: { name: "Badria Hassan", role: "Section Head" } },
          { id: "dla-2", name: "Training Programs Management", kpiCount: 2, achievement: 63, status: "amber", owner: { name: "Nasser Omar", role: "Section Head" } }
        ]
      },
      {
        id: "hcd",
        name: "Hatta Centre",
        code: "HCD",
        kpiCount: 3,
        achievement: 82,
        status: "green",
        owner: {
          name: "Saeed Al Ketbi",
          role: "Hatta Director",
        },
        sections: [
          { id: "hcd-1", name: "Hatta Centre", kpiCount: 3, achievement: 82, status: "green", owner: { name: "Muna Ali", role: "Section Head" } }
        ]
      },
      {
        id: "hrd-dept",
        name: "Human Resources",
        code: "HRD",
        kpiCount: 6,
        achievement: 85,
        status: "green",
        owner: {
          name: "Shamma Al Mazrouei",
          role: "HR Director",
        },
        sections: [
          { id: "hrd-1", name: "Employee Relations", kpiCount: 2, achievement: 84, status: "green", owner: { name: "Amna Hassan", role: "Section Head" } },
          { id: "hrd-2", name: "Organizational Development", kpiCount: 2, achievement: 86, status: "green", owner: { name: "Hamad Saeed", role: "Section Head" } },
          { id: "hrd-3", name: "Talent Acquisition", kpiCount: 2, achievement: 85, status: "green", owner: { name: "Saleh Ahmed", role: "Section Head" } }
        ]
      },
      {
        id: "ind",
        name: "Intelligence",
        code: "IND",
        kpiCount: 7,
        achievement: 88,
        status: "green",
        owner: {
          name: "Rashid Al Muhairi",
          role: "Intelligence Director",
        },
        sections: [
          { id: "ind-1", name: "Analysis", kpiCount: 2, achievement: 89, status: "green", owner: { name: "Wadha Ali", role: "Section Head" } },
          { id: "ind-2", name: "Control Room", kpiCount: 1, achievement: 90, status: "green", owner: { name: "Thani Omar", role: "Section Head" } },
          { id: "ind-3", name: "Intelligence Operations", kpiCount: 2, achievement: 87, status: "green", owner: { name: "Amal Hassan", role: "Section Head" } },
          { id: "ind-4", name: "Profile Management", kpiCount: 1, achievement: 88, status: "green", owner: { name: "Saif Saeed", role: "Section Head" } },
          { id: "ind-5", name: "Technical Services & Development", kpiCount: 1, achievement: 87, status: "green", owner: { name: "Lulwa Ahmed", role: "Section Head" } }
        ]
      },
      {
        id: "lad",
        name: "Legal Affairs",
        code: "LAD",
        kpiCount: 4,
        achievement: 84,
        status: "green",
        owner: {
          name: "Noura Al Dhaheri",
          role: "Legal Director",
        },
        sections: [
          { id: "lad-1", name: "Agreements & Contracts", kpiCount: 2, achievement: 85, status: "green", owner: { name: "Mariam Ali", role: "Section Head" } },
          { id: "lad-2", name: "Consultancy & Legal Services", kpiCount: 2, achievement: 83, status: "green", owner: { name: "Salem Omar", role: "Section Head" } }
        ]
      },
      {
        id: "tod",
        name: "Tariff & Origin",
        code: "TOD",
        kpiCount: 6,
        achievement: 83,
        status: "green",
        owner: {
          name: "Ali Al Shamsi",
          role: "Tariff Director",
        },
        sections: [
          { id: "tod-1", name: "Customs Policies", kpiCount: 1, achievement: 84, status: "green", owner: { name: "Fatma Hassan", role: "Section Head" } },
          { id: "tod-2", name: "Customs Procedures", kpiCount: 2, achievement: 82, status: "green", owner: { name: "Rashid Saeed", role: "Section Head" } },
          { id: "tod-3", name: "Customs Tariff", kpiCount: 1, achievement: 83, status: "green", owner: { name: "Moza Ahmed", role: "Section Head" } },
          { id: "tod-4", name: "Rules of Origin & Economic Agreements", kpiCount: 1, achievement: 84, status: "green", owner: { name: "Khalifa Ali", role: "Section Head" } },
          { id: "tod-5", name: "Suspended Duty Cases", kpiCount: 1, achievement: 82, status: "green", owner: { name: "Aisha Omar", role: "Section Head" } }
        ]
      },
      {
        id: "vad",
        name: "Valuation",
        code: "VAD",
        kpiCount: 5,
        achievement: 85,
        status: "green",
        owner: {
          name: "Mohammed Al Kaabi",
          role: "Valuation Director",
        },
        sections: [
          { id: "vad-1", name: "Authorised Economic Operator", kpiCount: 2, achievement: 86, status: "green", owner: { name: "Sara Hassan", role: "Section Head" } },
          { id: "vad-2", name: "Customs Valuation Database & Services", kpiCount: 2, achievement: 84, status: "green", owner: { name: "Obaid Saeed", role: "Section Head" } },
          { id: "vad-3", name: "Valuation Assessment", kpiCount: 1, achievement: 85, status: "green", owner: { name: "Latifa Ahmed", role: "Section Head" } }
        ]
      }
    ]
  },
  {
    id: "pld",
    name: "Policy & Legislation",
    code: "PLD",
    color: "#FFBE9F",
    totalKPIs: 22,
    achievedPercentage: 45,
    underperformingCount: 8,
    departments: [
      {
        id: "cad",
        name: "Customs Audit",
        code: "CAD",
        kpiCount: 5,
        achievement: 42,
        status: "red",
        owner: {
          name: "Sultan Al Mansoori",
          role: "Audit Director",
        },
        sections: [
          { id: "cad-1", name: "Company Audit", kpiCount: 2, achievement: 45, status: "red", owner: { name: "Juma Ali", role: "Section Head" } },
          { id: "cad-2", name: "Declaration Audit", kpiCount: 2, achievement: 40, status: "red", owner: { name: "Hana Omar", role: "Section Head" } },
          { id: "cad-3", name: "Planning & Follow-Up", kpiCount: 1, achievement: 41, status: "red", owner: { name: "Youssef Hassan", role: "Section Head" } }
        ]
      },
      {
        id: "cci",
        name: "Customs Cases & Investigations",
        code: "CCI",
        kpiCount: 8,
        achievement: 46,
        status: "red",
        owner: {
          name: "Majid Al Falahi",
          role: "Investigations Director",
        },
        sections: [
          { id: "cci-1", name: "Airport Zone Investigation", kpiCount: 2, achievement: 48, status: "red", owner: { name: "Salama Saeed", role: "Section Head" } },
          { id: "cci-2", name: "Customs Cases", kpiCount: 2, achievement: 44, status: "red", owner: { name: "Rashid Ahmed", role: "Section Head" } },
          { id: "cci-3", name: "Enforcement & Follow-Up", kpiCount: 2, achievement: 46, status: "red", owner: { name: "Mouza Ali", role: "Section Head" } },
          { id: "cci-4", name: "Inland Zone Investigation", kpiCount: 1, achievement: 47, status: "red", owner: { name: "Hamdan Omar", role: "Section Head" } },
          { id: "cci-5", name: "Jabel Ali & Sea Zone Investigation", kpiCount: 1, achievement: 45, status: "red", owner: { name: "Shamma Hassan", role: "Section Head" } }
        ]
      },
      {
        id: "cdm",
        name: "Customs Declarations Management",
        code: "CDM",
        kpiCount: 5,
        achievement: 48,
        status: "red",
        owner: {
          name: "Amina Al Suwaidi",
          role: "Declarations Director",
        },
        sections: [
          { id: "cdm-1", name: "Declarations Services", kpiCount: 3, achievement: 49, status: "red", owner: { name: "Maitha Saeed", role: "Section Head" } },
          { id: "cdm-2", name: "New Declarations", kpiCount: 2, achievement: 46, status: "red", owner: { name: "Saeed Ahmed", role: "Section Head" } }
        ]
      },
      {
        id: "ipr",
        name: "Intellectual Property Rights",
        code: "IPR",
        kpiCount: 4,
        achievement: 44,
        status: "red",
        owner: {
          name: "Layla Al Marri",
          role: "IP Director",
        },
        sections: [
          { id: "ipr-1", name: "Awareness & Education", kpiCount: 1, achievement: 46, status: "red", owner: { name: "Dana Ali", role: "Section Head" } },
          { id: "ipr-2", name: "Intellectual Property & Trade Agency Accreditation", kpiCount: 2, achievement: 43, status: "red", owner: { name: "Tariq Omar", role: "Section Head" } },
          { id: "ipr-3", name: "Intellectual Property Disputes Settlement", kpiCount: 1, achievement: 44, status: "red", owner: { name: "Reem Hassan", role: "Section Head" } }
        ]
      }
    ]
  }
];

export function OrganizationChart({ onBack }: OrganizationChartProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDivision, setSelectedDivision] = useState<string>("all");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [selectedSection, setSelectedSection] = useState<string>("all");
  const [zoom, setZoom] = useState(1);
  const [expandedDivisions, setExpandedDivisions] = useState<Set<string>>(new Set(["cdd"]));
  const [expandedDepartments, setExpandedDepartments] = useState<Set<string>>(new Set());
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [selectedNode, setSelectedNode] = useState<{
    type: 'division' | 'department' | 'section';
    data: Division | Department | Section;
    divisionColor?: string;
  } | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>(["Customs Development Division"]);
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredProgressBar, setHoveredProgressBar] = useState<string | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  const toggleDivision = (divisionId: string) => {
    const newExpanded = new Set(expandedDivisions);
    if (newExpanded.has(divisionId)) {
      newExpanded.delete(divisionId);
      // Also collapse all departments under this division
      const division = organizationData.find(d => d.id === divisionId);
      if (division) {
        division.departments.forEach(dept => {
          expandedDepartments.delete(dept.id);
        });
      }
    } else {
      newExpanded.add(divisionId);
    }
    setExpandedDivisions(newExpanded);
  };

  const toggleDepartment = (departmentId: string) => {
    const newExpanded = new Set(expandedDepartments);
    if (newExpanded.has(departmentId)) {
      newExpanded.delete(departmentId);
      // Also collapse all sections under this department
      const allSections = organizationData.flatMap(div => 
        div.departments.flatMap(dept => dept.sections)
      );
      const department = organizationData.flatMap(div => div.departments).find(d => d.id === departmentId);
      if (department) {
        department.sections.forEach(section => {
          expandedSections.delete(section.id);
        });
      }
    } else {
      newExpanded.add(departmentId);
    }
    setExpandedDepartments(newExpanded);
  };

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.5));
  };

  const handleResetZoom = () => {
    setZoom(1);
  };

  const handleNodeClick = (type: 'division' | 'department' | 'section', data: any, divisionColor?: string) => {
    setSelectedNode({ type, data, divisionColor });
  };

  // Get available departments based on selected division
  const availableDepartments = selectedDivision === "all" 
    ? organizationData.flatMap(div => div.departments)
    : organizationData.find(div => div.id === selectedDivision)?.departments || [];

  // Get available sections based on selected department
  const availableSections = selectedDepartment === "all"
    ? availableDepartments.flatMap(dept => dept.sections)
    : availableDepartments.find(dept => dept.id === selectedDepartment)?.sections || [];

  const filteredData = organizationData.filter(division => {
    if (selectedDivision !== "all" && division.id !== selectedDivision) {
      return false;
    }

    // Filter by department
    if (selectedDepartment !== "all") {
      const hasDepartment = division.departments.some(dept => dept.id === selectedDepartment);
      if (!hasDepartment) return false;
    }

    // Filter by section
    if (selectedSection !== "all") {
      const hasSection = division.departments.some(dept => 
        dept.sections.some(section => section.id === selectedSection)
      );
      if (!hasSection) return false;
    }

    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    const matchesDivision = division.name.toLowerCase().includes(query) || division.code.toLowerCase().includes(query);
    const matchesDepartment = division.departments.some(dept => 
      dept.name.toLowerCase().includes(query) || dept.code.toLowerCase().includes(query)
    );
    const matchesSection = division.departments.some(dept =>
      dept.sections.some(section => section.name.toLowerCase().includes(query))
    );

    return matchesDivision || matchesDepartment || matchesSection;
  }).map(division => ({
    ...division,
    departments: division.departments.filter(dept => {
      // Filter departments based on selected department
      if (selectedDepartment !== "all" && dept.id !== selectedDepartment) {
        return false;
      }
      
      // Filter departments based on selected section
      if (selectedSection !== "all") {
        return dept.sections.some(section => section.id === selectedSection);
      }
      
      return true;
    }).map(dept => ({
      ...dept,
      sections: dept.sections.filter(section => {
        // Filter sections based on selected section
        if (selectedSection !== "all" && section.id !== selectedSection) {
          return false;
        }
        return true;
      })
    }))
  }));

  const totalDepartments = organizationData.reduce((sum, div) => sum + div.departments.length, 0);
  const totalSections = organizationData.reduce((sum, div) => 
    sum + div.departments.reduce((deptSum, dept) => deptSum + dept.sections.length, 0), 0
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "green": return "#357743";
      case "amber": return "#F2A200";
      case "red": return "#D83731";
      default: return "#6B7280";
    }
  };

  const getStatusFromAchievement = (achievement: number): string => {
    if (achievement >= 75) return "green";
    if (achievement >= 50) return "amber";
    return "red";
  };

  return (
    <div className="h-full overflow-auto">
      <div className="flex flex-col h-full p-3 gap-3">
        {/* Hero Banner Section */}
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
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h1 className="text-xl font-['Dubai:Medium',_sans-serif] mb-0.5">
                      Organization Structure
                    </h1>
                    <p className="text-white/90 text-sm">
                      A breakdown of roles and units that shape overall organizational performance
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white bg-transparent text-white hover:bg-white/10 hover:text-white"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-white bg-transparent text-white hover:bg-white/10 hover:text-white"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export Chart
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[var(--radix-dropdown-menu-trigger-width)]">
                    <DropdownMenuItem onClick={() => console.log('Export as PDF')}>
                      <FileText className="h-4 w-4 mr-2" />
                      PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log('Export as PPT')}>
                      <FileText className="h-4 w-4 mr-2" />
                      PPT
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log('Export as JPEG')}>
                      <FileText className="h-4 w-4 mr-2" />
                      JPEG
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter Controls */}
        {showFilters && (
          <Card>
            <CardContent className="py-2">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search divisions, departments, or sections..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-8"
                  />
                </div>
                
                <Select 
                  value={selectedDivision} 
                  onValueChange={(value) => {
                    setSelectedDivision(value);
                    setSelectedDepartment("all");
                    setSelectedSection("all");
                  }}
                >
                  <SelectTrigger className="w-full md:w-[200px] h-8">
                    <SelectValue placeholder="Filter by Division" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Divisions</SelectItem>
                    {organizationData.map(division => (
                      <SelectItem key={division.id} value={division.id}>
                        {division.code} - {division.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select 
                  value={selectedDepartment} 
                  onValueChange={(value) => {
                    setSelectedDepartment(value);
                    setSelectedSection("all");
                  }}
                  disabled={selectedDivision === "all"}
                >
                  <SelectTrigger className="w-full md:w-[200px] h-8">
                    <SelectValue placeholder="Filter by Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {availableDepartments.map(department => (
                      <SelectItem key={department.id} value={department.id}>
                        {department.code} - {department.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select 
                  value={selectedSection} 
                  onValueChange={setSelectedSection}
                  disabled={selectedDepartment === "all"}
                >
                  <SelectTrigger className="w-full md:w-[200px] h-8">
                    <SelectValue placeholder="Filter by Section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sections</SelectItem>
                    {availableSections.map(section => (
                      <SelectItem key={section.id} value={section.id}>
                        {section.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Organization Chart */}
        <Card className="overflow-hidden flex-1 flex flex-col">
          <CardContent className="p-4 flex-1 flex flex-col max-h-[calc(100vh-280px)]">
            <div 
              ref={chartRef}
              className="overflow-auto flex-1"
            >
              <div 
                style={{ 
                  transform: `scale(${zoom})`,
                  transformOrigin: "top center",
                  transition: "transform 0.2s ease",
                  minWidth: "1200px"
                }}
              >
                {/* Top Level - Dubai Customs */}
                <div className="flex flex-col items-center mb-3">
                  <div className="bg-gradient-to-br from-[#005844] to-[#008755] text-white rounded-xl px-8 py-4 shadow-lg text-center min-w-[320px]">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Building2 className="h-5 w-5" />
                      <h2 className="text-lg font-['Dubai:Medium',_sans-serif]">Dubai Customs</h2>
                    </div>
                    <p className="text-xs text-white/80">Organizational Structure</p>
                    <div className="mt-2 flex items-center justify-center gap-2">
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
                        {organizationData.length} Divisions
                      </Badge>
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
                        {totalDepartments} Departments
                      </Badge>
                    </div>
                    <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <div className="h-7 w-7 rounded-md bg-white/20 flex items-center justify-center">
                          <BarChart className="h-3.5 w-3.5 text-white/90" />
                        </div>
                        <div className="text-left">
                          <p className="text-[10px] text-white/70">Performance Index</p>
                          <p className="text-sm font-['Dubai:Medium',_sans-serif]">89%</p>
                        </div>
                      </div>
                      <div className="h-8 w-px bg-white/20" />
                      <div className="flex items-center gap-1.5">
                        <div className="h-7 w-7 rounded-md bg-white/20 flex items-center justify-center">
                          <BarChart className="h-3.5 w-3.5 text-white/90" />
                        </div>
                        <div className="text-left">
                          <p className="text-[10px] text-white/70">Achievement</p>
                          <p className="text-sm font-['Dubai:Medium',_sans-serif]">92%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Connector */}
                  <svg height="15" width="2" className="mx-auto">
                    <line x1="1" y1="0" x2="1" y2="15" stroke="#D1D5DB" strokeWidth="2" />
                  </svg>
                </div>

                {/* Divisions Level - Horizontal Layout */}
                <div>
                  {/* Horizontal Division Cards */}
                  <div className="flex gap-2 justify-center flex-wrap px-1 mb-2">
                    {filteredData.map((division) => (
                      <div key={division.id} className="relative">
                        <HoverCard openDelay={200} open={hoveredProgressBar === division.id ? false : undefined}>
                          <HoverCardTrigger asChild>
                          <div 
                            className="relative bg-white border-2 rounded-lg shadow-lg cursor-pointer hover:shadow-2xl transition-all w-[220px] group"
                            style={{ 
                              borderColor: division.color,
                              backgroundColor: 'white'
                            }}
                            onClick={() => {
                              // Toggle division - if already expanded, collapse it; otherwise expand it and close others
                              if (expandedDivisions.has(division.id)) {
                                setExpandedDivisions(new Set());
                                setBreadcrumbs([]);
                              } else {
                                setExpandedDivisions(new Set([division.id]));
                                setBreadcrumbs([division.name]);
                              }
                              setExpandedDepartments(new Set());
                              setExpandedSections(new Set());
                            }}
                          >
                            <div 
                              className="h-1.5 rounded-t-md"
                              style={{ backgroundColor: division.color }}
                            />
                            <div className="p-3">
                              <div className="flex items-start justify-between mb-1.5">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1.5 mb-0.5">
                                    <h3 className="text-xs text-gray-900 font-['Dubai:Medium',_sans-serif] line-clamp-2 leading-tight">
                                      {division.name.replace(' Division', '')}
                                    </h3>
                                    {expandedDivisions.has(division.id) && division.name !== "Customs Development" && (
                                      <ChevronDown className="h-3 w-3 text-gray-400 flex-shrink-0" />
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2 text-[11px] text-gray-600 mt-1">
                                    <div className="flex items-center gap-1">
                                      <Target className="h-2.5 w-2.5 flex-shrink-0" />
                                      <span>{division.totalKPIs} KPIs</span>
                                    </div>
                                    <span className="text-gray-400">•</span>
                                    <div className="flex items-center gap-1">
                                      <Users className="h-2.5 w-2.5 flex-shrink-0" />
                                      <span>{division.departments.length} Departments</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="pt-1.5 border-t border-gray-200">
                                <div className="flex items-center justify-between text-[10px] mb-1">
                                  <span className="text-gray-600">Achievement</span>
                                  <span className="font-['Dubai:Medium',_sans-serif]" style={{ color: getStatusColor(getStatusFromAchievement(division.achievedPercentage)) }}>
                                    {division.achievedPercentage}%
                                  </span>
                                </div>
                                <HoverCard openDelay={200}>
                                  <HoverCardTrigger asChild>
                                    <div 
                                      className="cursor-help" 
                                      onMouseEnter={() => setHoveredProgressBar(division.id)}
                                      onMouseLeave={() => setHoveredProgressBar(null)}
                                    >
                                      <Progress 
                                        value={division.achievedPercentage} 
                                        className="h-1"
                                        indicatorColor={getStatusColor(getStatusFromAchievement(division.achievedPercentage))}
                                      />
                                    </div>
                                  </HoverCardTrigger>
                                  <HoverCardContent className="w-56" side="top">
                                    <div className="space-y-2">
                                      <p className="text-xs font-['Dubai:Medium',_sans-serif] text-gray-900 mb-2">Performance Ranges</p>
                                      <div className="space-y-1.5">
                                        <div className="flex items-center gap-2">
                                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#D83731' }}></div>
                                          <span className="text-xs text-gray-600">Red: 0-49%</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#F2A200' }}></div>
                                          <span className="text-xs text-gray-600">Orange: 50-74%</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#357743' }}></div>
                                          <span className="text-xs text-gray-600">Green: 75-100%</span>
                                        </div>
                                      </div>
                                    </div>
                                  </HoverCardContent>
                                </HoverCard>
                              </div>
                            </div>
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80" side="bottom">
                          <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-2 text-center">
                              <div className="bg-gray-50 rounded p-2">
                                <p className="text-xs text-gray-600">Total KPIs</p>
                                <p className="text-lg font-['Dubai:Medium',_sans-serif]" style={{ color: division.color }}>
                                  {division.totalKPIs}
                                </p>
                              </div>
                              <div className="bg-gray-50 rounded p-2">
                                <p className="text-xs text-gray-600">Achieved</p>
                                <p className="text-lg font-['Dubai:Medium',_sans-serif]" style={{ color: getStatusColor(getStatusFromAchievement(division.achievedPercentage)) }}>
                                  {division.achievedPercentage}%
                                </p>
                              </div>
                              <div className="bg-gray-50 rounded p-2">
                                <p className="text-xs text-gray-600">At Risk</p>
                                <p className="text-lg font-['Dubai:Medium',_sans-serif] text-red-600">
                                  {division.underperformingCount}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2 pt-2">
                              <Button size="sm" variant="outline" className="flex-1 text-xs">
                                <FileText className="h-3 w-3 mr-1" />
                                Scorecard
                              </Button>
                              <Button size="sm" variant="outline" className="flex-1 text-xs">
                                <Target className="h-3 w-3 mr-1" />
                                KPIs
                              </Button>
                            </div>
                          </div>
                        </HoverCardContent>
                        </HoverCard>
                      </div>
                    ))}
                  </div>

                  {/* Departments Section - Shows below all divisions */}
                  {filteredData.map((division) => 
                    expandedDivisions.has(division.id) && (
                      <div key={`dept-${division.id}`} className="w-full animate-in fade-in slide-in-from-top-2 duration-300">
                        {/* Connector Line from Division to Departments */}
                        <div className="relative px-8 mb-0">
                          {/* Single SVG for all connectors */}
                          <svg 
                            className="w-full mx-auto block" 
                            height="40" 
                            style={{ overflow: 'visible' }}
                          >
                            {(() => {
                              // Calculate the position of the selected division
                              const divisionIndex = filteredData.findIndex(d => d.id === division.id);
                              const totalDivisions = filteredData.length;
                              
                              // Division card width is 185px + 8px gap (from gap-2)
                              const cardWidth = 185;
                              const gap = 8;
                              const totalWidth = cardWidth + gap;
                              
                              // Calculate how many cards fit per row (approximate based on container width)
                              // Assuming container is roughly full width, we can estimate based on viewport
                              // For simplicity, let's calculate the actual position
                              let divisionXPosition;
                              
                              if (totalDivisions === 1) {
                                divisionXPosition = '50%';
                              } else {
                                // Calculate position based on index
                                // This assumes divisions are centered and wrapped
                                const cardsPerRow = Math.floor((typeof window !== 'undefined' ? window.innerWidth - 100 : 1200) / totalWidth);
                                const row = Math.floor(divisionIndex / cardsPerRow);
                                const col = divisionIndex % cardsPerRow;
                                const cardsInThisRow = Math.min(cardsPerRow, totalDivisions - (row * cardsPerRow));
                                
                                // Calculate horizontal position for this card
                                if (cardsInThisRow === 1) {
                                  divisionXPosition = '50%';
                                } else {
                                  // Distribute evenly across the width
                                  const spacing = 80 / (cardsInThisRow - 1);
                                  divisionXPosition = `${10 + (spacing * col)}%`;
                                }
                              }
                              
                              return (
                                <>
                                  {/* Vertical line down from selected division position */}
                                  <line 
                                    x1={divisionXPosition} 
                                    y1="0" 
                                    x2={divisionXPosition} 
                                    y2="20" 
                                    stroke={division.color} 
                                    strokeWidth="2" 
                                  />
                                  
                                  {/* Horizontal line across */}
                                  {(() => {
                                    // Check if this is Customs Development
                                    const isCustomsDevelopment = division.name.toLowerCase().includes('customs development') ||
                                                                division.code === 'CDD';
                                    
                                    if (isCustomsDevelopment) {
                                      // For Customs Development, calculate horizontal line to span all cards in last row
                                      const totalDepts = division.departments.length;
                                      const getGridColumns = () => {
                                        if (typeof window === 'undefined') return 4;
                                        const width = window.innerWidth;
                                        if (width >= 1280) return Math.min(4, totalDepts);
                                        if (width >= 1024) return Math.min(3, totalDepts);
                                        if (width >= 768) return Math.min(2, totalDepts);
                                        return 1;
                                      };
                                      const gridCols = getGridColumns();
                                      const totalRows = Math.ceil(totalDepts / gridCols);
                                      const itemsInLastRow = totalDepts - ((totalRows - 1) * gridCols);
                                      
                                      const calculateXPos = (colIndex, itemsInRow) => {
                                        if (itemsInRow === 1) return 50;
                                        const spacing = 80 / (itemsInRow - 1);
                                        return 10 + (spacing * colIndex);
                                      };
                                      
                                      const x1 = calculateXPos(0, itemsInLastRow);
                                      const x2 = calculateXPos(itemsInLastRow - 1, itemsInLastRow);
                                      
                                      return (
                                        <line 
                                          x1={`${x1}%`}
                                          y1="20" 
                                          x2={`${x2}%`}
                                          y2="20" 
                                          stroke={division.color} 
                                          strokeWidth="2" 
                                        />
                                      );
                                    }
                                    
                                    // Default horizontal line for all other divisions
                                    return (
                                      <line 
                                        x1="10%" 
                                        y1="20" 
                                        x2="90%" 
                                        y2="20" 
                                        stroke={division.color} 
                                        strokeWidth="2" 
                                      />
                                    );
                                  })()}
                                  
                                  {/* Vertical lines down to each department position */}
                                  {division.departments.map((dept, idx) => {
                                    const totalDepts = division.departments.length;
                                    
                                    // Determine grid layout based on number of departments
                                    // xl:grid-cols-4, lg:grid-cols-3, md:grid-cols-2, default: grid-cols-1
                                    const getGridColumns = () => {
                                      if (typeof window === 'undefined') return 4;
                                      const width = window.innerWidth;
                                      if (width >= 1280) return Math.min(4, totalDepts); // xl
                                      if (width >= 1024) return Math.min(3, totalDepts); // lg
                                      if (width >= 768) return Math.min(2, totalDepts);  // md
                                      return 1;
                                    };
                                    
                                    const gridCols = getGridColumns();
                                    const row = Math.floor(idx / gridCols);
                                    const col = idx % gridCols;
                                    const totalRows = Math.ceil(totalDepts / gridCols);
                                    const itemsInCurrentRow = Math.min(gridCols, totalDepts - (row * gridCols));
                                    
                                    // Identify division type
                                    const isCustomsDevelopment = division.name.toLowerCase().includes('customs development') ||
                                                                division.code === 'CDD';
                                    
                                    // Calculate x position based on grid column
                                    const calculateXPosition = (colIndex, itemsInRow) => {
                                      if (itemsInRow === 1) {
                                        return '50%';
                                      }
                                      // Calculate percentage position for this column
                                      const spacing = 80 / (itemsInRow - 1);
                                      return `${10 + (spacing * colIndex)}%`;
                                    };
                                    
                                    // CUSTOMS DEVELOPMENT: All cards in LAST ROW
                                    if (isCustomsDevelopment) {
                                      const isLastRow = row === totalRows - 1;
                                      
                                      if (isLastRow) {
                                        const xPosition = calculateXPosition(col, itemsInCurrentRow);
                                        return (
                                          <line 
                                            key={`line-${dept.id}`}
                                            x1={xPosition}
                                            y1="20" 
                                            x2={xPosition}
                                            y2="40" 
                                            stroke={division.color} 
                                            strokeWidth="2" 
                                          />
                                        );
                                      }
                                      return null;
                                    }
                                    
                                    // ALL OTHER DIVISIONS (including Human Resources): First row only
                                    if (row === 0) {
                                      const xPosition = calculateXPosition(col, itemsInCurrentRow);
                                      return (
                                        <line 
                                          key={`line-${dept.id}`}
                                          x1={xPosition}
                                          y1="20" 
                                          x2={xPosition}
                                          y2="40" 
                                          stroke={division.color} 
                                          strokeWidth="2" 
                                        />
                                      );
                                    }
                                    
                                    return null;
                                  })}
                                </>
                              );
                            })()}
                          </svg>
                        </div>
                        
                        {/* Departments Grid */}
                        <div className="relative">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 px-8 max-h-[600px] overflow-y-auto">
                          {division.departments.map((department) => (
                            <div key={department.id} className="relative flex flex-col">
                              {/* Department Node */}
                                  <HoverCard openDelay={200}>
                                    <HoverCardTrigger asChild>
                                      <div 
                                        className="relative bg-white border-l-4 rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer w-full group"
                                        style={{ 
                                          borderLeftColor: division.color,
                                          backgroundColor: 'white'
                                        }}
                                        onClick={() => {
                                          toggleDepartment(department.id);
                                          setBreadcrumbs([division.name, department.name]);
                                        }}
                                      >
                                        <div className="p-2.5">
                                          <div className="flex items-start justify-between mb-1">
                                            <h4 className="text-sm text-gray-900 line-clamp-2 min-h-[1.75rem] font-['Dubai:Medium',_sans-serif] flex-1">
                                              {department.name}
                                            </h4>
                                            <div className="flex items-center gap-1 flex-shrink-0">
                                              {expandedDepartments.has(department.id) ? (
                                                <ChevronDown className="h-3 w-3 text-gray-400" />
                                              ) : (
                                                <ChevronRight className="h-3 w-3 text-gray-400" />
                                              )}
                                            </div>
                                          </div>
                                          <div className="space-y-1.5">
                                            <div className="flex items-center gap-2 text-xs text-gray-600">
                                              <Target className="h-3 w-3" />
                                              <span>{department.kpiCount} KPIs</span>
                                            </div>
                                            <div className="text-xs text-gray-600">
                                              <div className="flex justify-between mb-1">
                                                <span>Achievement</span>
                                                <span className="font-['Dubai:Medium',_sans-serif]" style={{ color: getStatusColor(department.status) }}>
                                                  {department.achievement}%
                                                </span>
                                              </div>
                                              <Progress 
                                                value={department.achievement} 
                                                className="h-1"
                                                indicatorColor={getStatusColor(department.status)}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </HoverCardTrigger>
                                    <HoverCardContent className="w-80" side="right">
                                      <div className="space-y-3">
                                        <div className="grid grid-cols-3 gap-2 text-center">
                                          <div className="bg-gray-50 rounded p-2">
                                            <p className="text-xs text-gray-600">Total KPIs</p>
                                            <p className="text-lg font-['Dubai:Medium',_sans-serif]" style={{ color: division.color }}>
                                              {department.kpiCount}
                                            </p>
                                          </div>
                                          <div className="bg-gray-50 rounded p-2">
                                            <p className="text-xs text-gray-600">Achieved</p>
                                            <p className="text-lg font-['Dubai:Medium',_sans-serif]" style={{ color: getStatusColor(department.status) }}>
                                              {department.achievement}%
                                            </p>
                                          </div>
                                          <div className="bg-gray-50 rounded p-2">
                                            <p className="text-xs text-gray-600">Sections</p>
                                            <p className="text-lg font-['Dubai:Medium',_sans-serif]" style={{ color: division.color }}>
                                              {department.sections.length}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="flex gap-2 pt-2">
                                          <Button size="sm" variant="outline" className="flex-1 text-xs">
                                            <FileText className="h-3 w-3 mr-1" />
                                            Scorecard
                                          </Button>
                                          <Button size="sm" variant="outline" className="flex-1 text-xs">
                                            <Target className="h-3 w-3 mr-1" />
                                            KPIs
                                          </Button>
                                        </div>
                                      </div>
                                    </HoverCardContent>
                                  </HoverCard>

                              {/* Sections */}
                              {expandedDepartments.has(department.id) && (
                                <div className="mt-3 space-y-1.5 w-full animate-in fade-in slide-in-from-top-2 duration-200">
                                  {department.sections.map((section) => (
                                    <HoverCard key={section.id} openDelay={200}>
                                      <HoverCardTrigger asChild>
                                        <div 
                                          className="bg-gray-50 border-l-2 border-gray-200 rounded px-3 py-1.5 hover:bg-gray-100 hover:shadow-md transition-all cursor-pointer group"
                                          style={{
                                            borderLeftColor: division.color
                                          }}
                                        >
                                          <div className="flex items-center justify-between gap-2">
                                            <p className="text-xs text-gray-700 font-['Dubai:Medium'] flex-1">
                                              {section.name}
                                            </p>
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                              <span className="text-[10px] text-gray-500">{section.kpiCount} KPIs</span>
                                              <span className="text-[10px] text-gray-400">•</span>
                                              <span className="text-[10px] font-['Dubai:Medium']" style={{ color: getStatusColor(section.status) }}>
                                                {section.achievement}%
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </HoverCardTrigger>
                                      <HoverCardContent className="w-80" side="right">
                                        <div className="space-y-3">
                                          <div className="grid grid-cols-2 gap-2 text-center">
                                            <div className="bg-gray-50 rounded p-2">
                                              <p className="text-xs text-gray-600">Total KPIs</p>
                                              <p className="text-lg font-['Dubai:Medium',_sans-serif]" style={{ color: division.color }}>
                                                {section.kpiCount}
                                              </p>
                                            </div>
                                            <div className="bg-gray-50 rounded p-2">
                                              <p className="text-xs text-gray-600">Achieved</p>
                                              <p className="text-lg font-['Dubai:Medium',_sans-serif]" style={{ color: getStatusColor(section.status) }}>
                                                {section.achievement}%
                                              </p>
                                            </div>
                                          </div>
                                          <div className="flex gap-2 pt-2">
                                            <Button size="sm" variant="outline" className="flex-1 text-xs">
                                              <FileText className="h-3 w-3 mr-1" />
                                              Scorecard
                                            </Button>
                                            <Button size="sm" variant="outline" className="flex-1 text-xs">
                                              <Target className="h-3 w-3 mr-1" />
                                              KPIs
                                            </Button>
                                          </div>
                                        </div>
                                      </HoverCardContent>
                                    </HoverCard>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>

                {filteredData.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <Building2 className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>No results found for "{searchQuery}"</p>
                    <p className="text-sm mt-1">Try adjusting your search or filter criteria</p>
                  </div>
                )}
              </div> {/* Close transform div */}
            </div> {/* Close chartRef div */}
          </CardContent>
        </Card>

        {/* Legend */}
        <Card>

        </Card>
      </div>

      {/* Side Panel for Node Details */}
      <Sheet open={selectedNode !== null} onOpenChange={(open) => !open && setSelectedNode(null)}>
        <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
          {selectedNode && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <div 
                    className="h-3 w-3 rounded"
                    style={{ backgroundColor: selectedNode.divisionColor }}
                  />
                  {selectedNode.type === 'division' && (selectedNode.data as Division).name}
                  {selectedNode.type === 'department' && (selectedNode.data as Department).name}
                  {selectedNode.type === 'section' && (selectedNode.data as Section).name}
                </SheetTitle>
                <SheetDescription>
                  {selectedNode.type === 'division' && `Division Code: ${(selectedNode.data as Division).code}`}
                  {selectedNode.type === 'department' && `Department Code: ${(selectedNode.data as Department).code}`}
                  {selectedNode.type === 'section' && `Section Details`}
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Owner Information */}
                {(selectedNode.type === 'department' || selectedNode.type === 'section') && (
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback style={{ backgroundColor: `${selectedNode.divisionColor}20`, color: selectedNode.divisionColor }}>
                        {(selectedNode.type === 'department' 
                          ? (selectedNode.data as Department).owner.name 
                          : (selectedNode.data as Section).owner.name
                        ).split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-['Dubai:Medium',_sans-serif]">
                        {selectedNode.type === 'department' 
                          ? (selectedNode.data as Department).owner.name 
                          : (selectedNode.data as Section).owner.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {selectedNode.type === 'department' 
                          ? (selectedNode.data as Department).owner.role 
                          : (selectedNode.data as Section).owner.role}
                      </p>
                    </div>
                  </div>
                )}

                {/* Performance Stats */}
                <div>
                  <h3 className="text-sm font-['Dubai:Medium',_sans-serif] mb-3">Performance Overview</h3>
                  <div className="space-y-4">
                    {selectedNode.type === 'division' && (
                      <>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span className="text-sm text-gray-600">Total KPIs</span>
                          <span className="font-['Dubai:Medium',_sans-serif]">{(selectedNode.data as Division).totalKPIs}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span className="text-sm text-gray-600">Achievement Rate</span>
                          <span className="font-['Dubai:Medium',_sans-serif]" style={{ color: selectedNode.divisionColor }}>
                            {(selectedNode.data as Division).achievedPercentage}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span className="text-sm text-gray-600">Underperforming KPIs</span>
                          <Badge variant="outline" className="border-red-500 text-red-500">
                            {(selectedNode.data as Division).underperformingCount}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span className="text-sm text-gray-600">Total Departments</span>
                          <span className="font-['Dubai:Medium',_sans-serif]">{(selectedNode.data as Division).departments.length}</span>
                        </div>
                      </>
                    )}
                    
                    {selectedNode.type === 'department' && (
                      <>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span className="text-sm text-gray-600">KPIs</span>
                          <span className="font-['Dubai:Medium',_sans-serif]">{(selectedNode.data as Department).kpiCount}</span>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Achievement</span>
                            <span className="font-['Dubai:Medium',_sans-serif]" style={{ color: selectedNode.divisionColor }}>
                              {(selectedNode.data as Department).achievement}%
                            </span>
                          </div>
                          <Progress value={(selectedNode.data as Department).achievement} className="h-2" />
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span className="text-sm text-gray-600">Status</span>
                          <Badge 
                            variant="outline"
                            style={{ 
                              borderColor: getStatusColor((selectedNode.data as Department).status),
                              color: getStatusColor((selectedNode.data as Department).status)
                            }}
                          >
                            {(selectedNode.data as Department).status.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span className="text-sm text-gray-600">Sections</span>
                          <span className="font-['Dubai:Medium',_sans-serif]">{(selectedNode.data as Department).sections.length}</span>
                        </div>
                      </>
                    )}

                    {selectedNode.type === 'section' && (
                      <>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span className="text-sm text-gray-600">KPIs</span>
                          <span className="font-['Dubai:Medium',_sans-serif]">{(selectedNode.data as Section).kpiCount}</span>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Achievement</span>
                            <span className="font-['Dubai:Medium',_sans-serif]" style={{ color: selectedNode.divisionColor }}>
                              {(selectedNode.data as Section).achievement}%
                            </span>
                          </div>
                          <Progress value={(selectedNode.data as Section).achievement} className="h-2" />
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span className="text-sm text-gray-600">Status</span>
                          <Badge 
                            variant="outline"
                            style={{ 
                              borderColor: getStatusColor((selectedNode.data as Section).status),
                              color: getStatusColor((selectedNode.data as Section).status)
                            }}
                          >
                            {(selectedNode.data as Section).status.toUpperCase()}
                          </Badge>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-4 border-t">
                  <Button className="w-full" style={{ backgroundColor: selectedNode.divisionColor }}>
                    <FileText className="h-4 w-4 mr-2" />
                    View Full Dashboard
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Target className="h-4 w-4 mr-2" />
                    View All KPIs
                  </Button>
                  <Button className="w-full" variant="outline">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Performance Reports
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
