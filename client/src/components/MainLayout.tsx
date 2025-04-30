import React, { useState, ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const [location, setLocation] = useLocation();
  
  // Parse the current tab from the path
  const currentTab = location.split('/')[1] || 'events';
  
  const handleLogout = async () => {
    await logout();
    setLocation('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-[#1D1C1A]/95 border-b-2 border-[#7DAF2A] shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/events">
              <a className="font-minecraft text-2xl md:text-3xl text-[#7DAF2A]">MyLido</a>
            </Link>
          </div>
          
          {/* User Menu */}
          <div className="flex items-center">
            <div className="mr-2 hidden md:block">
              <span className="text-[#E9E0D4] font-minecraft">{user?.username}</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="minecraft-btn bg-[#593D29] text-white p-2 rounded flex items-center justify-center">
                  <i className="fas fa-user"></i>
                  <i className="fas fa-caret-down ml-2"></i>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#1D1C1A] border-2 border-black p-2">
                <DropdownMenuItem 
                  className="font-minecraft text-[#E9E0D4] hover:bg-[#593D29] cursor-pointer"
                  onClick={handleLogout}
                >
                  <i className="fas fa-sign-out-alt mr-2"></i> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-[#593D29] border-b-2 border-black">
        <div className="container mx-auto">
          <nav className="flex overflow-x-auto">
            <Link href="/events">
              <a className={`nav-tab font-minecraft px-4 py-3 text-white border-r-2 border-black ${currentTab === 'events' ? 'bg-[#7DAF2A]' : 'hover:bg-[#593D29]/80'}`}>
                <i className="fas fa-calendar-alt mr-2"></i> Events
              </a>
            </Link>
            <Link href="/reports">
              <a className={`nav-tab font-minecraft px-4 py-3 text-white border-r-2 border-black ${currentTab === 'reports' ? 'bg-[#7DAF2A]' : 'hover:bg-[#593D29]/80'}`}>
                <i className="fas fa-flag mr-2"></i> Reports
              </a>
            </Link>
            <Link href="/mod-apply">
              <a className={`nav-tab font-minecraft px-4 py-3 text-white border-r-2 border-black ${currentTab === 'mod-apply' ? 'bg-[#7DAF2A]' : 'hover:bg-[#593D29]/80'}`}>
                <i className="fas fa-user-shield mr-2"></i> Mod Apply
              </a>
            </Link>
            <Link href="/rules">
              <a className={`nav-tab font-minecraft px-4 py-3 text-white border-r-2 border-black ${currentTab === 'rules' ? 'bg-[#7DAF2A]' : 'hover:bg-[#593D29]/80'}`}>
                <i className="fas fa-scroll mr-2"></i> Rules
              </a>
            </Link>
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <main className="flex-grow bg-[#1D1C1A]/70 p-4">
        <div className="container mx-auto">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1D1C1A] border-t-2 border-[#593D29] text-[#E9E0D4] py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="font-minecraft">Lido's Minecraft Realm</p>
            <p className="text-xs mt-1 text-[#E9E0D4]/70">© 2023 MyLido. Not affiliated with Mojang Studios.</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-[#7DAF2A] hover:text-[#7DAF2A]/80 transition">
              <i className="fab fa-discord text-xl"></i>
            </a>
            <a href="#" className="text-[#7DAF2A] hover:text-[#7DAF2A]/80 transition">
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a href="#" className="text-[#7DAF2A] hover:text-[#7DAF2A]/80 transition">
              <i className="fas fa-globe text-xl"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
