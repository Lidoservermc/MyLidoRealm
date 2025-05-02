import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { Announcement } from "@shared/schema";

interface AnnouncementCardProps {
  announcement: Announcement;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcement }) => {
  return (
    <div className="border-b border-[#593D29] pb-3 mb-3">
      <div className="flex justify-between items-start">
        <h3 className="font-minecraft text-[#3B96D2] text-lg">{announcement.title}</h3>
        <span className="text-[#E9E0D4] text-xs">{announcement.date}</span>
      </div>
      <p className="text-[#E9E0D4] mt-2 text-sm">
        {announcement.content}
      </p>
    </div>
  );
};

export default AnnouncementCard;
