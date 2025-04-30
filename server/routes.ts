import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { z } from "zod";
import { insertReportSchema, insertModApplicationSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);
  
  // API routes - prefixed with /api
  
  // Events routes
  app.get("/api/events", async (req, res) => {
    try {
      const events = await storage.getEvents();
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to get events" });
    }
  });
  
  // Announcements routes
  app.get("/api/announcements", async (req, res) => {
    try {
      const announcements = await storage.getAnnouncements();
      res.status(200).json(announcements);
    } catch (error) {
      res.status(500).json({ message: "Failed to get announcements" });
    }
  });
  
  // Reports routes - Protected by authentication
  app.post("/api/reports", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const reportData = {
        ...req.body,
        userId: req.user.id,
        submittedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      
      const validatedData = insertReportSchema.parse(reportData);
      const report = await storage.createReport(validatedData);
      
      res.status(201).json({ message: "Report submitted successfully", report });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid input data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to submit report" });
    }
  });
  
  app.get("/api/reports/user", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const reports = await storage.getReportsByUserId(req.user.id);
      res.status(200).json(reports);
    } catch (error) {
      res.status(500).json({ message: "Failed to get reports" });
    }
  });
  
  // Moderator applications routes - Protected by authentication
  app.post("/api/mod-applications", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      // Check if user already has a pending application
      const existingApplication = await storage.getModApplicationByUserId(req.user.id);
      if (existingApplication) {
        return res.status(400).json({ message: "You already have a pending application" });
      }
      
      const applicationData = {
        ...req.body,
        userId: req.user.id,
        submittedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      
      const validatedData = insertModApplicationSchema.parse(applicationData);
      const application = await storage.createModApplication(validatedData);
      
      res.status(201).json({ 
        message: "Moderator application submitted successfully", 
        application 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid input data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to submit moderator application" });
    }
  });
  
  app.get("/api/mod-applications/user", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const application = await storage.getModApplicationByUserId(req.user.id);
      
      if (!application) {
        return res.status(404).json({ message: "No application found" });
      }
      
      res.status(200).json(application);
    } catch (error) {
      res.status(500).json({ message: "Failed to get application" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
