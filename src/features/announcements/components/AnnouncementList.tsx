"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { CreateMessageModal } from "./CreateMessageModal";

import { useAnnouncements } from "../hooks/useAnnouncements";
import { Announcement as AnnouncementRecord } from "../types";

interface Announcement {
  id: string;
  title: string;
  description: string;
  time: string;
  originalData: AnnouncementRecord;
}

export function AnnouncementList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: announcementsData, isLoading } = useAnnouncements(searchTerm);

  const announcements: Announcement[] =
    announcementsData?.data?.map((a: AnnouncementRecord) => ({
      id: a._id,
      title: a.title,
      description: a.message,
      time: a.createdAt
        ? new Date(a.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "N/A",
      originalData: a,
    })) || [];

  const handleCreate = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Announcement</h1>
          <p className="text-sm text-muted-foreground">
            Real-time device integrity metrics and verification health.
          </p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full max-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="pl-10 h-11 bg-muted border-none rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            className="bg-primary hover:bg-primary/90 text-white rounded-full font-semibold h-11 px-6 whitespace-nowrap"
            onClick={handleCreate}
          >
            Create Message
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="py-5 border-b border-border/50 animate-pulse"
              >
                <div className="h-4 bg-muted w-1/4 rounded mb-2" />
                <div className="h-3 bg-muted w-3/4 rounded" />
              </div>
            ))
          : announcements.map((item: Announcement) => (
              <div
                key={item.id}
                className="group flex items-start justify-between py-5 border-b border-border/50 hover:bg-muted/30 transition-colors px-4 rounded-xl cursor-pointer"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-foreground text-sm">
                    {item.title}
                  </span>
                  <span className="text-xs text-muted-foreground line-clamp-2 max-w-2xl">
                    {item.description}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold text-muted-foreground whitespace-nowrap">
                    {item.time}
                  </span>
                </div>
              </div>
            ))}
      </div>

      <CreateMessageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
