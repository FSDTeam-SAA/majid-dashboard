// src/app/(auth)/layout.tsx

import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "imoscan – Admin Auth",
  description: "Secure admin portal for imoscan moderation & support",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <div className="auth-bg">{children}</div>;
}
