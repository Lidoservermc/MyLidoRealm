import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { isValidEmail } from "@/lib/utils";

interface EmailFormProps {
  username: string;
  onBack: () => void;
  onSubmit: (email: string) => void;
}

const EmailForm: React.FC<EmailFormProps> = ({ username, onBack, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }
    
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    setError("");
    onSubmit(email);
  };

  return (
    <div className="minecraft-container bg-[#1D1C1A]/90 p-6 md:p-8 rounded max-w-md w-full mx-auto fade-in">
      <div className="text-center mb-6">
        <h1 className="font-minecraft text-4xl text-[#7DAF2A] mb-2">MyLido</h1>
        <p className="text-[#E9E0D4] text-lg">Almost there!</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-[#7DAF2A]/20 p-3 rounded">
          <p className="text-[#E9E0D4] font-minecraft">
            Welcome, <span className="text-[#7DAF2A]">{username}</span>!
          </p>
        </div>
        
        <div>
          <label htmlFor="email" className="block font-minecraft text-[#E9E0D4] mb-2">
            Email Address
          </label>
          <Input 
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="minecraft-input w-full p-3 rounded font-minecraft focus:outline-none focus:ring-2 focus:ring-[#7DAF2A]"
            placeholder="your@email.com"
          />
          {error && (
            <p className="text-[#C64536] text-sm mt-1">{error}</p>
          )}
        </div>
        
        <div className="mt-6 flex space-x-3">
          <Button 
            type="button"
            onClick={onBack}
            className="minecraft-btn bg-[#593D29] hover:bg-[#593D29]/90 font-minecraft text-white py-3 px-6 rounded flex-1 transition"
          >
            Back
          </Button>
          <Button 
            type="submit"
            className="minecraft-btn bg-[#7DAF2A] hover:bg-[#7DAF2A]/90 font-minecraft text-white py-3 px-6 rounded flex-1 transition"
          >
            Enter Realm
          </Button>
        </div>
        
        <p className="text-[#E9E0D4]/70 text-sm text-center mt-4">
          Your email will only be used for important realm announcements.
        </p>
      </form>
    </div>
  );
};

export default EmailForm;
