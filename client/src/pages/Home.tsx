import React, { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import LoginForm from "@/components/LoginForm";
import EmailForm from "@/components/EmailForm";

const Home: React.FC = () => {
  const [username, setUsername] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);
  const { login } = useAuth();
  const [, setLocation] = useLocation();

  const handleContinue = (name: string) => {
    setUsername(name);
    setShowEmailForm(true);
  };

  const handleBack = () => {
    setShowEmailForm(false);
  };

  const handleSubmit = async (email: string) => {
    try {
      await login(username, email);
      setLocation("/events");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center p-4 min-h-screen">
      {!showEmailForm ? (
        <LoginForm onContinue={handleContinue} />
      ) : (
        <EmailForm 
          username={username} 
          onBack={handleBack} 
          onSubmit={handleSubmit} 
        />
      )}
    </div>
  );
};

export default Home;
