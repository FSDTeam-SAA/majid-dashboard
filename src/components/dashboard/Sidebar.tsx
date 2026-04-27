"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  History,
  Tag,
  Users,
  Megaphone,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { label: "Dashboard Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Invoices", href: "/invoices", icon: FileText },
  { label: "Payment History", href: "/payment-history", icon: History },
  { label: "Pricing Plan", href: "/pricing-plan", icon: Tag },
  { label: "All Users", href: "/all-users", icon: Users },
  { label: "Announcement", href: "/announcement", icon: Megaphone },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-sidebar-background border-r border-sidebar-border flex flex-col fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 flex items-center gap-2">
        <span className="text-2xl font-bold text-primary">imoscan</span>
        <div className="bg-blue-500 rounded-full p-0.5">
          <svg width="14" height="14" viewBox="0 0 22 22" fill="none">
            <path
              d="M6.5 11.2L9.5 14.2L15.5 8"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-white"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer / User Profile */}
      <div className="p-4 border-t border-sidebar-border mt-auto">
        <div className="flex items-center gap-3 mb-4 px-2">
          <Avatar className="w-10 h-10 border border-border">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>DN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">
              Demo Name
            </span>
            <span className="text-xs text-muted-foreground">Super Admin</span>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full justify-start gap-2 text-destructive border-destructive hover:bg-destructive/10"
        >
          <LogOut className="w-4 h-4" />
          Log out
        </Button>
      </div>
    </aside>
  );
}
