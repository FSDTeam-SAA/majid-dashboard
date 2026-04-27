"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { CreateMessageModal } from "./CreateMessageModal";

const mockAnnouncements = [
  {
    id: 1,
    title: "Device Scan",
    description:
      "Hi, I'm getting an error when I try to run the Device Scan. Please assist.",
    time: "1H AGO",
  },
  {
    id: 2,
    title: "API Inquiry",
    description:
      "Where can I find the API documentation for integrating the verify endpoint?",
    time: "1H AGO",
  },
  {
    id: 3,
    title: "Billing Clarification",
    description:
      "I was charged twice for the last transaction. Can you please check my account?",
    time: "1H AGO",
  },
  {
    id: 4,
    title: "User Seat Management",
    description: "How do I remove a user seat that is no longer active?",
    time: "1H AGO",
  },
  {
    id: 5,
    title: "User Seat Management",
    description: "How do I remove a user seat that is no longer active?",
    time: "1H AGO",
  },
  {
    id: 6,
    title: "User Seat Management",
    description: "How do I remove a user seat that is no longer active?",
    time: "1H AGO",
  },
  {
    id: 7,
    title: "User Seat Management",
    description: "How do I remove a user seat that is no longer active?",
    time: "1H AGO",
  },
];

export function AnnouncementList() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            />
          </div>
          <Button
            className="bg-primary hover:bg-primary/90 text-white rounded-full font-semibold h-11 px-6 whitespace-nowrap"
            onClick={() => setIsModalOpen(true)}
          >
            Create Message
          </Button>
        </div>
      </div>

      <div className="space-y-0">
        {mockAnnouncements.map((item) => (
          <div
            key={item.id}
            className="flex items-start justify-between py-5 border-b border-border/50 hover:bg-muted/30 transition-colors px-2 rounded-lg cursor-pointer"
          >
            <div className="flex flex-col gap-1">
              <span className="font-bold text-foreground text-sm">
                {item.title}
              </span>
              <span className="text-xs text-muted-foreground">
                {item.description}
              </span>
            </div>
            <span className="text-[10px] font-bold text-muted-foreground whitespace-nowrap">
              {item.time}
            </span>
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
