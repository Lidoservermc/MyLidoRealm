import React from "react";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent } from "@/components/ui/card";

const Rules: React.FC = () => {
  return (
    <MainLayout>
      <h2 className="font-minecraft text-2xl text-[#7DAF2A] mb-6">Server Rules & Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="minecraft-container bg-[#1D1C1A]/90 p-6 rounded">
          <CardContent className="p-0">
            <h3 className="font-minecraft text-[#F2B01E] text-xl mb-4">Server Rules</h3>
            
            <div className="space-y-4">
              <div className="pb-2 border-b border-[#593D29]">
                <h4 className="font-minecraft text-[#3B96D2]">1. Respect All Players</h4>
                <p className="text-[#E9E0D4] text-sm mt-1">
                  Be respectful in chat and during interactions. No harassment, discrimination, or excessive swearing.
                </p>
              </div>
              
              <div className="pb-2 border-b border-[#593D29]">
                <h4 className="font-minecraft text-[#3B96D2]">2. No Griefing</h4>
                <p className="text-[#E9E0D4] text-sm mt-1">
                  Do not destroy or modify other players' builds without permission. Respect others' property.
                </p>
              </div>
              
              <div className="pb-2 border-b border-[#593D29]">
                <h4 className="font-minecraft text-[#3B96D2]">3. No Cheating or Hacking</h4>
                <p className="text-[#E9E0D4] text-sm mt-1">
                  Use of unauthorized mods, hacks, exploits, or cheats is strictly prohibited.
                </p>
              </div>
              
              <div className="pb-2 border-b border-[#593D29]">
                <h4 className="font-minecraft text-[#3B96D2]">4. No Spam</h4>
                <p className="text-[#E9E0D4] text-sm mt-1">
                  Avoid spamming chat with repetitive messages, excessive caps, or unwanted advertisements.
                </p>
              </div>
              
              <div>
                <h4 className="font-minecraft text-[#3B96D2]">5. Follow Staff Instructions</h4>
                <p className="text-[#E9E0D4] text-sm mt-1">
                  Moderators and admins have final say. Follow their instructions and respect their decisions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="minecraft-container bg-[#1D1C1A]/90 p-6 rounded">
          <CardContent className="p-0">
            <h3 className="font-minecraft text-[#F2B01E] text-xl mb-4">Server Information</h3>
            
            <div className="space-y-4">
              <div className="pb-2 border-b border-[#593D29]">
                <h4 className="font-minecraft text-[#3B96D2]">Server Address</h4>
                <p className="text-[#E9E0D4] font-minecraft mt-1 select-all bg-[#1D1C1A]/50 p-2 rounded">
                  lido.minecraft-realm.com
                </p>
              </div>
              
              <div className="pb-2 border-b border-[#593D29]">
                <h4 className="font-minecraft text-[#3B96D2]">Version</h4>
                <p className="text-[#E9E0D4] mt-1">
                  Minecraft Java 1.19.2 (Latest)
                </p>
              </div>
              
              <div className="pb-2 border-b border-[#593D29]">
                <h4 className="font-minecraft text-[#3B96D2]">Server Type</h4>
                <p className="text-[#E9E0D4] mt-1">
                  Survival with light RPG elements and custom events
                </p>
              </div>
              
              <div className="pb-2 border-b border-[#593D29]">
                <h4 className="font-minecraft text-[#3B96D2]">Installed Plugins</h4>
                <p className="text-[#E9E0D4] text-sm mt-1">
                  EssentialsX, GriefPrevention, LWC, McMMO, Dynmap, CustomEnchants
                </p>
              </div>
              
              <div>
                <h4 className="font-minecraft text-[#3B96D2]">Contact Admin</h4>
                <p className="text-[#E9E0D4] text-sm mt-1">
                  For urgent issues, contact Lido on Discord: Lido#1234
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Rules;
