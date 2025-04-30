import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Event } from "@shared/schema";

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <Card className="minecraft-container bg-[#1D1C1A]/90 p-4 rounded">
      <CardContent className="p-0">
        <div className="flex justify-between">
          <span className="font-minecraft text-[#F2B01E]">
            <i className="fas fa-calendar-day mr-1"></i> 
            {event.date}
          </span>
          <span className="font-minecraft text-[#E9E0D4] text-sm">
            <i className="fas fa-clock mr-1"></i> 
            {event.time}
          </span>
        </div>
        
        <h3 className="font-minecraft text-[#7DAF2A] text-xl mt-2">{event.title}</h3>
        
        <p className="text-[#E9E0D4] mt-2 text-sm">
          {event.description}
        </p>
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#3B96D2] text-sm">
            <i className="fas fa-map-marker-alt mr-1"></i> 
            {event.location}
          </span>
          <Button className="minecraft-btn bg-[#7DAF2A] px-3 py-1 text-white text-sm font-minecraft">
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
