import Navbar from "@/components/dashboard/navbar";
import { Sidebar } from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <Navbar />
        <div className="mt-12">{children}</div>
      </main>
    </div>
  );
}
