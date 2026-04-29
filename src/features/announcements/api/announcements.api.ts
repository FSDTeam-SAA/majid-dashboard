import { api } from "@/lib/api";
import {
  AnnouncementResponse,
  CreateAnnouncementValues,
  SendAnnouncementResponse,
} from "../types";

export const getAllAnnouncements = async (
  search?: string,
): Promise<AnnouncementResponse> => {
  const response = await api.get("/announcements/all", {
    params: { search },
  });
  return response.data;
};

export const sendAnnouncement = async (
  data: CreateAnnouncementValues,
): Promise<SendAnnouncementResponse> => {
  const response = await api.post("/announcements/send", data);
  return response.data;
};
