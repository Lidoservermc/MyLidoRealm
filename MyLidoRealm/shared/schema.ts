import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
});

// Events table
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  location: text("location").notNull(),
});

export const insertEventSchema = createInsertSchema(events).pick({
  title: true,
  description: true,
  date: true,
  time: true,
  location: true,
});

// Announcements table
export const announcements = pgTable("announcements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  date: text("date").notNull(),
});

export const insertAnnouncementSchema = createInsertSchema(announcements).pick({
  title: true,
  content: true,
  date: true,
});

// Reports table
export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  type: text("type").notNull(),
  reportedPlayer: text("reported_player"),
  description: text("description").notNull(),
  status: text("status").notNull().default("Under Review"),
  submittedDate: text("submitted_date").notNull(),
});

export const insertReportSchema = createInsertSchema(reports).pick({
  userId: true,
  type: true,
  reportedPlayer: true,
  description: true,
  submittedDate: true,
});

// Moderator applications table
export const modApplications = pgTable("mod_applications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  age: integer("age").notNull(),
  playtime: integer("playtime").notNull(),
  experience: text("experience").notNull(),
  availability: text("availability").notNull(),
  reason: text("reason").notNull(),
  status: text("status").notNull().default("Pending"),
  submittedDate: text("submitted_date").notNull(),
});

export const insertModApplicationSchema = createInsertSchema(modApplications).pick({
  userId: true,
  age: true,
  playtime: true,
  experience: true,
  availability: true,
  reason: true,
  submittedDate: true,
});

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;

export type Announcement = typeof announcements.$inferSelect;
export type InsertAnnouncement = z.infer<typeof insertAnnouncementSchema>;

export type Report = typeof reports.$inferSelect;
export type InsertReport = z.infer<typeof insertReportSchema>;

export type ModApplication = typeof modApplications.$inferSelect;
export type InsertModApplication = z.infer<typeof insertModApplicationSchema>;
