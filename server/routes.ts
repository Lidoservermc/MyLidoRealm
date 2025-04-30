import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertUserSchema, 
  insertReportSchema, 
  insertModApplicationSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes - prefixed with /api
  
  // User routes
  app.post("/api/users/register", async (req, res) => {
    try {
      const userInput = insertUserSchema.parse(req.body);
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(userInput.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      const user = await storage.createUser(userInput);
      
      // Create a session for the user
      if (req.session) {
        req.session.userId = user.id;
        req.session.username = user.username;
      }
      
      res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid input data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to register user" });
    }
  });
  
  app.post("/api/users/login", async (req, res) => {
    try {
      const { username } = req.body;
      
      if (!username) {
        return res.status(400).json({ message: "Username is required" });
      }
      
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Set user session
      if (req.session) {
        req.session.userId = user.id;
        req.session.username = user.username;
      }
      
      res.status(200).json({ message: "Login successful", user });
    } catch (error) {
      res.status(500).json({ message: "Failed to login" });
    }
  });
  
  app.get("/api/users/current", async (req, res) => {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const user = await storage.getUser(req.session.userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to get current user" });
    }
  });
  
  app.post("/api/users/logout", (req, res) => {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: "Failed to logout" });
        }
        res.status(200).json({ message: "Logout successful" });
      });
    } else {
      res.status(200).json({ message: "Logout successful" });
    }
  });
  
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
  
  // Reports routes
  app.post("/api/reports", async (req, res) => {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const reportData = {
        ...req.body,
        userId: req.session.userId,
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
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const reports = await storage.getReportsByUserId(req.session.userId);
      res.status(200).json(reports);
    } catch (error) {
      res.status(500).json({ message: "Failed to get reports" });
    }
  });
  
  // Moderator applications routes
  app.post("/api/mod-applications", async (req, res) => {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      // Check if user already has a pending application
      const existingApplication = await storage.getModApplicationByUserId(req.session.userId);
      if (existingApplication) {
        return res.status(400).json({ message: "You already have a pending application" });
      }
      
      const applicationData = {
        ...req.body,
        userId: req.session.userId,
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
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const application = await storage.getModApplicationByUserId(req.session.userId);
      
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
