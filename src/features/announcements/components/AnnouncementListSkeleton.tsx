export function AnnouncementListSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 bg-muted w-48 rounded-lg animate-pulse" />
          <div className="h-4 bg-muted w-64 rounded-lg animate-pulse" />
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="h-11 bg-muted w-full md:w-[300px] rounded-lg animate-pulse" />
          <div className="h-11 bg-muted w-32 rounded-full animate-pulse" />
        </div>
      </div>

      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-start justify-between py-5 border-b border-border/50 px-4"
          >
            <div className="flex flex-col gap-2 w-full">
              <div className="h-4 bg-muted w-1/4 rounded animate-pulse" />
              <div className="h-3 bg-muted w-3/4 rounded animate-pulse" />
            </div>
            <div className="h-3 bg-muted w-12 rounded animate-pulse ml-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
