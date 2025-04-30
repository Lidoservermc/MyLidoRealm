import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

// Form validation schema - simplified
const modApplicationSchema = z.object({
  experience: z.string().min(10, { message: "Please provide details about your experience" }),
  reason: z.string().min(20, { message: "Please provide a detailed reason" }),
});

type ModApplicationFormValues = z.infer<typeof modApplicationSchema>;

const ModApply: React.FC = () => {
  const { toast } = useToast();
  
  // Form setup with simplified fields
  const form = useForm<ModApplicationFormValues>({
    resolver: zodResolver(modApplicationSchema),
    defaultValues: {
      experience: "",
      reason: "",
    },
  });
  
  const onSubmit = (data: ModApplicationFormValues) => {
    // Just show a success message without making any API calls
    toast({
      title: "Application Submitted",
      description: "Your moderator application has been submitted successfully.",
    });
    form.reset();
  };

  return (
    <MainLayout>
      <h2 className="font-minecraft text-2xl text-[#7DAF2A] mb-6">Moderator Application</h2>
      
      <div className="minecraft-container bg-[#1D1C1A]/90 p-6 rounded">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                className="minecraft-btn bg-[#7DAF2A] hover:bg-[#7DAF2A]/90 font-minecraft text-white py-3 px-6 rounded w-full transition"
              >
                Submit Application
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </MainLayout>
  );
};

export default ModApply;
