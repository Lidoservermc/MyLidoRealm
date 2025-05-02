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
    // No sample data will be created - keeping this method for future expansion
  }
}

export const storage = new DatabaseStorage();
