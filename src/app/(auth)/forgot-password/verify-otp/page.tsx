// src/app/(auth)/forgot-password/verify-otp/page.tsx

import VerifyOtpForm from "@/features/auth/components/VerifyOtpForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify OTP – imoscan Admin",
  description: "Enter the OTP sent to your email to verify your identity",
};

export default function VerifyOtpPage() {
  return <VerifyOtpForm />;
}
