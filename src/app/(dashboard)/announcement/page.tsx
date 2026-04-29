import { Suspense } from "react";
import { AnnouncementList } from "@/features/announcements/components/AnnouncementList";
import { AnnouncementListSkeleton } from "@/features/announcements/components/AnnouncementListSkeleton";

export default function AnnouncementPage() {
  return (
    <Suspense fallback={<AnnouncementListSkeleton />}>
      <AnnouncementList />
    </Suspense>
  );
}
