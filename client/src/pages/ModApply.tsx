import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import MainLayout from "@/components/MainLayout";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ModApplication } from "@shared/schema";

// Form validation schema
const modApplicationSchema = z.object({
  age: z.string()
    .min(1, { message: "Age is required" })
    .refine((val) => !isNaN(parseInt(val)) && parseInt(val) >= 16, {
      message: "You must be at least 16 years old",
    }),
  playtime: z.string()
    .min(1, { message: "Playtime is required" })
    .refine((val) => !isNaN(parseInt(val)) && parseInt(val) >= 50, {
      message: "You must have at least 50 hours of playtime",
    }),
  experience: z.string().min(10, { message: "Please provide details about your experience" }),
  availability: z.string().min(10, { message: "Please provide your availability details" }),
  reason: z.string().min(20, { message: "Please provide a detailed reason" }),
});

type ModApplicationFormValues = z.infer<typeof modApplicationSchema>;

const ModApply: React.FC = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Check for existing application
  const { data: existingApplication, isLoading } = useQuery<ModApplication>({
    queryKey: ['/api/mod-applications/user'],
    retry: false,
  });
  
  // Form setup
  const form = useForm<ModApplicationFormValues>({
    resolver: zodResolver(modApplicationSchema),
    defaultValues: {
      age: "",
      playtime: "",
      experience: "",
      availability: "",
      reason: "",
    },
  });
  
  // Submit application mutation
  const submitMutation = useMutation({
    mutationFn: (data: ModApplicationFormValues) => 
      apiRequest('POST', '/api/mod-applications', {
        age: parseInt(data.age),
        playtime: parseInt(data.playtime),
        experience: data.experience,
        availability: data.availability,
        reason: data.reason,
      }),
    onSuccess: () => {
      toast({
        title: "Application Submitted",
        description: "Your moderator application has been submitted successfully.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/mod-applications/user'] });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: error.message || "Failed to submit your application. Please try again.",
      });
    },
  });
  
  const onSubmit = (data: ModApplicationFormValues) => {
    submitMutation.mutate(data);
  };

  // If user already has a pending application
  if (existingApplication) {
    return (
      <MainLayout>
        <h2 className="font-minecraft text-2xl text-[#7DAF2A] mb-6">Moderator Application</h2>
        
        <Card className="minecraft-container bg-[#1D1C1A]/90 p-6 rounded">
          <div className="space-y-4">
            <div className="bg-[#F2B01E]/20 p-4 rounded">
              <h3 className="font-minecraft text-[#F2B01E] text-lg mb-2">Application Pending</h3>
              <p className="text-[#E9E0D4]">
                You already have a pending moderator application submitted on {existingApplication.submittedDate}.
                Our team will review your application and get back to you.
              </p>
            </div>
            
            <div className="mt-4">
              <h4 className="font-minecraft text-[#3B96D2] mb-2">Application Status</h4>
              <p className="text-[#E9E0D4]">
                Current status: <span className="text-[#F2B01E] font-minecraft">{existingApplication.status}</span>
              </p>
            </div>
          </div>
        </Card>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h2 className="font-minecraft text-2xl text-[#7DAF2A] mb-6">Moderator Application</h2>
      
      <div className="minecraft-container bg-[#1D1C1A]/90 p-6 rounded">
        <div className="bg-[#593D29]/30 p-4 rounded mb-6">
          <h3 className="font-minecraft text-[#F2B01E] text-lg mb-2">Moderator Requirements</h3>
          <ul className="text-[#E9E0D4] text-sm space-y-2">
            <li><i className="fas fa-check-circle text-[#5EC43B] mr-2"></i> Minimum 50 hours on the server</li>
            <li><i className="fas fa-check-circle text-[#5EC43B] mr-2"></i> Age 16+</li>
            <li><i className="fas fa-check-circle text-[#5EC43B] mr-2"></i> No previous warnings or bans</li>
            <li><i className="fas fa-check-circle text-[#5EC43B] mr-2"></i> Good understanding of server rules</li>
            <li><i className="fas fa-check-circle text-[#5EC43B] mr-2"></i> Available at least 5 hours per week</li>
          </ul>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block font-minecraft text-[#E9E0D4] mb-2">Your Age</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      type="number"
                      min={16}
                      className="minecraft-input w-full p-3 rounded font-minecraft focus:outline-none focus:ring-2 focus:ring-[#7DAF2A]" 
                      placeholder="Enter your age" 
                    />
                  </FormControl>
                  <FormMessage className="text-[#C64536]" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="playtime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block font-minecraft text-[#E9E0D4] mb-2">Hours Played on Server</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      type="number"
                      min={50}
                      className="minecraft-input w-full p-3 rounded font-minecraft focus:outline-none focus:ring-2 focus:ring-[#7DAF2A]" 
                      placeholder="Estimate your hours played" 
                    />
                  </FormControl>
                  <FormMessage className="text-[#C64536]" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block font-minecraft text-[#E9E0D4] mb-2">Previous Moderation Experience</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field}
                      className="minecraft-input w-full p-3 rounded font-minecraft focus:outline-none focus:ring-2 focus:ring-[#7DAF2A] h-24" 
                      placeholder="Describe any previous experience as moderator..." 
                    />
                  </FormControl>
                  <FormMessage className="text-[#C64536]" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="availability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block font-minecraft text-[#E9E0D4] mb-2">Weekly Availability</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field}
                      className="minecraft-input w-full p-3 rounded font-minecraft focus:outline-none focus:ring-2 focus:ring-[#7DAF2A] h-24" 
                      placeholder="When are you typically available to moderate?" 
                    />
                  </FormControl>
                  <FormMessage className="text-[#C64536]" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block font-minecraft text-[#E9E0D4] mb-2">Why do you want to be a moderator?</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field}
                      className="minecraft-input w-full p-3 rounded font-minecraft focus:outline-none focus:ring-2 focus:ring-[#7DAF2A] h-32" 
                      placeholder="Tell us why you would make a good moderator..." 
                    />
                  </FormControl>
                  <FormMessage className="text-[#C64536]" />
                </FormItem>
              )}
            />
            
            <div className="mt-6">
              <Button 
                type="submit"
                disabled={submitMutation.isPending}
                className="minecraft-btn bg-[#7DAF2A] hover:bg-[#7DAF2A]/90 font-minecraft text-white py-3 px-6 rounded w-full transition"
              >
                {submitMutation.isPending ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </MainLayout>
  );
};

export default ModApply;
