import React, { useState } from "react";
import { useLocation } from "wouter";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trash as TrashIcon, 
  PlusCircle as PlusCircleIcon, 
  Calendar as CalendarIcon, 
  Edit as EditIcon, 
  Megaphone as AnnouncementIcon 
} from "lucide-react";

// Define event interface
interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
}

// Define announcement interface
interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
}

// Mock initial events
const initialEvents: Event[] = [
  { 
    id: 1, 
    title: "Grand Building Contest", 
    description: "Show off your building skills in our monthly contest. This month's theme: Fantasy Castles!", 
    date: "2025-01-22T20:00:00Z",
    location: "Spawn Area"
  },
  { 
    id: 2, 
    title: "PvP Tournament", 
    description: "Join our exciting PvP tournament. Great prizes for the top 3 winners!", 
    date: "2025-01-24T21:30:00Z",
    location: "Arena"
  },
  { 
    id: 3, 
    title: "Treasure Hunt", 
    description: "Find hidden treasures across the map. First player to find all checkpoints wins a special prize.", 
    date: "2025-01-28T19:00:00Z",
    location: "Survival World"
  }
];

// Mock initial announcements
const initialAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "Server Upgrade Complete!",
    content: "We've upgraded our server hardware! You should experience better performance and less lag during peak hours.",
    date: "2025-01-20T15:00:00Z"
  },
  {
    id: 2,
    title: "New Survival Area Unlocked",
    content: "We've opened a new survival area with rare biomes! Check it out at /warp new_lands",
    date: "2025-01-18T12:30:00Z"
  }
];

