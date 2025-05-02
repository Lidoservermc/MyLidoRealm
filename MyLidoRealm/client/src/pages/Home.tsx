import React from "react";
import LoginForm from "@/components/LoginForm";

const Home: React.FC = () => {
  // Simplified placeholder function
  const handleContinue = (username: string) => {
    console.log(`Username entered: ${username}`);
  };

  return (
    <div className="flex-grow flex items-center justify-center p-4 min-h-screen">
      <LoginForm onContinue={handleContinue} />
    </div>
  );
};

export default Home;
