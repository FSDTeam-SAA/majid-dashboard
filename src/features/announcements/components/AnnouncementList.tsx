"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Megaphone } from "lucide-react";
import { CreateMessageModal } from "./CreateMessageModal";
import { ViewAnnouncementModal } from "./ViewAnnouncementModal";

import { useAnnouncements } from "../hooks/useAnnouncements";
import { Announcement as AnnouncementRecord } from "../types";

interface Announcement {
  id: string;
  title: string;
  description: string;
  time: string;
  date: string;
  originalData: AnnouncementRecord;
}

export function AnnouncementList() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<AnnouncementRecord | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: announcementsData, isLoading } = useAnnouncements(searchTerm);

  const rawData = announcementsData?.data;
  const rawList: AnnouncementRecord[] = Array.isArray(rawData)
    ? (rawData as AnnouncementRecord[])
    : Array.isArray(
          (rawData as unknown as { data?: AnnouncementRecord[] })?.data,
        )
      ? (rawData as unknown as { data: AnnouncementRecord[] }).data
      : [];

  const announcements: Announcement[] = rawList.map((a: AnnouncementRecord) => {
    const createdAtDate = a.createdAt ? new Date(a.createdAt) : null;
    const time = createdAtDate
      ? createdAtDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";
    const date = createdAtDate
      ? createdAtDate.toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "N/A";

    return {
      id: a._id,
      title: a.title,
      description: a.message,
      time,
      date,
      originalData: a,
    };
  });

  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  const handleSelect = (item: Announcement) => {
    setSelectedAnnouncement(item.originalData);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Announcement</h1>
          <p className="text-sm text-muted-foreground">
            Broadcast platform updates, maintenance notices, and alerts to all
            users.
          </p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full max-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search announcements..."
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
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="py-5 border-b border-border/50 animate-pulse px-4"
            >
              <div className="h-4 bg-muted w-1/4 rounded mb-2" />
              <div className="h-3 bg-muted w-3/4 rounded" />
            </div>
          ))
        ) : announcements.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-muted/20 border border-dashed border-border rounded-2xl p-6">
            <div className="p-3 bg-primary/10 rounded-full text-primary mb-3">
              <Megaphone className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-foreground">
              {searchTerm
                ? "No announcements matched your search"
                : "No announcements yet"}
            </h3>
            <p className="text-xs text-muted-foreground max-w-sm mt-1 mb-4">
              {searchTerm
                ? "Try searching with different keywords or clear the filter."
                : "Create an announcement to communicate updates with your platform users."}
            </p>
            {searchTerm ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSearchTerm("")}
                className="rounded-full"
              >
                Clear Search
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={handleCreate}
                className="rounded-full bg-primary text-white"
              >
                Create Announcement
              </Button>
            )}
          </div>
        ) : (
          announcements.map((item: Announcement) => (
            <div
              key={item.id}
              onClick={() => handleSelect(item)}
              className="group flex items-start justify-between py-4 border-b border-border/50 hover:bg-muted/30 transition-colors px-4 rounded-xl cursor-pointer"
            >
              <div className="flex flex-col gap-1 pr-4">
                <span className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                  {item.title}
                </span>
                <span className="text-xs text-muted-foreground line-clamp-2 max-w-2xl leading-relaxed">
                  {item.description}
                </span>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className="text-xs font-medium text-foreground whitespace-nowrap">
                  {item.date}
                </span>
                {item.time && (
                  <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                    {item.time}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <CreateMessageModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <ViewAnnouncementModal
        announcement={selectedAnnouncement}
        isOpen={!!selectedAnnouncement}
        onClose={() => setSelectedAnnouncement(null)}
      />
    </div>
  );
}
