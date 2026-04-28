"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { toast } from "sonner";

const messageSchema = z.object({
  title: z.string().min(2, "Title is required"),
  message: z.string().min(5, "Message is required"),
});

type MessageValues = z.infer<typeof messageSchema>;

interface CreateMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    _id: string;
    title?: string;
    message?: string;
    description?: string;
  };
}

export function CreateMessageModal({
  isOpen,
  onClose,
  initialData,
}: CreateMessageModalProps) {
  const form = useForm<MessageValues>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      title: "",
      message: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        title: initialData.title || "",
        message: initialData.message || initialData.description || "",
      });
    } else {
      form.reset({
        title: "",
        message: "",
      });
    }
  }, [initialData, form, isOpen]);

  const onSubmit = async (values: MessageValues) => {
    try {
      // Implement create/update mutation here
      console.log("Submit message", values);
      toast.success(initialData ? "Message updated" : "Message created");
      onClose();
    } catch {
      toast.error("Failed to submit message");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl p-10 border-none shadow-lg rounded-3xl">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold text-foreground">
            {initialData ? "Edit Message" : "Create New Message"}
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Draft a communication for the Transparency Hub. Be clear, concise,
            and professional.
          </p>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground tracking-widest uppercase">
              Message Title
            </label>
            <Input
              {...form.register("title")}
              placeholder="Enter a descriptive title..."
              className="h-12 bg-muted/50 border-none rounded-xl placeholder:text-muted-foreground/50 focus-visible:ring-primary/20"
            />
            {form.formState.errors.title && (
              <p className="text-xs text-destructive">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground tracking-widest uppercase">
              Message Description
            </label>
            <Textarea
              {...form.register("message")}
              placeholder="What is the context of this update?"
              className="min-h-[160px] bg-muted/50 border-none rounded-xl resize-none placeholder:text-muted-foreground/50 focus-visible:ring-primary/20"
            />
            {form.formState.errors.message && (
              <p className="text-xs text-destructive">
                {form.formState.errors.message.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-border/50">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="text-sm text-foreground hover:bg-transparent hover:underline px-0"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white rounded-full font-bold h-12 px-8 flex items-center gap-2 shadow-lg shadow-primary/20"
            >
              {initialData ? "Update Message" : "Send Message"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
