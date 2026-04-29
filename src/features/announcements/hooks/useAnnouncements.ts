import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllAnnouncements,
  sendAnnouncement,
} from "../api/announcements.api";
import { CreateAnnouncementValues } from "../types";

export function useAnnouncements(search?: string) {
  return useQuery({
    queryKey: ["announcements", search],
    queryFn: () => getAllAnnouncements(search),
  });
}

export function useSendAnnouncement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateAnnouncementValues) => sendAnnouncement(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
}
