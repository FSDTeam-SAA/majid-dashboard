"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";

interface CreateMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateMessageModal({
  isOpen,
  onClose,
}: CreateMessageModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl p-10 border-none shadow-lg rounded-2xl">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold text-foreground">
            Create New Message
          </DialogTitle>
          <p className="text-sm text-foreground mt-2">
            Draft a new communication for the Transparency Hub. Be clear,
            concise, and professional.
          </p>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground tracking-widest uppercase">
              Message Title
            </label>
            <Input
              placeholder="Enter a descriptive title..."
              className="h-12 bg-white border-border/50 rounded-xl placeholder:text-muted-foreground/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground tracking-widest uppercase">
              Message Description
            </label>
            <Textarea
              placeholder="What is the context of this update?"
              className="min-h-[160px] bg-white border-border/50 rounded-xl resize-none placeholder:text-muted-foreground/50"
            />
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-border/50">
            <Button
              variant="ghost"
              className="text-sm text-foreground hover:bg-transparent hover:underline px-0"
            >
              Save as Draft
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full font-bold h-12 px-6 flex items-center gap-2">
              Preview Message
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