const AdminPanel: React.FC = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("events");
  
  // Events state
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [isEditEventOpen, setIsEditEventOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  
  // Announcements state
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [isAddAnnouncementOpen, setIsAddAnnouncementOpen] = useState(false);
  const [isEditAnnouncementOpen, setIsEditAnnouncementOpen] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState<Announcement | null>(null);
  
  // Form state for new/edit event
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  
  // Form state for new/edit announcement
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementContent, setAnnouncementContent] = useState("");
  const [announcementDate, setAnnouncementDate] = useState("");

  // Function to add a new event
  const addEvent = () => {
    if (!title || !description || !date) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields"
      });
      return;
    }

    const newEvent: Event = {
      id: events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1,
      title,
      description,
      date,
      location: eventLocation
    };

    setEvents([...events, newEvent]);
    resetForm();
    setIsAddEventOpen(false);
    
    toast({
      title: "Event Added",
      description: "The event has been successfully added"
    });
  };

  // Function to delete an event
  const deleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
    
    toast({
      title: "Event Deleted",
      description: "The event has been successfully removed"
    });
  };

  // Function to open edit dialog
  const openEditDialog = (event: Event) => {
    setCurrentEvent(event);
    setTitle(event.title);
    setDescription(event.description);
    setDate(event.date.split('T')[0]);
    setEventLocation(event.location);
    setIsEditEventOpen(true);
  };

  // Function to update an event
  const updateEvent = () => {
    if (!currentEvent) return;
    
    if (!title || !description || !date) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields"
      });
      return;
    }

    const updatedEvents = events.map(event => 
      event.id === currentEvent.id 
        ? { ...event, title, description, date, location: eventLocation } 
        : event
    );
    
    setEvents(updatedEvents);
    resetForm();
    setIsEditEventOpen(false);
    
    toast({
      title: "Event Updated",
      description: "The event has been successfully updated"
    });
  };

  // Reset event form fields
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDate("");
    setEventLocation("");
    setCurrentEvent(null);
  };
  
  // Reset announcement form fields
  const resetAnnouncementForm = () => {
    setAnnouncementTitle("");
    setAnnouncementContent("");
    setAnnouncementDate("");
    setCurrentAnnouncement(null);
  };
  
  // Function to add a new announcement
  const addAnnouncement = () => {
    if (!announcementTitle || !announcementContent) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields"
      });
      return;
    }
    
    // Use current date/time if not specified
    const formattedDate = announcementDate || new Date().toISOString();

    const newAnnouncement: Announcement = {
      id: announcements.length > 0 ? Math.max(...announcements.map(a => a.id)) + 1 : 1,
      title: announcementTitle,
      content: announcementContent,
      date: formattedDate
    };

    setAnnouncements([...announcements, newAnnouncement]);
    resetAnnouncementForm();
    setIsAddAnnouncementOpen(false);
    
    toast({
      title: "Announcement Added",
      description: "The announcement has been successfully added"
    });
  };
  
  // Function to delete an announcement
  const deleteAnnouncement = (id: number) => {
    setAnnouncements(announcements.filter(announcement => announcement.id !== id));
    
    toast({
      title: "Announcement Deleted",
      description: "The announcement has been successfully removed"
    });
  };
  
  // Function to open edit announcement dialog
  const openEditAnnouncementDialog = (announcement: Announcement) => {
    setCurrentAnnouncement(announcement);
    setAnnouncementTitle(announcement.title);
    setAnnouncementContent(announcement.content);
    setAnnouncementDate(announcement.date.split('T')[0]);
    setIsEditAnnouncementOpen(true);
  };
  
  // Function to update an announcement
  const updateAnnouncement = () => {
    if (!currentAnnouncement) return;
    
    if (!announcementTitle || !announcementContent) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields"
      });
      return;
    }
    
    // Use current date/time if not specified
    const formattedDate = announcementDate || new Date().toISOString();

    const updatedAnnouncements = announcements.map(announcement => 
      announcement.id === currentAnnouncement.id 
        ? { 
            ...announcement, 
            title: announcementTitle, 
            content: announcementContent, 
            date: formattedDate 
          } 
        : announcement
    );
    
    setAnnouncements(updatedAnnouncements);
    resetAnnouncementForm();
    setIsEditAnnouncementOpen(false);
    
    toast({
      title: "Announcement Updated",
      description: "The announcement has been successfully updated"
    });
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-minecraft text-3xl text-[#7DAF2A]">Admin Panel</h1>
        <Button 
          variant="default" 
          onClick={() => navigate("/")}
          className="bg-[#3B96D2] hover:bg-[#3B96D2]/90"
        >
          Back to Home
        </Button>
      </div>

      <Tabs defaultValue="events" className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger 
            value="events" 
            onClick={() => setActiveTab("events")}
            className="font-minecraft"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            Events
          </TabsTrigger>
          <TabsTrigger 
            value="announcements" 
            onClick={() => setActiveTab("announcements")}
            className="font-minecraft"
          >
            <AnnouncementIcon className="mr-2 h-4 w-4" />
            Announcements
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="events">
          <Card className="bg-[#1D1C1A]/80">
            <CardHeader>
              <CardTitle className="flex items-center text-[#F2B01E]">
                <CalendarIcon className="mr-2 h-5 w-5" />
                Event Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end mb-4">
                <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-[#5EC43B] hover:bg-[#5EC43B]/90">
                      <PlusCircleIcon className="mr-2 h-4 w-4" />
                      Add New Event
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] bg-[#1D1C1A]">
                    <DialogHeader>
                      <DialogTitle className="text-[#F2B01E]">Add New Event</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-[#E9E0D4]">Title</label>
                        <Input 
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="col-span-3 bg-[#2A2826] text-[#E9E0D4]"
                          placeholder="Event title"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-[#E9E0D4]">Date</label>
                        <Input 
                          type="datetime-local"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="col-span-3 bg-[#2A2826] text-[#E9E0D4]"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-[#E9E0D4]">Location</label>
                        <Input 
                          value={eventLocation}
                          onChange={(e) => setEventLocation(e.target.value)}
                          className="col-span-3 bg-[#2A2826] text-[#E9E0D4]"
                          placeholder="Event location"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-start gap-4">
                        <label className="text-right text-[#E9E0D4]">Description</label>
                        <Textarea 
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="col-span-3 bg-[#2A2826] text-[#E9E0D4]"
                          placeholder="Event description"
                          rows={4}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => {
                          resetForm();
                          setIsAddEventOpen(false);
                        }}
                        className="bg-[#3B3530] text-[#E9E0D4] border-[#4A4540]"
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="button" 
                        onClick={addEvent}
                        className="bg-[#5EC43B] hover:bg-[#5EC43B]/90"
                      >
                        Save Event
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Edit Event Dialog */}
              <Dialog open={isEditEventOpen} onOpenChange={setIsEditEventOpen}>
                <DialogContent className="sm:max-w-[500px] bg-[#1D1C1A]">
                  <DialogHeader>
                    <DialogTitle className="text-[#F2B01E]">Edit Event</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label className="text-right text-[#E9E0D4]">Title</label>
                      <Input 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="col-span-3 bg-[#2A2826] text-[#E9E0D4]"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label className="text-right text-[#E9E0D4]">Date</label>
                      <Input 
                        type="datetime-local"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="col-span-3 bg-[#2A2826] text-[#E9E0D4]"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label className="text-right text-[#E9E0D4]">Location</label>
                      <Input 
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                        className="col-span-3 bg-[#2A2826] text-[#E9E0D4]"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <label className="text-right text-[#E9E0D4]">Description</label>
                      <Textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="col-span-3 bg-[#2A2826] text-[#E9E0D4]"
                        rows={4}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        resetForm();
                        setIsEditEventOpen(false);
                      }}
                      className="bg-[#3B3530] text-[#E9E0D4] border-[#4A4540]"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="button" 
                      onClick={updateEvent}
                      className="bg-[#3B96D2] hover:bg-[#3B96D2]/90"
                    >
                      Update Event
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Event List */}
              <div className="space-y-4">
                {events.map((event) => (
                  <Card key={event.id} className="bg-[#2A2826]">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-minecraft text-[#F2B01E] text-lg">{event.title}</h3>
                          <p className="text-[#3B96D2] text-sm">{formatDate(event.date)}</p>
                          <p className="text-[#E9E0D4] text-sm mt-1">Location: {event.location}</p>
                          <p className="text-[#E9E0D4] mt-2">{event.description}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => openEditDialog(event)}
                            className="bg-[#3B3530] border-[#4A4540]"
                          >
                            <EditIcon className="h-4 w-4 text-[#F2B01E]" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => deleteEvent(event.id)}
                            className="bg-[#3B3530] border-[#4A4540]"
                          >
                            <TrashIcon className="h-4 w-4 text-[#C64536]" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {events.length === 0 && (
                  <div className="text-center py-10 text-[#E9E0D4]">
                    <p>No events found. Add a new event to get started.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="announcements">
          <Card className="bg-[#1D1C1A]/80">
            <CardHeader>
              <CardTitle className="flex items-center text-[#F2B01E]">
                <AnnouncementIcon className="mr-2 h-5 w-5" />
                Announcement Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end mb-4">
                <Dialog open={isAddAnnouncementOpen} onOpenChange={setIsAddAnnouncementOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-[#5EC43B] hover:bg-[#5EC43B]/90">
                      <PlusCircleIcon className="mr-2 h-4 w-4" />
                      Add New Announcement
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] bg-[#1D1C1A]">
                    <DialogHeader>
                      <DialogTitle className="text-[#F2B01E]">Add New Announcement</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-[#E9E0D4]">Title</label>
                        <Input 
                          value={announcementTitle}
                          onChange={(e) => setAnnouncementTitle(e.target.value)}
                          className="col-span-3 bg-[#2A2826] text-[#E9E0D4]"
                          placeholder="Announcement title"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-[#E9E0D4]">Date</label>
                        <Input 
                          type="datetime-local"
                          value={announcementDate}
                          onChange={(e) => setAnnouncementDate(e.target.value)}
                          className="col-span-3 bg-[#2A2826] text-[#E9E0D4]"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-start gap-4">
                        <label className="text-right text-[#E9E0D4]">Content</label>
                        <Textarea 
                          value={announcementContent}
                          onChange={(e) => setAnnouncementContent(e.target.value)}
                          className="col-span-3 bg-[#2A2826] text-[#E9E0D4]"
                          placeholder="Announcement content"
                          rows={4}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => {
                          resetAnnouncementForm();
                          setIsAddAnnouncementOpen(false);
                        }}
                        className="bg-[#3B3530] text-[#E9E0D4] border-[#4A4540]"
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="button" 
                        onClick={addAnnouncement}
                        className="bg-[#5EC43B] hover:bg-[#5EC43B]/90"
                      >
                        Save Announcement
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Edit Announcement Dialog */}
              <Dialog open={isEditAnnouncementOpen} onOpenChange={setIsEditAnnouncementOpen}>
                <DialogContent className="sm:max-w-[500px] bg-[#1D1C1A]">
                  <DialogHeader>
                    <DialogTitle className="text-[#F2B01E]">Edit Announcement</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label className="text-right text-[#E9E0D4]">Title</label>
                      <Input 
                        value={announcementTitle}
                        onChange={(e) => setAnnouncementTitle(e.target.value)}
                        className="col-span-3 bg-[#2A2826] text-[#E9E0D4]"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label className="text-right text-[#E9E0D4]">Date</label>
                      <Input 
                        type="datetime-local"
                        value={announcementDate}
                        onChange={(e) => setAnnouncementDate(e.target.value)}
                        className="col-span-3 bg-[#2A2826] text-[#E9E0D4]"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <label className="text-right text-[#E9E0D4]">Content</label>
                      <Textarea 
                        value={announcementContent}
                        onChange={(e) => setAnnouncementContent(e.target.value)}
                        className="col-span-3 bg-[#2A2826] text-[#E9E0D4]"
                        rows={4}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        resetAnnouncementForm();
                        setIsEditAnnouncementOpen(false);
                      }}
                      className="bg-[#3B3530] text-[#E9E0D4] border-[#4A4540]"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="button" 
                      onClick={updateAnnouncement}
                      className="bg-[#3B96D2] hover:bg-[#3B96D2]/90"
                    >
                      Update Announcement
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Announcement List */}
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <Card key={announcement.id} className="bg-[#2A2826]">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-minecraft text-[#F2B01E] text-lg">{announcement.title}</h3>
                          <p className="text-[#3B96D2] text-sm">{formatDate(announcement.date)}</p>
                          <p className="text-[#E9E0D4] mt-2">{announcement.content}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => openEditAnnouncementDialog(announcement)}
                            className="bg-[#3B3530] border-[#4A4540]"
                          >
                            <EditIcon className="h-4 w-4 text-[#F2B01E]" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => deleteAnnouncement(announcement.id)}
                            className="bg-[#3B3530] border-[#4A4540]"
                          >
                            <TrashIcon className="h-4 w-4 text-[#C64536]" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {announcements.length === 0 && (
                  <div className="text-center py-10 text-[#E9E0D4]">
                    <p>No announcements found. Add a new announcement to get started.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default AdminPanel;