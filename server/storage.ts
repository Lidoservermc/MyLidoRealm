import {
  users, events, announcements, reports, modApplications,
  type User, type InsertUser,
  type Event, type InsertEvent,
  type Announcement, type InsertAnnouncement,
  type Report, type InsertReport,
  type ModApplication, type InsertModApplication
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

// Interface for storage operations
export interface IStorage {
  // Session store for express-session
  sessionStore: session.Store;
  
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

// Database storage implementation
export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;
  
  constructor() {
    const PostgresSessionStore = connectPg(session);
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
    
    // Initialize with sample data if needed
    this.initializeSampleData();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Events operations
  async getEvents(): Promise<Event[]> {
    return await db.select().from(events);
  }

  async getEvent(id: number): Promise<Event | undefined> {
    const result = await db.select().from(events).where(eq(events.id, id));
    return result[0];
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const result = await db.insert(events).values(insertEvent).returning();
    return result[0];
  }

  // Announcements operations
  async getAnnouncements(): Promise<Announcement[]> {
    return await db.select().from(announcements);
  }

  async createAnnouncement(insertAnnouncement: InsertAnnouncement): Promise<Announcement> {
    const result = await db.insert(announcements).values(insertAnnouncement).returning();
    return result[0];
  }

  // Reports operations
  async getReports(): Promise<Report[]> {
    return await db.select().from(reports);
  }

  async getReportsByUserId(userId: number): Promise<Report[]> {
    return await db.select().from(reports).where(eq(reports.userId, userId));
  }

  async createReport(insertReport: InsertReport): Promise<Report> {
    const result = await db.insert(reports).values({
      ...insertReport,
      status: "Under Review"
    }).returning();
    return result[0];
  }

  // Mod applications operations
  async getModApplications(): Promise<ModApplication[]> {
    return await db.select().from(modApplications);
  }

  async getModApplicationByUserId(userId: number): Promise<ModApplication | undefined> {
    const result = await db.select().from(modApplications).where(eq(modApplications.userId, userId));
    return result[0];
  }

  async createModApplication(insertApplication: InsertModApplication): Promise<ModApplication> {
    const result = await db.insert(modApplications).values({
      ...insertApplication,
      status: "Pending"
    }).returning();
    return result[0];
  }

  // Initialize with sample data if needed
  private async initializeSampleData() {
    // Check if we have events already
    const existingEvents = await this.getEvents();
    if (existingEvents.length === 0) {
      // Sample events
      await this.createEvent({
        title: "Grand Building Contest",
        description: "Join us for an amazing building competition! Winners will receive diamond gear and special permissions.",
        date: "Jan 22",
        time: "8:00 PM",
        location: "Spawn Area"
      });
      
      await this.createEvent({
        title: "PvP Tournament",
        description: "Battle other players in our custom arena! The last player standing wins a special weapon with enchantments.",
        date: "Jan 24",
        time: "9:30 PM",
        location: "Battle Arena"
      });
      
      await this.createEvent({
        title: "Dragon Hunt",
        description: "Join forces to defeat the Ender Dragon! Everyone who participates will receive a share of the rewards.",
        date: "Jan 28",
        time: "7:00 PM",
        location: "The End"
      });
    }

    // Check if we have announcements already
    const existingAnnouncements = await this.getAnnouncements();
    if (existingAnnouncements.length === 0) {
      // Sample announcements
      await this.createAnnouncement({
        title: "Server Upgrade Complete!",
        content: "We've upgraded our server hardware! You should experience better performance and less lag during peak hours.",
        date: "Jan 20"
      });
      
      await this.createAnnouncement({
        title: "New Survival Area Unlocked",
        content: "We've opened a new survival area with rare biomes! Check it out at /warp new_lands",
        date: "Jan 18"
      });
    }
  }
}

export const storage = new DatabaseStorage();
