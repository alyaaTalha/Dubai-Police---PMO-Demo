import { useState } from "react";
import {
  ArrowLeft,
  Plus,
  Megaphone,
  AlertTriangle,
  Star,
  Edit,
  Send,
  Calendar,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { toast } from "sonner";

interface AnnouncementsPageProps {
  onBack: () => void;
}

interface Announcement {
  id: string;
  title: string;
  description: string;
  createdDate: string;
  priority?: "High";
  iconType: "warning" | "megaphone-gold" | "megaphone-blue" | "star";
}

export function AnnouncementsPage({ onBack }: AnnouncementsPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "" as "" | "High",
    iconType: "megaphone-blue" as Announcement["iconType"],
  });

  const announcements: Announcement[] = [
    {
      id: "1",
      title: "Q2 Portfolio Review Deadline",
      description: "All project submissions must be finalized",
      createdDate: "2025-08-26",
      iconType: "warning",
    },
    {
      id: "2",
      title: "New Workflow Policy Update",
      description: "Updated approval process for digital projects",
      createdDate: "2025-10-01",
      iconType: "megaphone-gold",
    },
    {
      id: "3",
      title: "PMO System Maintenance Notice",
      description: "Scheduled downtime on 15th Nov",
      createdDate: "2025-10-01",
      priority: "High",
      iconType: "megaphone-blue",
    },
    {
      id: "4",
      title: "Project Milestone Achievement",
      description: "Smart Infrastructure Initiative reached pilot phase",
      createdDate: "2025-10-15",
      priority: "High",
      iconType: "star",
    },
  ];

  const getIconConfig = (iconType: Announcement["iconType"]) => {
    switch (iconType) {
      case "warning":
        return {
          icon: <AlertTriangle className="h-5 w-5" />,
          bg: "#D83731",
          bgLight: "#D8373120",
        };
      case "megaphone-gold":
        return {
          icon: <Megaphone className="h-5 w-5" />,
          bg: "#BB9956",
          bgLight: "#BB995620",
        };
      case "megaphone-blue":
        return {
          icon: <Megaphone className="h-5 w-5" />,
          bg: "#008755",
          bgLight: "#00875520",
        };
      case "star":
        return {
          icon: <Star className="h-5 w-5" />,
          bg: "#BB9956",
          bgLight: "#BB995620",
        };
    }
  };

  const handleOpenModal = (announcement?: Announcement) => {
    if (announcement) {
      setEditingAnnouncement(announcement);
      setFormData({
        title: announcement.title,
        description: announcement.description,
        priority: announcement.priority || "",
        iconType: announcement.iconType,
      });
    } else {
      setEditingAnnouncement(null);
      setFormData({
        title: "",
        description: "",
        priority: "",
        iconType: "megaphone-blue",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAnnouncement(null);
    setFormData({
      title: "",
      description: "",
      priority: "",
      iconType: "megaphone-blue",
    });
  };

  const handleSave = () => {
    // Save logic would go here
    handleCloseModal();
    toast.success("Announcement saved successfully");
  };

  return (
    <div className="h-full overflow-auto">
      <div className="space-y-3 p-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="-ml-2"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to System Administration
            </Button>
            <div>
              <h1 className="text-xl   text-[#1f2937]">
                Announcements
              </h1>
              <p className="text-sm text-muted-foreground">
                Create and manage announcements for the PMO system
              </p>
            </div>
          </div>
        </div>

        {/* Create New Announcement Section */}
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-1">
                  Create New Announcement
                </h3>
                <p className="text-xs text-muted-foreground">
                  Create project updates, policy notices, and PMO communications
                </p>
              </div>
              <Button size="lg" className="bg-[#008755] hover:bg-[#008755]/90" onClick={() => handleOpenModal()}>
                <Plus className="h-4 w-4 mr-2" />
                New Announcement
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* General Announcements Section */}
        <Card>
          <CardHeader>
            <CardTitle className="font-['Dubai:Medium',_'Dubai']">
              General Announcements
            </CardTitle>
            <CardDescription>
              Manage and publish announcements to PMO users
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {announcements.map((announcement) => {
              const iconConfig = getIconConfig(announcement.iconType);
              return (
                <Card key={announcement.id} className="border">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start justify-between gap-4">
                      {/* Left Side - Icon and Details */}
                      <div className="flex items-start gap-3 flex-1">
                        {/* Icon Avatar */}
                        <div
                          className="h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{
                            backgroundColor: iconConfig.bgLight,
                            color: iconConfig.bg,
                          }}
                        >
                          {iconConfig.icon}
                        </div>

                        {/* Text Content */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-1">
                            {announcement.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mb-2">
                            {announcement.description}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>Created: {announcement.createdDate}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Side - Badges and Actions */}
                      <div className="flex items-center gap-2">
                        {announcement.priority === "High" && (
                          <Badge
                            variant="destructive"
                            className="bg-[#D83731] text-white hover:bg-[#D83731]/90"
                          >
                            High
                          </Badge>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-[#BB9956] border-[#BB9956] hover:bg-[#BB9956]/10"
                          onClick={() => handleOpenModal(announcement)}
                        >
                          <Edit className="h-3.5 w-3.5 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          className="bg-[#008755] hover:bg-[#008755]/90"
                        >
                          <Send className="h-3.5 w-3.5 mr-1" />
                          Publish
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Announcement Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="font-['Dubai:Medium',_'Dubai']">
              {editingAnnouncement ? "Edit Announcement" : "Add Announcement"}
            </DialogTitle>
            <DialogDescription>
              {editingAnnouncement
                ? "Update announcement details and publish to PMO users"
                : "Create a new announcement for the PMO system"
              }
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Title */}
            <div>
              <label htmlFor="announcement-title" className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                Announcement Title <span className="text-[#D83731]">*</span>
              </label>
              <input
                id="announcement-title"
                type="text"
                className="w-full px-3 py-2 border rounded text-sm"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter announcement title"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="announcement-description" className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                Description <span className="text-[#D83731]">*</span>
              </label>
              <textarea
                id="announcement-description"
                className="w-full px-3 py-2 border rounded text-sm min-h-[100px]"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter announcement description"
                rows={4}
              />
            </div>

            {/* Icon Type */}
            <div>
              <label htmlFor="icon-type" className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                Icon Type
              </label>
              <select
                id="icon-type"
                className="w-full px-3 py-2 border rounded text-sm"
                value={formData.iconType}
                onChange={(e) => setFormData({ ...formData, iconType: e.target.value as Announcement["iconType"] })}
              >
                <option value="megaphone-blue">Megaphone (Blue)</option>
                <option value="megaphone-gold">Megaphone (Gold)</option>
                <option value="warning">Warning</option>
                <option value="star">Star/Milestone</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label htmlFor="priority" className="text-sm font-['Dubai:Medium',_'Dubai'] text-[#1f2937] mb-2 block">
                Priority
            </label>
              <select
                id="priority"
                className="w-full px-3 py-2 border rounded text-sm"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as "" | "High" })}
              >
                <option value="">Normal</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-[#008755] hover:bg-[#008755]/90"
              disabled={!formData.title || !formData.description}
            >
              <Send className="h-3.5 w-3.5 mr-1" />
              {editingAnnouncement ? "Update" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
