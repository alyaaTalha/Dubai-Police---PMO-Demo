import { useState } from "react";
import {
  Building2,
  Search,
  Pencil,
  Briefcase,
  Globe,
  Award,
  Download,
  ArrowLeft,
  Plus,
  Filter
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

interface Partner {
  id: number;
  name: string;
  segment: "Government" | "Private Sector" | "International" | "Academic";
  partnerships: number;
}

const partnerData: Partner[] = [
  { id: 1, name: "Dubai Police", segment: "Government", partnerships: 12 },
  { id: 2, name: "Emirates NBD", segment: "Private Sector", partnerships: 8 },
  { id: 3, name: "Dubai Electricity & Water Authority (DEWA)", segment: "Government", partnerships: 15 },
  { id: 4, name: "Roads and Transport Authority (RTA)", segment: "Government", partnerships: 10 },
  { id: 5, name: "Emirates Airlines", segment: "Private Sector", partnerships: 6 },
  { id: 6, name: "Abu Dhabi Customs", segment: "Government", partnerships: 18 },
  { id: 7, name: "DP World", segment: "Private Sector", partnerships: 14 },
  { id: 8, name: "Etisalat by e&", segment: "Private Sector", partnerships: 9 },
  { id: 9, name: "World Customs Organization", segment: "International", partnerships: 7 },
  { id: 10, name: "Dubai Health Authority", segment: "Government", partnerships: 5 },
  { id: 11, name: "Mashreq Bank", segment: "Private Sector", partnerships: 4 },
  { id: 12, name: "Singapore Customs", segment: "International", partnerships: 11 },
  { id: 13, name: "United Arab Emirates University", segment: "Academic", partnerships: 8 },
  { id: 14, name: "Dubai Municipality", segment: "Government", partnerships: 13 },
  { id: 15, name: "Mubadala Investment Company", segment: "Private Sector", partnerships: 10 },
  { id: 16, name: "Dubai Airport Freezone Authority", segment: "Government", partnerships: 7 },
  { id: 17, name: "Khalifa University", segment: "Academic", partnerships: 6 },
  { id: 18, name: "German Customs Authority", segment: "International", partnerships: 5 },
  { id: 19, name: "Dubai Chamber of Commerce", segment: "Government", partnerships: 16 },
  { id: 20, name: "Aramex", segment: "Private Sector", partnerships: 9 },
];

interface PartnerListPageProps {
  onBack: () => void;
}

export function PartnerListPage({ onBack }: PartnerListPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSegment, setSelectedSegment] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(true);

  const filteredPartners = partnerData.filter((partner) => {
    const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.segment.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSegment = selectedSegment === "all" || partner.segment === selectedSegment;
    return matchesSearch && matchesSegment;
  });

  const getSegmentColor = (segment: string) => {
    switch (segment) {
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

  const getSegmentIcon = (segment: string) => {
    switch (segment) {
      case "Government":
        return <Building2 className="h-3.5 w-3.5" />;
      case "Private Sector":
        return <Briefcase className="h-3.5 w-3.5" />;
      case "International":
        return <Globe className="h-3.5 w-3.5" />;
      case "Academic":
        return <Award className="h-3.5 w-3.5" />;
      default:
        return null;
    }
  };

  const segmentCounts = {
    all: partnerData.length,
    Government: partnerData.filter(p => p.segment === "Government").length,
    "Private Sector": partnerData.filter(p => p.segment === "Private Sector").length,
    International: partnerData.filter(p => p.segment === "International").length,
    Academic: partnerData.filter(p => p.segment === "Academic").length,
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
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h1 className="text-xl font-['Dubai:Medium',_sans-serif] mb-0.5">
                      Partner Organizations
                    </h1>
                    <p className="text-white/90 text-sm">
                      Manage all partner organizations and their partnerships
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
                  Add Partner
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter Controls */}
        {showFilters && (
          <Card>
            <CardContent className="pt-4 pb-4">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by partner name or segment..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-9"
                  />
                </div>
                <Select value={selectedSegment} onValueChange={setSelectedSegment}>
                  <SelectTrigger className="w-full md:w-[240px] h-9">
                    <SelectValue placeholder="Filter by Segment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Segments ({segmentCounts.all})</SelectItem>
                    <SelectItem value="Government">Government ({segmentCounts.Government})</SelectItem>
                    <SelectItem value="Private Sector">Private Sector ({segmentCounts["Private Sector"]})</SelectItem>
                    <SelectItem value="International">International ({segmentCounts.International})</SelectItem>
                    <SelectItem value="Academic">Academic ({segmentCounts.Academic})</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Partners Table */}
        <Card>
          <CardContent className="pt-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="font-['Dubai:Medium',_'Dubai'] text-lg text-[#1f2937]">
                  All Partners
                </h2>
                <p className="text-sm text-muted-foreground">
                  Showing {filteredPartners.length} of {partnerData.length} partners
                </p>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-['Dubai:Medium',_'Dubai']">Partner Name</TableHead>
                    <TableHead className="font-['Dubai:Medium',_'Dubai']">Segment</TableHead>
                    <TableHead className="font-['Dubai:Medium',_'Dubai'] text-right">Partnerships</TableHead>
                    <TableHead className="font-['Dubai:Medium',_'Dubai'] text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPartners.length > 0 ? (
                    filteredPartners.map((partner) => {
                      const segmentColor = getSegmentColor(partner.segment);
                      return (
                        <TableRow key={partner.id} className="hover:bg-muted/50">
                          <TableCell className="font-['Dubai',_sans-serif]">
                            {partner.name}
                          </TableCell>
                          <TableCell>
                            <Badge
                              style={{
                                backgroundColor: segmentColor.bg,
                                color: segmentColor.text,
                              }}
                              className="gap-1"
                            >
                              {getSegmentIcon(partner.segment)}
                              {partner.segment}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-['Dubai:Medium',_'Dubai']">
                            {partner.partnerships}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-1.5"
                              onClick={() => {
                                // Handle edit action
                                console.log("Edit partner:", partner.name);
                              }}
                            >
                              <Pencil className="h-3.5 w-3.5" />
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                        No partners found matching your search
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
