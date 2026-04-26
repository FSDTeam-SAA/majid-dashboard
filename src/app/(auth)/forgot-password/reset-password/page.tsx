// src/app/(auth)/forgot-password/reset-password/page.tsx

import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password – imoscan Admin",
  description: "Create a new password for your imoscan admin account",
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
