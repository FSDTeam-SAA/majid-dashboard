// src/app/(auth)/login/page.tsx

import LoginForm from "@/features/auth/components/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login – imoscan Admin",
  description: "Log in to the imoscan admin dashboard",
};

export default function LoginPage() {
  return <LoginForm />;
}
