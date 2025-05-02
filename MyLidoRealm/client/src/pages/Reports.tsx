import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import MainLayout from "@/components/MainLayout";
import ReportList from "@/components/ReportList";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { Report } from "@shared/schema";

// Form validation schema
const reportSchema = z.object({
  type: z.string().min(1, { message: "Please select a report type" }),
  reportedPlayer: z.string().optional(),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
});

type ReportFormValues = z.infer<typeof reportSchema>;

const Reports: React.FC = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Fetch user reports
  const { data: reports, isLoading } = useQuery<Report[]>({
    queryKey: ['/api/reports/user'],
  });
  
  // Form setup
  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      type: "",
      reportedPlayer: "",
      description: "",
    },
  });
  
  // Submit report mutation
  const submitMutation = useMutation({
    mutationFn: (data: ReportFormValues) => 
      apiRequest('POST', '/api/reports', data),
    onSuccess: () => {
      toast({
        title: "Report Submitted",
        description: "Your report has been submitted successfully.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/reports/user'] });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: error.message || "Failed to submit your report. Please try again.",
      });
    },
  });
  
  const onSubmit = (data: ReportFormValues) => {
    submitMutation.mutate(data);
  };

  return (
    <MainLayout>
      <h2 className="font-minecraft text-2xl text-[#7DAF2A] mb-6">Submit a Report</h2>
      
      <div className="minecraft-container bg-[#1D1C1A]/90 p-6 rounded">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block font-minecraft text-[#E9E0D4] mb-2">Report Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="minecraft-input w-full p-3 rounded font-minecraft focus:outline-none focus:ring-2 focus:ring-[#7DAF2A] bg-[#1D1C1A]">
                        <SelectValue placeholder="Select issue type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-[#1D1C1A] border-2 border-black">
                      <SelectItem value="player" className="text-[#E9E0D4]">Player Behavior</SelectItem>
                      <SelectItem value="bug" className="text-[#E9E0D4]">Bug/Glitch</SelectItem>
                      <SelectItem value="grief" className="text-[#E9E0D4]">Griefing</SelectItem>
                      <SelectItem value="suggestion" className="text-[#E9E0D4]">Suggestion</SelectItem>
                      <SelectItem value="other" className="text-[#E9E0D4]">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[#C64536]" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="reportedPlayer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block font-minecraft text-[#E9E0D4] mb-2">Player Name (if applicable)</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      className="minecraft-input w-full p-3 rounded font-minecraft focus:outline-none focus:ring-2 focus:ring-[#7DAF2A]" 
                      placeholder="Enter player name" 
                    />
                  </FormControl>
                  <FormMessage className="text-[#C64536]" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block font-minecraft text-[#E9E0D4] mb-2">Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field}
                      className="minecraft-input w-full p-3 rounded font-minecraft focus:outline-none focus:ring-2 focus:ring-[#7DAF2A] h-32" 
                      placeholder="Provide as much detail as possible..." 
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
                {submitMutation.isPending ? "Submitting..." : "Submit Report"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
      
      <div className="mt-8">
        <h3 className="font-minecraft text-xl text-[#E9E0D4] mb-4">Your Previous Reports</h3>
        
        {isLoading ? (
          <p className="text-center text-[#E9E0D4] p-4">Loading your reports...</p>
        ) : (
          <ReportList reports={reports || []} />
        )}
      </div>
    </MainLayout>
  );
};

export default Reports;
