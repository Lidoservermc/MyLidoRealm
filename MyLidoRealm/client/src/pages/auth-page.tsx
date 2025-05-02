import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Redirect } from "wouter";

export default function AuthPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username) {
      toast({
        title: "Missing information",
        description: "Please enter your Minecraft username",
        variant: "destructive",
      });
      return;
    }
    
    if (!isLogin && !email) {
      toast({
        title: "Missing information",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    // Just show success message for demo
    toast({
      title: isLogin ? "Welcome back!" : "Account created!",
      description: `Logged in as ${username}`,
    });
    
    // Set as submitted to redirect
    setIsSubmitted(true);
  };

  // Redirect after successful form submission
  if (isSubmitted) {
    return <Redirect to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
        {/* Auth form */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {isLogin ? "Login to MyLido" : "Create Account"}
            </CardTitle>
            <CardDescription>
              {isLogin 
                ? "Enter your Minecraft username to access your account" 
                : "Join the MyLido Minecraft Server community"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Minecraft Username</Label>
                <Input
                  id="username"
                  placeholder="Your Minecraft username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              )}
              
              <Button type="submit" className="w-full">
                {isLogin ? "Login" : "Create Account"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-4">
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
            </Button>
          </CardFooter>
        </Card>
        
        {/* Hero section */}
        <div className="hidden md:flex flex-col space-y-4">
          <div className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
            MyLido Manager
          </div>
          <p className="text-lg">
            Your companion app for Lido's Minecraft Server
          </p>
          <ul className="space-y-2 mt-4">
            <li className="flex items-center">
              <div className="mr-2 text-primary">✓</div>
              View upcoming server events
            </li>
            <li className="flex items-center">
              <div className="mr-2 text-primary">✓</div>
              Read server announcements
            </li>
            <li className="flex items-center">
              <div className="mr-2 text-primary">✓</div>
              Submit player reports
            </li>
            <li className="flex items-center">
              <div className="mr-2 text-primary">✓</div>
              Apply for moderator positions
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}