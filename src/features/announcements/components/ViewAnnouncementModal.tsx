"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Megaphone, Calendar, Clock } from "lucide-react";
import { Announcement as AnnouncementRecord } from "../types";

interface ViewAnnouncementModalProps {
  announcement: AnnouncementRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ViewAnnouncementModal({
  announcement,
  isOpen,
  onClose,
}: ViewAnnouncementModalProps) {
  if (!announcement) return null;

  const dateStr = announcement.createdAt
    ? new Date(announcement.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

  const timeStr = announcement.createdAt
    ? new Date(announcement.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl p-8 border-none shadow-xl rounded-3xl">
        <DialogHeader className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-primary/10 rounded-full text-primary">
              <Megaphone className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              Announcement Details
            </span>
          </div>
          <DialogTitle className="text-2xl font-bold text-foreground leading-snug">
            {announcement.title}
          </DialogTitle>
          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {dateStr}
            </span>
            {timeStr && (
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {timeStr}
              </span>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-4 my-2">
          <div className="p-4 bg-muted/40 rounded-2xl border border-border/40">
            <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
              {announcement.message}
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-border/50">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="rounded-full px-6 font-semibold"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
