"use client";

// src/features/auth/components/ForgotPasswordForm.tsx

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForgotPassword } from "../hooks/useAuthMutations";

import Image from "next/image";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const { mutate, isPending } = useForgotPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    mutate(
      { email },
      {
        onSuccess: (data) => {
          const accessToken = data?.data?.accessToken;
          if (accessToken) {
            // Store the temp token in sessionStorage to use in next steps
            sessionStorage.setItem("fp_token", accessToken);
            sessionStorage.setItem("fp_email", email);
            toast.success("OTP sent to your email");
            router.push("/forgot-password/verify-otp");
          } else {
            toast.error("Failed to send OTP. Please try again.");
          }
        },
        onError: (error: unknown) => {
          const err = error as { response?: { data?: { message?: string } } };
          toast.error(err?.response?.data?.message || "Failed to send OTP");
        },
      },
    );
  };

  return (
    <div className="auth-card">
      {/* Logo */}
      <div className="relative h-12 w-48 mb-3">
        <Image
          src="/images/logo.png"
          alt="IMOSCAN"
          fill
          priority
          className="object-contain"
        />
      </div>

      <h1 className="auth-title">Forgot Password</h1>
      <p className="auth-subtitle">Enter your email to recover your password</p>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-input-wrapper">
          <input
            id="forgot-email"
            type="email"
            placeholder="hello@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
            autoComplete="email"
            required
          />
        </div>

        <button
          id="forgot-submit"
          type="submit"
          className="auth-btn"
          disabled={isPending}
        >
          {isPending ? "Sending..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
}
