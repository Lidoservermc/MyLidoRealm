import React from "react";
import { useQuery } from "@tanstack/react-query";
import MainLayout from "@/components/MainLayout";
import EventCard from "@/components/EventCard";
import AnnouncementCard from "@/components/AnnouncementCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Event, Announcement } from "@shared/schema";

const Events: React.FC = () => {
  const { data: events, isLoading: isLoadingEvents } = useQuery<Event[]>({
    queryKey: ['/api/events'],
  });

  const { data: announcements, isLoading: isLoadingAnnouncements } = useQuery<Announcement[]>({
    queryKey: ['/api/announcements'],
  });

  return (
    <MainLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-minecraft text-2xl text-[#7DAF2A]">Upcoming Events</h2>
          <Button className="minecraft-btn bg-[#3B96D2] px-4 py-2 text-white font-minecraft text-sm">
            <i className="fas fa-calendar-plus mr-2"></i> Event Calendar
          </Button>
        </div>

        {/* Event List */}
        {isLoadingEvents ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="minecraft-container bg-[#1D1C1A]/90 p-4 rounded">
                <CardContent className="p-0">
                  <div className="flex justify-between">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <Skeleton className="h-6 w-full mt-3" />
                  <Skeleton className="h-4 w-full mt-2" />
                  <Skeleton className="h-4 w-full mt-1" />
                  <div className="flex justify-between items-center mt-4">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events?.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        {/* Announcements */}
        <div className="mt-8">
          <h2 className="font-minecraft text-2xl text-[#7DAF2A] mb-4">Realm Announcements</h2>
          
          {isLoadingAnnouncements ? (
            <Card className="minecraft-container bg-[#1D1C1A]/90 p-4 rounded">
              <CardContent className="p-0">
                {[1, 2].map((i) => (
                  <div key={i} className="border-b border-[#593D29] pb-3 mb-3">
                    <div className="flex justify-between items-start">
                      <Skeleton className="h-5 w-40" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                    <Skeleton className="h-4 w-full mt-2" />
                    <Skeleton className="h-4 w-3/4 mt-1" />
                  </div>
                ))}
              </CardContent>
            </Card>
          ) : (
            <Card className="minecraft-container bg-[#1D1C1A]/90 p-4 rounded">
              <CardContent className="p-0">
                {announcements?.map((announcement) => (
                  <AnnouncementCard key={announcement.id} announcement={announcement} />
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Events;
