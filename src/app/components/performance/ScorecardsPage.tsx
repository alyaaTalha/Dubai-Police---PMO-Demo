import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  LayoutGrid, 
  Network, 
  ChevronRight, 
  Building2, 
  Users, 
  Target,
  TrendingUp,
  Activity,
  ArrowLeft,
  ArrowRight
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import heroDecoration from "../../../assets/sandbox-hero-decoration.png";
import { CorporateScorecard } from "./CorporateScorecard";
import { DivisionScorecard } from "./DivisionScorecard";

// Organization data structure matching OrganizationChart.tsx
const corporateData = {
  name: "Dubai Customs",
  performanceIndex: 87.2,
  status: "green",
  kpisTracked: 160,
  kpisAchieved: 139,
  perspectives: {
    outcome: 91,
    process: 85,
    enabler: 86
  },
  divisions: [
    {
      id: "cdd",
      name: "Customs Development Division",
      code: "CDD",
      color: "#00B0AA",
      performanceIndex: 87.0,
      status: "green",
      kpisTracked: 24,
      kpisAchieved: 21,
      perspectives: { outcome: 90, process: 85, enabler: 86 },
      departments: [
        {
          id: "itd",
          name: "Information Technology",
          code: "ITD",
          performanceIndex: 92.0,
          status: "green",
          kpisTracked: 8,
          kpisAchieved: 7,
          perspectives: { outcome: 95, process: 90, enabler: 91 },
          sections: [
            { id: "itd-1", name: "Customs IT Solution Services", performanceIndex: 95.0, status: "green", kpisTracked: 4, kpisAchieved: 4, perspectives: { outcome: 96, process: 94, enabler: 95 } },
            { id: "itd-2", name: "Information Security", performanceIndex: 88.0, status: "green", kpisTracked: 5, kpisAchieved: 4, perspectives: { outcome: 90, process: 87, enabler: 87 } },
            { id: "itd-3", name: "Infrastructure", performanceIndex: 90.0, status: "green", kpisTracked: 6, kpisAchieved: 5, perspectives: { outcome: 92, process: 89, enabler: 89 } },
            { id: "itd-4", name: "Solutions Delivery", performanceIndex: 94.0, status: "green", kpisTracked: 4, kpisAchieved: 4, perspectives: { outcome: 95, process: 93, enabler: 94 } }
          ]
        },
        {
          id: "pdd",
          name: "Projects Delivery",
          code: "PDD",
          performanceIndex: 85.0,
          status: "green",
          kpisTracked: 6,
          kpisAchieved: 5,
          perspectives: { outcome: 88, process: 83, enabler: 84 },
          sections: [
            { id: "pdd-1", name: "Projects Delivery", performanceIndex: 85.0, status: "green", kpisTracked: 6, kpisAchieved: 5, perspectives: { outcome: 88, process: 83, enabler: 84 } }
          ]
        },
        {
          id: "sid",
          name: "Services Innovation",
          code: "SID",
          performanceIndex: 84.0,
          status: "green",
          kpisTracked: 10,
          kpisAchieved: 8,
          perspectives: { outcome: 87, process: 82, enabler: 83 },
          sections: [
            { id: "sid-1", name: "Business Process Analysis", performanceIndex: 82.0, status: "green", kpisTracked: 3, kpisAchieved: 2, perspectives: { outcome: 85, process: 80, enabler: 81 } },
            { id: "sid-2", name: "Business Process Improvement", performanceIndex: 86.0, status: "green", kpisTracked: 4, kpisAchieved: 3, perspectives: { outcome: 89, process: 84, enabler: 85 } },
            { id: "sid-3", name: "IT Strategy & Enterprise Architecture", performanceIndex: 84.0, status: "green", kpisTracked: 3, kpisAchieved: 3, perspectives: { outcome: 87, process: 82, enabler: 83 } }
          ]
        }
      ]
    },
    {
      id: "cid",
      name: "Customs Inspection Division",
      code: "CID",
      color: "#BB9956",
      performanceIndex: 91.0,
      status: "green",
      kpisTracked: 32,
      kpisAchieved: 29,
      perspectives: { outcome: 94, process: 89, enabler: 90 },
      departments: [
        {
          id: "acc",
          name: "Air Cargo Centers Management",
          code: "ACC",
          performanceIndex: 93.0,
          status: "green",
          kpisTracked: 7,
          kpisAchieved: 7,
          perspectives: { outcome: 95, process: 92, enabler: 92 },
          sections: [
            { id: "acc-1", name: "Airport Free Zone Inspection Center", performanceIndex: 94.0, status: "green", kpisTracked: 3, kpisAchieved: 3, perspectives: { outcome: 96, process: 93, enabler: 93 } },
            { id: "acc-2", name: "Al Maktoum Cargo Inspection Centre", performanceIndex: 92.0, status: "green", kpisTracked: 2, kpisAchieved: 2, perspectives: { outcome: 94, process: 91, enabler: 91 } },
            { id: "acc-3", name: "DMCC Inspection Center", performanceIndex: 93.0, status: "green", kpisTracked: 2, kpisAchieved: 2, perspectives: { outcome: 95, process: 92, enabler: 92 } }
          ]
        },
        {
          id: "icc",
          name: "Inland Customs Centers Management",
          code: "ICC",
          performanceIndex: 88.0,
          status: "green",
          kpisTracked: 6,
          kpisAchieved: 5,
          perspectives: { outcome: 91, process: 86, enabler: 87 },
          sections: [
            { id: "icc-1", name: "Dry Port & Textile Customs Center", performanceIndex: 90.0, status: "green", kpisTracked: 2, kpisAchieved: 2, perspectives: { outcome: 93, process: 88, enabler: 89 } },
            { id: "icc-2", name: "Ducamz Inspection Center", performanceIndex: 86.0, status: "green", kpisTracked: 2, kpisAchieved: 2, perspectives: { outcome: 89, process: 84, enabler: 85 } },
            { id: "icc-3", name: "Hatta Customs Center", performanceIndex: 88.0, status: "green", kpisTracked: 2, kpisAchieved: 1, perspectives: { outcome: 91, process: 86, enabler: 87 } }
          ]
        },
        {
          id: "pod",
          name: "Passenger Operations",
          code: "POD",
          performanceIndex: 94.0,
          status: "green",
          kpisTracked: 9,
          kpisAchieved: 9,
          perspectives: { outcome: 96, process: 93, enabler: 93 },
          sections: [
            { id: "pod-1", name: "Al Maktoum Terminal Passenger Operations", performanceIndex: 95.0, status: "green", kpisTracked: 2, kpisAchieved: 2, perspectives: { outcome: 97, process: 94, enabler: 94 } },
            { id: "pod-2", name: "Passenger Investigation Office", performanceIndex: 93.0, status: "green", kpisTracked: 2, kpisAchieved: 2, perspectives: { outcome: 95, process: 92, enabler: 92 } },
            { id: "pod-3", name: "Passenger Operations Terminal 1", performanceIndex: 94.0, status: "green", kpisTracked: 2, kpisAchieved: 2, perspectives: { outcome: 96, process: 93, enabler: 93 } },
            { id: "pod-4", name: "Passenger Operations Terminal 2", performanceIndex: 94.0, status: "green", kpisTracked: 2, kpisAchieved: 2, perspectives: { outcome: 96, process: 93, enabler: 93 } },
            { id: "pod-5", name: "Passenger Operations Terminal 3", performanceIndex: 94.0, status: "green", kpisTracked: 1, kpisAchieved: 1, perspectives: { outcome: 96, process: 93, enabler: 93 } }
          ]
        },
        {
          id: "scc",
          name: "Sea Customs Centers Management",
          code: "SCC",
          performanceIndex: 90.0,
          status: "green",
          kpisTracked: 5,
          kpisAchieved: 5,
          perspectives: { outcome: 93, process: 88, enabler: 89 },
          sections: [
            { id: "scc-1", name: "Dubai Logistics City Inspection Center", performanceIndex: 91.0, status: "green", kpisTracked: 2, kpisAchieved: 2, perspectives: { outcome: 94, process: 89, enabler: 90 } },
            { id: "scc-2", name: "Jabel Ali Port & Tecom Inspection Center", performanceIndex: 89.0, status: "green", kpisTracked: 3, kpisAchieved: 3, perspectives: { outcome: 92, process: 87, enabler: 88 } }
          ]
        },
        {
          id: "tsd",
          name: "Technical Support",
          code: "TSD",
          performanceIndex: 91.0,
          status: "green",
          kpisTracked: 5,
          kpisAchieved: 5,
          perspectives: { outcome: 94, process: 89, enabler: 90 },
          sections: [
            { id: "tsd-1", name: "Special Task", performanceIndex: 92.0, status: "green", kpisTracked: 3, kpisAchieved: 3, perspectives: { outcome: 95, process: 90, enabler: 91 } },
            { id: "tsd-2", name: "Special Units", performanceIndex: 90.0, status: "green", kpisTracked: 2, kpisAchieved: 2, perspectives: { outcome: 93, process: 88, enabler: 89 } }
          ]
        }
      ]
    },
    {
      id: "dgd",
      name: "Director General Division",
      code: "DGD",
      color: "#115E67",
      performanceIndex: 89.0,
      status: "green",
      kpisTracked: 18,
      kpisAchieved: 16,
      perspectives: { outcome: 92, process: 87, enabler: 88 },
      departments: [
        {
          id: "exd",
          name: "External Relations",
          code: "EXD",
          performanceIndex: 87.0,
          status: "green",
          kpisTracked: 4,
          kpisAchieved: 3,
          perspectives: { outcome: 90, process: 85, enabler: 86 },
          sections: [
            { id: "exd-1", name: "External Relations", performanceIndex: 87.0, status: "green", kpisTracked: 4, kpisAchieved: 3, perspectives: { outcome: 90, process: 85, enabler: 86 } }
          ]
        },
        {
          id: "icd",
          name: "Internal Control",
          code: "ICD",
          performanceIndex: 91.0,
          status: "green",
          kpisTracked: 5,
          kpisAchieved: 5,
          perspectives: { outcome: 94, process: 89, enabler: 90 },
          sections: [
            { id: "icd-1", name: "Internal Control", performanceIndex: 91.0, status: "green", kpisTracked: 5, kpisAchieved: 5, perspectives: { outcome: 94, process: 89, enabler: 90 } }
          ]
        },
        {
          id: "scd",
          name: "Statistics",
          code: "SCD",
          performanceIndex: 88.0,
          status: "green",
          kpisTracked: 4,
          kpisAchieved: 4,
          perspectives: { outcome: 91, process: 86, enabler: 87 },
          sections: [
            { id: "scd-1", name: "Statistics", performanceIndex: 88.0, status: "green", kpisTracked: 4, kpisAchieved: 4, perspectives: { outcome: 91, process: 86, enabler: 87 } }
          ]
        },
        {
          id: "sed",
          name: "Strategy & Excellence",
          code: "SED",
          performanceIndex: 90.0,
          status: "green",
          kpisTracked: 5,
          kpisAchieved: 4,
          perspectives: { outcome: 93, process: 88, enabler: 89 },
          sections: [
            { id: "sed-1", name: "Corporate Excellence + Risk Management", performanceIndex: 92.0, status: "green", kpisTracked: 1, kpisAchieved: 1, perspectives: { outcome: 95, process: 90, enabler: 91 } },
            { id: "sed-2", name: "Corporate Performance Management", performanceIndex: 89.0, status: "green", kpisTracked: 1, kpisAchieved: 1, perspectives: { outcome: 92, process: 87, enabler: 88 } },
            { id: "sed-3", name: "Innovation Center + Future Foresight", performanceIndex: 91.0, status: "green", kpisTracked: 1, kpisAchieved: 1, perspectives: { outcome: 94, process: 89, enabler: 90 } },
            { id: "sed-4", name: "Quality Assurance & Corporate Governance", performanceIndex: 88.0, status: "green", kpisTracked: 1, kpisAchieved: 1, perspectives: { outcome: 91, process: 86, enabler: 87 } },
            { id: "sed-5", name: "Strategy + Change Management", performanceIndex: 90.0, status: "green", kpisTracked: 1, kpisAchieved: 0, perspectives: { outcome: 93, process: 88, enabler: 89 } }
          ]
        }
      ]
    },
    {
      id: "faa",
      name: "Finance & Administration Affairs",
      code: "FAA",
      color: "#008755",
      performanceIndex: 85.0,
      status: "green",
      kpisTracked: 26,
      kpisAchieved: 22,
      perspectives: { outcome: 88, process: 83, enabler: 84 },
      departments: [
        {
          id: "aad",
          name: "Administration Affairs",
          code: "AAD",
          performanceIndex: 83.0,
          status: "green",
          kpisTracked: 8,
          kpisAchieved: 7,
          perspectives: { outcome: 86, process: 81, enabler: 82 },
          sections: [
            { id: "aad-1", name: "Contracts & Procurements", performanceIndex: 85.0, status: "green", kpisTracked: 2, kpisAchieved: 2, perspectives: { outcome: 88, process: 83, enabler: 84 } },
            { id: "aad-2", name: "Environmental Health & Safety", performanceIndex: 82.0, status: "green", kpisTracked: 2, kpisAchieved: 2, perspectives: { outcome: 85, process: 80, enabler: 81 } },
            { id: "aad-3", name: "Facility Management & Construction Projects", performanceIndex: 81.0, status: "green", kpisTracked: 2, kpisAchieved: 1, perspectives: { outcome: 84, process: 79, enabler: 80 } },
            { id: "aad-4", name: "Property & General Administration", performanceIndex: 84.0, status: "green", kpisTracked: 2, kpisAchieved: 2, perspectives: { outcome: 87, process: 82, enabler: 83 } }
          ]
        },
        {
          id: "ccd",
          name: "Corporate Communication",
          code: "CCD",
          performanceIndex: 88.0,
          status: "green",
          kpisTracked: 6,
          kpisAchieved: 5,
          perspectives: { outcome: 91, process: 86, enabler: 87 },
          sections: [
            { id: "ccd-1", name: "Corporate Social Responsibility", performanceIndex: 90.0, status: "green", kpisTracked: 2, kpisAchieved: 2, perspectives: { outcome: 93, process: 88, enabler: 89 } },
            { id: "ccd-2", name: "Creative Services & Events", performanceIndex: 87.0, status: "green", kpisTracked: 2, kpisAchieved: 2, perspectives: { outcome: 90, process: 85, enabler: 86 } },
            { id: "ccd-3", name: "Government Partnership", performanceIndex: 88.0, status: "green", kpisTracked: 1, kpisAchieved: 1, perspectives: { outcome: 91, process: 86, enabler: 87 } },
            { id: "ccd-4", name: "Public & Media Relations", performanceIndex: 87.0, status: "green", kpisTracked: 1, kpisAchieved: 0, perspectives: { outcome: 90, process: 85, enabler: 86 } }
          ]
        },
        {
          id: "crm",
          name: "Customs Refund Management",
          code: "CRM",
          performanceIndex: 84.0,
          status: "green",
          kpisTracked: 4,
          kpisAchieved: 3,
          perspectives: { outcome: 87, process: 82, enabler: 83 },
          sections: [
            { id: "crm-1", name: "Makasa", performanceIndex: 83.0, status: "green", kpisTracked: 2, kpisAchieved: 2, perspectives: { outcome: 86, process: 81, enabler: 82 } },
            { id: "crm-2", name: "Refund", performanceIndex: 85.0, status: "green", kpisTracked: 2, kpisAchieved: 1, perspectives: { outcome: 88, process: 83, enabler: 84 } }
          ]
        },
        {
          id: "fnd",
          name: "Finance",
          code: "FND",
          performanceIndex: 86.0,
          status: "green",
          kpisTracked: 8,
          kpisAchieved: 7,
          perspectives: { outcome: 89, process: 84, enabler: 85 },
          sections: [
            { id: "fnd-1", name: "Accounts Payable", performanceIndex: 87.0, status: "green", kpisTracked: 2, kpisAchieved: 2, perspectives: { outcome: 90, process: 85, enabler: 86 } },
            { id: "fnd-2", name: "General Accounting", performanceIndex: 85.0, status: "green", kpisTracked: 2, kpisAchieved: 2, perspectives: { outcome: 88, process: 83, enabler: 84 } },
            { id: "fnd-3", name: "Management Accounting", performanceIndex: 86.0, status: "green", kpisTracked: 2, kpisAchieved: 2, perspectives: { outcome: 89, process: 84, enabler: 85 } },
            { id: "fnd-4", name: "Revenue & Collections", performanceIndex: 86.0, status: "green", kpisTracked: 2, kpisAchieved: 1, perspectives: { outcome: 89, process: 84, enabler: 85 } }
          ]
        }
      ]
    },
    {
      id: "hrd",
      name: "Human Resources Division",
      code: "HRD",
      color: "#005844",
      performanceIndex: 86.0,
      status: "green",
      kpisTracked: 38,
      kpisAchieved: 33,
      perspectives: { outcome: 89, process: 84, enabler: 85 },
      departments: [
        {
          id: "chm",
          name: "Client Happiness Management",
          code: "CHM",
          performanceIndex: 89.0,
          status: "green",
          kpisTracked: 8,
          kpisAchieved: 7,
          perspectives: { outcome: 92, process: 87, enabler: 88 },
          sections: [
            { id: "chm-1", name: "Airport FZ & Silicon Customer Service Center", performanceIndex: 90.0, status: "green", kpisTracked: 2, kpisAchieved: 2, perspectives: { outcome: 93, process: 88, enabler: 89 } },
            { id: "chm-2", name: "Call Center", performanceIndex: 91.0, status: "green", kpisTracked: 1, kpisAchieved: 1, perspectives: { outcome: 94, process: 89, enabler: 90 } },
            { id: "chm-3", name: "Client Partnership", performanceIndex: 88.0, status: "green", kpisTracked: 2, kpisAchieved: 2, perspectives: { outcome: 91, process: 86, enabler: 87 } },
            { id: "chm-4", name: "Client Services Development", performanceIndex: 89.0, status: "green", kpisTracked: 1, kpisAchieved: 1, perspectives: { outcome: 92, process: 87, enabler: 88 } },
            { id: "chm-5", name: "Customer Service Management", performanceIndex: 88.0, status: "green", kpisTracked: 1, kpisAchieved: 1, perspectives: { outcome: 91, process: 86, enabler: 87 } },
            { id: "chm-6", name: "E-commerce", performanceIndex: 90.0, status: "green", kpisTracked: 1, kpisAchieved: 0, perspectives: { outcome: 93, process: 88, enabler: 89 } }
          ]
        },
        {
          id: "dla",
          name: "Dubai Logistics Academy",
          code: "DLA",
          performanceIndex: 87.0,
          status: "green",
          kpisTracked: 5,
          kpisAchieved: 4,
          perspectives: { outcome: 90, process: 85, enabler: 86 },
          sections: [
            { id: "dla-1", name: "Training Design & Development", performanceIndex: 88.0, status: "green", kpisTracked: 3, kpisAchieved: 3, perspectives: { outcome: 91, process: 86, enabler: 87 } },
            { id: "dla-2", name: "Training Programs Management", performanceIndex: 86.0, status: "green", kpisTracked: 2, kpisAchieved: 1, perspectives: { outcome: 89, process: 84, enabler: 85 } }
          ]
        },
        {
          id: "hcd",
          name: "Hatta Centre",
          code: "HCD",
          performanceIndex: 82.0,
          status: "green",
          kpisTracked: 3,
          kpisAchieved: 2,
          perspectives: { outcome: 85, process: 80, enabler: 81 },
          sections: [
            { id: "hcd-1", name: "Hatta Centre", performanceIndex: 82.0, status: "green", kpisTracked: 3, kpisAchieved: 2, perspectives: { outcome: 85, process: 80, enabler: 81 } }
          ]
        },
        {
          id: "hrd-dept",
          name: "Human Resources",
          code: "HRD",
          performanceIndex: 85.0,
          status: "green",
          kpisTracked: 6,
          kpisAchieved: 5,
          perspectives: { outcome: 88, process: 83, enabler: 84 },
          sections: [
            { id: "hrd-1", name: "Employee Relations", performanceIndex: 84.0, status: "green", kpisTracked: 2, kpisAchieved: 2, perspectives: { outcome: 87, process: 82, enabler: 83 } },
            { id: "hrd-2", name: "Organizational Development", performanceIndex: 86.0, status: "green", kpisTracked: 2, kpisAchieved: 2, perspectives: { outcome: 89, process: 84, enabler: 85 } },
            { id: "hrd-3", name: "Talent Acquisition", performanceIndex: 85.0, status: "green", kpisTracked: 2, kpisAchieved: 1, perspectives: { outcome: 88, process: 83, enabler: 84 } }
          ]
        },
        {
          id: "ind",
          name: "Intelligence",
          code: "IND",
          performanceIndex: 88.0,
          status: "green",
          kpisTracked: 7,
          kpisAchieved: 6,
          perspectives: { outcome: 91, process: 86, enabler: 87 },
          sections: [
            { id: "ind-1", name: "Analysis", performanceIndex: 89.0, status: "green", kpisTracked: 2, kpisAchieved: 2, perspectives: { outcome: 92, process: 87, enabler: 88 } },
            { id: "ind-2", name: "Control Room", performanceIndex: 90.0, status: "green", kpisTracked: 1, kpisAchieved: 1, perspectives: { outcome: 93, process: 88, enabler: 89 } },
            { id: "ind-3", name: "Intelligence Operations", performanceIndex: 87.0, status: "green", kpisTracked: 2, kpisAchieved: 2, perspectives: { outcome: 90, process: 85, enabler: 86 } },
            { id: "ind-4", name: "Profile Management", performanceIndex: 88.0, status: "green", kpisTracked: 1, kpisAchieved: 1, perspectives: { outcome: 91, process: 86, enabler: 87 } },
            { id: "ind-5", name: "Technical Services & Development", performanceIndex: 87.0, status: "green", kpisTracked: 1, kpisAchieved: 0, perspectives: { outcome: 90, process: 85, enabler: 86 } }
          ]
        },
        {
          id: "lad",
          name: "Legal Affairs",
          code: "LAD",
          performanceIndex: 84.0,
          status: "green",
          kpisTracked: 4,
          kpisAchieved: 3,
          perspectives: { outcome: 87, process: 82, enabler: 83 },
          sections: [
            { id: "lad-1", name: "Agreements & Contracts", performanceIndex: 85.0, status: "green", kpisTracked: 2, kpisAchieved: 2, perspectives: { outcome: 88, process: 83, enabler: 84 } },
            { id: "lad-2", name: "Consultancy & Legal Services", performanceIndex: 83.0, status: "green", kpisTracked: 2, kpisAchieved: 1, perspectives: { outcome: 86, process: 81, enabler: 82 } }
          ]
        },
        {
          id: "tod",
          name: "Tariff & Origin",
          code: "TOD",
          performanceIndex: 83.0,
          status: "green",
          kpisTracked: 6,
          kpisAchieved: 5,
          perspectives: { outcome: 86, process: 81, enabler: 82 },
          sections: [
            { id: "tod-1", name: "Customs Policies", performanceIndex: 84.0, status: "green", kpisTracked: 1, kpisAchieved: 1, perspectives: { outcome: 87, process: 82, enabler: 83 } },
            { id: "tod-2", name: "Customs Procedures", performanceIndex: 82.0, status: "green", kpisTracked: 2, kpisAchieved: 2, perspectives: { outcome: 85, process: 80, enabler: 81 } },
            { id: "tod-3", name: "Customs Tariff", performanceIndex: 83.0, status: "green", kpisTracked: 1, kpisAchieved: 1, perspectives: { outcome: 86, process: 81, enabler: 82 } },
            { id: "tod-4", name: "Rules of Origin & Economic Agreements", performanceIndex: 84.0, status: "green", kpisTracked: 1, kpisAchieved: 1, perspectives: { outcome: 87, process: 82, enabler: 83 } },
            { id: "tod-5", name: "Suspended Duty Cases", performanceIndex: 82.0, status: "green", kpisTracked: 1, kpisAchieved: 0, perspectives: { outcome: 85, process: 80, enabler: 81 } }
          ]
        },
        {
          id: "vad",
          name: "Valuation",
          code: "VAD",
          performanceIndex: 85.0,
          status: "green",
          kpisTracked: 5,
          kpisAchieved: 4,
          perspectives: { outcome: 88, process: 83, enabler: 84 },
          sections: [
            { id: "vad-1", name: "Authorised Economic Operator", performanceIndex: 86.0, status: "green", kpisTracked: 2, kpisAchieved: 2, perspectives: { outcome: 89, process: 84, enabler: 85 } },
            { id: "vad-2", name: "Customs Valuation Database & Services", performanceIndex: 84.0, status: "green", kpisTracked: 2, kpisAchieved: 2, perspectives: { outcome: 87, process: 82, enabler: 83 } },
            { id: "vad-3", name: "Valuation Assessment", performanceIndex: 85.0, status: "green", kpisTracked: 1, kpisAchieved: 0, perspectives: { outcome: 88, process: 83, enabler: 84 } }
          ]
        }
      ]
    },
    {
      id: "pld",
      name: "Policy & Legislation",
      code: "PLD",
      color: "#FFBE9F",
      performanceIndex: 84.0,
      status: "green",
      kpisTracked: 22,
      kpisAchieved: 18,
      perspectives: { outcome: 87, process: 82, enabler: 83 },
      departments: [
        {
          id: "cad",
          name: "Customs Audit",
          code: "CAD",
          performanceIndex: 86.0,
          status: "green",
          kpisTracked: 5,
          kpisAchieved: 4,
          perspectives: { outcome: 89, process: 84, enabler: 85 },
          sections: [
            { id: "cad-1", name: "Company Audit", performanceIndex: 87.0, status: "green", kpisTracked: 2, kpisAchieved: 2, perspectives: { outcome: 90, process: 85, enabler: 86 } },
            { id: "cad-2", name: "Declaration Audit", performanceIndex: 85.0, status: "green", kpisTracked: 2, kpisAchieved: 2, perspectives: { outcome: 88, process: 83, enabler: 84 } },
            { id: "cad-3", name: "Planning & Follow-Up", performanceIndex: 86.0, status: "green", kpisTracked: 1, kpisAchieved: 0, perspectives: { outcome: 89, process: 84, enabler: 85 } }
          ]
        },
        {
          id: "cci",
          name: "Customs Cases & Investigations",
          code: "CCI",
          performanceIndex: 83.0,
          status: "green",
          kpisTracked: 8,
          kpisAchieved: 7,
          perspectives: { outcome: 86, process: 81, enabler: 82 },
          sections: [
            { id: "cci-1", name: "Airport Zone Investigation", performanceIndex: 84.0, status: "green", kpisTracked: 2, kpisAchieved: 2, perspectives: { outcome: 87, process: 82, enabler: 83 } },
            { id: "cci-2", name: "Customs Cases", performanceIndex: 82.0, status: "green", kpisTracked: 2, kpisAchieved: 2, perspectives: { outcome: 85, process: 80, enabler: 81 } },
            { id: "cci-3", name: "Enforcement & Follow-Up", performanceIndex: 83.0, status: "green", kpisTracked: 2, kpisAchieved: 1, perspectives: { outcome: 86, process: 81, enabler: 82 } },
            { id: "cci-4", name: "Inland Zone Investigation", performanceIndex: 84.0, status: "green", kpisTracked: 1, kpisAchieved: 1, perspectives: { outcome: 87, process: 82, enabler: 83 } },
            { id: "cci-5", name: "Jabel Ali & Sea Zone Investigation", performanceIndex: 83.0, status: "green", kpisTracked: 1, kpisAchieved: 1, perspectives: { outcome: 86, process: 81, enabler: 82 } }
          ]
        },
        {
          id: "cdm",
          name: "Customs Declarations Management",
          code: "CDM",
          performanceIndex: 85.0,
          status: "green",
          kpisTracked: 5,
          kpisAchieved: 4,
          perspectives: { outcome: 88, process: 83, enabler: 84 },
          sections: [
            { id: "cdm-1", name: "Declarations Services", performanceIndex: 86.0, status: "green", kpisTracked: 3, kpisAchieved: 3, perspectives: { outcome: 89, process: 84, enabler: 85 } },
            { id: "cdm-2", name: "New Declarations", performanceIndex: 84.0, status: "green", kpisTracked: 2, kpisAchieved: 1, perspectives: { outcome: 87, process: 82, enabler: 83 } }
          ]
        },
        {
          id: "ipr",
          name: "Intellectual Property Rights",
          code: "IPR",
          performanceIndex: 82.0,
          status: "green",
          kpisTracked: 4,
          kpisAchieved: 3,
          perspectives: { outcome: 85, process: 80, enabler: 81 },
          sections: [
            { id: "ipr-1", name: "Awareness & Education", performanceIndex: 83.0, status: "green", kpisTracked: 1, kpisAchieved: 1, perspectives: { outcome: 86, process: 81, enabler: 82 } },
            { id: "ipr-2", name: "Intellectual Property & Trade Agency Accreditation", performanceIndex: 81.0, status: "green", kpisTracked: 2, kpisAchieved: 1, perspectives: { outcome: 84, process: 79, enabler: 80 } },
            { id: "ipr-3", name: "Intellectual Property Disputes Settlement", performanceIndex: 83.0, status: "green", kpisTracked: 1, kpisAchieved: 1, perspectives: { outcome: 86, process: 81, enabler: 82 } }
          ]
        }
      ]
    }
  ]
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "green": return "bg-green-500";
    case "amber": return "bg-amber-500";
    case "red": return "bg-red-500";
    default: return "bg-gray-500";
  }
};

