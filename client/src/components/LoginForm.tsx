import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

interface LoginFormProps {
  onContinue: (username: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onContinue }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError("Please enter your Minecraft username");
      return;
    }
    
    if (username.length < 3 || username.length > 16) {
      setError("Minecraft usernames must be 3-16 characters");
      return;
    }
    
    // This is a fake login that doesn't connect to any API
    // Just redirect to events page to simulate logging in
    setError("");
    setLocation("/events");
  };

  return (
    <div className="minecraft-container bg-[#1D1C1A]/90 p-6 md:p-8 rounded max-w-md w-full mx-auto fade-in">
      <div className="text-center mb-6">
        <h1 className="font-minecraft text-4xl md:text-5xl text-[#7DAF2A] mb-2">MyLido</h1>
        <p className="text-[#E9E0D4] text-lg">Lido's Minecraft Realm</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="minecraft-username" className="block font-minecraft text-[#E9E0D4] mb-2">
            Minecraft Username
          </label>
          <Input 
            id="minecraft-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="minecraft-input w-full p-3 rounded font-minecraft focus:outline-none focus:ring-2 focus:ring-[#7DAF2A]"
            placeholder="Your Minecraft username"
          />
          {error && (
            <p className="text-[#C64536] text-sm mt-1">{error}</p>
          )}
        </div>
        
        <div className="mt-6">
          <Button 
            type="submit"
            className="minecraft-btn bg-[#7DAF2A] hover:bg-[#7DAF2A]/90 font-minecraft text-white py-3 px-6 rounded w-full transition"
          >
            Continue
          </Button>
        </div>
        
        <p className="text-[#E9E0D4]/70 text-sm text-center mt-4">
          Connect with your realm community and stay updated with the latest events!
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
