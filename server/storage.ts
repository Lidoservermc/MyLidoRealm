import {
  users, events, announcements, reports, modApplications,
  type User, type InsertUser,
  type Event, type InsertEvent,
  type Announcement, type InsertAnnouncement,
  type Report, type InsertReport,
  type ModApplication, type InsertModApplication
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Events operations
  getEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  
  // Announcements operations
  getAnnouncements(): Promise<Announcement[]>;
  createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement>;
  
  // Reports operations
  getReports(): Promise<Report[]>;
  getReportsByUserId(userId: number): Promise<Report[]>;
  createReport(report: InsertReport): Promise<Report>;
  
  // Mod applications operations
  getModApplications(): Promise<ModApplication[]>;
  getModApplicationByUserId(userId: number): Promise<ModApplication | undefined>;
  createModApplication(application: InsertModApplication): Promise<ModApplication>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private usersData: Map<number, User>;
  private eventsData: Map<number, Event>;
  private announcementsData: Map<number, Announcement>;
  private reportsData: Map<number, Report>;
  private modApplicationsData: Map<number, ModApplication>;
  
  private userIdCounter: number;
  private eventIdCounter: number;
  private announcementIdCounter: number;
  private reportIdCounter: number;
  private modApplicationIdCounter: number;

  constructor() {
    this.usersData = new Map();
    this.eventsData = new Map();
    this.announcementsData = new Map();
    this.reportsData = new Map();
    this.modApplicationsData = new Map();
    
    this.userIdCounter = 1;
    this.eventIdCounter = 1;
    this.announcementIdCounter = 1;
    this.reportIdCounter = 1;
    this.modApplicationIdCounter = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.usersData.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.usersData.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase(),
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.usersData.set(id, user);
    return user;
  }

  // Events operations
  async getEvents(): Promise<Event[]> {
    return Array.from(this.eventsData.values());
  }

  async getEvent(id: number): Promise<Event | undefined> {
    return this.eventsData.get(id);
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.eventIdCounter++;
    const event: Event = { ...insertEvent, id };
    this.eventsData.set(id, event);
    return event;
  }

  // Announcements operations
  async getAnnouncements(): Promise<Announcement[]> {
    return Array.from(this.announcementsData.values());
  }

  async createAnnouncement(insertAnnouncement: InsertAnnouncement): Promise<Announcement> {
    const id = this.announcementIdCounter++;
    const announcement: Announcement = { ...insertAnnouncement, id };
    this.announcementsData.set(id, announcement);
    return announcement;
  }

  // Reports operations
  async getReports(): Promise<Report[]> {
    return Array.from(this.reportsData.values());
  }

  async getReportsByUserId(userId: number): Promise<Report[]> {
    return Array.from(this.reportsData.values()).filter(
      (report) => report.userId === userId
    );
  }

  async createReport(insertReport: InsertReport): Promise<Report> {
    const id = this.reportIdCounter++;
    const report: Report = { 
      ...insertReport, 
      id,
      status: "Under Review"
    };
    this.reportsData.set(id, report);
    return report;
  }

  // Mod applications operations
  async getModApplications(): Promise<ModApplication[]> {
    return Array.from(this.modApplicationsData.values());
  }

  async getModApplicationByUserId(userId: number): Promise<ModApplication | undefined> {
    return Array.from(this.modApplicationsData.values()).find(
      (application) => application.userId === userId
    );
  }

  async createModApplication(insertApplication: InsertModApplication): Promise<ModApplication> {
    const id = this.modApplicationIdCounter++;
    const application: ModApplication = { 
      ...insertApplication, 
      id,
      status: "Pending"
    };
    this.modApplicationsData.set(id, application);
    return application;
  }

  // Initialize with sample data
  private initializeSampleData() {
    // Sample events
    this.createEvent({
      title: "Grand Building Contest",
      description: "Join us for an amazing building competition! Winners will receive diamond gear and special permissions.",
      date: "Jan 22",
      time: "8:00 PM",
      location: "Spawn Area"
    });
    
    this.createEvent({
      title: "PvP Tournament",
      description: "Battle other players in our custom arena! The last player standing wins a special weapon with enchantments.",
      date: "Jan 24",
      time: "9:30 PM",
      location: "Battle Arena"
    });
    
    this.createEvent({
      title: "Dragon Hunt",
      description: "Join forces to defeat the Ender Dragon! Everyone who participates will receive a share of the rewards.",
      date: "Jan 28",
      time: "7:00 PM",
      location: "The End"
    });

    // Sample announcements
    this.createAnnouncement({
      title: "Server Upgrade Complete!",
      content: "We've upgraded our server hardware! You should experience better performance and less lag during peak hours.",
      date: "Jan 20"
    });
    
    this.createAnnouncement({
      title: "New Survival Area Unlocked",
      content: "We've opened a new survival area with rare biomes! Check it out at /warp new_lands",
      date: "Jan 18"
    });
  }
}

export const storage = new MemStorage();