const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" => {
  switch (status) {
    case "green": return "default";
    case "amber": return "secondary";
    case "red": return "destructive";
    default: return "secondary";
  }
};

export function ScorecardsPage({ divisionId }: { divisionId?: string }) {
  const [currentView, setCurrentView] = useState<"overview" | "corporate" | "division">(divisionId ? "division" : "overview");
  const [selectedDivisionId, setSelectedDivisionId] = useState<string>(divisionId || "cdd");
  const [viewMode, setViewMode] = useState<"tree" | "grid">("tree");
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    new Set(["corporate", "cdd", "cid", "dgd", "faa", "hrd", "pld"])
  );

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  const NodeCard = ({ 
    node, 
    level, 
    type,
    divisionColor
  }: { 
    node: any; 
    level: number; 
    type: "division" | "department" | "section";
    divisionColor?: string;
  }) => {
    const hasChildren = type === "division" ? node.departments?.length > 0 : 
                        type === "department" ? node.sections?.length > 0 : false;
    const isExpanded = expandedNodes.has(node.id);
    
    // Use division color if provided, otherwise use node's color (for divisions)
    const borderColor = divisionColor || node.color || "#357743";

    return (
      <div className="relative">
        <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4" 
              style={{ borderLeftColor: borderColor }}>
          <CardContent className="py-2.5 px-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {hasChildren && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleNode(node.id);
                    }}
                  >
                    <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                  </Button>
                )}
                <h4 className="  font-[Dubai]">{node.name.replace(/\s*Division(s)?\s*/gi, ' ').trim()}</h4>
              </div>
              
              <div className="flex items-center gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-muted-foreground" />
                        <span className="font-['Dubai:Bold',_sans-serif] text-sm">{node.performanceIndex}%</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="space-y-1">
                        <p className=" ">Performance Breakdown:</p>
                        <p>Outcome: {node.perspectives.outcome}%</p>
                        <p>Process: {node.perspectives.process}%</p>
                        <p>Enabler: {node.perspectives.enabler}%</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span className="font-['Dubai:Bold',_sans-serif] text-sm">{node.kpisAchieved}/{node.kpisTracked}</span>
                </div>

                <Badge 
                  variant={getStatusBadgeVariant(node.status)}
                  style={{ 
                    backgroundColor: node.status === "green" ? "#357743" : 
                                    node.status === "amber" ? "#F2A200" : "#D83731"
                  }}
                  className="text-white hover:opacity-90"
                >
                  {node.status === "green" ? "On Track" : node.status === "amber" ? "At Risk" : "Off Track"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Render children if expanded */}
        {hasChildren && isExpanded && (
          <div className="ml-8 mt-4 space-y-3 border-l-2 border-gray-200 pl-6">
            {type === "division" && node.departments?.map((dept: any) => (
              <div key={dept.id}>
                <NodeCard node={dept} level={level + 1} type="department" divisionColor={borderColor} />
                {expandedNodes.has(dept.id) && dept.sections?.map((section: any) => (
                  <div key={section.id} className="ml-8 mt-3">
                    <NodeCard node={section} level={level + 2} type="section" divisionColor={borderColor} />
                  </div>
                ))}
              </div>
            ))}
            {type === "department" && node.sections?.map((section: any) => (
              <NodeCard key={section.id} node={section} level={level + 1} type="section" divisionColor={borderColor} />
            ))}
          </div>
        )}
      </div>
    );
  };

  const GridView = () => {
    const allDivisions = corporateData.divisions;
    const allDepartments = allDivisions.flatMap(d => d.departments);
    const allSections = allDepartments.flatMap(d => d.sections);

    return (
      <div className="space-y-8">
        {/* Corporate Level */}
        <div>
          <h3 className="font-['Dubai:Bold',_sans-serif] mb-4 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-[#008755]" />
            Corporate Scorecard
          </h3>
          <Card className="border-l-4" style={{ borderLeftColor: "#357743" }}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="  mb-3">{corporateData.name}</h4>
                  <div className="flex items-center gap-4">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-muted-foreground" />
                            <span className="font-['Dubai:Bold',_sans-serif]">{corporateData.performanceIndex}%</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="space-y-1">
                            <p className=" ">Performance Breakdown:</p>
                            <p>Outcome: {corporateData.perspectives.outcome}%</p>
                            <p>Process: {corporateData.perspectives.process}%</p>
                            <p>Enabler: {corporateData.perspectives.enabler}%</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Target className="h-4 w-4" />
                      <span>{corporateData.kpisAchieved}/{corporateData.kpisTracked} KPIs</span>
                    </div>
                    <Badge style={{ backgroundColor: "#357743" }} className="text-white hover:opacity-90">On Track</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Divisional Scorecards */}
        <div>
          <h3 className="font-['Dubai:Bold',_sans-serif] mb-4 flex items-center gap-2">
            <Network className="h-5 w-5 text-[#008755]" />
            Divisional Scorecards
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allDivisions.map(division => (
              <NodeCard key={division.id} node={division} level={1} type="division" />
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Handle different view renders
  if (currentView === "corporate") {
    return <CorporateScorecard onBack={() => setCurrentView("overview")} />;
  }

  if (currentView === "division") {
    return <DivisionScorecard onBack={() => setCurrentView("overview")} divisionId={selectedDivisionId} />;
  }

  return (
    <div className="h-full overflow-auto">
      <div className="space-y-2 p-2">
        {/* Banner Section */}
        <Card className="relative text-white border-none shadow-lg overflow-hidden bg-gradient-to-br from-[#005844] via-[#008755] to-[#00a869]">
          <img
            src={heroDecoration}
            alt=""
            className="absolute -top-16 -right-16 h-160 w-160 rounded-full object-cover opacity-50 pointer-events-none select-none"
          />
          <CardContent className="pt-3 pb-3 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Network className="h-5 w-5" />
                  </div>
                  <div>
                    <h1 className="text-xl   mb-0.5">
                      Scorecard Overview
                    </h1>
                    <p className="text-white/90 text-sm">
                      Dubai Customs - Hierarchical Performance Tracking
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="p-2 space-y-3">
          {/* Quick Access Cards */}
          <div>
            <h2 className="text-lg font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2">
              Quick Access
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <Card 
                className="cursor-pointer transition-all hover:shadow-md hover:border-[#008755]/50"
                onClick={() => setCurrentView("corporate")}
              >
                <CardContent className="pt-2 pb-2">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#008755] to-[#008755]/80 flex items-center justify-center text-white mb-1.5">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-0.5 text-sm font-[Dubai]">
                    Corporate Scorecard
                  </h3>
                  <p className="text-xs text-muted-foreground mb-1.5">
                    View organization-wide performance metrics and strategic objectives
                  </p>
                  <div className="flex items-center text-[#008755] text-xs font-['Dubai:Medium',_'Dubai']">
                    <span>Open Scorecard</span>
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer transition-all hover:shadow-md hover:border-[#008755]/50"
                onClick={() => setCurrentView("division")}
              >
                <CardContent className="pt-2 pb-2">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#008755] to-[#008755]/80 flex items-center justify-center text-white mb-1.5">
                    <Network className="h-5 w-5" />
                  </div>
                  <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-0.5 text-sm font-[Dubai]">
                    Division Scorecard
                  </h3>
                  <p className="text-xs text-muted-foreground mb-1.5">
                    Monitor divisional KPIs and performance across business units
                  </p>
                  <div className="flex items-center text-[#008755] text-xs font-['Dubai:Medium',_'Dubai']">
                    <span>Open Scorecard</span>
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer transition-all hover:shadow-md hover:border-[#008755]/50"
              >
                <CardContent className="pt-2 pb-2">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#008755] to-[#008755]/80 flex items-center justify-center text-white mb-1.5">
                    <Users className="h-5 w-5" />
                  </div>
                  <h3 className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-0.5 text-sm font-[Dubai]">
                    Department Scorecard
                  </h3>
                  <p className="text-xs text-muted-foreground mb-1.5">
                    Track department-level objectives and operational metrics
                  </p>
                  <div className="flex items-center text-[#008755] text-xs font-['Dubai:Medium',_'Dubai']">
                    <span>Open Scorecard</span>
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "tree" ? "default" : "outline"}
                onClick={() => setViewMode("tree")}
                className={viewMode === "tree" ? "bg-[#008755] hover:bg-[#008755]/90" : ""}
              >
                <Network className="h-4 w-4 mr-2" />
                Tree View
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-[#008755] hover:bg-[#008755]/90" : ""}
              >
                <LayoutGrid className="h-4 w-4 mr-2" />
                Grid View
              </Button>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Status Legend:</span>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#357743' }}></div>
                <span className="text-sm">On Track</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#F2A200' }}></div>
                <span className="text-sm">At Risk</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#D83731' }}></div>
                <span className="text-sm">Off Track</span>
              </div>
            </div>
          </div>

          {/* Content */}
          {viewMode === "tree" ? (
            <div className="space-y-2">
              {/* Corporate Level */}
              <Card className="border-l-4 bg-gradient-to-r from-green-50/50 to-transparent" style={{ borderLeftColor: "#357743" }}>
                <CardContent className="py-2.5 px-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Building2 className="h-5 w-5 text-[#008755]" />
                      <h3 className="font-['Dubai:Bold',_'Dubai'] font-[Dubai]">{corporateData.name}</h3>
                      <Badge style={{ backgroundColor: "#357743" }} className="text-white hover:opacity-90">Corporate Level</Badge>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-2">
                              <Activity className="h-4 w-4 text-muted-foreground" />
                              <span className="font-['Dubai:Bold',_'Dubai'] text-sm">{corporateData.performanceIndex}%</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="space-y-1">
                              <p className="font-['Dubai:Medium',_'Dubai']">Performance Breakdown:</p>
                              <p>Outcome: {corporateData.perspectives.outcome}%</p>
                              <p>Process: {corporateData.perspectives.process}%</p>
                              <p>Enabler: {corporateData.perspectives.enabler}%</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        <span className="font-['Dubai:Bold',_'Dubai'] text-sm">{corporateData.kpisAchieved}/{corporateData.kpisTracked}</span>
                      </div>

                      <Badge style={{ backgroundColor: "#357743" }} className="text-white hover:opacity-90">On Track</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Divisions */}
              <div className="ml-12 space-y-2 border-l-2 border-gray-200 pl-8">
                {corporateData.divisions.map(division => (
                  <NodeCard key={division.id} node={division} level={1} type="division" />
                ))}
              </div>
            </div>
          ) : (
            <GridView />
          )}
        </div>
      </div>
    </div>
  );
}