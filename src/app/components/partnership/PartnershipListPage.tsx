import { useState } from "react";
import {
  FileText,
  Search,
  Download,
  ArrowLeft,
  Plus,
  Filter,
  Eye,
  FileDown,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import bannerImage from "figma:asset/2ceb5f3890ecf49940adbd1e2cca8cf7647ce99f.png";

interface Partnership {
  id: number;
  partnership: string;
  type: "MOU" | "Joint Initiative" | "Agreement" | "Protocol" | "Framework";
  partners: string[];
  sector: "Government" | "Private Sector" | "International" | "Academic";
  department: string;
  status: "Active" | "Pending" | "Expired" | "Under Review";
  startDate: string;
  expiryDate: string;
  documents: number;
}

const partnershipData: Partnership[] = [
  {
    id: 1,
    partnership: "Cross-Border Trade Facilitation",
    type: "MOU",
    partners: ["Abu Dhabi Customs", "Saudi Customs"],
    sector: "Government",
    department: "Customs Operations Division",
    status: "Active",
    startDate: "Jan 2024",
    expiryDate: "Jan 2027",
    documents: 5
  },
  {
    id: 2,
    partnership: "Smart Trade Platform Development",
    type: "Joint Initiative",
    partners: ["DP World", "Emirates NBD"],
    sector: "Private Sector",
    department: "Innovation & Technology Division",
    status: "Active",
    startDate: "Mar 2024",
    expiryDate: "Mar 2026",
    documents: 8
  },
  {
    id: 3,
    partnership: "Customs Risk Assessment Framework",
    type: "Protocol",
    partners: ["World Customs Organization"],
    sector: "International",
    department: "Risk Management Division",
    status: "Active",
    startDate: "Jun 2023",
    expiryDate: "Jun 2026",
    documents: 12
  },
  {
    id: 4,
    partnership: "Green Customs Initiative",
    type: "Agreement",
    partners: ["Dubai Municipality", "DEWA"],
    sector: "Government",
    department: "Environmental Compliance Division",
    status: "Active",
    startDate: "Feb 2024",
    expiryDate: "Feb 2027",
    documents: 6
  },
  {
    id: 5,
    partnership: "Digital Skills Enhancement Program",
    type: "MOU",
    partners: ["UAE University", "Khalifa University"],
    sector: "Academic",
    department: "Human Resources Division",
    status: "Active",
    startDate: "Sep 2024",
    expiryDate: "Sep 2026",
    documents: 4
  },
  {
    id: 6,
    partnership: "Aviation Security Cooperation",
    type: "Protocol",
    partners: ["Dubai Police", "Emirates Airlines"],
    sector: "Government",
    department: "Security & Inspection Division",
    status: "Active",
    startDate: "Jan 2023",
    expiryDate: "Jan 2026",
    documents: 9
  },
  {
    id: 7,
    partnership: "E-Commerce Trade Standards",
    type: "Framework",
    partners: ["Singapore Customs", "German Customs"],
    sector: "International",
    department: "Trade Policy Division",
    status: "Under Review",
    startDate: "Nov 2024",
    expiryDate: "Nov 2027",
    documents: 3
  },
  {
    id: 8,
    partnership: "Financial Services Integration",
    type: "MOU",
    partners: ["Mashreq Bank", "Etisalat by e&"],
    sector: "Private Sector",
    department: "Financial Operations Division",
    status: "Active",
    startDate: "Apr 2024",
    expiryDate: "Apr 2026",
    documents: 7
  },
  {
    id: 9,
    partnership: "Port Operations Optimization",
    type: "Joint Initiative",
    partners: ["RTA", "Dubai Airports"],
    sector: "Government",
    department: "Logistics & Transportation Division",
    status: "Active",
    startDate: "May 2024",
    expiryDate: "May 2027",
    documents: 11
  },
  {
    id: 10,
    partnership: "Data Analytics & AI Research",
    type: "Agreement",
    partners: ["Mubadala Investment", "Abu Dhabi University"],
    sector: "Academic",
    department: "Data & Analytics Division",
    status: "Pending",
    startDate: "Dec 2024",
    expiryDate: "Dec 2026",
    documents: 2
  },
  {
    id: 11,
    partnership: "Anti-Smuggling Taskforce",
    type: "Protocol",
    partners: ["Dubai Police", "Abu Dhabi Police"],
    sector: "Government",
    department: "Security & Inspection Division",
    status: "Active",
    startDate: "Aug 2023",
    expiryDate: "Aug 2026",
    documents: 15
  },
  {
    id: 12,
    partnership: "Customer Experience Excellence",
    type: "MOU",
    partners: ["Aramex", "DHL Express"],
    sector: "Private Sector",
    department: "Customer Service Division",
    status: "Active",
    startDate: "Jul 2024",
    expiryDate: "Jul 2026",
    documents: 5
  },
  {
    id: 13,
    partnership: "Regional Trade Corridor",
    type: "Framework",
    partners: ["Saudi Customs", "Oman Customs", "Qatar Customs"],
    sector: "International",
    department: "Regional Cooperation Division",
    status: "Active",
    startDate: "Oct 2023",
    expiryDate: "Oct 2028",
    documents: 18
  },
  {
    id: 14,
    partnership: "Healthcare Supply Chain",
    type: "Agreement",
    partners: ["Dubai Health Authority", "Ministry of Health"],
    sector: "Government",
    department: "Healthcare Logistics Division",
    status: "Active",
    startDate: "Mar 2024",
    expiryDate: "Mar 2027",
    documents: 8
  },
  {
    id: 15,
    partnership: "Blockchain Trade Platform",
    type: "Joint Initiative",
    partners: ["IBM Middle East", "Microsoft UAE"],
    sector: "Private Sector",
    department: "Digital Transformation Division",
    status: "Expired",
    startDate: "Jan 2022",
    expiryDate: "Jan 2024",
    documents: 10
  },
  {
    id: 16,
    partnership: "Trade Compliance Training",
    type: "MOU",
    partners: ["Dubai Chamber", "Khalifa University"],
    sector: "Academic",
    department: "Training & Development Division",
    status: "Active",
    startDate: "Jun 2024",
    expiryDate: "Jun 2026",
    documents: 6
  },
  {
    id: 17,
    partnership: "Maritime Security Alliance",
    type: "Protocol",
    partners: ["Coast Guard", "DP World", "Dubai Ports"],
    sector: "Government",
    department: "Maritime Operations Division",
    status: "Active",
    startDate: "Feb 2023",
    expiryDate: "Feb 2026",
    documents: 14
  },
  {
    id: 18,
    partnership: "Sustainable Trade Practices",
    type: "Framework",
    partners: ["UN Environment Programme", "EU Customs"],
    sector: "International",
    department: "Sustainability Division",
    status: "Active",
    startDate: "Sep 2024",
    expiryDate: "Sep 2029",
    documents: 7
  },
  {
    id: 19,
    partnership: "Freight Forwarding Standards",
    type: "Agreement",
    partners: ["Aramex", "FedEx", "UPS"],
    sector: "Private Sector",
    department: "Freight Operations Division",
    status: "Active",
    startDate: "May 2024",
    expiryDate: "May 2027",
    documents: 9
  },
  {
    id: 20,
    partnership: "Free Zone Coordination",
    type: "MOU",
    partners: ["JAFZA", "DAFZA", "Dubai Airport Freezone"],
    sector: "Government",
    department: "Free Zones Division",
    status: "Active",
    startDate: "Apr 2024",
    expiryDate: "Apr 2027",
    documents: 11
  }
];

interface PartnershipListPageProps {
  onBack: () => void;
}

export function PartnershipListPage({ onBack }: PartnershipListPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedSector, setSelectedSector] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(true);

  const filteredPartnerships = partnershipData.filter((partnership) => {
    const matchesSearch = 
      partnership.partnership.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partnership.partners.some(p => p.toLowerCase().includes(searchQuery.toLowerCase())) ||
      partnership.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || partnership.type === selectedType;
    const matchesStatus = selectedStatus === "all" || partnership.status === selectedStatus;
    const matchesSector = selectedSector === "all" || partnership.sector === selectedSector;
    return matchesSearch && matchesType && matchesStatus && matchesSector;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return { bg: "#35774320", text: "#357743", icon: CheckCircle2 };
      case "Pending":
        return { bg: "#F2A20020", text: "#F2A200", icon: Clock };
      case "Expired":
        return { bg: "#D8373120", text: "#D83731", icon: XCircle };
      case "Under Review":
        return { bg: "#00875520", text: "#008755", icon: AlertTriangle };
      default:
        return { bg: "#00875520", text: "#008755", icon: CheckCircle2 };
    }
  };

  const getSectorColor = (sector: string) => {
    switch (sector) {
      case "Government":
        return { bg: "#00B0AA20", text: "#00B0AA" };
      case "Private Sector":
        return { bg: "#BB995620", text: "#BB9956" };
      case "International":
        return { bg: "#00875520", text: "#008755" };
      case "Academic":
        return { bg: "#00584420", text: "#005844" };
      default:
        return { bg: "#00875520", text: "#008755" };
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "MOU":
        return { bg: "#00875520", text: "#008755" };
      case "Joint Initiative":
        return { bg: "#00B0AA20", text: "#00B0AA" };
      case "Agreement":
        return { bg: "#BB995620", text: "#BB9956" };
      case "Protocol":
        return { bg: "#D8373120", text: "#D83731" };
      case "Framework":
        return { bg: "#00584420", text: "#005844" };
      default:
        return { bg: "#00875520", text: "#008755" };
    }
  };

  const typeCounts = {
    all: partnershipData.length,
    MOU: partnershipData.filter(p => p.type === "MOU").length,
    "Joint Initiative": partnershipData.filter(p => p.type === "Joint Initiative").length,
    Agreement: partnershipData.filter(p => p.type === "Agreement").length,
    Protocol: partnershipData.filter(p => p.type === "Protocol").length,
    Framework: partnershipData.filter(p => p.type === "Framework").length,
  };

  const statusCounts = {
    all: partnershipData.length,
    Active: partnershipData.filter(p => p.status === "Active").length,
    Pending: partnershipData.filter(p => p.status === "Pending").length,
    Expired: partnershipData.filter(p => p.status === "Expired").length,
    "Under Review": partnershipData.filter(p => p.status === "Under Review").length,
  };

  return (
    <div className="h-full overflow-auto">
      <div className="space-y-3 p-3">
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
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                    onClick={onBack}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <div className="h-10 w-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h1 className="text-xl font-['Dubai:Medium',_sans-serif] mb-0.5">
                      MOU Management
                    </h1>
                    <p className="text-white/90 text-sm">
                      Track and manage all partnership agreements and memorandums of understanding
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
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export List
                </Button>
                <Button 
                  size="lg" 
                  className="bg-white text-[#008755] hover:bg-white/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Partnership
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter Controls */}
        {showFilters && (
          <Card>
            <CardContent className="pt-4 pb-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <div className="md:col-span-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search partnerships..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-9"
                  />
                </div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Filter by Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types ({typeCounts.all})</SelectItem>
                    <SelectItem value="MOU">MOU ({typeCounts.MOU})</SelectItem>
                    <SelectItem value="Joint Initiative">Joint Initiative ({typeCounts["Joint Initiative"]})</SelectItem>
                    <SelectItem value="Agreement">Agreement ({typeCounts.Agreement})</SelectItem>
                    <SelectItem value="Protocol">Protocol ({typeCounts.Protocol})</SelectItem>
                    <SelectItem value="Framework">Framework ({typeCounts.Framework})</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status ({statusCounts.all})</SelectItem>
                    <SelectItem value="Active">Active ({statusCounts.Active})</SelectItem>
                    <SelectItem value="Pending">Pending ({statusCounts.Pending})</SelectItem>
                    <SelectItem value="Under Review">Under Review ({statusCounts["Under Review"]})</SelectItem>
                    <SelectItem value="Expired">Expired ({statusCounts.Expired})</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedSector} onValueChange={setSelectedSector}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Filter by Sector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sectors</SelectItem>
                    <SelectItem value="Government">Government</SelectItem>
                    <SelectItem value="Private Sector">Private Sector</SelectItem>
                    <SelectItem value="International">International</SelectItem>
                    <SelectItem value="Academic">Academic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Partnerships Table */}
        <Card>
          <CardContent className="pt-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="font-['Dubai:Medium',_'Dubai'] text-lg text-[#1f2937]">
                  All Partnerships
                </h2>
                <p className="text-sm text-muted-foreground">
                  Showing {filteredPartnerships.length} of {partnershipData.length} partnerships
                </p>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-['Dubai:Medium',_'Dubai']">Partnership</TableHead>
                    <TableHead className="font-['Dubai:Medium',_'Dubai']">Type</TableHead>
                    <TableHead className="font-['Dubai:Medium',_'Dubai']">Partners</TableHead>
                    <TableHead className="font-['Dubai:Medium',_'Dubai']">Sector</TableHead>
                    <TableHead className="font-['Dubai:Medium',_'Dubai']">Department</TableHead>
                    <TableHead className="font-['Dubai:Medium',_'Dubai']">Status</TableHead>
                    <TableHead className="font-['Dubai:Medium',_'Dubai'] text-right">Documentation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPartnerships.length > 0 ? (
                    filteredPartnerships.map((partnership) => {
                      const statusColor = getStatusColor(partnership.status);
                      const sectorColor = getSectorColor(partnership.sector);
                      const typeColor = getTypeColor(partnership.type);
                      const StatusIcon = statusColor.icon;

                      return (
                        <TableRow key={partnership.id} className="hover:bg-muted/50">
                          <TableCell className="font-['Dubai',_sans-serif] max-w-[200px]">
                            <div>
                              <div className="font-['Dubai:Medium',_'Dubai'] text-[#1f2937]">
                                {partnership.partnership}
                              </div>
                              <div className="text-xs text-muted-foreground mt-0.5">
                                {partnership.startDate} - {partnership.expiryDate}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              style={{
                                backgroundColor: typeColor.bg,
                                color: typeColor.text,
                              }}
                            >
                              {partnership.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="max-w-[180px]">
                            <div className="text-sm">
                              {partnership.partners.slice(0, 2).join(", ")}
                              {partnership.partners.length > 2 && (
                                <span className="text-muted-foreground">
                                  {" "}+{partnership.partners.length - 2} more
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              style={{
                                backgroundColor: sectorColor.bg,
                                color: sectorColor.text,
                              }}
                            >
                              {partnership.sector}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm max-w-[150px]">
                            {partnership.department}
                          </TableCell>
                          <TableCell>
                            <Badge
                              style={{
                                backgroundColor: statusColor.bg,
                                color: statusColor.text,
                              }}
                              className="gap-1"
                            >
                              <StatusIcon className="h-3 w-3" />
                              {partnership.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0"
                                onClick={() => {
                                  console.log("View documents:", partnership.partnership);
                                }}
                              >
                                <Eye className="h-3.5 w-3.5" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0"
                                onClick={() => {
                                  console.log("Download documents:", partnership.partnership);
                                }}
                              >
                                <FileDown className="h-3.5 w-3.5" />
                              </Button>
                              <span className="text-xs text-muted-foreground ml-1">
                                ({partnership.documents})
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                        No partnerships found matching your search
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
