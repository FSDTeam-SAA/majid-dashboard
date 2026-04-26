"use client";

// src/features/auth/components/ResetPasswordForm.tsx

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useResetPassword } from "../hooks/useAuthMutations";

export default function ResetPasswordForm() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [accessToken] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("rp_token") || "";
    }
    return "";
  });

  const { mutate, isPending } = useResetPassword(accessToken);

  useEffect(() => {
    if (!accessToken) {
      toast.error("Session expired. Please start over.");
      router.push("/forgot-password");
    }
  }, [router, accessToken]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    mutate(
      { newPassword },
      {
        onSuccess: () => {
          // Clean up session storage
          sessionStorage.removeItem("rp_token");
          sessionStorage.removeItem("fp_email");
          toast.success("Password reset successfully! Please log in.");
          router.push("/login");
        },
        onError: (error: unknown) => {
          const err = error as { response?: { data?: { message?: string } } };
          toast.error(
            err?.response?.data?.message || "Failed to reset password",
          );
        },
      },
    );
  };

  return (
    <div className="auth-card">
      {/* Logo */}
      <div className="auth-logo">
        <span className="auth-logo-text">imoscan</span>
        <span className="auth-logo-badge">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="11" r="11" fill="#3B9EE8" />
            <path
              d="M6.5 11.2L9.5 14.2L15.5 8"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <h1 className="auth-title">Reset Password</h1>
      <p className="auth-subtitle">Create a new password</p>

      <form onSubmit={handleSubmit} className="auth-form">
        {/* New Password */}
        <div className="auth-input-wrapper">
          <input
            id="reset-new-password"
            type={showNew ? "text" : "password"}
            placeholder="Create a password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="auth-input"
            autoComplete="new-password"
            required
          />
          <button
            type="button"
            className="auth-eye-btn"
            onClick={() => setShowNew(!showNew)}
            aria-label={showNew ? "Hide password" : "Show password"}
          >
            {showNew ? <EyeOpenIcon /> : <EyeOffIcon />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="auth-input-wrapper">
          <input
            id="reset-confirm-password"
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="auth-input"
            autoComplete="new-password"
            required
          />
          <button
            type="button"
            className="auth-eye-btn"
            onClick={() => setShowConfirm(!showConfirm)}
            aria-label={
              showConfirm ? "Hide confirm password" : "Show confirm password"
            }
          >
            {showConfirm ? <EyeOpenIcon /> : <EyeOffIcon />}
          </button>
        </div>

        <button
          id="reset-password-submit"
          type="submit"
          className="auth-btn"
          disabled={isPending}
        >
          {isPending ? "Resetting..." : "Continue"}
        </button>
      </form>
    </div>
  );
}

function EyeOffIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function EyeOpenIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
