// src/app/(auth)/forgot-password/page.tsx

import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password – imoscan Admin",
  description: "Reset your imoscan admin account password",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
