"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./mode-toggle";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { status } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getPageTitle = () => {
    if (pathname.includes("/shopkeeper/dashboard")) return "Dashboard";
    if (pathname.includes("/shopkeeper/scan-device")) return "Scan Device";
    if (pathname.includes("/shopkeeper/transactions")) return "Transactions";
    if (pathname.includes("/shopkeeper/customers")) return "Customers";
    if (pathname.includes("/shopkeeper/settings")) return "Settings";
    return "Dashboard";
  };

  return (
    <>
      <header
        className={`fixed right-0 top-0 z-40 transition-all duration-300 lg:left-64 ${
          scrolled
            ? "border-b border-border bg-background/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent backdrop-blur-none"
        }`}
      >
        <div className="flex h-16 items-center justify-end px-4 sm:px-6 lg:px-8">
          {/* Right side - Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ModeToggle />

            {/* Login button - Only show if NOT authenticated */}
            {status !== "authenticated" && (
              <Link href="/auth/login">
                <button className="hidden h-9 rounded-full border border-primary px-4 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-primary-foreground sm:inline-flex sm:items-center sm:justify-center">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
