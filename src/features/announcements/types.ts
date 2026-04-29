import { z } from "zod";

export const announcementSchema = z.object({
  _id: z.string(),
  title: z.string(),
  message: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Announcement = z.infer<typeof announcementSchema>;

export const createAnnouncementSchema = z.object({
  title: z.string().min(2, "Title is required"),
  message: z.string().min(5, "Message is required"),
});

export type CreateAnnouncementValues = z.infer<typeof createAnnouncementSchema>;

export interface AnnouncementResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: Announcement[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPage: number;
  };
}

export interface SendAnnouncementResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: Announcement;
}
